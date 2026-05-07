# @connorhoehn/ui-components

A modular React component library for building real-time collaborative applications. Provides pipeline editors, ingest dashboards, document workspaces, observability panels, and social features — all wired through WebSocket-driven state.

## Installation

The package is published to GitHub Packages. Configure your `.npmrc` first:

```
@connorhoehn:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install:

```bash
npm install @connorhoehn/ui-components
```

### Peer Dependencies

Depending on which modules you use, install the relevant peers:

```bash
# Core (always required)
npm install react react-dom

# Pipeline editor
npm install @xyflow/react

# Document editor
npm install @tiptap/react yjs

# Observability charts
npm install recharts

# Routing (if using built-in navigation)
npm install react-router
```

## Quick Start

```tsx
import { ThemeProvider } from '@connorhoehn/ui-components';
import { PipelineCanvas } from '@connorhoehn/ui-components/pipelines';

function App() {
  return (
    <ThemeProvider preset="light">
      <PipelineCanvas pipelineId="my-pipeline" />
    </ThemeProvider>
  );
}
```

For real-time features, wrap your app in the required context providers:

```tsx
import { WebSocketProvider, IdentityProvider } from '@connorhoehn/ui-components';

function App() {
  return (
    <IdentityProvider value={identity}>
      <WebSocketProvider value={wsContext}>
        <ThemeProvider preset="light">
          {/* Your application */}
        </ThemeProvider>
      </WebSocketProvider>
    </IdentityProvider>
  );
}
```

## Available Entry Points

Each module has its own export path for tree shaking. Import only what you need:

| Entry Point | Import Path | Description |
|---|---|---|
| Main | `@connorhoehn/ui-components` | Core providers, contexts, theme |
| Pipelines | `@connorhoehn/ui-components/pipelines` | Pipeline editor and flow canvas |
| Ingest | `@connorhoehn/ui-components/ingest` | Data ingestion dashboard |
| Observability | `@connorhoehn/ui-components/observability` | Metrics, logs, trace panels |
| Doc Editor | `@connorhoehn/ui-components/doc-editor` | Collaborative document workspace |
| Social | `@connorhoehn/ui-components/social` | Chat, reactions, presence UI |
| Hooks | `@connorhoehn/ui-components/hooks` | Standalone hooks (useWebSocket, usePresence, etc.) |
| Types | `@connorhoehn/ui-components/types` | TypeScript type definitions |
| Shared | `@connorhoehn/ui-components/shared` | Shared utilities and base components |

### Per-Module Import Examples

```tsx
// Pipeline editor only
import { PipelineCanvas, NodePalette } from '@connorhoehn/ui-components/pipelines';

// Ingest dashboard only
import { IngestDashboard } from '@connorhoehn/ui-components/ingest';

// Document editor only
import { DocumentWorkspace } from '@connorhoehn/ui-components/doc-editor';

// Observability only
import { MetricsPanel, TraceViewer } from '@connorhoehn/ui-components/observability';

// Social features only
import { ChatPanel, PresenceAvatars } from '@connorhoehn/ui-components/social';

// Hooks for custom integrations
import { useWebSocket, usePresence } from '@connorhoehn/ui-components/hooks';

// Type imports (zero runtime cost)
import type { GatewayMessage, ConnectionState } from '@connorhoehn/ui-components/types';
```

## Pattern Documentation

- [WebSocket Provider](./websocket-provider.md) — Wiring the real-time connection
- [Auth Integration](./auth-integration.md) — Identity and authentication setup
- [Theming](./theming.md) — CSS custom properties and design tokens
- [Custom Renderers](./custom-renderers.md) — Extending the section renderer registry
- [Simulations](./simulations.md) — Demo simulation engine for development
- [Embedding Modules](./embedding-modules.md) — Using modules standalone
