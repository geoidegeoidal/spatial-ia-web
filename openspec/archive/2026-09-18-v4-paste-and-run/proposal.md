# Cierre V4 sin configuración manual

El usuario rechaza completar IDs, pestañas y cambiar banderas: necesita el archivo completo para copiar y pegar en su Apps Script V4 existente. El CRM original ya usa una planilla vinculada. No hay un ID de planilla conocido en el repositorio; no inventarlo.

Se elimina la exigencia de planillaId/nombreHoja/envioHabilitado. Se obtiene la planilla vinculada con SpreadsheetApp.getActiveSpreadsheet y se detecta la única pestaña compatible por encabezados B/C/H, sin depender de la pestaña activa. Si falta contexto o hay ambigüedad, no enviar ni adivinar.

La revisión exigida de destinatarios pasa a una confirmación nativa en Google Sheets con planilla, pestaña, fecha y la lista exacta del lote (hasta 20). Se adquiere el lock después de confirmar, pues los diálogos suspenden la ejecución, y se vuelve a validar el lote antes de enviar. Sin activadores ni autorizaciones/envíos desde el agente; pruebas con mocks.

Se conservan PDF V4 de 9 horas, fecha Santiago, prueba solo admin, recordatorio de Drive, estados inciertos sin reintento automático, cuota y límite temporal.
