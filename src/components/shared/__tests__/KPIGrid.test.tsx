import { render, screen } from '@testing-library/react';
import { KPIGrid } from '../KPIGrid';
import { StatCard } from '../StatCard';

describe('KPIGrid', () => {
  it('renders children inside the grid', () => {
    render(
      <KPIGrid>
        <StatCard label="Users" value={42} />
        <StatCard label="Sessions" value={100} />
      </KPIGrid>,
    );
    expect(screen.getByTestId('kpi-grid')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('defaults to a 4-column layout', () => {
    render(
      <KPIGrid>
        <StatCard label="a" value={1} />
      </KPIGrid>,
    );
    expect(screen.getByTestId('kpi-grid').className).toContain('sm:grid-cols-4');
  });

  it('uses the dense gap when dense', () => {
    render(
      <KPIGrid dense>
        <StatCard label="a" value={1} />
      </KPIGrid>,
    );
    const grid = screen.getByTestId('kpi-grid');
    expect(grid.className).toContain('gap-2');
    expect(grid.className).not.toContain('gap-4');
  });

  it('honors each column count', () => {
    const counts = [1, 2, 3, 4] as const;
    for (const c of counts) {
      const { unmount } = render(
        <KPIGrid columns={c}>
          <div />
        </KPIGrid>,
      );
      expect(screen.getByTestId('kpi-grid').className).toContain(`sm:grid-cols-${c}`);
      unmount();
    }
  });

  it('always collapses to a single column on mobile', () => {
    render(
      <KPIGrid columns={4}>
        <div />
      </KPIGrid>,
    );
    expect(screen.getByTestId('kpi-grid').className).toContain('grid-cols-1');
  });

  it('forwards a custom testid', () => {
    render(
      <KPIGrid data-testid="kpis">
        <div />
      </KPIGrid>,
    );
    expect(screen.getByTestId('kpis')).toBeInTheDocument();
  });

  it('emits no md: column class when mdColumns is unset (unchanged default)', () => {
    render(
      <KPIGrid columns={4}>
        <div />
      </KPIGrid>,
    );
    expect(screen.getByTestId('kpi-grid').className).not.toMatch(/md:grid-cols-/);
  });

  it('adds an md breakpoint step between sm and the full column count when mdColumns is set', () => {
    render(
      <KPIGrid columns={4} mdColumns={2}>
        <div />
      </KPIGrid>,
    );
    const cls = screen.getByTestId('kpi-grid').className;
    expect(cls).toContain('sm:grid-cols-4');
    expect(cls).toContain('md:grid-cols-2');
  });
});
