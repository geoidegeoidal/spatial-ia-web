const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync(`${__dirname}/index.html`, 'utf8');
assert.ok(html.includes('family=Chakra+Petch'));
assert.ok(!html.includes('Playfair'));
assert.ok(!/font(?:-style)?\s*:\s*italic/.test(html));
assert.ok(html.includes('$35.000') && html.includes('$30.000'));
assert.equal((35000 / 954.85).toFixed(2), '36.65');
assert.equal((30000 / 954.85).toFixed(2), '31.42');
assert.ok(html.includes('US$36,65') && html.includes('US$31,42'));
for (const day of [16, 17, 18]) {
  assert.ok(html.includes(`2026-10-${day}T20:00:00-03:00`));
  assert.equal(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit'
  }).format(new Date(`2026-10-${day}T23:00:00Z`)), '20:00');
}
assert.ok(!html.includes('<form'));
assert.ok(html.includes('Inscripciones aún no habilitadas'));
assert.equal((html.match(/data-goatcounter="/g) || []).length, 1);
assert.ok(html.includes('https://julloar.goatcounter.com/count'));
for (const topic of ['OpenSpec', 'proposal.md', 'specs/', 'design.md', 'tasks.md', 'Chart.js', 'Shapefile', 'GitHub CLI']) assert.ok(html.includes(topic));
assert.ok(!/humedales|contrato\.md|Stitch|intersecciones/i.test(html));
assert.ok(!/<(?:iframe|embed|object)\b|href=["'][^"']*\.pdf\b/i.test(html));
assert.ok(!/grainy-gradients|filter:\s*(?:blur|drop-shadow)|mix-blend-mode/.test(html));
assert.ok(!html.includes('script.google.com'));

function checkMotion({ reduced = false, supported = true } = {}) {
  const classes = new Set();
  const listeners = {};
  const target = {
    classList: { add: (...items) => items.forEach(item => classes.add(item)), remove: (...items) => items.forEach(item => classes.delete(item)) },
    getBoundingClientRect: () => ({ top: 1500 }),
    style: { setProperty() {} }
  };
  const preference = { matches: reduced, addEventListener: (_, fn) => { listeners.preference = fn; } };
  const pause = { checked: false, addEventListener: (_, fn) => { listeners.pause = fn; } };
  let callback;
  let observed = false;
  class Observer {
    constructor(fn) { callback = fn; }
    observe() { observed = true; }
    unobserve() { observed = false; }
    disconnect() { observed = false; }
  }
  vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], {
    matchMedia: () => preference,
    window: supported ? { IntersectionObserver: Observer } : {},
    IntersectionObserver: Observer,
    innerHeight: 900,
    document: {
      getElementById: () => pause,
      querySelectorAll: () => [target],
      addEventListener: (_, fn) => { listeners.focus = fn; }
    }
  });
  if (reduced || !supported) {
    assert.ok(!classes.has('reveal-pending'));
    assert.ok(!observed);
    return;
  }
  assert.ok(classes.has('reveal-pending') && observed);
  callback([{ isIntersecting: false, target }]);
  assert.ok(classes.has('reveal-pending'));
  callback([{ isIntersecting: true, target }]);
  assert.ok(!classes.has('reveal-pending') && !observed);
  listeners.pause();
  listeners.focus({ target: { closest: () => target } });
  assert.ok(!classes.has('reveal-pending'));
  listeners.pause();
  pause.checked = true;
  listeners.pause();
  assert.ok(!classes.has('reveal-pending') && !observed);
  pause.checked = false;
  listeners.pause();
  preference.matches = true;
  listeners.preference();
  assert.ok(!classes.has('reveal-pending') && !observed);
}

checkMotion();
checkMotion({ reduced: true });
checkMotion({ supported: false });
console.log('V5: typography, dates, prices, closed form and accessible motion OK');
