# @connorhoehnslalom/ui-components

A modular React component library for building real-time collaborative applications. Provides pipeline editors, ingest dashboards, document workspaces, observability panels, and social features — all wired through WebSocket-driven state.

## Installation

The package is published to GitHub Packages. Configure your `.npmrc` first:

```
@connorhoehn:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install:

```bash
npm install @connorhoehnslalom/ui-components
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
import { ThemeProvider } from '@connorhoehnslalom/ui-components';
import { PipelineCanvas } from '@connorhoehnslalom/ui-components/pipelines';

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
import { WebSocketProvider, IdentityProvider } from '@connorhoehnslalom/ui-components';

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
| Main | `@connorhoehnslalom/ui-components` | Core providers, contexts, theme |
| Pipelines | `@connorhoehnslalom/ui-components/pipelines` | Pipeline editor and flow canvas |
| Ingest | `@connorhoehnslalom/ui-components/ingest` | Data ingestion dashboard |
| Observability | `@connorhoehnslalom/ui-components/observability` | Metrics, logs, trace panels |
| Doc Editor | `@connorhoehnslalom/ui-components/doc-editor` | Collaborative document workspace |
| Social | `@connorhoehnslalom/ui-components/social` | Chat, reactions, presence UI |
| Hooks | `@connorhoehnslalom/ui-components/hooks` | Standalone hooks (useWebSocket, usePresence, etc.) |
| Types | `@connorhoehnslalom/ui-components/types` | TypeScript type definitions |
| Shared | `@connorhoehnslalom/ui-components/shared` | Shared utilities and base components |

### Per-Module Import Examples

```tsx
// Pipeline editor only
import { PipelineCanvas, NodePalette } from '@connorhoehnslalom/ui-components/pipelines';

// Ingest dashboard only
import { IngestDashboard } from '@connorhoehnslalom/ui-components/ingest';

// Document editor only
import { DocumentWorkspace } from '@connorhoehnslalom/ui-components/doc-editor';

// Observability only
import { MetricsPanel, TraceViewer } from '@connorhoehnslalom/ui-components/observability';

// Social features only
import { ChatPanel, PresenceAvatars } from '@connorhoehnslalom/ui-components/social';

// Hooks for custom integrations
import { useWebSocket, usePresence } from '@connorhoehnslalom/ui-components/hooks';

// Type imports (zero runtime cost)
import type { GatewayMessage, ConnectionState } from '@connorhoehnslalom/ui-components/types';
```

## Pattern Documentation

- [WebSocket Provider](./websocket-provider.md) — Wiring the real-time connection
- [Auth Integration](./auth-integration.md) — Identity and authentication setup
- [Theming](./theming.md) — CSS custom properties and design tokens
- [Custom Renderers](./custom-renderers.md) — Extending the section renderer registry
- [Simulations](./simulations.md) — Demo simulation engine for development
- [Embedding Modules](./embedding-modules.md) — Using modules standalone
