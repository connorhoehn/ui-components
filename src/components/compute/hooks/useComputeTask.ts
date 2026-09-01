// Run an agent task on a computer and turn the raw stream into something
// renderable.
//
// The wire format is the agent CLI's own JSON stream: `assistant` messages
// carrying content blocks, `user` messages carrying tool results, and one
// terminal `result`. None of that is displayable as-is — this hook reduces it
// to a flat list of steps and a final tally.

import { useCallback, useRef, useState } from 'react';
import type { ComputeClient, StreamEvent } from '../lib/computeClient';
import type { ComputeRunResult } from '../types';

// `job` / `job_end` exist for the tail, not a self-driven run: they are the
// dispatcher's own frames, wrapping a box's invocation from OUTSIDE the CLI
// stream (`job_started` before `task_started`, `job_finished` after
// `devbox_end`/`devbox_error`). A run you started yourself never needs "why
// did this start" — you already know — so `useComputeTask`'s own reducer
// does not emit these; they exist on the shared union because `useComputeTail`
// (which watches runs nobody in this browser started) does.
export type TaskStepKind = 'text' | 'tool' | 'result' | 'error' | 'meta' | 'job' | 'job_end';

export interface TaskStep {
  kind: TaskStepKind;
  text: string;
  /** Tool name, for `kind: 'tool'`. */
  tool?: string;
  /** `job` only: the dispatcher's job kind (e.g. `devbox:task`) — the banner's subtitle. */
  jobKind?: string;
  /** `job_end` only: whether the job closed clean. Drives the closing tone. */
  jobOk?: boolean;
  /** `result` only: the structured tally, so the view renders cost chips instead of re-parsing `text`. */
  result?: ComputeRunResult;
  at: number;
}

/**
 * One-line summary of a tool call.
 *
 * Tool inputs are unbounded — a `Write` carries an entire file — so a raw
 * dump of the arguments makes the stream unreadable exactly when it is
 * moving fastest. The interesting field is almost always the target.
 */
export function summarizeTool(name: string, input: Record<string, unknown>): string {
  const pick = (...keys: string[]): string | null => {
    for (const key of keys) {
      const value = input[key];
      if (typeof value === 'string' && value.length > 0) return value;
    }
    return null;
  };
  const target =
    pick('file_path', 'path', 'notebook_path', 'command', 'pattern', 'url', 'query', 'prompt') ??
    pick('description') ??
    '';
  const trimmed = target.replace(/\s+/g, ' ').trim();
  if (!trimmed) return name;
  return trimmed.length > 96 ? `${trimmed.slice(0, 95)}…` : trimmed;
}

export interface UseComputeTaskOptions {
  client: ComputeClient;
  /** Cap on retained steps. Older ones are dropped — this is a live view. */
  maxSteps?: number;
  /** Raw frames, for hosts that render their own timeline. */
  onEvent?: (event: StreamEvent) => void;
}

export interface UseComputeTaskResult {
  steps: TaskStep[];
  isRunning: boolean;
  /** Tool calls made so far in the run in flight. */
  toolCount: number;
  result: ComputeRunResult | null;
  error: string | null;
  run: (sessionId: string, input: { prompt: string; resume: boolean; model?: string }) => Promise<void>;
  cancel: () => void;
  clear: () => void;
  push: (step: Omit<TaskStep, 'at'>) => void;
}

