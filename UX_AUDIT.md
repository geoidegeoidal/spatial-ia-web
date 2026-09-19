# Auditoría Laws of UX — Landing V5

Fuente revisada: https://lawsofux.com/es/ (18/09/2026). Alcance: portada, navegación, programa, perfil, precios, formulario, confirmación y responsive 320–1440 px.

| Ley | Estado | Evidencia o decisión |
| --- | --- | --- |
| Atención selectiva | Aplicada | Naranja reservado para CTA, selección y datos clave; control de movimiento compacto para no competir con el formulario. |
| Carga cognitiva | Aplicada | Contenido dividido por secciones; formulario breve con datos, experiencia y plan; detalles avanzados permanecen colapsados. |
| Efecto de estética-usabilidad | Aplicada | Sistema Hydra consistente: negro, naranja, tipografía Pixel/Manrope/Mono, bordes y estados uniformes. |
| Efecto de posición en serie | Aplicada | Propuesta/CTA aparecen al inicio; precio, formulario y confirmación cierran el recorrido. |
| Efecto de tendencia a la meta | Conforme | La inscripción es un único paso corto con confirmación inmediata; no se añade progreso artificial. |
| Efecto Von Restorff | Aplicada | CTA principal y opción seleccionada usan naranja; acciones secundarias mantienen menor contraste. |
| Efecto Zeigarnik | Aplicada | Un error conserva todos los datos y permite reintentar; no se persisten datos personales al abandonar. |
| Fluir | Aplicada | Recorrido continuo en una página, anclas directas, feedback inmediato y movimiento pausable/reducible. |
| Fragmentación | Aplicada | Programa en 3 sesiones; formulario en grupos semánticos; información comercial en tarjetas y hechos. |
| Memoria de trabajo | Aplicada | Etiquetas siempre visibles, precio junto al plan y restricción estudiantil junto a la decisión. |
| Navaja de Occam | Aplicada | HTML/CSS/JS nativos; sin wizard, modal, dependencia o paso adicional para una inscripción corta. |
| Conectividad uniforme | Aplicada | Bordes y fondos conectan opciones de una misma familia; líneas vinculan hechos y desplegables. |
| Ley de Fitts | Corregida | Objetivos táctiles interactivos de al menos 44×44 px en móvil; tarjetas de radio son clicables completas. |
| Ley de Hick | Aplicada | Solo 3 niveles y 2 planes; países en una lista cerrada ordenada, fuera del flujo hasta abrirla. |
| Ley de Jakob | Aplicada | Enlaces navegan, botones actúan, etiquetas envuelven controles, `fieldset/legend` agrupa radios y `details` expande contenido. |
| Ley de la semejanza | Aplicada | Sesiones, precios, radios, enlaces y FAQ comparten patrones visuales según su función. |
| Ley de Miller | Conforme | Navegación y grupos de decisión se mantienen bajo 7 elementos; la lista de países es reconocimiento externo, no memorización. |
| Ley de Parkinson | Conforme | Un formulario único evita pasos y tiempo innecesarios; no hay temporizadores ni tareas abiertas. |
| Ley de Postel | Aplicada | Frontend envía valores canónicos; servidor recorta, normaliza y valida entradas, rechazando combinaciones inválidas. |
| Ley de proximidad | Corregida | Reparado el cierre HTML que separaba etiquetas y comprimía grupos; cada etiqueta, control y ayuda queda próxima. |
| Ley de Prägnanz | Aplicada | Jerarquía lineal, títulos directos, tres módulos y selección con estados simples y reconocibles. |
| Ley de región común | Aplicada | Panel, fieldsets, tarjetas y secciones delimitan grupos; no hay contenido cruzando cajas en 320–1440 px. |
| Ley de Tesler | Aplicada | El sistema asume Chile, sincroniza país/precio y deshabilita automáticamente planes incompatibles. |
| Modelo mental | Aplicada | Flujo familiar: conocer programa → revisar precio → completar formulario → revisar correo. |
| Paradoja del usuario activo | Aplicada | La interfaz se entiende sin manual; instrucciones y restricciones aparecen justo donde se usan. |
| Principio de Pareto | Aplicada | CTA, programa, precio y formulario dominan el recorrido; información secundaria usa detalles progresivos. |
| Regla de fin de pico | Aplicada | El envío termina con confirmación enfocada, próximo paso explícito y recordatorio de revisar spam/promociones. |
| Sesgo cognitivo | Aplicada | Precios y alcance se expresan sin escasez falsa, cuenta regresiva, precio tachado ni cupón promocional. |
| Sobrecarga de opciones | Aplicada | Se limitan decisiones a experiencia y plan; el país solo despliega opciones bajo demanda. |
| Umbral de Doherty | Aplicada | El clic cambia a “Enviando…” inmediatamente; animación responde en cada frame y se suspende fuera de pantalla. |

## Correcciones derivadas

- Reparación estructural del formulario y wrapping defensivo: cero desbordes internos o de página entre 320 y 1440 px.
- Objetivos táctiles de 44 px para navegación, desplegables, opciones de país y enlaces relevantes.
- Asociación accesible de la etiqueta de país, ayuda del plan y banderas decorativas.
- Control de movimiento compacto bajo 1100 px, con nombre accesible y sin cubrir contenido.
- Favicon Hydra para reforzar reconocimiento y coherencia de marca.

## Verificación

- `node test_preview_v5.js`
- `node test_registration_v5.cjs`
- `node test_site_hydra.cjs`
- Pruebas de navegador con respuestas de registro interceptadas; no se envían datos reales.
