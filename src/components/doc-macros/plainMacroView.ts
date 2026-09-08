// ui-components/src/components/doc-macros/plainMacroView.ts
//
// The default macro rendering: `pre[data-macro] > code`, holding the macro's
// literal YAML.
//
// A faithful copy of `MacroNode.renderHTML` in realtime-modules. It lives here
// because registering a node view on `macro` takes over rendering for ALL
// macros — so anything the registry has no renderer for has to come out looking
// exactly as it did before any renderer existed. That is not a cosmetic
// nicety: it is the format's central promise (MACRO-MARKDOWN.md), that an
// UNKNOWN macro is preserved verbatim rather than dropped, and it is why a
// macro is not modelled as one ProseMirror node type per tool.
//
// Copied rather than imported for the reason `macro.ts` documents: importing
// `MacroNode` pulls realtime-modules' Tiptap canvas adapter, and with it a
// second `prosemirror-*` graph, into an entry the consuming app deliberately
// pre-bundles on its own single ProseMirror.

import type { Node as PmNode } from '@tiptap/pm/model';
import type { NodeView } from '@tiptap/pm/view';

/** `pre[data-macro] > code` — the macro's YAML, editable as text. */
export function plainMacroView(node: PmNode): NodeView {
    const dom = document.createElement('pre');
    dom.setAttribute('data-macro', String(node.attrs.macroName ?? 'unknown'));
    const contentDOM = document.createElement('code');
    dom.appendChild(contentDOM);
    return { dom, contentDOM };
}

export default plainMacroView;
