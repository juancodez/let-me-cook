# Let Me Cook — Hackathon Pitch

> **Live demo:** https://let-me-cook-rust.vercel.app  
> **GitHub:** https://github.com/konatonski/LetMeCook  
> **Hackathon:** Daytona Hackathon — June 27, 2026

---

## The Problem

Every developer building a new app faces the same paralysis:

- **Which database?** Supabase, PlanetScale, MongoDB, Firebase…
- **Which auth?** Clerk, NextAuth, Supabase Auth, Auth0…
- **Which file storage?** S3, Cloudinary, Supabase Storage…

You pick one, build for two weeks, and wonder: *would the other option have been better?*  
There's no easy way to explore alternatives in parallel. You commit blind.

---

## The Solution — Let Me Cook

**Let Me Cook is a parallel app builder.** You describe what you want to build. The AI breaks it into ingredient categories. You assemble different stacks into "cauldrons." Hit Cook — Daytona builds each one simultaneously in an isolated sandbox and shows you a production-quality preview.

**Compare options. Cook in parallel. Pick the best.**

---

## How It Works (User Flow)

```
1. DESCRIBE  →  User types: "I want to build a marketplace for freelancers"
                         ↓
2. CHAT AI   →  "Great! You'll need: storage, auth, payments, search, maps..."
                AI surfaces ingredient chips for each category
                         ↓
3. ASSEMBLE  →  User clicks chips (e.g. "Stripe" + "Supabase" + "Algolia")
                Drops them into Cauldron A
                Different combo (e.g. "Clerk" + "PlanetScale") into Cauldron B
                         ↓
4. COOK      →  Click ▶ Cook on each cauldron
                Daytona spins up an isolated sandbox per cauldron
                AI generates a pixel-perfect HTML preview (styled from real app research)
                         ↓
5. COMPARE   →  Both previews open side by side
                User sees exactly how each stack would look and feel
```

---

## Key Features

### 1. Ingredient Chips with Guided Decision-Making
Each ingredient option (e.g. Algolia vs. Typesense vs. Postgres Search) comes with:
- **Tagline** — one-line summary
- **Pros** — what it's great at
- **Cons** — where it falls short
- **Color-coded** by category (payments = green, storage = amber, auth = red, etc.)

### 2. Parallel Cauldrons = Parallel Daytona Sandboxes
Each cauldron maps 1:1 to a **Daytona sandbox** — a real isolated environment. You can run up to 6 cauldrons simultaneously. Each one auto-deletes after 24 hours.

### 3. Mobbin-Powered AI Previews
Previews aren't generic mockups. Before generating HTML, the system:
1. Detects the app category (banking, marketplace, SaaS, food delivery, etc.)
2. Pulls design tokens from Mobbin research on top apps (Stripe, N26, DoorDash, Amplitude...)
3. Generates a real, dark-themed, interactive HTML preview styled like a production app

### 4. No Warning Pages
Preview HTML is served through our own route (`/preview/[id]`) — no Daytona warning page, no extra headers needed.

---

## Architecture

```
User Browser
     │
     ├── POST /api/chat      → Featherless AI (Qwen2.5-7B) — streaming chat
     ├── POST /api/manifest  → Featherless AI — extracts ingredient categories
     └── POST /api/cook
              │
              ├── 1. Detect app category (banking/marketplace/saas/food/fitness...)
              ├── 2. Look up Mobbin design tokens for that category
              ├── 3. Generate HTML preview via AI (color palette, layout, components)
              ├── 4. Store HTML in memory → serve via /preview/[id]
              └── 5. Daytona.create() → sandbox with python3 HTTP server
```

**Key files:**
| File | What it does |
|------|-------------|
| `lib/design-research.ts` | Mobbin-derived design tokens per app category |
| `lib/preview.ts` | AI prompt builder — injects design tokens for rich HTML |
| `lib/daytona.ts` | Daytona SDK wrapper — creates sandbox, uploads HTML, starts server |
| `app/api/cook/route.ts` | Cook endpoint |
| `app/api/chat/route.ts` | Streaming chat |
| `app/api/manifest/route.ts` | Ingredient category extraction |
| `components/Cauldron.tsx` | Cauldron UI — cooking progress, preview link |
| `components/IngredientBlock.tsx` | Chip UI — pros/cons tooltip on hover |

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | **Next.js 16** (App Router) | API routes + streaming + React UI |
| AI — Chat | **Featherless AI** (Qwen2.5-7B) | Fast, cheap, ~1 concurrency unit |
| AI — Preview | **Featherless AI** (Qwen2.5-7B) | Same model — rich HTML generation |
| Sandboxes | **Daytona SDK** | Isolated, auto-delete, real environments |
| Design Research | **Mobbin MCP** | Real app screen analysis for design tokens |
| Styling | **Tailwind CSS v4** | Utility-first, dark theme |
| Deploy | **Vercel** | Edge-ready, zero-config Next.js |
| Language | **TypeScript** | End-to-end type safety |

