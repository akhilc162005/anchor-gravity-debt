(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/HeroSequence.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroSequence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function HeroSequence() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const heroContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const titleContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollIndicatorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const logoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const navLinksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroSequence.useEffect": ()=>{
            if (!canvasRef.current || !heroContainerRef.current) return;
            // 1. Setup UI Animations
            const links = navLinksRef.current?.querySelectorAll('a');
            if (logoRef.current && links && scrollIndicatorRef.current) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo([
                    logoRef.current,
                    ...Array.from(links),
                    scrollIndicatorRef.current
                ], {
                    opacity: 0,
                    y: -20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "power3.out",
                    delay: 0.2
                });
                links.forEach({
                    "HeroSequence.useEffect": (link)=>{
                        const xTo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].quickTo(link, "x", {
                            duration: 0.4,
                            ease: "power3.out"
                        });
                        const yTo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].quickTo(link, "y", {
                            duration: 0.4,
                            ease: "power3.out"
                        });
                        const handleMouseMove = {
                            "HeroSequence.useEffect.handleMouseMove": (e)=>{
                                const rect = link.getBoundingClientRect();
                                const x = e.clientX - rect.left - rect.width / 2;
                                const y = e.clientY - rect.top - rect.height / 2;
                                xTo(x * 0.4);
                                yTo(y * 0.4);
                            }
                        }["HeroSequence.useEffect.handleMouseMove"];
                        const handleMouseLeave = {
                            "HeroSequence.useEffect.handleMouseLeave": ()=>{
                                xTo(0);
                                yTo(0);
                            }
                        }["HeroSequence.useEffect.handleMouseLeave"];
                        link.addEventListener('mousemove', handleMouseMove);
                        link.addEventListener('mouseleave', handleMouseLeave);
                    }
                }["HeroSequence.useEffect"]);
            }
            // 2. Setup Cinematic Engine
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d', {
                alpha: false
            });
            if (!ctx) {
                document.body.style.overflow = "";
                return;
            }
            const TOTAL_FRAMES = 240;
            const ANIMATION_FPS = 30; // 30 FPS playback for an 8-second cinematic intro
            const FRAME_DURATION = 1000 / ANIMATION_FPS;
            const getFramePath = {
                "HeroSequence.useEffect.getFramePath": (index)=>`/images/frame/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`
            }["HeroSequence.useEffect.getFramePath"];
            let currentRenderedFrame = -1;
            let canvasWidth = window.innerWidth;
            let canvasHeight = window.innerHeight;
            const frameCache = new Array(TOTAL_FRAMES).fill(null);
            const loadedFrames = new Set();
            function resizeCanvas() {
                canvasWidth = window.innerWidth;
                canvasHeight = window.innerHeight;
                const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
                canvas.width = canvasWidth * dpr;
                canvas.height = canvasHeight * dpr;
                ctx.scale(dpr, dpr);
                currentRenderedFrame = -1; // Force redraw of current frame
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            function preloadFrame(index) {
                if (index < 0 || index >= TOTAL_FRAMES || frameCache[index] || loadedFrames.has(index)) return;
                const img = new Image();
                img.decoding = 'async';
                img.onload = ({
                    "HeroSequence.useEffect.preloadFrame": ()=>{
                        loadedFrames.add(index);
                    }
                })["HeroSequence.useEffect.preloadFrame"];
                img.onerror = ({
                    "HeroSequence.useEffect.preloadFrame": ()=>{
                        console.warn(`[HeroSequence] Failed to load frame: ${index}`);
                    }
                })["HeroSequence.useEffect.preloadFrame"];
                img.src = getFramePath(index);
                if (img.complete) {
                    loadedFrames.add(index);
                }
                frameCache[index] = img;
            }
            function managePreloadQueue(targetIndex) {
                for(let i = 0; i <= 10; i++){
                    preloadFrame((targetIndex + i) % TOTAL_FRAMES);
                }
            }
            function drawImageCover(img) {
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
                ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
            }
            let animationFrameId;
            let lastTime = null;
            let accumulatedTime = 0;
            function playCinematic(now) {
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
            return ({
                "HeroSequence.useEffect": ()=>{
                    window.removeEventListener('resize', resizeCanvas);
                    cancelAnimationFrame(animationFrameId);
                }
            })["HeroSequence.useEffect"];
        }
    }["HeroSequence.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        id: "hero-container",
        ref: heroContainerRef,
        style: {
            width: '100%',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: '#000'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                id: "hero-canvas",
                ref: canvasRef,
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1
                }
            }, void 0, false, {
                fileName: "[project]/components/HeroSequence.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "ui-layer",
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    pointerEvents: 'none',
                    background: 'radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "top-nav",
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '2.5rem 4rem',
                            pointerEvents: 'auto',
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "logo",
                                ref: logoRef,
                                children: "ANCHOR"
                            }, void 0, false, {
                                fileName: "[project]/components/HeroSequence.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "nav-links",
                                ref: navLinksRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#abilities",
                                        children: "ABILITIES"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HeroSequence.tsx",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#debt",
                                        children: "THE DEBT"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HeroSequence.tsx",
                                        lineNumber: 191,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#origin",
                                        children: "ORIGIN"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HeroSequence.tsx",
                                        lineNumber: 192,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HeroSequence.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HeroSequence.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "cinematic-title-container",
                        ref: titleContainerRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "animated-title",
                                children: "ANCHOR"
                            }, void 0, false, {
                                fileName: "[project]/components/HeroSequence.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "animated-dialogue",
                                children: '"The more people I save, the heavier I become."'
                            }, void 0, false, {
                                fileName: "[project]/components/HeroSequence.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HeroSequence.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scroll-indicator",
                        id: "scroll-indicator",
                        ref: scrollIndicatorRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "SCROLL TO EXPLORE"
                            }, void 0, false, {
                                fileName: "[project]/components/HeroSequence.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "24",
                                height: "24",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M6 9l6 6 6-6"
                                }, void 0, false, {
                                    fileName: "[project]/components/HeroSequence.tsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/HeroSequence.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HeroSequence.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/HeroSequence.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/HeroSequence.tsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}
_s(HeroSequence, "QCt1iP7R/auBEAIPcpIYu150uL4=");
_c = HeroSequence;
var _c;
__turbopack_context__.k.register(_c, "HeroSequence");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/circular-abilities-gallery.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CircularAbilitiesGallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$animation$2d$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-animation-frame.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const ABILITIES = [
    {
        id: "gravity-control",
        name: "GRAVITY CONTROL",
        description: "Manipulates gravitational force around the user. Control the pull.",
        image: "/images/character/media_1789375360773.jpg"
    },
    {
        id: "kinetic-anchor",
        name: "KINETIC ANCHOR",
        description: "Locks physical position against external force. Stand unmovable.",
        image: "/images/character/media_1789375381712.jpg"
    },
    {
        id: "vector-shift",
        name: "VECTOR SHIFT",
        description: "Redirects momentum and incoming impact away from the user. Change the direction.",
        image: "/images/character/media_1789375381771.jpg"
    },
    {
        id: "debt-field",
        name: "DEBT FIELD",
        description: "Stores and releases accumulated gravitational energy. All force returns.",
        image: "/images/character/media_1789375381962.jpg"
    },
    {
        id: "mass-shift",
        name: "MASS SHIFT",
        description: "Alters the perceived mass of objects, amplifying or reducing weight. Lighter, heavier, your choice.",
        image: "/images/character/media_1789375382002.jpg"
    },
    {
        id: "singularity",
        name: "SINGULARITY",
        description: "Compresses mass into a controlled point of extreme density. A small point, a bigger tomorrow.",
        image: "/images/powers/singularity.jpg"
    }
];
function CircularAbilitiesGallery() {
    _s();
    var _s1 = __turbopack_context__.k.signature();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(containerRef, {
        margin: "200px"
    });
    // Track raw window scroll pixels
    const { scrollY } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])();
    const prevScrollY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Unified rotation value for both autoplay and scroll
    const rotation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    // Initialize previous scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CircularAbilitiesGallery.useEffect": ()=>{
            prevScrollY.current = scrollY.get();
        }
    }["CircularAbilitiesGallery.useEffect"], [
        scrollY
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$animation$2d$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationFrame"])({
        "CircularAbilitiesGallery.useAnimationFrame": (time, delta)=>{
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
        }
    }["CircularAbilitiesGallery.useAnimationFrame"]);
    const totalItems = ABILITIES.length;
    const anglePerItem = 360 / totalItems;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "abilities",
        ref: containerRef,
        className: "relative w-full h-[350vh] bg-[#050505] text-white selection:bg-white selection:text-black",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-8 md:top-16 left-6 md:left-12 z-50 flex flex-col items-start pointer-events-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-l-[2px] border-white/20 pl-4 md:pl-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.1em] uppercase leading-none text-white/90",
                                style: {
                                    fontFamily: "var(--font-display)"
                                },
                                children: "ABILITIES"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex flex-col gap-1 text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 font-mono uppercase",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Gravity"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Obeys"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "A Higher"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Debt"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                        lineNumber: 109,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full h-full flex items-center justify-center",
                    style: {
                        perspective: "1600px"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "relative w-full h-full flex items-center justify-center",
                        style: {
                            rotateY: rotation,
                            transformStyle: "preserve-3d"
                        },
                        children: ABILITIES.map(_s1((ability, i)=>{
                            _s1();
                            const itemAngle = i * anglePerItem;
                            // Calculate dynamic opacity purely via useTransform for performance.
                            const cardOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(rotation, {
                                "CircularAbilitiesGallery.useTransform[cardOpacity]": (val)=>{
                                    const totalRot = val % 360;
                                    // Add itemAngle, totalRot, and 360 to ensure positive value, then modulo
                                    const relativeAngle = (itemAngle + totalRot + 360) % 360;
                                    const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
                                    // Falloff opacity based on distance from center (0 degrees).
                                    // Base opacity is 0.3 so side cards remain visible.
                                    return Math.max(0.3, 1 - normalizedAngle / 120);
                                }
                            }["CircularAbilitiesGallery.useTransform[cardOpacity]"]);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute w-[240px] md:w-[260px] aspect-[2.6/4] bg-[#0c0c0c] border-[0.5px] border-white/10 flex flex-col overflow-hidden shadow-2xl",
                                style: {
                                    // Reduced radius ensures the gallery fits well within the viewport
                                    transform: `rotateY(${itemAngle}deg) translateZ(clamp(250px, 35vw, 450px))`,
                                    opacity: cardOpacity
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: ability.image,
                                        alt: ability.name,
                                        loading: "lazy",
                                        decoding: "async",
                                        className: "absolute inset-0 w-full h-full object-cover opacity-90"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                        lineNumber: 152,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                        lineNumber: 161,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 border-[1px] border-white/5 mix-blend-overlay pointer-events-none"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                        lineNumber: 164,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 left-0 w-full p-5 md:p-6 flex flex-col z-10 pointer-events-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono text-[9px] md:text-[10px] tracking-[0.15em] mb-1 text-white/60",
                                                children: [
                                                    "0",
                                                    i + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                                lineNumber: 168,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg md:text-xl lg:text-2xl mb-2 tracking-[0.05em] font-semibold uppercase text-white leading-[1.05]",
                                                style: {
                                                    fontFamily: 'var(--font-display)'
                                                },
                                                children: ability.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                                lineNumber: 171,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] md:text-[11px] leading-snug tracking-wide uppercase font-sans text-white/75 max-w-[90%]",
                                                children: ability.description
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                                lineNumber: 177,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                        lineNumber: 167,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, ability.id, true, {
                                fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                                lineNumber: 142,
                                columnNumber: 17
                            }, this);
                        }, "8Up1/il2UR56xnJ3E4bNoBXcEf8=", false, function() {
                            return [
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
                            ];
                        }))
                    }, void 0, false, {
                        fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
            lineNumber: 92,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/circular-abilities-gallery.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_s(CircularAbilitiesGallery, "IUJtCLtQTaEpWST007/vo0URSEk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$animation$2d$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationFrame"]
    ];
});
_c = CircularAbilitiesGallery;
var _c;
__turbopack_context__.k.register(_c, "CircularAbilitiesGallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_0vzy5m9._.js.map