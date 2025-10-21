import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ClockDial,
  Candle,
  FloatingCard,
  RoomArchway,
  AudioToggle
} from '@/components/Vintage';
import '../components/Vintage/museum-vintage.css';

const VintageHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Subtle parallax effects (2-3% movement)
  const titleY = useTransform(scrollY, [0, 500], [0, -15]);
  const cardsY = useTransform(scrollY, [0, 500], [0, 10]);
  const candlesY = useTransform(scrollY, [0, 500], [0, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating card data
  const floatingCards = [
    {
      image: '/cards/devil.jpg',
      title: 'Le Diable',
      position: { left: '5%', top: '15%' },
    },
    {
      image: '/cards/world.jpg',
      title: 'Le Monde',
      position: { right: '5%', top: '20%' },
    },
    {
      image: '/cards/death.jpg',
      title: 'Arcane XIII',
      position: { left: '8%', bottom: '25%' },
    },
    {
      image: '/cards/high-priestess.jpg',
      title: 'La Papesse',
      position: { right: '8%', bottom: '20%' },
    },
  ];

  // Room navigation data
  const rooms = [
    {
      title: 'Le Vestibule',
      to: '/explore',
      description: 'Discover the arcana gallery',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18M15 3v18" />
        </svg>
      ),
    },
    {
      title: 'La Salle des Jeux Perdus',
      to: '/reading',
      description: 'Consult the oracle',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l2 7h7l-5.5 4.5 2 7-5.5-4-5.5 4 2-7L3 9h7z" />
        </svg>
      ),
    },
    {
      title: 'Le Cabinet des Mages',
      to: '/timeline',
      description: 'Explore mystical history',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      title: 'Le Salon de Mlle Lenormand',
      to: '/about',
      description: 'Learn the ancient arts',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ========== BACKGROUND LAYER ========== */}
      <div className="vintage-background">
        {/* Optional: Background image */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/textures/stone-vault.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* ========== HEADER ========== */}
      <header className="vintage-header">
        <div className="vintage-logo vintage-smallcaps">
          MUSÉE DU TAROT DIVINATOIRE
        </div>
        <AudioToggle
          audioSrc="/audio/ambient-museum.mp3"
          className="fixed top-6 right-6 z-50"
        />
      </header>

      {/* ========== HERO SECTION ========== */}
      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Parallax Title */}
        <motion.div
          style={{ y: titleY }}
          className="text-center mb-12 parallax-layer parallax-fast"
        >
          <motion.h1
            className="vintage-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          >
            MUSÉE DU TAROT
            <br />
            DIVINATOIRE
          </motion.h1>

          <motion.p
            className="vintage-subtitle text-xl md:text-2xl text-amber-100/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Où le passé et l'avenir convergent dans le présent
          </motion.p>
        </motion.div>

        {/* Clock Dial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-12"
        >
          <ClockDial size={200} className="drop-shadow-2xl" />
        </motion.div>

        {/* Candles */}
        <motion.div
          style={{ y: candlesY }}
          className="flex justify-center items-end gap-8 mb-16 parallax-layer parallax-slow"
        >
          <Candle size="sm" className="opacity-90" />
          <Candle size="lg" className="opacity-100" />
          <Candle size="md" className="opacity-85" />
        </motion.div>

        {/* Enter Button */}
        <motion.button
          className="vintage-button mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/explore')}
        >
          ENTRER
        </motion.button>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 border-2 border-amber-700/50 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-amber-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* ========== FLOATING CARDS ========== */}
      <motion.div
        style={{ y: cardsY }}
        className="parallax-layer fixed inset-0 pointer-events-none hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        {floatingCards.map((card, index) => (
          <FloatingCard
            key={card.title}
            src={card.image}
            alt={card.title}
            position={card.position as any}
            className="pointer-events-auto"
          />
        ))}
      </motion.div>

      {/* ========== ROOM NAVIGATION ========== */}
      <section className="relative py-20 px-4 sm:px-8 bg-gradient-to-b from-transparent via-black/20 to-black/40">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="vintage-title text-4xl md:text-5xl text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Choisissez Votre Chemin
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <RoomArchway
                  href={room.to}
                  title={room.title}
                  description={room.description}
                  className="h-full"
                />
                <div className="flex justify-center mt-4 opacity-70">
                  {room.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER TAGLINE ========== */}
      <motion.footer
        className="relative py-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="vintage-subtitle text-lg text-amber-200/60">
          "Les cartes ne mentent jamais, elles révèlent ce que l'âme sait déjà"
        </p>
        <p className="text-amber-800/40 text-xs mt-4 font-serif">
          — Mlle Marie Anne Lenormand, 1843
        </p>
      </motion.footer>

      {/* ========== ACCESSIBILITY ========== */}
      <div className="sr-only">
        <h1>The Tarot Museum - Vintage Occult Gallery</h1>
        <p>An immersive 19th-century museum experience exploring tarot history and divination</p>
      </div>
    </div>
  );
};

export default VintageHomePage;
