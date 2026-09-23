// REGRESSION — a run whose steps are not in the loaded definition (the seeded
// Active Now run, a deleted node) listed every step as "1. unknown", "2. unknown".
// The step's own id is its only true name then.
import { render, screen } from '@testing-library/react';
import type { StepExecution } from '../../../types/pipeline';
import { StepThread } from '../steps/StepThread';

const step = { nodeId: 'Slides', status: 'running', startedAt: '2026-09-22T13:33:00.000Z' } as unknown as StepExecution;

describe('StepThread title', () => {
  it('names a step with no known node by its id, never "unknown"', () => {
    render(<StepThread stepId="Slides" step={step} index={0} nodeType="unknown" />);
    expect(screen.getByText('1. Slides')).toBeInTheDocument();
    expect(screen.queryByText(/unknown/)).toBeNull();
  });

  it('keeps the label and type for a known node', () => {
    render(<StepThread stepId="n-abcdef1234" step={step} index={1} nodeType="agent" nodeConfig={{ label: 'Build slides' }} />);
    expect(screen.getByText('2. Build slides')).toBeInTheDocument();
    expect(screen.getByText('agent')).toBeInTheDocument();
  });

  it('a known type without a label: type as title, short id beside it', () => {
    render(<StepThread stepId="n-abcdef1234" step={step} index={2} nodeType="transform" />);
    expect(screen.getByText('3. transform')).toBeInTheDocument();
    expect(screen.getByText('n-abcdef')).toBeInTheDocument();
  });
});
