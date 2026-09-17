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

    // Cached render dimensions
    let cachedRenderWidth = canvasWidth;
    let cachedRenderHeight = canvasHeight;
    let cachedOffsetX = 0;
    let cachedOffsetY = 0;
    let baseImgRatio = 0;

    function recalculateCover(imgRatio: number) {
      const canvasRatio = canvasWidth / canvasHeight;
      if (imgRatio > canvasRatio) {
        cachedRenderWidth = canvasHeight * imgRatio;
        cachedRenderHeight = canvasHeight;
        cachedOffsetX = (canvasWidth - cachedRenderWidth) / 2;
        cachedOffsetY = 0;
      } else {
        cachedRenderHeight = canvasWidth / imgRatio;
        cachedRenderWidth = canvasWidth;
        cachedOffsetX = 0;
        cachedOffsetY = (canvasHeight - cachedRenderHeight) / 2;
      }
    }

    function resizeCanvas() {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      ctx!.scale(dpr, dpr);
      
      if (baseImgRatio) {
        recalculateCover(baseImgRatio);
      }
      currentRenderedFrame = -1; // Force redraw of current frame
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Background Sequential Preloader
    let preloadIndex = 0;
    let isPreloading = false;
    function preloadNextBatch() {
      if (preloadIndex >= TOTAL_FRAMES || isPreloading) return;
      isPreloading = true;
      
      const loadNext = () => {
        if (preloadIndex >= TOTAL_FRAMES) {
          isPreloading = false;
          return;
        }
        
        const i = preloadIndex;
        if (frameCache[i] || loadedFrames.has(i)) {
          preloadIndex++;
          loadNext();
          return;
        }
        
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          loadedFrames.add(i);
          if (!baseImgRatio && img.width > 0 && img.height > 0) {
            baseImgRatio = img.width / img.height;
            recalculateCover(baseImgRatio);
          }
          preloadIndex++;
          loadNext(); // Load next frame immediately after this one finishes
        };
        img.onerror = () => {
          console.warn(`[HeroSequence] Failed to load frame: ${i}`);
          preloadIndex++;
          loadNext(); // Continue anyway
        };
        img.src = getFramePath(i);
        frameCache[i] = img;
      };
      
      loadNext();
    }

    function drawImageCover(img: HTMLImageElement) {
      if (baseImgRatio) {
        ctx!.drawImage(img, cachedOffsetX, cachedOffsetY, cachedRenderWidth, cachedRenderHeight);
      } else {
        // Fallback for first frame if ratio not set yet
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
    }

    let animationFrameId: number;
    let lastTime: number | null = null;
    let accumulatedTime = 0;
    let isVisible = true;

    function playCinematic(now: number) {
      if (!isVisible) return; // Completely pause execution if out of view

      if (!lastTime) {
        // Wait until at least the first 5 frames are loaded before starting the timer to avoid initial stutter
        if (loadedFrames.has(0) && loadedFrames.has(1) && loadedFrames.has(2)) {
          lastTime = now;
          // Show title immediately when animation starts
          if (titleContainerRef.current) {
            titleContainerRef.current.classList.add('visible');
          }
        } else {
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
        const img = frameCache[targetFrame];
        if (img && loadedFrames.has(targetFrame)) {
          drawImageCover(img);
          currentRenderedFrame = targetFrame;
        }
      }

      animationFrameId = requestAnimationFrame(playCinematic);
    }

    // Intersection Observer to pause/resume
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTime = null; // Reset delta time calculation so it resumes smoothly
          animationFrameId = requestAnimationFrame(playCinematic);
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      });
    }, { threshold: 0.0 });
    
    if (heroContainerRef.current) {
      observer.observe(heroContainerRef.current);
    }

    // Start background preload
    preloadNextBatch();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
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
