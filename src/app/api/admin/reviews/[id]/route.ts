import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse, readJson } from "../../../../../lib/http";
import { requireAdminRequest } from "../../../../../lib/route-auth";
import { reviewModerationSchema } from "../../../../../lib/validation";
import {
  deleteAcademyReview,
  updateAcademyReviewStatus,
} from "../../../../../services/review.service";

export const runtime = "nodejs";

type ReviewRouteContext = {
  params: Promise<{ id: string }>;
};

function isValidReviewId(id: string): boolean {
  return /^[a-f\d]{24}$/i.test(id);
}

export async function PATCH(
  request: NextRequest,
  context: ReviewRouteContext,
) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const { id } = await context.params;
    if (!isValidReviewId(id)) {
      return NextResponse.json({ error: "Review id is invalid." }, { status: 400 });
    }

    const body = await readJson(request);
    const { status } = reviewModerationSchema.parse(body);
    const review = await updateAcademyReviewStatus(id, status);
    if (!review) {
      return NextResponse.json({ error: "Review not found." }, { status: 404 });
    }
    return NextResponse.json({ review });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  context: ReviewRouteContext,
) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const { id } = await context.params;
    if (!isValidReviewId(id)) {
      return NextResponse.json({ error: "Review id is invalid." }, { status: 400 });
    }

    const deleted = await deleteAcademyReview(id);
    if (!deleted) {
      return NextResponse.json({ error: "Review not found." }, { status: 404 });
    }
    return NextResponse.json({ deleted: true });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
