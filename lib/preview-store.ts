// In-memory store — sufficient for demo; survives the session, not restarts
const previews = new Map<string, string>();

export function storePreview(html: string): string {
  const id = crypto.randomUUID();
  previews.set(id, html);
  return id;
}

export function getStoredPreview(id: string): string | undefined {
  return previews.get(id);
}
