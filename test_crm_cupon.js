const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

function createMockContext() {
  const rows = [];
  const sentEmails = [];
  
  const sheet = {
    getLastRow: () => rows.length,
    appendRow: (row) => rows.push(row),
    getRange: () => ({
      setFontWeight: () => ({ setBackground: () => ({ setFontColor: () => {} }) }),
      setValue: (val) => {}
    }),
    getDataRange: () => ({ getValues: () => rows })
  };

  const ContentService = {
    MimeType: { JSON: "application/json" },
    createTextOutput: (str) => ({
      setMimeType: () => ({ raw: str })
    })
  };

  const context = {
    GmailApp: {
      sendEmail: (to, subject, body, options) => {
        sentEmails.push({ to, subject, body, options });
      }
    },
    SpreadsheetApp: {
      getActiveSpreadsheet: () => ({
        getActiveSheet: () => sheet,
        getSheets: () => [sheet]
      })
    },
    ContentService,
    Utilities: {
      formatDate: () => "03/09/2026",
      newBlob: () => ({ getAs: () => ({ setName: () => {} }) })
    },
    console
  };

  const source = fs.readFileSync("crm_script.gs", "utf8");
  vm.createContext(context);
  vm.runInContext(source, context);

  return { context, rows, sentEmails };
}

// -------------------------------------------------------------
// Test 1: Ingesta Chile con Cupón 'conmapas' (lowercase)
// -------------------------------------------------------------
{
  const { context, rows, sentEmails } = createMockContext();
  const req = {
    parameter: {
      name: "Camila Díaz",
      email: "camila@example.com",
      country: "Chile",
      nivel_sig: "Intermedio",
      ocupacion: "Geógrafa",
      plan: "Acceso General — $30.000 CLP",
      cupon: "conmapas"
    }
  };

  context.doPost(req);

  // Verificación fila hoja (header + 1 fila)
  assert.strictEqual(rows.length, 2, "Debe tener cabecera y fila registrada");
  const fila = rows[1];
  assert.strictEqual(fila[1], "Camila Díaz");
  assert.strictEqual(fila[2], "camila@example.com");
  assert.strictEqual(fila[3], "Chile");
  assert.match(fila[6], /Cupón CONMAPAS/);
  assert.strictEqual(fila[7], "Pendiente");

  // Verificación emails enviados: 1 al admin y 1 al usuario
  assert.strictEqual(sentEmails.length, 2);
  const emailUser = sentEmails.find(m => m.to === "camila@example.com");
  assert(emailUser, "Debe enviar email al usuario");
  assert.match(emailUser.options.htmlBody, /\$20\.000 CLP/);
  assert.match(emailUser.options.htmlBody, /https:\/\/mpago\.la\/1E75xtF/);
  assert.match(emailUser.options.htmlBody, /TARIFA PROMOCIONAL CUPÓN CONMAPAS/);
  console.log("✓ Test 1 Passed: Chile con cupón CONMAPAS ($20.000 CLP y link correcto)");
}

// -------------------------------------------------------------
// Test 2: Ingesta Internacional con Cupón 'CONMAPAS'
// -------------------------------------------------------------
{
  const { context, rows, sentEmails } = createMockContext();
  const req = {
    parameter: {
      name: "Mateo Rossi",
      email: "mateo@example.com",
      country: "Argentina",
      nivel_sig: "Principiante",
      ocupacion: "Ingeniero Ambiental",
      plan: "Acceso General",
      cupon: "CONMAPAS "
    }
  };

  context.doPost(req);

  const emailUser = sentEmails.find(m => m.to === "mateo@example.com");
  assert(emailUser, "Debe enviar email al usuario internacional");
  assert.match(emailUser.options.htmlBody, /22 USD/);
  assert.match(emailUser.options.htmlBody, /https:\/\/www\.paypal\.com\/ncp\/payment\/RGT8AG7R7U4DA/);
  assert.match(emailUser.options.htmlBody, /TARIFA PROMOCIONAL CUPÓN CONMAPAS/);
  console.log("✓ Test 2 Passed: Internacional con cupón CONMAPAS (22 USD y PayPal correcto)");
}

