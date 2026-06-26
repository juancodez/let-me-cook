// Design tokens extracted from Mobbin research — each category maps to patterns
// observed in top-performing apps (banking: Starling/N26/Monzo, marketplace: Etsy/Vinted/Mercari,
// ecommerce: IKEA/UNIQLO/Anthropologie, saas: Mixpanel/Amplitude/Steep,
// food: DoorDash/Deliveroo/Yelp, fitness: Nike/Strava, social: Instagram/Airbnb)

export interface DesignTokens {
  category: string;
  palette: {
    bg: string;
    surface: string;
    border: string;
    accent: string;
    accentFg: string;
    text: string;
    textMuted: string;
    success: string;
    danger: string;
  };
  layout: string;
  typography: {
    heroSize: string;
    headingSize: string;
    bodySize: string;
    monoUse: string;
  };
  keyComponents: string[];
  mockDataHint: string;
  referenceApps: string;
}

const CATEGORIES: Record<string, DesignTokens> = {
  banking: {
    category: "Banking / Fintech",
    palette: {
      bg: "#0A1628",
      surface: "#0F2240",
      border: "#1E3A5F",
      accent: "#00D4AA",
      accentFg: "#000000",
      text: "#FFFFFF",
      textMuted: "#8BA3C1",
      success: "#00D4AA",
      danger: "#FF4D6D",
    },
    layout: "dark-card with large hero balance number at top, scrollable transaction list below, sticky bottom nav with 4 tabs",
    typography: {
      heroSize: "56px bold for balance, 14px label above",
      headingSize: "20px semibold for section titles",
      bodySize: "15px for transaction rows",
      monoUse: "monospace for account numbers and amounts",
    },
    keyComponents: [
      "Hero balance card: huge number (e.g. €4,321.00), small label 'Available balance', teal accent underline",
      "Quick actions row: Send, Receive, Pay, Top Up — icon + label below",
      "Transaction list: left colored circle icon (category), center merchant name + date, right ± amount in white/red",
      "Insight card: 'You spent 12% less this month' with spark line chart",
      "Bottom nav: Home, Cards, Pay, Analytics, Profile — active tab in teal",
    ],
    mockDataHint: "Use realistic bank transactions: Spotify €9.99, Rewe €47.20, Amazon €89.00, Salary €3200, etc. Show negative (red) and positive (green) amounts.",
    referenceApps: "Starling Bank, N26, Monzo, Revolut",
  },

  marketplace: {
    category: "Marketplace / C2C",
    palette: {
      bg: "#FFFFFF",
      surface: "#F7F7F7",
      border: "#E8E8E8",
      accent: "#09B585",
      accentFg: "#FFFFFF",
      text: "#1A1A1A",
      textMuted: "#757575",
      success: "#09B585",
      danger: "#E74040",
    },
    layout: "white background, top search bar with filter chips below, 2-column product grid with prices, bottom tab nav",
    typography: {
      heroSize: "28px bold for category name",
      headingSize: "16px semibold for section labels",
      bodySize: "14px for product titles, 16px bold for prices",
      monoUse: "none",
    },
    keyComponents: [
      "Search bar: rounded pill, grey bg, magnifier icon, 'Search for anything...'",
      "Filter chips row: scrollable horizontal, e.g. 'Women', 'Electronics', 'Home', active chip in accent color",
      "Product card: square image (ratio 1:1), price bold below, item title truncated, seller location small",
      "Favorite heart button: top-right of each card",
      "Category grid: 4-per-row icon+label quick categories above main listing",
    ],
    mockDataHint: "Use 8 items: vintage jacket €45, MacBook Pro €890, Levi's 501 €35, iPhone 14 €650, Nike Air Max €120, Coffee table €80, Leica Camera €1200, Yoga mat €25. Include seller names and locations.",
    referenceApps: "Vinted, Mercari, Etsy, Wallapop",
  },

  ecommerce: {
    category: "E-commerce / Retail",
    palette: {
      bg: "#FFFFFF",
      surface: "#F5F5F5",
      border: "#E0E0E0",
      accent: "#1A1A1A",
      accentFg: "#FFFFFF",
      text: "#1A1A1A",
      textMuted: "#757575",
      success: "#2ECC71",
      danger: "#E74C3C",
    },
    layout: "hero product image full-width top, product details below with price, variant selectors (size/color), sticky 'Add to Cart' CTA at bottom",
    typography: {
      heroSize: "28px bold for product name",
      headingSize: "18px semibold for sections",
      bodySize: "15px for description",
      monoUse: "none",
    },
    keyComponents: [
      "Product image: full-width hero with dot indicators for multiple images",
      "Price display: 24px bold, strike-through original price if on sale, sale badge",
      "Size/variant selector: pill buttons in a row, selected one filled black",
      "Quantity selector: - number + row",
      "Add to Cart: full-width black rounded button, high contrast",
      "Product details accordion: Description, Materials, Shipping — tap to expand",
      "Review summary: star rating + count, 3 sample review cards",
    ],
    mockDataHint: "Showcase a single product page. Pick a relevant product for the app context. Include 3 size options, price €79.99 (was €110), 4.7★ from 234 reviews.",
    referenceApps: "IKEA, UNIQLO, Anthropologie, Magnolia Market",
  },

  saas: {
    category: "SaaS / Dashboard",
    palette: {
      bg: "#F8F9FA",
      surface: "#FFFFFF",
      border: "#E9ECEF",
      accent: "#6366F1",
      accentFg: "#FFFFFF",
      text: "#111827",
      textMuted: "#6B7280",
      success: "#10B981",
      danger: "#EF4444",
    },
    layout: "fixed 240px left sidebar with nav sections, top header with search + user avatar, main content with KPI grid 3-across, chart below, data table at bottom",
    typography: {
      heroSize: "36px bold for KPI numbers with trend arrow",
      headingSize: "14px uppercase tracking-wide for section labels",
      bodySize: "14px for table rows and body text",
      monoUse: "monospace for data values",
    },
    keyComponents: [
      "Sidebar: logo at top, grouped nav items (Overview, Reports, Users, Settings), active item highlighted indigo pill",
      "KPI cards: 3 across, each with large metric number, % change badge (green/red), small sparkline",
      "Line chart: multi-series, legend at bottom, tooltip on hover, x-axis dates",
      "Data table: sortable columns, avatar + name for user rows, status badge, pagination",
      "Header: search bar center, notification bell, plan badge (Trial/Pro), user avatar",
    ],
    mockDataHint: "Use analytics-style data: 2,847 Active Users (+12.3%), €48,320 Revenue (+8.1%), 94.2% Uptime (-0.4%). Table shows last 5 users with email, plan, status, join date.",
    referenceApps: "Mixpanel, Amplitude, June, Steep, Linear",
  },

  food: {
    category: "Food Delivery",
    palette: {
      bg: "#FFFFFF",
      surface: "#F5F5F5",
      border: "#EBEBEB",
      accent: "#FF3008",
      accentFg: "#FFFFFF",
      text: "#1A1A1A",
      textMuted: "#757575",
      success: "#27AE60",
      danger: "#FF3008",
    },
    layout: "top greeting + address, hero search bar, featured restaurant carousel, category icons row, restaurant list cards with image left + details right",
    typography: {
      heroSize: "24px bold for section headings",
      headingSize: "18px semibold for restaurant names",
      bodySize: "14px for ETA, ratings, price range",
      monoUse: "none",
    },
    keyComponents: [
      "Delivery address bar: location pin + address + chevron at top",
      "Hero banner: promotional image with discount code overlay",
      "Category icons: horizontal scroll, circular icons — Pizza, Burger, Sushi, Thai, etc.",
      "Restaurant card: hero image top, restaurant name bold, rating star + count, ETA, delivery fee, dietary tags",
      "Order tracker: 4-step progress (Order placed → Preparing → On the way → Delivered) with checkmarks",
      "Cart sticky bar: bottom 'View cart (3 items) →' in accent red",
    ],
    mockDataHint: "Show 5 restaurants: Mario's Pizza (4.8★, 25min, Free delivery), Burger Barn (4.5★, 20min, €1.99), Sakura Sushi (4.9★, 35min, Free), Green Bowl (4.6★, 15min, €0.99), Spice House (4.7★, 30min, Free).",
    referenceApps: "DoorDash, Deliveroo, Uber Eats, Yelp",
  },

  fitness: {
    category: "Fitness / Health",
    palette: {
      bg: "#0A0A0A",
      surface: "#1A1A1A",
      border: "#2A2A2A",
      accent: "#FF6B35",
      accentFg: "#FFFFFF",
      text: "#FFFFFF",
      textMuted: "#A0A0A0",
      success: "#4CAF50",
      danger: "#F44336",
    },
    layout: "dark bg, today's workout hero card at top, activity ring/stats row, recent workouts list, bottom nav with 4 tabs",
    typography: {
      heroSize: "48px bold for big stats (steps, calories)",
      headingSize: "20px semibold for section titles",
      bodySize: "15px for workout names and descriptions",
      monoUse: "tabular-nums for timing displays",
    },
    keyComponents: [
      "Activity rings: 3 concentric rings (Move/Exercise/Stand) with % fill in vibrant colors",
      "Stats row: 3 metrics side by side — Steps (8,420), Calories (520 kcal), Distance (5.4 km)",
      "Workout card: background gradient + workout name + duration badge + difficulty tag",
      "Weekly bar chart: 7 bars Mon-Sun, today highlighted in accent color",
      "Start Workout CTA: full-width orange gradient button, workout name + duration",
    ],
    mockDataHint: "Today's goal 600 kcal. Workouts: Upper Body Strength (45 min, Hard), Morning Run 5K (28 min, Medium), Core & Flexibility (20 min, Easy). Steps: 8,420/10,000.",
    referenceApps: "Nike Training Club, Strava, Apple Fitness+, MyFitnessPal",
  },

  social: {
    category: "Social / Community",
    palette: {
      bg: "#FFFFFF",
      surface: "#FAFAFA",
      border: "#DBDBDB",
      accent: "#0095F6",
      accentFg: "#FFFFFF",
      text: "#000000",
      textMuted: "#737373",
      success: "#0095F6",
      danger: "#ED4956",
    },
    layout: "white feed with top nav (logo + icons), story circles row, infinite post feed with avatar + image + actions, bottom nav 5 tabs",
    typography: {
      heroSize: "none — no single hero",
      headingSize: "16px bold for usernames",
      bodySize: "14px for captions and comments",
      monoUse: "none",
    },
    keyComponents: [
      "Stories row: horizontal scroll, circular avatars with gradient border, username below",
      "Post card: header (avatar + username + 3-dot menu), square/portrait image, action bar (heart/comment/share/bookmark), like count, caption with hashtags",
      "Top nav: logo center, heart notifications left, DM icon right",
      "Explore grid: 3-column masonry with video/image thumbs",
      "Bottom nav: Home, Search, Create(+), Reels, Profile",
    ],
    mockDataHint: "Show 3 posts with photo placeholders (picsum.photos), realistic usernames, like counts (1.2K, 847, 3.4K), captions with hashtags. Story avatars: Your Story + 5 friends.",
    referenceApps: "Instagram, TikTok, Pinterest, Airbnb Experiences",
  },

  travel: {
    category: "Travel / Booking",
    palette: {
      bg: "#FFFFFF",
      surface: "#F2F6FF",
      border: "#E0E8FF",
      accent: "#003580",
      accentFg: "#FFFFFF",
      text: "#1A1A2E",
      textMuted: "#6B7280",
      success: "#009688",
      danger: "#E53935",
    },
    layout: "hero search form at top (From/To/Date/Guests), featured destinations grid below, horizontal property/hotel carousel, deal cards",
    typography: {
      heroSize: "32px bold for destination name",
      headingSize: "20px semibold for section titles",
      bodySize: "15px for property details",
      monoUse: "none",
    },
    keyComponents: [
      "Search form: date picker row, location input with pin icon, guest counter",
      "Destination card: full-bleed photo, city name + country overlay bottom-left, avg price bottom-right",
      "Property card: photo carousel dots, superhost badge, title, price/night, star rating",
      "Filter bar: Sort, Price, Type, Amenities — horizontal scroll pills",
      "Map toggle: 'Show map' button top-right of listing list",
    ],
    mockDataHint: "Show flights/hotels for Barcelona, Lisbon, Amsterdam. Prices from €89/night. Include Superhost badge, 4.9★ ratings, instant book badge.",
    referenceApps: "Airbnb, Booking.com, Google Flights, Kayak",
  },
};

