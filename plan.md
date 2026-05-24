# TECHNICAL SPECIFICATION: ZERO-SERVER GEO-APP LANDING PAGE

## 1. CONTEXT & ROLE
- **Role:** Principal Frontend Engineer & UI/UX Architect.
- **Objective:** Generate a production-ready, single-file Single Page Application (SPA).
- **Application:** Landing page for an advanced technical bootcamp: "Desarrollo de Aplicaciones Web Territoriales Asistido con IA".
- **Design Philosophy:** Cyberpunk, Retro-Tech, Glassmorphism. High visual impact, clean code execution.

## 2. TECH STACK & CONSTRAINTS
- **HTML:** Semantic HTML5.
- **CSS:** Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com"></script>`).
- **JS:** Vanilla ES6+ strictly enclosed in `<script>` tags at EOF. No frameworks (React/Vue).
- **Architecture:** Zero-build step. Must run directly in the browser.
- **Programming Constraint (KISS):** Keep the JavaScript extremely modular, simple, and declarative. Avoid over-engineering state management. Use straightforward Event Listeners and `fetch` API.

## 3. DESIGN SYSTEM & AESTHETICS
- **Color Palette:**
  - Background: `#09090b` (Zinc-950) with deep space tones.
  - Primary Accent: `#06b6d4` (Cyan-500) for neon active states.
  - Secondary Accent: `#10b981` (Emerald-500) for success and terminal outputs.
  - Text: `#f8fafc` (Slate-50) for headings, `#94a3b8` (Slate-400) for body.
- **Glassmorphism Spec:** Apply utility classes `bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl` to all structural cards and panels.
- **Typography:** Sans-serif for body content; strict `font-mono` for technical data, tags, and terminal interfaces.

## 4. DOM ARCHITECTURE & COMPONENTS

### A. Global Background (Interactive)
- **Spec:** A static CSS grid pattern overlay, combined with a dynamic radial gradient that follows the user's mouse coordinates via CSS variables updated by JS.

### B. Hero Section
- **Content:** 
  - Status badge: `[STATUS: INSCRIPCIONES ABIERTAS]` (Monospace, glowing).
  - H1: "CREA APPS WEB DE MAPAS CON IA" (Gradient text Cyan to Emerald).
  - Subtitle: "De analista SIG a desarrollador web. Diseña, programa y despliega dashboards territoriales interactivos en la nube sin servidores dedicados. 100% OpenSource."
- **CTAs:** Primary button with Cyan neon glow (`shadow-[0_0_15px_rgba(6,182,212,0.5)]`). Secondary button with glass border.

### C. Syllabus Interactive Timeline (Stateful)
- **Spec:** 3 descriptive cards (Session 1, Session 2, Session 3).
- **Behavior:** Hovering a card triggers a state change in an adjacent `<aside>` Terminal Window.
- **Terminal Window:** A fixed block that displays monospace text mimicking console output. 
  - Default: `> SYSTEM IDLE. WAITING FOR INPUT...`
  - Hover Session 1: `> LOADING SKILLS... GEO-PROMPTING INITIATED...`
  - Hover Session 2: `> EXECUTING ON-THE-FLY SPATIAL JOINS...`
  - Hover Session 3: `> DEPLOYING DASHBOARD TO GITHUB PAGES... SUCCESS.`

### D. Pricing Section
- **Spec:** Two glass cards side-by-side.
- **Data:** Acceso General ($35.000 CLP) and Pase Estudiantes ($30.000 CLP).
- **Dynamic Element:** Inject a scarcity counter with JS `[SYSTEM ALERT: ONLY 7 SEATS REMAINING]`.

### E. Backend-less Contact Form (Web3Forms/Formspree)
- **Spec:** A semantic `<form>` element configured for asynchronous POST submission.
- **Fields:** Name, Email, Message.
- **Security:** Include a hidden honeypot field `<input type="checkbox" name="botcheck" class="hidden">`.
- **API Endpoint:** `https://api.web3forms.com/submit`. Include a hidden input for the access key: `<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">`.

## 5. JAVASCRIPT LOGIC (STATE & EVENTS)
- **Requirements:**
  1. `mousemove` listener on `window` to update `--x` and `--y` CSS variables for the background spotlight effect.
  2. `mouseenter`/`mouseleave` listeners on Syllabus cards to update the Terminal DOM element's `innerHTML`.
  3. `submit` event listener on the form:
     - `event.preventDefault()`.
     - Change submit button text to `[PROCESANDO...]` and disable it.
     - Execute `fetch()` POST request with `FormData`.
     - On `200 OK`, replace the form DOM node with a success message in green monospace text: `>> SOLICITUD RECIBIDA. REVISA TU BANDEJA DE ENTRADA.`.
     - Catch errors and display a red console-style error.

## 6. OUTPUT INSTRUCTIONS
- Output ONLY the complete, copy-pasteable HTML document starting with `<!DOCTYPE html>` and ending with `</html>`. 
- Ensure all CSS (via Tailwind utility classes and custom `<style>` for the grid/spotlight) and all JS logic is encapsulated within this single file.