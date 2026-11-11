// ComposerPromptDeck (2.444.0) — human-in-the-loop prompts in the docked
// composer, one at a time, answered from the keyboard.
//
//   ┌ Prepare job · Fix token refresh                       2 of 3  ‹ ›  Hide ┐
//   │ ━━━━━━━━━━ ━━━━━━━━━━ ──────────                                         │
//   │ Item  AUTH-12      Codebase  org/auth      Model  Sonnet 4.5             │
//   │ Run cap  No cap    Forecast  $0.40–$1.10   Envelope  $28.00 left         │
//   │ Dispatch with these settings?                                           │
//   │ [1 Dispatch] [2 Change model] [3 Change cap] [4 Edit instruction]       │
//   │ 1–4 choose · Enter Dispatch · ⌘↓ next · Esc hide                        │
//   └─────────────────────────────────────────────────────────────────────────┘
//   [ the composer's own input ]
//
// A page that needs a decision does not open a modal form: it hands the docked
// composer a queue of prompts (`ConversationComposer prompts`, or this deck in
// any composer's `above`). Each prompt is a header card of facts the page
// already knows, one question and the answers it takes. Text and number
// prompts are answered in the composer's own input (Enter sends the answer,
// not a message). Answered prompts drop off with an inline receipt, announced
// in a live region; an answer the host refuses (`{ error }`) stays on the card.
// The keys are in `composerPromptModel.ts` (`deckKeyAction`).
//
// Routing (2.482.0): an answer may resolve `{ next }` and the follow-up takes
// the card in place (no receipt; Back returns to the question). A prompt may
// carry a `path` (`DecisionPath`, "Choose → Draft request → Confirm → Done")
// and a `kind: 'compose'` prompt draws `ComposerConfirmFlow` — a prefilled
// message, its review and its done state — inside the same card, owning Enter,
// Esc and every typed key; the deck only pages.
//
// Back (2.510.0): a prompt's `back` ({ label, onBack, disabledReason }) draws
// a ghost Back in the card header — on a one-prompt deck too, where there is
// no pager — and a `{ next }` follow-up without one gets a Back to the
// question it followed. Alt+Backspace takes it while the input is empty.
//
// Prompt presentation (2.512.0): under a composer's `presentation="prompt"`
// (read from `ComposerPresentationContext`) or the deck's own
// `presentation="prompt"`, the answers are plain library Buttons — no
// numbered keycaps — and there is no key-hint row; the keys still work. Facts
// sit one per line, each clamped to one line with the full text on hover.
// A choice / confirm card with `onDirection` takes the composer's typed words
// as a direction (`answerDirection`): typing under a confirm card re-proposes.
//
// Markers: `data-composer-prompt-deck` on the deck (`expanded` | `collapsed`),
// `data-composer-prompt` (the id) and `data-composer-prompt-kind` on the card,
// `data-composer-prompt-option` on each answer — the DOM audit counts a page's
// decisions by these, so a page that asks in a modal form instead is findable.

