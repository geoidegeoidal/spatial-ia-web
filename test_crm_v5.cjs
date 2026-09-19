const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(`${__dirname}/crm_v5_script.gs`, 'utf8');
const headers = ['Fecha', 'Nombre', 'Email', 'País', 'Nivel SIG', 'Profesión', 'Plan', 'Estado Pago'];

function app(options = {}) {
  const makeTrigger = (handler, hours) => ({ handler, hours, getHandlerFunction: () => handler });
  const mail = [], logs = [], triggers = [makeTrigger('otroProceso', 24)];
  let locked = false, released = 0, flushes = 0, lockAttempts = 0;
  const makeSheet = (name, data = []) => ({
    name, data,
    getName() { return this.name; },
    getLastRow() { return this.data.length; },
    appendRow(row) { this.data.push(row.slice()); },
    getDataRange() { return { getValues: () => this.data.map(row => row.slice()) }; },
    getRange(row, column, height = 1, width = 1) {
      return {
        getValues: () => Array.from({ length: height }, (_, r) => Array.from({ length: width }, (_, c) => this.data[row - 1 + r]?.[column - 1 + c] ?? '')),
        getValue: () => this.data[row - 1]?.[column - 1] ?? '',
        setValue: value => {
          if (options.failPendingWrite && value === 'Pendiente') throw new Error('Final state failed');
          if (options.failReminderFinalWrite && value === 'Recordatorio Enviado') throw new Error('Reminder state failed');
          if (options.failTutorialFinalWrite && value === 'Tutorial Enviado') throw new Error('Tutorial state failed');
          this.data[row - 1][column - 1] = value;
          return this;
        },
        setFontWeight() { return this; },
        setBackground() { return this; },
        setFontColor() { return this; }
      };
    }
  });
  const v5 = makeSheet('V5', [(options.existingHeaders || headers).slice()]);
  const book = {
    timezone: '',
    getName: () => 'Bootcamp Versión 5',
    getSheetById: id => id === 0 ? v5 : null,
    getSheetByName: () => { throw new Error('Must use gid=0'); },
    insertSheet: () => { throw new Error('Must not create a sheet'); },
    setSpreadsheetTimeZone: zone => { book.timezone = zone; }
  };
  const context = vm.createContext({
    console: { log: value => logs.push(value), error: value => logs.push(value) },
    Date,
    SpreadsheetApp: {
      openById: id => { assert.equal(id, '13MgX1IAFHdkJCMrv6Iz1uu1q4zy8fZWR9HICcZ2glDs'); return book; },
      flush() { flushes++; if (options.failFinalFlush && flushes === 3) throw new Error('Final flush failed'); }
    },
    LockService: { getScriptLock: () => ({
      tryLock: () => { lockAttempts++; if (options.lockBusy || options.failLockAt?.includes(lockAttempts)) return false; locked = true; return true; },
      releaseLock: () => { assert.equal(locked, true); locked = false; released++; }
    }) },
    ScriptApp: {
      getProjectTriggers: () => triggers.slice(),
      deleteTrigger: trigger => { triggers.splice(triggers.indexOf(trigger), 1); },
      newTrigger: handler => ({ timeBased: () => ({ everyHours: hours => ({ create: () => { const trigger = makeTrigger(handler, hours); triggers.push(trigger); return trigger; } }) }) })
    },
    GmailApp: { sendEmail: (to, subject, text, config) => {
      assert.equal(locked, false, 'Email must not be sent while the sheet lock is held');
      if (options.sortAfterAdmin && to === 'jorge.ulloa.roa@gmail.com') v5.data = [v5.data[0], ...v5.data.slice(1).reverse()];
      if (options.markPaidOnParticipant && subject === 'Tu inscripción al Bootcamp Geo-IA V5') v5.data.find(row => row[2] === to)[7] = 'Pagado';
      if (options.markPaidDuringTutorial && /Tutorial/.test(subject)) v5.data.find(row => row[2] === to)[7] = 'Pagado';
      if (options.failAdmin && to === 'jorge.ulloa.roa@gmail.com') throw new Error('Admin mail failed');
      if (options.failParticipant && to !== 'jorge.ulloa.roa@gmail.com') throw new Error('Participant mail failed');
      if (options.failReminder && /RECORDATORIO/.test(subject)) throw new Error('Reminder failed');
      if (options.failTutorial && /Tutorial/.test(subject)) throw new Error('Tutorial failed');
      mail.push({ to, subject, text, config });
      if (options.ambiguousParticipant && to !== 'jorge.ulloa.roa@gmail.com') throw new Error('Ambiguous participant failure');
      if (options.ambiguousTutorial && /Tutorial/.test(subject)) throw new Error('Ambiguous tutorial failure');
      if (options.ambiguousReminder && /RECORDATORIO/.test(subject)) throw new Error('Ambiguous reminder failure');
    } },
    ContentService: {
      MimeType: { JSON: 'json' },
      createTextOutput: value => ({ value, setMimeType(type) { assert.equal(type, 'json'); return this; } })
    }
  });
  vm.runInContext(source, context);
  return {
    context, book, v5, mail, logs, triggers,
    stats: () => ({ released, locked, flushes, lockAttempts }),
    setup: () => vm.runInContext('prepararCRMV5()', context),
    run: expression => vm.runInContext(expression, context),
    post: parameters => {
      context.event = { parameter: parameters };
      return JSON.parse(vm.runInContext('doPost(event).value', context));
    }
  };
}

