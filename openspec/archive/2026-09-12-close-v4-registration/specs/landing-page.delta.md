# Delta Spec: `landing-page` (2026-09-12)

## MODIFIED: `RULE-UI-004` Estado de inscripción y guardrails
- **Antes:** Formulario V4 activo con envío asíncrono al webhook de Google Apps Script.
- **Después:** Inscripciones V4 cerradas, formulario oculto e inerte, endpoint retirado y aviso visible de próxima Versión 5.
- Los CTA conservan navegación hacia `#protocolo`, donde se informa el cierre.
- El manejador de envío debe rechazar cualquier formulario marcado como cerrado.
