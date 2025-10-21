# Visual Effects Components

This directory contains atmospheric visual effects components for the Tarot Museum, creating an immersive mystical experience.

## Components

### 1. ParticleField

Canvas-based particle system with floating mystical symbols.

**Features:**
- Floating symbols (pentacles, stars, moons, etc.)
- Sine wave movement for organic floating
- Rotation and opacity pulsing
- Mobile optimization (50% particles on mobile)
- GPU acceleration with `translate3d`
- Automatic screen wrapping

**Usage:**
```tsx
import { ParticleField } from './components/Effects';

<ParticleField density={12} className="opacity-70" />
```

**Props:**
- `density` (number, default: 15) - Particles per 100,000 pixels
- `className` (string) - Additional CSS classes

**Performance:**
- Uses `requestAnimationFrame` for smooth 60fps animation
- Automatically reduces particle count on mobile devices
- GPU-accelerated rendering

---

### 2. AuroraBackground

Animated gradient background with organic wave patterns.

**Features:**
- Multi-layered aurora waves
- Organic noise-based movement
- Smooth gradient transitions (teal → cyan → purple)
- Blur effect for atmospheric depth
- Continuous morphing animation

**Usage:**
```tsx
import { AuroraBackground } from './components/Effects';

<AuroraBackground className="opacity-60" />
```

**Props:**
- `className` (string) - Additional CSS classes

**Performance:**
- Canvas-based with fade trails
- GPU-accelerated with blur filter
- Optimized wave calculation

---

### 3. ScrollReveal

Intersection Observer-based reveal animations for content.

**Features:**
- Fade-in on scroll
- Directional reveals (up, down, left, right, fade)
- Customizable delay and duration
- Automatic cleanup after reveal
- Lazy loading optimization

**Usage:**
```tsx
import { ScrollReveal } from './components/Effects';

<ScrollReveal direction="up" delay={200} duration={800}>
  <YourContent />
</ScrollReveal>
```

**Props:**
- `direction` ('up' | 'down' | 'left' | 'right' | 'fade', default: 'up')
- `delay` (number, default: 0) - Delay before reveal in ms
- `threshold` (number, default: 0.1) - Intersection threshold
- `duration` (number, default: 800) - Animation duration in ms
- `className` (string) - Additional CSS classes

**Performance:**
- Uses Intersection Observer API
- Automatically unobserves after reveal
- GPU-accelerated transforms

---

### 4. ParallaxLayer

Parallax scrolling effect for background layers.

**Features:**
- Smooth parallax scrolling
- Customizable speed multiplier
- RequestAnimationFrame throttling
- GPU acceleration

**Usage:**
```tsx
import { ParallaxLayer } from './components/Effects';

<ParallaxLayer speed={0.5}>
  <BackgroundElement />
</ParallaxLayer>
```

**Props:**
- `speed` (number, default: 0.5) - Parallax speed multiplier (0-1)
- `className` (string) - Additional CSS classes

**Performance:**
- Throttled with `requestAnimationFrame`
- Passive scroll event listeners
- GPU-accelerated transforms

---

## Glow Effects (CSS)

Pre-built CSS utility classes for magical glow effects.

### Text Glows
```css
.glow-cyan          /* Cyan text glow */
.glow-purple        /* Purple text glow */
.glow-mystical      /* Multi-color mystical glow */
```

### Box Glows
```css
.box-glow-cyan      /* Cyan box shadow */
.box-glow-purple    /* Purple box shadow */
```

### Hover Effects
```css
.hover-glow-cyan    /* Cyan glow on hover */
.hover-glow-purple  /* Purple glow on hover */
```

### Pulsing Animations
```css
.pulse-glow-cyan    /* Pulsing cyan glow */
.pulse-glow-purple  /* Pulsing purple glow */
```

### Card Effects
```css
.card-mystical      /* Shimmer effect on hover */
.border-glow        /* Animated border glow */
```

### Utility Classes
```css
.ambient-light      /* Fixed ambient light overlay */
.gpu-accelerated    /* GPU acceleration helper */
```

---

## Integration Example

```tsx
import { AuroraBackground, ParticleField, ScrollReveal } from './components/Effects';

function App() {
  return (
    <div className="relative overflow-hidden">
      {/* Background layer (z-index: 0) */}
      <AuroraBackground className="opacity-60" />

      {/* Particle layer (z-index: 1) */}
      <ParticleField density={12} className="opacity-70" />

      {/* Ambient light overlay */}
      <div className="ambient-light" />

      {/* Content layer (z-index: 10+) */}
      <div className="relative" style={{ zIndex: 10 }}>
        <ScrollReveal direction="up" delay={100}>
          <h1 className="glow-mystical">Welcome to The Tarot Museum</h1>
        </ScrollReveal>

        <ScrollReveal direction="fade" delay={300}>
          <div className="card-mystical hover-glow-purple">
            <p>Mystical content here...</p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
```

---

## Performance Considerations

### Mobile Optimization
- Particle count reduced by 50% on devices < 768px
- All effects use GPU acceleration (`translate3d`, `will-change`)
- Passive event listeners for scroll

### Browser Support
- Modern browsers with Canvas API support
- Intersection Observer API (98%+ browser support)
- Graceful degradation on older browsers

### Best Practices
1. Use `opacity` props to control effect intensity
2. Limit particle density on complex pages
3. Use `ScrollReveal` for staggered content reveals
4. Combine effects sparingly to avoid visual overload

---

## Accessibility

- All effects are decorative and use `pointer-events: none`
- Effects automatically reduce motion when `prefers-reduced-motion` is set
- No semantic content in visual effects
- Screen readers ignore effect elements

---

## File Locations

```
src/components/Effects/
├── ParticleField.tsx      # Particle system
├── AuroraBackground.tsx   # Aurora gradient background
├── ScrollReveal.tsx       # Scroll reveal + parallax
├── index.ts              # Exports
└── README.md             # This file

src/styles/
└── glowEffects.css       # Glow effect utilities
```

---

## Future Enhancements

- [ ] WebGL-based particle system for better performance
- [ ] Interactive particle effects (mouse follow)
- [ ] 3D parallax layers with depth
- [ ] Dynamic color themes based on page content
- [ ] Performance monitoring and adaptive quality
