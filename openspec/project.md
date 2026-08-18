# OpenSpec: spatial-ia-web

## 1. Visión General del Proyecto
`spatial-ia-web` es el ecosistema digital del Bootcamp **"Desarrollo de Aplicaciones Web Territoriales Asistido con IA"** (Geo-IA). 
Consta de una landing page de alto impacto visual (estética Neon Tokyo / Cyber-Brutalist), automatización de CRM en Google Apps Script para gestión de inscripciones y pasarelas de pago, motor de certificación y diplomas vectoriales/PDF de alta resolución, y un flujo de despliegue zero-server alojado en GitHub Pages.

---

## 2. Taxonomía de Reglas de Negocio e Identificadores

Para garantizar la **trazabilidad bidireccional** entre especificaciones, código fuente y verificaciones, todas las reglas siguen un esquema de identificador único:

| Dominio | Prefijo | Alcance |
| :--- | :--- | :--- |
| **Landing Page & UI** | `RULE-UI-XXX` | Estética visual, componentes interactivos, formularios y estados de CTA |
| **CRM & Automatización** | `RULE-CRM-XXX` | Registro `doPost`, máquina de estados, pasarelas de pago y envíos transaccionales |
| **Motor de Diplomas** | `RULE-DIP-XXX` | Carga horaria, renderizado HTML/PDF, metadatos y distribución de certificados |
| **Operaciones & Deploy** | `RULE-OPS-XXX` | Sincronización `master` ↔ `gh-pages`, zero-server, y seguridad de dependencias |

---

## 3. Arquitectura del Directorio OpenSpec

```
openspec/
├── project.md                          # Definición global del estándar y taxonomía
├── specs/                              # ESPECIFICACIONES VIVAS (Source of Truth)
│   ├── landing-page/
│   │   └── spec.md                     # Especificación técnica y visual de la web
│   ├── crm-automation/
│   │   └── spec.md                     # Especificación de lógica CRM y flujos de pago
│   ├── diploma-engine/
│   │   └── spec.md                     # Especificación de diplomas, carga horaria y PDF
│   ├── deployment-ops/
│   │   └── spec.md                     # Especificación de CI/CD y ramas GitHub Pages
│   └── traceability-matrix.md          # Matriz cruzada Regla ↔ Código ↔ Verificación
├── changes/                            # CAMBIOS ACTIVOS EN CURSO (Propose / Apply)
│   └── v4-launch-prep/
│       ├── proposal.md
│       └── tasks.md
└── archive/                            # CAMBIOS HISTÓRICOS CONSOLIDADOS (Archive)
    ├── 2026-08-07-deactivate-registration/
    │   ├── proposal.md
    │   ├── tasks.md
    │   └── specs/landing-page.delta.md
    ├── 2026-08-07-crm-google-meet-links/
    │   ├── proposal.md
    │   ├── tasks.md
    │   └── specs/crm-automation.delta.md
    └── 2026-08-14-v3-closing-diplomas/
        ├── proposal.md
        ├── tasks.md
        └── specs/diploma-engine.delta.md
```

---

## 4. Flujo de Desarrollo Basado en Especificaciones (SDD Workflow)

Cualquier evolución del proyecto sigue el ciclo canónico:
1. **Propose (`changes/<change-id>/`):** Redactar `proposal.md`, `tasks.md` y los *Delta Specs* (`.delta.md`) con las etiquetas `ADDED`, `MODIFIED` o `REMOVED`.
2. **Apply:** Ejecutar el código reflejando estrictamente la especificación aprobada.
3. **Verify:** Correr pruebas locales (`test_generar_diplomas.py`, verificaciones DOM, linters) y actualizar la matriz de trazabilidad.
4. **Archive:** Promover los cambios a las especificaciones vivas en `specs/` y mover la carpeta del cambio a `archive/YYYY-MM-DD-<change-id>/`.
