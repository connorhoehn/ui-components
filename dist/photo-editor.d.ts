import { JSX } from 'react';
import { ReactNode } from 'react';
import { SVGProps } from 'react';

export declare function AdjustedImageCanvas({ src, ops, alt, className, onLoad, 'data-testid': testId }: AdjustedImageCanvasProps): JSX.Element;

export declare interface AdjustedImageCanvasProps {
    src: string | null | undefined;
    ops: readonly PhotoEditOp[];
    alt: string;
    className?: string;
    /** Fires once the photo has decoded, with its natural size. */
    onLoad?: (size: {
        width: number;
        height: number;
    }) => void;
    'data-testid'?: string;
}

/**
 * Every whole-photo op folded into one parameter set — what the shader takes
 * as uniforms. A kind given twice: the later one wins (list order).
 */
export declare interface AdjustParams {
    exposureStops: number;
    /** -1..1, warm positive. */
    warmth: number;
    /** -1..1, magenta positive. */
    tint: number;
    contrast: number;
    highlights: number;
    shadows: number;
    whites: number;
    blacks: number;
    saturation: number;
    vibrance: number;
    hueDegrees: number;
    brightness: number;
    blurPx: number;
}

export declare interface AdjustRenderer {
    /** Upload a (new) source image. Resizes the canvas to the image. */
    setImage(image: TexImageSource & {
        width: number;
        height: number;
    }): void;
    render(params: AdjustParams): void;
    dispose(): void;
}

/**
 * One pixel, sRGB 0..1 in and out. The reference the shader mirrors:
 * exposure → white balance → contrast → tone (highlights / shadows / whites /
 * blacks) → saturation / vibrance → hue → brightness.
 */
export declare function adjustRgb(rgb: readonly [number, number, number], p: AdjustParams): [number, number, number];

/** Two panes side by side: the compare layout. */
export declare function CompareLayoutIcon({ size, ...rest }: PhotoGlyphProps): JSX.Element;

/** A renderer on this canvas, or null when WebGL2 is unavailable (the caller falls back to CSS filters). */
export declare function createAdjustRenderer(canvas: HTMLCanvasElement): AdjustRenderer | null;

/**
 * CSS filter fallback. Exact for the five pipeline kinds (brightness /
 * contrast / saturation / hue / blur, which is what CSS filters are); the
 * Light and Color kinds are approximated through brightness and saturate.
 */
export declare function cssFilterFor(p: AdjustParams): string;

declare interface DropdownMenuItem {
    /** Visible item label. */
    label: string;
    /** Optional leading icon / glyph. */
    icon?: ReactNode;
    /** Highlight this item as the currently-active selection. */
    active?: boolean;
    /** Style this item as destructive. */
    danger?: boolean;
    /** Fires on click / Enter; the menu closes afterwards. Not needed on a row with a `submenu`. */
    onSelect?: () => void;
    /** Right-aligned hint after the label — a shortcut (`⌘P`), a count. */
    trailing?: ReactNode;
    /** A second, quieter line under the label. */
    description?: string;
    /** A setting that is on: a check leads the row (menuitemcheckbox). */
    checked?: boolean;
    /**
     * A flyout of further choices, opened from this row — "Share to ›",
     * "Download as ›". Opens on hover, click or ArrowRight; the row itself
     * runs no `onSelect`.
     */
    submenu?: DropdownMenuSection[];
    /** A hook for the spec that addresses this row. Without one the row is reachable by its label. */
    'data-testid'?: string;
}

declare interface DropdownMenuSection {
    /** Optional uppercase section heading. */
    label?: string;
    items: DropdownMenuItem[];
    /**
     * The group scrolls in place (`uic-menu-group-scroll`) so the sections
     * after it stay put. For a generated list — one row per room — that would
     * otherwise push the fixed actions below the fold.
     */
    scroll?: boolean;
    'data-testid'?: string;
}

/** Two stacked squares: "n edits on this photo". */
export declare function EditStackIcon({ size, ...rest }: PhotoGlyphProps): JSX.Element;

/** The ops that actually change something. */
export declare function effectiveOps(ops: readonly PhotoEditOp[]): PhotoEditOp[];

/** A flag: the pick / reject flag. */
export declare function FlagIcon({ size, ...rest }: PhotoGlyphProps): JSX.Element;

/** A heart: a pick, on a filmstrip thumbnail. `filled` for a kept pick. */
export declare function HeartIcon({ size, filled, ...rest }: PhotoGlyphProps & {
    filled?: boolean;
}): JSX.Element;

/** The CSS `hue-rotate()` matrix (Filter Effects §feColorMatrix). */
export declare function hueRotateMatrix(degrees: number): number[];

/** True when the op changes nothing — a slider at its neutral value. */
export declare function isNeutralOp(op: PhotoAdjustOp): boolean;

/** Neutral temperature: the photo as shot. */
export declare const NEUTRAL_KELVIN = 5500;

export declare const NEUTRAL_PARAMS: AdjustParams;

/** An op's identity: one op per kind per mask. */
export declare function opIdentity(op: Pick<PhotoEditOp, 'kind' | 'maskId'>): string;

export declare function paramsFromOps(ops: readonly PhotoEditOp[]): AdjustParams;

export declare type PhotoAdjustKind = PhotoAdjustOp['kind'];

