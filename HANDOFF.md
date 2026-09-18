# HANDOFF.md

## Handoff Log

### 2026-09-18 — Rendimiento y syllabus OpenSpec actualizados localmente
- **Objetivo:** Investigar la lentitud al abrir la web y actualizar el programa sin nombrar capas/datasets de práctica.
- **Hecho:** Atlas/órbita estáticos, retirados blends/blur/parallax costosos; conservadas manos flotantes y reveals accesibles. Grano externo 404 reemplazado por textura embebida. Programa actualizado al delta de la presentación de 50 páginas: OpenSpec y artefactos, exportación filtrada, simbología/leyenda y filtros compartidos. Retiradas referencias a humedales, contrato.md, Stitch e intersecciones.
- **Decidido:** Mantener precios, horarios y 4,5 horas; PDF solo como fuente del syllabus. Cambio archivado en `openspec/archive/2026-09-18-refine-v5-performance-syllabus/`.
- **Verificación:** `node test_preview_v5.js` aprobado. `check-spatial-v5.cjs` (temporal): Edge 1440/1024/768/390/320 px, sin overflow/errores JS, cards alineadas y pausa/reduced-motion. `perf-spatial.cjs` (temporal) con GPU deshabilitada: mediana anterior 50 ms (~20 FPS), final 16,7 ms (~60 FPS), p95 16,7 ms, máximo estable 16,8 ms. Apertura final: frame máximo 100 ms, long task 80 ms. La congelación exacta no se reprodujo con GPU activa.
- **Bloqueantes / pendientes:** Cambios locales; falta autorización de commit/despliegue. Persisten CRM/pagos V5 y certificados V4. `.opencode/` preexistente no modificado.
- **Próxima sesión:** Publicar cuando se solicite y comprobar fluidez en el navegador del usuario.
- **Commits relevantes:** Ninguno en esta sesión.

---

### 2026-09-18 — Despliegue V5 y conexión pública verificados
- **Objetivo:** Completar la publicación autorizada y verificar el seguimiento desde GitHub Pages.
- **Hecho:** Commit `5b1c4b1` subido exitosamente a `origin/master` y `origin/gh-pages`. GitHub Pages build/deployment `35306184158` completado correctamente. Sitio https://geoidegeoidal.github.io/spatial-ia-web/ muestra V5 y programa actualizado; preview redirige a index.
- **Decidido:** El PDF se utiliza únicamente como fuente para redactar el syllabus, según aclaración expresa del usuario. No se subieron ni incrustaron presentación, imágenes de slides o PDF, ni se añadió enlace a ellos.
- **Verificación:** Navegador contra la URL pública: título V5, tres módulos, sin formulario, sin iframe/embed/object/enlace PDF. Petición real de visita a GoatCounter aceptada HTTP 200 con ruta `/spatial-ia-web/`. Se generó una visita de comprobación real; no se comprobó la visualización dentro del panel privado. Redirección preview confirmada.
- **Bloqueantes / pendientes:** Apertura de inscripciones pendiente de nueva planilla, Apps Script y enlaces de pago V5; certificados V4 pendientes de lista de finalización y envío revisado.
- **Próxima sesión:** Configurar CRM y pagos V5; usuario puede consultar actividad en https://julloar.goatcounter.com/.
- **Commits relevantes:** `5b1c4b1` publicado en ambas ramas; esta entrada registra evidencia posterior al despliegue.

---

### 2026-09-18 — Programa basado en slides y promoción de V5
- **Objetivo:** Ajustar los contenidos al PDF de 53 láminas y conectar el sitio público con GoatCounter.
- **Hecho:** Programa ampliado por sesión con resultados y detalles de SDD, MapLibre/GeoJSON/EDA, filtros/popups, Turf.js, exportación, Chart.js, GitHub CLI/Pages y Stitch. Usuario autorizó publicar «V5 como página principal». V5 promovida a `index.html`; preview redirige. Reemplazado formulario de demostración por aviso de próxima apertura.
- **Decidido:** Conservar 20:00–21:30 y 4,5 horas en vivo; las láminas de espera no cambian el horario. Programa avanzado presentado como ejemplos guiados. No abrir CRM ni reutilizar pagos V4.
- **Verificación:** Test local y navegador Edge a 1440/1024/768/390/320 px; módulos alineados, sin overflow, sin cursivas, pausa/reduced-motion. GoatCounter real genera visita y evento de programa en prueba interceptada. Configuración GitHub Pages confirmada: rama `gh-pages`, raíz `/`.
- **Bloqueantes / pendientes:** Registrar despliegue y verificación real a continuación. Persisten nueva planilla/script/pagos V5 y certificados V4.
- **Próxima sesión:** Terminar configuración de inscripción y cierre V4.
- **Commits relevantes:** Pendiente commit de publicación autorizado.

---

