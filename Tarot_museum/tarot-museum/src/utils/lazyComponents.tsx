/**
 * Lazy Loading Component Utilities
 *
 * Provides React components and utilities for lazy loading heavy components
 * with optimized loading states and error boundaries.
 *
 * @module lazyComponents
 */

import React, { lazy, Suspense, ComponentType } from 'react';
import { deviceCapabilities } from './performance';

// ============================================================================
// LOADING STATES
// ============================================================================

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

/**
 * Optimized loading spinner using CSS animations only
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  message,
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin`}
        style={{ willChange: 'transform' }}
      />
      {message && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">{message}</p>
      )}
    </div>
  );
};

/**
 * Skeleton loader for card components
 */
export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse"
        >
          <div className="w-full h-80 bg-gray-300 dark:bg-gray-700" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Generic content skeleton
 */
export const ContentSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6" />
    </div>
  );
};

// ============================================================================
// ERROR BOUNDARIES
// ============================================================================

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: Error, resetError: () => void) => React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Error boundary for lazy-loaded components
 */
export class LazyErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('LazyErrorBoundary caught error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      return (
        <div className="p-8 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
              Failed to Load Component
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 mb-4">
              {this.state.error.message}
            </p>
            <button
              onClick={this.resetError}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================================================
// LAZY LOADING UTILITIES
// ============================================================================

interface LazyLoadOptions {
  fallback?: React.ReactNode;
  errorFallback?: (error: Error, resetError: () => void) => React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  preload?: boolean;
}

/**
 * Create a lazy-loaded component with loading state and error boundary
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
): React.FC<React.ComponentProps<T>> {
  const LazyComponent = lazy(importFunc);

  // Preload the component if requested
  if (options.preload) {
    importFunc();
  }

  return (props: React.ComponentProps<T>) => (
    <LazyErrorBoundary
      fallback={options.errorFallback}
      onError={options.onError}
    >
      <Suspense fallback={options.fallback || <LoadingSpinner />}>
        <LazyComponent {...props} />
      </Suspense>
    </LazyErrorBoundary>
  );
}

/**
 * Conditionally lazy load based on device capabilities
 */
export function conditionalLazyLoad<T extends ComponentType<any>>(
  heavyImport: () => Promise<{ default: T }>,
  lightImport: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
): React.FC<React.ComponentProps<T>> {
  // Use light version on low-end devices
  const importFunc = deviceCapabilities.isLowEnd ? lightImport : heavyImport;
  return lazyLoad(importFunc, options);
}

// ============================================================================
// LAZY IMAGE COMPONENT
// ============================================================================

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  webpSrc?: string;
  avifSrc?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Lazy-loaded image with optimized format selection
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder,
  webpSrc,
  avifSrc,
  onLoad,
  onError,
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Determine optimal image source
  const getOptimalSrc = (): string => {
    if (deviceCapabilities.supportsAVIF && avifSrc) return avifSrc;
    if (deviceCapabilities.supportsWebP && webpSrc) return webpSrc;
    return src;
  };

  React.useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const optimalSrc = getOptimalSrc();

            img.src = optimalSrc;
            img.onload = () => {
              setIsLoaded(true);
              onLoad?.();
            };
            img.onerror = () => {
              setHasError(true);
              onError?.(new Error(`Failed to load image: ${optimalSrc}`));
            };

            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}

      {/* Actual image */}
      <img
        ref={imgRef}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        decoding="async"
        {...props}
      />

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <p className="text-sm text-gray-500">Failed to load image</p>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// PROGRESSIVE ENHANCEMENT
// ============================================================================

interface ProgressiveProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  condition?: boolean;
}

/**
 * Progressive enhancement wrapper
 * Only renders children if condition is met, otherwise shows fallback
 */
export const Progressive: React.FC<ProgressiveProps> = ({
  children,
  fallback = null,
  condition = true,
}) => {
  return <>{condition ? children : fallback}</>;
};

/**
 * Render only on capable devices
 */
export const CapableOnly: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireWebGL?: boolean;
  requireDesktop?: boolean;
}> = ({ children, fallback, requireWebGL, requireDesktop }) => {
  const isCapable =
    (!requireWebGL || deviceCapabilities.supportsWebGL) &&
    (!requireDesktop || deviceCapabilities.isDesktop) &&
    !deviceCapabilities.isLowEnd;

  return <>{isCapable ? children : fallback}</>;
};

// ============================================================================
// PRELOADING
// ============================================================================

/**
 * Preload component on hover or focus
 */
export const PreloadOnInteraction: React.FC<{
  children: React.ReactNode;
  preload: () => void;
}> = ({ children, preload }) => {
  const hasPreloaded = React.useRef(false);

  const handleInteraction = () => {
    if (!hasPreloaded.current) {
      hasPreloaded.current = true;
      preload();
    }
  };

  return (
    <div onMouseEnter={handleInteraction} onFocus={handleInteraction}>
      {children}
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  lazyLoad,
  conditionalLazyLoad,
  LazyImage,
  LoadingSpinner,
  CardSkeleton,
  ContentSkeleton,
  LazyErrorBoundary,
  Progressive,
  CapableOnly,
  PreloadOnInteraction,
};
