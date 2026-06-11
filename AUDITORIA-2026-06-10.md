# AUDITORÍA INTEGRAL — SNOW WEBSITE
**Fecha:** 2026-06-10 · **Modo:** solo lectura local (nada se modificó ni se subió a GitHub)
**Equipo:** Gerencia de proyecto + 4 expertos (UI/UX · Performance/Responsive · Lógica/Código · Funnels/CRO)
**Objetivo:** llevar el concepto a su mejor versión sin perder esencia ni identidad.

---

## NOTAS GLOBALES

| Área | Nota | Diagnóstico en una línea |
|---|---|---|
| UI/UX | 6.5/10 | Identidad potente, pero el sistema de diseño está fracturado (menta vs cian, services como dialecto aparte) |
| Performance/Responsive | 5/10 | Buenas prácticas anuladas por 3 decisiones de entrega: video 12.8MB, Tailwind CDN, Three.js en páginas sin 3D |
| Lógica/Código | 4.5/10 | Módulos 3D bien diseñados, pero bug del cubo en blog, cero manejo de errores y ~25-30% de código muerto |
| Funnels/CRO | 3.5/10 | Persuasión sofisticada montada sobre fontanería rota: el 100% de los leads se pierde |

**Veredicto del equipo (unánime):** *"Es un Ferrari con el depósito desconectado del motor."* No hay que rediseñar nada — la identidad inmersiva es el mayor activo y debe preservarse intacta. Hay que **conectar lo que ya está dibujado** y entregar los mismos píxeles con un 88% menos de peso.

---

## HALLAZGOS CONFIRMADOS POR MÚLTIPLES EXPERTOS (máxima confianza)

### 🔴 CRÍTICOS — bloquean el negocio

**1. El formulario de contacto no envía nada (confirmado por los 4 expertos)**
- `contact.html:139` → `action="https://formspree.io/f/YOUR_FORM_ID"` (placeholder literal).
- `contact.html:172-183` → `submitContactForm()` hace `preventDefault()`, borra campos y muestra "✓ TRANSMISIÓN RECIBIDA" **sin enviar nada**.
- Es el único punto de conversión del sitio: pérdida del 100% de los leads con falso mensaje de éxito.
- **Fix:** Formspree real o webhook n8n (coherente con el propio discurso de marca). Mantener la estética del mensaje de éxito + añadir estado de error. ~30 min.

**2. El lead magnet de index descarta los datos del usuario (4/4 expertos)**
- `index.html:941-942` → `onsubmit="window.location.href='contact.html'; return false;"` pisa el `method="get"`: la URL del sitio y el email tecleados se tiran.
- **Fix:** quitar el onsubmit (los params viajan por GET) y prellenar contact.html, o enviar al mismo endpoint del punto 1.

**3. Las 4 newsletters simulan suscripción (3/4 expertos)**
- `index.html:1079`, `contact.html:198`, `blog.html:128 y 198` → `action="#"` + innerHTML "✓ Suscrito".
- **Fix:** conectar al mismo endpoint con campo `source`, o retirarlas. Nunca simular éxito.

**4. Video hero: 12.8 MB cuando existe la versión idéntica de 3.4 MB sin usar (Performance + Código)**
- `index.html:58` usa `assets/Hero video.mp4` (720p, 10s, bitrate 10.262 kbps — 4-5× lo razonable).
- `assets/scene-hero.mp4` es **el mismo contenido** a 2.716 kbps (3.4 MB), trackeado en git, desplegado… y sin referenciar.
- Además `preload="auto"` descarga los 12.8 MB **incluso cuando el intro no se va a mostrar** (el check de sessionStorage corre al final del body, `index.html:1110-1119`).
- **Fix:** cambiar el src a scene-hero.mp4 (remuxeado con `+faststart`), `poster` + `preload="metadata"`, y mover el check de sessionStorage a un script inline ANTES del elemento. **−9.5 MB inmediatos.**

**5. El cubo "eliminado" de services reaparece en blog.html (Código + Performance)**
- `main.js:12-14` usa lista negra (`isSimplePage` solo conoce services/about). blog y contact **no** están → cargan Three.js completo, crean el cubo CSS3D y renderizan ambas escenas cada frame.
- En blog, la sección 3 (`data-index="2"`) **activa el cubo de servicios girando encima del artículo destacado** (cube.js:101). En contact, render fantasma a 60fps en la página de conversión.
- **Fix:** invertir a lista blanca (`is3DPage = page-index`) — 1 línea, sin tocar HTML.

### 🟠 ALTOS — dañan confianza, alcance o experiencia

**6. INICIO apunta a URL absoluta de GitHub Pages (4/4 expertos)** — `index.html:85` → `https://snowtech7.github.io/SnowWebV2/`. Rompe en local/dominio propio, recarga cross-origin (re-dispara el intro), incoherente con og:url/JSON-LD (`https://snowtech.io/`). Fix: `href="index.html"` + canonical coherente.

