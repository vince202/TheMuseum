/**
 * Complete Tarot Card Database - 78 Cards
 * Major Arcana (22) + Minor Arcana (56)
 */

export interface TarotCard {
  id: string;
  name: string;
  number?: number;
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles' | 'major';
  arcana: 'major' | 'minor';
  keywords: {
    upright: string[];
    reversed: string[];
  };
  meaning: string;
  symbolism: string;
  element?: 'fire' | 'water' | 'air' | 'earth';
  astrology?: string;
  numerology?: string;
}

export const majorArcana: TarotCard[] = [
  {
    id: 'major-0',
    name: 'The Fool',
    number: 0,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['innocence', 'new beginnings', 'free spirit', 'potential'],
      reversed: ['recklessness', 'taken advantage of', 'inconsideration']
    },
    meaning: 'You already have the tools. Use them. The Fool is all about potential made real. New beginnings and stepping into the unknown with faith.',
    symbolism: 'Represents the beginning of all journeys, pure potential, and fearless exploration of life\'s possibilities.',
    element: 'air',
    astrology: 'Uranus',
    numerology: '0 - Unlimited potential, the void, infinite possibilities'
  },
  {
    id: 'major-1',
    name: 'The Magician',
    number: 1,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['manifestation', 'willpower', 'desire', 'creation'],
      reversed: ['manipulation', 'poor planning', 'untapped talents']
    },
    meaning: 'You already have the tools. Use them. The Magician is all about potential made real. Stop manifesting in theory and start creating in the real world.',
    symbolism: 'The bridge between spiritual and material realms, focused will, and the power to manifest desires into reality.',
    element: 'air',
    astrology: 'Mercury',
    numerology: '1 - New beginnings, individuality, leadership'
  },
  {
    id: 'major-2',
    name: 'The High Priestess',
    number: 2,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['intuition', 'sacred knowledge', 'divine feminine', 'subconscious'],
      reversed: ['secrets', 'disconnected from intuition', 'withdrawal']
    },
    meaning: 'Your intuition is not being subtle. Listen to wisdom beneath the noise. Trust your gut, especially when it doesn\'t make logical sense.',
    symbolism: 'Inner wisdom, mystical knowledge, the unconscious mind, and connection to divine feminine energy.',
    element: 'water',
    astrology: 'Moon',
    numerology: '2 - Duality, balance, partnership'
  },
  {
    id: 'major-3',
    name: 'The Empress',
    number: 3,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['femininity', 'beauty', 'nature', 'nurturing'],
      reversed: ['creative block', 'dependence on others', 'smothering']
    },
    meaning: 'Sensuality. Creativity. Embodiment. The Empress doesn\'t chase -- she attracts. Nature\'s goddess energy reminding you that growth takes time and softness is strength.',
    symbolism: 'Fertility, abundance, motherhood, creative force, and connection to natural cycles.',
    element: 'earth',
    astrology: 'Venus',
    numerology: '3 - Creativity, growth, abundance'
  },
  {
    id: 'major-4',
    name: 'The Emperor',
    number: 4,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['authority', 'structure', 'control', 'fatherhood'],
      reversed: ['tyranny', 'rigidity', 'coldness', 'domination']
    },
    meaning: 'Where the Empress nurtures, The Emperor protects. Structure, boundaries, and inner authority that says "I\'ve got this."',
    symbolism: 'Masculine authority, structured power, leadership, and the establishment of order and control.',
    element: 'fire',
    astrology: 'Aries',
    numerology: '4 - Stability, structure, foundation'
  },
  {
    id: 'major-5',
    name: 'The Hierophant',
    number: 5,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['spiritual wisdom', 'religious beliefs', 'conformity', 'tradition'],
      reversed: ['personal beliefs', 'freedom', 'challenging the status quo']
    },
    meaning: 'Tradition isn\'t always a trap. Spiritual mentorship and ancestral knowledge. Sometimes the "old ways" have medicine -- ritual, discipline, belief.',
    symbolism: 'Spiritual authority, traditional learning, religious doctrine, and connection to established wisdom.',
    element: 'earth',
    astrology: 'Taurus',
    numerology: '5 - Change, freedom, nonconformity'
  },
  {
    id: 'major-6',
    name: 'The Lovers',
    number: 6,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['partnerships', 'duality', 'union', 'choices'],
      reversed: ['loss of balance', 'one-sidedness', 'disharmony']
    },
    meaning: 'Relationships, choices, and the need to align actions with values. Union of opposites and important decisions about partnerships.',
    symbolism: 'Love, choice, harmony, relationship dynamics, and the integration of dualistic forces.',
    element: 'air',
    astrology: 'Gemini',
    numerology: '6 - Harmony, balance, union'
  },
  {
    id: 'major-7',
    name: 'The Chariot',
    number: 7,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['direction', 'control', 'willpower', 'victory'],
      reversed: ['lack of control', 'lack of direction', 'aggression']
    },
    meaning: 'Determination, willpower, and triumph through focus. Moving forward with confidence and overcoming obstacles through self-discipline.',
    symbolism: 'Victory through will, controlled progress, mastery over opposing forces, and directed energy.',
    element: 'water',
    astrology: 'Cancer',
    numerology: '7 - Mastery, spiritual insight, victory'
  },
  {
    id: 'major-8',
    name: 'Strength',
    number: 8,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['inner strength', 'bravery', 'compassion', 'focus'],
      reversed: ['self doubt', 'weakness', 'insecurity']
    },
    meaning: 'True strength comes from within. Compassionate courage and the power of gentle persistence over brute force.',
    symbolism: 'Inner courage, gentle power, compassion triumphing over aggression, and mastery through love.',
    element: 'fire',
    astrology: 'Leo',
    numerology: '8 - Strength, courage, patience'
  },
  {
    id: 'major-9',
    name: 'The Hermit',
    number: 9,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['contemplation', 'search for truth', 'inner guidance'],
      reversed: ['loneliness', 'isolation', 'lost your way']
    },
    meaning: 'Soul searching and seeking inner truth. The wisdom that comes from solitude and self-reflection.',
    symbolism: 'Inner wisdom, spiritual seeking, guidance from within, and the illumination that comes from introspection.',
    element: 'earth',
    astrology: 'Virgo',
    numerology: '9 - Introspection, wisdom, solitude'
  },
  {
    id: 'major-10',
    name: 'Wheel of Fortune',
    number: 10,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['change', 'cycles', 'inevitable fate', 'luck'],
      reversed: ['no control', 'clinging to control', 'bad luck']
    },
    meaning: 'Life\'s natural cycles and the turning tides of fortune. What goes up must come down, and vice versa.',
    symbolism: 'Destiny, cycles of life, karma, and the constant motion of change and fortune.',
    element: 'fire',
    astrology: 'Jupiter',
    numerology: '10 - Completion of cycle, new beginning'
  },
  {
    id: 'major-11',
    name: 'Justice',
    number: 11,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['cause and effect', 'clarity', 'truth', 'law'],
      reversed: ['dishonesty', 'unaccountability', 'unfairness']
    },
    meaning: 'Truth, fairness, and the law of cause and effect. Actions have consequences and balance must be restored.',
    symbolism: 'Divine justice, truth, fairness, law, and the balancing of karmic scales.',
    element: 'air',
    astrology: 'Libra',
    numerology: '11 - Master number, higher justice'
  },
  {
    id: 'major-12',
    name: 'The Hanged Man',
    number: 12,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['sacrifice', 'release', 'martyrdom', 'perspective'],
      reversed: ['stalling', 'needless sacrifice', 'fear of sacrifice']
    },
    meaning: 'Willing sacrifice for wisdom. Sometimes you need to surrender and see things from a different perspective.',
    symbolism: 'Sacrifice, surrender, new perspective, spiritual growth through letting go.',
    element: 'water',
    astrology: 'Neptune',
    numerology: '12 - Sacrifice, suspension, new viewpoint'
  },
  {
    id: 'major-13',
    name: 'Death',
    number: 13,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['transformation', 'endings', 'change', 'rebirth'],
      reversed: ['resistance to change', 'personal transformation', 'inner purging']
    },
    meaning: 'Endings are just beginnings in disguise. Not literal death, but transformation. What\'s dying is making space for what\'s next.',
    symbolism: 'Transformation, endings leading to new beginnings, spiritual rebirth, and release of the old.',
    element: 'water',
    astrology: 'Scorpio',
    numerology: '13 - Transformation, endings, renewal'
  },
  {
    id: 'major-14',
    name: 'Temperance',
    number: 14,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['balance', 'moderation', 'patience', 'purpose'],
      reversed: ['imbalance', 'excess', 'self-healing', 're-alignment']
    },
    meaning: 'Blend, don\'t bulldoze. The art of balance and moderation. You don\'t have to rush or control the outcome.',
    symbolism: 'Balance, harmony, healing, patience, and the alchemical mixing of opposing elements.',
    element: 'fire',
    astrology: 'Sagittarius',
    numerology: '14 - Moderation, balance, alchemy'
  },
  {
    id: 'major-15',
    name: 'The Devil',
    number: 15,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['bondage', 'addiction', 'sexuality', 'materialism'],
      reversed: ['releasing limiting beliefs', 'exploring dark thoughts', 'detachment']
    },
    meaning: 'That thing you think is holding you back? It probably isn\'t. Exposes illusions: addiction, fear, shame. You trap yourself, but now you see the chains.',
    symbolism: 'Bondage, temptation, materialism, addiction, and the illusion of being trapped by external forces.',
    element: 'earth',
    astrology: 'Capricorn',
    numerology: '15 - Bondage, materialism, shadow self'
  },
  {
    id: 'major-16',
    name: 'The Tower',
    number: 16,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['sudden upheaval', 'broken pride', 'disaster', 'revelation'],
      reversed: ['disaster avoided', 'delayed disaster', 'fear of suffering']
    },
    meaning: 'Sudden revelation and necessary destruction of false structures. Lightning-bolt moments that clear away illusions.',
    symbolism: 'Sudden change, revelation, destruction of false beliefs, awakening, and liberation from illusion.',
    element: 'fire',
    astrology: 'Mars',
    numerology: '16 - Sudden change, revelation, awakening'
  },
  {
    id: 'major-17',
    name: 'The Star',
    number: 17,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['hope', 'faith', 'rejuvenation', 'spirituality'],
      reversed: ['faithlessness', 'discouragement', 'insecurity']
    },
    meaning: 'Hope, healing, and renewed faith after the storm. The light that guides you through dark times.',
    symbolism: 'Hope, inspiration, spiritual guidance, healing, and connection to higher purpose.',
    element: 'air',
    astrology: 'Aquarius',
    numerology: '17 - Hope, inspiration, divine guidance'
  },
  {
    id: 'major-18',
    name: 'The Moon',
    number: 18,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['unconscious', 'illusions', 'intuition', 'dreams'],
      reversed: ['confusion', 'fear', 'misinterpretation']
    },
    meaning: 'Trust your intuition through uncertainty. The Moon illuminates the path through illusion and subconscious fears.',
    symbolism: 'Illusion, intuition, dreams, the unconscious mind, and navigation through uncertainty.',
    element: 'water',
    astrology: 'Pisces',
    numerology: '18 - Illusion, intuition, subconscious'
  },
  {
    id: 'major-19',
    name: 'The Sun',
    number: 19,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['joy', 'success', 'celebration', 'positivity'],
      reversed: ['negativity', 'depression', 'sadness']
    },
    meaning: 'Pure joy, success, and vitality. The Sun brings clarity, energy, and reason to celebrate life\'s goodness.',
    symbolism: 'Success, vitality, joy, enlightenment, and the illumination of truth and happiness.',
    element: 'fire',
    astrology: 'Sun',
    numerology: '19 - Joy, success, vitality'
  },
  {
    id: 'major-20',
    name: 'Judgement',
    number: 20,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['reflection', 'reckoning', 'awakening', 'rebirth'],
      reversed: ['lack of self awareness', 'doubt', 'self loathing']
    },
    meaning: 'Spiritual awakening and answering a higher calling. Time for reflection, forgiveness, and rising to a new level of consciousness.',
    symbolism: 'Rebirth, awakening, judgment, calling, and spiritual transformation toward higher consciousness.',
    element: 'fire',
    astrology: 'Pluto',
    numerology: '20 - Awakening, judgment, renewal'
  },
  {
    id: 'major-21',
    name: 'The World',
    number: 21,
    suit: 'major',
    arcana: 'major',
    keywords: {
      upright: ['completion', 'accomplishment', 'travel', 'fulfillment'],
      reversed: ['incomplete goals', 'lack of closure', 'stagnation']
    },
    meaning: 'Fulfillment, wholeness, and successful completion of a major journey. The final card representing integration and readiness for what\'s next.',
    symbolism: 'Completion, fulfillment, cosmic consciousness, wholeness, and the achievement of goals.',
    element: 'earth',
    astrology: 'Saturn',
    numerology: '21 - Completion, wholeness, cosmic consciousness'
  }
];

