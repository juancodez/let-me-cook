"use client";

import { chipClasses } from "@/lib/colors";
import type { Cauldron as CauldronType } from "@/types";

interface Props {
  cauldron: CauldronType;
  onCook: (cauldronId: string) => void;
  onRemoveChip: (cauldronId: string, optionId: string) => void;
}

const STATE_LABELS = {
  idle: null,
  cooking: "🔥 Cooking…",
  ready: "✅ Ready",
  error: "❌ Failed",
};

export default function Cauldron({ cauldron, onCook, onRemoveChip }: Props) {
  const canCook = cauldron.state === "idle" && cauldron.chips.length > 0;

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-200">{cauldron.name}</span>
        {STATE_LABELS[cauldron.state] && (
          <span className="text-xs text-zinc-400">{STATE_LABELS[cauldron.state]}</span>
        )}
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
        {cauldron.chips.length === 0 && (
          <span className="text-xs text-zinc-600 self-center">
            Click ingredients in chat to add them here
          </span>
        )}
        {cauldron.chips.map((chip) => (
          <button
            key={`${chip.option.id}-${chip.addedAt}`}
            onClick={() => onRemoveChip(cauldron.id, chip.option.id)}
            title="Remove"
            className={`
              inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border
              ${chipClasses(chip.option.color)}
              hover:opacity-70 transition-opacity
            `}
          >
            {chip.option.label}
            <span className="opacity-60 ml-0.5">×</span>
          </button>
        ))}
      </div>

      {/* Cook button */}
      {cauldron.state === "idle" && (
        <button
          onClick={() => onCook(cauldron.id)}
          disabled={!canCook}
          className="mt-1 flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-200 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          ▶ Cook
        </button>
      )}

      {/* Cooking progress */}
      {cauldron.state === "cooking" && (
        <div className="flex flex-col gap-1.5 mt-1">
          {[
            "Designing your app…",
            "Generating preview with AI…",
            "Spinning up Daytona sandbox…",
            "Uploading and serving…",
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="animate-pulse">▸</span>
              {step}
            </div>
          ))}
        </div>
      )}

      {/* Preview ready */}
      {cauldron.state === "ready" && cauldron.previewUrl && (
        <div className="flex flex-col gap-2 mt-1">
          <p className="text-xs text-zinc-600 font-mono truncate">{cauldron.previewUrl}</p>
          <a
            href={cauldron.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-colors"
          >
            ▶ Open Preview
          </a>
        </div>
      )}

      {/* Error */}
      {cauldron.state === "error" && (
        <p className="text-xs text-red-400 mt-1">{cauldron.error ?? "Preview generation failed."}</p>
      )}
    </div>
  );
}
