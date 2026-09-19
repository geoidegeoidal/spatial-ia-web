# Preparar cierre V4 para reemplazar el código de Apps Script

## Solicitud y decisión del instructor
El usuario pide el código para enviar correo y diploma V4. Consultado el criterio, confirma: **«Los que quedaron con el último estado de carpeta grabaciones enviada»**. El valor escrito por el CRM es `Carpeta Grabaciones Enviada`; sustituye el filtro anterior `Accesos Enviados` para este cierre autorizado.

## Implementación
- Mantener `crm_script.gs` como archivo completo de reemplazo, conservando el resto de funciones V4.
- Configurar planilla y pestaña explícitas para diplomas; validar columnas B/C/H antes de seleccionar.
- Previsualizar destinatarios sin enviar ni modificar celdas. Validar nombres/correos, duplicados y estados de envío previos.
- Prueba individual a `EMAIL_ADMIN`, con alumno ficticio y el PDF/correo reales; sin acceso a la planilla.
- Envío manual deshabilitado por defecto; se habilita tras revisar lista y prueba. Lotes de hasta 20, cuota y lock. Estado `Diploma Enviado` solo después de enviar; estados intermedios no se reintentan automáticamente si hay incertidumbre.
- Fecha de emisión del día en Santiago (opcionalmente editable), nombres escapados en HTML, PDF V4 de 9 horas y enlaces de Canva/Drive/LinkedIn preservados.

## Verificación
Pruebas exclusivamente locales con servicios Google simulados: selección, exclusión de otros estados, duplicados, errores, cuota, concurrencia, prueba al administrador y repetición sin reenvío. Render visual desde la plantilla V4 real (el script Python antiguo contiene V3 y no prueba este flujo). No ejecutar ni autorizar un envío masivo en producción desde el agente.

## Resultado verificado
- Archivo completo `crm_script.gs` preparado y guía `CIERRE_V4.md`. Filtro confirmado, selección de hoja explícita, nombres/correos validados, fecha actual, texto escapado, previsualización de solo lectura y prueba única al administrador sin planilla.
- `node test_diplomas_v4.cjs` aprobado: guardia por defecto, fecha/escape, recursos, selección exacta, duplicados con estados protegidos, cuota, concurrencia, lote de 20 y reanudación, modificación de fila, fallo de PDF, fallo de flush, fallo ambiguo de Gmail y fallo de escritura posterior. Los estados inciertos quedan en `porRevisar`, no se reenvían automáticamente.
- `node test_crm_cupon.js` y `node test_crm_oferta.js` aprobados: resto del CRM V4 conservado. Todas las pruebas usan mocks; ninguna llamada a Google real ni correo enviado.
- `render-diploma-v4.cjs` temporal renderizó la función real de V4 en Edge: nombre de prueba y nombre largo, ambos en una sola página A4, sin overflow. Correo revisado visualmente. Capturas/PDF temporales en `%TEMP%/opencode/diploma-v4-*` y `correo-cierre-v4.png`.
- Pendiente del operador: configurar ID/pestaña, revisar nombres y destinatarios, ejecutar la prueba individual en Apps Script y comprobar su PDF real antes del lote. No se validó el motor de conversión Google ni la entrega real desde el agente. Sin commit ni despliegue.

## Aclaración posterior de contenido
El usuario solicita volver a enviar la carpeta de grabaciones como recordatorio. Se hace explícito en el mismo correo del diploma: asunto actualizado, bloque de recordatorio con botón destacado y texto equivalente en la alternativa de texto plano. Se reutiliza `LINK_GRABACIONES_DRIVE`; destinatarios y controles de envío permanecen vigentes.
