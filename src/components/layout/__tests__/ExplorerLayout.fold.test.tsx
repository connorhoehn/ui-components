import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExplorerLayout } from '../ExplorerLayout';

describe('ExplorerLayout — folding the rail, widening the aside', () => {
  it('without handlers there are no controls, as before', () => {
    render(<ExplorerLayout rail={<span>rail</span>} aside={<span>aside</span>}>pane</ExplorerLayout>);
    expect(screen.queryByTestId('explorer-layout-rail-fold')).toBeNull();
    expect(screen.queryByTestId('explorer-layout-aside-width')).toBeNull();
    expect(screen.getByTestId('explorer-layout-aside').getAttribute('data-width')).toBe('md');
  });

  it('folds the rail to a strip with one control that brings it back', () => {
    const onToggleRail = vi.fn();
    const { rerender } = render(
      <ExplorerLayout rail={<span>rail</span>} onToggleRail={onToggleRail} railLabel="the documents list">pane</ExplorerLayout>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Hide the documents list' }));
    expect(onToggleRail).toHaveBeenCalledTimes(1);
    rerender(<ExplorerLayout rail={<span>rail</span>} railCollapsed onToggleRail={onToggleRail} railLabel="the documents list">pane</ExplorerLayout>);
    expect(screen.getByTestId('explorer-layout-rail').getAttribute('data-collapsed')).toBe('true');
    expect(screen.queryByText('rail')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Show the documents list' }));
    expect(onToggleRail).toHaveBeenCalledTimes(2);
  });

  it('widens and narrows the aside', () => {
    const onToggleAsideWidth = vi.fn();
    const { rerender } = render(
      <ExplorerLayout rail={<span>rail</span>} aside={<span>aside</span>} onToggleAsideWidth={onToggleAsideWidth}>pane</ExplorerLayout>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Widen the side column' }));
    expect(onToggleAsideWidth).toHaveBeenCalledTimes(1);
    rerender(<ExplorerLayout rail={<span>rail</span>} aside={<span>aside</span>} asideWidth="lg" onToggleAsideWidth={onToggleAsideWidth}>pane</ExplorerLayout>);
    expect(screen.getByTestId('explorer-layout-aside').getAttribute('data-width')).toBe('lg');
    expect(screen.getByRole('button', { name: 'Narrow the side column' })).toBeInTheDocument();
  });
});
