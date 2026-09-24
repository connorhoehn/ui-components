// A refusal is a decision about inputs the run already holds, so the run page
// and <StepThread> gate Retry/Resume on these helpers. They read the
// platform's category first, then its retryability, then the message — a
// row written before `Refused` existed still reads right — and they must NOT
// read `403 Forbidden` mid-sentence as a refusal, or an outage would lose its
// Retry button.

import { describe, it, expect } from 'vitest';
import type { PipelineRun, StepAttempt, StepExecution } from '../../../../types/pipeline';
import {
  REFUSAL_CODES,
  refusalCodeOf,
  refusalNotRetryableReason,
  runRefusal,
  stepRefusal,
} from '../runRefusal';

const failed = (error: PipelineRun['error']): Pick<PipelineRun, 'status' | 'error'> => ({ status: 'failed', error });

const step = (over: Partial<StepExecution>): StepExecution =>
  ({
    nodeId: 'deck-revise',
    status: 'failed',
    startedAt: '2026-09-23T10:00:00.000Z',
    completedAt: '2026-09-23T10:00:01.000Z',
    ...over,
  }) as unknown as StepExecution;

describe('refusalCodeOf', () => {
  it.each(REFUSAL_CODES)('reads `<step> %s: <reason>` as that code', (code) => {
    expect(refusalCodeOf(`deck-revise ${code}: the reason, verbatim.`)).toBe(code);
  });

  it('is case-insensitive on the code and returns it lower-cased', () => {
    expect(refusalCodeOf('deck-revise Constraint-Not-Met: Title has 2 words.')).toBe('constraint-not-met');
    expect(refusalCodeOf('deck-revise FORBIDDEN: nope.')).toBe('forbidden');
  });

  it('finds the refusal after a `: ` prefix (a wrapped message)', () => {
    expect(refusalCodeOf('Step failed: deck-revise revision-conflict: base revision 3 is behind 5.')).toBe(
      'revision-conflict',
    );
  });

  it('does not read `403 Forbidden` mid-sentence as a refusal', () => {
    expect(refusalCodeOf('upstream answered 403 Forbidden while fetching the deck')).toBeNull();
    expect(refusalCodeOf('the request was forbidden: by policy')).toBeNull();
  });

  it('is null for an empty, missing or plain message', () => {
    expect(refusalCodeOf('')).toBeNull();
    expect(refusalCodeOf(null)).toBeNull();
    expect(refusalCodeOf(undefined)).toBeNull();
    expect(refusalCodeOf('model unavailable (503)')).toBeNull();
  });
});

describe('runRefusal', () => {
  const REFUSAL = 'deck-revise constraint-not-met: Title has 2 words; it must have exactly 0.';

  it('reads the platform category first, with the code and message verbatim', () => {
    expect(
      runRefusal(failed({ nodeId: 'deck-revise', message: REFUSAL, errorCategory: 'Refused', retryability: 'terminal' })),
    ).toEqual({ code: 'constraint-not-met', message: REFUSAL, nodeId: 'deck-revise' });
  });

  it('category Refused without a known code in the message is code `refused`', () => {
    expect(runRefusal(failed({ nodeId: 'deck-revise', message: 'the step said no', errorCategory: 'Refused' }))).toEqual({
      code: 'refused',
      message: 'the step said no',
      nodeId: 'deck-revise',
    });
  });

  it('retryability terminal alone is code `refused`', () => {
    expect(runRefusal(failed({ nodeId: 'deck-revise', message: 'the step said no', retryability: 'terminal' }))).toEqual({
      code: 'refused',
      message: 'the step said no',
      nodeId: 'deck-revise',
    });
  });

  it('a refusal code in the message alone (row written before the category existed) is that code', () => {
    expect(runRefusal(failed({ nodeId: 'deck-revise', message: 'deck-revise forbidden: requester may not revise.' }))).toEqual({
      code: 'forbidden',
      message: 'deck-revise forbidden: requester may not revise.',
      nodeId: 'deck-revise',
    });
  });

  it('omits an `unknown` nodeId', () => {
    expect(runRefusal(failed({ nodeId: 'unknown', message: REFUSAL, errorCategory: 'Refused' }))).toEqual({
      code: 'constraint-not-met',
      message: REFUSAL,
    });
  });

  it('is null for an outage, a non-failed run, a run without an error, and no run', () => {
    expect(runRefusal(failed({ nodeId: 'deck-revise', message: 'model unavailable (503)', errorCategory: 'LLMError' }))).toBeNull();
    expect(runRefusal(failed({ nodeId: 'deck-revise', message: '403 Forbidden from upstream', retryability: 'retryable' }))).toBeNull();
    expect(runRefusal({ status: 'completed', error: { nodeId: 'deck-revise', message: REFUSAL, errorCategory: 'Refused' } })).toBeNull();
    expect(runRefusal({ status: 'running', error: undefined })).toBeNull();
    expect(runRefusal(failed(undefined))).toBeNull();
    expect(runRefusal(null)).toBeNull();
    expect(runRefusal(undefined)).toBeNull();
  });
});

