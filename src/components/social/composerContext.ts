// composerContext.ts — what a composer is attached to, and what that allows.
//
// `ContextComposer` is one composite for every place people write: a
// conversation, a document page, a work item's brief, a diagram, an
// initiative, a search. What varies between those is not the look (that is
// fixed: one idle row that expands to the editor card) but which features
// make sense. A DM has no "Make a deck"; a document has no "Share a
// document"; a diagram's agent cannot edit it yet.
//
// So the table lives here, pure and DOM-free, as `composerContextPreset`:
// modes, default disabled modes and their reasons, placeholders, the context
// chip, and which optional rows may render. The composite renders a feature
// only when this table ALLOWS it AND the host passed its callback — a DM host
// that happens to pass `onMakeDeck` still gets no deck action.
//
// Tiptap-free on purpose: the root barrel exports it statically so a host can
// test its own gating without the editor.

import type { ComposerMode } from './RichChatComposer';

/** What the composer is attached to. */
export type ComposerContext =
  | { kind: 'conversation'; id: string; title: string; /** A one-to-one DM. */ dm?: boolean }
  | { kind: 'document' | 'work-item' | 'diagram'; id: string; title: string }
  | { kind: 'initiative' | 'search'; id: string; title: string };

export type ComposerContextKind = ComposerContext['kind'];

export const COMPOSER_CONTEXT_KINDS: readonly ComposerContextKind[] = [
  'conversation', 'document', 'work-item', 'diagram', 'initiative', 'search',
];

/** Which optional rows and controls a context allows. */
export interface ComposerContextFeatures {
  /** The context chip ("● Roadmap") at the card's row end. */
  contextChip: boolean;
  /** The `Workflow ⌄` menu (and the workflow command). */
  workflows: boolean;
  /**
   * The command a workflow pick writes: `/workflow <label>` with the pick as
   * the command's argument. `null`: the pick writes `/<id> ` (a command per
   * workflow, the initiative/search convention).
   */
  workflowCommand: string | null;
  /** Page actions under `Agent ⌄` — "Make a deck" and the host's `moreActions`. */
  pageActions: boolean;
  /** Send options (the split Send) and "Share a document". */
  sendOptions: boolean;
  /** A reply quote above the row. */
  reply: boolean;
  /** The task strip joined to the composer's top edge. */
  taskStrip: boolean;
  /** The "you are offline" notice. */
  offline: boolean;
  /** The "the model is unreachable" notice. */
  modelUnavailable: boolean;
  /** `chat-only`: attachments only while composing a Chat message. */
  attachments: 'always' | 'chat-only';
  emoji: boolean;
  mentions: boolean;
  /**
   * `onSend` receives what was TYPED (Agent mode's `/agent ` prefix removed,
   * the command re-matched). `false`: the chat router's form, `/agent …`,
   * which a conversation's command registry routes.
   */
  typedText: boolean;
}

export interface ComposerContextPreset {
  kind: ComposerContextKind;
  /** The modes offered here at all. */
  modes: readonly ComposerMode[];
  /** Where a fresh composer starts. */
  defaultMode: ComposerMode;
  /** Offered but off, with `modeUnavailableReasons`. */
  disabledModes: readonly ComposerMode[];
  modeUnavailableReasons: Partial<Record<ComposerMode, string>>;
  modePlaceholders: Partial<Record<ComposerMode, string>>;
  /** The context chip's label, or null for none. */
  chipLabel: string | null;
  /** Accessible name of the composer region. */
  regionLabel: string;
  features: ComposerContextFeatures;
}

/** What the preset needs to know about the host's wiring. */
export interface ComposerContextWiring {
  /** A terminal is attached (`onShellCommand`). Without one, Terminal is off with a reason. */
  terminal?: boolean;
  /** Chat has somewhere to go. Default true except for `initiative`/`search`. */
  chat?: boolean;
  /** The agent is unavailable here — Agent is shown off with this reason. */
  agentUnavailableReason?: string;
}

export const COMPOSER_CONTEXT_REASONS = {
  terminal: 'Attach an agent loop to use the terminal here',
  noThread: 'This view has no discussion thread — ask the agent instead',
  diagramAgent: 'The agent cannot edit diagrams yet — describe the change in Chat',
} as const;

function clip(text: string, max: number): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length <= max ? flat : `${flat.slice(0, max - 1).trimEnd()}…`;
}

const BASE: ComposerContextFeatures = {
  contextChip: false,
  workflows: false,
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
};

/**
 * The preset for a context: its modes, reasons, placeholders, chip and the
 * rows it allows. Pure — the same context always gives the same preset.
 */
