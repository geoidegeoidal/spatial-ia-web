# Promover Hydra al sitio oficial conservando todo el contenido

## Solicitud aprobada
El usuario selecciona Hydra y pide aplicar su diseño al sitio oficial sin omitir secciones. Agrega integrar su foto y ampliar la descripción del perfil.

## Alcance
- `index.html` adopta tipografía pixelada, negro/naranja, composición y movimiento Hydra (relieve reactivo → esfera, navegación fija, banda y transiciones).
- Conservar texto, anchors, metadatos, analítica y todos los bloques enumerados en el inventario. Perfil ampliado solo con hechos respaldados por AGENTS y el texto vigente.
- Foto existente `assets/instructor.jpg`, LinkedIn y portafolio. Conservar dos vínculos laborales actuales, participación en equipo Servel, formación UAH, ConMapas y AutoAtlas Pro.
- Promover runtime compartido de muestras a `assets/motion.js` / `assets/motion.css` y actualizar sus referencias. CSS específico de producción en `assets/site.css`.
- Mantener inscripción cerrada, USD referenciales y CRM/pagos pendientes. Implementación local; commit/despliegue requieren solicitud explícita.

## Inventario de contenido a conservar
| Bloque original | Contenido | Verificación |
| --- | --- | --- |
| Aviso, navegación y hero | V5, titular, introducción, dos CTA, fechas y horario | Metadatos y contenido de hero |
| `.strip` | Cuatro capacidades y sus descripciones | Huella de texto idéntica |
| `#programa` + `#syllabus` | 3 sesiones, fechas, 12 temas, 3 resultados, metodología OpenSpec, 3 desplegables, 10 tecnologías | Huella de texto idéntica; 8 párrafos, 26 li, 3 details |
| `#instructor` | Foto, nombre, formación, experiencia, dos roles actuales, ConMapas/AutoAtlas, enfoque docente y enlaces | Conservar los 5 párrafos previos y ampliar con hechos confirmados |
| `#registro` + `#protocolo` | 2 precios CLP y USD, tipo de cambio, fuente y advertencia, fechas, horario, horas, cupos, cierre y aviso | Huella de texto idéntica; 7 párrafos y 2 enlaces |
| FAQ `aria-labelledby=faq` | 4 preguntas y respuestas, incluido cierre/certificación V4 | Huella de texto idéntica |
| Footer | Marca, lema e identidad Territorios Imposibles | Huella de texto idéntica |
| Integraciones | Canonical/title/description; GoatCounter una vez y 4 eventos; redirect preview | Verificación estática y navegador con tráfico de conteo interceptado |

## Verificación
Huellas SHA-256 tomadas antes de editar desde DOM oficial (solo espacios normalizados). Comprobar texto preservado antes de activar JS para separar contenido de copias decorativas. Navegador: escritorio/móvil, detalles, anchors, foto, perfil, navegación, movimiento, pause/reduced-motion y rendimiento. Sin envíos al CRM ni visitas analíticas de pruebas.

## Resultado verificado
- `index.html` rediseñado con Hydra; las siete huellas de contenido coinciden con las previas. Para el instructor se excluyen únicamente los tres párrafos añadidos, su caption y las dos fichas de experiencia/formación; todos los párrafos y enlaces originales permanecen.
- Foto local en color, proporción cuadrada natural 1024×1024, marco técnico y dos fichas (8+ años / UAH). Tres párrafos adicionales sobre geografía, datos, herramientas y enfoque docente, sin inventar roles o atribuciones.
- `node test_preview_v5.js`, `node test_redesign.js`, `node --check assets/motion.js`: aprobados.
- `test_site_hydra.cjs`: siete huellas, fotografía cargada y sin distorsión, ocho párrafos de perfil, tres módulos alineados, siete desplegables, menú móvil, movimiento relieve→esfera, pausa, reduced-motion, fallback sin JS, redirect y rutas de assets bajo `/spatial-ia-web/`. 1440/1024/768/390/320 px y 320×568; sin excepciones JS ni assets faltantes.
- GoatCounter real cargado contra origen de producción simulado; visita y los cuatro eventos observados con todas las peticiones de conteo interceptadas (cero visitas de prueba enviadas a producción).
- `test_redesign_motion.cjs`: ambas muestras pasan después de mover el runtime compartido a assets. Foco sobre reveal muestra contenido inmediatamente. `overflow:clip` evita el desplazamiento horizontal interno del hero al redimensionar tras navegar con teclado.
- Revisión de capturas de portada, móvil, programa, instructor y precios. Capturas temporales `official-hydra-*.png` en `%TEMP%/opencode`; se regeneran con `SPATIAL_CAPTURE_DIR` en el test.
- Benchmark local de portada: Edge software, 1440×900, 5,5 s de scroll activo, 331 intervalos; mediana/p95 16,7 ms, máximo 16,8 ms, cero intervalos >50 ms y cero long tasks.
- Estado: aplicado a la portada local y listo para revisión. Sin commit, push ni despliegue; no se afirma actualización del sitio público.
