"use client";

import { chipClasses } from "@/lib/colors";
import type { IngredientOption } from "@/types";

interface Props {
  option: IngredientOption;
  onClick: (option: IngredientOption) => void;
  dimmed?: boolean;
}

export default function OptionChip({ option, onClick, dimmed }: Props) {
  return (
    <button
      onClick={() => onClick(option)}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
        border transition-all cursor-pointer select-none
        hover:scale-105 hover:shadow-md active:scale-95
        ${chipClasses(option.color)}
        ${dimmed ? "opacity-40" : "opacity-100"}
      `}
    >
      {option.label}
    </button>
  );
}
