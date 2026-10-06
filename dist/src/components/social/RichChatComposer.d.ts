import { type ReactNode } from 'react';
import { type Editor } from '@tiptap/core';
import { type DropdownMenuSection } from '../shared/DropdownMenu';
import { type BackdropTone } from '../shared/backdropTone';
import { type ComposerReference } from './ComposerReferences';
import { type MentionCandidate } from './MentionSuggestions';
import { type DocumentCandidate, type DocumentMenuPanel } from './DocumentSuggestions';
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
    documents?: Array<{
        id: string;
        label: string;
    }>;
    /**
     * Set when the draft starts with a known command trigger. `argument` is the
     * item picked from the argument menu, present only when the pick was made
     * in THIS draft and its label is still in the text — an edited-away label
     * means the person changed their mind, and the host should read `text`.
     */
    command?: {
        trigger: string;
        argument?: ComposerArgumentItem;
    };
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
    action?: {
        label: string;
        onSelect: () => void;
        'data-testid'?: string;
    };
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
import { type ComposerArgumentItem, type ComposerCommand } from './composerCommands';
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
    privacyLabels?: {
        visible: string;
        hidden: string;
    };
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
     *   and numbered lists, quote and strikethrough go under the card's mode
     *   menu → Formatting. Docks like `editor` under `modeControl="menu"`, with
     *   the mode as a boxed picker ("Agent ⌄", no glyph), the input in its own
     *   bordered well and no rule over the strip — the Initiatives mockup.
     *
     * Sizes are unchanged in all of them: every control is the same 28px box.
     * Below wide the strip folds exactly as before, whichever preset is set.
     */
    toolbar?: ComposerToolbarPreset;
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
    modeTriggers?: boolean | {
        terminalPrefix?: string;
        agentPrefix?: string;
    };
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
    referenceDrop?: {
        types: readonly string[];
        onDrop: (dataTransfer: DataTransfer) => void;
        hint?: string;
    };
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
     * one, in which case the row keeps that tint. Default off.
     */
    collapseWhenIdle?: boolean;
    /**
     * With `collapseWhenIdle`: `true` forces the full card whatever the idle
     * rule says — for host content the composer cannot see (a reply quote, a
     * comment hand-off, a task strip above it), which would otherwise sit over
     * a one-line row. `false`/absent is the idle rule unchanged. No effect
     * without `collapseWhenIdle`. Since 2.407.0.
     */
    expanded?: boolean;
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
export type ComposerToolbarPreset = 'full' | 'compact' | 'editor' | 'prompt' | 'basic';
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
export declare const COMPOSER_BREAKPOINTS: {
    readonly narrow: 380;
    readonly wide: 600;
};
/** `null` — not measured yet — is wide: a first paint that hides controls and then shows them is worse than one frame of overflow. */
export declare function composerSizeFor(width: number | null): ComposerSize;
/** The order Option-1/2/3 and the compact `1 2 3` buttons follow. */
export declare const COMPOSER_MODE_ORDER: readonly ComposerMode[];
/**
 * Whether a whole draft is a mode trigger. A prefix followed by a space
 * always counts (`/run `, `> `); a single-symbol prefix also counts alone,
 * because `> ` never reaches here — the editor's blockquote input rule eats
 * `> ` and leaves an empty quote. A word prefix does NOT count alone:
 * `/run` must be allowed to become `/running`.
 */
export declare function matchesModeTrigger(text: string, prefix: string): boolean;
export declare const RichChatComposer: import("react").ForwardRefExoticComponent<RichChatComposerProps & import("react").RefAttributes<RichChatComposerHandle>>;
export default RichChatComposer;
//# sourceMappingURL=RichChatComposer.d.ts.map