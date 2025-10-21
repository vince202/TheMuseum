# UX Design Specifications - Museum Digital Experience

## Design System Foundation

### Typography Scale
```css
:root {
  /* Museum-optimized typography */
  --font-display: 'Playfair Display', serif; /* For headings, elegant */
  --font-body: 'Inter', sans-serif; /* For body text, readable */
  --font-mono: 'JetBrains Mono', monospace; /* For metadata */

  /* Type scale (1.250 - Major Third) */
  --text-xs: 0.75rem;   /* 12px - metadata */
  --text-sm: 0.875rem;  /* 14px - captions */
  --text-base: 1rem;    /* 16px - body */
  --text-lg: 1.25rem;   /* 20px - large body */
  --text-xl: 1.5rem;    /* 24px - subheadings */
  --text-2xl: 1.875rem; /* 30px - headings */
  --text-3xl: 2.25rem;  /* 36px - page titles */
  --text-4xl: 3rem;     /* 48px - hero titles */

  /* Line heights for readability */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### Color Palette (WCAG 2.1 AA Compliant)
```css
:root {
  /* Primary colors */
  --museum-primary: #1a365d;     /* Deep blue - 13.59:1 ratio */
  --museum-primary-hover: #2a4a6b; /* Hover state - 9.85:1 ratio */
  --museum-secondary: #744210;    /* Warm brown - 8.21:1 ratio */
  
  /* Neutral colors */
  --neutral-50: #f9fafb;
  --neutral-100: #f3f4f6;
  --neutral-200: #e5e7eb;
  --neutral-300: #d1d5db;
  --neutral-400: #9ca3af;
  --neutral-500: #6b7280;        /* 4.69:1 ratio - minimum for AA */
  --neutral-600: #4b5563;        /* 7.23:1 ratio */
  --neutral-700: #374151;        /* 10.75:1 ratio */
  --neutral-800: #1f2937;        /* 15.36:1 ratio */
  --neutral-900: #111827;        /* 18.70:1 ratio */
  
  /* Semantic colors */
  --success: #065f46;    /* Dark green - 8.91:1 ratio */
  --warning: #92400e;    /* Dark amber - 4.58:1 ratio */
  --error: #991b1b;      /* Dark red - 5.74:1 ratio */
  --info: #1e40af;       /* Blue - 8.59:1 ratio */
  
  /* Surface colors */
  --surface-primary: #ffffff;
  --surface-secondary: #f9fafb;
  --surface-elevated: #ffffff;
  --surface-overlay: rgba(31, 41, 55, 0.8);
}
```

### Spacing System
```css
:root {
  /* 8pt grid system */
  --space-0: 0;
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px - base unit */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */
  --space-24: 6rem;    /* 96px */
}
```

## Interactive Components Specifications

### Card Component
```css
.museum-card {
  /* Base styles */
  background: var(--surface-primary);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-out;
  position: relative;
  overflow: hidden;
  
  /* Aspect ratio preservation */
  aspect-ratio: 4/5;
  
  /* Hover states */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  /* Focus states for accessibility */
  &:focus-within {
    outline: 3px solid var(--museum-primary);
    outline-offset: 2px;
  }
  
  /* Image container */
  &__image {
    width: 100%;
    height: 60%;
    object-fit: cover;
    background: var(--neutral-200);
    
    /* Loading state */
    &.loading::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg, 
        transparent, 
        rgba(255,255,255,0.4), 
        transparent
      );
      animation: shimmer 1.5s infinite;
    }
  }
  
  /* Content area */
  &__content {
    padding: var(--space-4);
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  /* Typography */
  &__title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--neutral-900);
    line-height: var(--leading-tight);
    margin-bottom: var(--space-2);
    
    /* Truncation for long titles */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  &__description {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--neutral-600);
    line-height: var(--leading-normal);
    
    /* Truncation */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  &__metadata {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--neutral-500);
    margin-top: var(--space-2);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

