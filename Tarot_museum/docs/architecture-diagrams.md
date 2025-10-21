# Tarot Museum - Architecture Diagrams

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER DEVICES                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Desktop    │  │    Tablet    │  │    Mobile    │          │
│  │  1024px+     │  │  768-1023px  │  │  320-767px   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                         CDN LAYER                                │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  Cloudflare / CloudFront                             │       │
│  │  - Static Assets (HTML, CSS, JS)                     │       │
│  │  - Images (AVIF, WebP, JPEG)                         │       │
│  │  - 3D Models (GLB)                                   │       │
│  │  - JSON Data Files                                   │       │
│  │  - Cache-Control: 1 year immutable                   │       │
│  └──────────────────────────────────────────────────────┘       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      HOSTING LAYER                               │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  Vercel Edge Network                                 │       │
│  │  ┌─────────────────────────────────────────┐         │       │
│  │  │  React 18 SPA                           │         │       │
│  │  │  - Client-side rendering                │         │       │
│  │  │  - React Router                         │         │       │
│  │  │  - Code-split bundles                   │         │       │
│  │  │  - Service Worker                       │         │       │
│  │  └─────────────────────────────────────────┘         │       │
│  └──────────────────────────────────────────────────────┘       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER (Phase 1)                        │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  Static JSON Files                                   │       │
│  │  - tarot-museum-data/cards/                          │       │
│  │  - tarot-museum-data/decks/                          │       │
│  │  - tarot-museum-data/history/                        │       │
│  │  - tarot-museum-data/museum-features/                │       │
│  └──────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   OPTIONAL: Phase 2/3 Backend                    │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  Vercel Serverless Functions                         │       │
│  │  - User Authentication                               │       │
│  │  - Search API                                        │       │
│  │  - Progress Tracking                                 │       │
│  │  - Analytics                                         │       │
│  └──────────────────────────────────────────────────────┘       │
│                           │                                      │
│                           ▼                                      │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  Supabase PostgreSQL                                 │       │
│  │  - User accounts                                     │       │
│  │  - Collections                                       │       │
│  │  - Progress data                                     │       │
│  │  - Analytics events                                  │       │
│  └──────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Frontend Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        React Application                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                        App Shell                           │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  Layout Component                                    │  │ │
│  │  │  - Header (Navigation, Search)                       │  │ │
│  │  │  - Main Content Area                                 │  │ │
│  │  │  - Footer                                            │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             │                                    │
│                             ▼                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                     React Router                           │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │ │
│  │  │   Home      │  │ Collections │  │  Timeline   │       │ │
│  │  │   Route     │  │    Route    │  │   Route     │       │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │ │
│  │  │ CardDetail  │  │  Symbolism  │  │    About    │       │ │
│  │  │   Route     │  │    Route    │  │   Route     │       │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             │                                    │
│                             ▼                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   State Management (Zustand)               │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  Museum Store                                        │  │ │
│  │  │  - Current card                                      │  │ │
│  │  │  - View mode (grid/timeline/3d/symbolism)           │  │ │
│  │  │  - Search query & results                           │  │ │
│  │  │  - Active filters                                   │  │ │
│  │  │  - User preferences                                 │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             │                                    │
│                             ▼                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Service Layer                           │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │ │
│  │  │CardService   │  │SearchService │  │CacheService  │    │ │
│  │  │- Load cards  │  │- Index cards │  │- Memory cache│    │ │
│  │  │- Get by ID   │  │- Full-text   │  │- LocalStorage│    │ │
│  │  │- Filter      │  │- Filters     │  │- Service-Worker│  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             │                                    │
│                             ▼                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   Data Access Layer                        │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  JSON Data Loader                                    │  │ │
│  │  │  - Fetch from CDN                                    │  │ │
│  │  │  - Parse & validate                                  │  │ │
│  │  │  - Cache in memory                                   │  │ │
│  │  │  - Error handling                                    │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
App
 │
 ├── Layout
 │    ├── Header
 │    │    ├── Logo
 │    │    ├── Navigation
 │    │    │    ├── NavLink (Collections)
 │    │    │    ├── NavLink (Timeline)
 │    │    │    ├── NavLink (Symbolism)
 │    │    │    └── NavLink (About)
 │    │    └── SearchBar
 │    │         ├── SearchInput
 │    │         ├── SearchSuggestions
 │    │         └── SearchButton
 │    │
 │    ├── Main Content
 │    │    └── [Route-specific content]
 │    │
 │    └── Footer
 │         ├── FooterLinks
 │         └── Copyright
 │
 └── Routes
      │
      ├── Home
      │    ├── Hero
      │    ├── FeaturedCards
      │    │    └── CardGrid
      │    │         └── CardCard (×6)
      │    └── MuseumSections
      │         └── SectionCard (×5)
      │
      ├── Collections
      │    ├── Breadcrumb
      │    ├── FilterPanel
      │    │    ├── SuitFilter
      │    │    ├── ArcanaFilter
      │    │    ├── PeriodFilter
      │    │    └── DeckFilter
      │    ├── SortControls
      │    └── CardGrid
      │         └── CardCard (×78)
      │              ├── CardImage
      │              ├── CardTitle
      │              ├── CardMeta
      │              └── CardActions
      │
      ├── CardDetail
      │    ├── Breadcrumb
      │    ├── CardViewer
      │    │    ├── ImageViewer (default)
      │    │    └── Card3DViewer (optional)
      │    ├── CardInfo
      │    │    ├── CardHeader
      │    │    ├── CardMeanings
      │    │    │    ├── UprightMeaning
      │    │    │    └── ReversedMeaning
      │    │    └── CardKeywords
      │    ├── SymbolismSection
      │    │    └── SymbolCard (×n)
      │    ├── HistoricalContext
      │    └── RelatedCards
      │         └── CardCard (×6)
      │
      ├── Timeline
      │    ├── TimelineControls
      │    │    ├── PeriodFilter
      │    │    ├── ZoomControls
      │    │    └── ViewToggle
      │    └── TimelineVisualization
      │         ├── TimelineAxis
      │         ├── TimelineEvent (×n)
      │         │    ├── EventMarker
      │         │    ├── EventCard
      │         │    └── RelatedCards
      │         └── TimelineNavigation
      │
      ├── Symbolism
      │    ├── SymbolSearch
      │    ├── SymbolCategories
      │    │    └── CategoryCard (×7)
      │    └── SymbolNetwork
      │         ├── NetworkGraph
      │         │    ├── SymbolNode (×n)
      │         │    └── SymbolEdge (×n)
      │         └── SymbolDetail
      │              ├── SymbolInfo
      │              └── RelatedCards
      │
      └── About
           ├── MuseumIntro
           ├── HistorySection
           ├── DecksOverview
           └── Credits
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                           USER ACTION                            │
│  "User searches for 'love' and filters by 'cups'"               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        UI COMPONENT                              │
│  SearchBar component captures input and triggers search          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT                            │
│  useMuseumStore().performSearch('love', { suit: ['cups'] })     │
│  - Updates searchQuery state                                     │
│  - Updates filters state                                         │
│  - Sets isLoading = true                                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SERVICE LAYER                              │
│  SearchService.search('love', { suit: ['cups'] })               │
│                                                                  │
│  1. Check cache for previous results                            │
│     └─ Cache hit? Return cached results                         │
│                                                                  │
│  2. Cache miss: Query data                                      │
│     ├─ Tokenize query: ['love']                                 │
│     ├─ Search inverted index                                    │
│     ├─ Apply filters (suit = 'cups')                            │
│     ├─ Rank by relevance                                        │
│     └─ Generate suggestions                                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA ACCESS LAYER                          │
│  CardService.getAllCards()                                       │
│                                                                  │
│  1. Check in-memory cache                                       │
│     └─ Cache hit? Return cards                                  │
│                                                                  │
│  2. Cache miss: Load from storage                               │
│     ├─ Fetch JSON from CDN                                      │
│     ├─ Parse and validate                                       │
│     ├─ Store in memory cache                                    │
│     └─ Return cards                                             │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                         RESULTS                                  │
│  SearchResults = [                                               │
│    { card: TwoOfCups, relevanceScore: 0.95 },                   │
│    { card: AceOfCups, relevanceScore: 0.87 },                   │
│    { card: ThreeOfCups, relevanceScore: 0.82 },                 │
│    { card: TheLovers, relevanceScore: 0.75 }                    │
│  ]                                                               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      STATE UPDATE                                │
│  useMuseumStore().setState({                                     │
│    searchResults: results,                                       │
│    isLoading: false                                              │
│  })                                                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       UI RE-RENDER                               │
│  CardGrid component re-renders with new results                  │
│  - Shows 4 cards                                                 │
│  - Announces "Found 4 results" to screen readers                 │
│  - Updates URL with query parameters                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Performance Optimization Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      INITIAL PAGE LOAD                           │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    1. HTML SHELL LOADS                           │
│  - Minimal HTML (< 5KB)                                          │
│  - Critical CSS inlined                                          │
│  - Preload hints for fonts & hero image                          │
│  Time: ~100ms                                                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    2. CRITICAL JS LOADS                          │
│  - React runtime (45KB gzipped)                                  │
│  - Router (8KB gzipped)                                          │
│  - Core utilities (10KB gzipped)                                 │
│  Total: ~63KB | Time: ~300ms                                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    3. FIRST PAINT (FCP)                          │
│  - Header visible                                                │
│  - Navigation visible                                            │
│  - Hero section skeleton                                         │
│  Time: ~800ms | Target: < 1.8s ✅                                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│               4. ROUTE-SPECIFIC CODE LOADS                       │
│  - Home page components (lazy)                                   │
│  - Card data service                                             │
│  - Featured cards JSON                                           │
│  Time: ~400ms                                                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    5. HERO IMAGE LOADS                           │
│  - WebP format (30KB)                                            │
│  - From CDN cache                                                │
│  - Progressive JPEG fallback                                     │
│  Time: ~200ms                                                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              6. LARGEST CONTENTFUL PAINT (LCP)                   │
│  - Hero image fully rendered                                     │
│  - Main content visible                                          │
│  Time: ~1.4s | Target: < 2.5s ✅✅                               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    7. INTERACTIVE (TTI)                          │
│  - React hydrated                                                │
│  - Event listeners attached                                      │
│  - Navigation functional                                         │
│  - Search functional                                             │
│  Time: ~2.0s | Target: < 3.5s ✅✅                               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                8. BELOW-FOLD CONTENT LAZY LOADS                  │
│  - Card images load as scrolled into view                        │
│  - Section images lazy load                                      │
│  - 3D viewer code deferred                                       │
│  Time: Progressive | On-demand                                   │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    9. SERVICE WORKER INSTALLED                   │
│  - Caches assets for offline use                                 │
│  - Prefetches likely next routes                                 │
│  Time: Background | Non-blocking                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   10. FULL EXPERIENCE READY                      │
│  - All interactive features functional                           │
│  - Animations smooth (60fps)                                     │
│  - Subsequent navigations instant                                │
│  Total Time: ~2.5s | Target: < 3.5s ✅✅✅                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Search Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         SEARCH INDEX                             │
│                                                                  │
│  Built at runtime from card data:                               │
│                                                                  │
│  Inverted Index Structure:                                       │
│  ┌──────────────────────────────────────────────────┐           │
│  │  "love" → [cups-2, cups-ace, major-6, ...]      │           │
│  │  "relationship" → [major-6, cups-3, ...]        │           │
│  │  "strength" → [major-8, wands-knight, ...]      │           │
│  │  "wisdom" → [major-2, pentacles-king, ...]      │           │
│  │  "abundance" → [major-3, pentacles-9, ...]      │           │
│  └──────────────────────────────────────────────────┘           │
│                                                                  │
│  Card Index:                                                     │
│  ┌──────────────────────────────────────────────────┐           │
│  │  "major-0" → TarotCard { ... }                  │           │
│  │  "major-1" → TarotCard { ... }                  │           │
│  │  "cups-ace" → TarotCard { ... }                 │           │
│  │  ...                                             │           │
│  └──────────────────────────────────────────────────┘           │
│                                                                  │
│  Symbol Index:                                                   │
│  ┌──────────────────────────────────────────────────┐           │
│  │  "heart" → ["cups-2", "cups-3", "major-6"]      │           │
│  │  "sun" → ["major-19", "cups-ace"]               │           │
│  │  "moon" → ["major-18", "major-2"]                │           │
│  └──────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SEARCH PROCESS                              │
│                                                                  │
│  Query: "love relationship"                                      │
│                                                                  │
│  Step 1: Tokenize                                               │
│  ├─ Input: "love relationship"                                  │
│  ├─ Lowercase: "love relationship"                              │
│  ├─ Split: ["love", "relationship"]                             │
│  └─ Remove stopwords: ["love", "relationship"]                  │
│                                                                  │
│  Step 2: Search Index                                           │
│  ├─ "love" → [cups-2, cups-ace, major-6, cups-3]               │
│  └─ "relationship" → [major-6, cups-3, cups-2]                  │
│                                                                  │
│  Step 3: Combine Results                                        │
│  ├─ major-6: 2 matches (love, relationship)                     │
│  ├─ cups-3: 2 matches (love, relationship)                      │
│  ├─ cups-2: 2 matches (love, relationship)                      │
│  └─ cups-ace: 1 match (love)                                    │
│                                                                  │
│  Step 4: Apply Filters                                          │
│  └─ Filter: suit = "cups"                                       │
│      ├─ cups-3 ✓                                                │
│      ├─ cups-2 ✓                                                │
│      ├─ cups-ace ✓                                              │
│      └─ major-6 ✗ (filtered out)                                │
│                                                                  │
│  Step 5: Rank by Relevance                                      │
│  ├─ cups-3: score 0.95 (2 matches, upright meaning)            │
│  ├─ cups-2: score 0.92 (2 matches, primary theme)              │
│  └─ cups-ace: score 0.78 (1 match)                             │
│                                                                  │
│  Step 6: Return Results                                         │
│  └─ [                                                            │
│      { card: cups-3, score: 0.95, matches: [...] },            │
│      { card: cups-2, score: 0.92, matches: [...] },            │
│      { card: cups-ace, score: 0.78, matches: [...] }           │
│    ]                                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Image Loading Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                      IMAGE REQUEST                               │
│  User scrolls card into view                                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   INTERSECTION OBSERVER                          │
│  Detects card is 10% visible                                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DEVICE DETECTION                              │
│  ├─ Screen width: 375px                                         │
│  ├─ DPR: 2x                                                     │
│  └─ Viewport: 375 × 812                                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SIZE CALCULATION                              │
│  Card width on screen: 375px                                    │
│  Effective width (DPR): 375 × 2 = 750px                         │
│  Closest size: 600px variant                                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                  FORMAT NEGOTIATION                              │
│  Browser supports AVIF? ✅                                       │
│  └─ Request: /cards/major-0-600.avif                            │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        CDN LOOKUP                                │
│  1. Check edge cache (nearest POP)                              │
│     └─ Cache HIT ✅ (< 10ms)                                     │
│                                                                  │
│  2. Return cached image                                         │
│     ├─ Size: 15KB (AVIF compressed)                             │
│     ├─ Cache-Control: max-age=31536000                          │
│     └─ Immutable: true                                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PROGRESSIVE DISPLAY                           │
│  1. Show blur placeholder (base64, < 1KB)                       │
│  2. Download AVIF (15KB, ~100ms)                                │
│  3. Fade in full image                                          │
│  4. Mark as loaded                                              │
│  Total time: ~150ms ✅                                          │
└─────────────────────────────────────────────────────────────────┘

