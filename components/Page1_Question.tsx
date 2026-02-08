
import React, { useState, useRef, CSSProperties } from 'react';
import { Page, PageProps } from '../types';
import { NO_BUTTON_MESSAGES } from '../constants';
import TopLottieAnimation from './TopLottieAnimation';


const Page1_Question: React.FC<PageProps> = ({ onNextPage }) => {
  const [noButtonText, setNoButtonText] = useState('NO!!!');
  const [noButtonStyle, setNoButtonStyle] = useState<CSSProperties>({});
  const [isMoving, setIsMoving] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoClick = () => {
    if (isMoving || !containerRef.current || !noButtonRef.current) return;

    setIsMoving(true);
    setClickCount(prev => prev + 1);

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = noButtonRef.current.getBoundingClientRect();
    const safePadding = 30;

    const maxX = containerRect.width - buttonRect.width - safePadding;
    const maxY = containerRect.height - buttonRect.height - safePadding;
    const newX = Math.max(safePadding, Math.random() * maxX);
    const newY = Math.max(safePadding, Math.random() * maxY);

    const randomMessageIndex = Math.floor(Math.random() * NO_BUTTON_MESSAGES.length);
    setNoButtonText(NO_BUTTON_MESSAGES[randomMessageIndex]);
    
    setNoButtonStyle({
      position: 'absolute',
      top: `${newY}px`,
      left: `${newX}px`,
      transition: 'top 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), left 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      zIndex: 50,
    });

    setTimeout(() => setIsMoving(false), 300);
  };

  const handleYesClick = () => {
    onNextPage(Page.FIREWORKS);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .valentine-background {
          background: linear-gradient(135deg, #FADADD, #F6B1C3, #E88AA3);
        }
        .valentine-content {
          font-family: 'Crimson Text', serif;
          color: #A5122F;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hero-text {
          font-family: 'Playfair Display', serif;
          font-size: 5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .sraya-gradient {
          position: relative;
          background: linear-gradient(180deg, #FF8FB1, #FF5C8A, #D83A6A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .sraya-gradient::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          color: transparent;
          text-shadow: 1px 2px 4px rgba(106, 27, 51, 0.2), 0 0 15px rgba(255, 92, 138, 0.4);
        }
        .hero-heart {
          color: #FF5C8A;
          animation: pulse 2s ease-in-out infinite;
          text-shadow: 1px 1px 4px rgba(199, 67, 106, 0.4);
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .sub-text {
          font-family: 'Crimson Text', serif;
          font-size: 2.25rem;
          font-weight: 400;
          color: #B22234;
        }
        .valentines-btn {
          padding: 1rem 2.25rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: bold;
          border: 2px solid transparent;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
          min-width: 160px;
          text-align: center;
        }
        .yes-btn {
          background: linear-gradient(45deg, #D83A6A, #FF5C8A);
          color: white;
          box-shadow: 0 6px 0px #b32a54, 0 4px 20px rgba(255, 182, 193, 0.7);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
        }
        .yes-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 0px #b32a54, 0 8px 25px rgba(255, 182, 193, 0.8);
        }
        .yes-btn:active {
          transform: translateY(2px) scale(1);
          box-shadow: 0 2px 0px #b32a54, 0 2px 10px rgba(255, 182, 193, 0.7);
          transition-duration: 0.1s;
        }
        .no-btn {
          background: #FFD6E0;
          color: #B22234;
          border-color: #B22234;
          box-shadow: 0 6px 0px #d1a7b4;
          border-top: 1px solid rgba(255, 255, 255, 0.7);
        }
        .no-btn:hover {
          animation: shake 0.5s;
          transform: translateY(-3px);
        }
        .no-btn:active {
          animation: none;
          transform: translateY(2px);
          box-shadow: 0 2px 0px #d1a7b4;
          transition-duration: 0.1s;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0) translateY(-3px); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px) translateY(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(5px) translateY(-3px); }
        }
        .quote-text {
          font-family: 'Crimson Text', serif;
          font-style: italic;
          opacity: 0.85;
          font-size: 1.2rem;
        }
        .footer-text {
          color: #A5122F;
          font-family: 'Crimson Text', serif;
          font-size: 0.9rem;
          opacity: 0.7;
        }
        .heart-char { color: #E88AA3; }

        .particle-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 5;
        }
        @keyframes float-particle {
            0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }
        .particle {
          position: absolute;
          animation: float-particle linear infinite;
        }
        .particle.heart {
          font-size: 1.5rem;
          color: #FF82AB;
          text-shadow: 0 0 6px rgba(255, 255, 255, 0.7);
        }
        .particle.sparkle {
          width: 5px;
          height: 5px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 8px white;
        }
        
        .animate-in { opacity: 0; animation-fill-mode: forwards; animation-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1); will-change: transform, opacity; }
        @keyframes pop-up { 0% { transform: scale(0.85); opacity: 0; } 70% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes slide-down { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slide-right { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slide-left { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        
        .anim-hero-text { animation-name: pop-up; animation-duration: 0.6s; animation-delay: 1.2s; }
        .anim-sub-text { animation-name: slide-down; animation-duration: 0.5s; animation-delay: 1.8s; }
        .anim-yes-btn-container { animation-name: slide-right; animation-duration: 0.45s; animation-delay: 2.5s; }
        .anim-no-btn-container { animation-name: slide-left; animation-duration: 0.45s; animation-delay: 2.5s; }
        .anim-btn-text { animation-name: fade-in; animation-duration: 0.25s; animation-delay: 3.1s; }
        .anim-quote-text { animation-name: fade-in; animation-duration: 0.6s; animation-delay: 3.3s; }
        .anim-footer-text { animation-name: fade-in; animation-duration: 0.5s; animation-delay: 4.2s; }
      `}}/>
      <div ref={containerRef} className="relative w-screen min-h-screen p-4 overflow-x-hidden">
        <div className="valentine-background absolute inset-0 z-0"></div>

        <div className="particle-container">
          {Array.from({ length: 40 }).map((_, i) => {
            const style = {
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 10}s`,
            } as React.CSSProperties;
            return Math.random() > 0.5 ?
              <div key={i} className="particle heart" style={style}>♥</div> :
              <div key={i} className="particle sparkle" style={style}></div>
          })}
        </div>

        <div className="valentine-content relative z-20 flex flex-col justify-start items-center min-h-full pt-4 pb-20">
            <TopLottieAnimation />
            {React.createElement(
                'div',
                { style: { marginTop: '-3rem', marginBottom: '-3rem' } },
                React.createElement('dotlottie-wc', {
                    src: "https://lottie.host/c7f693e3-7738-444b-ba52-83c480f5eb7c/aEek3mBVsX.lottie",
                    style: { width: '300px', height: '300px' },
                    autoplay: true,
                    loop: true,
                })
            )}
            <div className="text-center flex flex-col items-center">
                
                <h1 className="hero-text animate-in anim-hero-text">
                    <span className="hero-heart">♥</span>
                    <span className="sraya-gradient" data-text="SRAYA">SRAYA</span>
                    <span className="hero-heart">♥</span>
                </h1>
                <h2 className="sub-text animate-in anim-sub-text mt-4">Will You Be My Valentine?</h2>
                
                <div style={{gap: '1.5rem'}} className="flex flex-row items-center justify-center mt-7">
                    <button
                      onClick={handleYesClick}
                      className="valentines-btn yes-btn animate-in anim-yes-btn-container"
                    >
                      <span className="animate-in anim-btn-text">YES!!!</span>
                    </button>
                    {clickCount === 0 && (
                    <button
                        ref={noButtonRef}
                        onClick={handleNoClick}
                        className="valentines-btn no-btn animate-in anim-no-btn-container"
                    >
                        <span className="animate-in anim-btn-text">{noButtonText}</span>
                    </button>
                    )}
                </div>

                <p style={{marginTop: '3.5rem'}} className="quote-text text-xl animate-in anim-quote-text">"Every moment with you feels like a dream come true..."</p>
            </div>
        </div>

        {clickCount > 0 && (
          <button
            ref={noButtonRef}
            onClick={handleNoClick}
            style={noButtonStyle}
            className={`valentines-btn no-btn absolute ${isMoving ? 'pointer-events-none' : ''}`}
          >
            {noButtonText}
          </button>
        )}

        <footer className="absolute bottom-6 left-0 right-0 z-30 text-center">
            <p className="footer-text animate-in anim-footer-text">© 2026 Made With L<span className="heart-char">♥️</span>VE Especially for You SRAYA...</p>
        </footer>
      </div>
    </>
  );
};

export default Page1_Question;
