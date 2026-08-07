# AGENTS.md

## Project Overview
`spatial-ia-web` is a modern, high-aesthetic landing page for the Spatial / GIS & AI Bootcamp ("Desarrollo de Apps Territoriales con IA").

## Core Architecture
- Clean HTML5 + CSS / Tailwind aesthetic with dark mode, high-contrast typography (Inter / Mono fonts), wireframe borders, and subtle glowing micro-animations.
- Zero server backend architecture with pure client-side interactivity.

## Key Design & Safety Rules
- **Form Status Scoping**: When deactivating registration forms, ensure DOM elements and associated event listeners are properly guarded so script initialization (smooth scroll, scroll reveal, typewriter animations) never fails.
- **CTA Alignment**: Navigation, Hero, and Pricing buttons must reflect the current state of registration (e.g. "Inscripciones Cerradas").
