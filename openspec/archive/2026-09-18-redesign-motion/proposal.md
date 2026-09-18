# Movimiento como parte central de las muestras

## Corrección solicitada
El usuario rechaza que las muestras solo interpreten la identidad visual: las animaciones y transiciones son lo potente de ambas referencias. La restricción anterior «sin JavaScript» era una decisión de implementación insuficiente, no una necesidad del usuario.

## Observación de referencias
2026-09-18, Edge 1440×900, carga, cursor y cinco desplazamientos: Hydra usa canvas de píxeles/nodos animados, entradas de texto, navegación fija y bandas desplazables. Illoca usa escena ilustrada renderizada en canvas, recorrido de cámara vinculado al scroll (plano general → mesa → detalle), navegación flotante y aparición lateral de contenido. No basta añadir fades a los prototipos estáticos.

## Aplicación
- Hydra: campo de partículas con volumen, movimiento continuo y respuesta al puntero, transformación vinculada al scroll, entrada de titulares, franja móvil y diagramas activos.
- Illoca: escena territorial 3D original con proyección Canvas 2D, construcción escalonada, cámara vinculada al scroll y transición de maqueta a interfaz; navegación por etapas y respuesta al cursor.
- Ambos: scroll nativo, entrada progresiva por secciones, transiciones en enlaces, pausa visible, reduced-motion y suspensión fuera de pantalla/pestaña oculta.
- Reutilizar contenido, SVG de respaldo y oferta. Solo muestras locales, sin tocar portada pública ni CRM.
- HTML/CSS/Canvas nativos, sin dependencia gráfica o de animación adicional.

## Verificación
Comprobar cambios entre fotogramas, efecto del puntero, diferencias entre etapas de scroll, pausa real, reduced-motion, navegación sin JavaScript, geometría responsive y tiempos de frame. Revisar secuencias visuales, no solo capturas estáticas.

## Resultado y evidencia
- `proposals/motion.js` y `motion.css` proporcionan entrada de titulares, navegación fija, revelaciones, microinteracciones y pausa común. HTML original y SVG permanecen como respaldo sin JS.
- Hydra: 2.232 píxeles en relieve tridimensional, ondas, respuesta al cursor, enlaces/nodos y transformación continua a esfera mediante scroll. Banda de herramientas desplazable y dibujos de sesiones progresivos.
- Illoca: geometría 3D original proyectada a Canvas 2D, cámara con giro/acercamiento, elevación escalonada de once edificios y aparición de marcadores/panel. Tres etapas navegables con botones y scroll nativo. Adaptación para pantallas cortas sin ocultar controles.
- `node test_redesign.js`, `node --check proposals/motion.js` y `node test_redesign_motion.cjs` aprobados. El último usa Playwright previamente instalado en `%TEMP%/opencode/node_modules` y Edge.
- Prueba de navegador: 1440, 1024, 768, 390 y 320 px; adicional 320×568. Compara píxeles entre estados, prueba las tres etapas, puntero, teclado, pausa, reduced-motion y suspensión de requestAnimationFrame fuera de pantalla. Comprueba contenido y SVG con JavaScript desactivado. Sin errores JS.
- Revisión visual de fotogramas inicial/intermedio/final. Corregidos superposición de escena sobre texto, herencia de color en titulares, visibilidad de controles en pantallas cortas y colocación de leyenda móvil.
- Benchmark local con Edge software (`--disable-gpu`), 1440×900, recorrido activo de 5,5 segundos sin grabación: ambas muestras con 331 intervalos, mediana y p95 16,7 ms, cero intervalos >50 ms. Grabando video: mediana 16,7 ms, p95 33,4 ms; 0/1 intervalos >50 ms respectivamente.
- Videos de demostración `proposals/01-hydra-motion.webm` y `02-illoca-motion.webm`; capturas `*-motion-start/middle/end.png` y vistas escritorio/móvil actualizadas.
- Revisión contra plan completada. Se reemplaza la decisión anterior de muestras estáticas por movimiento funcional central. Pendiente evaluación visual del usuario, sin promover a portada.
