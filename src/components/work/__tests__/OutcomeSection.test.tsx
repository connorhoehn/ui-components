import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OutcomeSection } from '../OutcomeSection';

const TEXT = 'Move service metrics to OpenTelemetry without losing dashboard or alert coverage.';

describe('OutcomeSection', () => {
  it('renders the outcome text under its title', () => {
    render(<OutcomeSection value={TEXT} />);
    expect(screen.getByRole('heading', { name: 'Outcome' })).toBeTruthy();
    expect(screen.getByText(TEXT)).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Edit/ })).toBeNull();
  });

  it('empty: says so, and offers Add outcome only when editable', () => {
    const { rerender } = render(<OutcomeSection value={null} />);
    expect(screen.getByText('No outcome yet')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Add outcome' })).toBeNull();
    rerender(<OutcomeSection value="  " onChange={() => {}} />);
    expect(screen.getByText('No outcome yet')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Add outcome' })).toBeTruthy();
  });

  it('Edit → textarea; blur saves the trimmed draft', () => {
    const onChange = vi.fn();
    render(<OutcomeSection value={TEXT} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit outcome' }));
    const ta = screen.getByRole('textbox', { name: 'Outcome' });
    fireEvent.change(ta, { target: { value: '  New outcome ' } });
    fireEvent.blur(ta);
    expect(onChange).toHaveBeenCalledWith('New outcome');
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('clicking the text edits; ⌘Enter saves; Escape cancels', () => {
    const onChange = vi.fn();
    render(<OutcomeSection value={TEXT} onChange={onChange} />);
    fireEvent.click(screen.getByText(TEXT));
    let ta = screen.getByRole('textbox', { name: 'Outcome' });
    fireEvent.change(ta, { target: { value: 'Draft' } });
    fireEvent.keyDown(ta, { key: 'Escape' });
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText(TEXT));
    ta = screen.getByRole('textbox', { name: 'Outcome' });
    fireEvent.change(ta, { target: { value: 'Saved' } });
    fireEvent.keyDown(ta, { key: 'Enter', metaKey: true });
    expect(onChange).toHaveBeenCalledWith('Saved');
  });

  it('does not save an unchanged value', () => {
    const onChange = vi.fn();
    render(<OutcomeSection value={TEXT} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit outcome' }));
    fireEvent.blur(screen.getByRole('textbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('readOnlyReason hides editing and describes the text', () => {
    render(<OutcomeSection value={TEXT} onChange={() => {}} readOnlyReason="Archived" />);
    expect(screen.queryByRole('button', { name: /Edit/ })).toBeNull();
    const p = screen.getByText(TEXT);
    expect(document.getElementById(p.getAttribute('aria-describedby')!)?.textContent).toBe('Archived');
  });

  it('pending: busy, Saving hint, edit disabled', () => {
    const { container } = render(<OutcomeSection value={TEXT} onChange={() => {}} pending />);
    expect(container.querySelector('[aria-busy="true"]')).toBeTruthy();
    expect(screen.getByText('Saving…')).toBeTruthy();
    expect((screen.getByRole('button', { name: 'Edit outcome' }) as HTMLButtonElement).disabled).toBe(true);
  });
});
