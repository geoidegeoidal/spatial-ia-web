# Preparación operativa

## Datos necesarios del instructor
1. Confirmados 16, 17 y 18 de octubre, 20:00–21:30. Prototipo usa 2026 y Santiago (UTC−3); confirmar referencia antes de publicación. Son 4,5 horas en vivo. Faltan programa final y cupos.
2. Confirmados $35.000 CLP general y $30.000 CLP estudiantes **solo para Chile**. Usuario informa que actualizó los montos de los enlaces existentes. PayPal general internacional confirmado: https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU, **US$36** verificados en el resumen del pedido el 18/09/2026, sin iniciar pago. No ofrecer pase estudiantes internacional ni cupones en V5. Confirmar condiciones de acreditación.
3. Planilla V5 confirmada: `13MgX1IAFHdkJCMrv6Iz1uu1q4zy8fZWR9HICcZ2glDs`, pestaña existente `gid=0`. El usuario borró las filas V4 y conservó A:H. `crm_v5_script.gs` usa esa pestaña sin regenerarla. Endpoint desplegado: `https://script.google.com/macros/s/AKfycbzkX21TwO9LqpJao8mjVZ2Guc98J-yvTw-5B1cKP38gzwNxoNQIm0jImAKVoTIi8Iw3rQ/exec`.
4. Planilla/lista V4 con nombres definitivos, correos y confirmación de finalización. Confirmar fecha de emisión de certificados.
5. Destino de recomendaciones: LinkedIn, respuesta al correo o formulario. Propuesta inicial: respuesta al correo, sin crear otra herramienta.

## Configuración V5
- [x] Ejecutar una vez `prepararCRMV5`: valida `gid=0` y A:H (Fecha | Nombre | Email | País | Nivel SIG | Profesión | Plan | Estado Pago), configura zona horaria/activador y no modifica la estructura ni el formato de la hoja.
- Usar el reemplazo completo `crm_v5_script.gs`. No copiar activadores ni fechas de V4 automáticamente.
- En el CRM V5, validar país y plan en servidor: el pase estudiantes solo admite Chile. Los pagos internacionales generales usarán el PayPal confirmado de US$36; no reutilizar la antigua tarifa estudiantil USD ni la lógica de cupones de V4.
- El POST válido de V5 debe registrar y despachar automáticamente los correos iniciales al participante y administrador, sin confirmación manual. Probar el flujo completo en una planilla aislada antes de exponer el formulario. La confirmación visual queda limitada a `enviarDiplomasYCierre` de V4.
- El activador horario V5 envía recordatorios de 24/72 horas. Tras revisar el comprobante, el operador cambia H exactamente a `Pagado`; el siguiente ciclo envía el tutorial automáticamente y deja `Tutorial Enviado`.
- Fijar ID de planilla y pestaña explícitos. Configurar zona horaria America/Santiago si corresponde al horario confirmado.
- Autorizar el proyecto con la cuenta remitente. Desplegar como aplicación web ejecutada por el propietario, con acceso para postulantes externos según las políticas de la cuenta.
- [x] Probar con destinatario aislado: alta, correo, pago, tutorial y estados.
- [x] Conectar el endpoint en la copia local y verificar país por teclado, validación, JSON éxito/error, doble envío y responsive sin despachar inscripciones reales.
- Activar recordatorios solo con sus condiciones revisadas. Publicar sitio cuando el usuario solicite despliegue.

Prueba real autorizada el 18/09/2026: POST `Prueba CRM V5`, Chile/general, destinatario `jorge.ulloa.roa@gmail.com`; respuesta `{"result":"success","registro":{"fila":2,"estado":"Pendiente"}}`. El usuario confirmó recepción del aviso administrativo y del correo de pago. Luego cambió H2 a `Pagado`, ejecutó el ciclo y confirmó estado `Tutorial Enviado` y recepción del tutorial. La landing local quedó conectada y probada con respuestas interceptadas; producción continúa sin reabrirse ni publicarse.

## Cierre V4 pendiente de ejecución
El instructor confirmó como destinatarios a quienes quedaron en `Carpeta Grabaciones Enviada`. `crm_script.gs` ya prepara ese filtro, `previsualizarDiplomasV4` de solo lectura, prueba individual al administrador y envío manual con confirmación del lote. Detecta la pestaña compatible en la planilla vinculada, sin IDs ni banderas que editar. Fecha actual de Santiago o texto configurable; 9 horas V4 conservadas.

Seguir `CIERRE_V4.md`: pegar el archivo completo en Apps Script vinculado a V4, comprobar el PDF mediante la prueba individual y ejecutar el envío, revisando la lista de la confirmación en Sheets. Los estados `Enviando Diploma` / `Revisar Diploma` requieren revisión en Gmail antes de reintentar. Código probado solo con mocks y render local; no hubo envío real ni conversión en Apps Script desde el agente.

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
