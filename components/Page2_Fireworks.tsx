
import React, { useEffect, useRef } from 'react';
import { Page, PageProps } from '../types';

const Page2_Fireworks: React.FC<PageProps> = ({ onNextPage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const navigationTimer = setTimeout(() => {
      onNextPage(Page.CELEBRATION);
    }, 8000); // Increased duration for the show

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: (Particle | GlitterParticle)[] = [];
    const colorPalette = ['#FF5C8A', '#FF82AB', '#FF9EBB', '#FFB6C1', '#FFD1DC'];
    const dpr = window.devicePixelRatio || 1;

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    
    // Base Particle Class
    class BaseParticle {
        x: number; y: number; vx: number; vy: number; life: number; color: string; size: number;
        constructor(x: number, y: number) { this.x = x; this.y = y; this.vx = 0; this.vy = 0; this.life = 0; this.color = ''; this.size = 0; }
        draw() {}
        update() {}
    }

    class Particle extends BaseParticle {
      maxLife: number; friction: number;
      constructor(x: number, y: number) {
        super(x, y);
        this.size = Math.random() * 3.5 + 2;
        this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10 + 3; // More speed
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.maxLife = Math.random() * 80 + 100; // Longer life
        this.life = this.maxLife;
        this.friction = 0.95;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 25;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.life -= 1;
        // After-burst effect: spawn glitter
        if (this.life < this.maxLife * 0.3 && Math.random() < 0.2) {
           particles.push(new GlitterParticle(this.x, this.y));
        }
      }
    }
    
    class GlitterParticle extends BaseParticle {
       constructor(x: number, y: number) {
        super(x,y);
        this.size = Math.random() * 1.5 + 0.5;
        this.color = '#FFFFFF';
        this.life = Math.random() * 30 + 10;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
       }

       draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.life / 30;
        ctx.beginPath();
        ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        ctx.fillStyle = this.color;
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
       }
       
       update() {
         this.x += this.vx;
         this.y += this.vy;
         this.life -= 1;
       }
    }


    const createBurst = (x: number, y: number) => {
      const particleCount = 280; // Much more intense burst
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      particles = particles.filter(p => {
        if (p.life > 0) {
          p.update();
          p.draw();
          return true;
        }
        return false;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const scheduleBursts = () => {
      const burstTimes = [400, 1200, 1500, 2500, 3200, 4000, 5000, 5500, 6200]; // More bursts
      burstTimes.forEach(time => {
        const timeoutId = setTimeout(() => {
          if (!canvas) return;
          const x = (Math.random() * 0.6 + 0.2) * (canvas.width / dpr);
          const y = (Math.random() * 0.5 + 0.2) * (canvas.height / dpr);
          createBurst(x, y);
        }, time);
        timeouts.push(timeoutId);
      });
    };

    scheduleBursts();
    animate();

    return () => {
      clearTimeout(navigationTimer);
      timeouts.forEach(clearTimeout);
      window.removeEventListener('resize', setupCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [onNextPage]);

  return (
    <div className="fireworks-container">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
      <style dangerouslySetInnerHTML={{ __html: `
        .fireworks-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          background-color: #000000;
          overflow: hidden;
        }
      `}}/>
    </div>
  );
};

export default Page2_Fireworks;
