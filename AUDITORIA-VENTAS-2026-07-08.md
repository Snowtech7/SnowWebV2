# AUDITORÍA 360 — LENTE DE VENTAS Y PERSUASIÓN
**Fecha:** 2026-07-08 · **Foco:** cómo se muestra la información a un público objetivo NO técnico
**Complementa a:** AUDITORIA-2026-06-10.md (técnica/CRO). Este informe no repite fontanería; evalúa mensaje, copy y persuasión.

---

## PARTE 1 — SÍNTESIS: los principios de venta según los 5 libros de referencia

### 1. *Building a StoryBrand* — Donald Miller
- **El cliente es el héroe; la marca es el guía.** El sitio debe hablar de la transformación del cliente, no de la genialidad de la empresa.
- **"Si confundes, pierdes."** La claridad vende más que la creatividad. Nadie compra lo que no entiende en 5 segundos.
- **Grunt test:** en 5 segundos cualquier visitante debe poder responder: ¿qué ofreces? ¿cómo mejora mi vida? ¿qué hago para comprarlo?

### 2. *Influence* — Robert Cialdini
- **Prueba social:** personas reales, con nombre y cara, diciendo que funcionó. Es el multiplicador de confianza nº 1 en B2B.
- **Autoridad:** credenciales, equipo visible, experiencia demostrable.
- **Reciprocidad:** dar valor gratis primero (la Auditoría Gratuita es exactamente esto — bien).
- **Escasez:** funciona solo si es creíble y verificable; repetida en exceso se percibe como truco.
- **Compromiso y coherencia:** micro-compromisos progresivos (formulario corto → llamada → propuesta).

### 3. *$100M Offers* — Alex Hormozi
- **Ecuación de valor:** Valor = (Resultado soñado × Probabilidad percibida de lograrlo) ÷ (Tiempo de espera × Esfuerzo/sacrificio).
- La palanca más descuidada es la **probabilidad percibida**: pruebas, garantías, casos.
- **Inversión del riesgo:** garantías explícitas. El miedo a equivocarse es el freno nº 1 del comprador PYME.
- **Nombrar la oferta:** una oferta con nombre y entregables concretos vale más que "servicios a medida".

### 4. *Made to Stick* — Chip & Dan Heath
- **La maldición del conocimiento:** el experto olvida cómo suena su jerga para el que no sabe. Es el error central de los sitios técnicos.
- **Concreto > abstracto:** "te ahorras 20 horas a la semana" vende; "orquestación de workflows" no.
- **Historias:** un caso narrado (problema → intervención → resultado) se recuerda; una lista de features no.

### 5. *Breakthrough Advertising* — Eugene Schwartz
- **Niveles de conciencia del mercado:** el mensaje debe encontrar al comprador donde está. Un dueño de negocio no técnico es *consciente del problema* ("pierdo clientes, no doy abasto"), NO *consciente de la solución* ("necesito agentes IA con scoring de leads").
- Hablarle a alguien problema-consciente con lenguaje solución-consciente = hablarle en otro idioma.

**Menciones honrosas aplicadas en este informe:** *SPIN Selling* (vender el problema antes que la solución) y *Don't Make Me Think* (cero carga cognitiva en el camino a la conversión).

---

## PARTE 2 — DIAGNÓSTICO GLOBAL

**Tu intuición es correcta y los cinco marcos la confirman:** el sitio tiene una identidad visual sólida e innovadora, pero **le vende a la persona equivocada**. Está escrito para alguien que ya sabe qué es un funnel, un webhook y un agente IA — es decir, para ustedes mismos o para un CTO. El público declarado (dueños de negocio no técnicos) aterriza en un universo de "entidades digitales", "transmisiones" y "tetraedros" que exige traducción mental constante. Y el que traduce, no compra.

| Dimensión (lente) | Nota | Diagnóstico en una línea |
|---|---|---|
| Claridad del mensaje (StoryBrand, grunt test) | 3/10 | El hero no dice qué hacen, para quién ni qué gano yo |
| Lenguaje para no técnicos (Made to Stick) | 3/10 | Maldición del conocimiento en headlines, botones y metáforas |
| Prueba social y autoridad (Cialdini) | 2/10 | Cero testimonios reales, cero humanos visibles, casos declarados ficticios |
| Oferta y riesgo (Hormozi) | 5/10 | Buen lead magnet; pero sin precios ancla, sin garantía, resultado soñado abstracto |
| Nivel de conciencia (Schwartz) | 3/10 | Copy solución-consciente para un mercado problema-consciente |
| Arquitectura del funnel (CRO) | 6/10 | Un solo objetivo de conversión, prellenados, CTA contextual — la mecánica está bien |

**Veredicto:** el problema NO es el diseño (activo diferenciador, conservar). Es que **la capa de significado está optimizada para impresionar, no para que un no-técnico se entienda a sí mismo en ella.** El fix es 90% copywriting y prueba social, no rediseño.

---

## PARTE 3 — HALLAZGOS DETALLADOS

