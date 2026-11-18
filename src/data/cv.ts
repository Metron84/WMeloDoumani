// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH — melodoumani.com
// Published figures are static. The work-section counters read `channels` below.
// Do not replace them with Supabase channel_stats or another live feed.
// ---------------------------------------------------------------------------

export const identity = {
  name: "W. Melo Doumani",
  role: "Media creator, founder of The Reflective Football, and builder of custom AI tools and apps",
  location: "Dubai, United Arab Emirates",
  visa: "UAE Golden Visa holder",
  summary:
    "Twenty years writing about football, then I built the thing I wanted to watch. I direct and cut the films, run the strategy work, and ship the software. All of it out of Dubai.",
  openTo:
    "Open to roles in content leadership, communications and sports media.",
  email: "doumaniw@gmail.com",
  phone: "+971 52 120 4324",
  cvFile: "/melo-doumani-cv.pdf",
};

// ---------------------------------------------------------------------------
// THE VISUAL PORTFOLIO — shown before any numbers
// ---------------------------------------------------------------------------

export const reel = {
  label: "Promo",
  title: "Football is nothing without the fans",
  line: "The Reflective Football, filmed across Dubai since May 2026.",
  href: "https://www.youtube.com/watch?v=nJF76kRqF80",
  image: "/films/promo.jpg",
  // Local muted loop (same promo as thereflectivefootball.com).
  // Sound toggle is handled by Showreel.
  video: "/video/promo.mp4",
};

export type Channel = {
  key: "youtube" | "instagram" | "website";
  label: string;
  headline: string;
  headlineNote: string;
  points: string[];
  organic: string;
  href: string;
  cta: string;
};

export const channels: Channel[] = [
  {
    key: "youtube",
    label: "YouTube",
    headline: "104,000+",
    headlineNote: "views since launch",
    points: ["1,670+ hours watched", "720,000+ impressions"],
    organic: "Zero paid promotion, every view organic",
    href: "https://www.youtube.com/@thereflectivefootball",
    cta: "Visit channel",
  },
  {
    key: "instagram",
    label: "Instagram",
    headline: "656,000+",
    headlineNote: "views in 180 days",
    points: ["378,000+ unique viewers", "91% of reach from non-followers"],
    organic: "Zero paid promotion, every view organic",
    href: "https://www.instagram.com/thereflectivefootball",
    cta: "Visit profile",
  },
  {
    key: "website",
    label: "The website",
    headline: "TRF Community",
    headlineNote: "",
    points: [
      "Play football games",
      "Vote in The Reflectives",
      "Watch every film",
    ],
    organic: "",
    href: "https://thereflectivefootball.com",
    cta: "Visit site",
  },
];

export const formats = [
  {
    name: "Long-form documentary",
    detail:
      "1,670+ watch hours from 104,000+ views on YouTube since 1 May 2026. Top markets United Kingdom, UAE, Spain, United States and Mexico. Viewers over 45 are 44 percent of views and 68 percent of watch time.",
  },
  {
    name: "Short-form and Reels",
    detail:
      "656,000+ Instagram views in 180 days, 91% of them from non-followers. Reels carry 98.2 percent of views and feed the long-form on YouTube.",
  },
  {
    name: "On-location fan interviews",
    detail:
      "Filmed inside the rooms where Dubai actually watches: Garden on 8, Nelson's Bar and the Belgian Beer Café.",
  },
  {
    name: "Written editorial",
    detail:
      "Fifteen years of match analysis and sports essays, including Arab News, The Watch Post and Meer, plus titles in the United Kingdom, Europe and the United States.",
  },
];


// ---------------------------------------------------------------------------

export type Credit = {
  period: string;
  role: string;
  org: string;
  detail: string[];
};

export type Experience = Credit;

/** Timeline and CV PDF. Newest first. One list, one source. */
export const experience: Credit[] = [
  {
    period: "2026 — Present",
    role: "Founder and Executive Producer",
    org: "The Reflective Football",
    detail: [
      "Fan-first football documentary network, Dubai.",
    ],
  },
  {
    period: "2024 — 2025",
    role: "Copywriter, B2B go-to-market team (contract)",
    org: "e& (Etisalat)",
    detail: [],
  },
  {
    period: "2025",
    role: "Research contract",
    org: "Standard Bank",
    detail: [
      "Africa expansion.",
    ],
  },
  {
    period: "2024 — 2025",
    role: "Sports feature writer",
    org: "Arab News",
    detail: [],
  },
  {
    period: "2022 — Present",
    role: "Founder",
    org: "Metron Ventures",
    detail: [
      "AI tools and apps.",
    ],
  },
  {
    period: "2022 — 2024",
    role: "Content editor",
    org: "Meer",
    detail: [],
  },
  {
    period: "2019 — 2020",
    role: "Podcast host",
    org: "Woudu Network",
    detail: [],
  },
  {
    period: "2013 — Present",
    role: "Copywriter",
    org: "Freelance",
    detail: [],
  },
  {
    period: "2006 — Present",
    role: "Sports journalist and writer",
    org: "Arab News, The Watch Post and Meer",
    detail: [
      "8,000+ published pieces.",
    ],
  },
];


