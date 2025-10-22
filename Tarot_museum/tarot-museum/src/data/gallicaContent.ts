/**
 * Gallica BnF Content for Museum Rooms
 * Structured data from Bibliothèque nationale de France
 */

export interface GallicaLivre {
  id: string;
  titre: string;
  auteur: string;
  date: string;
  ark: string;
  iframeUrl: string;
  coverImage: string;
  description: string;
}

export interface GallicaGravure {
  id: string;
  titre: string;
  iframeMini: string;
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
}

export interface Fondateur {
  id: string;
  nom: string;
  dates: string;
  titre: string;
  bio: string;
  livreArk?: string;
}

export const vestibuleContent = {
  livres: [
    {
      id: 'etteilla-1785',
      titre: 'Manière de se récréer avec le jeu de cartes nommées tarots',
      auteur: 'Etteilla (Jean-Baptiste Alliette)',
      date: '1785',
      ark: 'bpt6k5438581s',
      iframeUrl: 'https://gallica.bnf.fr/ark:/12148/bpt6k5438581s/f1.item',
      coverImage: 'https://gallica.bnf.fr/iiif/ark:/12148/bpt6k5438581s/f1/full/400,/0/default.jpg',
      description: 'Le premier traité de cartomancie moderne. Etteilla révolutionne l\'art divinatoire en créant un système complet d\'interprétation des cartes.'
    },
    {
      id: 'gebelin-1781',
      titre: 'Le Monde primitif, analysé et comparé avec le monde moderne',
      auteur: 'Antoine Court de Gébelin',
      date: '1781',
      ark: 'bpt6k411333v',
      iframeUrl: 'https://gallica.bnf.fr/ark:/12148/bpt6k411333v/f1.item',
      coverImage: 'https://gallica.bnf.fr/iiif/ark:/12148/bpt6k411333v/f1/full/400,/0/default.jpg',
      description: 'L\'ouvrage fondateur qui établit le mythe égyptien du tarot. Court de Gébelin y voit les vestiges du Livre de Thot.'
    },
    {
      id: 'papus-1889',
      titre: 'Le Tarot des Bohémiens : le plus ancien livre du monde',
      auteur: 'Papus (Gérard Encausse)',
      date: '1889',
      ark: 'bpt6k5438565g',
      iframeUrl: 'https://gallica.bnf.fr/ark:/12148/bpt6k5438565g/f1.item',
      coverImage: 'https://gallica.bnf.fr/iiif/ark:/12148/bpt6k5438565g/f1/full/400,/0/default.jpg',
      description: 'Synthèse ésotérique majeure reliant le tarot à la Kabbale, l\'astrologie et l\'alchimie. Ouvrage de référence de l\'occultisme français.'
    }
  ] as GallicaLivre[],

  gravuresDecor: [
    {
      id: 'roue-fortune',
      titre: 'La Roue de Fortune',
      iframeMini: 'https://gallica.bnf.fr/ark:/12148/btv1b8626554h/f1.item.mini',
      position: { top: '10%', right: '5%' },
      size: { width: '250px', height: '350px' },
      opacity: 0.12,
      blendMode: 'multiply'
    },
    {
      id: 'symboles-egyptiens',
      titre: 'Symboles mystiques égyptiens',
      iframeMini: 'https://gallica.bnf.fr/ark:/12148/btv1b105458061/f1.item.mini',
      position: { bottom: '15%', left: '8%' },
      size: { width: '280px', height: '200px' },
      opacity: 0.08,
      blendMode: 'screen'
    },
    {
      id: 'cartes-anciennes',
      titre: 'Cartes de tarot anciennes',
      iframeMini: 'https://gallica.bnf.fr/ark:/12148/btv1b10545802x/f1.item.mini',
      position: { top: '50%', left: '5%' },
      size: { width: '200px', height: '300px' },
      opacity: 0.10,
      blendMode: 'multiply'
    }
  ] as GallicaGravure[],

  fondateurs: [
    {
      id: 'gebelin',
      nom: 'Antoine Court de Gébelin',
      dates: '1725-1784',
      titre: 'Le Découvreur',
      bio: 'Premier à voir dans le Tarot les mystères égyptiens. Son ouvrage "Le Monde Primitif" (1781) établit le mythe fondateur du tarot comme vestige du Livre de Thot, déclenchant deux siècles de fascination ésotérique.',
      livreArk: 'bpt6k411333v'
    },
    {
      id: 'etteilla',
      nom: 'Jean-Baptiste Alliette',
      dates: '1738-1791',
      titre: 'Le Premier Cartomancien',
      bio: 'Sous le pseudonyme d\'Etteilla (son nom inversé), il crée le premier tarot spécifiquement conçu pour la divination. Son système d\'interprétation des lames influence encore la pratique moderne.',
      livreArk: 'bpt6k5438581s'
    },
    {
      id: 'levi',
      nom: 'Éliphas Lévi',
      dates: '1810-1875',
      titre: 'Le Mage Moderne',
      bio: 'Relie le tarot à la Kabbale hébraïque et aux 22 lettres de l\'alphabet sacré. Ses écrits hermétiques posent les fondations de l\'occultisme contemporain.',
      livreArk: undefined
    },
    {
      id: 'papus',
      nom: 'Papus (Gérard Encausse)',
      dates: '1865-1916',
      titre: 'Le Synthétiseur',
      bio: 'Médecin et occultiste, il synthétise les traditions ésotériques dans "Le Tarot des Bohémiens" (1889). Fonde l\'Ordre Martiniste et popularise le tarot comme outil initiatique.',
      livreArk: 'bpt6k5438565g'
    },
    {
      id: 'waite',
      nom: 'Arthur Edward Waite',
      dates: '1857-1942',
      titre: 'Le Popularisateur',
      bio: 'Co-créateur du Rider-Waite-Smith, le tarot le plus utilisé au monde. Membre de la Golden Dawn, il démocratise le symbolisme ésotérique avec des images accessibles.',
      livreArk: undefined
    }
  ] as Fondateur[],

  citations: [
    "Le Livre de Thot contient l'essence de la sagesse égyptienne — Court de Gébelin",
    "Les cartes sont les pages d'un grimoire universel — Éliphas Lévi",
    "Celui qui sait lire les lames détient les clés du destin — Etteilla",
    "Le Tarot est un livre muet qui parle à celui qui sait voir — Papus",
    "Dans chaque arcane se cache un mystère attendant d'être dévoilé",
    "Les symboles sont la langue des dieux, le Tarot leur alphabet sacré"
  ]
};

// Salle des Jeux Perdus (à compléter)
export const jeuxPerdusContent = {
  // TODO: Contenu pour la Salle des Jeux Perdus
};

// Cabinet des Mages (à compléter)
export const cabinetMagesContent = {
  // TODO: Contenu pour le Cabinet des Mages
};

// Salon de Mlle Lenormand (à compléter)
export const salonLenormandContent = {
  // TODO: Contenu pour le Salon de Mlle Lenormand
};
