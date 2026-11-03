import { GridFSBucket, ObjectId, type GridFSBucketReadStream } from "mongodb";
import { Readable } from "node:stream";
import mongoose from "mongoose";
import { ApiError } from "./http";
import { connectToDatabase } from "./mongodb";
import GalleryMediaModel, { type GalleryMediaDocument } from "../models/GalleryMedia";
import type { GalleryCategory, GalleryMediaType } from "./validation";

export const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 30 * 1024 * 1024;

const allowedTypes: Record<GalleryMediaType, readonly string[]> = {
  photos: ["image/jpeg", "image/png", "image/webp"],
  videos: ["video/mp4", "video/webm"],
};

function getBucket(): GridFSBucket {
  const database = mongoose.connection.db;
  if (!database) {
    throw new ApiError(503, "Database access is not available.");
  }
  return new GridFSBucket(database, { bucketName: "academyGallery" });
}

function safeFileName(name: string): string {
  const cleaned = name
    .replace(/[\\/]/g, "_")
    .replace(/[^\w.-]/g, "_")
    .slice(0, 255);
  return cleaned || "gallery-upload";
}

function hasExpectedSignature(mimeType: string, buffer: Buffer): boolean {
  if (mimeType === "image/jpeg") {
    return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (mimeType === "image/png") {
    return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }
  if (mimeType === "image/webp") {
    return buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP";
  }
  if (mimeType === "video/mp4") {
    return buffer.toString("ascii", 4, 8) === "ftyp";
  }
  if (mimeType === "video/webm") {
    return buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]));
  }
  return false;
}

export type GalleryRecord = {
  id: string;
  type: GalleryMediaType;
  category: GalleryCategory;
  name: string;
  mimeType: string;
  size: number;
  createdAt: string;
  url: string;
};

function toRecord(value: {
  _id: { toString(): string };
  type: GalleryMediaType;
  category: GalleryCategory;
  name: string;
  mimeType: string;
  size: number;
  createdAt: Date;
}): GalleryRecord {
  const id = value._id.toString();
  return {
    id,
    type: value.type,
    category: value.category,
    name: value.name,
    mimeType: value.mimeType,
    size: value.size,
    createdAt: value.createdAt.toISOString(),
    url: `/api/gallery/${id}`,
  };
}

export async function listGalleryMedia(
  type: GalleryMediaType,
  category?: GalleryCategory,
  limit = 50,
): Promise<GalleryRecord[]> {
  await connectToDatabase();
  const filter: { type: GalleryMediaType; category?: GalleryCategory } = { type };
  if (category) {
    filter.category = category;
  }
  const files = await GalleryMediaModel.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<GalleryMediaDocument[]>();
  return files.map((file) => toRecord(file));
}

export async function uploadGalleryMedia(
  file: File,
  type: GalleryMediaType,
  category: GalleryCategory,
): Promise<GalleryRecord> {
  const maxBytes = type === "photos" ? MAX_PHOTO_BYTES : MAX_VIDEO_BYTES;
  if (!allowedTypes[type].includes(file.type)) {
    throw new ApiError(400, "This file type is not supported.");
  }
  if (file.size < 1 || file.size > maxBytes) {
    throw new ApiError(
      413,
      `The file must be smaller than ${Math.floor(maxBytes / 1024 / 1024)} MB.`,
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.byteLength !== file.size || !hasExpectedSignature(file.type, buffer)) {
    throw new ApiError(400, "The file content does not match its supported file type.");
  }

  await connectToDatabase();
  const bucket = getBucket();
  const upload = bucket.openUploadStream(safeFileName(file.name), {
    contentType: file.type,
    metadata: { type, category, name: safeFileName(file.name) },
  });

  await new Promise<void>((resolve, reject) => {
    upload.once("finish", resolve);
    upload.once("error", reject);
    Readable.from(buffer).pipe(upload);
  });

  try {
    const record = await GalleryMediaModel.create({
      fileId: upload.id,
      type,
      category,
      name: safeFileName(file.name),
      mimeType: file.type,
      size: file.size,
    });
    return toRecord(record);
  } catch (error) {
    await bucket.delete(upload.id as ObjectId);
    throw error;
  }
}

export async function getGalleryFile(
  id: string,
): Promise<{ stream: GridFSBucketReadStream; record: GalleryRecord } | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  await connectToDatabase();
  const media = await GalleryMediaModel.findById(id).lean<GalleryMediaDocument>();
  if (!media || !media.fileId) {
    return null;
  }
  return {
    stream: getBucket().openDownloadStream(media.fileId),
    record: toRecord(media),
  };
}

export async function deleteGalleryFile(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  await connectToDatabase();
  const media = await GalleryMediaModel.findById(id);
  if (!media) {
    return false;
  }

  await getBucket().delete(media.fileId);
  await media.deleteOne();
  return true;
}

export function isGalleryMediaType(value: string): value is GalleryMediaType {
  return value === "photos" || value === "videos";
}

export function isGalleryCategory(value: string): value is GalleryCategory {
  return value === "events" || value === "classes" || value === "album";
}
