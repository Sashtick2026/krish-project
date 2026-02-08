
import React, { useState, useEffect, useRef } from 'react';
import { Page, PageProps } from '../types';
import { useImages } from '../context/ImageContext';
import TopLottieAnimation from './TopLottieAnimation';

const messages = [
  "You are the best part of my life 🌸💖",
  "My world feels complete because of you 🌍❤️",
  "Loving you is the easiest thing I’ve ever done 💞✨",
  "You make my heart feel at home 🏡💓",
  "Every smile of yours means everything to me 😊💕",
  "You are my forever and always ♾️❤️",
  "Life feels more beautiful with you by my side 🌹💗",
  "You are the reason my heart believes in love 💘✨",
  "With you, every moment feels special ⏳💖",
  "I can’t imagine my life without you 🌷❤️"
];

const MessageBox: React.FC<{ message: string; heartsCount: number; }> = ({ message, heartsCount }) => {
  const [currentMessage, setCurrentMessage] = useState(message);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (message !== currentMessage) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentMessage(message);
        setIsFading(false);
      }, 250);
    }
  }, [message, currentMessage]);

  return (
    <div className="message-box-content">
        <div className="message-box">
            <p className={`message-text ${isFading ? 'fading' : ''}`}>{currentMessage}</p>
        </div>
        <div className="hanging-hearts">
            {Array.from({ length: heartsCount }).map((_, i) => (
            <div key={i} className="heart-line-container">
                <div className="heart-line" />
                <div className="swinging-heart" style={{ animationDelay: `${i * 0.25}s` }}>❤️</div>
            </div>
            ))}
        </div>
    </div>
  );
};

