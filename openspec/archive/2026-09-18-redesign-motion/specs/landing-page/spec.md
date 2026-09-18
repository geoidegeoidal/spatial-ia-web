# Delta archivado: MODIFIED RULE-UI-007

Las propuestas incluyen una experiencia de movimiento diferenciada y central. Hydra presenta partículas y conexiones reactivas, transformación con scroll y movimiento de banda. Illoca presenta recorrido de cámara sobre maqueta 3D, construcción por etapas y transición a interfaz. Las entradas y microinteracciones acompañan esos efectos principales.

- El usuario puede pausar las animaciones; `prefers-reduced-motion` muestra una composición estática legible.
- No interceptar rueda/touch ni sustituir el desplazamiento nativo.
- Canvas decorativos inaccesibles al lector; descripción y contenido HTML accesibles. Contenido y SVG disponibles si JavaScript falla o está deshabilitado.
- Los bucles se detienen fuera de pantalla y con pestaña oculta. Reanudar no produce saltos de tiempo.
- Comprobar escritorio y móvil, estados antes/después, teclado, pausa y tiempos de frame.
