// ============================================================================
// CRM BOOTCAMP GEO-IA V5
// Flujo: inscripción -> correos -> recordatorios -> pago validado -> tutorial.
// La única acción manual habitual es escribir "Pagado" en la columna H después
// de revisar el comprobante. Los diplomas V4 se gestionan en otro script.
// ============================================================================

// Configuración fija de V5. Usa la planilla y la pestaña gid=0 que ya existen.
const CRM_V5 = Object.freeze({
  spreadsheetId: "13MgX1IAFHdkJCMrv6Iz1uu1q4zy8fZWR9HICcZ2glDs",
  sheetId: 0,
  adminEmail: "jorge.ulloa.roa@gmail.com",
  mercadoPagoGeneral: "https://www.mercadopago.cl/payment-link/v1/go?link-id=f7b0764f-2801-4b26-a858-59c416eebe42",
  mercadoPagoEstudiante: "https://mpago.la/1EvJQi3",
  paypalGeneral: "https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU",
  tutorial: "https://drive.google.com/file/d/1zta-19rP4KlyDLXrU3Tgjsk9gKarmX7e/view?usp=sharing"
});

const ENCABEZADOS_V5 = ["Fecha", "Nombre", "Email", "País", "Nivel SIG", "Profesión", "Plan", "Estado Pago"];

