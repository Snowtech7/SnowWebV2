# PLAN DE DESPLIEGUE Y POSICIONAMIENTO
**Fecha:** 2026-07-11 · **Lente:** CTO, equipo pequeño, principio de menor resistencia, automatizar a mediano plazo

---

## PARTE 0 — DIAGNÓSTICO DE PUNTO DE PARTIDA

**El producto está listo para recibir tráfico; la fontanería no.**

| Estado | Detalle |
|---|---|
| Copy y oferta | ✅ Listo. Capa comercial v2 en producción: Diagnóstico Gratis → Auditoría $300k → Implementación desde $1.9M/$3.9M → mensuales. Lenguaje no-técnico. |
| Mobile/responsive | ✅ Corregido hoy (ver nota abajo) — había un bug de especificidad CSS que rompía 3+ secciones en móvil, **ya estaba en producción**. |
| Deploy | 🔴 **Desincronizado.** `origin/main` (lo que ve el público en `snowtech7.github.io`) está 3 commits detrás de tu rama local. El bug de las capturas que mandaste es del sitio EN VIVO ahora mismo. |
| Captura de leads | 🔴 `SNOW_CONFIG` vacío → el formulario cae a `mailto:`, sin WhatsApp, sin calendario, sin analytics. Cero visibilidad de qué pasa con el tráfico que llegue. |
| Dominio | ⚠️ Corriendo en `snowtech7.github.io/SnowWebV2` — sin marca propia, mala señal de credibilidad para un decisor B2B, peor para SEO. |
| Prueba social | 🔴 Casos ficticios (Velox, Nexis…) declarados como tal. Cero riesgo legal, pero cero conversión de confianza. |

**Nota técnica sobre el bug de las capturas:** la clase de Tailwind `.h-screen` (selector de clase, especificidad 10) le ganaba en cascada a la regla `section { height: auto }` (selector de elemento, especificidad 1) — por eso el "punto de partida" y "propuesta de valor" ya se veían bien (tenían `!important` explícito) pero "Proceso" y "Casos" seguían atrapados en 100vh fijo, con el contenido derramándose sobre la sección siguiente. Ya está corregido con `!important` en la regla general — beneficia a las 8 secciones de una sola vez, no solo a las dos que reportaste.

**Regla de oro para todo lo que sigue: no hay plan de tráfico que sobreviva a un funnel roto. Fase 0 no es opcional ni paralelizable — es bloqueante.**

---

## PARTE 1 — FASE 0: FONTANERÍA (1-2 días, costo ≈ $0, bloqueante)

Nada de esto es "marketing" — es la diferencia entre gastar esfuerzo en tráfico que se pierde vs. tráfico que se puede medir y cerrar.

1. **Deploy real.** `git push` de lo que ya está commiteado + commitear el trabajo de hoy (video/rotador + fix mobile), y confirmar visualmente en `snowtech7.github.io` que las 8 secciones cargan bien en un celular real, no solo en el preview.
2. **Dominio propio.** Si no lo tienes, comprar `snowtech.io` o similar (~$12/año) y apuntarlo a GitHub Pages (CNAME, 10 min de trabajo). Sin esto, cualquier peso que metas en LinkedIn/ads pierde credibilidad y no compone SEO a tu nombre.
3. **`SNOW_CONFIG` — el único bloqueante real de negocio:**
   - **Form endpoint:** usar **n8n** (webhook → guarda en Airtable/Google Sheets → notifica por WhatsApp/Slack), no Formspree. Es la opción de menor resistencia real: ya es tu producto, ya sabes usarlo, y de paso queda como demo interno de "así es como automatizamos" — lo puedes enseñar en una llamada de ventas.
   - **WhatsApp Click-to-Chat:** un link `wa.me/<numero>?text=...`, cero infraestructura. Actívalo — para PYME LATAM, WhatsApp convierte 2-3× mejor que un formulario frío.
   - **Analytics:** **Plausible** (o Umami self-hosted si quieres $0 recurrente) en vez de GA4 — un script, sin banner de cookies, dashboard legible en 30 segundos. Los eventos (`snowTrack`) ya están instrumentados en el código, solo falta conectar el script.
   - **Calendario:** Cal.com (gratis, self-hostable después) para el botón "Agendar llamada" que ya existe en el código pero está oculto por falta de config.

**Al terminar Fase 0 vas a poder responder, por primera vez: "¿cuántas personas llegaron esta semana y cuántas pidieron el diagnóstico?"** Sin esto, cualquier canal de tráfico que actives es una caja negra.

---

## PARTE 2 — FASE 1: TRÁFICO, ORDENADO POR MENOR RESISTENCIA

Para equipo pequeño y ticket B2B alto (no es venta de impulso), el orden de esfuerzo/retorno es distinto al de e-commerce. Prioriza así:

### 1. LinkedIn del fundador/CTO — el canal de mayor apalancamiento, costo $0
Un decisor de PYME no le compra a una cuenta de empresa sin cara; le compra a una persona que le entendió el problema. Además esto resuelve de paso el hallazgo de la auditoría de ventas ("cero seres humanos visibles en el sitio").
- 2-3 posts/semana, formato "build in public": una automatización que armaste, un error de negocio que resolviste con un flujo, un antes/después de cliente (cuando existan casos reales).
- Cero presupuesto, cero herramienta nueva. Solo cadencia.
- Cada post con buen alcance = tráfico directo a `contact.html?service=` (ya tienes el prellenado funcionando).

