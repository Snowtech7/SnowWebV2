import * as THREE from 'three';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

/* Taxonomía canónica SNOW: 5 servicios + Sistema Completo.
   Cada cara del cubo enlaza a su tab en services.html (?service=svc-XXX);
   la cara "Sistema Completo" cierra hacia contact.html. */
const services = {
    'svc-web': {
        title: 'Desarrollo Web',
        face: 'WEB',
        desc: 'Tu base digital de alto impacto. Diseño que convierte, velocidad que retiene, SEO que posiciona.',
        path: "M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z",
        href: 'services.html?service=svc-web',
        cta: 'Ver servicio →'
    },
    'svc-ai': {
        title: 'IA & Chatbots',
        face: 'IA',
        desc: 'Agentes que conversan, califican leads y atienden a tus clientes 24/7 mientras tu equipo duerme.',
        path: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 9h2v2H7V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9z",
        href: 'services.html?service=svc-ai',
        cta: 'Ver servicio →'
    },
    'svc-marketing': {
        title: 'Growth Marketing',
        face: 'GROWTH',
        desc: 'Tráfico calificado con SEO técnico, campañas de ROI medible y optimización continua.',
        path: "M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z",
        href: 'services.html?service=svc-marketing',
        cta: 'Ver servicio →'
    },
    'svc-funnels': {
        title: 'Sales Funnels',
        face: 'FUNNELS',
        desc: 'Captura leads, los nutre con contenido personalizado y cierra ventas en automático.',
        path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z",
        href: 'services.html?service=svc-funnels',
        cta: 'Ver servicio →'
    },
    'svc-automation': {
        title: 'Automatización',
        face: 'AUTO',
        desc: 'Workflows que conectan tus herramientas, eliminan trabajo manual y liberan a tu equipo.',
        path: "M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
        href: 'services.html?service=svc-automation',
        cta: 'Ver servicio →'
    },
    'sistema': {
        title: 'Sistema Completo',
        face: 'SISTEMA',
        desc: 'Los cinco servicios operando como una sola entidad autónoma. Diseñamos tu arquitectura completa.',
        path: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
        href: 'contact.html',
        cta: 'Diseñar mi sistema →'
    }
};

let isHovering = false;
let cssGroup = null;

// Initialize global modal handlers (guarded for pages without modal)
window.closeModal = () => {
    const modal = document.getElementById('service-modal');
    if (modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }
};
window.openService = (key) => {
    const modal = document.getElementById('service-modal');
    if (!modal) return;
    const data = services[key];
    if (!data) return;
    const titleEl = document.getElementById('modal-title');
    const descEl = document.getElementById('modal-desc');
    const iconEl = document.getElementById('modal-icon-container');
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (iconEl) {
        const svgPath = `<svg viewBox="0 0 24 24" style="width:100%;height:100%;fill:var(--accent-data-glow);" aria-hidden="true"><path d="${data.path}"/></svg>`;
        iconEl.innerHTML = svgPath;
    }
    const ctaEl = document.getElementById('modal-cta');
    if (ctaEl) {
        ctaEl.href = data.href;
        ctaEl.textContent = data.cta;
        ctaEl.setAttribute('data-service', key);
    }
    if (window.snowTrack) window.snowTrack('cube_service_view', { service: key });
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    // Accesibilidad: foco al botón de cierre al abrir
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
};

/* Accesibilidad del modal: Escape y click en el backdrop cierran.
   Guards para páginas sin modal (cube.js solo carga en la home). */
(function initModalA11y() {
    const modal = document.getElementById('service-modal');
    if (!modal) return;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) window.closeModal();
    });
    modal.addEventListener('click', (e) => {
        // Solo si el click cae fuera de .modal-card (backdrop)
        if (!e.target.closest('.modal-card')) window.closeModal();
    });
})();

export function createCSSCube(cssScene) {
    if (!cssScene) return null;
    const group = new THREE.Group();
    const faces = [
        { class: 'face-original f-front', content: 'svc-web', rot: [0, 0, 0], pos: [0, 0, 125] },
        { class: 'face-original f-back', content: 'svc-marketing', rot: [0, Math.PI, 0], pos: [0, 0, -125] },
        { class: 'face-original f-right', content: 'svc-ai', rot: [0, -Math.PI / 2, 0], pos: [-125, 0, 0] },
        { class: 'face-original f-left', content: 'svc-funnels', rot: [0, Math.PI / 2, 0], pos: [125, 0, 0] },
        { class: 'face-original f-top', content: 'svc-automation', rot: [-Math.PI / 2, 0, 0], pos: [0, 125, 0] },
        { class: 'face-original f-bottom', content: 'sistema', rot: [Math.PI / 2, 0, 0], pos: [0, -125, 0] }
    ];
    faces.forEach(f => {
        const div = document.createElement('div');
        div.className = 'cube-wrapper ' + f.class;
        const data = services[f.content];
        div.innerHTML = `<div class="content-inner"><div class="icon-inner"><svg viewBox="0 0 24 24"><path d="${data.path}"/></svg></div><span class="text-inner">${data.face || data.title}</span></div>`;
        div.onclick = () => window.openService(f.content);
        div.addEventListener('mouseenter', () => isHovering = true);
        div.addEventListener('mouseleave', () => isHovering = false);
        const obj = new CSS3DObject(div);
        obj.position.set(...f.pos); obj.rotation.set(...f.rot); group.add(obj);
    });
    group.scale.set(0.01, 0.01, 0.01);
    cssScene.add(group);
    cssGroup = group;
    return group;
}

export function updateCube(physics, now, isDesktop = true) {
    if (!cssGroup) return;

    // Home: el cubo vive en la sección 2 (estadio 02 · hexaedro)
    const isActive = physics.activeSection === 2;

    const relIndex = 2 - physics.activeSection;
    const gx = 0;
    const gy = isActive ? (isDesktop ? 0 : -1.5) : (relIndex * -15);
    const gs = isActive ? (isDesktop ? 0.01 : 0.008) : 0;

    cssGroup.position.x += (gx - cssGroup.position.x) * 0.08;
    cssGroup.position.y += (gy - cssGroup.position.y) * 0.08;
    const cs = cssGroup.scale.x;
    const ns = cs + (gs - cs) * 0.08;
    cssGroup.scale.set(ns, ns, ns);

    if (!isHovering) {
        cssGroup.rotation.y += 0.003;
        cssGroup.rotation.x = Math.sin(now * 0.0005) * 0.2;
    }
}
