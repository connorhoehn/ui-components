// StepAttempts — the retry history nothing in the product used to render.
//
// The interesting cases are the ones where the step's own top-level fields lie
// by omission: a step that eventually succeeded still has failed attempts in
// `attempts[]`, and those failures (and the backoff between them) are the whole
// reason this component exists.

import { render, screen } from '@testing-library/react';
import type { StepAttempt } from '../../../types/pipeline';
import { StepAttempts } from '../steps/StepAttempts';

const attempt = (over: Partial<StepAttempt> & { attemptNumber: number }): StepAttempt => ({
  startedAt: '2026-08-16T10:00:00.000Z',
  idempotencyKey: `run-1:node-1:${over.attemptNumber}`,
  ...over,
});

describe('StepAttempts', () => {
  it('renders nothing when there is no attempt history', () => {
    const { container } = render(<StepAttempts attempts={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for a single successful attempt', () => {
    const { container } = render(
      <StepAttempts attempts={[attempt({ attemptNumber: 1, durationMs: 850 })]} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('does render a lone attempt that failed', () => {
    render(
      <StepAttempts
        attempts={[
          attempt({ attemptNumber: 1, durationMs: 120, error: 'boom', errorCategory: 'UnknownError' }),
        ]}
      />,
    );
    expect(screen.getByText('boom')).toBeInTheDocument();
  });

  it('counts an attempt with an EMPTY error as the failure it is', () => {
    // A thrown value with no message (an AggregateError from a refused
    // connection) produced three attempts with `error: ''`, and the history
    // read "succeeded on attempt 3 after 0 failures" over a step that failed.
    render(
      <StepAttempts
        attempts={[
          attempt({ attemptNumber: 1, durationMs: 150, error: '', retryAfterMs: 1500 }),
          attempt({ attemptNumber: 2, durationMs: 150, error: '' }),
        ]}
      />,
    );
    expect(screen.getByText('2 attempts, all failed')).toBeInTheDocument();
    expect(screen.getAllByText('Failed without a message')).toHaveLength(2);
  });

  it('shows the error and errorCategory of an earlier failed attempt', () => {
    render(
      <StepAttempts
        attempts={[
          attempt({
            attemptNumber: 1,
            durationMs: 4200,
            error: 'connect ETIMEDOUT 10.4.2.19:443',
            errorCategory: 'NetworkError',
            retryAfterMs: 2000,
          }),
          attempt({ attemptNumber: 2, durationMs: 1900 }),
        ]}
      />,
    );
    expect(screen.getByText('connect ETIMEDOUT 10.4.2.19:443')).toBeInTheDocument();
    expect(screen.getByText('NetworkError')).toBeInTheDocument();
  });

  it('renders the backoff in human terms, not as a bare number', () => {
    render(
      <StepAttempts
        attempts={[
          attempt({ attemptNumber: 1, durationMs: 100, error: 'nope', retryAfterMs: 2000 }),
          attempt({ attemptNumber: 2, durationMs: 150, error: 'nope again', retryAfterMs: 500 }),
          attempt({ attemptNumber: 3, durationMs: 200 }),
        ]}
      />,
    );
    expect(screen.getByText('Waited 2s before retrying')).toBeInTheDocument();
    expect(screen.getByText('Waited 500ms before retrying')).toBeInTheDocument();
    // The raw millisecond value must not leak out on its own.
    expect(screen.queryByText('2000')).not.toBeInTheDocument();
  });

  it('omits the backoff line for an attempt that was not retried', () => {
    render(
      <StepAttempts
        attempts={[
          attempt({ attemptNumber: 1, durationMs: 100, error: 'nope', retryAfterMs: 1000 }),
          attempt({ attemptNumber: 2, durationMs: 150, error: 'final failure' }),
        ]}
      />,
    );
    expect(screen.getAllByText(/before retrying/)).toHaveLength(1);
  });

  it('orders rows by attemptNumber even when the input array is out of order', () => {
    render(
      <StepAttempts
        attempts={[
          attempt({ attemptNumber: 3, durationMs: 200 }),
          attempt({ attemptNumber: 1, durationMs: 100, error: 'first failure' }),
          attempt({ attemptNumber: 2, durationMs: 150, error: 'second failure' }),
        ]}
      />,
    );
    const rows = screen.getAllByRole('listitem');
    expect(rows.map((r) => r.getAttribute('data-testid'))).toEqual([
      'step-attempt-1',
      'step-attempt-2',
      'step-attempt-3',
    ]);
  });

  it('marks only the highest-numbered attempt as final', () => {
    render(
      <StepAttempts
        attempts={[
          attempt({ attemptNumber: 2, durationMs: 150 }),
          attempt({ attemptNumber: 1, durationMs: 100, error: 'first failure' }),
        ]}
      />,
    );
    expect(screen.getByTestId('step-attempt-1')).toHaveAttribute('data-final', 'false');
    expect(screen.getByTestId('step-attempt-2')).toHaveAttribute('data-final', 'true');
    expect(screen.getAllByText('final')).toHaveLength(1);
  });

  it('summarises a recovered step and an exhausted one differently', () => {
    const { unmount } = render(
      <StepAttempts
        attempts={[
          attempt({ attemptNumber: 1, durationMs: 100, error: 'nope', retryAfterMs: 1000 }),
          attempt({ attemptNumber: 2, durationMs: 150 }),
        ]}
      />,
    );
    expect(screen.getByText('succeeded on attempt 2 after 1 failure')).toBeInTheDocument();
    unmount();

    render(
      <StepAttempts
        attempts={[
          attempt({ attemptNumber: 1, durationMs: 100, error: 'nope', retryAfterMs: 1000 }),
          attempt({ attemptNumber: 2, durationMs: 150, error: 'still nope' }),
        ]}
      />,
    );
    expect(screen.getByText('2 attempts, all failed')).toBeInTheDocument();
  });

  it('does not mutate the caller-supplied array', () => {
    const attempts = [
      attempt({ attemptNumber: 2, durationMs: 150 }),
      attempt({ attemptNumber: 1, durationMs: 100, error: 'first failure' }),
    ];
    render(<StepAttempts attempts={attempts} />);
    expect(attempts.map((a) => a.attemptNumber)).toEqual([2, 1]);
  });

  it('shows the idempotencyKey quietly rather than as body text', () => {
    render(
      <StepAttempts
        attempts={[
          attempt({ attemptNumber: 1, durationMs: 100, error: 'nope', idempotencyKey: 'run-9:llm:1' }),
          attempt({ attemptNumber: 2, durationMs: 150, idempotencyKey: 'run-9:llm:2' }),
        ]}
      />,
    );
    const key = screen.getByText('run-9:llm:1');
    expect(key).toBeInTheDocument();
    expect(key.className).toContain('font-mono');
    expect(key.className).toContain('text-text-tertiary');
  });

  it('paints failures with the danger token pair, never a raw colour', () => {
    const { container } = render(
      <StepAttempts
        attempts={[
          attempt({ attemptNumber: 1, durationMs: 100, error: 'nope', errorCategory: 'NetworkError' }),
          attempt({ attemptNumber: 2, durationMs: 150 }),
        ]}
      />,
    );
    const errorBox = screen.getByText('nope');
    expect(errorBox.className).toContain('bg-danger-bg');
    expect(errorBox.className).toContain('text-danger-fg');
    expect(container.querySelector('[style]')).toBeNull();
    expect(container.innerHTML).not.toMatch(/#[0-9a-f]{3,6}\b/i);
  });
});
