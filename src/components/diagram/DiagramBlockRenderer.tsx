// ui-components/src/components/diagram/DiagramBlockRenderer.tsx
//
// A diagram AS A BLOCK on a page — the thing a `macro:diagram` fence draws.
//
// ## What this used to be, and why it changed
//
// This component was written against `SectionRendererProps` and registered
// itself into the section-renderer registry with `registerRenderer`. Nothing
// ever called that registration, so the whole file was unreachable — and the
// registry it aimed at is the LEGACY sectioned-document world, which already
// ships a `diagram` section type of its own (`src/renderers/diagram`). Two
// registry entries for the same idea, neither reached from a canvas.
//
// So the registration is gone rather than wired: an uncalled `registerRenderer`
// is precisely how this ended up an orphan, and adding a call would have made a
// second diagram block on the surface that is being retired. The component now
// takes the props a diagram actually needs and is mounted by the canvas macro
// node view (`DiagramMacro.tsx`), which is a real caller in a real document.
//
// ## What it needs, and why that is all
//
// The PAGE owns one Y.Doc, one socket and one awareness channel. A diagram
// block is a namespaced subtree of that document (`excalidraw:<diagramId>`), so
// several diagrams on one page share the transport and never bleed into each
// other. Nothing here opens a connection.

import CollaborativeExcalidraw from './CollaborativeExcalidraw';
import type { AwarenessLike } from '@connorhoehn/realtime-modules/adapters/excalidraw';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';

/** Local identity, as the diagram's awareness pointers should label it. */
export interface DiagramBlockUser {
    name: string;
    color: string;
    userId?: string;
}

export interface DiagramBlockProps {
    /**
     * The diagram's id — the reference the macro body carries.
     *
     * `null` means the macro's YAML no longer says anything readable (a CRDT
     * merge of two concurrent rewrites can do that). The block then shows the
     * source instead of inventing an id, because inventing one would silently
     * start a SECOND, empty diagram and lose the first.
     */
    diagramId: string | null;
    /** The macro's literal body, shown when `diagramId` is null. */
    source?: string;
    /** The page's shared document. Null when the page is not connected. */
    ydoc: unknown;
    /** Awareness from the provider that owns `ydoc`, for live pointers. */
    awareness?: AwarenessLike | null;
    /**
     * False renders Excalidraw in view mode AND drops every local write — see
     * `ExcalidrawCanvas`. It is not a toolbar toggle.
     */
    editable?: boolean;
    user: DiagramBlockUser;
    /** Where Excalidraw loads its fonts from, e.g. `/excalidraw-assets/`. */
    assetPath?: string;
    /**
     * Removes the whole block from the page.
     *
     * Its absence is what makes the block read-only-shaped: with no contentDOM
     * the node view swallows its own events, so a click cannot select the node
     * and a backspace cannot reach it. An embedded object a reader can never
     * delete is a bug, so the editing host passes this and the header renders
     * the one affordance that removes it.
     */
    onRemove?: () => void;
    'data-testid'?: string;
}

export default function DiagramBlockRenderer({
    diagramId,
    source = '',
    ydoc,
    awareness,
    editable = true,
    user,
    assetPath,
    onRemove,
    'data-testid': testId,
}: DiagramBlockProps) {
    const id = testId ?? `diagram-block-${diagramId ?? 'unreadable'}`;

    // Checked BEFORE the connection: an unreadable payload is a fact about the
    // document and stays true offline, while "not connected" is a fact about
    // right now. Reporting the transient one first would hide the permanent one
    // behind a reconnect that fixes nothing.
    if (!diagramId) {
        // The honest failure. The bytes are on screen, obviously different, and
        // recoverable by hand — never a blank space where a picture was.
        return (
            <div
                data-testid={`${id}-unreadable`}
                className="rounded-md border border-dashed border-warning-border bg-warning-bg px-4 py-3 text-[13px] text-warning-fg"
            >
                <p className="mb-1.5 font-semibold">This diagram block no longer names a diagram.</p>
                <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs">{source}</pre>
            </div>
        );
    }

    if (!ydoc) {
        return (
            <div
                data-testid={`${id}-unavailable`}
                className="rounded-md border border-dashed border-border-emphasis bg-surface-inset px-4 py-3.5 text-center text-[13px] text-neutral"
            >
                Diagram unavailable — this page is not connected to a shared document.
            </div>
        );
    }

    return (
        <div data-testid={id} data-diagram-id={diagramId} className="my-3">
            {/* Chrome for the block, not for the picture. The label is what
                tells a reader the grey rectangle is a diagram before it has
                finished loading 1.9MB of editor. */}
            <div className="flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                    Diagram
                </span>
                {editable && onRemove && (
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={onRemove}
                        data-testid={`${id}-remove`}
                    >
                        Remove
                    </Button>
                )}
            </div>
            <div
                // The explicit height is not decoration: Excalidraw measures its
                // canvas against the container, and a zero-height parent renders
                // nothing at all with no error.
                className={cn('h-[420px] w-full overflow-hidden rounded-b-md border border-border')}
            >
                <CollaborativeExcalidraw
                    ydoc={ydoc as never}
                    awareness={awareness ?? null}
                    blockId={diagramId}
                    editable={editable}
                    {...(assetPath ? { assetPath } : {})}
                    user={{
                        displayName: user.name || 'Anonymous',
                        color: user.color || '#3b82f6',
                        ...(user.userId ? { userId: user.userId } : {}),
                    }}
                />
            </div>
        </div>
    );
}
