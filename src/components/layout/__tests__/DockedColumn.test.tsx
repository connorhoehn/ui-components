import { describe, it, expect } from 'vitest';
import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ColumnDock, DockedColumn, useInDockedColumn } from '../DockedColumn';

function Section() {
  // The section owns the composer's state; the composer renders in the column's dock.
  const [query, setQuery] = useState('');
  return (
    <section data-testid="section">
      <p data-testid="query">{query || 'none'}</p>
      <ColumnDock><input aria-label="Command" value={query} onChange={e => setQuery(e.target.value)} /></ColumnDock>
    </section>
  );
}

describe('DockedColumn / ColumnDock', () => {
  it('docks a section composer under the scrolling body, still driving the section', () => {
    render(<DockedColumn bodyProps={{ 'data-testid': 'body' }}><Section /><a href="#more">More below the section</a></DockedColumn>);
    const input = screen.getByRole('textbox', { name: 'Command' });
    const dock = input.closest('[data-column-dock]');
    expect(dock).not.toBeNull();
    expect(screen.getByTestId('section').contains(input)).toBe(false);
    // The dock is the column's last row, after the body that holds every other block.
    const column = dock!.parentElement!;
    expect(column.hasAttribute('data-docked-column')).toBe(true);
    expect(column.lastElementChild).toBe(dock);
    expect(screen.getByTestId('body').contains(screen.getByText('More below the section'))).toBe(true);
    fireEvent.change(input, { target: { value: 'failed' } });
    expect(screen.getByTestId('query')).toHaveTextContent('failed');
  });

  it('renders in place without a DockedColumn', () => {
    render(<Section />);
    expect(screen.getByTestId('section').contains(screen.getByRole('textbox', { name: 'Command' }))).toBe(true);
  });

  it('scrolls the body by default and frames it with body="fill"; an unused dock stays empty', () => {
    const { rerender, container } = render(<DockedColumn bodyProps={{ 'data-testid': 'body' }}>content</DockedColumn>);
    expect(screen.getByTestId('body').className).toContain('overflow-auto');
    expect(screen.getByTestId('body')).toHaveAttribute('data-docked-column-body');
    const dock = container.querySelector('[data-column-dock]')!;
    expect(dock.childElementCount).toBe(0);
    expect(dock.className).toContain('empty:hidden');
    rerender(<DockedColumn bodyProps={{ 'data-testid': 'body' }} body="fill">content</DockedColumn>);
    expect(screen.getByTestId('body').className).toContain('overflow-hidden');
  });

  it('tells a child whether it is inside a docked column', () => {
    function Probe() { return <span>{useInDockedColumn() ? 'docked' : 'inline'}</span>; }
    const { unmount } = render(<Probe />);
    expect(screen.getByText('inline')).toBeInTheDocument();
    unmount();
    render(<DockedColumn><Probe /></DockedColumn>);
    expect(screen.getByText('docked')).toBeInTheDocument();
  });
});
