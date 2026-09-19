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
   - Nombre y fecha escapados como texto HTML. Fecha de emisión actual de `America/Santiago`, salvo texto explícito en `CIERRE_V4.fechaEmision`.
- **Entorno local:** `test_diplomas_v4.cjs` ejecuta el código real con servicios simulados. Para revisar la plantilla se renderiza `generarDiplomaHtml` en Chromium; esto no sustituye la prueba individual de conversión en Apps Script. Los scripts Python existentes son maquetas históricas; `test_generar_diplomas.py` aún contiene V3.

### `RULE-DIP-004`: Despacho de Correo de Cierre V4 (`enviarDiplomasYCierre`)
- **Destinatarios confirmados por el instructor (18/09/2026):** Únicamente filas con estado `"Carpeta Grabaciones Enviada"`, nombre y email válidos. Esta decisión explícita sustituye el filtro anterior `"Accesos Enviados"` para el cierre V4; no deducir acreditación para otros grupos.
- **Destino sin configuración:** Usar la planilla vinculada al proyecto y detectar la única pestaña compatible con B=Nombre, C=Email, H=Estado Pago. No depender de la pestaña activa ni exigir IDs al usuario. Si falta planilla, no hay coincidencias o hay varias, no enviar ni adivinar.
- **Revisión y prueba:** `previsualizarDiplomasV4` solo lee y lista. `enviarPruebaDiplomaV4` envía únicamente a `EMAIL_ADMIN` con nombre ficticio y sin acceder a la planilla. `enviarDiplomasYCierre` muestra confirmación nativa con identidad de planilla/pestaña, fecha y nombres/correos exactos del lote; No/cerrar cancela sin efectos. No requiere bandera manual de habilitación. Prueba de PDF/entrega real disponible mediante la función individual.
- **Confirmación y concurrencia:** El lock se adquiere después del diálogo (Apps Script suspende la ejecución mientras se muestra). Volver a validar esquema, duplicados, lote y cuota tras confirmar; abortar si cambió el lote. No incluir destinatarios nuevos que no estuvieran en la lista mostrada. Revalidar cada fila antes y después de reservarla como `Enviando Diploma`; el lock coordina ejecuciones del script, pero no impide ediciones manuales. Un cambio detectado falla sin llamar a Gmail y deja la fila para revisión.
- **Idempotencia y fallos:** Bloquear duplicados (incluidos correos presentes como enviados o en revisión), usar ScriptLock, respetar cuota y lotes de hasta 20. Antes de Gmail marcar `Enviando Diploma`; después de éxito guardar `Diploma Enviado`; ante resultado incierto marcar `Revisar Diploma` y detener la ejecución. No reintentar automáticamente las filas en revisión. El resumen y la previsualización informan cuántas quedan por revisar.
- **Contenido del Paquete de Cierre:**
   1. PDF V4 personalizado de 9 horas, fecha actual de Santiago o fecha configurada por el instructor.
  2. Enlace a la presentación interactiva de Canva (`https://canva.link/workshop-gis-ia`).
   3. Recordatorio explícito que vuelve a compartir la carpeta de grabaciones y materiales de V4 en Google Drive, dentro del mismo correo del diploma, con botón destacado y enlace también en texto plano.
  4. Bloque de invitación a compartir en LinkedIn (`https://www.linkedin.com/in/jorge-ulloa-roa/`).
- **Transición de Estado:** Columna 8: `Carpeta Grabaciones Enviada` → `Enviando Diploma` → `Diploma Enviado`. Fallo incierto: `Revisar Diploma`. Los estados de revisión requieren contrastar Enviados de Gmail antes de un cambio manual; `Diploma Enviado` significa aceptación por Gmail, no lectura ni entrega final garantizada.
- **Operación:** Guía completa en `CIERRE_V4.md`. Guardar el código basta para ejecución manual; no crear activadores ni desplegar el webhook para ejecutar este cierre.

---

## 3. Mapeo de Implementación

| Componente | Archivo | Líneas Aprox. |
| :--- | :--- | :--- |
| Plantilla HTML Diploma | `crm_script.gs` | `generarDiplomaHtml` |
| Correo y PDF | `crm_script.gs` | `prepararCorreoDiplomaV4_` |
| Selección, prueba y envío | `crm_script.gs` | `seleccionarDiplomasV4_`, `previsualizarDiplomasV4`, `enviarPruebaDiplomaV4`, `enviarDiplomasYCierre` |
| Test local V4 | `test_diplomas_v4.cjs` | Servicios simulados; cero correos reales |
| Instrucciones de reemplazo | `CIERRE_V4.md` | Configuración, prueba y manejo de estados |