### 🔴 A. El hero de index falla el grunt test (StoryBrand)
`index.html:145-150` — "THE MOMENT ISNOW / TECH PARTNER".
- No responde qué ofrecen, para quién, ni qué gana el visitante. Es un eslogan de marca interna, en inglés, para una audiencia LATAM.
- **No hay CTA en el hero** — el primer botón visible es el del header. Los primeros 5 segundos, los más caros del sitio, no piden nada ni prometen nada.
- Encima, antes del hero hay un video-portal "TOCA PARA ENTRAR" (`index.html:60-70`): fricción ritual antes de saber siquiera dónde estoy. Para tráfico frío de pago es un peaje; para el visitante recurrente ya se salta (bien).
- **Recomendación:** mantener el eslogan como elemento de marca secundario, pero el H1 debe ser una promesa concreta. Ejemplo de dirección:
  - H1: *"Tu negocio atendiendo y vendiendo 24/7"*
  - Sub: *"Creamos tu web con IA que responde a tus clientes, captura ventas y automatiza tu operación — sin que tengas que entender nada técnico."*
  - Botón: *"Pedir mi auditoría gratuita →"* visible sin scroll.

### 🔴 B. Maldición del conocimiento en todo el vocabulario (Made to Stick + Schwartz)
El sitio exige un glosario. Ejemplos con ubicación:
- "Construye Tu **Entidad**" / "entidad autónoma" — `services.html:729-733`. Nadie busca "construir una entidad"; busca vender más o trabajar menos.
- "**Inicia la Transmisión**" / "Nuestro equipo **decodificará** tus requerimientos" / botón "**Enviar Transmisión →**" — `contact.html:74-75,151`. El botón más importante del sitio está escrito en clave de ciencia ficción. El botón debe nombrar el beneficio: *"Quiero mi auditoría gratuita"*.
- "ESTADIO 01 · TETRAEDRO · 4 CARAS" y toda la serie platónica — `index.html:170,270,286,354,454`. Metáfora de dirección de arte interna. Para el comprador es ruido que compite con el mensaje. Conservarla como detalle estético ultra-sutil o eliminarla del flujo de lectura.
- "Workflows & **Orquestación**" — `services.html:1154`. Título de servicio en jerga. Alternativa: *"Automatización de procesos: tu operación en piloto automático"*.
- Nodos "Webhook → Filtrar IA → Cerrado" — `index.html:221-226`. Visual de n8n para iniciados. Un no-técnico entiende mejor: *"Llega un cliente → la IA lo atiende → tú cierras la venta"*.
- Métricas en inglés/jerga: "accuracy", "ROAS", "Leads cal.", "ejecuciones" (`index.html:253`, `services.html:915,989`).
- Mezcla ES/EN sistemática: "Stay Ahead", "Growth Marketing", "Sales Funnels" conviven con copy en español. Elegir: términos comerciales en español con la etiqueta EN entre paréntesis si hace falta SEO.
- **Regla editorial sugerida (test de la abuela-empresaria):** si la dueña de una clínica dental de 55 años no entiende la frase a la primera, se reescribe. La jerga puede vivir en un segundo nivel (tooltips, secciones "cómo lo hacemos"), nunca en headlines ni botones.

### 🔴 C. Vacío casi total de prueba social y autoridad (Cialdini)
El freno de compra más grande del sitio hoy:
- Los casos son escenarios declarados ficticios: "Escenarios representativos… los KPIs son objetivos de diseño" (`index.html:357`). Honesto (bien hecho, era riesgo legal), pero deja al sitio **sin ninguna evidencia**: cero testimonios, cero logos reales, cero nombres, cero resultados verificables.
- Las métricas grandes (+300% conversión `index.html:198`, +340% ROI `index.html:254`, +60% tasa cierre `services.html:1077`) sin fuente ni caso adjunto **restan** credibilidad ante un decisor: se leen como números inventados — y hoy, además, lo son.
- `about.html` no tiene un solo ser humano: ni fundador, ni equipo, ni foto, ni historia real. "Arquitectos del Futuro" habla de la empresa como héroe (inversión exacta del principio StoryBrand). En servicios B2B de ticket alto, la gente le compra a gente.
- **Recomendaciones en orden de impacto:**
  1. **Un (1) caso real narrado** — aunque sea pequeño o pro-bono: cliente con nombre, problema en sus palabras, qué se hizo, resultado medible, cita textual. Un caso real > 3 escenarios perfectos.
  2. **Cara y nombre del fundador** en about y junto al formulario de contacto ("Te responde [Nombre], fundador").
  3. Testimonios aunque sean de proyectos previos individuales del equipo.
  4. Mientras no exista lo anterior: bajar las métricas invented del hero de la propuesta de valor y sustituir por beneficios cualitativos verificables ("tu web contesta de madrugada; tú decides a quién llamar por la mañana").

