"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useState, Suspense } from "react";
import type { Cauldron, IngredientOption } from "@/types";
import CauldronComponent from "@/components/Cauldron";
import Chat from "@/components/Chat";

let cauldronCount = 0;
function makeCauldron(): Cauldron {
  cauldronCount++;
  const names = ["A", "B", "C", "D", "E", "F"];
  return {
    id: crypto.randomUUID(),
    name: `Cauldron ${names[(cauldronCount - 1) % names.length]}`,
    chips: [],
    state: "idle",
    createdAt: Date.now(),
  };
}

function BuilderInner() {
  const params = useSearchParams();
  const initialMessage = params.get("q") ?? "";

  const [cauldrons, setCauldrons] = useState<Cauldron[]>([makeCauldron(), makeCauldron()]);

  const addCauldron = useCallback(() => {
    setCauldrons((prev) => [...prev, makeCauldron()]);
  }, []);

  const addChip = useCallback((cauldronId: string, option: IngredientOption) => {
    setCauldrons((prev) =>
      prev.map((c) => {
        if (c.id !== cauldronId) return c;
        const already = c.chips.some((ch) => ch.option.id === option.id);
        if (already) return c;
        return { ...c, chips: [...c.chips, { option, addedAt: Date.now() }] };
      })
    );
  }, []);

  const addChipToNewCauldron = useCallback((option: IngredientOption) => {
    const newC = makeCauldron();
    newC.chips = [{ option, addedAt: Date.now() }];
    setCauldrons((prev) => [...prev, newC]);
  }, []);

  const removeChip = useCallback((cauldronId: string, optionId: string) => {
    setCauldrons((prev) =>
      prev.map((c) =>
        c.id === cauldronId
          ? { ...c, chips: c.chips.filter((ch) => ch.option.id !== optionId) }
          : c
      )
    );
  }, []);

  const cook = useCallback(async (cauldronId: string) => {
    setCauldrons((prev) =>
      prev.map((c) => c.id === cauldronId ? { ...c, state: "cooking" } : c)
    );

    try {
      const res = await fetch("/api/cook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cauldronId,
          chips: cauldrons.find((c) => c.id === cauldronId)?.chips ?? [],
          appDescription: initialMessage,
        }),
      });
      const data = await res.json();
      if (data.previewUrl) {
        setCauldrons((prev) =>
          prev.map((c) =>
            c.id === cauldronId
              ? { ...c, state: "ready", previewUrl: data.previewUrl }
              : c
          )
        );
      } else {
        throw new Error(data.error ?? "Unknown error");
      }
    } catch (err) {
      setCauldrons((prev) =>
        prev.map((c) =>
          c.id === cauldronId
            ? { ...c, state: "error", error: String(err) }
            : c
        )
      );
    }
  }, [cauldrons, initialMessage]);

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* LEFT — Cauldrons */}
      <div className="w-80 flex-shrink-0 flex flex-col gap-3 p-4 overflow-y-auto border-r border-zinc-800">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-semibold text-zinc-400">Cauldrons</span>
          <button
            onClick={addCauldron}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1 rounded-lg hover:bg-zinc-800"
          >
            + New
          </button>
        </div>
        {cauldrons.map((c) => (
          <CauldronComponent
            key={c.id}
            cauldron={c}
            onCook={cook}
            onRemoveChip={removeChip}
          />
        ))}
      </div>

      {/* RIGHT — Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
          <span className="text-lg">🍳</span>
          <span className="text-sm font-semibold text-zinc-300">Let Me Cook</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <Chat
            initialMessage={initialMessage}
            cauldrons={cauldrons}
            onAddChip={addChip}
            onNewCauldron={addChipToNewCauldron}
          />
        </div>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense>
      <BuilderInner />
    </Suspense>
  );
}
