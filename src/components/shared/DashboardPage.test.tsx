import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DashboardPage } from './DashboardPage';

describe('DashboardPage', () => {
  it('draws the stat strip, then a grid of titled panels', () => {
    const { container } = render(
      <DashboardPage title="Overview" stats={[{ label: 'Invocations', value: '12.4k' }, { label: 'Errors', value: '3' }]}
        panels={[{ id: 'latency', title: 'Latency', span: 2, content: <p>chart</p> }, { id: 'errors', title: 'Errors list', content: <p>list</p> }]} />,
    );
    const root = container.querySelector('[data-page-template="dashboard"]')!;
    expect(root.className).toContain('h-full');
    expect(screen.getByText('12.4k')).toBeTruthy();
    expect(screen.getByText('Latency')).toBeTruthy();
    expect(screen.getByTestId('dashboard-panel-latency').className).toContain('md:col-span-2');
    const grid = container.querySelector('[data-dashboard-grid]')!;
    expect(grid.className).toContain('lg:grid-cols-3');
    expect(grid.className).toContain('auto-rows-[minmax(12rem,1fr)]');
    expect(grid.className).toContain('flex-1');
  });

  it('prefers a kpis node over stats and accepts children instead of panels', () => {
    render(
      <DashboardPage title="Overview" columns={2} kpis={<div>kpi grid</div>} stats={[{ label: 'Hidden', value: '0' }]}>
        <section>custom panel</section>
      </DashboardPage>,
    );
    expect(screen.getByText('kpi grid')).toBeTruthy();
    expect(screen.queryByText('Hidden')).toBeNull();
    expect(screen.getByText('custom panel')).toBeTruthy();
  });

  it('scrolls panel bodies inside their frames', () => {
    render(<DashboardPage title="Overview" panels={[{ id: 'a', title: 'A', content: <p>a body</p> }]} />);
    const body = screen.getByText('a body').parentElement!;
    expect(body.className).toContain('overflow-auto');
  });
});
