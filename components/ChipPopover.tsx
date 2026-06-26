"use client";

import * as Popover from "@radix-ui/react-popover";
import type { Cauldron, IngredientOption } from "@/types";

interface Props {
  option: IngredientOption;
  cauldrons: Cauldron[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (cauldronId: string) => void;
  onNewCauldron: () => void;
  children: React.ReactNode;
}

export default function ChipPopover({
  cauldrons,
  open,
  onOpenChange,
  onSelect,
  onNewCauldron,
  children,
}: Props) {
  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          className="z-50 w-52 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl p-2 flex flex-col gap-1"
        >
          <p className="text-xs text-zinc-500 px-2 py-1 font-medium uppercase tracking-wider">
            Add to
          </p>
          {cauldrons.map((c) => (
            <button
              key={c.id}
              onClick={() => { onSelect(c.id); onOpenChange(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-200 hover:bg-zinc-800 transition-colors text-left"
            >
              <span className="text-base">🪄</span>
              {c.name}
            </button>
          ))}
          <div className="h-px bg-zinc-800 my-1" />
          <button
            onClick={() => { onNewCauldron(); onOpenChange(false); }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors text-left"
          >
            <span className="text-base">+</span>
            New Cauldron
          </button>
          <Popover.Arrow className="fill-zinc-700" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
