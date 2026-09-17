"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContainerRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !heroContainerRef.current) return;
    
    // 1. Setup UI Animations
    const links = navLinksRef.current?.querySelectorAll('a');
    if (logoRef.current && links && scrollIndicatorRef.current) {
      gsap.fromTo(
        [logoRef.current, ...Array.from(links), scrollIndicatorRef.current],
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );

      links.forEach(link => {
        const xTo = gsap.quickTo(link, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(link, "y", { duration: 0.4, ease: "power3.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = link.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          xTo(x * 0.4);
          yTo(y * 0.4);
        };

        const handleMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        link.addEventListener('mousemove', handleMouseMove);
        link.addEventListener('mouseleave', handleMouseLeave);
      });
    }

    // 2. Setup Cinematic Engine
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      document.body.style.overflow = "";
      return;
    }

    const TOTAL_FRAMES = 240;
    const ANIMATION_FPS = 30; // 30 FPS playback for an 8-second cinematic intro
    const FRAME_DURATION = 1000 / ANIMATION_FPS;
    
    const getFramePath = (index: number) => `/images/frame/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`;

    let currentRenderedFrame = -1;
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    const frameCache: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    const loadedFrames = new Set<number>();

    function resizeCanvas() {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      ctx!.scale(dpr, dpr);
      currentRenderedFrame = -1; // Force redraw of current frame
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function preloadFrame(index: number) {
      if (index < 0 || index >= TOTAL_FRAMES || frameCache[index] || loadedFrames.has(index)) return;
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        loadedFrames.add(index);
      };
      img.onerror = () => {
        console.warn(`[HeroSequence] Failed to load frame: ${index}`);
      };
      img.src = getFramePath(index);
      if (img.complete) {
        loadedFrames.add(index);
      }
      frameCache[index] = img;
    }

    function managePreloadQueue(targetIndex: number) {
      for (let i = 0; i <= 10; i++) {
        preloadFrame((targetIndex + i) % TOTAL_FRAMES);
      }
    }

    function drawImageCover(img: HTMLImageElement) {
      const imgRatio = img.width / img.height;
      const canvasRatio = canvasWidth / canvasHeight;
      let renderWidth = canvasWidth;
      let renderHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        renderWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - renderWidth) / 2;
      } else {
        renderHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - renderHeight) / 2;
      }
      ctx!.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    }

    let animationFrameId: number;
    let lastTime: number | null = null;
    let accumulatedTime = 0;

    function playCinematic(now: number) {
      if (!lastTime) {
        // Wait until at least the first 5 frames are loaded before starting the timer to avoid initial stutter
        if (loadedFrames.has(0) && loadedFrames.has(1) && loadedFrames.has(2)) {
          lastTime = now;
          // Show title immediately when animation starts
          if (titleContainerRef.current) {
            titleContainerRef.current.classList.add('visible');
          }
        } else {
          // Keep preloading first frames
          managePreloadQueue(0);
          animationFrameId = requestAnimationFrame(playCinematic);
          return;
        }
      }

      const deltaTime = now - lastTime;
      lastTime = now;
      
      // Cap delta time to prevent massive jumps if tab is backgrounded
      if (deltaTime < 100) {
        accumulatedTime += deltaTime;
      }

      // Loop continuously
      let targetFrame = Math.floor(accumulatedTime / FRAME_DURATION) % TOTAL_FRAMES;
      
      if (targetFrame !== currentRenderedFrame) {
        managePreloadQueue(targetFrame);
        // If the calculated frame hasn't loaded yet, we hold on the last rendered frame.
        // It acts as a natural buffer pause.
        const img = frameCache[targetFrame];
        if (img && loadedFrames.has(targetFrame)) {
          drawImageCover(img);
          currentRenderedFrame = targetFrame;
        }
      }

      animationFrameId = requestAnimationFrame(playCinematic);
    }

    // Initial preload burst and start loop
    managePreloadQueue(0);
    animationFrameId = requestAnimationFrame(playCinematic);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main id="hero-container" ref={heroContainerRef} style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
      <canvas id="hero-canvas" ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}></canvas>

      <div id="ui-layer" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none', background: 'radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)' }}>
        <nav className="top-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2.5rem 4rem', pointerEvents: 'auto', background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)' }}>
          <div className="logo" ref={logoRef}>ANCHOR</div>
          <div className="nav-links" ref={navLinksRef}>
            <a href="#abilities">ABILITIES</a>
            <a href="#origin">ORIGIN</a>
          </div>
        </nav>

        <div id="cinematic-title-container" ref={titleContainerRef}>
          <h1 className="animated-title">ANCHOR</h1>
          <p className="animated-dialogue">"The more people I save, the heavier I become."</p>
        </div>

        <div className="scroll-indicator" id="scroll-indicator" ref={scrollIndicatorRef}>
          <span>SCROLL TO EXPLORE</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </div>
    </main>
  );
}