**7. Ancla rota `#lead-magnet` (3/4)** — `services.html:1326` enlaza a `index.html#lead-magnet`, id inexistente. El usuario que quiso convertir aterriza arriba del todo y se come el intro de nuevo. Fix: añadir `id="lead-magnet"` a la sección 6 de index o apuntar a contact.html.

**8. Tailwind CDN (JIT runtime) en producción (3/4)** — todas las páginas. ~100 KB + 200-500 ms de compilación en main thread por page view + riesgo FOUC. Fix: Tailwind CLI → ~8-12 KB estáticos sin tocar el HTML.

**9. Intro "TOCA PARA ENTRAR": fricción cuantificada (UI/UX + Funnels)**
- 11-20s de fricción pre-contenido; sin skip una vez iniciado; inoperable por teclado (`#hero-intro` sin tabindex/keydown); puede quemar 30-50% del tráfico frío.
- **Conservar el ritual reduciendo el costo:** autoplay muted con "TOCA PARA SALTAR" tras 2-3s, soporte de teclado (Enter/Espacio), saltar con `prefers-reduced-motion`, bypass cuando llega `utm_source` (tráfico de pago), y la compresión del punto 4.

**10. Social proof ficticio presentado como real (UI/UX + Funnels)**
- Clientes "Velox/Nexis/Orbita" con KPIs (+340%) y pills "Meta · Partner de Marketing", "OpenAI · Partner de IA" (`index.html:709-892`). "Partner de Meta/Google" es estatus verificable → riesgo legal/reputacional ante un decisor B2B.
- Además `partners.js:7` muestra AWS/META/GOOGLE/AZURE/OPENAI mientras el DOM dice Meta/Google/OpenAI/n8n/Notion — dos listas divergentes.
- **Fix:** re-encuadrar como "Casos tipo / Escenarios" y "Construimos sobre / Stack certificado" hasta tener casos reales. Un solo caso real profundo > 3 fichas ficticias.

**11. Dos acentos compiten sin regla: menta `#8BF2C6` vs cian `#00d9ff` (UI/UX)** — index mezcla paneles cian con CTAs menta; services (rediseñado) es 100% menta. ~200 hardcodes. Fix: sistema dual de tokens — `--accent` (menta = acción/conversión) y `--accent-data` (cian = data/decoración técnica).

**12. Cero analytics (Funnels)** — sin GA4/Plausible/eventos. Una agencia que vende "Analytics desde el día 1" no se mide. Fix: Plausible + 6 eventos (`intro_tap/abandoned`, `cta_header_click`, `lead_magnet_submit`, `contact_submit`, `service_tab_view` — el hook ya existe en `switchService()`).

**13. El menú móvil omite el CTA primario (Funnels)** — el overlay lista 5 links pero no "Auditoría Gratuita". En móvil el CTA desaparece. Fix: añadirlo destacado al overlay.

**14. Sin manejo de errores WebGL/CDN (Código)** — `core.js:21` sin try/catch: si WebGL falla, mueren también las partículas 2D y todo main.js. Fix: detección + fallback.

**15. Loop rAF sin pausa (Performance)** — `main.js:105-137` renderiza a 60fps siempre, sin `document.hidden`, sin reduced-motion en JS, resize re-randomiza partículas sin debounce (la barra de URL móvil lo dispara al hacer scroll). Listeners de scroll sin passive/throttle en index/about (services ya tiene la versión correcta — copiarla).

### 🟡 MEDIOS (selección)

- **Taxonomía de servicios distinta en 5 superficies** (cubo: Ventas/Marketing/RRHH… vs dashboard: Web/IA/Growth/Funnels/Automatización vs 2 footers vs tabs vp-window). Definir taxonomía canónica; re-mapear caras del cubo; el modal del cubo necesita CTA "Ver servicio →".
- **HUD "0 km/s" muerto en contact/blog** (`contact.html:84-88`, `blog.html:81-85`) — ningún JS lo actualiza. Retirar o conectar a `PHYSICS.velocity`.
- **services.html sin anclas de precio ni CTA por servicio** — describe pero no cierra. 3 tarjetas de Fase con rango de inversión + "Empezar por aquí →" por panel.
- **about.html es punto muerto del funnel** — cero CTA en el cuerpo. Añadir cierre "¿Construimos tu entidad?" reutilizando el card de services.
- **Blog circular y fósil** — artículos enlazan a sí mismos, fechas 2024 con © 2026, imágenes hotlinked de Unsplash. Publicar 2-3 artículos reales orientados a la oferta, o "Bitácora — próximamente" honesto.
- **contact.html sin alternativas** — sin WhatsApp (que ellos mismos venden), sin calendario, sin página de gracias. Decisores B2B convierten 2-3× más con agenda directa.
- **~450 líneas de CSS muerto** (pricing-*, arch-column, tech-stack, phase-accordion, slide-item… 65 clases sin referencia) + `logo.js` nunca importado + `initSlider()` sin objetivo + rama inalcanzable en cube.js:107-122.
- **620 líneas de CSS embebido en services.html** fuera del sistema (microtipografía 8px en `svc-*` que el fix de accesibilidad global no cubre).
- **Duplicación**: header + overlay + footer + 3 variantes del scroll handler copiados en 5 HTML (~150 líneas/página). Cambiar el menú = tocar 10 sitios.
- **Targets táctiles de 6px en `.vp-pdot`** (styles.css:2085) — fix de 3 líneas con pseudo-elemento, cero impacto visual.
- **Sin favicon/manifest/theme-color** en ninguna página; sin versionado de assets; logo.png 134KB para 40px; 7 pesos de fuente (recortables a 4); links legales a `#`; modal del cubo sin Escape/focus trap; carruseles sin pausa (WCAG 2.2.2).

