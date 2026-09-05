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
import Link from '@tiptap/extension-link';
import Suggestion from '@tiptap/suggestion';
import type { SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion';
import { cn } from '../../lib/cn';
import { ChatDropZone } from './ChatDropZone';
import { ReactionPickerPopover } from './ReactionPickerPopover';
import { ComposerAttachments, type StagedFile } from './ComposerAttachments';
import { LinkDialog } from './LinkDialog';
import { MentionSuggestions, type MentionCandidate } from './MentionSuggestions';
import { EmojiSuggestions } from './EmojiSuggestions';
import { searchEmoji, type EmojiShortcode } from './emojiShortcodes';

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
  /**
   * Asks the host for a URL when the link button is pressed, receiving the
   * selected text so it can prefill. Returning nothing cancels.
   *
   * A callback rather than a built-in prompt: `window.prompt` is blocked in
   * some embeddings and unstyleable in all of them, and a library that opens
   * one has decided what the host's dialogs look like.
   */
  onRequestLink?: (selectedText: string) => string | null | undefined;
  placeholder?: string;
  disabled?: boolean;
  /** Rendered between the formatting controls and the send button. */
  toolbarExtras?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

/**
 * Mounts a suggestion menu and keeps it at the caret.
 *
 * ReactRenderer BUILDS a menu; it does not put it on screen. The upstream
 * examples hand `renderer.element` to tippy.js, a dependency this library does
 * not carry — so without this the menu renders into a detached node and the
 * trigger character appears to do nothing. Mentions shipped broken that way
 * once; sharing the helper is what stops the emoji menu repeating it.
 */
function mountSuggestionMenu() {
  let host: HTMLElement | null = null;
  return {
    attach(el: HTMLElement) {
      host = el;
      document.body.appendChild(el);
    },
    place(rect: DOMRect | null | undefined) {
      if (!host || !rect) return;
      host.style.position = 'absolute';
      host.style.zIndex = '9600';
      // Flipped above when the caret sits near the bottom, which in a chat
      // composer is most of the time.
      const wouldOverflow = rect.bottom + 240 > window.innerHeight;
      host.style.top = `${(wouldOverflow ? rect.top - 6 : rect.bottom + 6) + window.scrollY}px`;
      host.style.left = `${rect.left + window.scrollX}px`;
      host.style.transform = wouldOverflow ? 'translateY(-100%)' : '';
    },
    detach() {
      host?.remove();
      host = null;
    },
  };
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
  onRequestLink,
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
  const linkRef = useRef<() => void>(() => {});
  const fileInput = useRef<HTMLInputElement | null>(null);
  const emojiTrigger = useRef<HTMLButtonElement | null>(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  // The link dialog's opening state. `text` is the selection at open time, so
  // the label field is prefilled with what the user highlighted.
  const [linkState, setLinkState] = useState<{ open: boolean; href: string; text: string }>(
    { open: false, href: '', text: '' },
  );
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
      Link.configure({
        openOnClick: false,
        // Typing or pasting a URL marks it automatically, which is what every
        // chat product does and what makes the toolbar button a rarity rather
        // than a requirement.
        autolink: true,
        HTMLAttributes: { rel: 'noopener noreferrer nofollow', target: '_blank' },
      }),
      // `:` emoji autocomplete, the way Teams and Slack do it. A second
      // Suggestion plugin rather than a second editor concept: the trigger
      // character is the only thing that differs, and reusing the plugin means
      // arrow keys, Enter/Tab and Escape behave identically in both menus.
      Extension.create({
        name: 'emojiSuggestion',
        // Above the default 100 that `chatComposerKeymap` runs at, so this
        // plugin sees Enter FIRST and can consume it while the menu is open.
        // Without it Enter fell through to the composer and sent the literal
        // ":fi" — the same failure the mention menu had, which only avoided it
        // because Mention ships a raised priority of its own.
        priority: 101,
        addProseMirrorPlugins() {
          return [
            Suggestion({
              editor: this.editor,
              char: ':',
              // Two characters before the menu opens. With `allow` on one, every
              // bare colon in "note: this" would pop a menu mid-sentence.
              allow: ({ state, range }) => {
                const text = state.doc.textBetween(range.from, range.to, '\0');
                return text.length >= 3;
              },
              items: ({ query }: { query: string }) => searchEmoji(query),
              command: ({ editor: e, range, props }) => {
                e.chain().focus().deleteRange(range).insertContent(props.emoji).run();
              },
              render: () => {
                let renderer: ReactRenderer | null = null;
                const menu = mountSuggestionMenu();
                return {
                  onStart: (props: SuggestionProps) => {
                    renderer = new ReactRenderer(EmojiSuggestions, {
                      props,
                      editor: props.editor,
                    });
                    menu.attach(renderer.element as HTMLElement);
                    menu.place(props.clientRect?.());
                  },
                  onUpdate: (props: SuggestionProps) => {
                    renderer?.updateProps(props);
                    menu.place(props.clientRect?.());
                  },
                  onKeyDown: (props: SuggestionKeyDownProps) => {
                    if (props.event.key === 'Escape') {
                      menu.detach();
                      return true;
                    }
                    return (
                      (
                        renderer?.ref as {
                          onKeyDown?: (p: SuggestionKeyDownProps) => boolean;
                        } | null
                      )?.onKeyDown?.(props) ?? false
                    );
                  },
                  onExit: () => {
                    menu.detach();
                    renderer?.destroy();
                  },
                };
              },
            }),
          ];
        },
      }),
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
            // The universal link shortcut. Bound here rather than on the
            // wrapper so it fires with the editor focused and the selection
            // still intact.
            'Mod-k': () => {
              linkRef.current();
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
              const menu = mountSuggestionMenu();

              return {
                onStart: (props: SuggestionProps) => {
                  renderer = new ReactRenderer(MentionSuggestions, {
                    props,
                    editor: props.editor,
                  });
                  menu.attach(renderer.element as HTMLElement);
                  menu.place(props.clientRect?.());
                },
                onUpdate: (props: SuggestionProps) => {
                  renderer?.updateProps(props);
                  menu.place(props.clientRect?.());
                },
                // Returning the menu's answer is what stops Enter reaching the
                // composer and sending "@no" mid-selection.
                onKeyDown: (props: SuggestionKeyDownProps) => {
                  if (props.event.key === 'Escape') {
                    menu.detach();
                    return true;
                  }
                  return (
                    (renderer?.ref as { onKeyDown?: (p: SuggestionKeyDownProps) => boolean } | null)
                      ?.onKeyDown?.(props) ?? false
                  );
                },
                onExit: () => {
                  // Detached before destroy: destroy() unmounts the React tree
                  // but leaves the host node parented to <body>, so every
                  // dismissed menu would leak an empty div.
                  menu.detach();
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

  /** Opens the dialog seeded from the selection, or from the link under it. */
  const openLinkDialog = useCallback(() => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    setLinkState({
      open: true,
      href: (editor.getAttributes('link').href as string) ?? '',
      text: editor.state.doc.textBetween(from, to),
    });
  }, [editor]);

  const applyLink = useCallback(
    ({ href, text }: { href: string; text: string }) => {
      if (!editor) return;
      const chain = editor.chain().focus();
      const { empty } = editor.state.selection;
      // With a selection, the label may have been rewritten in the dialog —
      // replacing it is what "adjust the text" means. With no selection there
      // is nothing to wrap, so the label (or the URL) becomes the text.
      if (empty) chain.insertContent(`<a href="${href}">${text || href}</a>`).run();
      else if (text) chain.insertContent(`<a href="${href}">${text}</a>`).run();
      else chain.setLink({ href }).run();
      setLinkState({ open: false, href: '', text: '' });
    },
    [editor],
  );

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
  linkRef.current = openLinkDialog;

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
            toolbarButton(
              editor.isActive('link') ? 'Edit link' : 'Add link',
              editor.isActive('link'),
              () => openLinkDialog(),
              <span aria-hidden>🔗</span>,
            ),
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
        <LinkDialog
          open={linkState.open}
          initialHref={linkState.href}
          initialText={linkState.text}
          onSubmit={(v) => (onRequestLink ? applyLink({ ...v, href: onRequestLink(v.text) ?? v.href }) : applyLink(v))}
          onRemove={() => {
            editor?.chain().focus().unsetLink().run();
            setLinkState({ open: false, href: '', text: '' });
          }}
          onClose={() => {
            setLinkState({ open: false, href: '', text: '' });
            // Focus returns to the editor, or the caret is lost and the next
            // keystroke goes nowhere.
            editor?.commands.focus();
          }}
        />
      </div>
    </ChatDropZone>
  );
}

export default RichChatComposer;
