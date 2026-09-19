const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(`${__dirname}/crm_script.gs`, 'utf8');
const eligible = 'Carpeta Grabaciones Enviada';
const headers = ['Fecha', 'Nombre', 'Email', 'País', 'Nivel SIG', 'Profesión', 'Plan', 'Estado Pago'];
const row = (name, email, state = eligible) => ['', name, email, 'Chile', '', '', 'General', state];

function app(rows = [], options = {}) {
  const data = [headers.slice(), ...rows.map(r => r.slice())];
  const mail = [], writes = [], pdfs = [], logs = [], confirmations = [];
  let opened = 0, released = 0, locked = false, quota = options.quota ?? 100;
  const spreadsheet = {
    getId: () => 'isolated-v4-sheet',
    getName: () => 'Inscritos Bootcamp V4',
    getActiveSheet() { throw new Error('Must not depend on active tab'); },
    getSheets: () => options.multipleSheets ? [sheet, { ...sheet, getName: () => 'Copia V4' }] : [{ getLastColumn: () => 0 }, sheet]
  };
  const sheet = {
    getName: () => 'V4',
    getParent: () => spreadsheet,
    getLastColumn: () => data[0].length,
    getDataRange: () => ({ getValues: () => data.map(r => r.slice()) }),
    getRange: (r, c, height = 1, width = 1) => ({
      getValues() {
        if (options.changeRow && r > 1) data[r - 1][2] = 'changed@example.test';
        if (options.changeAfterReservation && r > 1 && data[r - 1][7] === 'Enviando Diploma') data[r - 1][2] = 'changed@example.test';
        return data.slice(r - 1, r - 1 + height).map(value => value.slice(c - 1, c - 1 + width));
      },
      setValue(value) {
        assert.equal(c, 8);
        if (options.finalWriteFailure && value === 'Diploma Enviado') throw new Error('Sheet update failed');
        data[r - 1][c - 1] = value;
        writes.push([r, value]);
        return this;
      }
    })
  };
  const context = vm.createContext({
    console: { log: value => logs.push(value), error: value => logs.push(value) },
    SpreadsheetApp: {
      getActiveSpreadsheet() { opened++; return options.unbound ? null : spreadsheet; },
      openById() { throw new Error('No manual spreadsheet ID should be needed'); },
      getUi() {
        if (options.noUi) throw new Error('No Sheets UI available');
        return { ButtonSet: { YES_NO: 'YES_NO' }, Button: { YES: 'YES' }, alert: (title, text, buttons) => {
          assert.equal(locked, false, 'Never hold a script lock across a native dialog');
          assert.equal(buttons, 'YES_NO');
          confirmations.push({ title, text });
          if (options.changeAfterConfirm) data[1][2] = 'changed@example.test';
          if (options.protectedAfterConfirm) data.push(row('Duplicate', data[1][2], 'Diploma Enviado'));
          if (options.newAfterConfirm) data.push(row('New', 'new@example.test'));
          if (options.quotaAfterConfirm !== undefined) quota = options.quotaAfterConfirm;
          return options.confirm ?? 'YES';
        } };
      },
      flush() { if (options.flushFailure) throw new Error('Flush failed'); }
    },
    LockService: { getScriptLock: () => ({ tryLock: () => { if (options.lockBusy) return false; locked = true; return true; }, releaseLock: () => { released++; locked = false; } }) },
    MailApp: { getRemainingDailyQuota: () => quota },
    Utilities: {
      formatDate: (_date, zone, format) => { assert.equal(zone, 'America/Santiago'); assert.equal(format, 'yyyy-MM-dd'); return '2026-09-18'; },
      newBlob: (html, type) => {
        assert.equal(type, 'text/html');
        return { getAs(pdfType) {
          if (options.pdfFailure) throw new Error('PDF conversion failed');
          assert.equal(pdfType, 'application/pdf');
          const pdf = { html, type: pdfType, setName(name) { this.name = name; return this; } };
          pdfs.push(pdf); return pdf;
        } };
      }
    },
    GmailApp: { sendEmail: (to, subject, text, opts) => {
      if (!subject.startsWith('[PRUEBA')) {
        assert.ok(locked);
        assert.ok(confirmations.length);
        assert.match(to, /@example\.test$/);
        assert.equal(data.find(r => String(r[2]).trim().toLowerCase() === to)[7], 'Enviando Diploma');
      }
      mail.push({ to, subject, text, opts }); quota--;
      if (options.mailFailure) throw new Error('Ambiguous Gmail failure');
    } }
  });
  vm.runInContext(source, context);
  return {
    context, data, mail, writes, pdfs, logs, confirmations,
    stats: () => ({ opened, released }),
    configure(values = {}) { context.config = values; vm.runInContext('Object.assign(CIERRE_V4, config)', context); },
    run: expression => vm.runInContext(expression, context)
  };
}

