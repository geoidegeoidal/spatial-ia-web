# CRM V5

La planilla confirmada es `https://docs.google.com/spreadsheets/d/13MgX1IAFHdkJCMrv6Iz1uu1q4zy8fZWR9HICcZ2glDs/`. El archivo completo para su Apps Script es `crm_v5_script.gs`. No reemplaza `crm_script.gs`, que sigue siendo el CRM/cierre histórico V4.

Endpoint V5 desplegado: `https://script.google.com/macros/s/AKfycbzkX21TwO9LqpJao8mjVZ2Guc98J-yvTw-5B1cKP38gzwNxoNQIm0jImAKVoTIi8Iw3rQ/exec`.

## Preparación única

1. Abre la planilla V5 y entra a **Extensiones → Apps Script**.
2. Reemplaza el contenido del proyecto copiado por todo `crm_v5_script.gs` y guarda.
3. Ejecuta `prepararCRMV5` una vez y autoriza el acceso. Validará la pestaña existente `gid=0` y sus encabezados A:H; no crea, borra, renombra ni reformatea hojas. También instala un activador horario `ejecutarCRMV5`, reemplazando únicamente una copia anterior de ese mismo activador.
4. Confirma que el resultado indique `estado: lista`.

## Despliegue

1. En Apps Script selecciona **Implementar → Nueva implementación → Aplicación web**.
2. Ejecutar como: **Yo**.
3. Acceso: la opción que permita enviar el formulario a postulantes externos según la cuenta de Google.
4. Implementa y conserva la URL terminada en `/exec`.

No crees una confirmación manual ni ejecutes `doPost` desde el editor. Cada POST válido registra y envía automáticamente ambos correos. El frontend se conectará solo después de probar el endpoint aislado.

## Flujo automático hasta el tutorial

1. Una inscripción válida queda en `Pendiente` después de registrar la fila y enviar los correos al administrador y participante.
2. El activador horario envía un recordatorio después de 24 horas y el recordatorio final después de 72 horas, siempre que el estado siga pendiente.
3. La validación del comprobante es humana: cuando confirmes el pago, escribe exactamente **`Pagado`** en la columna H de esa persona.
4. En la siguiente ejecución horaria, el CRM envía automáticamente el tutorial de preparación y cambia H a `Tutorial Enviado`. No requiere confirmación visual.

El tutorial usa el recurso existente de Drive, con correo actualizado a V5: 16, 17 y 18 de octubre de 2026, 20:00–21:30. No contiene precios, fechas, cupones ni referencias V4.

## Payload esperado

El endpoint recibe un formulario `application/x-www-form-urlencoded` o `FormData`, no JSON: `name`, `email`, `country`, `nivel_sig`, `ocupacion`, `plan`. Los planes admitidos son `general` y `estudiante`; estudiante solo para `Chile`. Cualquier `cupon`, `coupon`, `codigo` o `promo` con valor se rechaza.

Apps Script devuelve JSON aun cuando el error llegue con HTTP 200. El frontend debe considerar exitosa la inscripción **solo** después de parsear la respuesta y comprobar `result === "success"`; `response.ok` por sí solo no sirve.

Estados normales: `Preparando correo` → `Notificación Admin Enviada` → `Pendiente` → `Recordatorio Enviado` → `Recordatorio Final Enviado`; tras tu validación: `Pagado` → `Enviando Tutorial` → `Tutorial Enviado`.

Los estados que comienzan con `Revisar` y los estados `Enviando ...` no se reintentan automáticamente: Gmail puede haber aceptado el mensaje antes de informar un error. Comprueba **Enviados** antes de corregirlos manualmente para evitar duplicados.
