// =======================================================================
// CÓDIGO MAESTRO BOOTCAMP VERSIÓN 4 (EDICIÓN SUPERDESIGN / HIGH-TECH)
// =======================================================================

// Constantes de Diseño (ADN Spur.us / Superdesign)
const ESTILO_BASE = "font-family: 'Space Grotesk', 'Courier New', monospace; background-color: #000000; color: #FFFFFF; padding: 40px 20px; text-align: left; line-height: 1.6;";
const CONTENEDOR = "max-width: 600px; margin: 0 auto; background-color: #0A0A0A; border: 1px solid #222222; padding: 40px;";
const BADGE_VERDE = "display: inline-block; padding: 4px 8px; border: 1px solid #FF4500; color: #FF4500; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; margin-bottom: 20px;";
const BADGE_ROJO = "display: inline-block; padding: 4px 8px; border: 1px solid #ff3333; color: #ff3333; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; margin-bottom: 20px;";
const TITULO_H1 = "color: #FFFFFF; margin-top: 0; font-size: 24px; font-weight: normal; font-family: 'Inter', Arial, sans-serif; letter-spacing: -0.5px;";
const TEXTO_SECUNDARIO = "color: #888888; font-size: 14px; margin-bottom: 30px;";
const BLOQUE_INFO = "background-color: #000000; border: 1px solid #222222; border-left: 2px solid #FF4500; padding: 20px; margin-bottom: 30px;";
const BLOQUE_INFO_SECUNDARIO = "background-color: #000000; border: 1px solid #222222; border-left: 2px solid #888888; padding: 20px; margin-bottom: 30px;";
const BOTON_SOLIDO = "display: block; background-color: #FF4500; color: #FFFFFF; text-align: center; padding: 14px 20px; text-decoration: none; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 15px 0;";
const BOTON_TERMINAL = "display: inline-block; background-color: transparent; color: #FF4500; text-decoration: none; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-top: 20px;";

// Enlaces de Recursos Oficiales V4.0
const LINK_GRABACIONES_DRIVE = "https://drive.google.com/drive/folders/1vRA1fkfG01kLL3DfMeVres5re51YqlTg?usp=sharing";
const LINK_PRESENTACIONES_CANVA = "https://canva.link/workshop-gis-ia";
const EMAIL_ADMIN = "jorge.ulloa.roa@gmail.com";
const LINK_OFERTA_MERCADOPAGO = "https://mpago.la/1E75xtF";
const LINK_OFERTA_PAYPAL = "https://www.paypal.com/ncp/payment/RGT8AG7R7U4DA";

// Helper para obtener la hoja activa o la primera hoja de forma segura
function obtenerHoja() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getActiveSheet() || ss.getSheets()[0];
}