// ---------------------------------------------------------------------------
// BUILT — products, platforms and games, shipped and live
// ---------------------------------------------------------------------------

export type Product = {
  kind: string;
  title: string;
  blurb: string;
  stack: string;
  command: string;
  href?: string;
  /** No public URL. The terminal shows a Private build tag instead of a link. */
  private?: boolean;
};

export const built: Product[] = [
  {
    kind: "AI agent",
    title: "METRON TPD Studio",
    blurb:
      "An AI agent for business strategy. Convene a panel from 350 curated thinkers, work a real challenge through Arena, Intent, Audience, Challenge and Panel, then export the session as DOCX, PDF, PPTX or Markdown.",
    stack: "Next.js · Anthropic Claude API or local Ollama · Vercel · macOS Electron build",
    command: "tpd-studio",
    href: "https://www.metronventures.com/tpd-studio",
  },
  {
    kind: "Voting platform",
    title: "The Reflectives",
    blurb:
      "A live awards ballot across eight categories with timeline-synced nominee clips, gated sign-in, one-vote-per-user state and standings revealed after voting.",
    stack: "Next.js · Supabase · seeded nominee data",
    command: "the-reflectives",
    href: "https://thereflectivefootball.com",
  },
  {
    kind: "Game",
    title: "The Guesser",
    blurb:
      "A football guessing game built into thereflectivefootball.com to turn passive viewers into returning members.",
    stack: "Next.js · Supabase",
    command: "the-guesser",
    href: "https://thereflectivefootball.com",
  },
  {
    kind: "Research tool",
    title: "The Beautiful Archive",
    blurb:
      "A curated football knowledge index across nine mediums, 124 entries and counting. Google finds you pages, this tells you where to start.",
    stack: "Static JSON index · thinker-led recommendation flow",
    command: "beautiful-archive",
    private: true,
  },
  {
    kind: "Consumer app",
    title: "MRMELO VIBES",
    blurb:
      "A nostalgia music player with around 699 tracks and a DJ Set mode: build a set, dual-deck live crossfade, download the mix.",
    stack: "Static PWA · Web Audio API · Cloudflare R2 · Vercel",
    command: "mrmelo-vibes",
    href: "https://mrmelo.com",
  },
  {
    kind: "Consumer app",
    title: "Melo Culture Collection",
    blurb:
      "A curated canon of 500 books, films, series and paintings with live UAE streaming availability and sourcing links for every entry.",
    stack: "Next.js · static JSON data",
    command: "culture-collection",
    private: true,
  },
  {
    kind: "Game",
    title: "All In",
    blurb:
      "A strategic card game. Empty your hand, then your visible cards, then the hidden ones. Commitment cards change the maths.",
    stack: "React · TypeScript · Vite · Zustand · Vitest · PWA",
    command: "all-in",
    private: true,
  },
  {
    kind: "AI instrument",
    title: "Maestro, and Maestro 22",
    blurb:
      "A sovereign, local-first thinking instrument: panels of thinkers, methodology packs and authorial voice styles, with plan-mode pre-flight, session forking, sub-agent Deepen runs and a semantically searchable archive. Maestro 22 is the chat-first rebuild, adding a live fact-sheet dossier beside the thread and hybrid vector plus lexical retrieval.",
    stack: "Next.js 15.5 · React · TypeScript · Tailwind · RAG · Ollama · nomic-embed-text · fully offline",
    command: "maestro --local-first",
    private: true,
  },
  {
    kind: "AI instrument",
    title: "ScreenBuddy",
    blurb:
      "A screenwriting partner that conceptualises with you, then writes line by line in turn. Scene list, logline drafting, and export to Fountain, FDX, PDF, DOCX and Markdown.",
    stack: "Next.js 15 · React · TypeScript · Ollama · runs entirely offline",
    command: "screenbuddy",
    private: true,
  },
];

// ---------------------------------------------------------------------------
// STRATEGY AND RESEARCH
// ---------------------------------------------------------------------------

export type CapabilityBranch = {
  key: string;
  title: string;
  summary: string;
  outputs: string[];
};