### 2026-09-18 — Integración GoatCounter alojado
- **Objetivo:** Conectar el snippet proporcionado por el usuario a su cuenta de analítica gratuita, sin servidor propio.
- **Hecho:** Script async HTTPS integrado una sola vez en `index.html` y `preview_v5.html`, endpoint `https://julloar.goatcounter.com/count`. Eventos declarativos V5 para interés de registro, programa, portafolio y LinkedIn. Actualizados README, AGENTS y propuesta OpenSpec.
- **Decidido:** GoatCounter reemplaza la recomendación Umami. Clic de interés no equivale a conversión de inscripción. Se usa el script oficial y sus atributos nativos, sin dependencias ni lógica adicional propia.
- **Verificación:** Edge/Chromium con script real, HTML servido mediante intercepción en origen de prueba y peticiones de conteo interceptadas: visita en index, visita y clic de programa en preview. No se enviaron conteos de prueba a producción. `node test_preview_v5.js` pasó.
- **Bloqueantes / pendientes:** Publicar cambios en `gh-pages` cuando el usuario solicite commit/despliegue y verificar recepción real en https://julloar.goatcounter.com/. No se afirma monitoreo activo en la web publicada.
- **Próxima sesión:** Desplegar y revisar una visita real en el panel.
- **Commits relevantes:** Ninguno; sin push ni despliegue.

---

### 2026-09-18 — Portafolio y estado de analítica
- **Objetivo:** Agregar portafolio y comprobar si se implementó el monitoreo open source solicitado.
- **Hecho:** Añadido enlace al portafolio https://geoidegeoidal.github.io/ junto a LinkedIn en `preview_v5.html`, con distribución flexible. Búsqueda del repositorio por integraciones de analítica sin coincidencias; consultada documentación oficial de Umami.
- **Decidido:** Comunicar que la analítica no está implementada; recomendar Umami para visitas, procedencia, dispositivos y eventos. Requiere servicio alojado o instancia propia antes de conectar el sitio.
- **Bloqueantes / pendientes:** Seleccionar alojamiento/cuenta de Umami, obtener URL del script e ID del sitio y verificar recepción de datos. Pendientes de lanzamiento V5/V4 anteriores siguen vigentes.
- **Próxima sesión:** Configurar analítica con el usuario y comprobar el panel con una visita de prueba.
- **Commits relevantes:** Ninguno; enlace agregado solo a propuesta local, sin despliegue.

---

### 2026-09-18 — Aclaración de vínculos laborales del instructor
- **Objetivo:** Incorporar la aclaración del usuario sobre sus funciones actuales.
- **Hecho:** Biografía en `preview_v5.html` actualizada con trabajo a contrata en el Ministerio del Medio Ambiente y participación a honorarios en un proyecto del Ministerio de las Culturas, las Artes y el Patrimonio. Sincronizados AGENTS y propuesta OpenSpec.
- **Decidido:** Ambos vínculos son actuales y compatibles; no existe contradicción entre encabezado y Acerca de por nombrar instituciones distintas.
- **Bloqueantes / pendientes:** Ninguno para esta aclaración; siguen los pendientes operativos V5/V4.
- **Próxima sesión:** Continuar preparación del lanzamiento.
- **Commits relevantes:** Ninguno.

---

### 2026-09-18 — Biografía contrastada desde Edge autenticado
- **Objetivo:** Usar la sesión Edge del usuario para consultar su LinkedIn y mejorar la biografía.
- **Hecho:** Perfil abierto en ventana nueva de Edge con la sesión existente y leído mediante Windows UI Automation, sin modificar el perfil. Actualizada biografía en `preview_v5.html`: formación UAH, ocho años de experiencia, participación en equipo Servel, ConMapas y AutoAtlas Pro.
- **Decidido:** Evitar cargo actual: encabezado indica Ministerio de las Culturas, mientras Acerca de menciona Ministerio del Medio Ambiente. No convertir participación en equipo en autoría o liderazgo individual. Direct HTTP sigue bloqueado; la lectura autenticada sí funcionó.
- **Bloqueantes / pendientes:** Confirmar cargo actual si se desea incluirlo. Pendientes operativos de V5/V4 siguen vigentes.
- **Próxima sesión:** Revisar biografía con el usuario y continuar preparación del lanzamiento.
- **Commits relevantes:** Ninguno.

---

### Session: 2026-09-17 — Español neutro, módulos alineados y biografía
- **Objetivo:** Corregir voseo argentino, desnivel de tarjetas y falta de descripción del instructor.
- **Hecho:** Revisado todo el texto de `preview_v5.html`, declarado `es-CL`; eliminado margen vertical de 40 px en tarjeta central y alineados entregables mediante flex. Añadida biografía de Jorge Ulloa Roa basada en la descripción existente en `index.html` (UAH, ConMapas y tecnologías geoespaciales).
- **Decidido:** Español neutro adecuado a Chile; módulos alineados en lugar de escalonados. LinkedIn bloqueó consulta automática (HTTP 999): no presentar la biografía como contrastada con el perfil actual ni añadir cargos/años no comprobados.
- **Verificación:** `node test_preview_v5.js` pasó. Chromium a 1440/1024/768/390/320 px: sin overflow ni errores JS; bordes y entregables alineados en escritorio; capturas de tarjetas e instructor revisadas. Búsqueda de formas de voseo originales sin coincidencias.
- **Bloqueantes / pendientes:** Para contrastar la biografía con LinkedIn, obtener texto o exportación del perfil. Persisten pendientes de lanzamiento V5 y certificados V4.
- **Próxima sesión:** Revisar texto del instructor con el usuario y avanzar configuración operativa.
- **Commits relevantes:** Ninguno; cambios solo locales.

