const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      const native = window.requestAnimationFrame;
      window.motionFrames = 0;
      window.requestAnimationFrame = callback => native.call(window, time => { window.motionFrames++; callback(time); });
    });
    for (const name of ['01-hydra', '02-illoca']) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      const url = pathToFileURL(path.join(__dirname, 'proposals', `${name}.html`)).href;
      await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(2000);
      const pixels = () => page.locator('canvas').evaluate(el => el.toDataURL());
      const initial = await pixels();
      await page.mouse.move(1200, 700, { steps: 15 });
      await page.waitForTimeout(500);
      assert.ok(await pixels() !== initial, `${name}: scene does not react`);
      await page.screenshot({ path: path.join(__dirname, 'proposals', `${name}-desktop.png`) });
      for (const [stage, value] of [['start', 0], ['middle', .53], ['end', 1]]) {
        await page.evaluate(value => {
          const track = document.querySelector('.hero-track,.scene-track');
          const pinned = track.firstElementChild;
          const top = track.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(pinned).top);
          scrollTo({ top: top + (track.offsetHeight - pinned.offsetHeight) * value, behavior: 'instant' });
        }, value);
        await page.waitForTimeout(1000);
        assert.equal(await page.locator('canvas').getAttribute('data-phase'), stage === 'start' ? '0' : stage === 'middle' ? '1' : '2');
        await page.screenshot({ path: path.join(__dirname, 'proposals', `${name}-motion-${stage}.png`) });
      }
      assert.ok(await pixels() !== initial, `${name}: scroll did not change scene`);
      if (name === '02-illoca') {
        await page.locator('.scene-stops button').first().click();
        await page.waitForTimeout(1600);
        assert.equal(await page.locator('canvas').getAttribute('data-phase'), '0');
      }
      await page.locator('.motion-toggle').click();
      await page.waitForTimeout(500);
      const paused = await pixels();
      await page.mouse.move(160, 230);
      await page.waitForTimeout(400);
      assert.ok(await pixels() === paused, `${name}: pause still animates`);
      assert.equal(await page.locator('.motion-toggle').getAttribute('aria-pressed'), 'true');
      await page.locator('.motion-toggle').click();
      for (const width of [1440, 1024, 768, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        await page.waitForTimeout(600);
        const geometry = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, h1: document.querySelector('h1').getBoundingClientRect().width }));
        assert.ok(geometry.width <= width, `${name} ${width}: overflow ${geometry.width}`);
        if (width === 390) await page.screenshot({ path: path.join(__dirname, 'proposals', `${name}-mobile.png`) });
        assert.ok(await page.locator('nav .button').isVisible());
        await page.locator('details summary').first().focus();
        await page.keyboard.press('Enter');
        assert.equal(await page.locator('details').first().getAttribute('open'), '');
        await page.keyboard.press('Enter');
        console.log(`${name}: ${width}px layout and keyboard OK`);
      }
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(500);
      assert.ok(await page.locator('.motion-toggle').isDisabled());
      const reduced = await pixels();
      await page.waitForTimeout(400);
      assert.ok(await pixels() === reduced, `${name}: reduced-motion still animates`);
      assert.equal(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length), 0);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.setViewportSize({ width: 320, height: 568 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(500);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      if (name === '02-illoca') {
        await page.locator('.scene-stops button').last().click();
        await page.waitForTimeout(1200);
        assert.equal(await page.locator('canvas').getAttribute('data-phase'), '2');
        const stop = await page.locator('.scene-stops').boundingBox();
        assert.ok(stop.y >= 0 && stop.y + stop.height <= 568);
      }
      await page.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
      await page.waitForTimeout(400);
      const frames = await page.evaluate(() => window.motionFrames);
      await page.waitForTimeout(350);
      assert.equal(await page.evaluate(() => window.motionFrames), frames, `${name}: offscreen loop is still running`);
      console.log(`${name}: pointer, scroll stages, pause and reduced-motion OK`);
      const fallback = await browser.newPage({ javaScriptEnabled: false });
      await fallback.goto(url);
      assert.ok(await fallback.locator('h1').isVisible());
      assert.ok(await fallback.locator(name === '01-hydra' ? '.terrain>svg' : '.scene>svg').isVisible());
      await fallback.close();
    }
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
