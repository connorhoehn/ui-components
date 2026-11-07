// ContextComposer — one composer for every place people write: a
// conversation, a document page, a work item, a diagram, an initiative, a
// search.
//
//   idle       ✦ Agent  ● Roadmap  Tell the agent what to change…     Send →
//   expanded   Agent ⌄  ⌥2                                  ● Roadmap ×
//              Tell the agent what to change in “Roadmap”…
//              B  I  </>  🔗  •  ❝  📎 │ ⑂ Workflow ⌄  / commands     Send →
//
// ## One look
//
// Idle it is ONE line — mode pill, context chip, placeholder, Send — the DM's
// row. The caret in the input, words in it, a staged file, a command, a status
// or a forced `expanded` bring the full card: the `Agent ⌄` mode menu, the
// editor strip, Send. Empty and blurred, it folds back. Host content the
// composer cannot see (a reply quote, a notice, a task strip) forces the card,
// so a reply never sits over a one-line row. There is no `modeControl` or
// `collapseWhenIdle` here: the look is not a per-host choice. `toolbar`
// (2.508.0) picks only the strip's preset — `prompt` for a host whose
// composer takes one instruction, never a formatted document.
//
// Agent and Terminal crossfade the card onto the dark console surface (the
// box changes surface when Enter stops being a message); the idle row stays
// plain. `console={false}` keeps the ordinary surface in every mode.
//
// ## Context decides what may render; a callback decides whether it is wired
//
// `composerContextPreset(context)` (composerContext.ts) is the table: modes,
// default-off modes and why, placeholders, the chip, and which rows are
// allowed. A feature renders only when the context allows it AND the host
// passed its callback — a DM host that passes `onMakeDeck` still gets no deck
// action; a document never shows send options or "Share a document".
//
// ## Rows
//
//   dock         the call shelf, flush on the composer's top edge (for a host
//                with no slot of its own; a ChatPanel/EditorShell host keeps
//                its own slot and does not pass this)
//   above        notices: model unavailable, offline, the host's own, a reply
//   strip        a task strip (`task`) or the host's node, joined to the card
//   replacement  renders INSTEAD of the composer (a comment reply field),
//                keeping the rows above
//
// ## Workflows are a menu, not a mode
//
// `Workflow ⌄` on the strip; in a document-like context a pick writes the
// `/workflow <name>` command with the pick as its argument (and Send reads
// "Prepare run"), and `/workflow` is offered as a slash command with an
// argument picker. Elsewhere a pick writes `/<id> `.

import { useCallback, useId, useMemo, useRef, useState, type ReactNode, type Ref } from 'react';
import { Button, BUTTON_WEIGHT } from '../ui/Button';
import { cn } from '../../lib/cn';
import { DropdownMenu, type DropdownMenuSection } from '../shared/DropdownMenu';
import Banner from '../shared/Banner';
import { TaskStrip, type AgentTaskStatus } from '../shared/TaskStrip';
import { IconButton } from '../ui/IconButton';
import { BranchIcon, ChevronIcon, DocumentIcon } from '../ui/Icons';
import { ComposerDockPlacementContext, FloatingComposerDock } from '../doc-editor/FloatingComposerDock';
import { QuoteBlock } from './QuoteBlock';
import {
  RichChatComposer,
  type ComposedMessage,
  type ComposerCommand,
  type ComposerHint,
  type ComposerMode,
  type ComposerProcess,
  type ComposerSendOption,
  type ComposerStatus,
  type ComposerToolbarPreset,
  type MentionCandidate,
  type RichChatComposerHandle,
  type RichChatComposerProps,
  type RichChatDraft,
} from './RichChatComposer';
import type { ComposerArgumentItem } from './composerCommands';
import type { ComposerReference } from './ComposerReferences';
import { matchComposerCommand } from './composerCommands';
import { composerDraftOf } from './agentComposerDraft';
import {
  composerContextPreset,
  identityDisplayName,
  type ComposerContext,
  type ComposerContextPreset,
  type ComposerIdentity,
} from './composerContext';

/** One row of the `Workflow ⌄` menu. A disabled row shows its reason and cannot be picked. */
export interface ComposerWorkflow {
  /** The pick's identity: `/<id> ` or the `/workflow` argument's id. */
  id: string;
  label: string;
  /** Second line of the row. */
  description?: string;
  disabled?: boolean;
  /** Second line and tooltip of a disabled row. */
  disabledReason?: string;
}

