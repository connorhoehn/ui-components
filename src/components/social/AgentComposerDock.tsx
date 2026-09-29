// AgentComposerDock — the agent composer a page docks under its content: the
// Initiative Work page's composer, as one composite.
//
// DEPRECATED since 2.407.0: use `ContextComposer` with `context.kind`
// 'initiative' | 'search'. This is now a thin preset over it (no idle
// collapse, no console surface, its own defaults below) so existing hosts
// keep their look and their test ids (`<id>-dock-slot`, `<id>-workflow`).
//
//   Agent ⌄  ⌥2                              ● Auth Migration ×
//   Ask about this initiative…
//   B  I  </>  🔗  •  ❝  📎 │ ⑂ Workflow ⌄  / commands          Send →
//
// It is a PRESET, not a new composer: `ComposerDockPlacementContext` pinned →
// `FloatingComposerDock` → `RichChatComposer` with the mode menu, auto layout,
// the document (`editor`) or compact toolbar, mode shortcuts and triggers, no
// console backdrop, attachments on, and a `Workflow ⌄` menu whose pick seeds
// the draft with `/<id> `. Two hosts built this by hand (the initiative pages
// and Search) and drifted within a day; the host now supplies only words —
// placeholder, chips, workflow rows, commands — and callbacks.
//
// ## What `onSend` receives
//
// The switchable Agent mode prefixes `text` with `/agent ` for a chat's command
// router. A dock's host is not one, so the dock hands back what was TYPED
// (read from the editor) and re-matches `command` against `commands` on that
// text — `/prioritize …` arrives as the `/prioritize` command, not as
// `/agent /prioritize …`. An argument picked from a command's menu rides
// along: pick "Advisor" under `/agent`, type the question, and `command` is
// `{ trigger: '/agent', argument: { id: 'advisor', … } }` with `text`
// `/agent Advisor <question>` (the command line is hidden in the editor, not
// removed). `html`, `files`, `documents` and `mentions` are the
// composer's own. Return (or resolve) `false` to keep the draft.
//
// ## Draft
//
// Uncontrolled by default: `defaultDraft` is the prefill, and `draftKey` names
// the subject it belongs to — change it and the draft (and editor) start over,
// so one item's half-typed text never carries into the next. Pass `draft` +
// `onDraftChange` to hold it yourself. A workflow pick replaces the draft and
// remounts the editor with the command in place (the editor takes a new
// command chip only on mount).
//
// ## Dock slot and modes
//
// `dock` is pinned to the composer's top edge inside the dock frame — the
// in-call shelf (`CallDock`) of the call on this page, placed exactly as
// `ChatPanel.dock` places it (a `shrink-0` row flush on the composer, no
// gap), so a shelf looks the same over either composer. It is NOT
// `FloatingComposerDock.above` (that row shrinks and scrolls, with a gap —
// for a notice) nor `strip` (that squares the composer's top corners to join
// a `TaskStrip` into one box): it rides in the dock's composer row, above the
// `RichChatComposer`. Absent, nothing is drawn.
//
// `modes` is which modes exist here at all (a mode left out has no menu row,
// shortcut or trigger); `disabledModes` is which of those are shown but
// unavailable, with their `modeUnavailableReasons`. The Chat/Terminal
// default-off applies only when `modes` is not given.

import { useMemo } from 'react';
import type {
  ComposedMessage,
  ComposerCommand,
  ComposerHint,
  ComposerMode,
  ComposerStatus,
  DocumentCandidate,
  MentionCandidate,
  RichChatComposerHandle,
  RichChatComposerProps,
  RichChatDraft,
} from './RichChatComposer';
import type { ReactNode, Ref } from 'react';
import type { ComposerReference } from './ComposerReferences';
import { ContextComposerBase } from './ContextComposer';
import type { ComposerContextPreset } from './composerContext';

