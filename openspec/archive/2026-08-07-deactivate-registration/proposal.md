# Change Proposal: Desactivación de Formulario e Inscripciones V4

## Contexto y Motivación
Con el cupo de la Versión 3 completado, es necesario inhabilitar la captura directa de postulaciones en la landing page y notificar a los visitantes del próximo lanzamiento de la Versión 4.0, garantizando que los scripts de navegación por anclas no colapsen.

---

## Cambios Propuestos
1. Reemplazo del formulario `<form id="bootcamp-form">` por una tarjeta estética de aviso de inscripciones cerradas.
2. Actualización de textos en botones CTA a "Inscripciones Cerradas / Próximamente V4".
3. Desacoplamiento seguro del evento submit (`if (form)`) en el bloque de JavaScript.
4. Mantenimiento del contenedor `#protocolo` para evitar roturas de enlaces de scroll.
