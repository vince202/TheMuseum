# Le Vestibule des Initiés

Premier espace du Musée du Tarot - Une expérience immersive explorant les origines mystiques du tarot.

## 🎨 Direction Artistique

**Ambiance :** Lumière tremblante de chandelles, voûte sombre et mystérieuse
**Palette :** Noir sépia (#1a0f08), brun sombre (#2a1810), or vieilli (#d4af37), lueur chaude (#fff8dc)

## 📦 Structure des Composants

```
Vestibule/
├── Vestibule.tsx           # Container principal avec effet candleFlicker
├── CitationsMystiques.tsx  # Citations flottantes qui changent toutes les 8s
├── LivresConsultables.tsx  # Livres Gallica avec modal de consultation
├── GaleriePortraits.tsx    # Portraits des fondateurs avec bio au hover
├── PorteSortie.tsx         # Porte animée vers la salle suivante
├── Vestibule.css           # Styles + animations
└── index.ts                # Exports
```

## 🎭 Zones de la Page

### Zone 1 : Hero Section
- Titre "Le Vestibule des Initiés" avec effet fade-in
- Citations mystiques qui tournent toutes les 8 secondes
- Positions aléatoires mais élégantes
- Scroll hint en bas

### Zone 2 : Galerie des Fondateurs
- 5 portraits avec silhouettes CSS
- Hover : scale + glow doré
- Tooltip avec bio au survol
- Noms : Court de Gébelin, Etteilla, Éliphas Lévi, Papus, Waite

### Zone 3 : Livres Consultables
- 3 ouvrages fondateurs de Gallica
- Couvertures en HD via IIIF
- Click → Modal avec iframe Gallica full
- Loading states pendant chargement

### Zone 4 : Porte de Sortie
- Animation CSS : portes qui s'ouvrent
- Click → Navigate vers /jeux-perdus
- Transition smooth avec lueur dorée

## 🔗 Intégration Gallica

**Livres (via iframes) :**
- Etteilla - Manière de se récréer (1785)
- Court de Gébelin - Le Monde Primitif (1781)
- Papus - Le Tarot des Bohémiens (1889)

**Gravures décoratives (overlay) :**
- Roue de Fortune (top-right, opacity 0.12)
- Symboles égyptiens (bottom-left, opacity 0.08)
- Cartes anciennes (mid-left, opacity 0.10)

## 🎬 Animations

**candleFlicker :** Effet de lumière tremblante (4s infinite)
**fadeInSlow :** Apparition progressive du titre (2s)
**citationFloat :** Fade in/out des citations (12s)

## 🎯 Features

- ✅ Responsive design
- ✅ Lazy loading des iframes
- ✅ Accessibilité (ARIA labels)
- ✅ Performance optimisée (max 4 iframes simultanés)
- ✅ Animations respectueuses du reduced-motion
- ⏳ Audio ambiant (sera ajouté par Vincent)

## 🚀 Utilisation

```tsx
import VestibulePage from './pages/rooms/VestibulePage';

// Dans App.tsx
<Route path="/vestibule" element={<VestibulePage />} />
```

## 📊 Données

Les données sont stockées dans `/src/data/gallicaContent.ts` :
- `vestibuleContent.livres` - 3 livres principaux
- `vestibuleContent.fondateurs` - 5 portraits
- `vestibuleContent.citations` - 6 citations
- `vestibuleContent.gravuresDecor` - 3 gravures overlay

## 🎨 Prochaines Étapes

- [ ] Ajouter audio ambiant Héra (fireplace-vestibule.mp3)
- [ ] Remplacer silhouettes CSS par vraies images si disponibles
- [ ] Ajouter Easter egg : Konami code → recherche Gallica
- [ ] Tests E2E avec Playwright