let test = app();
const setup = test.setup();
assert.equal(setup.estado, 'lista');
assert.deepEqual(Array.from(test.v5.data[0]), headers);
assert.equal(test.v5.data.length, 1);
assert.equal(test.book.timezone, 'America/Santiago');
assert.deepEqual(test.triggers.map(({ handler, hours }) => ({ handler, hours })), [{ handler: 'otroProceso', hours: 24 }, { handler: 'ejecutarCRMV5', hours: 1 }]);
test.setup();
assert.deepEqual(test.triggers.map(({ handler, hours }) => ({ handler, hours })), [{ handler: 'otroProceso', hours: 24 }, { handler: 'ejecutarCRMV5', hours: 1 }]);

let result = test.post({ name: 'Ana <Roa>', email: ' ANA@example.test ', country: 'Chile', nivel_sig: 'Medio', ocupacion: '=HYPERLINK("x")', plan: 'general' });
assert.equal(result.result, 'success');
assert.equal(result.registro.estado, 'Pendiente');
assert.equal(test.v5.data[1][2], 'ana@example.test');
assert.equal(test.v5.data[1][6], 'Pase general');
assert.equal(test.v5.data[1][7], 'Pendiente');
assert.equal(test.v5.data[1][5], "'=HYPERLINK(\"x\")");
assert.deepEqual(test.mail.map(message => message.to), ['jorge.ulloa.roa@gmail.com', 'ana@example.test']);
assert.match(test.mail[1].text, /\$35\.000 CLP/);
assert.match(test.mail[1].text, /f7b0764f-2801-4b26-a858-59c416eebe42/);
assert.match(test.mail[1].config.htmlBody, /Ana &lt;Roa&gt;/);
assert.doesNotMatch(test.mail[1].config.htmlBody, /cup(?:o|ó)n|CONMAPAS/i);
test.v5.data[1][0] = new Date(Date.now() - 25 * 3600000);
assert.equal(test.run('enviarRecordatoriosPagoV5()'), 1);
assert.equal(test.v5.data[1][7], 'Recordatorio Enviado');
assert.match(test.mail[2].subject, /RECORDATORIO/);
assert.match(test.mail[2].text, /\$35\.000 CLP/);
test.v5.data[1][0] = new Date(Date.now() - 73 * 3600000);
assert.equal(test.run('enviarRecordatoriosPagoV5()'), 1);
assert.equal(test.v5.data[1][7], 'Recordatorio Final Enviado');
assert.match(test.mail[3].subject, /ÚLTIMO RECORDATORIO/);
test.v5.data[1][7] = 'Pagado';
assert.equal(test.run('enviarTutorialesPagadosV5()'), 1);
assert.equal(test.v5.data[1][7], 'Tutorial Enviado');
assert.match(test.mail[4].subject, /Tutorial Bootcamp Geo-IA V5/);
assert.match(test.mail[4].text, /1zta-19rP4KlyDLXrU3Tgjsk9gKarmX7e/);
assert.match(test.mail[4].text, /16, 17 y 18 de octubre de 2026/);
assert.doesNotMatch(test.mail[4].text, /V4|Septiembre|binarios/i);
const rowsAfterFirst = test.v5.data.length;
result = test.post({ name: 'Ana', email: 'ana@example.test', country: 'Chile', plan: 'general' });
assert.equal(result.result, 'error');
assert.match(result.error, /ya está registrado/);
assert.equal(test.v5.data.length, rowsAfterFirst);
assert.equal(test.mail.length, 5);

