
import React from 'react';
import { Page, PageProps } from '../types';
import { useImages } from '../context/ImageContext';
import TopLottieAnimation from './TopLottieAnimation';

const Page3_Celebration: React.FC<PageProps> = ({ onNextPage }) => {
  const { images } = useImages();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .celebration-page {
          background: radial-gradient(circle, #FFC5D0, #E88FA8);
          font-family: 'Playfair Display', serif;
          min-height: 100vh;
        }
        .celebration-page-content {
            max-width: 1100px;
        }
        .celebration-page::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, #ffffffc0 80%);
          mask: radial-gradient(ellipse at center, white 40%, transparent 80%);
          pointer-events: none; z-index: 1;
        }
        .particle-container { position: fixed; inset: 0; overflow: hidden; z-index: 0; }
        @keyframes float-particle { 0% { transform: translateY(110vh) rotate(0deg); opacity: 0; } 10% { opacity: 0.7; } 90% { opacity: 0.7; } 100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; } }
        .particle { position: absolute; animation: float-particle linear infinite; }
        .particle.heart { font-size: 1.5rem; color: #FF82AB; text-shadow: 0 0 6px rgba(255, 255, 255, 0.7); }
        .particle.sparkle { width: 5px; height: 5px; background: white; border-radius: 50%; box-shadow: 0 0 8px white; }
        .animate-in { opacity: 0; animation-fill-mode: forwards; }
        @keyframes pop-in-elastic { 0% { transform: scale(0.5); opacity: 0; } 60% { transform: scale(1.1); } 80% { transform: scale(0.95); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes zoom-in-soft { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes slide-up-fade { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes bobbing { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        .yay-header {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 6.5rem;
          position: relative;
          background: linear-gradient(180deg, #FF8FB1, #FF5C8A, #D83A6A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pop-in-elastic 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.3s;
        }
        .yay-header::after {
          content: attr(data-text);
          position: absolute; left: 0; top: 0; z-index: -1; color: transparent;
          text-shadow: 1px 2px 4px rgba(106, 27, 51, 0.2), 0 0 15px rgba(255, 92, 138, 0.4);
        }
        .header-heart { font-size: 4rem; color: #FF69B4; animation: bobbing 3s ease-in-out infinite; }
        .header-heart.left { animation-delay: 0s; }
        .header-heart.right { animation-delay: 0.5s; }

        .sub-header-text {
          font-size: 2.5rem;
          color: #8B0000;
          animation: pop-in-elastic 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.3s;
        }

        .lottie-container-celebration {
          width: 300px;
          height: auto;
          margin: -1.5rem auto;
          animation: zoom-in-soft 0.7s ease-out forwards;
          animation-delay: 0.5s;
        }
        
        .photo-container {
          background-color: #A00000;
          border-radius: 30px;
          border: 6px solid #FFFFFF;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          width: 90%;
          max-width: 600px;
          animation: zoom-in-soft 0.7s ease-out forwards;
          animation-delay: 0.8s;
          overflow: hidden;
        }

        .reaction-text {
          font-size: 2rem;
          color: #900C3F; animation: slide-up-fade 0.6s ease-out forwards; animation-delay: 1.1s;
        }

        .quote-text {
          font-size: 1.8rem;
          font-style: italic; color: #8B0000;
          animation: slide-up-fade 0.6s ease-out forwards; animation-delay: 1.1s;
        }
        
        .message-pill {
          background-color: rgba(255, 192, 203, 0.9);
          backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
          border-radius: 50px; border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15); color: #C71585;
          font-size: 2rem;
          font-weight: 500;
          padding: 1.5rem 3rem;
          transform: scale(1.1); animation: slide-up-fade 0.6s ease-out forwards; animation-delay: 1.1s;
        }
        @media (max-width: 768px) { .message-pill { transform: scale(1); padding: 1rem 2rem; } }

        .gift-button {
          padding: 1rem 2rem;
          font-size: 1rem;
          background: linear-gradient(180deg, #FFC0CB, #FFB6C1);
          border: 1px solid #FFF; border-top-color: #FFF; border-bottom-color: #E8AAB5; border-radius: 50px;
          color: #C71585; font-weight: bold; text-shadow: 0 1px 1px rgba(255,255,255,0.5);
          box-shadow: 0 8px 0px #d18fa1, 0 12px 25px rgba(199, 21, 133, 0.3);
          transition: all 0.15s ease-out; animation: slide-up-fade 0.6s ease-out forwards; animation-delay: 1.4s;
        }
        .gift-button:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 10px 0px #d18fa1, 0 16px 30px rgba(199, 21, 133, 0.35); }
        .gift-button:active { transform: translateY(4px) scale(1); box-shadow: 0 4px 0px #d18fa1, 0 8px 15px rgba(199, 21, 133, 0.3); }
        
        .footer-text {
          color: #8B0000; font-size: 0.875rem; opacity: 0;
          animation: slide-up-fade 0.6s ease-out forwards; animation-delay: 1.4s;
        }
      `}}/>
      <div className="celebration-page relative w-screen min-h-screen p-4 flex flex-col items-center justify-start overflow-x-hidden py-10 md:py-16">
        <div className="particle-container">
          {Array.from({ length: 40 }).map((_, i) => {
            const style = { left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 10 + 10}s`, animationDelay: `${Math.random() * 10}s` } as React.CSSProperties;
            return Math.random() > 0.5 ? <div key={i} className="particle heart" style={style}>♥</div> : <div key={i} className="particle sparkle" style={style}></div>
          })}
        </div>
        
        <div className="celebration-page-content relative z-10 flex flex-col items-center text-center w-full space-y-6 md:space-y-8">
          <TopLottieAnimation />
          <div className="flex items-center justify-center gap-4">
             <div className="header-heart left animate-in" style={{animationDelay: '0.3s'}}>💖</div>
             <h1 className="yay-header animate-in" data-text="YAY!!!">YAY!!!</h1>
             <div className="header-heart right animate-in" style={{animationDelay: '0.3s'}}>💖</div>
          </div>
          <h2 className="sub-header-text animate-in">I knew you'd say yes!</h2>
          
          {React.createElement(
            'div',
            { className: 'lottie-container-celebration animate-in' },
            React.createElement('dotlottie-wc', {
              src: 'https://lottie.host/93f74a49-6cfd-45ff-8788-23234ebacce9/3wrKVcRoJh.lottie',
              style: { width: '300px', height: '300px' },
              autoplay: true,
              loop: true,
            })
          )}

          <div className="photo-container animate-in">
             <img src={images.coupleImage} alt="Couple taking a selfie" className="w-full h-auto block" />
          </div>

          <p className="reaction-text animate-in">You've made me the happiest! 💖</p>

          <div style={{paddingTop: '3rem'}} className="flex flex-col items-center space-y-6 md:space-y-8">
            <p className="quote-text animate-in max-w-lg">
              "This Valentine's Day is going to be magical with you by my side..."
            </p>
            
            <div className="message-pill animate-in">
              Can't wait to celebrate with you, Sraya! 🌹
            </div>
            
            <button
              onClick={() => onNextPage(Page.GIFT)}
              className="gift-button animate-in"
            >
              Here is Your Gift 🎁
            </button>
          </div>

          <footer className="footer-text animate-in opacity-70 mt-12">
            © 2026 Made With L♥️VE Especially for You SRAYA...
          </footer>
        </div>
      </div>
    </>
  );
};

export default Page3_Celebration;