// Minor Arcana - Wands (Fire)
export const wandsCards: TarotCard[] = [
  {
    id: 'wands-ace',
    name: 'Ace of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['inspiration', 'new opportunity', 'growth', 'potential'],
      reversed: ['lack of energy', 'lack of passion', 'delays']
    },
    meaning: 'New creative spark, inspiration, and potential for growth. A burst of creative energy.',
    symbolism: 'The seed of inspiration, creative potential, and passionate beginnings.',
    element: 'fire'
  },
  {
    id: 'wands-2',
    name: 'Two of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['planning', 'making decisions', 'leaving comfort zone'],
      reversed: ['fear of unknown', 'lack of planning', 'bad planning']
    },
    meaning: 'Planning for the future, making decisions, and contemplating next moves with confidence.',
    symbolism: 'Personal power, discovery, and bold plans for the future.',
    element: 'fire'
  },
  {
    id: 'wands-3',
    name: 'Three of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['expansion', 'foresight', 'overseas opportunities'],
      reversed: ['delays', 'frustration', 'lack of foresight']
    },
    meaning: 'Expansion, foresight, and long-term planning bearing fruit. Looking ahead with confidence.',
    symbolism: 'Progress, enterprise, and the expansion of horizons.',
    element: 'fire'
  },
  {
    id: 'wands-4',
    name: 'Four of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['celebration', 'harmony', 'marriage', 'homecoming'],
      reversed: ['lack of support', 'instability', 'broken relationships']
    },
    meaning: 'Celebration, harmony, and joyful homecoming. A time of happiness and stability.',
    symbolism: 'Harmony, prosperity, celebration, and community.',
    element: 'fire'
  },
  {
    id: 'wands-5',
    name: 'Five of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['competition', 'conflict', 'rivalry'],
      reversed: ['avoiding conflict', 'inner conflict']
    },
    meaning: 'Competition, struggle, and conflict. Multiple forces vying for dominance.',
    symbolism: 'Disagreement, competition, and the struggle to be heard.',
    element: 'fire'
  },
  {
    id: 'wands-6',
    name: 'Six of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['victory', 'success', 'public recognition'],
      reversed: ['excess pride', 'lack of recognition', 'egotism']
    },
    meaning: 'Victory, success, and public recognition for achievements. Triumphant progress.',
    symbolism: 'Success, acclaim, and pride in accomplishments.',
    element: 'fire'
  },
  {
    id: 'wands-7',
    name: 'Seven of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['challenge', 'competition', 'perseverance'],
      reversed: ['exhaustion', 'giving up', 'overwhelmed']
    },
    meaning: 'Challenge, perseverance, and defending your position against opposition.',
    symbolism: 'Courage, determination, and standing your ground.',
    element: 'fire'
  },
  {
    id: 'wands-8',
    name: 'Eight of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['swift action', 'movement', 'quick decisions'],
      reversed: ['delays', 'frustration', 'resisting change']
    },
    meaning: 'Swift action, rapid movement, and quick progress toward goals.',
    symbolism: 'Speed, action, and air travel. Things moving quickly.',
    element: 'fire'
  },
  {
    id: 'wands-9',
    name: 'Nine of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['resilience', 'courage', 'persistence', 'boundaries'],
      reversed: ['exhaustion', 'fatigue', 'questioning motivations']
    },
    meaning: 'Strength in reserve, resilience, and maintaining boundaries in the face of challenge.',
    symbolism: 'Last stand, inner strength, and defensive position.',
    element: 'fire'
  },
  {
    id: 'wands-10',
    name: 'Ten of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['burden', 'responsibility', 'hard work'],
      reversed: ['inability to delegate', 'overstressed', 'burnt out']
    },
    meaning: 'Heavy burden, responsibility, and carrying too much weight alone.',
    symbolism: 'Oppression, burden, and the weight of responsibilities.',
    element: 'fire'
  },
  {
    id: 'wands-page',
    name: 'Page of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['inspiration', 'ideas', 'discovery', 'limitless potential'],
      reversed: ['lack of direction', 'procrastination', 'creative blocks']
    },
    meaning: 'Young, enthusiastic energy exploring the fire element. New ideas and creative inspiration.',
    symbolism: 'Enthusiasm, exploration, discovery, and free spirit.',
    element: 'fire'
  },
  {
    id: 'wands-knight',
    name: 'Knight of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['energy', 'passion', 'adventure', 'impulsiveness'],
      reversed: ['recklessness', 'haste', 'scattered energy']
    },
    meaning: 'Impulsive, passionate action and adventure. Charging forward with enthusiasm.',
    symbolism: 'Action, adventure, and fearless pursuit of passion.',
    element: 'fire'
  },
  {
    id: 'wands-queen',
    name: 'Queen of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['confidence', 'independence', 'social butterfly', 'determination'],
      reversed: ['selfishness', 'jealousy', 'insecure']
    },
    meaning: 'Confident, warm, generous leadership. Charismatic and self-assured energy.',
    symbolism: 'Courage, confidence, determination, and vibrant energy.',
    element: 'fire'
  },
  {
    id: 'wands-king',
    name: 'King of Wands',
    suit: 'wands',
    arcana: 'minor',
    keywords: {
      upright: ['natural leader', 'vision', 'entrepreneur', 'honor'],
      reversed: ['impulsiveness', 'aggressive', 'ruthless']
    },
    meaning: 'Entrepreneurial, visionary, natural leader with bold vision and charisma.',
    symbolism: 'Vision, leadership, entrepreneurship, and mastery of fire element.',
    element: 'fire'
  }
];