// ---------------------------------------------------------------------------
// 1. PREPARACIÓN ÚNICA
// Valida la hoja existente, fija la zona horaria e instala un ciclo cada hora.
// No crea, borra, renombra ni reformatea hojas.
// ---------------------------------------------------------------------------
function prepararCRMV5() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw new Error("Otra configuración está en ejecución.");
  try {
    var planilla = SpreadsheetApp.openById(CRM_V5.spreadsheetId);
    var hoja = planilla.getSheetById(CRM_V5.sheetId);
    if (!hoja) throw new Error("No existe la pestaña V5 gid=0.");
    validarHojaV5_(hoja);
    planilla.setSpreadsheetTimeZone("America/Santiago");
    var anteriores = ScriptApp.getProjectTriggers().filter(function(trigger) { return trigger.getHandlerFunction() === "ejecutarCRMV5"; });
    ScriptApp.newTrigger("ejecutarCRMV5").timeBased().everyHours(1).create();
    anteriores.forEach(function(trigger) { ScriptApp.deleteTrigger(trigger); });
    return { planilla: planilla.getName(), pestaña: hoja.getName(), estado: "lista" };
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------------------
// 2. ENDPOINT DEL FORMULARIO
// Recibe FormData o application/x-www-form-urlencoded desde la landing.
// Apps Script puede responder HTTP 200 incluso ante errores; el frontend debe
// comprobar que el JSON incluya result === "success".
// ---------------------------------------------------------------------------
function doPost(e) {
  try {
    return respuestaV5_({ result: "success", registro: registrarInscripcionV5_(e && e.parameter ? e.parameter : {}) });
  } catch (error) {
    console.error(error.stack || error.toString());
    return respuestaV5_({ result: "error", error: error.message || error.toString() });
  }
}

// Registra una inscripción única y trata por separado los dos correos para que
// un fallo del aviso administrativo no impida intentar el correo al participante.
function registrarInscripcionV5_(parametros) {
  var datos = validarRegistroV5_(parametros);
  var hoja = obtenerHojaV5_();
  var fila;
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw new Error("El sistema está procesando otra inscripción. Intenta nuevamente.");
  try {
    validarHojaV5_(hoja);
    if (correoExisteV5_(hoja, datos.email)) throw new Error("Este correo ya está registrado en V5.");
    hoja.appendRow([new Date(), literalHojaV5_(datos.nombre), datos.email, literalHojaV5_(datos.pais), literalHojaV5_(datos.nivelSig), literalHojaV5_(datos.profesion), datos.plan, "Preparando correo"]);
    fila = hoja.getLastRow();
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }

  var adminEnviado = false;
  var participanteEnviado = false;
  var errores = [];
  try {
    GmailApp.sendEmail(CRM_V5.adminEmail, "[V5] Nueva inscripción: " + datos.nombre, "Nombre: " + datos.nombre + "\nEmail: " + datos.email + "\nPaís: " + datos.pais + "\nPlan: " + datos.plan, { name: "Bootcamp Geo-IA CRM", replyTo: datos.email });
    adminEnviado = true;
    actualizarEstadoEmailV5_(hoja, datos.email, ["Preparando correo"], "Notificación Admin Enviada", true);
  } catch (error) {
    errores.push("notificación administrativa");
  }
  try {
    var correo = prepararCorreoRegistroV5_(datos);
    GmailApp.sendEmail(datos.email, "Tu inscripción al Bootcamp Geo-IA V5", correo.texto, { htmlBody: correo.html, name: "Bootcamp Geo-IA", replyTo: CRM_V5.adminEmail });
    participanteEnviado = true;
  } catch (error) {
    errores.push("correo del participante");
  }
  var estadoFinal = adminEnviado && participanteEnviado ? "Pendiente"
    : participanteEnviado ? "Revisar Notificación Admin"
    : adminEnviado ? "Revisar Correo Participante" : "Revisar Ambos Correos";
  try {
    actualizarEstadoEmailV5_(hoja, datos.email, ["Preparando correo", "Notificación Admin Enviada"], estadoFinal, true);
  } catch (errorEstado) {
    errores.push("actualización del estado");
    try { actualizarEstadoEmailV5_(hoja, datos.email, ["Preparando correo", "Notificación Admin Enviada", "Pendiente"], "Revisar Estado Registro", true); }
    catch (errorRevision) { console.error("No se pudo marcar Revisar Estado Registro: " + errorRevision.message); }
  }
  if (errores.length) throw new Error("No se completó: " + errores.join(", ") + ". Revisa la fila y Gmail antes de reintentar.");
  fila = buscarFilaPorEmailV5_(hoja, datos.email);
  return { fila: fila, estado: String(hoja.getRange(fila, 8).getValue() || "") };
}

// Valida el límite de cada campo, los planes permitidos y la restricción Chile.
// Cualquier parámetro de cupón se rechaza expresamente en V5.
function validarRegistroV5_(p) {
  var nombre = limpiarV5_(p.name || p.nombre, 100);
  var email = limpiarV5_(p.email, 254).toLowerCase();
  var pais = limpiarV5_(p.country || p.pais, 80);
  var nivelSig = limpiarV5_(p.nivel_sig, 120);
  var profesion = limpiarV5_(p.ocupacion || p.profesion, 120);
  var planEntrada = limpiarV5_(p.plan, 60).toLowerCase();
  if (limpiarV5_(p.cupon || p.coupon || p.codigo || p.promo, 60)) throw new Error("V5 no admite cupones ni códigos promocionales.");
  if (nombre.length < 2) throw new Error("Ingresa un nombre válido.");
  if (!/^[^\s@,;<>"']+@[^\s@,;<>"']+\.[^\s@,;<>"']+$/.test(email)) throw new Error("Ingresa un correo válido.");
  if (pais.length < 2) throw new Error("Selecciona tu país.");
  var esChile = pais.toLowerCase() === "chile";
  var plan;
  if (["general", "acceso general", "pase general"].indexOf(planEntrada) !== -1) plan = "Pase general";
  else if (["estudiante", "estudiantes", "pase estudiante", "pase estudiantes"].indexOf(planEntrada) !== -1) plan = "Pase estudiantes";
  else throw new Error("Selecciona un plan válido.");
  if (!esChile && plan === "Pase estudiantes") throw new Error("El pase estudiantes está disponible solo para Chile.");
  return { nombre: nombre, email: email, pais: pais, nivelSig: nivelSig, profesion: profesion, plan: plan, esChile: esChile };
}

// Construye el correo inicial con el precio y pasarela correspondientes.
function prepararCorreoRegistroV5_(datos) {
  var pago = pagoV5_(datos.pais, datos.plan);
  var nombreHtml = escaparHtmlV5_(datos.nombre);
  var detalleEstudiante = pago.estudiante ? " Adjunta también un certificado de alumno regular vigente." : "";
  var transferencia = datos.esChile
    ? "\nAlternativa por transferencia: Banco Falabella, cuenta corriente 019823326523, RUT 18.223.053-7, Jorge Fernando Ulloa Roa."
    : "";
  var texto = "Hola " + datos.nombre + ",\n\nRecibimos tu inscripción al Bootcamp Geo-IA V5.\nPlan: " + datos.plan + "\nMonto: " + pago.monto + "\nPago: " + pago.enlace + transferencia + "\n\nDespués de pagar, responde este correo con el comprobante." + detalleEstudiante + "\n\nFechas: 16, 17 y 18 de octubre de 2026\nHorario: 20:00–21:30, Santiago de Chile (UTC−3).";
  var html = '<div style="background:#080909;color:#f4f3ed;padding:32px;font-family:Arial,sans-serif"><div style="max-width:620px;margin:auto;border:1px solid #2b2d2b;padding:32px"><p style="color:#ff541c;font-family:monospace">INSCRIPCIÓN RECIBIDA / V5</p><h1 style="font-size:25px">Hola, ' + nombreHtml + '.</h1><p>Recibimos tu inscripción al Bootcamp Geo-IA V5.</p><div style="background:#111;border-left:3px solid #ff541c;padding:18px;margin:24px 0"><strong>' + escaparHtmlV5_(datos.plan) + '</strong><br><span style="font-size:24px;color:#ff541c">' + pago.monto + '</span></div><a href="' + pago.enlace + '" style="display:block;background:#ff541c;color:#080909;text-decoration:none;text-align:center;padding:15px;font-weight:bold">PAGAR CON ' + pago.medio.toUpperCase() + '</a>' + (datos.esChile ? '<p style="color:#aaa;font-size:13px">También puedes transferir a Banco Falabella, cuenta corriente 019823326523, RUT 18.223.053-7, Jorge Fernando Ulloa Roa.</p>' : '') + '<p>Después de pagar, responde este correo con el comprobante.' + (pago.estudiante ? ' Adjunta también un certificado de alumno regular vigente.' : '') + '</p><p style="border-top:1px solid #2b2d2b;padding-top:18px;color:#aaa">16, 17 y 18 de octubre de 2026<br>20:00–21:30 · Santiago de Chile (UTC−3)</p></div></div>';
  return { texto: texto, html: html };
}

// ---------------------------------------------------------------------------
// 3. CICLO AUTOMÁTICO HORARIO
// El activador creado por prepararCRMV5 ejecuta recordatorios y tutoriales.
// ---------------------------------------------------------------------------
function ejecutarCRMV5() {
  enviarRecordatoriosPagoV5();
  enviarTutorialesPagadosV5();
}

// Envía un recordatorio a las 24 horas y uno final a las 72 horas.
// Los estados Enviando/Revisar evitan repetir correos cuyo resultado sea incierto.
function enviarRecordatoriosPagoV5() {
  var hoja = obtenerHojaV5_();
  validarHojaV5_(hoja);
  var datos = hoja.getDataRange().getValues();
  var ahora = new Date();
  var enviados = 0;
  for (var i = 1; i < datos.length; i++) {
    var estado = String(datos[i][7] || "");
    var horas = (ahora - new Date(datos[i][0])) / 3600000;
    var tipo = estado === "Recordatorio Enviado" && horas >= 72 ? "72h" : estado === "Pendiente" && horas >= 24 ? "24h" : "";
    if (!tipo) continue;
    var reservado = "Enviando Recordatorio " + tipo;
    var nombre = String(datos[i][1] || "Estudiante").trim();
    var email = String(datos[i][2] || "").trim().toLowerCase();
    var pais = String(datos[i][3] || "").trim();
    var plan = String(datos[i][6] || "").trim();
    if (!reservarEstadoV5_(hoja, email, estado, reservado)) continue;
    try {
      if (!/^[^\s@,;<>"']+@[^\s@,;<>"']+\.[^\s@,;<>"']+$/.test(email)) throw new Error("Correo inválido");
      var pago = pagoV5_(pais, plan);
      var asunto = tipo === "72h" ? "[ÚLTIMO RECORDATORIO] Inscripción Bootcamp Geo-IA V5" : "[RECORDATORIO] Completa tu inscripción al Bootcamp Geo-IA V5";
      var texto = "Hola " + nombre + ",\n\nTu inscripción al Bootcamp Geo-IA V5 sigue pendiente de pago.\nPlan: " + plan + "\nMonto: " + pago.monto + "\nPago: " + pago.enlace + "\n\nDespués de pagar, responde este correo con el comprobante." + (pago.estudiante ? " Adjunta también un certificado de alumno regular vigente." : "") + "\n\nFechas: 16, 17 y 18 de octubre de 2026, 20:00–21:30 (Santiago de Chile).";
      GmailApp.sendEmail(email, asunto, texto, { htmlBody: correoRecordatorioV5_(nombre, pago, tipo), name: "Bootcamp Geo-IA", replyTo: CRM_V5.adminEmail });
      finalizarEstadoV5_(hoja, email, [reservado], tipo === "72h" ? "Recordatorio Final Enviado" : "Recordatorio Enviado");
      enviados++;
    } catch (error) {
      finalizarEstadoV5_(hoja, email, [reservado], "Revisar Recordatorio " + tipo);
      console.error("Recordatorio V5 " + email + ": " + error.message);
    }
  }
  return enviados;
}

// ---------------------------------------------------------------------------
// 4. TUTORIAL DESPUÉS DEL PAGO
// El operador valida el comprobante escribiendo exactamente "Pagado" en H.
// En el siguiente ciclo horario se envía el tutorial y queda "Tutorial Enviado".
// ---------------------------------------------------------------------------
function enviarTutorialesPagadosV5() {
  var hoja = obtenerHojaV5_();
  validarHojaV5_(hoja);
  var datos = hoja.getDataRange().getValues();
  var enviados = 0;
  for (var i = 1; i < datos.length; i++) {
    if (String(datos[i][7] || "") !== "Pagado") continue;
    var nombre = String(datos[i][1] || "Estudiante").trim();
    var email = String(datos[i][2] || "").trim().toLowerCase();
    if (!reservarEstadoV5_(hoja, email, "Pagado", "Enviando Tutorial")) continue;
    try {
      if (!/^[^\s@,;<>"']+@[^\s@,;<>"']+\.[^\s@,;<>"']+$/.test(email)) throw new Error("Correo inválido");
      var texto = "Hola " + nombre + ",\n\nTu pago para el Bootcamp Geo-IA V5 fue validado. Revisa el tutorial de preparación antes de la primera sesión:\n" + CRM_V5.tutorial + "\n\nFechas: 16, 17 y 18 de octubre de 2026\nHorario: 20:00–21:30, Santiago de Chile (UTC−3).\n\nLos enlaces de conexión se enviarán por correo antes del curso.";
      var html = '<div style="background:#080909;color:#f4f3ed;padding:32px;font-family:Arial,sans-serif"><div style="max-width:620px;margin:auto;border:1px solid #2b2d2b;padding:32px"><p style="color:#ff541c;font-family:monospace">PAGO VALIDADO / V5</p><h1 style="font-size:25px">Tu acceso está confirmado, ' + escaparHtmlV5_(nombre) + '.</h1><p>Revisa el tutorial de preparación antes de la primera sesión.</p><a href="' + CRM_V5.tutorial + '" style="display:block;background:#ff541c;color:#080909;text-decoration:none;text-align:center;padding:15px;font-weight:bold">ABRIR TUTORIAL</a><p style="border-top:1px solid #2b2d2b;padding-top:18px;color:#aaa">16, 17 y 18 de octubre de 2026<br>20:00–21:30 · Santiago de Chile (UTC−3)<br>Los enlaces de conexión se enviarán por correo antes del curso.</p></div></div>';
      GmailApp.sendEmail(email, "[PREPARACIÓN] Tutorial Bootcamp Geo-IA V5", texto, { htmlBody: html, name: "Bootcamp Geo-IA", replyTo: CRM_V5.adminEmail });
      finalizarEstadoV5_(hoja, email, ["Enviando Tutorial", "Pagado"], "Tutorial Enviado");
      enviados++;
    } catch (error) {
      finalizarEstadoV5_(hoja, email, ["Enviando Tutorial", "Pagado"], "Revisar Tutorial");
      console.error("Tutorial V5 " + email + ": " + error.message);
    }
  }
  return enviados;
}

// Devuelve la tarifa y pasarela autorizadas para país/plan.
function pagoV5_(pais, plan) {
  var esChile = String(pais).trim().toLowerCase() === "chile";
  var estudiante = String(plan).trim().toLowerCase() === "pase estudiantes";
  if (!esChile && estudiante) throw new Error("El pase estudiantes está disponible solo para Chile.");
  if (!esChile) return { monto: "US$36", enlace: CRM_V5.paypalGeneral, medio: "PayPal", estudiante: false };
  return estudiante
    ? { monto: "$30.000 CLP", enlace: CRM_V5.mercadoPagoEstudiante, medio: "MercadoPago", estudiante: true }
    : { monto: "$35.000 CLP", enlace: CRM_V5.mercadoPagoGeneral, medio: "MercadoPago", estudiante: false };
}

// Plantilla HTML compartida por los recordatorios de 24 y 72 horas.
function correoRecordatorioV5_(nombre, pago, tipo) {
  var titulo = tipo === "72h" ? "Último recordatorio" : "Tu inscripción sigue pendiente";
  return '<div style="background:#080909;color:#f4f3ed;padding:32px;font-family:Arial,sans-serif"><div style="max-width:620px;margin:auto;border:1px solid #2b2d2b;padding:32px"><p style="color:#ff541c;font-family:monospace">RECORDATORIO ' + tipo.toUpperCase() + ' / V5</p><h1 style="font-size:25px">' + titulo + ', ' + escaparHtmlV5_(nombre) + '.</h1><p>Completa el pago y responde este correo con el comprobante.</p><div style="background:#111;border-left:3px solid #ff541c;padding:18px;margin:24px 0"><strong>' + pago.monto + '</strong></div><a href="' + pago.enlace + '" style="display:block;background:#ff541c;color:#080909;text-decoration:none;text-align:center;padding:15px;font-weight:bold">PAGAR CON ' + pago.medio.toUpperCase() + '</a></div></div>';
}

// ---------------------------------------------------------------------------
// 5. TRANSICIONES SEGURAS DE ESTADO
// Las filas se localizan por correo, no por número, para tolerar ordenamientos.
// El lock evita que dos ejecuciones del CRM procesen el mismo estado a la vez.
// ---------------------------------------------------------------------------
function reservarEstadoV5_(hoja, email, esperado, reservado) {
  return actualizarEstadoEmailV5_(hoja, email, [esperado], reservado, false) === reservado;
}

// Finaliza solo estados esperados; un cambio manual ajeno no se sobrescribe.
function finalizarEstadoV5_(hoja, email, esperados, final) {
  return actualizarEstadoEmailV5_(hoja, email, esperados, final, false);
}

// Realiza una transición compare-and-set. Durante el registro puede preservar
// "Pagado" si el operador valida el comprobante mientras se envían los correos.
function actualizarEstadoEmailV5_(hoja, email, esperados, final, preservarPagado) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) throw new Error("No se pudo bloquear la hoja para guardar el estado de " + email + ".");
  try {
    var fila = buscarFilaPorEmailV5_(hoja, email);
    var celda = hoja.getRange(fila, 8);
    var actual = String(celda.getValue() || "");
    if (preservarPagado && actual === "Pagado") return actual;
    if (esperados.indexOf(actual) === -1) return actual;
    celda.setValue(final);
    SpreadsheetApp.flush();
    return String(celda.getValue() || "");
  } finally {
    lock.releaseLock();
  }
}

