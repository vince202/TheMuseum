import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ClockDial,
  Candle,
  FloatingCard,
  RoomArchway,
  AudioToggle
} from '@/components/Vintage';
import '../components/Vintage/museum-vintage.css';

const HomePage: React.FC = () => {
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
      src: '/cards/devil.jpg',
      alt: 'Le Diable',
      position: { x: window.innerWidth * 0.05, y: window.innerHeight * 0.15 },
    },
    {
      src: '/cards/world.jpg',
      alt: 'Le Monde',
      position: { x: window.innerWidth * 0.85, y: window.innerHeight * 0.20 },
    },
    {
      src: '/cards/death.jpg',
      alt: 'Arcane XIII',
      position: { x: window.innerWidth * 0.08, y: window.innerHeight * 0.65 },
    },
    {
      src: '/cards/high-priestess.jpg',
      alt: 'La Papesse',
      position: { x: window.innerWidth * 0.88, y: window.innerHeight * 0.70 },
    },
  ];

  // Room navigation data
  const rooms = [
    {
      href: '/explore',
      title: 'Le Vestibule',
      description: 'Discover the arcana gallery',
    },
    {
      href: '/reading',
      title: 'La Salle des Jeux Perdus',
      description: 'Consult the oracle',
    },
    {
      href: '/timeline',
      title: 'Le Cabinet des Mages',
      description: 'Explore mystical history',
    },
    {
      href: '/about',
      title: 'Le Salon de Mlle Lenormand',
      description: 'Learn the ancient arts',
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
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-20"
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
            className="vintage-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 leading-tight px-4"
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
            className="vintage-subtitle text-lg md:text-xl lg:text-2xl text-amber-100/80 max-w-2xl mx-auto px-4"
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
          <ClockDial size={180} className="drop-shadow-2xl" />
        </motion.div>

        {/* Candles */}
        <motion.div
          style={{ y: candlesY }}
          className="flex justify-center items-end gap-6 md:gap-8 mb-16 parallax-layer parallax-slow"
        >
          <Candle size="sm" className="opacity-90" />
          <Candle size="lg" className="opacity-100" />
          <Candle size="md" className="opacity-85" />
        </motion.div>

        {/* Enter Button */}
        <motion.button
          className="vintage-button mb-8 text-base md:text-lg"
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
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
        className="parallax-layer fixed inset-0 pointer-events-none hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        {floatingCards.map((card) => (
          <FloatingCard
            key={card.alt}
            src={card.src}
            alt={card.alt}
            position={card.position}
            className="pointer-events-auto"
          />
        ))}
      </motion.div>

      {/* ========== ROOM NAVIGATION ========== */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-black/20 to-black/40">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="vintage-title text-3xl md:text-4xl lg:text-5xl text-center mb-10 md:mb-12"
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
                  href={room.href}
                  title={room.title}
                  description={room.description}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER TAGLINE ========== */}
      <motion.footer
        className="relative py-12 text-center px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="vintage-subtitle text-base md:text-lg text-amber-200/60">
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

export default HomePage;