test = app(); test.setup();
result = test.post({ name: 'Luis', email: 'luis@example.test', country: 'Chile', plan: 'estudiante' });
assert.equal(result.result, 'success');
assert.match(test.mail[1].text, /\$30\.000 CLP/);
assert.match(test.mail[1].text, /1EvJQi3/);
assert.match(test.mail[1].text, /certificado de alumno regular/);

test = app(); test.setup();
result = test.post({ name: 'Maya', email: 'maya@example.test', country: 'México', plan: 'general' });
assert.equal(result.result, 'success');
assert.match(test.mail[1].text, /US\$36/);
assert.match(test.mail[1].text, /2PVCP7EQT3DWU/);
assert.doesNotMatch(test.mail[1].text, /Banco Falabella/);

for (const payload of [
  { name: 'Maya', email: 'maya@example.test', country: 'México', plan: 'estudiante' },
  { name: 'Ana', email: 'ana@example.test', country: 'Chile', plan: 'general', cupon: 'CONMAPAS' },
  { name: '', email: 'bad', country: '', plan: 'otro' }
]) {
  test = app(); test.setup();
  result = test.post(payload);
  assert.equal(result.result, 'error');
  assert.equal(test.v5.data.length, 1);
  assert.equal(test.mail.length, 0);
}

for (const failure of ['failAdmin', 'failParticipant']) {
  test = app({ [failure]: true }); test.setup();
  result = test.post({ name: 'Ana', email: 'ana@example.test', country: 'Chile', plan: 'general' });
  assert.equal(result.result, 'error');
  assert.equal(test.v5.data[1][7], failure === 'failAdmin' ? 'Revisar Notificación Admin' : 'Revisar Correo Participante');
  assert.equal(test.mail.some(message => message.to === 'ana@example.test'), failure === 'failAdmin');
}

for (const failure of ['ambiguousParticipant', 'failPendingWrite', 'failFinalFlush']) {
  test = app({ [failure]: true }); test.setup();
  result = test.post({ name: 'Ana', email: 'ana@example.test', country: 'Chile', plan: 'general' });
  assert.equal(result.result, 'error');
  assert.equal(test.v5.data[1][7], failure === 'ambiguousParticipant' ? 'Revisar Correo Participante' : 'Revisar Estado Registro');
  assert.equal(test.mail.some(message => message.to === 'ana@example.test'), true);
  assert.equal(test.post({ name: 'Ana', email: 'ana@example.test', country: 'Chile', plan: 'general' }).result, 'error');
}

test = app(); test.setup();
result = test.post({ name: 'Ana\r\nBCC: alguien', email: 'ana@example.test', country: 'Chile', plan: 'general' });
assert.equal(result.result, 'success');
assert.doesNotMatch(test.mail[0].subject, /[\r\n]/);

test = app({ markPaidOnParticipant: true }); test.setup();
result = test.post({ name: 'Ana', email: 'ana@example.test', country: 'Chile', plan: 'general' });
assert.equal(result.result, 'success');
assert.equal(result.registro.estado, 'Pagado');
assert.equal(test.run('enviarTutorialesPagadosV5()'), 1);
assert.equal(test.v5.data[1][7], 'Tutorial Enviado');

