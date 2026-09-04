const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const rows = [
  ["Fecha", "Nombre", "Email", "País", "Nivel", "Profesión", "Plan", "Estado Pago"],
  [new Date(), "Ana", "ana@example.com", "Chile", "", "", "", "Recordatorio Final Enviado"],
  [new Date(), "Luis", "luis@example.com", "Perú", "", "", "", "Recordatorio Final Enviado"],
  [new Date(), "Paz", "paz@example.com", "Chile", "", "", "", "Pagado"]
];
const sent = [];
const sheet = {
  getDataRange: () => ({ getValues: () => rows }),
  getRange: (row, column) => ({ setValue: value => { rows[row - 1][column - 1] = value; } })
};
const context = {
  GmailApp: { sendEmail: (...args) => sent.push(args) },
  SpreadsheetApp: { getActiveSpreadsheet: () => ({ getActiveSheet: () => sheet, getSheets: () => [sheet] }) },
  Utilities: { formatDate: () => "02/09/2026" },
  console
};

const source = fs.readFileSync("crm_script.gs", "utf8");
vm.createContext(context);
vm.runInContext(source, context);
context.enviarOfertaExclusivaHoy();

assert.strictEqual(sent.length, 2);
assert.match(sent[0][3].htmlBody, /\$20\.000 CLP/);
assert.match(sent[0][3].htmlBody, /https:\/\/mpago\.la\/1E75xtF/);
assert.match(sent[1][3].htmlBody, /22 USD/);
assert.match(sent[1][3].htmlBody, /https:\/\/www\.paypal\.com\/ncp\/payment\/RGT8AG7R7U4DA/);
assert.strictEqual(rows[1][7], "Oferta Exclusiva Enviada");
assert.strictEqual(rows[2][7], "Oferta Exclusiva Enviada");
assert.strictEqual(rows[3][7], "Pagado");