Alternative Flow: Cache MISS
┌─────────────────────────────────────────────────────────────────┐
│  1. Request forwarded to origin                                  │
│  2. Image generated/retrieved (if not exists)                    │
│  3. Cached at edge for future requests                           │
│  4. Returned to client                                           │
│  Total time: ~500ms (first request only)                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Accessibility Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    KEYBOARD USER JOURNEY                         │
│                                                                  │
│  User arrives on homepage                                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SKIP LINKS                                   │
│  [Tab] → Focus on "Skip to main content"                        │
│  [Enter] → Jumps to main content area                           │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     NAVIGATION                                   │
│  [Tab] → Collections link (focus visible: 3px outline)          │
│  [Tab] → Timeline link                                          │
│  [Tab] → Symbolism link                                         │
│  [Tab] → About link                                             │
│  [Tab] → Search input                                           │
│  [Enter] on any link → Navigate to page                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CARD GRID                                    │
│  [Tab] → First card (focus on card link)                        │
│  [Arrow Right] → Next card in row                               │
│  [Arrow Left] → Previous card in row                            │
│  [Arrow Down] → Card in next row                                │
│  [Arrow Up] → Card in previous row                              │
│  [Enter] → Open card detail                                     │
│  [Home] → Jump to first card                                    │
│  [End] → Jump to last card                                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                  SCREEN READER ANNOUNCEMENT                      │
│  "Card grid, 78 cards. The Fool, Major Arcana card 0.          │
│   Link. 1 of 78."                                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    SCREEN READER USER JOURNEY                    │
│                                                                  │
│  User arrives on Collections page                               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PAGE STRUCTURE                                │
│  <main role="main" aria-label="Collections">                    │
│    <h1>Tarot Card Collections</h1>                              │
│    Screen reader: "Main landmark, Collections"                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SEMANTIC REGIONS                              │
│  <section aria-labelledby="filters-heading">                    │
│    <h2 id="filters-heading">Filter Cards</h2>                   │
│    Screen reader: "Filter Cards region"                         │
│                                                                  │
│  <section aria-labelledby="results-heading">                    │
│    <h2 id="results-heading">Card Results</h2>                   │
│    Screen reader: "Card Results region"                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LIVE REGIONS                                  │
│  User applies filter:                                            │
│  <div role="status" aria-live="polite">                         │
│    "Filter applied. Showing 14 cards."                          │
│  </div>                                                          │
│  Screen reader: Announces change                                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CARD DESCRIPTION                              │
│  <article aria-labelledby="card-title" aria-describedby="desc"> │
│    <img alt="The Fool tarot card depicting a young person       │
│         standing at cliff edge with white dog, holding rose,    │
│         sun shining overhead, symbolizing new beginnings">      │
│    <h3 id="card-title">The Fool</h3>                            │
│    <p id="desc">Major Arcana, card 0. Represents innocence     │
│       and new beginnings.</p>                                   │
│  </article>                                                      │
│  Screen reader: Reads full description                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Deployment Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPER COMMITS CODE                        │
│  git commit -m "Add card filtering feature"                     │
│  git push origin feature/card-filtering                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     GITHUB ACTIONS TRIGGERED                     │
│  Workflow: .github/workflows/deploy.yml                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 1: CODE QUALITY                          │
│  ┌────────────────────────────────────────────────┐             │
│  │  ESLint                                        │             │
│  │  - Check code style                            │             │
│  │  - Enforce best practices                      │             │
│  │  - Exit code: 0 ✅                             │             │
│  └────────────────────────────────────────────────┘             │
│  ┌────────────────────────────────────────────────┐             │
│  │  TypeScript                                    │             │
│  │  - Type checking                               │             │
│  │  - No errors found                             │             │
│  │  - Exit code: 0 ✅                             │             │
│  └────────────────────────────────────────────────┘             │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 2: TESTING                               │
│  ┌────────────────────────────────────────────────┐             │
│  │  Jest (Unit Tests)                             │             │
│  │  - 247 tests passed                            │             │
│  │  - Coverage: 87% (target: 80%) ✅              │             │
│  │  - Duration: 15s                               │             │
│  └────────────────────────────────────────────────┘             │
│  ┌────────────────────────────────────────────────┐             │
│  │  Playwright (E2E Tests)                        │             │
│  │  - 18 tests passed                             │             │
│  │  - All browsers: ✅                            │             │
│  │  - Duration: 2m 34s                            │             │
│  └────────────────────────────────────────────────┘             │
│  ┌────────────────────────────────────────────────┐             │
│  │  Axe (Accessibility)                           │             │
│  │  - 0 violations found ✅                       │             │
│  │  - Score: 100/100                              │             │
│  └────────────────────────────────────────────────┘             │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 3: BUILD                                 │
│  ┌────────────────────────────────────────────────┐             │
│  │  Vite Build                                    │             │
│  │  - Bundling assets                             │             │
│  │  - Minifying JS/CSS                            │             │
│  │  - Optimizing images                           │             │
│  │  - Generating source maps                      │             │
│  │  - Output: dist/ (2.4MB total)                 │             │
│  │  - Duration: 47s                               │             │
│  └────────────────────────────────────────────────┘             │
│  ┌────────────────────────────────────────────────┐             │
│  │  Bundle Analysis                               │             │
│  │  - main.js: 187KB (gzipped) ✅                 │             │
│  │  - vendor.js: 156KB (gzipped) ✅               │             │
│  │  - Total: 343KB under budget ✅                │             │
│  └────────────────────────────────────────────────┘             │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 4: PERFORMANCE AUDIT                     │
│  ┌────────────────────────────────────────────────┐             │
│  │  Lighthouse CI                                 │             │
│  │  - Performance: 94 ✅                          │             │
│  │  - Accessibility: 100 ✅                       │             │
│  │  - Best Practices: 100 ✅                      │             │
│  │  - SEO: 100 ✅                                 │             │
│  │  - All targets met ✅                          │             │
│  └────────────────────────────────────────────────┘             │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 5: DEPLOY TO PREVIEW                     │
│  ┌────────────────────────────────────────────────┐             │
│  │  Vercel Preview Deployment                     │             │
│  │  - URL: https://tarot-museum-abc123.vercel.app │             │
│  │  - Environment: preview                        │             │
│  │  - Status: Ready ✅                            │             │
│  │  - Comment posted to PR                        │             │
│  └────────────────────────────────────────────────┘             │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 6: CODE REVIEW                           │
│  - Teammate reviews PR                                           │
│  - Tests preview deployment                                      │
│  - Approves changes                                              │
│  - Merges to main                                                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 7: PRODUCTION DEPLOY                     │
│  ┌────────────────────────────────────────────────┐             │
│  │  Vercel Production Deployment                  │             │
│  │  - URL: https://tarot-museum.org              │             │
│  │  - Environment: production                     │             │
│  │  - Deploy strategy: Blue-Green                 │             │
│  │  - Rollout: Progressive (10% → 100%)           │             │
│  │  - Status: Live ✅                             │             │
│  └────────────────────────────────────────────────┘             │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 8: POST-DEPLOY MONITORING                │
│  ┌────────────────────────────────────────────────┐             │
│  │  Health Checks                                 │             │
│  │  - Homepage: 200 OK ✅                         │             │
│  │  - API endpoints: Healthy ✅                   │             │
│  │  - CDN: Serving assets ✅                      │             │
│  └────────────────────────────────────────────────┘             │
│  ┌────────────────────────────────────────────────┐             │
│  │  Real User Monitoring                          │             │
│  │  - Tracking Core Web Vitals                    │             │
│  │  - Error monitoring active                     │             │
│  │  - Performance alerts configured               │             │
│  └────────────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

**Diagrams Complete** ✅

These diagrams provide visual representations of:
1. System architecture
2. Frontend application structure
3. Component hierarchy
4. Data flow
5. Performance optimization
6. Search architecture
7. Image loading strategy
8. Accessibility flows
9. Deployment pipeline

Refer to `architecture-blueprint.md` for detailed explanations of each diagram.
