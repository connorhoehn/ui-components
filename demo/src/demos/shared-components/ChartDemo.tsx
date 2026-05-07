import { LineChart, StackedAreaChart, BarChart } from '@/components/shared/Chart';
import type { LineSeries } from '@/components/shared/Chart';

const lineSeriesData: LineSeries[] = [
  {
    label: 'Revenue',
    data: [
      { x: 'Jan', y: 4200 },
      { x: 'Feb', y: 5100 },
      { x: 'Mar', y: 4800 },
      { x: 'Apr', y: 6200 },
      { x: 'May', y: 7100 },
      { x: 'Jun', y: 6800 },
    ],
    color: '#2563eb',
  },
  {
    label: 'Expenses',
    data: [
      { x: 'Jan', y: 3100 },
      { x: 'Feb', y: 3400 },
      { x: 'Mar', y: 3200 },
      { x: 'Apr', y: 3900 },
      { x: 'May', y: 4200 },
      { x: 'Jun', y: 4000 },
    ],
    color: '#dc2626',
  },
];

const areaSeriesData: LineSeries[] = [
  {
    label: 'Desktop',
    data: [
      { x: 'Mon', y: 120 },
      { x: 'Tue', y: 150 },
      { x: 'Wed', y: 180 },
      { x: 'Thu', y: 140 },
      { x: 'Fri', y: 200 },
    ],
  },
  {
    label: 'Mobile',
    data: [
      { x: 'Mon', y: 80 },
      { x: 'Tue', y: 100 },
      { x: 'Wed', y: 130 },
      { x: 'Thu', y: 110 },
      { x: 'Fri', y: 150 },
    ],
  },
  {
    label: 'Tablet',
    data: [
      { x: 'Mon', y: 30 },
      { x: 'Tue', y: 40 },
      { x: 'Wed', y: 35 },
      { x: 'Thu', y: 45 },
      { x: 'Fri', y: 50 },
    ],
  },
];

const barData = [
  { category: 'Q1', sales: 320 },
  { category: 'Q2', sales: 480 },
  { category: 'Q3', sales: 410 },
  { category: 'Q4', sales: 560 },
];

export function ChartDemo() {
  return (
    <section style={{ marginBottom: 48 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Charts</h3>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>
        Responsive chart wrappers around Recharts with consistent styling defaults.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
            Line Chart
          </h4>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16 }}>
            <LineChart
              series={lineSeriesData}
              height={200}
              yFormat={(v) => `$${(v / 1000).toFixed(1)}k`}
            />
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
            Stacked Area Chart
          </h4>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16 }}>
            <StackedAreaChart series={areaSeriesData} height={200} />
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
            Bar Chart
          </h4>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16 }}>
            <BarChart
              data={barData}
              xKey="category"
              yKey="sales"
              height={200}
              color="#8b5cf6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
