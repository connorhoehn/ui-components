import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LinkedItemsSection, type LinkedItem } from '../LinkedItemsSection';

const ITEMS: LinkedItem[] = [
  { id: 'd1', title: 'Collector fleet rollout', kind: 'page', relation: 'Depends on', status: { label: 'Completed', tone: 'success' }, onOpen: vi.fn() },
  { id: 'd2', title: 'ADR: tail-sampling policy', href: '/docs/d2', relation: 'Decided by', status: { label: 'Approved', tone: 'success' } },
  { id: 'd3', title: 'Unread spec', status: null },
];

describe('LinkedItemsSection', () => {
  it('renders titles, relations and pills; no pill without status', () => {
    render(<LinkedItemsSection variant="label" items={ITEMS} />);
    expect(screen.getByRole('heading', { name: 'Dependencies & decisions' })).toBeTruthy();
    expect(screen.getByText('Completed')).toBeTruthy();
    expect(screen.getByText('Approved')).toBeTruthy();
    expect(screen.getByText('Depends on')).toBeTruthy();
    expect(screen.getByTestId('linked-item-d3').textContent).toBe('Unread spec');
    expect(screen.getByRole('link', { name: 'ADR: tail-sampling policy' }).getAttribute('href')).toBe('/docs/d2');
    expect(screen.queryByRole('button', { name: /Add link/ })).toBeNull();
  });

  it('heading variant reads the relation out without printing it', () => {
    render(<LinkedItemsSection items={ITEMS} />);
    expect(screen.getByText('(Depends on)')).toBeTruthy();
    expect(screen.getByTestId('linked-item-d1').getAttribute('title')).toBe('Depends on');
  });

  it('title button calls onOpen', () => {
    render(<LinkedItemsSection items={ITEMS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Collector fleet rollout' }));
    expect(ITEMS[0].onOpen).toHaveBeenCalled();
  });

  it('empty state', () => {
    render(<LinkedItemsSection items={[]} />);
    expect(screen.getByText('No linked documents')).toBeTruthy();
  });

  it('remove calls the row onRemove', () => {
    const onRemove = vi.fn();
    render(<LinkedItemsSection items={[{ id: 'x', title: 'X', onRemove }]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove link to "X"' }));
    expect(onRemove).toHaveBeenCalled();
  });

  it('Add link: searches documents, picks with the chosen relation', async () => {
    const onSearchDocuments = vi.fn(async (q: string) =>
      [{ id: 'n1', title: 'Rollback runbook', kind: 'page' as const }].filter((d) => d.title.toLowerCase().includes(q)));
    const onAdd = vi.fn();
    render(<LinkedItemsSection items={ITEMS} onSearchDocuments={onSearchDocuments} onAdd={onAdd} />);
    fireEvent.click(screen.getByRole('button', { name: /Add link/ }));
    expect(onSearchDocuments).toHaveBeenCalledWith('');
    fireEvent.change(screen.getByLabelText('Relation'), { target: { value: 'decided-by' } });
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: 'Search documents' }), { target: { value: 'roll' } });
    });
    expect(onSearchDocuments).toHaveBeenLastCalledWith('roll');
    fireEvent.click(await screen.findByRole('button', { name: 'Rollback runbook' }));
    expect(onAdd).toHaveBeenCalledWith({ id: 'n1', title: 'Rollback runbook', kind: 'page' }, 'decided-by');
  });

  it('reports a failed search', async () => {
    render(<LinkedItemsSection items={[]} onSearchDocuments={() => Promise.reject(new Error('x'))} onAdd={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /Add link/ }));
    expect(await screen.findByText('Search failed')).toBeTruthy();
  });
});
