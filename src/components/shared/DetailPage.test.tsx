import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DetailPage } from './DetailPage';

const tabs = [
  { id: 'summary', label: 'Summary', content: <p>summary body</p> },
  { id: 'trace', label: 'Trace', badge: 12, content: <p>trace body</p> },
];

describe('DetailPage', () => {
  it('draws the trail, header, actions and the first tab body', () => {
    const { container } = render(
      <DetailPage title="Run 42" breadcrumbs={[{ label: 'Runs', href: '/runs' }, { label: 'Run 42' }]} meta={<span>agent · 2m</span>}
        actions={<button type="button">Re-run</button>} tabs={tabs} />,
    );
    const root = container.querySelector('[data-page-template="detail"]')!;
    expect(root.className).toContain('h-full');
    expect(screen.getByRole('heading', { name: 'Run 42' })).toBeTruthy();
    expect(screen.getByText('agent · 2m')).toBeTruthy();
    expect(screen.getByText('Re-run')).toBeTruthy();
    expect(screen.getByText('Runs')).toBeTruthy();
    expect(screen.getByText('summary body')).toBeTruthy();
    expect(screen.queryByText('trace body')).toBeNull();
  });

  it('switches tabs uncontrolled; each tab body scrolls on its own', () => {
    const onTabChange = vi.fn();
    render(<DetailPage title="Run 42" tabs={tabs} onTabChange={onTabChange} />);
    fireEvent.click(screen.getByRole('tab', { name: /Trace/ }));
    expect(onTabChange).toHaveBeenCalledWith('trace');
    const panel = screen.getByRole('tabpanel');
    expect(panel.textContent).toBe('trace body');
    expect(panel.className).toContain('overflow-auto');
    expect(panel.className).toContain('min-h-0');
  });

  it('honours a controlled tab, falls back to children without tabs, and draws the aside', () => {
    const { rerender, container } = render(<DetailPage title="Run" tabs={tabs} activeTab="trace" />);
    expect(screen.getByText('trace body')).toBeTruthy();
    rerender(<DetailPage title="Run" aside={<aside>context</aside>}><p>only body</p></DetailPage>);
    expect(screen.getByText('only body')).toBeTruthy();
    expect(container.querySelector('[data-detail-page-aside]')!.textContent).toBe('context');
  });
});