/** The message being replied to — drawn as a `QuoteBlock` above the row. */
export interface ComposerReply {
  author: string;
  /** Plain text of the original (excerpted for display). */
  quote: string;
  messageId?: string;
  /** ISO timestamp of the original. */
  timestamp?: string;
  onDismiss?: () => void;
  onJump?: (messageId: string) => void;
}

/** A task in flight, drawn as the `TaskStrip` joined to the composer. */
export interface ComposerTaskReport {
  label: string;
  status: AgentTaskStatus;
  phase?: string;
  percent?: number;
  onOpen?: () => void;
  onStop?: () => void;
  onDismiss?: () => void;
}

export interface ContextComposerSendContext {
  /** The mode the message was composed in. */
  mode: ComposerMode;
  /** What the composer is attached to. */
  context: ComposerContext;
  /** The sender's name from `identity` (displayName first). */
  author?: string;
}

export interface ContextComposerProps {
  /** What the composer is attached to. Decides modes, chip, and which features may render. */
  context: ComposerContext;
  /** `document`: comfortable density, for a full-width page. Default `compact`. */
  presentation?: 'compact' | 'document';
  /**
   * The strip's preset, as `RichChatComposerProps.toolbar` (since 2.508.0).
   * Default `editor`. `prompt` drops every formatting control and keeps
   * attach (when allowed), the divider and the host's extras.
   */
  toolbar?: ComposerToolbarPreset;

  // ── modes ──
  /** Controlled mode. Pair with `onModeChange`. */
  mode?: ComposerMode;
  /** Uncontrolled starting mode. Default: the context's. */
  defaultMode?: ComposerMode;
  onModeChange?: (mode: ComposerMode) => void;
  /** Which modes exist here. Default: the context's (a conversation: Chat, Agent). */
  modes?: readonly ComposerMode[];
  /** Shown but off. Default: the context's (Terminal until `onShellCommand`, a diagram's Agent). */
  disabledModes?: readonly ComposerMode[];
  /** Merged over the context's reasons. */
  modeUnavailableReasons?: Partial<Record<ComposerMode, string>>;
  /** The agent is unavailable here: Agent is shown off with this reason. */
  agentUnavailableReason?: string;
  /** Chat has somewhere to go. `false`: Chat is shown off with a reason. */
  chatAvailable?: boolean;
  /** Agent-mode placeholder. */
  placeholder?: string;
  /** Per-mode placeholders, over the context's. */
  modePlaceholders?: Partial<Record<ComposerMode, string>>;
  modeHints?: RichChatComposerProps['modeHints'];
  hints?: readonly ComposerHint[];
  submitLabel?: RichChatComposerProps['submitLabel'];

  // ── context chip & references ──
  /** The context chip. `false` hides it; a string relabels it. Default: the context's. */
  contextChip?: boolean | string;
  /** Makes the context chip removable. */
  onRemoveContext?: () => void;
  /** More chips (work references, a comment hand-off). */
  references?: readonly ComposerReference[];
  onRemoveReference?: (id: string) => void;

  // ── commands & workflows ──
  commands?: ComposerCommand[];
  /** An argument pick that IS the message (`onPick → 'execute'`). */
  onCommand?: (command: ComposerCommand, argument: ComposerArgumentItem) => void;
  /** The `Workflow ⌄` menu. Allowed in every context but a conversation. */
  workflows?: readonly ComposerWorkflow[];
  /** A workflow was picked. Default: write it into the draft. */
  onWorkflow?: (id: string) => void;
  /** Send's label while the draft holds the workflow command. Default "Prepare run". */
  workflowSubmitLabel?: string;

  // ── mentions, documents, attachments ──
  onSearchPeople?: (query: string) => MentionCandidate[] | Promise<MentionCandidate[]>;
  mentionMembers?: ReadonlySet<string>;
  onMentionNonMember?: (userId: string) => void;
  onSearchDocuments?: RichChatComposerProps['onSearchDocuments'];
  documentMenu?: RichChatComposerProps['documentMenu'];
  /** Default true (Chat mode only in a document-like context). */
  allowAttachments?: boolean;
  /** Default true. */
  allowEmoji?: boolean;
  onRequestLink?: RichChatComposerProps['onRequestLink'];

