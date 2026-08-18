# Spec: Landing Page & UI Module (`landing-page`)

## 1. Propósito y Alcance
Define los estándares visuales, componentes de interfaz de usuario, arquitectura frontend y comportamiento reactivo de la landing page pública del Bootcamp Geo-IA.

---

## 2. Reglas de Negocio y Requisitos Técnicos

### `RULE-UI-001`: Estética Visual Superdesign (Dark Surrealist & Ethereal Motion)
- **Fondo base:** Obsidian Black (`#050505`) y contenedor de tarjetas en `#111111`.
- **Acentos:** Ember Orange (`#FF4500`), Soft Peach Glow (`#ffe0e0`), bordes sutiles `border-white/10`.
- **Tipografía:** `Playfair Display` (Serif de alto lujo para títulos y cursivas con resplandor etéreo), `Inter` (cuerpos de texto ligeros) y `Space Mono` (telemetría y reloj en vivo).
- **Efectos y Micro-animaciones:** Manos surrealistas 3D flotantes (`animate-float-left`, `animate-float-right`), overlay de ruido analógico `grainy-gradients.vercel.app/noise.svg`, revelación progresiva (`reveal`) y desvanecimiento vertical en scroll.

### `RULE-UI-002`: Arquitectura Zero-Server y Zero-Build
- La aplicación web se ejecuta 100% en el cliente sin requerir pipeline de compilación Node/Webpack local.
- Las librerías de estilos (TailwindCSS CDN), Iconify y fuentes se importan vía CDN oficial y Google Fonts.

### `RULE-UI-003`: Modelo de Precios y Cupos (Versión 4.0)
- **Pase General:** `$30.000 CLP` (acceso completo a las 3 sesiones en vivo, grabaciones de por vida, datasets, scripts y diploma oficial).
- **Pase Estudiantes:** `$25.000 CLP` (requiere acreditación de alumno regular).
- **Internacional:** Adaptado dinámicamente según selección del usuario a pasarela PayPal / MercadoPago Latam.

### `RULE-UI-004`: Estado de Inscripción y Guardrails del Formulario
- **Inscripciones Activas (Versión 4.0):**
  - Fechas oficiales: **11, 12 y 13 de Septiembre de 2026** (20:00 a 21:30 hrs Chile).
  - Todos los CTAs principales (Navbar, Hero, Planes de Precios) enlazan al formulario de captura `#protocolo`.
  - El elemento `<form id="contact-form">` captura y despacha datos de forma asíncrona hacia el webhook de Google Apps Script (`crm_script.gs`).
  - **Guardrail de Script:** La inicialización de scripts (`smooth scroll`, `IntersectionObserver`, efecto typewriter, selección de planes) comprueba la existencia de los elementos DOM (`if (form) { ... }`) para prevenir excepciones.

---

## 3. Componentes Clave

| Componente | Archivo Fuente | Descripción |
| :--- | :--- | :--- |
| **Hero & Surrealist Atmosphere** | [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) | Cabecera monumental con tipografía Playfair Display, reloj de Santiago en vivo y esculturas 3D flotantes |
| **Franja de Estadísticas** | [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) | Métricas de impacto social: +80 personas capacitadas, 10+ países en Latam, 4.9/5 satisfacción, 100% Zero-Server |
| **Syllabus (3 Módulos en 3 Col)** | [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) | Desglose modular: M01 (IA & SDD), M02 (Web Mapping MapLibre), M03 (Turf.js & GitHub Pages Deploy) |
| **Instructor & Trayectoria** | [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) | Perfil de Jorge Ulloa Roa con enlace directo a LinkedIn y credenciales profesionales |
| **Matriz de Inversión** | [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) | Comparativa de Pase General ($30.000 CLP) vs Pase Estudiante ($25.000 CLP) |
| **Protocolo de Registro (#protocolo)** | [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) | Formulario asíncrono con campos `super-input` conectado al CRM de Google Apps Script |

---

## 4. Criterios de Aceptación y Verificación
- [x] Validación visual en dispositivos móviles y de escritorio sin overflow horizontal.
- [x] Consola de desarrollador limpia de excepciones `TypeError` en todas las interacciones.
- [x] Envío reactivo del formulario con feedback inmediato al usuario ("¡Cupo Reservado con Éxito!").
