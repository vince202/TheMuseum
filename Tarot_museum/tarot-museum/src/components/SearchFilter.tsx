/**
 * Search and Filter Component
 * Advanced search functionality for tarot cards
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Filter, SlidersHorizontal } from 'lucide-react';
import { TarotCard, completeTarotDeck, searchCards } from '../data/tarotDatabase';

interface SearchFilterProps {
  onResults: (cards: TarotCard[]) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    arcana: 'all' as 'all' | 'major' | 'minor',
    suit: 'all' as 'all' | 'wands' | 'cups' | 'swords' | 'pentacles' | 'major',
    element: 'all' as 'all' | 'fire' | 'water' | 'air' | 'earth'
  });

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters]);

  const applyFilters = () => {
    let results: TarotCard[] = searchQuery
      ? searchCards(searchQuery)
      : [...completeTarotDeck];

    // Apply arcana filter
    if (filters.arcana !== 'all') {
      results = results.filter(card => card.arcana === filters.arcana);
    }

    // Apply suit filter
    if (filters.suit !== 'all') {
      results = results.filter(card => card.suit === filters.suit);
    }

    // Apply element filter
    if (filters.element !== 'all') {
      results = results.filter(card => card.element === filters.element);
    }

    onResults(results);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilters({
      arcana: 'all',
      suit: 'all',
      element: 'all'
    });
  };

  const hasActiveFilters = () => {
    return (
      searchQuery !== '' ||
      filters.arcana !== 'all' ||
      filters.suit !== 'all' ||
      filters.element !== 'all'
    );
  };

  return (
    <div className="search-filter-container bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by card name, meaning, or keywords..."
            className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Toggle and Reset */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="font-medium">
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </span>
          {hasActiveFilters() && (
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          )}
        </button>

        {hasActiveFilters() && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="font-medium">Reset All</span>
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          {/* Arcana Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Arcana Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['all', 'major', 'minor'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFilters({ ...filters, arcana: option as any })}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    filters.arcana === option
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Suit Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Suit
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {['all', 'major', 'wands', 'cups', 'swords', 'pentacles'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFilters({ ...filters, suit: option as any })}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    filters.suit === option
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Element Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Element
            </label>
            <div className="grid grid-cols-5 gap-2">
              {['all', 'fire', 'water', 'air', 'earth'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFilters({ ...filters, element: option as any })}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    filters.element === option
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option === 'fire' && '🔥'}
                  {option === 'water' && '💧'}
                  {option === 'air' && '🌬️'}
                  {option === 'earth' && '🌍'}
                  {option === 'all' && 'All'}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchFilter;
