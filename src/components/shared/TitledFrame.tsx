// TitledFrame — a bordered box whose title interrupts the top border.
//
//   ┌─ claude ──────────────┐
//   │                       │
//   └───────────────────────┘
//
// The tmux/terminal-multiplexer convention. It exists because a stack of
// panes needs each pane labelled without spending a whole row of height on a
// header bar: at four panes a 24px header costs a line of scrollback each,
// and the labels stop being worth their price. Sitting the title *in* the
// border costs nothing.
//
// `active` is the other half of the convention: in a multiplexer exactly one
// pane has keyboard focus, and the border is how you know which.

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type TitledFrameTone = 'code' | 'surface';

export interface TitledFrameProps {
  /** Text sitting in the top border. Keep it short — it is a label, not a line. */
  title: ReactNode;
  /** Right-aligned content in the top border, e.g. a close control. */
  titleAction?: ReactNode;
  /** Draw the focused border. In a pane grid, exactly one should be true. */
  active?: boolean;
  /**
   * Terminal chrome (`code`, the default) or the app's own surface tokens.
   * `code` is the right choice whenever the frame contains a terminal — a
   * pane that themes with the page but holds a fixed-palette PTY reads as
   * two different applications.
   */
  tone?: TitledFrameTone;
  children: ReactNode;
  /** Fires on mousedown anywhere in the frame — how a pane claims focus. */
  onActivate?: () => void;
  className?: string;
  /** Class for the content region, e.g. padding or `overflow-auto`. */
  bodyClassName?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

const TONE = {
  code: {
    frame: 'bg-code-bg',
    idle: 'border-code-border',
    active: 'border-code-blue',
    title: 'text-code-subtle',
    titleActive: 'text-code-blue',
  },
  surface: {
    frame: 'bg-surface',
    idle: 'border-border',
    active: 'border-primary',
    title: 'text-text-tertiary',
    titleActive: 'text-primary',
  },
} as const;

export function TitledFrame({
  title,
  titleAction,
  active = false,
  tone = 'code',
  children,
  onActivate,
  className,
  bodyClassName,
  style,
  'data-testid': testId,
}: TitledFrameProps) {
  const palette = TONE[tone];
  return (
    <div
      data-testid={testId}
      onMouseDown={onActivate}
      style={style}
      className={cn(
        'relative flex flex-col min-h-0 rounded border transition-colors',
        palette.frame,
        active ? palette.active : palette.idle,
        className,
      )}
    >
      {/* Straddles the top border. `-top-2` lifts it half its own height so
          the border runs through its middle; the frame background behind the
          padding is what punches the gap in the line. */}
      <div className="absolute -top-2 left-2 right-2 flex items-center gap-1 pointer-events-none">
        <span
          className={cn(
            'px-1.5 text-[10px] font-mono leading-none truncate max-w-[60%]',
            palette.frame,
            active ? palette.titleActive : palette.title,
          )}
        >
          {title}
        </span>
        {titleAction != null && (
          <>
            <span className="flex-1" />
            <span className={cn('px-1 pointer-events-auto', palette.frame)}>{titleAction}</span>
          </>
        )}
      </div>
      <div className={cn('flex-1 min-h-0 pt-2', bodyClassName)}>{children}</div>
    </div>
  );
}

export default TitledFrame;
