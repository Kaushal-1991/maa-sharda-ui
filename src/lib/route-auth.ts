import type { NextRequest } from "next/server";
import { jsonNotAuthorized } from "./http";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "./auth";

export function requireAdminRequest(request: NextRequest) {
  const session = verifyAdminSessionToken(
    request.cookies.get(ADMIN_SESSION_COOKIE)?.value,
  );
  return session ? null : jsonNotAuthorized();
}