const Page5_Bouquet: React.FC<PageProps> = ({ onNextPage }) => {
  const { images } = useImages();
  const [messageIndices, setMessageIndices] = useState([0, 1, 2, 3]);
  const msgBoxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndices(prevIndices => 
        prevIndices.map(index => (index + 4) % messages.length)
      );
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const boxes = msgBoxRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (boxes.length === 0) return;
    
    const MAX_TILT = 6;
    const listeners: (() => void)[] = [];

    boxes.forEach(box => {
      const handleMove = (x: number, y: number) => {
        const { width, height } = box.getBoundingClientRect();
        const tiltX = (y / height - 0.5) * MAX_TILT * -1;
        const tiltY = (x / width - 0.5) * MAX_TILT;
        box.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
        box.style.transition = 'transform 0.1s ease-out';
      };
      const handleMouseMove = (e: MouseEvent) => { const { left, top } = box.getBoundingClientRect(); handleMove(e.clientX - left, e.clientY - top); };
      const handleTouchMove = (e: TouchEvent) => { if (e.touches.length > 0) { const { left, top } = box.getBoundingClientRect(); handleMove(e.touches[0].clientX - left, e.touches[0].clientY - top); } };
      const handleLeave = () => { box.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'; box.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'; };
      box.addEventListener('mousemove', handleMouseMove); box.addEventListener('touchmove', handleTouchMove, { passive: true }); box.addEventListener('mouseleave', handleLeave); box.addEventListener('touchend', handleLeave);
      listeners.push(() => { box.removeEventListener('mousemove', handleMouseMove); box.removeEventListener('touchmove', handleTouchMove); box.removeEventListener('mouseleave', handleLeave); box.removeEventListener('touchend', handleLeave); });
    });

    return () => { listeners.forEach(cleanup => cleanup()); };
  }, [messageIndices]);
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .bouquet-page-container {
          position: relative; width: 100vw; min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;
          padding: 2rem 1rem; overflow-x: hidden;
          background: radial-gradient(ellipse at 50% 50%, #fff0f3 0%, #ffe4e9 40%, #ffcad4 100%);
          font-family: 'Crimson Text', serif; color: #A5122F;
        }
        .particle-container { position: absolute; inset: 0; overflow: hidden; z-index: 0; }
        @keyframes float-particle { 0% { transform: translateY(110vh) rotate(0deg); opacity: 0; } 10% { opacity: 0.7; } 90% { opacity: 0.7; } 100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; } }
        .particle { position: absolute; animation: float-particle linear infinite; }
        .particle.heart { font-size: 1.5rem; color: #FF82AB; text-shadow: 0 0 6px rgba(255, 255, 255, 0.7); }
        .particle.sparkle { width: 5px; height: 5px; background: white; border-radius: 50%; box-shadow: 0 0 8px white; }
        .animate-in { opacity: 0; animation: fade-in-up 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        .lottie-container-bouquet {
          width: 250px; height: auto; margin-top: -2rem; margin-bottom: -5rem; z-index: 2;
        }
        .hero-text-bouquet {
          position: relative; z-index: 2; font-size: 3.5rem; font-weight: 600;
          text-shadow: 0 2px 10px rgba(255, 182, 193, 0.7); max-width: 1100px; text-align: center;
        }
        .bouquet-centerpiece {
          position: relative; z-index: 1; width: 100%; max-width: 1100px;
          height: 70vh; display: flex; justify-content: center; align-items: center;
        }
        .bouquet-image {
          position: relative; z-index: 5; width: auto; height: 100%;
          max-height: 60vh; object-fit: contain;
          filter: drop-shadow(0 15px 25px rgba(100,0,0,0.3));
        }
        .message-box-wrapper { position: absolute; will-change: transform; z-index: 10; }
        .message-box-content { animation: float 6s ease-in-out infinite; }
        .message-box { background-color: rgba(255, 249, 230, 0.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(216, 67, 104, 0.3); border-radius: 1rem; padding: 0.75rem 1.25rem; box-shadow: 0 5px 20px rgba(165, 18, 47, 0.15); min-width: 220px; max-width: 280px; text-align: center; }
        .message-text { font-size: 1rem; color: #A5122F; transition: opacity 0.25s ease-in-out; }
        .message-text.fading { opacity: 0; }
        .hanging-hearts { display: flex; justify-content: space-around; padding: 0 1rem; margin-top: -2px; }
        .heart-line-container { display: flex; flex-direction: column; align-items: center; }
        .heart-line { width: 1px; height: 20px; background: #F08080; }
        .swinging-heart { font-size: 1.25rem; color: #E63946; transform-origin: top center; animation: swing 4s ease-in-out infinite alternate; }
        @keyframes swing { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(20deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        .msg-pos-upper-left { top: 5%; left: 1%; } .msg-pos-lower-right { bottom: 10%; right: 1%; }
        .msg-pos-upper-left .message-box-content { animation-delay: 0s; } .msg-pos-lower-right .message-box-content { animation-delay: -3s; }
        .bouquet-footer-controls { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; margin-top: 1rem; }
        
        .next-button-bouquet {
          padding: 1rem 2rem; font-size: 1rem;
          background: linear-gradient(180deg, #FFFFFF, #FFF0F5); border: 1px solid #FFC0CB; border-bottom-color: #E8AAB5;
          border-radius: 50px; font-weight: bold; cursor: pointer; color: #D84368;
          text-shadow: 0 1px 1px rgba(255,255,255,0.7); box-shadow: 0 6px 0px #d1a7b4, 0 8px 15px rgba(216, 67, 104, 0.2); transition: all 0.15s ease-out;
        }
        .next-button-bouquet:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 0px #d1a7b4, 0 12px 20px rgba(216, 67, 104, 0.25); }
        .next-button-bouquet:active { transform: translateY(3px) scale(1); box-shadow: 0 3px 0px #d1a7b4, 0 6px 10px rgba(216, 67, 104, 0.2); }
        .footer-bouquet { font-size: 0.875rem; color: #A5122F; opacity: 0.7; }
        @media (min-width: 768px) { .bouquet-centerpiece { height: 80vh; margin-top: -5vh; } .msg-pos-upper-left { top: 8%; left: 5%; } .msg-pos-lower-left { bottom: 15%; left: 10%; } .msg-pos-upper-right { top: 8%; right: 5%; } .msg-pos-lower-right { bottom: 15%; right: 10%; } .msg-pos-lower-left .message-box-content { animation-delay: -1.5s; } .msg-pos-upper-right .message-box-content { animation-delay: -4.5s; } }
      `}}/>
      <div className="bouquet-page-container pt-4">
          <TopLottieAnimation />
          {React.createElement(
              'div',
              { style: { marginTop: '-3rem', marginBottom: '-3rem', zIndex: 2 } },
              React.createElement('dotlottie-wc', {
                  src: "https://lottie.host/01a2c5f3-4bbf-4f99-8ac9-0c9747026d8c/fiLRZVSYUn.lottie",
                  style: { width: '300px', height: '300px' },
                  autoplay: true,
                  loop: true,
              })
          )}
          <div className="particle-container">
            {Array.from({ length: 40 }).map((_, i) => {
                const style = { left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 10 + 10}s`, animationDelay: `${Math.random() * 10}s` } as React.CSSProperties;
                return Math.random() > 0.5 ? <div key={i} className="particle heart" style={style}>♥</div> : <div key={i} className="particle sparkle" style={style}></div>
            })}
          </div>

          <h1 className="hero-text-bouquet animate-in" style={{animationDelay: '0.3s'}}>Here is your Rose Bouquet 💐</h1>
          
          <div className="bouquet-centerpiece">
            <img src={images.roseBouquetUrl} alt="A beautiful bouquet of pink and red roses" className="bouquet-image animate-in" style={{ animationDelay: '0.5s' }} />
            <div ref={el => msgBoxRefs.current[0] = el} className="message-box-wrapper msg-pos-upper-left animate-in" style={{ animationDelay: '0.7s' }}>
              <MessageBox message={messages[messageIndices[0]]} heartsCount={5} />
            </div>
            <div ref={el => msgBoxRefs.current[1] = el} className="message-box-wrapper msg-pos-lower-right animate-in" style={{ animationDelay: '0.9s' }}>
              <MessageBox message={messages[messageIndices[1]]} heartsCount={5} />
            </div>
            <div ref={el => msgBoxRefs.current[2] = el} className="message-box-wrapper msg-pos-lower-left hidden md:block animate-in" style={{ animationDelay: '0.8s' }}>
              <MessageBox message={messages[messageIndices[2]]} heartsCount={5} />
            </div>
            <div ref={el => msgBoxRefs.current[3] = el} className="message-box-wrapper msg-pos-upper-right hidden md:block animate-in" style={{ animationDelay: '1.0s' }}>
              <MessageBox message={messages[messageIndices[3]]} heartsCount={5} />
            </div>
          </div>

          <div className="bouquet-footer-controls animate-in" style={{ animationDelay: '1.2s' }}>
              <button onClick={() => onNextPage(Page.LETTER)} className="next-button-bouquet">One More Click</button>
              <footer className="footer-bouquet">© 2026 Made With L♥️VE Especially for You SRAYA...</footer>
          </div>
      </div>
    </>
  );
};

export default Page5_Bouquet;
