import { describe, it, expect } from '@jest/globals';

// Import tarot data files
const majorArcana = require('../../Tarot_museum/tarot-museum-data/cards/major-arcana.json');
const minorArcana = require('../../Tarot_museum/tarot-museum-data/cards/minor-arcana.json');
const tarotDecks = require('../../Tarot_museum/tarot-museum-data/decks/major-tarot-decks.json');
const tarotTimeline = require('../../Tarot_museum/tarot-museum-data/history/tarot-timeline.json');

describe('Tarot Data Integrity Tests', () => {
  describe('Major Arcana Data', () => {
    it('should have exactly 22 major arcana cards', () => {
      expect(majorArcana.cards).toHaveLength(22);
    });

    it('should have valid card numbers (0-21)', () => {
      majorArcana.cards.forEach((card: any) => {
        expect(card.number).toBeGreaterThanOrEqual(0);
        expect(card.number).toBeLessThanOrEqual(21);
      });
    });

    it('should have all required fields for each card', () => {
      const requiredFields = [
        'id',
        'name',
        'number',
        'arcana',
        'keywords',
        'description',
        'upright',
        'reversed',
      ];

      majorArcana.cards.forEach((card: any) => {
        requiredFields.forEach(field => {
          expect(card).toHaveProperty(field);
          expect(card[field]).toBeDefined();
        });
      });
    });

    it('should have unique card IDs', () => {
      const ids = majorArcana.cards.map((card: any) => card.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have unique card numbers', () => {
      const numbers = majorArcana.cards.map((card: any) => card.number);
      const uniqueNumbers = new Set(numbers);
      expect(uniqueNumbers.size).toBe(numbers.length);
    });

    it('should have upright meanings', () => {
      majorArcana.cards.forEach((card: any) => {
        expect(card.upright).toHaveProperty('meaning');
        expect(card.upright).toHaveProperty('keywords');
        expect(card.upright.meaning).toBeTruthy();
        expect(Array.isArray(card.upright.keywords)).toBe(true);
      });
    });

    it('should have reversed meanings', () => {
      majorArcana.cards.forEach((card: any) => {
        expect(card.reversed).toHaveProperty('meaning');
        expect(card.reversed).toHaveProperty('keywords');
        expect(card.reversed.meaning).toBeTruthy();
        expect(Array.isArray(card.reversed.keywords)).toBe(true);
      });
    });

    it('should have valid descriptions', () => {
      majorArcana.cards.forEach((card: any) => {
        expect(typeof card.description).toBe('string');
        expect(card.description.length).toBeGreaterThan(10);
      });
    });

    it('should have at least 3 keywords per card', () => {
      majorArcana.cards.forEach((card: any) => {
        expect(card.keywords.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('should have proper arcana type', () => {
      majorArcana.cards.forEach((card: any) => {
        expect(card.arcana).toBe('major');
      });
    });
  });

  describe('Minor Arcana Data', () => {
    it('should have exactly 56 minor arcana cards', () => {
      expect(minorArcana.cards).toHaveLength(56);
    });

    it('should have 4 suits', () => {
      const suits = new Set(minorArcana.cards.map((card: any) => card.suit));
      expect(suits.size).toBe(4);
      expect(suits).toContain('cups');
      expect(suits).toContain('wands');
      expect(suits).toContain('swords');
      expect(suits).toContain('pentacles');
    });

    it('should have 14 cards per suit', () => {
      const suitCounts: Record<string, number> = {};

      minorArcana.cards.forEach((card: any) => {
        suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
      });

      Object.values(suitCounts).forEach(count => {
        expect(count).toBe(14);
      });
    });

    it('should have all required fields', () => {
      const requiredFields = [
        'id',
        'name',
        'suit',
        'arcana',
        'keywords',
        'description',
        'upright',
        'reversed',
      ];

      minorArcana.cards.forEach((card: any) => {
        requiredFields.forEach(field => {
          expect(card).toHaveProperty(field);
          expect(card[field]).toBeDefined();
        });
      });
    });

    it('should have proper arcana type', () => {
      minorArcana.cards.forEach((card: any) => {
        expect(card.arcana).toBe('minor');
      });
    });

    it('should have unique card IDs', () => {
      const ids = minorArcana.cards.map((card: any) => card.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid card numbers for numbered cards', () => {
      minorArcana.cards
        .filter((card: any) => typeof card.number === 'number')
        .forEach((card: any) => {
          expect(card.number).toBeGreaterThanOrEqual(1);
          expect(card.number).toBeLessThanOrEqual(14);
        });
    });
  });

  describe('Tarot Decks Data', () => {
    it('should have at least one deck', () => {
      expect(tarotDecks.decks.length).toBeGreaterThan(0);
    });

    it('should have all required deck fields', () => {
      const requiredFields = [
        'id',
        'name',
        'creator',
        'year',
        'description',
        'style',
      ];

      tarotDecks.decks.forEach((deck: any) => {
        requiredFields.forEach(field => {
          expect(deck).toHaveProperty(field);
          expect(deck[field]).toBeDefined();
        });
      });
    });

    it('should have valid years', () => {
      tarotDecks.decks.forEach((deck: any) => {
        const year = parseInt(deck.year);
        expect(year).toBeGreaterThan(1400); // Earliest known tarot
        expect(year).toBeLessThanOrEqual(new Date().getFullYear());
      });
    });

    it('should have unique deck IDs', () => {
      const ids = tarotDecks.decks.map((deck: any) => deck.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid deck styles', () => {
      const validStyles = [
        'traditional',
        'modern',
        'artistic',
        'esoteric',
        'minimalist',
        'thematic',
      ];

      tarotDecks.decks.forEach((deck: any) => {
        expect(validStyles).toContain(deck.style);
      });
    });
  });

  describe('Timeline Data', () => {
    it('should have timeline events', () => {
      expect(tarotTimeline.events.length).toBeGreaterThan(0);
    });

    it('should have all required event fields', () => {
      const requiredFields = [
        'id',
        'year',
        'title',
        'description',
        'significance',
        'period',
      ];

      tarotTimeline.events.forEach((event: any) => {
        requiredFields.forEach(field => {
          expect(event).toHaveProperty(field);
          expect(event[field]).toBeDefined();
        });
      });
    });

    it('should have events in chronological order', () => {
      for (let i = 1; i < tarotTimeline.events.length; i++) {
        const prevYear = parseInt(tarotTimeline.events[i - 1].year);
        const currentYear = parseInt(tarotTimeline.events[i].year);
        expect(currentYear).toBeGreaterThanOrEqual(prevYear);
      }
    });

    it('should have valid periods', () => {
      const validPeriods = [
        'ancient',
        'medieval',
        'renaissance',
        'modern',
        'contemporary',
      ];

      tarotTimeline.events.forEach((event: any) => {
        expect(validPeriods).toContain(event.period);
      });
    });

    it('should have unique event IDs', () => {
      const ids = tarotTimeline.events.map((event: any) => event.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have reasonable year ranges', () => {
      tarotTimeline.events.forEach((event: any) => {
        const year = parseInt(event.year);
        expect(year).toBeGreaterThan(1300);
        expect(year).toBeLessThanOrEqual(new Date().getFullYear());
      });
    });
  });

  describe('Cross-Reference Integrity', () => {
    it('should have consistent card references across data files', () => {
      const majorArcanaIds = new Set(majorArcana.cards.map((c: any) => c.id));
      const minorArcanaIds = new Set(minorArcana.cards.map((c: any) => c.id));

      // No duplicate IDs between major and minor arcana
      majorArcanaIds.forEach(id => {
        expect(minorArcanaIds.has(id)).toBe(false);
      });
    });

    it('should have valid deck references in card data', () => {
      const deckIds = new Set(tarotDecks.decks.map((d: any) => d.id));

      const allCards = [...majorArcana.cards, ...minorArcana.cards];

      allCards.forEach((card: any) => {
        if (card.deck) {
          expect(deckIds.has(card.deck)).toBe(true);
        }
      });
    });

    it('should have valid card references in timeline', () => {
      const allCardIds = new Set([
        ...majorArcana.cards.map((c: any) => c.id),
        ...minorArcana.cards.map((c: any) => c.id),
      ]);

      tarotTimeline.events.forEach((event: any) => {
        if (event.cards && Array.isArray(event.cards)) {
          event.cards.forEach((cardId: string) => {
            expect(allCardIds.has(cardId)).toBe(true);
          });
        }
      });
    });
  });

  describe('Data Quality', () => {
    it('should not have empty strings for required fields', () => {
      const allCards = [...majorArcana.cards, ...minorArcana.cards];

      allCards.forEach((card: any) => {
        expect(card.name.trim()).toBeTruthy();
        expect(card.description.trim()).toBeTruthy();
        expect(card.upright.meaning.trim()).toBeTruthy();
        expect(card.reversed.meaning.trim()).toBeTruthy();
      });
    });

    it('should have proper capitalization for card names', () => {
      const allCards = [...majorArcana.cards, ...minorArcana.cards];

      allCards.forEach((card: any) => {
        // First character should be uppercase or number
        expect(/^[A-Z0-9]/.test(card.name)).toBe(true);
      });
    });

    it('should have consistent keyword formatting', () => {
      const allCards = [...majorArcana.cards, ...minorArcana.cards];

      allCards.forEach((card: any) => {
        card.keywords.forEach((keyword: string) => {
          expect(typeof keyword).toBe('string');
          expect(keyword.trim()).toBeTruthy();
          expect(keyword.length).toBeGreaterThan(2);
        });
      });
    });

    it('should not have duplicate keywords within a card', () => {
      const allCards = [...majorArcana.cards, ...minorArcana.cards];

      allCards.forEach((card: any) => {
        const uniqueKeywords = new Set(card.keywords.map((k: string) => k.toLowerCase()));
        expect(uniqueKeywords.size).toBe(card.keywords.length);
      });
    });

    it('should have descriptions of reasonable length', () => {
      const allCards = [...majorArcana.cards, ...minorArcana.cards];

      allCards.forEach((card: any) => {
        expect(card.description.length).toBeGreaterThan(50);
        expect(card.description.length).toBeLessThan(2000);
      });
    });
  });
});
