import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { TimelineEvent, TarotCard } from '@/types/tarot';
import SearchBar from '@/components/UI/SearchBar';

interface TimelineViewProps {
  events: TimelineEvent[];
  cards: TarotCard[];
  onEventSelect?: (event: TimelineEvent) => void;
  onCardSelect?: (card: TarotCard) => void;
}

const TimelineView: React.FC<TimelineViewProps> = ({
  events,
  cards,
  onCardSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, searchQuery]);

  const getRelatedCards = (eventCardIds: string[] | undefined) => {
    if (!eventCardIds) return [];
    return cards.filter(card => eventCardIds.includes(card.id));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tarot Timeline</h1>
          <p className="text-gray-600 mt-1">
            Explore the rich history and evolution of tarot through the ages
          </p>
        </div>

        <SearchBar
          query={searchQuery}
          onQueryChange={setSearchQuery}
          placeholder="Search timeline events..."
          className="w-full"
        />
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 via-blue-300 to-green-300"></div>

        <div className="space-y-8">
          <AnimatePresence>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute left-6 w-4 h-4 bg-white border-4 border-purple-500 rounded-full shadow-lg"></div>

                <div className="ml-16 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar size={16} />
                        <span className="font-medium">{event.date}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-700 mb-4">{event.description}</p>

                    <div className="bg-purple-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Historical Significance</h4>
                      <p className="text-purple-800 text-sm">{event.significance}</p>
                    </div>

                    {event.cards && event.cards.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Related Cards</h4>
                        <div className="flex flex-wrap gap-3">
                          {getRelatedCards(event.cards).map((card) => (
                            <motion.button
                              key={card.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => onCardSelect?.(card)}
                              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                            >
                              <div className="w-8 h-12 bg-gray-300 rounded overflow-hidden">
                                <img
                                  src={card.imageUrl}
                                  alt={card.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-medium text-gray-900">{card.name}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TimelineView;