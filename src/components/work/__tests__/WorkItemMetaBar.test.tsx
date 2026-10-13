import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WorkItemMetaBar, type WorkMetaOption, type WorkPerson } from '../WorkItemMetaBar';

const STATUS: WorkMetaOption[] = [
  { value: 'open', label: 'Open', tone: 'info' },
  { value: 'done', label: 'Done', tone: 'success' },
];
const PRIORITY: WorkMetaOption[] = [
  { value: 'high', label: 'High', tone: 'danger' },
  { value: 'low', label: 'Low', tone: 'neutral' },
];
const LAYLA: WorkPerson = { id: 'u1', name: 'Layla Hassan' };
const ELI: WorkPerson = { id: 'u2', name: 'Eli Garcia' };

describe('WorkItemMetaBar', () => {
  it('renders the mockup row with separators', () => {
    const { container } = render(
      <WorkItemMetaBar
        status={{ value: 'open', options: STATUS, onChange: () => {} }}
        points={{ value: 5, onChange: () => {} }}
        owner={{ value: LAYLA, onChange: () => {}, onSearchPeople: () => [] }}
        priority={{ value: 'high', options: PRIORITY, onChange: () => {} }}
      />,
    );
    expect((screen.getByLabelText('Status') as HTMLSelectElement).value).toBe('open');
    expect(screen.getByText('5 points')).toBeTruthy();
    expect(screen.getByText('Layla Hassan')).toBeTruthy();
    expect((screen.getByLabelText('Priority:') as HTMLSelectElement).value).toBe('high');
    expect(container.querySelectorAll('span[aria-hidden="true"].w-px')).toHaveLength(3);
  });

  it('renders nothing with no fields', () => {
    const { container } = render(<WorkItemMetaBar />);
    expect(container.firstChild).toBeNull();
  });

  it('shows honest empty states that remain editable', () => {
    render(
      <WorkItemMetaBar
        status={{ value: null, options: STATUS, onChange: () => {} }}
        points={{ value: null, onChange: () => {} }}
        owner={{ value: null, onChange: () => {} }}
        priority={{ value: null, options: PRIORITY, onChange: () => {} }}
      />,
    );
    expect(screen.getByText('No status')).toBeTruthy();
    expect(screen.getByText('— pts')).toBeTruthy();
    expect(screen.getByText('Unassigned')).toBeTruthy();
    expect(screen.getByText('No priority')).toBeTruthy();
    expect(screen.getByLabelText('Status')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Points: not set/ })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Change owner/ })).toBeTruthy();
  });

  it('read-only empty states render as text', () => {
    render(
      <WorkItemMetaBar
        status={{ value: null, options: STATUS }}
        priority={{ value: 'high', options: PRIORITY }}
      />,
    );
    expect(screen.queryByLabelText('Status')).toBeNull();
    expect(screen.getByText('No status')).toBeTruthy();
    expect(screen.getByText('High')).toBeTruthy();
  });

  it('status and priority changes call onChange', () => {
    const onStatus = vi.fn();
    const onPriority = vi.fn();
    render(
      <WorkItemMetaBar
        status={{ value: 'open', options: STATUS, onChange: onStatus }}
        priority={{ value: 'high', options: PRIORITY, onChange: onPriority }}
      />,
    );
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'done' } });
    fireEvent.change(screen.getByLabelText('Priority:'), { target: { value: 'low' } });
    expect(onStatus).toHaveBeenCalledWith('done');
    expect(onPriority).toHaveBeenCalledWith('low');
  });

  it('points: Enter commits, Escape cancels, clearing commits null', () => {
    const onChange = vi.fn();
    render(<WorkItemMetaBar points={{ value: 5, onChange, max: 20 }} />);
    fireEvent.click(screen.getByRole('button', { name: /Points: 5/ }));
    let input = screen.getByLabelText('Points');
    fireEvent.change(input, { target: { value: '8' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenLastCalledWith(8);

    fireEvent.click(screen.getByRole('button', { name: /Points: 5/ }));
    input = screen.getByLabelText('Points');
    fireEvent.change(input, { target: { value: '13' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.queryByLabelText('Points')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /Points: 5/ }));
    input = screen.getByLabelText('Points');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('points: clamps to max and skips unchanged values', () => {
    const onChange = vi.fn();
    render(<WorkItemMetaBar points={{ value: 5, onChange, max: 20 }} />);
    fireEvent.click(screen.getByRole('button', { name: /Points: 5/ }));
    fireEvent.keyDown(screen.getByLabelText('Points'), { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /Points: 5/ }));
    const input = screen.getByLabelText('Points');
    fireEvent.change(input, { target: { value: '40' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenLastCalledWith(20);
  });

  it('owner picker searches people and picking calls onChange', async () => {
    const onSearchPeople = vi.fn((q: string) => Promise.resolve([LAYLA, ELI].filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))));
    const onChange = vi.fn();
    render(<WorkItemMetaBar owner={{ value: LAYLA, onChange, onSearchPeople }} />);
    fireEvent.click(screen.getByRole('button', { name: /Change owner/ }));
    expect(onSearchPeople).toHaveBeenCalledWith('');
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: 'Search people' }), { target: { value: 'eli' } });
    });
    expect(onSearchPeople).toHaveBeenLastCalledWith('eli');
    fireEvent.click(await screen.findByRole('button', { name: /Eli Garcia/ }));
    expect(onChange).toHaveBeenCalledWith(ELI);
    expect(screen.queryByTestId('work-owner-picker')).toBeNull();
  });

  it('owner picker shows No matches and offers Unassign', async () => {
    const onChange = vi.fn();
    render(<WorkItemMetaBar owner={{ value: LAYLA, onChange, onSearchPeople: () => [] }} />);
    fireEvent.click(screen.getByRole('button', { name: /Change owner/ }));
    expect(await screen.findByText('No matches')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Unassign' }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('readOnlyReason removes editing and exposes the reason', () => {
    render(
      <WorkItemMetaBar
        status={{ value: 'open', options: STATUS, onChange: () => {}, readOnlyReason: 'Only the owner can change status' }}
        owner={{ value: LAYLA, onChange: () => {}, readOnlyReason: 'Locked by pipeline' }}
      />,
    );
    expect(screen.queryByLabelText('Status')).toBeNull();
    expect(screen.queryByRole('button', { name: /Change owner/ })).toBeNull();
    const open = screen.getByText('Open');
    expect(open.getAttribute('aria-describedby')).toBeTruthy();
    expect(document.getElementById(open.getAttribute('aria-describedby')!)?.textContent).toBe('Only the owner can change status');
    expect(open.closest('[data-field="status"]')?.getAttribute('title')).toBe('Only the owner can change status');
  });

  it('pending marks the field busy and holds the control', () => {
    render(<WorkItemMetaBar status={{ value: 'open', options: STATUS, onChange: () => {}, pending: true }} />);
    const select = screen.getByLabelText('Status') as HTMLSelectElement;
    expect(select.disabled).toBe(true);
    expect(select.closest('[data-field="status"]')?.getAttribute('aria-busy')).toBe('true');
    expect(screen.getByLabelText('Saving status')).toBeTruthy();
  });
});

describe('WorkItemMetaBar type scale (2.441.0)', () => {
  // Controls read at 12 or 14px; the meta row's text and its link-variant
  // buttons (which inherit the size they are given) were 13px inline and 15px
  // divided. Every field is the 14px body step now.
  it.each(['default', 'divided'] as const)('draws every field at 14px in the %s layout', (layout) => {
    const { container } = render(
      <WorkItemMetaBar
        layout={layout}
        status={{ value: 'open', options: STATUS }}
        points={{ value: 5, onChange: () => {} }}
        owner={{ value: LAYLA, onChange: () => {} }}
        priority={{ value: null, options: PRIORITY }}
      />,
    );
    const points = screen.getByRole('button', { name: /Points: 5/ });
    expect(points.className).toContain('text-sm');
    expect(screen.getByText('Layla Hassan').className).toContain('text-sm');
    expect(container.innerHTML).not.toMatch(/text-\[1[35]px\]/);
  });
});
