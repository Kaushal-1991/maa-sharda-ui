import AcademyReviewModel from "../models/AcademyReview";
import ReviewSettingsModel from "../models/ReviewSettings";
import { ApiError } from "../lib/http";
import { connectToDatabase } from "../lib/mongodb";
import type { AcademyReviewInput } from "../lib/validation";

const reviewSettingsId = "academy-reviews";
const visibleReviewsFilter = { status: { $ne: "REJECTED" } };

export type AcademyReviewRecord = {
  id: string;
  name: string;
  course: string;
  rating: number;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
};

export type PublicReviews = {
  enabled: boolean;
  reviews: AcademyReviewRecord[];
  averageRating: number;
  totalReviews: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

function toRecord(value: any): AcademyReviewRecord {
  return {
    id: value._id.toString(),
    name: value.name,
    course: value.course,
    rating: value.rating,
    message: value.message,
    status: value.status ?? "PENDING",
    createdAt: value.createdAt.toISOString(),
  };
}

export async function getReviewSystemEnabled(): Promise<boolean> {
  await connectToDatabase();
  const settings = await ReviewSettingsModel.findOne({
    _id: reviewSettingsId,
  }).lean();
  return settings?.enabled ?? true;
}

export async function getPublicReviews(
  page = 1,
  pageSize = 10,
): Promise<PublicReviews> {
  await connectToDatabase();
  const settings = await ReviewSettingsModel.findOne({
    _id: reviewSettingsId,
  }).lean();
  if (settings?.enabled === false) {
    return {
      enabled: false,
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
      page,
      pageSize,
      totalPages: 0,
    };
  }

  const summary = await AcademyReviewModel.aggregate([
    { $match: visibleReviewsFilter },
    { $group: { _id: null, averageRating: { $avg: "$rating" }, totalReviews: { $sum: 1 } } },
  ]);
  const aggregate = summary[0];
  const totalReviews = aggregate?.totalReviews ?? 0;
  const totalPages = Math.ceil(totalReviews / pageSize);
  const currentPage = Math.min(page, Math.max(totalPages, 1));
  const reviews = await AcademyReviewModel.find(visibleReviewsFilter)
    .sort({ rating: -1, createdAt: -1 })
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize)
    .lean();

  return {
    enabled: true,
    reviews: reviews.map((review) => toRecord(review)),
    averageRating: aggregate ? Number(aggregate.averageRating.toFixed(1)) : 0,
    totalReviews,
    page: currentPage,
    pageSize,
    totalPages,
  };
}

export async function listAcademyReviews(): Promise<AcademyReviewRecord[]> {
  await connectToDatabase();
  const reviews = await AcademyReviewModel.find()
    .sort({ createdAt: -1 })
    .lean();
  return reviews.map((review) => toRecord(review));
}

export async function createAcademyReview(
  input: AcademyReviewInput,
): Promise<AcademyReviewRecord> {
  await connectToDatabase();
  const settings = await ReviewSettingsModel.findOne({
    _id: reviewSettingsId,
  }).lean();
  if (settings?.enabled === false) {
    throw new ApiError(403, "Reviews are currently disabled.");
  }

  const review = await AcademyReviewModel.create({
    ...input,
    status: "APPROVED",
  });
  return toRecord(review);
}

export async function updateReviewSystemEnabled(
  enabled: boolean,
): Promise<boolean> {
  await connectToDatabase();
  const settings = await ReviewSettingsModel.findByIdAndUpdate(
    reviewSettingsId,
    { $set: { enabled } },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  );
  return settings.enabled;
}

export async function updateAcademyReviewStatus(
  id: string,
  status: "APPROVED" | "REJECTED",
): Promise<AcademyReviewRecord | null> {
  await connectToDatabase();
  const updated = await AcademyReviewModel.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );
  return updated ? toRecord(updated) : null;
}

export async function deleteAcademyReview(id: string): Promise<boolean> {
  await connectToDatabase();
  const deleted = await AcademyReviewModel.findByIdAndDelete(id);
  return deleted !== null;
}
