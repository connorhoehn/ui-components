# @connorhoehnslalom/ui-components

A React component library and set of page templates used by Connor Hoehn's
realtime apps. It is built on Tailwind v4 design tokens and ships composites for
chat, presence, calls, documents, work items, pipelines, search and graphs, plus
adapters that wire those composites to the hooks in `@connorhoehn/realtime-modules`.

## What's in the repo

- `src/components/` - the components, one folder per domain (`shared`, `social`,
  `video`, `doc-editor`, `pipelines`, `graph`, `search`, `work`, ...). Many
  folders have their own README.
- `src/integrations/` - adapters and wrapped components for `@connorhoehn/realtime-modules`.
- `src/styles.css` - the Tailwind v4 `@theme` tokens every component uses.
- `demo/` - the demo site, with a mock mode that needs no gateway.
- `tests/` - Playwright end-to-end and Storybook tests. Unit tests sit beside the code.
- `docs/` - adoption and integration guides. `patterns/` - recipes for common setups.
- `skills/ui-dom-audit/` - a DOM audit tool shipped with the package.
- `dist/` - the built output, committed so a git install works without a toolchain.

## Getting started

### Using the library

The package is not on the public npm registry. Consumers install it as a packed
tarball (`npm pack`, then a `file:` dependency) or as a git dependency pinned to
a commit.

```bash
npm install ./connorhoehnslalom-ui-components-<version>.tgz
```

`@connorhoehn/realtime-modules` is a peer dependency, required only by the
`integrations/*` entry points. Most other peers (Tiptap, Yjs, `@xyflow/react`,
`recharts`, `hls.js`, ...) are optional and only needed for the entry points that
use them. Import the stylesheet once in your app:

```tsx
import { AppShell, ChatPanel, PresenceAvatars } from '@connorhoehnslalom/ui-components';
import '@connorhoehnslalom/ui-components/styles.css';
```

### Developing the library

Use Node 20.19+ or 22.12+.

```bash
npm install
npm run dev               # vite build --watch
npm run build             # library build for every entry point
npm test                  # vitest
npm run lint              # type-check src and demo
npm run demo              # demo site on http://localhost:5174
npm run storybook         # Storybook on http://localhost:6006
npm run test:e2e          # Playwright end-to-end tests
npm run test:e2e:storybook
npm pack                  # tarball for a consumer to install
```

Repo guards, each enforcing a rule the type checker cannot:

```bash
npm run lint:static-styles   # no new static inline styles
npm run lint:hex-colors      # no arbitrary hex colours; use tones and tokens
npm run lint:node-controls   # form controls come from the forms components
npm run lint:readme          # README imports must exist
npm run snapshot:exports     # refresh the public export snapshot
```

Conventions: style with Tailwind classes composed through `cn()` and the tokens in
`src/styles.css`, not inline `style`; give every exported component a test and a story.

## Entry points

The `exports` map in `package.json` is the public surface:

- `.` - primitives, layout (`AppShell`, `AppLayout`), hooks, social, video, identity, work and search
- `/shared`, `/hooks`, `/types`, `/identity`, `/social`, `/video`, `/graph`
- `/social/rich-composer` - the rich chat and context composer (needs the Tiptap peers)
- `/doc-editor`, `/doc-types`, `/diagram` - collaborative documents, document types, Excalidraw diagrams
- `/pipelines`, `/ingest`, `/observability`, `/agents`, `/compute`
- `/video-ivs` - the AWS IVS implementation of the video primitives
- `/integrations/realtime-modules` - adapters bound to `@connorhoehn/realtime-modules` by name
- `/integrations/realtime` - the same adapters without a runtime import; you pass in the hooks
- `/styles.css` - Tailwind v4 tokens and keyframes

There is no `/layout` subpath; layout components come from the root.

## Related repositories

- `connorhoehn/realtime-modules` - the peer dependency: gateway server, client hooks, video.
- `connorhoehnslalom/aws-agentcore` - consumes the library in its portal.
- `connorhoehn/realtime-examples` - example apps that consume it.
- `connorhoehn/live-video-streaming` - another consumer.
- `connorhoehnslalom/event-catalog` - another consumer.

## Documentation

- [`docs/consumer-adoption.md`](docs/consumer-adoption.md) - which composite to reach for, with before/after examples.
- [`docs/integrations-realtime-modules.md`](docs/integrations-realtime-modules.md) - the realtime-modules adapter layer.
- [`docs/integrations/document-workspace.md`](docs/integrations/document-workspace.md) - the shared document workspace.
- [`docs/chat-draft-continuity.md`](docs/chat-draft-continuity.md) - controlled drafts and privacy for the rich composer.
- [`docs/bundle-side-effects.md`](docs/bundle-side-effects.md) - why `sideEffects` is not declared.
- [`patterns/`](patterns/README.md) - theming, websocket provider, auth, custom renderers, embedding, simulations.
- [`CHANGELOG.md`](CHANGELOG.md) - release history.
- Component READMEs live next to the code, for example [`src/components/shared`](src/components/shared/README.md).
