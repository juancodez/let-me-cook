import { getStoredPreview } from "@/lib/preview-store";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const html = getStoredPreview(id);

  if (!html) {
    return new Response("Preview not found or expired.", { status: 404 });
  }

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
