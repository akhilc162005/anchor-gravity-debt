"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const SCENES = [
  {
    id: "before-weight",
    number: "01",
    title: "BEFORE THE WEIGHT",
    copy: "Before anyone called him ANCHOR, he carried pressure the way most people carry small disappointments — quietly, and without complaint. Deadlines. Debts. A family that leaned on him more than they realized. He had already spent years learning how to hold weight that wasn't gravitational at all. He just didn't know yet that the word \"weight\" would someday mean something literal. That lesson was still one night away.",
    image: "/images/storytelling/story_02.jpg",
  },
  {
    id: "the-impact",
    number: "02",
    title: "THE NIGHT EVERYTHING CHANGED",
    copy: "The overpass gave way before the sirens even started. Steel folded like paper, concrete came apart in slabs, and for a few seconds the street itself seemed to forget which way was down. He remembers pulling someone free of the wreckage more than he remembers deciding to. When the dust settled, the injuries didn't match what should have killed him. Something in that collapse had reached into him and stayed.",
    image: "/images/storytelling/story_04.jpg",
  },
  {
    id: "the-awakening",
    number: "03",
    title: "THE AWAKENING",
    copy: "At first he thought it was adrenaline — objects feeling lighter, a fall that ended too gently. Then a parked car drifted an inch off the asphalt when he panicked, and he understood this wasn't in his head. Gravity itself was listening to him, responding to what he felt more than what he intended. It didn't feel like a gift. It felt like something had been left switched on inside him with no way to turn it off.",
    image: "/images/storytelling/story_06.jpg",
  },
  {
    id: "the-burden",
    number: "04",
    title: "THE DEBT",
    copy: "He learned the cost the hard way: nothing he lifted from the world came for free. Every collapse he slowed, every fall he caught, the removed force didn't vanish — it moved into him, settling into muscle and bone as weight that never fully left. Save more people, carry more debt. Stand up straighter, carry it longer. The city could be saved a hundred times over, and he would be the one paying for every single one.",
    image: "/images/storytelling/story_01.jpg",
  },
  {
    id: "the-anchor",
    number: "05",
    title: "BECOMING ANCHOR",
    copy: "Training wasn't about getting stronger. It was about learning what to do with weight he could no longer set down. He practiced stillness the way other people practice a punch — holding a stance under debt heavy enough to buckle steel, breathing through it instead of fighting it. Somewhere in those months he stopped seeing the debt as a curse and started treating it as a discipline. Real strength, he realized, was often the refusal to move.",
    image: "/images/storytelling/story_03.jpg",
  },
  {
    id: "hold-the-line",
    number: "06",
    title: "HOLD THE LINE",
    copy: "The world will always pull. Bridges will crack, buildings will lean, people will lose their footing when the ground stops cooperating. Anyone can run from that. Someone has to plant their feet, take on the weight, and hold the line until it's over — even when the debt keeps climbing and the ground keeps shifting beneath them. That's not a power. That's a decision, made over and over. I AM ANCHOR.",
    image: "/images/storytelling/story_05.jpg",
    isClimax: true,
  },
];

interface StoryCardProps {
  position: number;
  scene: typeof SCENES[0] & { tempId?: number };
  handleMove: (steps: number) => void;
  cardWidth: number;
  cardHeight: number;
}

const StoryCard: React.FC<StoryCardProps> = ({ 
  position, 
  scene, 
  handleMove, 
  cardWidth,
  cardHeight
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border transition-all duration-500 ease-in-out flex flex-col overflow-hidden",
        isCenter 
          ? "z-10 bg-[#0a0a0a] border-white/10 shadow-[0_8px_0_4px_rgba(255,255,255,0.03)]" 
          : "z-0 bg-[#050505] border-white/5 hover:border-white/10"
      )}
      style={{
        width: cardWidth,
        height: cardHeight,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardWidth / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45 z-20",
          isCenter ? "bg-[#B89B52]" : "bg-white/10"
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      
      {/* Top 55%: Image Area */}
      <div className="relative w-full" style={{ height: '55%' }}>
        <img
          src={scene.image}
          alt={scene.title}
          className={cn(
            "w-full h-full object-cover object-top transition-all duration-1000 ease-out",
            isCenter ? "scale-100 opacity-100 grayscale-0" : "scale-105 opacity-40 grayscale"
          )}
        />
      </div>

      {/* Bottom 45%: Text Area */}
      <div className="flex flex-col justify-start px-8 py-6 h-[45%] relative z-20 bg-[#0a0a0a]">
        <div className="flex justify-between items-center w-full mb-3">
          <span className={cn(
            "text-[10px] md:text-[11px] tracking-[0.2em] font-mono uppercase transition-colors duration-500",
            isCenter ? "text-[#B89B52]" : "text-[#B89B52] opacity-50"
          )}>
            {scene.number} / 06
          </span>
          {scene.isClimax && isCenter && (
            <span className="text-[9px] tracking-[0.3em] font-mono text-[#D6B85A] uppercase animate-pulse">
              I AM ANCHOR
            </span>
          )}
        </div>

        <h3 className={cn(
          "text-[22px] md:text-[28px] font-bold uppercase tracking-[0.03em] leading-[1.1] mb-4 transition-colors duration-500",
          isCenter ? "text-[#D6B85A]" : "text-[#C9A227] opacity-60"
        )} style={{ fontFamily: "var(--font-display)" }}>
          {scene.title}
        </h3>
        
        <p className={cn(
          "text-[14px] md:text-[16px] font-normal leading-[1.6] tracking-normal max-w-[42ch] transition-all duration-500",
          isCenter ? "text-[#E7E3D8] opacity-100 translate-y-0" : "text-[#E7E3D8] opacity-40 translate-y-2"
        )} style={{ fontFamily: "var(--font-body)" }}>
          {scene.copy}
        </p>
      </div>
    </div>
  );
};

