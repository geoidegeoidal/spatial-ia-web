# Delta: landing page

## MODIFIED Requirements

### `RULE-UI-004`: Closed V5 registration and upcoming V6

The landing contains no registration form, submit control, CRM action or `assets/registration.js` load. Closure is effective and readable without JavaScript. Preserve `#registro` and `#protocolo` as destinations for truthful informational calls to action, not an active reservation.

Announcement, metadata, navigation/hero calls to action, registration panel and FAQ communicate closed V5 registration and upcoming V6 with "Pronto inscripciones para la versión 6". Do not announce V6 dates, prices, availability or a waitlist. Existing V5 dates/prices remain clearly V5-only. Preserve syllabus/profile, Hydra motion, accessibility and the existing four analytics event keys; interest is never a completed registration.

Keep the unused V5 registration runtime unchanged. Its existing validation, JSON success/error, duplicate guard, country keyboard/focus and Chile-only student behavior remain tested using a fixed fixture with a reserved `.invalid` destination. No fixture may contain a real CRM submission action. The separate Apps Script API and existing records are not modified.

#### Scenario: New visitor

A visitor sees closed V5/upcoming V6 at entry and after following any registration CTA. No form, personal-data entry or CRM POST is available on the landing at desktop/mobile sizes or with JavaScript disabled.

#### Scenario: Existing site behavior

Program, instructor, historical V5 information, four FAQ items, fragment links, keyboard navigation, responsive layout, motion controls and four analytics events continue to work. Only hero/offer/FAQ text hashes change for the authorized closure copy.
