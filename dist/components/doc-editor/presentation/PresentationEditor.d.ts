import { type OlderRevisions } from '../revisionPicker';
import { type ReactNode } from 'react';
import type { PresenceUser } from '../../shared/PresenceAvatars';
import { type PresentationSourceOption } from './SlideSources';
import type { PresentationInstructScope } from './PresentationAgentComposer';
import { type DeckSlide, type DeckSpec } from './deckSpec';
export type { PresentationInstructScope } from './PresentationAgentComposer';
/** What the host's agent says it did. */
export interface PresentationInstructResult {
    /** One line, shown under the composer. */
    summary: string;
    /** Slides the edit touched; the rail marks them until the next instruction. */
    changedSlideIds?: string[];
}
export interface PresentationInstructContext {
    /** Present when `scope` is 'slide': the slide on the stage. */
    slideId?: string;
    scope: PresentationInstructScope;
}
/** One rendered slide image, as `POST /api/deck/preview` returns it. */
export interface PresentationPreviewSlide {
    id: string;
    /** SVG source, rendered by the same layout engine that writes the .pptx. */
    svg: string;
    /** The slide's title as the renderer named it. Used for a `generated` slide, which has no spec entry. */
    title?: string;
    /**
     * A slide the renderer APPENDS to the deck — the Sources slide it builds
     * from every citation — rather than one the spec holds. Since 2.384.1 it is
     * a real slide of the deck: it is in the filmstrip (locked, numbered after
     * the deck's own), on the stage, in the pager's count and in Present, and it
     * is what the revision's `slideCount` and the `.pptx` already contained. The
     * editor cannot change it: it changes as the slides' citations do.
     */
    generated?: boolean;
}
/** A `generated` preview slide, resolved: the renderer's title and image, in deck order after the spec's slides. */
export interface PresentationGeneratedSlide {
    id: string;
    title: string;
    svg?: string;
}
/**
 * What the host knows about the preview right now.
 *
 * Three states rather than an optional object: "not rendered yet" and "the
 * render failed" are different things to say, and collapsing them produces a
 * stage that looks the same whether the server is slow or broken.
 */
