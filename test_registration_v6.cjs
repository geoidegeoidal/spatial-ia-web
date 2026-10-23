const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { before, after, test } = require('node:test');
const base = 'https://frontend.invalid/';
const countries = ['Chile', 'Argentina', 'Bolivia', 'Brasil', 'Colombia', 'Ecuador', 'España', 'México', 'Perú', 'Uruguay', 'Otro'];
let browser;
before(async () => { browser = await chromium.launch({ channel: 'msedge', headless: true }); });
after(async () => { await browser?.close(); });
async function open(t, edition = 'v6', options = {}) {
  const context = await browser.newContext({ javaScriptEnabled: options.js !== false, serviceWorkers: 'block', viewport: { width: 390, height: 844 } });
  const calls = [], errors = [], unexpected = [], reply = { status: 200, body: '{"result":"error","error":"Rejected V6."}' };
  t.after(async () => { await context.close(); assert.deepEqual(errors, []); assert.deepEqual(unexpected, []); });
  await context.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url());
    if (url.href === `https://crm.invalid/registration${edition === 'v6' ? '-v6' : ''}`) {
      calls.push([...await new Response(request.postDataBuffer(), { headers: { 'content-type': request.headers()['content-type'] } }).formData()]);
      if (reply.wait) await reply.wait;
      if (reply.fail) return route.abort();
      return route.fulfill({ status: reply.status, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: reply.body });
    }
    if (url.origin === new URL(base).origin) {
      const name = decodeURIComponent(url.pathname).slice(1) || 'index.html', file = path.resolve(__dirname, name);
      if (!file.startsWith(__dirname + path.sep) || !fs.existsSync(file) || (options.block && name === 'assets/registration.js')) return route.abort();
      let body = fs.readFileSync(file);
      if (options.disabled && name.endsWith('registration-v5.html')) body = Buffer.from(body.toString().replace('id="registration-submit" type="submit"', 'id="registration-submit" type="submit" disabled'));
      return route.fulfill({ body, contentType: ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg' })[path.extname(file)] || 'application/octet-stream' });
    }
    if (/^(script\.google(?:usercontent)?\.com|crm\.invalid)$/.test(url.hostname)) unexpected.push(url.href);
    return route.abort();
  });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  if (options.timeout) await page.addInitScript(() => { const schedule = window.setTimeout; window.setTimeout = (fn, ms, ...args) => schedule(fn, ms === 30000 ? 10 : ms, ...args); });
  await page.goto(base + `tests/fixtures/registration-${edition}.html`);
  page.setDefaultTimeout(5000);
  return { page, calls, reply };
}
const values = page => page.locator('#registration-form').evaluate(form => [...new FormData(form)]);
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
async function radio(page, name, value) { await page.locator(`[name="${name}"][value="${value}"]`).focus(); await page.keyboard.press('Space'); }
async function country(page, value) { await page.locator('#country-trigger').focus(); await page.keyboard.press('ArrowDown'); await page.locator(`[data-country="${value}"]`).focus(); await page.keyboard.press('Enter'); }
async function fill(page) { for (const [name, value] of Object.entries({ name: 'Zoë Núñez', email: 'v6+contract@example.test', ocupacion: 'Análisis & SIG' })) await page.locator(`[name="${name}"]`).fill(value); }

test('S1/S5: production markup matches the isolated form without automatic CRM traffic', async t => {
  const { page, calls } = await open(t);
  const fixtureForm = await page.locator('#registration-form').innerHTML();
  await page.goto(base);
  assert.equal(await page.locator('#registration-form').count(), 1);
  assert.equal(await page.locator('#registration-form').getAttribute('action'), 'https://script.google.com/macros/s/AKfycbxJUc0TiKZUoCnp2fIucSAhDbUeD5fHni69U-aEvNL4OtykAoKw_isH5qr7L9E9eCse5w/exec');
  assert.equal(await page.locator('#registration-form').innerHTML(), fixtureForm);
  assert.equal(await page.locator('#registration-submit').isEnabled(), true);
  assert.match(await page.locator('.announcement').innerText(), /Inscripciones V6 abiertas/);
  assert.match(await page.locator('meta[name=description]').getAttribute('content'), /Inscripciones V6 abiertas/);
  await page.locator('.faq details').nth(2).locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('.faq details').nth(2).getAttribute('open'), '');
  assert.match(await page.locator('.faq').innerText(), /La confirmación del pago es manual/);
  await page.locator('#registration-submit').click();
  assert.deepEqual(calls, []);
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    const small = await page.locator('#registration-form button,#registration-form label:has(input[type=radio])').evaluateAll(items => items.filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44); }).map(el => el.textContent));
    assert.deepEqual(small, []);
  }
  for (const options of [{ js: false }, { block: true }]) {
    const item = await open(t, 'v6', options);
    await item.page.goto(base);
    await fill(item.page);
    assert.equal(await item.page.locator('#registration-submit').isDisabled(), true);
    if (options.js === false) assert.match(await item.page.locator('noscript').innerText(), /Activa JavaScript.*no se enviarán tus datos/s);
    await item.page.locator('[name=email]').press('Enter');
    assert.deepEqual(item.calls, []);
    assert.equal(item.page.url(), base);
  }
});

