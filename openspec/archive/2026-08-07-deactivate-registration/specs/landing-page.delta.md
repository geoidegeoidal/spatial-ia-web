# Delta Spec: `landing-page` (2026-08-07)

## MODIFIED: Componente de Registro y Ancla `#protocolo`
- **Antes:** Formulario activo con campos `name`, `email`, `country`, `nivel_sig`, `ocupacion`, `plan` enviando datos vía `fetch` a Google Apps Script.
- **Después:** Tarjeta estática con diseño Cyberpunk informando el cierre de inscripciones de la V3 y preparación de la Versión 4.0.

## ADDED: `RULE-UI-004` (Guardrail de Script para Formulario)
- Se agrega el requisito de comprobar la presencia del elemento DOM (`if (form)`) antes de adjuntar el event listener para evitar bloquear la ejecución de scripts secundarios.
