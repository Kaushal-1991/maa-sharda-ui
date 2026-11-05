import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse, readJson } from "../../../../lib/http";
import { requireAdminRequest } from "../../../../lib/route-auth";
import { reviewSettingsSchema } from "../../../../lib/validation";
import {
  getReviewSystemEnabled,
  listAcademyReviews,
  updateReviewSystemEnabled,
} from "../../../../services/review.service";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const [enabled, reviews] = await Promise.all([
      getReviewSystemEnabled(),
      listAcademyReviews(),
    ]);
    return NextResponse.json({ enabled, reviews });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function PATCH(request: NextRequest) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const body = await readJson(request);
    const { enabled } = reviewSettingsSchema.parse(body);
    const updated = await updateReviewSystemEnabled(enabled);
    return NextResponse.json({ enabled: updated });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
