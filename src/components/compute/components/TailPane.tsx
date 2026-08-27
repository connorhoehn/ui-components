// Watch a box without owning it.
//
// This used to be an "agent pane" with its own prompt box, which was a
// mistake: a textarea that looks like a terminal and is not one teaches you
// that Enter means newline, and there is no reason to rebuild a shell badly
// when a real one is one keystroke away. Input belongs in a terminal pane.
//
// What is left is the half that a terminal cannot do — a read-only tail of
// whatever is running on the box, including runs nobody in this browser
// started: a cron bot, the job dispatcher, another operator. It costs no
// shell slot, so you can keep six of them open and watch the fleet.

import { useEffect, useLayoutEffect, useRef } from 'react';
import { cn } from '../../../lib/cn';
import Chip from '../../shared/Chip';
import { useCompute } from '../context/ComputeContext';
import { useComputeTail } from '../hooks/useComputeTail';
import type { TaskStep } from '../hooks/useComputeTask';
import type { PaneKindContext } from '../lib/paneKinds';
import type { Computer } from '../types';

const STEP_TONE: Record<TaskStep['kind'], string> = {
  meta: 'text-code-blue',
  text: 'text-code-subtle',
  tool: 'text-code-green',
  result: 'text-code-mauve',
  error: 'text-code-red',
};

const STEP_GLYPH: Record<TaskStep['kind'], string> = {
  meta: '›',
  text: '·',
  tool: '⚙',
  result: '✓',
  error: '✗',
};

export interface TailPaneProps {
  computer: Computer;
  /** Publish a handle so the lab can put the keyboard here. */
  registerPane?: PaneKindContext['registerPane'];
  className?: string;
}

export function TailPane({ computer, registerPane, className }: TailPaneProps) {
  const { client } = useCompute();
  const tail = useComputeTail({ client, boxId: computer.id });
  const logRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true);

  // No input to give the keyboard to, but the scroll region is still a real
  // focus target: focused, it takes arrow keys and Page Up. Without this,
  // moving to a tail pane would leave focus wherever it was.
  useEffect(() => {
    if (!registerPane) return;
    registerPane({ focus: () => logRef.current?.focus() });
    return () => registerPane(null);
  }, [registerPane]);

  // Follow the tail only while already at the bottom. Yanking the view down
  // while someone is reading further up is the single most annoying thing a
  // live log can do.
  useLayoutEffect(() => {
    const node = logRef.current;
    if (node && pinnedRef.current) node.scrollTop = node.scrollHeight;
  }, [tail.steps]);

  return (
    <div className={cn('flex flex-col h-full min-h-0 bg-code-bg', className)}>
      <div className="shrink-0 flex items-center gap-2 px-2 py-1 border-b border-code-border">
        <Chip size="xs" mono tone={tail.connected ? 'success' : 'neutral'} dot="static">
          {tail.connected ? 'tailing' : 'not connected'}
        </Chip>
        {tail.running && (
          <Chip size="xs" mono tone="info" dot="pulse">
            running
          </Chip>
        )}
        <span className="flex-1" />
        <span className="text-[10px] font-mono text-code-raised">read-only</span>
      </div>

      <div
        ref={logRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          pinnedRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 32;
        }}
        tabIndex={0}
        role="log"
        aria-label={`Activity on ${computer.label}`}
        className="flex-1 min-h-0 overflow-y-auto px-2 py-1.5 font-mono text-[11px] leading-[1.5] flex flex-col gap-0.5 outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset"
      >
        {tail.error && <div className="text-code-red">{tail.error}</div>}

        {tail.steps.length === 0 && !tail.error ? (
          <div className="text-code-raised">
            {computer.currentTask
              ? `waiting for output · ${computer.currentTask}`
              : 'nothing running on this box — open a terminal pane to start something'}
          </div>
        ) : (
          tail.steps.map((step, i) => (
            <div key={i} className="flex gap-1.5 min-w-0">
              <span aria-hidden="true" className={cn('shrink-0 w-3', STEP_TONE[step.kind])}>
                {STEP_GLYPH[step.kind]}
              </span>
              {step.tool && <span className="shrink-0 text-code-comment">{step.tool}</span>}
              <span className={cn('min-w-0 break-words', STEP_TONE[step.kind])}>{step.text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