describe('stepRefusal', () => {
  const attempt = (n: number, over: Partial<StepAttempt>): StepAttempt => ({
    attemptNumber: n,
    startedAt: '2026-09-23T10:00:00.000Z',
    idempotencyKey: `r1:deck-revise:${n}`,
    ...over,
  });

  it('the LATEST attempt decides: Refused there is a refusal even if an earlier attempt was an outage', () => {
    expect(
      stepRefusal(
        step({
          error: 'the step said no',
          attempts: [
            attempt(1, { error: 'timeout', errorCategory: 'TimeoutError' }),
            attempt(2, { error: 'the step said no', errorCategory: 'Refused' }),
          ],
        }),
      ),
    ).toEqual({ code: 'refused', message: 'the step said no', nodeId: 'deck-revise' });
  });

  it('an earlier Refused attempt does not gate a step whose latest attempt is an outage', () => {
    expect(
      stepRefusal(
        step({
          error: 'timeout',
          attempts: [
            attempt(1, { error: 'the step said no', errorCategory: 'Refused' }),
            attempt(2, { error: 'timeout', errorCategory: 'TimeoutError' }),
          ],
        }),
      ),
    ).toBeNull();
  });

  it('reads the refusal code from step.error', () => {
    expect(stepRefusal(step({ error: 'deck-revise invalid-request: no proposal attached.' }))).toEqual({
      code: 'invalid-request',
      message: 'deck-revise invalid-request: no proposal attached.',
      nodeId: 'deck-revise',
    });
  });

  it('falls back to the last attempt\'s error when step.error is absent', () => {
    expect(
      stepRefusal(
        step({
          error: undefined,
          attempts: [attempt(1, { error: 'deck-revise revision-conflict: base revision 3 is behind 5.' })],
        }),
      ),
    ).toEqual({
      code: 'revision-conflict',
      message: 'deck-revise revision-conflict: base revision 3 is behind 5.',
      nodeId: 'deck-revise',
    });
  });

  it('is null for a plain failure, a non-failed step, and no step', () => {
    expect(stepRefusal(step({ error: 'model unavailable (503)' }))).toBeNull();
    expect(stepRefusal(step({ error: 'boom', attempts: [attempt(1, { error: 'boom', errorCategory: 'LLMError' })] }))).toBeNull();
    expect(stepRefusal(step({ status: 'completed', error: 'deck-revise forbidden: nope.' }))).toBeNull();
    expect(stepRefusal(null)).toBeNull();
    expect(stepRefusal(undefined)).toBeNull();
  });
});

describe('refusalNotRetryableReason', () => {
  it('names the code and says why neither retry nor resume is offered', () => {
    const reason = refusalNotRetryableReason({ code: 'constraint-not-met', message: 'x' });
    expect(reason).toMatch(/^Refused \(constraint-not-met\): /);
    expect(reason).toMatch(/retrying or resuming would refuse the same way/);
    expect(reason).toMatch(/start a new run/);
  });
});

describe('ModelAuth (Loop 29 ppt)', () => {
  it('a model sign-in failure is terminal but not a refusal', async () => {
    const { runModelAuth } = await import('../runRefusal');
    const run = { status: 'failed', error: { message: 'deck-revise model-auth: The agent could not sign in', errorCategory: 'ModelAuth', retryability: 'terminal' } } as never;
    expect(runRefusal(run)).toBeNull();
    expect(runModelAuth(run)).toBe(true);
  });
});
