import { NextResponse } from "next/server";
import { apiErrorResponse } from "../../../../lib/http";
import { getGalleryFile } from "../../../../lib/gallery-storage";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const media = await getGalleryFile(id);
    if (!media) {
      return NextResponse.json({ error: "Gallery media not found." }, { status: 404 });
    }

    const chunks: Buffer[] = [];
    for await (const chunk of media.stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    const content = Buffer.concat(chunks);
    return new NextResponse(new Uint8Array(content), {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Disposition": `inline; filename="${media.record.name}"`,
        "Content-Length": content.byteLength.toString(),
        "Content-Type": media.record.mimeType,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
