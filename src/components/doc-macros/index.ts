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
    refreshMacroViews,
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
export type { ActionItemsMacroOptions } from './ActionItemsMacro';
export { ActionItemsBlock } from './ActionItemsBlock';
export type { ActionItemsBlockProps, AssignablePerson } from './ActionItemsBlock';
export {
    ACTION_ITEMS_MACRO_NAME,
    ACTION_ITEM_CATEGORY,
    actionItemMirrorRow,
    ensureItemIdEdit,
    STATUS_DONE,
    STATUS_PENDING,
    readActionItems,
    actionItemsMacroText,
    toggleItemEdit,
    setItemKeyEdit,
    setItemTextEdit,
    addItemEdit,
    removeItemEdit,
    removeItemKeyEdit,
    yamlScalar,
} from './actionItemsText';
export type { ActionItem, ActionItemMirrorRow, TextRangeEdit } from './actionItemsText';

// The agent -> human hand-off. Same registry, same one-range-per-edit rule;
// the difference is that a HITL answer has a SECOND reader outside the
// document, which is what `HitlMacroOptions.onAnswered` and
// `HITL_QUERYABILITY` are about.
export { HitlMacro, hitlRenderer } from './HitlMacro';
export type { HitlMacroOptions, HitlAnsweredEvent, HitlMirrorResult } from './HitlMacro';
export { HitlBlock, hitlPhase } from './HitlBlock';
export type { HitlBlockProps, HitlPerson } from './HitlBlock';
export {
    HITL_MACRO_NAME,
    MACRO_ITEM_SENTINEL_SECTION,
    HITL_QUERYABILITY,
    HITL_CONVERGENCE,
    HITL_SENTINEL_SECTION,
    HITL_ITEM_CATEGORY,
    readHitl,
    hitlExpired,
    hitlMacroText,
    answerHitlEdit,
    retractHitlEdit,
    setHitlAssigneeEdit,
    hitlMirrorRow,
} from './hitlText';
export type { HitlCallout, HitlOption, HitlDraft, HitlMirrorRow } from './hitlText';

// The recorded choice. Same registry, same one-range-per-edit rule. Unlike
// HITL it has NO second reader outside the document — nothing polls a decision
// — so there is no mirror, no busy state and no retract path. See
// `DECISION_QUERYABILITY`, which says that where the HITL note says the
// opposite.
export { DecisionMacro, decisionRenderer } from './DecisionMacro';
export type { DecisionMacroOptions } from './DecisionMacro';
export { DecisionBlock } from './DecisionBlock';
export type { DecisionBlockProps } from './DecisionBlock';
export {
    DECISION_MACRO_NAME,
    DECISION_QUERYABILITY,
    DECISION_STATUSES,
    readDecision,
    acceptsDecision,
    decisionMacroText,
    setDecisionStatusEdit,
    attributeDecisionEdit,
    supersedeDecisionEdit,
} from './decisionText';
export type { Decision, DecisionDraft, DecisionStatus } from './decisionText';

// One named, typed value — the third of the three citizens `MacroNode`'s
// header names, and the last one. Unlike the three above it, this one is NOT a
// card: a field carries one fact, and a bordered panel around "Owner: Ada"
// would be furniture around a single word. It is also the only renderer whose
// reader can be WRONG about its own payload and still draw — an invalid value
// is shown and flagged rather than refused, because the write side already
// makes one impossible and a fence is not a repairable state. See
// `fieldText.ts`'s header for both arguments.
export { FieldMacro, fieldRenderer } from './FieldMacro';
export { FieldBlock } from './FieldBlock';
export type { FieldBlockProps } from './FieldBlock';
export {
    FIELD_MACRO_NAME,
    FIELD_QUERYABILITY,
    FIELD_TYPES,
    readTypedField,
    acceptsField,
    fitsFieldType,
    fieldMacroText,
    fieldScalar,
    fieldNumber,
    fieldBoolean,
    fieldDate,
    formatFieldDate,
    formatFieldNumber,
    formatFieldValue,
    setFieldValueEdit,
    setFieldLabelEdit,
    setFieldTypeEdit,
} from './fieldText';
export type { TypedField, FieldDraft, FieldType } from './fieldText';

// The reference list — the fifth citizen, and the one that closes the last
// implemented SECTION renderer with no page representation (`link-block`).
// Structurally the simplest of the five: no lifecycle, nobody addressed,
// nothing queryable, no host seam. Its one load-bearing rule lives in
// `linkHref`: a `url:` scalar arrives from files and agents and becomes an
// `href`, so every scheme but http/https/mailto renders as text.
export { LinksMacro, linksRenderer } from './LinksMacro';
export { LinksBlock } from './LinksBlock';
export type { LinksBlockProps } from './LinksBlock';
export {
    LINKS_MACRO_NAME,
    linkHref,
    readLinks,
    linksMacroText,
    setLinkLabelEdit,
    setLinkUrlEdit,
    addLinkEdit,
    removeLinkEdit,
} from './linksText';
export type { LinkRow } from './linksText';

// The list arithmetic both plural macros share. Exported so a sixth citizen
// with the same `<key>:` block-sequence shape does not copy it a third time.
export {
    parseListBody,
    addListItemEdit,
    removeListItemEdit,
    setListItemKeyEdit,
    removeListItemKeyEdit,
} from './macroListText';

// The file card — the sixth citizen, and the one that closes the LAST section
// type with no page form (`file-upload`, which never had a section
// implementation either). The body carries a REFERENCE, never bytes, and the
// whole difficulty is on the host side: the bytes sit behind the reader's
// credentials and a node view has none, so `AttachmentMacroOptions.open` and
// `.resolve` are how a host lends them. Without them the card degrades to an
// anchor (absolute URL) or to text (hosted upload) — never to nothing.
export { AttachmentMacro, attachmentRenderer } from './AttachmentMacro';
export type { AttachmentMacroOptions } from './AttachmentMacro';
export { AttachmentBlock } from './AttachmentBlock';
export type { AttachmentBlockProps } from './AttachmentBlock';
export {
    ATTACHMENT_MACRO_NAME,
    UPLOAD_PATH_PREFIX,
    readAttachment,
    acceptsAttachment,
    attachmentHref,
    attachmentMacroText,
    isHostedUpload,
    isImageAttachment,
} from './attachmentText';
export type { Attachment, AttachmentDraft } from './attachmentText';
export { formatBytes } from '../../lib/formatBytes';
