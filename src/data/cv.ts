// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH — melodoumani.com
// Figures below are the YouTube Studio export for 25 Apr to 1 Aug 2026 and the
// Instagram 90-day export to 2 Aug 2026. Update both together when they move.
// ---------------------------------------------------------------------------

export const identity = {
  name: "W. Melo Doumani",
  role: "Football media creator, founder of The Reflective Football, and builder of strategy tools",
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

export type Film = {
  club: string;
  venue: string;
  title: string;
  format: string;
  blurb: string;
  href: string;
  image?: string;
};

// Season 1. Each card takes a 9:16 poster frame from the matching Reel.
export const films: Film[] = [
  {
    club: "Arsenal",
    venue: "Garden on 8",
    title: "22 Years of Heartbreak",
    format: "Documentary",
    blurb: "Why Arsenal fans still believe. The Dubai diaspora.",
    href: "https://youtu.be/7UFWTZ6Qa3k",
    image: "/films/arsenal.jpg",
  },
  {
    club: "West Ham",
    venue: "Nelson's Bar",
    title: "The Final Day",
    format: "Documentary",
    blurb: "The Dubai Hammers on the day the season ran out.",
    href: "https://youtu.be/PFZKRlFRhOI",
    image: "/films/westham.jpg",
  },
  {
    club: "Chelsea",
    venue: "Belgian Beer Café",
    title: "The Supporters Club That Never Stops Believing",
    format: "Documentary",
    blurb: "Chelsea FC Dubai, in full voice.",
    href: "https://youtu.be/BRCMFCk5Lns",
    image: "/films/chelsea.jpg",
  },
  {
    club: "Aston Villa",
    venue: "McGettigan's Factory",
    title: "Aston Villa Fans in Dubai",
    format: "Europa League Final",
    blurb: "What a Europa League final looks like from Dubai.",
    href: "https://youtu.be/-tjmjeRL5y0",
    image: "/films/villa-moment.jpg",
  },
  {
    club: "Spain",
    venue: "Garden on 8",
    title: "The Signs Were There",
    format: "World Cup Final",
    blurb: "Spanish fans on winning the World Cup. Viva España.",
    href: "https://youtu.be/lrRfE5PHSZI",
    image: "/films/spain.jpg",
  },
  {
    club: "Manchester United",
    venue: "Brooklyn Bar, Elite Byblos Hotel",
    title: "Manchester United Fans in Dubai",
    format: "Documentary",
    blurb: "Support that outlives the results.",
    href: "https://youtu.be/8VepZZ8vpHk",
    image: "/films/manutd.jpg",
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
// INSTAGRAM — the reach half of the funnel
// ---------------------------------------------------------------------------

export type Reel = {
  when: string;
  headline: string;
  views: string;
  note: string;
  stats: { label: string; value: string }[];
  href: string;
};

export const reels: Reel[] = [
  {
    when: "30 May 2026",
    headline: "Champions League Final",
    views: "402,184",
    note: "Filmed at Garden on 8. Still collecting comments months later.",
    stats: [
      { label: "Interactions", value: "56,316" },
      { label: "Shares", value: "14,919" },
      { label: "Saves", value: "3,301" },
      { label: "New follows", value: "797" },
      { label: "Reach from non-followers", value: "94.1%" },
    ],
    href: "https://www.instagram.com/reel/DY9W4oTI1mp/",
  },
  {
    when: "21 June 2026",
    headline: "World Cup run",
    views: "8,590",
    note: "Cross-posted to Facebook, where it added a further 6,431 views.",
    stats: [
      { label: "Interactions", value: "85" },
      { label: "Comments", value: "28" },
      { label: "Accounts engaged", value: "86" },
      { label: "Reach from non-followers", value: "95%" },
      { label: "Facebook views", value: "6,431" },
    ],
    href: "https://www.instagram.com/reel/DZ2NVjHIAT0/",
  },
  {
    when: "8 Aug 2026, 3.27am",
    headline: "Timing experiment",
    views: "1,425",
    note: "Deliberately published at an unconventional hour to test how much the schedule really moves reach.",
    stats: [
      { label: "Interactions", value: "26" },
      { label: "Viewers", value: "319" },
      { label: "Reach from non-followers", value: "77.2%" },
    ],
    href: "https://www.instagram.com/reel/Dbwd9msIK-3/",
  },
];

export const funnel =
  "Two platforms, one funnel. Instagram creates the reach, almost entirely from people who do not follow the account yet. YouTube converts that attention into watch time. The website keeps it.";

// ---------------------------------------------------------------------------
// THE NUMBERS — revealed after the work
// ---------------------------------------------------------------------------

export const traction = {
  since: "Since 1 May 2026",
  window: "YouTube to 1 August 2026. Instagram, 90 days to 2 August 2026. No paid media.",
  metrics: [
    { value: "104,322", label: "YouTube views" },
    { value: "1,674 hrs", label: "Watch time on YouTube" },
    { value: "536,781", label: "Instagram views in 90 days" },
    { value: "720,558", label: "YouTube impressions at 4.59% CTR" },
    { value: "91%", label: "Instagram reach from non-followers" },
    { value: "AED 0", label: "Spent on paid media" },
  ],
  markets: "United Kingdom · UAE · Spain · United States · Mexico",
};

// ---------------------------------------------------------------------------

export type Credit = {
  period: string;
  role: string;
  org: string;
  detail: string[];
};

export const experience: Credit[] = [
  {
    period: "2025 — Present",
    role: "Founder and Creator",
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
    role: "Lead, Strategic Foresight and R&D",
    org: "Standard Bank Group",
    detail: [
      "Retained as senior AI advisor to Africa's largest banking group for sovereign AI frameworks and expansion strategy.",
      "Presented decision-grade intelligence directly to the CEO of the Dubai branch and executive leadership.",
    ],
  },
  {
    period: "2024 — 2025",
    role: "Lead, AI Integration and Go-to-Market",
    org: "e& (Etisalat), Abu Dhabi and Dubai",
    detail: [
      "Led AI adoption frameworks during e&'s shift from regional telco to global technology investment group.",
      "Built end-to-end go-to-market strategy for enterprise B2B AI services targeting ADNOC and major UAE corporates.",
      "Co-built proprietary AI copywriting datasets with Microsoft.",
    ],
  },
  {
    period: "2022 — Present",
    role: "Founder and Venture Architect",
    org: "Metron Ventures, Dubai",
    detail: [
      "Runs a five-platform AI innovation studio with a cross-functional team of engineers, designers and strategists.",
      "Designed METRON TPD Studio, a local-first strategy platform encoding 350 thinkers across 12 industries.",
      "Commercialised six sector intelligence reports across hospitality, F&B, media, marketing, education and Gulf tech.",
    ],
  },
  {
    period: "2006 — Present",
    role: "Sports Journalist and Essayist",
    org: "Arab News, The Watch Post, Meer",
    detail: [
      "Twenty years writing, fifteen of them on football, tennis and sports culture.",
      "Long-form match analysis and essays for regional and international titles, blending tactical insight with cultural commentary.",
      "The same editorial instinct now drives what gets filmed at The Reflective Football.",
    ],
  }
];


// ---------------------------------------------------------------------------
// BUILT — products, platforms and games, shipped and live
// ---------------------------------------------------------------------------

export type Product = {
  kind: string;
  title: string;
  blurb: string;
  stack: string;
  href?: string;
};

export const built: Product[] = [
  {
    kind: "AI agent",
    title: "METRON TPD Studio",
    blurb:
      "An AI agent for business strategy. Convene a panel from 350 curated thinkers, work a real challenge through Arena, Intent, Audience, Challenge and Panel, then export the session as DOCX, PDF, PPTX or Markdown.",
    stack: "Next.js · Anthropic Claude API or local Ollama · Vercel · macOS Electron build",
    href: "https://www.metronventures.com/tpd-studio",
  },
  {
    kind: "Voting platform",
    title: "The Reflectives",
    blurb:
      "A live awards ballot across eight categories with timeline-synced nominee clips, gated sign-in, one-vote-per-user state and standings revealed after voting.",
    stack: "Next.js · Supabase · seeded nominee data",
    href: "https://thereflectivefootball.com",
  },
  {
    kind: "Game",
    title: "The Guesser",
    blurb:
      "A football guessing game built into thereflectivefootball.com to turn passive viewers into returning members.",
    stack: "Next.js · Supabase",
    href: "https://thereflectivefootball.com",
  },
  {
    kind: "Research tool",
    title: "The Beautiful Archive",
    blurb:
      "A curated football knowledge index across nine mediums, 124 entries and counting. Google finds you pages, this tells you where to start.",
    stack: "Static JSON index · thinker-led recommendation flow",
  },
  {
    kind: "Consumer app",
    title: "MRMELO VIBES",
    blurb:
      "A nostalgia music player with around 699 tracks and a DJ Set mode: build a set, dual-deck live crossfade, download the mix.",
    stack: "Static PWA · Web Audio API · Cloudflare R2 · Vercel",
    href: "https://mrmelo.com",
  },
  {
    kind: "Consumer app",
    title: "Melo Culture Collection",
    blurb:
      "A curated canon of 500 books, films, series and paintings with live UAE streaming availability and sourcing links for every entry.",
    stack: "Next.js · static JSON data",
  },
  {
    kind: "Game",
    title: "All In",
    blurb:
      "A strategic card game. Empty your hand, then your visible cards, then the hidden ones. Commitment cards change the maths.",
    stack: "React · TypeScript · Vite · Zustand · Vitest · PWA",
  },
  {
    kind: "AI instrument",
    title: "Maestro, and Maestro 22",
    blurb:
      "A sovereign, local-first thinking instrument: panels of thinkers, methodology packs and authorial voice styles, with plan-mode pre-flight, session forking, sub-agent Deepen runs and a semantically searchable archive. Maestro 22 is the chat-first rebuild, adding a live fact-sheet dossier beside the thread and hybrid vector plus lexical retrieval.",
    stack: "Next.js 15.5 · React · TypeScript · Tailwind · RAG · Ollama · nomic-embed-text · fully offline",
  },
  {
    kind: "AI instrument",
    title: "ScreenBuddy",
    blurb:
      "A screenwriting partner that conceptualises with you, then writes line by line in turn. Scene list, logline drafting, and export to Fountain, FDX, PDF, DOCX and Markdown.",
    stack: "Next.js 15 · React · TypeScript · Ollama · runs entirely offline",
  },
];

// ---------------------------------------------------------------------------
// STRATEGY AND RESEARCH
// ---------------------------------------------------------------------------

export const capability = [
  {
    name: "Content strategy",
    detail:
      "Built a two-platform funnel on purpose. Instagram Reels generate the reach, YouTube holds the watch time, the website holds the audience and the data. 91 percent of Instagram reach comes from non-followers.",
  },
  {
    name: "Commercial strategy",
    detail:
      "Benchmarked and priced a full sponsorship architecture at market mid-point across docuseries titles, venue retainers, podcast tiers, academies and event sponsorship.",
  },
  {
    name: "Applied research",
    detail:
      "Runs decision-grade research in 10 to 14 day sprints using the Dual Lens Framework. Commercialised six Distress Radar 2026 sector reports across hospitality, F&B, media, marketing, education and Gulf tech.",
  },
  {
    name: "Go-to-market",
    detail:
      "Designed and shipped enterprise B2B AI go-to-market at e&, from brief to launch, targeting ADNOC and major UAE corporates.",
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

export const links = [
  { label: "The Reflective Football", href: "https://thereflectivefootball.com" },
  { label: "YouTube", href: "https://www.youtube.com/@thereflectivefootball" },
  { label: "Metron Ventures", href: "https://metronventures.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/wmelodoumani" },
  { label: "GitHub", href: "https://github.com/Metron84" },
];
