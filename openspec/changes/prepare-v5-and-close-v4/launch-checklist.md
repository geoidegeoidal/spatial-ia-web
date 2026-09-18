# Preparación operativa

## Datos necesarios del instructor
1. Confirmados 16, 17 y 18 de octubre, 20:00–21:30. Prototipo usa 2026 y Santiago (UTC−3); confirmar referencia antes de publicación. Son 4,5 horas en vivo. Faltan programa final y cupos.
2. Confirmados $35.000 CLP general y $30.000 CLP estudiantes. Conversión referencial al 17/09/2026: US$36,65 / US$31,42 (954,85 CLP/USD, mindicador.cl). Confirmar tarifa de cobro internacional, enlaces de pago y si continúa CONMAPAS.
3. URL de nueva planilla y nombre de pestaña. Crear proyecto Apps Script vinculado exclusivamente a V5 y compartir su endpoint `/exec` después del despliegue.
4. Planilla/lista V4 con nombres definitivos, correos y confirmación de finalización. Confirmar fecha de emisión de certificados.
5. Destino de recomendaciones: LinkedIn, respuesta al correo o formulario. Propuesta inicial: respuesta al correo, sin crear otra herramienta.

## Configuración V5 pendiente de ejecución
- Crear planilla vacía con encabezados A:H: Fecha | Nombre | Email | País | Nivel SIG | Profesión | Plan | Estado Pago.
- Preparar adaptación V5 del CRM una vez confirmadas condiciones. No copiar activadores ni fechas de V4 automáticamente.
- Fijar ID de planilla y pestaña explícitos. Configurar zona horaria America/Santiago si corresponde al horario confirmado.
- Autorizar el proyecto con la cuenta remitente. Desplegar como aplicación web ejecutada por el propietario, con acceso para postulantes externos según las políticas de la cuenta.
- Probar con planilla y destinatario aislados: alta, validación, precios, correo, estados y errores.
- Conectar el endpoint y habilitar el formulario tras la prueba satisfactoria. Verificar país accesible por teclado y estados de envío.
- Activar recordatorios solo con sus condiciones revisadas. Publicar sitio cuando el usuario solicite despliegue.

## Cierre V4 pendiente de ejecución
El código existente `enviarDiplomasYCierre()` ya adjunta PDF y recursos, pero selecciona `Accesos Enviados`. No usar ese estado como prueba de finalización. Revisar además casos con grabaciones enviadas y diplomas ya entregados.

Preparar selección explícita de alumnos que completaron, previsualización de destinatarios y prueba de un PDF/correo antes de ejecutar la entrega. El generador actual fija emisión al 14 de septiembre de 2026. La entrega real requiere acceso a Apps Script/Gmail; no se ha realizado desde esta sesión.

## Borrador del correo de cierre
**Asunto:** Tu certificado V4 y un gracias por construir juntos — Bootcamp Geo-IA

Hola, [Nombre]:

Muchas gracias por ser parte de la cuarta versión del Bootcamp Geo-IA y por el tiempo y la dedicación que pusiste en completar el curso. Espero que lo aprendido te ayude a convertir tus ideas y conocimientos territoriales en aplicaciones útiles.

Adjunto tu certificado de finalización correspondiente a 9 horas (5 lectivas y 4 prácticas).

Tus materiales siguen disponibles:
- Presentación: https://canva.link/workshop-gis-ia
- Grabaciones y recursos: https://drive.google.com/drive/folders/1omSvhwQ2WQng5rlLm4ADz6vJOmHTsRGN?usp=sharing

**Si el curso te fue útil, ¿te animás a recomendarlo?** Podés responder a este correo con dos o tres líneas sobre qué te aportó o qué pudiste construir. Si preferís, compartí tu certificado o proyecto en LinkedIn y etiquetame: https://www.linkedin.com/in/jorge-ulloa-roa/

Tu recomendación es completamente voluntaria. Si querés que la compartamos como testimonio en la próxima convocatoria, indicámelo expresamente en tu respuesta; de lo contrario, la trataremos como feedback privado. También me sirve saber qué podríamos mejorar.

Gracias por aprender y construir conmigo.

Jorge Ulloa Roa
Bootcamp Geo-IA