  // ── privacy ──
  /**
   * Who will see the message: `visible` (default) or `hidden` (only you — a
   * private question). Controlled; the toggle appears on the strip only when
   * `onPrivacyChange` is passed, and the sent message carries `privacy`.
   */
  privacy?: RichChatComposerProps['privacy'];
  /** Turns the privacy toggle on. Apply the value back through `privacy`. */
  onPrivacyChange?: RichChatComposerProps['onPrivacyChange'];
  /** The toggle's two labels. Default "Visible to everyone" / "Only you". */
  privacyLabels?: RichChatComposerProps['privacyLabels'];

  // ── conversation only ──
  sendOptions?: readonly ComposerSendOption[];
  onSendOption?: (id: string) => void;
  /** "Share a document" on the strip. Receives the button, to anchor a picker. */
  onShareDocument?: (anchor: HTMLElement) => void;
  shareDocumentTestId?: string;
  /** Offline / held-messages notice, above the row. */
  offline?: string | null;

  // ── document / work item only ──
  /** "Make a deck from this page", under `Agent ⌄`. */
  onMakeDeck?: () => void;
  makeDeckLabel?: string;
  makeDeckTestId?: string;
  /** More page actions under `Agent ⌄`. */
  moreActions?: readonly DropdownMenuSection[];
  moreActionsLabel?: string;

  // ── rows ──
  /** The call shelf, flush on the composer's top edge. Test id `<data-testid>-dock-slot`. */
  dock?: ReactNode;
  /** Notices above the row (an error banner). Forces the full card. */
  above?: ReactNode;
  /** Inside the card, its first section (`RichChatComposer header`): a prompt deck. Forces the full card. Since 2.446.0. */
  header?: ReactNode;
  /** A strip joined to the composer's top edge. Forces the full card. Wins over `task`. */
  strip?: ReactNode;
  /** A task in flight, as the `TaskStrip`. */
  task?: ComposerTaskReport | null;
  /** The message being replied to. Forces the full card. */
  reply?: ComposerReply | null;
  /** Rendered instead of the composer (a comment reply field), rows kept. */
  replacement?: ReactNode;
  /** The model is unreachable: a warning above the row. */
  modelUnavailable?: string | null;
  /** Controls on the strip after the built-in ones. */
  toolbarExtras?: ReactNode;
  /**
   * Beside Send, before it — a select that says what Send will do ("Draft
   * only ⌄"). Hidden on the idle row. Since 2.407.11.
   */
  submitLead?: ReactNode;
  /** At the end of the card's mode row — a scope switch ("This slide · Whole deck"). Hidden on the idle row. Since 2.407.11. */
  modeRowEnd?: ReactNode;
  /** At the START of the card's mode row, and on the idle row — a "Chat" label or the host's own mode select. Forwarded to `RichChatComposer`. Since 2.413.0. */
  modeRowStart?: ReactNode;
  /**
   * Send acts on an empty draft that has references (a message that is only
   * "this page"). The context chip counts as a reference. Forwarded to
   * `RichChatComposer`. Since 2.413.0.
   */
  sendWithReferencesOnly?: boolean;
  /** After the chips in the card's mode row — an "add another" control (a document picker). Hidden on the idle row. Since 2.407.11. */
  referencesAction?: ReactNode;
  /**
   * Makes the card a drop target for a host payload (not files) — dragged
   * documents joining the draft's chips. Works on the idle row too. Since 2.407.11.
   */
  referenceDrop?: RichChatComposerProps['referenceDrop'];
  processes?: readonly ComposerProcess[];
  onQuickOpen?: () => void;
  /** Where a Terminal line goes. Passing it turns Terminal on where the context offers it. */
  onShellCommand?: (command: string) => void;

  // ── draft & send ──
  draft?: RichChatDraft;
  onDraftChange?: (draft: RichChatDraft, previous: RichChatDraft | undefined) => void;
  defaultDraft?: string | RichChatDraft;
  /** The subject the draft belongs to. Default: the context's kind and id. */
  draftKey?: string;
  /** Return `false` to keep the draft. */
  onSend: (message: ComposedMessage, context: ContextComposerSendContext) => void | boolean | Promise<void | boolean>;
  /** Who is writing — `author` in the send context. */
  identity?: ComposerIdentity | null;

