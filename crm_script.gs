/**
 * ==============================================================================
 * SCRIPT CRM GOOGLE APPS SCRIPT - BOOTCAMP GEO-IA (ENVÍO ACCESOS GOOGLE MEET)
 * ==============================================================================
 * Instrucciones:
 * 1. Abre tu Google Sheet de Alumnos / CRM.
 * 2. Ve a Extensiones > Apps Script.
 * 3. Copia y reemplaza todo el contenido de este archivo en Code.gs (o añade la función).
 * 4. Ejecuta la función `enviarLinksConexion()`.
 */

// Enlaces de Google Meet actualizados
const MEET_LINKS = {
  sesion1: "https://meet.google.com/dkp-rpqg-ktc", // Viernes 7 de Agosto (20:00 - 21:30 hrs)
  sesion2: "https://meet.google.com/pgc-rmvk-dgj", // Sábado 8 de Agosto (20:00 - 21:30 hrs)
  sesion3: "https://meet.google.com/dos-fcdq-kee"  // Domingo 9 de Agosto (20:00 - 21:30 hrs)
};

/**
 * Envía los links de conexión a todos los alumnos que ya pagaron / están confirmados.
 */
function enviarLinksConexion() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    Logger.log("No hay datos en la hoja.");
    return;
  }
  
  // Buscar índices de columnas por encabezado (insensible a mayúsculas)
  const headers = data[0].map(h => String(h).trim().toLowerCase());
  
  const colNombre = headers.findIndex(h => h.includes("nombre"));
  const colEmail = headers.findIndex(h => h.includes("correo") || h.includes("email"));
  const colEstado = headers.findIndex(h => h.includes("estado") || h.includes("status"));
  
  if (colEmail === -1 || colEstado === -1) {
    Logger.log("ERROR: No se encontraron las columnas de Email o Estado.");
    return;
  }
  
  let enviadosCount = 0;
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const nombre = colNombre !== -1 && row[colNombre] ? row[colNombre].toString().split(" ")[0] : "Alumno(a)";
    const email = row[colEmail] ? row[colEmail].toString().trim() : "";
    const estado = row[colEstado] ? row[colEstado].toString().trim() : "";
    
    // Filtrar alumnos pagados / ok que no tengan aún los accesos enviados
    // Acepta estados: "PAGADO", "OK", "CONFIRMADO", "TUTORIAL ENVIADO", etc.
    const estaOk = /pagado|ok|confirmado|tutorial enviado/i.test(estado);
    const yaEnviado = /links enviados|accesos enviados/i.test(estado);
    
    if (email && estaOk && !yaEnviado) {
      try {
        const htmlBody = getTemplateHTML(nombre);
        const subject = "🚨 ACCESOS OFICIALES: Links de Conexión Bootcamp Geo-IA V3";
        
        GmailApp.sendEmail(email, subject, "Hola " + nombre + ", aquí tienes tus accesos al Bootcamp Geo-IA V3:\n\n" +
          "Sesión 1 (Viernes 7): " + MEET_LINKS.sesion1 + "\n" +
          "Sesión 2 (Sábado 8): " + MEET_LINKS.sesion2 + "\n" +
          "Sesión 3 (Domingo 9): " + MEET_LINKS.sesion3, {
            htmlBody: htmlBody,
            name: "Jorge Ulloa - Geo-IA"
          });
        
        // Actualizar estado en la hoja
        sheet.getRange(i + 1, colEstado + 1).setValue("Links Enviados V3");
        enviadosCount++;
        Logger.log("Enviado con éxito a: " + email);
        
        // Pausa ligera para no saturar la cuota de correo
        Utilities.sleep(500);
      } catch (err) {
        Logger.log("Error al enviar a " + email + ": " + err.toString());
      }
    }
  }
  
  SpreadsheetApp.getUi().alert("✅ Proceso finalizado. Se enviaron " + enviadosCount + " correos con los links de conexión.");
}

/**
 * Plantilla HTML del correo con el diseño oscuro Neobrutalista y los Meet Links actualizados.
 */
