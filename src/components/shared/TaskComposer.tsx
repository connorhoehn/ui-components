// TaskComposer — a title, a prompt, and somewhere to start.
//
// The composite for "tell an agent what to do". The interesting part is not
// the two fields; it is the strip of suggestions above them.
//
// A bare prompt box is correct and general and the least approachable thing on
// a page: it asks you to already know what to type, while the surface around
// it is full of context the app has and the box does not. Suggestions close
// that gap without taking the general case away — anything offered can be
// ignored, and the fields stay free-typed.
//
// The host supplies the suggestions. Deciding WHAT is worth suggesting is
// domain work (which initiative, whose sprint, what is blocked) and belongs to
// the app; laying them out, wiring "use this" to the fields, and getting the
// keyboard and the empty states right is component work and belongs here.

import { useEffect, useId, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { SuggestionCard } from './SuggestionCard';
import type { Tone } from './tones';

export interface ComposerSuggestion {
  id: string;
  /** Why this is being offered — shown above the title on the card. */
  reason: string;
  title: string;
  /** Fills the prompt field when chosen. */
  prompt: string;
  /** Fills the title field. Defaults to the suggestion's own title. */
  fillTitle?: string;
  label?: string;
  tone?: Tone;
  meta?: ReactNode;
  context?: string;
}

export interface TaskComposerProps {
  /** Section heading, e.g. "Queue a job". */
  title: string;
  /** One line under the heading saying what happens on submit. */
  description?: string;
  titlePlaceholder?: string;
  promptPlaceholder?: string;
  /** Offered above the fields. Empty or omitted renders no strip at all. */
  suggestions?: readonly ComposerSuggestion[];
  /** Heading for the strip. */
  suggestionsTitle?: string;
  /** Shown in place of the strip while suggestions are still being fetched. */
  suggestionsLoading?: boolean;
  /**
   * Shown when there are no suggestions AND loading is done. Omit to render
   * nothing — an empty state for an optional nicety is itself noise.
   */
  suggestionsEmpty?: ReactNode;
  onSubmit: (task: { title: string; prompt: string; suggestionId?: string }) => void;
  /** Fires when a suggestion is chosen, before the fields are filled. */
  onChooseSuggestion?: (suggestion: ComposerSuggestion) => void;
  submitLabel?: string;
  /** Quiet note beside the submit button, e.g. where it will run. */
  hint?: ReactNode;
  busy?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function TaskComposer({
  title,
  description,
  titlePlaceholder = 'Title',
  promptPlaceholder = 'What should it do?',
  suggestions,
  suggestionsTitle = 'Suggested next',
  suggestionsLoading = false,
  suggestionsEmpty,
  onSubmit,
  onChooseSuggestion,
  submitLabel = 'Queue',
  hint,
  busy = false,
  className,
  'data-testid': testId,
}: TaskComposerProps) {
  const [draftTitle, setDraftTitle] = useState('');
  const [draftPrompt, setDraftPrompt] = useState('');
  const [chosen, setChosen] = useState<string | undefined>(undefined);
  const titleId = useId();
  const promptId = useId();

  // A suggestion that disappears from the list after being chosen (the work
  // moved on, the poll refreshed) must not keep claiming the submission — the
  // text is still the operator's to edit and send.
  useEffect(() => {
    if (chosen && suggestions && !suggestions.some((s) => s.id === chosen)) setChosen(undefined);
  }, [chosen, suggestions]);

  const ready = draftTitle.trim().length > 0 && draftPrompt.trim().length > 0 && !busy;

  function submit() {
    if (!ready) return;
    onSubmit({
      title: draftTitle.trim(),
      prompt: draftPrompt.trim(),
      ...(chosen ? { suggestionId: chosen } : {}),
    });
    setDraftTitle('');
    setDraftPrompt('');
    setChosen(undefined);
  }

  function choose(s: ComposerSuggestion) {
    onChooseSuggestion?.(s);
    // Fills rather than submits. A card that dispatched an agent on one click
    // would make a suggestion strip a minefield; this one loads the gun and
    // hands it over.
    setDraftTitle(s.fillTitle ?? s.title);
    setDraftPrompt(s.prompt);
    setChosen(s.id);
  }

  const showStrip = suggestionsLoading || (suggestions?.length ?? 0) > 0 || !!suggestionsEmpty;

  return (
    <section
      data-testid={testId}
      className={cn('rounded-lg border border-border bg-surface overflow-hidden', className)}
    >
      <div className="px-3.5 pt-3 pb-1">
        <h3 className="text-xs font-semibold text-text-secondary tracking-wide select-none uppercase">
          {title}
        </h3>
        {description && <p className="mt-1 text-[12px] text-text-tertiary">{description}</p>}
      </div>

      {showStrip && (
        <div className="px-3.5 pt-2 pb-1">
          <div className="text-[11px] font-semibold text-text-tertiary tracking-wide uppercase mb-2">
            {suggestionsTitle}
          </div>
          {suggestionsLoading ? (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-[92px] rounded-lg border border-border bg-surface-panel animate-pulse" />
              ))}
            </div>
          ) : (suggestions?.length ?? 0) > 0 ? (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {suggestions!.map((s) => (
                <SuggestionCard
                  key={s.id}
                  data-testid={`suggestion-${s.id}`}
                  reason={s.reason}
                  title={s.title}
                  {...(s.label ? { label: s.label } : {})}
                  {...(s.tone ? { tone: s.tone } : {})}
                  {...(s.meta ? { meta: s.meta } : {})}
                  {...(s.context ? { context: s.context } : {})}
                  onSelect={() => choose(s)}
                  disabled={busy}
                />
              ))}
            </div>
          ) : (
            <div className="text-[12px] text-text-tertiary">{suggestionsEmpty}</div>
          )}
        </div>
      )}

      <div className="px-3.5 pt-2 pb-2 flex flex-col gap-2">
        <label className="sr-only" htmlFor={titleId}>{titlePlaceholder}</label>
        <input
          id={titleId}
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          placeholder={titlePlaceholder}
          disabled={busy}
          className="w-full text-[13px] bg-transparent text-text-primary border border-border rounded-md px-3 py-2 outline-none focus:border-border-emphasis disabled:opacity-60"
        />
        <label className="sr-only" htmlFor={promptId}>{promptPlaceholder}</label>
        <textarea
          id={promptId}
          value={draftPrompt}
          onChange={(e) => setDraftPrompt(e.target.value)}
          placeholder={promptPlaceholder}
          disabled={busy}
          rows={3}
          // Enter inserts a newline; a prompt is prose and often several lines,
          // so submit is the modifier — the same bargain every chat composite
          // in this library makes.
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); submit(); }
          }}
          className="w-full text-[13px] bg-transparent text-text-primary border border-border rounded-md px-3 py-2 outline-none resize-y focus:border-border-emphasis disabled:opacity-60"
        />
      </div>

      <div className="px-3.5 pb-3 flex items-center gap-3">
        {hint && <span className="text-[11px] text-text-tertiary select-none">{hint}</span>}
        <span className="flex-1" />
        <Button size="sm" onClick={submit} disabled={!ready}>
          {busy ? 'Queueing…' : submitLabel}
        </Button>
      </div>
    </section>
  );
}

export default TaskComposer;
