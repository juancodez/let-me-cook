import { CODEGEN_MODEL } from "@/lib/ai";
import { getDesignTokens } from "@/lib/design-research";
import { generateText } from "ai";
import type { CauldronChip } from "@/types";

export async function generatePreviewHtml(
  chips: CauldronChip[],
  appDescription: string
): Promise<string> {
  const stack = chips.map((c) => c.option.label).join(" · ");
  const tokens = getDesignTokens(appDescription);

  const prompt = `You are an expert UI engineer. Generate a pixel-perfect, fully interactive single-page HTML app preview.

APP: "${appDescription}"
CATEGORY: ${tokens.category}
TECH STACK: ${stack}

DESIGN SYSTEM (from Mobbin research on ${tokens.referenceApps}):
- Background: ${tokens.palette.bg}
- Surface/cards: ${tokens.palette.surface}
- Borders: ${tokens.palette.border}
- Accent: ${tokens.palette.accent} (text on accent: ${tokens.palette.accentFg})
- Primary text: ${tokens.palette.text}
- Muted text: ${tokens.palette.textMuted}
- Success: ${tokens.palette.success} | Danger: ${tokens.palette.danger}
- Layout: ${tokens.layout}
- Hero typography: ${tokens.typography.heroSize}
- Section headings: ${tokens.typography.headingSize}
- Body text: ${tokens.typography.bodySize}

KEY COMPONENTS TO INCLUDE:
${tokens.keyComponents.map((c, i) => `${i + 1}. ${c}`).join("\n")}

MOCK DATA: ${tokens.mockDataHint}

RULES:
- ONE self-contained HTML file with inline <style> + <script> tags
- Include <script src="https://cdn.tailwindcss.com"></script> AND use Tailwind classes
- Also add custom CSS in <style> for any pixel-perfect details Tailwind can't express
- Use real image placeholders: https://picsum.photos/seed/{word}/{w}/{h}
- Add real JavaScript interactivity: click handlers, search filtering, tab switching, hover states
- App name in header should be derived from the app description (make it creative)
- Small footer with "Powered by ${stack}"
- Do NOT use external icon fonts — use inline SVG or emoji for icons
- Make it look like a REAL production app, not a demo. Dense, realistic, beautiful.

Return ONLY the HTML starting with <!DOCTYPE html>. No markdown. No explanation.`;

  const { text } = await generateText({
    model: CODEGEN_MODEL,
    prompt,
    maxOutputTokens: 3500,
  });

  return (
    text.match(/<!DOCTYPE html>[\s\S]*/i)?.[0] ??
    text.match(/<html[\s\S]*/i)?.[0] ??
    text
  );
}
