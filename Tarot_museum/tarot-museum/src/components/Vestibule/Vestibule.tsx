import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { vestibuleContent, GallicaGravure } from '../../data/gallicaContent';
import { CitationsMystiques } from './CitationsMystiques';
import { LivresConsultables } from './LivresConsultables';
import { GaleriePortraits } from './GaleriePortraits';
import { PorteSortie } from './PorteSortie';
import './Vestibule.css';

export const Vestibule: React.FC = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="vestibule-container relative">
      {/* Gravures decoratives en overlay */}
      {vestibuleContent.gravuresDecor.map((gravure: GallicaGravure) => (
        <div
          key={gravure.id}
          className="gravure-overlay hidden lg:block"
          style={{
            ...gravure.position,
            width: gravure.size.width,
            height: gravure.size.height,
            opacity: gravure.opacity
          }}
        >
          <iframe
            src={gravure.iframeMini}
            title={gravure.titre}
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              pointerEvents: 'none' as const,
              mixBlendMode: (gravure.blendMode || 'multiply') as React.CSSProperties['mixBlendMode']
            }}
            loading="lazy"
          />
        </div>
      ))}

      {/* Audio placeholder (sera ajouté par Vincent) */}
      {/* <audio autoplay loop volume={0.3}>
        <source src="/audio/hera-vestibule.mp3" type="audio/mpeg" />
      </audio> */}

      {/* ZONE 1 - HERO SECTION */}
      <section className="vestibule-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <h1 className="titre-vestibule">Le Vestibule des Initiés</h1>
          <p className="sous-titre-vestibule">
            Là où commence le mystère
          </p>
        </motion.div>

        {/* Divider */}
        <div className="divider-vestibule mt-12">
          <div className="divider-line" />
          <span className="divider-icon">✦</span>
          <div className="divider-line" />
        </div>

        {/* Citations flottantes */}
        <CitationsMystiques citations={vestibuleContent.citations} />

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-museumAmber/40 text-xs tracking-widest uppercase">
              Explorez
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-museumGold/50 to-transparent animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* ZONE 2 - GALERIE DES FONDATEURS */}
      <section className="relative z-10 bg-museumBlack/40 backdrop-blur-sm">
        <GaleriePortraits fondateurs={vestibuleContent.fondateurs} />
      </section>

      {/* ZONE 3 - LIVRES CONSULTABLES */}
      <section className="relative z-10">
        <LivresConsultables livres={vestibuleContent.livres} />
      </section>

      {/* ZONE 4 - PORTE VERS SALLE SUIVANTE */}
      <section className="relative z-10 bg-museumBlack/60 backdrop-blur-sm">
        <PorteSortie
          nextRoom="/jeux-perdus"
          nextRoomTitle="La Salle des Jeux Perdus"
        />
      </section>

      {/* Footer minimal */}
      <footer className="relative z-10 border-t border-museumGold/10 px-6 py-8 bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-museumAmber/30 text-xs tracking-widest">
            ✦ SOURCES : BIBLIOTHÈQUE NATIONALE DE FRANCE — GALLICA ✦
          </p>
        </div>
      </footer>
    </div>
  );
};
