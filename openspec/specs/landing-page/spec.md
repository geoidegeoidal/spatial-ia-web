# Spec: Landing Page & UI Module (`landing-page`)

## 1. Propósito y Alcance
Define los estándares visuales, componentes de interfaz de usuario, arquitectura frontend y comportamiento reactivo de la landing page pública del Bootcamp Geo-IA.

---

## 2. Reglas de Negocio y Requisitos Técnicos

### `RULE-UI-001`: Estética Visual Superdesign (Dark Surrealist & Ethereal Motion)
- **Fondo base:** Obsidian Black (`#050505`) y contenedor de tarjetas en `#111111`.
- **Acentos:** Ember Orange (`#FF4500`), Soft Peach Glow (`#ffe0e0`), bordes sutiles `border-white/10`.
- **Tipografía V5:** `Chakra Petch` recta para títulos luminosos, `Inter` para lectura y `Space Mono` para datos; sin cursivas decorativas.
- **Efectos y Micro-animaciones:** Manos surrealistas flotantes, esfera cartográfica orbital, ruido analógico, entrada escalonada y revelación progresiva. Control de pausa, foco visible y respeto a `prefers-reduced-motion`. Tarjetas de programa alineadas, sin escalonamiento vertical permanente.

### `RULE-UI-002`: Arquitectura Zero-Server y Zero-Build
- La aplicación web se ejecuta 100% en el cliente sin requerir pipeline de compilación Node/Webpack local.
- Las librerías de estilos (TailwindCSS CDN), Iconify y fuentes se importan vía CDN oficial y Google Fonts.

### `RULE-UI-003`: Oferta y Programa V5
- **Pase General:** `$35.000 CLP`; **Estudiantes:** `$30.000 CLP`.
- **USD referencial:** 36,65 / 31,42, a 954,85 CLP/USD (dólar observado 17/09/2026, mindicador.cl); no son importes internacionales de cobro confirmados ni incluyen comisiones.
- **Fechas:** 16–18 octubre 2026, 20:00–21:30 America/Santiago (UTC−3), 4,5 horas en vivo. Cupos y pagos pendientes.
- **Programa:** Basado en PDF Workshop Geo IA del instructor: S01 agentes, SDD, contrato.md, KISS, HTML/Tailwind/Vanilla JS; S02 humedales urbanos, GeoJSON/EDA, MapLibre, fuentes/capas, filtros/popups y auditoría UI; S03 Turf buffers/disolución/intersecciones, exportación, simbología, Chart.js y filtrado cruzado, responsive, GitHub CLI/Pages, Stitch y hosting. Contenido avanzado como ejemplos guiados, sin promesa de implementación exhaustiva en 4,5 horas.

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

## 3. Componentes Clave

| Componente | Archivo Fuente | Descripción |
| :--- | :--- | :--- |
| **Hero & Surrealist Atmosphere** | `index.html` | Cabecera Chakra Petch, manos flotantes, esfera cartográfica y fechas V5 |
| **Franja de Capacidades** | `index.html` | IA, mapas interactivos, proyecto propio y publicación web |
| **Syllabus (3 Módulos en 3 Col)** | [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) | Desglose modular: M01 (IA & SDD), M02 (Web Mapping MapLibre), M03 (Turf.js & GitHub Pages Deploy) |
| **Instructor & Trayectoria** | [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) | Perfil de Jorge Ulloa Roa con enlace directo a LinkedIn y credenciales profesionales |
| **Matriz de Inversión** | `index.html` | General $35.000 CLP / estudiantes $30.000 CLP y conversión USD referencial |
| **Estado de Registro (#protocolo)** | [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) | Aviso de inscripciones V4 cerradas y próxima convocatoria V5 |

---

## 4. Criterios de Aceptación y Verificación
- [x] Validación visual en dispositivos móviles y de escritorio sin overflow horizontal.
- [x] Consola de desarrollador limpia de excepciones `TypeError` en todas las interacciones.
- [x] El sitio no expone un formulario operativo ni despacha inscripciones mientras la convocatoria está cerrada.
