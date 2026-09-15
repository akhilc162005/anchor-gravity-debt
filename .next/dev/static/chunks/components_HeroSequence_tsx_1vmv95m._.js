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
]);

//# sourceMappingURL=components_HeroSequence_tsx_1vmv95m._.js.map