import { Awareness } from 'y-protocols/awareness';
import { AwarenessLike } from '@connorhoehn/realtime-modules/adapters/excalidraw';
import { JSX } from 'react';
import { RefObject } from 'react';
import { XmlFragment } from 'yjs';
import type * as Y from 'yjs';

/** Minimal provider shape needed by awareness. */
declare interface CollaborationProvider {
    awareness: Awareness;
}

export declare function CollaborativeExcalidraw(props: CollaborativeExcalidrawProps): JSX.Element;

/**
 * Bootstrap mode — the component owns the whole collaboration stack.
 *
 * Point it at a gateway and a diagram id and it builds the WebSocket, the
 * Y.Doc and the provider itself. Callers never construct a provider stack by
 * hand; that complexity is this library's job to absorb.
 */
export declare interface CollaborativeExcalidrawBootstrapProps extends SharedDiagramProps {
    /** Gateway WebSocket URL, e.g. `wss://gateway.example.com/ws`. */
    gatewayUrl: string;
    /**
     * Diagram id. Subscribes to `doc:${diagramId}`.
     *
     * The gateway caps channel names at 50 characters and allows only
     * `[a-zA-Z0-9_:-]`, so the id must be <= 46 chars with no dots or slashes.
     * A raw UUID fits.
     */
    diagramId: string;
    /** Bearer-style token forwarded as Sec-WebSocket-Protocol. May be ''. */
    authToken: string;
    /**
     * Wait for the server's first snapshot before mounting the canvas.
     *
     * Unlike the text editor, a cold open here is not corrupting — a CRDT
     * merges early strokes with the server state rather than fighting it. So
     * this defaults to false, and is offered for hosts that would simply
     * rather show a spinner than a scene that fills in.
     */
    requireSync?: boolean;
    /** Shown while the Y.Doc is still being built. */
    loadingSlot?: React.ReactNode;
    ydoc?: undefined;
    awareness?: undefined;
}

/**
 * Hosted mode — the caller already has a Y.Doc.
 *
 * This is the mode a page/canvas host uses: the PAGE owns one Y.Doc and one
 * WebSocket, and each diagram block is a namespaced subtree of it.
 */
export declare interface CollaborativeExcalidrawHostedProps extends SharedDiagramProps {
    ydoc: Y.Doc;
    /**
     * Awareness from the same provider that owns `ydoc`. Pass
     * `provider.awareness`. Omit only if you genuinely want no live pointers.
     */
    awareness?: AwarenessLike | null;
    gatewayUrl?: undefined;
    diagramId?: undefined;
    authToken?: undefined;
}

export declare type CollaborativeExcalidrawProps = CollaborativeExcalidrawHostedProps | CollaborativeExcalidrawBootstrapProps;

/** A flat comment as stored in Y.js. */
declare interface CommentData {
    id: string;
    text: string;
    userId: string;
    displayName: string;
    color: string;
    timestamp: string;
    parentCommentId: string | null;
    resolved?: boolean;
    resolvedBy?: string;
    resolvedAt?: string;
}

/** A comment with nested replies, assembled client-side. */
declare interface CommentThread extends CommentData {
    replies: CommentThread[];
}

/** Section type key this block registers under. */
export declare const DIAGRAM_BLOCK_TYPE = "excalidraw";

export declare function DiagramBlockRenderer({ section, editable, ydoc, provider, user, }: SectionRendererProps): JSX.Element;

export declare interface DiagramUser {
    /** Stable identity (Cognito sub). Used to label your cursor for peers. */
    userId?: string;
    displayName: string;
    color: string;
}

/** Props of the lazily-loaded canvas — always fully resolved by this point. */
export declare interface ExcalidrawCanvasProps extends SharedDiagramProps {
    ydoc: Y.Doc | null;
    awareness?: AwarenessLike | null;
}

declare interface Participant {
    clientId: string;
    userId: string;
    displayName: string;
    color: string;
    mode: 'editor' | 'reviewer' | 'reader';
    currentSectionId: string | null;
    lastSeen?: number;
    idle?: boolean;
}

/**
 * Register the diagram block with the section-renderer registry.
 *
 * Call once during host app startup. Idempotent.
 */
export declare function registerDiagramBlock(): void;

export declare type ResolvedTheme = 'light' | 'dark';

declare interface Section {
    id: string;
    type: 'summary' | 'tasks' | 'decisions' | 'notes' | 'custom';
    title: string;
    collapsed: boolean;
    items: TaskItem[];
    sectionType?: string;
    metadata?: Record<string, unknown>;
    placeholder?: string;
}

declare interface SectionRendererProps {
    section: Section;
    viewMode: ViewMode;
    editable: boolean;
    fragment?: XmlFragment | null;
    ydoc?: Y.Doc | null;
    provider?: CollaborationProvider | null;
    user?: {
        name: string;
        color: string;
    };
    onUpdateSection?: (patch: Partial<Section>) => void;
    onAddItem?: (item: Omit<TaskItem, 'id'>) => void;
    onUpdateItem?: (itemId: string, patch: Partial<TaskItem>) => void;
    onRemoveItem?: (itemId: string) => void;
    participants?: Participant[];
    onUpdateCursorInfo?: (name: string, color: string) => void;
    comments?: CommentThread[];
    commentCount?: number;
    onOpenComments?: (sectionId: string) => void;
    onNavigateToEditor?: (sectionId: string) => void;
}

export declare interface SharedDiagramProps {
    /**
     * Which diagram this is within its Y.Doc.
     *
     * Omit for a standalone diagram that owns its whole document. Pass a
     * stable block id (a section id, a macro id) when the diagram is one of
     * several on a page — it namespaces both the Y.Doc root type and the
     * awareness pointers, so two diagrams on one page never bleed into each
     * other.
     */
    blockId?: string;
    user: DiagramUser;
    /** False renders Excalidraw in view mode and stops all local writes. */
    editable?: boolean;
    className?: string;
    /**
     * Where Excalidraw loads its fonts from, e.g. `/excalidraw-assets/`.
     *
     * Unset, Excalidraw falls back to a public CDN. Hosts that want to stay
     * offline-clean copy the font files out of the package and point here.
     */
    assetPath?: string;
    /** Fires with the element count after every local scene change. */
    onSceneChange?: (elementCount: number) => void;
}

declare interface TaskItem {
    id: string;
    text: string;
    status: 'pending' | 'acked' | 'done' | 'rejected';
    assignee: string;
    ackedBy: string;
    ackedAt: string;
    priority: 'low' | 'medium' | 'high';
    notes: string;
    dueDate?: string;
    category?: string;
}

/**
 * The theme currently in force for `ref`'s subtree, kept live.
 *
 * Re-reads on any `data-theme` mutation anywhere in the document (the
 * attribute can be set on <html> or on any ancestor) and on OS theme changes.
 */
export declare function useResolvedTheme(ref: RefObject<Element | null>): ResolvedTheme;

declare type ViewMode = 'editor' | 'ack' | 'reader';

export { }
