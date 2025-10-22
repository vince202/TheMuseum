import React, { useState, useEffect } from 'react';

interface GallicaIframeProps {
  ark: string;
  initialPage?: number;
  totalPages?: number;
  fallbackPages?: number[];
  className?: string;
  title?: string;
  onError?: () => void;
  onLoad?: () => void;
}

/**
 * Composant iframe Gallica avec système de fallback automatique
 * Si une page ne charge pas, essaie automatiquement les pages de fallback
 */
export const GallicaIframe: React.FC<GallicaIframeProps> = ({
  ark,
  initialPage = 1,
  totalPages,
  fallbackPages = [1, 2, 3],
  className = '',
  title = 'Document Gallica',
  onError,
  onLoad
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [hasError, setHasError] = useState(false);
  const [attemptedPages, setAttemptedPages] = useState<number[]>([]);

  const buildIframeUrl = (page: number) => {
    return `https://gallica.bnf.fr/ark:/12148/${ark}/f${page}.item`;
  };

  const handleIframeError = () => {
    console.warn(`Gallica iframe failed to load: ${ark}/f${currentPage}`);
    setHasError(true);

    // Essayer le prochain fallback
    const nextFallback = fallbackPages.find(
      page => !attemptedPages.includes(page) && page !== currentPage
    );

    if (nextFallback) {
      setAttemptedPages(prev => [...prev, currentPage]);
      setCurrentPage(nextFallback);
      setHasError(false);
    } else {
      onError?.();
    }
  };

  const handleIframeLoad = () => {
    setHasError(false);
    onLoad?.();
  };

  useEffect(() => {
    setCurrentPage(initialPage);
    setAttemptedPages([]);
    setHasError(false);
  }, [ark, initialPage]);

  if (hasError && attemptedPages.length >= fallbackPages.length) {
    return (
      <div className={`flex items-center justify-center bg-museumCharcoal/50 border border-museumGold/20 rounded ${className}`}>
        <div className="text-center p-6">
          <p className="text-museumAmber/60 text-sm mb-2">
            Document temporairement indisponible
          </p>
          <p className="text-museumGold/40 text-xs">
            Source : Gallica BnF
          </p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      key={`${ark}-f${currentPage}`}
      src={buildIframeUrl(currentPage)}
      title={title}
      className={className}
      loading="lazy"
      allow="fullscreen"
      onError={handleIframeError}
      onLoad={handleIframeLoad}
    />
  );
};
