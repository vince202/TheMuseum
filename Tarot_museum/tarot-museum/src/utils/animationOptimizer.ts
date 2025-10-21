/**
 * Animation Performance Optimizer
 *
 * Utilities for optimizing animations to maintain 60fps:
 * - GPU-accelerated properties (transform, opacity)
 * - RequestAnimationFrame management
 * - Reduced motion support
 * - will-change optimization
 * - Particle system optimization
 *
 * @module animationOptimizer
 */

import { deviceCapabilities } from './performance';

// ============================================================================
// GPU-OPTIMIZED ANIMATION HELPERS
// ============================================================================

/**
 * Properties that trigger GPU acceleration
 */
export const GPU_ACCELERATED_PROPERTIES = [
  'transform',
  'opacity',
  'filter',
] as const;

/**
 * Properties that cause layout recalculation (avoid these in animations)
 */
export const LAYOUT_PROPERTIES = [
  'width',
  'height',
  'top',
  'left',
  'right',
  'bottom',
  'margin',
  'padding',
] as const;

/**
 * Apply will-change optimization to an element
 */
export function applyWillChange(
  element: HTMLElement,
  properties: string[]
): void {
  // Only apply to GPU-accelerated properties
  const gpuProps = properties.filter((prop) =>
    GPU_ACCELERATED_PROPERTIES.includes(prop as any)
  );

  if (gpuProps.length > 0) {
    element.style.willChange = gpuProps.join(', ');
  }
}

/**
 * Remove will-change after animation completes
 */
export function removeWillChange(element: HTMLElement): void {
  element.style.willChange = 'auto';
}

/**
 * Auto-manage will-change for an animation
 */
export function optimizeAnimation(
  element: HTMLElement,
  properties: string[],
  duration: number
): void {
  applyWillChange(element, properties);

  // Remove will-change after animation completes
  setTimeout(() => {
    removeWillChange(element);
  }, duration + 100); // Add small buffer
}

// ============================================================================
// FRAMER MOTION VARIANTS (GPU-OPTIMIZED)
// ============================================================================

/**
 * Get reduced motion variants based on user preference
 */
export function getMotionVariants(normalVariants: any, reducedVariants?: any) {
  if (deviceCapabilities.prefersReducedMotion) {
    return reducedVariants || { initial: {}, animate: {}, exit: {} };
  }
  return normalVariants;
}

/**
 * Fade animation (GPU-optimized)
 */
export const fadeVariants = getMotionVariants({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
});

/**
 * Slide animation (GPU-optimized with transform)
 */
export const slideUpVariants = getMotionVariants({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
});

/**
 * Scale animation (GPU-optimized)
 */
export const scaleVariants = getMotionVariants({
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
});

/**
 * Stagger children animation
 */
export const staggerChildrenVariants = getMotionVariants({
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
});

/**
 * 3D card flip (GPU-optimized)
 */
export const cardFlipVariants = getMotionVariants({
  front: {
    rotateY: 0,
    transition: { duration: 0.6 },
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.6 },
  },
});

// ============================================================================
// PARTICLE SYSTEM OPTIMIZATION
// ============================================================================

export interface ParticleConfig {
  density: number;
  maxParticles: number;
  animationSpeed: number;
  useGPU: boolean;
}

/**
 * Get optimized particle configuration based on device
 */
export function getOptimizedParticleConfig(): ParticleConfig {
  if (deviceCapabilities.isLowEnd) {
    return {
      density: 5,
      maxParticles: 20,
      animationSpeed: 0.5,
      useGPU: false,
    };
  }

  if (deviceCapabilities.isMobile) {
    return {
      density: 10,
      maxParticles: 50,
      animationSpeed: 1,
      useGPU: deviceCapabilities.supportsWebGL,
    };
  }

  return {
    density: 20,
    maxParticles: 100,
    animationSpeed: 1,
    useGPU: deviceCapabilities.supportsWebGL,
  };
}

/**
 * Throttle particle updates to maintain framerate
 */
export function getParticleUpdateInterval(): number {
  if (deviceCapabilities.isLowEnd) return 100; // 10 fps
  if (deviceCapabilities.isMobile) return 33; // 30 fps
  return 16; // 60 fps
}

// ============================================================================
// RAF (RequestAnimationFrame) OPTIMIZATION
// ============================================================================

/**
 * Managed RAF loop with automatic cleanup
 */
export class AnimationLoop {
  private rafId: number | null = null;
  private isRunning = false;
  private lastTime = 0;
  private targetFPS: number;

  constructor(
    private callback: (deltaTime: number, elapsedTime: number) => void,
    targetFPS = 60
  ) {
    this.targetFPS = targetFPS;
  }

  start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.lastTime = performance.now();

