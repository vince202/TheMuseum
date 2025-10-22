import React, { useState } from 'react';
import { GallicaLivre } from '../../data/gallicaContent';
import { X } from 'lucide-react';

interface LivresConsultablesProps {
  livres: GallicaLivre[];
}

export const LivresConsultables: React.FC<LivresConsultablesProps> = ({ livres }) => {
  const [selectedBook, setSelectedBook] = useState<GallicaLivre | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingBook, setLoadingBook] = useState<string | null>(null);

  const handleOpenBook = (livre: GallicaLivre) => {
    setSelectedBook(livre);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 300);
  };

  return (
    <>
      <div className="livres-consultables-container max-w-6xl mx-auto px-6 py-16">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-museumGold mb-4">
            Archives Consultables
          </h2>
          <div className="divider-vestibule">
            <div className="divider-line" />
            <span className="divider-icon">✦</span>
            <div className="divider-line" />
          </div>
          <p className="text-museumAmber/70 text-sm tracking-wide max-w-2xl mx-auto mt-4">
            Feuilletez les ouvrages fondateurs qui ont façonné notre compréhension du Tarot
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {livres.map((livre) => (
            <div
              key={livre.id}
              className="livre-card group cursor-pointer"
              onClick={() => handleOpenBook(livre)}
            >
              {/* Cover Preview */}
              <div className="livre-cover-container relative mb-4 overflow-hidden rounded-sm border border-museumGold/20 bg-museumCharcoal">
                <div className="aspect-[2/3] relative">
                  {loadingBook === livre.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-museumBlack/80 z-10">
                      <div className="loading-spinner w-8 h-8 border-2 border-museumGold/30 border-t-museumGold rounded-full animate-spin" />
                    </div>
                  )}
                  <img
                    src={livre.coverImage}
                    alt={`Couverture de ${livre.titre}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onLoad={() => setLoadingBook(null)}
                    onLoadStart={() => setLoadingBook(livre.id)}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-museumBlack/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="text-museumGold text-sm font-serif tracking-wider">
                      Feuilleter →
                    </span>
                  </div>
                </div>
              </div>

              {/* Book Info */}
              <div className="livre-info">
                <h3 className="text-museumGold font-serif text-lg mb-2 line-clamp-2 group-hover:text-museumGoldLight transition-colors">
                  {livre.titre}
                </h3>
                <p className="text-museumAmber/70 text-sm mb-1">
                  {livre.auteur}
                </p>
                <p className="text-museumAmber/50 text-xs mb-3">
                  {livre.date}
                </p>
                <p className="text-museumParchment/60 text-sm line-clamp-3 leading-relaxed">
                  {livre.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full book viewing */}
      {isModalOpen && selectedBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full h-full max-w-7xl max-h-[95vh] m-4 bg-museumCharcoal rounded-lg shadow-vintage-deep border border-museumGold/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-museumBlack/95 backdrop-blur-sm border-b border-museumGold/20 px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-museumGold font-serif text-xl mb-1">
                    {selectedBook.titre}
                  </h3>
                  <p className="text-museumAmber/70 text-sm">
                    {selectedBook.auteur} — {selectedBook.date}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="close-gothic text-museumGold hover:text-museumGoldLight transition-colors p-2"
                  aria-label="Fermer"
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            {/* Iframe Content */}
            <div className="w-full h-full pt-20 pb-4 px-4">
              <iframe
                src={selectedBook.iframeUrl}
                title={selectedBook.titre}
                className="w-full h-full border-0 rounded-sm"
                loading="lazy"
                allow="fullscreen"
              />
            </div>

            {/* Footer hint */}
            <div className="absolute bottom-0 left-0 right-0 bg-museumBlack/80 backdrop-blur-sm border-t border-museumGold/10 px-6 py-3 rounded-b-lg">
              <p className="text-museumAmber/50 text-xs text-center">
                Source : Bibliothèque nationale de France — Gallica
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
