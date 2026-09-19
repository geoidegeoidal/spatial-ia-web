# Delta archivado: MODIFIED RULE-DIP-003
La plantilla recibe nombre/fecha escapados en HTML y utiliza fecha actual de America/Santiago por defecto. Mantiene V4 y 9 horas. Se conserva la conversión Blob HTML → PDF, que requiere verificar una prueba individual en el entorno real de Apps Script.

# MODIFIED RULE-DIP-004
Destinatarios del cierre confirmado por el instructor: exclusivamente filas con estado `Carpeta Grabaciones Enviada`. Planilla/pestaña explícitas, nombre/correo válidos y revisión previa; excluir entregados o en revisión y bloquear duplicados.

Funciones: `previsualizarDiplomasV4` (solo lectura), `enviarPruebaDiplomaV4` (solo administrador, sin planilla) y `enviarDiplomasYCierre` (manual y deshabilitada por defecto). Envío con PDF, Canva, Drive y LinkedIn. Estado intermedio `Enviando Diploma`; éxito `Diploma Enviado`; fallo incierto `Revisar Diploma`. No reintentar automáticamente los estados intermedios.