---

### Session: 2026-09-17 — Tipografía técnica, transiciones y condiciones V5
- **Objetivo:** Proponer tipografía sin cursivas, elevar transiciones e incorporar fechas/precios confirmados.
- **Hecho:** `preview_v5.html` usa Chakra Petch para títulos; hero escalonado, revelaciones IntersectionObserver, efectos de luz, profundidad CSS progresiva y controles accesibles. Incorporados 16–18 octubre 2026, 20:00–21:30 Santiago (UTC−3), CLP 35.000 / 30.000 y USD referenciales 36,65 / 31,42, con fuente/fecha y advertencia de comisiones.
- **Decidido:** Mantener identidad surrealista aprobada y evitar cursivas. Año y zona horaria inferidos del contexto; verificar antes de publicar. La duración en vivo es 4,5 horas, no heredar la acreditación V4. USD calculados con dólar observado de 954,85 CLP/USD del 17/09/2026 (mindicador.cl); cobro internacional por confirmar.
- **Verificación:** `node test_preview_v5.js` pasó. Edge/Chromium headless: 1440, 768, 390 y 320 px sin overflow, fuente cargada, sin cursivas, pausa/movimiento reducido y bloqueo del formulario correctos, sin errores JS. Capturas de escritorio y móvil revisadas. Playwright instalado solo en directorio temporal para esta comprobación; sin dependencia de producción.
- **Bloqueantes / pendientes:** Aprobación de tipografía; programa/cupos, condiciones estudiante/cupón y cobro internacional; planilla/webhook V5; lista de finalización V4 y envío real de certificados.
- **Próxima sesión:** Revisar propuesta actualizada y completar configuración de pagos/CRM antes de apertura.
- **Commits relevantes:** Ninguno; sin despliegue ni envío de correos.

---

### Session: 2026-09-17 — Corrección visual V5: recuperar identidad
- **Objetivo:** Corregir la propuesta genérica señalada por el usuario.
- **Hecho:** Revisados hero y keyframes originales; recuperadas manos flotantes, atmósfera, grano, títulos luminosos y CTA con glow en `preview_v5.html`. Añadidas esfera orbital, tarjetas escalonadas, foto del instructor y apariciones CSS progresivas. Control de pausa y prefers-reduced-motion.
- **Decidido:** Atlas rechazado; nueva dirección Territorios Imposibles evoluciona Superdesign original.
- **Bloqueantes / pendientes:** Revisión visual en navegador y aprobación del usuario. Playwright no está instalado en este proyecto. Persisten pendientes operativos V5/V4 anteriores.
- **Próxima sesión:** Revisar composición y animaciones con el usuario antes de promover el diseño.
- **Commits relevantes:** Ninguno.

---

### Session: 2026-09-17 — Propuesta Atlas V5 y preparación de cierre V4
- **Objetivo:** Preparar renovación V5, nueva inscripción/CRM y entrega de certificados V4 con agradecimiento y recomendación.
- **Hecho:** Prototipo navegable `preview_v5.html`; propuesta OpenSpec y checklist operativo con borrador del correo de cierre en `openspec/changes/prepare-v5-and-close-v4/`.
- **Decidido:** Propuesta cartográfica Atlas con tokens existentes. Configuración V5 separada de V4. Sin publicaciones ni envíos reales realizados.
- **Bloqueantes / pendientes:** Confirmar fechas, tarifas, programa y cupos V5; recibir nueva planilla y endpoint; lista de finalización V4, fecha de emisión y destino de recomendaciones. El filtro actual `Accesos Enviados` no acredita finalización. Falta revisión visual en navegador y prueba real aislada de PDF/correo.
- **Próxima sesión:** Revisar diseño con el usuario, completar datos, implementar y verificar CRM/formulario V5 y selección explícita de certificados V4; aplicar specs y archivar al completar.
- **Commits relevantes:** Ninguno.

---

### Session: 2026-09-12 — Cierre de inscripciones V4 y anuncio V5
- **Objective:** Cerrar las inscripciones web de la cohorte V4, bloquear el formulario y anunciar próximamente la Versión 5.
- **Completed Work:**
  - Actualizados los CTA y la sección `#protocolo` con el estado de inscripciones cerradas y el aviso V5.
  - El formulario quedó oculto, inerte, sin endpoint y protegido con `data-registration-closed="true"` para impedir envíos.
  - Actualizados `RULE-UI-004`, la matriz de trazabilidad y `AGENTS.md`.
  - Completado y archivado el cambio OpenSpec en `openspec/archive/2026-09-12-close-v4-registration/`.
- **Decisions:** Se conserva el formulario inactivo en el HTML para facilitar una futura reapertura, pero no expone el webhook ni admite interacciones o envíos.
- **Blocking / Pending:** Ninguno.
- **Next Steps:** Definir fechas y contenidos antes de reabrir inscripciones para V5.
- **Relevant Commits:** `39784ae`, `016adfc` (desplegados en `origin/master` y `origin/gh-pages`).

