import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CollectionToolbar } from '../CollectionToolbar';
import { ComposerSurface } from '../ComposerSurface';
import { DensityProvider } from '../Density';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { Input } from '../../forms/Input';
import { Select } from '../../forms/Select';

function Filtered() {
  const [status, setStatus] = useState('');
  return <DensityProvider density="compact"><CollectionToolbar label="Run filters" filters={[{ id: 'status', label: 'Status', value: status, onChange: setStatus, options: [{ value: '', label: 'Any status' }, { value: 'running', label: 'Running' }] }]} summary="193 runs" notices={['196 traces have no run id.']} /></DensityProvider>;
}
describe('collection design inheritance', () => {
  it('aligns a card collection to its page edge without table-cell padding in either state', () => {
    const { rerender } = render(<CollectionToolbar label="Rooms" layout="cards" />);
    expect(screen.getByRole('toolbar')).toHaveAttribute('data-collection-layout', 'cards');
    expect(screen.getByRole('toolbar')).toHaveClass('px-0');
    rerender(<CollectionToolbar label="Rooms" layout="cards" selection={{ count: 1, onClear: () => {} }} />);
    expect(screen.getByRole('toolbar')).toHaveClass('px-0');
  });
  it('keeps filters and advisory text out of the resting row, and exposes state and clear in the panel', () => {
    render(<Filtered />);
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(screen.queryByText('196 traces have no run id.')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Filters' }));
    fireEvent.change(screen.getByRole('combobox', { name: 'Status' }), { target: { value: 'running' } });
    expect(screen.getByRole('button', { name: 'Filters (1 active)' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByRole('combobox')).toHaveValue('');
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    fireEvent.click(screen.getByRole('button', { name: 'About these results' }));
    expect(screen.getByText('196 traces have no run id.')).toBeVisible();
  });
  it('executes named actions and disables refresh during loading', () => {
    const run = vi.fn();
    render(<CollectionToolbar label="Records" onRefresh={run} refreshing actions={[{ id: 'open', label: 'Open graph', icon: 'G', onClick: run }]} />);
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Open graph' }));
    expect(run).toHaveBeenCalledOnce();
  });
  it('puts the query controls (search, filters, refresh) at the trailing end beside the actions', () => {
    const refresh = vi.fn();
    render(<CollectionToolbar label="Contacts" summary="3 contacts" search={{ value: '', onChange: () => {}, 'aria-label': 'Find person' }} onRefresh={refresh} actions={[{ id: 'add', label: 'Add contact', icon: '+', onClick: () => {} }]} />);
    const start = screen.getByRole('toolbar').querySelector('[data-toolbar-controls]')!;
    expect(start).toContainElement(screen.getByText('3 contacts'));
    expect(start).not.toContainElement(screen.getByRole('button', { name: 'Find person' }));
    expect(start).not.toContainElement(screen.getByRole('button', { name: 'Refresh' }));
    // Search and refresh share the marked query group (what the audit's
    // collection.refresh-with-query anchors to); the named actions follow it.
    const query = screen.getByRole('toolbar').querySelector('[data-collection-query]')!;
    expect(query).toContainElement(screen.getByRole('button', { name: 'Find person' }));
    expect(query).toContainElement(screen.getByRole('button', { name: 'Refresh' }));
    expect(query).not.toContainElement(screen.getByRole('button', { name: 'Add contact' }));
    expect(query.parentElement).toContainElement(screen.getByRole('button', { name: 'Add contact' }));
    fireEvent.click(screen.getByRole('button', { name: 'Refresh' }));
    expect(refresh).toHaveBeenCalledOnce();
  });
  it('inherits the compact control scale without page-level size props', () => {
    render(<DensityProvider density="compact"><Button>Save</Button><IconButton aria-label="Refresh" /><Input aria-label="Name" prefix="$" /><Select aria-label="Kind" options={[]} /></DensityProvider>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-size', 'sm');
    expect(screen.getByRole('button', { name: 'Refresh' })).toHaveAttribute('data-size', 'sm');
    expect(screen.getByRole('textbox')).toHaveClass('h-[var(--ui-control-sm,1.75rem)]');
    expect(screen.getByRole('combobox')).toHaveClass('h-[var(--ui-control-sm,1.75rem)]');
  });
  it('paints one full-width composer surface even when both the layout and bound composer request it', () => {
    const { container } = render(<ComposerSurface><ComposerSurface><textarea aria-label="Message" /></ComposerSurface></ComposerSurface>);
    expect(container.querySelectorAll('[data-composer-surface]')).toHaveLength(1);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('draws a selection in place of the resting controls on the same row, never as a second band', () => {
    const clear = vi.fn();
    const { container, rerender } = render(<CollectionToolbar label="Submission filters" search={{ value: '', onChange: () => {}, 'aria-label': 'Search submissions' }} summary="4 of 4" selection={{ count: 0, onClear: clear }} />);
    expect(container.querySelectorAll('[role="toolbar"]')).toHaveLength(1);
    expect(screen.getByRole('toolbar')).toHaveAttribute('data-collection-selection', 'idle');
    expect(screen.getByRole('button', { name: 'Search submissions' })).toBeInTheDocument();
    rerender(<CollectionToolbar label="Submission filters" search={{ value: '', onChange: () => {}, 'aria-label': 'Search submissions' }} summary="4 of 4" selection={{ count: 2, onClear: clear, actions: <Button size="sm">Clear selected</Button> }} />);
    expect(container.querySelectorAll('[role="toolbar"]')).toHaveLength(1);
    const row = screen.getByRole('toolbar');
    expect(row).toHaveAttribute('data-collection-selection', 'active');
    expect(row).toHaveAttribute('data-toolbar-variant', 'collection');
    expect(row.className).toContain('py-1.5');
    expect(screen.queryByRole('button', { name: 'Search submissions' })).not.toBeInTheDocument();
    expect(screen.getByText('2 selected')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear selected' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(clear).toHaveBeenCalledOnce();
  });
});
