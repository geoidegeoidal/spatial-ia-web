# Change Proposal: Apertura V4.0 y A/B Testing Estético (Terminal CLI)

## Contexto y Estrategia
Se prepara la convocatoria para el **Bootcamp Geo-IA Versión 4.0** (11, 12 y 13 de Septiembre de 2026, 20:00 a 21:30 hrs Chile).

Para evaluar la evolución de la identidad visual sin comprometer la versión actual en producción, se implementa una estrategia de **A/B Testing Local**:
- **Variante A (Control):** `index.html` (Estética Neon Tokyo / Cyber-Brutalist con paleta abisal, fucsia y amarillo neón).
- **Variante B (Candidata):** `terminal.html` (Estética Terminal CLI / Retro Mainframe Hacker con supremacía monospace, verde fósforo `#33ff00`, ámbar `#ffb000`, marcos `tmux` splits y overlay CRT scanlines).

Ambas variantes comparten el mismo temario, las mismas fechas oficiales de la Versión 4.0 y la integración funcional del formulario con el webhook de Google Apps Script.

---

## Alcance Técnico
1. **Fechas V4:** 11, 12 y 13 de Septiembre de 2026 (20:00 - 21:30 hrs Chile).
2. **Creación de `terminal.html`:** Implementación completa del sistema de diseño Terminal CLI.
3. **Barra de Alternancia A/B:** Selector superior interactivo para alternar y comparar ambas variantes en tiempo real.
4. **Formulario Activo:** Conexión semántica a `crm_script.gs` para capturar reservas de la cohorte V4.
