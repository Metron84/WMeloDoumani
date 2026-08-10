// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH — melodoumani.com
// Figures below are the YouTube Studio export for 25 Apr to 1 Aug 2026 and the
// Instagram 90-day export to 2 Aug 2026. Update both together when they move.
// ---------------------------------------------------------------------------

export const identity = {
  name: "W. Melo Doumani",
  role: "Media creator, founder of The Reflective Football, and builder of custom AI tools and apps",
  location: "Dubai, United Arab Emirates",
  visa: "UAE Golden Visa holder",
  summary:
    "Fifteen years writing about football, then I built the thing I wanted to watch. I direct and cut the films, run the strategy work, and ship the software. All of it out of Dubai.",
  email: "melo@thereflectivefootball.com",
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
    headline: "100,000+",
    headlineNote: "views since launch",
    points: ["1,700 hours watched", "700,000+ impressions"],
    organic: "Zero paid promotion, every view organic",
    href: "https://www.youtube.com/@thereflectivefootball",
    cta: "Visit channel",
  },
  {
    key: "instagram",
    label: "Instagram",
    headline: "500,000+",
    headlineNote: "views in 90 days",
    points: ["350K viewers", "90% of reach from non-followers"],
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
      "Vote for the supporters",
      "Explore total content",
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
      "1,674 watch hours from 104,322 views on YouTube since 1 May 2026. Top markets United Kingdom, UAE, Spain, United States and Mexico. Viewers over 45 are 44 percent of views and 68 percent of watch time.",
  },
  {
    name: "Short-form and Reels",
    detail:
      "536,781 Instagram views in 90 days, 91 percent of them from non-followers. Reels carry 98.2 percent of views and feed the long-form on YouTube.",
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

export type Stage = {
  year: string;
  org: string;
  role: string;
  note?: string;
};

export const experienceStages: Stage[] = [
  {
    year: "2006",
    org: "Sports journalist and writer",
    role: "",
    note: "8,000+ pieces",
  },
  { year: "2022", org: "Metron Ventures", role: "Founder (AI tools and apps)" },
  { year: "2024", org: "e& (Etisalat)", role: "Media and AI lead" },
  { year: "2025", org: "Standard Bank", role: "R&D blueprint lead" },
  { year: "2026", org: "The Reflective", role: "Media founder" },
];

/** Full-detail credits for the CV PDF generator. */
export const experience: Credit[] = [
  {
    period: "2026 — Present",
    role: "Media Founder",
    org: "The Reflective Football, Dubai",
    detail: [
      "Built a football media brand around Dubai's supporter culture, sole operator across concept, filming, editing and distribution.",
      "Season 1 followed the Arsenal, West Ham, Chelsea UAE, Aston Villa and Manchester United communities across five Dubai venues.",
      "Grew to 104,322 YouTube views and 536,781 Instagram views in the first three months with no paid media.",
      "Runs the funnel deliberately: Reels generate reach, YouTube holds the watch time, the site holds the audience.",
    ],
  },
  {
    period: "2025 — 2026",
    role: "R&D Blueprint Lead",
    org: "Standard Bank Group",
    detail: [
      "Retained as senior AI advisor to Africa's largest banking group for sovereign AI frameworks and expansion strategy.",
      "Presented decision-grade intelligence directly to the CEO of the Dubai branch and executive leadership.",
    ],
  },
  {
    period: "2024 — 2025",
    role: "Media and AI Lead",
    org: "e& (Etisalat), Abu Dhabi and Dubai",
    detail: [
      "Led AI adoption frameworks during e&'s shift from regional telco to global technology investment group.",
      "Built end-to-end go-to-market strategy for enterprise B2B AI services targeting ADNOC and major UAE corporates.",
      "Co-built proprietary AI copywriting datasets with Microsoft.",
    ],
  },
  {
    period: "2022 — Present",
    role: "Founder, AI Tools and Apps",
    org: "Metron Ventures, Dubai",
    detail: [
      "Runs a five-platform AI innovation studio with a cross-functional team of engineers, designers and strategists.",
      "Designed METRON TPD Studio, a local-first strategy platform encoding 350 thinkers across 12 industries.",
      "Commercialised six sector intelligence reports across hospitality, F&B, media, marketing, education and Gulf tech.",
    ],
  },
  {
    period: "2006 — Present",
    role: "Sports Journalist and Writer",
    org: "Regional and international titles",
    detail: [
      "Twenty years writing, fifteen of them on football, tennis and sports culture.",
      "Long-form match analysis and essays for regional and international titles, blending tactical insight with cultural commentary.",
      "The same editorial instinct now drives what gets filmed at The Reflective Football.",
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
  },
  {
    kind: "Game",
    title: "All In",
    blurb:
      "A strategic card game. Empty your hand, then your visible cards, then the hidden ones. Commitment cards change the maths.",
    stack: "React · TypeScript · Vite · Zustand · Vitest · PWA",
    command: "all-in",
  },
  {
    kind: "AI instrument",
    title: "Maestro, and Maestro 22",
    blurb:
      "A sovereign, local-first thinking instrument: panels of thinkers, methodology packs and authorial voice styles, with plan-mode pre-flight, session forking, sub-agent Deepen runs and a semantically searchable archive. Maestro 22 is the chat-first rebuild, adding a live fact-sheet dossier beside the thread and hybrid vector plus lexical retrieval.",
    stack: "Next.js 15.5 · React · TypeScript · Tailwind · RAG · Ollama · nomic-embed-text · fully offline",
    command: "maestro --local-first",
  },
  {
    kind: "AI instrument",
    title: "ScreenBuddy",
    blurb:
      "A screenwriting partner that conceptualises with you, then writes line by line in turn. Scene list, logline drafting, and export to Fountain, FDX, PDF, DOCX and Markdown.",
    stack: "Next.js 15 · React · TypeScript · Ollama · runs entirely offline",
    command: "screenbuddy",
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
      "Built a two-platform funnel on purpose. Instagram Reels generate the reach, YouTube holds the watch time, the website holds the audience and the data. 91 percent of Instagram reach comes from non-followers.",
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

export const books = [
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

export const papers = [
  {
    title: "Who Is Football For? Fan Testimony from the 2026 FIFA World Cup",
    meta: "Zenodo",
    href: "https://zenodo.org/records/21713449",
  },
  {
    title:
      "Beyond the Shot: A Relational Graph Framework for Contextually Accurate Expected Goals in Association Football",
    meta: "Zenodo",
    href: "https://zenodo.org/records/20082310",
  },
  {
    title:
      "The Translator Imperative: Cognitive Hybridity as the Mechanism of Human Evolution",
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

export const pubPages: PubPage[] = [
  { kind: "cover" },
  {
    kind: "work",
    label: "Book",
    title: books[0].title,
    outlet: "Amazon Kindle",
    href: books[0].href,
  },
  {
    kind: "work",
    label: "Book",
    title: books[1].title,
    outlet: "Amazon Kindle",
    href: books[1].href,
  },
  {
    kind: "work",
    label: "Book",
    title: books[2].title,
    outlet: "Amazon Kindle",
    href: books[2].href,
  },
  {
    kind: "work",
    label: "Paper",
    title: "Who Is Football For? Fan Testimony from the 2026 World Cup",
    outlet: "Zenodo",
    href: papers[0].href,
  },
  {
    kind: "work",
    label: "Paper",
    title: "Beyond the Shot: Expected Goals as a Relational Graph",
    outlet: "Zenodo",
    href: papers[1].href,
  },
  {
    kind: "work",
    label: "Paper",
    title: "The Translator Imperative: Cognitive Hybridity",
    outlet: "Zenodo",
    href: papers[2].href,
  },
  { kind: "end", text: shelfQuote },
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
