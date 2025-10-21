import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Candle, DreamClock, FloatingCard, RoomArchway, VintageButton, AudioToggle } from '../components/Vintage';
import '../components/Vintage/DreamClock.css';

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-museumBlack text-museumParchment">
      {/* Film Grain Overlay */}
      <div className="grain fixed inset-0 pointer-events-none z-50" aria-hidden="true" />

      {/* Vignette */}
      <div className="bg-vignette fixed inset-0 pointer-events-none z-40" aria-hidden="true" />

      {/* Sophisticated Gradient Background */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        {/* Deep radial gradient - vault lighting */}
        <div className="absolute inset-0 bg-gradient-radial from-museumStone/40 via-museumBlack to-black" />

        {/* Subtle gold accent streaks (candlelight) */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-conic from-museumGold/5 via-transparent to-transparent blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gradient-conic from-museumAmber/5 via-transparent to-transparent blur-3xl opacity-20" />
      </div>

      {/* Header - Minimal & Elegant */}
      <header className="relative z-30 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-museumGold/40 rounded-sm flex items-center justify-center">
            <span className="text-museumGold text-xl font-serif">✦</span>
          </div>
          <div className="tracking-[0.3em] text-[10px] md:text-xs text-museumGold/70 uppercase font-light">
            Musée du Tarot
          </div>
        </div>
        <AudioToggle audioSrc="/audio/ambience-fireplace.mp3" volume={0.18} />
      </header>

      {/* HERO SECTION - Cinematic */}
      <section
        ref={heroRef}
        className="relative z-20 min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-12"
      >
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="max-w-5xl"
        >
          {/* Main Title - Ultra Luxe Typography */}
          <h1 className="font-serif leading-[0.9] mb-6">
            <span className="block text-[clamp(3rem,10vw,8rem)] text-museumGold drop-shadow-[0_0_30px_rgba(211,183,124,0.3)]">
              MUSÉE DU TAROT
            </span>
          </h1>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 my-8" aria-hidden="true">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-museumGold/40 to-transparent" />
            <span className="text-museumGold/60 text-2xl">✦</span>
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-museumGold/40 to-transparent" />
          </div>

          {/* Subtitle */}
          <p className="text-museumAmber/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            Explorez cinq siècles d'histoire, de mystère et de symbolisme<br className="hidden md:block" />
            à travers les arcanes du tarot
          </p>

          {/* Dream Clock & CTA */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <DreamClock size={240} />
            <div className="flex flex-col gap-4">
              <VintageButton
                variant="primary"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                ENTRER AU MUSÉE
              </VintageButton>
              <p className="text-museumGold/50 text-xs tracking-widest uppercase">
                Une expérience immersive
              </p>
            </div>
          </div>

          {/* Candles - Bottom of Hero */}
          <div className="mt-16 flex items-end justify-center gap-6" aria-hidden="true">
            <Candle size="md" className="opacity-80" />
            <Candle size="lg" />
            <Candle size="md" className="opacity-90" />
            <Candle size="sm" className="opacity-70" />
            <Candle size="md" className="opacity-85" />
          </div>
        </motion.div>

        {/* Floating Cards - Absolute Positioned with Placeholders */}
        <div className="hidden lg:block" aria-hidden="true">
          <div className="absolute left-12 top-32">
            <div className="tarot-card-placeholder card-fool w-40 h-64 animate-float-gentle" style={{ animationDelay: '0s' }} />
          </div>
          <div className="absolute right-16 top-24">
            <div className="tarot-card-placeholder card-magician w-40 h-64 animate-float-gentle" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="absolute left-20 bottom-32">
            <div className="tarot-card-placeholder card-death w-40 h-64 animate-float-gentle" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute right-20 bottom-40">
            <div className="tarot-card-placeholder card-world w-40 h-64 animate-float-gentle" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </section>

      {/* ROOMS NAVIGATION - Les Salles */}
      <section id="rooms" className="relative z-20 px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-museumGold mb-4">
              Les Salles du Musée
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-museumGold/30" />
              <span className="text-museumGold/40">✦</span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-museumGold/30" />
            </div>
            <p className="text-museumAmber/70 text-sm md:text-base tracking-wide max-w-2xl mx-auto">
              Chaque salle révèle un aspect de l'histoire fascinante du tarot,<br className="hidden md:block" />
              de la Renaissance à nos jours
            </p>
          </div>

          {/* Rooms Grid - Phase 1 (4 salles principales) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <RoomArchway
              href="/vestibule"
              title="Le Vestibule"
              description="La naissance du mystère"
              icon="🕯️"
            />
            <RoomArchway
              href="/jeux-perdus"
              title="La Salle des Jeux Perdus"
              description="Les tarots historiques"
              icon="🃏"
            />
            <RoomArchway
              href="/cabinet-mages"
              title="Le Cabinet des Mages"
              description="Les textes fondateurs"
              icon="📜"
            />
            <RoomArchway
              href="/salon-lenormand"
              title="Le Salon de Mlle Lenormand"
              description="La divination en société"
              icon="🔮"
            />
          </div>

          {/* Additional Rooms - Phase 2 (Coming Soon - reduced opacity) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 opacity-40">
            <RoomArchway
              href="/atelier-imprimeur"
              title="L'Atelier de l'Imprimeur"
              description="Artisanat et matière"
              icon="⚙️"
            />
            <RoomArchway
              href="/interpretations"
              title="La Salle des Interprétations"
              description="Le tarot comme miroir"
              icon="🧠"
            />
            <RoomArchway
              href="/dome-hermetique"
              title="Le Dôme Hermétique"
              description="L'univers symbolique"
              icon="🌌"
            />
          </div>
        </div>
      </section>

      {/* Footer - Elegant & Minimal */}
      <footer className="relative z-20 border-t border-museumGold/10 px-6 md:px-12 py-12 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-museumGold/60 text-sm mb-2 tracking-wide">
                Musée du Tarot
              </p>
              <p className="text-museumAmber/40 text-xs tracking-wider">
                Une exploration historique et symbolique — 1440–2024
              </p>
            </div>
            <div className="flex items-center gap-8">
              <a
                href="/about"
                className="text-museumGold/70 hover:text-museumGold text-sm tracking-wide transition-colors"
              >
                À Propos
              </a>
              <a
                href="/archives"
                className="text-museumGold/70 hover:text-museumGold text-sm tracking-wide transition-colors"
              >
                Archives Ouvertes
              </a>
              <a
                href="/contact"
                className="text-museumGold/70 hover:text-museumGold text-sm tracking-wide transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-museumGold/5 text-center">
            <p className="text-museumAmber/30 text-xs tracking-widest">
              ✦ CONÇU AVEC RIGUEUR HISTORIQUE ET RESPECT DES TRADITIONS ✦
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
