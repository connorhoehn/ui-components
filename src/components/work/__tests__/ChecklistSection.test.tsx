import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChecklistSection, type ChecklistItem } from '../ChecklistSection';

const ITEMS: ChecklistItem[] = [
  { id: 'a', text: 'Route metrics through the collector', done: true },
  { id: 'b', text: 'Verify dashboard and alert parity', done: false },
  { id: 'c', text: 'Keep a rollback path during migration', done: false },
];

describe('ChecklistSection', () => {
  it('renders rows and the "1 of 3" hint', () => {
    render(<ChecklistSection variant="label" items={ITEMS} />);
    expect(screen.getByRole('heading', { name: 'Acceptance criteria' })).toBeTruthy();
    expect(screen.getByText('1 of 3')).toBeTruthy();
    expect((screen.getByRole('checkbox', { name: ITEMS[0].text }) as HTMLInputElement).checked).toBe(true);
    // No callbacks → no affordances.
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('empty state with no hint', () => {
    render(<ChecklistSection items={[]} emptyLabel="Nothing to verify yet" />);
    expect(screen.getByText('Nothing to verify yet')).toBeTruthy();
    expect(screen.queryByText(/of 0/)).toBeNull();
  });

  it('toggles', () => {
    const onToggle = vi.fn();
    render(<ChecklistSection items={ITEMS} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('checkbox', { name: ITEMS[1].text }));
    expect(onToggle).toHaveBeenCalledWith('b', true);
  });

  it('adds on Enter and clears; ignores blank', () => {
    const onAdd = vi.fn();
    render(<ChecklistSection variant="label" items={ITEMS} onAdd={onAdd} />);
    const input = screen.getByRole('textbox', { name: 'Add criterion' }) as HTMLInputElement;
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onAdd).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: ' Alert on drop ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onAdd).toHaveBeenCalledWith('Alert on drop');
    expect(input.value).toBe('');
  });

  it('heading variant: no tally; "Add criterion" opens the field on request, Escape closes it', () => {
    const onAdd = vi.fn();
    render(<ChecklistSection items={ITEMS} onAdd={onAdd} />);
    expect(screen.queryByText('1 of 3')).toBeNull();
    expect(screen.queryByRole('textbox')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Add criterion' }));
    const input = screen.getByRole('textbox', { name: 'Add criterion' }) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Alert on drop' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onAdd).toHaveBeenCalledWith('Alert on drop');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('edits in place: Enter commits, Escape cancels', () => {
    const onEdit = vi.fn();
    render(<ChecklistSection items={ITEMS} onEdit={onEdit} />);
    fireEvent.click(screen.getByRole('button', { name: `Edit "${ITEMS[1].text}"` }));
    let input = screen.getByRole('textbox', { name: 'Edit criterion' });
    fireEvent.change(input, { target: { value: 'Verify parity' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onEdit).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: `Edit "${ITEMS[1].text}"` }));
    input = screen.getByRole('textbox', { name: 'Edit criterion' });
    fireEvent.change(input, { target: { value: 'Verify parity' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onEdit).toHaveBeenCalledWith('b', 'Verify parity');
  });

  it('removes and moves, with ends disabled', () => {
    const onRemove = vi.fn();
    const onMove = vi.fn();
    render(<ChecklistSection items={ITEMS} onRemove={onRemove} onMove={onMove} />);
    expect((screen.getByRole('button', { name: `Move "${ITEMS[0].text}" up` }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole('button', { name: `Move "${ITEMS[2].text}" down` }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: `Move "${ITEMS[1].text}" up` }));
    expect(onMove).toHaveBeenCalledWith('b', 0);
    fireEvent.click(screen.getByRole('button', { name: `Move "${ITEMS[1].text}" down` }));
    expect(onMove).toHaveBeenCalledWith('b', 2);
    fireEvent.click(screen.getByRole('button', { name: `Remove "${ITEMS[2].text}"` }));
    expect(onRemove).toHaveBeenCalledWith('c');
  });

  it('per-item pending holds that row only', () => {
    const items = ITEMS.map((i) => (i.id === 'b' ? { ...i, pending: true } : i));
    render(<ChecklistSection items={items} onToggle={() => {}} onRemove={() => {}} />);
    expect((screen.getByRole('checkbox', { name: ITEMS[1].text }) as HTMLInputElement).disabled).toBe(true);
    expect((screen.getByRole('checkbox', { name: ITEMS[0].text }) as HTMLInputElement).disabled).toBe(false);
    expect(screen.getByTestId('checklist-item-b').getAttribute('aria-busy')).toBe('true');
    expect((screen.getByRole('button', { name: `Remove "${ITEMS[1].text}"` }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('readOnlyReason disables everything and describes it', () => {
    render(
      <ChecklistSection items={ITEMS} onToggle={() => {}} onAdd={() => {}} onRemove={() => {}} readOnlyReason="Run in progress" />,
    );
    const box = screen.getByRole('checkbox', { name: ITEMS[1].text }) as HTMLInputElement;
    expect(box.disabled).toBe(true);
    expect(document.getElementById(box.getAttribute('aria-describedby')!)?.textContent).toBe('Run in progress');
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });
});