---

## Why Daytona?

> *The hackathon is a Daytona hackathon — this section is key.*

1. **True isolation** — each cauldron is a separate environment. No port conflicts, no shared state.
2. **Auto-cleanup** — `autoDeleteInterval: 1440` means each sandbox auto-deletes after 24 hours. No manual cleanup.
3. **Language-agnostic** — we use TypeScript sandboxes, but the same pattern works for any stack.
4. **File upload API** — `sandbox.fs.uploadFile()` lets us push our AI-generated HTML directly into the sandbox.
5. **Process API** — `sandbox.process.executeSessionCommand()` starts the static file server inside the sandbox without SSH.

```typescript
// Creating a Daytona sandbox in 5 lines
const sandbox = await daytona.create({
  language: "typescript",
  autoStopInterval: 30,     // pause if idle for 30 min
  autoDeleteInterval: 1440, // auto-delete after 24h
});
await sandbox.fs.uploadFile(Buffer.from(html, "utf-8"), "index.html");
await sandbox.process.executeSessionCommand(sessionId, {
  command: "python3 -m http.server 3000",
  runAsync: true,
});
```

---

## Slides Structure (Suggested)

1. **Hook** — "You've been choosing your stack wrong."
2. **Problem** — The paralysis of tech stack decisions. Show the choice explosion.
3. **Solution** — Live demo of Let Me Cook (describe → chips → cauldron → cook → preview)
4. **Magic moment** — Click Cook. Watch the cauldron bubble. Preview appears. It looks real.
5. **How it works** — Architecture diagram (simple version from above)
6. **Daytona slide** — Why sandboxes matter. How we use Daytona. Code snippet.
7. **Design detail** — Mobbin-powered previews. Show banking vs marketplace vs SaaS preview.
8. **Team & next steps**

---

## Demo Script

1. Open https://let-me-cook-rust.vercel.app
2. Type: *"I want to build a food delivery app for restaurants"*
3. Hit Enter — chat responds, ingredient chips appear
4. Click **Stripe** chip → it pops into Cauldron A
5. Click **Supabase** chip → added to Cauldron A
6. Click **Algolia** chip → added to Cauldron A
7. Click **+ New** cauldron — creates Cauldron B
8. Click **PlanetScale** → Cauldron B. Click **Clerk** → Cauldron B
9. Click **▶ Cook** on Cauldron A → cooking animation starts
10. Click **▶ Cook** on Cauldron B → both cooking simultaneously
11. Preview URLs appear → click **Open Preview** — real food-delivery UI appears

---

## Ingredient Categories

| Category | Color | Options |
|----------|-------|---------|
| Database | Teal | Supabase, PlanetScale |
| Auth | Red | Clerk, Supabase Auth |
| Payments | Emerald | Stripe Connect, Stripe Checkout |
| File Storage | Amber | Cloudinary, S3, Supabase Storage |
| Search | Blue | Algolia, Typesense, Postgres FTS |
| Email | Purple | Resend, SendGrid |
| Maps | Orange | Google Maps, Mapbox |
| Realtime | Sky | Pusher, Supabase Realtime |
| Analytics | Violet | Mixpanel, PostHog |

---

## Design Research — App Categories

The preview generator knows the visual language of 8 app categories:

| Category | Reference Apps | Key Design Signal |
|----------|---------------|-------------------|
| Banking | N26, Starling, Monzo | Dark teal (#0A1628), large balance hero |
| Marketplace | Vinted, Mercari, Etsy | White bg, 2-col product grid, filter chips |
| E-commerce | IKEA, UNIQLO, Anthropologie | Full-width hero image, black CTA button |
| SaaS | Mixpanel, Amplitude, Linear | Left sidebar, KPI cards, line charts |
| Food Delivery | DoorDash, Deliveroo, Yelp | Red accent, restaurant cards, order tracking |
| Fitness | Nike, Strava, Apple Fitness | Dark bg, orange accent, activity rings |
| Social | Instagram, Pinterest | White feed, story circles, engagement metrics |
| Travel | Airbnb, Booking.com | Blue accent (#003580), hero search form |

---

## Env Variables Needed

```bash
DAYTONA_API_KEY=...      # From daytona.io dashboard
FEATHERLESS_API_KEY=...  # From featherless.ai/account
```

---

## What's Next (Post-Hackathon)

- **Real sandbox URLs** — Let users open the Daytona-served URL directly (currently proxied through our domain)
- **Drag-and-drop chips** — drag from chat into any cauldron
- **Generated boilerplate** — instead of just an HTML preview, generate a full Next.js project inside the sandbox
- **Side-by-side compare** — render two previews next to each other
- **Export cauldron** — download the generated project as a ZIP