---

### Session: 2026-09-12 — Actualización de carpeta de grabaciones V4.0
- **Objective:** Configurar la nueva carpeta de Google Drive que se compartirá con los alumnos en los correos de grabaciones y recursos.
- **Completed Work:**
  - Actualizado `LINK_GRABACIONES_DRIVE` en `crm_script.gs` con la carpeta `https://drive.google.com/drive/folders/1omSvhwQ2WQng5rlLm4ADz6vJOmHTsRGN?usp=sharing`.
  - Sincronizada `RULE-CRM-004` en `openspec/specs/crm-automation/spec.md`.
  - El enlace centralizado se aplica a `enviarLinksConexion()`, `enviarGrabaciones()` y `enviarDiplomasYCierre()`.
- **Decisions:** Mantener una sola constante compartida para evitar enlaces divergentes entre correos.
- **Blocking / Pending:** Copiar la versión actualizada de `crm_script.gs` al editor de Google Apps Script antes del envío. Verificar destinatarios y permisos de lectura de la carpeta antes de ejecutar funciones masivas.
- **Next Steps:** Subir las grabaciones a la carpeta y ejecutar `enviarGrabaciones()` de forma controlada.
- **Relevant Commits:** `6a31969`.

---

### Session: 2026-09-11 — Actualización de enlaces Google Meet V4.0
- **Objective:** Reemplazar los enlaces de Google Meet de las 3 sesiones del Bootcamp V4.0 en el correo de accesos (`enviarLinksConexion()`), destinado a alumnos con estado `Tutorial Enviado` / `Tutorial Enviado V4`.
- **Completed Work:**
  - Actualizados los 3 enlaces en [crm_script.gs](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/crm_script.gs#L493-L507):
    - Sesión 1 (Vie 11-SEP): `https://meet.google.com/jqw-hvoi-acs` (antes `dkp-rpqg-ktc`).
    - Sesión 2 (Sáb 12-SEP): `https://meet.google.com/dma-gyfi-mkh` (antes `pgc-rmvk-dgj`).
    - Sesión 3 (Dom 13-SEP): `https://meet.google.com/jwr-rpgx-ncd` (antes `dos-fcdq-kee`).
- **Decisions:** Ninguna estructural. Solo sustitución de URLs; se mantiene el filtro estricto y la transición a `Accesos Enviados`.
- **Blocking / Pending:** El usuario debe pegar `crm_script.gs` en el editor de Apps Script, publicar nueva versión del Webhook y ejecutar `enviarLinksConexion()` manualmente (revisando destinatarios antes, según CRM Email Safety).
- **Next Steps:** Ejecutar el envío y confirmar la transición de estados en la planilla.
- **Relevant Commits:** `6a31969`.

---

### Session: 2026-09-03 — Cupón de descuento 'CONMAPAS' en Formulario Web y CRM
- **Objective:** Añadir un campo de código promocional en el formulario de inscripción donde al ingresar `CONMAPAS` se active la tarifa preferencial ($20.000 CLP para Chile vía MercadoPago/Transferencia y 22 USD para extranjeros vía PayPal), despachando las opciones correspondientes tanto en la interfaz en vivo como en los correos y recordatorios del CRM.
- **Completed Work:**
  - **Frontend ([index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html)):**
    - Añadido campo `cupon` (`#form-cupon`) en `#protocolo` con tipografía mono y mayúsculas automáticas.
    - Implementada función `evaluarCupon()` con badge visual animado en tiempo real que reacciona tanto a la escritura como al cambio de país en el selector circular de banderas.
    - Se despacha de forma asíncrona dentro del `FormData` habitual hacia el webhook de Apps Script.
  - **Backend CRM ([crm_script.gs](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/crm_script.gs)):**
    - En `doPost(e)`: captura y normalización de `cupon`.
    - Enrutamiento de montos y pasarelas: Chile -> MercadoPago `https://mpago.la/1E75xtF` y Transferencia $20.000 CLP; Extranjero -> PayPal `https://www.paypal.com/ncp/payment/RGT8AG7R7U4DA` (22 USD) y alternativa MercadoPago.
    - Registro en Google Sheets en columna `Plan` como `[Plan] [Cupón CONMAPAS: $20.000 CLP / 22 USD]`, manteniendo intacta la columna 8 (`Estado Pago`) y la integridad de triggers existentes.
    - Notificación inmediata al administrador en `[SYS.NOTIFY]` alertando la aplicación del cupón.
    - En `enviarRecordatoriosPago()`: detección de cupón en la columna plan para preservar la tarifa promocional en los avisos de 24h y 72h.
  - **Pruebas y Gobernanza:**
    - Creado [test_crm_cupon.js](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/test_crm_cupon.js) con 4 tests unitarios pasando al 100%.
    - Validado `node test_crm_oferta.js` y `python test_generar_diplomas.py`.
    - Formalizada regla `RULE-CRM-007` en [openspec/specs/crm-automation/spec.md](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/openspec/specs/crm-automation/spec.md) y en [openspec/specs/traceability-matrix.md](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/openspec/specs/traceability-matrix.md).
    - Actualizado [AGENTS.md](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/AGENTS.md).
- **Decisions:** El código del cupón se asienta dentro del campo `Plan` en la hoja de Google Sheets para no alterar el offset de columnas ni desplazar `Estado Pago` (columna 8), evitando incompatibilidades con cron triggers en producción.
- **Blocking / Pending:** Ninguno.
- **Next Steps:** Actualizar el código de `crm_script.gs` en el editor de Google Apps Script de producción.
- **Relevant Commits:** `1662bcc` (desplegado en `origin/master` y `origin/gh-pages`).

---

### Session: 2026-09-02 — Oferta exclusiva de recuperación por un día
- **Objective:** Recuperar postulantes que agotaron los recordatorios sin confirmar pago mediante una oferta válida solo durante el día de envío.
- **Completed Work:**
  - Incorporada `enviarOfertaExclusivaHoy()` en `crm_script.gs`, restringida al estado `Recordatorio Final Enviado` y ejecutable solo de forma manual.
  - Configurada oferta Chile de $20.000 CLP vía MercadoPago (`https://mpago.la/1E75xtF`) e internacional de 22 USD vía PayPal (`https://www.paypal.com/ncp/payment/RGT8AG7R7U4DA`).
  - La vigencia se calcula en `America/Santiago` hasta las 23:59 y el envío exitoso cambia el estado a `Oferta Exclusiva Enviada` para evitar duplicados.
  - Agregado `test_crm_oferta.js` para verificar destinatarios, precios, enlaces y transición de estados.
  - Formalizada `RULE-CRM-006` y archivado el cambio OpenSpec.
- **Decisions:** La campaña no se incorpora a `ejecutarCRM`; debe lanzarse manualmente para controlar el día exacto de vigencia.
- **Incident / Clarification:** El usuario reportó que una ejecución asociada a la prueba Chile terminó enviando contenido no esperado. `test_crm_oferta.js` usa datos simulados locales y no debe copiarse ni ejecutarse en Apps Script; tampoco se debe probar una función masiva sobre la hoja productiva.
- **Blocking / Pending:** Revisar en Gmail `Enviados` qué mensaje y destinatarios reales fueron alcanzados antes de repetir cualquier ejecución.
- **Next Steps:** Preparar una prueba aislada o modo de previsualización antes de nuevos envíos; luego confirmar pagos recibidos cambiando el estado correspondiente a `Pagado`.
- **Relevant Commits:** Sin commit en esta sesión.

---

### Session: 2026-08-24 — Refactorización Integral de `crm_script.gs` con `GmailApp` y Resolución de Triggers
- **Objective:** Resolver el fallo de entregabilidad en activadores desatendidos de Google Apps Script (`ejecutarCRM`), migrando completamente de `MailApp` a `GmailApp`, incorporando normalización de datos (`trim()`, `toLowerCase()`), helper `obtenerHoja()` seguro y telemetría de errores.
- **Completed Work:**
  - Refactorizado [crm_script.gs](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/crm_script.gs):
    - Migración a `GmailApp.sendEmail` en todos los flujos (`doPost`, `enviarRecordatoriosPago`, `enviarTutorialAutomático`, `enviarAvisoPayPalAtrasados`, `enviarLinksConexion`, `enviarGrabaciones`, `enviarDiplomasYCierre`).
    - Incorporación de `EMAIL_ADMIN = "jorge.ulloa.roa@gmail.com"` como constante y `replyTo` por defecto.
    - Implementación de `obtenerHoja()` para evitar desfases de pestaña activa en ejecuciones background por temporizador.
    - Traza explícita en consola (`console.log` / `console.error`) para auditoría en el panel de *Ejecuciones*.
- **Decisions:** Uso uniforme de `GmailApp` para garantizar visibilidad directa en la bandeja de *Enviados* y minimizar retención en filtros de spam.
- **Next Steps:** El usuario debe copiar el código maestro al editor de Google Apps Script, autorizar permisos y reconfigurar el activador por tiempo para `ejecutarCRM`.

---

### Session: 2026-08-18 — Oficialización de Superdesign en `index.html` & Configuración CRM V4.0
- **Objective:** Promover la estética **Superdesign (Dark Surrealist & Ethereal Motion)** como la versión oficial definitiva en [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html), conectar la nueva hoja de cálculo de Google Sheets ([crm_script.gs](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/crm_script.gs)) para la **Versión 4.0** (11, 12 y 13 de Septiembre de 2026).
- **Completed Work:**
  - Promoción oficial de `index.html` con Superdesign:
    - Navbar anclada en `top: 0` sin barras de A/B testing.
    - Franja de estadísticas de impacto (+80 capacitados, 10+ países, 4.9/5, 100% Cloud).
    - Syllabus reordenado en 3 columnas limpias y equilibradas.
    - SEO Meta tags configurados para la convocatoria V4.0.
  - Conexión del nuevo Webhook de Google Apps Script:
    - Webhook configurado: `https://script.google.com/macros/s/AKfycbwVkxrb1FNnYjpBJjUMUo2FhfUsMP64IQX2vV5YRNigue6YXScqCkfJ8FrY9A7WZzi1xQ/exec`
    - Formulario `#contact-form` enlazado y listo para recibir inscripciones directas en el nuevo Google Sheet.
  - Actualización completa de [crm_script.gs](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/crm_script.gs):
    - Fechas: **11, 12 y 13 de Septiembre de 2026** (20:00 a 21:30 hrs Chile).
    - Correos transaccionales, recordatorios y alerta al admin adaptados a la V4.0.
    - Motor de diplomas PDF actualizado a V4.0 con fecha de emisión el **14 de Septiembre de 2026**.
  - Gobernanza OpenSpec:
    - Actualizada la especificación viva [landing-page/spec.md](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/openspec/specs/landing-page/spec.md), [crm-automation/spec.md](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/openspec/specs/crm-automation/spec.md) y [diploma-engine/spec.md](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/openspec/specs/diploma-engine/spec.md).
    - Archivado el cambio en [openspec/archive/2026-08-18-v4-superdesign-official/proposal.md](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/openspec/archive/2026-08-18-v4-superdesign-official/proposal.md).
- **Decisions:** Webhook de la nueva hoja de Google Sheets conectado en producción. Formulario enriquecido con chips interactivos táctiles, telemetría de progreso y selector de país con banderas vectoriales circulares de alta definición (`circle-flags`). Lógica integral de cobro para Estudiantes implementada en `crm_script.gs`: Chile $25.000 CLP vía MercadoPago (`https://mpago.la/1EvJQi3`) e Internacional **29 USD** vía PayPal (`https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU`).
- **Commits:** `c6a747a`, `bc702eb`, `87401a1`, `c261121`, `2fd0190`, `85b5c2f`, `5d6fb2f`, `270a944`, `2fc36af`, `6f2442a`, `214fed7`, `9012879` (desplegado en `master` y `gh-pages`).
- **Next Steps:** Actualizar el código en el editor de Google Apps Script con la nueva versión de `crm_script.gs` y crear una nueva versión de implementación.

---

### Session: 2026-08-18 — Rediseño Superdesign (Dark Surrealist & Ethereal Motion) // Versión 4.0
- **Objective:** Desarrollar la variante [superdesign.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/superdesign.html) integrando el estilo visual **Superdesign** (Dark Obsidian `#050505`, acentos Ember Orange `#FF4500`, tipografía editorial `Playfair Display` + `Inter`, overlay de ruido orgánico, manos surrealistas flotantes 3D en keyframe loop, paralaje de tarjetas y micro-animaciones fluidas) para la cohorte **Versión 4.0** (11, 12 y 13 de Septiembre de 2026, 20:00 a 21:30 hrs Chile).
- **Completed Work:**
  - Creación y ajuste de [superdesign.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/superdesign.html):
    - **Franja de Estadísticas & Métricas de Impacto:** Reemplazo de los 4 badges genéricos por métricas de validación social:
      - `+80` Personas Capacitadas (3 Cohortes Exitosas).
      - `10+ Países` Toda Latinoamérica (Chile, México, Colombia, Perú, Argentina, España).
      - `4.9 / 5.0` Satisfacción Alumnos (Metodología & Código).
      - `100%` Open Source & Cloud (Costo Operativo $0).
    - **Reestructuración del Syllabus (3 Columnas):** Diseño modular balanceado de alta legibilidad con insignias cronológicas (Viernes 11-SEP, Sábado 12-SEP, Domingo 13-SEP), viñetas temáticas detalladas y duración.
    - **Atmósfera Surrealista:** Fondo de textura y esculturas 3D con animación flotante (`animate-float-left` y `animate-float-right`), overlay de ruido estático `grainy-gradients.vercel.app/noise.svg`.
    - **Tipografía Editorial:** `Playfair Display` con cursivas de lujo, resplandor suave (`text-shadow: 0 0 16px rgba(255,255,255,0.75)`), e `Inter` para cuerpos de texto ligeros.
    - **Fechas Oficiales V4:** 11, 12 y 13 de Septiembre de 2026 (20:00 a 21:30 hrs Chile).
    - **Formulario V4 Activo:** Integración funcional en `#protocolo` con campos estilizados `super-input`, validación y despacho directo hacia Google Apps Script.
  - Actualización de la barra de alternancia A/B en [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) enlazando a `superdesign.html`.
- **Decisions:** Adoptar la arquitectura visual de Superdesign solicitada por el usuario como variante candidata activa.
- **Next Steps:** Validación y feedback visual del usuario en el navegador local.

---

### Session: 2026-08-18 — Rediseño Bauhaus (Constructivist Modernism) & Apertura V4.0
- **Objective:** Desarrollar la variante [bauhaus.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/bauhaus.html) inspirada en el movimiento **Bauhaus / Constructivismo Modernista de 1920** (Kandinsky, Walter Gropius) y configurar la convocatoria de la **Versión 4.0** (11, 12 y 13 de Septiembre de 2026, 20:00 a 21:30 hrs Chile).
- **Completed Work:**
  - Creación de [bauhaus.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/bauhaus.html):
    - **Geometría y DNA:** Form Follows Function con círculos, cuadrados y triángulos puros. Radio binario estricto (`rounded-none` y `rounded-full`).
    - **Paleta Primaria:** Canvas `#F0F0F0`, Negro `#121212`, Rojo `#D02020`, Azul `#1040C0`, Amarillo `#F0C020`.
    - **Tipografía:** Google Font `Outfit` (`wght@400..900`) con titulares monumentales `leading-[0.92]` y tracking apretado.
    - **Bordes y Sombras Duras:** Bordes negros de 4px (`border-4 border-[#121212]`) y sombras sólidas offset (`shadow-[6px_6px_0px_0px_#121212]`, `shadow-[8px_8px_0px_0px_#121212]`).
    - **Micro-interacciones:** *Button press* mecánico (`active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`).
    - **Color Blocking:** Bloque azul en Hero con composición abstracta, bloque amarillo en Coordenadas, y tarjetas de syllabus con acentos geométricos primarios.
    - **Formulario V4 Activo:** Formulario en `#protocolo` con webhook a Google Apps Script, validación reactiva y feedback de confirmación.
  - Sincronización de barra de alternancia A/B en [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) y [bauhaus.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/bauhaus.html).
- **Decisions:** Proveer `bauhaus.html` como la nueva variante candidata de evaluación local manteniendo la funcionalidad al 100%.
- **Next Steps:** Validación local por parte del usuario para confirmar la adopción de Bauhaus como diseño principal.

---

### Session: 2026-08-18 — Apertura V4.0 y A/B Testing Local (Variante Terminal CLI)
- **Objective:** Implementar la actualización de la cohorte Versión 4.0 (11, 12 y 13 de Septiembre de 2026, 20:00 a 21:30 hrs Chile) y el nuevo sistema de diseño Terminal CLI / Retro Mainframe Hacker bajo una modalidad de **A/B Testing Local** para evaluación visual antes de promover a producción.
- **Completed Work:**
  - Creación de la variante [terminal.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/terminal.html) con la identidad Terminal CLI:
    - **Monospace Supremacy:** `JetBrains Mono` / `Space Mono` / `VT323` con cabeceras en mayúsculas (ALL CAPS).
    - **Tokens de Fósforo:** Fondo `#0a0a0a`, Verde Fósforo `#33ff00`, Ámbar `#ffb000`, Muted `#1f521f` y Alerta `#ff3333`.
    - **Geometría y Paneles:** `border-radius: 0px` estricto en todos los componentes, marcos tipo `tmux` splits con cabeceras `+--- [TITLE] ---+`.
    - **Efectos Retro:** Overlay CRT scanlines (`pointer-events: none`), brillo de fósforo (*phosphor glow*), banner ASCII Art en cabecera, barras de progreso de caracteres `[||||||||||.....]` y cursores parpadeantes `█`.
    - **Botones Inverted Video:** Hover con fondo verde y texto negro invertido.
  - Configuración completa de la Versión 4.0:
    - Fechas: **11, 12 y 13 de Septiembre de 2026** (20:00 a 21:30 hrs GMT-4).
    - Reactivación funcional del formulario de captura `#protocolo` enlazado con el webhook de Google Apps Script (`crm_script.gs`).
  - Implementación de la barra superior de conmutación A/B en [index.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/index.html) y [terminal.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/terminal.html) para alternar entre ambas identidades visuales con un solo clic.
  - Formalización del cambio activo en OpenSpec: `openspec/changes/v4-launch-prep/` (`proposal.md`, `tasks.md`, `specs/landing-page.delta.md`).
- **Decisions:** Mantener `index.html` como Variante A (Neon Tokyo) y `terminal.html` como Variante B (Terminal CLI) hasta recibir aprobación final del usuario para el reemplazo definitivo.
- **Next Steps:** Revisión del usuario en el navegador local para seleccionar el estilo preferido y proceder al despliegue en `origin/master` y `origin/gh-pages`.

---

### Session: 2026-08-18 — Implementación del Estándar OpenSpec y Matriz de Trazabilidad
- **Objective:** Aplicar el estándar OpenSpec (Spec-Driven Development) en el repositorio para blindar la trazabilidad bidireccional de reglas de negocio, código y ciclo de vida de cambios.
- **Completed Work:**
  - Creación de la estructura canónica `openspec/` con `project.md`, `specs/`, `changes/` y `archive/`.
  - Formalización de especificaciones vivas para todos los dominios del sistema:
    - [landing-page/spec.md](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/openspec/specs/landing-page/spec.md) (`RULE-UI-001` a `RULE-UI-004`).
    - [crm-automation/spec.md](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/openspec/specs/crm-automation/spec.md) (`RULE-CRM-001` a `RULE-CRM-005`).
    - [diploma-engine/spec.md](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/openspec/specs/diploma-engine/spec.md) (`RULE-DIP-001` a `RULE-DIP-004`).
    - [deployment-ops/spec.md](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/openspec/specs/deployment-ops/spec.md) (`RULE-OPS-001` a `RULE-OPS-004`).
  - Creación de la [Matriz de Trazabilidad](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/openspec/specs/traceability-matrix.md) mapeando IDs de reglas con código fuente en `crm_script.gs`, `index.html`, `generate_pdf.py` y tests.
  - Migración y estructuración histórica de los cambios anteriores en `openspec/archive/`:
    - `2026-08-07-deactivate-registration/`
    - `2026-08-07-crm-google-meet-links/`
    - `2026-08-14-v3-closing-diplomas/`
  - Creación del workspace para cambios activos en `openspec/changes/v4-launch-prep/`.
  - Actualización de [AGENTS.md](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/AGENTS.md) y [README.md](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/README.md) integrando el flujo de trabajo SDD.
  - Verificación local ejecutando suite de tests de diplomas (`test_generar_diplomas.py`).
- **Decisions:** 
  - Taxonomía estandarizada con prefijos `RULE-UI-*`, `RULE-CRM-*`, `RULE-DIP-*` y `RULE-OPS-*`.
  - Todo cambio futuro se gestionará obligatoriamente vía *Delta Specs* bajo el ciclo Propose → Apply → Verify → Archive.
- **Next Steps:** Definir temario y enlaces de pago para la Versión 4.0 dentro de `openspec/changes/v4-launch-prep/`.

---

### Session: 2026-08-14 — Replicación de Cierre V3, Diplomas PDF, Canva y Horas Lectivas/Prácticas
- **Objective:** Ajustar la intensidad horaria del diploma a 5 horas lectivas + 4 horas de práctica (9 hrs totales), e implementar filtro estricto en `enviarDiplomasYCierre()` para despachar diplomas y recursos (Drive + presentaciones en Canva `https://canva.link/workshop-gis-ia`) únicamente a filas con estado `"Accesos Enviados"`.
- **Completed Work:**
  - Actualización de `crm_script.gs` con `LINK_PRESENTACIONES_CANVA` y `LINK_GRABACIONES_DRIVE`, incorporando los bloques de Diploma PDF, Presentaciones web, Bóveda Google Drive e invitación a compartir en LinkedIn.
  - Configuración del filtro estricto: `if (estado === "Accesos Enviados" && email !== "")`.
  - Actualización sincronizada de plantillas visuales en [preview_final_bootcamp.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/preview_final_bootcamp.html) y [preview_correos.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/preview_correos.html).
  - Verificación local previa mediante `test_generar_diplomas.py` confirmando renderizado correcto de PDFs.
- **Decisions:** 
  - Condición estricta: `if (estado === "Accesos Enviados" && email !== "")`.
  - Transición a `"Diploma Enviado"` en la columna 8 tras despacho.
- **Commits & Deploy:** 
  - Commits `bc56f51` y `38c8ee3` enviados a `origin/master` y fusionados en `origin/gh-pages`.

---

### Session: 2026-08-07 — Actualización de Links Google Meet y Script CRM
- **Objective:** Actualizar los enlaces de Google Meet de las 3 sesiones del Bootcamp Geo-IA V3 en la plantilla de correo e implementar el script de automatización CRM (`crm_script.gs`) para el envío masivo de accesos a alumnos confirmados.
- **Completed Work:**
  - Creación del archivo de automatización Apps Script `crm_script.gs` con la lógica de filtrado de alumnos pagados/confirmados y envío vía GmailApp.
  - Actualización de los enlaces de videollamada en [preview_correos.html](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/preview_correos.html):
    - **Sesión 1 (Viernes 7, 20:00 - 21:30 hrs):** `https://meet.google.com/dkp-rpqg-ktc`
    - **Sesión 2 (Sábado 8, 20:00 - 21:30 hrs):** `https://meet.google.com/pgc-rmvk-dgj`
    - **Sesión 3 (Domingo 9, 20:00 - 21:30 hrs):** `https://meet.google.com/dos-fcdq-kee`
- **Commits & Deploy:** 
  - Commit `5d3585b` enviado a `origin/master` y a `origin/gh-pages` en `geoidegeoidal/spatial-ia-web.git`.

---

### Session: 2026-08-07 — Desactivación de Formulario e Inscripciones V4
- **Objective:** Desactivar el formulario web de inscripción y desplegar el aviso "Inscripciones cerradas, pronto comunicaremos la versión 4 del taller." de forma segura sin romper navegación ni scripts.
- **Completed Work:**
  - Actualización de `index.html` y `avantgarde.html` sustituyendo el elemento `<form>` por tarjeta estética informando cierre de inscripciones y preparación de la Versión 4.
  - Actualización de botones CTA en la navegación, sección principal (hero) y tarjetas de precios.
  - Protección y desacoplamiento del handler JS del formulario (`if (form)`) para garantizar que la ejecución de scripts (scroll suave, animaciones de intersección, efecto typewriter) permanezca intacta.
- **Decisions:** Mantener el identificador `#protocolo` en la sección de estado para preservar la funcionalidad de navegación por scroll suave.
- **Commits & Deploy:** 
  - Commit `e8cf4af` enviado a `origin/master`.
  - Rama `master` fusionada y subida a `origin/gh-pages` (commit `d1ca20d`).
  - Despliegue verificado en producción a través de GitHub Pages (`https://geoidegeoidal.github.io/spatial-ia-web/`).
- **Next Steps:** Anunciar el lanzamiento oficial de la Versión 4.0 cuando los contenidos estén definidos.
