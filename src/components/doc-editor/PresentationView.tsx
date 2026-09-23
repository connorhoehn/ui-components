// A generated deck, read-only.
//
// This is the reading end of the presentation generator: a person opens the
// document the agent produced and wants three things — to look at the slides,
// to know which attempt they are looking at, and to get the `.pptx` itself.
//
// ## Why it renders nothing it was not given
//
// Every slide preview arrives as a `ReactNode` the host resolved, exactly like
// `WorkArtifactRevision.preview` in the work graph, and for the same reason:
// the bytes are viewer-scoped and `no-store`, so a URL in an `<img src>` would
// be an unauthenticated request for something that is not meant to have a
// shareable address. The host fetches, holds an object URL, and hands the
// element down.
//
// A slide with no preview renders as ABSENT — its title and its number, and a
// line saying the preview could not be read. It does not render a grey
// rectangle, because a grey rectangle is a claim that the slide looks like
// that, and a reader cannot tell it apart from a slide the generator left
// blank.
//
// ## Why the outline is beside the stage rather than under it
//
// A deck's outline is how you navigate it — twelve slides is more than a
// `‹ ›` pair can carry, and the titles are what a reader is actually looking
// for. The `‹ Slide 4 of 12 ›` control stays because it is how you read
// *through* a deck once you have found your place.

