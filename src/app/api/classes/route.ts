import { NextResponse } from "next/server";
import { getPublicClasses } from "../../../services/class.service";

export const runtime = "nodejs";

export async function GET() {
  const classes = await getPublicClasses();
  return NextResponse.json({ classes }, { status: 200 });
}
