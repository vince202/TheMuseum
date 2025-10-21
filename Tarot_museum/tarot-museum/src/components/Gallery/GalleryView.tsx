import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TarotCard, SearchFilters, SortOption } from '@/types/tarot';
import SearchBar from '@/components/UI/SearchBar';
import CardGrid from './CardGrid';

interface GalleryViewProps {
  cards: TarotCard[];
  onCardSelect: (card: TarotCard) => void;
  loading?: boolean;
}

const GalleryView: React.FC<GalleryViewProps> = ({
  cards,
  onCardSelect,
  loading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setFilters] = useState<SearchFilters>({});
  const [sortBy] = useState<SortOption>('name-asc');
  const [viewMode] = useState<'grid' | 'list'>('grid');
  const [gridColumns] = useState<1 | 2 | 3 | 4 | 5 | 6>(3);

  const filterOptions = [
    {
      id: 'suit',
      label: 'Suit',
      type: 'checkbox' as const,
      options: [
        { label: 'Major Arcana', value: 'major' },
        { label: 'Cups', value: 'cups' },
        { label: 'Wands', value: 'wands' },
        { label: 'Swords', value: 'swords' },
        { label: 'Pentacles', value: 'pentacles' },
      ],
    },
  ];


  const filteredAndSortedCards = useMemo(() => {
    let filtered = cards;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(card =>
        card.name.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [cards, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tarot Gallery</h1>
            <p className="text-gray-600 mt-1">
              Explore {cards.length} cards from our collection
            </p>
          </div>
        </div>

        <SearchBar
          query={searchQuery}
          onQueryChange={setSearchQuery}
          filters={filterOptions}
          onFiltersChange={setFilters}
          placeholder="Search by name, keywords, or symbolism..."
        />
      </div>

      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CardGrid
          cards={filteredAndSortedCards}
          onCardSelect={onCardSelect}
          columns={viewMode === 'grid' ? gridColumns : 1}
          loading={loading}
        />
      </motion.div>
    </div>
  );
};

export default GalleryView;