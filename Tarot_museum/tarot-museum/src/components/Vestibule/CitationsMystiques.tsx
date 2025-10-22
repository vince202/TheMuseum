import React, { useState, useEffect } from 'react';
import { Citation } from '../../data/gallicaContent';

interface CitationsMystiquesProps {
  citations: Citation[];
  interval?: number; // milliseconds
}

export const CitationsMystiques: React.FC<CitationsMystiquesProps> = ({
  citations,
  interval = 8000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % citations.length);
    }, interval);

    return () => clearInterval(timer);
  }, [citations.length, interval]);

  // Positions aléatoires mais élégantes
  const positions = [
    { top: '15%', left: '10%' },
    { top: '20%', right: '15%' },
    { bottom: '25%', left: '12%' }
  ];

  const position = positions[currentIndex % positions.length];
  const citation = citations[currentIndex];

  return (
    <div
      className="citation-mystique"
      style={position}
      key={currentIndex}
    >
      <span className="citation-text">"{citation.text}"</span>
      {citation.author && (
        <span className="citation-author block mt-2 text-museumGold/60 text-sm">
          — {citation.author}{citation.year && `, ${citation.year}`}
        </span>
      )}
    </div>
  );
};
