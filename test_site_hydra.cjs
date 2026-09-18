const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

const expected = {
  '.hero-copy': '0f6d5ed32fcce19cd04766a7e836bd6fbfbeb957c325d0c3132173dc1bb46eb0',
  '.strip': '600c3155657b43f39b66cf3d83b50e875962fde5e5f3f44e097029dd1d0e6182',
  '#programa': '531b0a8af8b76cf90794c53e4d5050d8d65f923051c4b85b3679f7920a869e43',
  '#instructor': '550e4f797ab41f4b62b7dfb63339e7fb87d86e039e71da57c28573c01a8a791e',
  '#registro': 'e5df712f4ef737cd8e6ab46ed2824b6acd1a178619f165b67900f457ac99cc73',
  'section[aria-labelledby="faq"]': '3a46762a1c65cacf43d4b78f79533448460e0f11e6c4686535389970c9145002',
  'footer': 'd820788ab076a77e7208841f4efcf17026879515ad31840bb605ec4a86c2f784'
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
        return clone.textContent.replace(/\s+/g, ' ').trim();
      });
      assert.equal(createHash('sha256').update(text).digest('hex'), hash, `Original content changed: ${selector}`);
    }
    assert.equal(await page.locator('#instructor p').count(), 8);
    assert.equal(await page.locator('#instructor .profile-extension p').count(), 3);
    console.log('7 original content blocks preserved byte-for-byte after whitespace normalization; profile expanded by 3 paragraphs');
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
      assert.equal(await page.locator('form,iframe,embed,object').count(), 0);
      console.log(`${width}px: layout, cards, mobile menu, 7 details, photo and closed registration OK`);
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
    await fallback.goto(`file:///${path.join(__dirname, 'index.html').replaceAll('\\', '/')}`);
    assert.ok(await fallback.locator('.terrain>svg').isVisible());
    assert.ok(await fallback.locator('#instructor').isVisible());
    await fallback.locator('.faq summary').first().focus();
    await fallback.keyboard.press('Enter');
    assert.equal(await fallback.locator('.faq details').first().getAttribute('open'), '');
    await fallback.close();
    assert.deepEqual(errors, []);
    assert.deepEqual(failedAssets, []);
    console.log('Motion, reduced-motion, no-JS fallback, redirect and local deployment asset paths OK');
  } finally { await browser.close(); }
})().catch(error => { console.error(error.message); process.exit(1); });