// Minor Arcana - Cups (Water)
export const cupsCards: TarotCard[] = [
  {
    id: 'cups-ace',
    name: 'Ace of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['love', 'new relationships', 'compassion', 'creativity'],
      reversed: ['emotional loss', 'blocked creativity', 'emptiness']
    },
    meaning: 'New love, emotional beginning, and spiritual awakening. Overflowing emotional potential.',
    symbolism: 'Divine love, spiritual abundance, and emotional fulfillment.',
    element: 'water'
  },
  {
    id: 'cups-2',
    name: 'Two of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['partnership', 'unity', 'mutual attraction', 'connection'],
      reversed: ['imbalance', 'broken communication', 'tension']
    },
    meaning: 'Partnership, unity, and mutual attraction. Deep emotional connection.',
    symbolism: 'Balance, connection, partnership, and harmonious relationships.',
    element: 'water'
  },
  {
    id: 'cups-3',
    name: 'Three of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['friendship', 'community', 'celebration', 'creativity'],
      reversed: ['overindulgence', 'gossip', 'isolation']
    },
    meaning: 'Friendship, community celebration, and joyful gatherings with loved ones.',
    symbolism: 'Celebration, friendship, creativity, and community.',
    element: 'water'
  },
  {
    id: 'cups-4',
    name: 'Four of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['apathy', 'contemplation', 'reevaluation'],
      reversed: ['sudden awareness', 'choosing happiness', 'acceptance']
    },
    meaning: 'Apathy, contemplation, and reevaluation of emotional situation. Withdrawn for reflection.',
    symbolism: 'Meditation, contemplation, and apathy or boredom.',
    element: 'water'
  },
  {
    id: 'cups-5',
    name: 'Five of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['loss', 'regret', 'disappointment', 'pessimism'],
      reversed: ['acceptance', 'moving on', 'finding peace']
    },
    meaning: 'Loss, regret, and focusing on the negative while overlooking remaining blessings.',
    symbolism: 'Grief, loss, and the challenge of moving forward.',
    element: 'water'
  },
  {
    id: 'cups-6',
    name: 'Six of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['nostalgia', 'childhood memories', 'innocence'],
      reversed: ['stuck in past', 'unrealistic expectations']
    },
    meaning: 'Nostalgia, innocence, and childhood memories. Revisiting the past with fondness.',
    symbolism: 'Nostalgia, innocence, and childhood joy.',
    element: 'water'
  },
  {
    id: 'cups-7',
    name: 'Seven of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['illusion', 'choices', 'wishful thinking', 'fantasy'],
      reversed: ['clarity', 'making choices', 'disillusionment']
    },
    meaning: 'Illusion, fantasy, and overwhelming choices. Need to ground dreams in reality.',
    symbolism: 'Fantasy, illusion, and the challenge of too many options.',
    element: 'water'
  },
  {
    id: 'cups-8',
    name: 'Eight of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['walking away', 'seeking deeper meaning', 'spiritual journey'],
      reversed: ['fear of loss', 'fear of commitment', 'stagnation']
    },
    meaning: 'Abandonment, withdrawal, and seeking higher purpose beyond material satisfaction.',
    symbolism: 'Leaving behind, spiritual journey, and seeking deeper meaning.',
    element: 'water'
  },
  {
    id: 'cups-9',
    name: 'Nine of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['contentment', 'satisfaction', 'wishes granted'],
      reversed: ['greed', 'dissatisfaction', 'materialism']
    },
    meaning: 'Contentment, satisfaction, and emotional fulfillment. The wish card.',
    symbolism: 'Satisfaction, happiness, and wishes fulfilled.',
    element: 'water'
  },
  {
    id: 'cups-10',
    name: 'Ten of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['happiness', 'family harmony', 'emotional fulfillment'],
      reversed: ['broken family', 'disconnection', 'misalignment']
    },
    meaning: 'Ultimate happiness, harmony, and emotional completion in relationships and family.',
    symbolism: 'Joy, contentment, family, and emotional fulfillment.',
    element: 'water'
  },
  {
    id: 'cups-page',
    name: 'Page of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['creativity', 'intuition', 'curiosity', 'possibility'],
      reversed: ['emotional immaturity', 'creative blocks', 'escapism']
    },
    meaning: 'Emotional sensitivity, creative inspiration, and intuitive messages from within.',
    symbolism: 'Creative opportunities, intuitive messages, and curiosity.',
    element: 'water'
  },
  {
    id: 'cups-knight',
    name: 'Knight of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['romance', 'charm', 'imagination', 'beauty'],
      reversed: ['moodiness', 'unrealistic', 'jealousy']
    },
    meaning: 'Romantic, idealistic, and following the heart. The charming messenger of emotions.',
    symbolism: 'Romance, charm, idealism, and following dreams.',
    element: 'water'
  },
  {
    id: 'cups-queen',
    name: 'Queen of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['compassion', 'calm', 'comfort', 'intuition'],
      reversed: ['emotional instability', 'co-dependency', 'martyrdom']
    },
    meaning: 'Emotionally nurturing, compassionate, and psychically gifted. Deep emotional wisdom.',
    symbolism: 'Compassionate, caring, emotionally secure, and intuitive.',
    element: 'water'
  },
  {
    id: 'cups-king',
    name: 'King of Cups',
    suit: 'cups',
    arcana: 'minor',
    keywords: {
      upright: ['emotional balance', 'wisdom', 'diplomacy', 'calm'],
      reversed: ['emotional manipulation', 'moodiness', 'volatility']
    },
    meaning: 'Emotional balance, diplomatic, and wise counselor. Mastery of emotions.',
    symbolism: 'Emotional maturity, wisdom, diplomacy, and calm waters.',
    element: 'water'
  }
];

