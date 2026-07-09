# PROPUESTA DE CAMBIOS ESTRATÉGICOS — SNOW WEBSITE
**Fecha:** 2026-07-08 · **Base:** AUDITORIA-VENTAS-2026-07-08.md (lente de ventas) + AUDITORIA-2026-06-10.md (técnica)
**Estado:** propuesta para aprobación. Ningún cambio aplicado aún.

---

## 1. LA ESTRATEGIA EN UNA FRASE

> **El universo visual se queda; el idioma cambia.** Futurista en lo que se ve, humano en lo que se lee. Cada headline, botón y métrica se reescribe para un dueño de negocio que no sabe (ni quiere saber) qué es un webhook — y toda la evidencia pasa de ficción estética a prueba real, aunque sea pequeña.

Tres movimientos estratégicos, en orden de dependencia:

| Movimiento | Qué resuelve | Principio rector |
|---|---|---|
| **A. Reposicionar el mensaje** | Nadie entiende qué venden en 5 segundos | StoryBrand, Made to Stick, Schwartz |
| **B. Construir la capa de confianza** | Cero prueba social, cero humanos, cero garantía | Cialdini, Hormozi |
| **C. Empaquetar la oferta** | "Inversión a medida" no ancla ni califica | Hormozi |

---

## 2. MOVIMIENTO A — REPOSICIONAR EL MENSAJE

### A1. Nuevo hero de index (el cambio de mayor palanca del sitio)

**Hoy** (`index.html:145-150`):
> THE MOMENT ISNOW — TECH PARTNER

**Propuesta:**
> **H1:** Tu negocio atendiendo y vendiendo 24/7
> **Sub:** Creamos tu página web con inteligencia artificial que responde a tus clientes, captura ventas y automatiza tu operación. Tú diriges tu negocio; nosotros nos encargamos de lo técnico.
> **CTA primario (visible sin scroll):** Pedir mi auditoría gratuita →
> **CTA secundario:** Ver cómo funciona ↓

- El eslogan "THE MOMENT ISNOW" **no se elimina**: baja a elemento de marca (animación sutil sobre el H1, firma del footer, intro de video). La marca respira; la promesa vende.
- El video-intro se conserva como está (ya tiene skip, teclado y 1×/sesión), pero se propone **bypass automático para tráfico de pago** (si llega `utm_source`, no mostrar) — el clic de un ad debe aterrizar en la promesa, no en un portal.

### A2. Nueva sección "El problema" entre hero y propuesta de valor

Hoy el sitio arranca en la solución. Se inserta una sección corta de identificación (SPIN/Schwartz), con el estilo visual existente (cards del sistema bento):

> **Tag:** ¿Te suena?
> - "Respondes WhatsApps de clientes a las 11 de la noche."
> - "Pagas publicidad, llegan interesados… y nadie les da seguimiento a tiempo."
> - "Tu operación vive en tu cabeza, un Excel y tres cuadernos."
>
> **Puente:** No necesitas más horas. Necesitas un sistema que trabaje cuando tú no estás.

Este puente hace que los 3 pilares actuales (Presencia / Automatización / Agentes) se lean como respuesta y no como catálogo.

### A3. Pasada global de des-jerga (diccionario de traducción)

| Hoy | Propuesta | Dónde |
|---|---|---|
| "Construye Tu Entidad" | "Elige por dónde empezar" | services hero |
| "Workflows & Orquestación" | "Automatización de procesos" (sub: *tu operación en piloto automático*) | services tab 05 |
| "Inicia la Transmisión" | "Cuéntanos sobre tu negocio" | contact |
| "Nuestro equipo decodificará tus requerimientos" | "Te respondemos con un diagnóstico claro en menos de 24 horas" | contact |
| Botón "Enviar Transmisión →" | "Quiero mi auditoría gratuita →" | contact |
| "✓ TRANSMISIÓN RECIBIDA" | "✓ Recibido. Te escribimos en menos de 24 h" | contact |
| "✕ ERROR DE TRANSMISIÓN" | "✕ Algo falló. Escríbenos directo a sales@…" | contact |
| Nodos "Webhook → Filtrar IA → Cerrado" | "Llega un cliente → La IA lo atiende → Tú cierras la venta" | index bento 02 |
| "accuracy" / "ejecuciones" / "Leads cal." | "precisión" / "tareas completadas" / "clientes calificados" | index/services stats |
| "Stay Ahead" | "Mantente al día" | blog card |
| "All systems operational" | "Hecho con ❄ por Snow Tech" (o simplemente el copyright) | footer global |
| Serie "ESTADIO 01 · TETRAEDRO · 4 CARAS" | Se conserva SOLO como microdetalle visual (opacidad mínima, solo desktop) o se retira del flujo de lectura | index ×5 |