let test = app([row('Ana', 'ana@example.test')]);
test.run('enviarPruebaDiplomaV4()');
assert.equal(test.stats().opened, 0);
assert.equal(test.writes.length, 0);
assert.equal(test.mail.length, 1);
assert.equal(test.mail[0].to, 'jorge.ulloa.roa@gmail.com');
assert.match(test.mail[0].subject, /PRUEBA SOLO ADMIN/);
assert.match(test.pdfs[0].html, /Estudiante de prueba/);
assert.match(test.pdfs[0].html, /18 de septiembre de 2026/);
assert.ok(!/planillaId:|nombreHoja:|envioHabilitado/.test(source));
for (const confirm of ['NO', 'CLOSE', undefined]) {
  test = app([row('Ana', 'ana@example.test')], { confirm: confirm ?? 'CANCEL' });
  assert.equal(test.run('enviarDiplomasYCierre()').cancelado, true);
  assert.equal(test.mail.length + test.writes.length + test.pdfs.length, 0);
  assert.equal(test.stats().released, 0);
}

test = app([row('María & <Roa>', ' MARIA@example.test '), row('Luis', 'luis@example.test'), row('Pendiente', 'p@example.test', 'Pendiente'), row('Acceso', 'a@example.test', 'Accesos Enviados'), row('Entregado', 'e@example.test', 'Diploma Enviado'), row('Revisar', 'r@example.test', 'Revisar Diploma')]);
let preview = test.run('previsualizarDiplomasV4()');
assert.equal(preview.total, 2);
assert.equal(preview.destinatarios[0].fila, 2);
assert.equal(preview.destinatarios[0].email, 'maria@example.test');
assert.equal(preview.porRevisar.length, 1);
assert.equal(test.mail.length + test.writes.length + test.pdfs.length, 0);
let result = test.run('enviarDiplomasYCierre()');
assert.equal(result.enviados, 2);
assert.equal(result.pendientes, 0);
assert.equal(result.porRevisar, 1);
assert.match(test.confirmations[0].text, /Inscritos Bootcamp V4/);
assert.match(test.confirmations[0].text, /Pestaña: V4/);
assert.match(test.confirmations[0].text, /María & <Roa> <maria@example.test>/);
assert.match(test.confirmations[0].text, /Luis <luis@example.test>/);
assert.doesNotMatch(test.confirmations[0].text, /<(?:p|a|e|r)@example/);
assert.deepEqual(test.mail.map(m => m.to), ['maria@example.test', 'luis@example.test']);
assert.equal(test.data[1][7], 'Diploma Enviado');
assert.equal(test.data[4][7], 'Accesos Enviados');
assert.match(test.pdfs[0].html, /María &amp; &lt;Roa&gt;/);
assert.doesNotMatch(test.pdfs[0].html, /María & <Roa>/);
assert.match(test.mail[0].opts.htmlBody, /María &amp; &lt;Roa&gt;/);
assert.match(test.mail[0].text, /María & <Roa>/);
assert.match(test.mail[0].opts.attachments[0].name, /^Diploma_GeoIA_V4_.*\.pdf$/);
for (const text of ['Bootcamp Geo-IA V4', '9 hrs totales', '5 horas lectivas y 4 horas de práctica']) assert.ok(test.pdfs[0].html.includes(text));
for (const url of ['https://canva.link/workshop-gis-ia', 'https://drive.google.com/drive/folders/1omSvhwQ2WQng5rlLm4ADz6vJOmHTsRGN', 'https://www.linkedin.com/in/jorge-ulloa-roa/']) {
  assert.ok(test.mail[0].opts.htmlBody.includes(url));
  assert.ok(test.mail[0].text.includes(url));
}
assert.equal(test.run('enviarDiplomasYCierre()').enviados, 0);
assert.equal(test.mail.length, 2);
assert.equal(test.stats().released, 1);

