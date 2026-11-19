import { Awareness } from 'y-protocols/awareness';
import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { JSX } from 'react';
import { LanguageSupport } from '@codemirror/language';
import { ReactNode } from 'react';
import { Ref } from 'react';
import * as Y from 'yjs';

/** Every language with the name a person reads, in the order a picker lists them. */
export declare const CODE_PAD_LANGUAGES: ReadonlyArray<{
    value: CodePadLanguage;
    label: string;
}>;

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
 * // CodePad and the Extension type come from this package's code-pad subpath.
 * import { StreamLanguage } from '@codemirror/language';
 * import { rust } from '@codemirror/legacy-modes/mode/rust';
 * import { EditorView } from '@codemirror/view';
 *
 * const rustLanguage = StreamLanguage.define(rust);
 * const languages = { rust: () => rustLanguage };
 * const extensions: Extension[] = [EditorView.lineWrapping];
 *
 * <CodePad ydoc={doc} provider={provider} language="rust" languages={languages} extensions={extensions} />
 * ```
 */
export declare function CodePad({ ydoc, ytext, textName, provider, user, defaultValue, value, onChange, language, languages, extensions, readOnly, placeholder, 'aria-label': ariaLabel, onPaste, onLocalEdit, variant, autoFocus, className, ref, }: CodePadProps): JSX.Element;

/** One change made by this person (never a remote one). */
export declare interface CodePadEdit {
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

/** What kind of change this person made. `insert` is text the app put in through the handle. */
export declare type CodePadEditKind = 'type' | 'paste' | 'drop' | 'delete' | 'undo' | 'redo' | 'move' | 'insert' | 'other';

/** Imperative access, through `ref`. */
export declare interface CodePadHandle {
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

/** A language the pad can highlight. */
export declare type CodePadLanguage = 'python' | 'swift' | 'javascript' | 'typescript' | 'java' | 'go' | 'cpp';

/**
 * Builds the CodeMirror support for one extra language: a `LanguageSupport`
 * (`python()`, `rust()`, ...) or a `StreamLanguage` from a legacy mode. It is
 * called each time the pad switches to that language, so a `StreamLanguage`
 * should be defined once (at module scope) and returned, not defined inside.
 */
export declare type CodePadLanguageLoader = () => Extension;

/** A paste (or a drop of text from outside the pad) by this person. */
export declare interface CodePadPaste {
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

export declare interface CodePadProps {
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

/** Minimal provider shape: the awareness that carries carets. Same as the document editor's. */
export declare interface CodePadProvider {
    awareness: Awareness;
}

/** The person typing, as other people's pads show them. */
export declare interface CodePadUser {
    name: string;
    /** Caret and name-badge colour; any CSS colour. */
    color: string;
    /** Selection tint. Defaults to `color` at about a fifth of its strength. */
    colorLight?: string;
}

/**
 * A read-only view of code over time: a `CodePad` showing the snapshot for the current time, over the library's `Slider` with question, run and paste markers as labelled, focusable stops; driven by the page (`timeMs` from a recording, `onTimeChange` to seek it).
 *
 * Import from `@connorhoehn/ui-components/code-pad`. It never plays by itself:
 *
 * ```tsx
 * const player = useRef<RecordingPlayerHandle>(null);
 * const [t, setT] = useState(0);
 * <RecordingPlayer ref={player} playlistUrl={url} onTimeUpdate={(s) => setT(s * 1000)} />
 * <CodePlayback frames={frames} markers={markers} durationMs={duration}
 *   timeMs={t} onTimeChange={(ms) => player.current?.seek(ms / 1000)} />
 * ```
 */
export declare function CodePlayback({ frames, markers, durationMs, timeMs, onTimeChange, language, languages, formatTime, emptyMessage, className, 'data-testid': testId, }: CodePlaybackProps): JSX.Element;

/** The whole text at one moment, `atMs` from the start. */
export declare interface CodePlaybackFrame {
    atMs: number;
    text: string;
    /** The language from this frame on; defaults to the playback's `language`. */
    language?: string;
}

/** Something that happened at a moment: a question asked, a run, a paste, or the page's own kind. */
export declare interface CodePlaybackMarker {
    atMs: number;
    kind: 'question' | 'run' | 'paste' | (string & {});
    /** What the stop is called ("Two sum", "Run 3", "Pasted 120 characters"). */
    label: string;
    /** A longer line, shown on hover and read with the label. */
    detail?: string;
}

/** The letter on the stop: Q, R, P, or the first letter of a page's own kind. */
export declare function codePlaybackMarkerLetter(kind: string): string;

/**
 * Which row each stop sits on (since 2.538.0), given their centres in px along the
 * strip in time order: each stop takes the first row whose last stop is at
 * least `pitchPx` to its left, else opens a new row. Stops far enough apart all
 * stay on row 0, so a sparse strip draws as before; stops that would touch (a
 * paste and a run a second apart) stack instead of overlapping.
 */
export declare function codePlaybackMarkerRows(centresPx: readonly number[], pitchPx?: number): number[];

export declare interface CodePlaybackProps {
    /** Snapshots in time order; the view shows the last frame at or before the time. */
    frames: readonly CodePlaybackFrame[];
    markers?: readonly CodePlaybackMarker[];
    /** Length of the timeline, in milliseconds. */
    durationMs: number;
    /** The time to show, controlled (tie it to a recording's `onTimeUpdate`). Omit and it keeps its own. */
    timeMs?: number;
    /** The slider moved or a marker was chosen; seek the recording here. */
    onTimeChange?(timeMs: number): void;
    /** Syntax mode for frames that name none. Default `'python'`. */
    language?: string;
    /** Extra languages, as `CodePad` takes them. */
    languages?: CodePadProps['languages'];
    /** How a time reads. Default `m:ss` (`h:mm:ss` past an hour). */
    formatTime?(ms: number): string;
    /** Shown instead of the editor when there are no frames. Default "No code was written." */
    emptyMessage?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/**
 * One program run's output, live or finished: a status chip in plain words, who ran it, time, memory and exit code when known and the host's actions, over compiler output, standard output and labelled standard error in the library's monospace console, with a line where output was cut.
 *
 * Import from `@connorhoehn/ui-components/code-pad`. It does not load the
 * editor: a page showing only output pays for no CodeMirror. It announces the
 * status change (a polite status region), not every line. It knows nothing of
 * queues or buttons: the page passes the run's fields and its own `actions`.
 *
 * ```tsx
 * <CodeRunOutput
 *   status={run.status}
 *   stdout={run.stdout}
 *   stderr={run.stderr}
 *   truncated={run.truncated}
 *   exitCode={run.exitCode}
 *   timeMs={run.timeMs}
 *   runBy="Run by Ada"
 *   languageLabel="Python"
 *   runtimeVersion="3.12"
 *   actions={<Button size="sm" onClick={runAgain}>Run again</Button>}
 * />
 * ```
 */
export declare function CodeRunOutput({ status, stdout, stderr, compileOutput, truncated, exitCode, timeMs, peakMemoryMb, runBy, languageLabel, runtimeVersion, follow, emptyMessage, actions, variant, className, 'data-testid': testId, }: CodeRunOutputProps): JSX.Element;

export declare interface CodeRunOutputProps {
    /** The run's status; `null` when nothing has been run yet. */
    status: CodeRunStatus | null;
    /** Standard output so far (or in full). */
    stdout?: string;
    /** Standard error so far (or in full). */
    stderr?: string;
    /** What the compiler printed, shown first. */
    compileOutput?: string;
    /** A stream that was cut at the output limit gets a line saying so after it. */
    truncated?: {
        stdout?: boolean;
        stderr?: boolean;
    };
    /** Shown in the header once known. */
    exitCode?: number | null;
    /** Wall time, shown in the header once known. */
    timeMs?: number | null;
    /** Peak memory, shown in the header once known. */
    peakMemoryMb?: number | null;
    /** Who started the run: a name ("Ada") shows as "Run by Ada"; text already starting "Run by" shows as given. */
    runBy?: string;
    /** The language's name as people read it ("Python"). */
    languageLabel?: string;
    /** The runtime's version ("3.12"), shown after the language. */
    runtimeVersion?: string;
    /** Keep the newest output in view while it grows. Default true. */
    follow?: boolean;
    /** Shown when `status` is null. Default "Nothing has been run yet." */
    emptyMessage?: ReactNode;
    /** The host's controls (Run again, Cancel), at the end of the header row. */
    actions?: ReactNode;
    /** `framed` (default) draws a rounded border; `flush` draws none, for a pane that has its own. */
    variant?: 'framed' | 'flush';
    className?: string;
    'data-testid'?: string;
}

/** Where a run is: waiting, building, running, or one of the ways it ended. */
export declare type CodeRunStatus = 'queued' | 'compiling' | 'running' | 'succeeded' | 'failed' | 'compile_error' | 'timed_out' | 'memory_exceeded' | 'cancelled' | 'internal_error'
/** The runner never started the program. */
| 'runner_unavailable';

/** The plain word the header shows for a status. Exported for hosts that list runs. */
export declare function codeRunStatusLabel(status: CodeRunStatus): string;

export { EditorView }

export { Extension }

/** True when `value` names a language the pad supports. */
export declare function isCodePadLanguage(value: unknown): value is CodePadLanguage;

export { LanguageSupport }

export { }


declare global {
    interface Window {
        /** Dev-only imperative canvas bridge — see `DevEditorBridge` above. */
        __pipelineEditor?: unknown;
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasListStyle: {
            /**
             * Make the caret's block a list of the style's kind (if it is not one
             * already) and set its marker.
             */
            setListStyle: (style: ListStyle) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        suggestChanges: {
            /** Turn suggestion mode on or off. */
            setSuggestionMode: (enabled: boolean) => ReturnType;
            /** Flip suggestion mode. */
            toggleSuggestionMode: () => ReturnType;
            /** Accept one suggestion: keep its insertions, remove its deletions. */
            acceptSuggestion: (id: SuggestionIdentity) => ReturnType;
            /** Reject one suggestion: drop its insertions, restore its deletions. */
            rejectSuggestion: (id: SuggestionIdentity) => ReturnType;
            /** Accept every suggestion in the document. */
            acceptAllSuggestions: () => ReturnType;
            /** Reject every suggestion in the document. */
            rejectAllSuggestions: () => ReturnType;
            /** Move the selection onto a suggestion. */
            selectSuggestion: (id: SuggestionIdentity) => ReturnType;
        };
    }
}
