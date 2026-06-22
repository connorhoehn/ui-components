# Embedding Modules

Each module in the library has its own entry point, allowing you to embed a single feature (e.g., pipeline editor) without pulling in the entire bundle. This document covers standalone setup for each module.

## Entry Points

| Module | Import Path | Primary Peer Dependencies |
|---|---|---|
| Pipelines | `@connorhoehnslalom/ui-components/pipelines` | `@xyflow/react` |
| Ingest | `@connorhoehnslalom/ui-components/ingest` | `recharts` |
| Observability | `@connorhoehnslalom/ui-components/observability` | `recharts` |
| Doc Editor | `@connorhoehnslalom/ui-components/doc-editor` | `@tiptap/react`, `yjs` |
| Social | `@connorhoehnslalom/ui-components/social` | (none beyond React) |
| Hooks | `@connorhoehnslalom/ui-components/hooks` | (none beyond React) |
| Shared | `@connorhoehnslalom/ui-components/shared` | (none beyond React) |

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
import { ThemeProvider, WebSocketProvider, IdentityProvider } from '@connorhoehnslalom/ui-components';
import { PipelineCanvas } from '@connorhoehnslalom/ui-components/pipelines';

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
import { ThemeProvider, WebSocketProvider } from '@connorhoehnslalom/ui-components';
import { IngestDashboard } from '@connorhoehnslalom/ui-components/ingest';

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
} from '@connorhoehnslalom/ui-components';
import { DocumentWorkspace } from '@connorhoehnslalom/ui-components/doc-editor';

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
import { ThemeProvider, WebSocketProvider } from '@connorhoehnslalom/ui-components';
import { MetricsPanel, TraceViewer } from '@connorhoehnslalom/ui-components/observability';

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
} from '@connorhoehnslalom/ui-components';
import { ChatPanel, PresenceAvatars } from '@connorhoehnslalom/ui-components/social';

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

Each entry point is a separate chunk in the build output. When you import from a specific path (e.g., `@connorhoehnslalom/ui-components/pipelines`), your bundler only includes that module's code plus shared utilities.

Tips for minimizing bundle size:

1. **Import from specific entry points** rather than the root `@connorhoehnslalom/ui-components` path when you only need one module.

2. **Tree shaking works** on named exports — import only the components you use:

   ```tsx
   // Good: only PipelineCanvas is bundled
   import { PipelineCanvas } from '@connorhoehnslalom/ui-components/pipelines';

   // Avoid: may pull in more than needed
   import * as Pipelines from '@connorhoehnslalom/ui-components/pipelines';
   ```

3. **Peer dependencies are not bundled.** Libraries like `@xyflow/react`, `recharts`, and `@tiptap/react` are external — they are only loaded if your app already uses them.

4. **Type-only imports have zero runtime cost:**

   ```tsx
   import type { SimulationTimeline } from '@connorhoehnslalom/ui-components/types';
   ```

## Minimal Shell Pattern

If you want to embed a module in an existing app with its own routing and state, create a thin shell component:

```tsx
import { useMemo } from 'react';
import { ThemeProvider, WebSocketProvider, IdentityProvider } from '@connorhoehnslalom/ui-components';
import type { WebSocketContextValue, IdentityContextValue } from '@connorhoehnslalom/ui-components';

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
import { PipelineCanvas } from '@connorhoehnslalom/ui-components/pipelines';

function PipelinePage() {
  return (
    <UIComponentsShell wsValue={ws} identity={user}>
      <PipelineCanvas pipelineId={params.id} />
    </UIComponentsShell>
  );
}
```
