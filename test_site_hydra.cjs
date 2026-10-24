const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

const expected = {
  '.hero-copy': 'fa1c8992b1dc27e81b501c7a44d0ac853cf2152adfd52a4998808d3447fdd1ed',
  '.strip': '600c3155657b43f39b66cf3d83b50e875962fde5e5f3f44e097029dd1d0e6182',
  '#programa': '531b0a8af8b76cf90794c53e4d5050d8d65f923051c4b85b3679f7920a869e43',
  '#instructor': '550e4f797ab41f4b62b7dfb63339e7fb87d86e039e71da57c28573c01a8a791e',
  '#registro': '63e42cf24394e8e7867ccce2cb4e06b8c32bc049772ce8a27c6733519968da7c',
  'section[aria-labelledby="faq"]': 'bdd74a36d371b76c5166ca669f5980e7e0c956d9e6b18a4f7241630f0eb05374',
  'footer': '9e1634c17337667adb66ceb2e308f76c0470a389e1561bd245120876c3152900'
};
const base = 'https://geoidegeoidal.github.io/spatial-ia-web/';
const captureDir = process.env.SPATIAL_CAPTURE_DIR;
if (captureDir) assert.ok(fs.statSync(captureDir).isDirectory());
const capture = async (target, name) => { if (captureDir) await target.screenshot({ path: path.join(captureDir, name), ...(/program|instructor|prices/.test(name) ? { style: '.nav,.motion-toggle{visibility:hidden!important}' } : {}) }); };

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const counts = [], errors = [], failedAssets = [];
    await context.route(`${base}**`, route => {
      const name = new URL(route.request().url()).pathname.replace('/spatial-ia-web/', '') || 'index.html';
      const file = path.resolve(__dirname, name);
      if (!file.startsWith(__dirname + path.sep) || !fs.existsSync(file)) { failedAssets.push(name); return route.abort(); }
      const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg' };
      return route.fulfill({ body: fs.readFileSync(file), contentType: types[path.extname(file)] || 'application/octet-stream' });
    });
    await context.route('https://julloar.goatcounter.com/count*', route => {
      counts.push(new URL(route.request().url()));
      return route.fulfill({ status: 200, contentType: 'image/gif', body: '' });
    });
    await context.route('https://gc.zgo.at/count.js', async route => route.fulfill({ response: await route.fetch() }));
    await context.route(/https:\/\/(?:script\.google(?:usercontent)?\.com|crm\.invalid)\//, route => {
      failedAssets.push('Unexpected CRM request');
      return route.abort();
    });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => typeof window.goatcounter?.count === 'function');
    await page.waitForTimeout(1800);
    assert.equal(await page.locator('canvas').count(), 1);
    for (const [selector, hash] of Object.entries(expected)) {
      const text = await page.locator(selector).evaluate(element => {
        const clone = element.cloneNode(true);
        clone.querySelectorAll('.profile-extension,.profile-facts,figcaption').forEach(el => el.remove());
        const baselineDates = ['VIE 16 OCT / 20:00–21:30', 'SÁB 17 OCT / 20:00–21:30', 'DOM 18 OCT / 20:00–21:30'];
        clone.querySelectorAll('.session-date').forEach((date, index) => { date.textContent = baselineDates[index]; });
        return clone.textContent.replace(/\s+/g, ' ').trim();
      });
      assert.equal(createHash('sha256').update(text).digest('hex'), hash, `Original content changed: ${selector}`);
    }
    assert.equal(await page.locator('#instructor p').count(), 8);
    assert.equal(await page.locator('#instructor .profile-extension p').count(), 3);
    assert.match(await page.locator('.price-card').nth(1).innerText(), /Válido solo para Chile/);
    assert.doesNotMatch(await page.locator('.price-card').nth(1).innerText(), /US\$|USD/);
    assert.match(await page.locator('.price-card').first().innerText(), /Internacional: US\$36/);
    assert.equal(await page.locator('.price-card').count(), 3);
    assert.match(await page.locator('.price-card--recordings').innerText(), /\$20\.000[\s\S]*CLP[\s\S]*US\$22[\s\S]*No incluye sesiones en vivo/);
    assert.deepEqual(await page.locator('.session-date').evaluateAll(dates => dates.map(date => date.getAttribute('datetime'))), [
      '2026-11-13T20:00:00-03:00', '2026-11-14T20:00:00-03:00', '2026-11-15T20:00:00-03:00'
    ]);
    const v5TextWithoutInstructor = await page.locator('body').evaluate(body => {
      const clone = body.cloneNode(true);
      clone.querySelector('#instructor')?.remove();
      return clone.innerText;
    });
    assert.doesNotMatch(v5TextWithoutInstructor, /cup(?:o|ó)n|coupon|código promocional|descuento|conmapas/i);
    console.log('7 content blocks verified; authorized V5 price/country revision and 3 added profile paragraphs included');
    const canvasPixels = () => page.locator('canvas').evaluate(el => el.toDataURL());
    const start = await canvasPixels();
    await page.mouse.move(1250, 700, { steps: 20 });
    await page.waitForTimeout(350);
    assert.ok(await canvasPixels() !== start, 'Hero animation is static');
    await capture(page, 'official-hydra-desktop.png');
    await page.evaluate(() => {
      const track = document.querySelector('.hero-track');
      scrollTo({ top: track.offsetTop + track.offsetHeight - track.firstElementChild.offsetHeight - 78, behavior: 'instant' });
    });
    await page.waitForTimeout(1000);
    assert.equal(await page.locator('canvas').getAttribute('data-phase'), '2');
    await capture(page, 'official-hydra-sphere.png');
    await page.locator('#pause-motion').click();
    await page.waitForTimeout(300);
    const paused = await canvasPixels();
    await page.waitForTimeout(300);
    assert.ok(await canvasPixels() === paused, 'Pause does not stop scene');
    await page.locator('#pause-motion').click();
    for (const event of ['v5-interes-registro', 'v5-programa', 'v5-portafolio', 'v5-linkedin']) {
      const link = page.locator(`[data-goatcounter-click="${event}"]`);
      if (event === 'v5-portafolio' || event === 'v5-linkedin') await link.evaluate(el => el.addEventListener('click', e => e.preventDefault(), { once: true }));
      await link.click();
      await page.waitForTimeout(700);
      assert.ok(counts.some(url => url.searchParams.get('p') === event), `Missing intercepted event ${event}`);
    }
    assert.ok(counts.some(url => url.searchParams.get('p') === '/spatial-ia-web/'), 'Missing intercepted pageview');
    console.log('Real GoatCounter script: visit + all four events verified; every count intercepted');
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(700);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px horizontal overflow`);
      assert.ok(await page.locator('.hero-copy').evaluate(el => { const r = el.getBoundingClientRect(); return r.x >= 0 && r.right <= innerWidth; }), `${width}px hero copy clipped`);
      assert.ok(await page.evaluate(() => document.fonts.check('40px Pixel')), 'Pixel font not loaded');
      if (width === 390) await capture(page, 'official-hydra-mobile.png');
      if (width <= 700) {
        await page.locator('.mobile-menu summary').click();
        await page.locator('.mobile-menu a[href="#preguntas"]').click();
        assert.equal(await page.locator('.mobile-menu').getAttribute('open'), null);
        assert.ok(page.url().endsWith('#preguntas'));
      }
      await page.locator('#programa').scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      const cards = await page.locator('.module').evaluateAll(elements => elements.map(el => ({ top: el.getBoundingClientRect().top, bottom: el.getBoundingClientRect().bottom, output: el.querySelector('.output').getBoundingClientRect().top })));
      if (width > 800) for (const key of ['top', 'bottom', 'output']) assert.ok(Math.max(...cards.map(c => c[key])) - Math.min(...cards.map(c => c[key])) < 1, `${width}px cards ${key} mismatch`);
      if (width === 1440 || width === 390) await capture(page.locator('#programa'), `official-hydra-program-${width}.png`);
      for (const detail of await page.locator('.course-details>details,.faq>details').all()) {
        await detail.locator('summary').focus();
        await page.keyboard.press('Enter');
        assert.equal(await detail.getAttribute('open'), '');
        assert.equal(await detail.evaluate(el => getComputedStyle(el).opacity), '1');
        await page.keyboard.press('Enter');
      }
      await page.locator('.instructor-portrait').scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      const photo = await page.locator('.instructor-portrait').evaluate(el => ({ loaded: el.complete && el.naturalWidth === 1024, width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height }));
      assert.ok(photo.loaded && Math.abs(photo.width - photo.height) < 1, 'Portrait missing or distorted');
      if (width === 1440 || width === 390) {
        await capture(page.locator('#instructor'), `official-hydra-instructor-${width}.png`);
        await page.locator('#registro').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await capture(page.locator('#registro'), `official-hydra-prices-${width}.png`);
      }
      if (width === 320) {
        await page.locator('#registro').scrollIntoViewIfNeeded();
        await capture(page.locator('#registro'), 'official-hydra-prices-320.png');
      }
      assert.equal(await page.locator('#registration-form').count(), 1);
      assert.equal(await page.locator('#registration-submit').isEnabled(), true);
      const priceBounds = await page.locator('.price-card').evaluateAll(cards => cards.map(card => {
        const rect = card.getBoundingClientRect();
        return { x: rect.x, right: rect.right, y: rect.y, bottom: rect.bottom, width: rect.width, overflow: [...card.querySelectorAll('h3,strong,p')].some(element => {
          const child = element.getBoundingClientRect();
          return child.left < rect.left - 1 || child.right > rect.right + 1;
        }) };
      }));
      const priceGrid = await page.locator('.pricing').boundingBox();
      assert.equal(priceBounds.length, 3);
      assert.ok(priceBounds.every(card => !card.overflow), `${width}px price content overflow`);
      assert.ok(priceBounds[2].y >= Math.max(priceBounds[0].bottom, priceBounds[1].bottom) - 1, `${width}px recordings must follow the live plans`);
      assert.ok(Math.abs(priceBounds[2].x - priceGrid.x) < 1 && Math.abs(priceBounds[2].width - priceGrid.width) < 1, `${width}px recordings card must span the pricing grid`);
      assert.match(await page.locator('#registro').innerText(), /Inscripciones V6 abiertas/i);
      assert.equal(await page.locator('iframe,embed,object').count(), 0);
      console.log(`${width}px: V6 information, three price cards, mobile menu, 7 details, photo and registration OK`);
    }
    await page.setViewportSize({ width: 320, height: 568 });
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(600);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(350);
    assert.ok(await page.locator('#pause-motion').isDisabled());
    const reduced = await canvasPixels();
    await page.waitForTimeout(300);
    assert.ok(await canvasPixels() === reduced);
    assert.equal(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length), 0);
    await page.goto(`${base}preview_v5.html`);
    await page.waitForURL(`${base}index.html`);
    assert.equal(await page.locator('script[data-goatcounter]').count(), 1);
    await page.close();
    const fallback = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    await fallback.route(/https:\/\/(?:script\.google(?:usercontent)?\.com|crm\.invalid|gc\.zgo\.at|julloar\.goatcounter\.com)\//, route => {
      failedAssets.push('Unexpected no-JS CRM/analytics request');
      return route.abort();
    });
    await fallback.goto(`file:///${path.join(__dirname, 'index.html').replaceAll('\\', '/')}`);
    assert.ok(await fallback.locator('.terrain>svg').isVisible());
    assert.ok(await fallback.locator('#instructor').isVisible());
    assert.equal(await fallback.locator('#registration-form').count(), 1);
    assert.equal(await fallback.locator('#registration-submit').isDisabled(), true);
    assert.match(await fallback.locator('noscript').innerText(), /Activa JavaScript[\s\S]*no se enviarán tus datos/);
    assert.equal(await fallback.locator('.price-card').count(), 3);
    assert.match(await fallback.locator('.price-card--recordings').innerText(), /\$20\.000[\s\S]*US\$22/);
    assert.ok(await fallback.locator('#protocolo').isVisible());
    assert.match(await fallback.locator('#registro').innerText(), /Inscripciones V6 abiertas/i);
    await fallback.locator('.faq summary').first().focus();
    await fallback.keyboard.press('Enter');
    assert.equal(await fallback.locator('.faq details').first().getAttribute('open'), '');
    await fallback.close();
    assert.deepEqual(errors, []);
    assert.deepEqual(failedAssets, []);
    console.log('Motion, reduced-motion, no-JS fallback, redirect and local deployment asset paths OK');
  } finally { await browser.close(); }
})().catch(error => { console.error(error.message); process.exit(1); });
