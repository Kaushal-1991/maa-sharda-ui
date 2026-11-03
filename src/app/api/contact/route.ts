import { NextResponse } from "next/server";
import { apiErrorResponse, readJson } from "../../../lib/http";
import { contactMessageSchema } from "../../../lib/validation";
import { createContactMessage } from "../../../services/contact.service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    const payload = contactMessageSchema.parse(body);
    await createContactMessage(payload);

    return NextResponse.json(
      {
        success: true,
        message: "Your message was sent successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}
