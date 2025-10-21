# Tarot Museum Test Suite

Comprehensive testing infrastructure for the Interactive Web Tarot Museum.

## Overview

This test suite provides complete quality assurance coverage including:
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: Routing and feature integration
- **E2E Tests**: Complete user flow validation
- **Accessibility Tests**: WCAG 2.1 compliance
- **Performance Tests**: Core Web Vitals and optimization
- **Data Integrity Tests**: Tarot data validation

## Quick Start

### Prerequisites

```bash
# Navigate to project root
cd /Users/vincentlannoo/TheMuseum

# Install dependencies
cd Tarot_museum/tarot-museum
npm install
```

### Running Tests

```bash
# Run all unit and integration tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch

# Run specific test file
npm test Button.test.tsx

# Run E2E tests
npm run test:e2e

# Run accessibility tests
npm run test:a11y
```

## Test Structure

```
/tests
├── __mocks__/              # Mock files
│   └── fileMock.js        # Static asset mocks
├── unit/                  # Unit tests
│   ├── Button.test.tsx
│   ├── Modal.test.tsx
│   └── SearchBar.test.tsx
├── integration/           # Integration tests
│   └── routing.test.tsx
├── e2e/                   # End-to-end tests
│   └── user-flows.spec.ts
├── accessibility/         # Accessibility tests
│   └── a11y.test.ts
├── performance/           # Performance tests
│   └── performance.test.ts
├── data-integrity/        # Data validation tests
│   └── tarot-data.test.ts
├── jest.config.js         # Jest configuration
├── setup.ts              # Test setup and mocks
├── QUALITY_REPORT.md     # Comprehensive QA report
└── README.md             # This file
```

## Test Coverage Goals

| Type | Target | Description |
|------|--------|-------------|
| Statements | 80%+ | Code statement coverage |
| Branches | 75%+ | Conditional branch coverage |
| Functions | 80%+ | Function coverage |
| Lines | 80%+ | Line coverage |

## Unit Tests

### Button Component
- Rendering variants (primary, secondary, ghost, danger)
- Size variations (sm, md, lg)
- States (disabled, loading)
- Accessibility features
- User interactions

### Modal Component
- Open/close behavior
- Size variants
- Escape key handling
- Body scroll management
- ARIA attributes
- Animation testing

### SearchBar Component
- Search input handling
- Filter toggle
- Checkbox and select filters
- Active filter management
- Keyboard accessibility

## Integration Tests

### Routing
- All main routes (/gallery, /timeline, /symbolism)
- Dynamic card routes
- Redirect routes
- 404 handling
- Navigation persistence
- Page transitions

## E2E Tests

### User Flows
- Homepage navigation
- Card browsing and filtering
- Timeline exploration
- Symbolism viewing
- Keyboard-only navigation
- Responsive design (mobile, tablet, desktop)
- Search and filter workflows
- Error handling

## Accessibility Tests

### WCAG 2.1 Compliance
- Level A: All criteria ✅
- Level AA: All criteria ✅
- Level AAA: Partial (optional)

### Test Coverage
- Color contrast (4.5:1 minimum)
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes
- Alt text for images
- Form labels
- Semantic HTML

## Performance Tests

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Additional Metrics
- Page load time: < 3s
- Bundle size: JS < 1MB, CSS < 200KB
- Image optimization
- Caching strategy
- Memory management

## Data Integrity Tests

### Validation Coverage
- Major Arcana (22 cards)
- Minor Arcana (56 cards, 4 suits)
- Tarot decks metadata
- Timeline events
- Cross-references
- Data quality standards

## Configuration

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80
    }
  }
};
```

### Playwright Configuration
```javascript
// playwright.config.ts
export default {
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
};
```

## Best Practices

### Writing Tests
1. **Arrange-Act-Assert**: Structure tests clearly
2. **Test User Behavior**: Focus on what users do
3. **Avoid Implementation Details**: Test behavior, not implementation
4. **Use Semantic Queries**: Prefer getByRole, getByLabelText
5. **Mock External Dependencies**: Isolate unit under test

### Naming Conventions
```javascript
describe('Component/Feature Name', () => {
  it('should [expected behavior] when [condition]', () => {
    // Test code
  });
});
```

### Accessibility Testing
```javascript
// Check for WCAG violations
await injectAxe(page);
const violations = await getViolations(page);
expect(violations.length).toBe(0);
```

### Performance Testing
```javascript
// Measure Core Web Vitals
const lcp = await page.evaluate(() => {
  return new Promise((resolve) => {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      resolve(lastEntry.renderTime || lastEntry.loadTime);
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
});

expect(lcp).toBeLessThan(2500);
```

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run tests
  run: npm test -- --coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
```

## Troubleshooting

### Common Issues

**Tests timing out**
- Increase timeout in jest.config.js
- Check for unresolved promises
- Verify waitFor conditions

**Flaky E2E tests**
- Use waitForSelector instead of fixed delays
- Increase default timeout
- Use stable selectors (data-testid)

**Coverage not meeting threshold**
- Review uncovered code
- Add tests for edge cases
- Check for dead code

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)
- [axe-core](https://github.com/dequelabs/axe-core)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Vitals](https://web.dev/vitals/)

## Contributing

When adding new features:
1. Write tests first (TDD)
2. Ensure all tests pass
3. Maintain coverage thresholds
4. Update documentation
5. Add E2E tests for user flows

## Support

For questions or issues with the test suite:
- Review the Quality Report: `/tests/QUALITY_REPORT.md`
- Check test logs and error messages
- Refer to individual test file comments
- Contact the Hive Mind testing team

---

**Last Updated**: October 15, 2025
**Test Suite Version**: 1.0.0
**Maintained by**: Hive Mind Tester Agent
