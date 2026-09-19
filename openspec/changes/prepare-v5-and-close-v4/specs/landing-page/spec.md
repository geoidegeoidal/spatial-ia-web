# Delta de landing: formulario V5 local

## MODIFIED: `RULE-UI-004` Estado de inscripción y guardrails
- Sustituir el aviso de próxima apertura por el formulario V5 conectado al endpoint Apps Script independiente ya verificado.
- Enviar `FormData`, impedir dobles envíos y confirmar únicamente cuando el JSON responda `result === "success"`; conservar el formulario ante errores.
- Aplicar estudiantes solo Chile y US$36 general fuera de Chile, sin cupones.
- Mantener esta reapertura solo en local hasta autorización explícita de publicación.

## ADDED: `RULE-UI-005` Selector de país accesible
- Usar banderas SVG Iconify y un listbox operable con ratón, flechas, Escape y selección por teclado.
- Sincronizar país, `aria-selected`, plan disponible y tarifa general. Tras seleccionar, cerrar la lista y devolver foco al disparador.
