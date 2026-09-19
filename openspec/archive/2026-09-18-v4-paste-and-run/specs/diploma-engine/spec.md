# MODIFIED RULE-DIP-004
Archivo completo listo para pegar en el Apps Script vinculado a la planilla V4: email, enlaces y valores predeterminados resueltos. No exigir completar IDs o cambiar una bandera de habilitación.

Seleccionar solo una pestaña compatible (B=Nombre, C=Email, H=Estado Pago); falla cerrado si falta planilla, ninguna pestaña coincide o varias coinciden. Mostrar lote exacto de `Carpeta Grabaciones Enviada` en confirmación nativa. Cancelar no escribe ni manda correo. Confirmar no basta si el lote cambia: adquirir lock después del diálogo y revalidar antes de generar PDFs o enviar. Conservar los controles de envío anteriores.
