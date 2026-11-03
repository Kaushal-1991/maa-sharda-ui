import { NextRequest, NextResponse } from "next/server";
import { ApiError, apiErrorResponse } from "../../../../lib/http";
import {
  deleteGalleryFile,
  isGalleryCategory,
  isGalleryMediaType,
  listGalleryMedia,
  uploadGalleryMedia,
  type GalleryRecord,
} from "../../../../lib/gallery-storage";
import { requireAdminRequest } from "../../../../lib/route-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const type = request.nextUrl.searchParams.get("type") ?? "";
    if (!isGalleryMediaType(type)) {
      throw new ApiError(400, "A valid gallery media type is required.");
    }

    const categoryValue = request.nextUrl.searchParams.get("category");
    if (categoryValue && !isGalleryCategory(categoryValue)) {
      throw new ApiError(400, "The gallery category is invalid.");
    }

    const media = await listGalleryMedia(
      type,
      categoryValue && isGalleryCategory(categoryValue)
        ? categoryValue
        : undefined,
      50,
    );
    return NextResponse.json({ media });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  const uploaded: GalleryRecord[] = [];
  try {
    const formData = await request.formData();
    const typeValue = formData.get("type");
    const categoryValue = formData.get("category");
    if (
      typeof typeValue !== "string" ||
      !isGalleryMediaType(typeValue) ||
      typeof categoryValue !== "string" ||
      !isGalleryCategory(categoryValue)
    ) {
      throw new ApiError(400, "The media type or gallery category is invalid.");
    }

    const entries = formData.getAll("files");
    if (categoryValue !== "classes") {
      throw new ApiError(400, "Gallery media can only be uploaded to the Classes collection.");
    }

    const maxCount = typeValue === "photos" ? 7 : 1;
    if (entries.length < 1 || entries.length > maxCount) {
      throw new ApiError(
        400,
        typeValue === "photos"
          ? "Select between one and seven photos per upload."
          : "Upload one video at a time.",
      );
    }

    if (entries.some((entry) => typeof entry === "string")) {
      throw new ApiError(400, "Every gallery upload must be a file.");
    }

    for (const entry of entries) {
      if (!(entry instanceof File)) {
        throw new ApiError(400, "Every gallery upload must be a file.");
      }
      uploaded.push(await uploadGalleryMedia(entry, typeValue, categoryValue));
    }

    return NextResponse.json({ media: uploaded }, { status: 201 });
  } catch (error) {
    const cleanupResults = await Promise.allSettled(
      uploaded.map((media) => deleteGalleryFile(media.id)),
    );
    for (const result of cleanupResults) {
      if (result.status === "rejected") {
        console.error("Unable to roll back a partial gallery upload:", result.reason);
      }
    }
    return apiErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      throw new ApiError(400, "Gallery media id is required.");
    }

    const deleted = await deleteGalleryFile(id);
    if (!deleted) {
      return NextResponse.json({ error: "Gallery media not found." }, { status: 404 });
    }
    return NextResponse.json({ deleted: true });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
