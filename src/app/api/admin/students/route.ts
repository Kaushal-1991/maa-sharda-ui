import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse, readJson } from "../../../../lib/http";
import { requireAdminRequest } from "../../../../lib/route-auth";
import {
  adminStudentUpdateSchema,
  registrationStatusSchema,
  studentRegistrationSchema,
} from "../../../../lib/validation";
import {
  deleteStudent,
  listStudents,
  registerStudent,
  updateStudentDetails,
  updateStudentStatus,
} from "../../../../services/student.service";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  const search = request.nextUrl.searchParams.get("search") ?? "";
  const students = await listStudents(search);
  return NextResponse.json({ students });
}

export async function POST(request: NextRequest) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const payload = studentRegistrationSchema.parse(await readJson(request));
    const student = await registerStudent(payload);
    return NextResponse.json({ student }, { status: 201 });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function PUT(request: NextRequest) {
  const unauthorized = requireAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const { id, ...payload } = adminStudentUpdateSchema.parse(await readJson(request));
    const student = await updateStudentDetails(id, payload);
    if (!student) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }
    return NextResponse.json({ student });
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
    const { id, ...payload } = body as { id?: string };
    const parsed = registrationStatusSchema.parse(payload);

    if (!id) {
      return NextResponse.json({ error: "Student id is required." }, { status: 400 });
    }

    const updated = await updateStudentStatus(id, parsed.registrationStatus);
    if (!updated) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }

    return NextResponse.json({ student: updated });
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
    return NextResponse.json({ error: "Student id is required." }, { status: 400 });
  }

  const removed = await deleteStudent(id);
  return NextResponse.json({ deleted: removed }, removed ? { status: 200 } : { status: 404 });
}
