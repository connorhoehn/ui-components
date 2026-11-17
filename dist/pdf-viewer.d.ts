import { JSX } from 'react';
import { ReactNode } from 'react';

/** The zoom steps the buttons move between, as a fraction of the page's own size. */
export declare const PDF_ZOOM_STEPS: readonly number[];

/**
 * A PDF, one page at a time, from a URL or bytes, with page navigation and zoom, drawn by pdf.js.
 *
 * Import from `@connorhoehn/ui-components/pdf-viewer`. Needs the optional peer
 * `pdfjs-dist`, and the app must serve pdf.js's worker script and pass its URL
 * (`workerSrc`, or `setPdfWorkerSrc` once).
 */
export declare function PdfViewer({ src, data, withCredentials, workerSrc, title, initialPage, onPageChange, initialZoom, onLoad, onError, actions, variant, className, }: PdfViewerProps): JSX.Element;

export declare interface PdfViewerProps {
    /** Where the PDF is. Same-origin requests carry the session cookie. */
    src?: string | URL;
    /** The PDF's bytes, when the app already holds them. Copied, never detached. */
    data?: Uint8Array | ArrayBuffer;
    /** Send cookies on a cross-origin `src`. */
    withCredentials?: boolean;
    /** URL of pdf.js's worker script. Overrides `setPdfWorkerSrc`. */
    workerSrc?: string;
    /** What the document is ("Résumé"), for the page image's accessible name. Default "Document". */
    title?: string;
    /** Page shown first (1-based). Default 1. */
    initialPage?: number;
    /** Called when the shown page changes. */
    onPageChange?: (page: number) => void;
    /** Starting zoom: a fraction (1 = the page's own size) or `'fit-width'` (default). */
    initialZoom?: PdfZoom;
    /** Called once the document is open. */
    onLoad?: (info: {
        pageCount: number;
    }) => void;
    /** Called when the document cannot be opened. */
    onError?: (error: Error) => void;
    /** Extra controls at the toolbar's end (a download link, say). */
    actions?: ReactNode;
    /** `framed` (default) draws a rounded border; `flush` draws none. */
    variant?: 'framed' | 'flush';
    className?: string;
}

export declare type PdfZoom = number | 'fit-width';

/** Tell every PdfViewer where pdf.js's worker script is served. Call once at start-up. */
export declare function setPdfWorkerSrc(url: string): void;

export { }


declare global {
    interface Window {
        /** Dev-only imperative canvas bridge — see `DevEditorBridge` above. */
        __pipelineEditor?: unknown;
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasListStyle: {
            /**
             * Make the caret's block a list of the style's kind (if it is not one
             * already) and set its marker.
             */
            setListStyle: (style: ListStyle) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        suggestChanges: {
            /** Turn suggestion mode on or off. */
            setSuggestionMode: (enabled: boolean) => ReturnType;
            /** Flip suggestion mode. */
            toggleSuggestionMode: () => ReturnType;
            /** Accept one suggestion: keep its insertions, remove its deletions. */
            acceptSuggestion: (id: SuggestionIdentity) => ReturnType;
            /** Reject one suggestion: drop its insertions, restore its deletions. */
            rejectSuggestion: (id: SuggestionIdentity) => ReturnType;
            /** Accept every suggestion in the document. */
            acceptAllSuggestions: () => ReturnType;
            /** Reject every suggestion in the document. */
            rejectAllSuggestions: () => ReturnType;
            /** Move the selection onto a suggestion. */
            selectSuggestion: (id: SuggestionIdentity) => ReturnType;
        };
    }
}