// Minor Arcana - Swords (Air)
export const swordsCards: TarotCard[] = [
  {
    id: 'swords-ace',
    name: 'Ace of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['breakthrough', 'clarity', 'sharp mind', 'new ideas'],
      reversed: ['confusion', 'chaos', 'lack of clarity']
    },
    meaning: 'New ideas, mental clarity, and breakthrough. The power of clear thinking.',
    symbolism: 'Mental clarity, truth, and breakthrough insights.',
    element: 'air'
  },
  {
    id: 'swords-2',
    name: 'Two of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['difficult decision', 'stalemate', 'avoidance'],
      reversed: ['indecision', 'confusion', 'information overload']
    },
    meaning: 'Difficult decision, stalemate, and blocked emotions. Avoiding a necessary choice.',
    symbolism: 'Indecision, stalemate, and the need to make a choice.',
    element: 'air'
  },
  {
    id: 'swords-3',
    name: 'Three of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['heartbreak', 'sorrow', 'grief', 'painful truth'],
      reversed: ['recovery', 'forgiveness', 'moving on']
    },
    meaning: 'Heartbreak, sorrow, and grief. Painful but necessary emotional release.',
    symbolism: 'Heartache, emotional pain, and sorrow.',
    element: 'air'
  },
  {
    id: 'swords-4',
    name: 'Four of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['rest', 'restoration', 'contemplation', 'recuperation'],
      reversed: ['restlessness', 'burnout', 'lack of progress']
    },
    meaning: 'Rest, contemplation, and recovery. Taking time to restore energy.',
    symbolism: 'Rest, peace, and mental recovery.',
    element: 'air'
  },
  {
    id: 'swords-5',
    name: 'Five of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['conflict', 'defeat', 'winning at all costs', 'betrayal'],
      reversed: ['reconciliation', 'making amends', 'past resentment']
    },
    meaning: 'Conflict, defeat, and winning at all costs. Hollow victory through unfair means.',
    symbolism: 'Conflict, defeat, and the cost of winning.',
    element: 'air'
  },
  {
    id: 'swords-6',
    name: 'Six of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['transition', 'moving forward', 'leaving behind'],
      reversed: ['resistance to change', 'unfinished business']
    },
    meaning: 'Transition and moving away from difficulty toward calmer waters. Healing journey.',
    symbolism: 'Transition, journey, and moving toward peace.',
    element: 'air'
  },
  {
    id: 'swords-7',
    name: 'Seven of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['deception', 'strategy', 'stealth', 'getting away'],
      reversed: ['conscience', 'coming clean', 'rethinking approach']
    },
    meaning: 'Deception, strategy, and getting away with something. Cunning and stealth.',
    symbolism: 'Strategy, deception, and acting alone.',
    element: 'air'
  },
  {
    id: 'swords-8',
    name: 'Eight of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['restriction', 'imprisonment', 'victim mentality'],
      reversed: ['freedom', 'release', 'taking control']
    },
    meaning: 'Restriction, feeling trapped, and self-imposed limitations. Victim mentality.',
    symbolism: 'Restriction, imprisonment, and powerlessness.',
    element: 'air'
  },
  {
    id: 'swords-9',
    name: 'Nine of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['anxiety', 'worry', 'nightmares', 'fear'],
      reversed: ['hope', 'reaching out', 'despair']
    },
    meaning: 'Anxiety, worry, and nightmares. Mental anguish and excessive worry.',
    symbolism: 'Anxiety, nightmares, and mental torment.',
    element: 'air'
  },
  {
    id: 'swords-10',
    name: 'Ten of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['painful ending', 'betrayal', 'loss', 'crisis'],
      reversed: ['recovery', 'regeneration', 'resisting end']
    },
    meaning: 'Painful ending, betrayal, and hitting rock bottom. The darkest hour before dawn.',
    symbolism: 'Painful endings, betrayal, and inevitable conclusion.',
    element: 'air'
  },
  {
    id: 'swords-page',
    name: 'Page of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['curiosity', 'new ideas', 'thirst for knowledge', 'vigilance'],
      reversed: ['deception', 'manipulation', 'all talk']
    },
    meaning: 'New ideas, curiosity, and thirst for knowledge. Vigilant and perceptive energy.',
    symbolism: 'Curiosity, restlessness, and mental energy.',
    element: 'air'
  },
  {
    id: 'swords-knight',
    name: 'Knight of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['action', 'impulsiveness', 'defending beliefs', 'ambition'],
      reversed: ['reckless', 'unfocused', 'all talk no action']
    },
    meaning: 'Impulsive, direct action cutting through confusion. Quick-thinking and decisive.',
    symbolism: 'Action, impulsiveness, and defending beliefs.',
    element: 'air'
  },
  {
    id: 'swords-queen',
    name: 'Queen of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['independent', 'clear thinking', 'direct communication', 'unbiased'],
      reversed: ['cold-hearted', 'cruel', 'bitter']
    },
    meaning: 'Clear thinking, direct communication, and independence. Honest and forthright.',
    symbolism: 'Independence, clear boundaries, and direct communication.',
    element: 'air'
  },
  {
    id: 'swords-king',
    name: 'King of Swords',
    suit: 'swords',
    arcana: 'minor',
    keywords: {
      upright: ['intellectual power', 'truth', 'authority', 'clear thinking'],
      reversed: ['manipulative', 'cruel', 'weakness']
    },
    meaning: 'Intellectual power, truth, and moral authority. Master of logical thought.',
    symbolism: 'Mental clarity, intellectual power, and truth.',
    element: 'air'
  }
];

