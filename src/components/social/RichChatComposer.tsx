// RichChatComposer — the Teams/Slack message box: formatting, @mentions,
// emoji, and attachments staged in the composer rather than fired on drop.
//
// ## Why not extend ChatComposer
//
// `ChatComposer` is a <textarea>. Bold runs, a mention that is an ATOM rather
// than the characters "@Nora", a paste that keeps its list — all need a
// document model, and bolting one onto a textarea means reimplementing
// ProseMirror badly. So this is a second composer, and `ChatComposer` stays for
// hosts that want a plain field and should not pay for a rich-text stack.
//
// ## A mention is an atom, not text
//
// Typing "@Nora Da" and hoping a regex finds it later is how mentions break:
// edit the middle of the name, or have two people called Nora, and the link is
// gone or wrong. The mention node carries the userId, so what the sender picked
// is who the recipient is notified about, and backspace removes the whole chip.
//
// The node renders with class `mention`, which the library stylesheet already
// paints. An earlier pass invented `rich-mention`, matched no rule, and shipped
// mentions that rendered as plain text — the failure this note exists to stop
// recurring.
//
// ## Attachments wait for the message
//
// Files used to be handed to the host the moment they were dropped, so they
// left the composer before you could see what you had attached, add a second
// one, or write the sentence explaining them. An attachment is part of a
// message, not a message of its own, so they stage here and travel on send.
//
// ## Enter sends
//
// Enter sends, Shift+Enter is a newline — the chat convention, and the opposite
// of the document convention, which is why the composer owns this keymap.

