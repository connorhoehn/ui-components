// AgentComposerDock — the agent composer a page docks under its content: the
// Initiative Work page's composer, as one composite.
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

import { useCallback, useRef, useState, type Ref } from 'react';
import { cn } from '../../lib/cn';
import { DropdownMenu } from '../shared/DropdownMenu';
import { BranchIcon, ChevronIcon } from '../ui/Icons';
import { ComposerDockPlacementContext, FloatingComposerDock } from '../doc-editor/FloatingComposerDock';
import {
  RichChatComposer,
  type ComposedMessage,
  type ComposerCommand,
  type ComposerHint,
  type ComposerMode,
  type ComposerStatus,
  type DocumentCandidate,
  type MentionCandidate,
  type RichChatComposerHandle,
  type RichChatComposerProps,
  type RichChatDraft,
} from './RichChatComposer';
import type { ComposerReference } from './ComposerReferences';
import { matchComposerCommand } from './composerCommands';
import { composerDraftOf } from './agentComposerDraft';

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
  /** Default `['chat', 'terminal']`. */
  disabledModes?: readonly ComposerMode[];
  /** Merged over the defaults for Chat and Terminal. */
  modeUnavailableReasons?: Partial<Record<ComposerMode, string>>;
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
const DEFAULT_REASONS: Partial<Record<ComposerMode, string>> = {
  chat: 'This view has no discussion thread — ask the agent instead',
  terminal: 'This view has no terminal',
};

function asDraft(value: string | RichChatDraft | undefined): RichChatDraft {
  return typeof value === 'string' || value === undefined ? composerDraftOf(value ?? '') : value;
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

export function AgentComposerDock({
  presentation = 'compact',
  mode: modeProp,
  defaultMode = 'agent',
  onModeChange,
  placeholder,
  modePlaceholders,
  references,
  onRemoveReference,
  commands,
  workflows,
  onWorkflow,
  disabledModes = DEFAULT_DISABLED,
  modeUnavailableReasons,
  draft: draftProp,
  onDraftChange,
  defaultDraft,
  draftKey = '',
  onSend,
  onSearchDocuments,
  documentMenu,
  onSearchPeople,
  allowAttachments = true,
  allowEmoji,
  disabled,
  working,
  status,
  hints,
  suggestions,
  onSuggestion,
  submitLabel,
  maxInputHeight,
  composerRef,
  label = 'Agent composer',
  inputLabel = 'Message',
  className,
  'data-testid': testId = 'agent-composer-dock',
  composerTestId,
}: AgentComposerDockProps) {
  const [innerMode, setInnerMode] = useState<ComposerMode>(defaultMode);
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
  if (keyOf !== draftKey) {
    setKeyOf(draftKey);
    setInnerDraft(asDraft(defaultDraft));
    setSeed(0);
  }
  const controlled = draftProp !== undefined;
  const draft = controlled ? draftProp : innerDraft;
  const draftRef = useRef(draft);
  draftRef.current = draft;

  const handleDraftChange = useCallback((next: RichChatDraft, previous: RichChatDraft | undefined) => {
    if (!controlled) setInnerDraft(next);
    onDraftChange?.(next, previous);
  }, [controlled, onDraftChange]);

  const pickWorkflow = useCallback((id: string) => {
    if (onWorkflow) { onWorkflow(id); return; }
    const seeded = composerDraftOf(`/${id} `);
    handleDraftChange(seeded, draftRef.current);
    setSeed((n) => n + 1);
  }, [onWorkflow, handleDraftChange]);

  const handleRef = useRef<RichChatComposerHandle | null>(null);
  const setHandle = useCallback((handle: RichChatComposerHandle | null) => {
    handleRef.current = handle;
    assignRef(composerRef, handle);
  }, [composerRef]);

  const send = useCallback((message: ComposedMessage) => {
    // Hand back what was typed, not the chat router's `/agent …` form.
    const typed = handleRef.current?.editor?.getText();
    let out = message;
    if (typed !== undefined && typed !== message.text) {
      const cmd = matchComposerCommand(typed, commands);
      const command = cmd
        ? { trigger: cmd.trigger, ...(message.command?.trigger === cmd.trigger && message.command.argument ? { argument: message.command.argument } : {}) }
        : undefined;
      out = { ...message, text: typed, command };
      if (!command) delete out.command;
    }
    return onSend(out, { mode: message.mode ?? mode });
  }, [commands, mode, onSend]);

  const placeholders: Partial<Record<ComposerMode, string>> = {
    ...(placeholder ? { agent: placeholder } : {}),
    ...modePlaceholders,
  };
  const docPreset = presentation === 'document';
  const rows = workflows ?? [];

  return (
    <ComposerDockPlacementContext.Provider value="pinned">
      <FloatingComposerDock
        label={label}
        data-testid={testId}
        className={cn('bg-surface pt-3 [--dock-inset:1.5rem]', className)}
        composer={(
          <RichChatComposer
            key={`${draftKey}:${seed}`}
            ref={setHandle}
            data-testid={composerTestId}
            mode={mode}
            onModeChange={handleModeChange}
            modeControl="menu"
            layout="auto"
            toolbar={docPreset ? 'editor' : 'compact'}
            density={docPreset ? 'comfortable' : 'compact'}
            modeShortcuts
            modeTriggers
            backdropTone="none"
            allowAttachments={allowAttachments}
            allowEmoji={allowEmoji}
            references={references}
            onRemoveReference={onRemoveReference}
            disabledModes={disabledModes}
            modeUnavailableReasons={{ ...DEFAULT_REASONS, ...modeUnavailableReasons }}
            placeholder={placeholder}
            inputLabel={inputLabel}
            modePlaceholders={placeholders}
            commands={commands}
            onSearchDocuments={onSearchDocuments}
            documentMenu={documentMenu}
            onSearchPeople={onSearchPeople}
            disabled={disabled}
            working={working}
            status={status}
            hints={hints}
            suggestions={suggestions}
            onSuggestion={onSuggestion}
            submitLabel={submitLabel}
            maxInputHeight={maxInputHeight}
            toolbarExtras={rows.length > 0 ? (
              <DropdownMenu
                trigger={(
                  <span className="inline-flex items-center gap-2">
                    <BranchIcon size={14} aria-hidden />
                    Workflow
                    <ChevronIcon dir="down" size={14} aria-hidden />
                  </span>
                )}
                triggerLabel="Workflow"
                triggerClassName="h-7 px-2 text-xs font-medium text-text-secondary"
                triggerTestId={`${testId}-workflow`}
                sections={[{
                  items: rows.map((w) => ({
                    label: w.label,
                    description: w.description,
                    disabled: w.disabled,
                    disabledReason: w.disabledReason,
                    onSelect: () => pickWorkflow(w.id),
                  })),
                }]}
              />
            ) : undefined}
            draft={draft}
            onDraftChange={handleDraftChange}
            onSend={send}
          />
        )}
      />
    </ComposerDockPlacementContext.Provider>
  );
}

export default AgentComposerDock;