// Minor Arcana - Pentacles (Earth)
export const pentaclesCards: TarotCard[] = [
  {
    id: 'pentacles-ace',
    name: 'Ace of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['opportunity', 'prosperity', 'new venture', 'manifestation'],
      reversed: ['lost opportunity', 'lack of planning', 'scarcity']
    },
    meaning: 'New financial opportunity, manifestation, and prosperity. Material abundance beginning.',
    symbolism: 'Opportunity, prosperity, and new financial beginnings.',
    element: 'earth'
  },
  {
    id: 'pentacles-2',
    name: 'Two of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['balance', 'adaptability', 'time management', 'priorities'],
      reversed: ['imbalance', 'disorganization', 'overwhelmed']
    },
    meaning: 'Balance, juggling priorities, and time management. Adapting to change gracefully.',
    symbolism: 'Balance, adaptability, and juggling resources.',
    element: 'earth'
  },
  {
    id: 'pentacles-3',
    name: 'Three of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['teamwork', 'collaboration', 'learning', 'implementation'],
      reversed: ['lack of teamwork', 'disorganized', 'misaligned']
    },
    meaning: 'Teamwork, collaboration, and skill building through cooperative effort.',
    symbolism: 'Collaboration, learning, and craftsmanship.',
    element: 'earth'
  },
  {
    id: 'pentacles-4',
    name: 'Four of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['security', 'conservation', 'control', 'materialism'],
      reversed: ['greed', 'materialism', 'self-protection']
    },
    meaning: 'Security, control, and holding on tightly to possessions. Fear of loss.',
    symbolism: 'Conservation, security, and control over resources.',
    element: 'earth'
  },
  {
    id: 'pentacles-5',
    name: 'Five of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['financial loss', 'poverty', 'insecurity', 'isolation'],
      reversed: ['recovery', 'acceptance', 'spiritual poverty']
    },
    meaning: 'Financial loss, insecurity, and feeling left out in the cold. Material hardship.',
    symbolism: 'Financial loss, poverty, and isolation.',
    element: 'earth'
  },
  {
    id: 'pentacles-6',
    name: 'Six of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['generosity', 'charity', 'sharing', 'fairness'],
      reversed: ['debt', 'selfishness', 'one-sided']
    },
    meaning: 'Generosity, charity, and sharing wealth with others. Balance of giving and receiving.',
    symbolism: 'Generosity, charity, and sharing resources.',
    element: 'earth'
  },
  {
    id: 'pentacles-7',
    name: 'Seven of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['perseverance', 'investment', 'long-term view', 'rewards'],
      reversed: ['impatience', 'lack of rewards', 'poor investment']
    },
    meaning: 'Perseverance, long-term investment, and assessing progress toward goals.',
    symbolism: 'Investment, patience, and long-term rewards.',
    element: 'earth'
  },
  {
    id: 'pentacles-8',
    name: 'Eight of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['apprenticeship', 'skill development', 'quality', 'mastery'],
      reversed: ['lack of focus', 'perfectionism', 'misdirected energy']
    },
    meaning: 'Apprenticeship, skill development, and dedication to craft. Diligent work.',
    symbolism: 'Diligence, skill development, and craftsmanship.',
    element: 'earth'
  },
  {
    id: 'pentacles-9',
    name: 'Nine of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['independence', 'luxury', 'self-sufficiency', 'financial security'],
      reversed: ['overspending', 'superficiality', 'work-life imbalance']
    },
    meaning: 'Independence, luxury, and self-sufficiency through hard work. Material abundance.',
    symbolism: 'Luxury, self-sufficiency, and financial independence.',
    element: 'earth'
  },
  {
    id: 'pentacles-10',
    name: 'Ten of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['wealth', 'financial security', 'family', 'long-term success'],
      reversed: ['financial failure', 'loneliness', 'loss']
    },
    meaning: 'Wealth, financial security, and long-term success. Legacy and family prosperity.',
    symbolism: 'Wealth, inheritance, family, and long-term success.',
    element: 'earth'
  },
  {
    id: 'pentacles-page',
    name: 'Page of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['manifestation', 'opportunity', 'new venture', 'learning'],
      reversed: ['lack of progress', 'procrastination', 'learning lessons']
    },
    meaning: 'New opportunity, learning practical skills, and manifestation of goals.',
    symbolism: 'Opportunity, studiousness, and new practical endeavors.',
    element: 'earth'
  },
  {
    id: 'pentacles-knight',
    name: 'Knight of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['hard work', 'responsibility', 'routine', 'reliability'],
      reversed: ['laziness', 'obsessiveness', 'work without reward']
    },
    meaning: 'Hard work, responsibility, and reliability. Steady, methodical progress.',
    symbolism: 'Efficiency, routine, and conservatism.',
    element: 'earth'
  },
  {
    id: 'pentacles-queen',
    name: 'Queen of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['practical', 'nurturing', 'generous', 'resourceful'],
      reversed: ['self-centered', 'jealous', 'smothering']
    },
    meaning: 'Practical, nurturing, resourceful, and generous. Grounded, abundant energy.',
    symbolism: 'Nurturing, practical, providing, and resourceful.',
    element: 'earth'
  },
  {
    id: 'pentacles-king',
    name: 'King of Pentacles',
    suit: 'pentacles',
    arcana: 'minor',
    keywords: {
      upright: ['abundance', 'prosperity', 'security', 'leadership'],
      reversed: ['greed', 'materialistic', 'wasteful']
    },
    meaning: 'Financial abundance, business success, and practical leadership. Material mastery.',
    symbolism: 'Wealth, business, leadership, and security.',
    element: 'earth'
  }
];

