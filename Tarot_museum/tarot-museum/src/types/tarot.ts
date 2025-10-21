export interface TarotCard {
  id: string;
  name: string;
  suit: 'major' | 'cups' | 'wands' | 'swords' | 'pentacles';
  number?: number;
  arcana: 'major' | 'minor';
  keywords: string[];
  description: string;
  symbolism: TarotSymbol[];
  upright: {
    meaning: string;
    keywords: string[];
  };
  reversed: {
    meaning: string;
    keywords: string[];
  };
  imageUrl: string;
  modelUrl?: string; // 3D model for interactive viewer
  historicalPeriod: string;
  deck: string;
  artist?: string;
  dateCreated?: string;
  culturalContext: string;
}

export interface TarotSymbol {
  id: string;
  name: string;
  description: string;
  meaning: string;
  category: 'color' | 'element' | 'number' | 'animal' | 'object' | 'celestial' | 'figure';
  imageUrl?: string;
  cards: string[]; // Card IDs that contain this symbol
}

export interface MuseumSection {
  id: string;
  title: string;
  description: string;
  cards: TarotCard[];
  theme: string;
  curatorNotes?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  significance: string;
  cards?: string[]; // Related card IDs
  imageUrl?: string;
  period: 'ancient' | 'medieval' | 'renaissance' | 'modern' | 'contemporary';
}

export interface SearchFilters {
  suit?: TarotCard['suit'][];
  arcana?: TarotCard['arcana'][];
  keywords?: string[];
  symbols?: string[];
  period?: string[];
  deck?: string[];
}

export interface MuseumState {
  currentCard: TarotCard | null;
  selectedSection: string | null;
  searchQuery: string;
  filters: SearchFilters;
  viewMode: 'grid' | 'timeline' | 'symbolism' | '3d';
  isLoading: boolean;
}

export type SortOption = 
  | 'name-asc' 
  | 'name-desc' 
  | 'chronological' 
  | 'suit' 
  | 'relevance';