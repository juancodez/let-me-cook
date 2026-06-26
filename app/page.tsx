"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    router.push(`/builder?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen bg-zinc-950 px-6">
      <div className="w-full max-w-xl flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            🍳 Let Me Cook
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Describe what you want to build. We&apos;ll break it into ingredients,
            you compose the stack, Daytona builds it — multiple ways, simultaneously.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            autoFocus
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent);
              }
            }}
            placeholder="i wanna build a marketplace where designers sell templates"
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 px-4 py-3 text-base resize-none focus:outline-none focus:border-zinc-600 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="self-end px-6 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Let&apos;s cook →
          </button>
        </form>

        <p className="text-zinc-600 text-sm">
          Press Enter to start · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
