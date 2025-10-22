import React, { useState } from 'react';
import { Fondateur } from '../../data/gallicaContent';

interface GaleriePortraitsProps {
  fondateurs: Fondateur[];
}

export const GaleriePortraits: React.FC<GaleriePortraitsProps> = ({ fondateurs }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="galerie-portraits-container max-w-7xl mx-auto px-6 py-16">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-museumGold mb-4">
          Les Fondateurs
        </h2>
        <div className="divider-vestibule">
          <div className="divider-line" />
          <span className="divider-icon">✦</span>
          <div className="divider-line" />
        </div>
        <p className="text-museumAmber/70 text-sm tracking-wide max-w-2xl mx-auto mt-4">
          Ceux qui ont dévoilé les mystères cachés dans les lames
        </p>
      </div>

      {/* Portraits Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {fondateurs.map((fondateur) => (
          <div
            key={fondateur.id}
            className="portrait-card"
            onMouseEnter={() => setHoveredId(fondateur.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Silhouette CSS */}
            <div className="portrait-silhouette" data-name={fondateur.nom} />

            {/* Info */}
            <div className="portrait-info">
              <h3 className="portrait-nom">{fondateur.nom}</h3>
              <p className="portrait-dates">{fondateur.dates}</p>
              <p className="portrait-titre">{fondateur.titre}</p>
            </div>

            {/* Bio tooltip on hover */}
            {hoveredId === fondateur.id && (
              <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-72 max-w-[90vw] bg-museumCharcoal/95 backdrop-blur-sm border border-museumGold/30 rounded-lg p-4 shadow-vintage-lg z-20 animate-fade-in">
                <div className="text-museumParchment/90 text-sm leading-relaxed">
                  {fondateur.bio}
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-museumGold/30" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
