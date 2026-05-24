<div align="center">
  <img src="https://img.shields.io/badge/STATUS-INSCRIPCIONES_ABIERTAS-06b6d4?style=for-the-badge&logo=appveyor" alt="Status" />
  <img src="https://img.shields.io/badge/ARCHITECTURE-ZERO_SERVER-10b981?style=for-the-badge" alt="Architecture" />
  <img src="https://img.shields.io/badge/STACK-VANILLA_JS_%2B_TAILWIND-f8fafc?style=for-the-badge&color=09090b" alt="Stack" />

  <br><br>
  
  <h1 align="center">Geo-IA Web Apps Landing Page 🌐🤖</h1>
  
  <p align="center">
    <strong>De analista SIG a desarrollador web. Diseña, programa y despliega dashboards territoriales interactivos en la nube sin servidores dedicados. 100% OpenSource.</strong>
  </p>
</div>

<hr>

## 🚀 Vision

This repository contains the source code for the landing page of the **"Desarrollo de Aplicaciones Web Territoriales Asistido con IA"** bootcamp. 

Embracing the core philosophy of the bootcamp itself, this landing page is built as a **Zero-Server, Single-File SPA**. It requires zero build steps, zero complex dependencies, and runs directly in the browser, leveraging the power of modern CSS and Vanilla JavaScript.

The design aesthetics follow a **Cyberpunk / Retro-Tech / Glassmorphism** pattern: deep space tones (`#09090b`), cyan neon glows (`#06b6d4`), emerald success states (`#10b981`), and strict monospace typography for technical data.

## 🛠️ Technical Specifications

- **Architecture**: Single-file SPA (`index.html`).
- **Styling**: Tailwind CSS (via CDN) + Custom pure CSS properties.
- **Interactivity**: Vanilla ES6+ Javascript.
- **Form Handling**: Asynchronous POST requests via FormSubmit (backend-less).
- **Background**: Dynamic CSS grid overlay + Mouse-tracking radial gradient spotlight computed on the fly.
- **State Management**: Reactive DOM updates driven by event listeners (No heavy frameworks).

## 📂 Project Structure

```text
spatial_ia_code/
├── index.html             # The core application (HTML structure, CSS styles, JS logic)
├── plan.md                # Original technical specification document
├── implementacion.md      # Phased implementation plan and agent assignments
└── README.md              # You are here.
```

## 🧠 The Syllabus Engine

The core interaction of the page revolves around the **Syllabus Timeline**. Hovering over different session cards actively triggers state changes in a simulated terminal environment, mimicking console outputs for operations like *Geo-Prompting*, *On-the-fly Spatial Joins*, and *Deployments*.

## ⚡ Form Integration

The contact/registration form is wired to operate without a dedicated backend. It intercepts the submit event, manages loading states, and asynchronously fires a `POST` request to `FormSubmit` (or Web3Forms), validating data and preventing page reloads.

## 🔗 Deployment

This project is perfectly suited for static hosting environments such as **GitHub Pages**, Netlify, or Vercel. 
To deploy manually:
1. Clone the repository.
2. Serve the `index.html` file using any standard static file server (e.g., `npx serve`, Python `http.server`, or directly in the browser).

---

<div align="center">
  <i>"El futuro de los Sistemas de Información Geográfica no reside en el software de escritorio corporativo, sino en la web reactiva impulsada por IA."</i>
</div>
