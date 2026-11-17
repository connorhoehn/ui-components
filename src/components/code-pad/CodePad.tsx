// ui-components/src/components/code-pad/CodePad.tsx
//
// A code editor for two or three people typing in the same text: CodeMirror 6
// bound to a `Y.Text` through `y-codemirror.next`, with each person's caret and
// selection drawn in their awareness colour under their name.
//
// It takes its collaboration the way `TiptapEditor` does: the caller owns the
// `Y.Doc` and the provider (anything with an `awareness`), so `yjs` stays one
// instance shared with the app's provider. Without a `ydoc` the pad is a plain
// local editor (`defaultValue` / `value` / `onChange`), usable and testable on
// its own.
//
// It reports, it does not judge: `onPaste` says how many characters arrived and
// when; `onLocalEdit` describes every change this person made, for an app that
// keeps a timed log of edits. Remote changes are never reported as local ones.
import { useEffect, useImperativeHandle, useRef, type Ref } from 'react';
import { Annotation, Compartment, EditorState, type Extension, type Transaction } from '@codemirror/state';
import {
  EditorView,
  drawSelection,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
  placeholder as placeholderText,
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { bracketMatching, indentOnInput } from '@codemirror/language';
import { yCollab, ySyncAnnotation } from 'y-codemirror.next';
import * as Y from 'yjs';
import type { Awareness } from 'y-protocols/awareness';
import { cn } from '../../lib/cn';
import { languageExtension, type CodePadLanguage, type CodePadLanguageLoader } from './languages';
import { codePadHighlighting, codePadTheme } from './theme';

/** The person typing, as other people's pads show them. */
export interface CodePadUser {
  name: string;
  /** Caret and name-badge colour; any CSS colour. */
  color: string;
  /** Selection tint. Defaults to `color` at about a fifth of its strength. */
  colorLight?: string;
}

/** Minimal provider shape: the awareness that carries carets. Same as the document editor's. */
export interface CodePadProvider {
  awareness: Awareness;
}

/** A paste (or a drop of text from outside the pad) by this person. */
export interface CodePadPaste {
  /** Characters inserted. */
  characters: number;
  /** Lines the inserted text spans. */
  lines: number;
  /** Document offset where it landed. */
  from: number;
  /** When, in epoch milliseconds. */
  at: number;
  /** `drop` when the text was dragged in rather than pasted. */
  via: 'paste' | 'drop';
}

/** What kind of change this person made. `insert` is text the app put in through the handle. */
export type CodePadEditKind = 'type' | 'paste' | 'drop' | 'delete' | 'undo' | 'redo' | 'move' | 'insert' | 'other';

/** One change made by this person (never a remote one). */
export interface CodePadEdit {
  kind: CodePadEditKind;
  /** Lowest document offset the change touched (in the text before it). */
  from: number;
  /** Characters inserted. */
  inserted: number;
  /** Characters removed. */
  deleted: number;
  /** Document length after the change. */
  length: number;
  /** When, in epoch milliseconds. */
  at: number;
}

/** Imperative access, through `ref`. */
export interface CodePadHandle {
  /**
   * The CodeMirror view, or null before mount and after unmount. An escape
   * hatch for what the props do not cover (dispatching effects, reading the
   * state, measuring): prefer `extensions` for behaviour that should last, and
   * do not `destroy()` it or replace its state, which the pad owns.
   */
  readonly view: EditorView | null;
  /** The current text. */
  getText(): string;
  /**
   * Put text into the pad as this person: at the caret (default), the start,
   * the end, or an offset. Works on a read-only pad too, because the app (not
   * the person) is writing; it is reported to `onLocalEdit` as `insert`.
   */
  insertText(text: string, at?: 'cursor' | 'start' | 'end' | number): void;
  focus(): void;
}

export interface CodePadProps {
  /** Shared document. With it the pad edits `ytext` (or `ydoc.getText(textName)`); without it the pad is local. */
  ydoc?: Y.Doc;
  /** The shared text to edit. Defaults to `ydoc.getText(textName)`. */
  ytext?: Y.Text;
  /** Name of the shared text in `ydoc`. Default `'code'`. */
  textName?: string;
  /** Carries carets and names. Omit (or null) for a shared pad without carets. */
  provider?: CodePadProvider | null;
  /** This person, written into awareness so other pads can label the caret. */
  user?: CodePadUser;
  /** Local mode: the starting text. */
  defaultValue?: string;
  /** Local mode: the text, controlled. Ignored when the pad is shared. */
  value?: string;
  /** Every change to the text, local or remote, with the whole text. */
  onChange?: (text: string) => void;
  /**
   * Syntax mode; switching keeps the text. Default `'python'`. Any built-in
   * `CodePadLanguage`, or a name registered in `languages`; a name with neither
   * shows plain text.
   */
  language?: CodePadLanguage | (string & {});
  /**
   * Extra languages, by name, merged over the built-in ones (a loader named
   * like a built-in replaces it). Keep the object stable (module scope or
   * `useMemo`): the pad re-runs the current language's loader when it changes.
   */
  languages?: Readonly<Record<string, CodePadLanguageLoader>>;
  /**
   * Further CodeMirror extensions (keymaps, linters, autocompletion, gutters,
   * theme tweaks), added after the pad's own, so on equal precedence the pad's
   * keymap runs first; wrap one in `Prec.high` to go ahead of it. Changing the
   * list reconfigures the live editor in place: the text, the shared-document
   * binding, the carets and the undo history stay. A new array with the same
   * items does nothing, but keep the items themselves stable (module scope or
   * `useMemo`), since a new item is a new extension.
   */
  extensions?: readonly Extension[];
  /** Shows the text (and other people's changes) but refuses typing, pasting and deleting. */
  readOnly?: boolean;
  /** Shown while the pad is empty. */
  placeholder?: string;
  /** Accessible name of the editing area. Default "Code". */
  'aria-label'?: string;
  /** Reports each paste by this person: how many characters, and when. */
  onPaste?: (paste: CodePadPaste) => void;
  /** Reports each change this person makes, for an app that logs edits. */
  onLocalEdit?: (edit: CodePadEdit) => void;
  /** `framed` (default) draws a rounded border; `flush` draws none, for a pane that has its own. */
  variant?: 'framed' | 'flush';
  /** Focus the pad when it mounts. */
  autoFocus?: boolean;
  className?: string;
  ref?: Ref<CodePadHandle>;
}

/** Marks a transaction that carries the controlled `value` in, so it is not reported as an edit. */
const externalValue = Annotation.define<boolean>();
/** Marks a transaction the app made through `insertText`. */
const appInsert = Annotation.define<boolean>();

function kindOf(tr: Transaction): CodePadEditKind {
  if (tr.annotation(appInsert)) return 'insert';
  if (tr.isUserEvent('input.paste')) return 'paste';
  if (tr.isUserEvent('input.drop')) return 'drop';
  if (tr.isUserEvent('input')) return 'type';
  if (tr.isUserEvent('delete')) return 'delete';
  if (tr.isUserEvent('undo')) return 'undo';
  if (tr.isUserEvent('redo')) return 'redo';
  if (tr.isUserEvent('move')) return 'move';
  return 'other';
}

// Read-only is enforced twice: `EditorState.readOnly` stops CodeMirror's own
// commands and input handling, and this filter drops any user-event change that
// still gets through (an IME composition, a drop, an undo). Remote changes carry
// no user event, so other people's typing still shows.
const USER_EDITS = ['input', 'delete', 'undo', 'redo', 'move'];
const readOnlyGuard = EditorState.changeFilter.of(
  (tr) => !(tr.startState.readOnly && USER_EDITS.some((e) => tr.isUserEvent(e))),
);

function readOnlyExtension(readOnly: boolean): Extension {
  return readOnly
    ? [EditorState.readOnly.of(true), EditorView.editable.of(false), EditorView.contentAttributes.of({ tabindex: '0', 'aria-readonly': 'true' })]
    : [];
}

function placeholderExtension(text: string | undefined): Extension {
  return text ? placeholderText(text) : [];
}

function changeSummary(changes: Transaction['changes']): { from: number; inserted: number; deleted: number; lines: number } {
  let from = Number.POSITIVE_INFINITY;
  let inserted = 0;
  let deleted = 0;
  let lines = 0;
  changes.iterChanges((fromA, toA, _fromB, _toB, text) => {
    from = Math.min(from, fromA);
    inserted += text.length;
    deleted += toA - fromA;
    lines += text.length > 0 ? text.lines : 0;
  });
  return { from: Number.isFinite(from) ? from : 0, inserted, deleted, lines };
}

/**
 * A collaborative code editor: CodeMirror 6 on a shared `Y.Text` with named remote carets, seven languages, read-only, and paste and edit reports; local text without a `ydoc`; extendable with app CodeMirror `extensions`, extra `languages` and the view on its ref.
 *
 * Import from `@connorhoehn/ui-components/code-pad`. Needs the optional peers
 * `@codemirror/{state,view,commands,language,lang-python,lang-javascript,lang-java,lang-go,lang-cpp,legacy-modes}`,
 * `@lezer/highlight` and `y-codemirror.next`, beside `yjs` (and `y-protocols` for awareness).
 *
 * Extending it: pass `extensions` (any CodeMirror `Extension`, after the pad's
 * own, reconfigured in place when the list changes), register more languages
 * by name in `languages` and select one with `language`, and reach the live
 * `EditorView` through `ref.current.view` for anything else. `Extension`,
 * `EditorView` and `LanguageSupport` are re-exported as types from this subpath.
 *
 * ```tsx
 * import { CodePad, type Extension } from '@connorhoehn/ui-components/code-pad';
 * import { StreamLanguage } from '@codemirror/language';
 * import { rust } from '@codemirror/legacy-modes/mode/rust';
 * import { autocompletion } from '@codemirror/autocomplete';
 *
 * const rustLanguage = StreamLanguage.define(rust);
 * const languages = { rust: () => rustLanguage };
 * const extensions: Extension[] = [autocompletion()];
 *
 * <CodePad ydoc={doc} provider={provider} language="rust" languages={languages} extensions={extensions} />
 * ```
 */
export function CodePad({
  ydoc,
  ytext,
  textName = 'code',
  provider = null,
  user,
  defaultValue = '',
  value,
  onChange,
  language = 'python',
  languages,
  extensions,
  readOnly = false,
  placeholder,
  'aria-label': ariaLabel = 'Code',
  onPaste,
  onLocalEdit,
  variant = 'framed',
  autoFocus = false,
  className,
  ref,
}: CodePadProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const compartments = useRef({
    language: new Compartment(),
    readOnly: new Compartment(),
    placeholder: new Compartment(),
    label: new Compartment(),
    extensions: new Compartment(),
  });

  // Latest props for the listeners the view was built with.
  const latest = useRef({ onChange, onPaste, onLocalEdit, language, languages, extensions, readOnly, placeholder, ariaLabel, value, defaultValue, autoFocus });
  latest.current = { onChange, onPaste, onLocalEdit, language, languages, extensions, readOnly, placeholder, ariaLabel, value, defaultValue, autoFocus };

  // The app's extensions, held by item so a new array with the same items is
  // not a change (a caller writing `extensions={[a, b]}` inline).
  const appExtensions = useStableItems(extensions);
  // Only the loader for the language in use matters for a reconfigure.
  const languageLoader = languages && Object.prototype.hasOwnProperty.call(languages, language) ? languages[language] : undefined;

  const shared = ytext ?? (ydoc ? ydoc.getText(textName) : null);
  const awareness = provider?.awareness ?? null;

  // Build the view. Rebuilt only when the shared text or the awareness changes;
  // everything else is reconfigured in place.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const c = compartments.current;
    const props = latest.current;

    const report = (tr: Transaction, kind: CodePadEditKind, length: number) => {
      const { from, inserted, deleted, lines } = changeSummary(tr.changes);
      const at = Date.now();
      latest.current.onLocalEdit?.({ kind, from, inserted, deleted, length, at });
      if ((kind === 'paste' || kind === 'drop') && inserted > 0) {
        latest.current.onPaste?.({ characters: inserted, lines, from, at, via: kind === 'paste' ? 'paste' : 'drop' });
      }
    };

    let undoManager: Y.UndoManager | null = null;
    let collab: Extension;
    if (shared) {
      undoManager = new Y.UndoManager(shared);
      collab = yCollab(shared, awareness, { undoManager });
    } else {
      collab = [history(), keymap.of(historyKeymap)];
    }

    const extensions: Extension[] = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightActiveLine(),
      drawSelection(),
      indentOnInput(),
      bracketMatching(),
      codePadHighlighting,
      codePadTheme,
      keymap.of([...defaultKeymap, indentWithTab]),
      collab,
      readOnlyGuard,
      c.language.of(languageExtension(props.language, props.languages)),
      c.readOnly.of(readOnlyExtension(props.readOnly)),
      c.placeholder.of(placeholderExtension(props.placeholder)),
      c.label.of(EditorView.contentAttributes.of({ 'aria-label': props.ariaLabel })),
      EditorView.updateListener.of((update) => {
        if (!update.docChanged) return;
        for (const tr of update.transactions) {
          if (!tr.docChanged) continue;
          // Remote typing, and undo/redo replayed by the shared undo manager,
          // arrive through the binding; the undo manager reports its own below.
          if (tr.annotation(ySyncAnnotation) !== undefined) continue;
          if (tr.annotation(externalValue)) continue;
          report(tr, kindOf(tr), tr.newDoc.length);
        }
        latest.current.onChange?.(update.state.doc.toString());
      }),
      // Last, so the app's extensions come after every built-in one.
      c.extensions.of(props.extensions ? [...props.extensions] : []),
    ];

    const initial = shared ? shared.toString() : (props.value ?? props.defaultValue);
    const view = new EditorView({
      parent: host,
      state: EditorState.create({ doc: initial, extensions }),
    });
    viewRef.current = view;

    // In a shared pad, undo and redo are Yjs operations that reach the editor
    // as a binding transaction; report them as this person's edits here.
    let observer: ((event: Y.YTextEvent, tr: Y.Transaction) => void) | null = null;
    if (shared && undoManager) {
      const um = undoManager;
      observer = (event, tr) => {
        if (tr.origin !== um) return;
        let index = 0;
        let from = Number.POSITIVE_INFINITY;
        let inserted = 0;
        let deleted = 0;
        for (const op of event.delta) {
          if (op.retain) index += op.retain;
          if (typeof op.insert === 'string') {
            from = Math.min(from, index);
            inserted += op.insert.length;
            index += op.insert.length;
          }
          if (op.delete) {
            from = Math.min(from, index);
            deleted += op.delete;
          }
        }
        latest.current.onLocalEdit?.({
          kind: um.undoing ? 'undo' : 'redo',
          from: Number.isFinite(from) ? from : 0,
          inserted,
          deleted,
          length: shared.length,
          at: Date.now(),
        });
      };
      shared.observe(observer);
    }

    if (props.autoFocus) view.focus();

    return () => {
      if (observer && shared) shared.unobserve(observer);
      view.destroy();
      undoManager?.destroy();
      if (viewRef.current === view) viewRef.current = null;
    };
  }, [shared, awareness]);

  // This person's name and colour, merged into whatever awareness already holds.
  useEffect(() => {
    if (!awareness || !user) return;
    const existing = (awareness.getLocalState()?.user as Record<string, unknown> | undefined) ?? {};
    awareness.setLocalStateField('user', {
      ...existing,
      name: user.name,
      color: user.color,
      colorLight: user.colorLight ?? `color-mix(in srgb, ${user.color} 20%, transparent)`,
    });
  }, [awareness, user?.name, user?.color, user?.colorLight]);

  // Clear the caret this pad published, so it does not linger in other pads.
  useEffect(() => {
    if (!awareness) return;
    return () => {
      if (awareness.getLocalState()) awareness.setLocalStateField('cursor', null);
    };
  }, [awareness]);

  // Skip the first run: the view was just built with the current values.
  const configured = useRef({ language, languageLoader, appExtensions });
  useEffect(() => {
    const was = configured.current;
    if (was.language === language && was.languageLoader === languageLoader) return;
    configured.current = { ...was, language, languageLoader };
    viewRef.current?.dispatch({
      effects: compartments.current.language.reconfigure(languageExtension(language, latest.current.languages)),
    });
  }, [language, languageLoader]);

  useEffect(() => {
    if (configured.current.appExtensions === appExtensions) return;
    configured.current = { ...configured.current, appExtensions };
    viewRef.current?.dispatch({ effects: compartments.current.extensions.reconfigure(appExtensions ? [...appExtensions] : []) });
  }, [appExtensions]);

  useEffect(() => {
    viewRef.current?.dispatch({ effects: compartments.current.readOnly.reconfigure(readOnlyExtension(readOnly)) });
  }, [readOnly]);

  useEffect(() => {
    viewRef.current?.dispatch({ effects: compartments.current.placeholder.reconfigure(placeholderExtension(placeholder)) });
  }, [placeholder]);

  useEffect(() => {
    viewRef.current?.dispatch({
      effects: compartments.current.label.reconfigure(EditorView.contentAttributes.of({ 'aria-label': ariaLabel })),
    });
  }, [ariaLabel]);

  // Controlled local text: bring the editor to `value` when it differs.
  useEffect(() => {
    const view = viewRef.current;
    if (shared || value === undefined || !view) return;
    const current = view.state.doc.toString();
    if (current === value) return;
    view.dispatch({
      changes: { from: 0, to: current.length, insert: value },
      annotations: externalValue.of(true),
    });
  }, [value, shared]);

  useImperativeHandle(
    ref,
    () => ({
      get view() {
        return viewRef.current;
      },
      getText() {
        return viewRef.current?.state.doc.toString() ?? '';
      },
      insertText(text: string, at: 'cursor' | 'start' | 'end' | number = 'cursor') {
        const view = viewRef.current;
        if (!view) return;
        const length = view.state.doc.length;
        const pos =
          typeof at === 'number'
            ? Math.max(0, Math.min(at, length))
            : at === 'start'
              ? 0
              : at === 'end'
                ? length
                : view.state.selection.main.head;
        view.dispatch({
          changes: { from: pos, insert: text },
          selection: { anchor: pos + text.length },
          annotations: appInsert.of(true),
          scrollIntoView: true,
        });
      },
      focus() {
        viewRef.current?.focus();
      },
    }),
    [],
  );

  return (
    <div
      ref={hostRef}
      data-testid="code-pad"
      data-language={language}
      data-readonly={readOnly ? 'true' : undefined}
      data-shared={shared ? 'true' : undefined}
      className={cn(
        'relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-surface font-code text-[13px] [&>.cm-editor]:min-h-0 [&>.cm-editor]:flex-1',
        variant === 'framed' && 'rounded-md border border-solid border-border',
        className,
      )}
    />
  );
}

/** The same array back while its items are the same, by identity and order. */
function useStableItems<T>(items: readonly T[] | undefined): readonly T[] | undefined {
  const held = useRef(items);
  const prev = held.current;
  const same =
    prev === items ||
    (prev !== undefined && items !== undefined && prev.length === items.length && prev.every((x, i) => x === items[i]));
  if (!same) held.current = items;
  return held.current;
}

export default CodePad;
