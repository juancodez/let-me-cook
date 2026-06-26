"use client";

import { useState } from "react";
import type { Cauldron, IngredientCategory, IngredientOption } from "@/types";
import OptionChip from "./OptionChip";
import ChipPopover from "./ChipPopover";

interface Props {
  category: IngredientCategory;
  cauldrons: Cauldron[];
  onAddChip: (cauldronId: string, option: IngredientOption) => void;
  onNewCauldron: (option: IngredientOption) => void;
}

export default function IngredientBlock({ category, cauldrons, onAddChip, onNewCauldron }: Props) {
  const [activeOption, setActiveOption] = useState<IngredientOption | null>(null);

  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          {category.label}
        </span>
        <span className="text-xs text-zinc-600">{category.description}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.options.map((option) => (
          <div key={option.id} className="relative group inline-block">
            <ChipPopover
              option={option}
              cauldrons={cauldrons}
              open={activeOption?.id === option.id}
              onOpenChange={(open) => setActiveOption(open ? option : null)}
              onSelect={(cauldronId) => {
                onAddChip(cauldronId, option);
                setActiveOption(null);
              }}
              onNewCauldron={() => {
                onNewCauldron(option);
                setActiveOption(null);
              }}
            >
              <span>
                <OptionChip
                  option={option}
                  onClick={() => setActiveOption(activeOption?.id === option.id ? null : option)}
                />
              </span>
            </ChipPopover>

            {/* Hover tooltip */}
            <div
              className="
                absolute bottom-full left-0 mb-2 w-64 z-50
                rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl p-3
                opacity-0 group-hover:opacity-100
                pointer-events-none transition-opacity duration-150
              "
            >
              <p className="text-xs font-semibold text-zinc-200 mb-2">{option.tagline}</p>
              <div className="flex flex-col gap-1">
                {option.pros.map((p, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 text-xs leading-4 mt-px shrink-0">+</span>
                    <span className="text-xs text-zinc-300 leading-4">{p}</span>
                  </div>
                ))}
                {option.cons.map((c, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-red-400 text-xs leading-4 mt-px shrink-0">−</span>
                    <span className="text-xs text-zinc-500 leading-4">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
