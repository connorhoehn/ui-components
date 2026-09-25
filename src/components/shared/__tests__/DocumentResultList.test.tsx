import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DocumentResultList, documentAgeLabel, type DocumentResultItem } from '../DocumentResultList';
import { AttachToggle } from '../AttachToggle';
import { FilePickerButton } from '../FilePickerButton';
import { PROMPT_CONTEXT_DRAG_TYPE } from '../../../hooks/usePromptContext';

const NOW = Date.parse('2026-09-24T12:00:00Z');
const items: DocumentResultItem[] = [
  { id: 'rp', title: 'Release plan', summary: 'Launch milestones.', kind: 'page', folder: 'Release assets', updatedAt: NOW - 2 * 3600_000, attached: true },
  { id: 'sr', title: 'Sprint review', kind: 'presentation', folder: 'Release assets', updatedAt: NOW - 3600_000 },
  { id: 'lc', title: 'Launch checklist', kind: 'page', updatedAt: NOW - 30 * 3600_000 },
];

describe('DocumentResultList', () => {
  it('renders title, summary and folder · age, and marks the current row', () => {
    render(<DocumentResultList items={items} currentId="rp" onOpen={() => {}} onToggleAttach={() => {}} now={NOW} />);
    const rows = screen.getAllByTestId('document-result-row');
    expect(rows).toHaveLength(3);
    expect(rows[0]).toHaveAttribute('data-current', 'true');
    expect(rows[0]).toHaveTextContent('Release plan');
    expect(rows[0]).toHaveTextContent('Launch milestones.');
    expect(rows[0]).toHaveTextContent('Release assets·2h ago');
    expect(rows[2]).toHaveTextContent('Yesterday');
    expect(rows[1].querySelector('[data-glyph="slide-tile"]')).not.toBeNull();
  });

  it('opens on row click and Enter; the toggle does not open', () => {
    const onOpen = vi.fn();
    const onToggle = vi.fn();
    render(<DocumentResultList items={items} onOpen={onOpen} onToggleAttach={onToggle} now={NOW} />);
    fireEvent.click(screen.getByText('Sprint review'));
    expect(onOpen).toHaveBeenLastCalledWith(items[1]);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Release plan' }));
    expect(onToggle).toHaveBeenCalledWith(items[0]);
    expect(onOpen).toHaveBeenCalledTimes(1);
    const links = screen.getAllByRole('link');
    fireEvent.keyDown(links[0]!, { key: 'Enter' });
    expect(onOpen).toHaveBeenLastCalledWith(items[0]);
  });

  it('is one tab stop with arrow keys moving the cursor', () => {
    const onCurrent = vi.fn();
    render(<DocumentResultList items={items} currentId="rp" onCurrentChange={onCurrent} onOpen={() => {}} now={NOW} />);
    const links = screen.getAllByRole('link');
    expect(links.map((l) => l.getAttribute('tabindex'))).toEqual(['0', '-1', '-1']);
    fireEvent.keyDown(links[0]!, { key: 'ArrowDown' });
    expect(onCurrent).toHaveBeenLastCalledWith('sr');
    expect(document.activeElement).toBe(links[1]);
    fireEvent.keyDown(links[1]!, { key: 'End' });
    expect(onCurrent).toHaveBeenLastCalledWith('lc');
  });

  it('drags the prompt-context payload', () => {
    render(<DocumentResultList items={items} onOpen={() => {}} now={NOW} />);
    const data: Record<string, string> = {};
    const dataTransfer = { setData: (k: string, v: string) => { data[k] = v; }, effectAllowed: 'none' };
    fireEvent.dragStart(screen.getAllByRole('link')[0]!, { dataTransfer });
    expect(JSON.parse(data[PROMPT_CONTEXT_DRAG_TYPE]!)).toEqual([{ id: 'rp', title: 'Release plan', kind: 'page' }]);
    expect(data['text/plain']).toBe('Release plan');
  });

  it('age labels', () => {
    expect(documentAgeLabel(NOW - 10_000, NOW)).toBe('just now');
    expect(documentAgeLabel(NOW - 15 * 60_000, NOW)).toBe('15m ago');
    expect(documentAgeLabel(NOW - 3 * 86400_000, NOW)).toBe('3d ago');
    expect(documentAgeLabel('nope', NOW)).toBeNull();
  });
});

describe('AttachToggle / FilePickerButton', () => {
  it('toggle is aria-pressed', () => {
    const onToggle = vi.fn();
    const { rerender } = render(<AttachToggle attached={false} onToggle={onToggle} />);
    expect(screen.getByRole('button', { name: 'Add' })).toHaveAttribute('aria-pressed', 'false');
    rerender(<AttachToggle attached onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button', { name: 'Added' }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
  it('file picker hands over the chosen files', () => {
    const onFiles = vi.fn();
    render(<FilePickerButton onFiles={onFiles} accept=".md">Upload</FilePickerButton>);
    const input = screen.getByTestId('file-picker-button-input') as HTMLInputElement;
    const file = new File(['# hi'], 'notes.md', { type: 'text/markdown' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(onFiles).toHaveBeenCalledWith([file]);
  });
});
