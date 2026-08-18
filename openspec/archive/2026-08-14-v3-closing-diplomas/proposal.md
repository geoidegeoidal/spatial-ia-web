# Change Proposal: Cierre V3, Diplomas PDF, Canva y Carga Horaria 9h

## Contexto y Motivación
Tras la culminación exitosa de las 3 sesiones del Bootcamp Geo-IA V3, es necesario generar los certificados oficiales de finalización en formato PDF, ajustar la intensidad académica a 9 horas totales (5 lectivas + 4 prácticas) y despachar el paquete completo de recursos (diapositivas web en Canva, bóveda Drive y llamado a compartir en LinkedIn) de forma automatizada mediante Apps Script.

---

## Cambios Propuestos
1. Ajuste de horas en la plantilla del diploma: "5 horas lectivas y 4 horas de práctica (9 hrs totales)".
2. Implementación de `enviarDiplomasYCierre()` en `crm_script.gs` con filtro estricto: `if (estado === "Accesos Enviados" && email !== "")`.
3. Inclusión del enlace interactivo de Canva: `https://canva.link/workshop-gis-ia`.
4. Renderizado vectorial y generación de Blob PDF vía `Utilities.newBlob(html).getAs("application/pdf")`.
5. Transición a estado `"Diploma Enviado"`.
