import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse, readJson } from "../../../../lib/http";
import { requireAdminRequest } from "../../../../lib/route-auth";
import { academyClassSchema } from "../../../../lib/validation";
import {
  createClass,
  deleteClass,
  getAdminClasses,
  updateClass,
} from "../../../../services/class.service";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  const classes = await getAdminClasses();
  return NextResponse.json({ classes });
}

export async function POST(request: NextRequest) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const body = await readJson(request);
    const payload = academyClassSchema.parse(body);
    const created = await createClass(payload);
    return NextResponse.json({ class: created }, { status: 201 });
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
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Class id is required." }, { status: 400 });
    }

    const body = await readJson(request);
    const payload = academyClassSchema.parse(body);
    const updated = await updateClass(id, payload);

    if (!updated) {
      return NextResponse.json({ error: "Class not found." }, { status: 404 });
    }

    return NextResponse.json({ class: updated });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Class id is required." }, { status: 400 });
  }

  const removed = await deleteClass(id);
  return NextResponse.json({ deleted: removed }, removed ? { status: 200 } : { status: 404 });
}
