
import React, { useState, useEffect } from 'react';
import { Page, PageProps } from '../types';
import { useImages } from '../context/ImageContext';
import TopLottieAnimation from './TopLottieAnimation';

const Explosion: React.FC = () => (
  <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
    <div className="flash-effect" />
    {Array.from({ length: 60 }).map((_, i) => (
      <div
        key={i}
        className="explosion-particle"
        style={{ '--i': i, '--radius': Math.random() * 150 + 80, '--size': Math.random() * 5 + 3, '--color': ['#FFC0CB', '#FFB6C1', '#FFD1DC', '#FFE4E1', '#FFF0F5'][Math.floor(Math.random() * 5)] } as React.CSSProperties}
      ></div>
    ))}
  </div>
);

const Page4_Gift: React.FC<PageProps> = ({ onNextPage }) => {
  const { images } = useImages();
  const [isOpening, setIsOpening] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGiftClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => setShowExplosion(true), 180);
    setTimeout(() => onNextPage(Page.BOUQUET), 1200);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .gift-page-container {
          position: relative; width: 100vw; min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;
          padding: 2rem; padding-top: 4rem; padding-bottom: 6rem;
          overflow: hidden; background: radial-gradient(ellipse at 60% 35%, #fff5f8 0%, #ffe4e9 50%, #ffcad4 100%);
          font-family: 'Crimson Text', serif; color: #A5122F;
        }
        .gift-page-container::before, .gift-page-container::after { content: ''; position: absolute; z-index: 0; border-radius: 50%; pointer-events: none; filter: blur(60px); }
        .gift-page-container::before { width: clamp(300px, 40vw, 500px); height: clamp(300px, 40vw, 500px); top: -10%; left: -5%; background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 60%); opacity: 0.9; }
        .gift-page-container::after { width: clamp(250px, 30vw, 400px); height: clamp(250px, 30vw, 400px); bottom: -15%; right: -10%; background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%); opacity: 0.8; }
        .particle-container { position: absolute; inset: 0; overflow: hidden; z-index: 1; }
        @keyframes float-particle { 0% { transform: translateY(110vh) rotate(0deg); opacity: 0; } 10% { opacity: 0.7; } 90% { opacity: 0.7; } 100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; } }
        .particle { position: absolute; animation: float-particle linear infinite; }
        .particle.heart { font-size: 1.5rem; color: #FF82AB; text-shadow: 0 0 6px rgba(255, 255, 255, 0.7); }
        .particle.sparkle { width: 5px; height: 5px; background: white; border-radius: 50%; box-shadow: 0 0 8px white; }

        .gift-content {
            max-width: 1100px;
            position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center;
            gap: 1.5rem;
            transition: opacity 0.5s ease-in-out; opacity: ${isPageVisible ? 1 : 0};
        }
        
        @keyframes text-fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .lottie-container-gift {
            width: 250px; height: auto; margin-top: -2rem; margin-bottom: -3rem;
            animation: text-fade-in 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards; opacity: 0;
        }
        
        .hero-text-gift {
          font-family: 'Crimson Text', serif; font-size: 3.5rem; font-weight: 600; text-shadow: 0 2px 15px rgba(255, 182, 193, 0.5);
          animation: text-fade-in 1s cubic-bezier(0.25, 0.8, 0.25, 1) 0.4s forwards; opacity: 0; text-align: center;
        }

        .gift-box-container {
            background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); border-radius: 30px;
            padding: clamp(1.5rem, 5vw, 2.5rem); box-shadow: 0 10px 30px rgba(165, 18, 47, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.8);
            animation: text-fade-in 1s cubic-bezier(0.25, 0.8, 0.25, 1) 0.7s forwards; opacity: 0;
        }

        .gift-box-wrapper { position: relative; cursor: pointer; transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
        .gift-box-wrapper:hover:not(.opening) { transform: scale(1.05); }
        .gift-box-image {
            width: 300px; height: auto; filter: drop-shadow(0 10px 20px rgba(165, 18, 47, 0.2));
            animation: gentle-bob 3s ease-in-out infinite; transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; will-change: transform, opacity;
        }
        
        @keyframes gentle-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes gift-open-sequence { 0% { transform: scale(1) rotate(0); opacity: 1; } 12% { transform: scale(1.06) rotate(-1deg); } 22% { transform: scale(1.03) rotate(1deg); } 25% { transform: scale(1.05) rotate(0); opacity: 1; } 100% { transform: scale(1.6) rotate(5deg); opacity: 0; } }
        .gift-box-wrapper.opening .gift-box-image { animation: gift-open-sequence 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .flash-effect { position: absolute; width: 100px; height: 100px; border-radius: 50%; background: white; animation: flash 0.8s ease-out forwards; }
        @keyframes flash { 0% { transform: scale(0); opacity: 0.8; } 100% { transform: scale(8); opacity: 0; } }
        .explosion-particle { position: absolute; border-radius: 50%; background: var(--color); animation: explode 0.8s cubic-bezier(0.1, 0.7, 0.3, 1) forwards; opacity: 0; width: var(--size, 6px); height: var(--size, 6px); }
        @keyframes explode { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: translateX(calc(cos(var(--i) * (360deg / 60)) * var(--radius, 100) * 1px)) translateY(calc(sin(var(--i) * (360deg / 60)) * var(--radius, 100) * 1px))) scale(0); opacity: 0; } }
        .gift-footer { position: absolute; bottom: 1.5rem; left: 0; right: 0; text-align: center; z-index: 2; font-size: 0.875rem; color: #A5122F; opacity: 0; animation: text-fade-in 1s cubic-bezier(0.25, 0.8, 0.25, 1) 1.2s forwards; }
      `}}/>
      <div className="gift-page-container">
        <div className="particle-container">
            {Array.from({ length: 40 }).map((_, i) => {
                const style = { left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 10 + 10}s`, animationDelay: `${Math.random() * 10}s` } as React.CSSProperties;
                return Math.random() > 0.5 ? <div key={i} className="particle heart" style={style}>♥</div> : <div key={i} className="particle sparkle" style={style}></div>
            })}
        </div>
        
        <div className="gift-content pt-4">
            <TopLottieAnimation />
            {React.createElement(
                'div',
                { style: { marginTop: '-3rem', marginBottom: '-3rem' } },
                React.createElement('dotlottie-wc', {
                    src: "https://lottie.host/d5f30c50-5d97-4799-adc7-afe4221a7369/kztXqyK6fP.lottie",
                    style: { width: '300px', height: '300px' },
                    autoplay: true,
                    loop: true,
                })
            )}
            <h1 className="hero-text-gift">Tap To Open Your Gift 🎁</h1>
            
            <div className="gift-box-container">
              <div className={`gift-box-wrapper ${isOpening ? 'opening' : ''}`} onClick={handleGiftClick} onKeyPress={(e) => e.key === 'Enter' && handleGiftClick()} role="button" tabIndex={0} aria-label="Open Gift">
                <img src={images.giftBoxImageUrl} alt="A cute pink gift box with sparkling eyes" className="gift-box-image" />
                {showExplosion && <Explosion />}
              </div>
            </div>
        </div>
        <footer className="gift-footer">
            © 2026 Made With L♥️VE Especially for You SRAYA...
        </footer>
      </div>
    </>
  );
};

export default Page4_Gift;
