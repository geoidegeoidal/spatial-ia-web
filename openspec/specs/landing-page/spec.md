# Spec: Landing Page & UI Module (`landing-page`)

## 1. Propósito y Alcance
Define los estándares visuales, componentes de interfaz de usuario, arquitectura frontend y comportamiento reactivo de la landing page pública del Bootcamp Geo-IA.

---

## 2. Reglas de Negocio y Requisitos Técnicos

### `RULE-UI-001`: Hydra — cartografía reactiva y tipografía pixelada
- **Fondo base:** Negro `#080909`, superficies `#111111`, bordes técnicos `#2b2d2b`.
- **Acento:** Naranja `#ff541c`; texto cálido `#f4f3ed`.
- **Tipografía V5/V6:** Geist Pixel (familia local `Pixel`), Manrope y Space Mono; recta, sin cursivas decorativas.
- **Movimiento central:** Relieve de 2.232 partículas reactivo al cursor que se transforma en esfera con scroll, banda móvil, titulares y diagramas progresivos. Sustituye la atmósfera y manos Superdesign por elección del usuario.
- **Accesibilidad y rendimiento:** Scroll nativo, pausa, reduced-motion, suspensión fuera de pantalla/pestaña oculta y SVG/HTML de respaldo. Foco de teclado revela el contenido inmediatamente. Hero usa `overflow:clip` para impedir desplazamiento horizontal interno al cambiar de viewport. Tarjetas alineadas. Sin blur ni blends.
- **Criterio UX:** Revisar cambios con las heurísticas de Laws of UX, incluyendo carga cognitiva, Hick, Fitts, Jakob, proximidad, región común, semejanza, atención selectiva, estética-usabilidad y regla de fin de pico. Ningún texto puede exceder su control o tarjeta entre 320 y 1440 px.
- **Integridad:** Conservar todas las secciones, desplegables, metadatos, enlaces e integraciones al cambiar el diseño. La foto del instructor es contenido; conservarla y ampliar su perfil solo con información respaldada. Verificación de siete bloques mediante huellas de texto en `test_site_hydra.cjs`.

### `RULE-UI-002`: Arquitectura Zero-Server y Zero-Build
- La aplicación web se ejecuta 100% en el cliente sin requerir pipeline de compilación Node/Webpack local.
- HTML/CSS/Canvas/JavaScript nativos; estilos en `assets/site.css`, movimiento compartido en `assets/motion.js` y `assets/motion.css`. Fuentes abiertas desde Google Fonts. Sin librería de animación o pipeline de compilación.

### `RULE-UI-003`: Oferta y Programa V6
- `index.html` presenta V6. La información de la edición no implica una inscripción habilitada: el formulario sigue inactivo. La publicación anterior V5 de `a16d7ce` se conserva como historia, no como la oferta vigente.
- **Pase general Chile:** `$35.000 CLP`; **Estudiantes:** `$30.000 CLP`, válido solo para Chile. Especificar la restricción junto al precio y en FAQ; no anunciar precio USD para estudiantes.
- **General internacional:** `US$36`; se mantienen los precios del vivo. **Solo grabaciones:** `$20.000 CLP` / `US$22` internacional, según el PayPal suministrado y verificado; no incluye sesiones en vivo. La tercera tarjeta ocupa el ancho de la grilla bajo los dos planes del vivo sin modificar los estilos compartidos.
- **Sin cupones:** V6 no ofrece cupones, códigos promocionales ni tarifas derivadas de `CONMAPAS`. El nombre ConMapas puede aparecer únicamente como parte de la trayectoria del instructor.
- **Fechas V6:** 13–15 noviembre 2026, 20:00–21:30 America/Santiago (UTC−3), 4,5 horas en vivo. Agenda visible e ISO, metadatos, navegación, hero, oferta, panel, FAQ y footer coherentes. No prometer disponibilidad inmediata de grabaciones, acceso permanente ni diploma.
- **Programa:** Versión vigente de 50 páginas: S01 agentes, SDD/OpenSpec (Explore, Propose, Apply, criterios de aceptación y artefactos), KISS, HTML/Tailwind/Vanilla JS; S02 GeoJSON/EDA, MapLibre, fuentes/capas, filtros/popups y auditoría UI; S03 Turf buffers/disolución, exportación filtrada, fuente común de simbología/leyenda, Chart.js con estado de filtros compartido, responsive y GitHub CLI/Pages. No nombrar datasets o capas de práctica ni publicar/enlazar el PDF. Contenido avanzado como ejemplos guiados, sin promesa de implementación exhaustiva en 4,5 horas.

