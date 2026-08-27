// The other thing a pane can be: an agent conversation rather than a PTY.
//
// This exists because a shell is not free. Each open terminal spends one of
// the ten shell slots a runtime has, so a window of eight panes would eat the
// entire quota just to *watch*. An agent pane costs nothing to keep open —
// it is an SSE stream — which makes "have six boxes on screen and type at
// whichever one needs it" a thing you can actually do.
//
// The composer is the point of the pane, so it sits at the bottom where a
// prompt belongs and takes ⌘⏎ / ⌃⏎ to send.

import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
import { useCompute } from '../context/ComputeContext';
import { useComputeTask, type TaskStep } from '../hooks/useComputeTask';
import type { Computer } from '../types';

export interface AgentPaneHandle {
  /** Dispatch a task without going through the pane's own composer. */
  send: (prompt: string) => boolean;
  focus: () => void;
  isRunning: () => boolean;
}

export interface AgentPaneProps {
  computer: Computer;
  /** Model for dispatched tasks. Ignored when the runtime predates the field. */
  modelId?: string | null;
  /** Continue the box's existing conversation. Default true. */
  resume?: boolean;
  /** Hide the composer — for a read-only viewer. */
  readOnly?: boolean;
  /** Called whenever a run settles, so the fleet can be re-read. */
  onSettled?: () => void;
  className?: string;
}

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

export const AgentPane = forwardRef<AgentPaneHandle, AgentPaneProps>(function AgentPane(
  { computer, modelId, resume = true, readOnly = false, onSettled, className },
  ref,
) {
  const { client, canManage } = useCompute();
  const task = useComputeTask({ client });
  const [prompt, setPrompt] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true);

  // Follow the tail only while the operator is already at the bottom. Yanking
  // the view back down while they are reading something further up is the
  // single most annoying thing a live log can do.
  useLayoutEffect(() => {
    const node = logRef.current;
    if (node && pinnedRef.current) node.scrollTop = node.scrollHeight;
  }, [task.steps]);

  const settledRef = useRef(onSettled);
  settledRef.current = onSettled;
  useEffect(() => {
    if (!task.isRunning && (task.result || task.error)) settledRef.current?.();
  }, [task.isRunning, task.result, task.error]);

  const dispatch = (text: string): boolean => {
    const trimmed = text.trim();
    if (!trimmed || task.isRunning || !canManage) return false;
    void task.run(computer.sessionId, { prompt: trimmed, resume, ...(modelId ? { model: modelId } : {}) });
    return true;
  };

  useImperativeHandle(
    ref,
    (): AgentPaneHandle => ({
      send: dispatch,
      focus: () => inputRef.current?.focus(),
      isRunning: () => task.isRunning,
    }),
    // `dispatch` closes over the current running flag and model, so the
    // handle has to be rebuilt when those change or a broadcast would use a
    // stale one.
    [task.isRunning, modelId, resume, computer.sessionId, canManage],
  );

  const disabled = readOnly || !canManage;

  return (
    <div className={cn('flex flex-col h-full min-h-0 bg-code-bg', className)}>
      <div
        ref={logRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          pinnedRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 32;
        }}
        className="flex-1 min-h-0 overflow-y-auto px-2 py-1.5 font-mono text-[11px] leading-[1.5] flex flex-col gap-0.5"
      >
        {task.steps.length === 0 ? (
          <div className="text-code-raised">
            {computer.currentTask
              ? `last: ${computer.currentTask}`
              : 'no run in this pane yet — type below'}
          </div>
        ) : (
          task.steps.map((step, i) => (
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

      {!disabled && (
        <div className="shrink-0 border-t border-code-border flex items-end gap-1.5 px-2 py-1.5">
          <span aria-hidden="true" className="text-code-green font-mono text-[11px] leading-6">
            ›
          </span>
          <textarea
            ref={inputRef}
            rows={1}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                if (dispatch(prompt)) setPrompt('');
              }
            }}
            placeholder={task.isRunning ? 'running…' : 'instruction, ⌘⏎ to send'}
            aria-label={`Instruction for ${computer.label}`}
            className="flex-1 min-w-0 resize-none bg-transparent border-none outline-none font-mono text-[11px] leading-6 text-code-text placeholder:text-code-raised"
          />
          {task.isRunning ? (
            <button
              type="button"
              onClick={task.cancel}
              className="shrink-0 text-[10px] font-mono text-code-peach bg-transparent border-none cursor-pointer p-0 hover:underline"
            >
              stop · {task.toolCount}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (dispatch(prompt)) setPrompt('');
              }}
              disabled={!prompt.trim()}
              className="shrink-0 text-[10px] font-mono text-code-green bg-transparent border-none cursor-pointer p-0 hover:underline disabled:text-code-raised disabled:cursor-not-allowed"
            >
              send
            </button>
          )}
        </div>
      )}
    </div>
  );
});
