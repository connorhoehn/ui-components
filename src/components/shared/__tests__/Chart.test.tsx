import { render } from '@testing-library/react';
import { LineChart, StackedAreaChart, BarChart } from '../Chart';

// recharts requires a measured parent (ResponsiveContainer) and renders SVG
// that JSDOM can't lay out. Replace the recharts primitives we use with
// lightweight stubs that surface the props we want to assert on as
// data-* attributes.
vi.mock('recharts', () => {
  const Passthrough = ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="resp">{children}</div>
  );
  const ChartRoot = (type: string) =>
    ({ data, children }: { data?: unknown; children?: React.ReactNode }) => (
      <div data-chart={type} data-rows={JSON.stringify(data ?? [])}>
        {children}
      </div>
    );
  const Series = (kind: string) =>
    (props: Record<string, unknown>) => (
      <div
        data-series={kind}
        data-key={String(props.dataKey ?? '')}
        data-color={String(props.stroke ?? props.fill ?? '')}
      >
        {props.children as React.ReactNode}
      </div>
    );
  const Axis = (kind: string) =>
    (props: Record<string, unknown>) => {
      const fmt = props.tickFormatter as ((v: unknown) => string) | undefined;
      return (
        <div
          data-axis={kind}
          data-key={String(props.dataKey ?? '')}
          data-fmt={fmt ? fmt(1234) : ''}
        />
      );
    };
  return {
    ResponsiveContainer: Passthrough,
    CartesianGrid: () => <div data-testid="grid" />,
    XAxis: Axis('x'),
    YAxis: Axis('y'),
    Tooltip: (props: Record<string, unknown>) => {
      const fmt = props.formatter as
        | ((v: unknown) => string)
        | undefined;
      return <div data-testid="tooltip" data-fmt={fmt ? fmt(99) : ''} />;
    },
    Legend: () => <div data-testid="legend" />,
    LineChart: ChartRoot('line'),
    AreaChart: ChartRoot('area'),
    BarChart: ChartRoot('bar'),
    Line: Series('line'),
    Area: Series('area'),
    Bar: Series('bar'),
    Cell: (props: Record<string, unknown>) => (
      <div data-cell data-fill={String(props.fill ?? '')} />
    ),
    LabelList: (props: Record<string, unknown>) => (
      <div data-testid="label-list" data-key={String(props.dataKey ?? '')} />
    ),
  };
});

