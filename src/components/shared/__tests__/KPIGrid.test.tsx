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

  it('adds an md breakpoint step before the full column count at lg when mdColumns is set', () => {
    render(
      <KPIGrid columns={4} mdColumns={2}>
        <div />
      </KPIGrid>,
    );
    const cls = screen.getByTestId('kpi-grid').className;
    // sm must NOT be emitted here — Tailwind's later-wins-in-source-order
    // cascade means an sm:grid-cols-4 alongside md:grid-cols-2 would make
    // md win at every width >= 768px, capping the grid at 2 columns and
    // making it impossible to ever reach 4. See the pinned class-string
    // tests below for the exact emitted output.
    expect(cls).not.toContain('sm:grid-cols-4');
    expect(cls).toContain('md:grid-cols-2');
    expect(cls).toContain('lg:grid-cols-4');
  });

  describe('emitted class string (pinned — do not re-derive)', () => {
    it('columns={4} alone: unchanged sm-only step, no md/lg classes', () => {
      render(
        <KPIGrid columns={4}>
          <div />
        </KPIGrid>,
      );
      expect(screen.getByTestId('kpi-grid').className).toBe('grid grid-cols-1 sm:grid-cols-4 gap-4');
    });

    it('columns={4} mdColumns={2}: steps 1 -> md:2 -> lg:4, no sm class', () => {
      render(
        <KPIGrid columns={4} mdColumns={2}>
          <div />
        </KPIGrid>,
      );
      expect(screen.getByTestId('kpi-grid').className).toBe('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4');
    });

    it('columns={2} mdColumns={2}: steps 1 -> md:2 -> lg:2, no sm class', () => {
      render(
        <KPIGrid columns={2} mdColumns={2}>
          <div />
        </KPIGrid>,
      );
      expect(screen.getByTestId('kpi-grid').className).toBe('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4');
    });
  });
});
