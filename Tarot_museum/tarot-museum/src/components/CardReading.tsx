/**
 * Interactive Card Reading Component
 * Educational demonstrations of tarot spreads
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TarotCard, getRandomCards } from '../data/tarotDatabase';
import { CardDisplay } from './CardDisplay';
import { Shuffle, Info, X } from 'lucide-react';

type SpreadType = 'single' | 'three-card' | 'celtic-cross' | 'past-present-future';

interface SpreadPosition {
  position: number;
  label: string;
  description: string;
}

const spreadConfigs: Record<SpreadType, { name: string; positions: SpreadPosition[] }> = {
  'single': {
    name: 'Single Card',
    positions: [
      { position: 0, label: 'Your Card', description: 'Focus and insight for your question' }
    ]
  },
  'three-card': {
    name: 'Three Card Spread',
    positions: [
      { position: 0, label: 'Situation', description: 'The current situation or challenge' },
      { position: 1, label: 'Action', description: 'What to do or consider' },
      { position: 2, label: 'Outcome', description: 'Potential result or lesson' }
    ]
  },
  'past-present-future': {
    name: 'Past, Present, Future',
    positions: [
      { position: 0, label: 'Past', description: 'Influences from the past' },
      { position: 1, label: 'Present', description: 'Current situation and energy' },
      { position: 2, label: 'Future', description: 'Potential outcome and direction' }
    ]
  },
  'celtic-cross': {
    name: 'Celtic Cross (Simplified)',
    positions: [
      { position: 0, label: 'Present', description: 'The heart of the matter' },
      { position: 1, label: 'Challenge', description: 'What crosses or challenges you' },
      { position: 2, label: 'Foundation', description: 'Underlying foundation or past' },
      { position: 3, label: 'Recent Past', description: 'What is passing away' },
      { position: 4, label: 'Possible Future', description: 'Potential outcome' },
      { position: 5, label: 'Near Future', description: 'What is approaching' },
      { position: 6, label: 'Your Approach', description: 'How you view yourself' },
      { position: 7, label: 'External Influences', description: 'Environment and others' },
      { position: 8, label: 'Hopes/Fears', description: 'Your hopes and fears' },
      { position: 9, label: 'Outcome', description: 'Final outcome and lesson' }
    ]
  }
};

export const CardReading: React.FC = () => {
  const [spreadType, setSpreadType] = useState<SpreadType>('three-card');
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const spreadConfig = spreadConfigs[spreadType];

  const drawCards = () => {
    setIsReading(true);
    setSelectedCardIndex(null);
    const drawnCards = getRandomCards(spreadConfig.positions.length);
    setCards(drawnCards);
  };

  const resetReading = () => {
    setIsReading(false);
    setCards([]);
    setSelectedCardIndex(null);
  };

  useEffect(() => {
    resetReading();
  }, [spreadType]);

  const getCardPosition = (index: number) => {
    if (spreadType === 'celtic-cross') {
      // Celtic Cross layout positions
      const positions = [
        'col-start-2 row-start-2', // 0: Present
        'col-start-2 row-start-2', // 1: Challenge (overlapping)
        'col-start-2 row-start-3', // 2: Foundation
        'col-start-1 row-start-2', // 3: Recent Past
        'col-start-3 row-start-2', // 4: Possible Future
        'col-start-2 row-start-1', // 5: Near Future
        'col-start-4 row-start-4', // 6: Your Approach
        'col-start-4 row-start-3', // 7: External
        'col-start-4 row-start-2', // 8: Hopes/Fears
        'col-start-4 row-start-1'  // 9: Outcome
      ];
      return positions[index];
    }
    return '';
  };

  return (
    <div className="card-reading-container max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Interactive Tarot Reading
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore traditional tarot spreads for educational purposes. Each spread offers a different
          perspective on your question or situation.
        </p>
      </div>

      {/* Spread Selection */}
      <div className="mb-8 flex flex-wrap gap-3 justify-center">
        {Object.entries(spreadConfigs).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSpreadType(key as SpreadType)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              spreadType === key
                ? 'bg-purple-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {config.name}
          </button>
        ))}
      </div>

      {/* Info Button */}
      <div className="mb-6 text-center">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          <Info className="w-4 h-4" />
          About This Spread
        </button>
      </div>

      {/* Spread Info */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {spreadConfig.name}
              </h3>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {spreadConfig.positions.map((pos) => (
                <div key={pos.position} className="flex gap-3">
                  <span className="font-medium text-purple-600 dark:text-purple-400 min-w-[120px]">
                    {pos.label}:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {pos.description}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draw Cards Button */}
      {!isReading && (
        <div className="text-center mb-8">
          <button
            onClick={drawCards}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <Shuffle className="w-6 h-6" />
            Draw Cards
          </button>
        </div>
      )}

      {/* Card Spread Display */}
      {isReading && cards.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          {spreadType === 'celtic-cross' ? (
            // Celtic Cross Layout
            <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className={`${getCardPosition(index)} ${
                    index === 1 ? 'rotate-90' : ''
                  }`}
                  onClick={() => setSelectedCardIndex(index)}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      {spreadConfig.positions[index].label}
                    </p>
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {card.element === 'fire' && '🔥'}
                        {card.element === 'water' && '💧'}
                        {card.element === 'air' && '🌬️'}
                        {card.element === 'earth' && '🌍'}
                        {!card.element && '✨'}
                      </div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">
                        {card.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Linear Spreads
            <div className="flex flex-wrap justify-center gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="w-64"
                  onClick={() => setSelectedCardIndex(index)}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 text-center">
                      {spreadConfig.positions[index].label}
                    </p>
                    <CardDisplay
                      card={card}
                      showDetails={false}
                      interactive={false}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Reset Button */}
          <div className="text-center mt-8">
            <button
              onClick={resetReading}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors"
            >
              New Reading
            </button>
          </div>
        </motion.div>
      )}

      {/* Selected Card Details */}
      <AnimatePresence>
        {selectedCardIndex !== null && cards[selectedCardIndex] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCardIndex(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {spreadConfig.positions[selectedCardIndex].label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {spreadConfig.positions[selectedCardIndex].description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCardIndex(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <CardDisplay
                  card={cards[selectedCardIndex]}
                  showDetails={true}
                  interactive={true}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Note */}
      <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Educational Purpose:</strong> This interactive reading tool is designed for
          learning and exploration. Tarot is a rich symbolic system used throughout history
          for self-reflection and storytelling. The meanings provided represent traditional
          interpretations from various tarot traditions.
        </p>
      </div>
    </div>
  );
};

export default CardReading;
