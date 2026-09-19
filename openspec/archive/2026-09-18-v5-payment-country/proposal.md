# Tarifas V5: estudiantes solo Chile y PayPal actualizado

## Solicitud y evidencia
El usuario informa haber actualizado los montos de los enlaces existentes y precisa que el pase estudiantes es válido solo para Chile. Confirma el enlace internacional https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU. Consulta de solo lectura en Edge el 18/09/2026: producto «Workshop Visores Territoriales con IA», total **36,00 USD**; no se inició pago.

## Aplicación
- General Chile: $35.000 CLP; general internacional: US$36, monto real del enlace confirmado, sustituyendo la conversión referencial US$36,65.
- Estudiantes: $30.000 CLP, explícitamente válido solo para Chile en tarjeta y FAQ. Retirar US$31,42 para no anunciar tarifa estudiantil internacional.
- Registrar el enlace confirmado en la preparación operativa V5 y la restricción para la futura validación de país/plan.
- El registro sigue cerrado hasta conectar su CRM V5. No activar cobros públicos ni modificar el CRM histórico V4 mediante esta aclaración de precios.
- Ajustar solo las huellas de oferta y FAQ del test de contenido, preservando las otras cinco y comprobando expresamente las nuevas condiciones.

## Verificación
Pruebas de precios/país y contenido; revisión del bloque de precios a 1440 y 390 px. Sin commit ni despliegue solicitado para este ajuste.

## Resultado
- Tarjeta estudiantes, nota de precios y FAQ indican Chile; eliminada la conversión estudiantil USD. Tarjeta general y FAQ muestran US$36 internacional.
- `node test_preview_v5.js` y `node test_site_hydra.cjs` aprobados. Verificados siete bloques: cinco conservan sus huellas originales; solo oferta y FAQ cambian por la autorización de precios/país. Continúan todos los temas, perfil, fechas y estado de registro.
- Edge 1440/1024/768/390/320 y 320×568; sin overflow/errores. Captura del bloque de precios móvil revisada. Tráfico de analítica interceptado.
- Enlace PayPal registrado en preparación V5, con futura validación de país/plan especificada; CRM histórico intacto. Usuario reporta actualizar los demás enlaces; no se afirma haber comprobado sus checkouts.
- Ajuste local, pendiente de solicitud de publicación.
