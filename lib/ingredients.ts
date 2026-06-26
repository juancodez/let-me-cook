import type { CategoryId, IngredientOption } from "@/types";

export const APP_TYPES: Record<string, { required: CategoryId[]; optional: CategoryId[] }> = {
  marketplace: {
    required: ["storage", "search", "payments", "database"],
    optional: ["style", "auth", "email"],
  },
  "ai-saas": {
    required: ["ai-provider", "database", "auth"],
    optional: ["style", "email"],
  },
  "yoga-studio": {
    required: ["database", "auth"],
    optional: ["payments", "email", "maps", "style"],
  },
  portfolio: {
    required: ["style"],
    optional: ["email", "storage"],
  },
  ecommerce: {
    required: ["storage", "payments", "database", "search"],
    optional: ["style", "auth", "email"],
  },
};

export const OPTIONS: Record<CategoryId, IngredientOption[]> = {
  storage: [
    {
      id: "cloudinary",
      label: "Cloudinary",
      tagline: "Hosted image CDN, auto-resizes, free tier included",
      pros: ["Auto-resize & format conversion built in", "CDN delivery worldwide", "Free tier covers most MVPs"],
      cons: ["Costs rise fast with high traffic", "Vendor lock-in"],
      categoryId: "storage",
      color: "amber",
      npm: ["cloudinary"],
      envKeys: ["CLOUDINARY_URL"],
    },
    {
      id: "s3",
      label: "S3",
      tagline: "Amazon's storage — most scalable, pay per GB used",
      pros: ["Cheapest at scale", "Industry standard — every dev knows it", "Massive ecosystem of tools"],
      cons: ["No image transformation out of the box", "More config than Cloudinary"],
      categoryId: "storage",
      color: "amber",
      npm: ["@aws-sdk/client-s3", "@aws-sdk/s3-request-presigner"],
      envKeys: ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_REGION", "S3_BUCKET"],
    },
    {
      id: "supabase-storage",
      label: "Supabase Storage",
      tagline: "Built-in if you're already using Supabase — zero extra setup",
      pros: ["Zero extra setup if using Supabase DB", "Same dashboard as your database", "Generous free tier"],
      cons: ["Less powerful than Cloudinary or S3", "Tied to Supabase ecosystem"],
      categoryId: "storage",
      color: "amber",
      npm: ["@supabase/supabase-js"],
      envKeys: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
    },
  ],

  search: [
    {
      id: "algolia",
      label: "Algolia",
      tagline: "Best-in-class search UX, typo-tolerant, generous free tier",
      pros: ["Typo tolerance built in", "Great dashboard & analytics", "Works instantly, no schema config"],
      cons: ["Expensive at scale", "Paid plans needed for large datasets"],
      categoryId: "search",
      color: "blue",
      npm: ["algoliasearch"],
      envKeys: ["NEXT_PUBLIC_ALGOLIA_APP_ID", "NEXT_PUBLIC_ALGOLIA_SEARCH_KEY", "ALGOLIA_ADMIN_KEY"],
    },
    {
      id: "typesense",
      label: "Typesense",
      tagline: "Open-source Algolia alternative, can self-host, very fast",
      pros: ["Open source — self-host for free", "Fast and accurate", "Algolia-compatible API"],
      cons: ["Smaller community & ecosystem", "Self-hosting adds ops overhead"],
      categoryId: "search",
      color: "blue",
      npm: ["typesense"],
      envKeys: ["TYPESENSE_API_KEY", "TYPESENSE_HOST"],
    },
    {
      id: "postgres-fts",
      label: "Postgres Search",
      tagline: "Built-in full-text search — no extra service or cost",
      pros: ["No extra service or cost", "Already where your data lives", "Good enough for most apps"],
      cons: ["No typo tolerance", "Slower than dedicated search engines at scale"],
      categoryId: "search",
      color: "blue",
      npm: [],
      envKeys: [],
    },
  ],

  style: [
    {
      id: "minimal",
      label: "Minimal",
      tagline: "Clean whitespace, neutral colors, content-first",
      pros: ["Timeless — won't look dated", "Fast to build", "Content speaks for itself"],
      cons: ["Can feel generic", "Hard to stand out visually"],
      categoryId: "style",
      color: "violet",
      npm: [],
      envKeys: [],
    },
    {
      id: "flashy",
      label: "Flashy",
      tagline: "Bold gradients, vivid colors, high visual energy",
      pros: ["Memorable, high visual impact", "Great for consumer apps", "Grabs attention immediately"],
      cons: ["Can overwhelm content", "Harder to maintain visual consistency"],
      categoryId: "style",
      color: "violet",
      npm: [],
      envKeys: [],
    },
    {
      id: "balanced",
      label: "Balanced",
      tagline: "Professional with personality — works for most businesses",
      pros: ["Works for almost any business type", "Professional without being boring", "Easier to extend"],
      cons: ["Less distinctive than flashy", "Requires more design decisions upfront"],
      categoryId: "style",
      color: "violet",
      npm: [],
      envKeys: [],
    },
  ],

  payments: [
    {
      id: "stripe-connect",
      label: "Stripe Connect",
      tagline: "Marketplace payments — sellers get paid directly, you take a cut",
      pros: ["Sellers get paid directly to their bank", "Handles payouts, taxes & disputes for you", "Standard for two-sided marketplaces"],
      cons: ["More complex to set up", "Higher fees than plain Stripe"],
      categoryId: "payments",
      color: "emerald",
      npm: ["stripe", "@stripe/stripe-js"],
      envKeys: ["STRIPE_SECRET_KEY", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"],
    },
    {
      id: "stripe-checkout",
      label: "Stripe Checkout",
      tagline: "Simpler — you collect all money, pay out sellers yourself",
      pros: ["Simplest Stripe integration", "Prebuilt checkout UI", "5-minute setup"],
      cons: ["You must handle seller payouts manually", "Not ideal for true marketplaces"],
      categoryId: "payments",
      color: "emerald",
      npm: ["stripe", "@stripe/stripe-js"],
      envKeys: ["STRIPE_SECRET_KEY", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"],
    },
  ],

  database: [
    {
      id: "supabase",
      label: "Supabase",
      tagline: "Hosted Postgres with auth, real-time, and storage built in",
      pros: ["Postgres with real-time & auth included", "Excellent free tier", "Open source"],
      cons: ["Feels like overkill if you just need a DB", "Vendor lock-in risk"],
      categoryId: "database",
      color: "teal",
      npm: ["@supabase/supabase-js", "@supabase/ssr"],
      envKeys: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"],
    },
    {
      id: "planetscale",
      label: "PlanetScale",
      tagline: "Serverless MySQL — scales automatically, no connection limits",
      pros: ["Zero connection limits — great for serverless", "Schema branching workflow", "Generous free tier"],
      cons: ["MySQL only, not Postgres", "Less built-in ecosystem than Supabase"],
      categoryId: "database",
      color: "teal",
      npm: ["@planetscale/database"],
      envKeys: ["DATABASE_URL"],
    },
  ],

  auth: [
    {
      id: "clerk",
      label: "Clerk",
      tagline: "Drop-in auth UI with social login, orgs, and user management",
      pros: ["Beautiful prebuilt UI components", "Social login in minutes", "User management dashboard included"],
      cons: ["Paid after 10k monthly active users", "Less control over UI customization"],
      categoryId: "auth",
      color: "red",
      npm: ["@clerk/nextjs"],
      envKeys: ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"],
    },
    {
      id: "supabase-auth",
      label: "Supabase Auth",
      tagline: "Free, tightly integrated if you're already using Supabase",
      pros: ["Free and open source", "Tight integration with Supabase DB", "Row Level Security support"],
      cons: ["UI requires custom implementation", "More setup than Clerk"],
      categoryId: "auth",
      color: "red",
      npm: ["@supabase/ssr", "@supabase/supabase-js"],
      envKeys: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
    },
  ],

  email: [
    {
      id: "resend",
      label: "Resend",
      tagline: "Developer-friendly email — 3,000 free per month",
      pros: ["3,000 free emails/month", "React Email support", "Clean modern API"],
      cons: ["Newer — smaller community", "No marketing email features"],
      categoryId: "email",
      color: "pink",
      npm: ["resend"],
      envKeys: ["RESEND_API_KEY"],
    },
    {
      id: "sendgrid",
      label: "SendGrid",
      tagline: "Battle-tested, 100 free per day, great deliverability",
      pros: ["Battle-tested and reliable", "Rich analytics dashboard", "Great deliverability"],
      cons: ["Older API, less developer-friendly", "Dashboard is complex"],
      categoryId: "email",
      color: "pink",
      npm: ["@sendgrid/mail"],
      envKeys: ["SENDGRID_API_KEY"],
    },
  ],

  maps: [
    {
      id: "google-maps",
      label: "Google Maps",
      tagline: "Most familiar UX, rich features, free up to 200 requests/day",
      pros: ["Most familiar UX for users", "Rich: street view, places, directions", "Accurate data worldwide"],
      cons: ["Pricing adds up quickly past free tier", "Requires billing account from day 1"],
      categoryId: "maps",
      color: "orange",
      npm: ["@react-google-maps/api"],
      envKeys: ["NEXT_PUBLIC_GOOGLE_MAPS_KEY"],
    },
    {
      id: "mapbox",
      label: "Mapbox",
      tagline: "Fully customizable maps, generous free tier, beautiful defaults",
      pros: ["Fully customizable visual style", "50k free map loads/month", "Beautiful out-of-the-box defaults"],
      cons: ["Less data richness than Google", "Custom style setup takes time"],
      categoryId: "maps",
      color: "orange",
      npm: ["react-map-gl", "mapbox-gl"],
      envKeys: ["NEXT_PUBLIC_MAPBOX_TOKEN"],
    },
  ],

  "ai-provider": [
    {
      id: "openai",
      label: "OpenAI",
      tagline: "GPT-4o — industry standard, widest ecosystem",
      pros: ["Industry standard — widest ecosystem", "GPT-4o excels at most tasks", "Huge community & documentation"],
      cons: ["Higher cost per token than alternatives", "No self-hosting option"],
      categoryId: "ai-provider",
      color: "indigo",
      npm: ["openai"],
      envKeys: ["OPENAI_API_KEY"],
    },
    {
      id: "anthropic",
      label: "Anthropic",
      tagline: "Claude — best reasoning, longest context window",
      pros: ["Best reasoning & long context (200k tokens)", "Safer outputs, fewer hallucinations", "Excellent for complex tasks"],
      cons: ["Text only — no image generation", "Slightly higher latency"],
      categoryId: "ai-provider",
      color: "indigo",
      npm: ["@anthropic-ai/sdk"],
      envKeys: ["ANTHROPIC_API_KEY"],
    },
    {
      id: "groq",
      label: "Groq",
      tagline: "Fastest inference available — great for real-time features",
      pros: ["10x faster than OpenAI at inference", "Great for real-time AI features", "Generous free tier"],
      cons: ["Fewer model choices", "No fine-tuning option"],
      categoryId: "ai-provider",
      color: "indigo",
      npm: ["groq-sdk"],
      envKeys: ["GROQ_API_KEY"],
    },
  ],
};

export function resolveNpmDeps(optionIds: string[]): string[] {
  const packages = new Set<string>();
  for (const options of Object.values(OPTIONS)) {
    for (const option of options) {
      if (optionIds.includes(option.id)) {
        option.npm.forEach((pkg) => packages.add(pkg));
      }
    }
  }
  return Array.from(packages);
}

export function resolveEnvKeys(optionIds: string[]): string[] {
  const keys = new Set<string>();
  for (const options of Object.values(OPTIONS)) {
    for (const option of options) {
      if (optionIds.includes(option.id)) {
        option.envKeys.forEach((k) => keys.add(k));
      }
    }
  }
  return Array.from(keys);
}

export function findOption(optionId: string): IngredientOption | undefined {
  for (const options of Object.values(OPTIONS)) {
    const found = options.find((o) => o.id === optionId);
    if (found) return found;
  }
  return undefined;
}
