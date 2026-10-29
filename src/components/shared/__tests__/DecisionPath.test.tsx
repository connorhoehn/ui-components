import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { DecisionPath } from '../DecisionPath';

afterEach(cleanup);

const STEPS = ['Choose', 'Draft request', 'Confirm', 'Done'];

describe('DecisionPath', () => {
  it('marks completed steps, names the current one and numbers the rest', () => {
    render(<DecisionPath steps={STEPS} current={2} />);
    const list = screen.getByRole('list', { name: 'Decision path' });
    expect(list.getAttribute('data-decision-path')).toBe('2');
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(4);
    expect(items[0]!.hasAttribute('data-complete')).toBe(true);
    expect(items[1]!.hasAttribute('data-complete')).toBe(true);
    expect(items[0]!.querySelector('svg')).toBeTruthy();
    expect(items[2]!.getAttribute('aria-current')).toBe('step');
    expect(items[2]!.hasAttribute('data-complete')).toBe(false);
    expect(items[2]!.textContent).toContain('3');
    expect(items[3]!.getAttribute('aria-current')).toBeNull();
    expect(items[3]!.textContent).toContain('4');
    // Arrows join the steps and are decoration; the last step has none.
    expect([...list.querySelectorAll('[aria-hidden="true"]')].filter((el) => el.textContent === '→')).toHaveLength(3);
    expect(items[2]!.getAttribute('data-decision-step')).toBe('Confirm');
  });

  it('past the last step every step is complete and nothing is current', () => {
    render(<DecisionPath steps={['Choose', 'Saved']} current={2} aria-label="Save path" data-testid="saved" />);
    const list = screen.getByTestId('saved');
    expect(list.getAttribute('aria-label')).toBe('Save path');
    expect(list.getAttribute('data-decision-path')).toBe('complete');
    expect(list.querySelectorAll('[data-complete]')).toHaveLength(2);
    expect(list.querySelector('[aria-current="step"]')).toBeNull();
  });
});
