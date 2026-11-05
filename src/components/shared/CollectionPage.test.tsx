import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CollectionPage } from './CollectionPage';
import { SidePaneProvider, SidePaneSplit } from '../layout/SidePane';

interface Row { id: string; name: string }
const ROWS: Row[] = [{ id: 'a', name: 'Alpha' }, { id: 'b', name: 'Bravo' }];
const table = (data: Row[]) => ({ data, columns: [{ key: 'name', header: 'Name' }], keyField: (r: Row) => r.id });

describe('CollectionPage', () => {
  it('keeps the original contract: header and toolbar are direct children, children render, no gutter', () => {
    const { container } = render(
      <CollectionPage title="Bots" toolbar={{ label: 'Bot filters', summary: '2 bots' }}><p>custom body</p></CollectionPage>,
    );
    const root = container.querySelector('[data-collection-page]')!;
    expect(root.getAttribute('data-page-template')).toBe('collection');
    expect(root.querySelector(':scope > [data-testid="page-header"]')).toBeTruthy();
    expect(screen.getByText('custom body')).toBeTruthy();
    expect(screen.getByText('2 bots')).toBeTruthy();
    expect(root.innerHTML).not.toContain('--ui-page-gutter');
  });

  it('renders a striped DataTable body that scrolls while the page does not', () => {
    const { container } = render(<CollectionPage title="Bots" gutter="page" table={table(ROWS)} />);
    expect(screen.getByText('Alpha')).toBeTruthy();
    const body = container.querySelector('[data-collection-body]')!;
    expect(body.getAttribute('data-state')).toBe('ready');
    expect(body.className).toContain('overflow-auto');
    expect(body.className).toContain('px-[var(--ui-page-gutter,1.5rem)]');
    const root = container.querySelector('[data-collection-page]')!;
    expect(root.className).toContain('h-full');
    expect(root.className).toContain('min-h-0');
  });

  it('shows the empty state for an empty table', () => {
    const { container } = render(<CollectionPage title="Bots" table={table([])} empty={{ title: 'No bots yet', action: <button type="button">New bot</button> }} />);
    expect(screen.getByText('No bots yet')).toBeTruthy();
    expect(screen.getByText('New bot')).toBeTruthy();
    expect(container.querySelector('[data-collection-body]')!.getAttribute('data-state')).toBe('empty');
  });

  it('shows a string error as an ErrorState with retry, in place of the table', () => {
    const onRetry = vi.fn();
    render(<CollectionPage title="Bots" table={table(ROWS)} error="Network down" onRetry={onRetry} />);
    expect(screen.getByRole('alert').textContent).toContain('Network down');
    expect(screen.queryByText('Alpha')).toBeNull();
    fireEvent.click(screen.getByText('Retry'));
    expect(onRetry).toHaveBeenCalled();
  });

  it('shows a loading state for a children body and never the empty state while a table loads', () => {
    const { container, rerender } = render(<CollectionPage title="Bots" loading><p>never</p></CollectionPage>);
    expect(screen.queryByText('never')).toBeNull();
    expect(container.querySelector('[data-collection-body]')!.getAttribute('data-state')).toBe('loading');
    rerender(<CollectionPage title="Bots" loading table={table([])} empty={{ title: 'No bots yet' }} />);
    expect(screen.queryByText('No bots yet')).toBeNull();
  });

  it('hosts the selected row in its own SidePane split when no shell host exists', () => {
    render(<CollectionPage title="Bots" table={table(ROWS)} detail={{ title: 'Alpha details', content: <p>alpha pane</p> }} />);
    expect(screen.getByTestId('side-pane-split')).toBeTruthy();
    expect(screen.getByText('alpha pane')).toBeTruthy();
  });

  it('registers with the shell host instead of nesting a second split', () => {
    render(
      <SidePaneProvider>
        <SidePaneSplit>
          <CollectionPage title="Bots" table={table(ROWS)} detail={{ title: 'Alpha details', content: <p>alpha pane</p> }} />
        </SidePaneSplit>
      </SidePaneProvider>,
    );
    expect(screen.getAllByTestId('side-pane-split')).toHaveLength(1);
    expect(screen.getByText('alpha pane')).toBeTruthy();
  });
});
