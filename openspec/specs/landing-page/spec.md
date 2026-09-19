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
- **Pase general Chile:** `$35.000 CLP`; **Estudiantes:** `$30.000 CLP`, válido solo para Chile. Especificar la restricción junto al precio y en FAQ; no anunciar precio USD para estudiantes.
- **General internacional:** `US$36` vía PayPal, total verificado el 18/09/2026 en `https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU`, enlace confirmado por el usuario para V5. Sustituye las conversiones referenciales anteriores. Registro y cobros públicos se habilitan con el CRM V5 según `RULE-UI-004`.
- **Sin cupones:** V5 no ofrece cupones, códigos promocionales ni tarifas derivadas de `CONMAPAS`. El nombre ConMapas puede aparecer únicamente como parte de la trayectoria del instructor.
- **Fechas:** 16–18 octubre 2026, 20:00–21:30 America/Santiago (UTC−3), 4,5 horas en vivo. Cupos y pagos pendientes.
- **Programa:** Versión vigente de 50 páginas: S01 agentes, SDD/OpenSpec (Explore, Propose, Apply, criterios de aceptación y artefactos), KISS, HTML/Tailwind/Vanilla JS; S02 GeoJSON/EDA, MapLibre, fuentes/capas, filtros/popups y auditoría UI; S03 Turf buffers/disolución, exportación filtrada, fuente común de simbología/leyenda, Chart.js con estado de filtros compartido, responsive y GitHub CLI/Pages. No nombrar datasets o capas de práctica ni publicar/enlazar el PDF. Contenido avanzado como ejemplos guiados, sin promesa de implementación exhaustiva en 4,5 horas.

### `RULE-UI-004`: Estado de Inscripción y Guardrails del Formulario
- V4 permanece cerrada. La copia local de `index.html` contiene el formulario V5 conectado al endpoint independiente verificado; `preview_v5.html` redirige a ella.
- Enviar mediante `FormData`, bloquear dobles envíos y mostrar éxito solo si la respuesta JSON contiene `result === "success"`; HTTP 200 por sí solo no acredita una inscripción.
- Nombre, correo y profesión usan validación nativa. País, experiencia SIG y plan se envían con los nombres esperados por `crm_v5_script.gs`.
- Fuera de Chile se deshabilita el pase estudiantes, se selecciona general y se muestra US$36. No hay campos ni lógica de cupones.
- Los errores mantienen el formulario disponible y se anuncian mediante una región `aria-live`. El éxito oculta el formulario y mueve el foco a la confirmación.
- Esta integración está verificada localmente, pero no está publicada. Reabrir producción requiere autorización explícita y despliegue en `master`/`gh-pages`.

### `RULE-UI-005`: Selector de País Accesible
- Usar un listbox personalizado con banderas SVG Iconify `circle-flags:*`, porque los emoji de banderas no se muestran de forma fiable en Windows.
- Debe operar con ratón y teclado: abrir con flecha abajo, recorrer opciones con flechas, cerrar con Escape y devolver el foco al disparador tras seleccionar.
- Mantener sincronizados el valor oculto `country`, `aria-selected`, el precio general y la disponibilidad del pase estudiantes.

### `RULE-UI-006`: Analítica alojada GoatCounter
- Cargar una vez `https://gc.zgo.at/count.js`, async, con endpoint `https://julloar.goatcounter.com/count` en `index.html`. Redirección preview sin tracker.
- Eventos declarativos: `v5-interes-registro`, `v5-programa`, `v5-portafolio`, `v5-linkedin`. No enviar datos del formulario ni contar interés como inscripción.
- Verificación local con peticiones interceptadas; confirmar seguimiento público después del despliegue en GitHub Pages. Panel: https://julloar.goatcounter.com/.

---

### `RULE-UI-007`: Muestras alternativas de rediseño
- `proposals/01-hydra.html`: negro/naranja, tipografía pixelada, relieve de partículas reactivo y transformación a esfera con scroll, banda desplazable y transiciones, inspirada en HydraDB.
- `proposals/02-illoca.html`: papel cuadriculado/azul cobalto, recorrido de cámara por maqueta 3D, construcción progresiva y transición a interfaz, inspirada en Illoca.
- Hydra fue seleccionado y aplicado a `index.html`, regido ahora por `RULE-UI-001`. Illoca conserva sus tokens alternativos solo en la muestra. Publicación autorizada y verificada el 18/09/2026, commit `e4c423c`, Pages run `35364535749`.
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
| **Matriz de Inversión** | `index.html` | Chile general $35.000 CLP / estudiantes $30.000 CLP solo Chile; general internacional US$36 vía PayPal |
| **Formulario V5 (#protocolo)** | `index.html`, `assets/registration.js` | Alta V5 local, selector de país accesible, validación por plan y estados JSON; aún no publicado |
| **Detalles & FAQ** | `index.html` | Tres desplegables del programa y cuatro preguntas frecuentes, incluida certificación V4 |

---

## 4. Criterios de Aceptación y Verificación
- [x] Validación visual en dispositivos móviles y de escritorio sin overflow horizontal.
- [x] Consola de desarrollador limpia de excepciones `TypeError` en todas las interacciones.
- [x] El formulario V5 local exige JSON de éxito, bloquea dobles envíos y no envía datos durante pruebas de navegador.
- [x] V5 no muestra campos, mensajes ni lógica de cupones.
- [x] Siete bloques anteriores conservados por comparación de huellas; perfil ampliado sin perder párrafos previos. Foto, menú móvil, eventos y rutas de assets verificados.
- [x] Selector de país y restricción estudiantes-Chile verificados con teclado; layout sin overflow entre 320 y 1440 px.
