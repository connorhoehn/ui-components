// DeckPresentMode — present a deck in place (since 2.548.0).
//
// The non-modal end of presenting: `PresentationEditor` and `DeckReader` put
// this in their own regions (it replaces their toolbar, filmstrip and stage
// while it is up) instead of floating a dialog over the app. It fills the box
// it is given (`h-full`); a host that wants the whole window collapses its
// own rails when the editor or reader calls `onFocusModeChange(true)` (see
// "Focus mode and no modals" in the layout README). Nothing here reaches
// outside the component: no portal, no scrim, no browser fullscreen.
//
// One slide large, previous / next, "Slide n of m", Exit. ← → Home End and
// PageUp / PageDown page; Escape exits. Speaker notes sit beside the slide
// from `lg` up (under it below) when `showNotes` is on.
//
// The test ids are the old dialog's (`<testId>`, `-position`, `-stage`,
// `-previous`, `-next`, `-loading`, `-error`), so a host's e2e that drove
// `DeckPresentationDialog` finds the same parts here.

import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { cn } from '../../../lib/cn';
import { nextSlideIndex, slideNavigationIntent } from '../../../lib/slideNavigationKey';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { Inline } from '../../ui/Stack';
import EmptyState from '../../shared/EmptyState';
import ErrorState from '../../shared/ErrorState';
import LoadingState from '../../shared/LoadingState';
import { SectionLabel } from '../../shared/SectionLabel';
import { Text } from '../../shared/Text';
import { SlideStage } from './SlideStage';
import { svgDataUri } from './svgPreview';

export interface DeckPresentModeSlide {
  id: string;
  title: string;
  /** The rendered slide's SVG source. Absent: the stage says it is not drawn. */
  svg?: string;
  /** Speaker notes, shown when `showNotes` is on. */
  notes?: string;
  /** The renderer's appended slide (Sources): it has no notes of its own. */
  generated?: boolean;
}

export interface DeckPresentModeProps {
  /** The deck's title. The view is named "Presenting <title>". */
  title: string;
  slides: readonly DeckPresentModeSlide[];
  /** Zero-based, including the renderer's generated slides. Controlled. */
  slideIndex: number;
  onSlideChange: (index: number) => void;
  /** Exit presentation (the button and Escape). */
  onExit: () => void;
  /** The current render is not in yet: the stage waits instead of showing old images. */
  loading?: boolean;
  /** The render failed, or the deck cannot be rendered yet. */
  error?: string;
  onRetry?: () => void;
  /** Speaker notes beside (from `lg`) or under the slide. Default false. */
  showNotes?: boolean;
  /** Hand the presenter to the page's conversation. Exits first, then calls this on the next frame. */
  onFocusConversation?: () => void;
  className?: string;
  /** Prefix for the parts' test ids. Default `deck-present`. */
  testId?: string;
}

function Chevron({ back }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('h-3.5 w-3.5', back && 'rotate-180')} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * A deck presented in place: one slide large, previous/next, "Slide n of m",
 * Exit, arrow keys and Escape, optional speaker notes; fills the box it is given.
 */
