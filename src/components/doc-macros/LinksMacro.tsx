// ui-components/src/components/doc-macros/LinksMacro.tsx
//
// `macro:links`, drawn as a reference list inside the page.
//
// The fifth citizen, and structurally the simplest: no lifecycle, nobody
// addressed, nothing queryable, no host seam. A row is a label and a URL, and
// every mutation is one `ReplaceStep` over one scalar — so it syncs, merges,
// shows up in suggestions and undoes for free, exactly as `ActionItemsMacro`'s
// header explains for ticking.
//
// It degrades the same way too: `readLinks` returns `null` for any body outside
// the shape it can edit safely, the renderer returns `null`, and the registry
// falls back to `plainMacroView` so the reader sees the literal fence. That is
// what a client which never loaded this file shows, which is the point.
//
// Why it is worth a citizen at all is argued in `linksText.ts`: the section
// world has had `link-block` for a long time and it does nothing on a page.

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
    addLinkEdit,
    LINKS_MACRO_NAME,
    linksMacroText,
    readLinks,
    removeLinkEdit,
    setLinkLabelEdit,
    setLinkUrlEdit,
    type LinkRow,
} from './linksText';
import type { TextRangeEdit } from './macroListText';
import { LinksBlock } from './LinksBlock';

declare module '@tiptap/core' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly { label?: string; url?: string }[]) => ReturnType;
        };
    }
}

class LinksView extends ReactMacroView {
    private rows: LinkRow[];

    constructor(ctx: MacroViewContext, rows: LinkRow[]) {
        super(ctx, LINKS_MACRO_NAME);
        this.rows = rows;
        this.schedule();
    }

    protected element() {
        return (
            <LinksBlock
                rows={this.rows}
                editable={this.editable}
                onLabelChange={(i, label) =>
                    this.apply(setLinkLabelEdit(this.node.textContent, i, label))
                }
                onUrlChange={(i, url) => this.apply(setLinkUrlEdit(this.node.textContent, i, url))}
                onRemoveRow={(i) => this.apply(removeLinkEdit(this.node.textContent, i))}
                onAddRow={() => this.apply(addLinkEdit(this.node.textContent))}
                {...(this.editable ? { onRemove: () => this.removeBlock() } : {})}
            />
        );
    }

    /** Every mutation is one range of the macro's own text. */
    private apply(edit: TextRangeEdit | null): void {
        if (edit) this.replaceText(edit.from, edit.to, edit.insert);
    }

    update(node: PmNode): boolean {
        if (node.type !== this.node.type) return false;
        if (node.attrs.macroName !== LINKS_MACRO_NAME) return false;
        const rows = readLinks(node.textContent);
        if (!rows) return false;
        const changed = node.textContent !== this.node.textContent;
        this.node = node;
        this.rows = rows;
        if (changed) this.schedule();
        return true;
    }

    /** React owns this subtree. Its DOM churn is not a document edit. */
    ignoreMutation(): boolean {
        return true;
    }

    /**
     * The block owns its own pointer and key events — without this a keystroke
     * in the URL field is typing into the document and the field never sees it.
     */
    stopEvent(): boolean {
        return true;
    }
}

/**
 * The renderer.
 *
 * Exported so a host can register it into a `MacroRenderers` list directly
 * instead of adding the extension — the two are equivalent.
 */
export function linksRenderer(): MacroRenderer {
    return {
        macroName: LINKS_MACRO_NAME,
        accepts: (node) => readLinks(node.textContent) !== null,
        create: (ctx: MacroViewContext) => {
            const rows = readLinks(ctx.node.textContent);
            return rows ? new LinksView(ctx, rows) : null;
        },
    };
}

export const LinksMacro = Extension.create({
    name: 'linksMacro',

    addStorage: macroRendererStorage,

    addCommands() {
        return {
            insertLinks:
                (rows?: readonly { label?: string; url?: string }[]) =>
                ({ state, commands }) => {
                    // Guard rather than assume: this extension can be
                    // registered without `MacroNode`, and inserting a node type
                    // the schema does not have throws inside the transaction.
                    if (!state.schema.nodes[MACRO_NODE_NAME]) return false;
                    const body = linksMacroText(rows ?? [{}]);
                    return commands.insertContent([
                        {
                            type: MACRO_NODE_NAME,
                            attrs: { macroName: LINKS_MACRO_NAME },
                            content: [{ type: 'text', text: body }],
                        },
                        // A landing spot for the caret: the macro node is
                        // `isolating`, so a block at the end of a document
                        // would leave nowhere to keep writing.
                        { type: 'paragraph' },
                    ]);
                },
        };
    },

    addProseMirrorPlugins(): Plugin[] {
        return macroRendererPlugins(this.editor, this.name, linksRenderer());
    },
});

export default LinksMacro;
