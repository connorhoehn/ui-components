// ui-components/src/components/diagram/DiagramBlockRenderer.tsx
//
// A diagram AS A BLOCK on a page — the macro form, not a separate app.
//
// The section-renderer contract (`SectionRendererProps`) already hands a
// renderer everything a collaborative diagram needs and nothing it doesn't:
// the page's `ydoc`, the page's `provider` (hence its awareness), the block's
// `section.id`, an `editable` flag and the local `user`. So hosting a diagram
// as a block needs no new host interface at all — it is the existing block
// contract, used as intended.
//
// The `section.id` becomes the block id, which namespaces both the Y.Doc root
// type (`excalidraw:<sectionId>`) and the awareness pointers. Several diagrams
// on one page therefore share one document, one socket and one awareness
// channel without ever bleeding into each other.
//
// Registration is EXPLICIT (`registerDiagramBlock()`), not an import side
// effect. A library that mutates a global registry merely because you imported
// a type from its barrel is a debugging nightmare, and tree-shaking will
// eventually delete the side effect anyway.

import CollaborativeExcalidraw from './CollaborativeExcalidraw';
import { registerFieldType, registerRenderer } from '../../renderers/registry';
import type { SectionRendererProps } from '../../renderers/types';
import { cn } from '../../lib/cn';

/** Section type key this block registers under. */
export const DIAGRAM_BLOCK_TYPE = 'excalidraw';

export default function DiagramBlockRenderer({
    section,
    editable,
    ydoc,
    provider,
    user,
}: SectionRendererProps) {
    if (!ydoc) {
        return (
            <div
                data-testid={`diagram-block-unavailable-${section.id}`}
                className="rounded-md border border-dashed border-border-emphasis bg-surface-inset px-4 py-3.5 text-center text-[13px] text-neutral"
            >
                Diagram unavailable — this page is not connected to a shared document.
            </div>
        );
    }

    return (
        <div
            data-testid={`diagram-block-${section.id}`}
            // The explicit height is not decoration: Excalidraw measures its
            // canvas against the container, and a zero-height parent renders
            // nothing at all with no error. Hosts that want a different size
            // wrap this block in their own sized container.
            className={cn('h-[420px] w-full overflow-hidden rounded-md border border-border')}
        >
            <CollaborativeExcalidraw
                ydoc={ydoc}
                awareness={
                    (provider as { awareness?: unknown } | null)?.awareness as never
                }
                blockId={section.id}
                editable={editable}
                user={{
                    displayName: user?.name ?? 'Anonymous',
                    color: user?.color ?? '#3b82f6',
                }}
            />
        </div>
    );
}

/**
 * Register the diagram block with the section-renderer registry.
 *
 * Call once during host app startup. Idempotent.
 */
export function registerDiagramBlock(): void {
    registerFieldType({
        type: DIAGRAM_BLOCK_TYPE,
        label: 'Diagram',
        icon: '✎',
        description: 'Collaborative Excalidraw canvas embedded in the page',
        rendererKeys: {
            editor: ['excalidraw:editor'],
            ack: ['excalidraw:reader'],
            reader: ['excalidraw:reader'],
        },
        rendererLabels: {
            'excalidraw:editor': 'Diagram Editor',
            'excalidraw:reader': 'Diagram Viewer',
        },
    });
    // One component for every view mode — `editable` already carries the
    // difference, and Excalidraw's own view mode is the read-only rendering.
    registerRenderer(DIAGRAM_BLOCK_TYPE, '*', DiagramBlockRenderer);
}
