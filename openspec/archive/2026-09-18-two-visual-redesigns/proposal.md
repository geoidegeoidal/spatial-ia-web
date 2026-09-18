# Dos muestras de rediseño V5

## Solicitud
Crear dos propuestas visuales navegables tomando como referencias https://hydradb.com/ y https://illoca.unseen.co/.

## Alcance
- `proposals/01-hydra.html`: negro/naranja, tipografía pixelada, cartografía técnica, retícula y bloques de información.
- `proposals/02-illoca.html`: papel cuadriculado, azul cobalto, composición editorial e ilustración territorial original.
- Mantener oferta V5, español neutro, tres sesiones alineadas, horario y estado de próxima apertura.
- Prototipos independientes de `index.html`, sin analítica, formularios ni pagos. Variación de tokens autorizada únicamente para estas muestras.
- Capturas de escritorio y móvil, navegación entre versiones, accesibilidad básica y revisión de overflow.

## Referencias observadas
Ambos sitios abiertos con Edge headless a 1440 × 1000 el 2026-09-18. HydraDB: negro, naranja, Geist Pixel, líneas finas, gráfico de píxeles y navegación horizontal. Illoca: papel beige cuadriculado, navegación flotante, titulares gigantes, ilustración azul/crema y anotaciones. Se reinterpretan los lenguajes con contenido propio; no se copian ilustraciones ni fuentes comerciales.

## Verificación y revisión
- `node test_redesign.js`: aprobado; oferta, programa, enlaces internos, IDs únicos y ausencia de scripts/formularios/pagos/analítica.
- `check-redesign.cjs` temporal en `%TEMP%/opencode`: Edge a 1440, 1024, 768, 390 y 320 px. Sin overflow ni errores JS, tarjetas alineadas, navegación cruzada, CTA y desplegables con Enter; reduced-motion respetado.
- Cuatro capturas en `proposals/*-desktop.png` y `proposals/*-mobile.png`; páginas completas revisadas desde capturas temporales. En revisión se corrigió un selector que ocultaba el enlace de edición V5 en el móvil de Hydra.
- Revisión contra plan: dos documentos estáticos sin JavaScript ni dependencias de compilación; SVG originales y fuentes abiertas; ofertas y contenido V5 conservados. Sin bloqueantes técnicos para evaluar las muestras. Pendiente elección del usuario.
