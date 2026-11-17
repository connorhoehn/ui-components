// ui-components/src/components/code-pad/languages.ts
//
// The languages a CodePad can highlight, and the CodeMirror support for each.
// Every mode is imported statically: the packages are optional peers of the
// `./code-pad` subpath only, so an app that never opens a pad never installs
// or loads them, and one that does gets every language without an async step
// between choosing a language and seeing it highlighted.
import type { Extension } from '@codemirror/state';
import { StreamLanguage } from '@codemirror/language';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { go } from '@codemirror/lang-go';
import { cpp } from '@codemirror/lang-cpp';
import { swift } from '@codemirror/legacy-modes/mode/swift';

/** A language the pad can highlight. */
export type CodePadLanguage = 'python' | 'swift' | 'javascript' | 'typescript' | 'java' | 'go' | 'cpp';

/** Every language with the name a person reads, in the order a picker lists them. */
export const CODE_PAD_LANGUAGES: ReadonlyArray<{ value: CodePadLanguage; label: string }> = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'java', label: 'Java' },
  { value: 'go', label: 'Go' },
  { value: 'cpp', label: 'C++' },
  { value: 'swift', label: 'Swift' },
];

/** True when `value` names a language the pad supports. */
export function isCodePadLanguage(value: unknown): value is CodePadLanguage {
  return typeof value === 'string' && CODE_PAD_LANGUAGES.some((l) => l.value === value);
}

// One StreamLanguage instance for Swift, so switching away and back reuses it
// rather than registering a second language with the same name.
let swiftLanguage: StreamLanguage<unknown> | null = null;

/**
 * Builds the CodeMirror support for one extra language: a `LanguageSupport`
 * (`python()`, `rust()`, ...) or a `StreamLanguage` from a legacy mode. It is
 * called each time the pad switches to that language, so a `StreamLanguage`
 * should be defined once (at module scope) and returned, not defined inside.
 */
export type CodePadLanguageLoader = () => Extension;

/**
 * The CodeMirror extension that parses and highlights `language`. A loader in
 * `languages` wins over the built-in mode of the same name; a name with neither
 * shows plain text.
 */
export function languageExtension(
  language: string,
  languages?: Readonly<Record<string, CodePadLanguageLoader>>,
): Extension {
  const loader = languages && Object.prototype.hasOwnProperty.call(languages, language) ? languages[language] : undefined;
  if (loader) return loader();
  switch (language) {
    case 'python':
      return python();
    case 'javascript':
      return javascript();
    case 'typescript':
      return javascript({ typescript: true });
    case 'java':
      return java();
    case 'go':
      return go();
    case 'cpp':
      return cpp();
    case 'swift':
      swiftLanguage ??= StreamLanguage.define(swift);
      return swiftLanguage;
    default:
      return [];
  }
}
