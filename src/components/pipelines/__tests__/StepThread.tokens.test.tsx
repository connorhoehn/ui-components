// REGRESSION — the collapsed step header printed "NaN tok".
//
// `step.output` is `Record<string, unknown>`. The header's guard checked only
// `tokensIn`, then summed `Number(output.tokensIn) + Number(output.tokensOut)`
// — and `Number(undefined)` is NaN, so a step reporting input tokens but no
// output tokens rendered "NaN tok". Expanding the very same row showed
// "Tokens in: 4200 / Tokens out: —", because the detail panel had always used
// `?? '—'` on both halves.

import { render, screen, fireEvent } from '@testing-library/react';
import type { StepExecution } from '../../../types/pipeline';
import { StepThread } from '../steps/StepThread';

const baseStep = (output: Record<string, unknown>): StepExecution =>
  ({
    nodeId: 'embed',
    status: 'completed',
    startedAt: '2026-08-16T10:00:00.000Z',
    completedAt: '2026-08-16T10:00:01.000Z',
    output,
  }) as unknown as StepExecution;

const renderThread = (step: StepExecution) =>
  render(
    <StepThread stepId="embed" step={step} index={0} nodeType="transform" />,
  );

describe('StepThread token summary', () => {
  it('does not print NaN when only tokensIn is reported', () => {
    renderThread(baseStep({ tokensIn: 4200 }));
    expect(screen.getByText('4200 tok')).toBeInTheDocument();
    expect(screen.queryByText(/NaN/)).not.toBeInTheDocument();
  });

  it('sums both halves when both are reported', () => {
    renderThread(baseStep({ tokensIn: 4200, tokensOut: 300 }));
    expect(screen.getByText('4500 tok')).toBeInTheDocument();
  });

  it('ignores a non-numeric token field rather than poisoning the sum', () => {
    renderThread(baseStep({ tokensIn: 10, tokensOut: 'unknown' }));
    expect(screen.getByText('10 tok')).toBeInTheDocument();
    expect(screen.queryByText(/NaN/)).not.toBeInTheDocument();
  });

  it('agrees with the expanded detail panel', () => {
    renderThread(baseStep({ tokensIn: 4200 }));
    fireEvent.click(screen.getByRole('button', { name: /transform/ }));
    fireEvent.click(screen.getByTestId('step-technical-toggle-embed'));
    expect(screen.getByText('4200')).toBeInTheDocument(); // Tokens in
    expect(screen.getByText('—')).toBeInTheDocument(); // Tokens out
  });
});
