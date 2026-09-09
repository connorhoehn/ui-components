// ui-components/src/components/doc-macros/AttachmentMacro.tsx
//
// `macro:attachment`, drawn as a file card inside the page.
//
// The sixth citizen, and the first whose whole difficulty is on the HOST side.
// The body is four scalars nobody edits; what needs care is that the bytes it
// points at are behind the reader's credentials, and a node view has none.
// So the extension takes two seams and the block does nothing on its own:
//
//   `open(a)`     — show the file. The host fetches with its bearer and opens
//                   the blob, or whatever "open" means where it lives.
//   `resolve(a)`  — hand back a renderable `src` for an image, or `null`. The
//                   view asks once per body, holds the answer, and repaints.
//
// Both are OPTIONAL and the card degrades in the order `AttachmentBlock`
// documents: host-opened → plain anchor for an absolute URL → text. A host
// with no credentials to lend still shows a reader that a file was here.
//
// ## Why `resolve` is a promise the VIEW holds, not the block
//
// A `ReactMacroView` re-renders from `element()` on every `schedule()`; state
// inside the block would be rebuilt with it. The view is the object that
// survives across repaints, so the resolved src lives there and `update()`
// only re-resolves when the body — and so the URL — actually changed.

import { Extension } from '@tiptap/core';
import type { Plugin } from '@tiptap/pm/state';
import type { Node as PmNode } from '@tiptap/pm/model';
import { ReactMacroView } from './ReactMacroView';
import {
    MACRO_NODE_NAME,
    macroRendererPlugins,
    macroRendererStorage,
    type MacroRenderer,
    type MacroViewContext,
} from './registry';
import {
    ATTACHMENT_MACRO_NAME,
    attachmentHref,
    attachmentMacroText,
    isImageAttachment,
    readAttachment,
    type Attachment,
    type AttachmentDraft,
} from './attachmentText';
import { AttachmentBlock } from './AttachmentBlock';

declare module '@tiptap/core' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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

class AttachmentView extends ReactMacroView {
    private attachment: Attachment;
    private previewSrc: string | null = null;
    /** The URL the current `previewSrc` answers for, so a re-render is not a re-fetch. */
    private resolvedFor: string | null = null;

    constructor(
        ctx: MacroViewContext,
        attachment: Attachment,
        private readonly options: AttachmentMacroOptions = {},
    ) {
        super(ctx, ATTACHMENT_MACRO_NAME);
        this.attachment = attachment;
        this.schedule();
        this.resolvePreview();
    }

    private resolvePreview(): void {
        const { resolve } = this.options;
        const a = this.attachment;
        if (!resolve || !isImageAttachment(a) || this.resolvedFor === a.url) return;
        this.resolvedFor = a.url;
        void resolve(a).then(
            (src) => {
                // The body may have moved on while the fetch was in flight.
                if (this.resolvedFor !== a.url) return;
                this.previewSrc = src;
                this.schedule();
            },
            () => {
                if (this.resolvedFor === a.url) this.previewSrc = null;
            },
        );
    }

    protected element() {
        const a = this.attachment;
        const { open } = this.options;
        // The host's `open` wins whenever it is given — for a hosted upload it
        // is the ONLY way, and for an absolute URL the host may prefer its own
        // viewer to a new tab. Without it, an absolute URL is an anchor and a
        // hosted upload is text: `isHostedUpload` is what tells the two apart
        // inside `attachmentHref`.
        const onOpen = open ? () => open(a) : undefined;
        return (
            <AttachmentBlock
                attachment={a}
                editable={this.editable}
                href={attachmentHref(a)}
                {...(onOpen ? { onOpen } : {})}
                previewSrc={this.previewSrc}
                {...(this.editable ? { onRemove: () => this.removeBlock() } : {})}
            />
        );
    }

    update(node: PmNode): boolean {
        if (node.type !== this.node.type) return false;
        if (node.attrs.macroName !== ATTACHMENT_MACRO_NAME) return false;
        const attachment = readAttachment(node.textContent);
        if (!attachment) return false;
        const changed = node.textContent !== this.node.textContent;
        this.node = node;
        this.attachment = attachment;
        if (changed) {
            if (attachment.url !== this.resolvedFor) {
                this.previewSrc = null;
                this.resolvedFor = null;
            }
            this.schedule();
            this.resolvePreview();
        }
        return true;
    }

    ignoreMutation(): boolean {
        return true;
    }

    stopEvent(): boolean {
        return true;
    }
}

export function attachmentRenderer(options: AttachmentMacroOptions = {}): MacroRenderer {
    return {
        macroName: ATTACHMENT_MACRO_NAME,
        accepts: (node) => readAttachment(node.textContent) !== null,
        create: (ctx: MacroViewContext) => {
            const attachment = readAttachment(ctx.node.textContent);
            return attachment ? new AttachmentView(ctx, attachment, options) : null;
        },
    };
}

export const AttachmentMacro = Extension.create<AttachmentMacroOptions>({
    name: 'attachmentMacro',

    addOptions() {
        return {};
    },

    addStorage: macroRendererStorage,

    addCommands() {
        return {
            insertAttachment:
                (draft: AttachmentDraft) =>
                ({ state, commands }) => {
                    if (!state.schema.nodes[MACRO_NODE_NAME]) return false;
                    if (!draft.name?.trim() || !draft.url?.trim()) return false;
                    return commands.insertContent([
                        {
                            type: MACRO_NODE_NAME,
                            attrs: { macroName: ATTACHMENT_MACRO_NAME },
                            content: [{ type: 'text', text: attachmentMacroText(draft) }],
                        },
                        // A landing spot for the caret; the macro node is
                        // `isolating`. The chassis drops an empty trailing
                        // paragraph on normalise, so it never reaches the file.
                        { type: 'paragraph' },
                    ]);
                },
        };
    },

    addProseMirrorPlugins(): Plugin[] {
        return macroRendererPlugins(this.editor, this.name, attachmentRenderer(this.options));
    },
});

export default AttachmentMacro;
