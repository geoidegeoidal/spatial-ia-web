# Tasks

- [x] S1: Observe RED for the active form and missing upcoming-V6 announcement. Two focused Node assertions independently failed with `ERR_ASSERTION`, exit 1, before the HTML change.
- [x] S1: Replace the live form with the static status panel and align site copy; retain runtime tests with a non-production fixture. GREEN: `node test_preview_v5.js`, `node test_registration_v5.cjs`, `node test_site_hydra.cjs`, all exit 0. A new test's ambiguous desktop/mobile CTA selector was narrowed before the successful rerun; no product correction was needed.
- [x] S1: Verify static/browser/fixture regressions and no-JS closure, update live specs and operator context, then archive.

## Verification

All three applicable commands passed: `node test_preview_v5.js`, `node test_registration_v5.cjs`, `node test_site_hydra.cjs` (existing Playwright + Edge via `NODE_PATH`). Browser checks covered 1440/1024/768/390/320 px, keyboard CTA, no-JS closure, zero landing CRM requests, all retained form-runtime behavior through a `.invalid` fixture, seven content hashes, four intercepted analytics events, motion/reduced-motion and preview redirect. Only hero/offer/FAQ hashes were rebaselined; the other four remain unchanged. Desktop/mobile closure screenshots were inspected outside the workspace. No new dependency, backend mutation, real registration or publication.

No independent verifier is required for this contained UI-only change (Risk: none); the read-only mapping actor mapped test scope and did not provide a post-change verdict. Native review, if due, is separate from these functional checks.