describe('Chart', () => {
  describe('LineChart', () => {
    it('renders a single series with default palette color', () => {
      const { container } = render(
        <LineChart
          series={[{ label: 'cpu', data: [{ x: 0, y: 1 }, { x: 1, y: 2 }] }]}
        />,
      );
      const lines = container.querySelectorAll('[data-series="line"]');
      expect(lines).toHaveLength(1);
      expect(lines[0]).toHaveAttribute('data-key', 'cpu');
      // First color in MULTI_SERIES_PALETTE.
      expect(lines[0]).toHaveAttribute('data-color', 'var(--color-primary)');
    });

    it('renders multiple series, cycling through the default palette', () => {
      const { container } = render(
        <LineChart
          series={[
            { label: 'a', data: [{ x: 0, y: 1 }] },
            { label: 'b', data: [{ x: 0, y: 2 }] },
            { label: 'c', data: [{ x: 0, y: 3 }] },
          ]}
        />,
      );
      const lines = container.querySelectorAll('[data-series="line"]');
      expect(lines).toHaveLength(3);
      expect(lines[0]).toHaveAttribute('data-color', 'var(--color-primary)');
      expect(lines[1]).toHaveAttribute('data-color', 'var(--color-success)');
      expect(lines[2]).toHaveAttribute('data-color', 'var(--color-warning)');
    });

    it('honors a per-series color override', () => {
      const { container } = render(
        <LineChart
          series={[
            { label: 'errors', data: [{ x: 0, y: 5 }], color: '#ff00aa' },
          ]}
        />,
      );
      const line = container.querySelector('[data-series="line"]');
      expect(line).toHaveAttribute('data-color', '#ff00aa');
    });

    it('merges overlapping and non-overlapping x values into one row each', () => {
      const { container } = render(
        <LineChart
          series={[
            { label: 'a', data: [{ x: 0, y: 1 }, { x: 1, y: 2 }] },
            { label: 'b', data: [{ x: 1, y: 20 }, { x: 2, y: 30 }] },
          ]}
        />,
      );
      const root = container.querySelector('[data-chart="line"]');
      const rows = JSON.parse(root?.getAttribute('data-rows') ?? '[]');
      expect(rows).toEqual([
        { x: 0, a: 1 },
        { x: 1, a: 2, b: 20 },
        { x: 2, b: 30 },
      ]);
    });

    it('forwards xFormat and yFormat to the axis and tooltip formatters', () => {
      const { container } = render(
        <LineChart
          series={[{ label: 'a', data: [{ x: 0, y: 1 }] }]}
          xFormat={(v) => `x=${v}`}
          yFormat={(v) => `${v}ms`}
        />,
      );
      const xAxis = container.querySelector('[data-axis="x"]');
      const yAxis = container.querySelector('[data-axis="y"]');
      const tooltip = container.querySelector('[data-testid="tooltip"]');
      expect(xAxis).toHaveAttribute('data-fmt', 'x=1234');
      expect(yAxis).toHaveAttribute('data-fmt', '1234ms');
      expect(tooltip).toHaveAttribute('data-fmt', '99ms');
    });
  });

  describe('StackedAreaChart', () => {
    it('renders with an empty series list and no Area children', () => {
      const { container } = render(<StackedAreaChart series={[]} />);
      const root = container.querySelector('[data-chart="area"]');
      expect(root).toBeInTheDocument();
      expect(root?.querySelectorAll('[data-series="area"]')).toHaveLength(0);
      expect(JSON.parse(root?.getAttribute('data-rows') ?? '[]')).toEqual([]);
    });

    it('renders one Area per series with palette colors', () => {
      const { container } = render(
        <StackedAreaChart
          series={[
            { label: 'in',  data: [{ x: 0, y: 1 }] },
            { label: 'out', data: [{ x: 0, y: 2 }], color: '#123456' },
          ]}
        />,
      );
      const areas = container.querySelectorAll('[data-series="area"]');
      expect(areas).toHaveLength(2);
      expect(areas[0]).toHaveAttribute('data-key', 'in');
      expect(areas[0]).toHaveAttribute('data-color', 'var(--color-primary)');
      expect(areas[1]).toHaveAttribute('data-key', 'out');
      expect(areas[1]).toHaveAttribute('data-color', '#123456');
    });
  });

  describe('BarChart', () => {
    it('renders with default color when no color prop is provided', () => {
      const { container } = render(
        <BarChart
          data={[{ name: 'a', count: 1 }, { name: 'b', count: 2 }]}
          xKey="name"
          yKey="count"
        />,
      );
      const bar = container.querySelector('[data-series="bar"]');
      expect(bar).toHaveAttribute('data-key', 'count');
      expect(bar).toHaveAttribute('data-color', 'var(--color-primary)');
      const xAxis = container.querySelector('[data-axis="x"]');
      expect(xAxis).toHaveAttribute('data-key', 'name');
    });

    it('applies a custom color and yFormat to the tooltip', () => {
      const { container } = render(
        <BarChart
          data={[{ name: 'a', count: 7 }]}
          xKey="name"
          yKey="count"
          color="#abcdef"
          yFormat={(v) => `${v}%`}
        />,
      );
      const bar = container.querySelector('[data-series="bar"]');
      expect(bar).toHaveAttribute('data-color', '#abcdef');
      const tooltip = container.querySelector('[data-testid="tooltip"]');
      expect(tooltip).toHaveAttribute('data-fmt', '99%');
    });

    describe('variant="compact"', () => {
      it('renders no grid, axes or legend', () => {
        const { container } = render(
          <BarChart
            data={[{ name: 'In', value: 10, tone: 'success' as const }]}
            xKey="name"
            yKey="value"
            variant="compact"
          />,
        );
        expect(container.querySelector('[data-testid="grid"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-axis="x"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-axis="y"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-testid="legend"]')).not.toBeInTheDocument();
      });

      it('paints each bar from its own tone via the shared Tone scale', () => {
        const { container } = render(
          <BarChart
            data={[
              { name: 'Completed', value: 4, tone: 'success' as const },
              { name: 'Failed', value: 1, tone: 'danger' as const },
            ]}
            xKey="name"
            yKey="value"
            variant="compact"
          />,
        );
        const cells = container.querySelectorAll('[data-cell]');
        expect(cells).toHaveLength(2);
        expect(cells[0]).toHaveAttribute('data-fill', 'var(--color-success)');
        expect(cells[1]).toHaveAttribute('data-fill', 'var(--color-danger)');
      });

      it('falls back to color/primary for a row with no tone', () => {
        const { container } = render(
          <BarChart
            data={[{ name: 'a', value: 1 }, { name: 'b', value: 2, tone: 'info' as const }]}
            xKey="name"
            yKey="value"
            variant="compact"
            color="#abcdef"
          />,
        );
        const cells = container.querySelectorAll('[data-cell]');
        expect(cells[0]).toHaveAttribute('data-fill', '#abcdef');
        expect(cells[1]).toHaveAttribute('data-fill', 'var(--color-info)');
      });

      it('defaults to color/primary with no color prop and no tone', () => {
        const { container } = render(
          <BarChart data={[{ name: 'a', value: 1 }]} xKey="name" yKey="value" variant="compact" />,
        );
        expect(container.querySelector('[data-cell]')).toHaveAttribute(
          'data-fill',
          'var(--color-primary)',
        );
      });

      it('renders no value labels by default', () => {
        const { container } = render(
          <BarChart data={[{ name: 'a', value: 1 }]} xKey="name" yKey="value" variant="compact" />,
        );
        expect(container.querySelector('[data-testid="label-list"]')).not.toBeInTheDocument();
      });

      it('renders value labels when showValues is set', () => {
        const { container } = render(
          <BarChart
            data={[{ name: 'a', value: 1 }]}
            xKey="name"
            yKey="value"
            variant="compact"
            showValues
          />,
        );
        expect(container.querySelector('[data-testid="label-list"]')).toHaveAttribute(
          'data-key',
          'value',
        );
      });
    });
  });
});
