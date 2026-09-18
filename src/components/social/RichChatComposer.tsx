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
// ## `#` is the same idea for documents
//
// "See #Roadmap" is a reference, and a reference typed as text is a search the
// reader has to run. So `#` opens a document menu (`onSearchDocuments`) and the
// pick is a second Mention node, `docref`, carrying the document id; the send
// lists them in `ComposedMessage.documents` and the panel renders them as
// chips that open the document. Only a `#` at a word start opens the menu —
// `issue#42` is a word, not a trigger.
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
//
// ## Slash commands are two menus, not a parser
//
// `/` at the very start of the draft opens a menu of the host's commands; once
// a command with an `argument` is in place, a second menu offers what it acts
// on (`/doc Roa…` → the documents called Roadmap). Both are Suggestion plugins
// like `:` and `@`, so arrow keys, Enter/Tab and Escape behave identically in
// all four menus. A `/` anywhere else is a slash — "and/or" opens nothing.
//
// Disabled commands are NOT listed. The status bar already explains a disabled
// command (in warning colours, with its hint) to anyone who types it out, and a
// menu that offers rows which cannot be picked teaches people to distrust it.

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from 'react';
import { useEditor, EditorContent, ReactRenderer } from '@tiptap/react';
import { Extension, type Editor } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Mention from '@tiptap/extension-mention';
import Link from '@tiptap/extension-link';
import Suggestion from '@tiptap/suggestion';
import type { SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion';
import { cn } from '../../lib/cn';
import { FileInput } from '../forms/FileInput';
import { RovingToolbar } from '../shared/RovingToolbar';
import { ChatDropZone } from './ChatDropZone';
import { ReactionPickerPopover } from './ReactionPickerPopover';
import { ComposerAttachments, type StagedFile } from './ComposerAttachments';
import { LinkDialog } from './LinkDialog';
import { MentionSuggestions, type MentionCandidate } from './MentionSuggestions';
import { DocumentSuggestions, type DocumentCandidate } from './DocumentSuggestions';
import { EmojiSuggestions } from './EmojiSuggestions';
import { CommandSuggestions, type CommandSuggestionItem } from './CommandSuggestions';
import { searchEmoji, type EmojiShortcode } from './emojiShortcodes';
import { LinkIcon, PaperclipIcon, QuoteIcon, SmileyIcon } from '../ui/Icons';

export type { MentionCandidate, DocumentCandidate };

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
  /** Every document the sender referenced with `#`, de-duplicated, in document order. Absent when there are none. */
  documents?: Array<{ id: string; label: string }>;
  /**
   * Set when the draft starts with a known command trigger. `argument` is the
   * item picked from the argument menu, present only when the pick was made
   * in THIS draft and its label is still in the text — an edited-away label
   * means the person changed their mind, and the host should read `text`.
   */
  command?: { trigger: string; argument?: ComposerArgumentItem };
}

/** One thing a command can act on — a document, a room, a person. */
export type { ComposerArgumentItem, ComposerCommandArgument, ComposerCommand } from './composerCommands';
export { matchComposerCommand, composerCommandArgumentText } from './composerCommands';
import { matchComposerCommand, composerCommandArgumentText, type ComposerArgumentItem, type ComposerCommandArgument, type ComposerCommand } from './composerCommands';

/** What a host can do to the composer from outside — focus it, prefill it. */
export interface RichChatComposerHandle {
  /** The live tiptap editor, or null before mount. */
  readonly editor: Editor | null;
  focus: () => void;
  /** Inserts plain text at the caret, as if typed. */
  insertText: (text: string) => void;
}