// Exige un único correo coincidente. Duplicados manuales hacen fallar el ciclo.
function buscarFilaPorEmailV5_(hoja, email) {
  var coincidencias = [];
  if (hoja.getLastRow() >= 2) {
    hoja.getRange(2, 3, hoja.getLastRow() - 1, 1).getValues().forEach(function(valor, i) {
      if (String(valor[0] || "").trim().toLowerCase() === email) coincidencias.push(i + 2);
    });
  }
  if (coincidencias.length !== 1) throw new Error(coincidencias.length ? "Correo duplicado en la hoja: " + email : "No se encontró la fila de " + email);
  return coincidencias[0];
}

// ---------------------------------------------------------------------------
// 6. ACCESO Y VALIDACIÓN DE LA HOJA EXISTENTE
// ---------------------------------------------------------------------------
function obtenerHojaV5_() {
  var hoja = SpreadsheetApp.openById(CRM_V5.spreadsheetId).getSheetById(CRM_V5.sheetId);
  if (!hoja) throw new Error("No existe la pestaña V5 gid=0.");
  return hoja;
}

// Comprueba los ocho encabezados antes de leer o escribir información.
function validarHojaV5_(hoja) {
  var encabezados = hoja.getRange(1, 1, 1, 8).getValues()[0];
  if (ENCABEZADOS_V5.some(function(valor, i) { return String(encabezados[i] || "").trim() !== valor; })) {
    throw new Error("La pestaña V5 gid=0 no tiene los encabezados A:H esperados.");
  }
}

// Evita registrar dos veces el mismo correo dentro de V5.
function correoExisteV5_(hoja, email) {
  if (hoja.getLastRow() < 2) return false;
  return hoja.getRange(2, 3, hoja.getLastRow() - 1, 1).getValues().some(function(fila) {
    return String(fila[0] || "").trim().toLowerCase() === email;
  });
}

// ---------------------------------------------------------------------------
// 7. SEGURIDAD Y RESPUESTAS
// ---------------------------------------------------------------------------
// Elimina controles y saltos de línea para proteger asuntos, logs y celdas.
function limpiarV5_(valor, maximo) {
  return String(valor == null ? "" : valor).replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, maximo);
}

// Fuerza texto literal en Sheets para neutralizar fórmulas ingresadas por web.
function literalHojaV5_(valor) {
  return /^[=+\-@]/.test(valor) ? "'" + valor : valor;
}

// Escapa contenido dinámico antes de insertarlo en correos HTML.
function escaparHtmlV5_(valor) {
  return String(valor).replace(/[&<>"']/g, function(c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
}

// Respuesta JSON común para éxito y error del webhook.
function respuestaV5_(datos) {
  return ContentService.createTextOutput(JSON.stringify(datos)).setMimeType(ContentService.MimeType.JSON);
}
