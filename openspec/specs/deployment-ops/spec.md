# Spec: Despliegue y Operaciones (`deployment-ops`)

## 1. Propósito y Alcance
Define el flujo de integración continua, sincronización de ramas en Git, arquitectura de hosting estático en GitHub Pages y las políticas de despliegue seguro sin servidor.

---

## 2. Reglas de Negocio y Requisitos Técnicos

### `RULE-OPS-001`: Flujo de Ramas y Despliegue en GitHub Pages
- El entorno de producción en vivo (`https://geoidegeoidal.github.io/spatial-ia-web/`) se sirve desde la rama `gh-pages`.
- Toda modificación desarrollada y validada en `master` debe fusionarse y enviarse a `gh-pages` como paso de despliegue obligatorio:
  ```powershell
  git checkout gh-pages
  git merge master
  git push origin gh-pages
  git checkout master
  ```

### `RULE-OPS-002`: Zero-Build y Cero Costo Operativo
- El repositorio mantiene arquitectura estática pura.
- No se permiten pasos de compilación que requieran herramientas pesadas locales para que el sitio funcione (TailwindCSS CDN + Vanilla JS).
- Los activos multimedia y fuentes deben servirse mediante enlaces absolutos HTTPS seguros o rutas relativas dentro del directorio `assets/`.

### `RULE-OPS-003`: Guardrails de Entorno de Ejecución (Windows Powershell)
- Los comandos de shell en este repositorio se ejecutan en entorno Windows con PowerShell (`pwsh`).
- **Restricción:** El operador `&&` no es un separador válido en PowerShell. Todos los comandos encadenados deben ejecutarse secuencialmente o mediante punto y coma `;`.

### `RULE-OPS-004`: Ritual Obligatorio de Handoff y Persistencia de Memoria
- Al finalizar cualquier sesión de desarrollo, deben actualizarse:
  - `HANDOFF.md`: Registro del objetivo, trabajo completado, decisiones técnicas tomadas, commits y próximos pasos.
  - `AGENTS.md`: Decisiones arquitectónicas duraderas y lecciones aprendidas.
  - OpenSpec: Actualización de la especificación viva (`openspec/specs/`) y registro archivado del cambio (`openspec/archive/`).

---

## 3. Criterios de Aceptación
- [x] Despliegue en GitHub Pages accesible sin errores 404 de recursos estáticos.
- [x] Sincronía estricta entre el commit de la rama `master` y la rama `gh-pages`.
