// composerPromptModel — the pure half of ComposerPromptDeck (2.444.0): the
// prompt contract, which prompt is on screen, and what a key does. No React,
// so every rule here is a node test, and the component only draws.
//
// A prompt is a human-in-the-loop question a page puts in front of the docked
// composer: a header card of prepopulated facts, one question, and the answers
// it accepts. The deck shows the queue one prompt at a time, expanded above the
// composer's input, and the keyboard is the fast path:
//
//   1–9            pick option N (choice / confirm: when the input is empty or
//                  focus is in the deck; text / number: Alt+N, because bare
//                  digits are what you are typing)
//   Enter          the default option (input empty), else the composer sends,
//                  and a text / number prompt takes the typed words as its answer
//   ⌘/Ctrl+↓ / ↑   next / previous prompt (J / K when the input is empty and
//                  the prompt is not a typed one: there, letters are the answer)
//   Esc            collapse the deck to the plain composer, answering nothing
//
// A `compose` prompt (2.482.0) owns its keys: it draws `ComposerConfirmFlow`
// (draft → review → done) in the card, so Enter, digits and Esc are the
// flow's; only ⌘/Ctrl+↓ / ↑ still page. An answer may also route to a
// follow-up question (`{ next }`): the follow-up takes the card in place, no
// receipt, and Back from it returns to the question it followed.

import type { ReactNode } from 'react';
import type { DecisionPathState } from '../shared/DecisionPath';

export type ComposerPromptKind = 'choice' | 'confirm' | 'text' | 'number' | 'compose';
export type ComposerPromptTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

/** One prepopulated fact on the prompt's header card. */
export interface ComposerPromptField {
  label: string;
  value: ReactNode;
  /** Colours the value (a warning: "$4.10 left of $5.00"). */
  tone?: ComposerPromptTone;
  /** An identifier value (ids, repos): tabular figures in the body face, never monospace. */
  mono?: boolean;
}

/** One answer a prompt offers. Its position (1–9) is its default shortcut. */
export interface ComposerPromptOption {
  id: string;
  label: string;
  /** A short line under the label ("$0.40–$1.10 forecast"). */
  hint?: string;
  /** A single key that also picks it (default: its 1-based position). */
  shortcut?: string;
  /** Paints the option as the deciding action (`primary`) or a risky one (`danger`). */
  emphasis?: 'primary' | 'danger';
  /** Off, with why. */
  disabledReason?: string;
}

export type ComposerPromptAnswer =
  | { kind: 'choice'; optionId: string }
  | { kind: 'confirm'; optionId: string; confirmed: boolean }
  | { kind: 'text'; text: string; optionId?: undefined }
  | { kind: 'number'; value: number; optionId?: undefined }
  /** A text / number prompt answered with one of its quick options instead of typing. */
  | { kind: 'option'; optionId: string }
  /** A compose prompt confirmed with its (edited) message. Since 2.482.0. */
  | { kind: 'compose'; message: string; optionId?: undefined };

/**
 * What `onAnswer` resolves to. Nothing (or `{ receipt }`): answered — the prompt
 * drops off and the receipt (default: the answer's label) is announced. `{ error }`:
 * not answered — the error shows on the card and the prompt stays. `{ next }`
 * (2.482.0): answered, and the follow-up question takes the card in place with
 * no receipt (a choice that routes to a compose prompt); Back from the
 * follow-up returns to this question. A compose prompt's own result is
 * `{ receipt }` / `{ error }` only: ok shows its done state, error keeps it on
 * review.
 */
export type ComposerPromptResult = void | undefined | { error: string } | { receipt: string } | { next: ComposerPrompt };

/**
 * A compose prompt's message flow (2.482.0): a prefilled, editable message
 * reviewed and confirmed inside the same card. Every label is the host's
 * wording; see `ComposerConfirmFlow` for the defaults.
 */
export interface ComposerPromptCompose {
  /** The prefilled message the person edits. */
  initialMessage?: string;
  /** "To Sienna Garcia · ORG-OBS-11", shown beside the title in every stage. */
  recipient?: string;
  /** The editor's label (default "Message") and placeholder. */
  messageLabel?: string;
  placeholder?: string;
  /** A heading for the review stage ("Confirm budget request"); default none (the card's title stands). */
  reviewTitle?: string;
  /** The done stage's heading (default "Done") and its status line when `onAnswer` gives no receipt (default "Confirmed."). */
  doneTitle?: string;
  doneMessage?: string;
  /** Button labels: Continue / Confirm / Back / the done stage's action (default "Back"). */
  continueLabel?: string;
  confirmLabel?: string;
  backLabel?: string;
  doneActionLabel?: string;
  /** A small line under the review ("Nothing is sent until you confirm."). */
  note?: ReactNode;
  /**
   * Back from the draft of a ROOT compose prompt (one that is not a `{ next }`
   * follow-up): the deck drops the prompt and calls this. A follow-up's Back
   * returns to the question it followed and never calls it. Without it a root
   * prompt's draft has no Back.
   */
  onCancel?: () => void;
}

