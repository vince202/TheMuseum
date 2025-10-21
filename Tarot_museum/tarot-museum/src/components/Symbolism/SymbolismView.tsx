import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Eye } from 'lucide-react';
import { TarotSymbol, TarotCard } from '@/types/tarot';
import SearchBar from '@/components/UI/SearchBar';
import GridLayout from '@/components/UI/GridLayout';
import Modal from '@/components/UI/Modal';

interface SymbolismViewProps {
  symbols: TarotSymbol[];
  cards: TarotCard[];
  onSymbolSelect?: (symbol: TarotSymbol) => void;
  onCardSelect?: (card: TarotCard) => void;
}

const SymbolismView: React.FC<SymbolismViewProps> = ({
  symbols,
  cards,
  onCardSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState<TarotSymbol | null>(null);
  const [showSymbolModal, setShowSymbolModal] = useState(false);

  const filteredSymbols = useMemo(() => {
    let filtered = symbols;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(symbol =>
        symbol.name.toLowerCase().includes(query) ||
        symbol.description.toLowerCase().includes(query) ||
        symbol.meaning.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [symbols, searchQuery]);

  const getCategoryColor = (category: TarotSymbol['category']) => {
    const colors = {
      color: 'bg-red-100 text-red-800 border-red-300',
      element: 'bg-blue-100 text-blue-800 border-blue-300',
      number: 'bg-purple-100 text-purple-800 border-purple-300',
      animal: 'bg-green-100 text-green-800 border-green-300',
      object: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      celestial: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      figure: 'bg-pink-100 text-pink-800 border-pink-300',
    };
    return colors[category];
  };

  const getRelatedCards = (symbolCardIds: string[]) => {
    return cards.filter(card => symbolCardIds.includes(card.id));
  };

  const handleSymbolClick = (symbol: TarotSymbol) => {
    setSelectedSymbol(symbol);
    setShowSymbolModal(true);
  };

  const SymbolCard: React.FC<{ symbol: TarotSymbol }> = ({ symbol }) => {
    const relatedCards = getRelatedCards(symbol.cards);

    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={() => handleSymbolClick(symbol)}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{symbol.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(symbol.category)}`}>
              {symbol.category}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{symbol.description}</p>
        </div>

        <div className="p-4 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-2">Symbolic Meaning</h4>
          <p className="text-sm text-gray-700 line-clamp-3">{symbol.meaning}</p>
        </div>

        {relatedCards.length > 0 && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Found in {relatedCards.length} card{relatedCards.length > 1 ? 's' : ''}
              </span>
              <Eye size={16} className="text-gray-400" />
            </div>
            <div className="flex -space-x-2">
              {relatedCards.slice(0, 3).map((card) => (
                <img
                  key={card.id}
                  src={card.imageUrl}
                  alt={card.name}
                  className="w-8 h-12 object-cover rounded border-2 border-white shadow-sm"
                  title={card.name}
                />
              ))}
              {relatedCards.length > 3 && (
                <div className="w-8 h-12 bg-gray-100 border-2 border-white rounded flex items-center justify-center shadow-sm">
                  <span className="text-xs text-gray-600">+{relatedCards.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tarot Symbolism</h1>
          <p className="text-gray-600 mt-1">
            Discover the meanings behind the symbols in tarot imagery
          </p>
        </div>

        <SearchBar
          query={searchQuery}
          onQueryChange={setSearchQuery}
          placeholder="Search symbols and meanings..."
          className="w-full"
        />
      </div>

      <AnimatePresence>
        {filteredSymbols.length > 0 ? (
          <GridLayout columns={3} className="mb-8">
            {filteredSymbols.map((symbol) => (
              <SymbolCard key={symbol.id} symbol={symbol} />
            ))}
          </GridLayout>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Tag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No symbols found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal
        isOpen={showSymbolModal}
        onClose={() => setShowSymbolModal(false)}
        title={selectedSymbol?.name}
        size="lg"
      >
        {selectedSymbol && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 mb-4">{selectedSymbol.description}</p>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm font-medium text-gray-500">Category:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(selectedSymbol.category)}`}>
                    {selectedSymbol.category}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Symbolic Meaning</h3>
                <p className="text-gray-700">{selectedSymbol.meaning}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Cards featuring this symbol ({getRelatedCards(selectedSymbol.cards).length})
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getRelatedCards(selectedSymbol.cards).map((card) => (
                  <motion.button
                    key={card.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowSymbolModal(false);
                      onCardSelect?.(card);
                    }}
                    className="group text-left"
                  >
                    <div className="aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden mb-2">
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm group-hover:text-purple-600 transition-colors">
                      {card.name}
                    </h4>
                    <p className="text-xs text-gray-600 capitalize">{card.suit}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SymbolismView;