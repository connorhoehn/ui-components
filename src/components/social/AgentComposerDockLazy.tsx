// The root barrel's `AgentComposerDock`: the same component behind a lazy
// boundary.
//
// The dock IS a `RichChatComposer`, which statically needs the tiptap mention
// stack (`@tiptap/extension-mention`, `@tiptap/pm`) — optional peers the root
// entry reaches only dynamically today (through the presentation editor's
// agent box). Importing the dock statically from the root would make every
// `import { Button } from '@connorhoehnslalom/ui-components'` need them on
// disk. So the root gets this wrapper, and `…/social/rich-composer` — the
// subpath whose import already declares the peers — exports the real one.
// Same props, same behaviour; this one renders nothing until the chunk loads.

import { lazy, Suspense } from 'react';
import type { AgentComposerDockProps } from './AgentComposerDock';

const Dock = lazy(() => import('./AgentComposerDock').then((m) => ({ default: m.AgentComposerDock })));

export function AgentComposerDock(props: AgentComposerDockProps) {
  return (
    <Suspense fallback={null}>
      <Dock {...props} />
    </Suspense>
  );
}
