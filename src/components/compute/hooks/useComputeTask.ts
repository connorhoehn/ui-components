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
//
// `gate` / `delivery` are also tail-only: a governed dispatch refused at a
// budget gate (`gate_refused`, the 409 body verbatim) and a run's change
// captured for review (`delivery`). See `gateStep` / `deliveryStep`.
export type TaskStepKind = 'text' | 'tool' | 'result' | 'error' | 'meta' | 'job' | 'job_end' | 'gate' | 'delivery';

/** One item of an agent's plan — the `TodoWrite` tool's own input shape. */
export interface PlanItem {
  content: string;
  /** Present-tense wording for the item in flight ("Running the tests"). */
  activeForm?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

/** A dispatch held at a budget gate — the 409 body of a governed dispatch. */
export interface GateRefusal {
  /** `run-budget` / `allocation` / `envelope`, or whatever gate the host names. */
  gate: string;
  /** The flag that would clear it, e.g. `confirmOverEnvelope`. */
  confirmFlag?: string;
  error: string;
  workItemId?: string;
  workItemTitle?: string;
}

/** A run's change, captured and posted for review. */
export interface RunDelivery {
  title: string;
  workItemId?: string;
  branch?: string;
  commitSha?: string;
  prUrl?: string;
  prNumber?: number;
  captureId?: string;
}

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
  /** `result` only: the run's final words (the frame's `result` string), when it carried any. */
  summary?: string;
  /** `tool` only, for a `TodoWrite` call: the plan it wrote. The latest one is the run's plan. */
  plan?: PlanItem[];
  /** `gate` only. */
  gate?: GateRefusal;
  /** `delivery` only. */
  delivery?: RunDelivery;
  at: number;
}

const PLAN_STATUSES = new Set<PlanItem['status']>(['pending', 'in_progress', 'completed']);

/**
 * Read a `TodoWrite` input as a plan. Items that are not plan-shaped are
 * dropped rather than guessed at; an unknown status reads as pending.
 */
export function parsePlan(input: Record<string, unknown>): PlanItem[] | null {
  const todos = input['todos'];
  if (!Array.isArray(todos)) return null;
  const plan: PlanItem[] = [];
  for (const todo of todos) {
    if (!todo || typeof todo !== 'object') continue;
    const t = todo as Record<string, unknown>;
    const content = typeof t['content'] === 'string' ? t['content'].trim() : '';
    if (!content) continue;
    const status = PLAN_STATUSES.has(t['status'] as PlanItem['status']) ? (t['status'] as PlanItem['status']) : 'pending';
    const activeForm = typeof t['activeForm'] === 'string' && t['activeForm'].trim() ? t['activeForm'].trim() : undefined;
    plan.push({ content, status, ...(activeForm ? { activeForm } : {}) });
  }
  return plan;
}

/**
 * One `tool_use` block as a step. A `TodoWrite` carries its plan; its line
 * says how far along the plan is, which is what a log reader wants from it.
 */
export function toolStep(name: string, input: Record<string, unknown>): Omit<TaskStep, 'at'> {
  if (name === 'TodoWrite') {
    const plan = parsePlan(input);
    if (plan) {
      const done = plan.filter((item) => item.status === 'completed').length;
      return { kind: 'tool', tool: name, text: `plan · ${done} of ${plan.length} done`, plan };
    }
  }
  return { kind: 'tool', tool: name, text: summarizeTool(name, input) };
}

const str = (value: unknown): string | undefined => (typeof value === 'string' && value.trim() ? value.trim() : undefined);

/** A `gate_refused` frame as a step: "Held at the envelope gate — … · needs confirmOverEnvelope". */
export function gateStep(event: Record<string, unknown>): Omit<TaskStep, 'at'> {
  const gate: GateRefusal = {
    gate: str(event['gate']) ?? 'budget',
    error: str(event['error']) ?? 'the dispatch was refused',
    ...(str(event['confirmFlag']) ? { confirmFlag: str(event['confirmFlag']) } : {}),
    ...(str(event['workItemId']) ? { workItemId: str(event['workItemId']) } : {}),
    ...(str(event['workItemTitle']) ? { workItemTitle: str(event['workItemTitle']) } : {}),
  };
  const parts = [`Held at the ${gate.gate} gate`, gate.error];
  if (gate.confirmFlag) parts.push(`needs ${gate.confirmFlag}`);
  return { kind: 'gate', text: parts.join(' · '), gate };
}

/** A `delivery` frame as a step: "Change posted for review · title · abc1234 · PR #12". */
export function deliveryStep(event: Record<string, unknown>): Omit<TaskStep, 'at'> {
  const prNumber = typeof event['prNumber'] === 'number' && Number.isFinite(event['prNumber']) ? event['prNumber'] : undefined;
  const delivery: RunDelivery = {
    title: str(event['title']) ?? 'Change captured',
    ...(str(event['workItemId']) ? { workItemId: str(event['workItemId']) } : {}),
    ...(str(event['branch']) ? { branch: str(event['branch']) } : {}),
    ...(str(event['commitSha']) ? { commitSha: str(event['commitSha']) } : {}),
    ...(str(event['prUrl']) ? { prUrl: str(event['prUrl']) } : {}),
    ...(prNumber !== undefined ? { prNumber } : {}),
    ...(str(event['captureId']) ? { captureId: str(event['captureId']) } : {}),
  };
  const parts = ['Change posted for review', delivery.title];
  if (delivery.commitSha) parts.push(delivery.commitSha.slice(0, 7));
  if (delivery.prNumber !== undefined) parts.push(`PR #${delivery.prNumber}`);
  else if (delivery.prUrl) parts.push(delivery.prUrl);
  return { kind: 'delivery', text: parts.join(' · '), delivery };
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
                  push(toolStep(tool, (block['input'] ?? {}) as Record<string, unknown>));
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
              const summary = typeof event['result'] === 'string' ? event['result'].trim() : '';
              push({
                kind: 'result',
                text: `${tally.turns} turns · ${(tally.durationMs / 1000).toFixed(0)}s · $${tally.costUsd.toFixed(4)}`,
                result: tally,
                ...(summary ? { summary } : {}),
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
