# Delta: activate the V6 registration form

Covers frontend S1–S3/S5. The versioned V6 service and one owner-only browser registration/row/two receipts were verified before final binding; GitHub publication remains a separate operation.

## MODIFIED — RULE-UI-003 / RULE-UI-005

- Preserve Hydra, fonts, motion, syllabus, profile, footer and November 13–15, 2026, 20:00–21:30 Santiago facts. Live prices remain CLP35,000 general / CLP30,000 students only Chile / USD36 international general.
- Reuse the existing country selector and form. Keep plan order `general`, `estudiante`, `grabaciones` and payload names `name`, `email`, `country`, `nivel_sig`, `ocupacion`, `plan`.
- Recordings cost CLP20,000 in Chile or USD22 internationally and explicitly exclude live attendance. Country switching preserves a selected recordings plan; leaving Chile disables students and changes a selected student plan to general. International guidance must describe both general and recordings options.
- Guard the optional recordings-price element and runtime-ready submit marker. Their absence must preserve all historical V5 fixture text, checked/disabled states, focus and payload behavior. Keep that fixture unchanged.
- Do not promise certificates, access duration, immediate availability or fulfillment dates. Tutorial/folder readiness does not block intake; never copy V5 fulfillment links.

## MODIFIED — RULE-UI-004

- Replace the inactive panel with the house form and make open-registration status consistent in metadata, announcement, offer and FAQ, after the intake proof is complete.
- Bind only the production `#registration-form` action to the verified isolated V6 versioned `/exec` URL. Keep both historical V5 and V6 test fixture actions reserved `.invalid`; never bind them to Google.
- Disable submit in HTML until `assets/registration.js` has installed validation, country selection and submission handlers. Include an explicit `noscript` notice; disabled submit also prevents implicit Enter submission when JavaScript or the runtime is unavailable.
- Preserve native validation, FormData, readable JSON `result === "success"`, the pending guard, timeout/finally cleanup, preserved inputs and accessible error/status/success recovery. No `no-cors`, HTTP-200-only success, automatic retry or pre-submit email alert.
- Retain labels, fieldsets, keyboard country navigation and focus return, 44px touch targets and responsive bounds. Isolate the third plan's full-width styling with `plan-choices--v6`.

## MODIFIED — RULE-UI-006 / verification

- Preserve all four historical `v5-*` click-event keys. An interest click is not a completed registration.
- Route local site files and intercept CRM, Google response-host and analytics traffic before navigation; never send real registrations or production metrics in browser suites.
- Retain all V5 fixture assertions and compare its observable behavior against the baseline using an uncommitted external-scratch harness. Refresh only offer/FAQ content hashes; preserve the other hashes and the three agenda-date canonicalizations alongside actual November ISO checks.
- Verify with `node --check assets/registration.js`, `node test_preview_v5.js`, `node test_registration_v5.cjs`, `node test_registration_v6.cjs`, and `node test_site_hydra.cjs`. These local checks do not prove a real endpoint, inbox receipt or publication.