**Regla editorial permanente:** jerga solo en segundo nivel (tooltips, secciones "cómo lo hacemos", blog). Nunca en H1/H2, botones ni mensajes de estado. Test: si la dueña de una clínica dental de 55 años no lo entiende a la primera, se reescribe.

### A4. Narrativa traducida (no eliminada)

Presencia → Crecimiento → Autonomía se mantiene como estructura, pero cada fase gana un subtítulo en idioma cliente:

| Fase | Subtítulo propuesto |
|---|---|
| Presencia | **Te encuentran.** Web profesional + IA que atiende a todo el que llega. |
| Crecimiento | **Te compran.** Publicidad y seguimiento automático que convierten interesados en clientes. |
| Autonomía | **Funciona solo.** Tu operación diaria corre sin ti en el día a día. |

---

## 3. MOVIMIENTO B — CONSTRUIR LA CAPA DE CONFIANZA

### B1. Un caso real, aunque sea pequeño (prioridad absoluta, requiere acción de negocio)

- Elegir 1 cliente real (o proyecto piloto/pro-bono hecho a propósito para esto).
- Formato narrado: **quién es (nombre + foto/logo) → problema en sus palabras → qué se hizo → resultado medible → cita textual**.
- Sustituye la posición del primer "escenario" en index; los escenarios ficticios restantes se agrupan bajo un encabezado más claro: *"Así se ven los sistemas que diseñamos"* (manteniendo la nota de honestidad actual).
- **Mientras no exista:** retirar del copy principal las métricas ficticias (+300 %, +340 % ROI, 98.2 %) y reemplazar por beneficios verificables por lógica: *"Tu web contesta a las 3 a. m.; tú decides a quién llamar a las 9."*

### B2. Humanizar "Nosotros"

- Sección nueva en about.html: **foto del fundador, nombre, 3-4 líneas de historia real** (por qué existe Snow, para quién trabaja mejor).
- Repetir la cara en contact.html junto al formulario: *"Te responde [Nombre], fundador de Snow."* — un formulario con cara convierte más que un formulario anónimo.
- "Arquitectos del Futuro" puede quedarse como titular de sección, pero el cuerpo pasa de hablar de Snow a hablar del cliente (guía, no héroe).

### B3. Garantía explícita (inversión del riesgo)

Propuesta de fórmula (a decidir por negocio, ver §6):
> **"Entrega en fecha o no pagas el saldo."** Si tu web no está funcionando en la fecha acordada, el pago final se cancela.

Alternativas menores si esa asusta: "30 días de ajustes ilimitados incluidos" o "sin permanencia: cancelas cuando quieras". Cualquiera de las tres > nada. Ubicación: junto a cada CTA de contratación y en el FAQ.

### B4. Escasez racionalizada

"Solo 5 slots semanales · Respuesta en 24h" aparece hoy en 6+ puntos. Se reduce a **2 ubicaciones** (lead magnet de index y contact) y se hace creíble: idealmente dinámica ("Quedan 2 slots esta semana") vía SNOW_CONFIG; si no, al menos variada en redacción.

### B5. Blog fuera del nav (temporal)

Con 3 artículos "EN PREPARACIÓN", el item BLOG diluye autoridad. Se quita del menú (la página queda accesible por URL) y vuelve cuando existan 2-3 artículos reales orientados a la oferta — idealmente respondiendo preguntas de compra: *"¿Cuánto cuesta una página web con IA?"*, *"¿Qué puede (y qué no) automatizar un negocio pequeño?"* (principio They Ask You Answer: el contenido que vende es el que responde lo que el comprador ya se pregunta).

---

## 4. MOVIMIENTO C — EMPAQUETAR LA OFERTA

### C1. Ofertas con nombre y ancla de precio (resuelve los TODO de services.html)