### 🟠 D. La oferta no cierra la ecuación de valor (Hormozi)
- **Resultado soñado:** formulado en abstracto ("evoluciona tu entidad digital") en vez de en la vida del cliente ("deja de perder clientes por no contestar", "recupera tus tardes").
- **Probabilidad percibida:** ver punto C — sin prueba, la probabilidad percibida es baja, y eso obliga al precio a bajar. 
- **Esfuerzo y sacrificio:** "Inversión a medida" ×3 (`services.html:1298,1312,1326` — los TODO siguen ahí). La ausencia total de ancla de precio genera ansiedad de "esto es carísimo" y filtra mal. Un "desde $X" por fase califica leads y ancla expectativas.
- **Riesgo:** no existe ninguna inversión del riesgo. Ni garantía, ni "sin permanencia", ni piloto de 30 días. Para una PYME que ya se quemó con agencias, esto es decisivo. Añadir una garantía concreta y honesta (p. ej. "si en X semanas la web no está entregada, no pagas el resto").
- **Lo que SÍ está bien (conservar):** la Auditoría Gratuita como oferta puente (reciprocidad pura), el prellenado GET → contact, la escasez "Solo 5 slots semanales" (aunque: aparece idéntica en 6 sitios — úsala en 2-3 puntos máximo y hazla verificable, p. ej. mostrando slots restantes, o perderá credibilidad), el CTA contextual "Sistema detectado" de services (patrón CRO genuinamente bueno), y el FAQ que maneja objeciones reales.

### 🟠 E. El sitio empieza en la solución, nunca en el problema (SPIN / Schwartz)
- No existe ninguna sección que verbalice el dolor del cliente en su idioma: "Contestas WhatsApps a las 11 pm", "Pagas ads pero nadie hace seguimiento", "Tu 'CRM' es un Excel". El visitante problema-consciente necesita leerse a sí mismo ANTES de que le hablen de la solución — eso crea la sensación de "esta gente me entiende" que precede a toda venta.
- **Recomendación:** insertar entre el hero y la propuesta de valor una sección de 3 dolores concretos (por nicho si es posible) → puente → los 3 pilares existentes. El bento actual (`index.html:164-262`) funciona bien como respuesta; le falta la pregunta.

### 🟡 F. Fricciones menores de conversión
- **Blog en nav con 3 artículos "EN PREPARACIÓN"** (`blog.html`): un item de navegación que desemboca en nada diluye autoridad. Sacarlo del nav hasta tener 2-3 artículos reales (los archivos pueden quedarse).
- **Formulario de contacto sin respaldo real:** sigue dependiendo de `SNOW_CONFIG` sin configurar (mailto: fallback, WhatsApp y calendario ocultos). Ya identificado en junio; sigue siendo el eslabón que convierte todo lo demás en decorado. Para un decisor B2B, agendar llamada directa convierte 2-3× más que un formulario.
- **contact.html pide "Mensaje" libre:** un no-técnico no sabe qué escribir. Mejor 2-3 selects guiados ("¿Qué describe mejor tu situación?") + campo opcional. Micro-compromisos (Cialdini) > página en blanco.
- **El footer dice "All systems operational"** y el copy global mantiene el registro de nave espacial hasta en los mensajes de error ("ERROR DE TRANSMISIÓN"). Encantador para techies; opaco para el resto. El tono puede ser futurista en lo visual y humano en lo verbal.

---

## PARTE 4 — PLAN PRIORIZADO (solo capa de mensaje; no toca diseño ni código estructural)

| # | Acción | Principio | Esfuerzo | Impacto |
|---|---|---|---|---|
| 1 | Reescribir hero de index: promesa concreta + CTA visible sin scroll | StoryBrand | 1-2 h | ★★★★★ |
| 2 | Conseguir y publicar 1 caso real narrado + cara del fundador | Cialdini | días (externo) | ★★★★★ |
| 3 | Pasada global de des-jerga: botones, títulos de servicio, contact ("Transmisión"→ humano) | Made to Stick | 3-4 h | ★★★★☆ |
| 4 | Sección "¿Te suena?" de 3 dolores antes de la propuesta de valor | SPIN/Schwartz | 2-3 h | ★★★★☆ |
| 5 | Garantía explícita + "desde $X" por fase (resolver los TODO de services) | Hormozi | decisión negocio | ★★★★☆ |
| 6 | Configurar SNOW_CONFIG (form real + WhatsApp + calendario) | — | 1 h | ★★★★★ |
| 7 | Retirar métricas ficticias del copy principal; dejar beneficios verificables | Cialdini | 1 h | ★★★☆☆ |
| 8 | Racionalizar escasez (2 puntos, verificable) y quitar Blog del nav | Cialdini | 30 min | ★★☆☆☆ |
| 9 | Serie platónica → detalle estético no textual (o solo desktop, opacidad mínima) | Made to Stick | 1 h | ★★☆☆☆ |

**Qué NO tocar:** la identidad visual inmersiva (partículas, video, 3D), la estructura de un solo objetivo de conversión, el dashboard de services con su CTA contextual, el FAQ, la narrativa Presencia → Crecimiento → Autonomía (solo traducirla: p. ej. "Te encuentran → Te compran → Funciona solo").

---

*Informe local de referencia, generado sobre el working tree actual (rama main con cambios sin commitear).*
