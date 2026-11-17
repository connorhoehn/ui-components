// ui-components/src/components/code-pad/index.ts
//
// The collaborative code editor. Published as its own `./code-pad` subpath, not
// from the root barrel, so that CodeMirror, its language modes and the Yjs
// binding (all optional peers) reach only an app that opens a pad.

export { CodePad } from './CodePad';
export type {
  CodePadProps,
  CodePadUser,
  CodePadProvider,
  CodePadPaste,
  CodePadEdit,
  CodePadEditKind,
  CodePadHandle,
} from './CodePad';
export { CODE_PAD_LANGUAGES, isCodePadLanguage } from './languages';
export type { CodePadLanguage, CodePadLanguageLoader } from './languages';
// The CodeMirror types an app needs to write `extensions` or `languages` for a
// pad, so it does not deep-import them. Type-only: they add nothing at runtime.
export type { Extension } from '@codemirror/state';
export type { EditorView } from '@codemirror/view';
export type { LanguageSupport } from '@codemirror/language';