Hormozi: una oferta nombrada con entregables concretos vale más que "servicios a medida". Propuesta de estructura (montos a definir por negocio):

| Paquete | Fase | Qué incluye (idioma cliente) | Ancla |
|---|---|---|---|
| **Snow Base** | Presencia | Web profesional + asistente IA que responde 24/7 + analítica instalada | desde $X |
| **Snow Ventas** | Crecimiento | Base + campañas de anuncios + seguimiento automático de cada interesado | desde $Y |
| **Snow Piloto Automático** | Autonomía | Ventas + automatización de tu operación diaria + agentes a medida | cotización tras auditoría |
- "desde $" ancla y califica sin comprometer: el precio exacto sigue saliendo de la auditoría.
- La Auditoría Gratuita se re-encuadra como **paso 1 universal**: *"Empieza gratis: te decimos qué fase necesitas y qué costaría — sin compromiso."*

### C2. Formulario de contacto guiado (micro-compromisos)

En vez del textarea en blanco ("un no-técnico no sabe qué escribir"):
1. **¿Qué describe mejor tu situación?** (select: No tengo web / Tengo web pero no genera clientes / Quiero automatizar mi operación / Otro)
2. **¿Tu negocio es…?** (select: Servicios / Comercio / Salud / Otro)
3. Nombre + email/WhatsApp
4. Mensaje opcional
Mismo endpoint, misma estética; solo cambia la carga cognitiva.

### C3. Activar los canales que ya están construidos

`SNOW_CONFIG` sigue vacío: el formulario cae a mailto:, y WhatsApp + calendario están ocultos. **Es el único punto donde la estrategia se vuelve binaria: sin esto, todo lo anterior convierte sobre un canal roto.** Decisión requerida: endpoint de formulario (Formspree/n8n), número de WhatsApp y URL de calendario (Cal.com/Calendly).

---

## 5. PLAN DE IMPLEMENTACIÓN (3 sprints)

### Sprint 1 — "Que se entienda" (1-2 días de trabajo, sin dependencias de negocio)
1. Hero nuevo de index + CTA visible (A1)
2. Pasada de des-jerga global (A3)
3. Sección "¿Te suena?" (A2)
4. Subtítulos de narrativa traducida (A4)
5. Blog fuera del nav (B5) · Escasez a 2 puntos (B4)
6. Retirar métricas ficticias del copy principal (B1 interim)

### Sprint 2 — "Que se crea" (requiere insumos de negocio)
7. SNOW_CONFIG completo: form real + WhatsApp + calendario (C3)
8. Foto + historia del fundador en about y contact (B2)
9. Garantía elegida y publicada (B3)
10. Formulario guiado (C2)

### Sprint 3 — "Que cierre" (requiere decisiones de negocio)
11. Paquetes nombrados con "desde $" (C1)
12. Primer caso real publicado (B1)
13. 2-3 artículos de blog orientados a compra → BLOG vuelve al nav
14. Bypass de intro para tráfico UTM (A1)

### Métricas para validar (con la analítica ya instalada — snowTrack)
- % de visitantes que pasan del hero (scroll a sección 1)
- Clics en CTA primario del hero (evento nuevo `hero_cta_click`)
- `lead_magnet_submit` y `contact_submit` por semana (línea base actual ≈ 0 por SNOW_CONFIG vacío)
- Tasa intro saltado vs completado (`intro_skipped`/`intro_completed`)

---

## 6. DECISIONES QUE SOLO EL NEGOCIO PUEDE TOMAR

| # | Decisión | Bloquea |
|---|---|---|
| 1 | Endpoint real de formulario + nº WhatsApp + URL calendario | Sprint 2 (C3) |
| 2 | Qué garantía se ofrece (entrega / ajustes / sin permanencia) | Sprint 2 (B3) |
| 3 | Foto, nombre e historia del fundador (¿quién da la cara?) | Sprint 2 (B2) |
| 4 | Precios ancla "desde $" por paquete | Sprint 3 (C1) |
| 5 | Qué cliente/proyecto será el primer caso real | Sprint 3 (B1) |

---

## 7. LO QUE ESTA PROPUESTA NO TOCA (a propósito)

