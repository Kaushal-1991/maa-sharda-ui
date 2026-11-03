import { NextResponse } from "next/server";
import { apiErrorResponse, readJson } from "../../../lib/http";
import { studentRegistrationSchema } from "../../../lib/validation";
import { registerStudent } from "../../../services/student.service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    const payload = studentRegistrationSchema.parse(body);
    const student = await registerStudent(payload);

    return NextResponse.json(
      {
        success: true,
        message: "Student registration was submitted successfully.",
        student,
      },
      { status: 201 },
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}
