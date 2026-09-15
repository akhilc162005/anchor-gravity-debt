"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useAnimationFrame, useMotionValue, useInView } from "framer-motion";

const ABILITIES = [
  {
    id: "gravity-control",
    name: "GRAVITY CONTROL",
    description: "Manipulates gravitational force around the user. Control the pull.",
    image: "/images/character/media_1789375360773.jpg",
  },
  {
    id: "kinetic-anchor",
    name: "KINETIC ANCHOR",
    description: "Locks physical position against external force. Stand unmovable.",
    image: "/images/character/media_1789375381712.jpg",
  },
  {
    id: "vector-shift",
    name: "VECTOR SHIFT",
    description: "Redirects momentum and incoming impact away from the user. Change the direction.",
    image: "/images/character/media_1789375381771.jpg",
  },
  {
    id: "debt-field",
    name: "DEBT FIELD",
    description: "Stores and releases accumulated gravitational energy. All force returns.",
    image: "/images/character/media_1789375381962.jpg",
  },
  {
    id: "mass-shift",
    name: "MASS SHIFT",
    description: "Alters the perceived mass of objects, amplifying or reducing weight. Lighter, heavier, your choice.",
    image: "/images/character/media_1789375382002.jpg",
  },
  {
    id: "singularity",
    name: "SINGULARITY",
    description: "Compresses mass into a controlled point of extreme density. A small point, a bigger tomorrow.",
    image: "/images/powers/singularity.jpg",
  }
];

export default function CircularAbilitiesGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });
  
  // Track raw window scroll pixels
  const { scrollY } = useScroll();
  const prevScrollY = useRef(0);
  
  // Unified rotation value for both autoplay and scroll
  const rotation = useMotionValue(0);

  // Initialize previous scroll
  useEffect(() => {
    prevScrollY.current = scrollY.get();
  }, [scrollY]);

  useAnimationFrame((time, delta) => {
    if (!isInView) return;
    
    // 1. Calculate autoplay contribution
    // Subtle cinematic spin based on elapsed time to support all refresh rates
    const autoPlayDelta = delta * 0.008; // Roughly 0.48 degrees per frame at 60fps

    // 2. Calculate scroll contribution
    const currentScrollY = scrollY.get();
    const scrollDelta = currentScrollY - prevScrollY.current;
    prevScrollY.current = currentScrollY;
    
    // Convert scroll pixels to rotation degrees. 
    // Negative because scrolling down should rotate the cylinder naturally forward.
    const scrollRotationDelta = scrollDelta * -0.12; 
    
    // 3. Update unified rotation
    // This perfectly combines continuous time-based spin with instant, smooth scroll injection.
    rotation.set(rotation.get() + autoPlayDelta + scrollRotationDelta);
  });

  const totalItems = ABILITIES.length;
  const anglePerItem = 360 / totalItems;

  return (
    <section 
      id="abilities"
      ref={containerRef}
      className="relative w-full h-[350vh] bg-[#050505] text-white selection:bg-white selection:text-black"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Editorial Heading (Absolute at Top) */}
        <div className="absolute top-8 md:top-16 left-6 md:left-12 z-50 flex flex-col items-start pointer-events-none">
          <div className="border-l-[2px] border-white/20 pl-4 md:pl-5">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase leading-none text-white/90"
              style={{
                fontFamily: "var(--font-display)",
              }}
            >
              ABILITIES
            </h2>
            <div className="mt-3 flex flex-col gap-1 text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 font-mono uppercase">
              <span>Gravity</span>
              <span>Obeys</span>
              <span>A Higher</span>
              <span>Debt</span>
            </div>
          </div>
        </div>

        {/* 3D Gallery Container */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1600px" }}
        >
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              rotateY: rotation,
              transformStyle: "preserve-3d",
            }}
          >
            {ABILITIES.map((ability, i) => {
              const itemAngle = i * anglePerItem;
              
              // Calculate dynamic opacity purely via useTransform for performance.
              const cardOpacity = useTransform(rotation, (val) => {
                const totalRot = val % 360;
                // Add itemAngle, totalRot, and 360 to ensure positive value, then modulo
                const relativeAngle = (itemAngle + totalRot + 360) % 360;
                const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
                
                // Falloff opacity based on distance from center (0 degrees).
                // Base opacity is 0.3 so side cards remain visible.
                return Math.max(0.3, 1 - (normalizedAngle / 120));
              });

              return (
                <motion.div
                  key={ability.id}
                  className="absolute w-[240px] md:w-[260px] aspect-[2.6/4] bg-[#0c0c0c] border-[0.5px] border-white/10 flex flex-col overflow-hidden shadow-2xl"
                  style={{
                    // Reduced radius ensures the gallery fits well within the viewport
                    transform: `rotateY(${itemAngle}deg) translateZ(clamp(250px, 35vw, 450px))`,
                    opacity: cardOpacity,
                  }}
                >
                  {/* Image Background - Removed grayscale/saturate filters for full color */}
                  <img
                    src={ability.image}
                    alt={ability.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                  
                  {/* Subtle Gradient for Text Legibility (Restricted to bottom) */}
                  <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                  
                  {/* Premium subtle inner border */}
                  <div className="absolute inset-0 border-[1px] border-white/5 mix-blend-overlay pointer-events-none" />

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 flex flex-col z-10 pointer-events-none">
                    <div className="font-mono text-[9px] md:text-[10px] tracking-[0.15em] mb-1 text-white/60">
                      0{i + 1}
                    </div>
                    <h3 
                      className="text-lg md:text-xl lg:text-2xl mb-2 tracking-[0.05em] font-semibold uppercase text-white leading-[1.05]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {ability.name}
                    </h3>
                    <p className="text-[10px] md:text-[11px] leading-snug tracking-wide uppercase font-sans text-white/75 max-w-[90%]">
                      {ability.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
