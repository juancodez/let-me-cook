import { createOpenAI } from "@ai-sdk/openai";

export const featherless = createOpenAI({
  baseURL: "https://api.featherless.ai/v1",
  apiKey: process.env.FEATHERLESS_API_KEY!,
});

// Qwen2.5-7B: fast, live capacity, excellent JSON/instruction following, ~1 concurrency unit
// → we can run chat + manifest + codegen without hitting the plan limit
const MODEL = "Qwen/Qwen2.5-7B-Instruct";

export const CHAT_MODEL = featherless.chat(MODEL);
export const MANIFEST_MODEL = featherless.chat(MODEL);
export const CODEGEN_MODEL = featherless.chat(MODEL);
