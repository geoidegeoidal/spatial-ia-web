// =======================================================================
// CÓDIGO MAESTRO BOOTCAMP VERSIÓN 3 (EDICIÓN PREMIUM - HIGH-TECH)
// =======================================================================

// Constantes de Diseño (ADN Spur.us)
const ESTILO_BASE = "font-family: 'Space Grotesk', 'Courier New', monospace; background-color: #000000; color: #FFFFFF; padding: 40px 20px; text-align: left; line-height: 1.6;";
const CONTENEDOR = "max-width: 600px; margin: 0 auto; background-color: #0A0A0A; border: 1px solid #222222; padding: 40px;";
const BADGE_VERDE = "display: inline-block; padding: 4px 8px; border: 1px solid #D4FF00; color: #D4FF00; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; margin-bottom: 20px;";
const BADGE_ROJO = "display: inline-block; padding: 4px 8px; border: 1px solid #ff3333; color: #ff3333; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; margin-bottom: 20px;";
const TITULO_H1 = "color: #FFFFFF; margin-top: 0; font-size: 24px; font-weight: normal; font-family: 'Inter', Arial, sans-serif; letter-spacing: -0.5px;";
const TEXTO_SECUNDARIO = "color: #888888; font-size: 14px; margin-bottom: 30px;";
const BLOQUE_INFO = "background-color: #000000; border: 1px solid #222222; border-left: 2px solid #D4FF00; padding: 20px; margin-bottom: 30px;";
const BLOQUE_INFO_SECUNDARIO = "background-color: #000000; border: 1px solid #222222; border-left: 2px solid #888888; padding: 20px; margin-bottom: 30px;";
const BOTON_SOLIDO = "display: block; background-color: #D4FF00; color: #000000; text-align: center; padding: 14px 20px; text-decoration: none; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 15px 0;";
const BOTON_TERMINAL = "display: inline-block; background-color: transparent; color: #D4FF00; text-decoration: none; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-top: 20px;";

// Enlace de la Carpeta Maestra de Grabaciones (Google Drive)
const LINK_GRABACIONES_DRIVE = "https://drive.google.com/drive/folders/1vRA1fkfG01kLL3DfMeVres5re51YqlTg?usp=sharing";