function getTemplateHTML(nombre) {
  return `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #050508; color: #ffffff; padding: 40px 20px; text-align: center;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a12; border: 1px solid #1a1a24; border-radius: 12px; padding: 40px; box-shadow: 0 10px 30px rgba(0,255,204,0.05);">
      
      <div style="display: inline-block; padding: 8px 16px; background-color: rgba(0,255,204,0.1); border: 1px solid rgba(0,255,204,0.3); border-radius: 30px; color: #00ffcc; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; margin-bottom: 20px;">
        [ACCESOS OFICIALES]
      </div>

      <h1 style="color: #ffffff; margin-top: 0; font-size: 26px;">¡Llegó el Gran Día, ${nombre}!</h1>
      <p style="color: #a0a0b0; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
        Hoy comenzamos oficialmente el <b>Bootcamp Geo-IA V3</b>. A continuación tienes los enlaces directos de Google Meet para acceder a la sala en vivo de cada sesión. ¡Guarda este correo para todo el fin de semana!
      </p>

      <!-- DÍA 1 -->
      <div style="background-color: #12121a; border-left: 4px solid #00ffcc; padding: 25px; border-radius: 4px; text-align: left; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h3 style="color: #00ffcc; margin: 0; font-size: 16px; letter-spacing: 1px; text-transform: uppercase;">DÍA 1: Workshop (Sesión 1)</h3>
          <span style="background-color: rgba(0,255,204,0.1); padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #00ffcc; font-weight: bold;">HOY</span>
        </div>
        <p style="color: #d0d0e0; font-size: 14px; margin-bottom: 5px;">📅 <b>Viernes, 7 de Agosto</b></p>
        <p style="color: #d0d0e0; font-size: 14px; margin-bottom: 15px;">⏰ <b>20:00 – 21:30 hrs</b> (Hora de Chile)</p>
        <a href="${MEET_LINKS.sesion1}" style="display: inline-block; background-color: #00ffcc; color: #050508; padding: 12px 22px; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 14px;">▶ ENTRAR A SALA DÍA 1</a>
      </div>

      <!-- DÍA 2 -->
      <div style="background-color: #12121a; border-left: 4px solid #ff2d78; padding: 25px; border-radius: 4px; text-align: left; margin-bottom: 20px;">
        <h3 style="color: #ff2d78; margin: 0 0 15px 0; font-size: 16px; letter-spacing: 1px; text-transform: uppercase;">DÍA 2: Workshop (Sesión 2)</h3>
        <p style="color: #d0d0e0; font-size: 14px; margin-bottom: 5px;">📅 <b>Sábado, 8 de Agosto</b></p>
        <p style="color: #d0d0e0; font-size: 14px; margin-bottom: 15px;">⏰ <b>20:00 – 21:30 hrs</b> (Hora de Chile)</p>
        <a href="${MEET_LINKS.sesion2}" style="display: inline-block; background-color: #ff2d78; color: #ffffff; padding: 12px 22px; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 14px;">▶ ENTRAR A SALA DÍA 2</a>
      </div>

      <!-- DÍA 3 -->
      <div style="background-color: #12121a; border-left: 4px solid #ffcc00; padding: 25px; border-radius: 4px; text-align: left; margin-bottom: 30px;">
        <h3 style="color: #ffcc00; margin: 0 0 15px 0; font-size: 16px; letter-spacing: 1px; text-transform: uppercase;">DÍA 3: Workshop (Sesión 3)</h3>
        <p style="color: #d0d0e0; font-size: 14px; margin-bottom: 5px;">📅 <b>Domingo, 9 de Agosto</b></p>
        <p style="color: #d0d0e0; font-size: 14px; margin-bottom: 15px;">⏰ <b>20:00 – 21:30 hrs</b> (Hora de Chile)</p>
        <a href="${MEET_LINKS.sesion3}" style="display: inline-block; background-color: #ffcc00; color: #050508; padding: 12px 22px; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 14px;">▶ ENTRAR A SALA DÍA 3</a>
      </div>

      <div style="border: 1px dashed rgba(255,255,255,0.2); padding: 20px; border-radius: 8px;">
        <h4 style="color: #ffffff; margin-top: 0; margin-bottom: 15px;">⚠️ Recordatorios Clave</h4>
        <p style="color: #a0a0b0; font-size: 14px; margin-bottom: 5px; text-align: left;">1. Conéctate <b>5 minutos antes</b> (19:55 hrs) para probar tu audio y video.</p>
        <p style="color: #a0a0b0; font-size: 14px; margin-bottom: 0; text-align: left;">2. Asegúrate de tener el software listo como vimos en el tutorial.</p>
      </div>

      <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 30px 0;">
      <p style="color: #a0a0b0; font-size: 14px;">¡Nos vemos esta noche!<br><b>Jorge Ulloa Roa</b></p>
    </div>
  </div>
  `;
}
