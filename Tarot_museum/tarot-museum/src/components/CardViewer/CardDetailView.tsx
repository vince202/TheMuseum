import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Eye, Sparkles, Calendar } from 'lucide-react';
import { TarotCard } from '@/types/tarot';
import Button from '@/components/UI/Button';
import Modal from '@/components/UI/Modal';
import Card3DViewer from './Card3DViewer';

interface CardDetailViewProps {
  card: TarotCard;
  onBack: () => void;
}

const CardDetailView: React.FC<CardDetailViewProps> = ({
  card,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'meaning' | 'symbolism' | 'history' | '3d'>('meaning');
  const [, setSelectedSymbol] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const tabs = [
    { id: 'meaning', label: 'Meaning', icon: BookOpen },
    { id: 'symbolism', label: 'Symbolism', icon: Sparkles },
    { id: 'history', label: 'History', icon: Calendar },
    { id: '3d', label: '3D View', icon: Eye },
  ];

  const getSuitColor = (suit: TarotCard['suit']) => {
    const colors = {
      major: 'from-purple-500 to-purple-700',
      cups: 'from-blue-500 to-blue-700',
      wands: 'from-orange-500 to-orange-700',
      swords: 'from-gray-500 to-gray-700',
      pentacles: 'from-green-500 to-green-700',
    };
    return colors[suit];
  };

  const TabContent = () => {
    switch (activeTab) {
      case 'meaning':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Keywords */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {card.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Upright Meaning */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Upright Meaning</h3>
              <p className="text-gray-700 mb-3">{card.upright.meaning}</p>
              <div className="flex flex-wrap gap-2">
                {card.upright.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Reversed Meaning */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Reversed Meaning</h3>
              <p className="text-gray-700 mb-3">{card.reversed.meaning}</p>
              <div className="flex flex-wrap gap-2">
                {card.reversed.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'symbolism':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-gray-900">Symbolic Elements</h3>
            <div className="grid gap-4">
              {card.symbolism.map((symbol) => (
                <motion.div
                  key={symbol.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedSymbol(symbol.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                        {symbol.category.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{symbol.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{symbol.description}</p>
                      <p className="text-sm text-purple-600 mt-2 font-medium">{symbol.meaning}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'history':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Card Information</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Deck</dt>
                    <dd className="text-sm text-gray-900">{card.deck}</dd>
                  </div>
                  {card.artist && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Artist</dt>
                      <dd className="text-sm text-gray-900">{card.artist}</dd>
                    </div>
                  )}
                  {card.dateCreated && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Created</dt>
                      <dd className="text-sm text-gray-900">{card.dateCreated}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Historical Period</dt>
                    <dd className="text-sm text-gray-900">{card.historicalPeriod}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cultural Context</h3>
                <p className="text-sm text-gray-700">{card.culturalContext}</p>
              </div>
            </div>
          </motion.div>
        );

      case '3d':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Card3DViewer card={card} />
            <div className="text-center text-sm text-gray-600">
              Interactive 3D model of {card.name}. Use your mouse to explore the card from all angles.
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getSuitColor(card.suit)} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20"
              ariaLabel="Go back"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{card.name}</h1>
              <p className="text-lg opacity-90">{card.description}</p>
            </div>
          </div>

          {/* Card preview */}
          <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-shrink-0"
            >
              <div
                className="relative w-64 h-96 rounded-lg overflow-hidden shadow-2xl cursor-pointer"
                onClick={() => setShowImageModal(true)}
              >
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm"
                  >
                    <Eye size={16} className="inline mr-1" />
                    View Full Size
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Quick info */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-sm opacity-75">Suit</div>
                  <div className="font-semibold capitalize">{card.suit}</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-sm opacity-75">Arcana</div>
                  <div className="font-semibold capitalize">{card.arcana}</div>
                </div>
                {card.number !== undefined && (
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-sm opacity-75">Number</div>
                    <div className="font-semibold">{card.number}</div>
                  </div>
                )}
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-sm opacity-75">Deck</div>
                  <div className="font-semibold">{card.deck}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <tab.icon className="inline-block w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="min-h-96">
          <AnimatePresence mode="wait">
            <TabContent />
          </AnimatePresence>
        </div>
      </div>

      {/* Full-size image modal */}
      <Modal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        size="lg"
        title={card.name}
      >
        <div className="text-center">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
          />
        </div>
      </Modal>
    </div>
  );
};

export default CardDetailView;