export type PresentationPreview = {
    slides: readonly PresentationPreviewSlide[];
} | 'loading' | {
    error: string;
};
export interface PresentationEditorRevision {
    id: string;
    /** `v3`, as the generator labelled it. */
    label: string;
    /** Already formatted by the host — this component does no clock maths. */
    createdAt?: string;
}
/** What a `footer` render function is told. */
export interface PresentationFooterContext {
    /** The slide on the stage — one of the spec's. Undefined while a generated slide is on the stage. */
    selectedSlide: DeckSlide | undefined;
    /** The generated slide on the stage (the Sources slide), when that is what is selected. Since 2.384.1. */
    selectedGeneratedSlide?: PresentationGeneratedSlide;
    /** 0-based, over the whole deck: the spec's slides, then the generated ones. */
    selectedIndex: number;
    /** The whole deck — the spec's slides plus the generated ones — the number every other surface shows. */
    slideCount: number;
    selectSlide: (slideId: string) => void;
    /** Marks slides "Edited by agent" in the filmstrip until the next call. */
    markChanged: (slideIds: string[]) => void;
}
/** The parts `renderFrame` receives. */
export interface PresentationEditorFrame {
    /** `SlidesToolbar` — New slide, Layout, Insert, Theme, Undo/Redo, Present. */
    toolbar: ReactNode;
    /** Revision tabs, Save as vN (gated on citations), Download .pptx. */
    actions: ReactNode;
    /** Deck title line, warnings, filmstrip, 16:9 stage, speaker notes, sources. */
    surface: ReactNode;
    /** The host's `footer`, or the built-in agent box in a dock, or null. */
    footer: ReactNode;
}
export interface PresentationEditorProps {
    /** Controlled. The host owns the spec; this component never holds a copy. */
    spec: DeckSpec;
    onChange: (spec: DeckSpec) => void;
    preview: PresentationPreview;
    /** Called whenever the spec changes. DEBOUNCE THIS — it is a render per call. */
    onRequestPreview: (spec: DeckSpec) => void;
    /** Resolves when the revision exists; rejects with the message to show. */
    onSaveRevision: (spec: DeckSpec) => Promise<unknown>;
    revisions: readonly PresentationEditorRevision[];
    activeRevisionId: string;
    onSelectRevision: (revisionId: string) => void;
    /** The host holds a page of a long history: the picker ends with "Older versions (N)…". */
    olderRevisions?: OlderRevisions;
    /** The deck's own inputs, offered in the source picker before anything is typed. */
    sources: readonly PresentationSourceOption[];
    /** The Documents explorer's search, so a citation names a real document. */
    onSearchSources?: (query: string) => PresentationSourceOption[] | Promise<PresentationSourceOption[]>;
    /** The `.pptx`, through the host's authorized route. No handler, no button. */
    onDownload?: () => void;
    /**
     * Opens the same deck in the read-only presentation surface — the toolbar's
     * Present. Called with the slide on the stage so the view can start there.
     */
    onOpenPresentationView?: (at?: {
        slideId: string;
        slideIndex: number;
    }) => void;
    readOnly?: boolean;
    /**
     * Turns on the agent box under the stage (see the file header). Resolve with
     * the agent's one-line summary once the host has applied the edit through
     * `onChange`; reject with the message to show when it could not.
     */
    onInstruct?: (instruction: string, ctx: PresentationInstructContext) => Promise<PresentationInstructResult | void>;
    /** One-tap instructions shown as chips beside the scope toggle. */
    instructHints?: readonly string[];
    /**
     * Puts an Undo button on the agent's summary line. The host owns the
     * snapshot; pass this only while it holds one.
     */
    onUndoInstruct?: () => void;
    /**
     * Slides the agent is working on right now — `useDeckReviseStatus(documentId)
     * .generatingSlideIds`. Their thumbnails and the stage say `Generating…`; an
     * id not in the deck is a slide being created and shows as a placeholder at
     * the end of the filmstrip.
     */
    generatingSlideIds?: readonly string[];
    /**
     * Slide id → the other people whose selected slide it is (the host's live
     * presence). Shown as small avatars on the filmstrip thumbnails. Since 2.371.0.
     */
    slideViewers?: Readonly<Record<string, readonly PresenceUser[]>>;
    /**
     * Put this slide on the stage — jump to or follow someone. Acted on when
     * `key` changes (so jumping to the same slide twice works); an id not in the
     * deck is ignored. Since 2.371.0.
     */
    selectSlideRequest?: {
        slideId: string;
        key: string | number;
    } | null;
    /**
     * The foot of the editor — the host's composer dock, normally a
     * `FloatingComposerDock`. It is pinned as the editor column's last row
     * (normal flow, `ComposerDockPlacementContext` = `pinned`) while only the
     * content above it scrolls. Replaces the built-in
     * agent box (`onInstruct`) when given. A function receives the slide on the
     * stage and a way to mark the slides an edit changed.
     */
    footer?: ReactNode | ((ctx: PresentationFooterContext) => ReactNode);
    /**
     * Hand the editor's parts to a frame — normally `EditorShell` — instead of
     * stacking them: `toolbar` for its toolbar row, `actions` (revisions, Save,
     * Download) for its head, `surface` as its child, `footer` for its floating
     * dock slot. Without `footer`, the built-in agent box arrives in `footer`
     * already wrapped in a `FloatingComposerDock`.
     */
    renderFrame?: (frame: PresentationEditorFrame) => ReactNode;
    /** The slide on the stage changed (selection, delete, an agent edit landing). */
    onSelectedSlideChange?: (slideId: string, index: number) => void;
    className?: string;
    'data-testid'?: string;
}
export declare function PresentationEditor({ spec, onChange, preview, onRequestPreview, onSaveRevision, revisions, activeRevisionId, onSelectRevision, olderRevisions, sources, onSearchSources, onDownload, onOpenPresentationView, readOnly, onInstruct, instructHints, onUndoInstruct, generatingSlideIds, slideViewers, selectSlideRequest, footer, renderFrame, onSelectedSlideChange, className, 'data-testid': testId, }: PresentationEditorProps): import("react").JSX.Element;
export default PresentationEditor;
//# sourceMappingURL=PresentationEditor.d.ts.map