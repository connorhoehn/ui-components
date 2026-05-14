# @connorhoehn/ui-components

React component library for building real-time collaborative applications with video streaming, node-based editors, and WebSocket-driven UIs.

## Quick Start

```bash
npm install @connorhoehn/ui-components
```

```tsx
import { VideoPlayer, VideoGrid, ReactionOverlay } from '@connorhoehn/ui-components/components/video';
```

## Components

- **Agents** — AG-UI streaming chat, reasoning blocks, tool-call renderer, agent registry, A2A flow canvas. See [`src/components/agents/README.md`](src/components/agents/README.md).
- **Video** — Player, participant grid, reactions, stream stats, network quality badges
- **Collaboration** — Presence panels, multi-mode cursors, activity feeds, avatar stacks
- **Node Editor** — Composable graph components for workflow/pipeline UIs
- **Forms & Inputs** — Text fields, selects, toggles, sliders
- **Buttons** — Primary, secondary, icon buttons with variants
- **Feedback** — Toasts, alerts, progress indicators
- **Data Display** — Tables, cards, badges, metrics
- **Layout** — Panels, sidebars, split views

## Demo Site

```bash
npm install
npm run dev:demo
```

Opens at `http://localhost:5174` with live component docs and interactive demo pages.

## Tech Stack

- React 19
- TypeScript 5.9 (strict)
- Vite 7 (library mode, multi-entry)
- Vitest + Playwright for testing
