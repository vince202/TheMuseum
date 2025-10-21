# Performance Optimization Guide

## Overview

The Tarot Museum is optimized for magical experiences that load fast and run smoothly. This guide explains our performance optimizations and how to maintain them.

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Lighthouse Performance | > 90 | ✅ |
| First Contentful Paint (FCP) | < 1.5s | ✅ |
| Largest Contentful Paint (LCP) | < 2.5s | ✅ |
| Time to Interactive (TTI) | < 3s | ✅ |
| First Input Delay (FID) | < 100ms | ✅ |
| Cumulative Layout Shift (CLS) | < 0.1 | ✅ |
| Bundle Size (gzipped) | < 250KB | ✅ |
| Animation Framerate | 60fps | ✅ |

## Architecture

### Bundle Splitting Strategy

```
Main Bundle (index.js)          → Core React + Router + Critical CSS
├── react-vendor.js             → React & React-DOM (~40KB)
├── router.js                   → React Router (~15KB)
├── three-vendor.js             → Three.js + R3F + Drei (~180KB) 🔴 LAZY LOADED
├── animation-vendor.js         → Framer Motion + React Spring (~60KB)
├── icons.js                    → Lucide Icons (~20KB)
└── utils-vendor.js             → Date-fns + Utilities (~15KB)
```

**Total Initial Load**: ~150KB gzipped (without Three.js)
**Three.js**: Lazy loaded on 3D component mount

### Code Splitting

1. **Route-based splitting**: Each page is a separate chunk
2. **Component-based splitting**: Heavy components (3D viewer, effects) are lazy loaded
3. **Vendor splitting**: Large libraries are in separate chunks for better caching

## Key Optimizations

### 1. Lazy Loading

```typescript
// Lazy load heavy 3D components
import { lazyLoad } from '@/utils/lazyComponents';

const Card3DViewer = lazyLoad(
  () => import('@/components/CardViewer/Card3DViewer'),
  {
    fallback: <LoadingSpinner message="Loading 3D viewer..." />,
  }
);
```

### 2. Image Optimization

```typescript
// Automatic format selection (AVIF > WebP > JPG)
import { LazyImage } from '@/utils/lazyComponents';

<LazyImage
  src="/images/card.jpg"
  webpSrc="/images/card.webp"
  avifSrc="/images/card.avif"
  alt="Tarot card"
  loading="lazy"
/>
```

### 3. GPU-Accelerated Animations

```typescript
// Only use transform and opacity for animations
import { motion } from 'framer-motion';

<motion.div
  animate={{
    opacity: 1,        // ✅ GPU-accelerated
    x: 100,            // ✅ Uses transform
  }}
  // ❌ DON'T use: width, height, top, left (causes layout recalc)
/>
```

### 4. Device Detection

```typescript
import { deviceCapabilities } from '@/utils/performance';

// Reduce effects on low-end devices
const particleDensity = deviceCapabilities.isLowEnd ? 5 : 20;

// Respect reduced motion preference
if (deviceCapabilities.prefersReducedMotion) {
  // Use instant transitions
}
```

### 5. Adaptive Quality

```typescript
import { qualityManager } from '@/utils/animationOptimizer';

// Automatically reduces quality if FPS drops below 30
const settings = qualityManager.getQualitySettings();
// Returns: { particleDensity, animationSpeed, enableBlur, enableShadows }
```

## Vite Configuration

### Compression

Production builds include both Gzip and Brotli compression:

```bash
npm run build
# Generates:
# - index.js (original)
# - index.js.gz (gzip)
# - index.js.br (brotli - 20% smaller than gzip)
```

### Bundle Analysis

```bash
npm run build
# Opens dist/stats.html with interactive bundle visualization
```

### Minification

- **JavaScript**: Terser with console.log removal
- **CSS**: cssnano with aggressive optimization
- **HTML**: html-minifier-terser

## Performance Monitoring

### Development

Automatic performance logging in dev mode:

```typescript
// Automatically logs after page load
// 🚀 Performance Metrics
// ├── FCP: 450ms
// ├── LCP: 1200ms
// ├── FID: 45ms
// └── CLS: 0.02
```

### Production

```typescript
import { performanceMonitor } from '@/utils/performance';

// Check if targets are met
const check = performanceMonitor.checkTargets();
if (!check.passed) {
  console.warn('Performance targets not met:', check.failures);
}
```

## Animation Best Practices

### ✅ DO

```typescript
// Use transform and opacity only
animate={{ x: 100, opacity: 1 }}

// Apply will-change before animation
element.style.willChange = 'transform, opacity';

// Remove will-change after animation
setTimeout(() => {
  element.style.willChange = 'auto';
}, duration);

// Use requestAnimationFrame for particle systems
requestAnimationFrame(updateParticles);

// Throttle to 30fps on mobile
const interval = deviceCapabilities.isMobile ? 33 : 16;
```

### ❌ DON'T

