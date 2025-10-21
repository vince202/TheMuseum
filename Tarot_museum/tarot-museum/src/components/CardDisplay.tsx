/**
 * Interactive Tarot Card Display Component
 * Features: Flip animation, detailed view, responsive design
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TarotCard } from '../data/tarotDatabase';
import { Sparkles, RotateCw, BookOpen, X } from 'lucide-react';

interface CardDisplayProps {
  card: TarotCard;
  isReversed?: boolean;
  showDetails?: boolean;
  interactive?: boolean;
  onFlip?: () => void;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({
  card,
  isReversed = false,
  showDetails = false,
  interactive = true,
  onFlip
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(showDetails);

  const handleFlip = () => {
    if (interactive) {
      setIsFlipped(!isFlipped);
      onFlip?.();
    }
  };

  const getSuitColor = (suit?: string) => {
    switch (suit) {
      case 'wands': return 'from-orange-500 to-red-500';
      case 'cups': return 'from-blue-500 to-cyan-500';
      case 'swords': return 'from-gray-500 to-slate-600';
      case 'pentacles': return 'from-green-500 to-emerald-600';
      case 'major': return 'from-purple-500 to-indigo-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getElementIcon = (element?: string) => {
    switch (element) {
      case 'fire': return '🔥';
      case 'water': return '💧';
      case 'air': return '🌬️';
      case 'earth': return '🌍';
      default: return '✨';
    }
  };

  return (
    <div className="card-display-container">
      {/* Card Flip Container */}
      <motion.div
        className="relative w-full max-w-sm mx-auto"
        style={{ perspective: 1000 }}
        whileHover={interactive ? { scale: 1.05, y: -5 } : {}}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Magical glow on hover */}
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0"
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.5 }}
          style={{ zIndex: -1 }}
        />

        <motion.div
          className="relative w-full h-96 cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.8,
            type: 'spring',
            stiffness: 100,
            damping: 15
          }}
          onClick={handleFlip}
        >
          {/* Card Front */}
          <motion.div
            className="absolute inset-0 backface-hidden rounded-2xl shadow-2xl overflow-hidden border-2 border-white/20"
            style={{
              transform: isReversed ? 'rotate(180deg)' : 'none',
              backfaceVisibility: 'hidden'
            }}
            whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
          >
            <div className={`relative w-full h-full bg-gradient-to-br ${getSuitColor(card.suit)} p-6 flex flex-col items-center justify-between text-white`}>
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut'
                }}
              />
              <div className="relative text-center z-10">
                <motion.h3
                  className="text-2xl font-bold mb-2 drop-shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  {card.name}
                </motion.h3>
                {card.number !== undefined && (
                  <p className="text-4xl font-serif opacity-90">{card.number}</p>
                )}
              </div>

              <div className="relative flex-1 flex items-center justify-center z-10">
                <motion.div
                  className="text-8xl drop-shadow-2xl"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {getElementIcon(card.element)}
                </motion.div>
              </div>

              <div className="relative flex items-center gap-2 text-sm z-10">
                {card.element && (
                  <motion.span
                    className="px-3 py-1.5 bg-white/30 backdrop-blur-sm rounded-full capitalize border border-white/40"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                  >
                    {card.element}
                  </motion.span>
                )}
                <motion.span
                  className="px-3 py-1.5 bg-white/30 backdrop-blur-sm rounded-full capitalize border border-white/40"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                >
                  {card.arcana}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Card Back */}
          <motion.div
            className="absolute inset-0 backface-hidden rounded-2xl shadow-2xl overflow-hidden border-2 border-white/20"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="relative w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 flex items-center justify-center">
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '20px 20px'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />

              <div className="relative text-center text-white z-10">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                  }}
                >
                  <Sparkles className="w-16 h-16 mx-auto mb-4" />
                </motion.div>
                <p className="text-xl font-serif drop-shadow-lg">Tarot Museum</p>
                <p className="text-sm opacity-75 mt-2">Click to reveal</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Glassmorphic Modal for Details */}
      <AnimatePresence>
        {showFullDetails && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFullDetails(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-y-auto"
            >
              <div className="min-h-full flex items-center justify-center p-4">
                <div className="relative w-full max-w-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 md:p-8"
                     onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setShowFullDetails(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Close details"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {card.name}
                      {isReversed && (
                        <span className="text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 px-2 py-1 rounded">
                          Reversed
                        </span>
                      )}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {card.arcana === 'major' ? 'Major Arcana' : `Minor Arcana - ${card.suit}`}
                    </p>
                    </div>

                    {/* Keywords */}
                    <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Keywords
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Upright:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {card.keywords.upright.map((keyword, idx) => (
                            <motion.span
                              key={idx}
                              className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm"
                              whileHover={{ scale: 1.1 }}
                            >
                              {keyword}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Reversed:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {card.keywords.reversed.map((keyword, idx) => (
                            <motion.span
                              key={idx}
                              className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-full text-sm"
                              whileHover={{ scale: 1.1 }}
                            >
                              {keyword}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                    </div>

                    {/* Meaning */}
                    <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Meaning
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {card.meaning}
                    </p>
                    </div>

                    {/* Symbolism */}
                    <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                      Symbolism
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {card.symbolism}
                    </p>
                    </div>

                    {/* Metadata */}
                    {(card.astrology || card.numerology) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {card.astrology && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Astrology</h4>
                          <p className="text-gray-600 dark:text-gray-400">{card.astrology}</p>
                        </div>
                      )}
                      {card.numerology && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Numerology</h4>
                          <p className="text-gray-600 dark:text-gray-400">{card.numerology}</p>
                        </div>
                      )}
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Show Details Button */}
      {!showFullDetails && (
        <motion.button
          onClick={() => setShowFullDetails(true)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full max-w-sm mx-auto flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          <BookOpen className="w-5 h-5" />
          View Full Details
        </motion.button>
      )}

      {/* Flip Card Button */}
      {interactive && (
        <motion.button
          onClick={handleFlip}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 w-full max-w-sm mx-auto flex items-center justify-center gap-2 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          <motion.div
            animate={{ rotate: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <RotateCw className="w-4 h-4" />
          </motion.div>
          {isFlipped ? 'Show Front' : 'Show Back'}
        </motion.button>
      )}
    </div>
  );
};

export default CardDisplay;