const KEYWORD_MAP: Record<string, string[]> = {
  banking: ["bank", "finance", "fintech", "payment", "wallet", "money", "transfer", "account", "savings", "investment", "crypto", "neobank", "budget"],
  marketplace: ["marketplace", "second-hand", "secondhand", "used", "sell", "buy and sell", "c2c", "peer", "listing", "classified", "swap"],
  ecommerce: ["shop", "store", "ecommerce", "e-commerce", "retail", "product", "cart", "checkout", "clothing", "fashion", "apparel", "goods"],
  saas: ["dashboard", "analytics", "saas", "metrics", "admin", "crm", "erp", "management", "platform", "tool", "b2b", "enterprise", "reporting"],
  food: ["food", "delivery", "restaurant", "meal", "order", "recipe", "kitchen", "eat", "dining", "menu", "takeaway", "takeout", "grocery"],
  fitness: ["fitness", "workout", "gym", "health", "exercise", "training", "running", "yoga", "nutrition", "calories", "sport", "wellness"],
  social: ["social", "community", "feed", "follow", "post", "share", "profile", "network", "friends", "chat", "messaging", "forum"],
  travel: ["travel", "booking", "hotel", "flight", "airbnb", "accommodation", "trip", "vacation", "holiday", "destination", "tour"],
};

export function detectCategory(appDescription: string): string {
  const lower = appDescription.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [cat, keywords] of Object.entries(KEYWORD_MAP)) {
    scores[cat] = keywords.filter((kw) => lower.includes(kw)).length;
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return best[1] > 0 ? best[0] : "saas"; // default to saas (dashboard) if no match
}

export function getDesignTokens(appDescription: string): DesignTokens {
  const category = detectCategory(appDescription);
  return CATEGORIES[category];
}
