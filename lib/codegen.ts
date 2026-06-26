import { CODEGEN_MODEL } from "@/lib/ai";
import { generateText } from "ai";
import type { CauldronChip, GeneratedFile } from "@/types";

export async function generateIntegrationFiles(chips: CauldronChip[]): Promise<GeneratedFile[]> {
  const stackDescription = chips
    .map((c) => `${c.option.categoryId}: ${c.option.label} (packages: ${c.option.npm.join(", ") || "none"})`)
    .join("\n");

  const { text } = await generateText({
    model: CODEGEN_MODEL,
    prompt: `Generate service integration files for a Next.js marketplace app.

Stack:
${stackDescription}

Reply with ONLY a JSON object — no markdown, no explanation, no code fences:
{"files":[{"path":"lib/storage.ts","content":"..."},{"path":"lib/search.ts","content":"..."},{"path":"lib/payments.ts","content":"..."},{"path":"components/SearchBar.tsx","content":"..."},{"path":"app/api/upload/route.ts","content":"..."},{"path":"app/api/checkout/route.ts","content":"..."}]}

Rules:
- TypeScript only
- Use the correct npm packages for the chosen stack (already installed in the project)
- Use process.env for all secrets — never hardcode
- Each file must be complete and self-contained`,
    maxOutputTokens: 4000,
  });

  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return [];
    const parsed = JSON.parse(match[0]);
    return Array.isArray(parsed.files) ? parsed.files : [];
  } catch {
    console.error("Codegen parse failed. Raw output:", text.slice(0, 500));
    return [];
  }
}
