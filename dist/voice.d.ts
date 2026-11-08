import { JSX } from 'react';

/** Visible label per phase; also the live-region text. */
export declare const VOICE_PHASE_LABEL: Record<VoicePhase, string>;

export declare const VOICE_PHASES: readonly VoicePhase[];

export declare function VoiceActivityRing({ level, outputLevel, phase, size, label, className, 'data-testid': testId, }: VoiceActivityRingProps): JSX.Element;

export declare interface VoiceActivityRingProps {
    /** Microphone level, 0..1 (clamped). */
    level?: number;
    /** The assistant's audio level, 0..1 (clamped). */
    outputLevel?: number;
    phase: VoicePhase;
    size?: 'sm' | 'md';
    /** Accessible name when the ring is used alone; it stays `aria-hidden` inside the dock. */
    label?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface VoiceBudget {
    /** Spent so far in this session. */
    usedUsd: number;
    /** The amount held (reserved) for the session; the meter's full scale. */
    holdUsd: number;
}

/** The confirmation card: a title, optional detail, Confirm and Cancel. */
export declare function VoiceConfirmCard({ pending, handleEscape, autoFocus, className, 'data-testid': testId, }: VoiceConfirmCardProps): JSX.Element;

export declare interface VoiceConfirmCardProps {
    pending: VoicePending;
    /** Handle Escape on the card itself. The dock turns this off: its popover already closes on Escape. Default true. */
    handleEscape?: boolean;
    /** Focus the card when it mounts. Default true. */
    autoFocus?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function VoiceDock({ phase, level, outputLevel, elapsedSeconds, budget, pending, lastLine, onStart, onStop, onMute, muted, unavailableReason, compact, size, startLabel, className, ref, 'data-testid': testId, }: VoiceDockProps): JSX.Element;

export declare interface VoiceDockProps {
    phase: VoicePhase;
    /** Microphone level, 0..1. */
    level: number;
    /** The assistant's audio level, 0..1. */
    outputLevel: number;
    elapsedSeconds?: number;
    budget?: VoiceBudget | null;
    pending?: VoicePending | null;
    lastLine?: VoiceLine | null;
    onStart?: () => void;
    onStop?: () => void;
    onMute?: () => void;
    muted?: boolean;
    /** Shown as the pill's title when `phase` is `unavailable`. */
    unavailableReason?: string;
    /** Drops the transcript line and the budget meter. */
    compact?: boolean;
    /**
     * `panel` (default): the full row, as on a reference sheet or a panel.
     * `footer`: matched to an app footer's quiet controls (HuddleBar's Huddle /
     * Message): `sm` ring, `T` xs labels, ghost icon+label Start / End, no
     * vertical padding. Since 2.510.1.
     */
    size?: VoiceDockSize;
    /** The Start control's label in the `footer` size. Default `'Voice'`. */
    startLabel?: string;
    className?: string;
    /** The dock's root element. */
    ref?: React.Ref<HTMLDivElement>;
    'data-testid'?: string;
}

export declare type VoiceDockSize = 'footer' | 'panel';

export declare interface VoiceLine {
    role: 'you' | 'assistant';
    text: string;
}

export declare interface VoicePending {
    title: string;
    detail?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export declare type VoicePhase = 'off' | 'connecting' | 'listening' | 'thinking' | 'executing' | 'speaking' | 'confirming' | 'ended' | 'unavailable';

export declare interface VoiceToolCall {
    name: string;
    status: VoiceToolStatus;
    summary: string;
}

export declare type VoiceToolStatus = 'running' | 'done' | 'refused' | 'failed';

export declare interface VoiceTurn {
    id: string;
    role: 'you' | 'assistant';
    text: string;
    /** Epoch milliseconds, or a ready-made label. */
    at: number | string;
    toolCalls?: VoiceToolCall[];
}

export declare function VoiceTurnStrip({ turns, maxVisible, onClear, pending, className, 'data-testid': testId, }: VoiceTurnStripProps): JSX.Element;

export declare interface VoiceTurnStripProps {
    turns: VoiceTurn[];
    /** Show only the last N turns. Default 4. */
    maxVisible?: number;
    onClear?: () => void;
    /** The action awaiting confirmation; renders the confirmation card under the turns. */
    pending?: VoicePending | null;
    className?: string;
    'data-testid'?: string;
}

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