test('S2: absent optional elements preserve the V5 country contract', async t => {
  const { page, calls } = await open(t, 'v5');
  assert.equal(await page.locator('#recordings-plan-price,[data-enable-on-ready]').count(), 0);
  assert.equal(await page.locator('#registration-submit').isEnabled(), true);
  await fill(page);
  assert.deepEqual(await page.locator('[data-country]').evaluateAll(items => items.map(item => item.dataset.country)), countries);
  for (const value of countries) {
    await country(page, value);
    assert.equal(await page.locator('#form-country').inputValue(), value);
    assert.equal(await page.locator('#country-trigger').evaluate(el => el === document.activeElement), true);
    assert.equal(await page.locator('#country-trigger').getAttribute('aria-expanded'), 'false');
    assert.equal(await page.locator('[name=plan][value=estudiante]').isDisabled(), value !== 'Chile');
    assert.equal(await page.locator('#general-plan-price').innerText(), value === 'Chile' ? '$35.000 CLP' : 'US$36');
    assert.equal(await page.locator('#plan-note').innerText(), value === 'Chile' ? 'El pase estudiantes requiere certificado de alumno regular vigente.' : 'Fuera de Chile se aplica el pase general internacional de US$36.');
    assert.equal(Object.fromEntries(await values(page)).country, value);
  }
  await country(page, 'Chile'); await radio(page, 'plan', 'estudiante'); await country(page, 'México');
  assert.equal(Object.fromEntries(await values(page)).plan, 'general');
  const disabled = await open(t, 'v5', { disabled: true });
  assert.equal(await disabled.page.locator('#registration-submit').isDisabled(), true);
  assert.deepEqual(calls, []);
});

test('S1/S2/S3: every country preserves recordings and its currency; students fall back only outside Chile', async t => {
  const { page, calls } = await open(t);
  assert.deepEqual(await page.locator('[name=plan]').evaluateAll(items => items.map(item => item.value)), ['general', 'estudiante', 'grabaciones']);
  await radio(page, 'plan', 'grabaciones');
  for (const value of countries) {
    await country(page, value);
    assert.equal(Object.fromEntries(await values(page)).plan, 'grabaciones');
    assert.equal(await page.locator('#recordings-plan-price').innerText(), value === 'Chile' ? '$20.000 CLP' : 'US$22');
    assert.equal(await page.locator('[name=plan][value=estudiante]').isDisabled(), value !== 'Chile');
    if (value !== 'Chile') assert.equal(await page.locator('#plan-note').innerText(), 'Fuera de Chile puedes elegir el pase general (US$36) o solo grabaciones (US$22). El pase estudiantes es exclusivo para Chile.');
  }
  await country(page, 'Chile'); await radio(page, 'plan', 'estudiante'); await country(page, 'Otro');
  assert.equal(Object.fromEntries(await values(page)).plan, 'general');
  const text = await page.locator('label:has([value=grabaciones])').innerText();
  assert.match(text, /No incluye sesiones en vivo\./);
  assert.doesNotMatch(text, /certific|permanente|inmediat|\d+ días/i);
  assert.deepEqual(calls, []);
});

