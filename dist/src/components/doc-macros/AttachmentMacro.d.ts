import { Extension } from '@tiptap/core';
import { type MacroRenderer } from './registry';
import { type Attachment, type AttachmentDraft } from './attachmentText';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}
export interface AttachmentMacroOptions {
    /**
     * Show the file to the reader, with whatever credentials the host has.
     * Called for hosted uploads always, and for absolute URLs too when given —
     * the host may prefer its own viewer to a new tab.
     */
    open?: (attachment: Attachment) => void;
    /**
     * A renderable `src` for an image attachment, or `null` when it cannot be
     * had. Only asked for `image/*`. The host owns the object URL's lifetime;
     * the view never revokes what it did not create.
     */
    resolve?: (attachment: Attachment) => Promise<string | null>;
}
export declare function attachmentRenderer(options?: AttachmentMacroOptions): MacroRenderer;
export declare const AttachmentMacro: Extension<AttachmentMacroOptions, any>;
export default AttachmentMacro;
//# sourceMappingURL=AttachmentMacro.d.ts.map