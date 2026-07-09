import { initParticles, updateParticles } from './modules/particles.js';

// --- CONFIG ---
const PHYSICS = { velocity: 0, lastScrollY: window.scrollY, lastInteract: Date.now(), activeSection: 0 };

// Lista blanca: SOLO la home instancia WebGL/CSS3D (cubo, shapes, partners).
// El resto de páginas usa únicamente las partículas 2D del canvas —
// Three.js ni siquiera se descarga fuera de la home (import dinámico).
const is3DPage = document.body.classList.contains('page-index');

// --- PARTICLES (todas las páginas) ---
const canvasBg = document.getElementById('canvas-particles');
const ctx = canvasBg ? canvasBg.getContext('2d') : null;
let particles = initParticles(canvasBg);

// --- 3D (solo home, carga diferida) ---
let gfx = null;            // { state, core, updateCube, updateShapes, updatePartners }
let shapes = [];
let partnerGroup = null;

async function init3D() {
    const container3D = document.getElementById('layer-webgl');
    const cssContainer = document.getElementById('layer-css');
    if (!container3D && !cssContainer) return;
    try {
        const [THREE, core, cubeM, shapesM, partnersM] = await Promise.all([
            import('three'),
            import('./modules/core.js'),
            import('./modules/cube.js'),
            import('./modules/shapes.js'),
            import('./modules/partners.js')
        ]);
        core.initCore(container3D, cssContainer);
        const state = core.state;

        if (state.scene) {
            // Serie platónica: la complejidad crece al profundizar en la home
            // (el gradiente vive en SERIE_PLATONICA, en shapes.js).
            shapes = [
                shapesM.createWebGLShape(new THREE.TetrahedronGeometry(2.8), 'semilla', state.scene, state.iceMat), // 0: hero — la semilla (solo desktop)
                null, // 1: punto de partida — sin sólido
                shapesM.createValuePropSystem(state.scene, state.iceMat),                                            // 2: estadio 01 · tetraedro · 4 caras
                null, // 3: estadio 02 · hexaedro · 6 caras — es el cubo CSS3D (cube.js)
                shapesM.createWebGLShape(new THREE.OctahedronGeometry(2.7), 'octa', state.scene, state.iceMat),      // 4: estadio 03 · octaedro · 8 caras
                shapesM.createWebGLShape(new THREE.DodecahedronGeometry(2.6), 'dodeca', state.scene, state.iceMat),  // 5: estadio 04 · dodecaedro · 12 caras
                null, // 6: partners CSS3D (sin sólido propio)
                shapesM.createWebGLShape(new THREE.IcosahedronGeometry(2.8), 'icosa', state.scene, state.iceMat)     // 7: estadio 05 · icosaedro · 20 caras (lead magnet)
            ];
        }
        if (state.cssScene) {
            cubeM.createCSSCube(state.cssScene);
            partnerGroup = partnersM.createPartnerSystem(state.cssScene);
        }
        core.handleResize();
        gfx = {
            state: state,
            core: core,
            updateCube: cubeM.updateCube,
            updateShapes: shapesM.updateShapes,
            updatePartners: partnersM.updatePartners
        };
    } catch (err) {
        // WebGL no disponible o CDN caído: la página sigue viva con partículas 2D
        console.warn('SNOW: 3D deshabilitado —', err);
    }
}
if (is3DPage) init3D();

// --- EVENTS ---
// La barra de URL móvil dispara resize al hacer scroll (solo cambia el alto):
// re-crear las partículas solo cuando cambia el ancho, con debounce.
let resizeTimer = null;
let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
    if (gfx) gfx.core.handleResize();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (!canvasBg) return;
        if (window.innerWidth !== lastWidth) {
            lastWidth = window.innerWidth;
            particles = initParticles(canvasBg);
        } else {
            canvasBg.height = window.innerHeight;
        }
    }, 150);
});

window.addEventListener('scroll', () => {
    const delta = window.scrollY - PHYSICS.lastScrollY;
    if (Math.abs(delta) > 0.5) PHYSICS.velocity += delta * 0.15;
    PHYSICS.velocity = Math.max(Math.min(PHYSICS.velocity, 60), -60);
    PHYSICS.lastScrollY = window.scrollY; PHYSICS.lastInteract = Date.now();
}, { passive: true });

const observer = new IntersectionObserver(e => {
    const visibleSection = e.reduce((max, entry) => {
        return entry.intersectionRatio > max.intersectionRatio ? entry : max;
    }, e[0]);

    if (visibleSection && visibleSection.isIntersecting && visibleSection.intersectionRatio > 0.2) {
        PHYSICS.activeSection = parseInt(visibleSection.target.getAttribute('data-index'));
        document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
        visibleSection.target.classList.add('active');
        const fh = visibleSection.target.querySelector('.floating-header');
        if (fh) { fh.style.opacity = 1; fh.style.transform = 'translateY(0)'; }
    }
}, { threshold: [0.1, 0.3, 0.5, 0.7] });
document.querySelectorAll('section').forEach(s => observer.observe(s));

// --- ANIMATION LOOP ---
function renderFrame() {
    const now = Date.now();
    const isDesktop = window.innerWidth > 1024;

    // 1. Physics Decay
    const idle = (now - PHYSICS.lastInteract) > 5000;
    PHYSICS.velocity *= idle ? 0.9 : 0.96;
    if (Math.abs(PHYSICS.velocity) < 0.05) PHYSICS.velocity = 0;

    // 2. Update Modules
    updateParticles(ctx, particles, PHYSICS, canvasBg);

    if (!gfx) return;
    const state = gfx.state;

    if (state.camera) {
        const targetCamZ = 14 + (Math.abs(PHYSICS.velocity) * 0.05);
        state.camera.position.z += (targetCamZ - state.camera.position.z) * 0.05;
    }

    gfx.updateShapes(shapes, PHYSICS, false, isDesktop);
    gfx.updateCube(PHYSICS, now, isDesktop);
    gfx.updatePartners(partnerGroup, PHYSICS, false, now, isDesktop);

    // 3. Render
    if (state.renderer && state.scene && state.camera) {
        state.renderer.render(state.scene, state.camera);
    }
    if (state.cssRenderer && state.cssScene && state.camera) {
        state.cssRenderer.render(state.cssScene, state.camera);
    }
}

// Loop pausable: se detiene con la pestaña oculta y con reduced-motion.
let rafId = null;
function animate() {
    rafId = requestAnimationFrame(animate);
    renderFrame();
}
function startLoop() {
    if (rafId === null) { PHYSICS.lastInteract = Date.now(); animate(); }
}
function stopLoop() {
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopLoop();
    else if (!reducedMotion.matches) startLoop();
});

if (reducedMotion.matches) {
    renderFrame(); // un frame estático: fondo presente, sin animación continua
} else {
    startLoop();
}
if (reducedMotion.addEventListener) {
    reducedMotion.addEventListener('change', e => {
        if (e.matches) { stopLoop(); renderFrame(); }
        else startLoop();
    });
}
