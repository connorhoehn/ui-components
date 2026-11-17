// ui-components/src/components/code-pad/theme.ts
//
// The pad's look, written only in the library's colour tokens. Every value is a
// `var(--color-…)`, so the pad follows the app between light and dark (the
// `[data-theme="dark"]` block re-points the tokens) without a second theme or a
// prop: there is nothing here for a dark mode to override.
//
// CodeMirror styles itself through generated classes, so its colours have to be
// given to it as a theme extension rather than as utility classes on the
// wrapper. The wrapper still carries `font-code` so the code face token is
// emitted into the stylesheet wherever a pad is used.
import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

const CODE_FONT = 'var(--font-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)';
const UI_FONT = 'var(--font-sans, system-ui, sans-serif)';
const SELECTION = 'color-mix(in srgb, var(--color-primary) 22%, transparent)';
const ACTIVE_LINE = 'color-mix(in srgb, var(--color-primary) 5%, transparent)';

export const codePadTheme = EditorView.theme({
  '&': {
    height: '100%',
    color: 'var(--color-text-primary)',
    backgroundColor: 'var(--color-surface)',
  },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': {
    fontFamily: CODE_FONT,
    lineHeight: '1.6',
  },
  '.cm-content': {
    caretColor: 'var(--color-text-primary)',
    paddingBlock: '8px',
  },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--color-text-primary)' },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
    { backgroundColor: SELECTION },
  '.cm-activeLine': { backgroundColor: ACTIVE_LINE },
  '.cm-gutters': {
    backgroundColor: 'var(--color-surface-panel)',
    color: 'var(--color-text-tertiary)',
    borderRight: '1px solid var(--color-border)',
  },
  '.cm-activeLineGutter': {
    backgroundColor: ACTIVE_LINE,
    color: 'var(--color-text-secondary)',
  },
  '.cm-lineNumbers .cm-gutterElement': { paddingInline: '8px 10px' },
  '&.cm-focused .cm-matchingBracket': {
    backgroundColor: 'color-mix(in srgb, var(--color-success) 20%, transparent)',
    outline: '1px solid color-mix(in srgb, var(--color-success) 45%, transparent)',
  },
  '&.cm-focused .cm-nonmatchingBracket': {
    backgroundColor: 'color-mix(in srgb, var(--color-danger) 18%, transparent)',
  },
  '.cm-placeholder': { color: 'var(--color-text-tertiary)' },
  // Another person's caret: the binding paints it in their awareness colour;
  // the name above it is set in the interface face rather than the binding's
  // serif default, and stays readable (dimmed) instead of appearing only on
  // hover, the way the document editor's carets carry their badge.
  '.cm-ySelectionInfo': {
    fontFamily: UI_FONT,
    fontSize: '10px',
    fontWeight: '600',
    lineHeight: '1.4',
    color: 'white',
    padding: '0 4px',
    borderRadius: '3px 3px 3px 0',
    top: '-1.45em',
    opacity: '0.85',
  },
  '.cm-ySelectionCaret:hover > .cm-ySelectionInfo': { opacity: '1' },
});

/** Syntax colours from the semantic tokens; each has a light and a dark value. */
export const codePadHighlightStyle = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.moduleKeyword, t.operatorKeyword, t.definitionKeyword, t.modifier], color: 'var(--color-accent-fg)' },
  { tag: [t.string, t.special(t.string), t.regexp, t.character], color: 'var(--color-success-fg)' },
  { tag: [t.number, t.bool, t.null, t.atom, t.unit], color: 'var(--color-warning-fg)' },
  { tag: [t.comment, t.lineComment, t.blockComment, t.docComment], color: 'var(--color-text-tertiary)', fontStyle: 'italic' },
  { tag: [t.function(t.variableName), t.function(t.propertyName), t.definition(t.function(t.variableName))], color: 'var(--color-info-fg)' },
  { tag: [t.typeName, t.className, t.namespace, t.definition(t.typeName)], color: 'var(--color-primary-fg)' },
  { tag: [t.meta, t.annotation, t.processingInstruction], color: 'var(--color-warning-fg)' },
  { tag: [t.operator, t.punctuation, t.separator, t.bracket], color: 'var(--color-text-secondary)' },
  { tag: [t.propertyName, t.attributeName], color: 'var(--color-text-primary)' },
  { tag: t.invalid, color: 'var(--color-danger-fg)' },
  { tag: t.strong, fontWeight: '600' },
  { tag: t.emphasis, fontStyle: 'italic' },
]);

export const codePadHighlighting = syntaxHighlighting(codePadHighlightStyle);
