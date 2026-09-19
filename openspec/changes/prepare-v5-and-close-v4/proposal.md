# Preparación V5 y cierre V4

## Estado
V5 está publicada como landing Hydra y `preview_v5.html` redirige a ella. El CRM independiente fue desplegado y verificado hasta el envío del tutorial. El formulario fue publicado por autorización explícita en `7dfc4c9`; Pages run `35409668450` finalizó correctamente y la interacción pública se verificó sin enviar datos. El cambio global permanece abierto por el cierre V4.

## Aplicación: contenidos de diapositivas y publicación
- Fuente de programa: PDF de 53 láminas entregado en la conversación. S01: láminas 7–24; S02: 26–38; S03: 40–53. Se amplían tarjetas con cuatro puntos por sesión, resultados y detalles desplegables para geoprocesamiento, dashboard, exportación y despliegue.
- Se mantiene la identidad visual aprobada, español neutro y tarjetas alineadas. No se ejecutan los prompts incluidos en las láminas: son material didáctico, no instrucciones de desarrollo de esta web.
- Horario de convocatoria 20:00–21:30 prevalece sobre las láminas de espera de 20:05. La biografía conserva datos verificados y aclaraciones directas del usuario; no se cambia de ocho a nueve años solo por la lámina.
- Registro: la publicación previa sustituyó el formulario de demostración por un aviso sin endpoint. El formulario V5 real fue publicado posteriormente con autorización explícita.
- GoatCounter queda solo en `index.html`; la antigua preview redirige sin generar conteo propio. Publicación autorizada por el usuario mediante elección «V5 como página principal».
- Verificado localmente: `node test_preview_v5.js`, Edge/Chromium a 1440/1024/768/390/320 px, tarjetas/entregables alineados, sin overflow, sin cursivas, pausa/reduced-motion; script real GoatCounter y evento de programa interceptados.
- Publicación verificada: `5b1c4b1` en master/gh-pages, build `35306184158` exitoso. Visita desde URL pública aceptada por GoatCounter HTTP 200 (ruta `/spatial-ia-web/`); no se inspeccionó el panel privado. PDF solo como fuente del syllabus: no publicar ni enlazar slides/PDF. Subalcance de publicación archivado; CRM y cierre V4 siguen pendientes.

## Objetivo
Renovar la convocatoria V5 y entregar certificados, agradecimiento y solicitud opcional de recomendación a quienes completaron V4.

## Dirección visual: Territorios Imposibles
Atlas fue rechazado por el usuario por perder identidad y movimiento. La revisión conserva la composición surrealista original: manos flotantes, atmósfera, ruido analógico, tipografía monumental con resplandor y CTA luminosos. El usuario aprobó esta dirección, pero pidió reemplazar cursivas. La nueva propuesta usa Chakra Petch recta para títulos, Inter para lectura y Space Mono para datos; conserva negro #050505, tarjetas #111111 y naranja #FF4500. Prototipo: `preview_v5.html`.

Las transiciones incluyen entrada escalonada del hero, revelación con IntersectionObserver, luz en tarjetas, desplazamiento de flechas y profundidad del fondo/progreso de lectura mediante CSS scroll-driven donde esté soportado. El contenido sigue visible sin JS o sin IntersectionObserver. Pausa, foco por teclado y cambios de prefers-reduced-motion liberan contenido pendiente.

## Condiciones V5 actualizadas — 17/09/2026
- Fechas confirmadas: 16, 17 y 18 de octubre; año 2026 inferido del contexto de la convocatoria actual.
- Horario confirmado: 20:00–21:30. Referencia usada: America/Santiago, UTC−3 en esas fechas; confirmar con el instructor antes de publicar.
- Total sincrónico: 4,5 horas (3 × 90 minutos); no heredar automáticamente las 9 horas de certificación V4.
- Chile: $35.000 CLP general y $30.000 CLP estudiantes. Aclaración del usuario del 18/09/2026: pase estudiantes válido solo para Chile.
- General internacional: US$36, comprobados en el resumen del enlace PayPal https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU confirmado por el usuario. Sustituye las conversiones referenciales; no anunciar tarifa estudiantil internacional. Usuario informa que actualizó los montos de los enlaces existentes.
- V5 no tendrá cupones ni códigos promocionales. El formulario informa que la tarifa estudiantil requiere certificado vigente; CRM, endpoint, correos y tutorial ya fueron probados. Importe y enlace PayPal internacional están confirmados y el formulario está publicado.