test('S5: native rejection and response failures preserve data hashes, with one pending POST', async t => {
  const { page, calls, reply } = await open(t);
  const empty = hash(await values(page)); await page.locator('#registration-submit').click();
  assert.equal(hash(await values(page)), empty); assert.deepEqual(calls, []); await fill(page);
  for (const email of ['', 'not-an-email']) {
    await page.locator('[name=email]').fill(email);
    const before = hash(await values(page)); await page.locator('#registration-submit').click();
    assert.equal(hash(await values(page)), before); assert.deepEqual(calls, []);
  }
  await fill(page); await country(page, 'México'); await radio(page, 'plan', 'grabaciones');
  const data = await values(page), before = hash(data);
  assert.deepEqual(data, [['name', 'Zoë Núñez'], ['email', 'v6+contract@example.test'], ['country', 'México'], ['ocupacion', 'Análisis & SIG'], ['nivel_sig', 'Principiante'], ['plan', 'grabaciones']]);
  let release; reply.wait = new Promise(resolve => { release = resolve; });
  await page.locator('#registration-submit').click(); await page.locator('#registration-status.loading').waitFor();
  await page.locator('form').evaluate(form => { form.requestSubmit(); form.requestSubmit(); });
  release(); delete reply.wait; await page.locator('#registration-status.error').waitFor();
  assert.equal(await page.locator('#registration-status').innerText(), 'Rejected V6.');
  assert.deepEqual(calls, [data]); assert.equal(hash(await values(page)), before);
  for (const [status, body, error] of [[200, '{}', 'No pudimos registrar tu inscripción.'], [503, '{"result":"success"}', 'No pudimos registrar tu inscripción.'], [200, '{"result":"error","error":"<b>Duplicate</b>"}', '<b>Duplicate</b>'], [200, '{"result":true}', 'No pudimos registrar tu inscripción.'], [200, 'null', null], [200, 'not JSON', null]]) {
    Object.assign(reply, { status, body }); const count = calls.length;
    await page.locator('#registration-submit').click(); await page.locator('#registration-status.error').waitFor();
    const text = await page.locator('#registration-status').innerText();
    if (error) assert.equal(text, error); else assert.ok(text.length > 0);
    assert.equal(await page.locator('#registration-status b').count(), 0);
    assert.equal(hash(await values(page)), before); assert.equal(calls.length, count + 1);
    assert.equal(await page.locator('#registration-submit').isEnabled(), true);
    assert.equal(await page.locator('#registration-submit').getAttribute('aria-disabled'), null);
    assert.equal(await page.locator('#registration-status').getAttribute('aria-live'), 'polite');
    assert.equal(await page.locator('#registration-success').isHidden(), true);
  }
  reply.fail = true; const failed = calls.length;
  await page.locator('#registration-submit').click(); await page.locator('#registration-status.error').waitFor();
  assert.equal(await page.locator('#registration-status').innerText(), 'Failed to fetch');
  assert.equal(hash(await values(page)), before); assert.equal(calls.length, failed + 1); delete reply.fail;
  Object.assign(reply, { status: 200, body: '{"result":"success"}' });
  await page.locator('#registration-submit').click(); await page.locator('#registration-success').waitFor();
  assert.equal(await page.locator('#registration-success').evaluate(el => el === document.activeElement), true);
  const count = calls.length; await page.locator('form').evaluate(form => form.requestSubmit()); assert.equal(calls.length, count);
  assert.deepEqual(await page.evaluate(() => [localStorage.length, sessionStorage.length]), [0, 0]);
});

test('S1/S5: all supported plan routes submit the exact six fields', async t => {
  const { page, calls } = await open(t);
  for (const [place, plan] of [['Chile', 'general'], ['Chile', 'estudiante'], ['Chile', 'grabaciones'], ['México', 'general'], ['México', 'grabaciones'], ['Otro', 'grabaciones']]) {
    await page.reload(); await fill(page); await country(page, place); await radio(page, 'plan', plan);
    const data = await values(page), count = calls.length;
    await page.locator('#registration-submit').click(); await page.locator('#registration-status.error').waitFor();
    assert.deepEqual(calls[count], data); assert.equal(calls.length, count + 1);
    assert.equal(hash(await values(page)), hash(data));
    assert.equal(Object.fromEntries(data).country, place); assert.equal(Object.fromEntries(data).plan, plan);
  }
});

test('S5: keyboard/mobile bounds, no-JS readiness and timeout remain recoverable', async t => {
  const { page } = await open(t);
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.deepEqual(await page.locator('#registration-form button,#registration-form label:has(input[type=radio])').evaluateAll(items => items.filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44); }).map(el => el.textContent)), []);
    await page.locator('#country-trigger').focus(); await page.keyboard.press('ArrowDown'); await page.keyboard.press('ArrowUp');
    assert.equal(await page.locator('[data-country=Otro]').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Escape'); assert.equal(await page.locator('#country-trigger').evaluate(el => el === document.activeElement), true);
  }
  for (const options of [{ js: false }, { block: true }]) {
    const item = await open(t, 'v6', options); await fill(item.page);
    assert.equal(await item.page.locator('#registration-submit').isDisabled(), true);
    if (options.js === false) assert.match(await item.page.locator('noscript').innerText(), /Activa JavaScript.*no se enviarán tus datos/s);
    await item.page.locator('[name=email]').press('Enter'); assert.deepEqual(item.calls, []);
    assert.equal(item.page.url(), base + 'tests/fixtures/registration-v6.html');
  }
  const timed = await open(t, 'v6', { timeout: true }); await fill(timed.page);
  timed.reply.wait = new Promise(() => {}); const before = hash(await values(timed.page));
  await timed.page.locator('#registration-submit').click(); await timed.page.locator('#registration-status.error').waitFor();
  assert.equal(await timed.page.locator('#registration-status').innerText(), 'La respuesta tardó demasiado. Revisa tu conexión e inténtalo nuevamente.');
  assert.equal(hash(await values(timed.page)), before); assert.equal(timed.calls.length, 1);
  assert.equal(await timed.page.locator('#registration-submit').isEnabled(), true);
});
