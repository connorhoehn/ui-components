// The root barrel's `ContextComposer`: the same component behind a lazy
// boundary, for the reason `AgentComposerDockLazy.tsx` gives — it IS a
// RichChatComposer, whose tiptap mention stack (optional peers) the root entry
// must not need statically. `…/social/rich-composer` exports the real one.
// Same props, same behaviour; this one renders nothing until the chunk loads.

import { lazy, Suspense } from 'react';
import type { ContextComposerProps } from './ContextComposer';

const Composer = lazy(() => import('./ContextComposer').then((m) => ({ default: m.ContextComposer })));

export function ContextComposer(props: ContextComposerProps) {
  return (
    <Suspense fallback={null}>
      <Composer {...props} />
    </Suspense>
  );
}
