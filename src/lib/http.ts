import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ApiError(400, "Request body must be valid JSON.");
  }
}

export function apiErrorResponse(error: unknown): NextResponse {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Please correct the highlighted fields.",
        issues: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  if (error instanceof ApiError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  if (
    error instanceof Error &&
    "code" in error &&
    error.code === 11000
  ) {
    return NextResponse.json(
      { error: "A record with these details already exists." },
      { status: 409 },
    );
  }

  if (
    error instanceof Error &&
    error.name === "MongooseServerSelectionError"
  ) {
    console.error("MongoDB is unavailable:", error);
    return NextResponse.json(
      { error: "The data service is temporarily unavailable." },
      { status: 503 },
    );
  }

  console.error("Unhandled API error:", error);
  return NextResponse.json(
    { error: "An unexpected server error occurred." },
    { status: 500 },
  );
}

export function jsonNotAuthorized(): NextResponse {
  return NextResponse.json({ error: "Authentication required." }, { status: 401 });
}
