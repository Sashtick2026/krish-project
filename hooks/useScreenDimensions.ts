
import { useState, useEffect } from 'react';

// Simple throttle function to limit how often the resize handler is called
const throttle = (func: () => void, limit: number) => {
  let inThrottle: boolean;
  return function() {
    if (!inThrottle) {
      func();
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * A custom hook to get real-time screen dimensions and aspect ratio.
 * The resize event is throttled to optimize performance.
 */
export const useScreenDimensions = () => {
  const [screenDimensions, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenDimensions({
        width,
        height,
        aspectRatio: width / height || 1, // Avoid division by zero
      });
    };

    // Throttle the resize handler to run at most once every 100ms
    const throttledHandleResize = throttle(handleResize, 100);

    window.addEventListener('resize', throttledHandleResize);
    
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', throttledHandleResize);
    };
  }, []);

  return screenDimensions;
};