export interface ComposerPrompt {
  /** Stable while the question is the same; a new id is a new question (re-asked prompts take a new id). */
  id: string;
  title: string;
  /** A line above the title ("Prepare job", "Approval", "Agent question"). */
  eyebrow?: string;
  /** The prepopulated header card. */
  fields?: readonly ComposerPromptField[];
  question: string;
  kind: ComposerPromptKind;
  /**
   * Choice: required. Confirm: default `Confirm` (1) / `Cancel` (2). Text /
   * number: optional quick answers beside the typed one.
   */
  options?: readonly ComposerPromptOption[];
  /** What Enter on an empty input picks. Confirm defaults to its first option. */
  defaultOptionId?: string;
  /** Text / number: the input's placeholder while this prompt is on screen. */
  placeholder?: string;
  /** Number: bounds a typed answer must sit inside. */
  min?: number;
  max?: number;
  /** Shown on the card instead of answers: the reader may look but not decide. */
  readOnlyReason?: string;
  /**
   * The decision path drawn above the card's header (2.482.0): `Choose →
   * Draft request → Confirm → Done` with `current` at this question's step.
   * On a compose prompt `current` is the drafting step; the flow advances it
   * through review (+1) and done (+2) itself.
   */
  path?: DecisionPathState;
  /** Compose: the message flow's wording and prefilled text. */
  compose?: ComposerPromptCompose;
  onAnswer: (answer: ComposerPromptAnswer) => ComposerPromptResult | Promise<ComposerPromptResult>;
}

export const CONFIRM_OPTIONS: readonly ComposerPromptOption[] = [
  { id: 'confirm', label: 'Confirm', emphasis: 'primary' },
  { id: 'cancel', label: 'Cancel' },
];

/** The options a prompt offers, with confirm's defaults filled in. */
export function promptOptions(prompt: ComposerPrompt): readonly ComposerPromptOption[] {
  if (prompt.options && prompt.options.length) return prompt.options;
  return prompt.kind === 'confirm' ? CONFIRM_OPTIONS : [];
}

/** The key that picks option `index` (0-based): its own `shortcut`, else its position. */
export function optionKey(option: ComposerPromptOption, index: number): string | null {
  if (option.shortcut) return option.shortcut.toLowerCase();
  return index < 9 ? String(index + 1) : null;
}

/** Whether the composer's input carries a typed answer for this prompt. */
export function takesTypedAnswer(prompt: ComposerPrompt | null | undefined): boolean {
  return !!prompt && !prompt.readOnlyReason && (prompt.kind === 'text' || prompt.kind === 'number');
}

/** The option Enter picks on an empty input, if any. */
export function defaultOption(prompt: ComposerPrompt): ComposerPromptOption | null {
  const options = promptOptions(prompt);
  const id = prompt.defaultOptionId ?? (prompt.kind === 'confirm' ? options[0]?.id : undefined);
  const found = id ? options.find((o) => o.id === id) ?? null : null;
  return found && !found.disabledReason ? found : null;
}

/** The answer an option stands for, per the prompt's kind. */
export function answerForOption(prompt: ComposerPrompt, option: ComposerPromptOption): ComposerPromptAnswer {
  if (prompt.kind === 'confirm') {
    const first = promptOptions(prompt)[0];
    return { kind: 'confirm', optionId: option.id, confirmed: option.id === first?.id };
  }
  if (prompt.kind === 'choice') return { kind: 'choice', optionId: option.id };
  return { kind: 'option', optionId: option.id };
}

/** A typed answer, checked: the answer, or why it is not one. */
export function parseTypedAnswer(prompt: ComposerPrompt, raw: string): { answer: ComposerPromptAnswer } | { error: string } {
  const text = raw.trim();
  if (prompt.kind === 'text') {
    return text ? { answer: { kind: 'text', text } } : { error: 'Type an answer, or pick an option.' };
  }
  if (prompt.kind === 'number') {
    const cleaned = text.replace(/^\$/, '').replace(/,/g, '');
    const value = cleaned === '' ? Number.NaN : Number(cleaned);
    if (!Number.isFinite(value)) return { error: 'Type a number, or pick an option.' };
    if (prompt.min != null && value < prompt.min) return { error: `Use ${prompt.min} or more.` };
    if (prompt.max != null && value > prompt.max) return { error: `Use ${prompt.max} or less.` };
    return { answer: { kind: 'number', value } };
  }
  return { error: 'Pick one of the options.' };
}

/** The receipt line for an answer when the host gives none. */
export function receiptFor(prompt: ComposerPrompt, answer: ComposerPromptAnswer): string {
  if (answer.kind === 'text') return `${prompt.title}: ${answer.text}`;
  if (answer.kind === 'number') return `${prompt.title}: ${answer.value}`;
  if (answer.kind === 'compose') return `${prompt.title}: ${answer.message}`;
  const option = promptOptions(prompt).find((o) => o.id === answer.optionId);
  return `${prompt.title}: ${option?.label ?? answer.optionId}`;
}

