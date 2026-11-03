import { defaultClasses, type AcademyClass } from "../data/classes";
import AcademyClassModel from "../models/AcademyClass";
import { connectToDatabase } from "../lib/mongodb";
import type { AcademyClassInput } from "../lib/validation";

export type AcademyClassRecord = AcademyClass & {
  createdAt?: string;
  updatedAt?: string;
};

function toRecord(value: any): AcademyClassRecord {
  return {
    id: value._id.toString(),
    title: value.title,
    description: value.description,
    imageUrl: value.imageUrl ?? "",
    displayOrder: value.displayOrder ?? 0,
    isActive: value.isActive ?? true,
    createdAt: value.createdAt?.toISOString(),
    updatedAt: value.updatedAt?.toISOString(),
  };
}

function createSlug(title: string): string {
  return title
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getPublicClasses(): Promise<AcademyClassRecord[]> {
  await connectToDatabase();
  const records = await AcademyClassModel.find({ isActive: true })
    .sort({ displayOrder: 1, title: 1 })
    .lean();

  return records.length
    ? records.map((record) => toRecord(record))
    : defaultClasses;
}

export async function getAdminClasses(): Promise<AcademyClassRecord[]> {
  await connectToDatabase();
  const records = await AcademyClassModel.find()
    .sort({ displayOrder: 1, title: 1 })
    .lean();
  return records.map((record) => toRecord(record));
}

export async function createClass(
  input: AcademyClassInput,
): Promise<AcademyClassRecord> {
  await connectToDatabase();
  const created = await AcademyClassModel.create({
    ...input,
    slug: createSlug(input.title),
  });
  return toRecord(created);
}

export async function updateClass(
  id: string,
  input: AcademyClassInput,
): Promise<AcademyClassRecord | null> {
  await connectToDatabase();
  const updated = await AcademyClassModel.findByIdAndUpdate(
    id,
    { ...input, slug: createSlug(input.title) },
    { new: true, runValidators: true },
  );
  return updated ? toRecord(updated) : null;
}

export async function deleteClass(id: string): Promise<boolean> {
  await connectToDatabase();
  const deleted = await AcademyClassModel.findByIdAndDelete(id);
  return deleted !== null;
}
