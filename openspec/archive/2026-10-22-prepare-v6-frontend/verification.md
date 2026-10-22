# Observed local verification before publication

- Static RED before the frontend update; `node --test --test-reporter=spec test_preview_v5.js`: 3/3 GREEN afterward.
- `node test_site_hydra.cjs`: passed at 1440/1024/768/390/320, including three-card bounds/full-width recordings, original content invariants, photo, mobile menu, keyboard, motion/reduced-motion, no-JS and redirect/assets.
- `node test_registration_v5.cjs`: passed retained V5 fixture behavior plus inactive V6 landing, keyboard and responsive checks. New count interception prevents real analytics; CRM requests remain blocked.
- Strip/instructor hashes unchanged. Syllabus hash unchanged after normalizing only three approved visible date labels; actual November ISO values asserted independently. Hero/offer/FAQ/footer hashes updated for authorized copy only.
- Desktop/mobile screenshots inspected; no overflow and all three prices legible. Delivered preview is an external PNG, not a live page that would emit analytics.
- Five affected frontend files matched existing published `a16d7ce` before edits. Isolated same-repository assessment over that baseline: medium, 5 paths / 135 changed lines, review_due false / under_budget. A missing inventory input was corrected through read-only preflight; no START or authority created.
- No dependency, shared runtime, CRM, Google resource, real email/payment, production analytics, publication, commit or push changed. Risk: none.

Remaining operational work is separate: approved V6 endpoint and fulfillment links, individual receipt/permissions proof and the previously recorded backend validation follow-ups before activation. This local informational update does not claim those checks passed.
