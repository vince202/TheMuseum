/**
 * Enhanced Card Grid with 3D Tilt and Ripple Effects
 * Features: Stagger animation, 3D tilt following mouse, scale + glow, ripple on click
 */

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TarotCard } from '../data/tarotDatabase';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

interface CardGridProps {
  cards: TarotCard[];
  onCardClick?: (card: TarotCard) => void;
  columns?: number;
}

// Ripple effect component
const RippleEffect: React.FC<{ x: number; y: number; onComplete: () => void }> = ({
  x,
  y,
  onComplete
}) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="w-20 h-20 rounded-full border-2 border-cyan-400" />
    </motion.div>
  );
};

// Individual card component with 3D tilt
const Card3DTilt: React.FC<{
  card: TarotCard;
  index: number;
  onClick: () => void;
}> = ({ card, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  let rippleIdCounter = 0;

  // Mouse position relative to card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize to -0.5 to 0.5
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples((prev) => [...prev, { id: rippleIdCounter++, x, y }]);
    onClick();
  };

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
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
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{
        scale: 1.08,
        y: -10,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      style={{
        perspective: 1000,
      }}
      className="cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="relative h-64 rounded-xl overflow-hidden shadow-2xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow background */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"
          whileHover={{ opacity: 0.7 }}
        />

        {/* Card container */}
        <div className="relative h-full rounded-xl overflow-hidden">
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getSuitColor(card.suit)}`}>
            {/* Shimmer overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{
                x: '100%',
                transition: { duration: 0.8, ease: 'easeInOut' }
              }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Card content */}
          <div className="relative h-full p-4 flex flex-col items-center justify-between text-white"
               style={{ transform: 'translateZ(20px)' }}>

            {/* Header */}
            <div className="text-center w-full">
              <motion.h3
                className="text-lg font-bold mb-1 line-clamp-2 drop-shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                {card.name}
              </motion.h3>
              {card.number !== undefined && (
                <p className="text-2xl font-serif opacity-90">{card.number}</p>
              )}
            </div>

            {/* Icon with magical animation */}
            <motion.div
              className="flex-1 flex items-center justify-center"
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                scale: 1.2,
                transition: { duration: 0.6 }
              }}
            >
              <div className="text-6xl drop-shadow-2xl">
                {getElementIcon(card.element)}
              </div>
            </motion.div>

            {/* Footer badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs w-full">
              {card.element && (
                <motion.span
                  className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full capitalize border border-white/40"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                >
                  {card.element}
                </motion.span>
              )}
              <motion.span
                className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full capitalize border border-white/40"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
              >
                {card.arcana}
              </motion.span>
            </div>
          </div>

          {/* Hover gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 pointer-events-none"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm font-medium drop-shadow-lg">
                Click to explore
              </p>
            </div>
          </motion.div>

          {/* Edge shine effect */}
          <div className="absolute inset-0 rounded-xl pointer-events-none">
            <div className="absolute inset-0 rounded-xl border-2 border-white/20" />
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-cyan-400/0"
              whileHover={{
                borderColor: 'rgba(34, 211, 238, 0.6)',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Ripple effects */}
          {ripples.map((ripple) => (
            <RippleEffect
              key={ripple.id}
              x={ripple.x}
              y={ripple.y}
              onComplete={() => removeRipple(ripple.id)}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main grid component
export const CardGrid: React.FC<CardGridProps> = ({
  cards,
  onCardClick,
  columns = 4
}) => {
  const navigate = useNavigate();

  const handleCardClick = (card: TarotCard) => {
    if (onCardClick) {
      onCardClick(card);
    } else {
      navigate(`/card/${card.id}`);
    }
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  };

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[4]} gap-8 p-4`}>
      {cards.map((card, index) => (
        <Card3DTilt
          key={card.id}
          card={card}
          index={index}
          onClick={() => handleCardClick(card)}
        />
      ))}
    </div>
  );
};

export default CardGrid;
