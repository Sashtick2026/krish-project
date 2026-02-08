
import React, { useMemo } from 'react';

const AnimatedHeartsBackground: React.FC = () => {
    // Increased heart count for a fuller, more distributed effect across the entire screen.
    const hearts = useMemo(() => Array.from({ length: 40 }).map((_, i) => {
        const style = {
            '--animation-duration': `${Math.random() * 15 + 10}s`, // 10s to 25s
            '--animation-delay': `${Math.random() * 20}s`,
            '--scale': `${Math.random() * 0.9 + 0.3}`, // 0.3 to 1.2
            '--initial-left': `${Math.random() * 100}%`,
            '--x-sway': `${(Math.random() - 0.5) * 250}px`,
            '--rotation-end': `${(Math.random() - 0.5) * 16}deg`, // -8deg to 8deg
            '--blur-amount': Math.random() > 0.5 ? `${Math.random() * 4 + 1}px` : '0px',
            '--opacity': `${Math.random() * 0.5 + 0.3}`, // 0.3 to 0.8
        } as React.CSSProperties;
        return <div key={`heart-${i}`} className="heart-shape" style={style} />;
    }), []);

    return (
        <>
            {/* FIX: Replaced <style> tag with children with a self-closing <style> tag using dangerouslySetInnerHTML to be compliant with React's typing for JSX elements. */}
            <style dangerouslySetInnerHTML={{ __html: `
                .hearts-background-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 10;
                    pointer-events: none;
                    overflow: hidden;
                }

                @keyframes float-and-sway {
                    0% {
                        transform: translateY(110vh) translateX(0) rotate(0) scale(var(--scale));
                        opacity: 0;
                    }
                    10% {
                        opacity: var(--opacity);
                    }
                    90% {
                        opacity: var(--opacity);
                    }
                    100% {
                        transform: translateY(-10vh) translateX(var(--x-sway)) rotate(var(--rotation-end)) scale(var(--scale));
                        opacity: 0;
                    }
                }

                .heart-shape {
                    position: absolute;
                    left: var(--initial-left);
                    /* Start below the viewport, transform will move it up */
                    bottom: -10vh; 
                    width: 100px;
                    height: 90px;
                    
                    animation-name: float-and-sway;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    animation-duration: var(--animation-duration);
                    animation-delay: var(--animation-delay);
                    
                    will-change: transform, opacity;
                    
                    filter: drop-shadow(0 4px 8px rgba(199, 67, 106, 0.3)) blur(var(--blur-amount));
                }

                .heart-shape::before,
                .heart-shape::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    width: 52px;
                    height: 80px;
                    border-radius: 50px 50px 0 0;
                    background: radial-gradient(circle at 50% 50%, #FF8FB1, #FF5C8A);
                }

                .heart-shape::before {
                    left: 50px;
                    transform: rotate(-45deg);
                    transform-origin: 0 100%;
                }

                .heart-shape::after {
                    left: 0;
                    transform: rotate(45deg);
                    transform-origin: 100% 100%;
                }
            `}}/>
            <div className="hearts-background-container">
                {hearts}
            </div>
        </>
    );
};

export default AnimatedHeartsBackground;
