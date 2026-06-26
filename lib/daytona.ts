import { Daytona } from "@daytona/sdk";
import type { CauldronChip } from "@/types";
import { generatePreviewHtml } from "./preview";
import { storePreview } from "./preview-store";

export async function cookCauldron(
  cauldronId: string,
  chips: CauldronChip[],
  appDescription: string
): Promise<{ previewUrl: string }> {
  const daytona = new Daytona();

  // 1. Generate the HTML preview with AI
  const html = await generatePreviewHtml(chips, appDescription);

  // 2. Store it under a UUID so our own route can serve it (no Daytona warning page)
  const previewId = storePreview(html);

  // 3. Spin up a Daytona sandbox (isolated environment, auto-deletes after 24h)
  const sandbox = await daytona.create({
    language: "typescript",
    autoStopInterval: 30,
    autoDeleteInterval: 1440,
  });

  try {
    // 4. Upload the HTML to the Daytona sandbox
    await sandbox.fs.uploadFile(Buffer.from(html, "utf-8"), "index.html");

    // 5. Start a static file server inside the sandbox
    const sessionId = `serve-${cauldronId}`;
    await sandbox.process.createSession(sessionId);
    await sandbox.process.executeSessionCommand(sessionId, {
      command: "python3 -m http.server 3000",
      runAsync: true,
    });

    // 6. Return our own preview URL (served from in-memory store, no Daytona warning page)
    return { previewUrl: `/preview/${previewId}` };
  } catch (err) {
    try { await daytona.delete(sandbox); } catch { /* best-effort cleanup */ }
    throw err;
  }
}
