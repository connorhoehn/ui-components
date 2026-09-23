// The slide stage: one centred 16:9 frame for the slide being edited.
//
// Lifted from `PresentationView`'s reading frame so the writing end shows a
// slide at the proportions it will be presented at, instead of a letterboxed
// image in a box of whatever height the pane happened to have. The frame is
// the slide — white, bordered, shadowed — on the workspace grey behind it.
//
// The contents are the caller's: the generator's rendered SVG in an `<img>`,
// or a state ("Add a source to preview this slide", "Rendering…"). The stage
// only adds the frame and, while the agent is rewriting this slide, a quiet
// `Generating…` label over the last picture — the old render stays visible
// underneath so the person can still see what is being changed.

import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { Text } from '../../shared/Text';

export type SlideStageWidth = '2xl' | '3xl' | '4xl' | '5xl';

const WIDTH: Record<SlideStageWidth, string> = {
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
};

export interface SlideStageProps {
  /** The slide picture or a state. Centred inside the 16:9 frame. */
  children: ReactNode;
  /** The agent is rewriting this slide: label over it, `aria-busy`. */
  generating?: boolean;
  /** Default "Generating…". */
  generatingLabel?: string;
  /** Accessible name of the frame — "Slide 2 of 5: Transcript". */
  label?: string;
  /** Widest the frame grows. Default `4xl`. */
  maxWidth?: SlideStageWidth;
  className?: string;
  'data-testid'?: string;
}

export function SlideStage({
  children,
  generating = false,
  generatingLabel = 'Generating…',
  label,
  maxWidth = '4xl',
  className,
  'data-testid': testId = 'slide-stage',
}: SlideStageProps) {
  return (
    <div className={cn('flex w-full justify-center', className)}>
      <div
        role="figure"
        aria-label={label}
        aria-busy={generating || undefined}
        data-testid={testId}
        data-aspect="16/9"
        className={cn(
          'relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm',
          WIDTH[maxWidth],
        )}
      >
        {children}
        {generating && (
          <span
            role="status"
            className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5"
            data-testid={`${testId}-generating`}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
            <Text as="span" className="text-[12px] font-medium text-text-secondary">{generatingLabel}</Text>
          </span>
        )}
      </div>
    </div>
  );
}

export default SlideStage;
