/**
 * Interactive History Timeline Component
 * Displays 500+ years of tarot history with immersive, magical storytelling
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Calendar, ChevronRight, Book, MapPin, Users, Sparkles } from 'lucide-react';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  category: 'origin' | 'development' | 'occult' | 'modern';
  location?: string;
  figures?: string[];
  importance?: 'major' | 'minor'; // For particle effects
  imageUrl?: string;
}

// Component for individual timeline event card
const TimelineEventCard: React.FC<{
  event: TimelineEvent;
  index: number;
  onClick: () => void;
  getCategoryColor: (category: string) => string;
}> = ({ event, index, onClick, getCategoryColor }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="relative group"
    >
      {/* Pulsing Timeline Dot with Glow */}
      <motion.div
        className={`absolute left-6 w-5 h-5 rounded-full ${getCategoryColor(event.category)} border-4 border-white dark:border-gray-900 z-10`}
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 0px rgba(168, 85, 247, 0.4)',
            '0 0 20px rgba(168, 85, 247, 0.8)',
            '0 0 0px rgba(168, 85, 247, 0.4)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.3 }}
      />

      {/* Particle Effect for Major Events */}
      {event.importance === 'major' && (
        <motion.div
          className="absolute left-6 top-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 30],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 30],
                opacity: [1, 0],
                scale: [1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Glassmorphic Event Card */}
      <motion.div
        className="ml-20 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 cursor-pointer overflow-hidden relative border border-white/20 dark:border-gray-700/20"
        onClick={onClick}
        whileHover={{
          scale: 1.02,
          boxShadow: '0 20px 60px rgba(168, 85, 247, 0.3)',
          borderColor: 'rgba(168, 85, 247, 0.5)'
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Glow overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 rounded-2xl"
          whileHover={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(168, 85, 247, 0.1) 100%)'
          }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-wrap">
              <motion.span
                className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.1 }}
              >
                {event.year}
              </motion.span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(event.category)} shadow-lg`}>
                {event.category}
              </span>
              {event.importance === 'major' && (
                <motion.span
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-medium"
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(251, 191, 36, 0.5)',
                      '0 0 20px rgba(251, 191, 36, 0.8)',
                      '0 0 10px rgba(251, 191, 36, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Key Event</span>
                </motion.span>
              )}
            </div>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {event.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {event.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            {event.location && (
              <motion.div
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05, color: 'rgb(168, 85, 247)' }}
              >
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </motion.div>
            )}
            {event.figures && event.figures.length > 0 && (
              <motion.div
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05, color: 'rgb(168, 85, 247)' }}
              >
                <Users className="w-4 h-4" />
                <span>{event.figures.join(', ')}</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const timelineEvents: TimelineEvent[] = [
  {
    year: 1440,
    title: 'Birth of Tarot',
    description: 'Tarot cards invented in northern Italy, initially called "carte da trionfi" (triumph cards). Created for trick-taking card games in Renaissance courts.',
    category: 'origin',
    location: 'Northern Italy',
    figures: ['Italian Nobility'],
    importance: 'major'
  },
  {
    year: 1450,
    title: 'Visconti-Sforza Deck',
    description: 'One of the oldest surviving tarot decks, commissioned by the Visconti and Sforza families of Milan. Lavishly decorated with gold leaf.',
    category: 'origin',
    location: 'Milan, Italy',
    figures: ['Visconti Family', 'Sforza Family'],
    importance: 'major'
  },
  {
    year: 1650,
    title: 'Spread Across Europe',
    description: 'Tarot games become popular throughout Europe. Different regional variations emerge, particularly in France and Switzerland.',
    category: 'development',
    location: 'France, Switzerland'
  },
  {
    year: 1709,
    title: 'Tarot de Marseille Standardized',
    description: 'Pierre Madenie produces one of the first standardized Marseille tarot decks. This design becomes the template for future decks.',
    category: 'development',
    location: 'Marseille, France',
    figures: ['Pierre Madenie'],
    importance: 'major'
  },
  {
    year: 1781,
    title: 'Court de Gébelin\'s Egyptian Theory',
    description: 'Antoine Court de Gébelin publishes "Le Monde Primitif," claiming tarot has ancient Egyptian origins. This marks the beginning of tarot\'s occult associations.',
    category: 'occult',
    location: 'Paris, France',
    figures: ['Antoine Court de Gébelin'],
    importance: 'major'
  },
  {
    year: 1791,
    title: 'Etteilla\'s Divinatory System',
    description: 'Jean-Baptiste Alliette (Etteilla) publishes the first book on tarot divination and creates the first deck designed specifically for fortune-telling.',
    category: 'occult',
    location: 'Paris, France',
    figures: ['Jean-Baptiste Alliette (Etteilla)']
  },
  {
    year: 1856,
    title: 'Éliphas Lévi\'s Kabbalah Connection',
    description: 'French occultist Éliphas Lévi connects tarot to Kabbalah and Hebrew alphabet, establishing correspondence systems still used today.',
    category: 'occult',
    location: 'Paris, France',
    figures: ['Éliphas Lévi']
  },
  {
    year: 1888,
    title: 'Hermetic Order of the Golden Dawn',
    description: 'The Golden Dawn creates systematic correspondences between tarot, astrology, Kabbalah, and alchemy. This becomes the foundation for modern esoteric tarot.',
    category: 'occult',
    location: 'London, England',
    figures: ['Samuel Liddell MacGregor Mathers', 'William Wynn Westcott'],
    importance: 'major'
  },
  {
    year: 1909,
    title: 'Rider-Waite Tarot Published',
    description: 'Arthur Edward Waite and Pamela Colman Smith create the Rider-Waite deck, revolutionizing tarot with fully illustrated Minor Arcana. Becomes the most influential modern deck.',
    category: 'modern',
    location: 'London, England',
    figures: ['Arthur Edward Waite', 'Pamela Colman Smith'],
    importance: 'major'
  },
  {
    year: 1943,
    title: 'Thoth Tarot Completed',
    description: 'Aleister Crowley and Lady Frieda Harris complete the Thoth Tarot, featuring Art Deco artwork and complex esoteric symbolism.',
    category: 'modern',
    location: 'England',
    figures: ['Aleister Crowley', 'Lady Frieda Harris'],
    importance: 'major'
  },
  {
    year: 1970,
    title: 'Tarot Renaissance',
    description: 'Explosion of new tarot deck designs begins. Tarot moves into mainstream consciousness through counterculture and New Age movements.',
    category: 'modern',
    location: 'United States, Worldwide'
  },
  {
    year: 2000,
    title: 'Digital Age Tarot',
    description: 'Tarot enters the digital age with online readings, mobile apps, and virtual museums. Global accessibility expands dramatically.',
    category: 'modern',
    location: 'Worldwide'
  },
  {
    year: 2010,
    title: 'Tarot as Art & Psychology',
    description: 'Modern practitioners emphasize tarot as a tool for self-reflection, psychology, and creative inspiration rather than fortune-telling.',
    category: 'modern',
    location: 'Worldwide'
  }
];

export const Timeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll progress for parallax and progress indicator
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress for parallax effects
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const categories = [
    { id: 'all', label: 'All Periods', color: 'gray' },
    { id: 'origin', label: 'Origins', color: 'blue' },
    { id: 'development', label: 'Development', color: 'green' },
    { id: 'occult', label: 'Occult Revival', color: 'purple' },
    { id: 'modern', label: 'Modern Era', color: 'orange' }
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      origin: 'bg-blue-500',
      development: 'bg-green-500',
      occult: 'bg-purple-500',
      modern: 'bg-orange-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const filteredEvents = selectedCategory === 'all'
    ? timelineEvents
    : timelineEvents.filter(event => event.category === selectedCategory);

  return (
    <div ref={timelineRef} className="timeline-container max-w-6xl mx-auto p-6 relative">
      {/* Fixed Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 origin-left z-50"
        style={{
          scaleX: scrollYProgress,
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)'
        }}
      />

      {/* Parallax Header */}
      <motion.div
        className="text-center mb-12 sticky top-20 z-10"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Tarot History Timeline
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore 500+ years of tarot history, from Renaissance card games to modern spiritual practice
        </motion.p>
      </motion.div>

      {/* Category Filter with Glassmorphism */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-16 sticky top-40 z-20 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 p-4 rounded-2xl shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {categories.map((category, idx) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-xl font-medium transition-all relative overflow-hidden ${
              selectedCategory === category.id
                ? 'text-white shadow-xl'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
          >
            {selectedCategory === category.id && (
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${
                  category.id === 'origin' ? 'from-blue-500 to-blue-600' :
                  category.id === 'development' ? 'from-green-500 to-green-600' :
                  category.id === 'occult' ? 'from-purple-500 to-purple-600' :
                  category.id === 'modern' ? 'from-orange-500 to-orange-600' :
                  'from-gray-500 to-gray-600'
                }`}
                layoutId="categoryBackground"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Timeline with Glow Line */}
      <div className="relative mt-20">
        {/* Animated Vertical Glow Line */}
        <motion.div
          className="absolute left-8 top-0 bottom-0 w-1 rounded-full overflow-hidden"
          style={{ background: 'linear-gradient(to bottom, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3), rgba(251, 146, 60, 0.3))' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500"
            style={{
              scaleY: scrollYProgress,
              transformOrigin: 'top',
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.8), 0 0 60px rgba(168, 85, 247, 0.4)'
            }}
          />
        </motion.div>

        {/* Events */}
        <div className="space-y-12 md:space-y-16">
          {filteredEvents.map((event, index) => (
            <TimelineEventCard
              key={index}
              event={event}
              index={index}
              onClick={() => setSelectedEvent(event)}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>
      </div>

      {/* Event Detail Modal with Magical Transition */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="backdrop-blur-2xl bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl max-w-3xl w-full p-8 md:p-10 relative overflow-hidden border border-white/20 dark:border-gray-700/20"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 0 60px rgba(168, 85, 247, 0.4), 0 20px 80px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Magical Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-50" />

            {/* Floating Sparkles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}

            <div className="relative z-10">
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(168, 85, 247, 0.4)',
                      '0 0 40px rgba(168, 85, 247, 0.6)',
                      '0 0 20px rgba(168, 85, 247, 0.4)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Calendar className="w-8 h-8 text-white" />
                </motion.div>
                <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {selectedEvent.year}
                </span>
                {selectedEvent.importance === 'major' && (
                  <motion.span
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-medium"
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(251, 191, 36, 0.5)',
                        '0 0 20px rgba(251, 191, 36, 0.8)',
                        '0 0 10px rgba(251, 191, 36, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Key Event
                  </motion.span>
                )}
              </motion.div>

              <motion.h2
                className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selectedEvent.title}
              </motion.h2>

              <motion.p
                className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {selectedEvent.description}
              </motion.p>

              {/* Detailed Info with Icons */}
              <motion.div
                className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {selectedEvent.location && (
                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h4>
                      <p className="text-gray-600 dark:text-gray-400">{selectedEvent.location}</p>
                    </div>
                  </motion.div>
                )}
                {selectedEvent.figures && selectedEvent.figures.length > 0 && (
                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Figures</h4>
                      <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                        {selectedEvent.figures.map((figure, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 + idx * 0.1 }}
                          >
                            • {figure}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <motion.button
                onClick={() => setSelectedEvent(null)}
                className="mt-8 w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all font-medium text-lg shadow-lg relative overflow-hidden group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="relative z-10">Close</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Educational Note with Enhanced Styling */}
      <motion.div
        className="mt-20 mb-8 p-8 backdrop-blur-lg bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/30 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex gap-4">
          <motion.div
            className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl"
            animate={{
              boxShadow: [
                '0 0 20px rgba(59, 130, 246, 0.3)',
                '0 0 40px rgba(59, 130, 246, 0.5)',
                '0 0 20px rgba(59, 130, 246, 0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Book className="w-6 h-6 text-white flex-shrink-0" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
              Historical Accuracy
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This timeline presents tarot's actual history based on scholarly research. Many popular
              myths about tarot's "ancient" origins have been debunked by historians. Tarot began as
              a Renaissance card game and only developed occult associations in the late 18th century.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Responsive Styles for Mobile - Horizontal Timeline */}
      <style jsx>{`
        @media (max-width: 768px) {
          .timeline-container {
            padding: 1rem;
          }
          .sticky {
            position: relative;
          }
        }
      `}</style>
    </div>
  );
};

export default Timeline;
