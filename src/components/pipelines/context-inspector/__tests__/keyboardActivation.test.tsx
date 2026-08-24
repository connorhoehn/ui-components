import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { ContextJsonTree } from '../ContextJsonTree';
import { ContextStepList } from '../ContextStepList';
import type { StepContextSnapshot } from '../useContextSnapshots';

// REGRESSION (whole file): both of these render `role="button"` rows that
// handled Enter and Space but never called preventDefault(). The ARIA button
// contract says Space activates; the browser default for Space on a non-button
// is "scroll the scroll container". So pressing Space on a collapse chevron or
// a step row did the right thing AND scrolled the inspector panel out from
// under the user in the same keystroke.

function pressSpace(el: Element): boolean {
  const event = createEvent.keyDown(el, { key: ' ' });
  fireEvent(el, event);
  return event.defaultPrevented;
}

describe('ContextJsonTree keyboard activation', () => {
  it('collapses an object on Space and suppresses the page scroll', () => {
    render(<ContextJsonTree data={{ alpha: 1, beta: 2 }} />);

    const toggle = screen.getAllByRole('button')[0];
    expect(screen.queryByText('2 keys')).not.toBeInTheDocument();

    const prevented = pressSpace(toggle);

    expect(screen.getByText('2 keys')).toBeInTheDocument();
    expect(prevented).toBe(true);
  });

  it('collapses an array on Space and suppresses the page scroll', () => {
    render(<ContextJsonTree data={[1, 2, 3]} />);

    const toggle = screen.getAllByRole('button')[0];
    const prevented = pressSpace(toggle);

    expect(screen.getByText('3 items')).toBeInTheDocument();
    expect(prevented).toBe(true);
  });

  it('still collapses on Enter', () => {
    render(<ContextJsonTree data={{ alpha: 1 }} />);
    const toggle = screen.getAllByRole('button')[0];
    fireEvent.keyDown(toggle, { key: 'Enter' });
    expect(screen.getByText('1 keys')).toBeInTheDocument();
  });
});

describe('ContextStepList keyboard activation', () => {
  const snapshots: StepContextSnapshot[] = [
    { stepId: 'step-a', newKeys: [], context: {} } as unknown as StepContextSnapshot,
    { stepId: 'step-b', newKeys: [], context: {} } as unknown as StepContextSnapshot,
  ];

  it('selects a step on Space and suppresses the page scroll', () => {
    const onStepSelect = vi.fn();
    render(
      <ContextStepList
        snapshots={snapshots}
        activeStepId="step-a"
        onStepSelect={onStepSelect}
      />,
    );

    const row = screen.getAllByRole('button')[1];
    const prevented = pressSpace(row);

    expect(onStepSelect).toHaveBeenCalledWith('step-b');
    expect(prevented).toBe(true);
  });

  it('still selects a step on Enter', () => {
    const onStepSelect = vi.fn();
    render(
      <ContextStepList
        snapshots={snapshots}
        activeStepId="step-a"
        onStepSelect={onStepSelect}
      />,
    );

    fireEvent.keyDown(screen.getAllByRole('button')[1], { key: 'Enter' });
    expect(onStepSelect).toHaveBeenCalledWith('step-b');
  });
});
