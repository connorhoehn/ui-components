// RichChatComposer — the Teams/Slack message box: formatting, @mentions,
// attachments and drag-drop in one field.
//
// ## Why not extend ChatComposer
//
// `ChatComposer` is a <textarea>. Everything here — bold runs, a mention that
// is an ATOM rather than the characters "@Nora", a paste that keeps its list —
// requires a document model, and bolting one onto a textarea means
// reimplementing ProseMirror badly. So this is a second composer, and
// `ChatComposer` stays for hosts that genuinely want a plain field (a support
// widget, a terminal, a comment box) and should not pay for a rich-text stack.
//
// ## A mention is an atom, not text
//
// Typing "@Nora Da" and hoping a regex finds it later is how mentions break:
// the moment someone edits the middle of the name, or two people share a first
// name, the link is gone or wrong. The mention node carries the userId, so what
// the sender picked is what the recipient is notified about, and backspacing
// removes the whole chip rather than one letter of it.
//
// ## Enter sends
//
// Enter sends, Shift+Enter is a newline — the chat convention, and the opposite
// of the document convention. This is why the composer owns the keymap rather
// than inheriting the editor's: in a document Enter must make a paragraph.

import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { useEditor, EditorContent, ReactRenderer } from '@tiptap/react';
import type { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Mention from '@tiptap/extension-mention';
import { cn } from '../../lib/cn';
import { ChatDropZone } from './ChatDropZone';
import type { SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion';
import { MentionSuggestions, type MentionCandidate } from './MentionSuggestions';

export type { MentionCandidate };

/** What the composer hands back on send. */
export interface ComposedMessage {
  /** Rich body. Empty when the user typed only whitespace. */
  html: string;
  /** Plain-text fallback, for clients and notifications that cannot render HTML. */
  text: string;
  /** Everyone the sender explicitly mentioned, de-duplicated, in document order. */
  mentions: MentionCandidate[];
}

export interface RichChatComposerProps {
  onSend: (message: ComposedMessage) => void;
  /**
   * Resolves the @ menu. Returning a promise is supported so a host can hit a
   * directory rather than filter a preloaded array.
   */
  onSearchPeople?: (query: string) => MentionCandidate[] | Promise<MentionCandidate[]>;
  /**
   * Files chosen with the paperclip or dropped on the composer.
   *
   * Absent means this deployment has no file capability, and every attachment
   * affordance disappears — not a disabled paperclip, which promises something
   * the product cannot do.
   */
  onSendFiles?: (files: File[]) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Rendered between the formatting controls and the send button. */
  toolbarExtras?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

/** Collects mention nodes in document order, de-duplicated by id. */
function collectMentions(editor: Editor): MentionCandidate[] {
  const seen = new Set<string>();
  const out: MentionCandidate[] = [];
  editor.state.doc.descendants((node) => {
    if (node.type.name !== 'mention') return;
    const id = String(node.attrs.id ?? '');
    if (!id || seen.has(id)) return;
    seen.add(id);
    out.push({ id, label: String(node.attrs.label ?? id) });
  });
  return out;
}

export function RichChatComposer({
  onSend,
  onSearchPeople,
  onSendFiles,
  placeholder = 'Write a message…',
  disabled = false,
  toolbarExtras,
  className,
  'data-testid': testId = 'rich-chat-composer',
}: RichChatComposerProps) {
  const fileInput = useRef<HTMLInputElement | null>(null);
  // Mirrors the editor's emptiness so the send button can disable. Kept in
  // state rather than read during render: `editor.isEmpty` is not reactive, so
  // reading it inline leaves the button stale by one keystroke.
  const [empty, setEmpty] = useState(true);

  const attachmentsEnabled = !!onSendFiles && !disabled;

  const extensions = useMemo(() => {
    const list: unknown[] = [
      StarterKit.configure({
        // A chat message is not a document: no headings, no horizontal rules.
        heading: false,
        horizontalRule: false,
        codeBlock: false,
      }),
      Placeholder.configure({ placeholder }),
    ];

    if (onSearchPeople) {
      list.push(
        Mention.configure({
          HTMLAttributes: { class: 'rich-mention' },
          suggestion: {
            char: '@',
            items: ({ query }: { query: string }) => onSearchPeople(query),
            render: () => {
              let renderer: ReactRenderer | null = null;
              return {
                onStart: (props: SuggestionProps) => {
                  renderer = new ReactRenderer(MentionSuggestions, {
                    props,
                    editor: props.editor,
                  });
                },
                onUpdate: (props: SuggestionProps) => {
                  renderer?.updateProps(props);
                },
                // Returning the menu's answer is what stops Enter from
                // reaching the composer and sending "@no" mid-selection.
                onKeyDown: (props: SuggestionKeyDownProps) =>
                  (renderer?.ref as { onKeyDown?: (p: SuggestionKeyDownProps) => boolean } | null)
                    ?.onKeyDown?.(props) ?? false,
                onExit: () => {
                  renderer?.destroy();
                },
              };
            },
          },
        }),
      );
    }

    return list as never;
  }, [placeholder, onSearchPeople]);

  const editor = useEditor(
    {
      extensions,
      editable: !disabled,
      onUpdate: ({ editor: e }) => setEmpty(e.isEmpty),
      editorProps: {
        attributes: {
          class: 'outline-none min-h-[2.25rem] max-h-40 overflow-y-auto px-2 py-1.5 text-sm',
          'data-testid': `${testId}-input`,
        },
      },
    },
    // `placeholder` and the mention resolver are read at CREATION only, so the
    // editor has to be rebuilt when they change — a stale closure here would
    // search an old directory.
    [extensions, disabled],
  );

  const send = useCallback(() => {
    if (!editor || editor.isEmpty) return;
    onSend({
      html: editor.getHTML(),
      text: editor.getText(),
      mentions: collectMentions(editor),
    });
    editor.commands.clearContent(true);
    setEmpty(true);
  }, [editor, onSend]);

  const handleFiles = useCallback(
    (files: File[]) => {
      if (!attachmentsEnabled || files.length === 0) return;
      onSendFiles?.(files);
    },
    [attachmentsEnabled, onSendFiles],
  );

  const toolbarButton = (
    label: string,
    active: boolean,
    onClick: () => void,
    glyph: ReactNode,
  ) => (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      disabled={disabled}
      // onMouseDown + preventDefault, not onClick: clicking a toolbar button
      // would otherwise blur the editor and collapse the selection, so "bold"
      // would apply to nothing.
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(
        'grid h-7 w-7 place-items-center rounded text-sm',
        active ? 'bg-surface-hover text-text-primary' : 'text-text-secondary hover:bg-surface-hover',
      )}
    >
      {glyph}
    </button>
  );

  return (
    <ChatDropZone
      onFiles={handleFiles}
      // `disabled`, not an absent handler: the zone suppresses its own overlay,
      // so a deployment without file capability shows no "drop here" promise.
      disabled={!attachmentsEnabled}
      className={className}
    >
      <div
        data-testid={testId}
        className="rounded-lg border border-border bg-surface focus-within:border-primary"
      >
        <EditorContent
          editor={editor}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              // Not while the @ menu owns Enter — that keystroke is choosing a
              // person, not sending a half-typed message.
              if (document.querySelector('[data-testid="mention-suggestions"]')) return;
              e.preventDefault();
              send();
            }
          }}
        />

        <div className="flex items-center gap-1 border-t border-border px-1.5 py-1">
          {editor &&
            toolbarButton('Bold', editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), <b>B</b>)}
          {editor &&
            toolbarButton('Italic', editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), <i>I</i>)}
          {editor &&
            toolbarButton('Bulleted list', editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), <span>•</span>)}

          {attachmentsEnabled && (
            <>
              {toolbarButton('Attach files', false, () => fileInput.current?.click(), <span>📎</span>)}
              <input
                ref={fileInput}
                type="file"
                multiple
                hidden
                data-testid={`${testId}-file-input`}
                onChange={(e) => {
                  handleFiles(Array.from(e.target.files ?? []));
                  // Cleared so choosing the SAME file twice still fires change.
                  e.target.value = '';
                }}
              />
            </>
          )}

          {toolbarExtras}

          <button
            type="button"
            onClick={send}
            disabled={disabled || empty}
            data-testid={`${testId}-send`}
            className="ml-auto rounded bg-primary px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>
    </ChatDropZone>
  );
}

export default RichChatComposer;