- La identidad visual: partículas, video-intro, 3D, paleta, tipografía. Es el diferenciador.
- La arquitectura de un solo objetivo de conversión (auditoría gratuita).
- El dashboard de services con CTA contextual "Sistema detectado".
- El FAQ (solo se le suma la garantía).
- La estructura técnica (los pendientes de la auditoría de junio siguen en su propio plan).

*Sprint 1 es 100% ejecutable ya, sin ningún insumo externo. Con aprobación, se implementa directamente sobre el código.*

---
---

# ENFOQUE REFINADO — v2 (2026-07-09, con dirección del negocio)

Ajustes del propietario sobre la propuesta original, refinados para implementación.

## A-v2 · Hero con transición de frases (se implementa)

"THE MOMENT ISNOW" **se queda como H1**. Debajo, la línea de subtítulo rota con crossfade entre la firma y promesas concretas:

> TECH PARTNER → TU NEGOCIO ATENDIENDO Y VENDIENDO 24/7 → TUS REPORTES EN TIEMPO REAL → TU ASISTENTE IA SIEMPRE DISPONIBLE → TU OPERACIÓN EN PILOTO AUTOMÁTICO → (loop)

- Intervalo ~3.5 s, crossfade suave; con `prefers-reduced-motion` se muestra estática la primera promesa.
- Se añade **CTA primario en el hero** (→ `#lead-magnet`): "Pedir mi diagnóstico →".

## A-v2 · Sección de identificación (sin llamarse "dolores")

Se implementa entre hero y propuesta de valor con encabezado implícito:
> **Tag:** PUNTO DE PARTIDA · **H2:** "¿Dónde se te va el día?"
> 3 tarjetas: WhatsApps a las 11 pm / publicidad sin seguimiento / operación en la cabeza + Excel.
> **Puente:** "No necesitas más horas. Necesitas un sistema que trabaje cuando tú no estás."

**Nota técnica:** esto renumera las secciones de index (1→2 … 7→8) y obliga a actualizar el mapeo 3D en `main.js` (array shapes), `cube.js:143-145` (2→3), `partners.js:37-38` (5→6) y `shapes.js:85,96` (3‖6→4‖7, 2‖5→3‖6).

## B-v2 · Confianza
- **Blog se queda en el nav** (se organizará después). Solo se traduce "Stay Ahead".
- **Casos reales:** el negocio ya los está documentando → los escenarios actuales quedan como están hasta recibirlos; se retiran solo las métricas infladas del copy principal.
- Fundador/garantías: garantías entran con la capa de precios (abajo); foto/historia del fundador queda pendiente de insumos.

## C-v2 · Arquitectura de precios (COP) — decisión clave

La "Auditoría Gratuita" actual entra en conflicto con una auditoría de pago. Resolución:

| Nivel | Nombre | Precio | Rol |
|---|---|---|---|
| Lead magnet | **Diagnóstico Gratis** (express, respuesta en 24 h) | $0 | Sustituye a "Auditoría Gratuita" en todos los CTAs |
| Card 1 | **Auditoría Completa** — informe + roadmap + presupuesto exacto + sesión 1 h | **$300.000 único** | **Se abona 100 % a la implementación** (inversión sin riesgo) |
| Card 2 | **Implementación** por fases | Presencia **desde $1.900.000** · Crecimiento **desde $3.900.000** · Autonomía a medida | 30 días de ajustes incluidos |
| Mensual | **Soporte & Mantenimiento** | **desde $250.000/mes** | Sin permanencia |
| Mensual | **SEO Mensual** | **desde $450.000/mes** | Sin permanencia |
| Mensual | **Contenido Mensual** | **desde $450.000/mes** | Sin permanencia |

*(Montos ajustables en un solo lugar: sección de precios de services.html.)*

## Paquetes de trabajo (implementación por agentes)
1. **WP-1 · index.html + motor 3D:** hero rotador + CTA, sección "¿Dónde se te va el día?" + renumeración, des-jerga, FAQ de precios, CTAs renombrados.
2. **WP-2 · services.html:** hero, nombres de servicio en español (Marketing Digital, Embudos de Venta), sección de precios completa (auditoría + implementación + mensuales), garantías, fases con "desde $".
3. **WP-3 · contact/about/blog:** contact humanizado + formulario guiado (select de situación), about sin jerga, blog "Mantente al día", headers/footers canónicos en las 3 páginas.

