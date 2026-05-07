# Embedding Modules

Each module in the library has its own entry point, allowing you to embed a single feature (e.g., pipeline editor) without pulling in the entire bundle. This document covers standalone setup for each module.

## Entry Points

| Module | Import Path | Primary Peer Dependencies |
|---|---|---|
| Pipelines | `@connorhoehn/ui-components/pipelines` | `@xyflow/react` |
| Ingest | `@connorhoehn/ui-components/ingest` | `recharts` |
| Observability | `@connorhoehn/ui-components/observability` | `recharts` |
| Doc Editor | `@connorhoehn/ui-components/doc-editor` | `@tiptap/react`, `yjs` |
| Social | `@connorhoehn/ui-components/social` | (none beyond React) |
| Hooks | `@connorhoehn/ui-components/hooks` | (none beyond React) |
| Shared | `@connorhoehn/ui-components/shared` | (none beyond React) |

All modules require `react` (^19.0.0) and `react-dom` (^19.0.0) as peer dependencies.

## Provider Requirements Per Module

Not every module needs every context. Here is what each module requires:

| Module | ThemeProvider | WebSocketProvider | IdentityProvider | PresenceProvider |
|---|---|---|---|---|
| Pipelines | Recommended | Required | Required | Optional |
| Ingest | Recommended | Required | Optional | No |
| Observability | Recommended | Required | Optional | No |
| Doc Editor | Recommended | Required | Required | Required |
| Social | Recommended | Required | Required | Required |
| Hooks | No | No (hooks create their own) | No | No |
| Shared | Recommended | No | No | No |

"Recommended" means the module uses CSS variables from the theme system; it will render with browser defaults if no ThemeProvider is present, but will not look correct.

## Pipeline Editor Standalone

```tsx
import { ThemeProvider, WebSocketProvider, IdentityProvider } from '@connorhoehn/ui-components';
import { PipelineCanvas } from '@connorhoehn/ui-components/pipelines';

function PipelineApp() {
  return (
    <IdentityProvider value={identity}>
      <WebSocketProvider value={wsContext}>
        <ThemeProvider preset="light">
          <div style={{ width: '100vw', height: '100vh' }}>
            <PipelineCanvas pipelineId="pipeline-001" />
          </div>
        </ThemeProvider>
      </WebSocketProvider>
    </IdentityProvider>
  );
}
```

Required peer dependencies:

```bash
npm install react react-dom @xyflow/react
```

## Ingest Dashboard Standalone

```tsx
import { ThemeProvider, WebSocketProvider } from '@connorhoehn/ui-components';
import { IngestDashboard } from '@connorhoehn/ui-components/ingest';

function IngestApp() {
  return (
    <WebSocketProvider value={wsContext}>
      <ThemeProvider preset="light">
        <IngestDashboard />
      </ThemeProvider>
    </WebSocketProvider>
  );
}
```

Required peer dependencies:

```bash
npm install react react-dom recharts
```

## Document Workspace Standalone

The document editor requires all providers because it supports real-time collaboration with presence and cursors:

```tsx
import {
  ThemeProvider,
  WebSocketProvider,
  IdentityProvider,
  PresenceProvider,
} from '@connorhoehn/ui-components';
import { DocumentWorkspace } from '@connorhoehn/ui-components/doc-editor';

function DocApp() {
  return (
    <IdentityProvider value={identity}>
      <WebSocketProvider value={wsContext}>
        <PresenceProvider value={presenceContext}>
          <ThemeProvider preset="light">
            <DocumentWorkspace documentId="doc-001" />
          </ThemeProvider>
        </PresenceProvider>
      </WebSocketProvider>
    </IdentityProvider>
  );
}
```

Required peer dependencies:

```bash
npm install react react-dom @tiptap/react @tiptap/starter-kit yjs
```

## Observability Standalone

```tsx
import { ThemeProvider, WebSocketProvider } from '@connorhoehn/ui-components';
import { MetricsPanel, TraceViewer } from '@connorhoehn/ui-components/observability';

function ObservabilityApp() {
  return (
    <WebSocketProvider value={wsContext}>
      <ThemeProvider preset="dark">
        <MetricsPanel />
        <TraceViewer traceId="trace-abc" />
      </ThemeProvider>
    </WebSocketProvider>
  );
}
```

Required peer dependencies:

```bash
npm install react react-dom recharts
```

## Social Features Standalone

```tsx
import {
  ThemeProvider,
  WebSocketProvider,
  IdentityProvider,
  PresenceProvider,
} from '@connorhoehn/ui-components';
import { ChatPanel, PresenceAvatars } from '@connorhoehn/ui-components/social';

function SocialApp() {
  return (
    <IdentityProvider value={identity}>
      <WebSocketProvider value={wsContext}>
        <PresenceProvider value={presenceContext}>
          <ThemeProvider preset="light">
            <PresenceAvatars />
            <ChatPanel channel="general" />
          </ThemeProvider>
        </PresenceProvider>
      </WebSocketProvider>
    </IdentityProvider>
  );
}
```

Required peer dependencies:

```bash
npm install react react-dom
```

## Bundle Size Considerations

Each entry point is a separate chunk in the build output. When you import from a specific path (e.g., `@connorhoehn/ui-components/pipelines`), your bundler only includes that module's code plus shared utilities.

Tips for minimizing bundle size:

1. **Import from specific entry points** rather than the root `@connorhoehn/ui-components` path when you only need one module.

2. **Tree shaking works** on named exports — import only the components you use:

   ```tsx
   // Good: only PipelineCanvas is bundled
   import { PipelineCanvas } from '@connorhoehn/ui-components/pipelines';

   // Avoid: may pull in more than needed
   import * as Pipelines from '@connorhoehn/ui-components/pipelines';
   ```

3. **Peer dependencies are not bundled.** Libraries like `@xyflow/react`, `recharts`, and `@tiptap/react` are external — they are only loaded if your app already uses them.

4. **Type-only imports have zero runtime cost:**

   ```tsx
   import type { SimulationTimeline } from '@connorhoehn/ui-components/types';
   ```

## Minimal Shell Pattern

If you want to embed a module in an existing app with its own routing and state, create a thin shell component:

```tsx
import { useMemo } from 'react';
import { ThemeProvider, WebSocketProvider, IdentityProvider } from '@connorhoehn/ui-components';
import type { WebSocketContextValue, IdentityContextValue } from '@connorhoehn/ui-components';

interface UIComponentsShellProps {
  children: React.ReactNode;
  wsValue: WebSocketContextValue;
  identity: IdentityContextValue;
  darkMode?: boolean;
}

/**
 * Reusable shell that sets up all required providers for any ui-components module.
 */
export function UIComponentsShell({ children, wsValue, identity, darkMode }: UIComponentsShellProps) {
  return (
    <IdentityProvider value={identity}>
      <WebSocketProvider value={wsValue}>
        <ThemeProvider preset={darkMode ? 'dark' : 'light'}>
          {children}
        </ThemeProvider>
      </WebSocketProvider>
    </IdentityProvider>
  );
}
```

Then use it wherever you embed a module:

```tsx
import { UIComponentsShell } from './UIComponentsShell';
import { PipelineCanvas } from '@connorhoehn/ui-components/pipelines';

function PipelinePage() {
  return (
    <UIComponentsShell wsValue={ws} identity={user}>
      <PipelineCanvas pipelineId={params.id} />
    </UIComponentsShell>
  );
}
```