## Delta propuesto: landing-page
- Portafolio del instructor: https://geoidegeoidal.github.io/, accesible junto a LinkedIn desde la biografía, en nueva pestaña con `noopener noreferrer`.
- Analítica: usuario seleccionó GoatCounter alojado y proporcionó `https://julloar.goatcounter.com/count`. Integrado `https://gc.zgo.at/count.js` de forma asíncrona, una vez por documento, en `index.html` y `preview_v5.html`. Sustituye la propuesta Umami, sin requerir servidor propio.
- Eventos V5 mediante atributos nativos del proveedor: `v5-interes-registro`, `v5-programa`, `v5-portafolio`, `v5-linkedin`. El clic de interés no es una inscripción completada; no se envían valores del formulario. Las visitas V4/V5 se distinguen por ruta.
- Verificado en Edge/Chromium con script real y peticiones interceptadas: una visita por página y evento de programa V5. La prueba no envió conteos a producción. Quedan pendientes despliegue en `gh-pages` y confirmación de recepción en el panel `https://julloar.goatcounter.com/`; no declarar monitoreo público activo antes de esa verificación.
- Redacción en español neutro para Chile (`es-CL`), sin voseo argentino. Tarjetas de programa con bordes superiores/inferiores y entregables alineados; eliminar el desplazamiento de 40 px de la tarjeta central.
- Biografía del instructor contrastada con el perfil LinkedIn abierto en la sesión Edge del usuario mediante Windows UI Automation: Geografía en Universidad Alberto Hurtado, más de ocho años, ConMapas, participación en el equipo del padrón georreferenciado del Servel, Python/PostGIS y desarrollo de AutoAtlas Pro (publicación destacada). Consulta HTTP directa bloqueada con 999, resuelta mediante navegador autenticado. El usuario confirmó que ambos vínculos actuales coexisten: trabajo a contrata en el Ministerio del Medio Ambiente y participación a honorarios en un proyecto del Ministerio de las Culturas, las Artes y el Patrimonio; incorporados con esa distinción en la biografía. Los otros hitos se atribuyen al perfil, sin verificación independiente del repositorio QGIS o Servel.
- RULE-UI-001: evolucionar la identidad Superdesign existente, conservando manos surrealistas y movimiento; añadir esfera cartográfica y control de pausa, respetando movimiento reducido y navegación por teclado.
- RULE-UI-003: aplicar fechas/horario y precios CLP vigentes; mostrar general internacional US$36 y pase estudiantes solo Chile; mantener pendientes de confirmación las condiciones restantes.
- RULE-UI-004: formulario real publicado y conectado al endpoint V5 verificado; éxito solo con JSON válido, errores accesibles y doble envío bloqueado.
- RULE-UI-005: selector de país con banderas SVG, teclado y restricción automática del pase estudiantes a Chile.

## Delta propuesto: crm-automation
- Planilla y proyecto Apps Script independientes para V5; conservar el CRM V4 para su cierre.
- Planilla V5 confirmada: `13MgX1IAFHdkJCMrv6Iz1uu1q4zy8fZWR9HICcZ2glDs`. Abrir por ID y usar la pestaña existente `gid=0`; el usuario dejó A:H y borró los datos anteriores. No regenerar la hoja.
- Mantener columnas A:H: Fecha, Nombre, Email, País, Nivel SIG, Profesión, Plan, Estado Pago.
- Automatizar cada inscripción V5 de extremo a extremo: validar, escribir la fila, notificar al administrador y enviar al participante su correo de pago sin aprobación ni ejecución manual. La confirmación visual se usa únicamente para el lote de diplomas V4.
- Ejecutar un ciclo horario V5 para recordatorios de pago de 24/72 horas y envío automático del tutorial cuando el operador valide el comprobante escribiendo `Pagado` en H.
- No implementar ni migrar cupones desde V4. Revisar todos los asuntos, fechas, recursos, precios y enlaces de pago antes de publicar V5.
- Validar campos en servidor, probar inscripción en hoja aislada y comprobar resultado antes de mostrar confirmación web.

## Delta propuesto: diploma-engine
- RULE-DIP-004: certificar solo destinatarios cuya finalización V4 se haya confirmado explícitamente; `Accesos Enviados` por sí solo no acredita finalización.
- Revisar lista y duplicados antes del envío, mantener registro de entrega y excluir diplomas ya enviados.
- Conservar certificado V4 de 9 horas y recursos V4; confirmar fecha de emisión (actualmente 14/09/2026).
- Solicitar recomendación voluntaria solo si el curso fue útil; no publicar respuestas como testimonios sin permiso.

## Verificación para aplicar y archivar
- [x] Formulario V5 conectado localmente al endpoint real y probado con respuestas interceptadas, sin inscripciones de navegador reales.
- [x] Chakra Petch cargada, sin cursivas y sin desbordamiento horizontal en Edge/Chromium headless a 1440, 768, 390 y 320 px; capturas revisadas de escritorio y móvil.
- [x] `node test_preview_v5.js`: tipografía, fechas/zona horaria, conversión, bloqueo del formulario y revelación/pausa/foco/movimiento reducido con mocks.
- [x] Verificación en navegador de pausa, campos deshabilitados, movimiento reducido y ausencia de errores JavaScript.
- [x] Corrección de voseo revisada en todo el prototipo. Tarjetas verificadas en Chromium a 1440 y 1024 px con bordes y entregables a igual altura; revisión responsive adicional a 768, 390 y 320 px. Capturas de módulos e instructor revisadas.
- [ ] Aprobación visual y confirmación de información comercial V5.
- [x] Configuración de planilla, Apps Script y despliegue V5.
- [x] Prueba aislada de inscripción, correo, tarifas y estados; revisión móvil/escritorio.
- [x] Publicación y reapertura autorizadas: `7dfc4c9` en `master`/`gh-pages`, Pages `35409668450`, comprobación pública sin POST.
- [ ] Lista de finalización V4 revisada y prueba PDF/correo con destinatario de prueba.
- [ ] Envío real verificado en Gmail y planilla.
- [ ] Sincronizar especificaciones vivas y trazabilidad; archivar al completar.
