import React, { useState, useEffect } from 'react';

interface CitationsMystiquesProps {
  citations: string[];
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
    { bottom: '25%', left: '12%' },
    { bottom: '20%', right: '10%' },
    { top: '40%', left: '8%' },
    { top: '45%', right: '12%' }
  ];

  const position = positions[currentIndex % positions.length];

  return (
    <div
      className="citation-mystique"
      style={position}
      key={currentIndex}
    >
      "{citations[currentIndex]}"
    </div>
  );
};
