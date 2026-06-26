import { MANIFEST_MODEL } from "@/lib/ai";
import { OPTIONS } from "@/lib/ingredients";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import type { IngredientCategory, IngredientsManifest } from "@/types";

const ALL_CATEGORY_IDS = Object.keys(OPTIONS).join(", ");

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  try {
    const { text } = await generateText({
      model: MANIFEST_MODEL,
      prompt: `The user wants to build: "${message}"

Available categories: ${ALL_CATEGORY_IDS}

Pick 4-6 most relevant category IDs for this type of app.
Reply with ONLY a JSON array of category IDs. No explanation, no markdown, no extra text.
Example reply: ["storage", "search", "payments", "database", "auth"]`,
      maxOutputTokens: 80,
    });

    const match = text.match(/\[[\s\S]*?\]/);
    const categoryIds: string[] = match ? JSON.parse(match[0]) : [];

    const manifest = buildManifest(categoryIds);
    return NextResponse.json(manifest);
  } catch (err) {
    console.error("Manifest failed:", err);
    return NextResponse.json({ appType: "unknown", categories: [] });
  }
}

function buildManifest(categoryIds: string[]): IngredientsManifest {
  const validIds = categoryIds.filter((id) => id in OPTIONS);

  const categories: IngredientCategory[] = validIds.map((id) => {
    const catId = id as keyof typeof OPTIONS;
    const options = OPTIONS[catId];
    return {
      id: catId,
      label: categoryLabel(id),
      description: categoryDescription(id),
      color: options[0].color,
      options,
    };
  });

  return { appType: "app", categories };
}

function categoryLabel(id: string): string {
  const labels: Record<string, string> = {
    storage: "File Storage",
    search: "Search",
    style: "Style",
    payments: "Payments",
    database: "Database",
    auth: "Auth",
    email: "Email",
    maps: "Maps",
    "ai-provider": "AI Provider",
  };
  return labels[id] ?? id;
}

function categoryDescription(id: string): string {
  const desc: Record<string, string> = {
    storage: "store and serve files",
    search: "let users search content",
    style: "visual feel of the app",
    payments: "handle money",
    database: "store your data",
    auth: "log users in",
    email: "send transactional email",
    maps: "show locations",
    "ai-provider": "add AI features",
  };
  return desc[id] ?? "";
}