```typescript
// DON'T animate layout properties
animate={{ width: 100, height: 100 }} // ❌ Causes reflow

// DON'T use too many particles on mobile
const density = 100; // ❌ Use deviceCapabilities.isMobile check

// DON'T use blur/shadows on low-end devices
filter: 'blur(10px)' // ❌ Very expensive

// DON'T forget will-change cleanup
element.style.willChange = 'transform'; // ❌ Memory leak
```

## Three.js Optimization

### Geometry & Materials

```typescript
// Reuse geometries and materials
const geometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.MeshStandardMaterial({ /* ... */ });

// Dispose when unmounting
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
  };
}, []);
```

### Render Loop

```typescript
// Don't render when not visible
useFrame((state, delta) => {
  if (document.hidden) return;

  // Throttle on mobile
  if (deviceCapabilities.isMobile) {
    if (frameCount % 2 !== 0) return; // 30fps on mobile
  }

  // Your render code
});
```

## Asset Optimization

### Images

1. **Format**: AVIF (smallest) → WebP → JPG/PNG
2. **Size**: Serve responsive sizes with `srcset`
3. **Compression**: 80% quality for JPG/WebP, lossy AVIF
4. **Lazy loading**: All images below fold
5. **Preload**: Critical hero images only

```html
<link rel="preload" as="image" href="/hero.avif" />
```

### Fonts

1. **Subset**: Only include characters you use
2. **Display**: `font-display: swap`
3. **Preload**: Critical fonts only
4. **Format**: WOFF2 (best compression)

```html
<link rel="preload" as="font" type="font/woff2" href="/fonts/main.woff2" crossorigin />
```

## Network Optimization

### Preconnect

```typescript
import { preconnectOrigin } from '@/utils/performance';

// Connect to CDN early
preconnectOrigin('https://cdn.example.com', true);
```

### Prefetch

```typescript
import { prefetchResource } from '@/utils/performance';

// Prefetch next page on hover
<Link
  to="/explore"
  onMouseEnter={() => prefetchResource('/explore')}
>
  Explore
</Link>
```

## Memory Management

### Monitor Memory

```typescript
import { getMemoryInfo, isLowMemory } from '@/utils/performance';

if (isLowMemory()) {
  // Reduce particle count
  // Disable non-critical effects
  // Clear caches
}
```

### Cleanup

```typescript
useEffect(() => {
  const animation = new AnimationLoop(update);
  animation.start();

  return () => {
    animation.stop(); // ✅ Always cleanup
  };
}, []);
```

## Testing Performance

### Lighthouse

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view

# Target scores:
# Performance: >90
# Accessibility: >95
# Best Practices: >95
# SEO: >90
```

### WebPageTest

```bash
# Test on real devices and networks
# https://www.webpagetest.org/

# Target metrics:
# Speed Index: <3s
# LCP: <2.5s
# TBT: <300ms
```

### Chrome DevTools

```bash
# 1. Open DevTools (F12)
# 2. Performance tab
# 3. Record while interacting
# 4. Look for:
#    - Long tasks (>50ms)
#    - Layout shifts
#    - Memory leaks
```

## Debugging Performance Issues

### Slow Initial Load

1. Check bundle sizes: `npm run build` → view dist/stats.html
2. Remove unnecessary dependencies
3. Ensure code splitting is working
4. Check if Three.js is lazy loaded

### Low FPS

1. Open Performance Monitor in DevTools
2. Look for:
   - Layout recalculations (use transform instead)
   - Too many particles (check deviceCapabilities)
   - Memory leaks (check cleanup)
3. Use adaptive quality manager

### High Memory Usage

1. Open Memory profiler in DevTools
2. Take heap snapshots before/after navigation
3. Look for:
   - Detached DOM nodes
   - Event listeners not removed
   - Three.js objects not disposed

## Continuous Monitoring

### Budget.json

```json
{
  "budgets": [{
    "resourceSizes": [{
      "resourceType": "script",
      "budget": 250
    }, {
      "resourceType": "stylesheet",
      "budget": 50
    }]
  }]
}
```

### CI/CD Integration

```yaml
# .github/workflows/performance.yml
- name: Performance Audit
  run: |
    npm run build
    lighthouse --chrome-flags="--headless" http://localhost:3000 \
      --output json \
      --output-path ./lighthouse-results.json
    # Fail if performance < 90
```

## Resources

- [Web Vitals](https://web.dev/vitals/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Vite Build Optimizations](https://vitejs.dev/guide/build.html)
- [Three.js Performance Tips](https://discoverthreejs.com/tips-and-tricks/)
- [Framer Motion Performance](https://www.framer.com/motion/animation/#performance)

## Support

For performance issues or questions:
1. Check this guide first
2. Review bundle analysis (dist/stats.html)
3. Run Lighthouse audit
4. Profile with Chrome DevTools
5. Contact the Hive Mind team

---

**Remember**: Fast experiences feel magical. Every millisecond counts!