export function useComputeTask({
  client,
  maxSteps = 400,
  onEvent,
}: UseComputeTaskOptions): UseComputeTaskResult {
  const [steps, setSteps] = useState<TaskStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [toolCount, setToolCount] = useState(0);
  const [result, setResult] = useState<ComputeRunResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  const push = useCallback(
    (step: Omit<TaskStep, 'at'>) => {
      setSteps((prev) => {
        const next = [...prev, { ...step, at: Date.now() }];
        return next.length > maxSteps ? next.slice(next.length - maxSteps) : next;
      });
    },
    [maxSteps],
  );

  const clear = useCallback(() => {
    setSteps([]);
    setResult(null);
    setError(null);
    setToolCount(0);
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsRunning(false);
  }, []);

  const run = useCallback(
    async (sessionId: string, input: { prompt: string; resume: boolean; model?: string }) => {
      if (abortRef.current) return;
      const controller = new AbortController();
      abortRef.current = controller;
      setIsRunning(true);
      setError(null);
      setResult(null);
      setToolCount(0);
      push({ kind: 'meta', text: input.prompt });

      // Set by an in-band error frame. The stream itself completes normally
      // in that case, so the failure has to be carried out of the callback.
      let failure: string | null = null;

      try {
        await client.runTask(
          sessionId,
          input,
          (event) => {
            onEventRef.current?.(event);
            const type = event['type'];

            if (type === 'assistant') {
              const content = ((event['message'] as { content?: unknown[] })?.content ?? []) as Record<string, unknown>[];
              for (const block of content) {
                if (block['type'] === 'tool_use') {
                  const tool = String(block['name'] ?? 'tool');
                  push({
                    kind: 'tool',
                    tool,
                    text: summarizeTool(tool, (block['input'] ?? {}) as Record<string, unknown>),
                  });
                  setToolCount((n) => n + 1);
                } else if (block['type'] === 'text') {
                  const text = String(block['text'] ?? '').trim();
                  if (text) push({ kind: 'text', text });
                }
              }
              return;
            }

            // The runtime announces the model it actually resolved. A `model`
            // override that the deployed image is too old to honour is
            // otherwise invisible — you ask for the expensive one and quietly
            // get the default.
            if (type === 'devbox_start') {
              const model = event['model'];
              if (typeof model === 'string' && model) push({ kind: 'meta', text: `model: ${model}` });
              return;
            }

            // Non-JSON output from the CLI. Rare, and the only trace of a
            // container that failed before it could produce structured events.
            if (type === 'devbox_raw') {
              const text = String(event['text'] ?? '').trim();
              if (text) push({ kind: 'text', text });
              return;
            }

            // THE failure mode. Both emissions happen after the response head
            // is already written, so the stream ends *normally* and neither
            // fetch nor the reader throws. Without this the run resolves as a
            // silent success: no output, no error, nothing to act on.
            if (type === 'devbox_error') {
              const message = String(event['error'] ?? 'the box reported an error');
              failure = message;
              push({ kind: 'error', text: message });
              return;
            }

            // A timeout kills the process group, so `devbox_end` arrives with
            // NO `result` after it. Treated as terminal here, or the UI waits
            // forever on a tally that is never coming.
            if (type === 'devbox_end') {
              const timedOut = event['timed_out'] === true;
              const exitCode = Number(event['exit_code'] ?? 0);
              const stderr = String(event['stderr'] ?? '').trim();
              if (timedOut) {
                failure = 'timed out — the container killed the run';
                push({ kind: 'error', text: failure });
              } else if (exitCode !== 0) {
                failure = `exited ${exitCode}`;
                push({ kind: 'error', text: failure });
              }
              // stderr is the only diagnostic the container gives back, and
              // it is truncated to its last 4 KB — throwing it away leaves an
              // operator with an exit code and nothing else.
              if (stderr && (timedOut || exitCode !== 0)) push({ kind: 'text', text: stderr });
              return;
            }

            if (type === 'result') {
              const tally: ComputeRunResult = {
                subtype: String(event['subtype'] ?? 'success'),
                turns: Number(event['num_turns'] ?? 0),
                durationMs: Number(event['duration_ms'] ?? 0),
                costUsd: Number(event['total_cost_usd'] ?? 0),
              };
              setResult(tally);
              push({
                kind: 'result',
                text: `${tally.turns} turns · ${(tally.durationMs / 1000).toFixed(0)}s · $${tally.costUsd.toFixed(4)}`,
                result: tally,
              });
            }
          },
          controller.signal,
        );
        // Raised in-band rather than thrown: a transport that succeeded and
        // an agent run that failed are different things, and only the second
        // one has already been rendered into the step list.
        if (failure) setError(failure);
      } catch (err) {
        // An abort is the operator's own doing, not a failure to report.
        if (controller.signal.aborted) return;
        const message = err instanceof Error ? err.message : 'Task failed';
        setError(message);
        push({ kind: 'error', text: message });
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        setIsRunning(false);
      }
    },
    [client, push],
  );

  return { steps, isRunning, toolCount, result, error, run, cancel, clear, push };
}
