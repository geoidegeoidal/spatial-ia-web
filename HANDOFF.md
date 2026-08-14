# HANDOFF.md

## Handoff Log

### Session: 2026-08-14 — Replicación de Lógica de Cierre V2 para V3 (Diploma PDF y Email de Insumos)
- **Objective:** Replicar y adaptar la automatización del cierre del Bootcamp implementada en la V2 para la actual V3, generando diplomas oficiales en PDF de alta fidelidad vía Google Apps Script y despachando correos con los recursos y acceso permanente a la bóveda.
- **Completed Work:**
  - Implementación de `generarDiplomaHtml(nombreAlumno, fechaEmision)` y `enviarDiplomasYCierre()` en [crm_script.gs](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/crm_script.gs) utilizando `Utilities.newBlob().getAs('application/pdf')` con adjunto automático y transición de estado a `"Diploma Enviado"`.
  - Actualización de [preview_final_bootcamp.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/preview_final_bootcamp.html) con estética dark high-tech para la V3, link oficial de Drive (`LINK_GRABACIONES_DRIVE`) y fecha de emisión (Agosto 2026).
  - Integración de la sección "9. CORREO DE CIERRE Y DIPLOMA OFICIAL" en [preview_correos.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/preview_correos.html) junto con la corrección del link maestro de grabaciones.
- **Decisions:** 
  - La generación de certificados se realiza puramente en el runtime de Google Apps Script convirtiendo la plantilla HTML/CSS a Blob PDF sin requerir servicios externos ni APIs de terceros.
  - El filtrado contempla estados `"Carpeta Grabaciones Enviada"`, `"Accesos Enviados"`, `"Tutorial Enviado V3"` y `"Pagado"` para asegurar cobertura total de alumnos que completaron el taller.
- **Commits & Deploy:** 
  - Commit `c46047b` en `master`.

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
