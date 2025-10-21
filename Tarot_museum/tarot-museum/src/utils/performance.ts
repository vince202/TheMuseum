/**
 * Performance Optimization Utilities
 *
 * Provides utilities for:
 * - Device detection (mobile/desktop)
 * - Reduced motion detection
 * - Performance monitoring
 * - Lazy loading wrappers
 * - Image optimization
 * - Animation frame management
 *
 * @module performance
 */

// ============================================================================
// DEVICE DETECTION
// ============================================================================

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowEnd: boolean;
  supportsWebGL: boolean;
  supportsWebP: boolean;
  supportsAVIF: boolean;
  prefersReducedMotion: boolean;
  deviceMemory: number;
  hardwareConcurrency: number;
  connectionType: string;
  effectiveConnectionType: string;
}

/**
 * Detect device capabilities and performance characteristics
 */
export const detectDeviceCapabilities = (): DeviceCapabilities => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /tablet|ipad/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  // Memory and CPU detection
  const nav = navigator as any;
  const deviceMemory = nav.deviceMemory || 4; // Default to 4GB
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;

  // Low-end device detection (less than 2GB RAM or 2 cores)
  const isLowEnd = deviceMemory < 2 || hardwareConcurrency < 2;

  // WebGL support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const supportsWebGL = !!gl;

  // Image format support
  const supportsWebP = checkWebPSupport();
  const supportsAVIF = checkAVIFSupport();

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Network information
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  const connectionType = connection?.type || 'unknown';
  const effectiveConnectionType = connection?.effectiveType || '4g';

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLowEnd,
    supportsWebGL,
    supportsWebP,
    supportsAVIF,
    prefersReducedMotion,
    deviceMemory,
    hardwareConcurrency,
    connectionType,
    effectiveConnectionType,
  };
};

/**
 * Check WebP support
 */
function checkWebPSupport(): boolean {
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
}

/**
 * Check AVIF support
 */
function checkAVIFSupport(): boolean {
  // AVIF detection is async, so we'll return false for now
  // Real implementation would use a small AVIF data URL test
  return false;
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  tti: number; // Time to Interactive
}

/**
 * Monitor Web Vitals and core performance metrics
 */
export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers(): void {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: any) => {
            this.metrics.fid = entry.processingStart - entry.startTime;
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              this.metrics.cls = clsValue;
            }
          });
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }
    }

    // Navigation Timing API for FCP, TTFB
    if ('performance' in window && 'timing' in performance) {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData) {
          this.metrics.ttfb = perfData.responseStart - perfData.requestStart;
          this.metrics.tti = perfData.domInteractive - perfData.fetchStart;
        }

        // First Contentful Paint
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          this.metrics.fcp = fcpEntry.startTime;
        }
      });
    }
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  /**
   * Log metrics to console (dev mode)
   */
  logMetrics(): void {
    console.table(this.metrics);
  }

  /**
   * Check if metrics meet targets
   */
  checkTargets(): { passed: boolean; failures: string[] } {
    const failures: string[] = [];
    const targets = {
      fcp: 1500,
      lcp: 2500,
      fid: 100,
      cls: 0.1,
      ttfb: 800,
      tti: 3000,
    };

    Object.entries(targets).forEach(([metric, target]) => {
      const value = this.metrics[metric as keyof PerformanceMetrics];
      if (value !== undefined && value > target) {
        failures.push(`${metric.toUpperCase()}: ${value.toFixed(2)}ms (target: ${target}ms)`);
      }
    });

    return {
      passed: failures.length === 0,
      failures,
    };
  }

  /**
   * Cleanup observers
   */
  disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// ============================================================================
// LAZY LOADING UTILITIES
// ============================================================================

export interface LazyLoadOptions {
  rootMargin?: string;
  threshold?: number;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Create an Intersection Observer for lazy loading
 */
export const createLazyLoader = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: LazyLoadOptions = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: options.rootMargin || '50px',
    threshold: options.threshold || 0.01,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
};

/**
 * Lazy load an image with optimized formats
 */
export const lazyLoadImage = (
  img: HTMLImageElement,
  src: string,
  options: LazyLoadOptions = {}
): void => {
  const observer = createLazyLoader((entry) => {
    const target = entry.target as HTMLImageElement;

    // Create temporary image to test loading
    const tempImg = new Image();
    tempImg.onload = () => {
      target.src = src;
      target.classList.remove('lazy');
      target.classList.add('lazy-loaded');
      options.onLoad?.();
      observer.unobserve(target);
    };
    tempImg.onerror = () => {
      options.onError?.(new Error(`Failed to load image: ${src}`));
      observer.unobserve(target);
    };
    tempImg.src = src;
  }, options);

  observer.observe(img);
};

/**
 * Get optimized image source based on device capabilities
 */
