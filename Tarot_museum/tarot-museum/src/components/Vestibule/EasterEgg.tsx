import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, BookMarked } from 'lucide-react';
import { EasterEgg as EasterEggType } from '../../data/gallicaContent';

interface EasterEggProps {
  easterEgg: EasterEggType;
}

export const EasterEgg: React.FC<EasterEggProps> = ({ easterEgg }) => {
  const [isDiscovered, setIsDiscovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    if (!isDiscovered) {
      setIsDiscovered(true);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Zone cliquable secrète */}
      <motion.div
        className="fixed z-40 cursor-pointer"
        style={{
          bottom: `${easterEgg.zone.bottom}px`,
          right: `${easterEgg.zone.right}px`,
          width: `${easterEgg.zone.width}px`,
          height: `${easterEgg.zone.height}px`
        }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{ scale: 1.05 }}
        animate={{
          opacity: isDiscovered ? 0.8 : 0.3
        }}
      >
        {/* Indicateur visuel subtil */}
        <div className="w-full h-full relative">
          {/* Glow effect on hover */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                className="absolute inset-0 bg-museumGold/10 rounded-full blur-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          {/* Icon centrale */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isDiscovered ? (
              <BookMarked
                className="text-museumGold drop-shadow-glow"
                size={isHovering ? 32 : 24}
                style={{ transition: 'all 0.3s ease' }}
              />
            ) : (
              <Eye
                className="text-museumAmber/40"
                size={isHovering ? 28 : 20}
                style={{ transition: 'all 0.3s ease' }}
              />
            )}
          </div>

          {/* Tooltip on hover */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                className="absolute bottom-full right-0 mb-2 w-48 pointer-events-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="bg-museumBlack/95 backdrop-blur-sm border border-museumGold/30 rounded px-3 py-2">
                  <p className="text-museumAmber/80 text-xs text-center">
                    {isDiscovered ? 'Consulter le grimoire' : '?'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Modal du grimoire secret */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative w-full h-full max-w-7xl max-h-[95vh] m-4 bg-museumCharcoal rounded-lg shadow-vintage-deep border-2 border-museumGold/50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header avec effet dramatique */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-museumBlack via-museumBlack/95 to-transparent border-b border-museumGold/30 px-6 py-6 rounded-t-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Titre mystérieux */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <BookMarked className="text-museumGold" size={32} />
                        <h3 className="text-museumGold font-serif text-2xl">
                          Grimoire Secret Découvert
                        </h3>
                      </div>
                      <p className="text-museumAmber/90 text-base leading-relaxed max-w-3xl">
                        {easterEgg.message}
                      </p>
                    </motion.div>

                    {/* Divider décoratif */}
                    <div className="flex items-center gap-3 mt-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-museumGold/30 to-transparent" />
                      <span className="text-museumGold/60 text-xs">✦</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-museumGold/30 to-transparent" />
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={handleCloseModal}
                    className="text-museumGold hover:text-museumGoldLight transition-colors p-2 hover:bg-museumGold/10 rounded"
                    aria-label="Fermer"
                  >
                    <X size={28} />
                  </button>
                </div>
              </div>

              {/* Iframe du grimoire */}
              <div className="w-full h-full pt-32 pb-16 px-4">
                <iframe
                  src={easterEgg.iframeSecret}
                  title="Grimoire Secret"
                  className="w-full h-full border-0 rounded shadow-inner"
                  loading="lazy"
                  allow="fullscreen"
                />
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-museumBlack via-museumBlack/95 to-transparent border-t border-museumGold/20 px-6 py-4 rounded-b-lg">
                <div className="flex items-center justify-between">
                  <p className="text-museumAmber/40 text-xs">
                    ✦ DOCUMENT RARE — BIBLIOTHÈQUE NATIONALE DE FRANCE ✦
                  </p>
                  <p className="text-museumGold/60 text-xs font-serif">
                    Découverte secrète #{isDiscovered ? '1' : '?'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