/** The follow-up each answered prompt routed to (`{ next }`), by the answered prompt's id. */
export type ComposerPromptFollowUps = Readonly<Record<string, ComposerPrompt>>;

/**
 * The prompts still waiting: the host's queue minus what this deck saw
 * answered, an answered prompt standing in for the follow-up it routed to
 * (and that one for its own, down the chain).
 */
export function pendingPrompts(prompts: readonly ComposerPrompt[], answered: ReadonlySet<string>, followUps: ComposerPromptFollowUps = {}): ComposerPrompt[] {
  const out: ComposerPrompt[] = [];
  for (const root of prompts) {
    let prompt: ComposerPrompt | undefined = root;
    const seen = new Set<string>();
    while (prompt && answered.has(prompt.id) && !seen.has(prompt.id)) {
      seen.add(prompt.id);
      prompt = followUps[prompt.id];
    }
    if (prompt && !answered.has(prompt.id)) out.push(prompt);
  }
  return out;
}

/** Every prompt id the queue can still reach: the roots and their follow-up chains. */
export function livePromptIds(prompts: readonly ComposerPrompt[], followUps: ComposerPromptFollowUps = {}): Set<string> {
  const live = new Set<string>();
  for (const root of prompts) {
    let prompt: ComposerPrompt | undefined = root;
    while (prompt && !live.has(prompt.id)) {
      live.add(prompt.id);
      prompt = followUps[prompt.id];
    }
  }
  return live;
}

/** The id of the question `promptId` followed (`{ next }`), if any. */
export function followUpParent(promptId: string, followUps: ComposerPromptFollowUps): string | null {
  for (const [parent, next] of Object.entries(followUps)) if (next.id === promptId) return parent;
  return null;
}

/** The prompt on screen: the chosen one while it is still waiting, else the first. */
export function activeIndex(pending: readonly ComposerPrompt[], activeId: string | null): number {
  if (!pending.length) return -1;
  const at = activeId ? pending.findIndex((p) => p.id === activeId) : -1;
  return at >= 0 ? at : 0;
}

export type DeckKeyAction =
  | { type: 'pick'; optionId: string }
  | { type: 'default'; optionId: string }
  | { type: 'page'; delta: 1 | -1 }
  | { type: 'collapse' }
  | { type: 'expand' }
  | null;

export interface DeckKey {
  key: string;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  /** The physical key (`Digit2`): macOS Alt+2 types a symbol, so Alt reads this. */
  code?: string;
}

/**
 * What a key does to the deck. `inputEmpty` is the composer's input; `inDeck`
 * is focus inside the deck itself (a button). Anything that returns null is
 * the composer's own key: typing, sending, its menus.
 */
export function deckKeyAction(
  event: DeckKey,
  state: { prompt: ComposerPrompt | null; collapsed: boolean; inputEmpty: boolean; inDeck: boolean; busy: boolean },
): DeckKeyAction {
  const { prompt, collapsed, inputEmpty, inDeck, busy } = state;
  if (!prompt) return null;
  const mod = !!(event.metaKey || event.ctrlKey);
  const quiet = inputEmpty || inDeck;
  if (collapsed) {
    return mod && event.key === 'ArrowDown' ? { type: 'expand' } : null;
  }
  if (mod && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
    return { type: 'page', delta: event.key === 'ArrowDown' ? 1 : -1 };
  }
  // A compose prompt's flow owns Enter (continue / confirm), Esc (back to the
  // draft) and every typed key; the deck only pages.
  if (prompt.kind === 'compose') return null;
  if (event.key === 'Escape' && quiet) return { type: 'collapse' };
  if (mod || event.shiftKey) return null;
  const typed = takesTypedAnswer(prompt);
  // J / K page only where letters are not the answer being typed.
  const pager = quiet && !event.altKey && (!typed || inDeck);
  if (pager && (event.key === 'j' || event.key === 'J')) return { type: 'page', delta: 1 };
  if (pager && (event.key === 'k' || event.key === 'K')) return { type: 'page', delta: -1 };
  if (busy || prompt.readOnlyReason) return null;
  const options = promptOptions(prompt);
  if (event.key === 'Enter' && quiet && !inDeck) {
    const fallback = defaultOption(prompt);
    return fallback ? { type: 'default', optionId: fallback.id } : null;
  }
  // Text / number prompts: bare keys are what you type, so options take Alt.
  if (typed ? !event.altKey : (!quiet || event.altKey)) return null;
  const key = altDigit(event) ?? event.key.toLowerCase();
  const index = options.findIndex((o, i) => optionKey(o, i) === key);
  const option = index >= 0 ? options[index]! : null;
  return option && !option.disabledReason ? { type: 'pick', optionId: option.id } : null;
}

/** macOS Alt+digit types a symbol; read the physical digit from `code` when given. */
function altDigit(event: DeckKey): string | null {
  if (!event.altKey) return null;
  const m = event.code ? /^Digit([1-9])$/.exec(event.code) : null;
  return m ? m[1]! : null;
}
