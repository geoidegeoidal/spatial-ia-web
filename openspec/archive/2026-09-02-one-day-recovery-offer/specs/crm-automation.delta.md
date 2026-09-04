# Delta Spec: Oferta de Recuperación por Un Día

## ADDED Requirements

### `RULE-CRM-006`: Oferta exclusiva posterior al recordatorio final
- `enviarOfertaExclusivaHoy()` se ejecuta manualmente y solo procesa filas con estado exacto `Recordatorio Final Enviado` y correo válido.
- Residentes en Chile reciben una oferta de $20.000 CLP mediante un enlace exclusivo de MercadoPago.
- Residentes internacionales reciben una oferta de 22 USD mediante un enlace exclusivo de PayPal.
- La oferta indica la fecha de envío y expira a las 23:59 de ese mismo día en horario de Chile.
- Si falta el enlace correspondiente al país, el correo no se envía y el estado no cambia.
- Después de un envío exitoso, el estado cambia a `Oferta Exclusiva Enviada` para impedir duplicados.
