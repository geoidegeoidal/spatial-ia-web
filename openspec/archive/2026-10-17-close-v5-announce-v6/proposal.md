# Close V5 web registration and announce V6

Implemented and verified locally on 2026-10-17. Publishing remains a separate explicit decision.

Replace the landing's active registration form with a static closed-V5/upcoming-V6 panel. Update registration calls to action, metadata, announcement and FAQ without inventing V6 dates or prices. Keep V5 syllabus, profile, motion and clearly labeled V5 offer information.

## Authorized requirement

- S1: "en el sitio bloqueza el formulario web para nuevas inscripciones y pone, en donde corresponda en el sitio, pronto inscripciones para la versión 6"

The page must have no registration form, CRM action or registration runtime, including without JavaScript. Preserve existing anchors and analytics keys. Keep `assets/registration.js` unchanged and retain its regression coverage through a fixed form fixture with a reserved `.invalid` action, never a real CRM endpoint. This closes the website UI, not the independently deployed Apps Script API. No CRM, Google account, payment, publishing, commit or deployment change is authorized.

## Verification

Observe separate RED checks for form removal and upcoming-V6 copy. Run `node test_preview_v5.js`, `node test_registration_v5.cjs`, `node test_site_hydra.cjs` with existing Playwright/Edge; verify five widths, keyboard anchors, no-JS closure, zero registration POSTs and preserved content/analytics. Rebaseline only the three authorized hero/offer/FAQ text hashes. Check `git diff --check` and retain browser captures outside the workspace.

Risk: none. The retained runtime and CRM remain unchanged; closure is not presented as a security boundary for the existing API.
