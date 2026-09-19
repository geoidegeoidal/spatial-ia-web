const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const base = 'https://geoidegeoidal.github.io/spatial-ia-web/';
const endpoint = 'https://script.google.com/macros/s/AKfycbzkX21TwO9LqpJao8mjVZ2Guc98J-yvTw-5B1cKP38gzwNxoNQIm0jImAKVoTIi8Iw3rQ/exec';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const requests = [];
    let response = { result: 'success', registro: { fila: 2, estado: 'Pendiente' } };
    await context.route(`${base}**`, route => {
      const name = new URL(route.request().url()).pathname.replace('/spatial-ia-web/', '') || 'index.html';
      const file = path.resolve(__dirname, name);
      if (!file.startsWith(__dirname + path.sep) || !fs.existsSync(file)) return route.abort();
      const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg' };
      return route.fulfill({ body: fs.readFileSync(file), contentType: types[path.extname(file)] || 'application/octet-stream' });
    });
    await context.route('https://code.iconify.design/**', route => route.fulfill({ body: '', contentType: 'text/javascript' }));
    await context.route(endpoint, async route => {
      requests.push(route.request().postData() || '');
      await route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(response) });
    });

    const page = await context.newPage();
    await page.goto(base);
    await page.locator('#registration-submit').click();
    assert.equal(requests.length, 0, 'Native required fields must block empty submission');

    await page.locator('[name=name]').fill('Prueba Local');
    await page.locator('[name=email]').fill('local@example.test');
    await page.locator('[name=ocupacion]').fill('Geógrafa');
    await page.locator('[name=nivel_sig][value=Intermedio]').focus();
    await page.keyboard.press('Space');
    await page.locator('[name=plan][value=estudiante]').focus();
    await page.keyboard.press('Space');
    await page.locator('#registration-submit').click();
    await page.waitForFunction(() => !document.querySelector('#registration-success').hidden);
    assert.notEqual(await page.locator('#registration-success').evaluate(element => getComputedStyle(element).display), 'none');
    assert.equal(requests.length, 1);
    for (const value of ['name="name"', 'Prueba Local', 'name="email"', 'local@example.test', 'name="country"', 'Chile', 'name="nivel_sig"', 'Intermedio', 'name="plan"', 'estudiante']) assert.match(requests[0], new RegExp(value));
    await page.locator('#registration-submit').click({ force: true }).catch(() => {});
    assert.equal(requests.length, 1, 'Successful form must not submit twice');

    await page.reload();
    await page.locator('#country-trigger').focus();
    await page.keyboard.press('ArrowDown');
    assert.equal(await page.locator('#country-options').isVisible(), true);
    await page.locator('[data-country="México"]').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#form-country').inputValue(), 'México');
    assert.equal(await page.locator('#country-trigger').evaluate(element => element === document.activeElement), true);
    assert.equal(await page.locator('[name=plan][value=estudiante]').isDisabled(), true);
    assert.equal(await page.locator('[name=plan][value=general]').isChecked(), true);
    assert.match(await page.locator('#general-plan-price').innerText(), /US\$36/);

    response = { result: 'error', error: 'Este correo ya está registrado en V5.' };
    await page.locator('[name=name]').fill('Duplicada');
    await page.locator('[name=email]').fill('duplicate@example.test');
    await page.locator('[name=ocupacion]').fill('Analista');
    await page.locator('#registration-submit').click();
    await page.locator('#registration-status.error').waitFor({ state: 'visible' });
    assert.match(await page.locator('#registration-status').innerText(), /ya está registrado/);
    assert.equal(await page.locator('#registration-form').isVisible(), true);
    assert.equal(await page.locator('#registration-submit').isEnabled(), true);
    assert.equal(requests.length, 2);

    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px horizontal overflow`);
      const overflowing = await page.locator('#registration-form *').evaluateAll(elements => elements
        .filter(element => {
          const style = getComputedStyle(element);
          return style.display !== 'none' && style.visibility !== 'hidden' && element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 1;
        })
        .map(element => `${element.tagName}:${(element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40)}`));
      assert.deepEqual(overflowing, [], `${width}px form content overflow: ${overflowing.join(', ')}`);
      if (width <= 1100) assert.ok((await page.locator('#pause-motion').boundingBox()).width <= 44, `${width}px motion control obscures content`);
    }
    console.log('V5 registration: native validation, mocked JSON success/error, one-submit guard, keyboard country selector, Chile-only student plan and responsive layout OK. No real registration sent.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
