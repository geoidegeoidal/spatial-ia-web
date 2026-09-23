# SPATIAL — GIS + IA Bootcamp

**Taller práctico para diseñar y publicar visores territoriales con apoyo de IA.**

[Ver la landing page](https://geoidegeoidal.github.io/spatial-ia-web/) · [Portafolio del instructor](https://julloa.space)

## El taller

La versión V5 combina desarrollo web geográfico, análisis espacial y un flujo de trabajo asistido por IA. El programa contempla **4,5 horas en vivo**, en tres sesiones.

### Programa

1. **Agentes y desarrollo guiado por especificaciones:** fundamentos, OpenSpec, KISS y generación de una interfaz web.
2. **Datos y cartografía web:** GeoJSON, exploración de datos, MapLibre, filtros, popups y revisión de interfaz.
3. **Análisis y publicación:** geoprocesos con Turf.js, exportación filtrada, simbología compartida, gráficos con Chart.js, diseño adaptable y publicación con GitHub Pages.

Las actividades se trabajan con ejemplos guiados; el tiempo disponible no equivale a una implementación avanzada completa de cada tema.

## Convocatoria V5

- **Fechas:** 16–18 de octubre de 2026.
- **Horario:** 20:00–21:30, hora de Santiago.
- **Valor en Chile:** $35.000 CLP general; $30.000 CLP estudiantes. El valor estudiante es solo para Chile.
- **Valor internacional general:** US$36.
- **Inscripción:** abierta en la [landing page](https://geoidegeoidal.github.io/spatial-ia-web/).

No hay códigos promocionales en V5. Fechas, valores y disponibilidad pueden cambiar; la landing es la referencia vigente.

## Esta aplicación

Este repositorio contiene la landing del taller, no una plataforma de cursos. El sitio es estático y publica sus archivos con GitHub Pages; la gestión de inscripciones usa un servicio externo separado. El formulario informa su estado solo después de recibir una respuesta válida.

La página oficial usa una escena Hydra ligera y accesible, con movimiento reducido, pausa y suspensión de animaciones fuera de pantalla. GoatCounter mide visitas y clics en algunos enlaces; no registra los campos del formulario.

## Desarrollo

La aplicación usa HTML, CSS y JavaScript, sin proceso de compilación. Para verla localmente, sirve la raíz del repositorio con un servidor HTTP estático. GitHub Pages publica desde la rama gh-pages.

- index.html: landing oficial.
- assets/: estilos, animación, registro y recursos de la página.
- preview_v5.html: redirección hacia la landing oficial.
- proposals/: muestras comparativas de rediseño; no incluyen el formulario ni analítica.
- openspec/: especificaciones, decisiones y trazabilidad.
- UX_AUDIT.md: revisión de experiencia y accesibilidad.

La guía de desarrollo y las reglas completas están en AGENTS.md. Las pruebas documentadas usan dobles locales; no se deben ejecutar envíos de prueba contra el CRM real.