import { cookCauldron } from "@/lib/daytona";
import { NextRequest, NextResponse } from "next/server";
import type { CauldronChip } from "@/types";

export async function POST(req: NextRequest) {
  const { cauldronId, chips, appDescription } = await req.json() as {
    cauldronId: string;
    chips: CauldronChip[];
    appDescription: string;
  };

  if (!chips || chips.length === 0) {
    return NextResponse.json({ error: "No ingredients selected." }, { status: 400 });
  }

  try {
    const result = await cookCauldron(cauldronId, chips, appDescription ?? "an app");
    return NextResponse.json({ cauldronId, previewUrl: result.previewUrl });
  } catch (err) {
    console.error("Cook failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Preview generation failed." },
      { status: 500 }
    );
  }
}
