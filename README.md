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
- **Inscripción V6:** en preparación. El formulario todavía no está habilitado en la [landing page](https://geoidegeoidal.github.io/spatial-ia-web/).

Las fechas y valores corresponden a V6. Se mantienen los precios del vivo y se añade la opción de grabaciones. No hay códigos promocionales. El registro requiere su endpoint V6 y preparación operativa; no se reutiliza el endpoint V5 ni se ofrecen enlaces de cobro antes de registrar la compra.

## Esta aplicación

Este repositorio contiene la landing del taller, no una plataforma de cursos. El sitio es estático y publica sus archivos con GitHub Pages. La página V6 muestra fechas, precios y opciones de participación; el formulario sigue inactivo. El servicio externo de gestión se mantiene separado y no se modifica con esta publicación del frontend.

La página oficial usa una escena Hydra ligera y accesible, con movimiento reducido, pausa y suspensión de animaciones fuera de pantalla. GoatCounter mide visitas y clics en algunos enlaces; no registra los campos del formulario.

## Desarrollo

La aplicación usa HTML, CSS y JavaScript, sin proceso de compilación. Para verla localmente, sirve la raíz del repositorio con un servidor HTTP estático. GitHub Pages publica desde la rama gh-pages.

- index.html: landing oficial.
- assets/: estilos, animación, recursos y runtime histórico de registro inactivo en la página.
- preview_v5.html: redirección hacia la landing oficial.
- proposals/: muestras comparativas de rediseño; no incluyen el formulario ni analítica.
- openspec/: especificaciones, decisiones y trazabilidad.
- UX_AUDIT.md: revisión de experiencia y accesibilidad.

La guía de desarrollo y las reglas completas están en AGENTS.md. Las pruebas documentadas usan dobles locales y un fixture sin destino real; no se deben ejecutar envíos de prueba contra el CRM real.

La actualización V6 conserva Hydra y las claves históricas de analítica. `node test_preview_v5.js` mantiene su nombre histórico y valida la información V6; `node test_site_hydra.cjs` y `node test_registration_v5.cjs` verifican escritorio/móvil, teclado y respaldo sin JavaScript con solicitudes de prueba interceptadas. Evidencia del cambio: [OpenSpec V6](openspec/archive/2026-10-22-prepare-v6-frontend/verification.md).