function doPost(e) {
  try {
    var name = e.parameter.name;
    var userEmail = e.parameter.email;
    var country = e.parameter.country || "";
    var nivel_sig = e.parameter.nivel_sig;
    var ocupacion = e.parameter.ocupacion;
    var plan = e.parameter.plan;
    var timestamp = new Date();

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Fecha", "Nombre", "Email", "País", "Nivel SIG", "Profesión", "Plan", "Estado Pago"]);
      sheet.getRange("A1:H1").setFontWeight("bold").setBackground("#D4FF00");
    }
    sheet.appendRow([timestamp, name, userEmail, country, nivel_sig, ocupacion, plan, "Pendiente"]);

    var adminEmail = "jorge.ulloa.roa@gmail.com";
    MailApp.sendEmail(adminEmail, "[SYS.NOTIFY] NUEVO INSCRITO: Bootcamp V3", "Nuevo inscrito:\nNombre: " + name + "\nPaís: " + country + "\nEmail: " + userEmail);

    var esChile = country.toLowerCase().trim() === "chile";
    var opcionesPago = "";
    
    if (esChile) {
      opcionesPago = `
        <div style="${BLOQUE_INFO}">
          <h3 style="color: #D4FF00; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">[ OPT.01 ] PAGO VÍA MERCADOPAGO</h3>
          <a href="https://www.mercadopago.cl/payment-link/v1/go?link-id=f7b0764f-2801-4b26-a858-59c416eebe42" style="${BOTON_SOLIDO}">EJECUTAR_PAGO_MERCADOPAGO</a>
        </div>
        <div style="${BLOQUE_INFO_SECUNDARIO}">
          <h3 style="color: #888888; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">[ OPT.02 ] TRANSFERENCIA BANCARIA</h3>
          <p style="color: #888888; font-size: 13px; margin-bottom: 5px;">TITULAR: <span style="color:#FFF">JORGE FERNANDO ULLOA ROA</span></p>
          <p style="color: #888888; font-size: 13px; margin-bottom: 5px;">RUT: <span style="color:#FFF">18.223.053-7</span></p>
          <p style="color: #888888; font-size: 13px; margin-bottom: 5px;">BANCO FALABELLA / CTA. CORRIENTE: <span style="color:#FFF">019823326523</span></p>
          <p style="color: #888888; font-size: 13px; margin-bottom: 0;">CORREO: <span style="color:#FFF">jorge.ulloa.roa@gmail.com</span></p>
        </div>
      `;
    } else {
      opcionesPago = `
        <div style="border: 1px solid #888888; padding: 15px; margin-bottom: 20px;">
          <p style="color: #888888; font-size: 12px; margin: 0; text-transform: uppercase;">[ SYS.INFO ] Acceso Internacional detectado. Protocolo de pago adaptado a moneda local vía PayPal.</p>
        </div>
        <div style="${BLOQUE_INFO}">
          <h3 style="color: #D4FF00; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">[ OPT.01 ] PAGO MUNDIAL: PAYPAL</h3>
          <p style="color: #888888; font-size: 13px; margin-bottom: 15px;">Transacción segura internacionalmente con tarjeta o saldo PayPal.</p>
          <a href="https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU" style="${BOTON_SOLIDO}">EJECUTAR_PAGO_PAYPAL</a>
        </div>
        <div style="${BLOQUE_INFO_SECUNDARIO}">
          <h3 style="color: #888888; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">[ OPT.02 ] ALTERNATIVA (MERCADOPAGO LATAM)</h3>
          <a href="https://www.mercadopago.cl/payment-link/v1/go?link-id=f7b0764f-2801-4b26-a858-59c416eebe42" style="color: #888888; text-decoration: underline; font-size: 13px;">Si prefieres MercadoPago, usa este enlace</a>
        </div>
      `;
    }

    var userHtmlBody = `
      <div style="${ESTILO_BASE}">
        <div style="${CONTENEDOR}">
          <div style="${BADGE_VERDE}">STATUS: CUPO_RESERVADO</div>
          <h1 style="${TITULO_H1}">System.Welcome(${name});</h1>
          <p style="${TEXTO_SECUNDARIO}">
            Has iniciado el protocolo para dominar el Desarrollo Web Territorial con IA. Tu lugar para la <b>Versión 3</b> está en modo de espera. Se requiere confirmación de inscripción.
          </p>
          
          ${opcionesPago}

          <div style="border-top: 1px solid #222222; border-bottom: 1px solid #222222; padding: 20px 0;">
            <h4 style="color: #FFFFFF; margin-top: 0; font-size: 14px; text-transform: uppercase;">> PASO FINAL OBLIGATORIO</h4>
            <p style="${TEXTO_SECUNDARIO} margin-bottom: 15px;">
              Una vez ejecutado el pago, <b>responde este correo adjuntando tu comprobante</b>. El sistema validará el acceso y enviará automáticamente los binarios y dependencias.
            </p>
            <div style="background-color: #000000; padding: 15px; border: 1px solid #222222;">
              <p style="margin: 0; color: #888888; font-size: 12px; text-transform: uppercase;">> FECHAS: <span style="color:#FFF">Viernes 7, Sábado 8 y Domingo 9 de Agosto</span></p>
              <p style="margin: 5px 0 0 0; color: #888888; font-size: 12px; text-transform: uppercase;">> HORARIO: <span style="color:#FFF">20:00 a 21:30 hrs (Hora de Chile)</span></p>
            </div>
          </div>
        </div>
      </div>
    `;
    MailApp.sendEmail({ to: userEmail, subject: "[ACCIÓN REQUERIDA] Confirma tu cupo en el Bootcamp Geo-IA V3", htmlBody: userHtmlBody, name: "Bootcamp Geo-IA" });

    return ContentService.createTextOutput(JSON.stringify({"result": "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"result": "error", "error": error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function enviarRecordatoriosPago() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var ahora = new Date();
  
  for (var i = 1; i < data.length; i++) {
    var diffHoras = (ahora - new Date(data[i][0])) / (1000 * 60 * 60);
    var name = data[i][1];
    var email = data[i][2];
    var country = data[i][3] ? data[i][3].toString() : "";
    var estado = data[i][7];
    
    var esChile = country.toLowerCase().trim() === "chile";
    var linkPago = esChile ? "https://www.mercadopago.cl/payment-link/v1/go?link-id=f7b0764f-2801-4b26-a858-59c416eebe42" : "https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU";
    var textoBoton = esChile ? "EJECUTAR_MERCADOPAGO" : "EJECUTAR_PAYPAL";

    if (diffHoras >= 72 && estado === "Recordatorio Enviado") {
      var body72h = `
        <div style="${ESTILO_BASE}">
          <div style="${CONTENEDOR} border-left: 2px solid #ff3333;">
            <div style="${BADGE_ROJO}">WARN: TIMEOUT_INMINENTE</div>
            <h1 style="${TITULO_H1} color: #ff3333;">System.Timeout(${name});</h1>
            <p style="${TEXTO_SECUNDARIO}">
              Han transcurrido 72 horas desde la inicialización. La memoria está al límite para el evento del fin de semana del 7 de Agosto. Si no se detecta respuesta, el cupo será liberado de la caché.
            </p>
            <p style="color: #FFFFFF; font-size: 14px;">> Para mantener la sesión activa, ejecuta el pago y responde este correo hoy.</p>
            <a href="${linkPago}" style="${BOTON_SOLIDO} background-color:#ff3333; border-color:#ff3333; color:#000;">${textoBoton}</a>
          </div>
        </div>
      `;
      MailApp.sendEmail({to: email, subject: "[ALERTA] Aviso Final: Liberaremos tu cupo del Bootcamp V3", htmlBody: body72h, name: "Bootcamp Geo-IA"});
      sheet.getRange(i + 1, 8).setValue("Recordatorio Final Enviado");
    } 
    else if (diffHoras >= 24 && (estado === "Pendiente" || estado === "Pendiente*")) {
      var body24h = `
        <div style="${ESTILO_BASE}">
          <div style="${CONTENEDOR} border-left: 2px solid #D4FF00;">
            <div style="${BADGE_VERDE}">INFO: TIEMPO_CORRIENDO</div>
            <h1 style="${TITULO_H1}">El proceso sigue activo.</h1>
            <p style="${TEXTO_SECUNDARIO}">
              Hola ${name}, detectamos que la inscripción no ha sido confirmada. Los slots para la V3 se están llenando. No te quedes fuera del sistema.
            </p>
            <p style="color: #FFFFFF; font-size: 14px;">> Envía el comprobante respondiendo el correo anterior para recibir las instrucciones de instalación.</p>
            <a href="${linkPago}" style="${BOTON_TERMINAL}">[ ${textoBoton} ]</a>
          </div>
        </div>
      `;
      MailApp.sendEmail({to: email, subject: "[RECORDATORIO] Tu cupo en el Bootcamp Geo-IA V3 expira pronto", htmlBody: body24h, name: "Bootcamp Geo-IA"});
      sheet.getRange(i + 1, 8).setValue("Recordatorio Enviado");
    }
  }
}

function enviarTutorialAutomático() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][7] === "Pagado") {
      var name = data[i][1];
      var bodyTutorial = `
        <div style="${ESTILO_BASE}">
          <div style="${CONTENEDOR}">
            <div style="${BADGE_VERDE}">STATUS: ACCESO_CONCEDIDO</div>
            <h1 style="${TITULO_H1}">System.Connect(${name});</h1>
            <p style="${TEXTO_SECUNDARIO}">
              Pago verificado en base de datos. Prepárate, porque este <b>Viernes 7, Sábado 8 y Domingo 9 de Agosto (de 20:00 a 21:30 hrs - Hora Chile)</b> vamos a programar.
            </p>
            
            <div style="${BLOQUE_INFO}">
              <h3 style="color: #D4FF00; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> PASO 01: INSTALACIÓN DE DEPENDENCIAS</h3>
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
        MailApp.sendEmail({ to: data[i][2], subject: "[PREPARACIÓN] Bootcamp V3: Binarios y Tutorial de Instalación", htmlBody: bodyTutorial, name: "Bootcamp Geo-IA" });
        sheet.getRange(i + 1, 8).setValue("Tutorial Enviado");
      } catch(e) {
        console.log("Error enviando a: " + data[i][2]);
      }
    }
  }
}

function ejecutarCRM() {
  enviarRecordatoriosPago();
  enviarTutorialAutomático();
}

// ---------------------------------------------------------------------------------
// FUNCIÓN MANUAL PARA AVISARLE A LOS EXTRANJEROS
// ---------------------------------------------------------------------------------
function enviarAvisoPayPalAtrasados() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var contadorEnviados = 0;
  
  for (var i = 1; i < data.length; i++) {
    var email = data[i][2] ? data[i][2].toString().trim() : "";
    var country = data[i][3] ? data[i][3].toString().toLowerCase().trim() : "";
    var estado = data[i][7] ? data[i][7].toString().toLowerCase().trim() : ""; 
    
    if (estado === "pendiente" && country !== "chile") {
      var name = data[i][1];
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
        MailApp.sendEmail({to: email, subject: "[UPDATE] Habilitamos PayPal para tu inscripción al Bootcamp V3", htmlBody: bodyFix, name: "Bootcamp Geo-IA"});
        sheet.getRange(i + 1, 8).setValue("Pendiente*"); 
        contadorEnviados++;
      } catch(e) {}
    }
  }
}

// ---------------------------------------------------------------------------------
// FUNCIÓN DE EMERGENCIA: FÉ DE ERRATAS
// ---------------------------------------------------------------------------------
function enviarFeDeErratasTutorial() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var enviados = 0;
  
  for (var i = 1; i < data.length; i++) {
    var email = data[i][2] ? data[i][2].toString().trim() : "";
    var estado = data[i][7] ? data[i][7].toString().trim() : "";
    
    if (estado === "Tutorial Enviado") {
      var name = data[i][1];
      var bodyFix = `
        <div style="${ESTILO_BASE}">
          <div style="${CONTENEDOR} border-left: 2px solid #ff3333;">
            <div style="${BADGE_ROJO}">ERR_CONNECTION_RESET</div>
            <h1 style="${TITULO_H1} color:#ff3333;">Fallo técnico detectado.</h1>
            <p style="${TEXTO_SECUNDARIO}">
              Hola ${name}, el endpoint de video que enviamos anteriormente devolvió un error 404 de formato.
            </p>
            
            <div style="${BLOQUE_INFO}">
              <h3 style="color: #D4FF00; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> ENLACE CORREGIDO</h3>
              <p style="color: #888888; font-size: 13px; margin-bottom: 15px;">
                Este enlace enruta correctamente al tutorial de preparación. Disculpas por el packet loss.
              </p>
              <a href="https://drive.google.com/file/d/1zta-19rP4KlyDLXrU3Tgjsk9gKarmX7e/view?usp=sharing" style="${BOTON_TERMINAL}">[ ABRIR TUTORIAL PARCHADO ]</a>
            </div>

            <div style="border-top: 1px solid #222222; margin-top: 30px; padding-top: 20px;">
              <p style="color: #888888; font-size: 12px; text-transform: uppercase;">SYS.ADMIN // Jorge Ulloa Roa</p>
            </div>
          </div>
        </div>
      `;
      
      try {
        MailApp.sendEmail({to: email, subject: "[PATCH] Corrección Link de Instalación Bootcamp Geo-IA", htmlBody: bodyFix, name: "Bootcamp Geo-IA"});
        sheet.getRange(i + 1, 8).setValue("Tutorial Enviado V3"); 
        enviados++;
      } catch(e) {
        console.log("Error enviando a: " + email);
      }
    }
  }
}

// ---------------------------------------------------------------------------------
// FUNCIÓN FINAL: ENVIAR LINKS DE CONEXIÓN
// ---------------------------------------------------------------------------------
function enviarLinksConexion() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var enviados = 0;
  
  for (var i = 1; i < data.length; i++) {
    var email = data[i][2] ? data[i][2].toString().trim() : "";
    var estado = data[i][7] ? data[i][7].toString().trim() : "";
    
    // Condición estricta: Solo alumnos en estado "Tutorial Enviado" o "Tutorial Enviado V3"
    if (estado === "Tutorial Enviado" || estado === "Tutorial Enviado V3") {
      var name = data[i][1];
      
      var bodyLinks = `
        <div style="${ESTILO_BASE}">
          <div style="${CONTENEDOR}">
            <div style="${BADGE_VERDE}">SYSTEM.ONLINE</div>
            <h1 style="${TITULO_H1}">Conexión Iniciada, ${name}.</h1>
            <p style="${TEXTO_SECUNDARIO}">
              Hoy arranca el <b>Bootcamp Geo-IA V3</b>. A continuación tienes los accesos directos de Google Meet para las 3 sesiones del fin de semana (20:00 a 21:30 hrs - Horario de Chile). ¡Guarda este correo!
            </p>

            <!-- SESIÓN 1 (VIERNES 7 - HOY) -->
            <div style="${BLOQUE_INFO}">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h3 style="color: #D4FF00; margin: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> MODULE.01: WORKSHOP (SESIÓN 1)</h3>
                <span style="font-size: 10px; color: #D4FF00; font-weight: bold;">[ EXEC_TODAY ]</span>
              </div>
              <p style="color: #888888; font-size: 13px; margin: 0 0 10px 0;">📅 Viernes, 7 de Agosto | ⏰ 20:00 – 21:30 hrs (Chile)</p>
              <a href="https://meet.google.com/dkp-rpqg-ktc" style="${BOTON_SOLIDO}">▶ ENTRAR A SALA DÍA 1 (MEET)</a>
            </div>

            <!-- SESIÓN 2 (SÁBADO 8) -->
            <div style="${BLOQUE_INFO}">
              <h3 style="color: #D4FF00; margin: 0 0 10px 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> MODULE.02: WORKSHOP (SESIÓN 2)</h3>
              <p style="color: #888888; font-size: 13px; margin: 0 0 10px 0;">📅 Sábado, 8 de Agosto | ⏰ 20:00 – 21:30 hrs (Chile)</p>
              <a href="https://meet.google.com/pgc-rmvk-dgj" style="${BOTON_SOLIDO} background-color:#12121a; color:#D4FF00; border:1px solid #D4FF00;">▶ ENTRAR A SALA DÍA 2 (MEET)</a>
            </div>

            <!-- SESIÓN 3 (DOMINGO 9) -->
            <div style="${BLOQUE_INFO}">
              <h3 style="color: #D4FF00; margin: 0 0 10px 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> MODULE.03: WORKSHOP (SESIÓN 3)</h3>
              <p style="color: #888888; font-size: 13px; margin: 0 0 10px 0;">📅 Domingo, 9 de Agosto | ⏰ 20:00 – 21:30 hrs (Chile)</p>
              <a href="https://meet.google.com/dos-fcdq-kee" style="${BOTON_SOLIDO} background-color:#12121a; color:#D4FF00; border:1px solid #D4FF00;">▶ ENTRAR A SALA DÍA 3 (MEET)</a>
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
        MailApp.sendEmail({to: email, subject: "[ACCESOS OFICIALES] Sockets de Conexión Bootcamp Geo-IA V3", htmlBody: bodyLinks, name: "Bootcamp Geo-IA"});
        sheet.getRange(i + 1, 8).setValue("Accesos Enviados"); 
        enviados++;
      } catch(e) {
        console.log("Error enviando accesos a: " + email);
      }
    }
  }
}