/** One row of the `Workflow ⌄` menu. A disabled row shows its reason and cannot be picked. */
export interface AgentComposerWorkflow {
  /** Seeds the draft as `/<id> ` by default — match a `commands` trigger. */
  id: string;
  label: string;
  /** Second line of the row. */
  description?: string;
  disabled?: boolean;
  /** Second line and tooltip of a disabled row. */
  disabledReason?: string;
}

export interface AgentComposerSendContext {
  /** The mode the message was composed in. */
  mode: ComposerMode;
}

export interface AgentComposerDockProps {
  /** `document` (default `compact`): the full editor strip and comfortable density, for a full-width page. */
  presentation?: 'compact' | 'document';
  /** Controlled mode. Pair with `onModeChange`. */
  mode?: ComposerMode;
  /** Uncontrolled starting mode. Default `agent`. */
  defaultMode?: ComposerMode;
  onModeChange?: (mode: ComposerMode) => void;
  /** Agent-mode placeholder (and the fallback for Chat). */
  placeholder?: string;
  /** Per-mode placeholders; win over `placeholder`. */
  modePlaceholders?: Partial<Record<ComposerMode, string>>;
  /** Chips naming what the draft is about ("● Auth Migration"). */
  references?: readonly ComposerReference[];
  /** Makes each chip removable. */
  onRemoveReference?: (id: string) => void;
  /** Slash commands — normally the same workflows as `workflows`. */
  commands?: ComposerCommand[];
  /** The `Workflow ⌄` menu. Absent or empty, no menu. */
  workflows?: readonly AgentComposerWorkflow[];
  /** A workflow was picked. Default: seed the draft with `/<id> ` and remount the editor. */
  onWorkflow?: (id: string) => void;
  /**
   * Which modes this composer offers at all (default all three). A mode left
   * out is ABSENT — no menu row, no shortcut, its trigger is plain text. Use
   * `disabledModes` instead to show a mode with the reason it is off.
   */
  modes?: readonly ComposerMode[];
  /**
   * Shown but unavailable, with `modeUnavailableReasons`. Default
   * `['chat', 'terminal']` — or none when `modes` is given (the host named
   * what it serves; `modes={['terminal']}` alone is a working Terminal).
   */
  disabledModes?: readonly ComposerMode[];
  /** Merged over the defaults for Chat and Terminal. */
  modeUnavailableReasons?: Partial<Record<ComposerMode, string>>;
  /**
   * Pinned to the composer's top edge, full width of the composer card — the
   * in-call shelf (`CallDock`). Placed like `ChatPanel.dock`: `shrink-0`, flush
   * on the composer. Absent (or `false`), nothing is drawn. Test id
   * `<data-testid>-dock-slot`.
   */
  dock?: ReactNode;
  /** Controlled draft. Pair with `onDraftChange`. */
  draft?: RichChatDraft;
  onDraftChange?: (draft: RichChatDraft, previous: RichChatDraft | undefined) => void;
  /** Uncontrolled prefill, as text or a draft. Re-read when `draftKey` changes. */
  defaultDraft?: string | RichChatDraft;
  /** The subject the draft belongs to. Changing it starts the draft (and the editor) over. */
  draftKey?: string;
  /** Receives what was typed (see the file note). Return `false` to keep the draft. */
  onSend: (message: ComposedMessage, context: AgentComposerSendContext) => boolean | Promise<boolean>;
  /** Resolves the `#` menu. */
  onSearchDocuments?: RichChatComposerProps['onSearchDocuments'];
  /** Draws the `#` menu as an "Add context" card. */
  documentMenu?: RichChatComposerProps['documentMenu'];
  /** Resolves the `@` menu. */
  onSearchPeople?: (query: string) => MentionCandidate[] | Promise<MentionCandidate[]>;
  /** Default true. Files arrive on send, in `message.files`. */
  allowAttachments?: boolean;
  allowEmoji?: boolean;
  disabled?: boolean;
  /** An agent is mid-turn. */
  working?: boolean;
  status?: ComposerStatus | null;
  hints?: readonly ComposerHint[];
  suggestions?: readonly string[];
  onSuggestion?: (suggestion: string) => void;
  /** Send's label, per mode or for all. */
  submitLabel?: RichChatComposerProps['submitLabel'];
  maxInputHeight?: number | string;
  /** The live composer — its `editor` for docref bookkeeping, `focus`, `insertText`. */
  composerRef?: Ref<RichChatComposerHandle>;
  /** Accessible name of the dock region. Default "Agent composer". */
  label?: string;
  /** Accessible name of the editor (the textbox) inside it. Default "Message". */
  inputLabel?: string;
  /** On the dock. */
  className?: string;
  /** The dock's test id. Default `agent-composer-dock`. */
  'data-testid'?: string;
  /** The composer's own test id (its parts derive from it). Default `rich-chat-composer`. */
  composerTestId?: string;
}