  // ── state ──
  /** Force the full card. */
  expanded?: boolean;
  /** Offer an explicit collapse control. Keeps the editor, draft and files mounted;
   * a focus request reopens it. Prompt replacements keep their own controls. */
  collapsible?: boolean;
  /** Destination shown in the collapsed row (e.g. the selected conversation). */
  collapsedLabel?: string;
  /**
   * `pane` (since 2.431.0): the simplified responsive mode for a composer in
   * a side pane — one input row with a single mode · subject chip, icon-only
   * Send and a 1px focus border, chosen by the composer's own width (below
   * the wide breakpoint). See `RichChatComposerProps.responsive`.
   */
  responsive?: 'pane';
  /** An agent is mid-turn: the console drifts faster. */
  working?: boolean;
  /** Default true: Agent/Terminal paint the console surface. */
  console?: boolean;
  disabled?: boolean;
  /**
   * Read, not write (since 2.450.0): `RichChatComposer.readOnly` — the note
   * replaces the placeholder and every control is off — plus this
   * composer's Workflow ⌄, Share and reference removal. See there.
   */
  readOnly?: ReactNode;
  status?: ComposerStatus | null;
  suggestions?: readonly string[];
  onSuggestion?: (suggestion: string) => void;
  /** `RichChatComposerProps.suggestionsVisible` (since 2.508.0). Default `focused`. */
  suggestionsVisible?: 'focused' | 'empty';
  maxInputHeight?: number | string;
  composerRef?: Ref<RichChatComposerHandle>;

  /** Accessible name of the region. Default: the context's. */
  label?: string;
  inputLabel?: string;
  className?: string;
  /** Default `context-composer`. */
  'data-testid'?: string;
  /** The composer's own test id. Default `rich-chat-composer`. */
  composerTestId?: string;
}

/**
 * The fixed look, and the preset as resolved — what `ContextComposer`
 * computes and the deprecated `AgentComposerDock` supplies itself. Internal.
 */
export interface ContextComposerLook {
  preset: ComposerContextPreset;
  toolbar: ComposerToolbarPreset;
  density: 'comfortable' | 'compact';
  collapseWhenIdle: boolean;
  /** Pass `modes` to the composer (false: undefined → every mode). */
  passModes: boolean;
  /** One offered mode renders as a static label, not a one-item menu. */
  singleModeLabel?: boolean;
  className?: string;
}