### `RULE-UI-004`: Estado de Inscripción y Guardrails del Formulario
- `index.html` V6 conserva el registro inactivo: no contiene formulario, controles de alta, endpoint CRM, checkout directo ni carga de `assets/registration.js`. Funciona también sin JavaScript; `preview_v5.html` sigue redirigiendo a la página principal.
- Mantener `#registro` y `#protocolo` informativos. El panel comunica «Pronto inscripciones para la versión 6» y que el formulario aún no está habilitado, mostrando las fechas/precios ya confirmados, sin reserva ni lista de espera ficticias.
- No reutilizar el endpoint V5 ni ofrecer cobros que omitan el registro. Habilitar requiere el endpoint V6 y la preparación operativa correspondiente. Se preservan programa salvo sus tres fechas, perfil, movimiento y claves de analítica; interés no es una inscripción completada.
- `assets/registration.js` queda inactivo e intacto, con pruebas sobre `tests/fixtures/registration-v5.html`. El fixture usa `https://crm.invalid/registration`, nunca un CRM real: conserva validación nativa, payload `FormData`, JSON `result === "success"`, doble envío, país/plan, errores accesibles y foco de confirmación.
- Historia del cierre V5: no desactivó el Apps Script independiente ni alteró inscritos existentes. Publicado con autorización explícita en `a16d7ce`, `master`/`gh-pages`; Pages `39063676559` exitoso y HTML público idéntico al aprobado en `https://julloa.space/spatial-ia-web/`, verificado sin POST. La nueva publicación V6 del frontend tampoco activa el CRM.
- Historia: apertura publicada en `7dfc4c9`; rollback del aviso previo en `84d29a2`. Si se reutiliza el runtime, la confirmación conserva correo y Spam/Promociones sin añadir una alerta previa separada.

### `RULE-UI-005`: Selector de País Accesible
- Componente retenido e inactivo en la landing cerrada; su comportamiento se verifica en el fixture V5, no mediante un formulario público.
- Usar un listbox personalizado con banderas SVG Iconify `circle-flags:*`, porque los emoji de banderas no se muestran de forma fiable en Windows.
- Debe operar con ratón y teclado: abrir con flecha abajo, recorrer opciones con flechas, cerrar con Escape y devolver el foco al disparador tras seleccionar.
- Mantener sincronizados el valor oculto `country`, `aria-selected`, el precio general y la disponibilidad del pase estudiantes.

### `RULE-UI-006`: Analítica alojada GoatCounter
- Cargar una vez `https://gc.zgo.at/count.js`, async, con endpoint `https://julloar.goatcounter.com/count` en `index.html`. Redirección preview sin tracker.
- Eventos declarativos: `v5-interes-registro`, `v5-programa`, `v5-portafolio`, `v5-linkedin`. No enviar datos del formulario ni contar interés como inscripción.
- Las claves históricas permanecen estables en V6; solo los títulos legibles pasan a `V6:`. Interceptar todos los counts en las dos suites de navegador y bloquear cualquier solicitud de la landing a Apps Script.
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
| **Hero Hydra & partículas** | `index.html`, `assets/site.css`, `assets/motion.js`, `assets/motion.css` | Geist Pixel, relieve reactivo → esfera, fechas y CTA V6 |
| **Franja de Capacidades** | `index.html` | IA, mapas interactivos, proyecto propio y publicación web |
| **Syllabus (3 Módulos en 3 Col)** | [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) | Desglose modular: M01 (IA & SDD), M02 (Web Mapping MapLibre), M03 (Turf.js & GitHub Pages Deploy) |
| **Instructor & Trayectoria** | `index.html`, `assets/instructor.jpg` | Foto en color, perfil ampliado, dos roles actuales, portafolio y LinkedIn |
| **Matriz de Inversión** | `index.html` | Vivo CLP35.000/30.000 solo Chile estudiantes; general internacional US$36; solo grabaciones CLP20.000/US$22 |
| **Registro V6 inactivo (#protocolo)** | `index.html`; runtime inactivo `assets/registration.js` y fixture `tests/fixtures/registration-v5.html` | Aviso estático, CTA informativos y regresiones históricas sin endpoint real |
| **Detalles & FAQ** | `index.html` | Tres desplegables del programa y cuatro preguntas frecuentes, incluida certificación V4 |

---

## 4. Criterios de Aceptación y Verificación
- [x] Validación visual en dispositivos móviles y de escritorio sin overflow horizontal.
- [x] Consola de desarrollador limpia de excepciones `TypeError` en todas las interacciones.
- [x] La landing local no permite enviar inscripciones, tampoco sin JavaScript; el fixture conserva las pruebas de JSON y doble envío sin usar el CRM real.
- [x] V6 no muestra campos, mensajes ni lógica de cupones.
- [x] Siete huellas de contenido: strip/perfil intactos, programa intacto tras normalizar solo las tres fechas autorizadas y cuatro huellas actualizadas por el contenido V6. Foto, menú, eventos y rutas verificados.
- [x] Tres tarjetas, tercera de grabaciones a ancho completo, sin overflow a 1440/1024/768/390/320 px y con precios visibles sin JavaScript. Tests de nombre histórico `test_preview_v5.js` validan ahora el contenido local V6.
- [x] Selector de país y restricción estudiantes-Chile verificados con teclado en el fixture; landing cerrada y fixture sin overflow entre 320 y 1440 px.
