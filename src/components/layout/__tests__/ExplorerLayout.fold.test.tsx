import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExplorerLayout } from '../ExplorerLayout';

describe('ExplorerLayout — folding the rail, widening the aside', () => {
  it('without handlers there are no controls, as before', () => {
    render(<ExplorerLayout rail={<span>rail</span>} aside={<span>aside</span>}>pane</ExplorerLayout>);
    expect(screen.queryByTestId('explorer-layout-rail-fold')).toBeNull();
    expect(screen.getByTestId('explorer-layout-aside')).toBeInTheDocument();
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

  it('titles the rail in the header row, with the rail\'s own actions beside the fold control', () => {
    render(
      <ExplorerLayout
        rail={<span>rail</span>}
        railTitle="Documents"
        railActions={<button type="button">new</button>}
        onToggleRail={() => {}}
        railLabel="the documents list"
      >
        pane
      </ExplorerLayout>,
    );
    const header = screen.getByTestId('explorer-layout-rail-header');
    expect(screen.getByRole('heading', { name: 'Documents' })).toBeInTheDocument();
    expect(header).toContainElement(screen.getByRole('button', { name: 'new' }));
    expect(header).toContainElement(screen.getByRole('button', { name: 'Hide the documents list' }));
  });

  it('draws the header row for a title alone — no fold control needed', () => {
    render(<ExplorerLayout rail={<span>rail</span>} railTitle="Documents">pane</ExplorerLayout>);
    expect(screen.getByTestId('explorer-layout-rail-header')).toBeInTheDocument();
    expect(screen.queryByTestId('explorer-layout-rail-fold')).toBeNull();
  });
});
