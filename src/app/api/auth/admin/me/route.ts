import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "../../../../../lib/auth";

export const runtime = "nodejs";

export async function GET(_request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, user: { email: session.email } });
}
