"use client";

import { useEffect, useRef, useState } from "react";
import type { Cauldron, ChatMessage, IngredientOption, IngredientsManifest } from "@/types";
import IngredientBlock from "./IngredientBlock";
import CookingBar from "./CookingBar";
import { OPTIONS } from "@/lib/ingredients";

type LoadPhase = "thinking" | "ingredients" | "done";

interface Message extends ChatMessage {
  id: string;
  manifest?: IngredientsManifest;
  phase?: LoadPhase;
}

interface Props {
  initialMessage: string;
  cauldrons: Cauldron[];
  onAddChip: (cauldronId: string, option: IngredientOption) => void;
  onNewCauldron: (option: IngredientOption) => void;
}

// Client-side keyword fallback — always produces chips even if manifest API fails
function fallbackManifest(text: string): IngredientsManifest {
  const lower = text.toLowerCase();
  const KEYWORD_MAP: Record<string, string[]> = {
    storage:      ["image", "photo", "file", "upload", "media", "video", "picture"],
    search:       ["search", "find", "filter", "browse", "discover"],
    payments:     ["pay", "payment", "checkout", "buy", "sell", "money", "stripe", "subscription"],
    database:     ["data", "store", "save", "user", "account", "profile", "record"],
    auth:         ["login", "sign", "auth", "user", "account", "register", "member"],
    email:        ["email", "notify", "notification", "newsletter", "contact", "message"],
    maps:         ["map", "location", "address", "delivery", "restaurant", "nearby", "local"],
    "ai-provider":["ai", "gpt", "openai", "claude", "llm", "generate", "chat", "assistant"],
  };

  const scored = Object.entries(KEYWORD_MAP)
    .map(([id, keywords]) => ({
      id,
      score: keywords.filter((kw) => lower.includes(kw)).length,
    }))
    .filter((e) => e.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((e) => e.id);

  // Always include database + auth as defaults if nothing matched
  const ids = scored.length > 0 ? scored : ["database", "auth", "storage"];

  const categories = ids
    .filter((id) => id in OPTIONS)
    .map((id) => {
      const catId = id as keyof typeof OPTIONS;
      const opts = OPTIONS[catId];
      return {
        id: catId,
        label: labelFor(id),
        description: descFor(id),
        color: opts[0].color,
        options: opts,
      };
    });

  return { appType: "app", categories };
}

function labelFor(id: string) {
  const m: Record<string, string> = {
    storage: "File Storage", search: "Search", style: "Style",
    payments: "Payments", database: "Database", auth: "Auth",
    email: "Email", maps: "Maps", "ai-provider": "AI Provider",
  };
  return m[id] ?? id;
}

function descFor(id: string) {
  const m: Record<string, string> = {
    storage: "store and serve files", search: "let users search content",
    style: "visual feel of the app", payments: "handle money",
    database: "store your data", auth: "log users in",
    email: "send transactional email", maps: "show locations",
    "ai-provider": "add AI features",
  };
  return m[id] ?? "";
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
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };
    const assistantId = crypto.randomUUID();
    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: "assistant", content: "", phase: "thinking" },
    ]);
    setBusy(true);

    // helper: update the assistant message by ID (safe regardless of array length)
    const update = (patch: Partial<Message>) =>
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, ...patch } : m))
      );

    try {
      // Phase 1 — stream chat response
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Chat error ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accum = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accum += decoder.decode(value, { stream: true });
        update({ content: accum });
      }

      // Phase 2 — fetch ingredient manifest
      update({ phase: "ingredients" });

      let manifest: IngredientsManifest | null = null;

      try {
        const mRes = await fetch("/api/manifest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });

        if (mRes.ok) {
          const data: IngredientsManifest = await mRes.json();
          if (data.categories && data.categories.length > 0) {
            manifest = data;
          }
        }
      } catch {
        // manifest API failed — fall through to client fallback below
      }

      // Always show chips: use API result or keyword fallback
      if (!manifest) {
        manifest = fallbackManifest(text);
      }

      update({ manifest, phase: "done" });
    } catch (err) {
      console.error(err);
      update({ content: "Something went wrong. Try again.", phase: "done" });
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
        {messages.map((msg) => (
          <div
            key={msg.id}
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

            {/* Loading bar — only while thinking or fetching ingredients */}
            {msg.role === "assistant" && msg.phase && msg.phase !== "done" && (
              <div className="w-full max-w-[85%]">
                <CookingBar phase={msg.phase} />
              </div>
            )}

            {/* Ingredient chips */}
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
