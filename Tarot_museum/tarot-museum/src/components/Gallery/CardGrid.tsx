import React from 'react';
import { TarotCard } from '@/types/tarot';
import GridLayout from '@/components/UI/GridLayout';
import CardThumbnail from './CardThumbnail';

interface CardGridProps {
  cards: TarotCard[];
  onCardSelect: (card: TarotCard) => void;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  loading?: boolean;
}

const CardGrid: React.FC<CardGridProps> = ({
  cards,
  onCardSelect,
  columns = 3,
  loading = false,
}) => {
  if (loading) {
    return (
      <GridLayout columns={columns}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[2/3] bg-gray-200 rounded-lg animate-pulse"
            role="presentation"
            aria-hidden="true"
          />
        ))}
      </GridLayout>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No cards found</div>
        <div className="text-gray-400 text-sm">
          Try adjusting your search filters
        </div>
      </div>
    );
  }

  return (
    <GridLayout columns={columns} className="mb-8">
      {cards.map((card) => (
        <CardThumbnail
          key={card.id}
          card={card}
          onClick={() => onCardSelect(card)}
        />
      ))}
    </GridLayout>
  );
};

export default CardGrid;