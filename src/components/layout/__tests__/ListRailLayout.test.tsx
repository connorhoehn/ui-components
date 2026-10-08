import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ListRailLayout } from '../ListRailLayout';

afterEach(cleanup);

describe('ListRailLayout', () => {
  it('draws the list rail flush beside the pane: caption title, count chip, header, rows, footer; pane header and footer', () => {
    render(
      <ListRailLayout list={{ title: 'Pending', count: 7, label: 'review queue', header: <input aria-label="Find" />, body: <ul><li>row</li></ul>, footer: '7 pending' }}
        header={<nav aria-label="Trail">crumbs</nav>} footer={<textarea aria-label="Composer" />}>
        <p>record</p>
      </ListRailLayout>,
    );
    expect(screen.getByTestId('explorer-layout-rail-title').textContent).toContain('Pending');
    expect(screen.getByTestId('explorer-layout-rail-count').textContent).toBe('7');
    expect(screen.getByLabelText('Find')).toBeTruthy();
    expect(screen.getByText('7 pending')).toBeTruthy();
    expect(screen.getByRole('navigation', { name: 'Trail' })).toBeTruthy();
    expect(screen.getByLabelText('Composer')).toBeTruthy();
    expect(screen.getByTestId('explorer-layout-rail').className).toContain('w-[264px]');
    // No pane padding: the record owns its inset.
    expect(screen.getByTestId('explorer-layout-pane').className).not.toContain('px-8');
    expect(screen.getByTestId('explorer-layout').closest('[data-list-rail]')).not.toBeNull();
  });
  it('omits an unknown count and folds when the host gives a fold', () => {
    const onToggle = vi.fn();
    render(<ListRailLayout list={{ title: 'Runs', label: 'runs', body: null }} fold={{ folded: false, onToggle }}><p>r</p></ListRailLayout>);
    expect(screen.queryByTestId('explorer-layout-rail-count')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Hide runs' }));
    expect(onToggle).toHaveBeenCalled();
  });
});