test = app({ sortAfterAdmin: true }); test.setup();
assert.equal(test.post({ name: 'Ana', email: 'ana@example.test', country: 'Chile', plan: 'general' }).result, 'success');
assert.equal(test.post({ name: 'Luis', email: 'luis@example.test', country: 'Chile', plan: 'general' }).result, 'success');
assert.equal(test.v5.data.find(row => row[2] === 'ana@example.test')[7], 'Pendiente');
assert.equal(test.v5.data.find(row => row[2] === 'luis@example.test')[7], 'Pendiente');

test = app({ lockBusy: true });
result = test.post({ name: 'Ana', email: 'ana@example.test', country: 'Chile', plan: 'general' });
assert.equal(result.result, 'error');
assert.equal(test.v5.data.length, 1);
assert.equal(test.mail.length, 0);

test = app({ existingHeaders: ['mal'] });
assert.throws(() => test.setup(), /encabezados A:H/);
assert.equal(test.stats().released, 1);

test = app({ failReminder: true }); test.setup();
result = test.post({ name: 'Ana', email: 'ana@example.test', country: 'Chile', plan: 'general' });
test.v5.data[1][0] = new Date(Date.now() - 25 * 3600000);
assert.equal(test.run('enviarRecordatoriosPagoV5()'), 0);
assert.equal(test.v5.data[1][7], 'Revisar Recordatorio 24h');

for (const options of [{ ambiguousReminder: true }, { failReminderFinalWrite: true }, { failLockAt: [6] }]) {
  test = app(options); test.setup();
  result = test.post({ name: 'Ana', email: 'ana@example.test', country: 'Chile', plan: 'general' });
  test.v5.data[1][0] = new Date(Date.now() - 25 * 3600000);
  assert.equal(test.run('enviarRecordatoriosPagoV5()'), 0);
  assert.equal(test.v5.data[1][7], 'Revisar Recordatorio 24h');
  const sent = test.mail.length;
  assert.equal(test.run('enviarRecordatoriosPagoV5()'), 0);
  assert.equal(test.mail.length, sent);
}

for (const failure of ['failTutorial', 'ambiguousTutorial']) {
  test = app({ [failure]: true }); test.setup();
  result = test.post({ name: 'Ana', email: 'ana@example.test', country: 'Chile', plan: 'general' });
  test.v5.data[1][7] = 'Pagado';
  assert.equal(test.run('enviarTutorialesPagadosV5()'), 0);
  assert.equal(test.v5.data[1][7], 'Revisar Tutorial');
  const sent = test.mail.length;
  assert.equal(test.run('enviarTutorialesPagadosV5()'), 0);
  assert.equal(test.mail.length, sent);
}

for (const options of [{ failTutorialFinalWrite: true }, { failLockAt: [6] }]) {
  test = app(options); test.setup();
  result = test.post({ name: 'Ana', email: 'ana@example.test', country: 'Chile', plan: 'general' });
  test.v5.data[1][7] = 'Pagado';
  assert.equal(test.run('enviarTutorialesPagadosV5()'), 0);
  assert.equal(test.v5.data[1][7], 'Revisar Tutorial');
  const sent = test.mail.length;
  assert.equal(test.run('enviarTutorialesPagadosV5()'), 0);
  assert.equal(test.mail.length, sent);
}

test = app({ markPaidDuringTutorial: true }); test.setup();
result = test.post({ name: 'Ana', email: 'ana@example.test', country: 'Chile', plan: 'general' });
test.v5.data[1][7] = 'Pagado';
assert.equal(test.run('enviarTutorialesPagadosV5()'), 1);
assert.equal(test.v5.data[1][7], 'Tutorial Enviado');
test.v5.data[1][7] = ' Pagado ';
assert.equal(test.run('enviarTutorialesPagadosV5()'), 0);
assert.equal(test.v5.data[1][7], ' Pagado ');

assert.ok(!/SpreadsheetApp\.getUi|ui\.alert|envioHabilitado/i.test(source));
assert.doesNotMatch(source, /Bootcamp V4|Septiembre|CONMAPAS|20\.000|22 USD|25\.000|29 USD/i);
console.log('CRM V5: existing gid=0 validation, hourly trigger, automatic registration/reminders/paid tutorial, prices, no coupons, duplicates and uncertain-failure states OK. No Google services or real email used.');