/* Responsive variations */
@media (max-width: 768px) {
  .museum-card {
    aspect-ratio: 3/4;
    
    &__title {
      font-size: var(--text-base);
    }
    
    &__content {
      padding: var(--space-3);
    }
  }
}
```

### Navigation Component
```css
.museum-nav {
  background: var(--surface-primary);
  border-bottom: 1px solid var(--neutral-200);
  position: sticky;
  top: 0;
  z-index: 100;
  
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-4);
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 64px;
  }
  
  &__logo {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--museum-primary);
    text-decoration: none;
    
    &:focus {
      outline: 2px solid var(--museum-primary);
      outline-offset: 2px;
      border-radius: 4px;
    }
  }
  
  &__menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: var(--space-6);
    
    @media (max-width: 768px) {
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      background: var(--surface-primary);
      flex-direction: column;
      padding: var(--space-4);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease-out;
      
      &.open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
    }
  }
  
  &__link {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--neutral-700);
    text-decoration: none;
    padding: var(--space-2) var(--space-3);
    border-radius: 4px;
    transition: all 0.2s ease-out;
    
    &:hover {
      color: var(--museum-primary);
      background: var(--neutral-100);
    }
    
    &:focus {
      outline: 2px solid var(--museum-primary);
      outline-offset: 2px;
    }
    
    &.active {
      color: var(--museum-primary);
      font-weight: 600;
    }
  }
  
  &__search {
    position: relative;
    min-width: 280px;
    
    @media (max-width: 768px) {
      min-width: 200px;
    }
  }
  
  &__search-input {
    width: 100%;
    padding: var(--space-2) var(--space-10) var(--space-2) var(--space-3);
    border: 1px solid var(--neutral-300);
    border-radius: 6px;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    background: var(--surface-primary);
    
    &:focus {
      outline: 2px solid var(--museum-primary);
      border-color: var(--museum-primary);
    }
    
    &::placeholder {
      color: var(--neutral-500);
    }
  }
  
  &__search-icon {
    position: absolute;
    right: var(--space-3);
    top: 50%;
    transform: translateY(-50%);
    color: var(--neutral-500);
    width: 16px;
    height: 16px;
  }
  
  &__mobile-toggle {
    display: none;
    background: none;
    border: none;
    padding: var(--space-2);
    cursor: pointer;
    
    @media (max-width: 768px) {
      display: block;
    }
    
    &:focus {
      outline: 2px solid var(--museum-primary);
      border-radius: 4px;
    }
  }
}
```

### Breadcrumb Component
```css
.breadcrumb {
  padding: var(--space-3) 0;
  
  &__list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
    gap: var(--space-2);
  }
  
  &__item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    
    &:not(:last-child)::after {
      content: '›';
      color: var(--neutral-400);
      font-weight: 600;
    }
  }
  
  &__link {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--museum-primary);
    text-decoration: none;
    padding: var(--space-1) var(--space-2);
    border-radius: 4px;
    transition: all 0.2s ease-out;
    
    &:hover {
      background: var(--neutral-100);
      text-decoration: underline;
    }
    
    &:focus {
      outline: 2px solid var(--museum-primary);
      outline-offset: 1px;
    }
  }
  
  &__current {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--neutral-600);
    font-weight: 600;
  }
}
```

## Interaction Patterns

### Loading States
```css
@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading-skeleton {
  background: var(--neutral-200);
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
  
  &--text {
    height: 1em;
    margin: var(--space-2) 0;
    
    &.short { width: 60%; }
    &.medium { width: 80%; }
    &.long { width: 100%; }
  }
  
  &--image {
    width: 100%;
    aspect-ratio: 4/3;
  }
  
  &--card {
    height: 300px;
    border-radius: 8px;
  }
}
```

### Focus Management
```css
.focus-trap {
  /* Focus ring styles */
  &:focus-visible {
    outline: 3px solid var(--museum-primary);
    outline-offset: 2px;
  }
  
  /* Skip links for keyboard navigation */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--museum-primary);
    color: white;
    padding: var(--space-2) var(--space-4);
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    
    &:focus {
      top: 6px;
    }
  }
}
```

## Animation Guidelines

### Performance-Optimized Animations
```css
/* Use transform and opacity for 60fps animations */
.card-hover {
  transform: translateY(0);
  opacity: 1;
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
  will-change: transform;
  
  &:hover {
    transform: translateY(-4px);
  }
}

/* Respect motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Content Strategy Templates

### Exhibit Card Template
```html
<article class="museum-card" itemscope itemtype="https://schema.org/CreativeWork">
  <div class="museum-card__image-container">
    <img
      class="museum-card__image"
      src="data:image/svg+xml,%3Csvg..." // Placeholder
      data-src="/images/exhibits/{{id}}-medium.webp"
      data-srcset="
        /images/exhibits/{{id}}-small.webp 300w,
        /images/exhibits/{{id}}-medium.webp 600w,
        /images/exhibits/{{id}}-large.webp 1200w
      "
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
      alt="{{altText}}"
      itemprop="image"
      loading="lazy"
    />
  </div>
  
  <div class="museum-card__content">
    <h3 class="museum-card__title" itemprop="name">
      <a href="/exhibits/{{slug}}" itemprop="url">{{title}}</a>
    </h3>
    
    <p class="museum-card__description" itemprop="description">
      {{excerpt}}
    </p>
    
    <div class="museum-card__metadata">
      <span class="museum-card__period" itemprop="temporal">{{period}}</span>
      <span class="museum-card__culture" itemprop="creator">{{culture}}</span>
    </div>
  </div>
</article>
```

### Search Results Template
```html
<section class="search-results" role="region" aria-label="Search results">
  <header class="search-results__header">
    <h2 class="search-results__title">
      {{resultCount}} results for "{{query}}"
    </h2>
    
    <div class="search-results__controls">
      <label for="sort-select" class="sr-only">Sort results</label>
      <select id="sort-select" class="search-results__sort">
        <option value="relevance">Most Relevant</option>
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="title-asc">A-Z</option>
      </select>
      
      <button type="button" class="search-results__view-toggle" aria-pressed="false">
        <span class="sr-only">Switch to list view</span>
        <!-- Grid/List icon -->
      </button>
    </div>
  </header>
  
  <div class="search-results__filters">
    <!-- Filter components -->
  </div>
  
  <div class="search-results__grid" role="grid">
    <!-- Results cards -->
  </div>
  
  <nav class="search-results__pagination" aria-label="Search results pagination">
    <!-- Pagination component -->
  </nav>
</section>
```

## Performance Optimization Checklist

### Critical Rendering Path
- [ ] Inline critical CSS (<15KB)
- [ ] Preload key fonts (WOFF2 format)
- [ ] Optimize above-the-fold content
- [ ] Minimize render-blocking resources

### Image Optimization
- [ ] WebP/AVIF format with JPEG fallback
- [ ] Responsive images with srcset
- [ ] Lazy loading for below-fold images
- [ ] Proper sizing to prevent CLS

### JavaScript Optimization
- [ ] Code splitting by route
- [ ] Tree shaking for bundle size
- [ ] Service worker for caching
- [ ] Intersection Observer for lazy loading

### Network Optimization
- [ ] HTTP/2 Server Push for critical resources
- [ ] CDN for static assets
- [ ] Gzip/Brotli compression
- [ ] Resource hints (preload, prefetch, preconnect)

This comprehensive UX specification provides the detailed foundation for implementing an accessible, performant, and user-friendly museum digital experience that meets all modern web standards and user expectations.