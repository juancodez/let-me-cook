"use client";

import { useEffect, useRef, useState } from "react";
import type { Cauldron, ChatMessage, IngredientOption, IngredientsManifest } from "@/types";
import IngredientBlock from "./IngredientBlock";
import CookingBar from "./CookingBar";

type LoadPhase = "thinking" | "ingredients" | "done";

interface Message extends ChatMessage {
  manifest?: IngredientsManifest;
  phase?: LoadPhase;
}

interface Props {
  initialMessage: string;
  cauldrons: Cauldron[];
  onAddChip: (cauldronId: string, option: IngredientOption) => void;
  onNewCauldron: (option: IngredientOption) => void;
}

export default function Chat({ initialMessage, cauldrons, onAddChip, onNewCauldron }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    if (initialMessage) sendMessage(initialMessage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    const userMsg: Message = { role: "user", content: text };
    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    // Add user message + empty assistant slot in "thinking" phase
    const assistantIdx = messages.length + 1;
    setMessages((prev) => [
      ...prev,
      userMsg,
      { role: "assistant", content: "", phase: "thinking" },
    ]);
    setBusy(true);

    try {
      // Phase 1 — stream prose
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Chat API error: ${res.status}`);
      }
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accum = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accum += decoder.decode(value, { stream: true });
        const snap = accum;
        setMessages((prev) => {
          const updated = [...prev];
          updated[assistantIdx] = { ...updated[assistantIdx], content: snap };
          return updated;
        });
      }

      // Brief pause to ensure the 70B stream fully releases before the 3B manifest call
      await new Promise((r) => setTimeout(r, 800));

      // Phase 2 — fetch manifest
      setMessages((prev) => {
        const updated = [...prev];
        updated[assistantIdx] = { ...updated[assistantIdx], phase: "ingredients" };
        return updated;
      });

      const mRes = await fetch("/api/manifest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const manifest: IngredientsManifest = await mRes.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[assistantIdx] = {
          ...updated[assistantIdx],
          manifest: manifest.categories.length > 0 ? manifest : undefined,
          phase: "done",
        };
        return updated;
      });
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[assistantIdx] = {
          ...updated[assistantIdx],
          content: "Something went wrong. Try again.",
          phase: "done",
        };
        return updated;
      });
    } finally {
      setBusy(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    sendMessage(text);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-5 px-5 py-5">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            {/* Bubble */}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-zinc-700 text-zinc-100"
                  : "bg-zinc-900 text-zinc-200 border border-zinc-800"
              }`}
            >
              {msg.content || (
                msg.phase === "thinking" && (
                  <span className="text-zinc-500 italic">I am cooking...</span>
                )
              )}
            </div>

            {/* Cooking bar — only on assistant messages still loading */}
            {msg.role === "assistant" && msg.phase && msg.phase !== "done" && (
              <div className="w-full max-w-[85%]">
                <CookingBar phase={msg.phase} />
              </div>
            )}

            {/* Ingredient chips — appear when manifest is ready */}
            {msg.role === "assistant" && msg.manifest && (
              <div className="w-full mt-2 flex flex-col gap-4">
                {msg.manifest.categories.map((cat) => (
                  <IngredientBlock
                    key={cat.id}
                    category={cat}
                    cauldrons={cauldrons}
                    onAddChip={onAddChip}
                    onNewCauldron={onNewCauldron}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 px-4 py-3 border-t border-zinc-800"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
          placeholder="Ask a follow-up or describe another app…"
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || busy}
          className="px-4 py-2.5 rounded-xl bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
