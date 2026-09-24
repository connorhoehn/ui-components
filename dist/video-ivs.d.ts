import { RefObject } from 'react';

/**
 * Shared types for embeddable hangout components.
 * Used by useHangoutEmbed, VideoGridEmbed, ParticipantTileEmbed.
 */
export declare interface HangoutParticipant {
    participantId: string;
    userId: string;
    isLocal: boolean;
    streams: MediaStream[];
    isSpeaking: boolean;
    screenStream?: MediaStream;
}

export declare function useHangoutEmbed({ stageToken, userId, participantId, }: UseHangoutEmbedOptions): UseHangoutEmbedReturn;

export declare interface UseHangoutEmbedOptions {
    /** IVS RealTime Stage participant token (from CreateParticipantToken API). */
    stageToken: string;
    /** Current user's identifier (displayed in participant list). */
    userId: string;
    /** Participant ID returned by the join API. */
    participantId: string;
}

export declare interface UseHangoutEmbedReturn {
    /** Ref to attach to a <video> element for local camera preview. */
    localVideoRef: RefObject<HTMLVideoElement | null>;
    /** All participants (including local user). */
    participants: HangoutParticipant[];
    /** True once the Stage has been successfully joined. */
    isJoined: boolean;
    /** Error message if join or media acquisition failed. */
    error: string | null;
    /** Whether the local user is sharing their screen. */
    isScreenSharing: boolean;
    /** Toggle audio mute. */
    toggleMute: (muted: boolean) => void;
    /** Toggle camera on/off. */
    toggleCamera: (enabled: boolean) => void;
    /** Start sharing screen. */
    startScreenShare: () => Promise<void>;
    /** Stop sharing screen. */
    stopScreenShare: () => void;
    /** Leave the stage and clean up. */
    leave: () => void;
}

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
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
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
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
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
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}