import { useId, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { nextSlideIndex, slideNavigationIntent } from '../../lib/slideNavigationKey';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import EmptyState from '../shared/EmptyState';
import ErrorState from '../shared/ErrorState';
import LoadingState from '../shared/LoadingState';
import { SectionLabel } from '../shared/SectionLabel';
import { SegmentedControl } from '../shared/SegmentedControl';
import { Select } from '../forms/Select';
import { StatusPill } from '../shared/StatusPill';
import { Text } from '../shared/Text';

const REVISION_SEGMENTS_MAX = 5;

/** One page of a revision. `preview` is host-resolved; absent means absent. */
export interface PresentationSlide {
  id: string;
  /** 1-based, as the deck numbers itself. */
  index: number;
  title: string;
  preview?: ReactNode;
}

export interface PresentationRevision {
  id: string;
  /** `v3`, as the generator labelled it. */
  label: string;
  /** Already formatted by the host — this component does no clock maths. */
  createdAt?: string;
  slides: PresentationSlide[];
}

export interface PresentationViewProps {
  title: string;
  revisions: readonly PresentationRevision[];
  /** Which revision is shown. Controlled; the host owns the choice. */
  revisionId: string;
  onRevisionChange: (revisionId: string) => void;
  /** 1-based page number within the revision. Controlled. */
  slideIndex: number;
  onSlideChange: (slideIndex: number) => void;
  /**
   * The `.pptx` itself, through the host's own authorized route. Absent, no
   * button is drawn — an offer that 403s is worse than no offer.
   */
  onDownload?: () => void;
  downloadLabel?: string;
  /** Opens the current slide at full size, in whatever viewer the host has. */
  onOpenPreview?: (slideId: string) => void;
  /**
   * A generation still in flight, or the one that failed. Shown beside the
   * revision switch so "v3 generating" is visible while v2 is being read.
   */
  pending?: { label: string; status: 'generating' | 'failed'; message?: string };
  /** Honest state about what this view cannot show. */
  notice?: ReactNode;
  state?: 'loading' | 'ready' | 'empty' | 'error';
  errorMessage?: string;
  onRetry?: () => void;
  /**
   * Widest the slide frame may grow, in pixels. Centred once it stops
   * growing.
   *
   * A slide is 16:9 and a pane is whatever the host made it. In a wide,
   * short container the frame stretched to the full width while the slide
   * inside it stayed its natural size, so the deck read as a small picture
   * marooned in a huge grey rectangle — measured at 1,100px of frame around a
   * ~600px slide on a pipeline run card. The default already caps the frame
   * at 16:9 of the available height, which is the right cap when the height
   * is known; pass this when it is not, or to hold the deck narrower still.
   */
  maxSlideWidth?: number;
  className?: string;
  'data-testid'?: string;
}

function Chevron({ back }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('h-3.5 w-3.5', back && 'rotate-180')} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PresentationView({
  title,
  revisions,
  revisionId,
  onRevisionChange,
  slideIndex,
  onSlideChange,
  onDownload,
  downloadLabel = 'Download .pptx',
  onOpenPreview,
  pending,
  notice,
  state = 'ready',
  errorMessage,
  onRetry,
  maxSlideWidth,
  className,
  'data-testid': testId = 'presentation-view',
}: PresentationViewProps) {
  const outlineId = useId();

  if (state === 'loading') {
    return <LoadingState label="Opening the presentation…" testId={`${testId}-loading`} />;
  }
  if (state === 'error') {
    return (
      <ErrorState
        title="This presentation could not be opened"
        {...(errorMessage ? { description: errorMessage } : {})}
        {...(onRetry ? { actionLabel: 'Try again', onAction: onRetry } : {})}
        testId={`${testId}-error`}
      />
    );
  }

  const revision = revisions.find((candidate) => candidate.id === revisionId) ?? revisions[0];
  const slides = revision?.slides ?? [];

  if (state === 'empty' || !revision || slides.length === 0) {
    return (
      <div className={cn('flex min-h-0 flex-col gap-3 p-4', className)} data-testid={testId}>
        <Text as="div" className="text-base font-semibold text-text-primary">{title}</Text>
        <EmptyState
          title="No slides yet"
          description={
            pending?.status === 'generating'
              ? `${pending.label} is still being generated.`
              : pending?.status === 'failed'
                ? pending.message ?? `${pending.label} failed.`
                : 'This presentation has no rendered revision to show.'
          }
          testId={`${testId}-empty`}
        />
      </div>
    );
  }

  // Clamped rather than trusted: a deep link can name a page a shorter
  // revision does not have, and landing on nothing is worse than landing on
  // the first slide.
  const current = slides[Math.min(Math.max(slideIndex, 1), slides.length) - 1]!;

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const intent = slideNavigationIntent(event);
    if (!intent) return;
    // preventDefault even when the deck cannot move: ArrowRight at the last
    // slide should not fall through and scroll the page instead.
    event.preventDefault();
    const target = nextSlideIndex(intent, current.index, slides.length);
    if (target !== current.index) onSlideChange(target);
  };

  return (
    <div
      className={cn(
        'flex min-h-0 flex-col gap-3 p-4',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        className,
      )}
      data-testid={testId}
      role="group"
      tabIndex={0}
      aria-roledescription="Slide deck"
      aria-label={`${title} — slide ${current.index} of ${slides.length}. Use the left and right arrow keys to change slide.`}
      onKeyDown={handleKeyDown}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Text as="div" className="text-base font-semibold text-text-primary" data-testid={`${testId}-title`}>{title}</Text>
        <div className="flex items-center gap-2">
          {revisions.length > REVISION_SEGMENTS_MAX ? (
            // Past a handful a row of v1…v15 crowds the title; one picker
            // holds any number (the editor does the same).
            <Select
              aria-label="Revision"
              size="sm"
              value={revision.id}
              onChange={(event) => onRevisionChange?.(event.target.value)}
              options={[...revisions].reverse().map((candidate, index) => ({ value: candidate.id, label: index === 0 ? `${candidate.label} · latest` : candidate.label }))}
              className="w-auto"
              data-testid={`${testId}-revision-select`}
            />
          ) : revisions.length > 1 && (
            <SegmentedControl
              aria-label="Revision"
              size="sm"
              value={revision.id}
              onChange={onRevisionChange}
              options={revisions.map((candidate) => ({ label: candidate.label, value: candidate.id }))}
              data-testid={`${testId}-revisions`}
            />
          )}
          {pending && (
            <StatusPill
              state={pending.status === 'failed' ? 'error' : 'pending'}
              label={`${pending.label} ${pending.status}`}
              data-testid={`${testId}-pending`}
            />
          )}
          {onDownload && (
            <Button variant="secondary" size="sm" onClick={onDownload} data-testid={`${testId}-download`}>
              {downloadLabel}
            </Button>
          )}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 md:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {/* The centring row exists so the frame can stop growing without
              drifting to the left edge of the pane. */}
          <div className="flex min-h-0 flex-1 justify-center">
          <div
            className={cn(
              // `aspect-[16/9]` with an auto width and a full height makes the
              // HEIGHT the binding constraint in a wide pane — the frame is
              // exactly as wide as a 16:9 slide of that height, rather than
              // stretching to the pane and letterboxing the deck inside it.
              // `max-w-full` keeps the narrow case unchanged: there the width
              // still binds first, exactly as before.
              'flex h-full min-h-[12rem] w-auto max-w-full flex-1 items-center justify-center',
              'aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface-hover/40',
            )}
            style={maxSlideWidth === undefined ? undefined : { maxWidth: maxSlideWidth }}
            data-testid={`${testId}-stage`}
          >
            {current.preview ?? (
              <Text className="text-[13px] text-text-tertiary" data-testid={`${testId}-no-preview`}>
                This slide’s preview could not be read.
              </Text>
            )}
          </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <IconButton
              aria-label="Previous slide"
              variant="ghost"
              size="sm"
              icon={<Chevron back />}
              disabled={current.index <= 1}
              onClick={() => onSlideChange(current.index - 1)}
              data-testid={`${testId}-previous`}
            />
            <Text className="text-[13px] text-text-secondary" data-testid={`${testId}-position`}>
              {`Slide ${current.index} of ${slides.length}`}
            </Text>
            <IconButton
              aria-label="Next slide"
              variant="ghost"
              size="sm"
              icon={<Chevron />}
              disabled={current.index >= slides.length}
              onClick={() => onSlideChange(current.index + 1)}
              data-testid={`${testId}-next`}
            />
            {onOpenPreview && current.preview && (
              <Button variant="ghost" size="sm" onClick={() => onOpenPreview(current.id)} data-testid={`${testId}-open-preview`}>
                Open larger preview
              </Button>
            )}
          </div>
        </div>

        <nav className="min-w-0 md:w-64" aria-labelledby={outlineId} data-testid={`${testId}-outline`}>
          <SectionLabel as="div" className="mb-1" data-testid={`${testId}-outline-label`}>
            <span id={outlineId}>Slides</span>
          </SectionLabel>
          <ol className="m-0 flex list-none flex-col gap-0.5 p-0">
            {slides.map((slide) => (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => onSlideChange(slide.index)}
                  aria-current={slide.id === current.id ? 'true' : undefined}
                  className={cn(
                    'flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover',
                    slide.id === current.id && 'bg-surface-hover font-medium',
                  )}
                  data-testid={`${testId}-outline-row`}
                >
                  <span className="tabular-nums text-text-tertiary">{slide.index}</span>
                  <span className="truncate">{slide.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {notice && (
        <Text className="text-[11.5px] text-text-tertiary" data-testid={`${testId}-notice`}>{notice}</Text>
      )}
    </div>
  );
}

export default PresentationView;