export declare type PhotoAdjustOp = {
    kind: 'brightness';
    value: number;
} | {
    kind: 'contrast';
    value: number;
} | {
    kind: 'saturation';
    value: number;
} | {
    kind: 'hue';
    degrees: number;
} | {
    kind: 'blur';
    radiusPx: number;
} | {
    kind: 'exposure';
    stops: number;
} | {
    kind: 'highlights';
    amount: number;
} | {
    kind: 'shadows';
    amount: number;
} | {
    kind: 'whites';
    amount: number;
} | {
    kind: 'blacks';
    amount: number;
} | {
    kind: 'vibrance';
    amount: number;
} | {
    kind: 'temperature';
    kelvin: number;
} | {
    kind: 'tint';
    amount: number;
};

export declare function PhotoCompareCanvas({ src, ops, alt, compare: compareProp, onCompareChange, layout, split: splitProp, onSplitChange, originalLabel, previewLabel, overlay, className, 'data-testid': testId, }: PhotoCompareCanvasProps): JSX.Element;

export declare interface PhotoCompareCanvasProps {
    /** The photo (a URL the browser can load; resolve auth before passing). */
    src: string | null | undefined;
    /** What the Preview side renders — the host's `proposed ?? ops`. */
    ops: readonly PhotoEditOp[];
    alt: string;
    /** Show Original and Preview (split or side by side). Off = the preview alone. Uncontrolled by default (on). */
    compare?: boolean;
    onCompareChange?: (compare: boolean) => void;
    layout?: PhotoCompareLayout;
    /** Where the split sits, 0..1 of the stage width. Uncontrolled by default (0.5). */
    split?: number;
    onSplitChange?: (split: number) => void;
    originalLabel?: string;
    previewLabel?: string;
    /** Anything the host floats over the stage (a composer's picker, a mask overlay). */
    overlay?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare type PhotoCompareLayout = 'split' | 'side-by-side';

/** An op, optionally confined to a mask. No `maskId` = the whole photo. */
export declare type PhotoEditOp = PhotoAdjustOp & {
    maskId?: string;
};

export declare function PhotoEditorShell({ topBar, canvas, rightPanel, composer, filmstrip, statusBar, className, 'data-testid': testId }: PhotoEditorShellProps): JSX.Element;

export declare interface PhotoEditorShellProps {
    topBar: ReactNode;
    canvas: ReactNode;
    rightPanel?: ReactNode;
    composer?: ReactNode;
    filmstrip?: ReactNode;
    statusBar?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare function PhotoEditorStatusBar({ previewing, saving, applied, message, className, 'data-testid': testId }: PhotoEditorStatusBarProps): JSX.Element;

export declare interface PhotoEditorStatusBarProps {
    /** A proposed list is being previewed and has not been kept. */
    previewing: boolean;
    saving?: boolean;
    /** The kept version has edits (right side reads "Applied"); none reads "No edits". */
    applied?: boolean;
    /** Left text override. Default "Previewing changes · Original preserved" / "Original preserved". */
    message?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare function PhotoEditorTopBar({ title, subtitle, backLabel, onBack, onToggleSidebar, sidebarOpen, onPrev, onNext, pick, onPickChange, onUndo, onRedo, canUndo, canRedo, compareLayout, onCompareLayoutChange, moreSections, className, 'data-testid': testId, }: PhotoEditorTopBarProps): JSX.Element;

export declare interface PhotoEditorTopBarProps {
    title: string;
    subtitle?: ReactNode;
    backLabel: string;
    onBack: () => void;
    onToggleSidebar?: () => void;
    sidebarOpen?: boolean;
    onPrev?: () => void;
    onNext?: () => void;
    pick: PhotoPick;
    onPickChange: (pick: PhotoPick) => void;
    onUndo?: () => void;
    onRedo?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
    compareLayout?: 'split' | 'side-by-side';
    onCompareLayoutChange?: (layout: 'split' | 'side-by-side') => void;
    /** The ⋯ menu. Omitted = no ⋯ button. */
    moreSections?: DropdownMenuSection[];
    className?: string;
    'data-testid'?: string;
}

export declare interface PhotoEditVersion {
    version: number;
    parentVersion: number | null;
    ops: PhotoEditOp[];
    summary: string;
    source: 'user' | 'assistant';
    runId?: string;
    renderedImageId?: string;
    createdBy: string;
    createdAt: string;
}

export declare function PhotoFilmstrip({ items, currentId, onSelect, className, 'data-testid': testId }: PhotoFilmstripProps): JSX.Element;

export declare interface PhotoFilmstripItem {
    id: string;
    /** A loadable thumbnail URL; null / undefined shows a blank tile. */
    thumbnailSrc: string | null | undefined;
    label: string;
    /** Ops in the kept version — the "⧉ n" badge. 0 hides it. */
    editCount?: number;
    pick?: PhotoPick;
}

export declare interface PhotoFilmstripProps {
    items: readonly PhotoFilmstripItem[];
    currentId: string | null;
    onSelect: (id: string) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface PhotoGlyphProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    size?: number;
}

export declare interface PhotoMask {
    maskId: string;
    label: string;
    kind: 'people' | 'subject' | 'sky' | 'brush';
    /** "2 subjects" — how many things the mask covers, when it is a detection. */
    subjects?: number;
}

export declare type PhotoPick = 'pick' | 'reject' | null;

export declare type PhotoZoom = 'fit' | number;

/** Remove the op with this kind (and mask). */
export declare function removeOpIn(ops: readonly PhotoEditOp[], kind: PhotoAdjustKind, maskId?: string): PhotoEditOp[];

/** Replace the op with the same identity in place, or append it. */
export declare function setOpIn(ops: readonly PhotoEditOp[], op: PhotoEditOp): PhotoEditOp[];

/** A window with a left rail: "show / hide the sidebar". */
export declare function SidebarToggleIcon({ size, ...rest }: PhotoGlyphProps): JSX.Element;

export { }


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
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
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
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
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
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}