export default function OriginStory() {
  const [cardDimensions, setCardDimensions] = useState({ width: 420, height: 560 });
  const [scenesList, setScenesList] = useState(
    SCENES.map((scene) => ({ ...scene, tempId: Math.random() }))
  );
  const isAnimatingRef = useRef(false);

  const handleMove = useCallback((steps: number) => {
    if (steps === 0 || isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 50 : 500;
    
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, duration);

    setScenesList((prev) => {
      const newList = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prev;
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prev;
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }
      return newList;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleMove(-1);
      if (e.key === 'ArrowRight') handleMove(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setCardDimensions({ width: 420, height: 560 });
      else if (width >= 768) setCardDimensions({ width: 390, height: 520 });
      else setCardDimensions({ width: 310, height: 460 });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section id="origin" className="relative w-full bg-[#000000] py-24 md:py-32 overflow-hidden flex flex-col items-center">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
        }}
      />
      
      <div className="relative z-10 w-full max-w-[1440px] flex flex-col md:flex-row justify-between items-center md:items-end px-6 md:px-16 mb-20 gap-8">
        <div className="text-center md:text-left">
          <p className="text-[10px] tracking-[0.4em] font-mono text-[#B89B52] uppercase mb-4 border-l md:border-l-2 md:pl-4 border-[#B89B52]/30">
            Origin Archive
          </p>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-[0.05em] text-white" style={{ fontFamily: "var(--font-display)" }}>
            Gravity Debt
          </h2>
        </div>
        <button 
          onClick={() => {
            window.dispatchEvent(new CustomEvent("open-anchor-chat"));
          }}
          className="hidden md:flex items-center gap-3 px-6 py-3 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C9A227]/50 transition-colors text-xs tracking-widest text-[#f7f5f0] uppercase font-bold shrink-0">
          <MessageSquare className="w-4 h-4" />
          SPEAK TO ANCHOR
        </button>
      </div>

      <div
        className="relative w-full flex items-center justify-center my-10"
        style={{ height: cardDimensions.height + 60 }}
      >
        {scenesList.map((scene, index) => {
          const position = scenesList.length % 2
            ? index - (scenesList.length - 1) / 2
            : index - scenesList.length / 2;
          return (
            <StoryCard
              key={scene.tempId}
              scene={scene}
              handleMove={handleMove}
              position={position}
              cardWidth={cardDimensions.width}
              cardHeight={cardDimensions.height}
            />
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="relative z-20 flex gap-4 mt-12">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center border border-white/10 bg-[#050505] hover:bg-[#0a0a0a] hover:border-[#B89B52]/40 transition-colors text-white/50 hover:text-[#B89B52] rounded-none outline-none focus-visible:ring-1 focus-visible:ring-[#B89B52]"
          aria-label="Previous story"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center border border-white/10 bg-[#050505] hover:bg-[#0a0a0a] hover:border-[#B89B52]/40 transition-colors text-white/50 hover:text-[#B89B52] rounded-none outline-none focus-visible:ring-1 focus-visible:ring-[#B89B52]"
          aria-label="Next story"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <button 
        onClick={() => {
          window.dispatchEvent(new CustomEvent("open-anchor-chat"));
        }}
        className="flex md:hidden mt-12 items-center gap-3 px-6 py-3 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C9A227]/50 transition-colors text-xs tracking-widest text-[#f7f5f0] uppercase font-bold relative z-20">
        <MessageSquare className="w-4 h-4" />
        SPEAK TO ANCHOR
      </button>
    </section>
  );
}
