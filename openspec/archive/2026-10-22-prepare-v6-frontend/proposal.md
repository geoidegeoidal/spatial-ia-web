# Complete the V6 informational frontend

Status: applied and verified locally on 2026-10-22; not published, registration still inactive.

Subsequent publication authorization: the user requested “subelo, que cosas necesitas?”. The frontend is released through the existing master/gh-pages workflow; this does not authorize registration activation or Google/mail operations. The original status above records the pre-publication verification phase.

The user reported “no has modificado el frontend”. The previous private CRM delivery left the landing unchanged, so the original website request still needs implementation:

> prepara el sitio para la versión 6 del taller, sera el 13 14 y 15 de noviembre de 20 a 21:30 hrs hora chile, los precios se mantienen, pero añade una opción de comprar solo las grabaciones por 20 mil pesos. modifica en el sitio todos los lugares donde sea necesario, y explora una forma de mediante cron poder tener una BBDD en supabase quizas y ya no depender del excel o el codigo de google para el crm

Update V6 metadata, navigation, hero, agenda labels/ISO dates, offer, inactive-registration notice, FAQ, footer and human-readable analytics titles. Keep Hydra, all syllabus material and instructor content, motion and existing analytics event keys. Add a separate full-width recordings card below the two unchanged live-price cards: CLP20,000 / verified PayPal USD22; no live participation implied.

Registration stays inactive until the separately authorized V6 endpoint and operational flow are ready. No V5 endpoint, registration runtime, direct checkout or bank-payment instructions are exposed on an inactive landing. No Google operation, publication, migration or CRM modification is part of this change.

Verification: static RED/GREEN for V6 dates, recordings and edition consistency; browser desktop/mobile/no-JS/keyboard checks; retain instructor/strip hashes and canonicalized syllabus hash; block real CRM/analytics traffic. Existing frontend files all match published `a16d7ce` before this change, allowing a clean scoped assessment without previous dirty CRM work. Risk: none intended; new CSS matches only the new recordings card.
