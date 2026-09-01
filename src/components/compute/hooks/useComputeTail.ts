// Tail whatever is running on a box, without owning it.
//
// The distinction that matters: dispatching a task and *watching* one are
// different jobs. A shell pane owns its session and takes input. A tail is
// read-only and free — it is how you watch six boxes at once, including runs
// nobody in this browser started (a cron bot, a dispatcher, another operator).
//
// The server replays a ring buffer before going live, so opening a tail
// mid-run shows what already happened rather than starting from silence.

import { useEffect, useRef, useState } from 'react';
import type { ComputeClient, StreamEvent } from '../lib/computeClient';
import type { ComputeRunResult } from '../types';
import { summarizeTool, type TaskStep } from './useComputeTask';

export interface UseComputeTailOptions {
  client: ComputeClient;
  /** Registry id of the box to tail. Null closes any open stream. */
  boxId: string | null;
  /** Retained steps. Older ones drop — this is a live view, not a log store. */
  maxSteps?: number;
  enabled?: boolean;
}

export interface UseComputeTailResult {
  steps: TaskStep[];
  /** True once the stream is open. */
  connected: boolean;
  /** A run is in flight on the box, as far as the stream has said. */
  running: boolean;
  result: ComputeRunResult | null;
  error: string | null;
}

/**
 * Reduce one raw frame to zero or more renderable steps.
 *
 * Shared vocabulary with `useComputeTask` — the tail sees everything the task
 * stream does, plus `task_started`, `job_started` and `job_finished`, which
 * only ever appear here (a run driven from this browser doesn't need a
 * dispatcher to announce its own start or end to itself).
 */
function reduceFrame(event: StreamEvent): { steps: Omit<TaskStep, 'at'>[]; result?: ComputeRunResult; running?: boolean; error?: string } {
  const type = event['type'];

  // The dispatcher's own frame, wrapping the box from OUTSIDE the CLI
  // stream — it is what answers "why did this box suddenly start working"
  // for a run nobody in this browser dispatched. Rendered as a banner, not a
  // plain row, so it reads as the start of an arc rather than one more step.
  if (type === 'job_started') {
    const title = String(event['title'] ?? 'job started');
    const jobKind = event['kind'];
    return {
      steps: [{ kind: 'job', text: title, jobKind: typeof jobKind === 'string' && jobKind ? jobKind : undefined }],
      running: true,
    };
  }

  // Closes the arc `job_started` opened. Distinct from `devbox_end` /
  // `devbox_error`, which are the CONTAINER's terminal signal — this is the
  // dispatcher's, and can arrive after either (or after neither, on a
  // timeout). `ok` is absent-safe: only an explicit `false` reads as failed.
  if (type === 'job_finished') {
    const ok = event['ok'] !== false;
    return { steps: [{ kind: 'job_end', text: ok ? 'job finished' : 'job failed', jobOk: ok }], running: false };
  }

  if (type === 'task_started') {
    return { steps: [{ kind: 'meta', text: String(event['prompt'] ?? 'run started') }], running: true };
  }

  if (type === 'devbox_start') {
    const model = event['model'];
    return {
      steps: typeof model === 'string' && model ? [{ kind: 'meta', text: `model: ${model}` }] : [],
      running: true,
    };
  }

  if (type === 'assistant') {
    const content = ((event['message'] as { content?: unknown[] })?.content ?? []) as Record<string, unknown>[];
    const steps: Omit<TaskStep, 'at'>[] = [];
    for (const block of content) {
      if (block['type'] === 'tool_use') {
        const tool = String(block['name'] ?? 'tool');
        steps.push({ kind: 'tool', tool, text: summarizeTool(tool, (block['input'] ?? {}) as Record<string, unknown>) });
      } else if (block['type'] === 'text') {
        const text = String(block['text'] ?? '').trim();
        if (text) steps.push({ kind: 'text', text });
      }
    }
    return { steps, running: true };
  }

  if (type === 'devbox_raw') {
    const text = String(event['text'] ?? '').trim();
    return { steps: text ? [{ kind: 'text', text }] : [] };
  }

  if (type === 'devbox_error') {
    const message = String(event['error'] ?? 'the box reported an error');
    return { steps: [{ kind: 'error', text: message }], running: false, error: message };
  }

  if (type === 'devbox_end') {
    const timedOut = event['timed_out'] === true;
    const exitCode = Number(event['exit_code'] ?? 0);
    const stderr = String(event['stderr'] ?? '').trim();
    // A timeout produces no `result` frame at all, so this has to be terminal
    // or the tail sits at "running" forever on a run that is long dead.
    if (timedOut || exitCode !== 0) {
      const message = timedOut ? 'timed out — the container killed the run' : `exited ${exitCode}`;
      const steps: Omit<TaskStep, 'at'>[] = [{ kind: 'error', text: message }];
      if (stderr) steps.push({ kind: 'text', text: stderr });
      return { steps, running: false, error: message };
    }
    return { steps: [], running: false };
  }

  if (type === 'result') {
    const result: ComputeRunResult = {
      subtype: String(event['subtype'] ?? 'success'),
      turns: Number(event['num_turns'] ?? 0),
      durationMs: Number(event['duration_ms'] ?? 0),
      costUsd: Number(event['total_cost_usd'] ?? 0),
    };
    return {
      steps: [{
        kind: 'result',
        text: `${result.turns} turns · ${(result.durationMs / 1000).toFixed(0)}s · $${result.costUsd.toFixed(4)}`,
        result,
      }],
      result,
      running: false,
    };
  }

  return { steps: [] };
}

export function useComputeTail({
  client,
  boxId,
  maxSteps = 300,
  enabled = true,
}: UseComputeTailOptions): UseComputeTailResult {
  const [steps, setSteps] = useState<TaskStep[]>([]);
  const [connected, setConnected] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<ComputeRunResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const maxRef = useRef(maxSteps);
  maxRef.current = maxSteps;

  useEffect(() => {
    if (!enabled || !boxId) {
      setConnected(false);
      return;
    }

    // Switching boxes must not leave the previous box's output on screen
    // attributed to the new one.
    setSteps([]);
    setResult(null);
    setError(null);
    setRunning(false);

    const target = client.tail(boxId);
    if (typeof EventSource !== 'function') {
      setError('live tail unavailable in this environment');
      return;
    }

    const source = new EventSource(target.url, { withCredentials: target.withCredentials });

    source.onopen = () => setConnected(true);

    source.onmessage = (message) => {
      let frame: StreamEvent;
      try {
        frame = JSON.parse(message.data as string) as StreamEvent;
      } catch {
        return; // a keepalive or a partial frame
      }
      const reduced = reduceFrame(frame);
      if (reduced.steps.length > 0) {
        setSteps((prev) => {
          const next = [...prev, ...reduced.steps.map((s) => ({ ...s, at: Date.now() }))];
          return next.length > maxRef.current ? next.slice(next.length - maxRef.current) : next;
        });
      }
      if (reduced.running !== undefined) setRunning(reduced.running);
      if (reduced.result) setResult(reduced.result);
      if (reduced.error) setError(reduced.error);
    };

    // EventSource retries on its own, so a transient drop is not worth
    // surfacing. A permanent 404 (the box is gone) would otherwise retry
    // forever in silence, so the disconnected state is at least visible.
    source.onerror = () => setConnected(false);

    return () => {
      source.close();
      setConnected(false);
    };
  }, [client, boxId, enabled]);

  return { steps, connected, running, result, error };
}
