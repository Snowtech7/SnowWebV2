import * as THREE from 'three';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

let logoGroup = null;

export function createCSSLogo(cssScene) {
    if (!cssScene) return null;

    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:300px;height:300px;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0.55;';

    const img = document.createElement('img');
    img.src = 'assets/logo.png';
    img.alt = '';
    img.style.cssText =
        'width:100%;height:100%;object-fit:contain;' +
        'filter:hue-rotate(50deg)' +
        '       drop-shadow(0 0 30px rgba(80,190,255,0.40))' +
        '       drop-shadow(0 0 12px rgba(130,210,255,0.22));';

    wrap.appendChild(img);

    const obj = new CSS3DObject(wrap);
    logoGroup = new THREE.Group();
    logoGroup.add(obj);
    logoGroup.scale.set(0.001, 0.001, 0.001); // start invisible, lerps to target
    cssScene.add(logoGroup);
    return logoGroup;
}

export function updateLogo(group, physics, isSimplePage, now, isDesktop) {
    if (!group) return;

    if (isSimplePage) {
        if (group.visible) group.visible = false;
        return;
    }
    if (!group.visible) group.visible = true;

    const isActive = physics.activeSection === 0;
    const relIndex  = 0 - physics.activeSection;

    const gx = 0;
    const gy = isActive ? 0 : relIndex * -15;
    const gz = isActive ? 0 : -10;
    const gs = isActive ? (isDesktop ? 0.015 : 0.011) : 0;

    group.position.x += (gx - group.position.x) * 0.08;
    group.position.y += (gy - group.position.y) * 0.08;
    group.position.z += (gz - group.position.z) * 0.08;

    const cs = group.scale.x;
    const ns = cs + (gs - cs) * 0.08;
    group.scale.set(ns, ns, ns);

    // Gentle breathing float
    group.rotation.y = Math.sin(now * 0.00035) * 0.10;
    group.rotation.x = Math.sin(now * 0.00025 + 1) * 0.07;
}
