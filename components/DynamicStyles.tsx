
import React, { useEffect } from 'react';
import { useScreen } from '../context/ScreenContext';

// Helper for clamp logic: Math.max(min, Math.min(val, max))
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(val, max));

/**
 * A renderless component that calculates and applies dynamic CSS variables to the :root element.
 * This drives the adaptive layout, typography, and spacing for the entire application.
 */
const DynamicStyles: React.FC = () => {
  const { width, height, aspectRatio } = useScreen();

  useEffect(() => {
    const root = document.documentElement;

    // Mobile Breakpoint Check for adjusting scaling intensity
    const isMobile = width < 768;

    // 1. Base Font Size (clamp(14px, 1.1vw, 18px))
    const baseFontSize = clamp(width * 0.011, 14, 18);
    root.style.setProperty('--base-font-size', `${baseFontSize}px`);

    // 2. Dynamic Max Width for main content containers
    const dynamicMaxWidth = Math.min(width * 0.92, aspectRatio > 1.6 ? 1400 : 1200);
    root.style.setProperty('--dynamic-max-width', `${dynamicMaxWidth}px`);

    // 3. Button Scaling
    const btnPaddingX = clamp(width * 0.016, isMobile ? 14 : 14, 28);
    const btnPaddingY = clamp(width * 0.012, isMobile ? 10 : 10, 20);
    const btnFontSize = clamp(width * 0.01, 13, 16);
    const btnRadius = clamp(width * 0.012, 10, 18);
    root.style.setProperty('--btn-px', `${btnPaddingX}px`);
    root.style.setProperty('--btn-py', `${btnPaddingY}px`);
    root.style.setProperty('--btn-font-size', `${btnFontSize}px`);
    root.style.setProperty('--btn-radius', `${btnRadius}px`);

    // 4. Lottie Animation Scaling
    const lottieSize = clamp(width * 0.22, 180, 420);
    root.style.setProperty('--lottie-size', `${lottieSize}px`);

    // 5. Image Scaling
    const imageMaxWidth = clamp(width * 0.3, 240, 520);
    root.style.setProperty('--image-max-width', `${imageMaxWidth}px`);
    
    // 6. Spacing & Gaps
    const sectionGap = clamp(height * 0.04, 24, 80);
    const elementGap = clamp(height * 0.02, 12, 36);
    root.style.setProperty('--section-gap', `${sectionGap}px`);
    root.style.setProperty('--element-gap', `${elementGap}px`);

    // 7. Typography Scaling (relative to base font size)
    // These are examples, specific components might use their own clamp for more control.
    root.style.setProperty('--font-h1', `calc(var(--base-font-size) * 2.4)`);
    root.style.setProperty('--font-h2', `calc(var(--base-font-size) * 1.9)`);
    root.style.setProperty('--font-body', `var(--base-font-size)`);
    root.style.setProperty('--font-hero', `clamp(2.5rem, calc(var(--base-font-size) * 4.5), 5rem)`);
    root.style.setProperty('--font-sub-hero', `clamp(1.5rem, calc(var(--base-font-size) * 2.2), 2.5rem)`);
    root.style.setProperty('--font-small', `calc(var(--base-font-size) * 0.85)`);

  }, [width, height, aspectRatio]);

  return null; // This component does not render any DOM elements
};

export default DynamicStyles;
