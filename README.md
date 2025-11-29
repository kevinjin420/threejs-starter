# Three.js Astro React Starter

A modern starter template for building interactive web experiences with Astro, React, Three.js (via React Three Fiber), GSAP, and Lenis for smooth scrolling. Optimized for performance and SEO.

## Features

*   **Astro:** For fast, SEO-friendly static sites.
*   **React (with R3F):** For building interactive UI components and managing Three.js scenes.
*   **Three.js / React Three Fiber (R3F):** High-performance 3D graphics in the browser.
*   **GSAP:** Powerful animation library for UI and 3D animations.
*   **Lenis:** Smooth scroll library for enhanced user experience.
*   **Tailwind CSS:** For rapid UI development and styling.
*   **Zustand:** Simple state management for React components.
*   **Basic SEO:** Configured via `astro-seo`.

## Getting Started

This project is compatible with [Bun](https://bun.sh/), [npm](https://www.npmjs.com/), and other JavaScript package managers. The examples below use Bun, but you can substitute your preferred package manager.

### Installation

```bash
bun install
```

### Development Server

```bash
bun run dev
```

### Build for Production

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## Project Structure

*   **`src/pages/`**: Contains Astro page components. `index.astro` is the entry point, defining the HTML structure and content sections.
*   **`src/layouts/`**: Layout components. `Layout.astro` provides the common HTML shell (head, meta tags, body).
*   **`src/components/`**: React components.
    *   **`SceneManager.jsx`**: The bridge between DOM and WebGL. Handles Lenis initialization, GSAP integration, and renders the 3D scene.
    *   **`webgl/`**: Contains the React Three Fiber 3D scene logic.
*   **`src/lib/`**: Utility libraries, including the Zustand store (`store.js`) for state management.
*   **`src/hooks/`**: Custom React hooks, such as `useScroll` for binding 3D updates to scroll position.
*   **`src/styles/`**: Global SCSS/CSS files.