// ---------------------------------------------------------------------------------
// 1. RECEPTOR DE INSCRIPCIONES (WEBHOOK WEB APP)
// ---------------------------------------------------------------------------------
function doPost(e) {
  try {
    var name = e.parameter.name ? e.parameter.name.toString().trim() : "";
    var userEmail = e.parameter.email ? e.parameter.email.toString().trim() : "";
    var country = e.parameter.country ? e.parameter.country.toString().trim() : "";
    var nivel_sig = e.parameter.nivel_sig ? e.parameter.nivel_sig.toString().trim() : "";
    var ocupacion = e.parameter.ocupacion ? e.parameter.ocupacion.toString().trim() : "";
    var plan = e.parameter.plan ? e.parameter.plan.toString().trim() : "";
    var cupon = e.parameter.cupon ? e.parameter.cupon.toString().trim().toUpperCase() : "";
    var timestamp = new Date();

    var tieneCuponConMapas = cupon === "CONMAPAS";
    var planRegistrado = plan;
    if (tieneCuponConMapas) {
      planRegistrado = (plan ? plan : "Acceso General") + " [Cupón CONMAPAS: $20.000 CLP / 22 USD]";
    }

    var sheet = obtenerHoja();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Fecha", "Nombre", "Email", "País", "Nivel SIG", "Profesión", "Plan", "Estado Pago"]);
      sheet.getRange("A1:H1").setFontWeight("bold").setBackground("#FF4500").setFontColor("#FFFFFF");
    }
    sheet.appendRow([timestamp, name, userEmail, country, nivel_sig, ocupacion, planRegistrado, "Pendiente"]);

    // Notificación al Administrador
    try {
      var detalleCupon = tieneCuponConMapas ? "\nCUPÓN APLICADO: CONMAPAS (Tarifa promocional $20.000 CLP / 22 USD)" : (cupon ? "\nCUPÓN INGRESADO: " + cupon + " (No válido)" : "");
      GmailApp.sendEmail(EMAIL_ADMIN, "[SYS.NOTIFY] NUEVO INSCRITO: Bootcamp V4", "Nuevo inscrito para la Versión 4.0:\nNombre: " + name + "\nPaís: " + country + "\nEmail: " + userEmail + "\nPlan: " + planRegistrado + detalleCupon, {
        name: "Bootcamp Geo-IA System",
        replyTo: EMAIL_ADMIN
      });
    } catch(errAdmin) {
      console.error("Error notificando al admin: " + errAdmin.toString());
    }

    var esChile = country.toLowerCase().trim() === "chile";
    var planStr = (plan || "").toLowerCase();
    var esEstudiante = planStr.indexOf("estudiante") !== -1 || planStr.indexOf("25.000") !== -1 || planStr.indexOf("29") !== -1;
    
    var montoClp, montoUsd, linkMercadoPago, linkPayPal;

    if (tieneCuponConMapas) {
      montoClp = "$20.000 CLP";
      montoUsd = "22 USD";
      linkMercadoPago = LINK_OFERTA_MERCADOPAGO;
      linkPayPal = LINK_OFERTA_PAYPAL;
    } else {
      montoClp = esEstudiante ? "$25.000 CLP" : "$30.000 CLP";
      montoUsd = esEstudiante ? "29 USD" : "35 USD";
      linkMercadoPago = esEstudiante 
        ? "https://mpago.la/1EvJQi3" 
        : "https://www.mercadopago.cl/payment-link/v1/go?link-id=f7b0764f-2801-4b26-a858-59c416eebe42";
      linkPayPal = "https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU";
    }
    
    var opcionesPago = "";
    
    if (esChile) {
      var badgePlan = tieneCuponConMapas 
        ? `<span style="color: #FF4500; font-weight: bold;">TARIFA PROMOCIONAL CUPÓN CONMAPAS ($20.000 CLP)</span>` 
        : `<span style="color: #FF4500; font-weight: bold;">${plan || (esEstudiante ? "Pase Estudiantes ($25.000 CLP)" : "Acceso General ($30.000 CLP)")}</span>`;

      opcionesPago = `
        <div style="background-color: #111111; border: 1px solid #222222; padding: 12px 15px; margin-bottom: 20px;">
          <p style="margin: 0; color: #888888; font-size: 11px; font-family: monospace; text-transform: uppercase;">
            > PLAN REGISTRADO: ${badgePlan}
          </p>
        </div>
        <div style="${BLOQUE_INFO}">
          <h3 style="color: #FF4500; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">[ OPT.01 ] PAGO VÍA MERCADOPAGO (${montoClp})</h3>
          <p style="color: #888888; font-size: 13px; margin-bottom: 15px;">Tarjeta de crédito, débito o saldo MercadoPago.${tieneCuponConMapas ? " <b style='color:#FF4500;'>Descuento exclusivo CONMAPAS activado.</b>" : ""}</p>
          <a href="${linkMercadoPago}" style="${BOTON_SOLIDO}">EJECUTAR_PAGO_MERCADOPAGO (${montoClp})</a>
        </div>
        <div style="${BLOQUE_INFO_SECUNDARIO}">
          <h3 style="color: #888888; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">[ OPT.02 ] TRANSFERENCIA BANCARIA (${montoClp})</h3>
          <p style="color: #888888; font-size: 13px; margin-bottom: 5px;">MONTO A TRANSFERIR: <span style="color:#FF4500; font-weight: bold;">${montoClp}</span></p>
          <p style="color: #888888; font-size: 13px; margin-bottom: 5px;">TITULAR: <span style="color:#FFF">JORGE FERNANDO ULLOA ROA</span></p>
          <p style="color: #888888; font-size: 13px; margin-bottom: 5px;">RUT: <span style="color:#FFF">18.223.053-7</span></p>
          <p style="color: #888888; font-size: 13px; margin-bottom: 5px;">BANCO FALABELLA / CTA. CORRIENTE: <span style="color:#FFF">019823326523</span></p>
          <p style="color: #888888; font-size: 13px; margin-bottom: 0;">CORREO: <span style="color:#FFF">${EMAIL_ADMIN}</span></p>
        </div>
      `;
    } else {
      var badgePlanInt = tieneCuponConMapas 
        ? `<span style="color: #FF4500; font-weight: bold;">TARIFA PROMOCIONAL CUPÓN CONMAPAS (22 USD)</span>` 
        : `<span style="color: #FF4500; font-weight: bold;">${plan || (esEstudiante ? "Pase Estudiantes (" + montoUsd + ")" : "Acceso General (" + montoUsd + ")")}</span>`;

      var descPayPal = tieneCuponConMapas 
        ? "Transfiere <b>22 USD</b> con descuento exclusivo del cupón CONMAPAS vía PayPal con cualquier tarjeta o saldo." 
        : (esEstudiante ? "Transfiere <b>29 USD</b> con descuento de estudiante vía PayPal con cualquier tarjeta internacional o saldo." : "Transacción segura internacionalmente con tarjeta o saldo PayPal (35 USD).");

      opcionesPago = `
        <div style="background-color: #111111; border: 1px solid #222222; padding: 12px 15px; margin-bottom: 20px;">
          <p style="margin: 0; color: #888888; font-size: 11px; font-family: monospace; text-transform: uppercase;">
            > PLAN REGISTRADO INTERNACIONAL: ${badgePlanInt}
          </p>
        </div>
        <div style="${BLOQUE_INFO}">
          <h3 style="color: #FF4500; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">[ OPT.01 ] PAGO MUNDIAL: PAYPAL (${montoUsd})</h3>
          <p style="color: #888888; font-size: 13px; margin-bottom: 15px;">
            ${descPayPal}
          </p>
          <a href="${linkPayPal}" style="${BOTON_SOLIDO}">PAGAR ${montoUsd} EN PAYPAL</a>
        </div>
        <div style="${BLOQUE_INFO_SECUNDARIO}">
          <h3 style="color: #888888; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">[ OPT.02 ] ALTERNATIVA MERCADOPAGO (${montoClp})</h3>
          <a href="${linkMercadoPago}" style="color: #888888; text-decoration: underline; font-size: 13px;">Si prefieres pagar en pesos chilenos (${montoClp}), usa este enlace de MercadoPago</a>
        </div>
      `;
    }

    var userHtmlBody = `
      <div style="${ESTILO_BASE}">
        <div style="${CONTENEDOR}">
          <div style="${BADGE_VERDE}">STATUS: CUPO_RESERVADO</div>
          <h1 style="${TITULO_H1}">System.Welcome(${name});</h1>
          <p style="${TEXTO_SECUNDARIO}">
            Has iniciado el protocolo para dominar el Desarrollo Web Territorial con IA. Tu lugar para la <b>Versión 4.0</b> está en modo de espera. Se requiere confirmación de inscripción.
          </p>
          
          ${opcionesPago}

          <div style="border-top: 1px solid #222222; border-bottom: 1px solid #222222; padding: 20px 0;">
            <h4 style="color: #FFFFFF; margin-top: 0; font-size: 14px; text-transform: uppercase;">> PASO FINAL OBLIGATORIO</h4>
            <p style="${TEXTO_SECUNDARIO} margin-bottom: 15px;">
              Una vez ejecutado el pago, <b>responde este correo adjuntando tu comprobante</b> ${esEstudiante ? "<b>(y certificado de alumno regular)</b>" : ""}. El sistema validará el acceso y enviará automáticamente los binarios y dependencias.
            </p>
            <div style="background-color: #000000; padding: 15px; border: 1px solid #222222;">
              <p style="margin: 0; color: #888888; font-size: 12px; text-transform: uppercase;">> FECHAS: <span style="color:#FFF">Viernes 11, Sábado 12 y Domingo 13 de Septiembre</span></p>
              <p style="margin: 5px 0 0 0; color: #888888; font-size: 12px; text-transform: uppercase;">> HORARIO: <span style="color:#FFF">20:00 a 21:30 hrs (Hora de Chile)</span></p>
            </div>
          </div>
        </div>
      </div>
    `;

    if (userEmail) {
      GmailApp.sendEmail(userEmail, "[ACCIÓN REQUERIDA] Confirma tu cupo en el Bootcamp Geo-IA V4", "", {
        htmlBody: userHtmlBody,
        name: "Bootcamp Geo-IA",
        replyTo: EMAIL_ADMIN
      });
    }

    return ContentService.createTextOutput(JSON.stringify({"result": "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error en doPost: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({"result": "error", "error": error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

// ---------------------------------------------------------------------------------
// 2. CRON: RECORDATORIOS DE PAGO (24H Y 72H)
// ---------------------------------------------------------------------------------
function enviarRecordatoriosPago() {
  var sheet = obtenerHoja();
  var data = sheet.getDataRange().getValues();
  var ahora = new Date();
  
  for (var i = 1; i < data.length; i++) {
    var diffHoras = (ahora - new Date(data[i][0])) / (1000 * 60 * 60);
    var name = data[i][1] ? data[i][1].toString().trim() : "Estudiante";
    var email = data[i][2] ? data[i][2].toString().trim() : "";
    var country = data[i][3] ? data[i][3].toString().toLowerCase().trim() : "";
    var plan = data[i][6] ? data[i][6].toString() : "";
    var estado = data[i][7] ? data[i][7].toString().trim() : "";
    
    if (!email) continue;

    var esChile = country === "chile";
    var planStr = plan.toLowerCase();
    var tieneCuponConMapas = planStr.indexOf("conmapas") !== -1 || planStr.indexOf("20.000") !== -1 || planStr.indexOf("22") !== -1;
    var esEstudiante = planStr.indexOf("estudiante") !== -1 || planStr.indexOf("25.000") !== -1 || planStr.indexOf("29") !== -1;
    
    var montoClp, montoUsd, linkMP, linkPago, textoBoton;

    if (tieneCuponConMapas) {
      montoClp = "$20.000 CLP";
      montoUsd = "22 USD";
      linkMP = LINK_OFERTA_MERCADOPAGO;
      linkPago = esChile ? LINK_OFERTA_MERCADOPAGO : LINK_OFERTA_PAYPAL;
      textoBoton = esChile ? "EJECUTAR_MERCADOPAGO ($20.000 CLP)" : "PAGAR 22 USD EN PAYPAL";
    } else {
      montoClp = esEstudiante ? "$25.000 CLP" : "$30.000 CLP";
      montoUsd = esEstudiante ? "29 USD" : "35 USD";
      linkMP = esEstudiante 
        ? "https://mpago.la/1EvJQi3" 
        : "https://www.mercadopago.cl/payment-link/v1/go?link-id=f7b0764f-2801-4b26-a858-59c416eebe42";
      linkPago = esChile ? linkMP : "https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU";
      textoBoton = esChile 
        ? (esEstudiante ? "EJECUTAR_MERCADOPAGO ($25.000 CLP)" : "EJECUTAR_MERCADOPAGO ($30.000 CLP)") 
        : (esEstudiante ? "PAGAR 29 USD EN PAYPAL" : "PAGAR 35 USD EN PAYPAL");
    }

    if (diffHoras >= 72 && estado === "Recordatorio Enviado") {
      var body72h = `
        <div style="${ESTILO_BASE}">
          <div style="${CONTENEDOR} border-left: 2px solid #ff3333;">
            <div style="${BADGE_ROJO}">WARN: TIMEOUT_INMINENTE</div>
            <h1 style="${TITULO_H1} color: #ff3333;">System.Timeout(${name});</h1>
            <p style="${TEXTO_SECUNDARIO}">
              Han transcurrido 72 horas desde la inicialización. La memoria está al límite para el evento del fin de semana del 11 de Septiembre. Si no se detecta respuesta, el cupo será liberado de la caché.
            </p>
            <p style="color: #FFFFFF; font-size: 14px;">> Para mantener la sesión activa, ejecuta el pago y responde este correo hoy.</p>
            <a href="${linkPago}" style="${BOTON_SOLIDO} background-color:#ff3333; border-color:#ff3333; color:#FFFFFF;">${textoBoton}</a>
          </div>
        </div>
      `;
      try {
        GmailApp.sendEmail(email, "[ALERTA] Aviso Final: Liberaremos tu cupo del Bootcamp V4", "", {
          htmlBody: body72h,
          name: "Bootcamp Geo-IA",
          replyTo: EMAIL_ADMIN
        });
        sheet.getRange(i + 1, 8).setValue("Recordatorio Final Enviado");
        console.log("✓ Recordatorio final (72h) enviado a: " + email);
      } catch(e) {
        console.error("✗ Error enviando recordatorio 72h a " + email + ": " + e.toString());
      }
    } 
    else if (diffHoras >= 24 && (estado === "Pendiente" || estado === "Pendiente*")) {
      var body24h = `
        <div style="${ESTILO_BASE}">
          <div style="${CONTENEDOR} border-left: 2px solid #FF4500;">
            <div style="${BADGE_VERDE}">INFO: TIEMPO_CORRIENDO</div>
            <h1 style="${TITULO_H1}">El proceso sigue activo.</h1>
            <p style="${TEXTO_SECUNDARIO}">
              Hola ${name}, detectamos que la inscripción no ha sido confirmada. Los slots para la Versión 4.0 se están llenando. No te quedes fuera del sistema.
            </p>
            <p style="color: #FFFFFF; font-size: 14px;">> Envía el comprobante respondiendo el correo anterior para recibir las instrucciones de instalación.</p>
            <a href="${linkPago}" style="${BOTON_TERMINAL}">[ ${textoBoton} ]</a>
          </div>
        </div>
      `;
      try {
        GmailApp.sendEmail(email, "[RECORDATORIO] Tu cupo en el Bootcamp Geo-IA V4 expira pronto", "", {
          htmlBody: body24h,
          name: "Bootcamp Geo-IA",
          replyTo: EMAIL_ADMIN
        });
        sheet.getRange(i + 1, 8).setValue("Recordatorio Enviado");
        console.log("✓ Recordatorio 24h enviado a: " + email);
      } catch(e) {
        console.error("✗ Error enviando recordatorio 24h a " + email + ": " + e.toString());
      }
    }
  }
}

// ---------------------------------------------------------------------------------
// 2.1 OFERTA EXCLUSIVA DE RECUPERACIÓN (VÁLIDA SOLO POR EL DÍA)
// ---------------------------------------------------------------------------------
function enviarOfertaExclusivaHoy() {
  var sheet = obtenerHoja();
  var data = sheet.getDataRange().getValues();
  var fechaOferta = Utilities.formatDate(new Date(), "America/Santiago", "dd/MM/yyyy");
  var enviados = 0;

  for (var i = 1; i < data.length; i++) {
    var name = data[i][1] ? data[i][1].toString().trim() : "Estudiante";
    var email = data[i][2] ? data[i][2].toString().trim() : "";
    var country = data[i][3] ? data[i][3].toString().toLowerCase().trim() : "";
    var estado = data[i][7] ? data[i][7].toString().trim() : "";

    if (estado !== "Recordatorio Final Enviado" || !email) continue;

    var esChile = country === "chile";
    var linkPago = esChile ? LINK_OFERTA_MERCADOPAGO : LINK_OFERTA_PAYPAL;
    var monto = esChile ? "$20.000 CLP" : "22 USD";
    var pasarela = esChile ? "MercadoPago" : "PayPal";

    if (!linkPago) {
      console.error("No se envió la oferta a " + email + ": falta el link exclusivo de " + pasarela + ".");
      continue;
    }

    var bodyOferta = `
      <div style="${ESTILO_BASE}">
        <div style="${CONTENEDOR} border-left: 2px solid #FF4500;">
          <div style="${BADGE_VERDE}">ACCESO: OFERTA_EXCLUSIVA</div>
          <h1 style="${TITULO_H1}">Una última oportunidad, ${name}.</h1>
          <p style="${TEXTO_SECUNDARIO}">
            Vimos que tu inscripción al <b>Bootcamp Geo-IA V4</b> aún no fue confirmada. Por eso habilitamos para ti un valor exclusivo de <b style="color:#FF4500;">${monto}</b> por el curso completo.
          </p>
          <div style="${BLOQUE_INFO}">
            <h3 style="color:#FF4500; margin-top:0; font-size:12px; letter-spacing:1px; text-transform:uppercase;">VÁLIDA SOLO HOY ${fechaOferta}</h3>
            <p style="color:#FFFFFF; font-size:14px; margin-bottom:5px;">La oferta expira hoy a las <b>23:59 hrs de Chile</b>.</p>
            <p style="color:#888888; font-size:13px; margin-top:0;">Después de esa hora volverá a regir el precio normal.</p>
            <a href="${linkPago}" style="${BOTON_SOLIDO}">PAGAR ${monto} VÍA ${pasarela.toUpperCase()}</a>
          </div>
          <p style="color:#FFFFFF; font-size:14px;">Después de pagar, responde este correo con tu comprobante para activar el acceso.</p>
          <p style="color:#666666; font-size:11px; margin-top:30px;">Si ya confirmaste tu pago, puedes ignorar este mensaje.</p>
        </div>
      </div>
    `;

    try {
      GmailApp.sendEmail(email, "[OFERTA EXCLUSIVA] Solo hoy: Bootcamp Geo-IA V4", "", {
        htmlBody: bodyOferta,
        name: "Bootcamp Geo-IA",
        replyTo: EMAIL_ADMIN
      });
      sheet.getRange(i + 1, 8).setValue("Oferta Exclusiva Enviada");
      enviados++;
      console.log("✓ Oferta exclusiva enviada a: " + email);
    } catch(e) {
      console.error("✗ Error enviando oferta exclusiva a " + email + ": " + e.toString());
    }
  }

  console.log("Total ofertas exclusivas enviadas: " + enviados);
}

// ---------------------------------------------------------------------------------
// 3. ENVÍO DE TUTORIAL TRAS CONFIRMACIÓN DE PAGO
// ---------------------------------------------------------------------------------
function enviarTutorialAutomático() {
  var sheet = obtenerHoja();
  var data = sheet.getDataRange().getValues();
  var enviados = 0;
  
  for (var i = 1; i < data.length; i++) {
    var email = data[i][2] ? data[i][2].toString().trim() : "";
    var estado = data[i][7] ? data[i][7].toString().trim() : "";
    if (estado === "Pagado" && email !== "") {
      var name = data[i][1] ? data[i][1].toString().trim() : "Estudiante";
      var bodyTutorial = `
        <div style="${ESTILO_BASE}">
          <div style="${CONTENEDOR}">
            <div style="${BADGE_VERDE}">STATUS: ACCESO_CONCEDIDO</div>
            <h1 style="${TITULO_H1}">System.Connect(${name});</h1>
            <p style="${TEXTO_SECUNDARIO}">
              Pago verificado en base de datos. Prepárate, porque este <b>Viernes 11, Sábado 12 y Domingo 13 de Septiembre (de 20:00 a 21:30 hrs - Hora Chile)</b> vamos a programar.
            </p>
            
            <div style="${BLOQUE_INFO}">
              <h3 style="color: #FF4500; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> PASO 01: INSTALACIÓN DE DEPENDENCIAS</h3>
              <p style="color: #888888; font-size: 13px; margin-bottom: 15px;">
                Para la ejecución correcta, debes preparar tu entorno. Visualiza el log de instalación:
              </p>
              <a href="https://drive.google.com/file/d/1zta-19rP4KlyDLXrU3Tgjsk9gKarmX7e/view?usp=sharing" style="${BOTON_TERMINAL}">[ ABRIR TUTORIAL ]</a>
            </div>

            <div style="${BLOQUE_INFO_SECUNDARIO}">
              <h3 style="color: #888888; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> PASO 02: PUERTOS DE CONEXIÓN</h3>
              <p style="color: #888888; font-size: 13px; margin-bottom: 0;">
                El día del evento se despachará el socket (link de Google Meet) por este canal.
              </p>
            </div>

            <div style="border-top: 1px solid #222222; margin-top: 30px; padding-top: 20px;">
              <p style="color: #888888; font-size: 12px; text-transform: uppercase;">SYS.ADMIN // Jorge Ulloa Roa</p>
            </div>
          </div>
        </div>
      `;
      try {
        GmailApp.sendEmail(email, "[PREPARACIÓN] Bootcamp V4: Binarios y Tutorial de Instalación", "", {
          htmlBody: bodyTutorial,
          name: "Bootcamp Geo-IA",
          replyTo: EMAIL_ADMIN
        });
        sheet.getRange(i + 1, 8).setValue("Tutorial Enviado");
        enviados++;
        console.log("✓ Tutorial enviado a: " + email);
      } catch(e) {
        console.error("✗ Error enviando tutorial a " + email + ": " + e.toString());
      }
    }
  }
  console.log("Total tutoriales enviados: " + enviados);
}

// ---------------------------------------------------------------------------------
// 4. ORQUESTADOR PERIÓDICO (FUNCIÓN DEL ACTIVADOR / TRIGGER)
// ---------------------------------------------------------------------------------
function ejecutarCRM() {
  console.log("--> Iniciando ciclo de CRM...");
  enviarRecordatoriosPago();
  enviarTutorialAutomático();
  console.log("--> Ciclo de CRM finalizado.");
}

// ---------------------------------------------------------------------------------
// 5. FUNCIÓN MANUAL PARA AVISARLE A LOS EXTRANJEROS
// ---------------------------------------------------------------------------------
function enviarAvisoPayPalAtrasados() {
  var sheet = obtenerHoja();
  var data = sheet.getDataRange().getValues();
  var contadorEnviados = 0;
  
  for (var i = 1; i < data.length; i++) {
    var email = data[i][2] ? data[i][2].toString().trim() : "";
    var country = data[i][3] ? data[i][3].toString().toLowerCase().trim() : "";
    var estado = data[i][7] ? data[i][7].toString().toLowerCase().trim() : ""; 
    
    if (estado === "pendiente" && country !== "chile" && email !== "") {
      var name = data[i][1] ? data[i][1].toString().trim() : "Estudiante";
      var bodyFix = `
        <div style="${ESTILO_BASE}">
          <div style="${CONTENEDOR}">
            <div style="${BADGE_VERDE}; border-color:#888888; color:#888888;">SYS.UPDATE</div>
            <h1 style="${TITULO_H1}">Protocolo de pago actualizado.</h1>
            <p style="${TEXTO_SECUNDARIO}">
              Hola ${name}, detectamos que te conectas desde fuera de Chile y el proceso quedó en timeout.
              <br><br>Hemos habilitado <b>PayPal</b> en nuestro endpoint para transacciones globales.
            </p>
            <a href="https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU" style="${BOTON_SOLIDO}">EJECUTAR_PAGO_PAYPAL</a>
            <p style="color: #888888; font-size: 12px; margin-top: 30px; text-transform:uppercase;">> RECUERDA ENVIAR EL COMPROBANTE AL FINALIZAR.</p>
          </div>
        </div>
      `;
      try {
        GmailApp.sendEmail(email, "[UPDATE] Habilitamos PayPal para tu inscripción al Bootcamp V4", "", {
          htmlBody: bodyFix,
          name: "Bootcamp Geo-IA",
          replyTo: EMAIL_ADMIN
        });
        sheet.getRange(i + 1, 8).setValue("Pendiente*"); 
        contadorEnviados++;
        console.log("✓ Aviso PayPal enviado a: " + email);
      } catch(e) {
        console.error("✗ Error enviando aviso PayPal a " + email + ": " + e.toString());
      }
    }
  }
  console.log("Total avisos PayPal enviados: " + contadorEnviados);
}

// ---------------------------------------------------------------------------------
// 6. FUNCIÓN PRE-EVENTO: ENVIAR ENLACES DE GOOGLE MEET V4
// ---------------------------------------------------------------------------------
function enviarLinksConexion() {
  var sheet = obtenerHoja();
  var data = sheet.getDataRange().getValues();
  var enviados = 0;
  
  for (var i = 1; i < data.length; i++) {
    var email = data[i][2] ? data[i][2].toString().trim() : "";
    var estado = data[i][7] ? data[i][7].toString().trim() : "";
    
    if ((estado === "Tutorial Enviado" || estado === "Tutorial Enviado V4") && email !== "") {
      var name = data[i][1] ? data[i][1].toString().trim() : "Estudiante";
      
      var bodyLinks = `
        <div style="${ESTILO_BASE}">
          <div style="${CONTENEDOR}">
            <div style="${BADGE_VERDE}">SYSTEM.ONLINE</div>
            <h1 style="${TITULO_H1}">Conexión Iniciada, ${name}.</h1>
            <p style="${TEXTO_SECUNDARIO}">
              Hoy arranca el <b>Bootcamp Geo-IA V4</b>. A continuación tienes los accesos directos de Google Meet para las 3 sesiones del fin de semana (20:00 a 21:30 hrs - Horario de Chile). ¡Guarda este correo!
            </p>

            <!-- SESIÓN 1 (VIERNES 11) -->
            <div style="${BLOQUE_INFO}">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h3 style="color: #FF4500; margin: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> MODULE.01: WORKSHOP (SESIÓN 1)</h3>
                <span style="font-size: 10px; color: #FF4500; font-weight: bold;">[ EXEC_TODAY ]</span>
              </div>
              <p style="color: #888888; font-size: 13px; margin: 0 0 10px 0;">📅 Viernes, 11 de Septiembre | ⏰ 20:00 – 21:30 hrs (Chile)</p>
              <a href="https://meet.google.com/dkp-rpqg-ktc" style="${BOTON_SOLIDO}">▶ ENTRAR A SALA DÍA 1 (MEET)</a>
            </div>

            <!-- SESIÓN 2 (SÁBADO 12) -->
            <div style="${BLOQUE_INFO}">
              <h3 style="color: #FF4500; margin: 0 0 10px 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> MODULE.02: WORKSHOP (SESIÓN 2)</h3>
              <p style="color: #888888; font-size: 13px; margin: 0 0 10px 0;">📅 Sábado, 12 de Septiembre | ⏰ 20:00 – 21:30 hrs (Chile)</p>
              <a href="https://meet.google.com/pgc-rmvk-dgj" style="${BOTON_SOLIDO} background-color:#12121a; color:#FF4500; border:1px solid #FF4500;">▶ ENTRAR A SALA DÍA 2 (MEET)</a>
            </div>

            <!-- SESIÓN 3 (DOMINGO 13) -->
            <div style="${BLOQUE_INFO}">
              <h3 style="color: #FF4500; margin: 0 0 10px 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> MODULE.03: WORKSHOP (SESIÓN 3)</h3>
              <p style="color: #888888; font-size: 13px; margin: 0 0 10px 0;">📅 Domingo, 13 de Septiembre | ⏰ 20:00 – 21:30 hrs (Chile)</p>
              <a href="https://meet.google.com/dos-fcdq-kee" style="${BOTON_SOLIDO} background-color:#12121a; color:#FF4500; border:1px solid #FF4500;">▶ ENTRAR A SALA DÍA 3 (MEET)</a>
            </div>

            <!-- BÓVEDA DE GRABACIONES -->
            <div style="${BLOQUE_INFO_SECUNDARIO}">
              <h3 style="color: #888888; margin: 0 0 10px 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> BÓVEDA DE GRABACIONES Y RECURSOS</h3>
              <p style="color: #888888; font-size: 13px; margin-bottom: 15px;">
                Guarda este enlace en tus favoritos. Aquí iremos subiendo las grabaciones y recursos del curso tras cada clase:
              </p>
              <a href="${LINK_GRABACIONES_DRIVE}" style="${BOTON_TERMINAL}">[ ABRIR CARPETA MAESTRA EN DRIVE ]</a>
            </div>

            <div style="border: 1px dashed #222222; padding: 20px;">
              <h4 style="color: #FFFFFF; margin-top: 0; font-size:12px; margin-bottom: 10px;">> AVISOS DE SISTEMA</h4>
              <p style="color: #888888; font-size: 12px; margin-bottom: 5px;">01. Iniciar conexión 5 minutos antes (19:55 hrs) para handshake y ping.</p>
              <p style="color: #888888; font-size: 12px; margin-bottom: 0;">02. Verificar que las dependencias locales estén instaladas como vimos en el tutorial.</p>
            </div>
          </div>
        </div>
      `;
      
      try {
        GmailApp.sendEmail(email, "[ACCESOS OFICIALES] Sockets de Conexión Bootcamp Geo-IA V4", "", {
          htmlBody: bodyLinks,
          name: "Bootcamp Geo-IA",
          replyTo: EMAIL_ADMIN
        });
        sheet.getRange(i + 1, 8).setValue("Accesos Enviados"); 
        enviados++;
        console.log("✓ Accesos enviados a: " + email);
      } catch(e) {
        console.error("✗ Error enviando accesos a " + email + ": " + e.toString());
      }
    }
  }
  console.log("Total accesos enviados: " + enviados);
}

// ---------------------------------------------------------------------------------
// 7. FUNCIÓN POST-CLASE: ENVIAR GRABACIONES
// ---------------------------------------------------------------------------------
function enviarGrabaciones() {
  var sheet = obtenerHoja();
  var data = sheet.getDataRange().getValues();
  var enviados = 0;
  
  for (var i = 1; i < data.length; i++) {
    var email = data[i][2] ? data[i][2].toString().trim() : "";
    var estado = data[i][7] ? data[i][7].toString().trim() : "";
    
    if (estado === "Accesos Enviados" && email !== "") {
      var name = data[i][1] ? data[i][1].toString().trim() : "Estudiante";
      
      var bodyGrabacion = `
        <div style="${ESTILO_BASE}">
          <div style="${CONTENEDOR}">
            <div style="${BADGE_VERDE}">DATA_EXTRACTED</div>
            <h1 style="${TITULO_H1}">Volcado de memoria, Día 1.</h1>
            <p style="${TEXTO_SECUNDARIO}">
              Si no pudiste sincronizar en vivo, o quieres repasar el código: <b>el archivo de log visual (grabación) está online.</b>
            </p>

            <div style="${BLOQUE_INFO}">
              <h3 style="color: #FF4500; margin: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px;">> REPOSITORIO MAESTRO (DRIVE)</h3>
              <p style="color: #888888; font-size: 13px; margin-bottom: 20px;">
                Guarda este directorio en caché. Las sesiones de Sábado y Domingo se sincronizarán aquí automáticamente al compilar.
              </p>
              <a href="${LINK_GRABACIONES_DRIVE}" style="${BOTON_SOLIDO}">ACCEDER AL REPOSITORIO</a>
            </div>

            <div style="border-top: 1px solid #222222; margin-top: 30px; padding-top: 20px;">
              <p style="color: #888888; font-size: 12px; text-transform: uppercase;">SYS.ADMIN // Jorge Ulloa Roa</p>
            </div>
          </div>
        </div>
      `;
      
      try {
        GmailApp.sendEmail(email, "[REPOSITORIO] Grabación DÍA 1 disponible en bóveda — Bootcamp V4", "", {
          htmlBody: bodyGrabacion,
          name: "Bootcamp Geo-IA",
          replyTo: EMAIL_ADMIN
        });
        sheet.getRange(i + 1, 8).setValue("Carpeta Grabaciones Enviada"); 
        enviados++;
        console.log("✓ Grabaciones enviadas a: " + email);
      } catch(e) {
        console.error("✗ Error enviando grabaciones a " + email + ": " + e.toString());
      }
    }
  }
  console.log("Total correos de grabaciones enviados: " + enviados);
}

// ---------------------------------------------------------------------------------
// 8. PLANTILLA Y MOTOR DE DIPLOMA OFICIAL (PDF) V4
// ---------------------------------------------------------------------------------
function generarDiplomaHtml(nombreAlumno, fechaEmision) {
  fechaEmision = fechaEmision || "14 de Septiembre de 2026";
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;600;700&display=swap');
    @page { size: A4 landscape; margin: 0; }
    body {
      margin: 0; padding: 0;
      background-color: #000000;
      color: #FFFFFF;
      font-family: 'Space Grotesk', 'Courier New', monospace;
      -webkit-print-color-adjust: exact;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .diploma-container {
      width: 1040px;
      height: 700px;
      border: 2px solid #222222;
      background-color: #0A0A0A;
      position: relative;
      padding: 60px;
      box-sizing: border-box;
    }
    .corner-tl { position: absolute; top: 0; left: 0; width: 30px; height: 30px; border-top: 4px solid #FF4500; border-left: 4px solid #FF4500; }
    .corner-br { position: absolute; bottom: 0; right: 0; width: 30px; height: 30px; border-bottom: 4px solid #FF4500; border-right: 4px solid #FF4500; }
    
    .badge {
      display: inline-block;
      padding: 6px 12px;
      border: 1px solid #FF4500;
      color: #FF4500;
      font-size: 13px;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 35px;
    }
    .title {
      font-family: 'Inter', Arial, sans-serif;
      font-size: 50px;
      font-weight: 700;
      letter-spacing: -1px;
      margin: 0 0 8px 0;
      color: #FFFFFF;
    }
    .subtitle {
      font-size: 16px;
      color: #888888;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 45px;
    }
    .student-name {
      font-family: 'Inter', Arial, sans-serif;
      font-size: 42px;
      font-weight: 700;
      color: #FF4500;
      margin: 0 0 15px 0;
      border-bottom: 1px solid #333333;
      padding-bottom: 8px;
      display: inline-block;
      min-width: 600px;
    }
    .description {
      font-size: 15px;
      color: #AAAAAA;
      line-height: 1.6;
      max-width: 720px;
      margin-bottom: 45px;
    }
    .footer-grid {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #222222;
      padding-top: 25px;
    }
    .footer-block {
      text-align: left;
    }
    .footer-label {
      font-size: 11px;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }
    .footer-value {
      font-size: 15px;
      color: #FFFFFF;
      font-weight: bold;
    }
    .signature {
      font-family: 'Courier New', monospace;
      color: #FF4500;
      font-size: 17px;
      font-style: italic;
    }
    .stamp {
      position: absolute;
      bottom: 50px;
      right: 50px;
      width: 95px;
      height: 95px;
      border: 2px dashed #333333;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 10px;
      color: #666666;
      transform: rotate(-15deg);
    }
  </style>
</head>
<body>
  <div class="diploma-container">
    <div class="corner-tl"></div>
    <div class="corner-br"></div>
    
    <div class="badge">SYS.CERTIFICATE_OF_COMPLETION</div>
    
    <h1 class="title">Certificado de Aprobación</h1>
    <div class="subtitle">Desarrollo Web Territorial con IA (Bootcamp V4)</div>
    
    <p style="color: #666666; margin-bottom: 10px; font-size: 13px;">Este documento certifica que:</p>
    <h2 class="student-name">${nombreAlumno}</h2>
    
    <p class="description">
      Ha completado satisfactoriamente los módulos teórico-prácticos del Bootcamp Geo-IA V4 (5 horas lectivas y 4 horas de práctica), demostrando competencias en análisis espacial, programación web frontend, uso de MapLibre GL JS, geoprocesamiento client-side con Turf.js y arquitectura Zero-Server.
    </p>
    
    <div class="footer-grid">
      <div class="footer-block">
        <div class="footer-label">Intensidad Horaria</div>
        <div class="footer-value">5 hrs lectivas + 4 hrs prácticas (9 hrs totales)</div>
      </div>
      <div class="footer-block">
        <div class="footer-label">Fecha de Emisión</div>
        <div class="footer-value">${fechaEmision}</div>
      </div>
      <div class="footer-block">
        <div class="footer-label">Instructor / Director</div>
        <div class="signature">Jorge Ulloa Roa</div>
      </div>
    </div>

    <div class="stamp">
      GEO-IA<br>VERIFIED<br>V4.0
    </div>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------------
// 9. FUNCIÓN FINAL: CIERRE DE BOOTCAMP Y DIPLOMA PDF
// ---------------------------------------------------------------------------------
function enviarDiplomasYCierre() {
  var sheet = obtenerHoja();
  var data = sheet.getDataRange().getValues();
  var enviados = 0;
  var fechaEmision = "14 de Septiembre de 2026";
  
  for (var i = 1; i < data.length; i++) {
    var email = data[i][2] ? data[i][2].toString().trim() : "";
    var estado = data[i][7] ? data[i][7].toString().trim() : "";
    var name = data[i][1] ? data[i][1].toString().trim() : "Estudiante";
    
    if (estado === "Accesos Enviados" && email !== "") {
      try {
        var diplomaHtml = generarDiplomaHtml(name, fechaEmision);
        var safeFileName = "Diploma_GeoIA_V4_" + name.replace(/[^a-zA-Z0-9]/g, "_") + ".pdf";
        var diplomaPdf = Utilities.newBlob(diplomaHtml, "text/html", "diploma.html")
                                  .getAs("application/pdf")
                                  .setName(safeFileName);
        
        var bodyFinal = `
          <div style="${ESTILO_BASE}">
            <div style="${CONTENEDOR}">
              <div style="${BADGE_VERDE}">[BOOTCAMP COMPLETED]</div>
              <h1 style="${TITULO_H1}">¡Misión Cumplida, ${name}!</h1>
              
              <p style="${TEXTO_SECUNDARIO}">
                Han sido tres jornadas intensivas de mapas, código y arquitectura de IA. Quiero agradecerte enormemente por tu dedicación, entusiasmo y por haber confiado en este Bootcamp para llevar tus habilidades de desarrollo espacial al siguiente nivel.
              </p>

              <!-- BLOQUE 1: DIPLOMA -->
              <div style="${BLOQUE_INFO}">
                <h3 style="color: #FF4500; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> 01. TU DIPLOMA OFICIAL (PDF ADJUNTO)</h3>
                <p style="color: #888888; font-size: 13px; margin-bottom: 0;">
                  He generado y adjuntado a este correo tu certificado oficial de aprobación en formato PDF de alta resolución. ¡Compártelo con orgullo!
                </p>
              </div>

              <!-- BLOQUE 2: PRESENTACIÓN INTERACTIVA EN CANVA -->
              <div style="${BLOQUE_INFO}">
                <h3 style="color: #FF4500; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> 02. DIAPOSITIVAS Y PRESENTACIÓN WEB</h3>
                <p style="color: #888888; font-size: 13px; margin-bottom: 15px;">
                  Accede a la versión web interactiva de las diapositivas y arquitectura teórica utilizadas durante las 3 sesiones:
                </p>
                <a href="${LINK_PRESENTACIONES_CANVA}" style="${BOTON_SOLIDO}">▶ VER PRESENTACIÓN WEB (CANVA)</a>
              </div>

              <!-- BLOQUE 3: BÓVEDA DRIVE (GRABACIONES E INSUMOS) -->
              <div style="${BLOQUE_INFO_SECUNDARIO}">
                <h3 style="color: #888888; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> 03. BÓVEDA DE GRABACIONES E INSUMOS</h3>
                <p style="color: #888888; font-size: 13px; margin-bottom: 15px;">
                  Aquí tienes el acceso permanente a la carpeta maestra con todas las grabaciones de video, datasets GeoJSON, scripts y código fuente del curso:
                </p>
                <a href="${LINK_GRABACIONES_DRIVE}" style="${BOTON_TERMINAL}">[ ABRIR BÓVEDA EN GOOGLE DRIVE ]</a>
              </div>

              <!-- BLOQUE 4: LINKEDIN & FEEDBACK -->
              <div style="border: 1px dashed #222222; padding: 20px; margin-bottom: 30px;">
                <h4 style="color: #FFFFFF; margin-top: 0; font-size: 12px; margin-bottom: 15px; text-transform: uppercase;">> COMPARTE TU LOGRO Y CONOCIMIENTO</h4>
                <p style="color: #888888; font-size: 13px; margin-bottom: 15px;">
                  Tu validación e impacto profesional son lo más importante. Te invito a publicar tu visor territorial terminado o tu diploma en LinkedIn y etiquetarme. ¡Cualquier recomendación o aprendizaje que compartas ayuda enormemente a seguir expandiendo esta comunidad!
                </p>
                <p style="color: #888888; font-size: 13px; margin-bottom: 0;">
                  🔗 <a href="https://www.linkedin.com/in/jorge-ulloa-roa/" style="color: #FF4500; text-decoration: none; font-weight: bold;">Mi perfil de LinkedIn — Jorge Ulloa Roa</a>
                </p>
              </div>

              <div style="border-top: 1px solid #222222; margin-top: 30px; padding-top: 20px;">
                <p style="color: #888888; font-size: 12px; text-transform: uppercase;">¡Nos vemos en la Versión 5.0 o en futuros proyectos!<br><span style="color:#FFF;">Jorge Ulloa Roa</span></p>
              </div>
            </div>
          </div>
        `;

        GmailApp.sendEmail(email, "[DIPLOMA OFICIAL] Certificado de Aprobación, Presentaciones y Bóveda — Bootcamp Geo-IA V4", "", {
          htmlBody: bodyFinal,
          attachments: [diplomaPdf],
          name: "Bootcamp Geo-IA",
          replyTo: EMAIL_ADMIN
        });

        sheet.getRange(i + 1, 8).setValue("Diploma Enviado");
        enviados++;
        console.log("✓ Diploma despachado con éxito a: " + email);
        
      } catch (err) {
        console.error("✗ Error despachando diploma a " + email + ": " + err.toString());
      }
    }
  }
  console.log("Total de diplomas enviados: " + enviados);
}
