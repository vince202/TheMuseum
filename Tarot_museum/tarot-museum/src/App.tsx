import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MuseumNavigation } from './components/MuseumNavigation';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import { CardReading } from './components/CardReading';
import { Timeline } from './components/Timeline';
import { CardDisplay } from './components/CardDisplay';
import { TarotCard, completeTarotDeck, getCardById } from './data/tarotDatabase';
// REMOVED: Bright modern effects (AuroraBackground, ParticleField)
// import { AuroraBackground, ParticleField } from './components/Effects';

const App: React.FC = () => {
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
  };

  return (
    <Router>
      <div className="App min-h-screen bg-museumBlack relative overflow-hidden">
        {/* REMOVED: Bright modern effects (AuroraBackground, ParticleField, ambient-light) */}
        {/* Vintage museum background - dark and sophisticated */}

        {/* Main Content */}
        <div className="relative">
          <MuseumNavigation />
          <Routes>
          {/* Home page */}
          <Route
            index
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <HomePage />
              </motion.div>
            }
          />

          {/* Explore Cards */}
          <Route
            path="/explore"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <ExplorePage />
              </motion.div>
            }
          />

          {/* Card Reading */}
          <Route
            path="/reading"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <CardReading />
              </motion.div>
            }
          />

          {/* Timeline */}
          <Route
            path="/timeline"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Timeline />
              </motion.div>
            }
          />

          {/* Search */}
          <Route
            path="/search"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <ExplorePage />
              </motion.div>
            }
          />

          {/* Individual card view */}
          <Route
            path="/card/:cardId"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <CardDetailRouter />
              </motion.div>
            }
          />

          {/* About page */}
          <Route
            path="/about"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
              >
                <h1 className="text-4xl font-bold text-museumGold mb-8">À Propos du Musée du Tarot</h1>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-museumParchment leading-relaxed mb-4">
                    Bienvenue au Musée du Tarot, une archive numérique explorant 500+ ans
                    d'histoire, de symbolisme et de signification culturelle du tarot. Notre mission est de fournir
                    une éducation accessible, précise et engageante sur les cartes de tarot en tant qu'artefact culturel.
                  </p>
                  <h2 className="text-2xl font-bold text-museumGold mt-8 mb-4">Notre Mission</h2>
                  <p className="text-museumParchment leading-relaxed mb-4">
                    Nous démystifions les légendes tout en célébrant le riche patrimoine artistique du tarot. À travers des
                    expositions interactives et des recherches érudites, nous éclairons la véritable histoire du tarot—des
                    jeux de cartes de la Renaissance aux pratiques spirituelles modernes.
                  </p>
                  <h2 className="text-2xl font-bold text-museumGold mt-8 mb-4">Focus Éducatif</h2>
                  <p className="text-museumParchment leading-relaxed">
                    Tout le contenu est basé sur des sources historiques primaires et vérifié par des érudits du tarot.
                    Nous maintenons les plus hauts standards d'accessibilité (WCAG 2.1 AA) et de sensibilité culturelle.
                  </p>
                </div>
              </motion.div>
            }
          />

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
              >
                <h1 className="text-4xl font-bold text-museumGold mb-4">404 - Page Not Found</h1>
                <p className="text-museumAmber mb-8">
                  The page you're looking for doesn't exist.
                </p>
                <Navigate to="/" replace />
              </motion.div>
            }
          />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// Component to handle individual card routing
const CardDetailRouter: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const card = cardId ? getCardById(cardId) : null;

  if (!card) {
    return <Navigate to="/explore" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <CardDisplay card={card} showDetails={true} interactive={true} />
    </div>
  );
};

export default App;