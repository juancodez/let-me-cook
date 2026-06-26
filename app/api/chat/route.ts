import { CHAT_MODEL } from "@/lib/ai";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the AI inside "Let Me Cook", a parallel app builder.
The user will describe an app idea. Reply with exactly 1 sentence confirming you understand what they want to build.
Be warm and direct. Stop after one sentence. No lists, no technologies, no markdown.`;

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  const messages = [
    ...(history ?? []),
    { role: "user" as const, content: message },
  ];

  try {
    const result = streamText({
      model: CHAT_MODEL,
      system: SYSTEM_PROMPT,
      messages,
      maxOutputTokens: 60,
    });

    return result.toTextStreamResponse({
      headers: {
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Chat API error:", msg);
    return NextResponse.json({ error: msg }, { status: 503 });
  }
}
