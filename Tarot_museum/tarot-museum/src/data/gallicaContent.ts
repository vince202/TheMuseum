/**
 * Gallica BnF Content for Museum Rooms
 * Structured data from Bibliothèque nationale de France
 * Optimized for performance with direct links
 */

// ============================================
// INTERFACES
// ============================================

export interface HeraIntro {
  text: string;
  duration: number; // milliseconds
  voice?: string; // TTS voice if needed
}

export interface Citation {
  text: string;
  author?: string;
  year?: number;
}

export interface GallicaLivre {
  id: string;
  titre: string;
  auteur: string;
  date: string;
  ark: string;
  coverUrl: string; // Direct IIIF image URL
  iframeConsult: string; // Full consultation URL
  iframeMini: string; // Mini preview URL
  hoverText: string; // Short description on hover
  totalPages?: number;
  fallbackPages?: number[];
}

export interface GallicaGravure {
  id: string;
  titre: string;
  type: 'gravure';
  imageUrl: string; // Direct IIIF image URL for performance
  iframeMini: string; // Fallback iframe
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  size: {
    width: string;
    height: string;
  };
  opacity: number;
  blendMode?: string;
  fallbackPages?: string[];
}

export interface Fondateur {
  id: string;
  nom: string;
  dates: string;
  titre: string;
  bio: string; // Ultra-short bio (1 sentence max)
  livreArk?: string;
  featured?: boolean;
}

export interface EasterEgg {
  zone: {
    bottom: number;
    right: number;
    width: number;
    height: number;
  };
  message: string;
  iframeSecret: string;
}

export interface PorteTransition {
  texte: string;
  hover: string;
  link: string;
}

// ============================================
// VESTIBULE CONTENT
// ============================================

