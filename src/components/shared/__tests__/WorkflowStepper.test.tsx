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

it('spaces compact connectors on the 4px scale', () => {
  const steps = [1, 2, 3].map((n) => ({ step: n, label: `S${n}`, done: n === 1, active: n === 2 }));
  const { container } = render(<WorkflowStepper steps={steps} size="compact" />);
  const connectors = [...container.querySelectorAll('ol > li > div[aria-hidden="true"]')];
  expect(connectors.length).toBe(2);
  for (const c of connectors) {
    expect(c.className).toContain('mx-2');
    expect(c.className).not.toContain('mx-1.5');
  }
});

describe('WorkflowStepper orientation="vertical" (2.512.0)', () => {
  const LADDER: WorkflowStep[] = [
    { step: 1, label: 'Show', done: true, active: false, description: 'The Little Shop' },
    { step: 2, label: 'Lead', done: true, active: false, description: 'Mina (proposed)', action: <button type="button">Keep</button> },
    { step: 3, label: 'Artwork', done: false, active: true, description: 'No approved concept yet', action: <button type="button">Draw Mina</button> },
    { step: 4, label: 'Episodes', done: false, active: false },
  ];

  it('marks the root and keeps the horizontal strip the default', () => {
    const { getByTestId, rerender } = render(<WorkflowStepper steps={LADDER} />);
    expect(getByTestId('workflow-stepper')).toHaveAttribute('data-orientation', 'horizontal');
    rerender(<WorkflowStepper steps={LADDER} orientation="vertical" />);
    expect(getByTestId('workflow-stepper')).toHaveAttribute('data-orientation', 'vertical');
    expect(screen.getByRole('list').tagName).toBe('OL');
  });

  it('draws done / active / todo markers', () => {
    const { container } = render(<WorkflowStepper steps={LADDER} orientation="vertical" />);
    const markers = [...container.querySelectorAll('[data-workflow-marker]')].map((m) => m.getAttribute('data-workflow-marker'));
    expect(markers).toEqual(['done', 'done', 'active', 'todo']);
    expect(container.querySelectorAll('[data-workflow-marker="done"] svg')).toHaveLength(2);
  });

  it('fills the connectors as the workflow advances, none after the last step', () => {
    const { container } = render(<WorkflowStepper steps={LADDER} orientation="vertical" />);
    const fills = [...container.querySelectorAll('[data-workflow-connector]')].map((c) => c.getAttribute('data-workflow-connector'));
    expect(fills).toEqual(['full', 'partial', 'none']);
    expect(container.querySelector('[data-workflow-connector="full"]')!.className).toContain('bg-success');
    expect(container.querySelector('[data-workflow-connector="none"]')!.className).toContain('bg-border');
  });

  it('shows each step\'s fact and the action on the active step only', () => {
    render(<WorkflowStepper steps={LADDER} orientation="vertical" />);
    const rows = screen.getAllByRole('listitem');
    expect(rows[1]).toHaveTextContent('LeadMina (proposed)');
    expect(screen.queryByRole('button', { name: 'Keep' })).toBeNull();
    const action = screen.getByRole('button', { name: 'Draw Mina' });
    expect(rows[2]).toContainElement(action);
    expect(rows[2]).toHaveAttribute('aria-current', 'step');
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('never draws an action in the horizontal strip', () => {
    render(<WorkflowStepper steps={LADDER} />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