import { useCallback, useMemo, useRef, useState, type ReactNode, type Ref } from 'react';
import { useEditor, EditorContent, ReactRenderer } from '@tiptap/react';
import { Extension, type Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Mention from '@tiptap/extension-mention';
import type { SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion';
import { cn } from '../../lib/cn';
import { ChatDropZone } from './ChatDropZone';
import { ReactionPickerPopover } from './ReactionPickerPopover';
import { ComposerAttachments, type StagedFile } from './ComposerAttachments';
import { MentionSuggestions, type MentionCandidate } from './MentionSuggestions';

export type { MentionCandidate };

/** What the composer hands back on send. */
export interface ComposedMessage {
  /** Rich body. Empty when only files were attached. */
  html: string;
  /** Plain-text fallback, for clients and notifications that cannot render HTML. */
  text: string;
  /** Everyone the sender explicitly mentioned, de-duplicated, in document order. */
  mentions: MentionCandidate[];
  /** Files staged in the composer, sent WITH the message. */
  files: File[];
}

export interface RichChatComposerProps {
  onSend: (message: ComposedMessage) => void;
  /**
   * Resolves the @ menu. A promise is supported so a host can hit a directory
   * rather than filter a preloaded array. Omit to disable mentions entirely.
   */
  onSearchPeople?: (query: string) => MentionCandidate[] | Promise<MentionCandidate[]>;
  /**
   * Enables attachments. False means this deployment has no file capability and
   * every attachment affordance disappears — not a disabled paperclip, which
   * promises something the product cannot do.
   *
   * Files arrive on SEND, in `ComposedMessage.files`, not on drop.
   */
  allowAttachments?: boolean;
  /** Turns the emoji picker on. */
  allowEmoji?: boolean;
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

let stagedSeq = 0;

export function RichChatComposer({
  onSend,
  onSearchPeople,
  allowAttachments = false,
  allowEmoji = false,
  placeholder = 'Write a message…',
  disabled = false,
  toolbarExtras,
  className,
  'data-testid': testId = 'rich-chat-composer',
}: RichChatComposerProps) {
  // The Enter keymap is built once, but `send` is recreated every render.
  // Reading it through a ref is what lets the extension stay stable without
  // capturing a stale closure over the staged files.
  const sendRef = useRef<() => void>(() => {});
  const fileInput = useRef<HTMLInputElement | null>(null);
  const emojiTrigger = useRef<HTMLButtonElement | null>(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [staged, setStaged] = useState<StagedFile[]>([]);
  // Mirrors emptiness so the send button can disable. `editor.isEmpty` is not
  // reactive, so reading it during render leaves the button one keystroke stale.
  const [empty, setEmpty] = useState(true);

  const attachmentsEnabled = allowAttachments && !disabled;

  const extensions = useMemo(() => {
    const list: unknown[] = [
      StarterKit.configure({
        // A chat message is not a document.
        heading: false,
        horizontalRule: false,
      }),
      Placeholder.configure({ placeholder }),
      // Enter is handled HERE, in the ProseMirror keymap, not as a React
      // onKeyDown on the wrapper.
      //
      // The mention plugin also binds Enter, and ProseMirror gives it the key
      // first: it commits the highlighted person and returns handled, so this
      // never runs. A React handler on the wrapper cannot achieve that — it
      // fires after the plugin has already closed the menu, so checking
      // "is the menu open?" is always false by then, and one Enter both picked
      // a person AND sent the message.
      Extension.create({
        name: 'chatComposerKeymap',
        addKeyboardShortcuts() {
          return {
            Enter: () => {
              sendRef.current();
              return true;
            },
            // The chat convention: Shift+Enter is the newline.
            'Shift-Enter': ({ editor: e }) => e.commands.setHardBreak(),
          };
        },
      }),
    ];

    if (onSearchPeople) {
      list.push(
        Mention.configure({
          // `mention`, matching the stylesheet. See the note at the top.
          HTMLAttributes: { class: 'mention' },
          suggestion: {
            char: '@',
            items: ({ query }: { query: string }) => onSearchPeople(query),
            render: () => {
              let renderer: ReactRenderer | null = null;

              // ReactRenderer BUILDS the menu; it does not put it on screen.
              // The upstream examples hand `renderer.element` to tippy.js for
              // that, which is a dependency this library does not carry — so
              // without these three lines the menu renders into a detached node
              // and typing "@" appears to do nothing at all. That is exactly
              // how mentions shipped broken once already.
              const place = (rect: DOMRect | null | undefined) => {
                const el = renderer?.element as HTMLElement | undefined;
                if (!el || !rect) return;
                el.style.position = 'absolute';
                el.style.zIndex = '9600';
                // Below the caret, and nudged up if that would run off-screen —
                // the caret is often near the bottom of the viewport in a chat.
                const below = rect.bottom + 6 + window.scrollY;
                const wouldOverflow = rect.bottom + 240 > window.innerHeight;
                el.style.top = `${wouldOverflow ? rect.top - 6 + window.scrollY : below}px`;
                el.style.left = `${rect.left + window.scrollX}px`;
                if (wouldOverflow) el.style.transform = 'translateY(-100%)';
                else el.style.transform = '';
              };

              return {
                onStart: (props: SuggestionProps) => {
                  renderer = new ReactRenderer(MentionSuggestions, {
                    props,
                    editor: props.editor,
                  });
                  const el = renderer.element as HTMLElement;
                  document.body.appendChild(el);
                  place(props.clientRect?.());
                },
                onUpdate: (props: SuggestionProps) => {
                  renderer?.updateProps(props);
                  place(props.clientRect?.());
                },
                // Returning the menu's answer is what stops Enter reaching the
                // composer and sending "@no" mid-selection.
                onKeyDown: (props: SuggestionKeyDownProps) => {
                  if (props.event.key === 'Escape') {
                    renderer?.element?.remove();
                    return true;
                  }
                  return (
                    (renderer?.ref as { onKeyDown?: (p: SuggestionKeyDownProps) => boolean } | null)
                      ?.onKeyDown?.(props) ?? false
                  );
                },
                onExit: () => {
                  // Removed from the DOM before destroy: destroy() unmounts the
                  // React tree but leaves the host node parented to <body>, so
                  // every dismissed menu would leak an empty div.
                  renderer?.element?.remove();
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
          class: 'chat-composer-input',
          'data-testid': `${testId}-input`,
        },
      },
    },
    // Read at creation only, so the editor is rebuilt when they change — a
    // stale closure here would search an old directory.
    [extensions, disabled],
  );

  // Files alone are a valid message: dragging in a screenshot and pressing send
  // without typing is the common case.
  const canSend = !disabled && (!empty || staged.length > 0);

  const send = useCallback(() => {
    if (!editor || !canSend) return;
    onSend({
      html: editor.isEmpty ? '' : editor.getHTML(),
      text: editor.getText(),
      mentions: collectMentions(editor),
      files: staged.map((s) => s.file),
    });
    editor.commands.clearContent(true);
    setStaged([]);
    setEmpty(true);
  }, [editor, canSend, onSend, staged]);

  sendRef.current = send;

  const stage = useCallback(
    (files: File[]) => {
      if (!attachmentsEnabled || files.length === 0) return;
      setStaged((prev) => [
        ...prev,
        ...files.map((file) => ({ id: `staged-${stagedSeq++}`, file })),
      ]);
    },
    [attachmentsEnabled],
  );

  const toolbarButton = (
    label: string,
    active: boolean,
    onClick: () => void,
    glyph: ReactNode,
    ref?: Ref<HTMLButtonElement>,
  ) => (
    <button
      key={label}
      ref={ref}
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      disabled={disabled}
      // mousedown + preventDefault, not click: clicking would blur the editor
      // and collapse the selection first, so "bold" would apply to nothing.
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(
        'grid h-7 w-7 place-items-center rounded text-sm leading-none',
        active ? 'bg-surface-hover text-text-primary' : 'text-text-secondary hover:bg-surface-hover',
      )}
    >
      {glyph}
    </button>
  );

  return (
    <ChatDropZone
      onFiles={stage}
      // `disabled` rather than an absent handler: the zone suppresses its own
      // overlay, so a build without file capability shows no "drop here" promise.
      disabled={!attachmentsEnabled}
      className={className}
    >
      <div
        data-testid={testId}
        className="chat-composer rounded-lg border border-border bg-surface focus-within:border-primary"
      >
        <EditorContent editor={editor} />

        <ComposerAttachments
          files={staged}
          disabled={disabled}
          onRemove={(id) => setStaged((prev) => prev.filter((s) => s.id !== id))}
        />

        <div className="flex items-center gap-0.5 border-t border-border px-1.5 py-1">
          {editor && [
            toolbarButton('Bold', editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), <b>B</b>),
            toolbarButton('Italic', editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), <i>I</i>),
            toolbarButton('Strikethrough', editor.isActive('strike'), () => editor.chain().focus().toggleStrike().run(), <s>S</s>),
            toolbarButton('Code', editor.isActive('code'), () => editor.chain().focus().toggleCode().run(), <span className="font-mono text-[11px]">{'<>'}</span>),
            <span key="sep1" aria-hidden className="mx-1 h-4 w-px bg-border" />,
            toolbarButton('Bulleted list', editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), <span>•</span>),
            toolbarButton('Numbered list', editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), <span className="text-[11px]">1.</span>),
            toolbarButton('Quote', editor.isActive('blockquote'), () => editor.chain().focus().toggleBlockquote().run(), <span>❝</span>),
          ]}

          {(allowEmoji || attachmentsEnabled) && (
            <span aria-hidden className="mx-1 h-4 w-px bg-border" />
          )}

          {allowEmoji && editor && (
            <span className="relative">
              {toolbarButton('Emoji', emojiOpen, () => setEmojiOpen((v) => !v), <span>🙂</span>, emojiTrigger)}
              <ReactionPickerPopover
                open={emojiOpen}
                triggerRef={emojiTrigger}
                onClose={() => setEmojiOpen(false)}
                onSelect={(emoji) => {
                  // Inserted at the cursor, not appended: someone who moved the
                  // caret back to fix a word expects the emoji where they are.
                  editor.chain().focus().insertContent(emoji).run();
                  setEmojiOpen(false);
                }}
              />
            </span>
          )}

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
                  stage(Array.from(e.target.files ?? []));
                  // Cleared so picking the SAME file twice still fires change.
                  e.target.value = '';
                }}
              />
            </>
          )}

          {toolbarExtras}

          <button
            type="button"
            onClick={send}
            disabled={!canSend}
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
