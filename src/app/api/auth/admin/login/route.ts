import { NextResponse } from "next/server";
import { ApiError, apiErrorResponse, readJson } from "../../../../../lib/http";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminCookieOptions,
  getConfiguredAdminEmail,
  verifyAdminPassword,
} from "../../../../../lib/auth";
import { adminLoginSchema } from "../../../../../lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    const payload = adminLoginSchema.parse(body);
    const email = payload.email.trim().toLowerCase();

    if (email !== getConfiguredAdminEmail()) {
      throw new ApiError(401, "Invalid email or password.");
    }

    if (!(await verifyAdminPassword(payload.password))) {
      throw new ApiError(401, "Invalid email or password.");
    }

    const response = NextResponse.json({ success: true, email });
    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      createAdminSessionToken(email),
      getAdminCookieOptions(),
    );

    return response;
  } catch (error) {
    return apiErrorResponse(error);
  }
}
