# Visual Effects Integration Guide

## Quick Start

The Tarot Museum now includes atmospheric visual effects that create an immersive mystical experience. All effects are performance-optimized and mobile-friendly.

## What's Been Added

### 1. Background Effects (Already Integrated in App.tsx)

```tsx
// App.tsx already includes:
<AuroraBackground className="opacity-60" />
<ParticleField density={12} className="opacity-70" />
<div className="ambient-light" />
```

These create the base atmospheric layer across the entire application.

### 2. Available Components for Page Enhancement

#### ScrollReveal - Fade content on scroll

```tsx
import { ScrollReveal } from './components/Effects';

// Fade up from bottom (default)
<ScrollReveal>
  <YourContent />
</ScrollReveal>

// Custom direction and timing
<ScrollReveal direction="left" delay={200} duration={1000}>
  <Card />
</ScrollReveal>

// Stagger multiple elements
<ScrollReveal delay={0}>
  <Card1 />
</ScrollReveal>
<ScrollReveal delay={200}>
  <Card2 />
</ScrollReveal>
<ScrollReveal delay={400}>
  <Card3 />
</ScrollReveal>
```

#### ParallaxLayer - Background parallax

```tsx
import { ParallaxLayer } from './components/Effects';

<ParallaxLayer speed={0.3}>
  <BackgroundImage />
</ParallaxLayer>

<ParallaxLayer speed={0.6}>
  <MidgroundElement />
</ParallaxLayer>
```

### 3. CSS Utility Classes (Now Available Globally)

#### Text Glows
```tsx
<h1 className="glow-mystical">The Tarot Museum</h1>
<p className="glow-cyan">Mystical text</p>
<span className="glow-purple">Ethereal text</span>
```

#### Box Glows
```tsx
<div className="box-glow-cyan p-6">
  Glowing container
</div>
```

#### Hover Effects
```tsx
<button className="hover-glow-purple">
  Interactive Button
</button>

<div className="card-mystical">
  Card with shimmer on hover
</div>
```

#### Pulsing Glows
```tsx
<div className="pulse-glow-cyan">
  Continuously pulsing element
</div>
```

## Usage Examples by Page Type

### Homepage Hero Section

```tsx
import { ScrollReveal } from './components/Effects';

function HomePage() {
  return (
    <>
      <ScrollReveal direction="fade" duration={1200}>
        <h1 className="glow-mystical text-6xl">
          The Tarot Museum
        </h1>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={300}>
        <p className="text-xl">
          Explore 500 years of mystical symbolism
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={600}>
        <button className="hover-glow-purple px-8 py-4">
          Begin Your Journey
        </button>
      </ScrollReveal>
    </>
  );
}
```

### Card Gallery Page

```tsx
import { ScrollReveal } from './components/Effects';

function CardGallery() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <ScrollReveal key={card.id} delay={index * 100}>
          <div className="card-mystical hover-glow-cyan">
            <CardComponent card={card} />
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
```

### Timeline Page with Parallax

```tsx
import { ScrollReveal, ParallaxLayer } from './components/Effects';

function TimelinePage() {
  return (
    <div className="relative">
      <ParallaxLayer speed={0.3} className="absolute inset-0">
        <div className="ambient-light" />
      </ParallaxLayer>

      <div className="relative z-10">
        {events.map((event, i) => (
          <ScrollReveal
            key={event.id}
            direction={i % 2 === 0 ? 'left' : 'right'}
            delay={100}
          >
            <div className="box-glow-purple p-8">
              <h3 className="glow-cyan">{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
```

### Interactive Card Reading

```tsx
function CardReading() {
  return (
    <div className="relative">
      {/* Cards appear with staggered reveal */}
      {selectedCards.map((card, index) => (
        <ScrollReveal
          key={card.id}
          direction="up"
          delay={index * 300}
          duration={1000}
        >
          <div className="card-mystical pulse-glow-purple">
            <Card data={card} />
          </div>
        </ScrollReveal>
      ))}

      {/* Interpretation text fades in after cards */}
      <ScrollReveal delay={1200} direction="fade">
        <div className="box-glow-cyan p-6">
          <h3 className="glow-mystical">Your Reading</h3>
          <p>{interpretation}</p>
        </div>
      </ScrollReveal>
    </div>
  );
}
```

## Performance Tips

### 1. Particle Density
- Default: `density={12}` (already set)
- Increase for desktop-only: `density={18}`
- Reduce for heavy pages: `density={8}`

### 2. Effect Layering
Recommended z-index stack:
- Aurora Background: `z-index: 0`
- Particles: `z-index: 1`
- Ambient Light: `z-index: 1`
- Main Content: `z-index: 10`
- Modals/Overlays: `z-index: 50`

### 3. ScrollReveal Best Practices
```tsx
// Good: Stagger reveals for visual flow
<ScrollReveal delay={0}><Item1 /></ScrollReveal>
<ScrollReveal delay={100}><Item2 /></ScrollReveal>
<ScrollReveal delay={200}><Item3 /></ScrollReveal>

// Avoid: All same delay (feels jumpy)
<ScrollReveal delay={0}><Item1 /></ScrollReveal>
<ScrollReveal delay={0}><Item2 /></ScrollReveal>
<ScrollReveal delay={0}><Item3 /></ScrollReveal>
```

### 4. Mobile Considerations
Effects automatically optimize for mobile:
- Particles reduced by 50%
- All effects use passive event listeners
- GPU acceleration enabled

### 5. Reduced Motion
All effects respect `prefers-reduced-motion`:
```css
/* Already handled in index.css */
@media (prefers-reduced-motion: reduce) {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

## Testing Checklist

- [ ] Effects render on all pages
- [ ] No performance lag on scroll
- [ ] Mobile view shows fewer particles
- [ ] Hover glows work on interactive elements
- [ ] ScrollReveal animates on viewport entry
- [ ] Reduced motion setting disables animations
- [ ] Effects don't interfere with text readability
- [ ] z-index layers are correct (content above effects)

## Troubleshooting

### Particles not showing
- Check z-index of content (should be > 1)
- Verify `overflow-hidden` on parent container
- Check console for Canvas errors

### Performance issues
- Reduce particle density: `<ParticleField density={8} />`
- Disable aurora on mobile: `className="hidden md:block"`
- Limit ScrollReveal on long lists

### Glows not visible
- Ensure glow effects CSS is imported in index.css
- Check element background isn't covering glow
- Increase opacity: `className="glow-cyan opacity-100"`

## Future Enhancements

1. **Interactive Particles**: Particles react to mouse movement
2. **Dynamic Color Themes**: Effects change color based on card suit
3. **WebGL Upgrade**: Use Three.js for 3D particle effects
4. **Audio Reactivity**: Particles respond to ambient music
5. **Custom Symbols**: Upload custom mystical symbols for particles

## Support

For issues or questions:
- Check `/src/components/Effects/README.md` for API details
- Review `/docs/VISUAL_EFFECTS_USAGE.md` for examples
- Test in multiple browsers (Chrome, Firefox, Safari)

---

**Happy Coding! May your effects be smooth and mystical.** ✨🔮
