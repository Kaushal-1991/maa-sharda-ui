import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse, readJson } from "../../../lib/http";
import {
  academyReviewSchema,
  publicReviewQuerySchema,
} from "../../../lib/validation";
import {
  createAcademyReview,
  getPublicReviews,
} from "../../../services/review.service";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const query = publicReviewQuerySchema.parse({
      page: request.nextUrl.searchParams.get("page") ?? undefined,
      limit: request.nextUrl.searchParams.get("limit") ?? undefined,
    });
    return NextResponse.json(
      await getPublicReviews(query.page, query.limit),
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    const payload = academyReviewSchema.parse(body);
    await createAcademyReview(payload);
    return NextResponse.json(
      { message: "Your review has been submitted for admin approval." },
      { status: 201 },
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}
