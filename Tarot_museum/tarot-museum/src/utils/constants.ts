import { TarotCard, TarotSymbol, TimelineEvent } from '@/types/tarot';

export const MUSEUM_SECTIONS = {
  GALLERY: 'gallery',
  CARD_VIEWER: 'card-viewer',
  TIMELINE: 'timeline',
  SYMBOLISM: 'symbolism',
} as const;

export const TAROT_SUITS = {
  MAJOR: 'major',
  CUPS: 'cups',
  WANDS: 'wands',
  SWORDS: 'swords',
  PENTACLES: 'pentacles',
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 0.8,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const;

// Sample data for development
export const SAMPLE_CARDS: TarotCard[] = [
  {
    id: 'the-fool',
    name: 'The Fool',
    suit: 'major',
    number: 0,
    arcana: 'major',
    keywords: ['beginnings', 'innocence', 'spontaneity', 'free spirit'],
    description: 'The Fool represents new beginnings, spontaneity, and innocence.',
    symbolism: [
      {
        id: 'white-rose',
        name: 'White Rose',
        description: 'Purity and innocence',
        meaning: 'Represents pure intentions and spiritual awakening',
        category: 'object',
        cards: ['the-fool'],
      },
    ],
    upright: {
      meaning: 'New beginnings, innocence, spontaneity, free spirit',
      keywords: ['fresh start', 'leap of faith', 'adventure'],
    },
    reversed: {
      meaning: 'Recklessness, taken advantage of, inconsideration',
      keywords: ['reckless', 'careless', 'foolish'],
    },
    imageUrl: '/images/cards/major/the-fool.jpg',
    modelUrl: '/models/cards/the-fool.glb',
    historicalPeriod: '15th Century',
    deck: 'Rider-Waite-Smith',
    artist: 'Pamela Colman Smith',
    dateCreated: '1909',
    culturalContext: 'Western esoteric tradition',
  },
  {
    id: 'ace-of-cups',
    name: 'Ace of Cups',
    suit: 'cups',
    number: 1,
    arcana: 'minor',
    keywords: ['love', 'emotions', 'spirituality', 'intuition'],
    description: 'The Ace of Cups represents new emotional beginnings and spiritual awakening.',
    symbolism: [
      {
        id: 'chalice',
        name: 'Chalice',
        description: 'Sacred vessel for divine love',
        meaning: 'Represents receptivity to spiritual and emotional fulfillment',
        category: 'object',
        cards: ['ace-of-cups'],
      },
    ],
    upright: {
      meaning: 'Love, new relationships, compassion, creativity',
      keywords: ['emotional fulfillment', 'spiritual awakening', 'intuition'],
    },
    reversed: {
      meaning: 'Emotional loss, blocked creativity, emptiness',
      keywords: ['emotional blockage', 'lack of love', 'creative block'],
    },
    imageUrl: '/images/cards/cups/ace-of-cups.jpg',
    modelUrl: '/models/cards/ace-of-cups.glb',
    historicalPeriod: '15th Century',
    deck: 'Rider-Waite-Smith',
    artist: 'Pamela Colman Smith',
    dateCreated: '1909',
    culturalContext: 'Western esoteric tradition',
  },
];

export const SAMPLE_SYMBOLS: TarotSymbol[] = [
  {
    id: 'white-rose',
    name: 'White Rose',
    description: 'A symbol of purity, innocence, and spiritual awakening',
    meaning: 'Represents pure intentions and the soul\'s journey toward enlightenment',
    category: 'object',
    cards: ['the-fool'],
  },
  {
    id: 'chalice',
    name: 'Chalice',
    description: 'Sacred vessel representing the receptive feminine principle',
    meaning: 'Symbolizes emotional and spiritual receptivity, divine love, and the Holy Grail',
    category: 'object',
    cards: ['ace-of-cups'],
  },
];

export const SAMPLE_TIMELINE: TimelineEvent[] = [
  {
    id: 'tarot-origins',
    date: '1440',
    title: 'Early Tarot Decks',
    description: 'The first known tarot cards appear in Northern Italy',
    significance: 'Birth of tarot as we know it today',
    period: 'medieval',
    cards: ['the-fool'],
  },
  {
    id: 'rider-waite',
    date: '1909',
    title: 'Rider-Waite-Smith Deck',
    description: 'Arthur Edward Waite and Pamela Colman Smith create the most influential tarot deck',
    significance: 'Standardized tarot symbolism and made it accessible worldwide',
    period: 'modern',
    cards: ['the-fool', 'ace-of-cups'],
  },
];