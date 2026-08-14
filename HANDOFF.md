# HANDOFF.md

## Handoff Log

### Session: 2026-08-14 — Replicación de Cierre V3, Diplomas PDF, Canva y Horas Lectivas/Prácticas
- **Objective:** Ajustar la intensidad horaria del diploma a 5 horas lectivas + 4 horas de práctica (9 hrs totales), e implementar filtro estricto en `enviarDiplomasYCierre()` para despachar diplomas y recursos (Drive + presentaciones en Canva `https://canva.link/workshop-gis-ia`) únicamente a filas con estado `"Accesos Enviados"`.
- **Completed Work:**
  - Actualización de `crm_script.gs` con `LINK_PRESENTACIONES_CANVA` y `LINK_GRABACIONES_DRIVE`, incorporando los bloques de Diploma PDF, Presentaciones web, Bóveda Google Drive e invitación a compartir en LinkedIn.
  - Configuración del filtro estricto: `if (estado === "Accesos Enviados" && email !== "")`.
  - Actualización sincronizada de plantillas visuales en [preview_final_bootcamp.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/preview_final_bootcamp.html) y [preview_correos.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/preview_correos.html).
  - Verificación local previa mediante `test_generar_diplomas.py` confirmando renderizado correcto de PDFs.
- **Decisions:** 
  - Condición estricta: `if (estado === "Accesos Enviados" && email !== "")`.
  - Transición a `"Diploma Enviado"` en la columna 8 tras despacho.
- **Commits & Deploy:** 
  - Commits `bc56f51` y `38c8ee3` enviados a `origin/master` y fusionados en `origin/gh-pages`.

---

### Session: 2026-08-07 — Actualización de Links Google Meet y Script CRM
- **Objective:** Actualizar los enlaces de Google Meet de las 3 sesiones del Bootcamp Geo-IA V3 en la plantilla de correo e implementar el script de automatización CRM (`crm_script.gs`) para el envío masivo de accesos a alumnos confirmados.
- **Completed Work:**
  - Creación del archivo de automatización Apps Script `crm_script.gs` con la lógica de filtrado de alumnos pagados/confirmados y envío vía GmailApp.
  - Actualización de los enlaces de videollamada en [preview_correos.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/preview_correos.html):
    - **Sesión 1 (Viernes 7, 20:00 - 21:30 hrs):** `https://meet.google.com/dkp-rpqg-ktc`
    - **Sesión 2 (Sábado 8, 20:00 - 21:30 hrs):** `https://meet.google.com/pgc-rmvk-dgj`
    - **Sesión 3 (Domingo 9, 20:00 - 21:30 hrs):** `https://meet.google.com/dos-fcdq-kee`
- **Commits & Deploy:** 
  - Commit `5d3585b` enviado a `origin/master` y a `origin/gh-pages` en `geoidegeoidal/spatial-ia-web.git`.

---

### Session: 2026-08-07 — Desactivación de Formulario e Inscripciones V4
- **Objective:** Desactivar el formulario web de inscripción y desplegar el aviso "Inscripciones cerradas, pronto comunicaremos la versión 4 del taller." de forma segura sin romper navegación ni scripts.
- **Completed Work:**
  - Actualización de `index.html` y `avantgarde.html` sustituyendo el elemento `<form>` por tarjeta estética informando cierre de inscripciones y preparación de la Versión 4.
  - Actualización de botones CTA en la navegación, sección principal (hero) y tarjetas de precios.
  - Protección y desacoplamiento del handler JS del formulario (`if (form)`) para garantizar que la ejecución de scripts (scroll suave, animaciones de intersección, efecto typewriter) permanezca intacta.
- **Decisions:** Mantener el identificador `#protocolo` en la sección de estado para preservar la funcionalidad de navegación por scroll suave.
- **Commits & Deploy:** 
  - Commit `e8cf4af` enviado a `origin/master`.
  - Rama `master` fusionada y subida a `origin/gh-pages` (commit `d1ca20d`).
  - Despliegue verificado en producción a través de GitHub Pages (`https://geoidegeoidal.github.io/spatial-ia-web/`).
- **Next Steps:** Anunciar el lanzamiento oficial de la Versión 4.0 cuando los contenidos estén definidos.
