# Rendimiento de apertura y syllabus vigente

## Propose
Corregir lentitud reportada al abrir la landing y actualizar contenidos desde el nuevo PDF de 50 páginas. Mantener identidad visual, horario comercial 20:00–21:30 y precios. No publicar PDF/slides ni nombrar datasets o capas concretas en el syllabus.

## Diagnóstico
Edge headless con GPU: intervalos de frame ~16,7 ms. Misma página con `--disable-gpu`: mediana 50 ms (~20 FPS). Prueba secuencial: retirar mezcla/parallax reduce a 33,3 ms; inmovilizar esfera/órbita baja a 16,7 ms; retirar filtros mantiene 16,7 ms y reduce picos. Es un problema de composición/rasterización, no de un bucle JavaScript detectado. El congelamiento exacto del usuario no se reprodujo con GPU activa.

## Delta RULE-UI-001
Evitar animación continua del grupo SVG cartográfico con mezclas. Conservar manos flotantes y transiciones transform/opacity; retirar blur de entrada/revelación y parallax del fondo. El grano externo devuelve 404: reemplazar por textura estática embebida, sin filtros SVG. Imágenes decorativas con decodificación asíncrona.

## Delta RULE-UI-003
Fuente vigente: PDF de 50 páginas. SDD con OpenSpec (Explore, Propose, Apply; proposal.md, specs/, design.md, tasks.md), inspección de datos, criterios de aceptación y cambios verificables. S02 genérica: fuentes/capas MapLibre, EDA, filtros, popups, comparación UX y preservación funcional. S03: exportación filtrada, buffers/dissolve, simbología y leyenda con fuente común, Chart.js con estado de filtros compartido, responsive y GitHub. Retirar contrato.md, Stitch e intersecciones del temario principal porque la revisión los sustituye o elimina. No nombrar capas de práctica.

## Apply / Verify / Archive
- Aplicados ambos deltas en index.html y sincronizadas especificaciones y trazabilidad.
- `node test_preview_v5.js`: aprobado; contenido OpenSpec, ausencia de temario anterior/PDF, inscripción cerrada, fechas/precios y movimiento accesible.
- Edge a 1440/1024/768/390/320 px: sin overflow, módulos alineados, tipografía correcta, pausa y reduced-motion, sin errores JavaScript.
- Archivo final con `--disable-gpu`: mediana y p95 16,7 ms, máximo 16,8 ms durante muestra estable de 120 frames, frente a mediana 50 ms anterior. Apertura aún tuvo un frame de 100 ms y una tarea de 80 ms; no afirmar eliminación absoluta de cualquier bloqueo.
- Benchmark y capturas en temporal preexistente de OpenCode; sin dependencia añadida al proyecto.
- Archivado como implementación local verificada. Publicación pendiente de autorización; no commit ni push.