export function composerContextPreset(context: ComposerContext, wiring: ComposerContextWiring = {}): ComposerContextPreset {
  const title = context.title?.trim() ?? '';
  const disabled = new Set<ComposerMode>();
  const reasons: Partial<Record<ComposerMode, string>> = {};
  const off = (mode: ComposerMode, reason: string) => { disabled.add(mode); reasons[mode] = reason; };
  let preset: Omit<ComposerContextPreset, 'disabledModes' | 'modeUnavailableReasons'>;

  switch (context.kind) {
    case 'conversation':
      preset = {
        kind: 'conversation',
        modes: ['chat', 'agent'],
        defaultMode: 'chat',
        modePlaceholders: {
          chat: title ? `Message ${context.dm ? '' : '#'}${clip(title, 32)}…` : 'Write a message…',
          agent: 'Tell the agent what to do…',
        },
        // The thread IS the context — no chip.
        chipLabel: null,
        regionLabel: 'Message composer',
        features: { ...BASE, sendOptions: true, reply: true, taskStrip: true, offline: true, typedText: false },
      };
      break;
    case 'document':
    case 'work-item': {
      const doc = context.kind === 'document';
      const noun = doc ? 'document' : 'work item';
      preset = {
        kind: context.kind,
        modes: ['chat', 'agent', 'terminal'],
        defaultMode: 'agent',
        modePlaceholders: {
          chat: `Message this ${noun}’s conversation…`,
          agent: doc
            ? `Tell the agent what to change in “${clip(title || 'this page', 32)}”…`
            : 'Tell the agent what to change in this work item…',
          terminal: '$ a line for a running agent loop',
        },
        chipLabel: doc ? (title || 'Untitled page') : 'This work item',
        regionLabel: doc ? 'Page composer' : 'Work item composer',
        features: {
          ...BASE,
          contextChip: true,
          workflows: true,
          workflowCommand: '/workflow',
          pageActions: true,
          reply: true,
          taskStrip: true,
          modelUnavailable: true,
          attachments: 'chat-only',
        },
      };
      if (!wiring.terminal) off('terminal', COMPOSER_CONTEXT_REASONS.terminal);
      break;
    }
    case 'diagram':
      preset = {
        kind: 'diagram',
        modes: ['chat', 'agent'],
        defaultMode: 'chat',
        modePlaceholders: {
          chat: 'Message this diagram’s conversation…',
          agent: 'Tell the agent what to change in this diagram…',
        },
        chipLabel: title || 'Untitled diagram',
        regionLabel: 'Diagram composer',
        features: {
          ...BASE,
          contextChip: true,
          workflows: true,
          workflowCommand: '/workflow',
          reply: true,
          taskStrip: true,
          modelUnavailable: true,
          attachments: 'chat-only',
        },
      };
      // Off unless the host names what the agent can do here — pass
      // `agentUnavailableReason` to say why in its own words.
      off('agent', wiring.agentUnavailableReason ?? COMPOSER_CONTEXT_REASONS.diagramAgent);
      break;
    case 'initiative':
    case 'search':
      preset = {
        kind: context.kind,
        modes: context.kind === 'search' ? ['agent'] : ['chat', 'agent'],
        defaultMode: 'agent',
        modePlaceholders: {
          agent: context.kind === 'search' ? 'Ask a question…' : `Ask about ${title ? clip(title, 32) : 'this initiative'}…`,
          chat: title ? `Message the ${clip(title, 32)} thread…` : 'Write a message…',
        },
        chipLabel: title || null,
        regionLabel: context.kind === 'search' ? 'Search composer' : 'Agent composer',
        features: {
          ...BASE,
          contextChip: !!title,
          workflows: true,
          taskStrip: true,
          modelUnavailable: true,
        },
      };
      if (context.kind === 'initiative' && wiring.chat !== true) off('chat', COMPOSER_CONTEXT_REASONS.noThread);
      break;
  }

  if (wiring.chat === false && preset.modes.includes('chat')) off('chat', COMPOSER_CONTEXT_REASONS.noThread);
  if (wiring.agentUnavailableReason && preset.modes.includes('agent')) off('agent', wiring.agentUnavailableReason);
  // A default mode that is off starts on the first mode that is not.
  const defaultMode = disabled.has(preset.defaultMode)
    ? preset.modes.find((m) => !disabled.has(m)) ?? preset.defaultMode
    : preset.defaultMode;
  return {
    ...preset,
    defaultMode,
    disabledModes: preset.modes.filter((m) => disabled.has(m)),
    modeUnavailableReasons: reasons,
  };
}

/** Identity claims a composer may read a name from (an ID token, a BFF session). */
export interface ComposerIdentity {
  displayName?: string | null;
  given_name?: string | null;
  family_name?: string | null;
  name?: string | null;
  email?: string | null;
}

/**
 * The local participant's name from identity claims: `displayName` first
 * (aws-agentcore's BFF tokens), then `given_name` + `family_name` (Cognito,
 * and the gateway's `SKIP_AUTH` bypass), then `name`, then the email's local
 * part. `undefined` when none of them says anything.
 */
export function identityDisplayName(identity: ComposerIdentity | null | undefined): string | undefined {
  if (!identity) return undefined;
  const display = identity.displayName?.trim();
  if (display) return display;
  const full = [identity.given_name, identity.family_name].map((p) => p?.trim()).filter(Boolean).join(' ');
  if (full) return full;
  const name = identity.name?.trim();
  if (name) return name;
  const local = identity.email?.split('@')[0]?.trim();
  return local || undefined;
}
