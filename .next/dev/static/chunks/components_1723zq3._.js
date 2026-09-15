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
                for(let i = 0; i <= 20; i++){
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
                managePreloadQueue(targetFrame);
                if (targetFrame !== currentRenderedFrame) {
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
            // Start background preloading
            let bgPreloadIndex = 0;
            const bgPreloadInterval = setInterval({
                "HeroSequence.useEffect.bgPreloadInterval": ()=>{
                    if (bgPreloadIndex < TOTAL_FRAMES) {
                        preloadFrame(bgPreloadIndex);
                        bgPreloadIndex++;
                    } else {
                        clearInterval(bgPreloadInterval);
                    }
                }
            }["HeroSequence.useEffect.bgPreloadInterval"], 20);
            // Initial preload burst and start loop
            managePreloadQueue(0);
            animationFrameId = requestAnimationFrame(playCinematic);
            // Cleanup
            return ({
                "HeroSequence.useEffect": ()=>{
                    window.removeEventListener('resize', resizeCanvas);
                    cancelAnimationFrame(animationFrameId);
                    clearInterval(bgPreloadInterval);
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
                lineNumber: 197,
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
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "nav-links",
                                ref: navLinksRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#character",
                                        children: "CHARACTER"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HeroSequence.tsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#abilities",
                                        children: "ABILITIES"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HeroSequence.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#debt",
                                        children: "THE DEBT"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HeroSequence.tsx",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#origin",
                                        children: "ORIGIN"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HeroSequence.tsx",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HeroSequence.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HeroSequence.tsx",
                        lineNumber: 200,
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
                                lineNumber: 211,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "animated-dialogue",
                                children: '"The more people I save, the heavier I become."'
                            }, void 0, false, {
                                fileName: "[project]/components/HeroSequence.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HeroSequence.tsx",
                        lineNumber: 210,
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
                                lineNumber: 216,
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
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/HeroSequence.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HeroSequence.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/HeroSequence.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/HeroSequence.tsx",
        lineNumber: 196,
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
"[project]/components/ui/3d-parallax-unfurling-gallery.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ParallaxGallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// The character images provided by the user
const CHARACTER_IMAGES = [
    "/images/character/media_1789375360773.jpg",
    "/images/character/media_1789375381712.jpg",
    "/images/character/media_1789375381771.jpg",
    "/images/character/media_1789375381962.jpg",
    "/images/character/media_1789375382002.jpg",
    "/images/character/media_1789375360773.jpg",
    "/images/character/media_1789375381712.jpg",
    "/images/character/media_1789375381771.jpg",
    "/images/character/media_1789375381962.jpg",
    "/images/character/media_1789375382002.jpg",
    "/images/character/media_1789375360773.jpg",
    "/images/character/media_1789375381712.jpg",
    "/images/character/media_1789375381771.jpg",
    "/images/character/media_1789375381962.jpg"
];
const ImageCard = ({ src, onLoad })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-[200px] sm:h-[300px] md:h-[400px] flex-shrink-0 bg-[#111] border border-[#222] transition-transform duration-300 hover:scale-[1.02] cursor-pointer relative will-change-transform backface-hidden preserve-3d flex items-center justify-center",
        children: src ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: src,
            alt: "ANCHOR Character",
            loading: "lazy",
            onLoad: onLoad,
            className: "w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-sm"
        }, void 0, false, {
            fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
            lineNumber: 33,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-[#333] text-sm uppercase tracking-widest font-bold",
            children: "Image Needed"
        }, void 0, false, {
            fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
            lineNumber: 41,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ImageCard;
function ParallaxGallery() {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const loadedCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const handleItemLoad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ParallaxGallery.useCallback[handleItemLoad]": ()=>{
            loadedCountRef.current += 1;
            if (!isReady && loadedCountRef.current >= 1) setIsReady(true);
        }
    }["ParallaxGallery.useCallback[handleItemLoad]"], [
        isReady
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ParallaxGallery.useEffect": ()=>{
            const t = setTimeout({
                "ParallaxGallery.useEffect.t": ()=>setIsReady(true)
            }["ParallaxGallery.useEffect.t"], 1200);
            return ({
                "ParallaxGallery.useEffect": ()=>clearTimeout(t)
            })["ParallaxGallery.useEffect"];
        }
    }["ParallaxGallery.useEffect"], []);
    const colMedia = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ParallaxGallery.useMemo[colMedia]": ()=>{
            const col1Base = CHARACTER_IMAGES.filter({
                "ParallaxGallery.useMemo[colMedia].col1Base": (_, i)=>i % 4 === 0
            }["ParallaxGallery.useMemo[colMedia].col1Base"]);
            const col2Base = CHARACTER_IMAGES.filter({
                "ParallaxGallery.useMemo[colMedia].col2Base": (_, i)=>i % 4 === 1
            }["ParallaxGallery.useMemo[colMedia].col2Base"]);
            const col3Base = CHARACTER_IMAGES.filter({
                "ParallaxGallery.useMemo[colMedia].col3Base": (_, i)=>i % 4 === 2
            }["ParallaxGallery.useMemo[colMedia].col3Base"]);
            const col4Base = CHARACTER_IMAGES.filter({
                "ParallaxGallery.useMemo[colMedia].col4Base": (_, i)=>i % 4 === 3
            }["ParallaxGallery.useMemo[colMedia].col4Base"]);
            return {
                col1: [
                    ...col1Base,
                    ...col1Base,
                    ...col1Base
                ],
                col2: [
                    ...col2Base,
                    ...col2Base,
                    ...col2Base
                ],
                col3: [
                    ...col3Base,
                    ...col3Base,
                    ...col3Base
                ],
                col4: [
                    ...col4Base,
                    ...col4Base,
                    ...col4Base
                ]
            };
        }
    }["ParallaxGallery.useMemo[colMedia]"], []);
    // LINKED SCROLL: Uses normal page scroll relative to this section
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])({
        target: containerRef,
        offset: [
            "start start",
            "end end"
        ]
    });
    const smoothProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        mass: 0.5
    });
    // Banner animations (unfurling the background)
    const bannerHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        0.2
    ], [
        "90vh",
        "100vh"
    ]);
    const bannerRadius = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        0.2
    ], [
        "24px",
        "0px"
    ]);
    const bannerBorderWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        0.2
    ], [
        "2px",
        "0px"
    ]);
    // 3D Matrix animations
    const rotateY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        1
    ], [
        -15,
        0
    ]);
    const rotateX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        1
    ], [
        8,
        0
    ]);
    const rotateZ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        1
    ], [
        3,
        0
    ]);
    const translateZ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        1
    ], [
        -120,
        0
    ]);
    const scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        1
    ], [
        0.88,
        1
    ]);
    // Track columns parallax animations (Staggered layered depth)
    const yCol1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        1
    ], [
        "0px",
        "-80px"
    ]);
    const yCol2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        1
    ], [
        "40px",
        "-20px"
    ]);
    const yCol3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        1
    ], [
        "-20px",
        "-100px"
    ]);
    const yCol4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(smoothProgress, [
        0,
        1
    ], [
        "60px",
        "0px"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full bg-[#050505]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            ref: containerRef,
            className: "relative w-full h-[500vh] bg-[#050505] text-white font-sans selection:bg-white selection:text-black",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-[10%] left-[8%] z-50 pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-5xl md:text-7xl font-bold tracking-[0.2em] uppercase",
                            style: {
                                fontFamily: "var(--font-display)",
                                background: "linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)",
                                backgroundSize: "200% auto",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.9))"
                            },
                            children: "CHARACTER"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        style: {
                            width: "100vw",
                            height: "100vh"
                        },
                        className: "relative bg-[#050505] overflow-hidden flex items-center justify-center max-w-[1920px] mx-auto will-change-transform backface-hidden preserve-3d",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex justify-center items-center pointer-events-none",
                            style: {
                                perspective: "1200px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 z-20 shadow-[inset_0_100px_150px_-50px_rgba(5,5,5,1),inset_0_-100px_150px_-50px_rgba(5,5,5,1)]"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 z-20 shadow-[inset_150px_0_150px_-50px_rgba(5,5,5,1),inset_-150px_0_150px_-50px_rgba(5,5,5,1)]"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    style: {
                                        rotateX,
                                        rotateY,
                                        rotateZ,
                                        z: translateZ,
                                        scale,
                                        transformStyle: "preserve-3d"
                                    },
                                    className: "flex gap-6 md:gap-8 justify-center items-center w-[90vw] md:w-[85vw] h-[85vh] origin-center opacity-100 will-change-transform backface-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            style: {
                                                y: yCol1
                                            },
                                            className: "flex flex-col gap-6 md:gap-8 w-[40vw] md:w-[22vw] min-w-[150px] pointer-events-auto",
                                            children: colMedia.col1.map((src, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageCard, {
                                                    src: src,
                                                    onLoad: handleItemLoad
                                                }, `col1-${index}`, false, {
                                                    fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                                            lineNumber: 159,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            style: {
                                                y: yCol2
                                            },
                                            className: "flex flex-col gap-6 md:gap-8 w-[40vw] md:w-[22vw] min-w-[150px] pointer-events-auto",
                                            children: colMedia.col2.map((src, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageCard, {
                                                    src: src,
                                                    onLoad: handleItemLoad
                                                }, `col2-${index}`, false, {
                                                    fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                                            lineNumber: 165,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            style: {
                                                y: yCol3
                                            },
                                            className: "hidden md:flex flex-col gap-6 md:gap-8 w-[22vw] min-w-[150px] pointer-events-auto",
                                            children: colMedia.col3.map((src, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageCard, {
                                                    src: src,
                                                    onLoad: handleItemLoad
                                                }, `col3-${index}`, false, {
                                                    fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                                            lineNumber: 171,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            style: {
                                                y: yCol4
                                            },
                                            className: "hidden md:flex flex-col gap-6 md:gap-8 w-[22vw] min-w-[150px] pointer-events-auto",
                                            children: colMedia.col4.map((src, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageCard, {
                                                    src: src,
                                                    onLoad: handleItemLoad
                                                }, `col4-${index}`, false, {
                                                    fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                                            lineNumber: 177,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                            lineNumber: 139,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
                lineNumber: 114,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
            lineNumber: 110,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/3d-parallax-unfurling-gallery.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_s(ParallaxGallery, "31rW6t5xMrpeIHtfIZQknIOPdzA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c1 = ParallaxGallery;
var _c, _c1;
__turbopack_context__.k.register(_c, "ImageCard");
__turbopack_context__.k.register(_c1, "ParallaxGallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_1723zq3._.js.map