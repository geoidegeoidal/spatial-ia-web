# Publicar V5 con syllabus y GoatCounter

## Propose
Promover Territorios Imposibles a página principal, ampliar programa desde el PDF de 53 láminas y conectar el sitio público al contador alojado. El usuario eligió «V5 como página principal» y autorizó guardado/subida a GitHub Pages. Aclaró que el PDF es solo fuente del syllabus, sin publicación de la presentación.

## Delta aplicado
- RULE-UI-001: Chakra Petch sin cursivas, identidad surrealista conservada, movimiento accesible y tarjetas alineadas.
- RULE-UI-003: oferta V5 CLP 35.000/30.000, USD referencial fechado; 16–18 octubre 20:00–21:30; programa de agentes/SDD, MapLibre/GeoJSON/EDA y Turf/Chart.js/exportación/GitHub Pages.
- RULE-UI-004: landing pública sin formulario ni endpoint; aviso de próxima apertura. Preview redirige a index.
- RULE-UI-006: GoatCounter oficial async en index, cuatro eventos nativos de clic; sin segundo tracker en redirección.
- Biografía contrastada con LinkedIn y aclaraciones del usuario; portafolio enlazado.

## Apply
Commit `5b1c4b1177d4f2f75b2a83f9e48a81c0d81d68f5` subido a master y gh-pages. Página: https://geoidegeoidal.github.io/spatial-ia-web/.

## Verify
- `node test_preview_v5.js` y `git diff --check` correctos.
- Chromium 1440/1024/768/390/320 px: sin overflow, tarjetas/entregables alineados, fuente cargada, sin cursivas; pausa y movimiento reducido correctos.
- Script real GoatCounter con conteos interceptados en prueba local: visita y evento de programa.
- GitHub Pages ejecución `35306184158`: completed/success; build API built en `5b1c4b1`.
- URL pública: título V5, tres módulos, sin formulario ni PDF incrustado/enlazado. Petición real a GoatCounter HTTP 200 para `/spatial-ia-web/`. La visita de prueba fue real; visualización en panel privado no inspeccionada.
- `preview_v5.html` redirige correctamente a index.

## Archive
Subalcance de publicación completado. `prepare-v5-and-close-v4` permanece abierto por CRM, pagos, reapertura y certificados V4 pendientes.
