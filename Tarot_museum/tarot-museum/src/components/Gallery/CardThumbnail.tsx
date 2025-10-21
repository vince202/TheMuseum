import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { TarotCard } from '@/types/tarot';

interface CardThumbnailProps {
  card: TarotCard;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const CardThumbnail: React.FC<CardThumbnailProps> = ({
  card,
  onClick,
  size = 'md',
  showDetails = true,
}) => {
  const sizeClasses = {
    sm: 'aspect-[2/3]',
    md: 'aspect-[2/3]',
    lg: 'aspect-[2/3]',
  };

  const getSuitColor = (suit: TarotCard['suit']) => {
    const colors = {
      major: 'border-purple-500 text-purple-700',
      cups: 'border-blue-500 text-blue-700',
      wands: 'border-orange-500 text-orange-700',
      swords: 'border-gray-500 text-gray-700',
      pentacles: 'border-green-500 text-green-700',
    };
    return colors[suit];
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        'group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden',
        'transition-shadow duration-200 hover:shadow-lg',
        'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
        sizeClasses[size]
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${card.name}`}
    >
      <div className="relative h-3/4 overflow-hidden">
        <motion.img
          src={card.imageUrl}
          alt={card.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder-card.jpg';
          }}
        />
        
        <div className={clsx(
          'absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium',
          'bg-white bg-opacity-90 border-2',
          getSuitColor(card.suit)
        )}>
          {card.suit === 'major' ? 'Major' : card.suit.charAt(0).toUpperCase() + card.suit.slice(1)}
        </div>
      </div>

      {showDetails && (
        <div className="p-4 h-1/4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
              {card.name}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">
              {card.description}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CardThumbnail;