import { useCallback, useContext, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { Textarea } from '../forms/Textarea';
import { Inline, Stack } from '../ui/Stack';
import { Text } from '../shared/Text';
import { DecisionPath } from '../shared/DecisionPath';
import { ComposerConfirmFlow, type ComposerConfirmResult } from './ComposerConfirmFlow';
import { ComposerPresentationContext, type ComposerPresentation } from './composerPresentation';
import {
  activeIndex,
  answerForOption,
  deckKeyAction,
  defaultOption,
  followUpParent,
  livePromptIds,
  optionKey,
  pageKeypadTarget,
  parseTypedAnswer,
  pendingPrompts,
  promptOptions,
  receiptFor,
  takesDirection,
  takesTypedAnswer,
  type ComposerPrompt,
  type ComposerPromptAnswer,
  type ComposerPromptField,
  type ComposerPromptFollowUps,
  type ComposerPromptResult,
} from './composerPromptModel';

/** The composer input the deck reads and steers. */
export interface ComposerPromptInput {
  /** True when the input holds no text. */
  isEmpty: () => boolean;
  /** True when `node` is the input or inside it. */
  contains: (node: Node | null) => boolean;
  focus: () => void;
}

export interface ComposerPromptDeckState {
  /** Prompts still waiting, in the host's order. */
  pending: readonly ComposerPrompt[];
  /** The prompt on screen. */
  active: ComposerPrompt | null;
  /** Its 0-based position in `pending`. */
  index: number;
  collapsed: boolean;
  /** An answer is being taken. */
  busy: boolean;
  /** The refusal on the active prompt, if its last answer was refused. */
  error: string | null;
  /** The last answered prompt's receipt. */
  receipt: string | null;
  /** Something to draw: a waiting prompt or a receipt. */
  visible: boolean;
  /** The composer's input is the active prompt's answer field. */
  typed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  page: (delta: 1 | -1) => void;
  pick: (optionId: string) => Promise<boolean>;
  /** Answer the active text / number prompt with typed words. True when taken. */
  answerTyped: (raw: string) => Promise<boolean>;
  /** The open card takes typed words as a direction (`ComposerPrompt.onDirection`). Since 2.512.0. */
  direction: boolean;
  /**
   * Hand typed words under an open choice / confirm card to its
   * `onDirection` (2.512.0). True when the host took them (the input
   * clears); false — the words stay — on a refusal, an empty text, or a card
   * without `onDirection` (which shows what the card takes as its error).
   */
  answerDirection: (raw: string) => Promise<boolean>;
  /**
   * Confirm the active compose prompt with its edited message (2.482.0). The
   * host's `{ error }` comes back for the flow to show; ok leaves the prompt on
   * screen in its done state until `finish`.
   */
  answerCompose: (message: string) => Promise<ComposerConfirmResult>;
  /** The active prompt followed an answered question (`{ next }`), so `back` has somewhere to go. */
  isFollowUp: boolean;
  /** Return to the question the active follow-up came from. False when it is a root prompt. */
  back: () => boolean;
  /**
   * The card header's Back (2.510.0): the active prompt's own `back`, else a
   * follow-up's return to its question (not a compose follow-up: its flow
   * has that Back). Null when the card has none.
   */
  backControl: { label: string; disabledReason?: string } | null;
  /**
   * Take the Back: the prompt's `onBack` (busy while it runs; a rejection is
   * the card's error), else `back()`. True when it ran.
   */
  goBack: () => Promise<boolean>;
  /** Drop the active prompt after its done state, with no receipt. */
  finish: () => void;
  dismissReceipt: () => void;
}

const NO_PROMPTS: readonly ComposerPrompt[] = [];
const NO_FOLLOW_UPS: ComposerPromptFollowUps = {};

function isError(result: ComposerPromptResult): result is { error: string } {
  return !!result && typeof result === 'object' && 'error' in result && typeof result.error === 'string';
}

function isNext(result: ComposerPromptResult): result is { next: ComposerPrompt } {
  return !!result && typeof result === 'object' && 'next' in result && !!result.next && typeof result.next === 'object';
}

/** The deck's state over the host's queue. Hosts that render the deck themselves call this once. */
export interface ComposerPromptDeckOptions {
  /**
   * The current context key (2.504.0). Prompts whose own `scope` differs are
   * dropped, and changing the scope resets the deck — the open card, a
   * collapsed state, the last receipt and errors — so navigating to another
   * context never leaves the previous one's card on screen.
   */
  scope?: string | null;
}

/** The prompts that belong to `scope`: unscoped prompts, and prompts scoped to it. Without a scope, all. */
export function promptsInScope(prompts: readonly ComposerPrompt[], scope: string | null | undefined): readonly ComposerPrompt[] {
  if (scope == null) return prompts;
  return prompts.every((p) => p.scope == null || p.scope === scope) ? prompts : prompts.filter((p) => p.scope == null || p.scope === scope);
}

export function useComposerPromptDeck(prompts: readonly ComposerPrompt[] | null | undefined, options: ComposerPromptDeckOptions = {}): ComposerPromptDeckState {
  const scope = options.scope;
  const queue = useMemo(() => promptsInScope(prompts ?? NO_PROMPTS, scope), [prompts, scope]);
  const [answered, setAnswered] = useState<ReadonlySet<string>>(() => new Set());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [receipt, setReceipt] = useState<string | null>(null);
  const [followUps, setFollowUps] = useState<ComposerPromptFollowUps>(NO_FOLLOW_UPS);
  const followUpsRef = useRef(followUps);
  followUpsRef.current = followUps;
  // A new context is a fresh deck: nothing from the last one stays on screen.
  const lastScope = useRef(scope);
  useEffect(() => {
    if (lastScope.current === scope) return;
    lastScope.current = scope;
    setActiveId(null);
    setCollapsed(false);
    setReceipt(null);
    setErrors({});
  }, [scope]);
  const pending = useMemo(() => pendingPrompts(queue, answered, followUps), [queue, answered, followUps]);
  const index = activeIndex(pending, activeId);
  const active = index >= 0 ? pending[index]! : null;
  const busy = busyId != null;
  const busyRef = useRef(false);

  // Forget answers to (and follow-ups of) prompts the host has dropped, so
  // neither set grows forever.
  const ids = queue.map((p) => p.id).join('\u0000');
  useEffect(() => {
    const live = livePromptIds(queue, followUpsRef.current);
    setAnswered((prev) => {
      const next = new Set([...prev].filter((id) => live.has(id)));
      return next.size === prev.size ? prev : next;
    });
    setFollowUps((prev) => {
      const kept = Object.entries(prev).filter(([id]) => live.has(id));
      return kept.length === Object.keys(prev).length ? prev : Object.fromEntries(kept);
    });
  }, [ids]); // eslint-disable-line react-hooks/exhaustive-deps

  // A new question reopens a collapsed deck: hiding answered nothing, so a
  // fresh prompt (a gate's confirm) must not stay out of sight.
  const firstId = pending[0]?.id ?? null;
  const seen = useRef(new Set<string>());
  useEffect(() => {
    const fresh = pending.some((p) => !seen.current.has(p.id));
    for (const p of pending) seen.current.add(p.id);
    if (fresh) setCollapsed(false);
  }, [firstId, pending]);

  const answer = useCallback(async (prompt: ComposerPrompt, value: ComposerPromptAnswer): Promise<boolean> => {
    if (busyRef.current || prompt.readOnlyReason || prompt.disabledReason) return false;
    busyRef.current = true;
    setBusyId(prompt.id);
    setErrors((prev) => { if (!(prompt.id in prev)) return prev; const { [prompt.id]: _gone, ...rest } = prev; return rest; });
    let result: ComposerPromptResult;
    try {
      result = await prompt.onAnswer(value);
    } catch (err) {
      result = { error: err instanceof Error && err.message ? err.message : 'That answer could not be taken. Try again.' };
    } finally {
      busyRef.current = false;
      setBusyId(null);
    }
    if (isError(result)) {
      setErrors((prev) => ({ ...prev, [prompt.id]: result.error }));
      return false;
    }
    if (isNext(result)) {
      // The follow-up takes the card in place: no receipt, Back returns here.
      setFollowUps((prev) => ({ ...prev, [prompt.id]: result.next }));
      setAnswered((prev) => new Set(prev).add(prompt.id));
      setActiveId(null);
      return true;
    }
    setAnswered((prev) => new Set(prev).add(prompt.id));
    setActiveId(null);
    setReceipt(result && 'receipt' in result ? result.receipt : receiptFor(prompt, value));
    return true;
  }, []);

  // A compose prompt's confirm: the flow shows the error or its done state
  // itself, so the deck neither records the error nor drops the prompt here.
  const answerCompose = useCallback(async (message: string): Promise<ComposerConfirmResult> => {
    const prompt = active;
    if (!prompt || prompt.kind !== 'compose' || prompt.readOnlyReason) return { error: 'This question takes no message.' };
    if (busyRef.current) return { error: 'Still working on the last answer.' };
    busyRef.current = true;
    setBusyId(prompt.id);
    let result: ComposerPromptResult;
    try {
      result = await prompt.onAnswer({ kind: 'compose', message });
    } catch (err) {
      result = { error: err instanceof Error && err.message ? err.message : 'That could not be confirmed. Try again.' };
    } finally {
      busyRef.current = false;
      setBusyId(null);
    }
    if (isError(result)) return result;
    return result && 'receipt' in result ? { receipt: result.receipt } : undefined;
  }, [active]);

  const parentId = active ? followUpParent(active.id, followUps) : null;
  const back = useCallback(() => {
    if (!active || parentId == null) return false;
    const child = active.id;
    setFollowUps((prev) => { const { [parentId]: _gone, ...rest } = prev; return rest; });
    setAnswered((prev) => { const next = new Set(prev); next.delete(parentId); next.delete(child); return next; });
    setActiveId(parentId);
    return true;
  }, [active, parentId]);

  const ownBack = active?.back;
  const backControl = ownBack
    ? { label: ownBack.label || 'Back', ...(ownBack.disabledReason ? { disabledReason: ownBack.disabledReason } : {}) }
    : parentId != null && active?.kind !== 'compose' ? { label: 'Back' } : null;
  const goBack = useCallback(async () => {
    if (!active) return false;
    const own = active.back;
    if (!own) return active.kind !== 'compose' && back();
    if (own.disabledReason || busyRef.current) return false;
    busyRef.current = true;
    setBusyId(active.id);
    setErrors((prev) => { if (!(active.id in prev)) return prev; const { [active.id]: _gone, ...rest } = prev; return rest; });
    try {
      await own.onBack();
      return true;
    } catch (err) {
      const message = err instanceof Error && err.message ? err.message : 'Could not go back. Try again.';
      setErrors((prev) => ({ ...prev, [active.id]: message }));
      return false;
    } finally {
      busyRef.current = false;
      setBusyId(null);
    }
  }, [active, back]);

  const finish = useCallback(() => {
    if (!active) return;
    setAnswered((prev) => new Set(prev).add(active.id));
    setActiveId(null);
  }, [active]);

  const pick = useCallback(async (optionId: string) => {
    if (!active) return false;
    const option = promptOptions(active).find((o) => o.id === optionId);
    if (!option || option.disabledReason) return false;
    return answer(active, answerForOption(active, option));
  }, [active, answer]);

  const answerTyped = useCallback(async (raw: string) => {
    if (!active || !takesTypedAnswer(active)) return false;
    const parsed = parseTypedAnswer(active, raw);
    if ('error' in parsed) {
      setErrors((prev) => ({ ...prev, [active.id]: parsed.error }));
      return false;
    }
    return answer(active, parsed.answer);
  }, [active, answer]);

  const answerDirection = useCallback(async (raw: string) => {
    const prompt = active;
    const text = raw.trim();
    if (!prompt || collapsed || !text || prompt.readOnlyReason || prompt.disabledReason || (prompt.kind !== 'choice' && prompt.kind !== 'confirm')) return false;
    if (!prompt.onDirection) {
      const fallback = defaultOption(prompt);
      const message = fallback ? `Choose an answer, or press Enter on an empty box for ${fallback.label}.` : 'Choose one of the answers.';
      setErrors((prev) => ({ ...prev, [prompt.id]: message }));
      return false;
    }
    if (busyRef.current) return false;
    busyRef.current = true;
    setBusyId(prompt.id);
    setErrors((prev) => { if (!(prompt.id in prev)) return prev; const { [prompt.id]: _gone, ...rest } = prev; return rest; });
    let result: ComposerPromptResult;
    try {
      result = await prompt.onDirection(text);
    } catch (err) {
      result = { error: err instanceof Error && err.message ? err.message : 'That direction could not be taken. Try again.' };
    } finally {
      busyRef.current = false;
      setBusyId(null);
    }
    if (isError(result)) {
      setErrors((prev) => ({ ...prev, [prompt.id]: result.error }));
      return false;
    }
    if (isNext(result)) {
      setFollowUps((prev) => ({ ...prev, [prompt.id]: result.next }));
      setAnswered((prev) => new Set(prev).add(prompt.id));
      setActiveId(null);
      return true;
    }
    // Nothing (or a receipt): the card stays; the host re-proposes by
    // replacing the prompt in its queue.
    if (result && 'receipt' in result) setReceipt(result.receipt);
    return true;
  }, [active, collapsed]);

  const page = useCallback((delta: 1 | -1) => {
    if (!pending.length) return;
    const next = (index + delta + pending.length) % pending.length;
    setActiveId(pending[next]!.id);
  }, [pending, index]);

  return {
    pending,
    active,
    index,
    collapsed,
    busy,
    error: active ? errors[active.id] ?? null : null,
    receipt,
    visible: pending.length > 0 || receipt != null,
    typed: !collapsed && takesTypedAnswer(active),
    setCollapsed,
    page,
    pick,
    answerTyped,
    direction: !collapsed && takesDirection(active),
    answerDirection,
    answerCompose,
    isFollowUp: parentId != null,
    back,
    backControl,
    goBack,
    finish,
    dismissReceipt: () => setReceipt(null),
  };
}

export interface ComposerPromptDeckProps {
  /** From `useComposerPromptDeck`; or pass `prompts` and the deck keeps its own state. */
  deck?: ComposerPromptDeckState;
  prompts?: readonly ComposerPrompt[];
  /** With `prompts`: the current context key; see `ComposerPromptDeckOptions.scope`. Since 2.504.0. */
  scope?: string | null;
  /** External answer input, when embedded above an existing editor. Without one, text/number prompts own a plain answer field; choices own focus. */
  input?: ComposerPromptInput | null;
  /**
   * Why no prompt in this deck can be answered right now (2.515.6), over each
   * prompt's own `disabledReason`: the answers and Answer stay drawn but off,
   * with the reason as their tooltip, their `aria-describedby` and one line
   * under the card. Paging, Hide and Back still work.
   */
  submitDisabledReason?: string | null;
  /**
   * `card` (default): a bordered card of its own, for a composer's `above`.
   * `inset`: the composer card's first section (`ConversationComposer
   * prompts`, `RichChatComposer header`) — no border of its own, a hairline
   * under it, the input below it in the same card. Since 2.446.0.
   */
  variant?: 'card' | 'inset';
  /**
   * `card` (default): numbered keycaps on the answers and a key-hint row.
   * `prompt` (2.512.0): plain Buttons and no hint row (the keys still work),
   * facts one per line clamped to one line. Defaults to the enclosing
   * composer's presentation (`ComposerPresentationContext`), else `card`.
   * `data-presentation` on the deck root.
   */
  presentation?: ComposerPresentation;
  className?: string;
  'data-testid'?: string;
}

const FIELD_TONE: Record<NonNullable<ComposerPromptField['tone']>, string> = {
  neutral: 'text-text-primary',
  success: 'text-success-fg',
  warning: 'text-warning-fg',
  danger: 'text-danger-fg',
  info: 'text-info-fg',
};

function Keycap({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-surface px-1 font-mono text-[11px] font-normal leading-none text-text-secondary">
      {children}
    </kbd>
  );
}

function modKey(): string {
  if (typeof navigator === 'undefined') return 'Ctrl';
  return /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? '⌘' : 'Ctrl+';
}

// The deck never takes more than this of the screen, and the content column
// above keeps the rest. Past it only the facts list scrolls: the path, title
// and question navigation above it and the question, answers and key hints
// below it keep their size, so focusing an answer never scrolls the header
// out of view. The card itself scrolls only when those alone are too tall.
const DECK_MAX = 'max-h-[min(40vh,24rem)] overflow-y-auto overscroll-contain [&>:not(dl)]:shrink-0';
const FIELDS_SCROLL = 'min-h-0 overflow-y-auto overscroll-contain';

export function ComposerPromptDeck({ deck: deckProp, prompts, scope, input = null, submitDisabledReason, variant = 'card', presentation: presentationProp, className, 'data-testid': testId = 'composer-prompt-deck' }: ComposerPromptDeckProps) {
  const inset = variant === 'inset';
  const enclosing = useContext(ComposerPresentationContext);
  const presentation: ComposerPresentation = presentationProp ?? enclosing ?? 'card';
  const plain = presentation === 'prompt';
  const own = useComposerPromptDeck(deckProp ? null : prompts, { scope });
  const deck = deckProp ?? own;
  const root = useRef<HTMLElement | null>(null);
  const baseId = useId();
  const answerRef = useRef<HTMLTextAreaElement | null>(null);
  const [draft, setDraft] = useState({ id: '', text: '' });
  const { active, pending, index, collapsed, busy, error, receipt } = deck;

  const answerText = active?.inputDraft?.value ?? (draft.id === active?.id ? draft.text : '');
  const inlineAnswer = !input && deck.typed && !active?.readOnlyReason;
  // Why the answers are off (2.515.6): the deck's reason, else the prompt's.
  const blockedBy = active && !active.readOnlyReason ? (submitDisabledReason?.trim() || active.disabledReason?.trim() || null) : null;
  const reasonId = `${baseId}-disabled-reason`;
  const submitAnswer = async () => {
    if (blockedBy) return;
    const answeredId = active?.id;
    if (await deck.answerTyped(answerText)) {
      setDraft(current => current.id === answeredId ? { id: '', text: '' } : current);
    }
  };

  // ── keys ── captured at the document so they reach the deck before the
  // editor's own Enter / Escape, but only from the deck or its composer input.
  const state = useRef({ deck, input, blockedBy });
  state.current = { deck, input, blockedBy };
  // A new question puts the caret where its keyboard hints apply. Do not
  // interrupt another editor or take focus from a compose prompt's own flow.
  useEffect(() => {
    if (!active || collapsed || active.readOnlyReason || active.kind === 'compose') return;
    const frame = requestAnimationFrame(() => {
      const current = document.activeElement;
      const otherEditor = current?.closest('input,textarea,select,[contenteditable="true"]');
      const nextInput = state.current.input;
      if (otherEditor && !root.current?.contains(current) && !nextInput?.contains(current)) return;
      if (nextInput) nextInput.focus();
      else if (answerRef.current) answerRef.current.focus();
      else (root.current?.querySelector<HTMLElement>('[data-default="true"]:not(:disabled)') ?? root.current?.querySelector<HTMLElement>('[data-composer-prompt-option]:not(:disabled)'))?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [active?.id, collapsed, active?.kind, active?.readOnlyReason]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing || event.repeat) return;
      const { deck: d, input: i, blockedBy: blocked } = state.current;
      const target = event.target as Node | null;
      const inDeck = !!root.current && !!target && root.current.contains(target);
      const inInput = !!i && i.contains(target);
      const inAnswer = !!target && answerRef.current?.contains(target);
      // `keypad: 'page'` (2.515.2): an open card's option keys also reach it from the page body, never from a field.
      const fromPage = !inDeck && !inInput && d.active?.keypad === 'page' && !d.collapsed && pageKeypadTarget(event.target);
      if (!inDeck && !inInput && !fromPage) return;
      const action = deckKeyAction(
        { key: event.key, altKey: event.altKey, ctrlKey: event.ctrlKey, metaKey: event.metaKey, shiftKey: event.shiftKey, code: event.code },
        fromPage
          ? { prompt: d.active, collapsed: d.collapsed, inputEmpty: true, inDeck: true, busy: d.busy, canBack: false }
          : { prompt: d.active, collapsed: d.collapsed, inputEmpty: i ? i.isEmpty() : !answerRef.current?.value.trim(), inDeck: inDeck && !inAnswer, busy: d.busy, canBack: !!d.backControl && !d.backControl.disabledReason },
      );
      if (!action || (fromPage && action.type !== 'pick') || (blocked && action.type === 'pick')) return;
      event.preventDefault();
      event.stopPropagation();
      if (action.type === 'page') d.page(action.delta);
      else if (action.type === 'back') void d.goBack();
      else if (action.type === 'collapse') { d.setCollapsed(true); i?.focus(); }
      else if (action.type === 'expand') d.setCollapsed(false);
      else void d.pick(action.optionId).then((ok) => { if (ok) i?.focus(); });
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, []);

  if (!deck.visible) return null;
  const mod = modKey();
  const count = pending.length;

  const receiptRow = receipt ? (
    // One line under the card: a long answer is truncated here (its full text
    // is the title and the live region's), never a second copy of the answer.
    <Inline gap="xs" align="center" wrap={false} className={cn('min-w-0', inset && !collapsed && active && 'px-3 pb-2')} data-testid={`${testId}-receipt`}>
      <Text as="p" size="xs" tone="secondary" role="status" className="min-w-0 flex-1 truncate" title={`Answered · ${receipt}`}>
        {`Answered · ${receipt}`}
      </Text>
      <Button variant="link" size="sm" onClick={deck.dismissReceipt} data-composer-readonly-allow="Dismisses the local answer receipt without changing a record or submitting an answer">Dismiss</Button>
    </Inline>
  ) : null;

  if (!active || collapsed) {
    return (
      <Stack gap="xs" className={cn('min-w-0', inset && 'border-b border-border px-3 py-1.5', className)} data-composer-prompt-deck={active ? 'collapsed' : 'answered'} data-deck-variant={variant} data-presentation={presentation} data-testid={testId} ref={root}>
        {active && (
          <Inline gap="sm" align="center" wrap className={cn('min-w-0', !inset && 'rounded-md border border-border bg-surface-secondary px-3 py-1.5')}>
            <Text size="xs" tone="secondary" wrap className="min-w-0 flex-1">
              {count === 1 ? `1 question waiting · ${active.title}` : `${count} questions waiting · ${active.title}`}
            </Text>
            <Button variant="link" size="sm" onClick={() => deck.setCollapsed(false)} aria-keyshortcuts="Control+ArrowDown Meta+ArrowDown" data-composer-readonly-allow="Shows the prompt's existing facts without changing a record or submitting an answer" data-testid={`${testId}-show`}>
              Show
            </Button>
            {!plain && <Keycap>{`${mod}↓`}</Keycap>}
          </Inline>
        )}
        {receiptRow}
      </Stack>
    );
  }

  const options = promptOptions(active);
  const typed = takesTypedAnswer(active);
  const compose = active.kind === 'compose' && !active.readOnlyReason;
  const fallback = defaultOption(active);
  const titleId = `${baseId}-title`;
  const questionId = `${baseId}-question`;
  const optionKeys = options.map((o, i) => optionKey(o, i));
  const keyHint = [
    options.length ? `${typed ? 'Alt+' : ''}${optionKeys.filter(Boolean).length > 1 ? `${optionKeys[0]}–${optionKeys[optionKeys.length - 1]}` : optionKeys[0] ?? ''} choose` : null,
    typed ? 'type an answer · Enter answer' : fallback ? `Enter ${fallback.label}` : null,
    count > 1 ? `${mod}↓ next` : null,
    deck.backControl && !deck.backControl.disabledReason ? `Alt+⌫ ${deck.backControl.label}` : null,
    'Esc hide',
  ].filter(Boolean).join(' · ');

  return (
    <Stack gap="xs" className={cn('min-w-0', inset && 'border-b border-border', className)} data-composer-prompt-deck="expanded" data-composer-dialogue={input ? undefined : active.kind} data-deck-variant={variant} data-presentation={presentation} data-testid={testId} ref={root}>
      <section
        data-ui-part=""
        role="group"
        aria-labelledby={titleId}
        aria-describedby={questionId}
        aria-busy={busy || undefined}
        className={cn('flex min-w-0 flex-col gap-2 px-3 py-2.5', DECK_MAX, !inset && 'rounded-lg border border-border bg-surface')}
        data-composer-prompt={active.id}
        data-composer-prompt-kind={active.kind}
        data-testid={`${testId}-card`}
      >
        {active.path && !compose && <DecisionPath steps={active.path.steps} current={active.path.current} data-testid={`${testId}-path`} />}
        <Inline gap="sm" align="center" wrap={false} className="min-w-0">
          <Stack gap="none" className="min-w-0 flex-1">
            {active.eyebrow && <Text size="xs" tone="tertiary" className="truncate">{active.eyebrow}</Text>}
            <Text as="p" size="sm" weight="semibold" tone="primary" className="min-w-0 truncate" id={titleId} title={active.title}>{active.title}</Text>
          </Stack>
          {deck.backControl && (
            <Button variant="ghost" size="sm" className="shrink-0"
              aria-keyshortcuts="Alt+Backspace"
              disabled={busy || !!deck.backControl.disabledReason}
              title={deck.backControl.disabledReason}
              onClick={() => { void deck.goBack(); }}
              data-composer-prompt-back=""
              data-composer-readonly-allow="Returns to the previous step without submitting an answer"
              data-testid={`${testId}-back`}>
              {deck.backControl.label}
            </Button>
          )}
          {count > 1 && (
            <Inline gap="xs" align="center" wrap={false} className="shrink-0">
              <Text size="xs" tone="secondary" tabular data-testid={`${testId}-position`}>{`${index + 1} of ${count}`}</Text>
              <Button variant="ghost" size="sm" aria-label="Previous question" aria-keyshortcuts="Control+ArrowUp Meta+ArrowUp" onClick={() => deck.page(-1)} data-composer-readonly-allow="Reads the previous prompt without changing a record or submitting an answer" data-testid={`${testId}-previous`}>‹</Button>
              <Button variant="ghost" size="sm" aria-label="Next question" aria-keyshortcuts="Control+ArrowDown Meta+ArrowDown" onClick={() => deck.page(1)} data-composer-readonly-allow="Reads the next prompt without changing a record or submitting an answer" data-testid={`${testId}-next`}>›</Button>
            </Inline>
          )}
          <Button variant="ghost" size="sm" className="shrink-0" aria-keyshortcuts="Escape" onClick={() => { deck.setCollapsed(true); input?.focus(); }} data-composer-readonly-allow="Hides the prompt's existing facts without changing a record or submitting an answer" data-testid={`${testId}-hide`}>Hide</Button>
        </Inline>

        {count > 1 && (
          <Inline gap="xs" wrap={false} aria-hidden className="min-w-0" data-testid={`${testId}-progress`}>
            {pending.map((p, i) => (
              <Stack key={p.id} gap="none" className={cn('h-1 min-w-0 flex-1 rounded-full', i === index ? 'bg-primary' : 'bg-border')} />
            ))}
          </Inline>
        )}

        {active.fields && active.fields.length > 0 && plain && (
          // Prompt presentation: one fact per line, never a paragraph — a long
          // value is clamped to one line and keeps its full text on hover.
          <dl className="m-0 flex min-w-0 flex-col gap-0.5" data-testid={`${testId}-fields`}>
            {active.fields.map((field, i) => (
              <div key={`${field.label}-${i}`} className="flex min-w-0 items-baseline gap-2" data-composer-prompt-field="">
                <dt className="m-0 shrink-0 text-xs font-normal text-text-tertiary">{field.label}</dt>
                <dd className={cn('m-0 min-w-0 flex-1 truncate text-xs font-normal', FIELD_TONE[field.tone ?? 'neutral'], field.mono && 'tabular-nums')}
                  {...(typeof field.value === 'string' || typeof field.value === 'number' ? { title: String(field.value) } : {})}>{field.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {active.fields && active.fields.length > 0 && !plain && (
          // Facts flow in a wrapping row, each as wide as its value (a repo, a
          // forecast range) up to the card: nothing is clipped, a long value wraps.
          <dl className={cn('m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-1.5', FIELDS_SCROLL)} data-testid={`${testId}-fields`}>
            {active.fields.map((field, i) => (
              <div key={`${field.label}-${i}`} className="flex min-w-0 max-w-full flex-col">
                <dt className="m-0 text-xs font-normal text-text-tertiary">{field.label}</dt>
                <dd className={cn('m-0 min-w-0 break-words text-xs font-normal', FIELD_TONE[field.tone ?? 'neutral'], field.mono && 'tabular-nums')}
                  {...(typeof field.value === 'string' ? { title: field.value } : {})}>{field.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <Text as="p" size="sm" tone="primary" wrap id={questionId} className="min-w-0">{active.question}</Text>

        {active.readOnlyReason ? (
          <Text as="p" size="xs" tone="secondary" wrap data-testid={`${testId}-read-only`}>{active.readOnlyReason}</Text>
        ) : compose ? (
          // The flow owns the rest of the card: the path advances with its
          // stage, Back from a follow-up returns to the question it followed,
          // the done state's action drops the prompt.
          <ComposerConfirmFlow
            key={active.id}
            recipient={active.compose?.recipient}
            defaultMessage={active.compose?.initialMessage}
            messageLabel={active.compose?.messageLabel}
            placeholder={active.compose?.placeholder}
            reviewTitle={active.compose?.reviewTitle}
            note={active.compose?.note}
            doneTitle={active.compose?.doneTitle}
            doneMessage={active.compose?.doneMessage}
            continueLabel={active.compose?.continueLabel}
            confirmLabel={active.compose?.confirmLabel}
            backLabel={active.compose?.backLabel}
            doneActionLabel={active.compose?.doneActionLabel}
            path={active.path}
            onConfirm={(message) => deck.answerCompose(message)}
            onCancel={deck.isFollowUp ? () => { deck.back(); } : active.compose?.onCancel ? () => { active.compose?.onCancel?.(); deck.finish(); } : undefined}
            onDone={() => { deck.finish(); input?.focus(); }}
            data-testid={`${testId}-compose`}
          />
        ) : options.length > 0 && (
          <Inline gap="xs" wrap className="min-w-0" role="list" aria-label="Answers">
            {options.map((option, i) => {
              const key = optionKeys[i];
              const shortcut = key ? `${typed ? 'Alt+' : ''}${key}` : undefined;
              return (
                <Stack key={option.id} gap="none" role="listitem" className="min-w-0">
                  <Button
                    size="sm"
                    variant={option.emphasis === 'primary' ? 'primary' : option.emphasis === 'danger' ? 'danger' : 'secondary'}
                    disabled={busy || !!option.disabledReason || !!blockedBy}
                    title={option.disabledReason ?? blockedBy ?? option.hint}
                    aria-keyshortcuts={shortcut}
                    aria-describedby={[option.hint && `${baseId}-hint-${i}`, blockedBy && reasonId].filter(Boolean).join(' ') || undefined}
                    onClick={() => { void deck.pick(option.id).then((ok) => { if (ok) input?.focus(); }); }}
                    data-composer-prompt-option={option.id}
                    data-default={fallback?.id === option.id || undefined}
                    data-testid={`${testId}-option-${option.id}`}
                  >
                    {shortcut && !plain && <Keycap>{shortcut}</Keycap>}
                    {option.label}
                  </Button>
                  {option.hint && <Text size="xs" tone="tertiary" className="hidden" id={`${baseId}-hint-${i}`}>{option.hint}</Text>}
                </Stack>
              );
            })}
          </Inline>
        )}

        {inlineAnswer && (
          <Stack gap="sm" className="min-w-0">
            <Textarea ref={answerRef} aria-label={active.title} placeholder={active.placeholder ?? 'Your answer'}
              value={answerText} disabled={busy || !!blockedBy} autoResize minRows={active.kind === 'number' ? 1 : 2}
              inputMode={active.kind === 'number' ? 'decimal' : undefined}
              onChange={(event) => active.inputDraft ? active.inputDraft.onChange(event.target.value) : setDraft({ id: active.id, text: event.target.value })}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && !event.repeat) {
                  event.preventDefault(); if (!busy && !blockedBy) void submitAnswer();
                }
              }} data-testid={`${testId}-answer`} />
            {/* The reason rides Answer's own row, so a docked card grows no taller. */}
            <Inline gap="sm" align="center" justify={blockedBy ? 'between' : 'end'} wrap={false} className="min-w-0">
              {blockedBy && <Text as="p" size="xs" tone="secondary" id={reasonId} title={blockedBy} className="min-w-0" data-testid={`${testId}-disabled-reason`}><span className="truncate">{blockedBy}</span></Text>}
              <Button variant="primary" size="sm" className="shrink-0" disabled={busy || !!blockedBy || !answerText.trim()}
                {...(blockedBy ? { title: blockedBy, 'aria-describedby': reasonId } : {})}
                onClick={() => { void submitAnswer(); }} data-testid={`${testId}-submit`}>Answer</Button>
            </Inline>
          </Stack>
        )}

        {blockedBy && !compose && !inlineAnswer && <Text as="p" size="xs" tone="secondary" wrap id={reasonId} className="min-w-0" data-testid={`${testId}-disabled-reason`}>{blockedBy}</Text>}
        {error && !compose && <Text as="p" size="xs" wrap role="alert" className="text-danger-fg" data-testid={`${testId}-error`}>{error}</Text>}
        {busy && !compose && <Text as="p" size="xs" tone="secondary" role="status" data-testid={`${testId}-busy`}>Working…</Text>}
        {!plain && !active.readOnlyReason && !compose && <Text as="p" size="xs" tone="tertiary" wrap className="min-w-0" data-testid={`${testId}-keys`}>{keyHint}</Text>}
      </section>
      {receiptRow}
    </Stack>
  );
}

export default ComposerPromptDeck;
