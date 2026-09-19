# Cierre V4: copiar, pegar y ejecutar

El archivo **[`crm_script.gs`](crm_script.gs)** está completo. **No debes rellenar IDs, nombres de pestañas ni cambiar banderas.** Conserva tu correo `jorge.ulloa.roa@gmail.com`, los enlaces del curso, el diploma y el recordatorio de grabaciones.

## Usarlo

1. En el **Apps Script vinculado a tu planilla de V4**, reemplaza el código anterior con el contenido completo de `crm_script.gs` y guarda. No pegues una segunda copia al final.
2. Selecciona **`enviarDiplomasYCierre`** y pulsa **Ejecutar**.
3. Vuelve a la ventana de **Google Sheets**: aparecerá la confirmación con la planilla, pestaña, fecha y nombres/correos del lote. Revisa la lista y pulsa **Sí** para enviarlo. **No** o cerrar cancela sin mandar correos ni modificar filas.

No necesitas pulsar «Implementar» ni crear activadores. Google puede solicitar los permisos del proyecto al ejecutarlo por primera vez.

## Lo que ya resuelve el código

- Usa la planilla vinculada al proyecto y encuentra la única pestaña con **B=Nombre, C=Email y H=Estado Pago**. No depende de cuál pestaña esté activa. Si no hay una coincidencia única, lo indica y no envía.
- Selecciona únicamente **`Carpeta Grabaciones Enviada`**, como confirmó el instructor. No usa `Accesos Enviados`.
- Adjunta el PDF personalizado de **V4, 9 horas (5 lectivas + 4 prácticas)**, con la fecha del día en Santiago.
- Incluye agradecimiento, Canva, **recordatorio de la carpeta de grabaciones con botón destacado**, enlace de Drive también en texto plano y LinkedIn.
- Muestra y procesa hasta **20 destinatarios por ejecución**, limitado por cuota y tiempo. Si el registro indica `pendientes` mayor que cero, vuelve a ejecutar la misma función para revisar y enviar el siguiente lote.
- Omite los diplomas ya enviados; vuelve a comprobar el lote después de la confirmación y cada fila antes de enviar.

## Funciones de comprobación disponibles

- **`enviarPruebaDiplomaV4`**: manda un único correo con PDF de «Estudiante de prueba» a `jorge.ulloa.roa@gmail.com`. No lee ni modifica la planilla. Permite comprobar el PDF y la entrega reales de Google antes del lote.
- **`previsualizarDiplomasV4`**: muestra la lista completa en el registro, sin enviar ni escribir. Es opcional: la función de envío ya muestra el lote para revisarlo antes de confirmar.

## Resultado y revisiones

El registro devuelve `enviados`, `pendientes` y `porRevisar`. La columna H usa:

| Estado | Significado |
| --- | --- |
| `Carpeta Grabaciones Enviada` | Pendiente elegible. |
| `Enviando Diploma` | Reservado antes de llamar a Gmail. Si queda así, la ejecución se interrumpió. |
| `Diploma Enviado` | Gmail aceptó el envío y se guardó el resultado; no es confirmación de lectura. |
| `Revisar Diploma` | Fallo durante envío/guardado; el correo podría haberse enviado. |

`Enviando Diploma` y `Revisar Diploma` no se reenvían automáticamente. Comprueba **Enviados de Gmail**: si el correo está, marca `Diploma Enviado`; si confirmas que no se envió, devuelve la fila a `Carpeta Grabaciones Enviada` y vuelve a ejecutar. Si `porRevisar` es mayor que cero, quedan casos por comprobar aunque `pendientes` sea cero.

## Verificación

`node test_diplomas_v4.cjs` prueba el flujo sin configuración, detección de pestaña, confirmación/cancelación, concurrencia, duplicados, cuota, estados y correo/PDF mediante servicios simulados. También pasan `test_crm_cupon.js` y `test_crm_oferta.js`. Ninguna prueba envía mensajes reales.

La plantilla se revisó localmente en una página A4. La conversión y entrega de Google aún requieren la prueba individual real. `test_generar_diplomas.py` es una maqueta histórica V3, no una prueba de este cierre V4.
