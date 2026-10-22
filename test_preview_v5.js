const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const html = fs.readFileSync(`${__dirname}/index.html`, 'utf8');
const css = fs.readFileSync(`${__dirname}/assets/site.css`, 'utf8');
assert.ok(html.includes('<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">'));
assert.ok(html.includes('family=Manrope'));
assert.match(css, /font-family:Pixel/);
assert.ok(!/font(?:-style)?\s*:\s*italic/.test(css));
assert.ok(html.includes('$35.000') && html.includes('$30.000'));
const studentCard = html.match(/<article class="price-card"><h3>Pase estudiantes<\/h3>([\s\S]*?)<\/article>/)?.[1];
assert.ok(studentCard?.includes('$30.000') && studentCard.includes('Válido solo para Chile'));
assert.ok(!/US\$|USD/.test(studentCard));
assert.ok(html.includes('Internacional: US$36'));
assert.ok(html.includes('Pase estudiantes: $30.000 CLP, válido solo para Chile.'));
assert.ok(!/36,65|31,42|954,85/.test(html));
assert.doesNotMatch(html, /<form\b|assets\/registration\.js|script\.google\.com\/macros\/s\//i);
assert.ok(html.includes('Pronto inscripciones para la versión 6'));
assert.doesNotMatch(html, /Inscripciones abiertas|Registro V5 habilitado|Reserva tu cupo|Puedes inscribirte|Reserva tu lugar/i);
const fixture = fs.readFileSync(`${__dirname}/tests/fixtures/registration-v5.html`, 'utf8');
assert.ok(fixture.includes('action="https://crm.invalid/registration"'));
assert.doesNotMatch(fixture, /script\.google\.com/);
const v5WithoutInstructor = html.replace(/<section id="instructor"[\s\S]*?<\/section>/, '');
assert.ok(!/cup(?:o|ó)n|coupon|código promocional|descuento|conmapas/i.test(v5WithoutInstructor));
assert.equal((html.match(/data-goatcounter="/g) || []).length, 1);
assert.ok(html.includes('https://julloar.goatcounter.com/count'));
assert.deepEqual([...html.matchAll(/data-goatcounter-click="([^"]+)"/g)].map(match => match[1]), ['v5-interes-registro', 'v5-programa', 'v5-portafolio', 'v5-linkedin']);
for (const topic of ['OpenSpec', 'proposal.md', 'specs/', 'design.md', 'tasks.md', 'Chart.js', 'Shapefile', 'GitHub CLI']) assert.ok(html.includes(topic));
assert.ok(!/humedales|contrato\.md|Stitch|intersecciones/i.test(html));
assert.ok(!/<(?:iframe|embed|object)\b|href=["'][^"']*\.pdf\b/i.test(html));
assert.ok(!/grainy-gradients|filter:\s*(?:blur|drop-shadow)|mix-blend-mode/.test(css));
assert.equal((html.match(/script\.google\.com\/macros\/s\//g) || []).length, 0);
assert.ok(!/mpago\.la|paypal\.com/.test(html));
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length);
for (const id of ['inicio', 'programa', 'syllabus', 'instructor', 'registro', 'protocolo', 'faq']) assert.ok(ids.includes(id));
for (const [, href] of html.matchAll(/\bhref="(#[^"]+)"/g)) assert.ok(ids.includes(href.slice(1)), `Missing anchor ${href}`);
for (const [, file] of html.matchAll(/\b(?:src|href)="(assets\/[^"]+)"/g)) assert.ok(fs.existsSync(path.join(__dirname, file)), `Missing asset ${file}`);
assert.equal((html.match(/class="module"/g) || []).length, 3);
assert.equal((html.match(/class="output"/g) || []).length, 3);
assert.equal((html.match(/<details>/g) || []).length, 7);
assert.ok(html.includes('assets/instructor.jpg'));
for (const role of ['a contrata', 'a honorarios', 'Ministerio del Medio Ambiente', 'Ministerio de las Culturas', 'AutoAtlas Pro', 'Universidad Alberto Hurtado']) assert.ok(html.includes(role));
const redirect = fs.readFileSync(`${__dirname}/preview_v5.html`, 'utf8');
assert.ok(redirect.includes('index.html') && !redirect.includes('goatcounter'));
test('V6 dates and ISO attributes consistently identify November 13–15, Santiago 20:00–21:30', () => {
  for (const [day, label] of [[13, 'VIE'], [14, 'SÁB'], [15, 'DOM']]) {
    assert.ok(html.includes(`datetime="2026-11-${day}T20:00:00-03:00">${label} ${day} NOV / 20:00–21:30`));
    assert.equal(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit'
    }).format(new Date(`2026-11-${day}T23:00:00Z`)), '20:00');
  }
  assert.ok(html.includes('13, 14 y 15 de noviembre de 2026'));
  assert.ok(html.includes('3 × 90 min · 4,5 horas'));
});

test('V6 offers recordings alongside unchanged live prices without promising live access', () => {
  const recordingCard = html.match(/<article class="price-card price-card--recordings">([\s\S]*?)<\/article>/)?.[1];
  assert.ok(recordingCard, 'Missing the recordings-only option');
  for (const value of ['Solo grabaciones', '$20.000', 'CLP', 'Internacional: US$22', 'No incluye sesiones en vivo']) assert.ok(recordingCard.includes(value), value);
  assert.equal((html.match(/<article class="price-card(?: [^"]+)?">/g) || []).length, 3);
  assert.ok(css.includes('.registration .price-card--recordings'));
  assert.doesNotMatch(recordingCard, /certificado|permanente|inmediato/i);
});

test('all current edition labels are V6 while registration and reporting contracts remain safe', () => {
  assert.match(html, /<title>[^<]*V6[^<]*noviembre 2026/);
  assert.ok(html.includes('>Inscripciones V6 <span'));
  assert.ok(html.includes('>Ver edición V6 <span'));
  assert.ok(html.includes('/ V.06') && html.includes('Edición 06 /'));
  assert.ok([...html.matchAll(/data-goatcounter-title="([^"]+)"/g)].every(match => match[1].startsWith('V6:')));
  const withoutEventKeys = html.replace(/data-goatcounter-click="[^"]+"/g, '');
  assert.doesNotMatch(withoutEventKeys, /\bV5\b|versión 5|OCT 2026|octubre de 2026|fechas y tarifas.*se anunciarán/i);
  assert.match(html.match(/id="registration-closed-title">([^<]*)/)?.[1] || '', /Pronto inscripciones para la versión 6/);
  assert.ok(html.includes('El formulario aún no está habilitado'));
});
