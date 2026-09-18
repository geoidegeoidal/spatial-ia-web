# Spec: Landing Page & UI Module (`landing-page`)

## 1. Propósito y Alcance
Define los estándares visuales, componentes de interfaz de usuario, arquitectura frontend y comportamiento reactivo de la landing page pública del Bootcamp Geo-IA.

---

## 2. Reglas de Negocio y Requisitos Técnicos

### `RULE-UI-001`: Hydra — cartografía reactiva y tipografía pixelada
- **Fondo base:** Negro `#080909`, superficies `#111111`, bordes técnicos `#2b2d2b`.
- **Acento:** Naranja `#ff541c`; texto cálido `#f4f3ed`.
- **Tipografía V5:** Geist Pixel (familia local `Pixel`), Manrope y Space Mono; recta, sin cursivas decorativas.
- **Movimiento central:** Relieve de 2.232 partículas reactivo al cursor que se transforma en esfera con scroll, banda móvil, titulares y diagramas progresivos. Sustituye la atmósfera y manos Superdesign por elección del usuario.
- **Accesibilidad y rendimiento:** Scroll nativo, pausa, reduced-motion, suspensión fuera de pantalla/pestaña oculta y SVG/HTML de respaldo. Foco de teclado revela el contenido inmediatamente. Hero usa `overflow:clip` para impedir desplazamiento horizontal interno al cambiar de viewport. Tarjetas alineadas. Sin blur ni blends.
- **Integridad:** Conservar todas las secciones, desplegables, metadatos, enlaces e integraciones al cambiar el diseño. La foto del instructor es contenido; conservarla y ampliar su perfil solo con información respaldada. Verificación de siete bloques mediante huellas de texto en `test_site_hydra.cjs`.

### `RULE-UI-002`: Arquitectura Zero-Server y Zero-Build
- La aplicación web se ejecuta 100% en el cliente sin requerir pipeline de compilación Node/Webpack local.
- HTML/CSS/Canvas/JavaScript nativos; estilos en `assets/site.css`, movimiento compartido en `assets/motion.js` y `assets/motion.css`. Fuentes abiertas desde Google Fonts. Sin librería de animación o pipeline de compilación.

### `RULE-UI-003`: Oferta y Programa V5
- **Pase General:** `$35.000 CLP`; **Estudiantes:** `$30.000 CLP`.
- **USD referencial:** 36,65 / 31,42, a 954,85 CLP/USD (dólar observado 17/09/2026, mindicador.cl); no son importes internacionales de cobro confirmados ni incluyen comisiones.
- **Fechas:** 16–18 octubre 2026, 20:00–21:30 America/Santiago (UTC−3), 4,5 horas en vivo. Cupos y pagos pendientes.
- **Programa:** Versión vigente de 50 páginas: S01 agentes, SDD/OpenSpec (Explore, Propose, Apply, criterios de aceptación y artefactos), KISS, HTML/Tailwind/Vanilla JS; S02 GeoJSON/EDA, MapLibre, fuentes/capas, filtros/popups y auditoría UI; S03 Turf buffers/disolución, exportación filtrada, fuente común de simbología/leyenda, Chart.js con estado de filtros compartido, responsive y GitHub CLI/Pages. No nombrar datasets o capas de práctica ni publicar/enlazar el PDF. Contenido avanzado como ejemplos guiados, sin promesa de implementación exhaustiva en 4,5 horas.

### `RULE-UI-004`: Estado de Inscripción y Guardrails del Formulario
- **Inscripciones Cerradas (Versión 4.0):**
  - `#registro` / `#protocolo` anuncian la próxima apertura V5.
  - Los CTA principales enlazan al aviso de cierre en `#protocolo` y no prometen una reserva activa.
  - No existe formulario ni endpoint de inscripción en la página pública. La reapertura exige su planilla y script independientes.
  - `index.html` es la landing V5 aprobada; `preview_v5.html` redirige a ella.

### `RULE-UI-006`: Analítica alojada GoatCounter
- Cargar una vez `https://gc.zgo.at/count.js`, async, con endpoint `https://julloar.goatcounter.com/count` en `index.html`. Redirección preview sin tracker.
- Eventos declarativos: `v5-interes-registro`, `v5-programa`, `v5-portafolio`, `v5-linkedin`. No enviar datos del formulario ni contar interés como inscripción.
- Verificación local con peticiones interceptadas; confirmar seguimiento público después del despliegue en GitHub Pages. Panel: https://julloar.goatcounter.com/.

---

### `RULE-UI-007`: Muestras alternativas de rediseño
- `proposals/01-hydra.html`: negro/naranja, tipografía pixelada, relieve de partículas reactivo y transformación a esfera con scroll, banda desplazable y transiciones, inspirada en HydraDB.
- `proposals/02-illoca.html`: papel cuadriculado/azul cobalto, recorrido de cámara por maqueta 3D, construcción progresiva y transición a interfaz, inspirada en Illoca.
- Hydra fue seleccionado y aplicado a `index.html`, regido ahora por `RULE-UI-001`. Illoca conserva sus tokens alternativos solo en la muestra. Publicación pendiente de solicitud explícita.
- Ambas mantienen oferta y programa V5, sin formularios, pagos, analítica ni publicación del material de clase. Enlaces cruzados, foco visible, desplegables nativos y adaptación 320–1440 px.
- El movimiento es central, no opcional en la interpretación de referencias. Implementación compartida en `assets/motion.js` y `assets/motion.css`, con scroll nativo, pausa visible, reduced-motion, suspensión fuera de pantalla/pestaña oculta y contenido/SVG de respaldo sin JavaScript.
- Verificación: `node test_redesign.js`, `node test_redesign_motion.cjs` (Playwright/Edge), comparación de estados y rendimiento documentada en `2026-09-18-redesign-motion`. Videos `proposals/*-motion.webm` y capturas escritorio/móvil/etapas.

## 3. Componentes Clave

| Componente | Archivo Fuente | Descripción |
| :--- | :--- | :--- |
| **Hero Hydra & partículas** | `index.html`, `assets/site.css`, `assets/motion.js`, `assets/motion.css` | Geist Pixel, relieve reactivo → esfera, fechas y CTA V5 |
| **Franja de Capacidades** | `index.html` | IA, mapas interactivos, proyecto propio y publicación web |
| **Syllabus (3 Módulos en 3 Col)** | [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) | Desglose modular: M01 (IA & SDD), M02 (Web Mapping MapLibre), M03 (Turf.js & GitHub Pages Deploy) |
| **Instructor & Trayectoria** | `index.html`, `assets/instructor.jpg` | Foto en color, perfil ampliado, dos roles actuales, portafolio y LinkedIn |
| **Matriz de Inversión** | `index.html` | General $35.000 CLP / estudiantes $30.000 CLP y conversión USD referencial |
| **Estado de Registro (#protocolo)** | [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) | Aviso de inscripciones V4 cerradas y próxima convocatoria V5 |
| **Detalles & FAQ** | `index.html` | Tres desplegables del programa y cuatro preguntas frecuentes, incluida certificación V4 |

---

## 4. Criterios de Aceptación y Verificación
- [x] Validación visual en dispositivos móviles y de escritorio sin overflow horizontal.
- [x] Consola de desarrollador limpia de excepciones `TypeError` en todas las interacciones.
- [x] El sitio no expone un formulario operativo ni despacha inscripciones mientras la convocatoria está cerrada.
- [x] Siete bloques anteriores conservados por comparación de huellas; perfil ampliado sin perder párrafos previos. Foto, menú móvil, eventos y rutas de assets verificados.
