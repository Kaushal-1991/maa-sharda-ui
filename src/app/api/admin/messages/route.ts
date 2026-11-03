import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse, readJson } from "../../../../lib/http";
import { requireAdminRequest } from "../../../../lib/route-auth";
import { messageStatusSchema } from "../../../../lib/validation";
import {
  deleteContactMessage,
  listContactMessages,
  updateContactMessageStatus,
} from "../../../../services/contact.service";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  const messages = await listContactMessages();
  return NextResponse.json({ messages });
}

export async function PATCH(request: NextRequest) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Message id is required." }, { status: 400 });
    }

    const body = await readJson(request);
    const payload = messageStatusSchema.parse(body);
    const updated = await updateContactMessageStatus(id, payload.status);

    if (!updated) {
      return NextResponse.json({ error: "Message not found." }, { status: 404 });
    }

    return NextResponse.json({ message: updated });
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
    return NextResponse.json({ error: "Message id is required." }, { status: 400 });
  }

  const removed = await deleteContactMessage(id);
  return NextResponse.json({ deleted: removed }, removed ? { status: 200 } : { status: 404 });
}
