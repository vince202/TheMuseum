/**
 * Web Vitals Integration
 *
 * Lightweight integration for measuring Core Web Vitals:
 * - Largest Contentful Paint (LCP)
 * - First Input Delay (FID)
 * - Cumulative Layout Shift (CLS)
 * - First Contentful Paint (FCP)
 * - Time to First Byte (TTFB)
 *
 * @module webVitals
 */

export interface WebVitalsMetric {
  name: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

export type WebVitalsCallback = (metric: WebVitalsMetric) => void;

// ============================================================================
// THRESHOLDS (Google's recommended values)
// ============================================================================

const THRESHOLDS = {
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 },
};

/**
 * Get rating for a metric value
 */
function getRating(
  metricName: keyof typeof THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metricName];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

// ============================================================================
// MEASUREMENT UTILITIES
// ============================================================================

/**
 * Get navigation type
 */
function getNavigationType(): string {
  if (typeof performance === 'undefined') return 'unknown';

  const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navEntry) {
    return navEntry.type;
  }

  return 'unknown';
}

/**
 * Generate unique metric ID
 */
function generateMetricId(): string {
  return `v3-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// ============================================================================
// METRIC OBSERVERS
// ============================================================================

/**
 * Observe First Contentful Paint (FCP)
 */
function observeFCP(callback: WebVitalsCallback): void {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');

      if (fcpEntry) {
        callback({
          name: 'FCP',
          value: fcpEntry.startTime,
          rating: getRating('FCP', fcpEntry.startTime),
          delta: fcpEntry.startTime,
          id: generateMetricId(),
          navigationType: getNavigationType(),
        });
        observer.disconnect();
      }
    });

    observer.observe({ type: 'paint', buffered: true });
  } catch (e) {
    console.warn('FCP observation failed:', e);
  }
}

/**
 * Observe Largest Contentful Paint (LCP)
 */
function observeLCP(callback: WebVitalsCallback): void {
  if (!('PerformanceObserver' in window)) return;

  try {
    let lcpValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      const value = lastEntry.renderTime || lastEntry.loadTime;

      if (value > lcpValue) {
        lcpValue = value;
        callback({
          name: 'LCP',
          value,
          rating: getRating('LCP', value),
          delta: value,
          id: generateMetricId(),
          navigationType: getNavigationType(),
        });
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });

    // Report final LCP when page becomes hidden
    const reportFinalLCP = () => {
      observer.disconnect();
    };

    document.addEventListener('visibilitychange', reportFinalLCP, { once: true });
  } catch (e) {
    console.warn('LCP observation failed:', e);
  }
}

/**
 * Observe First Input Delay (FID)
 */
function observeFID(callback: WebVitalsCallback): void {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const value = entry.processingStart - entry.startTime;
        callback({
          name: 'FID',
          value,
          rating: getRating('FID', value),
          delta: value,
          id: generateMetricId(),
          navigationType: getNavigationType(),
        });
      });
      observer.disconnect();
    });

    observer.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.warn('FID observation failed:', e);
  }
}

/**
 * Observe Cumulative Layout Shift (CLS)
 */
function observeCLS(callback: WebVitalsCallback): void {
  if (!('PerformanceObserver' in window)) return;

  try {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        // Only count layout shifts without recent user input
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          callback({
            name: 'CLS',
            value: clsValue,
            rating: getRating('CLS', clsValue),
            delta: entry.value,
            id: generateMetricId(),
            navigationType: getNavigationType(),
          });
        }
      });
    });

    observer.observe({ type: 'layout-shift', buffered: true });

    // Report final CLS when page becomes hidden
    const reportFinalCLS = () => {
      observer.disconnect();
    };

    document.addEventListener('visibilitychange', reportFinalCLS, { once: true });
  } catch (e) {
    console.warn('CLS observation failed:', e);
  }
}

/**
 * Observe Time to First Byte (TTFB)
 */
function observeTTFB(callback: WebVitalsCallback): void {
  if (!('performance' in window)) return;

  try {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry) {
      const value = navEntry.responseStart - navEntry.requestStart;
      callback({
        name: 'TTFB',
        value,
        rating: getRating('TTFB', value),
        delta: value,
        id: generateMetricId(),
        navigationType: getNavigationType(),
      });
    }
  } catch (e) {
    console.warn('TTFB measurement failed:', e);
  }
}

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Report all Web Vitals metrics
 */
export function reportWebVitals(callback: WebVitalsCallback): void {
  observeFCP(callback);
  observeLCP(callback);
  observeFID(callback);
  observeCLS(callback);
  observeTTFB(callback);
}

/**
 * Report Web Vitals to console (dev mode)
 */
export function logWebVitals(): void {
  const metrics: Partial<Record<WebVitalsMetric['name'], WebVitalsMetric>> = {};

  reportWebVitals((metric) => {
    metrics[metric.name] = metric;

    // Log immediately for debugging
    const icon = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
    console.log(
      `${icon} ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`
    );
  });

  // Log summary after all metrics are collected
  setTimeout(() => {
    console.group('📊 Web Vitals Summary');
    console.table(metrics);
    console.groupEnd();
  }, 5000);
}

/**
 * Report Web Vitals to analytics (Google Analytics, etc.)
 */
export function reportWebVitalsToAnalytics(callback: WebVitalsCallback): void {
  reportWebVitals((metric) => {
    // Send to analytics
    callback(metric);

    // Log in development
    if (import.meta.env.DEV) {
      console.log(`[Analytics] ${metric.name}:`, metric);
    }
  });
}

/**
 * Check if all Web Vitals meet "good" thresholds
 */
export function checkWebVitalsHealth(
  metrics: Partial<Record<WebVitalsMetric['name'], WebVitalsMetric>>
): {
  healthy: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  Object.entries(metrics).forEach(([name, metric]) => {
    if (metric && metric.rating !== 'good') {
      issues.push(
        `${name}: ${metric.value.toFixed(2)}ms (${metric.rating}) - Target: ${
          THRESHOLDS[name as keyof typeof THRESHOLDS].good
        }ms`
      );
    }
  });

  return {
    healthy: issues.length === 0,
    issues,
  };
}

// ============================================================================
// AUTOMATIC LOGGING IN DEVELOPMENT
// ============================================================================

if (import.meta.env.DEV) {
  // Automatically log Web Vitals in development
  logWebVitals();
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  reportWebVitals,
  logWebVitals,
  reportWebVitalsToAnalytics,
  checkWebVitalsHealth,
};