// -------------------------------------------------------------
// Test 3: Ingesta Normal SIN cupón (Chile General vs Estudiante)
// -------------------------------------------------------------
{
  const { context, sentEmails } = createMockContext();
  
  // General
  context.doPost({
    parameter: {
      name: "Juan Pérez",
      email: "juan@example.com",
      country: "Chile",
      plan: "Acceso General — $30.000 CLP",
      cupon: ""
    }
  });
  const emailGeneral = sentEmails.find(m => m.to === "juan@example.com");
  assert.match(emailGeneral.options.htmlBody, /\$30\.000 CLP/);
  assert.match(emailGeneral.options.htmlBody, /f7b0764f-2801-4b26-a858-59c416eebe42/);

  // Estudiante
  context.doPost({
    parameter: {
      name: "Sofia Lara",
      email: "sofia@example.com",
      country: "Chile",
      plan: "Pase Estudiantes — $25.000 CLP",
      cupon: ""
    }
  });
  const emailEstudiante = sentEmails.find(m => m.to === "sofia@example.com");
  assert.match(emailEstudiante.options.htmlBody, /\$25\.000 CLP/);
  assert.match(emailEstudiante.options.htmlBody, /https:\/\/mpago\.la\/1EvJQi3/);
  console.log("✓ Test 3 Passed: Flujos regulares Chile (General $30k, Estudiante $25k)");
}

// -------------------------------------------------------------
// Test 4: Recordatorios Automáticos respetan precio CONMAPAS
// -------------------------------------------------------------
{
  const rows = [
    ["Fecha", "Nombre", "Email", "País", "Nivel", "Profesión", "Plan", "Estado Pago"],
    // 25 horas transcurridas con cupón CONMAPAS
    [new Date(Date.now() - 25 * 3600 * 1000), "Diego", "diego@example.com", "Chile", "", "", "Acceso General [Cupón CONMAPAS: $20.000 CLP / 22 USD]", "Pendiente"],
    // 75 horas transcurridas con cupón CONMAPAS internacional
    [new Date(Date.now() - 75 * 3600 * 1000), "Lucia", "lucia@example.com", "México", "", "", "Acceso General [Cupón CONMAPAS: $20.000 CLP / 22 USD]", "Recordatorio Enviado"]
  ];
  const sentEmails = [];
  const sheet = {
    getDataRange: () => ({ getValues: () => rows }),
    getRange: (r, c) => ({ setValue: (v) => { rows[r - 1][c - 1] = v; } })
  };
  const context = {
    GmailApp: { sendEmail: (to, subject, body, options) => sentEmails.push({ to, subject, body, options }) },
    SpreadsheetApp: { getActiveSpreadsheet: () => ({ getActiveSheet: () => sheet, getSheets: () => [sheet] }) },
    Utilities: { formatDate: () => "03/09/2026" },
    console
  };

  const source = fs.readFileSync("crm_script.gs", "utf8");
  vm.createContext(context);
  vm.runInContext(source, context);

  context.enviarRecordatoriosPago();

  const rem24h = sentEmails.find(m => m.to === "diego@example.com");
  assert(rem24h, "Debe enviar recordatorio 24h");
  assert.match(rem24h.options.htmlBody, /https:\/\/mpago\.la\/1E75xtF/);
  assert.match(rem24h.options.htmlBody, /\$20\.000 CLP/);

  const rem72h = sentEmails.find(m => m.to === "lucia@example.com");
  assert(rem72h, "Debe enviar recordatorio 72h");
  assert.match(rem72h.options.htmlBody, /https:\/\/www\.paypal\.com\/ncp\/payment\/RGT8AG7R7U4DA/);
  assert.match(rem72h.options.htmlBody, /22 USD/);

  console.log("✓ Test 4 Passed: Recordatorios periódicos 24h y 72h preservan precios y links de CONMAPAS");
}

console.log("\nTODOS LOS TESTS DE CUPÓN CONMAPAS PASARON EXITOSAMENTE.");