---

## PESO DE PRIMERA VISITA (index.html, móvil, caché frío)

| Estado | Transferencia | LCP móvil estimado |
|---|---|---|
| **Hoy** | **~13.4 MB** (video 12.8 + Three.js ~250KB + Tailwind ~100KB + fonts ~125KB + resto) | 4.5–8 s |
| **Tras pasos 1-5 del plan** | **~1.6 MB (−88%)** | ~2–2.5 s |

Sin tocar un solo píxel de la experiencia: mismo video, mismas partículas, mismo cubo donde corresponde.

---

## PLAN MAESTRO POR FASES

### FASE 0 — Fontanería de negocio (4-6 h · ROI ∞)
1. Formspree/n8n real en contact.html + estado de error.
2. Lead magnet: pasar datos por GET y prellenar contact (o enviar directo).
3. `id="lead-magnet"` en sección 6 de index; INICIO → `index.html`.
4. Newsletters al mismo endpoint o retirarlas.
5. Analytics (Plausible/GA4) + 6 eventos.
6. CTA "Auditoría Gratuita" en el overlay móvil.

### FASE 1 — Peso y corrección del modelo de páginas (1 día)
7. Video: src → scene-hero.mp4 (+faststart) + poster + preload="metadata" + check sessionStorage antes del elemento. Ideal: variante WebM ~1.2 MB.
8. `is3DPage` por lista blanca (mata el cubo fantasma de blog y el render de contact).
9. Quitar `#layer-webgl/#layer-css` + HUD muerto de about/blog/contact.
10. try/catch + detección WebGL con fallback a partículas 2D.
11. Tailwind CLI en lugar del CDN.
12. Pausar rAF en hidden/idle/reduced-motion; debounce de resize; scroll listeners unificados (versión de services).

### FASE 2 — Intro, conversión y confianza (2-3 días)
13. Intro: autoplay muted + tap-para-saltar + teclado + bypass UTM/reduced-motion.
14. Social proof: re-encuadre honesto ("Casos tipo", "Construimos sobre") + 1 caso real cuando exista.
15. contact.html: WhatsApp + calendario + escasez + página/estado de gracias.
16. services.html: anclas de precio por Fase + CTA por servicio.
17. about.html: CTA de cierre. Blog: contenido real o "próximamente" honesto.
18. Taxonomía canónica de servicios en cubo/dashboard/footers/tabs + CTA en modal del cubo.

### FASE 3 — Sistema y deuda técnica (continuo)
19. Tokens duales menta/cian; mover CSS de services a styles.css; unificar `.hero-title` y footer canónico.
20. Des-duplicación: `site.js` compartido (header scroll + menú + forms) o custom elements `<snow-header>/<snow-footer>`; opcional Eleventy.
21. Purga: CSS muerto (~450 líneas), logo.js, initSlider, rama de cube.js, scene-hero duplicados, background.html → /dev/.
22. Favicon SVG + theme-color + versionado `?v=`; fuentes a 4 pesos; fixes táctiles/ARIA (vp-pdot, modal, carruseles).

---

## LO INTOCABLE — el alma del sitio (consenso de los 4 expertos)

1. **El vp-window de index** (ventana de OS con tabs, diagramas SVG animados de funnel/n8n/hub neuronal, swipe táctil) — el mejor componente del sitio.
2. **El dashboard de services.html** — tablist ARIA correcto con flechas/Home/End y el CTA contextual "Sistema detectado · N servicios" tras explorar ≥2 tabs: patrón CRO genuinamente sofisticado.
3. **El ritual del intro de video** — 1×/sesión, fade al 80%, fallback 20s. Solo necesita válvulas de escape, no eliminación.
4. **Las partículas con física de scroll** (stretch a líneas según velocidad, conteo adaptativo 80/120/200) — barato e identitario.
5. **La narrativa Presencia → Crecimiento → Autonomía** — consistente en vp-window, Ruta de Evolución y FAQ. El problema es de taxonomía de servicios, no de narrativa.
6. **La capa de accesibilidad consciente** — skip-links, reduced-motion con excepciones, contraste WCAG, 16px en inputs iOS, safe-areas, hover:none. Muy por encima de la media.
7. **La degradación 3D por dispositivo** — sin antialias/transmission en móvil, pixelRatio cap 2.

---

*Informe local de referencia. No commiteado. El sitio en GitHub permanece sin cambios.*
