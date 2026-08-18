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
- **Form Status & Webhook (`RULE-UI-004`)**: Form in `#protocolo` dispatches asynchronously via `fetch(action, { method: 'POST', body: formData, mode: 'no-cors' })` to Google Apps Script.
- **Payment & Pricing Matrix (`RULE-CRM-002`)**:
  - **Chile General:** $30.000 CLP via MercadoPago (`link-id=f7b0764f-2801-4b26-a858-59c416eebe42`) or Bank Transfer.
  - **Chile Estudiante:** $25.000 CLP via MercadoPago (`https://mpago.la/1EvJQi3`) or Bank Transfer.
  - **Internacional General:** 35 USD via PayPal (`https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU`).
  - **Internacional Estudiante:** 29 USD via PayPal (`https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU`).
- **Country Selector (`RULE-UI-005`)**: Uses Iconify `circle-flags:*` SVG icons in a custom dropdown with keyboard/mouse event listener to avoid missing flag emojis on Windows OS.
- **Deployment Branch Target (`RULE-OPS-001`)**: Production site on GitHub Pages is served from the `gh-pages` branch. Any updates pushed to `master` must also be merged and pushed to `gh-pages` (`git checkout gh-pages; git merge master; git push origin gh-pages; git checkout master`) to reflect on the live site.
- **CRM Automation & Diploma Generation (`RULE-DIP-001` - `RULE-DIP-004`)**: Official completion diplomas for V4.0 are rendered via Apps Script (`Utilities.newBlob(html, 'text/html').getAs('application/pdf')`) with 9 academic hours (5h lectivas + 4h prácticas) with Ember Orange styling and dispatched via `MailApp.sendEmail` alongside Canva slides and the permanent Google Drive vault.
- **Powershell Compatibility (`RULE-OPS-003`)**: Do not use `&&` in shell commands under Windows PowerShell; use `;` or execute sequentially.
