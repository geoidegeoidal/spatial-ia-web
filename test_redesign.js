const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

for (const name of ['01-hydra', '02-illoca']) {
  const file = path.join(__dirname, 'proposals', `${name}.html`);
  const html = fs.readFileSync(file, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${name}: duplicate IDs`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/<article class="module"/g) || []).length, 3);
  assert.equal((html.match(/<details>/g) || []).length, 3);
  assert.match(html, /lang="es-CL"/);
  for (const text of ['$35.000', '$30.000', '20:00–21:30', '4,5 horas', '2026', 'UTC−3', 'INSCRIPCIONES PRÓXIMAMENTE', 'OpenSpec', 'MapLibre', 'Turf', 'Chart.js', 'GitHub']) {
    assert.ok(html.includes(text), `${name}: missing ${text}`);
  }
  assert.doesNotMatch(html, /<form\b|<iframe\b|goatcounter|mpago\.la|paypal\.com|\.pdf["']/i);
  assert.deepEqual([...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(match => match[1]), ['../assets/motion.js']);
  assert.ok(fs.existsSync(path.join(__dirname, 'assets', 'motion.js')));
  assert.ok(fs.existsSync(path.join(__dirname, 'assets', 'motion.css')));
  assert.match(html, /prefers-reduced-motion/);
  assert.match(html, /:focus-visible/);
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (href.startsWith('#') && href.length > 1) assert.ok(ids.includes(href.slice(1)), `${name}: missing anchor ${href}`);
    else if (!href.startsWith('#') && !href.startsWith('https://')) assert.ok(fs.existsSync(path.resolve(path.dirname(file), href)), `${name}: missing file ${href}`);
  }
  console.log(`${name}: content, closed registration, links and accessibility hooks OK`);
}
