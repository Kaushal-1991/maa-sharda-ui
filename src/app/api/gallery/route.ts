import { NextRequest, NextResponse } from "next/server";
import { ApiError, apiErrorResponse } from "../../../lib/http";
import {
  isGalleryCategory,
  isGalleryMediaType,
  listGalleryMedia,
} from "../../../lib/gallery-storage";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const typeValue = request.nextUrl.searchParams.get("type") ?? "";
    if (!isGalleryMediaType(typeValue)) {
      throw new ApiError(400, "A valid gallery media type is required.");
    }

    const categoryValue = request.nextUrl.searchParams.get("category");
    if (categoryValue && !isGalleryCategory(categoryValue)) {
      throw new ApiError(400, "The gallery category is invalid.");
    }

    const limitValue = request.nextUrl.searchParams.get("limit");
    const limit = limitValue ? Number(limitValue) : 50;
    if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
      throw new ApiError(400, "The gallery limit must be between 1 and 50.");
    }

    const media = await listGalleryMedia(
      typeValue,
      categoryValue && isGalleryCategory(categoryValue)
        ? categoryValue
        : undefined,
      limit,
    );
    return NextResponse.json({ media });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
