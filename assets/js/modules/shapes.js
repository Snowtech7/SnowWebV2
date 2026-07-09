import * as THREE from 'three';

// ── SERIE PLATÓNICA ──────────────────────────────────────────────────
// Metáfora de la home: al profundizar, la entidad digital gana caras.
// semilla (hero) → tetraedro (4) → [hexaedro = cubo CSS3D (6)] →
// octaedro (8) → dodecaedro (12) → icosaedro (20).
// La progresión se SIENTE: cada estadio tiene más partículas orbitando,
// aristas más luminosas y una rotación apenas más viva que el anterior.
// Este mapa es el ÚNICO lugar donde se define el gradiente de complejidad.
const SERIE_PLATONICA = {
    semilla:   { particulas: 14,  opAristas: 0.18, velRot: 0.6 },  // hero · el origen embrionario
    valueprop: { particulas: 30,  opAristas: 0.22, velRot: 0.8 },  // estadio 01 · tetraedro · 4 caras
    octa:      { particulas: 60,  opAristas: 0.30, velRot: 1.0 },  // estadio 03 · octaedro · 8 caras
    dodeca:    { particulas: 90,  opAristas: 0.36, velRot: 1.15 }, // estadio 04 · dodecaedro · 12 caras
    icosa:     { particulas: 130, opAristas: 0.42, velRot: 1.3 }   // estadio 05 · icosaedro · 20 caras
};
const SERIE_DEFECTO = { particulas: 50, opAristas: 0.3, velRot: 1 };
// En móvil, mitad de densidad de partículas (mismo criterio de presupuesto que core.js)
const FACTOR_MOVIL = 0.5;

export function createWebGLShape(geo, type, scene, iceMat) {
    if (!scene) return null;
    const cfg = SERIE_PLATONICA[type] || SERIE_DEFECTO;
    const nParticulas = Math.round(cfg.particulas * (window.innerWidth <= 768 ? FACTOR_MOVIL : 1));
    const grp = new THREE.Group();
    grp.add(new THREE.Mesh(geo, iceMat));
    grp.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x00d9ff, opacity: cfg.opAristas, transparent: true })));
    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(nParticulas * 3);
    for (let i = 0; i < nParticulas * 3; i++) pos[i] = (Math.random() - 0.5) * 3.5;
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    grp.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, opacity: 0.5, transparent: true })));
    grp.userData = { type: type, parts: grp.children[2], velRot: cfg.velRot };
    // Nace a escala ~0: entra creciendo (lerp en updateShapes) y el frame
    // estático de reduced-motion no muestra sólidos a medio interpolar.
    grp.scale.setScalar(0.001);
    scene.add(grp);
    return grp;
}

export function createValuePropSystem(scene, iceMat) {
    if (!scene) return null;
    const container = new THREE.Group();
    const core = createWebGLShape(new THREE.TetrahedronGeometry(2.8), 'valueprop', scene, iceMat);
    // remove core from scene because we want it inside container
    scene.remove(core);
    container.add(core);

    const satellites = new THREE.Group();
    container.add(satellites);
    container.userData = { isValueSystem: true, satellites: satellites, velRot: SERIE_PLATONICA.valueprop.velRot };
    container.scale.setScalar(0.001); // entra creciendo, igual que el resto de la serie
    const satGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    for (let i = 0; i < 3; i++) {
        const mesh = new THREE.Mesh(satGeo, iceMat);
        const angle = (i / 3) * Math.PI * 2; const r = 3.8;
        mesh.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
        mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(satGeo), new THREE.LineBasicMaterial({ color: 0x00d9ff, opacity: 0.3 })));
        satellites.add(mesh);
    }
    satellites.rotation.z = Math.PI / 6; satellites.rotation.x = Math.PI / 6;
    scene.add(container);
    return container;
}

export function updateShapes(shapes, physics, isServicesPage, isDesktop = true) {
    if (isServicesPage) {
        // Hide all shapes on services page
        shapes.forEach(s => { if (s && s.visible) s.visible = false; });
        return;
    }

    shapes.forEach((shape, index) => {
        if (!shape) return;
        if (!shape.visible) shape.visible = true;

        const isActive = index === physics.activeSection;
        const relIndex = index - physics.activeSection;
        let gx = isDesktop ? 4 : 0;
        let gy = isDesktop ? 0 : 2.5;
        let gz = isDesktop ? 0 : -4;
        let gs = isDesktop ? 1 : 0.38;

        // Octaedro (proceso) e icosaedro (lead magnet) viven a la izquierda en desktop
        if ((index === 4 || index === 7) && isDesktop) gx = -4;

        if (isActive) {
            if (index === 0) {
                // La semilla: pequeña, lejana y medio velada por la niebla en el
                // cuadrante inferior derecho — el origen de la serie platónica
                // sin competir con el titular. En móvil el hero queda solo
                // tipográfico (pantalla pequeña: la semilla rozaría el título).
                if (isDesktop) { gx = 5.5; gy = -2.2; gz = -9; gs = 0.32; }
                else { gs = 0; }
            }
            else if (index === 3 || index === 6) { gs = 0; }
        } else {
            gy = relIndex * -15; gz = -20; gs = 0;
        }

        shape.position.x += (gx - shape.position.x) * 0.08;
        shape.position.y += (gy - shape.position.y) * 0.08;
        shape.position.z += (gz - shape.position.z) * 0.08;
        const cs = shape.scale.x;
        shape.scale.set(cs + (gs - cs) * 0.08, cs + (gs - cs) * 0.08, cs + (gs - cs) * 0.08);
        // velRot: los estadios tardíos de la serie giran apenas más vivos
        const vr = shape.userData.velRot || 1;
        shape.rotation.y += (0.002 + (physics.velocity * 0.001)) * vr;
        shape.rotation.x += 0.001 * vr;

        if (shape.userData.parts) shape.userData.parts.rotation.y -= 0.005;
        if (shape.userData.isValueSystem) {
            shape.userData.satellites.rotation.y += 0.01;
            shape.userData.satellites.children.forEach(sat => { sat.rotation.x += 0.02; sat.rotation.z += 0.02; });
        }
    });
}
