"use client";

import { useEffect, useState } from "react";

type Phase = "thinking" | "ingredients" | "done";

interface Props {
  phase: Phase;
}

const PHASE_LABELS: Record<Phase, string> = {
  thinking: "🍳 I am cooking...",
  ingredients: "🔍 Finding your ingredients...",
  done: "✅ Ready",
};

export default function CookingBar({ phase }: Props) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (phase === "thinking") {
      // Animate to 65% over 4s
      setWidth(0);
      const t = setTimeout(() => setWidth(65), 50);
      return () => clearTimeout(t);
    }
    if (phase === "ingredients") {
      // Jump to 85%
      setWidth(85);
    }
    if (phase === "done") {
      // Complete
      setWidth(100);
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className="flex flex-col gap-1.5 mt-2 w-full">
      <span className="text-xs text-zinc-500 animate-pulse">
        {PHASE_LABELS[phase]}
      </span>
      <div className="h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500"
          style={{
            width: `${width}%`,
            transition: phase === "thinking"
              ? "width 4s cubic-bezier(0.4, 0, 0.2, 1)"
              : "width 0.4s ease-out",
          }}
        />
      </div>
    </div>
  );
}
