/**
 * Explore Page - Browse all tarot cards
 */

import { useState } from 'react';
import { completeTarotDeck, TarotCard } from '../data/tarotDatabase';
import { CardGrid } from '../components/CardGrid';
import { SearchFilter } from '../components/SearchFilter';
import { motion } from 'framer-motion';
import { Layers, Info } from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const [filteredCards, setFilteredCards] = useState<TarotCard[]>(completeTarotDeck);

  return (
    <div className="explore-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <Layers className="w-12 h-12 text-purple-600 dark:text-purple-400" />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Explore Tarot Cards
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Browse the complete collection of 78 tarot cards. Click any card to learn more about
          its meaning, symbolism, and historical significance.
        </p>
      </motion.div>

      {/* Info Banner */}
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>The Complete Tarot Deck:</strong> Contains 78 cards divided into Major Arcana
              (22 cards representing life's major themes) and Minor Arcana (56 cards representing
              daily life across four suits: Wands, Cups, Swords, and Pentacles).
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <SearchFilter onResults={setFilteredCards} />

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Showing <span className="font-bold text-purple-600 dark:text-purple-400">
            {filteredCards.length}
          </span> of {completeTarotDeck.length} cards
        </p>
      </div>

      {/* Card Grid */}
      {filteredCards.length > 0 ? (
        <CardGrid cards={filteredCards} columns={4} />
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            No cards found matching your filters. Try adjusting your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