export type { DocumentCandidate, MentionCandidate };

const DEFAULT_DISABLED: readonly ComposerMode[] = ['chat', 'terminal'];
const NONE: readonly ComposerMode[] = [];
const DEFAULT_REASONS: Partial<Record<ComposerMode, string>> = {
  chat: 'This view has no discussion thread — ask the agent instead',
  terminal: 'This view has no terminal',
};
const ALL_MODES: readonly ComposerMode[] = ['chat', 'agent', 'terminal'];

/**
 * @deprecated Since 2.407.0 — use `ContextComposer` with
 * `context={{ kind: 'initiative' | 'search', id, title }}`. Kept as a preset
 * over it with the same props, look and test ids.
 */
export function AgentComposerDock({
  presentation = 'compact',
  defaultMode = 'agent',
  modes,
  disabledModes: disabledModesProp,
  modeUnavailableReasons,
  draftKey = '',
  allowAttachments = true,
  allowEmoji = false,
  label = 'Agent composer',
  className,
  'data-testid': testId = 'agent-composer-dock',
  onSend,
  ...rest
}: AgentComposerDockProps) {
  // Naming `modes` says what this surface serves, so the Chat/Terminal
  // default-off only applies when `modes` is not given.
  const disabledModes = disabledModesProp ?? (modes ? NONE : DEFAULT_DISABLED);
  const docPreset = presentation === 'document';
  const preset = useMemo<ComposerContextPreset>(() => ({
    kind: 'initiative',
    modes: modes ?? ALL_MODES,
    defaultMode,
    disabledModes,
    modeUnavailableReasons: DEFAULT_REASONS,
    modePlaceholders: {},
    chipLabel: null,
    regionLabel: label,
    features: {
      contextChip: false,
      workflows: true,
      workflowCommand: null,
      pageActions: false,
      sendOptions: false,
      reply: false,
      taskStrip: false,
      offline: false,
      modelUnavailable: false,
      attachments: 'always',
      emoji: true,
      mentions: true,
      typedText: true,
    },
  }), [modes, defaultMode, disabledModes, label]);

  return (
    <ContextComposerBase
      {...rest}
      look={{
        preset,
        toolbar: docPreset ? 'editor' : 'compact',
        density: docPreset ? 'comfortable' : 'compact',
        collapseWhenIdle: false,
        passModes: false,
        className: 'bg-surface pt-3 [--dock-inset:1.5rem]',
      }}
      context={{ kind: 'initiative', id: draftKey, title: '' }}
      contextChip={false}
      defaultMode={defaultMode}
      {...(modes ? { modes } : {})}
      disabledModes={disabledModes}
      modeUnavailableReasons={modeUnavailableReasons}
      draftKey={draftKey}
      allowAttachments={allowAttachments}
      allowEmoji={allowEmoji}
      console={false}
      label={label}
      {...(className ? { className } : {})}
      data-testid={testId}
      onSend={(message, context) => onSend(message, { mode: context.mode })}
    />
  );
}

export default AgentComposerDock;
