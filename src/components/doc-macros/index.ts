// ui-components/src/components/doc-macros/index.ts
//
// Document macros: the embedded tools that live inline in a canvas page body —
// an action item, a decision, a typed field, an agent -> human hand-off — each
// persisted as a `macro:<name>` YAML fence and drawn by a renderer registered
// here.
//
// `registry.ts` is the entry point to read first. `ActionItemsMacro.tsx` is the
// worked example of adding one.
//
// ## Where this is published from, and why not its own subpath
//
// Re-exported through `@connorhoehn/ui-components/diagram`, which is the entry
// that already ships the canvas macro half (`DiagramMacro`) and already
// externalises `@tiptap/core` and the `prosemirror-*` graph. A dedicated
// `./doc-macros` subpath would read better and is the obvious follow-up, but it
// needs an entry in `vite.config.ts` and `package.json` — files this change
// does not own, and a new build entry that cannot be verified without running
// the build. Until then, importing from `/diagram` costs nothing: Excalidraw is
// an external peer that `CollaborativeExcalidraw` lazy-loads, so a consumer
// that only wants a checklist never fetches it.

// `MACRO_NODE_NAME` is deliberately NOT re-exported here: `./diagram` already
// exports it from `diagram/macro.ts` (same value, same wire constant), and two
// star-exported bindings of one name is an ambiguity a bundler resolves
// silently. Import it from `./registry` directly if you need it.
export {
    MACRO_RENDERERS_NAME,
    macroRenderersPluginKey,
    createMacroRendererRegistry,
    macroRenderersFor,
    macroRendererStorage,
    macroRendererPlugins,
    macroNodeViewPlugin,
    hostsMacroNodeViews,
} from './registry';
export type {
    MacroRenderer,
    MacroRendererRegistry,
    MacroRendererStorage,
    MacroNodeView,
    MacroViewContext,
    MacroEditorLike,
} from './registry';

export { plainMacroView } from './plainMacroView';
export { ReactMacroView } from './ReactMacroView';

export { MacroRenderers } from './MacroRenderers';
export type { MacroRenderersOptions } from './MacroRenderers';

// The first renderer registered through the registry.
export { ActionItemsMacro, actionItemsRenderer } from './ActionItemsMacro';
export { ActionItemsBlock } from './ActionItemsBlock';
export type { ActionItemsBlockProps } from './ActionItemsBlock';
export {
    ACTION_ITEMS_MACRO_NAME,
    STATUS_DONE,
    STATUS_PENDING,
    readActionItems,
    actionItemsMacroText,
    toggleItemEdit,
    setItemKeyEdit,
    setItemTextEdit,
    addItemEdit,
    removeItemEdit,
    yamlScalar,
} from './actionItemsText';
export type { ActionItem, TextRangeEdit } from './actionItemsText';

// The agent -> human hand-off. Same registry, same one-range-per-edit rule;
// the difference is that a HITL answer has a SECOND reader outside the
// document, which is what `HitlMacroOptions.onAnswered` and
// `HITL_QUERYABILITY` are about.
export { HitlMacro, hitlRenderer } from './HitlMacro';
export type { HitlMacroOptions, HitlAnsweredEvent, HitlMirrorResult } from './HitlMacro';
export { HitlBlock, hitlPhase } from './HitlBlock';
export type { HitlBlockProps } from './HitlBlock';
export {
    HITL_MACRO_NAME,
    HITL_QUERYABILITY,
    HITL_SENTINEL_SECTION,
    HITL_ITEM_CATEGORY,
    readHitl,
    hitlExpired,
    hitlMacroText,
    answerHitlEdit,
    retractHitlEdit,
} from './hitlText';
export type { HitlCallout, HitlOption, HitlDraft } from './hitlText';
