# Spec: Motor de Certificación y Diplomas (`diploma-engine`)

## 1. Propósito y Alcance
Especifica los requerimientos de diseño, intensidad horaria, motor de renderizado HTML a PDF y proceso de distribución de los diplomas oficiales de finalización del Bootcamp Geo-IA.

---

## 2. Reglas de Negocio y Requisitos Técnicos

### `RULE-DIP-001`: Intensidad Horaria y Acreditación Académica
- **Horas Lectivas:** 5 horas cronológicas de cátedra sincrónica.
- **Horas Prácticas:** 4 horas de desarrollo de proyecto práctico y resolución de desafíos espaciales.
- **Total Acreditado:** **9 horas académicas totales**.
- **Texto Mandatorio:** *"Ha completado satisfactoriamente los módulos teórico-prácticos del Bootcamp Geo-IA V4 (5 horas lectivas y 4 horas de práctica), demostrando competencias en análisis espacial, programación web frontend, uso de MapLibre GL JS, geoprocesamiento client-side con Turf.js y arquitectura Zero-Server."*

### `RULE-DIP-002`: Estética y Formato Visual del Certificado
- **Orientación y dimensiones:** Formato A4 Landscape (`1040px × 700px`), fondo negro azabache (`#000000` / contenedor `#0A0A0A`).
- **Acentos y Bordes:** Esquinas angulares y detalles en Ember Orange (`#FF4500`), líneas guía sutiles en `#222222`.
- **Tipografías:** `Inter` (Bold) para nombres y títulos; `Space Grotesk` y `Space Mono` para descriptores y telemetría.
- **Sello de Certificación:** Sello circular rotado (-15°) con leyenda `GEO-IA / VERIFIED / V4.0`.
- **Firma:** Autorización y rúbrica del instructor *Jorge Ulloa Roa*.

### `RULE-DIP-003`: Motor de Renderizado Dual (Producción vs Local)
- **Producción (Google Apps Script):**
  - Generación dinámica vía `generarDiplomaHtml(nombreAlumno, fechaEmision)`.
  - Conversión vectorial a PDF mediante `Utilities.newBlob(html, "text/html", "diploma.html").getAs("application/pdf")`.
  - Sanitización de nombre de archivo: `Diploma_GeoIA_V4_Nombre_Estudiante.pdf`.
- **Entorno Local de Pruebas (Python):**
  - Scripts de emulación y validación previa: [generate_pdf.py](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/generate_pdf.py) y [test_generar_diplomas.py](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/test_generar_diplomas.py).

### `RULE-DIP-004`: Despacho de Correo de Cierre V4 (`enviarDiplomasYCierre`)
- **Filtro de Seguridad:** Únicamente alumnos cuyo estado sea estrictamente `"Accesos Enviados"` y cuenten con email válido.
- **Contenido del Paquete de Cierre:**
  1. PDF del diploma adjunto (emisión 14 de Septiembre de 2026).
  2. Enlace a la presentación interactiva de Canva (`https://canva.link/workshop-gis-ia`).
  3. Enlace permanente a la Bóveda de Grabaciones en Google Drive.
  4. Bloque de invitación a compartir en LinkedIn (`https://www.linkedin.com/in/jorge-ulloa-roa/`).
- **Transición de Estado:** Actualización inmediata en columna 8 a `"Diploma Enviado"`.

---

## 3. Mapeo de Implementación

| Componente | Archivo | Líneas Aprox. |
| :--- | :--- | :--- |
| Plantilla HTML Diploma | [crm_script.gs](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/crm_script.gs#L428-L588) | 428–588 |
| Lógica de Envío y PDF | [crm_script.gs](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/crm_script.gs#L590-L686) | 590–686 |
| Script Local de Test | [test_generar_diplomas.py](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/test_generar_diplomas.py) | 1–160 |
| Previsualización Visual | [preview_final_bootcamp.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/preview_final_bootcamp.html) | 1–250 |