### 2. Red cálida + WhatsApp directo — segundo canal de $0
- Lista de 20-30 contactos (ex-colegas, otros founders, agencias no-competidoras) → mensaje directo personalizado, no masivo, pidiendo feedback del sitio (excusa perfecta para reabrir la conversación) o referidos.
- Esto es literalmente gratis y es el canal de mayor tasa de cierre que vas a tener mientras no hay marca.

### 3. Google Business Profile — SEO local, 20 minutos, $0
- Alta inmediata: aparece en búsquedas "agencia automatización [ciudad]" sin esperar meses de SEO orgánico. Para equipo chico es la relación esfuerzo/resultado más alta de todo el plan.

### 4. Blog — reutilizar, no crear contenido nuevo
- El blog ya existe en el nav pero está vacío ("en preparación" ×3). **No lo llenes desde cero** — cada post de LinkedIn que funcione, conviértelo en artículo (mismo contenido, dos canales, sin trabajo extra). Esto es automatizable después: un flujo de n8n que tome el texto de LinkedIn y genere el borrador del post del blog.
- SEO orgánico compone en meses, no semanas — trátalo como inversión de fondo, no como canal primario mientras el equipo es pequeño.

### 5. Ads pagados (Meta/Google) — deliberadamente al final
- No metas presupuesto pago a un funnel que todavía no has validado con tráfico orgánico/gratis. Actívalo recién cuando tengas 5-10 diagnósticos solicitados por semana de forma orgánica y sepas que el mensaje convierte — ahí sí, escalar con plata tiene sentido y no antes.

**Lo que deliberadamente NO se recomienda ahora:** mantener 4 redes sociales simultáneas, o community management. Con equipo chico, un canal bien sostenido (LinkedIn) gana contra cinco canales abandonados a las 3 semanas.

---

## PARTE 3 — FASE 2: AUTOMATIZAR EL FUNNEL (mediano plazo)

Esto es donde el negocio empieza a "comerse su propia comida" — el motor de leads se construye con el mismo stack que venden.

1. **Intake automático:** formulario → webhook n8n → guarda en Airtable/Sheets → notifica por WhatsApp/Slack al instante. Ya es casi gratis de construir dado que Fase 0 deja el webhook andando.
2. **Calificación automática:** el select de "¿qué describe mejor tu situación?" que ya existe en `contact.html` alimenta un flujo simple: si eligió "Auditoría Completa $300k" → notificación de alta prioridad + link de pago; si eligió "no tengo web" → secuencia de nurture más larga.
3. **Agente IA propio en el sitio:** un chatbot simple (puede ser el mismo n8n + un LLM) respondiendo preguntas frecuentes y calificando visitantes 24/7 en el propio sitio. Doble función: convierte visitantes Y es la demo viva de "esto es lo que hacemos" — el producto se vende solo con el ejemplo.
4. **Reporting automático:** un flujo semanal que junte Plausible + submissions del form y mande un resumen por WhatsApp/email — cero tiempo manual revisando dashboards.

Cada uno de estos puntos, cuando esté armado, se convierte en contenido para el canal 1 (LinkedIn) — "así se ve nuestro propio funnel de leads, construido con lo mismo que le armamos a nuestros clientes". Es el loop más barato de credibilidad que existe para esta industria.

---

## PARTE 4 — LO QUE DESBLOQUEA TODO LO DEMÁS

**Casos reales.** Ya lo tienes en la lista de pendientes (los estás documentando). Es, con diferencia, la palanca de mayor impacto sobre conversión de todo este plan — más que cualquier canal de tráfico. Un caso real con nombre, cifra y cita textual reemplazando a "Velox Finance" convierte más que triplicar el tráfico al funnel actual. Priorízalo sobre cualquier otra cosa de la Parte 2 en cuanto tengas el primer cliente cerrado.

---

## RESUMEN EJECUTABLE — orden real de ejecución

| # | Acción | Esfuerzo | Costo | Bloqueante |
|---|---|---|---|---|
| 1 | Commit + push del trabajo pendiente, confirmar en producción | 30 min | $0 | Sí |
| 2 | Dominio propio + CNAME | 30 min | ~$12/año | No, pero recomendado antes de Fase 1 |
| 3 | n8n webhook para el form + WhatsApp click-to-chat | 2-3 h | $0 | Sí — es el 100% de los leads hoy |
| 4 | Plausible + conectar `snowTrack` | 1 h | $0-9/mes | Sí — sin esto no hay forma de medir nada de lo que sigue |
| 5 | Cal.com para "Agendar llamada" | 30 min | $0 | No |
| 6 | Google Business Profile | 20 min | $0 | No |
| 7 | Cadencia LinkedIn (2-3×/semana) | continuo | $0 | No |
| 8 | Red cálida / WhatsApp directo | 1-2 h una vez | $0 | No |
| 9 | Primer caso real documentado | depende del cliente | $0 | No, pero máxima prioridad en cuanto exista |
| 10 | Ads pagados | — | — | Explícitamente después de validar orgánico |

*Informe de referencia local. No commiteado hasta confirmación.*