export function DeckPresentMode({
  title,
  slides,
  slideIndex,
  onSlideChange,
  onExit,
  loading = false,
  error,
  onRetry,
  showNotes = false,
  onFocusConversation,
  className,
  testId = 'deck-present',
}: DeckPresentModeProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  // The person just asked to present: arrow keys work at once, without a click.
  useEffect(() => {
    rootRef.current?.focus({ preventScroll: true });
  }, []);

  const ready = !error && !loading && slides.length > 0;
  const at = Math.min(Math.max(slideIndex, 0), Math.max(slides.length - 1, 0));
  const current = ready ? slides[at] : undefined;
  const src = svgDataUri(current?.svg);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onExit();
      return;
    }
    if (!ready) return;
    const intent = slideNavigationIntent(event);
    if (!intent) return;
    event.preventDefault();
    const target = nextSlideIndex(intent, at + 1, slides.length);
    if (target !== at + 1) onSlideChange(target - 1);
  };

  const handoff = onFocusConversation
    ? () => {
        onExit();
        // Let the host's regions come back before it moves the caret into its composer.
        requestAnimationFrame(() => onFocusConversation());
      }
    : undefined;

  const stage = error ? (
    <div className="flex min-h-0 flex-1 items-center justify-center" data-testid={`${testId}-error`}>
      <ErrorState
        title="Couldn't prepare the presentation"
        description={error}
        {...(onRetry ? { actionLabel: 'Retry preview', onAction: onRetry } : {})}
      />
    </div>
  ) : loading ? (
    <div className="flex min-h-0 flex-1 items-center justify-center" data-testid={`${testId}-loading`}>
      <LoadingState label="Preparing your current slides…" />
    </div>
  ) : !current ? (
    <div className="flex min-h-0 flex-1 items-center justify-center" data-testid={`${testId}-empty`}>
      <EmptyState title="No slides to present" description="This deck has no rendered slides yet." />
    </div>
  ) : (
    // A size container: the slide is as wide as the column allows and no
    // taller than it (100cqh), so a short window still shows a whole 16:9 slide.
    <div className="flex min-h-[12rem] min-w-0 flex-1 items-center justify-center [container-type:size]" data-testid={`${testId}-stage-frame`}>
      <div className="w-full max-w-[calc(100cqh*16/9)]">
        <SlideStage
          className="[&>[role=figure]]:max-w-none"
          label={`Slide ${at + 1} of ${slides.length}: ${current.title}`}
          data-testid={`${testId}-stage`}
        >
          {src ? (
            <img src={src} alt={current.title} className="h-full w-full object-contain" />
          ) : (
            <Text size="sm" tone="tertiary" data-testid={`${testId}-no-preview`}>This slide has not been rendered yet.</Text>
          )}
        </SlideStage>
      </div>
    </div>
  );

  return (
    <div
      ref={rootRef}
      role="group"
      tabIndex={-1}
      aria-roledescription="Presentation"
      aria-label={current
        ? `Presenting ${title} — slide ${at + 1} of ${slides.length}. Use the left and right arrow keys to change slide, Escape to exit.`
        : `Presenting ${title}. Escape to exit.`}
      onKeyDown={onKeyDown}
      className={cn(
        'flex h-full min-h-0 flex-col gap-3 bg-surface-panel p-4',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        className,
      )}
      data-testid={testId}
    >
      <Inline gap="sm" align="center" className="shrink-0 justify-between" data-testid={`${testId}-header`}>
        <Inline gap="xs" align="center" className="min-w-0">
          <Text size="sm" weight="semibold">Presenting</Text>
          <Text size="sm" tone="secondary" truncate data-testid={`${testId}-title`}>{title}</Text>
        </Inline>
        <Inline gap="xs" align="center">
          {handoff && <Button size="sm" variant="secondary" onClick={handoff}>Chat &amp; agent</Button>}
          <Button size="sm" variant="secondary" onClick={onExit} data-testid={`${testId}-exit`}>Exit presentation</Button>
        </Inline>
      </Inline>

      <div className={cn('flex min-h-0 flex-1 flex-col gap-3', showNotes && 'lg:flex-row')} data-testid={`${testId}-body`}>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2">
          {stage}
          {current && (
            <Inline gap="sm" align="center" className="shrink-0 justify-center" data-testid={`${testId}-nav`}>
              <IconButton
                aria-label="Previous slide"
                variant="ghost"
                size="sm"
                icon={<Chevron back />}
                disabled={at <= 0}
                onClick={() => onSlideChange(at - 1)}
                data-testid={`${testId}-previous`}
              />
              <Text size="sm" tone="secondary" tabular data-testid={`${testId}-position`}>
                {`Slide ${at + 1} of ${slides.length}`}
              </Text>
              <IconButton
                aria-label="Next slide"
                variant="ghost"
                size="sm"
                icon={<Chevron />}
                disabled={at >= slides.length - 1}
                onClick={() => onSlideChange(at + 1)}
                data-testid={`${testId}-next`}
              />
            </Inline>
          )}
        </div>
        {showNotes && current && (
          <section
            aria-label="Speaker notes"
            className="flex max-h-40 shrink-0 flex-col gap-1 overflow-y-auto rounded-lg border border-border bg-surface px-3 py-2 lg:max-h-none lg:w-80"
            data-testid={`${testId}-notes`}
          >
            <SectionLabel as="div">Speaker notes</SectionLabel>
            {current.notes?.trim() ? (
              <Text as="p" size="sm" tone="secondary" className="m-0 whitespace-pre-wrap">{current.notes}</Text>
            ) : (
              <Text as="p" size="sm" tone="tertiary" className="m-0">
                {current.generated ? 'This generated slide has no speaker notes.' : 'No speaker notes on this slide.'}
              </Text>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default DeckPresentMode;
