// Core data types — define these first, everything else depends on them

export type CategoryId =
  | "storage"
  | "search"
  | "style"
  | "payments"
  | "database"
  | "auth"
  | "email"
  | "maps"
  | "ai-provider";

export type ColorName =
  | "amber"
  | "blue"
  | "violet"
  | "emerald"
  | "teal"
  | "red"
  | "pink"
  | "orange"
  | "indigo";

export interface IngredientOption {
  id: string;
  label: string;
  tagline: string; // one line, plain English, no jargon
  pros: string[];
  cons: string[];
  categoryId: CategoryId;
  color: ColorName;
  npm: string[]; // packages to install in sandbox
  envKeys: string[]; // env vars the sandbox needs
}

export interface IngredientCategory {
  id: CategoryId;
  label: string;
  description: string; // plain English: "store your product images"
  color: ColorName;
  options: IngredientOption[];
}

export interface CauldronChip {
  option: IngredientOption;
  addedAt: number;
}

export type CauldronState =
  | "idle"     // chips added, not yet cooked
  | "cooking"  // Daytona sandbox building
  | "ready"    // preview URL available
  | "error";   // build failed

export interface Cauldron {
  id: string;
  name: string; // "Cauldron A", "Cauldron B"
  chips: CauldronChip[];
  state: CauldronState;
  previewUrl?: string;
  error?: string;
  createdAt: number;
}

export interface GeneratedFile {
  path: string;    // relative to project root, e.g. "lib/storage.ts"
  content: string;
}

export interface IngredientsManifest {
  appType: string;
  categories: IngredientCategory[];
}

export interface CookResult {
  cauldronId: string;
  previewUrl: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
