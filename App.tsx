
import React, { useState, useEffect, useRef } from 'react';
import { Page } from './types';
import Page1_Question from './components/Page1_Question';
import Page2_Fireworks from './components/Page2_Fireworks';
import Page3_Celebration from './components/Page3_Celebration';
import Page4_Gift from './components/Page4_Gift';
import Page5_Bouquet from './components/Page5_Bouquet';
import Page6_Letter from './components/Page6_Letter';
import AnimatedHeartsBackground from './components/AnimatedHeartsBackground';
import ScrollIndicator from './components/ScrollIndicator';
import { ImageProvider } from './context/ImageContext';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

const pageComponents: { [key in Page]: React.FC<any> } = {
  QUESTION: Page1_Question,
  FIREWORKS: Page2_Fireworks,
  CELEBRATION: Page3_Celebration,
  GIFT: Page4_Gift,
  BOUQUET: Page5_Bouquet,
  LETTER: Page6_Letter,
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.QUESTION);
  const [isFading, setIsFading] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  
  const clickCount = useRef(0);
  const clickTimer = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setIsAdminLoggedIn(true);
      } else {
        setIsAdminLoggedIn(false);
        setShowAdminDashboard(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAdminTrigger = () => {
    clickCount.current += 1;
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }
    clickTimer.current = window.setTimeout(() => {
      clickCount.current = 0;
    }, 500); // Reset after 500ms

    if (clickCount.current === 3) {
      clickCount.current = 0;
      if (isAdminLoggedIn) {
        setShowAdminDashboard(true);
      } else {
        setShowAdminLogin(true);
      }
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(false); 
    };
    const checkScrollability = () => {
      setTimeout(() => {
        const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
        if (isScrollable) {
          setShowScrollIndicator(true);
          window.addEventListener('scroll', handleScroll, { once: true });
        } else {
          setShowScrollIndicator(false);
        }
      }, 100);
    };
    checkScrollability();
    window.scrollTo(0, 0); 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  const navigateTo = (page: Page) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsFading(false);
    }, 500);
  };

  const restartExperience = () => {
    navigateTo(Page.QUESTION);
  };

  const CurrentPageComponent = pageComponents[currentPage];

  return (
    <ImageProvider>
      <div className="w-full min-h-screen overflow-x-hidden font-sans bg-black">
        <div 
          className="absolute top-0 left-0 w-20 h-20 z-50"
          onClick={handleAdminTrigger}
          aria-hidden="true"
        />
        {showAdminLogin && (
          <AdminLogin 
            onLoginSuccess={() => {
              setShowAdminLogin(false);
              setShowAdminDashboard(true);
            }}
            onClose={() => setShowAdminLogin(false)}
          />
        )}
        {showAdminDashboard && <AdminDashboard onClose={() => setShowAdminDashboard(false)} />}

        <AnimatedHeartsBackground />
        <div className={`relative z-20 transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          <CurrentPageComponent 
            onNextPage={(nextPage: Page) => navigateTo(nextPage)} 
            onRestart={restartExperience}
          />
        </div>
        <ScrollIndicator isVisible={showScrollIndicator} />
      </div>
    </ImageProvider>
  );
};

export default App;