    const loop = (currentTime: number) => {
      if (!this.isRunning) return;

      const deltaTime = currentTime - this.lastTime;
      const targetInterval = 1000 / this.targetFPS;

      // Throttle to target FPS
      if (deltaTime >= targetInterval) {
        this.lastTime = currentTime - (deltaTime % targetInterval);
        this.callback(deltaTime, currentTime);
      }

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

  setTargetFPS(fps: number): void {
    this.targetFPS = fps;
  }
}

/**
 * Create a throttled RAF callback
 */
export function createThrottledRAF(
  callback: (deltaTime: number) => void,
  fps = 60
): () => void {
  let rafId: number | null = null;
  let lastTime = 0;
  const interval = 1000 / fps;

  return () => {
    if (rafId !== null) return;

    rafId = requestAnimationFrame((currentTime) => {
      rafId = null;
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= interval) {
        lastTime = currentTime - (deltaTime % interval);
        callback(deltaTime);
      }
    });
  };
}

// ============================================================================
// CSS ANIMATION OPTIMIZATION
// ============================================================================

/**
 * Create GPU-accelerated CSS keyframe animation
 */
export function createGPUAnimation(
  name: string,
  keyframes: Record<string, any>
): string {
  const keyframeStrings = Object.entries(keyframes)
    .map(([percent, styles]) => {
      const styleStrings = Object.entries(styles)
        .map(([prop, value]) => `${prop}: ${value};`)
        .join(' ');
      return `${percent} { ${styleStrings} }`;
    })
    .join('\n');

  return `@keyframes ${name} {\n${keyframeStrings}\n}`;
}

/**
 * Apply hardware acceleration to element
 */
export function enableHardwareAcceleration(element: HTMLElement): void {
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
  element.style.perspective = '1000px';
}

// ============================================================================
// SCROLL ANIMATION OPTIMIZATION
// ============================================================================

/**
 * Throttled scroll handler
 */
export function createThrottledScrollHandler(
  callback: (scrollY: number) => void,
  delay = 16
): () => void {
  let rafId: number | null = null;
  let lastScrollY = window.scrollY;

  return () => {
    if (rafId !== null) return;

    rafId = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      if (scrollY !== lastScrollY) {
        callback(scrollY);
        lastScrollY = scrollY;
      }
      rafId = null;
    });
  };
}

/**
 * Intersection Observer for scroll-triggered animations
 */
export function createScrollAnimationObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
}

// ============================================================================
// PERFORMANCE BUDGETS
// ============================================================================

/**
 * Animation performance budget checker
 */
export class AnimationPerformanceBudget {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private readonly targetFPS = 60;
  private readonly minFPS = 30;

  update(): boolean {
    this.frameCount++;
    const currentTime = performance.now();
    const elapsed = currentTime - this.lastTime;

    if (elapsed >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / elapsed);
      this.frameCount = 0;
      this.lastTime = currentTime;
    }

    return this.fps >= this.minFPS;
  }

  getFPS(): number {
    return this.fps;
  }

  isBudgetMet(): boolean {
    return this.fps >= this.targetFPS;
  }

  shouldReduceQuality(): boolean {
    return this.fps < this.minFPS;
  }
}

// ============================================================================
// ADAPTIVE QUALITY SYSTEM
// ============================================================================

export type QualityLevel = 'high' | 'medium' | 'low';

/**
 * Adaptive quality manager for animations
 */
export class AdaptiveQualityManager {
  private performanceBudget = new AnimationPerformanceBudget();
  private currentQuality: QualityLevel = 'high';
  private checkInterval: number | null = null;

  constructor() {
    // Initialize with device-appropriate quality
    if (deviceCapabilities.isLowEnd) {
      this.currentQuality = 'low';
    } else if (deviceCapabilities.isMobile) {
      this.currentQuality = 'medium';
    }
  }

  start(): void {
    this.checkInterval = window.setInterval(() => {
      const isPerformant = this.performanceBudget.update();

      if (!isPerformant && this.currentQuality !== 'low') {
        this.reduceQuality();
      }
    }, 1000);
  }

  stop(): void {
    if (this.checkInterval !== null) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  private reduceQuality(): void {
    if (this.currentQuality === 'high') {
      this.currentQuality = 'medium';
      console.warn('Reducing animation quality to medium');
    } else if (this.currentQuality === 'medium') {
      this.currentQuality = 'low';
      console.warn('Reducing animation quality to low');
    }
  }

  getQuality(): QualityLevel {
    return this.currentQuality;
  }

  getQualitySettings() {
    const settings = {
      high: {
        particleDensity: 20,
        animationSpeed: 1,
        enableBlur: true,
        enableShadows: true,
      },
      medium: {
        particleDensity: 10,
        animationSpeed: 0.8,
        enableBlur: false,
        enableShadows: true,
      },
      low: {
        particleDensity: 5,
        animationSpeed: 0.5,
        enableBlur: false,
        enableShadows: false,
      },
    };

    return settings[this.currentQuality];
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const qualityManager = new AdaptiveQualityManager();

// Start quality monitoring in production
if (import.meta.env.PROD) {
  qualityManager.start();
}

export default {
  applyWillChange,
  removeWillChange,
  optimizeAnimation,
  getMotionVariants,
  getOptimizedParticleConfig,
  AnimationLoop,
  createThrottledRAF,
  createGPUAnimation,
  enableHardwareAcceleration,
  createThrottledScrollHandler,
  createScrollAnimationObserver,
  AnimationPerformanceBudget,
  AdaptiveQualityManager,
  qualityManager,
};