// Complete deck export
export const completeTarotDeck: TarotCard[] = [
  ...majorArcana,
  ...wandsCards,
  ...cupsCards,
  ...swordsCards,
  ...pentaclesCards
];

// Utility functions
export const getCardById = (id: string): TarotCard | undefined => {
  return completeTarotDeck.find(card => card.id === id);
};

export const getCardsByArcana = (arcana: 'major' | 'minor'): TarotCard[] => {
  return completeTarotDeck.filter(card => card.arcana === arcana);
};

export const getCardsBySuit = (suit: 'wands' | 'cups' | 'swords' | 'pentacles' | 'major'): TarotCard[] => {
  return completeTarotDeck.filter(card => card.suit === suit);
};

export const searchCards = (query: string): TarotCard[] => {
  const lowerQuery = query.toLowerCase();
  return completeTarotDeck.filter(card =>
    card.name.toLowerCase().includes(lowerQuery) ||
    card.meaning.toLowerCase().includes(lowerQuery) ||
    card.keywords.upright.some(k => k.toLowerCase().includes(lowerQuery)) ||
    card.keywords.reversed.some(k => k.toLowerCase().includes(lowerQuery))
  );
};

export const getRandomCard = (): TarotCard => {
  const randomIndex = Math.floor(Math.random() * completeTarotDeck.length);
  return completeTarotDeck[randomIndex];
};

export const getRandomCards = (count: number): TarotCard[] => {
  const shuffled = [...completeTarotDeck].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, completeTarotDeck.length));
};
