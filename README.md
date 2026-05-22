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

## Storybook

```bash
npm run storybook
```

Opens at `http://localhost:6006`. Browse 10 seed stories covering Button, Avatar, Banner, ChannelHeader, PresenceAvatars, FileUploadDrop, NotificationCenter, AppShell, PageHeader, and CallWidget — each component in isolation with knob-driven variants.

To build a static Storybook:

```bash
npm run build-storybook
```

## Demo Site

```bash
npm install
npm run demo
```

Opens at `http://localhost:5174` with product-shaped interactive flows.

## Composing with realtime-modules hooks

Five demos in `demo/src/demos/` show how ui-components composites wire directly to
hooks from `@connorhoehn/realtime-modules` v0.7.x. Each runs in **mock mode** by
default (no gateway required) and switches to live mode when `VITE_GATEWAY_URL` is set.

| Demo route | Component | Hook |
|---|---|---|
| `/workflows/hook-chat` | `<ChatPanel>` | `useChat(channel)` |
| `/workflows/hook-presence` | `<PresencePanel>` | `usePresence(channel)` |
| `/workflows/hook-reactions` | `<ReactionButtons>` + `<ReactionsOverlay>` | `useReactions(channel)` |
| `/workflows/hook-fileupload` | `<FileUploadDrop>` | `useFileUpload(channel)` |
| `/workflows/hook-videohangout` | `<HangoutLayout>` | `useVideoHangout(channel)` |

To run a demo against a live gateway:

```bash
VITE_GATEWAY_URL=ws://localhost:4000 npm run demo
```

The mock wiring uses `GatewayContext.Provider` directly with a synthetic message bus
so no real WebSocket is needed for local development.

## Tech Stack

- React 19
- TypeScript 5.9 (strict)
- Vite 7 (library mode, multi-entry)
- Vitest + Playwright for testing