export const capabilityTree: CapabilityBranch[] = [
  {
    key: "content",
    title: "Content strategy",
    summary:
      "Built a two-platform funnel on purpose. Instagram Reels generate the reach, YouTube holds the watch time, the website holds the audience and the data. 91% of Instagram reach comes from non-followers.",
    outputs: ["Reels for reach", "YouTube for depth", "Site holds them"],
  },
  {
    key: "research",
    title: "Applied research",
    summary:
      "Runs decision-grade research in 10 to 14 day sprints using the Dual Lens Framework. Commercialised six Distress Radar 2026 sector reports across hospitality, F&B, media, marketing, education and Gulf tech.",
    outputs: ["Dual Lens", "Six reports", "Three papers"],
  },
  {
    key: "commercial",
    title: "Commercial strategy",
    summary:
      "Benchmarked and priced a full sponsorship architecture at market mid-point across docuseries titles, venue retainers, podcast tiers, academies and event sponsorship.",
    outputs: ["Sponsorship", "Venue retainers", "Mid-point pricing"],
  },
  {
    key: "gtm",
    title: "Go-to-market",
    summary:
      "Designed and shipped enterprise B2B AI go-to-market at e&, from brief to launch, targeting ADNOC and major UAE corporates.",
    outputs: ["Enterprise B2B", "Brief to launch", "UAE corporates"],
  },
];

export const stack = [
  {
    group: "Production",
    items: [
      "Adobe Premiere Pro",
      "Adobe Creative Cloud",
      "Audacity",
      "Runway",
      "ElevenLabs",
      "OpusClip",
    ],
  },
  {
    group: "Build",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Prisma",
      "Vercel",
      "Electron",
    ],
  },
  {
    group: "AI and research",
    items: ["Anthropic Claude API", "Ollama", "Perplexity", "Obsidian", "GitHub"],
  },
];

export const languages = [
  { name: "English", level: "Native" },
  { name: "Arabic", level: "Fluent" },
  { name: "French", level: "Fluent" },
  { name: "Spanish", level: "Conversational" },
  { name: "Italian", level: "Conversational" },
];

export type ListedWork = {
  title: string;
  meta: string;
  href: string;
  /** Shorter line for the on-page carousel. The CV keeps `title`. */
  pageTitle?: string;
};

export const books: ListedWork[] = [
  {
    title: "The Smudge on the Canvas",
    meta: "Amazon Kindle",
    href: "https://www.amazon.com/dp/B0GX34LWQ6",
  },
  {
    title: "The Cold War in Your Head",
    meta: "Amazon Kindle",
    href: "https://www.amazon.com/Cold-War-Your-Head-Actual/dp/B0GVRZ8Y9Q",
  },
  {
    title: "Perspectives: Melo or Cypher",
    meta: "Amazon Kindle",
    href: "https://a.co/d/07UjKXPv",
  },
];

export const shelfQuote =
  "Fifteen years of asking who the game is actually for.";

export const papers: ListedWork[] = [
  {
    title: "Who Is Football For? Fan Testimony from the 2026 FIFA World Cup",
    pageTitle: "Who Is Football For? Fan Testimony from the 2026 World Cup",
    meta: "Zenodo",
    href: "https://zenodo.org/records/21713449",
  },
  {
    title:
      "Beyond the Shot: A Relational Graph Framework for Contextually Accurate Expected Goals in Association Football",
    pageTitle: "Beyond the Shot: Expected Goals as a Relational Graph",
    meta: "Zenodo",
    href: "https://zenodo.org/records/20082310",
  },
  {
    title:
      "The Translator Imperative: Cognitive Hybridity as the Mechanism of Human Evolution",
    pageTitle: "The Translator Imperative: Cognitive Hybridity",
    meta: "Zenodo",
    href: "https://zenodo.org/records/18357660",
  },
];

export type PubPage =
  | { kind: "cover" }
  | {
      kind: "work";
      label: "Book" | "Paper";
      title: string;
      outlet: string;
      href: string;
    }
  | { kind: "end"; text: string };

function listedWorks(items: ListedWork[], label: "Book" | "Paper"): PubPage[] {
  return items
    .filter((item) => item.title.trim() && item.href.trim())
    .map((item) => ({
      kind: "work" as const,
      label,
      title: item.pageTitle?.trim() || item.title,
      outlet: item.meta,
      href: item.href,
    }));
}

/** Books first, then selected writing. The carousel and the section hide when this is empty. */
export const publishedWorks = [
  ...listedWorks(books, "Book"),
  ...listedWorks(papers, "Paper"),
];

export const pubPages: PubPage[] = [
  { kind: "cover" },
  ...publishedWorks,
  ...(publishedWorks.length > 0
    ? [{ kind: "end" as const, text: shelfQuote }]
    : []),
];

/** Full paper titles for link aria-labels (page titles may be shortened). */
export function pubFullTitle(href: string): string {
  return (
    papers.find((p) => p.href === href)?.title ??
    books.find((b) => b.href === href)?.title ??
    href
  );
}

export const links = [
  { label: "The Reflective Football", href: "https://thereflectivefootball.com" },
  { label: "YouTube", href: "https://www.youtube.com/@thereflectivefootball" },
  { label: "Metron Ventures", href: "https://metronventures.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/wmelodoumani" },
  { label: "GitHub", href: "https://github.com/Metron84" },
];
