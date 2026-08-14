# HANDOFF.md

## Handoff Log

### Session: 2026-08-14 — Replicación de Cierre V3, Diplomas PDF y Horas Lectivas/Prácticas
- **Objective:** Ajustar la intensidad horaria del diploma a 5 horas lectivas + 4 horas de práctica (9 hrs totales), e implementar y ejecutar una suite de prueba local para validar la compilación y renderizado de los diplomas en PDF.
- **Completed Work:**
  - Actualización de la intensidad horaria y descripción tanto en [crm_script.gs](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/crm_script.gs) como en [preview_final_bootcamp.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/preview_final_bootcamp.html).
  - Creación del script [test_generar_diplomas.py](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/test_generar_diplomas.py) para generación local automatizada de PDFs vía headless Chromium/Edge.
  - Verificación visual exitosa del PDF generado (`Diploma_GeoIA_V3_Jorge_Ulloa_Roa.pdf`), comprobando alineación, márgenes, tipografías Space Grotesk/Inter, badges de neón y sellos vectoriales.
- **Decisions:** 
  - La intensidad horaria se formalizó como `5 hrs lectivas + 4 hrs prácticas (9 hrs totales)`.
  - Se agregó `test_diplomas/` a `.gitignore` para mantener limpio el repositorio.
- **Commits & Deploy:** 
  - Pendiente de push a `origin/master` y `origin/gh-pages`.

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