// ---------------------------------------------------------------------------------
// FUNCIÓN POST-CLASE: ENVIAR GRABACIONES
// ---------------------------------------------------------------------------------
function enviarGrabaciones() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var enviados = 0;
  
  for (var i = 1; i < data.length; i++) {
    var email = data[i][2] ? data[i][2].toString().trim() : "";
    var estado = data[i][7] ? data[i][7].toString().trim() : "";
    
    if (estado === "Accesos Enviados") {
      var name = data[i][1];
      
      var bodyGrabacion = `
        <div style="${ESTILO_BASE}">
          <div style="${CONTENEDOR}">
            <div style="${BADGE_VERDE}">DATA_EXTRACTED</div>
            <h1 style="${TITULO_H1}">Volcado de memoria, Día 1.</h1>
            <p style="${TEXTO_SECUNDARIO}">
              Si no pudiste sincronizar en vivo, o quieres repasar el código: <b>el archivo de log visual (grabación) está online.</b>
            </p>

            <div style="${BLOQUE_INFO}">
              <h3 style="color: #D4FF00; margin: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px;">> REPOSITORIO MAESTRO (DRIVE)</h3>
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
        MailApp.sendEmail({to: email, subject: "[REPOSITORIO] Grabación DÍA 1 disponible en bóveda", htmlBody: bodyGrabacion, name: "Bootcamp Geo-IA"});
        sheet.getRange(i + 1, 8).setValue("Carpeta Grabaciones Enviada"); 
        enviados++;
      } catch(e) {}
    }
  }
}

// ---------------------------------------------------------------------------------
// FUNCIÓN FINAL: CIERRE DE BOOTCAMP Y DIPLOMA OFICIAL AUTOMATIZADO (PDF)
// ---------------------------------------------------------------------------------
function generarDiplomaHtml(nombreAlumno, fechaEmision) {
  fechaEmision = fechaEmision || "10 de Agosto de 2026";
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
    .corner-tl { position: absolute; top: 0; left: 0; width: 30px; height: 30px; border-top: 4px solid #D4FF00; border-left: 4px solid #D4FF00; }
    .corner-br { position: absolute; bottom: 0; right: 0; width: 30px; height: 30px; border-bottom: 4px solid #D4FF00; border-right: 4px solid #D4FF00; }
    
    .badge {
      display: inline-block;
      padding: 6px 12px;
      border: 1px solid #D4FF00;
      color: #D4FF00;
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
      color: #D4FF00;
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
      color: #D4FF00;
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
    <div class="subtitle">Desarrollo Web Territorial con IA (Bootcamp V3)</div>
    
    <p style="color: #666666; margin-bottom: 10px; font-size: 13px;">Este documento certifica que:</p>
    <h2 class="student-name">${nombreAlumno}</h2>
    
    <p class="description">
      Ha completado satisfactoriamente los módulos teórico-prácticos del Bootcamp Geo-IA V3 (5 horas lectivas y 4 horas de práctica), demostrando competencias en análisis espacial, programación web frontend, uso de MapLibre GL JS, geoprocesamiento client-side con Turf.js y arquitectura Zero-Server.
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
      GEO-IA<br>VERIFIED<br>V3.0
    </div>
  </div>
</body>
</html>`;
}

function enviarDiplomasYCierre() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var enviados = 0;
  var fechaEmision = "10 de Agosto de 2026";
  
  for (var i = 1; i < data.length; i++) {
    var email = data[i][2] ? data[i][2].toString().trim() : "";
    var estado = data[i][7] ? data[i][7].toString().trim() : "";
    var name = data[i][1] ? data[i][1].toString().trim() : "Estudiante";
    
    // Alumnos confirmados que completaron el bootcamp
    var estadosValidos = [
      "Carpeta Grabaciones Enviada", 
      "Accesos Enviados", 
      "Tutorial Enviado V3", 
      "Tutorial Enviado", 
      "Pagado"
    ];
    
    if (estadosValidos.indexOf(estado) !== -1 && email !== "" && estado !== "Diploma Enviado") {
      try {
        // 1. Generar HTML del diploma y convertir a Blob PDF
        var diplomaHtml = generarDiplomaHtml(name, fechaEmision);
        var safeFileName = "Diploma_GeoIA_V3_" + name.replace(/[^a-zA-Z0-9]/g, "_") + ".pdf";
        var diplomaPdf = Utilities.newBlob(diplomaHtml, "text/html", "diploma.html")
                                  .getAs("application/pdf")
                                  .setName(safeFileName);
        
        // 2. Armar cuerpo del correo en estética dark Spur.us
        var bodyFinal = `
          <div style="${ESTILO_BASE}">
            <div style="${CONTENEDOR}">
              <div style="${BADGE_VERDE}">[BOOTCAMP COMPLETED]</div>
              <h1 style="${TITULO_H1}">¡Misión Cumplida, ${name}!</h1>
              
              <p style="${TEXTO_SECUNDARIO}">
                Han sido tres jornadas intensivas de mapas, código y arquitectura de IA. Queremos agradecerte por tu dedicación, constancia y por haber confiado en este espacio formativo para potenciar tus capacidades de desarrollo espacial.
              </p>

              <!-- BLOQUE 1: DIPLOMA -->
              <div style="${BLOQUE_INFO}">
                <h3 style="color: #D4FF00; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> TU DIPLOMA OFICIAL (ADJUNTO)</h3>
                <p style="color: #888888; font-size: 13px; margin-bottom: 0;">
                  Hemos generado y adjuntado a este correo tu certificado oficial de aprobación en formato PDF de alta resolución.
                </p>
              </div>

              <!-- BLOQUE 2: BÓVEDA DE RECURSOS -->
              <div style="${BLOQUE_INFO_SECUNDARIO}">
                <h3 style="color: #888888; margin-top: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">> REPOSITORIO Y BÓVEDA PERMANENTE</h3>
                <p style="color: #888888; font-size: 13px; margin-bottom: 15px;">
                  Tendrás acceso permanente a todas las grabaciones, plantillas de código, transcripciones y diapositivas en Google Drive:
                </p>
                <a href="${LINK_GRABACIONES_DRIVE}" style="${BOTON_TERMINAL}">[ ABRIR BÓVEDA DE RECURSOS ]</a>
              </div>

              <!-- BLOQUE 3: REDES / FEEDBACK -->
              <div style="border: 1px dashed #222222; padding: 20px; margin-bottom: 30px;">
                <h4 style="color: #FFFFFF; margin-top: 0; font-size: 12px; margin-bottom: 15px; text-transform: uppercase;">> COMPARTE TU LOGRO EN LINKEDIN</h4>
                <p style="color: #888888; font-size: 13px; margin-bottom: 15px;">
                  Te invitamos a compartir tu visor web final o tu diploma en LinkedIn y etiquetarme. El feedback de la comunidad es el motor para seguir iterando estas herramientas.
                </p>
                <p style="color: #888888; font-size: 13px; margin-bottom: 0;">
                  🔗 <a href="https://www.linkedin.com/in/jorge-ulloa-roa/" style="color: #D4FF00; text-decoration: none; font-weight: bold;">Perfil de LinkedIn de Jorge Ulloa Roa</a>
                </p>
              </div>

              <div style="border-top: 1px solid #222222; margin-top: 30px; padding-top: 20px;">
                <p style="color: #888888; font-size: 12px; text-transform: uppercase;">¡Nos vemos en la Versión 4.0 o en futuros proyectos!<br><span style="color:#FFF;">Jorge Ulloa Roa</span></p>
              </div>
            </div>
          </div>
        `;

        // 3. Enviar correo con adjunto
        MailApp.sendEmail({
          to: email,
          subject: "[DIPLOMA OFICIAL] Certificado de Aprobación y Bóveda Final — Bootcamp Geo-IA V3",
          htmlBody: bodyFinal,
          attachments: [diplomaPdf],
          name: "Bootcamp Geo-IA"
        });

        // 4. Actualizar estado en la hoja
        sheet.getRange(i + 1, 8).setValue("Diploma Enviado");
        enviados++;
        console.log("Diploma despachado con éxito a: " + email);
        
      } catch (err) {
        console.log("Error despachando diploma a " + email + ": " + err.toString());
      }
    }
  }
  console.log("Total de diplomas enviados: " + enviados);
}