function asDraft(value: string | RichChatDraft | undefined): RichChatDraft {
  return typeof value === 'string' || value === undefined ? composerDraftOf(value ?? '') : value;
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const NO_WORKFLOWS: readonly ComposerWorkflow[] = [];

const DEFAULT_CLASS: Record<string, string> = {
  // In a chat column the host's slot is the frame: no gutter, no fill.
  conversation: 'bg-transparent [--dock-inset:0px]',
};

export function ContextComposer(props: ContextComposerProps) {
  const { context, presentation = 'compact', onShellCommand, agentUnavailableReason, chatAvailable } = props;
  const preset = useMemo(
    () => composerContextPreset(context, {
      terminal: !!onShellCommand,
      ...(chatAvailable !== undefined ? { chat: chatAvailable } : {}),
      ...(agentUnavailableReason ? { agentUnavailableReason } : {}),
    }),
    [context, onShellCommand, chatAvailable, agentUnavailableReason],
  );
  return (
    <ContextComposerBase
      {...props}
      look={{
        preset,
        toolbar: props.toolbar ?? 'editor',
        density: presentation === 'document' ? 'comfortable' : 'compact',
        collapseWhenIdle: true,
        passModes: true,
        singleModeLabel: true,
        className: DEFAULT_CLASS[context.kind],
      }}
    />
  );
}

/** Internal: the composite with its look supplied. Not exported from any barrel. */
export function ContextComposerBase({
  look,
  context,
  mode: modeProp,
  defaultMode,
  onModeChange,
  modes: modesProp,
  disabledModes: disabledModesProp,
  modeUnavailableReasons,
  placeholder,
  modePlaceholders,
  modeHints,
  hints,
  submitLabel,
  contextChip = true,
  onRemoveContext,
  references,
  onRemoveReference,
  commands,
  onCommand,
  workflows,
  onWorkflow,
  workflowSubmitLabel = 'Prepare run',
  onSearchPeople,
  mentionMembers,
  onMentionNonMember,
  onSearchDocuments,
  documentMenu,
  allowAttachments = true,
  allowEmoji = true,
  onRequestLink,
  privacy,
  onPrivacyChange,
  privacyLabels,
  sendOptions,
  onSendOption,
  onShareDocument,
  shareDocumentTestId,
  offline,
  onMakeDeck,
  makeDeckLabel = 'Make a deck from this page',
  makeDeckTestId,
  moreActions,
  moreActionsLabel = 'Page actions',
  dock,
  above,
  header,
  strip,
  task,
  reply,
  replacement,
  modelUnavailable,
  toolbarExtras,
  submitLead,
  modeRowEnd,
  modeRowStart,
  sendWithReferencesOnly,
  referencesAction,
  referenceDrop,
  processes,
  onQuickOpen,
  onShellCommand,
  draft: draftProp,
  onDraftChange,
  defaultDraft,
  draftKey: draftKeyProp,
  onSend,
  identity,
  expanded,
  collapsible = false,
  collapsedLabel,
  responsive,
  working,
  console: consoleOn = true,
  disabled,
  readOnly,
  status,
  suggestions,
  onSuggestion,
  suggestionsVisible,
  maxInputHeight,
  composerRef,
  label,
  inputLabel = 'Message',
  className,
  'data-testid': testId = 'context-composer',
  composerTestId,
}: ContextComposerProps & { look: ContextComposerLook }) {
  const { preset } = look;
  const f = preset.features;
  const draftKey = draftKeyProp ?? `${context.kind}:${context.id}`;
  const modes = modesProp ?? preset.modes;
  // Naming `modes` says what this surface serves: the context's default-off
  // applies only to the modes it names.
  const disabledModes = disabledModesProp ?? preset.disabledModes.filter((m) => modes.includes(m));

  const [innerMode, setInnerMode] = useState<ComposerMode>(() => {
    const start = defaultMode ?? preset.defaultMode;
    return modes.includes(start) ? start : modes.find((m) => !disabledModes.includes(m)) ?? start;
  });
  const mode = modeProp ?? innerMode;
  const handleModeChange = useCallback((next: ComposerMode) => {
    if (modeProp === undefined) setInnerMode(next);
    onModeChange?.(next);
  }, [modeProp, onModeChange]);

  // The draft, and the subject it was written against. A new `draftKey`
  // restarts both (adjusted during render, so no frame shows the old text).
  const [innerDraft, setInnerDraft] = useState<RichChatDraft>(() => asDraft(defaultDraft));
  const [seed, setSeed] = useState(0);
  const [keyOf, setKeyOf] = useState(draftKey);
  const [chipHidden, setChipHidden] = useState(false);
  const [folded, setFolded] = useState(false);
  const disclosureId = useId();
  const reopenRef = useRef<HTMLButtonElement>(null);
  const manuallyCollapsed = collapsible && folded && !replacement && !header;
  if (keyOf !== draftKey) {
    setKeyOf(draftKey);
    setInnerDraft(asDraft(defaultDraft));
    setSeed(0);
    setChipHidden(false);
    setFolded(false);
  }
  const controlled = draftProp !== undefined;
  const draft = controlled ? draftProp : innerDraft;
  const draftRef = useRef(draft);
  draftRef.current = draft;

  const handleDraftChange = useCallback((next: RichChatDraft, previous: RichChatDraft | undefined) => {
    if (!controlled) setInnerDraft(next);
    onDraftChange?.(next, previous);
  }, [controlled, onDraftChange]);

  // ── workflows ──
  const workflowRows = f.workflows && workflows ? workflows : NO_WORKFLOWS;
  const workflowTrigger = f.workflowCommand;
  const pickWorkflow = useCallback((id: string) => {
    if (onWorkflow) { onWorkflow(id); return; }
    const row = workflowRows.find((w) => w.id === id);
    const seeded = workflowTrigger && row
      ? {
          html: `<p>${escapeHtml(`${workflowTrigger} ${row.label} `)}</p>`,
          files: draftRef.current?.files ?? [],
          command: { trigger: workflowTrigger, argument: { id: row.id, label: row.label, ...(row.description ? { hint: row.description } : {}) } },
        }
      : composerDraftOf(`/${id} `);
    handleDraftChange(seeded, draftRef.current);
    // The editor takes a new command chip only on mount.
    setSeed((n) => n + 1);
  }, [onWorkflow, workflowRows, workflowTrigger, handleDraftChange]);

  const allCommands = useMemo<ComposerCommand[] | undefined>(() => {
    if (!workflowTrigger || workflowRows.length === 0) return commands;
    if (commands?.some((c) => c.trigger === workflowTrigger)) return commands;
    const workflowCommand: ComposerCommand = {
      trigger: workflowTrigger,
      label: 'Run a workflow',
      hint: 'pick a workflow, then say what it should do',
      icon: <BranchIcon size={14} aria-hidden />,
      argument: {
        placeholder: 'Choose a workflow',
        search: (q) => workflowRows
          .filter((w) => !w.disabled && w.label.toLowerCase().includes(q.trim().toLowerCase()))
          .map((w) => ({ id: w.id, label: w.label, ...(w.description ? { hint: w.description } : {}) })),
      },
    };
    return [...(commands ?? []), workflowCommand];
  }, [commands, workflowRows, workflowTrigger]);

  const draftText = draft?.html?.replace(/<[^>]*>/g, '').trimStart() ?? '';
  const workflowInDraft = !!workflowTrigger && workflowRows.length > 0
    && (draft?.command?.trigger === workflowTrigger || draftText.toLowerCase().startsWith(`${workflowTrigger} `));

  // ── composer handle & send ──
  const handleRef = useRef<RichChatComposerHandle | null>(null);
  const setHandle = useCallback((handle: RichChatComposerHandle | null) => {
    handleRef.current = handle;
    assignRef(composerRef, handle ? { ...handle, focus: () => {
      setFolded(false);
      requestAnimationFrame(() => handle.focus());
    } } : null);
  }, [composerRef]);
  const reopen = () => {
    setFolded(false);
    requestAnimationFrame(() => handleRef.current?.focus());
  };
  const collapse = () => {
    handleRef.current?.editor?.commands.blur();
    setFolded(true);
    requestAnimationFrame(() => reopenRef.current?.focus());
  };

  const author = identityDisplayName(identity);
  const send = useCallback((message: ComposedMessage) => {
    let out = message;
    if (f.typedText) {
      // Hand back what was typed, not the chat router's `/agent …` form.
      const typed = handleRef.current?.editor?.getText();
      if (typed !== undefined && typed !== message.text) {
        const cmd = matchComposerCommand(typed, allCommands);
        const command = cmd
          ? { trigger: cmd.trigger, ...(message.command?.trigger === cmd.trigger && message.command.argument ? { argument: message.command.argument } : {}) }
          : undefined;
        out = { ...message, text: typed, command };
        if (!command) delete out.command;
      }
    }
    return onSend(out, { mode: message.mode ?? mode, context, ...(author ? { author } : {}) });
  }, [f.typedText, allCommands, mode, onSend, context, author]);

  // ── chips ──
  const chipLabel = f.contextChip && contextChip !== false && !chipHidden
    ? (typeof contextChip === 'string' ? contextChip : preset.chipLabel)
    : null;
  const chipId = `context:${context.kind}:${context.id}`;
  const allReferences: readonly ComposerReference[] | undefined = chipLabel
    ? [{ id: chipId, label: chipLabel, marker: 'dot' }, ...(references ?? [])]
    : references;
  const removeReference = useCallback((id: string) => {
    if (id === chipId) { setChipHidden(true); onRemoveContext?.(); return; }
    onRemoveReference?.(id);
  }, [chipId, onRemoveContext, onRemoveReference]);
  const readOnlyOn = readOnly != null && readOnly !== false;
  const referencesRemovable = !readOnlyOn && (!!onRemoveReference || (!!chipLabel && !!onRemoveContext));

  // ── page actions (under Agent ⌄) ──
  const actionSections: DropdownMenuSection[] = f.pageActions ? [
    ...(onMakeDeck ? [{
      label: 'This page',
      items: [{
        label: makeDeckLabel,
        description: 'Drafts a presentation that cites this page, then opens it',
        onSelect: onMakeDeck,
        'data-testid': makeDeckTestId ?? `${testId}-make-deck`,
      }],
    }] : []),
    ...(moreActions ?? []),
  ] : [];

  // ── strip extras ──
  const shareButton = f.sendOptions && onShareDocument ? (
    <IconButton
      aria-label="Share a document"
      title="Share a document"
      variant="ghost"
      size="sm"
      icon={<DocumentIcon size={14} />}
      disabled={readOnlyOn}
      onClick={(e) => onShareDocument(e.currentTarget)}
      data-testid={shareDocumentTestId ?? `${testId}-share-document`}
    />
  ) : null;
  const workflowMenu = workflowRows.length > 0 ? (
    <DropdownMenu
      trigger={(
        <span className="inline-flex items-center gap-2">
          <BranchIcon size={14} aria-hidden />
          Workflow
          <ChevronIcon dir="down" size={14} aria-hidden />
        </span>
      )}
      triggerLabel="Workflow"
      triggerClassName={`h-7 px-2 text-xs text-text-secondary ${BUTTON_WEIGHT}`}
      triggerTestId={`${testId}-workflow`}
      disabled={readOnlyOn || !!disabled}
      sections={[{
        items: workflowRows.map((w) => ({
          label: w.label,
          description: w.description,
          disabled: w.disabled,
          disabledReason: w.disabledReason,
          active: draft?.command?.trigger === workflowTrigger && draft?.command?.argument?.id === w.id,
          onSelect: () => pickWorkflow(w.id),
          'data-testid': `${testId}-workflow-${w.id}`,
        })),
      }]}
    />
  ) : null;
  const extras = workflowMenu || shareButton || toolbarExtras != null
    ? <>{workflowMenu}{shareButton}{toolbarExtras}</>
    : undefined;

  // ── rows above ──
  const modelRow = f.modelUnavailable && modelUnavailable
    ? <Banner variant="warning" data-testid={`${testId}-model-unavailable`}>{modelUnavailable}</Banner>
    : null;
  const offlineRow = f.offline && offline
    ? <Banner variant="warning" data-testid={`${testId}-offline`}>{offline}</Banner>
    : null;
  const replyRow = f.reply && reply ? (
    <QuoteBlock
      quote={{ messageId: reply.messageId ?? '', author: reply.author, text: reply.quote, ...(reply.timestamp ? { timestamp: reply.timestamp } : {}) }}
      {...(reply.onDismiss ? { onDismiss: reply.onDismiss } : {})}
      {...(reply.onJump && reply.messageId ? { onJump: reply.onJump } : {})}
      data-testid={`${testId}-reply`}
    />
  ) : null;
  const hasAbove = !!(modelRow || offlineRow || replyRow || (above != null && above !== false));
  const aboveRow = hasAbove ? (
    <div className="flex flex-col gap-1.5" data-testid={`${testId}-above`}>
      {modelRow}{offlineRow}{above}{replyRow}
    </div>
  ) : undefined;

  const taskRow = f.taskStrip && task ? (
    <TaskStrip
      label={task.label}
      status={task.status}
      {...(task.phase ? { phase: task.phase } : {})}
      {...(task.percent !== undefined ? { percent: task.percent } : {})}
      {...(task.onOpen ? { onOpen: task.onOpen } : {})}
      {...(task.onStop ? { onStop: task.onStop } : {})}
      {...(task.onDismiss ? { onDismiss: task.onDismiss } : {})}
      data-testid={`${testId}-task`}
    />
  ) : null;
  const stripRow = strip != null && strip !== false ? strip : taskRow;

  // Host content the composer cannot see forces the full card (never the
  // dock: a call shelf over an idle row is the resting state).
  const hasHeader = header != null && header !== false;
  const forceExpanded = !!expanded || hasAbove || hasHeader || stripRow != null;

  const chatOnlyAttachments = f.attachments === 'chat-only' && mode !== 'chat';
  const placeholders: Partial<Record<ComposerMode, string>> = {
    ...preset.modePlaceholders,
    ...(placeholder ? { agent: placeholder } : {}),
    ...modePlaceholders,
  };
  const reasons = { ...preset.modeUnavailableReasons, ...modeUnavailableReasons };
  // An off Agent says why in its placeholder, too — the one line people read.
  if (disabledModes.includes('agent') && reasons.agent && !modePlaceholders?.agent && !placeholder) placeholders.agent = reasons.agent;

  return (
    <ComposerDockPlacementContext.Provider value="pinned">
      <FloatingComposerDock
        label={label ?? preset.regionLabel}
        data-testid={testId}
        className={cn(look.className, className)}
        above={manuallyCollapsed ? undefined : aboveRow}
        strip={manuallyCollapsed ? undefined : stripRow ?? undefined}
        composer={(
          <>
            {dock != null && dock !== false && (
              <div className="shrink-0" data-testid={`${testId}-dock-slot`}>
                {dock}
              </div>
            )}
            {manuallyCollapsed && (
              <Button ref={reopenRef} variant="ghost" size="sm" onClick={reopen}
                data-composer-readonly-allow={readOnlyOn ? 'Expand composer' : undefined}
                aria-label="Expand composer" aria-expanded={false} aria-controls={disclosureId}
                className="w-full justify-start gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm"
                data-composer-surface="collapsed" data-testid={`${testId}-expand`}>
                <span className="shrink-0 font-semibold">{mode === 'agent' ? 'Agent' : mode === 'chat' ? 'Chat' : mode === 'terminal' ? 'Terminal' : 'Search'}</span>
                <span className="min-w-0 flex-1 truncate text-left font-normal text-text-secondary">{collapsedLabel || context.title || 'Write a message…'}</span>
                {(draftText || draft?.files.length) ? <span className="shrink-0 text-xs text-text-secondary">Draft kept{draft?.files.length ? ` · ${draft.files.length} attached` : ''}</span> : null}
                <ChevronIcon dir="up" size={16} />
              </Button>
            )}
            <div id={disclosureId} hidden={manuallyCollapsed}>
            {replacement != null && replacement !== false ? replacement : (
              <RichChatComposer
                key={`${draftKey}:${seed}`}
                ref={setHandle}
                data-testid={composerTestId}
                mode={mode}
                onModeChange={handleModeChange}
                modeControl="menu"
                singleModeLabel={!!look.singleModeLabel}
                layout="auto"
                toolbar={look.toolbar}
                density={look.density}
                collapseWhenIdle={look.collapseWhenIdle}
                expanded={forceExpanded}
                {...(responsive ? { responsive } : {})}
                modeShortcuts
                modeTriggers
                backdropTone={consoleOn ? 'auto' : 'none'}
                working={working}
                allowAttachments={allowAttachments && !chatOnlyAttachments}
                allowEmoji={f.emoji && allowEmoji}
                onRequestLink={onRequestLink}
                privacy={privacy}
                onPrivacyChange={onPrivacyChange}
                privacyLabels={privacyLabels}
                references={allReferences}
                onRemoveReference={referencesRemovable ? removeReference : undefined}
                modes={look.passModes ? modes : modesProp}
                disabledModes={disabledModes}
                modeUnavailableReasons={reasons}
                modeHints={modeHints}
                placeholder={placeholder}
                inputLabel={inputLabel}
                modePlaceholders={placeholders}
                commands={allCommands}
                onCommand={onCommand}
                onSearchDocuments={onSearchDocuments}
                documentMenu={documentMenu}
                onSearchPeople={f.mentions ? onSearchPeople : undefined}
                mentionMembers={mentionMembers}
                onMentionNonMember={onMentionNonMember}
                disabled={disabled}
                {...(readOnlyOn ? { readOnly } : {})}
                status={status}
                hints={hints}
                suggestions={suggestions}
                onSuggestion={onSuggestion}
                {...(suggestionsVisible ? { suggestionsVisible } : {})}
                processes={processes}
                onQuickOpen={onQuickOpen}
                onShellCommand={onShellCommand}
                sendOptions={f.sendOptions ? sendOptions : undefined}
                onSendOption={f.sendOptions ? onSendOption : undefined}
                moreActions={actionSections.length ? actionSections : undefined}
                moreActionsLabel={moreActionsLabel}
                submitLabel={workflowInDraft ? workflowSubmitLabel : submitLabel}
                maxInputHeight={maxInputHeight}
                toolbarExtras={extras}
                submitLead={submitLead}
                modeRowEnd={modeRowEnd != null || collapsible ? <>{modeRowEnd}{collapsible && !header && <IconButton size="sm" aria-label="Collapse composer"
                  data-composer-readonly-allow={readOnlyOn ? 'Collapse composer' : undefined}
                  title="Collapse composer" aria-expanded aria-controls={disclosureId} onClick={collapse}
                  icon={<ChevronIcon dir="down" size={16} />} data-testid={`${testId}-collapse`} />}</> : undefined}
                modeRowStart={modeRowStart}
                {...(hasHeader ? { header } : {})}
                sendWithReferencesOnly={sendWithReferencesOnly}
                referencesAction={referencesAction}
                referenceDrop={referenceDrop}
                draft={draft}
                onDraftChange={handleDraftChange}
                onSend={send}
              />
            )}
            </div>
          </>
        )}
      />
    </ComposerDockPlacementContext.Provider>
  );
}

export type { ComposerContext, ComposerContextPreset, ComposerIdentity };
export default ContextComposer;
