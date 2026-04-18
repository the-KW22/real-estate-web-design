# Brickly — Luxury Real Estate Website

A modern, fully responsive luxury real estate website built for the San Francisco Bay Area market. Designed with a premium glassmorphism aesthetic, smooth scroll, and rich content sections.

## Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (`motion/react`) — scroll-triggered animations & counter effects
- **Lenis** — smooth scroll
- **Lucide React** — icons
- **Vite** — build tooling

## Features

- **Hero** — fullscreen video background with glassmorphism card, responsive navbar, mobile hamburger menu
- **About** — animated stat counters (count-up on scroll), team cards with grayscale-to-color hover
- **Properties** — filterable listing grid (All / For Sale / For Rent) over a parallax background image
- **Agents** — featured agent spotlight + supporting agent cards with stats and area tags
- **Blog** — bento-style editorial grid with 6 posts across 2 rows
- **Footer** — dark branded footer with navigation columns, contact info, and social links

## Getting Started

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`

## Project Structure

```
src/
  App.tsx        # All sections and components
  index.css      # Global styles
public/
  *.jpg / *.mp4  # Local media assets
```

## Design System

- **Background (dark):** `#0c0d11`
- **Background (light):** `#fafaf8` / `#ffffff`
- **Text (dark):** `#0f0f0f`
- **Accent:** Amber, Sky, Violet, Rose blobs at low opacity
- **Border radius:** `rounded-[24px]` – `rounded-[36px]` throughout
- **Sections alternate** between dark (hero, properties, footer) and light (about, agents, blog)
