# SPATIAL — GIS + IA Bootcamp

**Taller práctico para diseñar y publicar visores territoriales con apoyo de IA.**

[Ver la landing page](https://geoidegeoidal.github.io/spatial-ia-web/) · [Portafolio del instructor](https://julloa.space)

## El taller

La versión V6 combina desarrollo web geográfico, análisis espacial y un flujo de trabajo asistido por IA. El programa contempla **4,5 horas en vivo**, en tres sesiones, con una opción de compra de solo grabaciones.

### Programa

1. **Agentes y desarrollo guiado por especificaciones:** fundamentos, OpenSpec, KISS y generación de una interfaz web.
2. **Datos y cartografía web:** GeoJSON, exploración de datos, MapLibre, filtros, popups y revisión de interfaz.
3. **Análisis y publicación:** geoprocesos con Turf.js, exportación filtrada, simbología compartida, gráficos con Chart.js, diseño adaptable y publicación con GitHub Pages.

Las actividades se trabajan con ejemplos guiados; el tiempo disponible no equivale a una implementación avanzada completa de cada tema.

## Convocatoria V6

- **Fechas:** 13, 14 y 15 de noviembre de 2026.
- **Horario:** 20:00–21:30, hora de Santiago.
- **Valor en Chile:** $35.000 CLP general; $30.000 CLP estudiantes. El valor estudiante es solo para Chile.
- **Valor internacional general:** US$36.
- **Solo grabaciones:** $20.000 CLP o US$22 por PayPal; no incluye sesiones en vivo.
- **Inscripción V6:** formulario con pase general, estudiantes solo Chile y solo grabaciones, conectado al servicio V6 verificado. La confirmación del pago sigue siendo manual.

Las fechas y valores corresponden a V6. Se mantienen los precios del vivo y se añade la opción de grabaciones. No hay códigos promocionales. El atributo `action` de `#registration-form` en `index.html` apunta al despliegue V6 versionado y comprobado con una inscripción individual y recepción confirmada por el propietario. No se reutiliza el destino V5 ni se ofrecen enlaces de cobro directos. Los materiales de entrega no son un requisito para abrir la inscripción.

## Esta aplicación

Este repositorio contiene la landing del taller, no una plataforma de cursos. El sitio es estático y publica sus archivos con GitHub Pages. El formulario V6 usa tres planes, precios según país y estudiantes solo para Chile; el servicio externo registra y envía instrucciones de pago, sin instalar activadores horarios. Sin JavaScript, o si el runtime no carga, el botón de envío permanece deshabilitado para no enviar un país predeterminado sin selección funcional.

La página oficial usa una escena Hydra ligera y accesible, con movimiento reducido, pausa y suspensión de animaciones fuera de pantalla. GoatCounter mide visitas y clics en algunos enlaces; no registra los campos del formulario.

## Desarrollo

La aplicación usa HTML, CSS y JavaScript, sin proceso de compilación. Para verla localmente, sirve la raíz del repositorio con un servidor HTTP estático. GitHub Pages publica desde la rama gh-pages.

- index.html: landing oficial.
- assets/: estilos, animación, recursos y runtime de registro compartido por V6 y el fixture histórico V5.
- preview_v5.html: redirección hacia la landing oficial.
- proposals/: muestras comparativas de rediseño; no incluyen el formulario ni analítica.
- openspec/: especificaciones, decisiones y trazabilidad.
- UX_AUDIT.md: revisión de experiencia y accesibilidad.

La guía de desarrollo y las reglas completas están en AGENTS.md. Las pruebas de registro usan dobles locales y fixtures V5/V6 con destinos reservados, nunca el CRM real. `tests/fixtures/registration-v5.html` permanece intacto; `tests/fixtures/registration-v6.html` replica el formulario nuevo. No se deben ejecutar envíos de prueba contra el CRM real.

La actualización V6 conserva Hydra y las claves históricas de analítica. Con Node, Playwright y Edge ya disponibles, las comprobaciones son `node --check assets/registration.js`, `node test_preview_v5.js`, `node test_registration_v5.cjs`, `node test_registration_v6.cjs` y `node test_site_hydra.cjs`. Cubren precios, payload, validación JSON, protección contra doble envío, recuperación sin borrar datos, teclado, móvil y respaldo sin JavaScript; las solicitudes CRM y los conteos de analítica están interceptados. Los nombres V5 se conservan por compatibilidad. Alcance: [delta de inscripción V6](openspec/archive/2026-10-23-v6-registration-activation/specs/landing-page.delta.md).
