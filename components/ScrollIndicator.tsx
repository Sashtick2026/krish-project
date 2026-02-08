import React from 'react';

interface ScrollIndicatorProps {
  isVisible: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* FIX: Replaced <style> tag with children with a self-closing <style> tag using dangerouslySetInnerHTML to be compliant with React's typing for JSX elements. */}
      <style dangerouslySetInnerHTML={{ __html: `
        .scroll-indicator-container {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          opacity: 0;
          animation: fade-in-indicator 1s 0.5s forwards;
          color: white;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
          pointer-events: none;
        }

        @keyframes fade-in-indicator {
          to {
            opacity: 0.8;
          }
        }

        .scroll-icon {
          width: 24px;
          height: 24px;
          animation: bounce-indicator 2s infinite;
        }
        
        @keyframes bounce-indicator {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}}/>
      <div className="scroll-indicator-container">
        <span className="text-sm font-sans">Scroll Down</span>
        <svg className="scroll-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </>
  );
};

export default ScrollIndicator;