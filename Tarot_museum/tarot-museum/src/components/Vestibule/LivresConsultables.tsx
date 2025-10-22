import React, { useState } from 'react';
import { GallicaLivre } from '../../data/gallicaContent';
import { X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface LivresConsultablesProps {
  livres: GallicaLivre[];
}

export const LivresConsultables: React.FC<LivresConsultablesProps> = ({ livres }) => {
  const [selectedBook, setSelectedBook] = useState<GallicaLivre | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingBook, setLoadingBook] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const handleOpenBook = (livre: GallicaLivre) => {
    setSelectedBook(livre);
    setIsModalOpen(true);
    setCurrentPage(1);
    setIframeLoading(true);
    setIframeError(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIframeLoading(true);
    setIframeError(false);
    setTimeout(() => {
      setSelectedBook(null);
      setCurrentPage(1);
    }, 300);
  };

  const handleNextPage = () => {
    if (selectedBook && currentPage < (selectedBook.totalPages || 1)) {
      setCurrentPage(prev => prev + 1);
      setIframeLoading(true);
      setIframeError(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      setIframeLoading(true);
      setIframeError(false);
    }
  };

  const buildPageUrl = (livre: GallicaLivre, page: number) => {
    return `https://gallica.bnf.fr/ark:/12148/${livre.ark}/f${page}.item`;
  };

  const tryFallbackPage = () => {
    if (!selectedBook?.fallbackPages) return;

    const nextFallback = selectedBook.fallbackPages.find(page => page !== currentPage);
    if (nextFallback) {
      setCurrentPage(nextFallback);
      setIframeError(false);
      setIframeLoading(true);
    } else {
      setIframeError(true);
    }
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
                    src={livre.coverUrl}
                    alt={`Couverture de ${livre.titre}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onLoad={() => setLoadingBook(null)}
                    onLoadStart={() => setLoadingBook(livre.id)}
                    onError={(e) => {
                      // Fallback si l'image ne charge pas
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      setLoadingBook(null);
                    }}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-museumBlack/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="text-museumGold text-sm font-serif tracking-wider flex items-center gap-2">
                      <BookOpen size={16} />
                      {livre.hoverText || 'Feuilleter →'}
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
                  {livre.hoverText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full book viewing with page navigation */}
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

            {/* Iframe Content with Loading */}
            <div className="w-full h-full pt-20 pb-20 px-4">
              {iframeLoading && !iframeError && (
                <div className="absolute inset-0 flex items-center justify-center bg-museumBlack/60 z-20">
                  <div className="flex flex-col items-center gap-3">
                    <div className="loading-spinner w-12 h-12 border-2 border-museumGold/30 border-t-museumGold rounded-full animate-spin" />
                    <p className="text-museumAmber/60 text-sm">Chargement de la page {currentPage}...</p>
                  </div>
                </div>
              )}

              {iframeError ? (
                <div className="w-full h-full flex items-center justify-center bg-museumCharcoal/50 border border-museumGold/20 rounded">
                  <div className="text-center p-6">
                    <p className="text-museumAmber/60 text-lg mb-4">
                      Cette page est temporairement indisponible
                    </p>
                    <button
                      onClick={tryFallbackPage}
                      className="px-4 py-2 bg-museumGold/20 text-museumGold border border-museumGold/40 rounded hover:bg-museumGold/30 transition-colors"
                    >
                      Essayer une autre page
                    </button>
                  </div>
                </div>
              ) : (
                <iframe
                  key={`${selectedBook.ark}-page-${currentPage}`}
                  src={buildPageUrl(selectedBook, currentPage)}
                  title={`${selectedBook.titre} - Page ${currentPage}`}
                  className="w-full h-full border-0 rounded-sm"
                  loading="lazy"
                  allow="fullscreen"
                  onLoad={() => setIframeLoading(false)}
                  onError={() => {
                    console.warn(`Failed to load page ${currentPage} of ${selectedBook.ark}`);
                    setIframeLoading(false);
                    tryFallbackPage();
                  }}
                />
              )}
            </div>

            {/* Footer with page navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-museumBlack/95 backdrop-blur-sm border-t border-museumGold/10 px-6 py-4 rounded-b-lg">
              <div className="flex items-center justify-between">
                <p className="text-museumAmber/50 text-xs">
                  Source : Bibliothèque nationale de France — Gallica
                </p>

                {/* Page Navigation */}
                {selectedBook.totalPages && selectedBook.totalPages > 1 && (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="p-2 text-museumGold hover:text-museumGoldLight disabled:text-museumGold/30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Page précédente"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <span className="text-museumAmber text-sm min-w-[80px] text-center">
                      Page {currentPage} / {selectedBook.totalPages}
                    </span>

                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === selectedBook.totalPages}
                      className="p-2 text-museumGold hover:text-museumGoldLight disabled:text-museumGold/30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Page suivante"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
