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
// ## Compact modes, shortcuts and prefix triggers (2.362.0)
//
// The Documents editor floats this composer over a page, where three large
// `Chat | Agent | Terminal` tabs cost a row the page needs. `modeControl=
// "compact"` swaps them for the mode's name, three small numbered buttons and
// the shortcut for the current one (`⌥2`). `modeShortcuts` binds Option-1/2/3
// — on the composer's own root, never `window`, so the digits typed anywhere
// else on the page stay digits. `modeTriggers` turns a draft that is exactly
// `>` into Terminal and one that is exactly `/run ` into Agent, consuming the
// prefix. All three are off unless asked for, and `disabledModes` lets a host
// refuse a mode (Terminal with no run attached) with a reason instead of a
// mode that silently does nothing.
//
// Disabled commands are NOT listed. The status bar already explains a disabled
// command (in warning colours, with its hint) to anyone who types it out, and a
// menu that offers rows which cannot be picked teaches people to distrust it.

import { CONTAINER_COMPACT_BELOW, containerDensity } from '../shared/ContainerDensity';
import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useId,
  type CSSProperties,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type DragEvent as ReactDragEvent,
  type ReactNode,
  type Ref,
} from 'react';
import { BUTTON_WEIGHT } from '../ui/Button';
import { useEditor, EditorContent, ReactRenderer } from '@tiptap/react';
import { Extension, type Editor } from '@tiptap/core';
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';
import type { Node as PMNode } from '@tiptap/pm/model';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Mention from '@tiptap/extension-mention';
import Link from '@tiptap/extension-link';
import Suggestion from '@tiptap/suggestion';
import type { SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion';
import { visibleSuggestionRect } from './composerSuggestionPosition';
import { cn } from '../../lib/cn';
import { FileInput } from '../forms/FileInput';
import { DropdownMenu, type DropdownMenuSection } from '../shared/DropdownMenu';
import { AGENT_PARTICLE_COLORS, ParticlesBackground } from '../shared/ParticlesBackground';
import {
  GRAPHITE_PARTICLE_COLORS,
  useEnclosingConsoleSurface,
  useResolvedBackdropTone,
  type BackdropTone,
} from '../shared/backdropTone';
import { RovingToolbar } from '../shared/RovingToolbar';
import { Text } from '../shared/Text';
import { Tabs } from '../shared/Tabs';
import { IconButton } from '../ui/IconButton';
import { ChatDropZone } from './ChatDropZone';
import { ReactionPickerPopover } from './ReactionPickerPopover';
import { ComposerAttachments, type StagedFile } from './ComposerAttachments';
import { ComposerReferences, type ComposerReference } from './ComposerReferences';
import { LinkDialog } from './LinkDialog';
import { MentionSuggestions, type MentionCandidate } from './MentionSuggestions';
import { DocumentSuggestions, type DocumentCandidate, type DocumentMenuPanel } from './DocumentSuggestions';
import { EmojiSuggestions } from './EmojiSuggestions';
import { CommandSuggestions, type CommandSuggestionItem } from './CommandSuggestions';
import { searchEmoji, type EmojiShortcode } from './emojiShortcodes';
import { ArrowRightIcon, ArrowUpIcon, SendIcon, ChatIcon, ChevronIcon, CodeIcon, EyeIcon, EyeOffIcon, LinkIcon, ListIcon, LockIcon, PaperclipIcon, PuzzleIcon, QuoteIcon, SmileyIcon, SparkleIcon } from '../ui/Icons';

export type { MentionCandidate, DocumentCandidate, DocumentMenuPanel };

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
  /**
   * Who can see this message. Mirrors the `privacy` prop at send time, so a
   * host with no opinion on the feature still gets `'visible'` rather than an
   * absent field.
   */
  privacy: 'visible' | 'hidden';
  /**
   * Which mode composed this. Present only while a host has wired
   * `onModeChange` — like `RichChatDraft.privacy`, a host that never adopts
   * the feature never sees the key. `'agent'` also rewrites `text` to
   * `/agent <what was typed>`, so the host's existing `/agent` command path
   * handles it with no second code path.
   */
  mode?: ComposerMode;
}

/** What the composer is for, right now. */
export type ComposerMode = 'chat' | 'agent' | 'terminal';

/**
 * Something already running that this composer's owner started.
 *
 * A one-line status strip above the editor, because the question "is the thing
 * I asked for still going?" is asked WHILE typing the next thing — a person who
 * has to leave the composer to answer it has already lost the sentence.
 */
export interface ComposerProcess {
  id: string;
  label: string;
  tone: 'running' | 'idle' | 'failed' | 'done';
}

/**
 * One line of news about the last thing this composer did — "Revised slide 2",
 * "v15 is the agent's edit" — with at most one action (Undo). It sits in the
 * composer's own status row, so a host has no banner stacked above the dock.
 */
export interface ComposerStatus {
  text: string;
  tone?: 'info' | 'success' | 'warning' | 'danger';
  /** The one thing to do about it. A button at the end of the line. */
  action?: { label: string; onSelect: () => void; 'data-testid'?: string };
  /** Wired, the line has a × that calls it. */
  onDismiss?: () => void;
  'data-testid'?: string;
}

/** One key and what it does, for the row under the editor. */
export interface ComposerHint {
  /** The key itself, rendered monospace — `/`, `>_`, `⌘K`. */
  key: string;
  label: string;
  /** Wired, the hint is a button rather than a label. */
  onSelect?: () => void;
}

/** An alternative way to send, offered from the Send button's own menu. */
export interface ComposerSendOption {
  id: string;
  label: string;
}

/** In-memory draft. Hosts must keep File objects out of persistent storage. */
export interface RichChatDraft {
  html: string;
  files: File[];
  command?: ComposedMessage['command'];
  /**
   * The `privacy` prop as of the last publish, present only while a host has
   * wired `onPrivacyChange` — a host that never adopts the toggle never sees
   * this key on its draft. Ride-along storage, like `command`: the composer
   * does not read it back to set its own state, since `privacy` is already a
   * controlled prop; a host restoring a conversation reads `draft.privacy`
   * itself and passes it back in as `privacy`.
   */
  privacy?: 'visible' | 'hidden';
}

/** One thing a command can act on — a document, a room, a person. */
export type { ComposerArgumentItem, ComposerCommandArgument, ComposerCommand } from './composerCommands';
export { matchComposerCommand, composerCommandArgumentText } from './composerCommands';
import { composerSendErrorReason } from './composerSendError';
import { ComposerPresentationContext } from './composerPresentation';
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
  /**
   * Resolve after accepting the send. Reject or return false to retain the
   * draft. A rejection shows an alert above the composer; reject with a
   * `ComposerSendError` to put its message there ("Upload failed: HTTP 500")
   * instead of the generic "Unable to send".
   */
  onSend: (message: ComposedMessage) => void | boolean | Promise<void | boolean>;
  /** Optional controlled draft; key the composer by conversation. */
  draft?: RichChatDraft;
  /**
   * `previous` is the exact previous draft object. A host retaining drafts
   * across unmounts should compare it before applying a delayed send clear.
   */
  onDraftChange?: (draft: RichChatDraft, previous: RichChatDraft | undefined) => void;
  /**
   * Called when a command argument is picked with `onPick` → `'execute'`. The
   * draft has already been cleared; nothing goes through `onSend`.
   */
  onCommand?: (command: ComposerCommand, argument: ComposerArgumentItem) => void;
  /**
   * A command with no `argument` picked from the `/` menu (click or Enter)
   * runs at once instead of being written into the draft (since 2.510.0):
   * the draft is cleared, then this is called. A thrown or rejected
   * `ComposerSendError` shows in the send-error line, like a refused send.
   * Commands that take an argument still write their trigger and open the
   * argument menu. Absent, every pick writes its trigger (the default).
   * `ContextComposer presentation="prompt"` wires it to `onSend`.
   */
  onCommandPick?: (command: ComposerCommand) => void | boolean | Promise<void | boolean>;
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
  /**
   * Accessible name of the editor — `aria-label` on the contenteditable, which
   * is always `role="textbox"` + `aria-multiline="true"`. The placeholder is
   * not a name (it vanishes once text is typed), so a host whose page has
   * more than one textbox should set this. Since 2.403.1.
   */
  inputLabel?: string;
  disabled?: boolean;
  /**
   * The reader may read here but not write (since 2.450.0): the whole
   * composer says so, not only Send. The editor is not editable or focusable
   * (`aria-readonly`), the placeholder is replaced by this line (a lock and
   * the note; `true` says "Read only"), every format button, the `/ commands`
   * hint, attachments and the `toolbarExtras` host menus are off in muted
   * ink, and the mode menu is off unless another mode is on (it is then the
   * way out, like a To: selector). The root carries `data-composer-readonly`.
   * Unlike `disabled` (a quiet pause: offline, loading) it is a verdict.
   */
  readOnly?: ReactNode;
  /**
   * Slash commands the host understands. While the draft starts with one, the
   * composer says so — a bar naming the command above the text and a
   * different border — so a person typing `/doc rename…` knows before Send
   * that this is an instruction to an agent, not a message to the room.
   */
  commands?: ComposerCommand[];
  /**
   * Controlled per-message visibility. Defaults to `'visible'`. Passing
   * `onPrivacyChange` is what turns the feature on at all — see there.
   */
  privacy?: 'visible' | 'hidden';
  /**
   * Renders an eye / eye-off toggle in the toolbar, beside the attach and
   * document controls, and is called when it is pressed with the OTHER
   * state — the composer does not hold its own privacy state, so nothing
   * changes on screen until the host applies it back through `privacy`.
   *
   * Omitting this prop is the whole opt-in: no toggle, no hint row, no
   * `privacy` key on the published `RichChatDraft`. `ComposedMessage.privacy`
   * still reports `'visible'` on send either way, so a host that adopts the
   * field later does not have to touch every existing message.
   */
  onPrivacyChange?: (next: 'visible' | 'hidden') => void;
  /**
   * Tooltip/accessible-name text for each state. Defaults to
   * "Visible to everyone" / "Only you".
   */
  privacyLabels?: { visible: string; hidden: string };
  /**
   * What this draft points at — a slide in a deck, a line in a transcript —
   * as a full-width row of chips above the editor.
   *
   * These are display labels the HOST resolved from what this viewer may see;
   * the composer neither resolves nor sends them. The reference itself belongs
   * in the message metadata the host attaches on send.
   *
   * They were previously passed through `toolbarExtras`, which is a strip of
   * icon-sized controls: a chip reading "Sprint review · v2 · Slide 4" either
   * truncated there or pushed Send out of the composer.
   */
  references?: readonly ComposerReference[];
  /** Makes each chip removable. Called with the reference's `id`. */
  onRemoveReference?: (id: string) => void;
  /** Rendered between the formatting controls and the send button. */
  toolbarExtras?: ReactNode;
  /**
   * Which formatting controls the strip shows at wide width.
   *
   * - `full` (default): B, I, S, code, link, bulleted, numbered, quote — the
   *   chat column's strip, unchanged.
   * - `compact`: B, I, link, bulleted list, attach (when attachments are on),
   *   no separators — the editor's docked card. Strikethrough, code, numbered
   *   list and quote move into the `?` menu under "Formatting" (the same menu
   *   the card already keeps its keyboard hints in), not a second `⋯` button
   *   beside the first: an editor already has a full toolbar above the page
   *   and the card's strip is the four things a prompt actually uses.
   *
   * - `editor` (2.385.6): the document page's docked card as the mockup draws
   *   it — B, I, code, link, bulleted list, quote, attach, then a divider
   *   before `toolbarExtras` (the host's `Workflow ▾`). Strikethrough and
   *   numbered list go under `?` → Formatting, as in `compact`.
   *
   * - `basic` (2.390.0): the docked card as a light prompt box — B, I, code,
   *   link, attach, then the divider before `toolbarExtras`. No lists and no
   *   quote on the strip (a prompt is a sentence, not a document); bulleted
   *   and numbered lists, quote and strikethrough are omitted. Docks like
   *   `editor` under `modeControl="menu"`, with
   *   the mode as a boxed picker ("Agent ⌄", no glyph), the input in its own
   *   bordered well and no rule over the strip — the Initiatives mockup.
   *
   * - `prompt` (2.508.0): a box for one instruction, not a document — no
   *   formatting controls at all. The strip is attach (only when
   *   `allowAttachments`), then the divider, then `toolbarExtras`; with
   *   neither there is no strip, only Send. Bold and italic keyboard
   *   shortcuts still work in the input. The `?` menu holds keyboard hints
   *   only (no "Formatting" section), and below wide the `Aa` toggle becomes
   *   "Show tools" and appears only when the strip has something to show.
   *   Docks like `basic` under `modeControl="menu"`: boxed mode picker,
   *   bordered input well, labelled Send.
   *
   * - `prompt-card` (2.389.11, named `prompt` until 2.508.0): the docked
   *   mockup card with `/ Commands`, `# Context`, the host's extras,
   *   "Return to send" and a round icon Send. Under any other `modeControl`
   *   it falls back to `prompt`.
   *
   * In docked mode, the mode menu contains modes, host actions and keyboard
   * hints only; formatting belongs on the editor's toolbar.
   * Sizes are unchanged in all of them: every control is the same 28px box.
   * Below wide the strip folds exactly as before, whichever preset is set.
   */
  toolbar?: ComposerToolbarPreset;
  /**
   * `prompt` (since 2.510.0): the docked card as a quiet prompt box — the
   * header row holds the references (left) and `modeRowEnd` (right) and keeps
   * one height whether or not there are references; then the suggestion
   * chips, the input (no bordered well), and the strip with attach, the
   * host's extras and Send showing `submitLabel` alone (no paper plane, no
   * arrow). No mode label, pill, picker, menu or `⌥n` badge in any state
   * (the mode is still `mode` and Enter still sends in it), and no
   * `/ commands` hint (typing `/` still opens the menu). Sets
   * `data-presentation="prompt"` on the root. `ContextComposer
   * presentation="prompt"` sets it. Default `card` (unchanged).
   */
  presentation?: 'card' | 'prompt';
  /**
   * A `⋯` menu at the right of the toolbar row, before `submitLead` and Send —
   * for actions on the THING the composer is attached to ("Draft a
   * presentation from this page") rather than on the message. Lets a host
   * keep those off the strip instead of spending a labelled `submitLead` on
   * them. Absent or empty, nothing renders.
   */
  moreActions?: readonly DropdownMenuSection[];
  /** The `⋯` trigger's accessible name and title. Default "More actions". */
  moreActionsLabel?: string;
  /**
   * Long-running work this composer's owner started — a generating deck, a
   * terminal test run. Rendered as one status line above the editor, hidden
   * when the array is empty. Display only: the host owns what each one is and
   * what opening it does.
   */
  processes?: readonly ComposerProcess[];
  /**
   * Controlled mode. Defaults to `'chat'`. Passing `onModeChange` is what
   * turns the feature on at all — see there.
   */
  mode?: ComposerMode;
  /**
   * Renders the `Chat | Agent | Terminal` switch above the editor and is
   * called with the mode pressed. The composer holds no mode state of its own,
   * so nothing changes until the host applies it back through `mode`.
   *
   * Omitting this prop is the whole opt-in: no switch, no hints row, no `mode`
   * key on the published message. Every existing host renders exactly the
   * composer it rendered before.
   */
  onModeChange?: (mode: ComposerMode) => void;
  /**
   * Pins the composer to one mode with no switch. The surface is that mode's
   * (Agent and Terminal wear the console backdrop, the mode's placeholder
   * applies, and the published message carries `mode`), but there are no
   * `Chat | Agent | Terminal` tabs and no default hints row — for a surface
   * whose composer only ever talks to one thing, like the presentation
   * editor's agent box. The text is sent as typed: the `/agent` prefix that
   * the switchable Agent mode adds is for the chat's command router, and a
   * pinned composer's host is not one.
   */
  fixedMode?: ComposerMode;
  /**
   * Placeholder per mode. `chat` falls back to `placeholder`; the other two
   * have defaults that say what Enter will do, which is the thing that changes.
   */
  modePlaceholders?: Partial<Record<ComposerMode, string>>;
  /**
   * The keys worth knowing, under the editor. Defaults to `/` for commands,
   * `>_` for shell and `⌘K` to quickly open whenever the mode switch or
   * `onQuickOpen` is wired; absent all three, no row is rendered at all.
   */
  hints?: readonly ComposerHint[];
  /** Backs the default `⌘K` hint. Without it that hint is a label, not a button. */
  onQuickOpen?: () => void;
  /**
   * Other ways to send, offered from a caret beside Send — "Send as agent
   * task", "Run in shell". Send itself keeps doing what it always did.
   */
  sendOptions?: readonly ComposerSendOption[];
  /** Called with the chosen option's id. The composer does not clear the draft. */
  onSendOption?: (id: string) => void;
  /**
   * Where a line typed in terminal mode goes. Without it the prompt still
   * renders and still keeps its history, but Enter does nothing — which is
   * the honest state for a deployment with no shell behind the composer.
   */
  onShellCommand?: (command: string) => void;
  /**
   * How the mode switch is drawn. `'tabs'` (default) is the segmented
   * `Chat | Agent | Terminal` row every existing host has. `'compact'` is the
   * mode's name, three small numbered buttons (`1 2 3`) and the current
   * mode's `⌥n` — one short row, for a composer floating over a page.
   * `'menu'` (2.377.0) is the mode's glyph and name as ONE dropdown (`Agent ▾`)
   * with the current `⌥n` beside it and the other modes, their shortcuts and
   * any reason they are off inside the menu; the draft's references sit at
   * the row's end — the shape of an editor's docked composer.
   */
  modeControl?: 'tabs' | 'compact' | 'menu';
  /**
   * Option-1 / Option-2 / Option-3 (Alt on other platforms) switch to Chat /
   * Agent / Terminal while focus is anywhere inside the composer. Bound on
   * the composer root, not the window: with focus outside it, nothing
   * happens. Needs `onModeChange`. Default false.
   */
  modeShortcuts?: boolean;
  /**
   * Typing a prefix as the whole draft switches mode and consumes it: `>`
   * (alone) → Terminal, `/run ` (with its space) → Agent. `true` uses those
   * defaults; an object overrides either prefix. Needs `onModeChange`.
   * Default off.
   */
  modeTriggers?: boolean | { terminalPrefix?: string; agentPrefix?: string };
  /**
   * Modes the host cannot serve right now — Terminal when no run is
   * attached. Their buttons are disabled, and a shortcut or trigger aimed at
   * one leaves the mode (and the typed prefix) alone and shows the reason
   * from `modeUnavailableReasons` instead.
   */
  disabledModes?: readonly ComposerMode[];
  /**
   * Which modes this composer offers at all, in the library's order
   * (Chat, Agent, Terminal). Defaults to all three. A mode left out is not
   * drawn disabled — it is absent: no tab, no menu row, no numbered button,
   * no `>_ for shell` hint, and its trigger prefix stays ordinary text. A
   * chat conversation passes `['chat', 'agent']`, since a shell line has
   * nowhere to go from a DM or a channel. Shortcuts number the offered modes
   * (`⌥1`, `⌥2`). A controlled `mode` that is not offered renders as the
   * first offered mode. Since 2.390.1.
   */
  modes?: readonly ComposerMode[];
  /** Why each disabled mode is unavailable — "Start an agent task first". */
  modeUnavailableReasons?: Partial<Record<ComposerMode, string>>;
  /** Per-mode hint rows. Wins over `hints` for the modes it names. */
  modeHints?: Partial<Record<ComposerMode, readonly ComposerHint[]>>;
  /**
   * Beside Send, before it — a model or skill picker ("Presentation skill ⌄").
   * Absent, the toolbar row is exactly as before.
   */
  submitLead?: ReactNode;
  /**
   * Send's label, per mode or for all of them. Defaults: "Send", and "Run"
   * in Terminal.
   */
  submitLabel?: string | Partial<Record<ComposerMode, string>>;
  /**
   * Why Send is off (2.515.6): a host-known block — a read-only destination,
   * no destination chosen, the socket down, a page with no commands. Present,
   * Send is disabled whatever the draft holds; the reason is Send's tooltip
   * and accessible description (`aria-describedby`) and a one-line hint under
   * the input, drawn at every density and in the idle row too. An empty draft
   * is not a reason: leave this unset and Send stays quietly off until typed.
   */
  submitDisabledReason?: string | null;
  /**
   * Corner radius. Unset, the composer is rounded by its OWN default (12px),
   * never by the host's `--radius-*` tokens — a host with square corners still
   * gets a finished composer. A `--composer-radius` on any ancestor overrides
   * the default; this prop overrides both.
   */
  radius?: ComposerRadius;
  /**
   * What Agent and Terminal paint behind the composer. `auto` (default) is
   * graphite on a light theme and night on a dark one, read from the nearest
   * `data-backdrop-tone` / `data-theme` ancestor, else `prefers-color-scheme`.
   * `none` keeps the ordinary surface in every mode.
   */
  backdropTone?: BackdropTone;
  /**
   * True while an agent is mid-turn: the console sky gets denser, brighter and
   * a little quicker — the same cue `ChatColumnBackdrop`'s `working` gives a
   * whole column, for a composer that stands alone (an editor's dock). Unset,
   * it follows an enclosing `ChatColumnBackdrop`. Inside one, the composer
   * paints no field of its own (the column's shows through), so this only
   * changes anything for a standalone composer. Reduced motion still parks
   * the field; the particle budget stays bounded by the box's area.
   */
  working?: boolean;
  /**
   * The tallest the input grows before it scrolls inside itself: pixels, or
   * any CSS length. Default `min(14rem, 40dvh)`.
   */
  maxInputHeight?: number | string;
  /**
   * The layout, when the host knows better than a measurement (stories, a
   * fixed-width dock). Default `auto`: the composer measures its OWN width and
   * picks `wide` / `medium` / `narrow` — see `COMPOSER_BREAKPOINTS`.
   */
  layout?: 'auto' | ComposerSize;
  /**
   * `compact` spends the fewest rows on chrome, for a dock pinned under a
   * canvas that needs the height (a slide stage): references share the mode
   * row, the hints row folds into the `?` menu at every width, and the
   * padding tightens. Default `comfortable`.
   */
  density?: 'comfortable' | 'compact';
  /** One status line above the input (see `ComposerStatus`). Replaces a host banner. */
  status?: ComposerStatus | null;
  /**
   * One-tap instructions. Wide, they show as a chip row only while the input
   * is EMPTY and FOCUSED — a prompt for a blank box, gone once you type or
   * look away. Medium and narrow, they live in the `?` menu. Picking one calls
   * `onSuggestion`; the composer does not send anything itself.
   */
  suggestions?: readonly string[];
  onSuggestion?: (suggestion: string) => void;
  /**
   * When the wide chip row shows (2.508.0). `focused` (default): while the
   * input is empty and focused, as described at `suggestions`. `empty`: while
   * the input is empty, focused or not — the page's quick actions visible at
   * rest. Either way never on the one-row idle composer (`collapseWhenIdle`
   * folded), and below wide they stay in the `?` menu.
   */
  suggestionsVisible?: 'focused' | 'empty';
  /** At the end of the compact mode row — a scope switch, a count. */
  modeRowEnd?: ReactNode;
  /**
   * The docked card (`modeControl="menu"` + `toolbar="editor"`) with no mode
   * switch: the header row is the references alone, left-aligned, then
   * `referencesAction` — a page whose composer only ever does one thing
   * (the All documents page, 2.389.x). The mode menu's extra sections go
   * with it, so pass none.
   */
  hideModeMenu?: boolean;
  /**
   * With exactly one offered mode, name it as a static label instead of a
   * one-item switch: the mode's glyph and name where the pill or `Mode ⌄` sits,
   * no chevron, no menu, no `⌥1` badge — a call chat reads "Chat". Keeps the
   * `<testId>-mode-pill` test id and adds `data-single-mode="true"`. With the
   * docked card, `moreActions` move to the strip's `⋯`. Default false (the
   * one-item menu). `ContextComposer` sets it. Since 2.407.2.
   */
  singleModeLabel?: boolean;
  /** After the references in the docked header row — an "add another" control. Shown even with no references. */
  referencesAction?: ReactNode;
  /**
   * Where the references sit in the menu mode row. `end` (default): at the
   * row's end, the way an editor's dock reads. `start`: right after the mode
   * menu — "Agent ⌄ · ● Observability Platform ×", the draft's subject read
   * as the continuation of its mode. Since 2.390.0.
   */
  referencesPlacement?: 'end' | 'start';
  /**
   * Makes the whole card a drop target for a host's own payload (not files):
   * while a drag carrying one of `types` is over it, the card is ringed and
   * says `hint`; a drop calls `onDrop` with the DataTransfer. File drops keep
   * going to the attachment zone.
   */
  referenceDrop?: { types: readonly string[]; onDrop: (dataTransfer: DataTransfer) => void; hint?: string };
  /**
   * One row while idle: with the input EMPTY and the caret elsewhere (and no
   * status, process, attachment, command or notice to show), the composer is
   * a compact mode pill, any references, the input and Send on a single line.
   * References stay visible in that row — they are part of the draft. The
   * toolbar, status line and mode row come back the moment the input takes
   * focus or holds content. For a dock pinned under a canvas that needs the
   * height (a slide stage); the dock stays pinned and grows upward. The idle
   * row is plain (`bg-surface`) even in Agent/Terminal: the console sky comes
   * with the caret, unless an enclosing console column is already painting
   * one, in which case the row keeps that tint. The idle row carries
   * `data-composer-fold="idle"` (and `data-collapsed="true"`). Escape in an
   * empty prompt with no menu open releases the caret, so the row folds
   * (2.515.4). Default off.
   */
  collapseWhenIdle?: boolean;
  /**
   * `pane` (since 2.431.0): a simplified responsive mode for a composer in a
   * side pane beside a page (a conversation pane in a four-column shell).
   * Chosen by the composer's OWN measured width, never the viewport: below
   * the `wide` breakpoint (`COMPOSER_BREAKPOINTS.wide`) the card is ONE input
   * row — the mode and the draft's first reference folded into a single
   * small leading chip ("Chat · Observability Platform", truncated in the
   * middle, its × on hover or focus; the mode switch is the chip's menu),
   * an icon-only Send, and a 1px focus border instead of the 2px ring. `Aa`,
   * `?`, `⋯` and `modeRowEnd` appear only while focus is inside, on a second
   * row at most. Wide, nothing changes. Default: off.
   */
  responsive?: 'pane';
  /**
   * With `collapseWhenIdle`: `true` forces the full card whatever the idle
   * rule says — for host content the composer cannot see (a reply quote, a
   * comment hand-off, a task strip above it), which would otherwise sit over
   * a one-line row. `false`/absent is the idle rule unchanged. No effect
   * without `collapseWhenIdle`. Since 2.407.0.
   */
  expanded?: boolean;
  /**
   * With `collapseWhenIdle`: told whenever the card folds to (`true`) or
   * leaves (`false`) its one-line idle row, so a host can hide rows that
   * belong only to the full card (`ContextComposer` `foldingAbove`).
   * Since 2.515.5.
   */
  onIdleFoldChange?: (folded: boolean) => void;
  /**
   * Draws the `#` menu as an "Add context" card: a title, the typed query in
   * a search field with a clear button, results grouped under each
   * candidate's `group`, and the keys (↑↓ Choose · ↵ Insert · esc Close) at
   * its foot. Needs `onSearchDocuments`. Since 2.390.0.
   */
  documentMenu?: DocumentMenuPanel;
  /**
   * At the START of the docked card's header row, before the references — a
   * host's own mode select ("Assistant ▾") when `hideModeMenu` hides the
   * composer's. Since 2.390.0.
   */
  modeRowStart?: ReactNode;
  /**
   * The card's first section, above everything else inside the composer's
   * border — a `ComposerPromptDeck` (`variant="inset"`): the question and its
   * answers sit in the same card as the input that answers them. Since 2.446.0.
   */
  header?: ReactNode;
  /**
   * Let Send act while the input is empty if the draft has `references` the
   * host will send with it (a message that is only "this page"). Default
   * false: an empty draft with a reference chip stays unsendable.
   */
  sendWithReferencesOnly?: boolean;
  /**
   * Which key sends. `enter` (default): Enter sends, Shift+Enter is a
   * newline — the chat convention. `mod-enter`: ⌘/Ctrl+Enter sends and Enter
   * is a newline — for a prompt that is written, not chatted. Since 2.390.0.
   */
  sendShortcut?: 'enter' | 'mod-enter';
  /**
   * The prompt card's command when the draft names none (`/adjust`): its chip
   * shows from the start, and the host treats a draft with no command as this
   * one. Switching from the chip writes the new trigger into the draft.
   * Since 2.389.12.
   */
  defaultCommand?: string;
  className?: string;
  'data-testid'?: string;
}

