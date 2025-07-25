'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

// Size breakpoints similar to Windows UI
export type WindowSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface UseWindowSizeOptions {
  // Default breakpoints, can be overridden
  breakpoints?: {
    xs: number; // Extra small
    sm: number; // Small
    md: number; // Medium
    lg: number; // Large
    xl: number; // Extra large
  };
}

export interface WindowSizeContextType {
  width: number;
  height: number;
  size: WindowSize;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
}

// Default breakpoints in pixels
const DEFAULT_BREAKPOINTS = {
  xs: 400, // Extra small windows
  sm: 550, // Small windows
  md: 800, // Medium windows
  lg: 1000, // Large windows
  xl: 1200, // Extra large windows
};

// Create context for window size
const WindowSizeContext = React.createContext<
  WindowSizeContextType | undefined
>(undefined);

// Hook to use window size within components
export const useWindowSize = (): WindowSizeContextType => {
  const context = React.useContext(WindowSizeContext);
  if (!context) {
    throw new Error('useWindowSize must be used within a WindowSizeProvider');
  }
  return context;
};

export interface WindowSizeProviderProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  options?: UseWindowSizeOptions;
}

// Provider component
export const WindowSizeProvider: React.FC<WindowSizeProviderProps> = ({
  children,
  containerRef,
  options = {},
}) => {
  const breakpoints = {
    ...DEFAULT_BREAKPOINTS,
    ...(options.breakpoints || {}),
  };

  // Initialize with default values
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
    size: WindowSize;
  }>({
    width: 0,
    height: 0,
    size: 'md',
  });

  const prevDimensionsRef = useRef({ width: 0, height: 0 });

  const breakpointsRef = useRef(breakpoints);

  const getWindowSize = useCallback(
    (width: number): WindowSize => {
      const { xs, sm, md, lg } = breakpointsRef.current;
      if (width < xs) return 'xs';
      if (width < sm) return 'sm';
      if (width < md) return 'md';
      if (width < lg) return 'lg';
      return 'xl';
    },
    [] 
  );

  // Update dimensions when container size changes
  const updateDimensions = useCallback(() => {
    if (containerRef?.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;

      if (
        prevDimensionsRef.current.width !== offsetWidth ||
        prevDimensionsRef.current.height !== offsetHeight
      ) {
        const size = getWindowSize(offsetWidth);

        prevDimensionsRef.current = {
          width: offsetWidth,
          height: offsetHeight,
        };

        setDimensions({
          width: offsetWidth,
          height: offsetHeight,
          size,
        });
      }
    } else if (typeof window !== 'undefined') {
      const { innerWidth, innerHeight } = window;

      if (
        prevDimensionsRef.current.width !== innerWidth ||
        prevDimensionsRef.current.height !== innerHeight
      ) {
        const size = getWindowSize(innerWidth);

        prevDimensionsRef.current = {
          width: innerWidth,
          height: innerHeight,
        };

        setDimensions({
          width: innerWidth,
          height: innerHeight,
          size,
        });
      }
    }
  }, [containerRef, getWindowSize]); 

  useEffect(() => {
    breakpointsRef.current = {
      ...DEFAULT_BREAKPOINTS,
      ...(options.breakpoints || {}),
    };
  }, [options.breakpoints]);

  useEffect(() => {
    updateDimensions();

    if (containerRef?.current) {
      const observer = new ResizeObserver(() => {
        window.requestAnimationFrame(updateDimensions);
      });

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    } else if (typeof window !== 'undefined') {
      const handleResize = () => {
        window.requestAnimationFrame(updateDimensions);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [containerRef, updateDimensions]);

  const contextValue: WindowSizeContextType = {
    width: dimensions.width,
    height: dimensions.height,
    size: dimensions.size,
    isXs: dimensions.size === 'xs',
    isSm: dimensions.size === 'sm',
    isMd: dimensions.size === 'md',
    isLg: dimensions.size === 'lg',
    isXl: dimensions.size === 'xl',
  };

  return (
    <WindowSizeContext.Provider value={contextValue}>
      {children}
    </WindowSizeContext.Provider>
  );
};

interface WindowSizeRendererProps {
  children: React.ReactNode;
  sizes: WindowSize[];
}

export const WindowSizeRenderer: React.FC<WindowSizeRendererProps> = ({
  children,
  sizes,
}) => {
  const { size } = useWindowSize();
  return <>{sizes.includes(size) ? children : null}</>;
};

export default WindowSizeProvider;