export const getOptimizedImageSrc = (
  basePath: string,
  capabilities: DeviceCapabilities
): string => {
  const extension = capabilities.supportsAVIF
    ? '.avif'
    : capabilities.supportsWebP
    ? '.webp'
    : '.jpg';

  return `${basePath}${extension}`;
};

// ============================================================================
// ANIMATION PERFORMANCE
// ============================================================================

/**
 * RequestAnimationFrame wrapper with automatic cleanup
 */
export class AnimationFrameScheduler {
  private rafId: number | null = null;
  private isRunning = false;

  constructor(private callback: (deltaTime: number) => void) {}

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      if (!this.isRunning) return;

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      this.callback(deltaTime);
      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  stop(): void {
    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

/**
 * Throttle animation frames for performance
 */
export const throttleAnimationFrame = (
  callback: (...args: any[]) => void,
  fps = 60
): ((...args: any[]) => void) => {
  let lastTime = 0;
  const interval = 1000 / fps;

  return (...args: any[]) => {
    const now = performance.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      callback(...args);
    }
  };
};

/**
 * Add will-change optimization for animations
 */
export const optimizeAnimation = (element: HTMLElement, properties: string[]): void => {
  element.style.willChange = properties.join(', ');

  // Remove will-change after animation completes
  const cleanup = () => {
    element.style.willChange = 'auto';
    element.removeEventListener('animationend', cleanup);
    element.removeEventListener('transitionend', cleanup);
  };

  element.addEventListener('animationend', cleanup);
  element.addEventListener('transitionend', cleanup);
};

// ============================================================================
// RESOURCE PRELOADING
// ============================================================================

export type ResourceType = 'script' | 'style' | 'image' | 'font' | 'fetch';

/**
 * Preload a resource
 */
export const preloadResource = (
  href: string,
  as: ResourceType,
  options: { crossOrigin?: string; type?: string } = {}
): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;

  if (options.crossOrigin) {
    link.crossOrigin = options.crossOrigin;
  }
  if (options.type) {
    link.type = options.type;
  }

  document.head.appendChild(link);
};

/**
 * Prefetch a resource for future navigation
 */
export const prefetchResource = (href: string): void => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};

/**
 * Preconnect to an origin
 */
export const preconnectOrigin = (origin: string, crossOrigin = false): void => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = origin;
  if (crossOrigin) {
    link.crossOrigin = 'anonymous';
  }
  document.head.appendChild(link);
};

// ============================================================================
// MEMORY MANAGEMENT
// ============================================================================

/**
 * Check available memory
 */
export const getMemoryInfo = (): {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
} | null => {
  const memory = (performance as any).memory;
  if (!memory) return null;

  return {
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
    totalJSHeapSize: memory.totalJSHeapSize,
    usedJSHeapSize: memory.usedJSHeapSize,
  };
};

/**
 * Check if app is running low on memory
 */
export const isLowMemory = (): boolean => {
  const memoryInfo = getMemoryInfo();
  if (!memoryInfo) return false;

  const usageRatio = memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit;
  return usageRatio > 0.9; // More than 90% memory used
};

// ============================================================================
// BUNDLE SIZE UTILITIES
// ============================================================================

/**
 * Log bundle sizes (dev mode only)
 */
export const logBundleSize = async (): Promise<void> => {
  if (import.meta.env.PROD) return;

  try {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

    let totalSize = 0;

    const sizes = await Promise.all(
      [...scripts, ...styles].map(async (element) => {
        const url = element.getAttribute('src') || element.getAttribute('href');
        if (!url || url.startsWith('http')) return null;

        try {
          const response = await fetch(url);
          const size = parseInt(response.headers.get('content-length') || '0');
          totalSize += size;
          return { url, size: (size / 1024).toFixed(2) + ' KB' };
        } catch {
          return null;
        }
      })
    );

    console.group('Bundle Sizes');
    console.table(sizes.filter(Boolean));
    console.log(`Total: ${(totalSize / 1024).toFixed(2)} KB`);
    console.log(`Gzipped estimate: ~${(totalSize / 3 / 1024).toFixed(2)} KB`);
    console.groupEnd();
  } catch (error) {
    console.error('Failed to analyze bundle sizes:', error);
  }
};

// ============================================================================
// EXPORT SINGLETON INSTANCES
// ============================================================================

export const deviceCapabilities = detectDeviceCapabilities();
export const performanceMonitor = new PerformanceMonitor();

// Log performance in development
if (import.meta.env.DEV) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      console.group('🚀 Performance Metrics');
      performanceMonitor.logMetrics();
      const check = performanceMonitor.checkTargets();
      if (check.passed) {
        console.log('✅ All performance targets met!');
      } else {
        console.warn('⚠️ Performance targets not met:');
        check.failures.forEach(failure => console.warn(`  - ${failure}`));
      }
      console.groupEnd();

      logBundleSize();
    }, 3000);
  });
}
