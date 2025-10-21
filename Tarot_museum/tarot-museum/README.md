# 🔮 Interactive Tarot Museum

> *Explore the mystical world of tarot through an immersive digital experience*

A comprehensive web museum dedicated to the history, symbolism, and cultural significance of tarot cards. Built with modern web technologies and designed for accessibility, education, and engagement.

## ✨ Features

### 🎨 **Immersive Galleries**
- **Major Arcana Hall**: Explore the 22 trump cards with detailed symbolism
- **Minor Arcana Suites**: Discover the four suits and their meanings
- **Historical Decks**: Journey through centuries of tarot evolution
- **Interactive Timeline**: Navigate tarot's rich history

### 🔍 **Interactive Experiences**
- **3D Card Viewer**: Examine cards in stunning detail with 360° rotation
- **Symbolism Explorer**: Deep dive into esoteric meanings and connections
- **Virtual Readings**: Educational spread demonstrations
- **Search & Filter**: Find specific cards, symbols, or historical periods

### 🌐 **Accessibility & Performance**
- **WCAG 2.1 AA Compliant**: Screen reader compatible with proper ARIA labels
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Performance Optimized**: <3s load times with image optimization

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Styling**: CSS Modules + CSS Grid
- **Build Tool**: Vite
- **Testing**: Jest + Playwright + Testing Library

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run end-to-end tests
npm run test:e2e

# Check accessibility
npm run test:a11y
```

## 📁 Project Structure

```
tarot-museum/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Shared components
│   │   ├── gallery/        # Gallery-specific components
│   │   ├── viewer/         # Card viewer components
│   │   ├── timeline/       # Timeline components
│   │   └── symbolism/      # Symbolism explorer
│   ├── pages/              # Route pages
│   ├── services/           # API and data services
│   ├── utils/              # Helper functions
│   ├── styles/             # Global styles
│   └── assets/             # Images, fonts, data
├── public/                 # Static assets
├── tests/                  # Test files
└── docs/                   # Documentation
```

## 🎯 Development Guidelines

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Airbnb configuration with accessibility rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality assurance

### Testing Strategy
- **Unit Tests**: 85% coverage requirement
- **Integration Tests**: Component interaction validation
- **E2E Tests**: Complete user journey testing
- **Visual Regression**: UI consistency checks
- **Performance Tests**: Core Web Vitals monitoring

### Accessibility Standards
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full functionality without mouse
- **Color Contrast**: WCAG AA compliant ratios
- **Focus Management**: Visible and logical focus flow

## 📚 Museum Collections

### Major Arcana (22 Cards)
The Fool's journey through spiritual awakening and personal growth.

### Minor Arcana (56 Cards)
Four suits representing different aspects of human experience:
- **Wands** (Fire): Creativity, passion, career
- **Cups** (Water): Emotions, relationships, spirituality  
- **Swords** (Air): Thoughts, communication, conflict
- **Pentacles** (Earth): Material world, money, health

### Historical Decks
- **Visconti-Sforza** (15th century): The earliest surviving decks
- **Marseille Tarot** (17th century): Traditional French design
- **Rider-Waite-Smith** (1909): Most influential modern deck
- **Thoth Tarot** (1944): Aleister Crowley's esoteric interpretation

## 🎨 Design Philosophy

### Visual Identity
- **Typography**: Cinzel (headers) + Inter (body) for elegant readability
- **Color Palette**: Deep purples and golds with high contrast
- **Imagery**: High-quality card scans with respectful presentation
- **Layout**: Clean, museum-like aesthetic with spacious galleries

### User Experience
- **Progressive Disclosure**: Information revealed in digestible layers
- **Contextual Navigation**: Breadcrumbs and clear wayfinding
- **Mobile-First**: Touch-friendly interactions and responsive design
- **Loading States**: Smooth transitions and progress indicators

## 🔒 Performance & Security

### Core Web Vitals
- **LCP**: <2.5 seconds (Largest Contentful Paint)
- **FCP**: <1.8 seconds (First Contentful Paint)
- **CLS**: <0.1 (Cumulative Layout Shift)
- **TTFB**: <600ms (Time to First Byte)

### Security Measures
- **Content Security Policy**: XSS protection
- **Input Sanitization**: Safe user input handling
- **HTTPS Everywhere**: Secure data transmission
- **Privacy**: No tracking, no cookies, no data collection

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Ensure all tests pass: `npm test`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tarot Historians**: For preserving centuries of wisdom
- **Digital Artists**: For creating accessible card imagery
- **Accessibility Community**: For guidance on inclusive design
- **Open Source Contributors**: For the amazing tools that make this possible

---

*Built with ❤️ by the Hive Mind Collective*

**Explore • Learn • Discover**