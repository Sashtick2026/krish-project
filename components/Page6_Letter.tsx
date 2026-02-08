
import React, { useState } from 'react';
import type { PageProps } from '../types';
import { useImages } from '../context/ImageContext';
import TopLottieAnimation from './TopLottieAnimation';

const Page6_Letter: React.FC<PageProps> = ({ onRestart }) => {
  const { images } = useImages();
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .letter-page-container {
          position: relative; width: 100vw; min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;
          overflow-x: hidden; padding: 2rem;
          background: radial-gradient(circle at 70% 30%, #fff0f5, #ffe4e9, #ffcad4);
          font-family: 'Crimson Text', serif;
        }
        .particle-container { position: absolute; inset: 0; overflow: hidden; z-index: 0; }
        @keyframes float-particle { 0% { transform: translateY(110vh) rotate(0deg); opacity: 0; } 10% { opacity: 0.5; } 90% { opacity: 0.5; } 100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; } }
        .particle { position: absolute; animation: float-particle linear infinite; }
        .particle.heart { font-size: 1.2rem; color: #FF82AB; }
        .animate-in { opacity: 0; animation-fill-mode: forwards; }
        @keyframes zoom-in-fade { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes fade-in-slide-down { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .lottie-container-letter-top, .lottie-container-letter {
          width: 250px; height: auto;
          animation: zoom-in-fade 1s ease-out 0.1s forwards; opacity: 0; z-index: 9;
        }
        .lottie-container-letter-top { margin-top: -3rem; margin-bottom: -6rem; animation-delay: 0.1s; }
        .lottie-container-letter { margin-bottom: 1rem; animation-delay: 0.4s; }
        
        .letter-title {
          text-align: center; font-family: 'Playfair Display', serif; font-size: 1.75rem;
          color: #8B004B; text-shadow: 1px 1px 5px rgba(255, 255, 255, 0.5);
          animation: fade-in-slide-down 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.7s forwards;
          z-index: 11; margin-bottom: 2.5rem;
        }
        
        .letter-wrapper {
          position: relative; cursor: pointer; -webkit-tap-highlight-color: transparent;
          max-width: 700px; width: 100%;
          filter: drop-shadow(0 15px 30px rgba(50, 0, 10, 0.25));
          animation: gentle-float 8s ease-in-out infinite, zoom-in-fade 1s ease-out 1s forwards;
          opacity: 0;
        }

        .letter-image {
          display: block; width: 100%; height: auto; transition: filter 1.2s cubic-bezier(0.25, 1, 0.5, 1);
          filter: blur(${isRevealed ? '0px' : '8px'}); transform: scale(1);
        }

        .letter-overlay {
          position: absolute; inset: 0; border-radius: 12px; background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
          transition: opacity 1s ease-out, backdrop-filter 1s ease-out;
          opacity: ${isRevealed ? '0' : '1'}; pointer-events: none; display: flex;
          justify-content: center; align-items: center; text-align: center;
          color: #8B004B; font-family: 'Playfair Display', serif;
        }
        
        .reveal-prompt {
          font-size: 1.5rem; padding: 1rem; border: 1px solid rgba(139, 0, 75, 0.3);
          border-radius: 50px; background: rgba(255, 255, 255, 0.5); text-shadow: 1px 1px 5px rgba(255, 255, 255, 0.5);
        }

        .letter-wrapper.revealed .letter-image { transform: scale(1.02); transition-delay: 0.1s; transition-duration: 1s; }
        .light-sweep { position: absolute; top: 0; left: -150%; width: 100%; height: 100%; background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%); transform: skewX(-25deg); animation: light-sweep-anim 2.5s 1s cubic-bezier(0.4, 0, 0.2, 1); opacity: 0; }
        .letter-wrapper.revealed .light-sweep { opacity: 1; }
        @keyframes light-sweep-anim { 0% { left: -150%; opacity: 0; } 40% { left: 150%; opacity: 0.3; } 100% { left: 150%; opacity: 0; } }
        @keyframes gentle-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        .heart-sticker {
          position: absolute; top: -40px; right: -40px; width: 150px; height: auto;
          transform: rotate(15deg); z-index: 15; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15)); transition: transform 0.8s ease;
        }
        .letter-wrapper.revealed .heart-sticker { transform: rotate(10deg) scale(1.05); }
        
        .letter-footer {
          position: relative; margin-top: 2.5rem; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          gap: 1rem;
          z-index: 20; opacity: 0; animation: fade-in-footer 1s 1.5s forwards;
        }
        @keyframes fade-in-footer { to { opacity: 1; } }
        .footer-text { font-size: 0.875rem; opacity: 0.7; color: #A5122F; text-align: center; }
        
        .letter-button {
          padding: 1rem 2rem; font-size: 1rem;
          background-color: #FFC0CB; color: #C71585; border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 50px; font-weight: bold; cursor: pointer;
          box-shadow: 0 6px 0px #d1a7b4, 0 8px 15px rgba(199, 21, 133, 0.2);
          transition: all 0.15s ease-out; border-bottom-color: #E8AAB5;
        }
        .letter-button:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 0px #d1a7b4, 0 12px 20px rgba(199, 21, 133, 0.25); }
        .letter-button:active { transform: translateY(3px) scale(1); box-shadow: 0 3px 0px #d1a7b4, 0 6px 10px rgba(199, 21, 133, 0.2); }
      `}}/>
      <div className="letter-page-container pt-4">
        <TopLottieAnimation />
        {React.createElement(
          'div',
          { style: { marginTop: '-3rem', marginBottom: '0rem' } },
          React.createElement('dotlottie-wc', {
            src: "https://lottie.host/d8433de2-7736-4b1d-9bd0-e3f8cc4f5391/KaMh7DR1QM.lottie",
            style: { width: '300px', height: '300px' },
            autoplay: true,
            loop: true,
          })
        )}
        <div className="particle-container">
            {Array.from({ length: 20 }).map((_, i) => ( <div key={i} className="particle heart" style={{ left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 15 + 15}s`, animationDelay: `${Math.random() * 15}s` } as React.CSSProperties}>♥</div> ))}
        </div>

        <h1 className="letter-title animate-in">Here are the words from my heart:</h1>
        
        <div className={`letter-wrapper animate-in ${isRevealed ? 'revealed' : ''}`} onClick={handleReveal} role="button" tabIndex={0} aria-label="Reveal the letter">
          <img src={images.letterImageUrl} alt="A heartfelt letter, slightly blurred" className="letter-image" />
          <div className="letter-overlay">
            {!isRevealed && <span className="reveal-prompt">Tap to Reveal</span>}
          </div>
          {isRevealed && <div className="light-sweep" />}
          <img src={images.heartStickerUrl} alt="Heart sticker" className="heart-sticker" />
        </div>

        {isRevealed && (
          <footer className="letter-footer">
            <button onClick={onRestart} className="letter-button">Experience Again...</button>
            <p className="footer-text">© 2026 Made With L♥️VE Especially for You SRAYA...</p>
          </footer>
        )}
      </div>
    </>
  );
};

export default Page6_Letter;
