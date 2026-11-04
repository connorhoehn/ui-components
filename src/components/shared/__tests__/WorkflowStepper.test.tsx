import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { WorkflowStepper, type WorkflowStep } from '../WorkflowStepper';

const STEPS: WorkflowStep[] = [
  { step: 1, label: 'Intake', done: true, active: false },
  { step: 2, label: 'Classify', done: true, active: false },
  { step: 3, label: 'Score', done: false, active: true },
  { step: 4, label: 'Review', done: false, active: false },
  { step: 5, label: 'Publish', done: false, active: false },
  { step: 6, label: 'Follow-up', done: false, active: false },
];

afterEach(cleanup);

describe('WorkflowStepper', () => {
  it('renders one list item per step with its label', () => {
    render(<WorkflowStepper steps={STEPS} />);
    STEPS.forEach((s) => expect(screen.getByText(s.label)).toBeInTheDocument());
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
  });

  it('marks exactly one step aria-current="step"', () => {
    render(<WorkflowStepper steps={STEPS} />);
    const current = screen.getAllByRole('listitem').filter((li) => li.getAttribute('aria-current') === 'step');
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveTextContent('Score');
  });

  it('marks no step current when none is active', () => {
    render(<WorkflowStepper steps={STEPS.map((s) => ({ ...s, active: false }))} />);
    const current = screen.getAllByRole('listitem').filter((li) => li.getAttribute('aria-current') === 'step');
    expect(current).toHaveLength(0);
  });

  it('renders as an ordered list', () => {
    render(<WorkflowStepper steps={STEPS} />);
    expect(screen.getByRole('list').tagName).toBe('OL');
  });
});

it('keeps recorded timing under its milestone and distinguishes a failed terminal state', () => {
  render(<WorkflowStepper steps={[
    { step: 1, label: 'Queued', description: '08:00:00', done: true, active: false },
    { step: 2, label: 'Failed', description: '08:01:00', done: false, active: true, outcome: 'failed' },
  ]} />);
  const rows = screen.getAllByRole('listitem');
  expect(rows[0]).toHaveTextContent('Queued08:00:00');
  expect(rows[1]).toHaveTextContent('Failed08:01:00');
  expect(rows[1]).toHaveAttribute('data-state', 'failed');
  expect(rows[1].querySelector('svg')).toBeNull();
});

it('wraps instead of scrolling when wrap is set', () => {
  const steps = Array.from({ length: 8 }, (_, i) => ({ step: i + 1, label: `Stage ${i + 1}`, done: i < 3, active: i === 3 }));
  const { getByTestId, rerender } = render(<WorkflowStepper steps={steps} />);
  expect(getByTestId('workflow-stepper').className).toContain('overflow-x-auto');
  rerender(<WorkflowStepper steps={steps} wrap />);
  const track = getByTestId('workflow-stepper');
  expect(track.className).toContain('flex-wrap');
  expect(track.className).not.toContain('overflow-x-auto');
  expect(track.hasAttribute('data-wrap')).toBe(true);
});