for (const state of [eligible, 'Diploma Enviado', 'Enviando Diploma', 'Revisar Diploma']) {
  test = app([row('Ana', 'ana@example.test'), row('Otra fila', 'ANA@example.test', state)]);
  assert.equal(test.run('previsualizarDiplomasV4()').errores.length, 1);
  assert.throws(() => test.run('enviarDiplomasYCierre()'), /duplicado/);
  assert.equal(test.mail.length + test.writes.length, 0);
  assert.equal(test.stats().released, 0);
  assert.equal(test.confirmations.length, 0);
}
for (const entry of [row('', 'v@example.test'), row('Ana', ''), row('Ana', 'one@example.test,two@example.test'), row('Ana', 'one@example.test\nBcc:two@example.test')]) {
  test = app([entry]);
  assert.throws(() => test.run('enviarDiplomasYCierre()'), /correo no es válido/);
  assert.equal(test.mail.length + test.writes.length, 0);
}
for (const [option, expectedState] of [['pdfFailure', eligible], ['flushFailure', 'Enviando Diploma'], ['mailFailure', 'Revisar Diploma'], ['finalWriteFailure', 'Revisar Diploma']]) {
  test = app([row('Ana', 'ana@example.test')], { [option]: true });
  assert.throws(() => test.run('enviarDiplomasYCierre()'));
  assert.equal(test.data[1][7], expectedState);
  assert.equal(test.stats().released, 1);
  if (option !== 'pdfFailure') {
    const sent = test.mail.length;
    const retried = test.run('enviarDiplomasYCierre()');
    assert.equal(retried.enviados, 0);
    assert.equal(retried.porRevisar, 1);
    assert.equal(test.mail.length, sent);
  }
}
for (const option of [{ quota: 0 }, { lockBusy: true }, { changeRow: true }, { changeAfterConfirm: true }, { protectedAfterConfirm: true }, { quotaAfterConfirm: 0 }, { noUi: true }, { unbound: true }, { multipleSheets: true }]) {
  test = app([row('Ana', 'ana@example.test')], option);
  assert.throws(() => test.run('enviarDiplomasYCierre()'));
  assert.equal(test.mail.length + test.writes.length, 0);
}
test = app([row('Ana', 'ana@example.test')], { changeAfterReservation: true });
assert.throws(() => test.run('enviarDiplomasYCierre()'), /cambió después de reservarla/);
assert.equal(test.mail.length, 0);
assert.equal(test.data[1][7], 'Enviando Diploma');
assert.equal(test.stats().released, 1);
test = app(Array.from({ length: 21 }, (_, i) => row(`Alumno ${i}`, `alumno${i}@example.test`)));
assert.equal(test.run('enviarDiplomasYCierre()').enviados, 20);
assert.equal(test.run('enviarDiplomasYCierre()').enviados, 1);
assert.equal(new Set(test.mail.map(m => m.to)).size, 21);
test = app([row('Ana', 'a@example.test'), row('Luis', 'l@example.test')], { quota: 1 });
result = test.run('enviarDiplomasYCierre()');
assert.equal(result.enviados, 1); assert.equal(result.pendientes, 1);
test = app([row('Ana', 'a@example.test')]); test.data[0][7] = 'Otra columna';
assert.throws(() => test.run('previsualizarDiplomasV4()'), /No se encontró una pestaña/);
test = app([row('Ana', 'ana@example.test')], { newAfterConfirm: true });
result = test.run('enviarDiplomasYCierre()');
assert.deepEqual(test.mail.map(m => m.to), ['ana@example.test']);
assert.equal(result.pendientes, 1);
for (const maxPorEjecucion of [0, 21, 1.5]) {
  test = app([row('Ana', 'ana@example.test')]); test.configure({ maxPorEjecucion });
  assert.throws(() => test.run('enviarDiplomasYCierre()'), /entero entre 1 y 20/);
  assert.equal(test.mail.length, 0);
}
test = app(); test.configure({ fechaEmision: '20 de septiembre de 2026' });
assert.match(test.run('generarDiplomaHtml("Nombre de prueba")'), /20 de septiembre de 2026/);
assert.doesNotMatch(test.run('generarDiplomaHtml("Nombre", "<fecha>")'), /<div class="footer-value"><fecha>/);
console.log('V4 paste-and-run: bound-sheet detection, exact confirmed batch, cancel/no-UI, concurrent changes, admin-only test, PDF/mail, escaping, duplicate protection, locks, quotas, resume and ambiguous-failure states OK. No Google services or real email used.');
