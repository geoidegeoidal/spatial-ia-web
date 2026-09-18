# AGENTS.md

## Project Overview
`spatial-ia-web` is a modern, high-aesthetic landing page for the Spatial / GIS & AI Bootcamp ("Desarrollo de Apps Territoriales con IA").

## Core Architecture
- High-End **Superdesign** aesthetic with Obsidian Black background (`#050505`), Ember Orange glowing accents (`#FF4500`), editorial `Playfair Display` + `Inter` typography, analog noise overlay, and fluid keyframe animations.
- Zero server backend architecture with pure client-side interactivity and Google Apps Script CRM integration.

## OpenSpec Specification Framework (Mandatory)
All architectural features, business rules, and changes in this repository are managed through the **OpenSpec** framework in `openspec/`:
- **Living Specifications (`openspec/specs/`):** Source of Truth for system capabilities (`landing-page`, `crm-automation`, `diploma-engine`, `deployment-ops`).
- **Traceability Matrix (`openspec/specs/traceability-matrix.md`):** Bidirectional map between Rule IDs (`RULE-*`), source code files/functions, and verification methods.
- **Change Lifecycle (`openspec/changes/` & `openspec/archive/`):** Any non-trivial modification must follow the **Propose → Apply → Verify → Archive** lifecycle using Delta Specs.

## Key Design & Safety Rules
- **Design Tokens (`RULE-UI-001`)**: Background `#050505`, cards `#111111`, primary accent `#FF4500`, typography `Playfair Display` + `Inter` + `Space Mono`.
- **Form Status (`RULE-UI-004`)**: V4 registrations are closed. V5 landing announces the next opening at `#registro` / `#protocolo`. There is no form or registration endpoint in the public page until its separate CRM is ready.
- **V5 preparation:** User approved publishing Territorios Imposibles as `index.html`; `preview_v5.html` redirects to it. Preserve original Superdesign surreal imagery, floating animations, atmosphere and luminous upright typography. Pending CRM/launch requirements live in `openspec/changes/prepare-v5-and-close-v4/`. Confirm separate spreadsheet/webhook before reopening. V4 `Accesos Enviados` does not itself prove course completion for certification.
- **V5 typography and offer:** User wants upright typography, no decorative italics. Preview proposes Chakra Petch / Inter / Space Mono. V5 dates: October 16–18, 20:00–21:30; preview assumes 2026 and America/Santiago (UTC−3), totaling 4.5 live hours. Confirmed prices: CLP 35,000 general / 30,000 students. USD 36.65 / 31.42 are indicative conversions only (954.85 CLP/USD, 2026-09-17); payment links and international charge amounts remain pending. V4 pricing/certification rules below remain V4-specific.
- **V5 copy and layout:** Use neutral Spanish suitable for Chile, without Argentine voseo (`imagina`, `crea`, `conoce`, `selecciona`). Keep syllabus cards aligned, not vertically staggered. Instructor bio was checked against the live LinkedIn profile through the user's signed-in Edge window using Windows UI Automation (direct HTTP returns 999). Profile supports UAH geography degree, 8+ years, ConMapas, participation in the Servel georeferenced roll team and AutoAtlas Pro. User clarified both current roles coexist: employment a contrata at Ministerio del Medio Ambiente, and participation a honorarios in a project at Ministerio de las Culturas, las Artes y el Patrimonio. Do not describe team participation as sole leadership.
- **Instructor portfolio:** https://geoidegeoidal.github.io/ — linked alongside LinkedIn in V5.
- **Analytics:** User selected hosted GoatCounter (no own server). `index.html` loads `https://gc.zgo.at/count.js` asynchronously with endpoint `https://julloar.goatcounter.com/count`; preview redirect has no tracker to avoid double counting. V5 native click events: `v5-interes-registro`, `v5-programa`, `v5-portafolio`, `v5-linkedin`; interest is not a completed registration. Browser integration verified with intercepted requests. Consult latest HANDOFF for deployment/real-receipt evidence. Dashboard: https://julloar.goatcounter.com/.
- **V5 syllabus:** Based on the user-supplied 53-slide Workshop Geo IA: S01 agents/SDD/contrato.md/KISS/HTML/Tailwind/Vanilla JS; S02 urban wetlands, GeoJSON/EDA/MapLibre sources and layers, filters/popups/UI audits; S03 Turf buffers/dissolve/intersections, exports, dynamic symbology, Chart.js cross-filtering, responsive UI, GitHub CLI/Pages, Stitch and hosting. Keep 20:00 start (slides say 20:05) and 4.5 live hours; avoid guarantees of full advanced implementation in that time.
- **Slides usage:** User explicitly wants only the updated syllabus derived from the presentation. Do not publish, embed, or link the supplied PDF or slide images on the landing page.
- **Payment & Pricing Matrix (`RULE-CRM-002`)**:
  - **Chile General:** $30.000 CLP via MercadoPago (`link-id=f7b0764f-2801-4b26-a858-59c416eebe42`) or Bank Transfer.
  - **Chile Estudiante:** $25.000 CLP via MercadoPago (`https://mpago.la/1EvJQi3`) or Bank Transfer.
  - **Internacional General:** 35 USD via PayPal (`https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU`).
  - **Internacional Estudiante:** 29 USD via PayPal (`https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU`).
- **One-Day Recovery Offer (`RULE-CRM-006`)**: Manual send only for `Recordatorio Final Enviado`; Chile $20.000 CLP via MercadoPago (`https://mpago.la/1E75xtF`), international 22 USD via PayPal (`https://www.paypal.com/ncp/payment/RGT8AG7R7U4DA`), expiring at 23:59 Chile on the send date and transitioning to `Oferta Exclusiva Enviada`.
- **Discount Coupon 'CONMAPAS' (`RULE-CRM-007`)**: Optional input `cupon` in `#protocolo` provides real-time feedback ($20.000 CLP Chile / 22 USD International). `doPost` assigns MercadoPago `https://mpago.la/1E75xtF` or PayPal `https://www.paypal.com/ncp/payment/RGT8AG7R7U4DA`, appending coupon info to `Plan` in Sheets to preserve column 8 (`Estado Pago`). Cron reminders keep discounted pricing.
- **CRM Email Safety**: Never test or authorize a bulk-send function against the production spreadsheet. Use local mocks or an isolated test spreadsheet, and review recipients before any production execution.
- **Country Selector (`RULE-UI-005`)**: Uses Iconify `circle-flags:*` SVG icons in a custom dropdown with keyboard/mouse event listener to avoid missing flag emojis on Windows OS.
- **Deployment Branch Target (`RULE-OPS-001`)**: Production site on GitHub Pages is served from the `gh-pages` branch. Any updates pushed to `master` must also be merged and pushed to `gh-pages` (`git checkout gh-pages; git merge master; git push origin gh-pages; git checkout master`) to reflect on the live site.
- **CRM Automation & Diploma Generation (`RULE-DIP-001` - `RULE-DIP-004`)**: Official completion diplomas for V4.0 are rendered via Apps Script (`Utilities.newBlob(html, 'text/html').getAs('application/pdf')`) with 9 academic hours (5h lectivas + 4h prácticas) with Ember Orange styling and dispatched via `MailApp.sendEmail` alongside Canva slides and the permanent Google Drive vault.
- **Powershell Compatibility (`RULE-OPS-003`)**: Do not use `&&` in shell commands under Windows PowerShell; use `;` or execute sequentially.
