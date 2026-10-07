import { type OlderRevisions } from './revisionPicker';
import { type ReactNode } from 'react';
/** One page of a revision. `preview` is host-resolved; absent means absent. */
export interface PresentationSlide {
    id: string;
    /** 1-based, as the deck numbers itself. */
    index: number;
    title: string;
    preview?: ReactNode;
}
export interface PresentationRevision {
    id: string;
    /** `v3`, as the generator labelled it. */
    label: string;
    /** Already formatted by the host — this component does no clock maths. */
    createdAt?: string;
    slides: PresentationSlide[];
}
export interface PresentationViewProps {
    title: string;
    /**
     * A line under the title — e.g. the deck's own heading where it differs from
     * the document's name ("Titled “Audit E2E”"). A subtitle, never a second name.
     */
    subtitle?: string;
    revisions: readonly PresentationRevision[];
    /**
     * The host holds a page of a long history (newest first from the platform):
     * the picker ends with "Older versions (N)…", which asks for the next page.
     */
    olderRevisions?: OlderRevisions;
    /** Which revision is shown. Controlled; the host owns the choice. */
    revisionId: string;
    onRevisionChange: (revisionId: string) => void;
    /** 1-based page number within the revision. Controlled. */
    slideIndex: number;
    onSlideChange: (slideIndex: number) => void;
    /**
     * The `.pptx` itself, through the host's own authorized route. Absent, no
     * button is drawn — an offer that 403s is worse than no offer.
     */
    onDownload?: () => void;
    downloadLabel?: string;
    /** Opens the current slide at full size, in whatever viewer the host has. */
    onOpenPreview?: (slideId: string) => void;
    /**
     * A generation still in flight, or the one that failed. Shown beside the
     * revision switch so "v3 generating" is visible while v2 is being read.
     */
    pending?: {
        label: string;
        status: 'generating' | 'failed';
        message?: string;
    };
    /** Honest state about what this view cannot show. */
    notice?: ReactNode;
    /** `no-access`: the reader may not open this deck — never an error or a status code. */
    state?: 'loading' | 'ready' | 'empty' | 'error' | 'no-access';
    errorMessage?: string;
    /** Who to ask for access, named in the `no-access` state. Omitted → "its owner". */
    ownerName?: string | null;
    onRetry?: () => void;
    /**
     * Widest the slide frame may grow, in pixels. Centred once it stops
     * growing.
     *
     * A slide is 16:9 and a pane is whatever the host made it. In a wide,
     * short container the frame stretched to the full width while the slide
     * inside it stayed its natural size, so the deck read as a small picture
     * marooned in a huge grey rectangle — measured at 1,100px of frame around a
     * ~600px slide on a pipeline run card. The default already caps the frame
     * at 16:9 of the available height, which is the right cap when the height
     * is known; pass this when it is not, or to hold the deck narrower still.
     */
    maxSlideWidth?: number;
    /**
     * Take keyboard focus when shown, so ← / → page at once. For a view the
     * person just asked for (the editor's Present); a view embedded in a page
     * leaves it off and is focused by clicking or tabbing. Without it, Present
     * opened a deck whose arrow keys did nothing until it was clicked.
     */
    autoFocus?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function PresentationView({ title, subtitle, revisions, olderRevisions, revisionId, onRevisionChange, slideIndex, onSlideChange, onDownload, downloadLabel, onOpenPreview, pending, notice, state, errorMessage, ownerName, onRetry, maxSlideWidth, autoFocus, className, 'data-testid': testId, }: PresentationViewProps): import("react").JSX.Element;
export default PresentationView;
//# sourceMappingURL=PresentationView.d.ts.map