/** How much room the composer has, from its own width. */
export type ComposerSize = 'wide' | 'medium' | 'narrow';
/** See `RichChatComposerProps.toolbar`. */
export type ComposerToolbarPreset = 'full' | 'compact' | 'editor' | 'prompt' | 'prompt-card' | 'basic';
export type ComposerRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Width thresholds, in CSS px of the composer's own box (not the window's):
 * below `narrow` it is narrow, below `wide` it is medium, else wide.
 *
 * - wide (≥ 600): the full toolbar and the hint row. 600, not less: a
 *   560px dock (a diagram's) drew a wrapped placeholder over the hint row.
 * - medium (380–599): hints fold into a `?` menu; strikethrough, code, lists
 *   and quote fold into a `⋯` overflow menu.
 * - narrow (< 380): input and Send share ONE row; the toolbar sits behind an
 *   `Aa` toggle; the mode switch is the compact `1 2 3` pill.
 */
export const COMPOSER_BREAKPOINTS = { narrow: 380, wide: CONTAINER_COMPACT_BELOW.pane } as const;

/** `null` — not measured yet — is wide: a first paint that hides controls and then shows them is worse than one frame of overflow. */
export function composerSizeFor(width: number | null): ComposerSize {
  if (width === null) return 'wide';
  if (width < COMPOSER_BREAKPOINTS.narrow) return 'narrow';
  // Below `wide` is the container's compact density (the one rule,
  // `containerDensity`): `responsive="pane"` folds to one row there.
  if (containerDensity(width, COMPOSER_BREAKPOINTS.wide) === 'compact') return 'medium';
  return 'wide';
}

/** Literal lengths, deliberately not `var(--radius-*)`: the host's tokens may be 0. */
const COMPOSER_RADII: Record<ComposerRadius, string> = { none: '0px', sm: '4px', md: '6px', lg: '8px', xl: '12px' };

const DEFAULT_PRIVACY_LABELS = { visible: 'Visible to everyone', hidden: 'Only you' } as const;

/** The order Option-1/2/3 and the compact `1 2 3` buttons follow. */
export const COMPOSER_MODE_ORDER: readonly ComposerMode[] = ['chat', 'agent', 'terminal'];

const MODE_NAMES: Record<ComposerMode, string> = { chat: 'Chat', agent: 'Agent', terminal: 'Terminal' };

const MODE_ICON: Record<ComposerMode, ReactNode> = {
  chat: <ChatIcon size={13} />,
  agent: <PuzzleIcon size={13} />,
  terminal: <span className="font-mono text-[11px]">{'>_'}</span>,
};

const DEFAULT_TERMINAL_PREFIX = '>';
const DEFAULT_AGENT_PREFIX = '/run';

/**
 * Whether a whole draft is a mode trigger. A prefix followed by a space
 * always counts (`/run `, `> `); a single-symbol prefix also counts alone,
 * because `> ` never reaches here — the editor's blockquote input rule eats
 * `> ` and leaves an empty quote. A word prefix does NOT count alone:
 * `/run` must be allowed to become `/running`.
 */
export function matchesModeTrigger(text: string, prefix: string): boolean {
  if (!prefix) return false;
  if (text === `${prefix} ` || text === `${prefix}\u00a0`) return true;
  return text === prefix && prefix.length === 1 && !/[\p{L}\p{N}]/u.test(prefix);
}

const MODE_PLACEHOLDERS: Record<ComposerMode, string> = {
  chat: 'Write a message…',
  agent: 'Tell the agent what to do… (budget and model in the status line)',
  terminal: '$ command in the cloud shell',
};

const STATUS_DOT: Record<NonNullable<ComposerStatus['tone']>, string> = {
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

const PROCESS_DOT: Record<ComposerProcess['tone'], string> = {
  // `motion-reduce:animate-none`: a row of pulsing dots above a text box is
  // the kind of ambient motion a vestibular-disorder setting exists to stop.
  running: 'bg-info animate-pulse motion-reduce:animate-none',
  idle: 'bg-border-emphasis',
  failed: 'bg-danger',
  done: 'bg-success',
};

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
  let frame = 0;
  const MARGIN = 8;
  // Horizontal collision. The menu opens at the caret, but a composer in a
  // narrow column (a 280px comment card at the window's right edge) puts the
  // caret where a ~290px menu runs off the card and out of the window. Keep the
  // menu's right edge inside the composer's boundary — the nearest
  // `[data-suggestion-boundary]`, else the editor — and always inside the
  // viewport, flipping it to end at that edge rather than start at the caret.
  const clampLeft = (left: number, boundary: Element | null | undefined) => {
    if (!host) return left;
    const width = host.offsetWidth;
    if (!width) return left;
    const box = (boundary?.closest('[data-suggestion-boundary]') ?? boundary)?.getBoundingClientRect();
    const right = Math.min(window.innerWidth - MARGIN, box && box.width > 0 ? Math.max(box.right, left + 1) : Infinity);
    return Math.max(MARGIN, Math.min(left, right - width));
  };
  return {
    attach(el: HTMLElement) {
      host = el;
      document.body.appendChild(el);
    },
    place(rect: DOMRect | null | undefined, boundary?: Element | null) {
      // A hidden prefix has no visible caret box; use its editor boundary.
      // A genuine caret (zero width, positive height) keeps its exact position.
      rect = visibleSuggestionRect(rect, boundary);
      if (!host || !rect) return;
      host.style.position = 'absolute';
      host.style.zIndex = '9600';
      // Flipped above when the caret sits near the bottom, which in a chat
      // composer is most of the time.
      const wouldOverflow = rect.bottom + 240 > window.innerHeight;
      host.style.top = `${(wouldOverflow ? rect.top - 6 : rect.bottom + 6) + window.scrollY}px`;
      host.style.left = `${clampLeft(rect.left, boundary) + window.scrollX}px`;
      host.style.transform = wouldOverflow ? 'translateY(-100%)' : '';
      // The menu's width is known only once React has rendered its rows.
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (host) host.style.left = `${clampLeft(rect.left, boundary) + window.scrollX}px`;
      });
    },
    detach() {
      cancelAnimationFrame(frame);
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

/**
 * Where the command line the menu-mode chip already names sits in the doc —
 * "/workflow migration-plan " — so it can be hidden from view while staying
 * in the draft (the host still reads it from `value`/`onDraftChange` and the
 * sent `text`). Null unless a picked argument's label is intact right after
 * the trigger in the first block.
 *
 * `block`: the first paragraph is the command and nothing else, and more
 * follows (the shape a host's "Workflow ▾" picker writes) — the whole
 * paragraph hides so no blank line is left. `inline`: the command leads a
 * paragraph that carries the instruction too — only the prefix hides.
 * `caret` is the first visible position; the caret is never left before it.
 */
function hiddenCommandPrefix(
  doc: PMNode,
  commands: readonly ComposerCommand[] | undefined,
  pick: { trigger: string; item: ComposerArgumentItem } | null,
): { kind: 'inline' | 'block'; from: number; to: number; caret: number } | null {
  const first = doc.firstChild;
  if (!first || !first.isTextblock) return null;
  // One character per inline leaf, so text offsets are doc offsets.
  const text = first.textBetween(0, first.content.size, undefined, '\ufffc');
  const cmd = matchComposerCommand(text, commands);
  if (!cmd) return null;
  let end: number;
  const picked = !!pick && cmd.trigger === pick.trigger;
  if (picked) {
    const argStart = text.length - text.trimStart().length + cmd.trigger.length + 1;
    const rest = text.slice(argStart);
    const spaces = rest.length - rest.replace(/^ +/, '').length;
    if (!rest.slice(spaces).startsWith(pick.item.label)) return null;
    end = argStart + spaces + pick.item.label.length;
  } else {
    // The command chip names the typed trigger once its space/continuation
    // leaves a visible caret. The origin/main bare-line safeguard stays below.
    end = text.length - text.trimStart().length + cmd.trigger.length;
  }
  const hideTo = end;
  if (text[end] === ' ') end += 1;
  const next = doc.childCount > 1 ? doc.child(1) : null;
  if (text.slice(end).trim() === '' && next?.isTextblock) {
    return { kind: 'block', from: 0, to: first.nodeSize, caret: first.nodeSize + 1 };
  }
  // A bare trigger that IS the whole line, not even a space after it ("/doc"
  // just typed): hiding it would leave nothing rendered, and the next keystroke
  // would land in a new paragraph AHEAD of the command (the 2.403.1 trap,
  // for a bare trigger — 2.407.41). It hides once the space is typed.
  if (!picked && hideTo === text.length) return null;
  // Nothing typed after the command yet (a fresh argument pick is
  // "/agent Advisor "): leave its trailing space rendered. Hiding the whole
  // line leaves a paragraph with nothing rendered in it, so the browser has no
  // caret position there and puts the next keystrokes in a NEW paragraph ahead
  // of the command — which then no longer leads the draft (2.403.1). The caret
  // still goes after the space, so typed words land on the command's line.
  if (end === text.length && hideTo < end) {
    return { kind: 'inline', from: 1, to: 1 + hideTo, caret: 1 + end };
  }
  return { kind: 'inline', from: 1, to: 1 + end, caret: 1 + end };
}

const commandPrefixKey = new PluginKey('commandPrefixHidden');

/** The picked argument, if it still belongs to the active command and its label is intact in the draft. */
function pickedArgumentFor(
  pick: { trigger: string; item: ComposerArgumentItem } | null,
  hit: ComposerCommand | null | undefined,
  text: string,
): ComposerArgumentItem | null {
  if (!pick || !hit || pick.trigger !== hit.trigger) return null;
  return composerCommandArgumentText(text, hit).includes(pick.item.label) ? pick.item : null;
}

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
function commandMenuRenderer(label: string, keepItemsWhileLoading: boolean, sendWhenExact: boolean | (() => boolean) = false) {
  let renderer: ReactRenderer | null = null;
  let lastItems: CommandSuggestionItem[] = [];
  const menu = mountSuggestionMenu();
  const withItems = (props: SuggestionProps<CommandSuggestionItem>) => {
    // The command menu also gets the draft: a fully typed trigger plus Enter
    // sends rather than re-inserting the trigger (see CommandSuggestions).
    // A getter: `onCommandPick` (read live) turns it off, so Enter on a fully
    // typed trigger is a pick there too, and the pick runs the command.
    const exact = typeof sendWhenExact === 'function' ? sendWhenExact() : sendWhenExact;
    const draft = exact ? { draft: props.editor.getText() } : {};
    // A compact composer (a margin card's reply box) gets a menu sized to its rows.
    const compact = props.editor.view.dom.closest('[data-suggestion-boundary]')?.getAttribute('data-suggestion-boundary') === 'compact';
    const width = compact ? { width: 'fit' as const } : {};
    if (keepItemsWhileLoading && props.loading) return { ...props, items: lastItems, label, ...draft, ...width };
    lastItems = props.items;
    return { ...props, label, ...draft, ...width };
  };
  return {
    onStart: (props: SuggestionProps<CommandSuggestionItem>) => {
      lastItems = [];
      renderer = new ReactRenderer(CommandSuggestions, { props: withItems(props), editor: props.editor });
      menu.attach(renderer.element as HTMLElement);
      menu.place(props.clientRect?.(), props.editor.view.dom);
    },
    onUpdate: (props: SuggestionProps<CommandSuggestionItem>) => {
      renderer?.updateProps(withItems(props));
      menu.place(props.clientRect?.(), props.editor.view.dom);
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
  draft,
  onDraftChange,
  onCommand,
  onCommandPick,
  onSearchPeople,
  mentionMembers,
  onMentionNonMember,
  onSearchDocuments,
  allowAttachments = false,
  allowEmoji = false,
  onRequestLink,
  placeholder = 'Write a message…',
  inputLabel,
  commands,
  privacy = 'visible',
  onPrivacyChange,
  privacyLabels,
  disabled = false,
  readOnly,
  references,
  onRemoveReference,
  toolbarExtras,
  toolbar = 'full',
  moreActions,
  moreActionsLabel = 'More actions',
  processes,
  mode = 'chat',
  onModeChange,
  fixedMode,
  modePlaceholders,
  hints,
  onQuickOpen,
  sendOptions,
  onSendOption,
  onShellCommand,
  modeControl = 'tabs',
  modeShortcuts = false,
  modeTriggers,
  disabledModes,
  modes,
  modeUnavailableReasons,
  modeHints,
  submitLead,
  submitLabel,
  submitDisabledReason,
  radius,
  backdropTone = 'auto',
  working: workingProp,
  maxInputHeight,
  layout = 'auto',
  density = 'comfortable',
  status,
  suggestions,
  onSuggestion,
  suggestionsVisible = 'focused',
  modeRowEnd,
  hideModeMenu = false,
  singleModeLabel = false,
  referencesAction,
  referencesPlacement = 'end',
  referenceDrop,
  collapseWhenIdle = false,
  responsive,
  expanded: forceExpanded = false,
  onIdleFoldChange,
  documentMenu,
  modeRowStart,
  header,
  sendWithReferencesOnly = false,
  sendShortcut = 'enter',
  defaultCommand,
  presentation = 'card',
  className,
  'data-testid': testId = 'rich-chat-composer',
}, ref) {
  // The Enter keymap is built once, but `send` is recreated every render.
  // Reading it through a ref is what lets the extension stay stable without
  // capturing a stale closure over the staged files.
  const sendRef = useRef<() => void>(() => {});
  const sendShortcutRef = useRef(sendShortcut);
  sendShortcutRef.current = sendShortcut;
  const documentMenuRef = useRef(documentMenu);
  documentMenuRef.current = documentMenu;
  const linkRef = useRef<() => void>(() => {});
  const fileInput = useRef<HTMLInputElement | null>(null);
  const emojiTrigger = useRef<HTMLButtonElement | null>(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  // The link dialog's opening state. `text` is the selection at open time, so
  // the label field is prefilled with what the user highlighted.
  const [linkState, setLinkState] = useState<{ open: boolean; href: string; text: string }>(
    { open: false, href: '', text: '' },
  );
  const draftRef = useRef(draft);
  const changeRef = useRef(onDraftChange);
  changeRef.current = onDraftChange;
  const [staged, setStaged] = useState<StagedFile[]>(() => (draft?.files ?? []).map((file) => ({ id: `staged-${stagedSeq++}`, file })));
  const stagedRef = useRef(staged);
  const publishRef = useRef<(editor: Editor) => void>(() => {});
  const sendingRef = useRef(false);
  const mountedRef = useRef(true);
  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; }; }, []);
  const [sending, setSending] = useState(false);
  // false: no alert. true: a send failed for no reason the host gave. A
  // string: the host's ComposerSendError message.
  const [sendError, setSendError] = useState<boolean | string>(false);
  const readOnlyOn = readOnly != null && readOnly !== false;
  const readOnlyNote: ReactNode = readOnly === true ? 'Read only' : readOnly;
  const blocked = disabled || readOnlyOn || sending;
  // Off by the host (a verdict or a pause), not by a send in flight: the
  // controls wear muted ink, so nothing looks pressable that is not.
  const inert = disabled || readOnlyOn;
  // Mirrors emptiness so the send button can disable. `editor.isEmpty` is not
  // reactive, so reading it during render leaves the button one keystroke stale.
  const [empty, setEmpty] = useState(true);

  const attachmentsEnabled = allowAttachments && !blocked;

  // The placeholder as of this render, for the extension to read. See the
  // `useEditor` deps: the extension list must not change when the text does.
  // Modes are OFF until the host wires the switch. Read through one flag so
  // every branch below asks the same question and none of them can drift.
  const modesEnabled = !!onModeChange || !!fixedMode;
  const offeredModes: readonly ComposerMode[] = modes?.length
    ? COMPOSER_MODE_ORDER.filter((m) => modes.includes(m))
    : COMPOSER_MODE_ORDER;
  const activeMode: ComposerMode = fixedMode
    ?? (modesEnabled ? (offeredModes.includes(mode) ? mode : offeredModes[0] ?? 'chat') : 'chat');
  const terminalMode = activeMode === 'terminal';
  // Agent AND Terminal are "the console": both send somewhere that is not the
  // conversation, and both wear the dark surface that says so.
  const consoleMode = modesEnabled && activeMode !== 'chat';
  // Read-only: the editor stays on screen, disabled and described by the note
  // above it (2.480.1); it invites no words, so it shows no placeholder.
  const effectivePlaceholder = readOnlyOn ? ''
    : modePlaceholders?.[activeMode] ?? (activeMode === 'chat' ? placeholder : MODE_PLACEHOLDERS[activeMode]);
  // Shortcuts and triggers switch modes on the host's behalf, so they exist
  // only where the host can be told (`onModeChange`) and the mode can move.
  const switchable = !!onModeChange && !fixedMode;
  // One offered mode, named rather than switched (`singleModeLabel`).
  const singleMode = singleModeLabel && modesEnabled && !fixedMode && offeredModes.length === 1;
  const shellInputRef = useRef<HTMLInputElement | null>(null);
  /** Set by a shortcut or trigger: the next render moves focus to the new mode's input. */
  const focusAfterSwitchRef = useRef(false);
  /** Why the last shortcut/trigger was refused. Cleared by the next edit or switch. */
  const [modeNotice, setModeNotice] = useState<string | null>(null);
  const isModeDisabled = (m: ComposerMode) => !!disabledModes?.includes(m);
  // Read-only: the mode menu stays the way out only while another mode is on.
  const modeMenuOff = readOnlyOn && !offeredModes.some((m) => m !== activeMode && !isModeDisabled(m));
  // Read-only with another mode that can post (2.479.0): the menu is the way
  // out, and says so for the read-only rule (data-composer-readonly-allow).
  const modeMenuWayOut = readOnlyOn && !modeMenuOff
    ? { 'data-composer-readonly-allow': 'Switch to a mode you can use' } as const
    : undefined;
  const requestMode = (next: ComposerMode): boolean => {
    if (!switchable || !offeredModes.includes(next)) return false;
    if (isModeDisabled(next)) {
      setModeNotice(modeUnavailableReasons?.[next] ?? `${MODE_NAMES[next]} is not available here`);
      return false;
    }
    setModeNotice(null);
    if (next !== activeMode) {
      focusAfterSwitchRef.current = true;
      onModeChange?.(next);
    }
    return true;
  };
  const triggerPrefixes = modeTriggers && switchable
    ? {
        terminal: (typeof modeTriggers === 'object' ? modeTriggers.terminalPrefix : undefined) ?? DEFAULT_TERMINAL_PREFIX,
        agent: (typeof modeTriggers === 'object' ? modeTriggers.agentPrefix : undefined) ?? DEFAULT_AGENT_PREFIX,
      }
    : null;
  /**
   * Read from the editor's `onUpdate`, which is built once — so it goes
   * through a ref, like `publishRef`, and sees this render's mode and props.
   * Returns true when the draft was a trigger and has been consumed.
   */
  const triggerRef = useRef<(e: Editor) => boolean>(() => false);
  triggerRef.current = (e: Editor) => {
    if (!triggerPrefixes) {
      if (modeNotice) setModeNotice(null);
      return false;
    }
    const text = e.getText();
    let target: ComposerMode | null = null;
    if (activeMode !== 'terminal' && offeredModes.includes('terminal') && matchesModeTrigger(text, triggerPrefixes.terminal)) target = 'terminal';
    else if (activeMode !== 'agent' && offeredModes.includes('agent') && matchesModeTrigger(text, triggerPrefixes.agent)) target = 'agent';
    if (!target) {
      if (modeNotice) setModeNotice(null);
      return false;
    }
    // Refused: the prefix stays as typed text, and the notice says why.
    if (!requestMode(target)) return false;
    e.commands.clearContent(true);
    return true;
  };
  const placeholderRef = useRef(effectivePlaceholder);
  placeholderRef.current = effectivePlaceholder;
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
  // Read inside the `/` menu's Suggestion plugin (built once): a ref, so a
  // host that passes a new function each render does not rebuild the editor.
  const commandPickRef = useRef<((command: ComposerCommand) => void) | null>(null);
  // Whether the docked card (modeControl="menu") is naming the command as a
  // chip, in which case the command line it names is hidden in the input.
  // Assigned once `menuModeRow` is known, below; read by a ProseMirror plugin.
  const hideCommandPrefixRef = useRef(false);
  // The argument picked from the menu in this draft, if any. A ref, not state:
  // the Suggestion plugin reads it inside ProseMirror's state transitions,
  // where a React state value would be one render stale. Cleared on send and
  // whenever the draft is cleared.
  const argPickRef = useRef<{ trigger: string; item: ComposerArgumentItem } | null>(draft?.command?.argument ? { trigger: draft.command.trigger, item: draft.command.argument } : null);
  const [activeCommand, setActiveCommand] = useState<ComposerCommand | null>(null);
  // A content signature of the commands: identity changes every host render.
  const commandsSignature = (commands ?? [])
    .map((c) => [c.trigger, c.label, c.hint ?? '', c.description ?? '', c.disabled ? 1 : 0, c.argument ? 1 : 0].join('\u0001'))
    .join('\u0000');
  // Whether the active command's argument is still blank, for the status bar.
  const [argumentEmpty, setArgumentEmpty] = useState(true);
  // The argument picked from the second menu while its label is still intact
  // in the draft — what the menu-mode card names in its command chip
  // ("/workflow ⟡ migration-plan"). Null once the label is edited away.
  const [pickedArgument, setPickedArgument] = useState<ComposerArgumentItem | null>(null);
  // Whether the command line is hidden in the input right now. The docked
  // card's inline chip shows only then: it names what the input hides, so the
  // trigger is never on screen twice (2.407.41).
  const [prefixHidden, setPrefixHidden] = useState(false);
  const readPrefixHidden = (e: Editor) => hideCommandPrefixRef.current
    && !!hiddenCommandPrefix(e.state.doc, commandsRef.current, argPickRef.current);
  // The bar follows the DRAFT, not the render: re-derive whenever the host's
  // commands change (a document opened beside the chat), never clear on time.
  useEffect(() => {
    const e = editorRef.current as { getText: () => string; isDestroyed?: boolean } | null;
    if (!e || e.isDestroyed) return;
    const hit = matchComposerCommand(e.getText(), commands);
    setActiveCommand((prev) => (
      prev?.trigger === hit?.trigger && prev?.disabled === hit?.disabled && prev?.label === hit?.label && prev?.hint === hit?.hint ? prev : hit
    ));
    setPrefixHidden(readPrefixHidden(e as unknown as Editor));
    // Keyed on what the commands SAY, not on the array: hosts build a fresh
    // `commands` array on every render, and keying on identity re-ran this on
    // every keystroke (2.515.11).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commandsSignature]);
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
                    menu.place(props.clientRect?.(), props.editor.view.dom);
                  },
                  onUpdate: (props: SuggestionProps) => {
                    renderer?.updateProps(props);
                    menu.place(props.clientRect?.(), props.editor.view.dom);
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
                  .map((c) => ({
                    id: c.trigger, code: c.trigger, label: c.label, hint: c.hint, description: c.description,
                    // Enter on `/agent` typed out accepts it rather than sending (2.407.2).
                    ...(c.argument ? { takesArgument: true } : {}),
                  }));
              },
              // The trigger plus its separator, so the argument menu (below)
              // can open on the very next keystroke.
              command: ({ editor: e, range, props }) => {
                // `onCommandPick`: a command with nothing to ask runs on the
                // pick — no trigger left waiting beside an empty box.
                const picked = !props.takesArgument && commandPickRef.current
                  ? (commandsRef.current ?? []).find((c) => c.trigger === props.id)
                  : undefined;
                if (picked && commandPickRef.current) {
                  argPickRef.current = null;
                  e.commands.clearContent(true);
                  commandPickRef.current(picked);
                  return;
                }
                e.chain().focus().deleteRange(range).insertContent(`${props.id} `).run();
              },
              render: () => commandMenuRenderer('Commands', false, () => !commandPickRef.current),
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
      // Menu mode shows "/workflow ⟡ migration-plan" as a chip above the
      // input, so the same words are not repeated as text in it: the command
      // line is hidden by a decoration, never removed — the draft, the
      // `onDraftChange` html and the sent text all still carry it, so a host
      // that parses the command keeps working. The caret is kept after it,
      // and Backspace there removes the whole command (and so the chip).
      // Since 2.385.4.
      Extension.create({
        name: 'commandPrefixHidden',
        addProseMirrorPlugins() {
          const find = (doc: PMNode) => (hideCommandPrefixRef.current
            ? hiddenCommandPrefix(doc, commandsRef.current, argPickRef.current)
            : null);
          return [
            new Plugin({
              key: commandPrefixKey,
              appendTransaction: (trs, _old, state) => {
                if (!trs.some((tr) => tr.docChanged || tr.selectionSet || tr.getMeta(commandPrefixKey))) return null;
                const range = find(state.doc);
                const sel = state.selection;
                if (!range || !sel.empty || sel.from >= range.caret) return null;
                return state.tr.setSelection(TextSelection.create(state.doc, range.caret));
              },
              props: {
                decorations: (state) => {
                  const range = find(state.doc);
                  if (!range) return DecorationSet.empty;
                  const attrs = { class: 'hidden', 'data-command-prefix': range.kind };
                  return DecorationSet.create(state.doc, [
                    range.kind === 'block'
                      ? Decoration.node(range.from, range.to, attrs)
                      : Decoration.inline(range.from, range.to, attrs),
                  ]);
                },
                handleKeyDown: (view, event) => {
                  if (event.key !== 'Backspace') return false;
                  const range = find(view.state.doc);
                  const sel = view.state.selection;
                  if (!range || !sel.empty || sel.from !== range.caret) return false;
                  // Inline: through the caret, so a still-rendered trailing
                  // space goes with the command.
                  view.dispatch(view.state.tr.delete(range.from, range.kind === 'inline' ? range.caret : range.to));
                  return true;
                },
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
              // A written prompt: Enter is the newline, ⌘/Ctrl+Enter sends.
              if (sendShortcutRef.current === 'mod-enter') return false;
              sendRef.current();
              return true;
            },
            'Mod-Enter': () => {
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
        // Escape on an EMPTY prompt releases the caret (2.515.4): the editor
        // blurs, so the idle rule (`collapseWhenIdle`, or a host's own) folds
        // the composer. Escape used to do nothing here, which left a host no
        // way to fold on it. Not taken: a menu open (its suggestion plugin
        // consumes Escape, and an open menu means a typed trigger, so the
        // prompt is not empty anyway), words in the prompt (Escape must never
        // cost a draft its caret), an IME composition (Escape cancels it), or
        // an event already handled (the prompt deck takes Escape at the
        // document first). The key is never prevented: a dialog the composer
        // sits in still sees it.
        addProseMirrorPlugins() {
          return [new Plugin({
            key: new PluginKey('chatComposerEscape'),
            props: {
              handleKeyDown: (view, event) => {
                if (event.key !== 'Escape' || event.defaultPrevented || event.isComposing) return false;
                // Empty: one block holding nothing (no text, mention or break).
                const { doc } = view.state;
                if (doc.childCount !== 1 || doc.firstChild!.childCount !== 0) return false;
                (view.dom as HTMLElement).blur();
                return false;
              },
            },
          })];
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
                  menu.place(props.clientRect?.(), props.editor.view.dom);
                },
                onUpdate: (props: SuggestionProps) => {
                  renderer?.updateProps(withGate(props));
                  menu.place(props.clientRect?.(), props.editor.view.dom);
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
      // The panel form reads the query and can clear it (leaving the `#`).
      const docMenuProps = (props: SuggestionProps) => {
        const panel = documentMenuRef.current;
        if (!panel) return props;
        return {
          ...props,
          panel,
          onClearQuery: () => {
            const { from, to } = props.range;
            if (to > from + 1) props.editor.chain().focus().deleteRange({ from: from + 1, to }).run();
          },
        };
      };
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
                  renderer = new ReactRenderer(DocumentSuggestions, { props: docMenuProps(props), editor: props.editor });
                  menu.attach(renderer.element as HTMLElement);
                  menu.place(props.clientRect?.(), props.editor.view.dom);
                },
                onUpdate: (props: SuggestionProps) => {
                  renderer?.updateProps(docMenuProps(props));
                  menu.place(props.clientRect?.(), props.editor.view.dom);
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

  // The contenteditable's attributes. Built into the editor at creation; a
  // later change (a new `inputLabel`) is applied to the living view below
  // rather than by rebuilding the editor (see the note on the deps).
  const inputAttributes = useMemo<Record<string, string>>(() => ({
    role: 'textbox',
    'aria-multiline': 'true',
    ...(inputLabel ? { 'aria-label': inputLabel } : {}),
    class: 'chat-composer-input',
    'data-testid': `${testId}-input`,
    ...(readOnlyOn ? { 'aria-readonly': 'true', 'aria-disabled': 'true', 'aria-describedby': `${testId}-readonly-note` } : {}),
  }), [inputLabel, testId, readOnlyOn]);
  const appliedInputAttributesRef = useRef(inputAttributes);

  const editor = useEditor(
    {
      extensions,
      content: draft?.html ?? '',
      editable: !blocked,
      onUpdate: ({ editor: e }) => {
        // A mode trigger clears the draft, which re-enters here with an empty
        // editor; that nested update does the publishing.
        if (triggerRef.current(e)) return;
        setEmpty(e.isEmpty);
        editorRef.current = e;
        const text = e.getText();
        const hit = matchComposerCommand(text, commandsRef.current);
        setActiveCommand((prev) => (prev?.trigger === hit?.trigger ? prev : hit));
        setArgumentEmpty(!hit || composerCommandArgumentText(text, hit).trim() === '');
        // A pick belongs to the command it was made for.
        if (argPickRef.current && argPickRef.current.trigger !== hit?.trigger) argPickRef.current = null;
        setPickedArgument(pickedArgumentFor(argPickRef.current, hit, text));
        setPrefixHidden(readPrefixHidden(e));
        publishRef.current(e);
      },
      editorProps: { attributes: inputAttributes },
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
    editor?.setEditable(!blocked);
  }, [editor, blocked]);

  // A changed `inputLabel` (or test id), on the living view.
  useEffect(() => {
    if (!editor || editor.isDestroyed || appliedInputAttributesRef.current === inputAttributes) return;
    appliedInputAttributesRef.current = inputAttributes;
    editor.view.setProps({ attributes: inputAttributes });
  }, [editor, inputAttributes]);

  // The Placeholder extension reads `placeholderRef` while it builds
  // decorations, and switching mode is not an editor transaction — so without
  // an empty dispatch the segmented control moves and the grey text underneath
  // keeps saying "Write a message…". Empty transaction: no content change, no
  // history entry, just a redecorate. The same goes for a host changing the
  // placeholder text itself (a deck dock's "…on slide 3" as the stage moves).
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    editor.view.dispatch(editor.state.tr);
  }, [editor, activeMode, modesEnabled, effectivePlaceholder]);

  // After a shortcut or trigger switched modes, the caret goes where the new
  // mode types: the shell line for Terminal, the editor otherwise. Only then —
  // a host changing `mode` for its own reasons must not steal focus.
  useEffect(() => {
    if (!focusAfterSwitchRef.current) return;
    focusAfterSwitchRef.current = false;
    if (activeMode === 'terminal') shellInputRef.current?.focus();
    else if (editor && !editor.isDestroyed) editor.commands.focus('end');
  }, [activeMode, editor]);

  /**
   * The terminal prompt's own line, and the lines before it.
   *
   * Separate from the rich draft on purpose: switching to Terminal and back
   * must not consume the half-written message, and a shell line is not a
   * document — it has no marks, no mentions and no attachments, so it does not
   * belong in the ProseMirror state at all. History is in-memory and per-mount,
   * like a real shell's, and is never published to `onDraftChange`.
   */
  const [shellDraft, setShellDraft] = useState('');
  const [shellHistory, setShellHistory] = useState<readonly string[]>([]);
  /** -1 is "composing a new line"; 0 is the most recent command. */
  const [historyIndex, setHistoryIndex] = useState(-1);

  const submitShell = useCallback(() => {
    const command = shellDraft.trim();
    if (!command || blocked || !onShellCommand || submitDisabledReason?.trim()) return;
    setShellHistory((prev) => (prev[prev.length - 1] === command ? prev : [...prev, command]));
    setShellDraft('');
    setHistoryIndex(-1);
    onShellCommand(command);
  }, [shellDraft, blocked, onShellCommand, submitDisabledReason]);

  const recallHistory = useCallback(
    (delta: number) => {
      if (!shellHistory.length) return;
      const next = Math.min(shellHistory.length - 1, Math.max(-1, historyIndex + delta));
      setHistoryIndex(next);
      setShellDraft(next < 0 ? '' : shellHistory[shellHistory.length - 1 - next] ?? '');
    },
    [shellHistory, historyIndex],
  );

  /**
   * The hint row.
   *
   * Defaults exist, but they only appear once the host has adopted modes or
   * wired quick-open: a composer with no shell and no palette behind it must
   * not advertise `>_` and `⌘K`, and a hint for a key that does nothing is
   * worse than no hint at all.
   */
  const terminalOffered = offeredModes.includes('terminal');
  const resolvedHints = useMemo<readonly ComposerHint[]>(() => {
    const perMode = modeHints?.[activeMode];
    if (perMode) return perMode;
    if (hints) return hints;
    if (!onModeChange && !onQuickOpen) return [];
    return [
      { key: '/', label: 'for commands' },
      ...(terminalOffered
        ? [{ key: '>_', label: 'for shell', ...(onModeChange ? { onSelect: () => onModeChange('terminal') } : {}) }]
        : []),
      { key: '⌘K', label: 'to quickly open', ...(onQuickOpen ? { onSelect: onQuickOpen } : {}) },
    ];
  }, [hints, onModeChange, onQuickOpen, modeHints, activeMode, terminalOffered]);

  // Files alone are a valid message: dragging in a screenshot and pressing send
  // without typing is the common case. In terminal mode there is no message —
  // there is a command line, and it is the only thing Send can act on.
  const sendLabel = (typeof submitLabel === 'string' ? submitLabel : submitLabel?.[activeMode])
    ?? (terminalMode ? 'Run' : 'Send');

  const submitBlockedBy = submitDisabledReason?.trim() || null;
  const canSend = !submitBlockedBy && (terminalMode
    ? !blocked && !!onShellCommand && shellDraft.trim().length > 0
    : !blocked && (!empty || staged.length > 0 || (sendWithReferencesOnly && !!references?.length)));
  // Send's described-by target: the visible hint line below (2.515.6).
  const submitReasonId = `${useId()}-submit-reason`;
  const submitReasonProps = submitBlockedBy ? { 'aria-describedby': submitReasonId, title: submitBlockedBy } : {};

  // Publish synchronously so a conversation switch in the same event never
  // unmounts the editor before its latest text or file selection is retained.
  const publish = (e: Editor) => {
    const previous = draftRef.current;
    const pick = argPickRef.current;
    const hit = matchComposerCommand(e.getText(), commandsRef.current);
    const next: RichChatDraft = {
      html: e.isEmpty ? '' : e.getHTML(), files: stagedRef.current.map((item) => item.file),
      ...(hit ? { command: { trigger: hit.trigger, ...(pick?.trigger === hit.trigger && composerCommandArgumentText(e.getText(), hit).includes(pick.item.label) ? { argument: pick.item } : {}) } } : {}),
      // Only present while the host has wired the toggle — see the note on
      // `RichChatDraft.privacy`.
      ...(onPrivacyChange ? { privacy } : {}),
    };
    if (previous && previous.html === next.html && previous.files.length === next.files.length
      && previous.files.every((file, index) => file === next.files[index])
      && previous.command?.trigger === next.command?.trigger && previous.command?.argument === next.command?.argument
      && previous.privacy === next.privacy) return;
    draftRef.current = next;
    changeRef.current?.(next, previous);
  };
  publishRef.current = publish;
  const replaceStaged = (next: StagedFile[]) => {
    stagedRef.current = next;
    setStaged(next);
    if (editor && !editor.isDestroyed) publishRef.current(editor);
  };
  // The editor the derived state below was last read from — see the effect.
  const syncedEditorRef = useRef<Editor | null>(null);
  useEffect(() => {
    // `isDestroyed` too: a composer revealed from a Suspense boundary (it is
    // lazy-loaded inside the presentation editor) has its effects reconnected
    // after tiptap tore down the instance it pre-rendered. Reading a destroyed
    // editor throws on its null schema; `useEditor` hands back a fresh one on
    // the next render and this effect runs again for it.
    if (!editor || editor.isDestroyed) return;
    // An external change may be a restored conversation or a send completion
    // from its previous composer. Do not rebuild the editor or move its caret
    // in response to our own onDraftChange echo.
    const external = !!onDraftChange && draft !== draftRef.current;
    // Our own echo on the same editor: NOTHING to do. `onUpdate` already set
    // every piece of state below from this very text, and re-setting it here
    // is not free — this effect runs in the passive phase of the keystroke's
    // sync commit, so its setStates land at Default priority as a NESTED
    // update. While keys arrive faster than that Default render (a heavy page,
    // synthetic typing at delay 0) React never resets its nested-update count
    // and throws "Maximum update depth exceeded" after ~50 keys (2.407.39).
    if (!external && syncedEditorRef.current === editor) return;
    syncedEditorRef.current = editor;
    if (external) {
      draftRef.current = draft;
      // The pick first: the hidden-command plugin reads it while the new
      // content is applied.
      argPickRef.current = draft?.command?.argument ? { trigger: draft.command.trigger, item: draft.command.argument } : null;
      const html = draft?.html ?? '';
      // Idempotent: a draft that already IS the editor's text (a host that
      // copies the draft into a new object, a restore of what is on screen)
      // keeps the editor, its caret and its history; the empty transaction
      // lets the hidden-command plugin re-read the pick.
      if (html === (editor.isEmpty ? '' : editor.getHTML())) editor.view.dispatch(editor.state.tr.setMeta(commandPrefixKey, true));
      else editor.commands.setContent(html, { emitUpdate: false });
      const files = (draft?.files ?? []).map((file) => ({ id: `staged-${stagedSeq++}`, file }));
      const sameFiles = files.length === stagedRef.current.length && files.every((item, i) => item.file === stagedRef.current[i]!.file);
      if (!sameFiles) { stagedRef.current = files; setStaged(files); }
    }
    editorRef.current = editor;
    const text = editor.getText();
    setEmpty(editor.isEmpty);
    const hit = matchComposerCommand(text, commandsRef.current);
    // A restored draft's `command` is a claim about its text, not state: a
    // pick for a trigger the text no longer starts with is dropped.
    if (argPickRef.current && argPickRef.current.trigger !== hit?.trigger) argPickRef.current = null;
    setActiveCommand(hit);
    setArgumentEmpty(!hit || composerCommandArgumentText(text, hit).trim() === '');
    setPickedArgument(pickedArgumentFor(argPickRef.current, hit, text));
    setPrefixHidden(readPrefixHidden(editor));
  }, [editor, draft, onDraftChange]);

  // Stamps `privacy` onto the published draft as soon as the CONTROLLED prop
  // changes — typically right after the host applies `onPrivacyChange` from a
  // press of the toggle below. Without this, a press that lands with no
  // accompanying keystroke would leave the persisted draft holding the old
  // value until the next edit. `publish`'s own equality check makes this a
  // true no-op when nothing actually changed, including for every host that
  // never wires `onPrivacyChange` at all — see the bail-out above.
  useEffect(() => {
    if (!onPrivacyChange || !editor || editor.isDestroyed) return;
    publishRef.current(editor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privacy, editor]);

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
    if (!editor || !canSend || terminalMode || sendingRef.current) return;
    const typed = editor.getText();
    // Agent mode routes through the host's EXISTING `/agent` command rather
    // than a second dispatch path — same parser, same server contract, same
    // command bar above the editor. Already-prefixed text is left alone so
    // typing the command out by hand does not produce `/agent /agent …`.
    const text = activeMode === 'agent' && !fixedMode && typed.trim() && !/^\s*\/agent\b/i.test(typed)
      ? `/agent ${typed.trim()}`
      : typed;
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
    const message: ComposedMessage = {
      html: editor.isEmpty ? '' : editor.getHTML(),
      text,
      mentions: collectMentions(editor),
      privacy,
      files: staged.map((s) => s.file),
      ...(documents.length > 0 ? { documents } : {}),
      ...(command ? { command } : {}),
      // Only present while the host has wired the switch — see the note on
      // `ComposedMessage.mode`.
      ...(modesEnabled ? { mode: activeMode } : {}),
    };
    const sentDraft = draftRef.current;
    const notify = changeRef.current;
    const accepted = (result: void | boolean) => {
      if (result === false) return;
      if (!mountedRef.current || editor.isDestroyed) {
        // The host compares `sentDraft` with its current conversation draft.
        notify?.({ html: '', files: [] }, sentDraft);
      } else if (draftRef.current === sentDraft) {
        argPickRef.current = null;
        stagedRef.current = []; setStaged([]);
        editor.commands.clearContent(true);
        // Clearing an already-empty editor (a files-only message) need not
        // emit an editor update, but the removed attachments still do.
        if (draftRef.current === sentDraft) publishRef.current(editor);
        setEmpty(true);
      }
    };
    sendingRef.current = true;
    setSendError(false);
    try {
      const result = onSend(message);
      if (result && typeof result === 'object' && 'then' in result) {
        setSending(true);
        void result.then(accepted, (error: unknown) => { if (mountedRef.current && !editor.isDestroyed) setSendError(composerSendErrorReason(error) ?? true); }).finally(() => {
          sendingRef.current = false;
          if (mountedRef.current && !editor.isDestroyed) setSending(false);
        });
      } else { accepted(result); sendingRef.current = false; }
    } catch (error) {
      sendingRef.current = false; setSendError(composerSendErrorReason(error) ?? true);
    }
  }, [editor, canSend, onSend, staged, privacy, terminalMode, activeMode, modesEnabled, fixedMode]);

  sendRef.current = send;
  commandPickRef.current = onCommandPick ? (command: ComposerCommand) => {
    setSendError(false);
    const fail = (error: unknown) => { if (mountedRef.current) setSendError(composerSendErrorReason(error) ?? true); };
    try {
      const result = onCommandPick(command);
      if (result && typeof result === 'object' && 'then' in result) void result.then(undefined, fail);
    } catch (error) { fail(error); }
  } : null;

  // The prompt card's command switch (`/adjust ▾` → `/crop`): rewrites the
  // leading trigger in place, or puts one in front of the words already
  // typed. The draft stays text — the host still reads the command from it.
  const switchCommand = useCallback((next: ComposerCommand) => {
    if (!editor || editor.isDestroyed) return;
    const first = editor.state.doc.firstChild;
    const text = first && first.isTextblock ? first.textBetween(0, first.content.size, undefined, '\ufffc') : '';
    const current = matchComposerCommand(text, commandsRef.current);
    const lead = text.length - text.trimStart().length;
    if (current) {
      editor.chain().focus().insertContentAt({ from: 1 + lead, to: 1 + lead + current.trigger.length }, next.trigger).run();
    } else {
      editor.chain().focus().insertContentAt(1, `${next.trigger} `).run();
    }
  }, [editor]);
  // `# Context`: a `#` at the caret (after a space when it would join a
  // word), which opens the `#` menu.
  const startContext = useCallback(() => {
    if (!editor || editor.isDestroyed) return;
    const { from } = editor.state.selection;
    const before = from > 1 ? editor.state.doc.textBetween(from - 1, from, undefined, '\ufffc') : '';
    editor.chain().focus().insertContent(before && !/\s/.test(before) ? ' #' : '#').run();
  }, [editor]);
  linkRef.current = openLinkDialog;

  useImperativeHandle(
    ref,
    () => ({
      get editor() {
        return editor;
      },
      // A focus scheduled for a later frame (unfolding, a deck hidden, Back)
      // can land after the composer unmounted: a destroyed editor has no
      // commands, so it is skipped instead of throwing.
      focus: () => {
        if (editor && !editor.isDestroyed) editor.commands.focus();
      },
      insertText: (text: string) => {
        if (editor && !editor.isDestroyed) editor.chain().focus().insertContent(text).run();
      },
    }),
    [editor],
  );

  const stage = useCallback(
    (files: File[]) => {
      if (!attachmentsEnabled || files.length === 0) return;
      replaceStaged([...stagedRef.current, ...files.map((file) => ({ id: `staged-${stagedSeq++}`, file }))]);
    },
    [attachmentsEnabled, editor],
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
  const [rootWidth, setRootWidth] = useState<number | null>(null);
  const observer = useRef<ResizeObserver | null>(null);
  /**
   * The width the root measured while each size class was on screen, in the
   * space it has now. In a box whose width comes from its children (an `auto`
   * grid column, an inline-block) the composer's width depends on its own size
   * class, and there may be NO class that fits the width it produces — a long
   * placeholder measured 323px in the medium layout (reads as narrow) and
   * 413px in the narrow one-row layout (reads as medium). Re-measuring every
   * commit flipped between the two until React threw "Maximum update depth
   * exceeded". This record is how a measurement tells "the space changed"
   * from "my own layout changed": once a class re-measures what it measured
   * before and the class it points at has already bounced, it stays put.
   */
  const widthUnder = useRef<Partial<Record<ComposerSize, number>>>({});
  /** The auto size class this render drew — what the next measurement was taken under. */
  const renderedSize = useRef<ComposerSize>(composerSizeFor(null));
  const measureRoot = useCallback((w: number) => {
    // A zero width is "no layout", not "very narrow" — a detached subtree, a
    // display:none ancestor, or a test environment with no layout engine at
    // all. Collapsing on that reading would hide the toolbar wherever the
    // composer is measured before it is shown.
    if (!(w > 0)) {
      widthUnder.current = {};
      setRootWidth(null);
      return;
    }
    const drawn = renderedSize.current;
    const before = widthUnder.current[drawn];
    // The same layout measuring differently means the space (or the content)
    // changed: what the other classes measured no longer says anything.
    if (before !== undefined && before !== w) widthUnder.current = {};
    widthUnder.current[drawn] = w;
    const next = composerSizeFor(w);
    // This layout measured exactly what it measured last time, and `next` was
    // already drawn in this same space and measured outside itself: the two
    // only hand the composer back and forth. Keep the layout on screen — the
    // box is sized to it, so it fits. (A first reading under a class is never
    // taken as a bounce: it is also how a real resize arrives.)
    const tried = widthUnder.current[next];
    if (next !== drawn && before === w && tried !== undefined && composerSizeFor(tried) !== next) return;
    setRootWidth(w);
  }, []);
  const rootNode = useRef<HTMLDivElement | null>(null);
  // Focus anywhere inside the composer (the input, a chip, the toolbar):
  // suggestion chips show only while it holds focus AND the input is empty.
  const [focusWithin, setFocusWithin] = useState(false);
  // A host payload being dragged over the card (`referenceDrop`). A counter,
  // not a flag: dragenter/dragleave fire for every child the pointer crosses.
  const [referenceDragDepth, setReferenceDragDepth] = useState(0);
  const acceptsReferenceDrag = (dataTransfer: DataTransfer | null): boolean =>
    !!referenceDrop && !!dataTransfer && Array.from(dataTransfer.types ?? []).some((t) => referenceDrop.types.includes(t));
  // `collapseWhenIdle`: the caret entered the INPUT since focus came into the
  // composer. Not plain focus-within: a press on the idle row's mode pill or
  // Send must not re-lay the row out under the pointer mid-click.
  const [engaged, setEngaged] = useState(false);
  /** A pending "focus left" decision — see `onBlurCapture`. */
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (blurTimer.current !== null) clearTimeout(blurTimer.current); }, []);
  const inputBoxRef = useRef<HTMLDivElement | null>(null);
  /**
   * The composer measures its OWN box — the size classes key off the space it
   * was given (a chat column, a dock over an editor, a side panel), never the
   * window's.
   *
   * A ResizeObserver rather than a CSS container query, on purpose:
   * `container-type` applies layout containment, which makes the composer the
   * containing block for `position: fixed` descendants — the emoji picker
   * (ReactionPickerPopover) and the link dialog's backdrop (PopoverForm) are
   * both fixed and both live inside this box, and would be pinned to the
   * composer instead of the viewport.
   *
   * A CALLBACK ref, not `useRef` + a mount effect (the history: the toolbar row
   * this used to measure is not in the DOM on the first effect, so a mount
   * effect read `null` and never re-attached). A callback ref attaches
   * whenever the node appears, however late.
   */
  const rootRef = useCallback((el: HTMLDivElement | null) => {
    observer.current?.disconnect();
    observer.current = null;
    rootNode.current = el;
    if (!el || typeof ResizeObserver === 'undefined') return;
    // The border box, as the layout effect below reads it: the observer's
    // content box is a few px narrower, and two readings of one layout would
    // look like the space changing.
    const ro = new ResizeObserver(([entry]) => measureRoot(el.getBoundingClientRect().width || entry.contentRect.width));
    ro.observe(el);
    observer.current = ro;
    measureRoot(el.getBoundingClientRect().width);
  }, [measureRoot]);
  useEffect(() => () => observer.current?.disconnect(), []);
  /**
   * Re-measure after every commit, and do NOT rely on the observer for the
   * first real number: its callbacks are delivered on the rendering pipeline,
   * and a tab that is not rendering (backgrounded, or driven by automation)
   * never gets them. A layout effect reads the post-layout width
   * synchronously. Settles in one extra render — the same width bails out.
   */
  useLayoutEffect(() => {
    const el = rootNode.current;
    if (!el) return;
    const w = el.getBoundingClientRect().width;
    if (w > 0 && w !== rootWidth) measureRoot(w);
    // A focused control that UNMOUNTS (the status line's × or its action,
    // gone the moment they are pressed) takes focus to <body> without a blur
    // event, so `onBlurCapture` never ran and the composer kept believing it
    // held focus: suggestion chips stayed up on the idle dock (live
    // 2026-09-23, 69 px instead of 42). Re-check after every commit.
    // (Focus on <body> specifically: focus in a portal menu the composer
    // opened is outside `el` in the DOM and still ours.)
    if (focusWithin && blurTimer.current === null && typeof document !== 'undefined'
      && (!document.activeElement || document.activeElement === document.body)) {
      setFocusWithin(false);
      setEngaged(false);
    }
  });
  renderedSize.current = composerSizeFor(rootWidth);
  const size: ComposerSize = layout === 'auto' ? renderedSize.current : layout;
  const wide = size === 'wide';
  const narrow = size === 'narrow';
  // The pane mode (2.431.0): one input row below `wide`, by the composer's own width.
  const pane = responsive === 'pane' && !wide;
  const compact = density === 'compact';
  const compactModeRow = modesEnabled && !fixedMode && (modeControl === 'compact' || modeControl === 'menu' || narrow);
  // `menu` puts the mode in a dropdown and the draft's references at the
  // row's END (a document chip on the right, the way an editor's dock reads);
  // otherwise references ride the compact row only at compact density.
  const menuModeRow = compactModeRow && modeControl === 'menu' && !narrow && !pane;
  // The editor dock (menu + the `editor` strip) is the Folders mockup's card
  // (2.386.0): `✦ Agent ⌄` whose menu also holds what `?` and `⋯` held, the
  // picked command as a chip at the START of the instruction line, a
  // larger strip and Send. Every other composer keeps its own layout.
  const docked = menuModeRow && (toolbar === 'editor' || toolbar === 'prompt' || toolbar === 'prompt-card' || toolbar === 'basic');
  // The prompt card (2.390.0; `prompt-card` since 2.508.0): the docked card
  // with no formatting strip — its foot is `/ Commands`, `# Context`, the
  // host's extras (a mic), the send key and a round Send — and the command
  // chip switches commands.
  const promptCard = docked && toolbar === 'prompt-card';
  // The basic box (2.390.0): the docked card with its mode as a boxed
  // picker ("Agent ⌄", no glyph), the input in its own bordered well, and the
  // strip under it with no rule — the Initiatives mockup's composer. The
  // `prompt` preset docks the same way (2.508.0), minus the formatting.
  // The quiet prompt box (`presentation="prompt"`, 2.510.0): the docked card
  // with no mode chrome at all, the editor dock's plain input (no well) and
  // a Send that is its label alone — the record, its chips, the box, one verb.
  const quiet = presentation === 'prompt';
  const basicBox = docked && (toolbar === 'basic' || (toolbar === 'prompt' && !quiet));
  // Send's size and content, shared by the plain Send and the split one's
  // primary half. Before 2.407.8 the split stayed `text-xs` whatever `docked`
  // said while the plain docked Send was `h-9` (idle rows 42px vs 50px).
  // Compact on every context (2.407.9): the social row's small Send — the
  // idle row stays 42px on a conversation and a document alike; the docked
  // card keeps its arrow, at the compact size.
  const sendSize = docked ? 'inline-flex items-center gap-1 px-2.5 py-1 text-xs' : menuModeRow ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';
  // The basic box leads with a paper plane ("✈ Send"), as the Initiatives
  // mockup draws it; the editor dock keeps its arrow.
  const sendContent = quiet ? <>{sendLabel}</> : (
    <>
      {basicBox && <SendIcon size={12} aria-hidden="true" />}
      {sendLabel}
      {docked ? (!basicBox && <ArrowRightIcon size={12} aria-hidden="true" />) : menuModeRow && <span aria-hidden="true" className="ml-1.5">→</span>}
    </>
  );
  hideCommandPrefixRef.current = menuModeRow;
  // Every menu-mode command chip replaces its typed prefix once a visible
  // continuation remains; a bare trigger alone stays rendered for the caret.
  // The plugin reads the ref on the next transaction; switching into or out
  // of the docked card sends an empty one so the command line hides or shows
  // (and the caret moves past it) straight away.
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    editor.view.dispatch(editor.state.tr.setMeta(commandPrefixKey, true));
    setPrefixHidden(readPrefixHidden(editor));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, menuModeRow, docked]);
  // The quiet box keeps its references in its header row at every width, so
  // adding one never adds a row (2.510.0).
  const referencesInModeRow = (compactModeRow && (compact || menuModeRow)) || (quiet && !pane);
  // The header row: the mode row, or — in the quiet box — the row that holds
  // the references and the host's row content even with no modes to show.
  const headerRow = compactModeRow || quiet;
  // Compact folds the hints row into `?` at every width.
  // The docked card (`menu`) keeps its hints in the `?` menu: the row of
  // Enter/`>`/⌥n chips under the input is chat-column furniture.
  const hintsInRow = wide && !compact && !(modeControl === 'menu');
  const hasSuggestions = !!suggestions?.length && !!onSuggestion;
  // Never on the one-row idle composer: the chips there would sit where the
  // next click lands (a chip click STARTS a run) and grow the idle dock.
  // `suggestionsVisible="empty"` keeps them at rest, still never on the folded idle row.
  const showSuggestionRow = hasSuggestions && wide && empty && (suggestionsVisible === 'empty'
    ? !(collapseWhenIdle && !engaged && !forceExpanded)
    : focusWithin && !(collapseWhenIdle && !engaged));
  const suggestionsInMenu = hasSuggestions && !wide;
  // Idle: one row (pill · input · Send). Anything worth reading — a status,
  // a running process, a staged file, a command, a notice, words in the box —
  // keeps the full composer, as does the caret in the input.
  const collapsed = collapseWhenIdle && !forceExpanded && !engaged && empty && !status && !processes?.length
    && !staged.length && !activeCommand && !sendError && !modeNotice && !terminalMode
    && !linkState.open && !(onPrivacyChange && privacy === 'hidden');
  const idleFoldListener = useRef(onIdleFoldChange);
  idleFoldListener.current = onIdleFoldChange;
  useEffect(() => { idleFoldListener.current?.(collapsed); }, [collapsed]);
  // Rows that appear on expanding fade up in place — opacity and transform
  // only, so the one re-layout happens once, not on every animation frame.
  const reveal = collapseWhenIdle && 'motion-safe:[animation:composerReveal_140ms_ease-out]';
  // Narrow keeps the toolbar behind a toggle. Opening it is a per-composer
  // choice that survives a resize (someone who opened it wants it open).
  const [formatOpen, setFormatOpen] = useState(false);
  const singleRow = ((narrow || pane) && !formatOpen) || collapsed;
  // The narrow idle row (2.447.0): the input gets the row before any chip. A
  // mode pill plus a context chip plus Send left a 340px dock's input ~64px
  // wide ("Sear…"); under `narrow` the chips fold into ONE mode chip whose
  // menu (and tooltip) carries what the draft is about.
  const foldedChip = collapsed && (narrow || (!!references?.length && rootWidth !== null && rootWidth > 0 && rootWidth < 640));
  const chipRow = pane || foldedChip;
  // The leading chip names the mode, except in the quiet box (no mode chrome).
  const chipModes = modesEnabled && !quiet;
  // The pane's Aa / ? / ⋯ / row end: while focus is inside OR the draft holds
  // something. Keyed on focus alone, pressing Send on an unfocused draft
  // brought them in on mousedown, wrapped Send to the next row and the
  // mouseup missed it (2.431.3).
  const paneTools = focusWithin || !empty;
  // Strikethrough, code, lists and quote: inline when wide, in the `⋯` menu otherwise.
  // The compact preset keeps only the bulleted list of those inline at wide
  // width and files the other four under `?` → Formatting (`formatInHints`).
  // `editor` sits between the two: code and quote stay on the strip,
  // strikethrough and numbered list fold under `?` with `compact`'s.
  const compactToolbar = toolbar === 'compact';
  const basicToolbar = toolbar === 'basic';
  // `prompt` (2.508.0): no formatting controls anywhere — not on the strip,
  // not under `?`, not behind `⋯`. `prompt-card` off the docked card is the same.
  const promptToolbar = toolbar === 'prompt' || toolbar === 'prompt-card';
  // `basic` is `editor` without the bulleted list and quote on the strip.
  const editorToolbar = toolbar === 'editor' || promptToolbar || basicToolbar;
  const fullToolbar = !compactToolbar && !editorToolbar;
  const showSecondaryMarks = wide && fullToolbar;
  const showCode = wide && !compactToolbar;
  const showListControls = wide && fullToolbar;
  const showQuote = wide && !compactToolbar && !basicToolbar;
  const showBulletedList = wide && !basicToolbar;
  const formatInHints = wide && !fullToolbar && !promptToolbar;
  // What the prompt strip holds besides extras; the divider before
  // `toolbarExtras` only separates it from something.
  const promptStripLead = attachmentsEnabled || (allowEmoji && !!editor) || !!onPrivacyChange;
  const promptStrip = promptStripLead || toolbarExtras != null;
  // The editor dock has no `?` and no `⋯` on its strip (the mockup's strip
  // ends in `/ commands` and Send). Its mode menu carries host actions and
  // keyboard hints only; formatting belongs to the editor toolbar.
  // A single-mode label has no menu to hold them: they go back to the `⋯`.
  const showMoreActions = !!moreActions?.length && (!docked || singleMode || quiet);
  const inlineCommand = docked && !!activeCommand && !collapsed && !terminalMode;
  // The prompt card's chip: the typed command, else the host's default.
  const chipCommand = promptCard && !collapsed && !terminalMode
    ? (activeCommand ?? (defaultCommand ? commands?.find((c) => c.trigger === defaultCommand) ?? null : null))
    : null;
  const dockedMenuSections: DropdownMenuSection[] = !docked ? [] : [
    ...(moreActions ?? []),
    ...(resolvedHints.length ? [{
      label: 'Keys',
      items: resolvedHints.map((hint) => ({
        label: hint.label,
        trailing: <kbd className="rounded border border-border bg-surface-inset px-1 font-mono text-[10px] text-text-secondary">{hint.key}</kbd>,
        ...(hint.onSelect ? { onSelect: hint.onSelect } : {}),
      })),
    }] : []),
  ];
  // The console sky. `none` keeps the ordinary surface in Agent/Terminal: the
  // mode still changes what Enter does, it just stops repainting the box.
  const tone = useResolvedBackdropTone(rootNode, backdropTone, consoleMode);
  // One field per region: inside a console column that is already painting its
  // sky, the composer keeps its tint and border and draws no particles of its
  // own — two GL fields stacked in one box read as noise, and cost twice.
  const enclosingSurface = useEnclosingConsoleSurface();
  // The one-row idle composer wears the surface it sits on, not the console:
  // a dark pill at the foot of a light editor read as an embedded frame. The
  // console sky arrives with the caret (2.376.0). Inside a column that is
  // already painting its sky the row keeps the inherited tint — a light row
  // on a night column would be the same mistake the other way round.
  const consoleSurface = consoleMode && tone !== 'none' && !(collapsed && !enclosingSurface?.painting);
  const skyInherited = consoleSurface && !!enclosingSurface?.painting;
  const ownSky = consoleSurface && !skyInherited;
  const working = workingProp ?? enclosingSurface?.working ?? false;
  const surfaceVars: Record<string, string> = {};
  if (radius) surfaceVars['--composer-radius'] = COMPOSER_RADII[radius];
  if (maxInputHeight !== undefined) {
    surfaceVars['--composer-input-max'] = typeof maxInputHeight === 'number' ? `${maxInputHeight}px` : maxInputHeight;
  }
  // Drawn-particle budget for the console sky: bounded by the box's area
  // (see `ParticlesBackground`'s `density`), so a narrow composer is not
  // painting the same 120 stars as a wide one.
  // Working raises both the count and the per-area cap, so the cue is visible
  // in a small dock without letting a wide one draw more than the cap allows.
  const CONSOLE_DENSITY = working ? 30 : 22;

  const toolbarButton = (
    label: string,
    active: boolean,
    onClick: () => void,
    glyph: ReactNode,
    ref?: Ref<HTMLButtonElement>,
    testId?: string,
  ) => (
    <button
      data-ui-part=""
      // `testId ?? label`, not `label` alone: the privacy toggle's label TEXT
      // changes with its own state ("Visible to everyone" ↔ "Only you"), and
      // a key that changes is React's signal to unmount the old element and
      // mount a new one — which would drop DOM focus out of the toolbar on
      // every press for a keyboard user. Every other caller leaves `testId`
      // unset, so this is `label` exactly as before for them.
      key={testId ?? label}
      ref={ref}
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      disabled={blocked}
      aria-disabled={inert ? 'true' : undefined}
      data-testid={testId}
      // mousedown + preventDefault, not click: clicking would blur the editor
      // and collapse the selection first, so "bold" would apply to nothing.
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      // Enter/Space activates a focused <button> as a native click with no
      // preceding mousedown, so the handler above never runs for a keyboard
      // press. A real pointer click already ran it — its OWN click event
      // carries a nonzero `detail` (the click count), which is what tells the
      // two apart here and keeps a mouse click from firing `onClick` twice.
      onClick={(e) => {
        if (e.detail === 0) onClick();
      }}
      className={cn(
        // `shrink-0`: without it the flex row squeezes the buttons instead of
        // dropping any — measured at 21px against a 28px box, which is under
        // the size a finger or a hurried cursor can hit. The row sheds whole
        // controls (see `roomFor`) rather than shaving every one of them.
        'grid shrink-0 place-items-center rounded leading-none',
        // The docked strip is on ONE type step, the compact Send's 12px
        // (text-xs, Button sm): mode label, format glyphs and "/ commands"
        // drew 15px beside a 12px Send until 2.407.18. The typed text and the
        // inline command chips stay 15px — they are the message, not controls.
        docked ? 'h-9 w-9 text-xs' : 'h-7 w-7 text-sm',
        active ? 'bg-surface-hover text-text-primary' : cn(docked ? 'text-text-primary' : 'text-text-secondary', 'hover:bg-surface-hover'),
        inert && 'cursor-not-allowed bg-transparent text-text-disabled hover:bg-transparent',
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
      className={cn('min-w-0', className)}
    >
      <div
        data-testid={testId}
        // Suggestion menus keep their right edge inside this box (mountSuggestionMenu).
        data-suggestion-boundary={density}
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
        data-mode={modesEnabled ? activeMode : undefined}
        data-console={consoleSurface ? 'true' : undefined}
        data-composer-size={size}
        data-responsive={pane ? 'pane' : undefined}
        data-backdrop-tone={consoleSurface ? tone : undefined}
        data-console-sky={consoleSurface ? (skyInherited ? 'inherited' : 'own') : undefined}
        data-working={working ? 'true' : undefined}
        data-composer-readonly={readOnlyOn ? '' : undefined}
        data-presentation={quiet ? 'prompt' : undefined}
        ref={rootRef}
        data-density={density}
        data-collapsed={collapseWhenIdle ? (collapsed ? 'true' : 'false') : undefined}
        // The fold marker hosts select (2.515.4): `idle` on this row,
        // `explicit` on ContextComposer's collapse button. One attribute for
        // both folds, and not `data-composer-surface`, which marks the shelf
        // (a second one inside a shelf reads as a nested shelf).
        data-composer-fold={collapsed ? 'idle' : undefined}
        onFocusCapture={(event: ReactFocusEvent<HTMLDivElement>) => {
          if (blurTimer.current !== null) { clearTimeout(blurTimer.current); blurTimer.current = null; }
          setFocusWithin(true);
          if (collapseWhenIdle && inputBoxRef.current?.contains(event.target as Node)) setEngaged(true);
        }}
        onBlurCapture={(event: ReactFocusEvent<HTMLDivElement>) => {
          const next = event.relatedTarget as Node | null;
          if (next && event.currentTarget.contains(next)) return;
          // Not decided yet: focus may be moving into a menu this composer
          // opened (Deck actions, the `?` menu). Those render in a PORTAL —
          // outside this box in the DOM, inside it in React — so DOM
          // containment says "left" while React delivers the portal's focus
          // to onFocusCapture above, which cancels this. Deciding at once
          // collapsed the composer and unmounted the menu it had just opened
          // (live 2026-09-23: Deck actions → nothing).
          if (blurTimer.current !== null) clearTimeout(blurTimer.current);
          blurTimer.current = setTimeout(() => {
            blurTimer.current = null;
            setFocusWithin(false);
            setEngaged(false);
          }, 0);
        }}
        // Only CSS custom properties — the radius and the input's growth cap
        // are values the host chose, and the stylesheet reads them from here.
        {...(Object.keys(surfaceVars).length ? { style: surfaceVars as CSSProperties } : {})}
        // Agent and Terminal put the composer on the star field and flip the
        // chrome to the night palette — see `ChatColumnBackdrop` for why this
        // is two class hooks rather than a second set of classes on every row
        // inside. `isolate` so the backdrop's negative z stays local, and NO
        // `overflow-hidden` here: the send split-menu and the suggestion
        // popovers are children of this box and clipping them is a regression.
        {...(consoleSurface ? { 'data-theme': 'dark' } : {})}
        {...(referenceDrop ? {
          // Stops at the card: the attachment zone around it only takes files.
          onDragEnter: (event: ReactDragEvent<HTMLDivElement>) => {
            if (!acceptsReferenceDrag(event.dataTransfer)) return;
            event.preventDefault();
            event.stopPropagation();
            setReferenceDragDepth((n) => n + 1);
          },
          onDragOver: (event: ReactDragEvent<HTMLDivElement>) => {
            if (!acceptsReferenceDrag(event.dataTransfer)) return;
            event.preventDefault();
            event.stopPropagation();
            event.dataTransfer.dropEffect = 'copy';
          },
          onDragLeave: (event: ReactDragEvent<HTMLDivElement>) => {
            if (!acceptsReferenceDrag(event.dataTransfer)) return;
            event.stopPropagation();
            setReferenceDragDepth((n) => Math.max(0, n - 1));
          },
          onDrop: (event: ReactDragEvent<HTMLDivElement>) => {
            if (!acceptsReferenceDrag(event.dataTransfer)) return;
            event.preventDefault();
            event.stopPropagation();
            setReferenceDragDepth(0);
            referenceDrop.onDrop(event.dataTransfer);
          },
        } : {})}
        data-reference-drop={referenceDrop ? (referenceDragDepth > 0 ? 'over' : 'ready') : undefined}
        {...(modeShortcuts && switchable
          ? {
              // Capture phase: Option-digit must be taken before the editor
              // inserts the character it types (¡ ™ £ on a Mac layout).
              // `code`, not `key`, for the same reason — `key` is that
              // character, not the digit.
              onKeyDownCapture: (event: ReactKeyboardEvent<HTMLDivElement>) => {
                if (!event.altKey || event.ctrlKey || event.metaKey) return;
                const index = ['Digit1', 'Digit2', 'Digit3'].indexOf(event.code);
                if (index < 0 || index >= offeredModes.length) return;
                event.preventDefault();
                event.stopPropagation();
                requestMode(offeredModes[index]!);
              },
            }
          : {})}
        className={cn(
          // `min-w-0 w-full max-w-full`: fills whatever it was given and never
          // pushes past it. Radius and shadow read the composer's own tokens
          // (see `.uic-composer` in styles.css), not the host's.
          'uic-composer chat-composer relative isolate w-full min-w-0 max-w-full rounded-[var(--composer-radius,12px)] border bg-surface shadow-[var(--composer-shadow,var(--uic-composer-shadow))] transition-colors duration-300 focus-within:ring-2 motion-reduce:transition-none',
          consoleSurface && 'uic-chat-console',
          // The enclosing column's field shows through; a light inset tint
          // keeps the composer reading as a control on it, not a hole in it.
          skyInherited && 'bg-surface-inset',
          activeCommand
            ? (activeCommand.disabled ? 'border-warning focus-within:border-warning focus-within:ring-warning' : 'border-info focus-within:border-info focus-within:ring-info')
            : 'border-border focus-within:border-primary focus-within:ring-primary',
          // The editor dock's card keeps a 1px edge that tints toward the
          // primary while it is in use, rather than a 2px ring (the mockup).
          docked && 'rounded-lg focus-within:ring-0',
          // The pane mode marks focus with the 1px border alone.
          pane && 'focus-within:ring-0',
          docked && !activeCommand?.disabled && (activeCommand ? 'border-primary/25 focus-within:border-primary/35' : 'focus-within:border-primary/35'),
          referenceDragDepth > 0 && 'border-primary bg-primary-bg ring-2 ring-primary/40',
        )}
      >
        {referenceDragDepth > 0 && (
          <span
            role="status"
            data-testid={`${testId}-drop-hint`}
            className="pointer-events-none absolute right-3 top-2 z-10 rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-on-primary shadow-sm"
          >
            {referenceDrop?.hint ?? 'Drop to add'}
          </span>
        )}
        {/* The console surface itself. Rounded and clipped on its own element
            so the corners match the border above without clipping anything
            that has to escape the box. */}
        <ParticlesBackground
          active={ownSky}
          tone={tone === 'graphite' ? 'graphite' : 'night'}
          particleCount={working ? 180 : 120}
          density={CONSOLE_DENSITY}
          speed={working ? 0.15 : 0.09}
          alphaParticles
          particleColors={tone === 'graphite' ? GRAPHITE_PARTICLE_COLORS : AGENT_PARTICLE_COLORS}
          particleBaseSize={(tone === 'graphite' ? 80 : 90) + (working ? 15 : 0)}
          fallbackIntensity={working ? 'medium' : 'low'}
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
          data-testid={`${testId}-console`}
        />
        {header != null && header !== false && (
          <div className="min-w-0" data-composer-header="" data-testid={`${testId}-header`}>
            <ComposerPresentationContext.Provider value={presentation}>{header}</ComposerPresentationContext.Provider>
          </div>
        )}
        {sendError && (
          <p role="alert" data-testid={`${testId}-send-error`} className="px-2 py-1 text-sm text-danger-fg">
            {typeof sendError === 'string'
              ? `${/[.!?]$/.test(sendError) ? sendError : `${sendError}.`} Your draft and attachments are saved.`
              : 'Unable to send. Your draft and attachments are saved. Try again.'}
          </p>
        )}
        {activeCommand && !menuModeRow && (
          <div
            role="status"
            title={activeCommand.description ?? activeCommand.hint ?? activeCommand.label}
            data-testid={`${testId}-command`}
            className={cn(
              'flex items-center gap-1.5 rounded-t-[calc(var(--composer-radius,12px)-1px)] px-2 py-1 text-[11px]',
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
        {onPrivacyChange && privacy === 'hidden' && (
          // Same shape as the command bar above: `role="status"`, a tone
          // background standing in for the top border, flush against
          // `EditorContent`. Neutral rather than warning/info — this is a
          // quiet reminder of a choice the sender made, not something wrong.
          <div
            role="status"
            data-testid={`${testId}-privacy-hint`}
            className={cn(
              'flex items-center gap-1.5 bg-neutral-bg px-2 py-1 text-[11px] text-neutral-fg',
              // Only actually the top edge when the command bar is not also
              // showing above it.
              !sendError && !activeCommand && 'rounded-t-[calc(var(--composer-radius,12px)-1px)]',
            )}
          >
            <EyeOffIcon size={13} />
            <span>Only you can see this</span>
          </div>
        )}
        {/* Above the words, because a reference is part of what is about to
            be said rather than a control for saying it. */}
        {!referencesInModeRow && !collapsed && !pane && <ComposerReferences
          references={references ?? []}
          {...(onRemoveReference ? { onRemove: onRemoveReference } : {})}
          removeLabel={(reference) => `Remove ${reference.label} from this draft`}
          data-testid={`${testId}-references`}
        />}

        {/* What is already running, above what you are about to say. One row,
            no controls: this is a reminder, not a dashboard. */}
        {!!processes?.length && (
          <div
            role="status"
            data-testid={`${testId}-processes`}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 px-2 pt-1 text-[11px] text-text-secondary"
          >
            {processes.map((process, index) => (
              <span key={process.id} className="flex min-w-0 items-center gap-1.5">
                {index > 0 && <span aria-hidden="true" className="text-text-tertiary">·</span>}
                <span aria-hidden="true" className={cn('inline-block h-1.5 w-1.5 shrink-0 rounded-full', PROCESS_DOT[process.tone])} />
                <span className="min-w-0 truncate">{process.label}</span>
              </span>
            ))}
          </div>
        )}

        {status && (
          <div
            role="status"
            data-testid={status['data-testid'] ?? `${testId}-status`}
            data-tone={status.tone ?? 'info'}
            className={cn('flex min-w-0 items-center gap-1.5 px-2 pt-1 text-[11px] text-text-secondary', reveal)}
          >
            <span aria-hidden="true" className={cn('inline-block h-1.5 w-1.5 shrink-0 rounded-full', STATUS_DOT[status.tone ?? 'info'])} />
            <span className="min-w-0 flex-1 truncate" title={status.text}>{status.text}</span>
            {status.action && (
              <button
                data-ui-part=""
                type="button"
                onClick={status.action.onSelect}
                data-testid={status.action['data-testid'] ?? `${testId}-status-action`}
                className="-my-1 inline-flex min-h-6 shrink-0 cursor-pointer items-center rounded border-none bg-transparent px-1.5 text-xs font-semibold text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {status.action.label}
              </button>
            )}
            {status.onDismiss && (
              <button
                data-ui-part=""
                type="button"
                aria-label="Dismiss"
                onClick={status.onDismiss}
                data-testid={`${testId}-status-dismiss`}
                // 24 × 24 target (it was 16 × 12 and a live click beside it
                // read as "× does nothing"); -my-1 keeps the row's height.
                className="-my-1 inline-flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded border-none bg-transparent text-[13px] leading-none text-text-tertiary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* The mode switch. Its own row rather than a control in the toolbar:
            it changes what Enter DOES, which is not a formatting choice. */}
        {/* Narrow always takes the compact pill: three segmented tabs with
            labels do not fit beside anything at that width. */}
        {headerRow && !collapsed && !pane && (
          <div className={cn('flex min-w-0 items-center gap-1.5 text-xs', docked ? 'px-3 pt-2' : 'px-2 pt-1', compact && !quiet && 'flex-wrap', quiet && 'min-h-8 flex-nowrap', reveal)} data-testid={`${testId}-modes`} data-mode-control={quiet ? 'none' : menuModeRow ? 'menu' : 'compact'} data-ui-composer-modes={docked ? 'docked' : 'compact'}>
            {(docked || quiet) && modeRowStart != null && (
              <span className="flex shrink-0 items-center" data-testid={`${testId}-mode-row-start`}>{modeRowStart}</span>
            )}
            {quiet ? null : singleMode ? (
              // One mode: its name, not a one-item switch.
              <span
                className={cn('flex items-center gap-1.5 px-1.5 py-0.5 text-text-primary', basicBox ? 'gap-2 font-medium' : 'font-semibold', docked ? 'text-xs' : 'text-sm')}
                data-testid={`${testId}-mode-pill`}
                data-single-mode="true"
              >
                {!basicBox && <span aria-hidden="true" className={cn('flex justify-center text-primary', docked ? 'w-5' : 'w-4')}>{docked && activeMode === 'agent' ? <SparkleIcon size={18} /> : MODE_ICON[activeMode]}</span>}
                <span data-testid={`${testId}-mode-label`}>{MODE_NAMES[activeMode]}</span>
              </span>
            ) : menuModeRow ? (hideModeMenu && docked ? null : (
              // One control: the mode's glyph and name, a ▾, the other modes
              // in a menu with their shortcuts and, when off, the reason.
              // The current mode's `⌥n` (2.377.0) shows only while the control
              // is hovered or holds focus: a standing badge beside "Chat ▾"
              // read as a stray element (2.407.41). The menu rows keep theirs.
              <span className="group/modemenu flex min-w-0 items-center gap-1.5" data-testid={`${testId}-mode-control`}>
              <DropdownMenu
                trigger={(
                  <span className={cn('flex items-center gap-1.5 text-text-primary', basicBox ? 'gap-2 font-medium' : 'font-semibold', docked ? 'text-xs' : 'text-sm')} data-testid={`${testId}-mode-label`}>
                    {!basicBox && <span aria-hidden="true" className={cn('flex justify-center text-primary', docked ? 'w-5' : 'w-4')}>{docked && activeMode === 'agent' ? <SparkleIcon size={18} /> : MODE_ICON[activeMode]}</span>}
                    {MODE_NAMES[activeMode]}
                    {docked
                      ? <ChevronIcon size={14} aria-hidden="true" className="text-text-secondary" />
                      : <span aria-hidden="true" className="text-[11px] leading-none text-text-tertiary">▾</span>}
                  </span>
                )}
                triggerLabel={`Composer mode: ${MODE_NAMES[activeMode]}`}
                triggerTitle="Composer mode"
                triggerTestId={`${testId}-mode-menu`}
                disabled={modeMenuOff}
                {...(modeMenuWayOut ? { triggerAttributes: modeMenuWayOut } : {})}
                data-testid={`${testId}-mode-menu-list`}
                align="start"
                triggerClassName={basicBox ? 'h-8 rounded-md border border-border bg-surface px-3 hover:bg-surface-hover' : 'rounded-md border-0 bg-transparent hover:bg-surface-hover'}
                sections={[{
                  items: offeredModes.map((m, i) => {
                    const unavailable = isModeDisabled(m);
                    const reason = unavailable ? modeUnavailableReasons?.[m] : undefined;
                    return {
                      label: MODE_NAMES[m],
                      icon: docked && m === 'agent' ? <SparkleIcon size={13} /> : MODE_ICON[m],
                      active: m === activeMode,
                      ...(reason ? { description: reason } : {}),
                      ...(modeShortcuts ? { trailing: <kbd className="rounded border border-border bg-surface-inset px-1 font-mono text-[10px] text-text-secondary">⌥{i + 1}</kbd> } : {}),
                      onSelect: () => { requestMode(m); },
                    };
                  }),
                }, ...dockedMenuSections]}
              />
              {modeShortcuts && !narrow && (
                <kbd
                  className={cn('hidden bg-surface-inset font-mono text-text-secondary group-hover/modemenu:inline-block group-focus-within/modemenu:inline-block', docked ? 'rounded-md px-1.5 py-0.5 text-xs' : 'rounded border border-border px-1 py-0.5 text-[11px]')}
                  data-testid={`${testId}-mode-kbd`}
                  data-reveal="hover-focus"
                >
                  ⌥{offeredModes.indexOf(activeMode) + 1}
                </kbd>
              )}
              </span>
            )) : (
            <span className="flex items-center gap-1 font-semibold text-text-primary" data-testid={`${testId}-mode-label`}>
              <span aria-hidden="true" className="flex w-4 justify-center text-text-secondary">{MODE_ICON[activeMode]}</span>
              {MODE_NAMES[activeMode]}
            </span>
            )}
            {!menuModeRow && !singleMode && !quiet && (
            <span role="group" aria-label="Composer mode" className="flex items-center gap-0.5">
              {offeredModes.map((m, i) => {
                const unavailable = isModeDisabled(m);
                const reason = unavailable ? modeUnavailableReasons?.[m] : undefined;
                return (
                  <IconButton
                    key={m}
                    size="sm"
                    aria-label={MODE_NAMES[m]}
                    aria-pressed={m === activeMode}
                    aria-keyshortcuts={modeShortcuts ? `Alt+${i + 1}` : undefined}
                    title={`${MODE_NAMES[m]}${modeShortcuts ? ` (⌥${i + 1})` : ''}${reason ? ` — ${reason}` : ''}`}
                    disabled={unavailable || blocked}
                    onClick={() => requestMode(m)}
                    data-testid={`${testId}-mode-${m}`}
                    className={cn(
                      'h-5 w-5 text-xs font-semibold tabular-nums',
                      m === activeMode ? 'bg-info-bg text-info-fg hover:bg-info-bg' : 'text-text-tertiary',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    )}
                  >
                    {i + 1}
                  </IconButton>
                );
              })}
            </span>
            )}
            {modeShortcuts && !narrow && !singleMode && !menuModeRow && !quiet && (
              <kbd className="rounded border border-border bg-surface-inset px-1 font-mono text-[10px] text-text-secondary" data-testid={`${testId}-mode-kbd`}>
                ⌥{offeredModes.indexOf(activeMode) + 1}
              </kbd>
            )}
            {referencesInModeRow && !!references?.length && (
              <ComposerReferences
                references={references}
                {...(onRemoveReference ? { onRemove: onRemoveReference } : {})}
                removeLabel={(reference) => `Remove ${reference.label} from this draft`}
                className={cn('min-w-0 p-0', quiet ? 'flex-nowrap overflow-hidden' : docked && hideModeMenu ? 'flex-wrap gap-2' : 'flex-nowrap', !quiet && menuModeRow && !(docked && hideModeMenu) && referencesPlacement !== 'start' && 'ml-auto justify-end', !quiet && referencesPlacement === 'start' && menuModeRow && 'ml-1')}
                {...(menuModeRow || quiet ? { size: docked ? 'md' as const : 'sm' as const } : {})}
                data-testid={`${testId}-references`}
              />
            )}
            {(docked || quiet) && referencesAction != null && (
              <span className="flex shrink-0 items-center" data-testid={`${testId}-references-action`}>{referencesAction}</span>
            )}
            {modeRowEnd != null && <span className={cn('flex shrink-0 items-center', !quiet && menuModeRow && references?.length && !(docked && hideModeMenu) ? 'ml-2' : 'ml-auto')} data-testid={`${testId}-mode-row-end`}>{modeRowEnd}</span>}
          </div>
        )}
        {activeCommand && menuModeRow && !docked && !collapsed && (
          // The docked card (modeControl="menu") names the command as a chip
          // on its own line — "/workflow ⟡ migration-plan" — the way the
          // context chip names what the draft is about, rather than a tinted
          // strip across the card's top edge. Same `role="status"` and test
          // id as the strip; the picked argument (its icon and label) replaces
          // the command's own label once there is one. Since 2.385.0.
          <div className="flex min-w-0 px-2 pt-2">
            <div
              role="status"
              title={activeCommand.description ?? activeCommand.hint ?? activeCommand.label}
              data-testid={`${testId}-command`}
              data-command-chip="true"
              className={cn(
                'inline-flex min-w-0 max-w-full items-center gap-1.5 rounded-md px-2 py-0.5 text-[12px]',
                activeCommand.disabled ? 'bg-warning-bg text-warning-fg' : 'bg-info-bg text-info-fg',
              )}
            >
              {activeCommand.icon && <span className="flex shrink-0 items-center" aria-hidden="true">{activeCommand.icon}</span>}
              <span className="font-mono">{activeCommand.trigger}</span>
              {pickedArgument ? (
                <span className="flex min-w-0 items-center gap-1 font-medium" data-testid={`${testId}-command-argument`}>
                  {pickedArgument.icon && <span className="flex shrink-0 items-center" aria-hidden="true">{pickedArgument.icon}</span>}
                  <span className="min-w-0 truncate">{pickedArgument.label}</span>
                </span>
              ) : argumentEmpty && activeCommand.argument?.placeholder ? (
                <span data-testid={`${testId}-command-placeholder`} className="min-w-0 truncate italic opacity-80">
                  {activeCommand.argument.placeholder}
                </span>
              ) : (
                <span className="min-w-0 truncate font-medium">{activeCommand.label}</span>
              )}
            </div>
          </div>
        )}
        {modesEnabled && !fixedMode && !compactModeRow && !collapsed && !pane && (
          <div className={cn('flex items-center gap-2 px-2 pt-1.5', reveal)} data-testid={`${testId}-modes`}>
            {/* Lit while it is not on Chat: the control that changed what Enter
                does should be the one thing on the surface that glows. */}
            <div className={cn('rounded-md transition-shadow duration-300 motion-reduce:transition-none', consoleSurface && 'ring-1 ring-primary/60')}>
            <Tabs
              items={[
                { id: 'chat' as const, label: 'Chat', icon: <ChatIcon size={13} /> },
                { id: 'agent' as const, label: 'Agent', icon: <PuzzleIcon size={13} /> },
                { id: 'terminal' as const, label: 'Terminal', icon: <span aria-hidden="true" className="font-mono text-[11px]">{'>_'}</span> },
              ].filter((item) => offeredModes.includes(item.id))}
              value={activeMode}
              onValueChange={(id) => onModeChange?.(id as ComposerMode)}
              variant="segmented"
              size="sm"
              aria-label="Composer mode"
              idPrefix={`${testId}-mode`}
            />
            </div>
          </div>
        )}

        {modeNotice && (
          <p role="status" className="m-0 px-2 pt-1 text-[11px] text-warning-fg" data-testid={`${testId}-mode-notice`}>
            {modeNotice}
          </p>
        )}

        {/* The editor stays MOUNTED in terminal mode, hidden rather than torn
            down: unmounting it would destroy the half-written message someone
            switched away from, which is the bug the `useEditor` deps note above
            exists to stop recurring. */}
        {/* ABOVE the input, not below it: the dock is pinned at the bottom
            and grows upward, so the row appearing on focus moves the rows
            above it and leaves the input (and the pointer that just pressed
            it) where they were. Below the input, the chips slid in under
            that pointer and its click ran one (live, 2026-09-23). */}
        {showSuggestionRow && (
          <div className={cn('flex flex-wrap items-center gap-1 px-2 pt-1', reveal)} data-testid={`${testId}-suggestions`}>
            {suggestions!.map((suggestion) => (
              <button
                data-ui-part=""
                key={suggestion}
                type="button"
                // Keep focus in the composer: a mousedown that blurred the
                // input would hide this row before the click landed.
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onSuggestion?.(suggestion)}
                data-ui-chip="suggestion"
                className="cursor-pointer rounded-full border border-border bg-surface px-2 py-0.5 text-xs leading-4 text-text-secondary hover:border-border-emphasis hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        {/* The body. Block flow at every size but one: NARROW with the
            toolbar folded, where it wraps so the input and the action cluster
            share a single row (attachments drop below via `order-last`). The
            editor stays in the same parent at every size — moving it would
            remount EditorContent and drop the caret on a resize. */}
        {/* The idle row (`collapsed`) is ONE centred line: pill, references,
            the input's own text box and the Send cluster are each centred on
            the row, whatever their heights. It used to share the narrow row's
            `items-end` with per-child bottom offsets (`mb-1.5 self-end`) tuned
            for the 2rem single-row input; in the docked card
            `.uic-composer-docked-input` (a 2.5rem box, 0.5rem padding) wins
            that cascade, so the placeholder's centre sat 4px above the pill's
            and 2px above Send's (2.407.0 onwards; 2.407.8/2.407.9 moved Send,
            not the text). The narrow row (a draft that grows) keeps
            `items-end`, so Send stays beside the last line.
            Pinned by ContextComposerIdleRow.test.tsx and the Storybook check
            tests/storybook/composer-idle-row.spec.ts. */}
        <div className={cn(singleRow && 'uic-composer-single-row flex flex-wrap', collapsed ? 'items-center' : singleRow && 'items-end')} data-testid={`${testId}-body`} data-idle-row={collapsed || undefined}>
        {/* The placeholder is ONE ellipsised line (styles.css) — a long one,
            such as a disabled reason, used to wrap past the input and draw over
            the rows below. The whole text stays reachable as a tooltip while
            the box is empty. */}
        {collapsed && !pane && modeRowStart != null && (
          // The host's row-start content (a "Chat" label, its own mode select)
          // is drawn on the idle row too, not only once the card expands.
          <span className="ml-1.5 flex shrink-0 items-center" data-testid={`${testId}-mode-row-start`}>{modeRowStart}</span>
        )}
        {collapsed && !chipRow && singleMode && !quiet && (
          // One mode: the same pill, as a label — nothing to switch to.
          <span
            title={MODE_NAMES[activeMode]}
            data-testid={`${testId}-mode-pill`}
            data-single-mode="true"
            className="ml-1.5 flex shrink-0 items-center gap-1 rounded-full bg-surface-inset px-2 py-0.5 text-xs font-semibold text-text-secondary"
          >
            <span aria-hidden="true" className="flex w-4 justify-center">{MODE_ICON[activeMode]}</span>
            {MODE_NAMES[activeMode]}
          </span>
        )}
        {collapsed && !chipRow && modesEnabled && !fixedMode && !singleMode && !quiet && (
          // The idle row's mode pill: which mode Enter is in, at a glance.
          // Pressing it puts the caret in the input (the full composer, mode
          // switch included, comes back) — on click, after the pointer is up.
          <button
            data-ui-part=""
            type="button"
            onClick={() => editor?.commands.focus()}
            title={`${MODE_NAMES[activeMode]} — click to write`}
            data-testid={`${testId}-mode-pill`}
            className="ml-1.5 flex shrink-0 items-center gap-1 rounded-full bg-surface-inset px-2 py-0.5 text-xs font-semibold text-text-secondary hover:text-text-primary"
          >
            <span aria-hidden="true" className="flex w-4 justify-center">{MODE_ICON[activeMode]}</span>
            {MODE_NAMES[activeMode]}
          </button>
        )}
        {chipRow && (chipModes || !!references?.length) && (
          // The pane's context chip: mode · subject on ONE line. The subject
          // keeps both ends ("Org › Initi…on Platform") so the leaf survives.
          // Its width leaves the input ~10em and Send (2.447.0). Folded (the
          // narrow idle row) it is the mode alone; the subject is in its
          // tooltip and its menu.
          <span
            data-testid={`${testId}-context-chip`}
            data-folded={foldedChip || undefined}
            title={[chipModes ? MODE_NAMES[activeMode] : null, ...(references ?? []).map((r) => r.title ?? r.label)].filter(Boolean).join(' · ')}
            className="group/chip ml-1.5 flex min-w-0 max-w-[min(45%,calc(100%-14rem))] shrink items-center gap-1 self-center whitespace-nowrap rounded-full bg-surface-inset px-2 py-0.5 text-xs text-text-secondary"
          >
            {chipModes && (switchable && offeredModes.length > 1 ? (
              <DropdownMenu
                trigger={<span className="flex items-center gap-1 font-semibold text-text-primary" data-testid={`${testId}-mode-label`}><span aria-hidden="true" className="flex w-3.5 justify-center">{MODE_ICON[activeMode]}</span>{MODE_NAMES[activeMode]}</span>}
                triggerLabel={`Composer mode: ${MODE_NAMES[activeMode]}`}
                triggerTitle="Composer mode"
                triggerTestId={`${testId}-mode-menu`}
                disabled={modeMenuOff}
                {...(modeMenuWayOut ? { triggerAttributes: modeMenuWayOut } : {})}
                data-testid={`${testId}-mode-menu-list`}
                align="start"
                triggerClassName="h-auto shrink-0 rounded border-0 bg-transparent p-0 text-xs leading-4 hover:bg-transparent"
                sections={[{
                  items: offeredModes.map((m) => {
                    const reason = isModeDisabled(m) ? modeUnavailableReasons?.[m] : undefined;
                    return { label: MODE_NAMES[m], icon: MODE_ICON[m], active: m === activeMode, ...(reason ? { description: reason } : {}), onSelect: () => { requestMode(m); } };
                  }),
                }, ...(foldedChip && references?.length ? [{
                  // Folded: what the draft is about, and the way to drop it.
                  label: 'About',
                  items: references.flatMap((r) => [
                    { label: r.label, ...(r.title && r.title !== r.label ? { description: r.title } : {}) },
                    ...(onRemoveReference ? [{ label: `Remove ${r.label}`, onSelect: () => onRemoveReference(r.id) }] : []),
                  ]),
                }] : [])]}
              />
            ) : (
              <span className="flex shrink-0 items-center gap-1 font-semibold text-text-primary" data-testid={`${testId}-mode-label`}>
                <span aria-hidden="true" className="flex w-3.5 justify-center">{MODE_ICON[activeMode]}</span>{MODE_NAMES[activeMode]}
              </span>
            ))}
            {!!references?.length && !(foldedChip && chipModes) && (() => {
              const label = references[0]!.label;
              const tail = label.length > 18 ? label.slice(-12) : '';
              return (
                <>
                  {chipModes && <span aria-hidden="true" className="shrink-0 text-text-tertiary">·</span>}
                  <span className="flex min-w-0 items-center" data-testid={`${testId}-context-label`}>
                    <span className="min-w-0 truncate">{tail ? label.slice(0, -12) : label}</span>
                    {tail && <span className="shrink-0">{tail}</span>}
                  </span>
                  {references.length > 1 && <span className="shrink-0 text-text-tertiary">+{references.length - 1}</span>}
                  {onRemoveReference && (
                    <button
                      data-ui-part=""
                      type="button"
                      aria-label={`Remove ${label} from this draft`}
                      onClick={() => onRemoveReference(references[0]!.id)}
                      data-testid={`${testId}-context-remove`}
                      className="-mr-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border-0 bg-transparent p-0 text-xs leading-none text-text-tertiary opacity-0 hover:text-text-primary focus:opacity-100 group-hover/chip:opacity-100"
                    >
                      ×
                    </button>
                  )}
                </>
              );
            })()}
          </span>
        )}
        {collapsed && !chipRow && !!references?.length && (
          // What the draft is ABOUT is part of the draft, idle or not: a
          // reference added from elsewhere ("Reference in chat") must be
          // visible before anyone focuses the box. In the idle row, beside the
          // pill — one line, truncated, the row's height unchanged.
          <ComposerReferences
            references={references}
            {...(onRemoveReference ? { onRemove: onRemoveReference } : {})}
            removeLabel={(reference) => `Remove ${reference.label} from this draft`}
            className="ml-1.5 min-w-0 max-w-[min(45%,calc(100%-18rem))] shrink flex-nowrap overflow-hidden p-0"
            data-testid={`${testId}-references`}
          />
        )}
        {/* The line the draft is written on. In the editor dock the picked
            command sits at its START, as a chip, with the instruction running
            on after it ("/workflow presentation-deck  Create a short…"); the
            command's own line in the editor is hidden. Everywhere else this
            wrapper is `contents` — no box, so the body's layout is unchanged —
            and it is always rendered, so the editor never changes parent. */}
        <div className={inlineCommand || chipCommand ? 'flex min-w-0 items-start' : 'contents'} data-testid={`${testId}-input-line`}>
          {chipCommand && (
            <DropdownMenu
              trigger={(
                <span className="inline-flex items-center gap-1.5" data-testid={`${testId}-command`} data-command-chip="inline" title={chipCommand.description ?? chipCommand.hint ?? chipCommand.label}>
                  {chipCommand.icon && <span className="flex shrink-0 items-center" aria-hidden="true">{chipCommand.icon}</span>}
                  <span>{chipCommand.trigger}</span>
                  <ChevronIcon size={14} aria-hidden="true" />
                </span>
              )}
              triggerLabel={`Command: ${chipCommand.trigger}. Change command`}
              triggerTestId={`${testId}-command-switch`}
              data-testid={`${testId}-command-menu`}
              align="start"
              triggerClassName={cn(
                'mt-1 ml-3 h-7 shrink-0 rounded-md border px-2 text-[15px] leading-6',
                chipCommand.disabled ? 'border-warning bg-warning-bg text-warning-fg' : 'border-primary/60 bg-info-bg text-info-fg hover:bg-info-bg',
              )}
              sections={[{
                label: 'Commands',
                items: (commands ?? []).map((c) => ({
                  label: c.trigger,
                  description: c.hint ?? c.label,
                  ...(c.icon ? { icon: c.icon } : {}),
                  active: c.trigger === chipCommand.trigger,
                  ...(c.disabled ? {} : { onSelect: () => switchCommand(c) }),
                })),
              }]}
            />
          )}
          {inlineCommand && activeCommand && !promptCard && prefixHidden && (
            <div
              role="status"
              title={activeCommand.description ?? activeCommand.hint ?? activeCommand.label}
              data-testid={`${testId}-command`}
              data-command-chip="inline"
              className={cn(
                'mt-1.5 ml-3 inline-flex min-w-0 max-w-[50%] shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-[15px] leading-6',
                activeCommand.disabled ? 'bg-warning-bg text-warning-fg' : 'bg-info-bg text-info-fg',
              )}
            >
              {/* The trigger and the picked argument — what the input hides —
                  never the command's label: beside the instruction it reads as
                  words the person wrote. The label stays in the title. */}
              <span>{activeCommand.trigger}</span>
              {pickedArgument ? (
                <span className="min-w-0 truncate" data-testid={`${testId}-command-argument`}>{pickedArgument.label}</span>
              ) : argumentEmpty && activeCommand.argument?.placeholder ? (
                <span data-testid={`${testId}-command-placeholder`} className="min-w-0 truncate italic opacity-80">
                  {activeCommand.argument.placeholder}
                </span>
              ) : null}
            </div>
          )}
        <div
          ref={inputBoxRef}
          className={cn(
            (singleRow || inlineCommand || chipCommand) && 'min-w-0 flex-1',
            // The pane row keeps room to write: under ~6rem the toolbar wraps below, not the text.
            pane && 'min-w-[6rem]',
            docked && 'uic-composer-docked-input',
            basicBox && !singleRow && 'mx-3 mt-2 min-h-[58px] rounded-md border border-border bg-surface',
          )}
          data-basic-well={basicBox || undefined}
          data-testid={`${testId}-input-box`}
          {...(readOnlyOn ? (typeof readOnlyNote === 'string' ? { title: readOnlyNote } : {}) : empty && effectivePlaceholder ? { title: effectivePlaceholder } : {})}
          {...(terminalMode ? { hidden: true } : {})}
        >
          {readOnlyOn && (
            // In the placeholder's place, in muted ink: the editor says it
            // takes no words rather than inviting them (2.450.0).
            <p
              id={`${testId}-readonly-note`}
              className={cn('m-0 flex min-w-0 items-start gap-1.5 text-text-tertiary', docked ? 'px-3 py-2 text-xs' : 'px-2 py-1.5 text-xs')}
              data-composer-readonly-note=""
              data-testid={`${testId}-readonly-note`}
            >
              <LockIcon size={12} aria-hidden="true" className="mt-0.5 shrink-0" />
              <span className="min-w-0">{readOnlyNote}</span>
            </p>
          )}
          <EditorContent editor={editor} className={readOnlyOn ? 'cursor-not-allowed opacity-60' : undefined} />
        </div>
        </div>

        {terminalMode && (
          <div className={cn('flex items-center gap-2 px-2 py-2', singleRow && 'min-w-0 flex-1')} data-testid={`${testId}-shell`}>
            <span aria-hidden="true" className="shrink-0 font-mono text-xs text-text-tertiary">$</span>
            <input
              data-ui-part=""
              ref={shellInputRef}
              type="text"
              value={shellDraft}
              disabled={blocked}
              placeholder={effectivePlaceholder}
              aria-label={effectivePlaceholder}
              data-testid={`${testId}-shell-input`}
              onChange={(event) => { setShellDraft(event.target.value); setHistoryIndex(-1); }}
              onKeyDown={(event) => {
                // A shell's keymap, because this looks like a shell: Enter
                // runs, ↑/↓ walk what was run before. Both are prevented so
                // the caret does not also jump to the end of the line.
                if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submitShell(); return; }
                if (event.key === 'ArrowUp') { event.preventDefault(); recallHistory(1); return; }
                if (event.key === 'ArrowDown') { event.preventDefault(); recallHistory(-1); }
              }}
              className="min-w-0 flex-1 border-none bg-transparent font-mono text-xs text-text-primary outline-none placeholder:text-text-tertiary disabled:cursor-not-allowed disabled:text-text-tertiary"
            />
          </div>
        )}

        {/* Why Send is off (2.515.6): the hint row's one line that every
            density draws, the idle single row included (it wraps under the
            row there), because a dead Send with no word is the defect. */}
        {submitBlockedBy && (
          <Text as="p" size="xs" tone="tertiary" id={submitReasonId} title={submitBlockedBy}
            className={cn('min-w-0 px-2 pb-1', singleRow && 'order-last basis-full')}
            data-testid={`${testId}-submit-reason`}>
            <span className="truncate">{submitBlockedBy}</span>
          </Text>
        )}
        {/* Wide only. Narrower, the same hints are the `?` menu in the toolbar row. */}
        {hintsInRow && !!resolvedHints.length && !collapsed && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-2 pb-1 text-[11px] text-text-tertiary" data-testid={`${testId}-hints`}>
            {resolvedHints.map((hint) => {
              const key = <kbd className="rounded border border-border bg-surface-inset px-1 font-mono text-[10px] text-text-secondary">{hint.key}</kbd>;
              if (!hint.onSelect) return <span key={hint.key} className="flex items-center gap-1">{key}{hint.label}</span>;
              return (
                <button
                  data-ui-part=""
                  key={hint.key}
                  type="button"
                  onClick={hint.onSelect}
                  className="flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-[11px] text-text-tertiary hover:text-text-primary"
                >
                  {key}{hint.label}
                </button>
              );
            })}
          </div>
        )}

        <div className={cn(singleRow && 'order-last basis-full')}>
          <ComposerAttachments
            files={staged}
            disabled={blocked}
            onRemove={(id) => replaceStaged(stagedRef.current.filter((s) => s.id !== id))}
          />
        </div>

        <div
          className={cn(
            'flex min-w-0 items-center',
            docked ? 'px-2 py-1.5' : 'px-1.5 py-1',
            // The quiet box draws no rule over a strip that holds only Send.
            singleRow ? 'shrink-0' : basicBox || (quiet && promptToolbar && !promptStrip) ? 'pt-1' : 'border-t border-border',
            // Wrapped under the input (focus brought Aa / ? back), the cluster stays at the right.
            pane && 'ml-auto',
            narrow && !singleRow && 'flex-wrap gap-y-1',
            !singleRow && reveal,
          )}
          data-ui-composer-tools={docked ? 'docked' : 'compact'}
          data-testid={`${testId}-toolbar`}
        >
          {(narrow || pane) && !collapsed && (!pane || paneTools) && (!promptToolbar || promptStrip) && toolbarButton(
            promptToolbar
              ? (formatOpen ? 'Hide tools' : 'Show tools')
              : (formatOpen ? 'Hide formatting' : 'Show formatting'),
            formatOpen,
            () => setFormatOpen((v) => !v),
            <span className="text-xs font-semibold">Aa</span>,
            undefined,
            `${testId}-format-toggle`,
          )}
          {/* ONE tab stop for the whole bar, not one per control. Measured
              before: 14 stops between entering this composer and leaving it,
              11 of them Bold/Italic/Quote and friends — on every chat surface
              in the product, the embedded ones included. Send stays outside
              the group: it is the primary action, not a formatting control,
              and people reach for it with Tab. */}
          {/* `min-w-0` is the load-bearing half: without it a flex child will
              not shrink below its content, which is how the buttons pushed
              Send out of the composer entirely. */}
          {!singleRow && promptCard && (
          <RovingToolbar label="Prompt tools" className="min-w-0 gap-2" data-testid={`${testId}-prompt-toolbar`}>
            {!!commands?.length && (
              <DropdownMenu
                key="commands"
                trigger={<span className="inline-flex items-center gap-1.5"><span aria-hidden="true" className="text-primary">/</span>Commands</span>}
                triggerLabel="Commands"
                triggerTestId={`${testId}-commands-button`}
                data-testid={`${testId}-commands-menu`}
                align="start"
                triggerClassName={cn('h-7 rounded-md border border-border bg-surface-inset px-2.5 text-xs text-text-secondary hover:bg-surface-hover hover:text-text-primary', BUTTON_WEIGHT)}
                sections={[{
                  label: 'Commands',
                  items: commands.map((c) => ({
                    label: c.trigger,
                    description: c.hint ?? c.label,
                    ...(c.icon ? { icon: c.icon } : {}),
                    active: c.trigger === chipCommand?.trigger,
                    ...(c.disabled ? {} : { onSelect: () => switchCommand(c) }),
                  })),
                }]}
              />
            )}
            {hasSearchDocuments && (
              <button
                data-ui-part=""
                key="context"
                type="button"
                onClick={startContext}
                disabled={blocked}
                data-testid={`${testId}-context-button`}
                className={cn('inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-surface-inset px-2.5 text-xs text-text-secondary hover:bg-surface-hover hover:text-text-primary disabled:opacity-40', BUTTON_WEIGHT)}
              >
                <span aria-hidden="true" className="text-primary">#</span>Context
              </button>
            )}
          </RovingToolbar>
          )}
          {!singleRow && promptCard && (
            <span className="ml-auto flex shrink-0 items-center gap-3 pr-2 text-text-secondary" data-testid={`${testId}-prompt-end`}>
              {toolbarExtras}
              <span className="select-none whitespace-nowrap text-xs" data-testid={`${testId}-send-hint`}>
                {sendShortcut === 'mod-enter' ? '⌘ Return to send' : 'Return to send'}
              </span>
            </span>
          )}
          {!singleRow && !promptCard && (
          <RovingToolbar label="Message formatting" className={cn('min-w-0 gap-0.5', narrow && 'flex-wrap')} data-testid={`${testId}-format-toolbar`}>
          {editor && !promptToolbar && [
            toolbarButton('Bold', editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), <b>B</b>),
            toolbarButton('Italic', editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), <i>I</i>),
            showSecondaryMarks && toolbarButton('Strikethrough', editor.isActive('strike'), () => editor.chain().focus().toggleStrike().run(), <s>S</s>),
            showCode && toolbarButton('Code', editor.isActive('code'), () => editor.chain().focus().toggleCode().run(), docked ? <CodeIcon size={18} /> : <span className="font-mono text-[11px]">{'<>'}</span>),
            toolbarButton(
              editor.isActive('link') ? 'Edit link' : 'Add link',
              editor.isActive('link'),
              () => openLinkDialog(),
              <LinkIcon size={docked ? 18 : 16} />,
            ),
            showListControls && <span key="sep1" aria-hidden className="mx-1 h-4 w-px shrink-0 bg-border" />,
            showBulletedList && toolbarButton('Bulleted list', editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), docked ? <ListIcon size={18} /> : <span>•</span>),
            showListControls && toolbarButton('Numbered list', editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), <span className="text-[11px]">1.</span>),
            showQuote && toolbarButton('Quote', editor.isActive('blockquote'), () => editor.chain().focus().toggleBlockquote().run(), <QuoteIcon size={docked ? 18 : 16} />),
            // Below wide, the same five live in one overflow menu instead of
            // being dropped: shedding them outright is how a narrow composer
            // quietly lost lists.
            !wide && (
              <DropdownMenu
                key="format-more"
                trigger={<span aria-hidden="true" className="text-sm leading-none">⋯</span>}
                triggerLabel="More formatting"
                triggerTitle="More formatting"
                disabled={blocked}
                triggerTabIndex={-1}
                triggerTestId={`${testId}-format-more`}
                data-testid={`${testId}-format-more-menu`}
                triggerClassName="grid h-7 w-7 shrink-0 place-items-center rounded text-text-secondary hover:bg-surface-hover border-0 p-0"
                sections={[{
                  items: [
                    { label: 'Strikethrough', checked: editor.isActive('strike'), onSelect: () => editor.chain().focus().toggleStrike().run() },
                    { label: 'Code', checked: editor.isActive('code'), onSelect: () => editor.chain().focus().toggleCode().run() },
                    { label: 'Bulleted list', checked: editor.isActive('bulletList'), onSelect: () => editor.chain().focus().toggleBulletList().run() },
                    { label: 'Numbered list', checked: editor.isActive('orderedList'), onSelect: () => editor.chain().focus().toggleOrderedList().run() },
                    { label: 'Quote', checked: editor.isActive('blockquote'), onSelect: () => editor.chain().focus().toggleBlockquote().run() },
                  ],
                }]}
              />
            ),
          ]}

          {(allowEmoji || attachmentsEnabled || !!onPrivacyChange) && fullToolbar && (
            <span aria-hidden className="mx-1 h-4 w-px shrink-0 bg-border" />
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
              {toolbarButton('Attach files', false, () => fileInput.current?.click(), <PaperclipIcon size={docked ? 18 : 16} />)}
              <FileInput
                ref={fileInput}
                multiple
                data-testid={`${testId}-file-input`}
                onFiles={stage}
              />
            </>
          )}

          {onPrivacyChange && (() => {
            const labels = { ...DEFAULT_PRIVACY_LABELS, ...privacyLabels };
            const hidden = privacy === 'hidden';
            return toolbarButton(
              hidden ? labels.hidden : labels.visible,
              hidden,
              () => onPrivacyChange(hidden ? 'visible' : 'hidden'),
              hidden ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />,
              undefined,
              `${testId}-privacy-toggle`,
            );
          })()}

          {editorToolbar && toolbarExtras != null && (!promptToolbar || promptStripLead) && (
            <span aria-hidden className={cn('shrink-0 bg-border', docked ? 'mx-2.5 h-6 w-px' : 'mx-1 h-4 w-px')} data-testid={`${testId}-extras-divider`} />
          )}
          {toolbarExtras}
          </RovingToolbar>
          )}

          {/* A host with slash commands says so where the toolbar ends: a
              muted `/ commands`, the way a code editor's status line names
              its palette. Wide only — narrow has no room and the `?` menu. */}
          {!collapsed && wide && !!commands?.length && !promptCard && !quiet && (
            <span
              className={cn('shrink-0 select-none', inert ? 'text-text-disabled' : 'text-text-tertiary', docked ? 'ml-3 text-xs' : 'ml-1 border-l border-border pl-2 text-xs')}
              aria-disabled={inert ? 'true' : undefined}
              data-testid={`${testId}-commands-hint`}
            >/ commands</span>
          )}

          {!collapsed && !docked && (!pane || paneTools) && ((!hintsInRow && !!resolvedHints.length) || suggestionsInMenu || (formatInHints && !!editor)) ? (
            <DropdownMenu
              trigger={<span aria-hidden="true" className="text-xs font-semibold leading-none">?</span>}
              triggerLabel="Keyboard hints"
              triggerTitle="Keyboard hints"
              triggerTestId={`${testId}-hints-toggle`}
              data-testid={`${testId}-hints-menu`}
              align="end"
              triggerClassName="grid h-7 w-7 shrink-0 place-items-center rounded text-text-tertiary hover:bg-surface-hover hover:text-text-primary border-0 p-0"
              sections={[
                // The compact strip's four folded controls, first: they act
                // on the draft, the hints below only describe keys.
                ...(formatInHints && editor ? [{
                  label: 'Formatting',
                  items: [
                    { label: 'Strikethrough', checked: editor.isActive('strike'), onSelect: () => editor.chain().focus().toggleStrike().run() },
                    ...(compactToolbar ? [{ label: 'Code', checked: editor.isActive('code'), onSelect: () => editor.chain().focus().toggleCode().run() }] : []),
                    ...(basicToolbar ? [{ label: 'Bulleted list', checked: editor.isActive('bulletList'), onSelect: () => editor.chain().focus().toggleBulletList().run() }] : []),
                    { label: 'Numbered list', checked: editor.isActive('orderedList'), onSelect: () => editor.chain().focus().toggleOrderedList().run() },
                    ...((compactToolbar || basicToolbar) ? [{ label: 'Quote', checked: editor.isActive('blockquote'), onSelect: () => editor.chain().focus().toggleBlockquote().run() }] : []),
                  ],
                }] : []),
                ...(suggestionsInMenu ? [{
                  label: 'Suggestions',
                  items: suggestions!.map((suggestion) => ({ label: suggestion, onSelect: () => onSuggestion?.(suggestion) })),
                }] : []),
                ...(!hintsInRow && resolvedHints.length ? [{
                  ...((suggestionsInMenu || formatInHints) ? { label: 'Keys' } : {}),
                  items: resolvedHints.map((hint) => ({
                    label: hint.label,
                    trailing: <kbd className="rounded border border-border bg-surface-inset px-1 font-mono text-[10px] text-text-secondary">{hint.key}</kbd>,
                    ...(hint.onSelect ? { onSelect: hint.onSelect } : {}),
                  })),
                }] : []),
              ]}
            />
          ) : null}

          {pane && paneTools && modeRowEnd != null && (
            <span className="flex shrink-0 items-center" data-testid={`${testId}-mode-row-end`}>{modeRowEnd}</span>
          )}
          {showMoreActions && !collapsed && (!pane || paneTools) && (
            <span className="ml-auto flex shrink-0 items-center pr-1" data-testid={`${testId}-more-actions`}>
              <DropdownMenu
                trigger={<span aria-hidden="true" className="text-sm leading-none">⋯</span>}
                triggerLabel={moreActionsLabel}
                triggerTitle={moreActionsLabel}
                triggerTestId={`${testId}-more-actions-trigger`}
                data-testid={`${testId}-more-actions-menu`}
                align="end"
                triggerClassName="grid h-7 w-7 shrink-0 place-items-center rounded text-text-secondary hover:bg-surface-hover border-0 p-0"
                sections={[...moreActions!]}
              />
            </span>
          )}
          {submitLead != null && !collapsed && (
            <span className={cn(!(showMoreActions && !collapsed) && 'ml-auto', 'flex shrink-0 items-center pr-1.5 text-text-secondary', menuModeRow ? 'text-sm' : 'text-xs')} data-testid={`${testId}-submit-lead`}>
              {submitLead}
            </span>
          )}
          {/* One Send, one size (2.407.8): the split Send (with its caret) and
              the plain one share these, so a conversation's composer and a
              document's measure the same idle row and the same card. Compact
              everywhere (2.407.9); the docked card adds its arrow. */}
          {sendOptions?.length && onSendOption ? (
            // A split button, not a second control: the primary press must
            // stay in the same place and do the same thing it always did, and
            // the alternatives have to be somewhere other than in front of it.
            <span className={cn((submitLead == null || collapsed) && !(showMoreActions && !collapsed) && 'ml-auto', 'flex shrink-0 items-stretch')}>
              <button
                data-ui-part=""
                type="button"
                onClick={terminalMode ? submitShell : send}
                disabled={!canSend}
                {...submitReasonProps}
                data-testid={`${testId}-send`}
                className={cn(`shrink-0 rounded-l-md rounded-r-none bg-primary ${BUTTON_WEIGHT} text-on-primary disabled:opacity-40`, sendSize)}
              >
                {sendContent}
              </button>
              <DropdownMenu
                trigger={<span aria-hidden="true" className="text-xs leading-none">▾</span>}
                triggerLabel="Other ways to send"
                align="end"
                triggerTestId={`${testId}-send-options`}
                data-testid={`${testId}-send-menu`}
                // One control, two halves: while Send is dimmed for an empty
                // draft, its caret must not stay a saturated primary block —
                // it read as the one live action in the row. The menu's
                // options still work without text (they switch the mode),
                // so the caret is not disabled with Send; it drops to the
                // secondary style and joins the primary colour when Send does.
                triggerClassName={cn(
                  // The caret is as tall as the Send beside it.
                  'rounded-l-none rounded-r-md border-0 border-l',
                  BUTTON_WEIGHT,
                  'px-1.5 py-1',
                  canSend
                    ? 'border-on-primary/40 bg-primary text-on-primary hover:bg-primary'
                    : 'border-border bg-surface-inset text-text-secondary hover:bg-surface-hover',
                )}
                sections={[{ items: sendOptions.map((option) => ({ label: option.label, onSelect: () => onSendOption(option.id) })) }]}
              />
            </span>
          ) : promptCard && !collapsed ? (
            <button
              data-ui-part=""
              type="button"
              onClick={send}
              disabled={!canSend}
              aria-label={sendLabel}
              title={sendShortcut === 'mod-enter' ? `${sendLabel} (⌘ Return)` : sendLabel}
              {...submitReasonProps}
              data-testid={`${testId}-send`}
              className={cn(
                submitLead == null && !singleRow && 'ml-0',
                (submitLead == null && singleRow) && 'ml-auto',
                'grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-on-primary disabled:opacity-40',
              )}
            >
              <ArrowUpIcon size={18} aria-hidden="true" />
            </button>
          ) : (
            <button
              data-ui-part=""
              type="button"
              onClick={terminalMode ? submitShell : send}
              disabled={!canSend}
              data-testid={`${testId}-send`}
              {...(pane ? { title: sendShortcut === 'mod-enter' ? `${sendLabel} (⌘ Return)` : sendLabel, 'data-icon-only': 'true' } : {})}
              {...submitReasonProps}
              className={cn(
                (submitLead == null || collapsed) && !(showMoreActions && !collapsed && (!pane || paneTools)) && 'ml-auto',
                `shrink-0 rounded bg-primary ${BUTTON_WEIGHT} text-on-primary disabled:opacity-40`,
                (docked || menuModeRow) && 'rounded-md',
                pane ? 'grid h-7 w-7 place-items-center rounded-md p-0' : sendSize,
              )}
            >
              {pane ? <><SendIcon size={14} aria-hidden="true" /><span className="sr-only">{sendLabel}</span></> : sendContent}
            </button>
          )}
        </div>
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
