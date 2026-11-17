import { Awareness } from 'y-protocols/awareness';
import { EditorView } from '@codemirror/view';
import { JSX } from 'react';
import { Ref } from 'react';
import * as Y from 'yjs';

/** Every language with the name a person reads, in the order a picker lists them. */
export declare const CODE_PAD_LANGUAGES: ReadonlyArray<{
    value: CodePadLanguage;
    label: string;
}>;

/**
 * A collaborative code editor: CodeMirror 6 on a shared `Y.Text` with named remote carets, seven languages, read-only, and paste and edit reports; local text without a `ydoc`.
 *
 * Import from `@connorhoehn/ui-components/code-pad`. Needs the optional peers
 * `@codemirror/{state,view,commands,language,lang-python,lang-javascript,lang-java,lang-go,lang-cpp,legacy-modes}`,
 * `@lezer/highlight` and `y-codemirror.next`, beside `yjs` (and `y-protocols` for awareness).
 */
export declare function CodePad({ ydoc, ytext, textName, provider, user, defaultValue, value, onChange, language, readOnly, placeholder, 'aria-label': ariaLabel, onPaste, onLocalEdit, variant, autoFocus, className, ref, }: CodePadProps): JSX.Element;

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
    /** The CodeMirror view, or null before mount and after unmount. */
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
    /** Syntax mode; switching keeps the text. Default `'python'`. */
    language?: CodePadLanguage;
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

/** True when `value` names a language the pad supports. */
export declare function isCodePadLanguage(value: unknown): value is CodePadLanguage;

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