export const vestibuleContent = {
  // INTRO AUDIO HÉRA (20 secondes max)
  hera: {
    text: "Vous entrez dans le Vestibule. Ici, Court de Gébelin découvrit l'Égypte cachée dans les cartes. Etteilla y déchiffra le Livre de Thot. Papus en révéla les clés hermétiques. Ces livres ne sont pas que papier et encre. Ce sont des portes. Approchez... mais sachez que certains savoirs transforment.",
    duration: 20000,
    voice: 'fr-FR-DeniseNeural'
  } as HeraIntro,

  // CITATIONS COURTES (rotation toutes les 8 sec)
  citations: [
    { text: "Le Tarot est le livre des combinaisons de YHVH", author: "Etteilla", year: 1785 },
    { text: "L'Égypte vit dans ces symboles", author: "Court de Gébelin", year: 1781 },
    { text: "Qui lit les lames parle à l'invisible", author: "Papus", year: 1889 }
  ] as Citation[],

  // LIVRES CONSULTABLES (avec URLs directes)
  livres: [
    {
      id: 'etteilla-manieres',
      titre: 'Manière de se récréer avec le jeu de cartes nommées tarots',
      auteur: 'Etteilla',
      date: '1785',
      ark: 'bpt6k5438581s',
      coverUrl: 'https://gallica.bnf.fr/iiif/ark:/12148/bpt6k5438581s/f5/full/300,/0/default.jpg',
      iframeConsult: 'https://gallica.bnf.fr/ark:/12148/bpt6k5438581s/f1.item',
      iframeMini: 'https://gallica.bnf.fr/ark:/12148/bpt6k5438581s/f1.item.mini',
      hoverText: 'Premier traité de cartomancie. Cliquez pour feuilleter l\'original.',
      totalPages: 8,
      fallbackPages: [1, 2, 3, 4, 5]
    },
    {
      id: 'gebelin-monde',
      titre: 'Le Monde Primitif, Tome VIII',
      auteur: 'Court de Gébelin',
      date: '1781',
      ark: 'bpt6k411333v',
      coverUrl: 'https://gallica.bnf.fr/iiif/ark:/12148/bpt6k411333v/f1/full/300,/0/default.jpg',
      iframeConsult: 'https://gallica.bnf.fr/ark:/12148/bpt6k411333v/f1.item',
      iframeMini: 'https://gallica.bnf.fr/ark:/12148/bpt6k411333v/f1.item.mini',
      hoverText: 'La révélation originelle. Pages 365-410 : la première interprétation ésotérique.',
      totalPages: 8,
      fallbackPages: [1, 2, 3, 4, 5]
    },
    {
      id: 'papus-bohemiens',
      titre: 'Le Tarot des Bohémiens',
      auteur: 'Papus',
      date: '1889',
      ark: 'bpt6k5438565g',
      coverUrl: 'https://gallica.bnf.fr/iiif/ark:/12148/bpt6k5438565g/f1/full/300,/0/default.jpg',
      iframeConsult: 'https://gallica.bnf.fr/ark:/12148/bpt6k5438565g/f1.item',
      iframeMini: 'https://gallica.bnf.fr/ark:/12148/bpt6k5438565g/f1.item.mini',
      hoverText: 'La somme hermétique. 439 pages où convergent Kabbale et alchimie.',
      totalPages: 8,
      fallbackPages: [1, 2, 3, 4, 5]
    }
  ] as GallicaLivre[],

  // FONDATEURS (bios ultra-courtes)
  fondateurs: [
    {
      id: 'gebelin',
      nom: 'Antoine Court de Gébelin',
      dates: '1725-1784',
      titre: 'Le Découvreur',
      bio: '1781 : premier à voir l\'Égypte dans le Tarot',
      livreArk: 'bpt6k411333v',
      featured: true
    },
    {
      id: 'etteilla',
      nom: 'Jean-Baptiste Alliette (Etteilla)',
      dates: '1738-1791',
      titre: 'Le Cartomancien',
      bio: 'Créateur du premier tarot divinatoire',
      livreArk: 'bpt6k5438581s',
      featured: true
    },
    {
      id: 'papus',
      nom: 'Gérard Encausse (Papus)',
      dates: '1865-1916',
      titre: 'Le Docteur de l\'Occulte',
      bio: 'Médecin et martiniste. Synthétisa deux siècles de tradition ésotérique.',
      livreArk: 'bpt6k5438565g',
      featured: true
    },
    {
      id: 'fayolle',
      nom: 'Louis-Raphaël-Lucrèce de Fayolle',
      dates: '1760-1825',
      titre: 'Le Comte Mystérieux',
      bio: 'Noble émigré, disciple secret d\'Etteilla. On murmure qu\'il pratiquait le Grand Œuvre.',
      featured: false
    },
    {
      id: 'lenormand',
      nom: 'Marie-Anne Lenormand',
      dates: '1772-1843',
      titre: 'La Sibylle de Paris',
      bio: 'Conseillère de Joséphine et Napoléon. Porta la cartomancie au sommet du pouvoir.',
      featured: false
    }
  ] as Fondateur[],

  // GRAVURES DÉCORATIVES (avec imageUrl directe pour performance)
  gravuresDecor: [
    {
      id: 'roue-fortune',
      titre: 'La Roue de Fortune',
      type: 'gravure',
      imageUrl: 'https://gallica.bnf.fr/iiif/ark:/12148/btv1b8626554h/f1/full/400,/0/default.jpg',
      iframeMini: 'https://gallica.bnf.fr/ark:/12148/btv1b8626554h/f1.item.mini',
      position: { top: '10%', right: '5%' },
      size: { width: '250px', height: '350px' },
      opacity: 0.12,
      blendMode: 'multiply',
      fallbackPages: [
        'https://gallica.bnf.fr/ark:/12148/btv1b8626554h/f2.item.mini',
        'https://gallica.bnf.fr/ark:/12148/btv1b8626554h/f3.item.mini'
      ]
    },
    {
      id: 'symboles-thot',
      titre: 'Symboles du Livre de Thot',
      type: 'gravure',
      imageUrl: 'https://gallica.bnf.fr/iiif/ark:/12148/btv1b105458061/f1/full/300,/0/default.jpg',
      iframeMini: 'https://gallica.bnf.fr/ark:/12148/btv1b105458061/f1.item.mini',
      position: { bottom: '15%', left: '8%' },
      size: { width: '200px', height: '200px' },
      opacity: 0.08,
      blendMode: 'screen',
      fallbackPages: [
        'https://gallica.bnf.fr/ark:/12148/btv1b105458061/f2.item.mini',
        'https://gallica.bnf.fr/ark:/12148/btv1b105458061/f3.item.mini'
      ]
    },
    {
      id: 'cartes-anciennes',
      titre: 'Cartes de tarot anciennes',
      type: 'gravure',
      imageUrl: 'https://gallica.bnf.fr/iiif/ark:/12148/btv1b10545802x/f1/full/300,/0/default.jpg',
      iframeMini: 'https://gallica.bnf.fr/ark:/12148/btv1b10545802x/f1.item.mini',
      position: { top: '50%', left: '5%' },
      size: { width: '200px', height: '300px' },
      opacity: 0.10,
      blendMode: 'multiply',
      fallbackPages: [
        'https://gallica.bnf.fr/ark:/12148/btv1b10545802x/f2.item.mini',
        'https://gallica.bnf.fr/ark:/12148/btv1b10545802x/f3.item.mini',
        'https://gallica.bnf.fr/ark:/12148/btv1b10545802x/f4.item.mini',
        'https://gallica.bnf.fr/ark:/12148/btv1b10545802x/f5.item.mini',
        'https://gallica.bnf.fr/ark:/12148/btv1b10545802x/f6.item.mini',
        'https://gallica.bnf.fr/ark:/12148/btv1b10545802x/f7.item.mini',
        'https://gallica.bnf.fr/ark:/12148/btv1b10545802x/f8.item.mini'
      ]
    }
  ] as GallicaGravure[],

  // EASTER EGG (zone cliquable secrète)
  easterEgg: {
    zone: { bottom: 50, right: 50, width: 100, height: 100 },
    message: 'Vous avez trouvé le Grimoire Noir d\'Etteilla ! Ce manuscrit maudit fut brûlé en 1791... ou presque.',
    iframeSecret: 'https://gallica.bnf.fr/ark:/12148/btv1b10545802x/f1.item'
  } as EasterEgg,

  // PORTE VERS SALLE SUIVANTE
  porte: {
    texte: 'Au-delà de ce seuil : Les Jeux Perdus',
    hover: 'Les cartes oubliées vous attendent. Tarots régionaux, jeux maudits, decks disparus... Osez-vous pénétrer dans la Salle des Jeux Perdus?',
    link: '/jeux-perdus'
  } as PorteTransition
};

// ============================================
// AUTRES SALLES (à compléter)
// ============================================

export const jeuxPerdusContent = {
  // TODO: Contenu pour la Salle des Jeux Perdus
};

export const cabinetMagesContent = {
  // TODO: Contenu pour le Cabinet des Mages
};

export const salonLenormandContent = {
  // TODO: Contenu pour le Salon de Mlle Lenormand
};