export interface RichChatComposerProps {
  onSend: (message: ComposedMessage) => void;
  /**
   * Called when a command argument is picked with `onPick` → `'execute'`. The
   * draft has already been cleared; nothing goes through `onSend`.
   */
  onCommand?: (command: ComposerCommand, argument: ComposerArgumentItem) => void;
  /**
   * Resolves the @ menu. A promise is supported so a host can hit a directory
   * rather than filter a preloaded array. Omit to disable mentions entirely.
   */
  onSearchPeople?: (query: string) => MentionCandidate[] | Promise<MentionCandidate[]>;
  /**
   * Who is in this conversation. Given, the @ menu lists anyone
   * `onSearchPeople` returns who is NOT in it under "Not in this chat", and
   * picking them calls `onMentionNonMember` instead of inserting a mention —
   * a mention of someone who cannot read the message is a message to nobody.
   * Read live, like `onSearchPeople`.
   */
  mentionMembers?: ReadonlySet<string>;
  /** The host's add-to-chat flow, opened for the person picked under "Not in this chat". */
  onMentionNonMember?: (userId: string) => void;
  /**
   * Resolves the `#` menu — the documents a message can refer to. Omit to
   * disable document references entirely. Read live, like `onSearchPeople`:
   * a new function identity does not rebuild the editor.
   */
  onSearchDocuments?: (query: string) => DocumentCandidate[] | Promise<DocumentCandidate[]>;
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
  /**
   * Slash commands the host understands. While the draft starts with one, the
   * composer says so — a bar naming the command above the text and a
   * different border — so a person typing `/doc rename…` knows before Send
   * that this is an instruction to an agent, not a message to the room.
   */
  commands?: ComposerCommand[];
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

/** Collects the atoms of one node type in document order, de-duplicated by id. */
function collectRefs(editor: Editor, typeName: string): Array<{ id: string; label: string }> {
  const seen = new Set<string>();
  const out: Array<{ id: string; label: string }> = [];
  editor.state.doc.descendants((node) => {
    if (node.type.name !== typeName) return;
    const id = String(node.attrs.id ?? '');
    if (!id || seen.has(id)) return;
    seen.add(id);
    out.push({ id, label: String(node.attrs.label ?? id) });
  });
  return out;
}

/** Collects mention nodes in document order, de-duplicated by id. */
function collectMentions(editor: Editor): MentionCandidate[] {
  return collectRefs(editor, 'mention');
}

/** Collects `#` document references the same way. */
function collectDocuments(editor: Editor): Array<{ id: string; label: string }> {
  return collectRefs(editor, 'docref');
}

/**
 * A `#` opens the document menu only at a word start. The Suggestion plugin's
 * default prefix rule already refuses `issue#42`; this states the rule where
 * the extension is configured, so a future `allowedPrefixes` change cannot
 * silently turn every hashtag-in-a-word into a menu.
 */
function docrefAtWordStart({ state, range }: { state: { doc: { resolve: (pos: number) => { parentOffset: number; parent: { textBetween: (from: number, to: number, blockSeparator?: string, leafText?: string) => string } } } }; range: { from: number } }): boolean {
  const $pos = state.doc.resolve(range.from);
  if ($pos.parentOffset === 0) return true;
  const before = $pos.parent.textBetween($pos.parentOffset - 1, $pos.parentOffset, undefined, '\0');
  return before === '' || /[\s\0(\[{"'“‘]/.test(before);
}

/**
 * The `#` document reference: Mention again, under another name, so it is a
 * separate node type (its own class, its own collector) with the same atom
 * behaviour — one backspace removes the whole chip.
 */
const DocRef = Mention.extend({ name: 'docref' });
const docrefSuggestionKey = new PluginKey('docrefSuggestion');

let stagedSeq = 0;

// Each Suggestion plugin needs its own key. Two plugins sharing the default
// `SuggestionPluginKey` make ProseMirror throw at construction ("Adding
// different instances of a keyed plugin"), which the emoji plugin only avoids
// because Mention ships a key of its own.
const commandSuggestionKey = new PluginKey('commandSuggestion');
const argumentSuggestionKey = new PluginKey('commandArgumentSuggestion');

/** A menu's imperative surface, as ReactRenderer exposes it through `ref`. */
type SuggestionMenuRef = { onKeyDown?: (p: SuggestionKeyDownProps) => boolean } | null;

/**
 * The `render` for both command menus. Shared because the two differ only in
 * what fills the rows; the mount, the keyboard hand-off and the teardown are
 * identical to the `:` and `@` menus above.
 *
 * `keepItemsWhileLoading`: the plugin hands `items: []` with `loading: true`
 * before every fetch. For the synchronous command list that gap is invisible;
 * for a debounced argument search it would blank the menu on every keystroke,
 * so the last list stays up until the new one lands.
 */
function commandMenuRenderer(label: string, keepItemsWhileLoading: boolean, sendWhenExact = false) {
  let renderer: ReactRenderer | null = null;
  let lastItems: CommandSuggestionItem[] = [];
  const menu = mountSuggestionMenu();
  const withItems = (props: SuggestionProps<CommandSuggestionItem>) => {
    // The command menu also gets the draft: a fully typed trigger plus Enter
    // sends rather than re-inserting the trigger (see CommandSuggestions).
    const draft = sendWhenExact ? { draft: props.editor.getText() } : {};
    if (keepItemsWhileLoading && props.loading) return { ...props, items: lastItems, label, ...draft };
    lastItems = props.items;
    return { ...props, label, ...draft };
  };
  return {
    onStart: (props: SuggestionProps<CommandSuggestionItem>) => {
      lastItems = [];
      renderer = new ReactRenderer(CommandSuggestions, { props: withItems(props), editor: props.editor });
      menu.attach(renderer.element as HTMLElement);
      menu.place(props.clientRect?.());
    },
    onUpdate: (props: SuggestionProps<CommandSuggestionItem>) => {
      renderer?.updateProps(withItems(props));
      menu.place(props.clientRect?.());
    },
    onKeyDown: (props: SuggestionKeyDownProps) => {
      if (props.event.key === 'Escape') {
        menu.detach();
        return true;
      }
      return (renderer?.ref as SuggestionMenuRef)?.onKeyDown?.(props) ?? false;
    },
    onExit: () => {
      menu.detach();
      renderer?.destroy();
      renderer = null;
    },
  };
}

export const RichChatComposer = forwardRef<RichChatComposerHandle, RichChatComposerProps>(function RichChatComposer({
  onSend,
  onCommand,
  onSearchPeople,
  mentionMembers,
  onMentionNonMember,
  onSearchDocuments,
  allowAttachments = false,
  allowEmoji = false,
  onRequestLink,
  placeholder = 'Write a message…',
  commands,
  disabled = false,
  toolbarExtras,
  className,
  'data-testid': testId = 'rich-chat-composer',
}, ref) {
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

  // The placeholder as of this render, for the extension to read. See the
  // `useEditor` deps: the extension list must not change when the text does.
  const placeholderRef = useRef(placeholder);
  placeholderRef.current = placeholder;
  // Same idea: the editor is built once, the commands are read live.
  const commandsRef = useRef(commands);
  commandsRef.current = commands;
  // And the people search. Hosts derive it from a presence-driven directory,
  // so its identity changes every few seconds; as an extension dependency that
  // rebuilt the editor — and the words being typed vanished on a timer.
  const onSearchPeopleRef = useRef(onSearchPeople);
  onSearchPeopleRef.current = onSearchPeople;
  const mentionMembersRef = useRef(mentionMembers);
  mentionMembersRef.current = mentionMembers;
  const onMentionNonMemberRef = useRef(onMentionNonMember);
  onMentionNonMemberRef.current = onMentionNonMember;
  const hasSearchPeople = !!onSearchPeople;
  const onSearchDocumentsRef = useRef(onSearchDocuments);
  onSearchDocumentsRef.current = onSearchDocuments;
  const hasSearchDocuments = !!onSearchDocuments;
  const onCommandRef = useRef(onCommand);
  onCommandRef.current = onCommand;
  // The argument picked from the menu in this draft, if any. A ref, not state:
  // the Suggestion plugin reads it inside ProseMirror's state transitions,
  // where a React state value would be one render stale. Cleared on send and
  // whenever the draft is cleared.
  const argPickRef = useRef<{ trigger: string; item: ComposerArgumentItem } | null>(null);
  const [activeCommand, setActiveCommand] = useState<ComposerCommand | null>(null);
  // Whether the active command's argument is still blank, for the status bar.
  const [argumentEmpty, setArgumentEmpty] = useState(true);
  // The bar follows the DRAFT, not the render: re-derive whenever the host's
  // commands change (a document opened beside the chat), never clear on time.
  useEffect(() => {
    const e = editorRef.current;
    if (!e) return;
    const hit = matchComposerCommand(e.getText(), commands);
    setActiveCommand((prev) => (prev?.trigger === hit?.trigger && prev?.disabled === hit?.disabled ? prev : hit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commands]);
  const editorRef = useRef<{ getText: () => string } | null>(null);

  const extensions = useMemo(() => {
    const list: unknown[] = [
      StarterKit.configure({
        // A chat message is not a document.
        heading: false,
        horizontalRule: false,
        // StarterKit 3.x bundles Link, and registering it again below made
        // tiptap warn "Duplicate extension names found: ['link']" on every
        // mount. Two registrations of the same mark is not a cosmetic
        // warning: which configuration wins is undefined, so the openOnClick,
        // autolink and rel/target settings a few lines down were being
        // applied to a mark that may or may not have been the one in use.
        link: false,
      }),
      // Read through a ref, so a host that changes the placeholder does not
      // change the extension list. See the `useEditor` deps below: rebuilding
      // the editor is what THREW AWAY the draft.
      Placeholder.configure({ placeholder: () => placeholderRef.current }),
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
      // `/` command menu. Priority 101 for the same reason as the emoji menu:
      // Enter must reach this plugin before the composer's keymap sends.
      Extension.create({
        name: 'commandSuggestion',
        priority: 101,
        addProseMirrorPlugins() {
          return [
            Suggestion<CommandSuggestionItem, CommandSuggestionItem>({
              pluginKey: commandSuggestionKey,
              editor: this.editor,
              char: '/',
              // Only at the very start of the draft. A `/` after any text is
              // punctuation ("and/or", a URL path, a date), and a menu popping
              // mid-sentence is the fastest way to make people avoid the key.
              allow: ({ state, range }) => state.doc.textBetween(0, range.from, '\n', '\0').trim() === '',
              items: ({ query }) => {
                const q = query.toLowerCase();
                return (commandsRef.current ?? [])
                  .filter((c) => !c.disabled && c.trigger.slice(1).toLowerCase().startsWith(q))
                  .map((c) => ({ id: c.trigger, code: c.trigger, label: c.label, hint: c.hint, description: c.description }));
              },
              // The trigger plus its separator, so the argument menu (below)
              // can open on the very next keystroke.
              command: ({ editor: e, range, props }) => {
                e.chain().focus().deleteRange(range).insertContent(`${props.id} `).run();
              },
              render: () => commandMenuRenderer('Commands', false, true),
            }),
          ];
        },
      }),
      // The argument menu: `/doc Roa` offers the documents called Roadmap.
      //
      // A Suggestion plugin with a custom matcher rather than a hand-rolled
      // popup, so it inherits the caret positioning, the keyboard hand-off and
      // the Escape/dismissed bookkeeping the other three menus have. The match
      // is "the caret is in the first block, after a known trigger that has an
      // `argument`, and past the separator"; the range is the argument text,
      // which is what a pick replaces.
      Extension.create({
        name: 'commandArgumentSuggestion',
        priority: 101,
        addProseMirrorPlugins() {
          return [
            Suggestion<CommandSuggestionItem, CommandSuggestionItem>({
              pluginKey: argumentSuggestionKey,
              editor: this.editor,
              // Every keystroke re-runs the search; a promise-backed one gets
              // 120ms of quiet first. The previous list stays up meanwhile —
              // see `commandMenuRenderer`.
              debounce: 120,
              findSuggestionMatch: ({ $position }) => {
                // First top-level block only; a command draft is one line.
                if ($position.depth !== 1 || $position.index(0) !== 0) return null;
                const before = $position.parent.textBetween(0, $position.parentOffset, undefined, '\0');
                const cmd = matchComposerCommand(before, commandsRef.current);
                if (!cmd?.argument) return null;
                const argStart = before.length - before.trimStart().length + cmd.trigger.length + 1;
                // `/doc` with the caret right after it belongs to the `/` menu.
                if ($position.parentOffset < argStart) return null;
                const rest = before.slice(argStart);
                // Once something has been picked and its label is intact, the
                // menu stays away: reopening it over the label would offer the
                // pick that was just made.
                const pick = argPickRef.current;
                if (pick && pick.trigger === cmd.trigger && rest.includes(pick.item.label)) return null;
                return {
                  range: { from: $position.start() + argStart, to: $position.pos },
                  query: rest.trimStart(),
                  text: rest,
                };
              },
              items: async ({ editor: e, query }) => {
                const cmd = matchComposerCommand(e.getText(), commandsRef.current);
                return (await cmd?.argument?.search(query)) ?? [];
              },
              command: ({ editor: e, range, props: item }) => {
                const cmd = matchComposerCommand(e.getText(), commandsRef.current);
                if (!cmd?.argument) return;
                const picked: ComposerArgumentItem = { id: item.id, label: item.label, hint: item.hint, icon: item.icon };
                if ((cmd.argument.onPick?.(picked) ?? 'insert') === 'execute') {
                  argPickRef.current = null;
                  e.commands.clearContent(true);
                  onCommandRef.current?.(cmd, picked);
                  return;
                }
                argPickRef.current = { trigger: cmd.trigger, item: picked };
                e.chain().focus().deleteRange(range).insertContent(`${picked.label} `).run();
              },
              render: () => commandMenuRenderer('Arguments', true),
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

    if (hasSearchPeople) {
      list.push(
        Mention.configure({
          // `mention`, matching the stylesheet. See the note at the top.
          HTMLAttributes: { class: 'mention' },
          suggestion: {
            char: '@',
            items: async ({ query }: { query: string }) => {
              const found = (await onSearchPeopleRef.current?.(query)) ?? [];
              const members = mentionMembersRef.current;
              if (!members) return found;
              return found.map((c) => ({ ...c, member: members.has(c.id) }));
            },
            render: () => {
              let renderer: ReactRenderer | null = null;
              const menu = mountSuggestionMenu();
              const withGate = (props: SuggestionProps) => ({
                ...props,
                onPickNonMember: (userId: string) => {
                  menu.detach();
                  // Take the "@name" the person typed back out: the mention
                  // did not happen, and a stray "@Bob" would be sent as text.
                  props.editor.chain().focus().deleteRange(props.range).run();
                  onMentionNonMemberRef.current?.(userId);
                },
              });

              return {
                onStart: (props: SuggestionProps) => {
                  renderer = new ReactRenderer(MentionSuggestions, {
                    props: withGate(props),
                    editor: props.editor,
                  });
                  menu.attach(renderer.element as HTMLElement);
                  menu.place(props.clientRect?.());
                },
                onUpdate: (props: SuggestionProps) => {
                  renderer?.updateProps(withGate(props));
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

    if (hasSearchDocuments) {
      list.push(
        DocRef.configure({
          // `docref`, painted beside `mention` in the stylesheet.
          HTMLAttributes: { class: 'docref' },
          renderText: ({ node }) => `#${node.attrs.label ?? node.attrs.id}`,
          renderHTML: ({ options, node }) => ['span', options.HTMLAttributes, `#${node.attrs.label ?? node.attrs.id}`],
          suggestion: {
            char: '#',
            // Its own key: Mention's default key is already taken by the `@` plugin.
            pluginKey: docrefSuggestionKey,
            allow: docrefAtWordStart,
            items: ({ query }: { query: string }) => onSearchDocumentsRef.current?.(query) ?? [],
            render: () => {
              let renderer: ReactRenderer | null = null;
              const menu = mountSuggestionMenu();
              return {
                onStart: (props: SuggestionProps) => {
                  renderer = new ReactRenderer(DocumentSuggestions, { props, editor: props.editor });
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
                  return (renderer?.ref as SuggestionMenuRef)?.onKeyDown?.(props) ?? false;
                },
                onExit: () => {
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
    // `placeholder`, `commands`, `onSearchPeople` and `onSearchDocuments` are
    // deliberately NOT dependencies — each is read through a ref above
    // precisely so it can change without rebuilding the editor. Only whether
    // mentions or document references exist at all changes the extension list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSearchPeople, hasSearchDocuments]);

  const editor = useEditor(
    {
      extensions,
      editable: !disabled,
      onUpdate: ({ editor: e }) => {
        setEmpty(e.isEmpty);
        editorRef.current = e;
        const text = e.getText();
        const hit = matchComposerCommand(text, commandsRef.current);
        setActiveCommand((prev) => (prev?.trigger === hit?.trigger ? prev : hit));
        setArgumentEmpty(!hit || composerCommandArgumentText(text, hit).trim() === '');
        // A pick belongs to the command it was made for.
        if (argPickRef.current && argPickRef.current.trigger !== hit?.trigger) argPickRef.current = null;
      },
      editorProps: {
        attributes: {
          class: 'chat-composer-input',
          'data-testid': `${testId}-input`,
        },
      },
    },
    // ONLY `extensions`, which now changes only when mentions or document
    // references are switched on or off.
    //
    // `disabled` and `placeholder` used to be in here (placeholder via
    // `extensions`), and every flip of either DESTROYED THE DRAFT: useEditor
    // treats its dep array like a key, so it tore the editor down and built a
    // new empty one. Two ways that showed up in a real product. Clicking
    // "Reply" on a message changed the placeholder to "Reply to Alice…" and
    // erased the half-written message the reply was about to be. And a host
    // that disabled the composer while its socket was down — the obvious way
    // to stop sends vanishing into a shut socket — erased whatever was being
    // typed at the moment the connection dropped, which is the worst possible
    // moment to lose it.
    //
    // Both are now applied to the LIVING editor: the placeholder through a ref
    // the extension reads on every render, `editable` through the effect
    // below. Adding either back here reintroduces both bugs silently — nothing
    // fails, the words simply go.
    [extensions],
  );

  // `editable` on the editor we already have, rather than a new editor.
  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [editor, disabled]);

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
    const text = editor.getText();
    const cmd = matchComposerCommand(text, commandsRef.current);
    const pick = argPickRef.current;
    let command: ComposedMessage['command'];
    if (cmd) {
      command = { trigger: cmd.trigger };
      // Only a pick made for THIS command whose label survived editing counts;
      // otherwise the host reads the free text after the trigger.
      if (pick && pick.trigger === cmd.trigger && composerCommandArgumentText(text, cmd).includes(pick.item.label)) {
        command.argument = pick.item;
      }
    }
    const documents = collectDocuments(editor);
    onSend({
      html: editor.isEmpty ? '' : editor.getHTML(),
      text,
      mentions: collectMentions(editor),
      files: staged.map((s) => s.file),
      ...(documents.length > 0 ? { documents } : {}),
      ...(command ? { command } : {}),
    });
    argPickRef.current = null;
    editor.commands.clearContent(true);
    setStaged([]);
    setEmpty(true);
  }, [editor, canSend, onSend, staged]);

  sendRef.current = send;
  linkRef.current = openLinkDialog;

  useImperativeHandle(
    ref,
    () => ({
      get editor() {
        return editor;
      },
      focus: () => {
        editor?.commands.focus();
      },
      insertText: (text: string) => {
        editor?.chain().focus().insertContent(text).run();
      },
    }),
    [editor],
  );

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

  /**
   * How much room the toolbar row actually has.
   *
   * The row is `flex` with the format group on the left and Send pushed right
   * by `ml-auto`. The group had no `min-w-0`, so its automatic minimum size —
   * the width of eleven buttons — stopped it shrinking, and the overflow went
   * somewhere: Send was rendered 65px PAST the composer's right edge, outside
   * its own border, sitting over the document beside it. Measured in the
   * browser at a 339px composer.
   *
   * Clipping is not an option for Send — it is the primary action — and a
   * scroll container here would clip the emoji popover, which opens from
   * inside the group. So the group sheds its least-load-bearing controls
   * instead, in a fixed order, and Send is `shrink-0` and always there.
   */
  const toolbarRow = useRef<HTMLDivElement>(null);
  const [toolbarWidth, setToolbarWidth] = useState<number | null>(null);
  useEffect(() => {
    const el = toolbarRow.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([entry]) => {
      setToolbarWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // Thresholds measured against the real control widths (28px each, plus two
  // 9px dividers and a 50px Send). `null` means we have not measured yet —
  // render everything, because a first paint that hides controls and then
  // shows them is worse than one frame of overflow.
  const roomFor = (needed: number) => toolbarWidth === null || toolbarWidth >= needed;
  const showSecondaryMarks = roomFor(330);   // strikethrough, code
  const showListControls = roomFor(280);     // bullets, numbers, quote

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
        // A 1px border colour change was the composer's ONLY focus signal —
        // measured in the browser, the contenteditable itself computes
        // `outline-style: none` (`.ProseMirror:focus` in the library
        // stylesheet clears it deliberately, because an outline on a
        // scrolling text box is drawn in the wrong place). A ring on the
        // WRAPPER is the affordance that belongs to a text field: it survives
        // the inner scroll and it is the same shape as every other focus ring
        // in the list. `focus-within` rather than `focus-visible` on purpose —
        // a text box showing that it has the caret after a click is correct,
        // not noise.
        data-command={activeCommand?.trigger}
        className={cn(
          'chat-composer rounded-lg border bg-surface focus-within:ring-2',
          activeCommand
            ? (activeCommand.disabled ? 'border-warning focus-within:border-warning focus-within:ring-warning' : 'border-info focus-within:border-info focus-within:ring-info')
            : 'border-border focus-within:border-primary focus-within:ring-primary',
        )}
      >
        {activeCommand && (
          <div
            role="status"
            title={activeCommand.description ?? activeCommand.hint ?? activeCommand.label}
            data-testid={`${testId}-command`}
            className={cn(
              'flex items-center gap-1.5 rounded-t-lg px-2 py-1 text-[11px]',
              activeCommand.disabled ? 'bg-warning-bg text-warning-fg' : 'bg-info-bg text-info-fg',
            )}
          >
            <span className="font-mono">{activeCommand.trigger}</span>
            <span className="font-medium">{activeCommand.label}</span>
            {/* While the argument is blank the bar says what to type next;
                once something is there, the hint returns. */}
            {argumentEmpty && activeCommand.argument?.placeholder ? (
              <span data-testid={`${testId}-command-placeholder`} className="min-w-0 truncate italic opacity-80">
                — {activeCommand.argument.placeholder}
              </span>
            ) : (
              activeCommand.hint && <span className="min-w-0 truncate opacity-80">— {activeCommand.hint}</span>
            )}
          </div>
        )}
        <EditorContent editor={editor} />

        <ComposerAttachments
          files={staged}
          disabled={disabled}
          onRemove={(id) => setStaged((prev) => prev.filter((s) => s.id !== id))}
        />

        <div ref={toolbarRow} className="flex items-center border-t border-border px-1.5 py-1">
          {/* ONE tab stop for the whole bar, not one per control. Measured
              before: 14 stops between entering this composer and leaving it,
              11 of them Bold/Italic/Quote and friends — on every chat surface
              in the product, the embedded ones included. Send stays outside
              the group: it is the primary action, not a formatting control,
              and people reach for it with Tab. */}
          {/* `min-w-0` is the load-bearing half: without it a flex child will
              not shrink below its content, which is how the buttons pushed
              Send out of the composer entirely. */}
          <RovingToolbar label="Message formatting" className="min-w-0 gap-0.5" data-testid={`${testId}-format-toolbar`}>
          {editor && [
            toolbarButton('Bold', editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), <b>B</b>),
            toolbarButton('Italic', editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), <i>I</i>),
            showSecondaryMarks && toolbarButton('Strikethrough', editor.isActive('strike'), () => editor.chain().focus().toggleStrike().run(), <s>S</s>),
            showSecondaryMarks && toolbarButton('Code', editor.isActive('code'), () => editor.chain().focus().toggleCode().run(), <span className="font-mono text-[11px]">{'<>'}</span>),
            toolbarButton(
              editor.isActive('link') ? 'Edit link' : 'Add link',
              editor.isActive('link'),
              () => openLinkDialog(),
              <LinkIcon size={16} />,
            ),
            showListControls && <span key="sep1" aria-hidden className="mx-1 h-4 w-px bg-border" />,
            showListControls && toolbarButton('Bulleted list', editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), <span>•</span>),
            showListControls && toolbarButton('Numbered list', editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), <span className="text-[11px]">1.</span>),
            showListControls && toolbarButton('Quote', editor.isActive('blockquote'), () => editor.chain().focus().toggleBlockquote().run(), <QuoteIcon size={16} />),
          ]}

          {(allowEmoji || attachmentsEnabled) && (
            <span aria-hidden className="mx-1 h-4 w-px bg-border" />
          )}

          {allowEmoji && editor && (
            <span className="relative">
              {toolbarButton('Emoji', emojiOpen, () => setEmojiOpen((v) => !v), <SmileyIcon size={16} />, emojiTrigger)}
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
              {toolbarButton('Attach files', false, () => fileInput.current?.click(), <PaperclipIcon size={16} />)}
              <FileInput
                ref={fileInput}
                multiple
                data-testid={`${testId}-file-input`}
                onFiles={stage}
              />
            </>
          )}

          {toolbarExtras}
          </RovingToolbar>

          <button
            type="button"
            onClick={send}
            disabled={!canSend}
            data-testid={`${testId}-send`}
            className="ml-auto shrink-0 rounded bg-primary px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-40"
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
});

export default RichChatComposer;
