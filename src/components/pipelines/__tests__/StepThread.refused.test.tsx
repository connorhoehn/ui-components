// A step that REFUSED (category `Refused` on its latest attempt, or a
// refusal code in `step.error`) decided on the inputs it already had, so its
// expanded row offers neither "Retry from here" nor "Resume from here" —
// absent, not disabled — even when the host passes both callbacks, and its
// error section is titled `Refused (<code>):` with the message verbatim. A
// plain failed step keeps both buttons and the `Error` title exactly as
// before; the gate is the step's own classification, not the host's props.

import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { StepAttempt, StepExecution } from '../../../types/pipeline';
import { StepThread } from '../steps/StepThread';

const step = (over: Partial<StepExecution>): StepExecution =>
  ({
    nodeId: 'deck-revise',
    status: 'failed',
    startedAt: '2026-09-23T10:00:00.000Z',
    completedAt: '2026-09-23T10:00:01.000Z',
    ...over,
  }) as unknown as StepExecution;

const attempt = (n: number, over: Partial<StepAttempt>): StepAttempt => ({
  attemptNumber: n,
  startedAt: '2026-09-23T10:00:00.000Z',
  idempotencyKey: `r1:deck-revise:${n}`,
  ...over,
});

const expand = (stepId: string) => fireEvent.click(screen.getByTestId(`step-row-${stepId}`));

const REFUSAL = 'deck-revise constraint-not-met: Title has 2 words; it must have exactly 0.';

describe('StepThread — a refused step offers no Retry/Resume', () => {
  it('category Refused on the latest attempt: refusal section, no buttons, both callbacks passed', () => {
    const onRetryFromStep = vi.fn();
    const onResumeFromStep = vi.fn();
    render(
      <StepThread
        stepId="s1"
        index={0}
        nodeType="agent"
        step={step({
          error: 'the step said no',
          attempts: [
            attempt(1, { error: 'timeout', errorCategory: 'TimeoutError' }),
            attempt(2, { error: 'the step said no', errorCategory: 'Refused' }),
          ],
        })}
        onRetryFromStep={onRetryFromStep}
        onResumeFromStep={onResumeFromStep}
      />,
    );
    expand('s1');

    expect(screen.getByTestId('step-refused-s1')).toHaveTextContent('the step said no');
    expect(screen.getByTestId('step-refused-reason-s1')).toHaveTextContent(/retrying or resuming would refuse the same way/);
    expect(screen.getByText('Refused (refused):')).toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();

    expect(screen.queryByTestId('retry-from-step-s1')).toBeNull();
    expect(screen.queryByTestId('resume-from-step-s1')).toBeNull();
    expect(screen.queryByText(/Retry from here/)).toBeNull();
    expect(screen.queryByText(/Resume from here/)).toBeNull();
    expect(onRetryFromStep).not.toHaveBeenCalled();
    expect(onResumeFromStep).not.toHaveBeenCalled();
  });

  it('a refusal code in step.error alone (no attempts) gates the same way and names the code', () => {
    render(
      <StepThread
        stepId="s2"
        index={0}
        nodeType="agent"
        step={step({ error: REFUSAL })}
        onRetryFromStep={vi.fn()}
        onResumeFromStep={vi.fn()}
      />,
    );
    expand('s2');

    expect(screen.getByText('Refused (constraint-not-met):')).toBeInTheDocument();
    expect(screen.getByTestId('step-refused-s2')).toHaveTextContent(REFUSAL);
    expect(screen.getByTestId('step-refused-reason-s2')).toBeInTheDocument();
    expect(screen.queryByTestId('retry-from-step-s2')).toBeNull();
    expect(screen.queryByTestId('resume-from-step-s2')).toBeNull();
  });

  it('a plain failed step with both callbacks still renders both buttons and the Error title', () => {
    const onRetryFromStep = vi.fn();
    const onResumeFromStep = vi.fn();
    render(
      <StepThread
        stepId="s3"
        index={0}
        nodeType="agent"
        step={step({
          error: 'model unavailable (503)',
          attempts: [attempt(1, { error: 'model unavailable (503)', errorCategory: 'LLMError' })],
        })}
        onRetryFromStep={onRetryFromStep}
        onResumeFromStep={onResumeFromStep}
      />,
    );
    expand('s3');

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.queryByText(/^Refused \(/)).toBeNull();
    expect(screen.queryByTestId('step-refused-s3')).toBeNull();
    expect(screen.queryByTestId('step-refused-reason-s3')).toBeNull();

    fireEvent.click(screen.getByTestId('retry-from-step-s3'));
    fireEvent.click(screen.getByTestId('resume-from-step-s3'));
    expect(onRetryFromStep).toHaveBeenCalledWith('s3');
    expect(onResumeFromStep).toHaveBeenCalledWith('s3');
  });

  it('"403 Forbidden" mid-sentence is a plain failure, not a refusal', () => {
    render(
      <StepThread
        stepId="s4"
        index={0}
        nodeType="agent"
        step={step({ error: 'upstream answered 403 Forbidden while fetching the deck' })}
        onRetryFromStep={vi.fn()}
        onResumeFromStep={vi.fn()}
      />,
    );
    expand('s4');

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByTestId('retry-from-step-s4')).toBeInTheDocument();
    expect(screen.getByTestId('resume-from-step-s4')).toBeInTheDocument();
  });
});
