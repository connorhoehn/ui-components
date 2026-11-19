// ui-components/src/components/video/SpokenCaption.tsx
//
// One spoken line shown in a call: who said it, a mark (an AssistantMark or an
// avatar), the words, and optional "Question" / "Speaking" chips. A question
// sits on the assistant-tinted card. The text lives in a polite live region so
// a screen reader hears it without being interrupted; the card fills its column.
// `onExpire` fires `holdMs` after the last change to the text, so a host can
// clear a caption that has been left on screen.

import { useEffect, useRef, type ReactNode } from 'react';
import { Card } from '../ui/Card';
import Chip from '../shared/Chip';
import { T } from '../shared/Text';
import { cn } from '../../lib/cn';

export interface SpokenCaptionProps {
  speaker: string;
  /** An `AssistantMark` or avatar shown beside the name. */
  mark?: ReactNode;
  /** `question` is tinted and carries a "Question" chip. @default 'said' */
  kind?: 'question' | 'said';
  /** Shows a "Speaking" chip while the line is still being spoken. */
  speaking?: boolean;
  text: string;
  /** Milliseconds after the last text change before `onExpire` fires. */
  holdMs?: number;
  onExpire?: () => void;
  className?: string;
  'data-testid'?: string;
}

export function SpokenCaption({
  speaker, mark, kind = 'said', speaking = false, text, holdMs, onExpire, className,
  'data-testid': testId = 'spoken-caption',
}: SpokenCaptionProps) {
  const expire = useRef(onExpire);
  expire.current = onExpire;

  useEffect(() => {
    if (holdMs === undefined || !expire.current) return;
    const id = setTimeout(() => expire.current?.(), holdMs);
    return () => clearTimeout(id);
  }, [text, holdMs]);

  return (
    <Card
      padding="none"
      tone={kind === 'question' ? 'assistant' : 'default'}
      className={cn('w-full px-3 py-2', className)}
      data-testid={testId}
      data-kind={kind}
    >
      <T className="flex flex-wrap items-center gap-2">
        {mark}
        <T size="sm" weight="semibold" tone="primary">{speaker}</T>
        {kind === 'question' && <Chip tone="info" size="xs">Question</Chip>}
        {speaking && <Chip tone="success" size="xs">Speaking</Chip>}
      </T>
      <T as="p" size="sm" tone="primary" aria-live="polite" data-testid={`${testId}-text`}>{text}</T>
    </Card>
  );
}

export default SpokenCaption;
