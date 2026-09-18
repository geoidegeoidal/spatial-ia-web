<div align="center">

# SPATIAL // GIS + IA BOOTCAMP

**De Analista SIG a Desarrollador Web de Aplicaciones Geográficas en la Nube.**

[![Status: Online](https://img.shields.io/badge/STATUS-ONLINE-ff2d78?style=flat-square&logo=opsgenie&logoColor=white)](#)
[![Zero Server](https://img.shields.io/badge/ARCHITECTURE-ZERO_SERVER-00ffcc?style=flat-square&logo=serverless&logoColor=white)](#)
[![100% Open Source](https://img.shields.io/badge/OPEN_SOURCE-100%25-ffe04a?style=flat-square&logo=github&logoColor=black)](#)

<br>

### [▶️ VER LA LANDING PAGE EN VIVO ◀️](https://geoidegeoidal.github.io/spatial-ia-web/)

<br>

</div>

```bash
> SYSTEM IDLE. WAITING FOR INPUT...
> LOADING OPENCODE... GENERATING UI FROM SPEC...
> TARGET_LOCKED. DEPLOYING DASHBOARD TO GITHUB PAGES... SUCCESS.
```

## 📡 ACERCA DEL TALLER

Este repositorio contiene el código de la landing page y el marco de trabajo central del Bootcamp **"Desarrollo de Aplicaciones Web Territoriales Asistido con IA"**.

A lo largo del taller, aprenderás a diseñar, programar y desplegar **dashboards territoriales interactivos en la nube** sin necesidad de servidores dedicados o configuraciones complejas, apoyándote de lleno en la Inteligencia Artificial (Antigravity IDE / OpenCode).

Todo 100% OpenSource y alojado sin costos operativos.

---

## 🗺️ SYLLABUS: LAS 3 SESIONES

### S01 / Fundamentos de IA y Spec-Driven Development
*   **¿Qué es un LLM?**: Cómo programar asistido por IA usando Antigravity IDE y OpenCode de forma gratuita.
*   **Ingeniería de Prompts**: Metodología Spec-Driven Development para escribir especificaciones claras y lograr código limpio y predecible.
*   **Generación de UI**: Del mockup al código HTML/Tailwind interactivo instantáneamente.

### S02 / Dashboards Territoriales y Web Mapping Reactivo
*   **Ecosistema Open Source**: Dominio de librerías como MapLibre GL JS y Leaflet, libres de costos.
*   **Ensamblaje ("Stitching")**: Integrando diseños generados en stitch.withgoogle.com con nuestro visor espacial.
*   **Reactividad**: Programando filtros espaciales interactivos que comunican el mapa con el dashboard.

### S03 / Análisis Espacial en el Navegador y Despliegue
*   **Geoprocesamiento Client-Side**: Implementación de Turf.js para cálculos espaciales (buffers, áreas) directo en el navegador del usuario.
*   **Manejo de Datos**: Técnicas de optimización de archivos GeoJSON para alto rendimiento.
*   **A Producción**: Despliegue gratuito y asegurado (HTTPS) a través de GitHub Pages.

---

## 💰 INVERSIÓN Y CUPOS

*   **Acceso General:** $30.000 CLP
*   **Pase Estudiantes:** $25.000 CLP (requiere comprobante de alumno regular)

*Incluye grabaciones de por vida, scripts, material de apoyo y certificado de participación.*

---

## 💻 STACK TECNOLÓGICO Y ESTÉTICA

La estructura visual de la landing page de este repositorio ha sido rediseñada con una estética vanguardista **"Neon Tokyo / Cyber-Brutalist"**.

- **Paleta de Colores:** Fondo abisal (`#0a0a12`), acentos fucsia neón (`#ff2d78`), cian eléctrico (`#00ffcc`) y alertas amarillo ácido (`#ffe04a`).
- **Comportamientos:** Cero *glassmorphism* genérico. Se emplean bordes duros asimétricos, tipografía sobredimensionada y sombras *glow* que reaccionan estrictamente a la interacción del usuario (`hover`/`focus`).
- **Arquitectura Zero-Build:** Construido en HTML Puro + TailwindCSS (vía CDN) + Vanilla JavaScript. Cero dependencias instaladas localmente (NPM-free).

---

## 📐 SPEC-DRIVEN DEVELOPMENT (OPENSPEC)

El desarrollo, evolución técnica y reglas de negocio de este repositorio están gobernados bajo el estándar **OpenSpec**:
- **Especificaciones Vivas:** Ubicadas en `openspec/specs/` (`landing-page`, `crm-automation`, `diploma-engine`, `deployment-ops`).
- **Matriz de Trazabilidad:** Documentada en [`openspec/specs/traceability-matrix.md`](openspec/specs/traceability-matrix.md), vinculando cada regla de negocio (`RULE-*`) con su implementación en código y tests.
- **Ciclo de Vida de Cambios:** Todo cambio significativo opera bajo el flujo canónico **Propose → Apply → Verify → Archive** alojado en `openspec/changes/` y `openspec/archive/`.

### Verificación local

### Sitio V5 — Hydra (Territorios Imposibles)

La página principal `index.html` adopta el diseño Hydra elegido: Geist Pixel / Manrope / Space Mono, negro y naranja, relieve de partículas reactivo que se transforma en esfera con scroll y transiciones accesibles. `preview_v5.html` redirige a ella. Se preservan todas las secciones: capacidades, tres módulos completos, metodología y detalles, tecnologías, instructor, precios/convocatoria, cuatro preguntas frecuentes y footer.

Foto en color y perfil de Jorge Ulloa Roa ampliado, manteniendo biografía previa, roles actuales, portafolio y LinkedIn. Fechas: 16–18 octubre de 2026, 20:00–21:30 (Santiago); $35.000 CLP general / $30.000 CLP estudiantes, USD referencial fechado. Programa: agentes/SDD/OpenSpec, MapLibre/GeoJSON, Turf.js, Chart.js, exportación y GitHub Pages. Inscripciones cerradas, sin formulario público; cobro internacional y CRM pendientes.

Archivos: `index.html`, `assets/site.css`, `assets/motion.js`, `assets/motion.css`, `assets/instructor.jpg`. HTML/CSS/Canvas nativos, sin compilación ni nuevas dependencias de producción. **Hydra aplicado localmente; aún no desplegado.** Inventario y verificación: [`2026-09-18-promote-hydra-official`](openspec/archive/2026-09-18-promote-hydra-official/proposal.md).

Alcance y preparación operativa: [`openspec/changes/prepare-v5-and-close-v4/proposal.md`](openspec/changes/prepare-v5-and-close-v4/proposal.md) y [`launch-checklist.md`](openspec/changes/prepare-v5-and-close-v4/launch-checklist.md).

### Analítica web — GoatCounter

Panel: https://julloar.goatcounter.com/. El script alojado de GoatCounter está integrado una vez en `index.html` para registrar visitas. V5 también mide clics en el CTA de interés, programa, portafolio y LinkedIn mediante atributos `data-goatcounter-click`; no recopila campos del formulario ni interpreta un clic como inscripción completada. La redirección `preview_v5.html` no genera un conteo adicional.

V5 publicada en GitHub Pages desde `gh-pages` (commit `5b1c4b1`). Verificación del 18/09/2026: visita desde la URL pública aceptada por GoatCounter con HTTP 200 y ruta `/spatial-ia-web/`. Se generó una visita real de comprobación; la visualización del panel privado queda disponible para el titular. Bloqueadores de contenido pueden impedir el seguimiento; visitas locales se excluyen por defecto del proveedor.

### Muestras de rediseño (HydraDB / Illoca)

Abrir directamente en el navegador; no requieren servidor ni compilación:
- [`proposals/01-hydra.html`](proposals/01-hydra.html): **Territorio en código**, relieve de partículas que responde al cursor y se transforma en esfera al desplazarse; banda móvil, entradas y diagramas progresivos. [Video](proposals/01-hydra-motion.webm).
- [`proposals/02-illoca.html`](proposals/02-illoca.html): **Cuaderno territorial**, cámara que recorre una maqueta 3D, edificios que se construyen por etapas y transición a una interfaz territorial. [Video](proposals/02-illoca-motion.webm).

Mueve el cursor sobre la escena y desplázate para recorrer las transformaciones. Illoca también permite saltar entre etapas mediante tres botones. Ambas tienen pausa visible, respeto a movimiento reducido y navegación por teclado. `assets/motion.js` y `assets/motion.css` son compartidos con la portada y usan Canvas/CSS nativos; detienen los bucles fuera de pantalla. Contenido y SVG de respaldo disponibles sin JavaScript. Fuentes abiertas de Google Fonts. Capturas `proposals/*-desktop.png`, `*-mobile.png` y `*-motion-start/middle/end.png`. Las muestras no tienen formulario ni analítica; Hydra ya fue seleccionado para portada.

Cambio inicial: [`2026-09-18-two-visual-redesigns`](openspec/archive/2026-09-18-two-visual-redesigns/proposal.md). Corrección de movimiento y evidencia: [`2026-09-18-redesign-motion`](openspec/archive/2026-09-18-redesign-motion/proposal.md).

Prueba de navegador (requiere Playwright y Microsoft Edge; en este entorno Playwright ya existe en la carpeta temporal):

```powershell
$env:NODE_PATH = Join-Path $env:TEMP 'opencode\node_modules'
node test_redesign_motion.cjs
node test_site_hydra.cjs
```

El primer test verifica las muestras y actualiza sus capturas. El segundo comprueba siete huellas del contenido oficial anterior, ampliación del perfil/foto, siete desplegables, menú móvil, módulos alineados, pausa/reduced-motion, fallback sin JS, redirect, rutas de assets y visita/cuatro eventos GoatCounter interceptados. Tamaños 320–1440 px, incluido 320×568. Para guardar capturas oficiales, definir `SPATIAL_CAPTURE_DIR` con una carpeta existente antes de ejecutarlo. No envía visitas de prueba a producción.

### Comandos de verificación

```bash
node test_redesign.js
node test_preview_v5.js
node test_crm_cupon.js
node test_crm_oferta.js
python test_generar_diplomas.py
```

<br>

<div align="center">
  <code>SYS.INIT_NEON_SWEEP(TRUE)</code> • <code>LAT: -33.4489</code> • <code>LON: -70.6693</code> • <code>ELEV: 570M</code>
  <br><br>
  <i>Diseñado y programado con asistencia de Inteligencia Artificial Avanzada</i>
</div>

