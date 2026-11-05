import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardPage } from './DashboardPage';
import { KPIGrid } from './KPIGrid';
import StatCard from './StatCard';
import { KeyValue } from './KeyValue';

const meta: Meta<typeof DashboardPage> = {
  title: 'Templates/DashboardPage',
  component: DashboardPage,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="h-[800px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof DashboardPage>;

const panelBody = (n: number) => <KeyValue items={Array.from({ length: n }, (_, i) => ({ label: `Metric ${i + 1}`, value: `${(i * 7) % 100}%` }))} />;

/** A stat strip, then two rows of panels: fits 1280×800 with no page scroll. */
export const Overview: Story = {
  args: {
    title: 'Observability',
    stats: [
      { label: 'Invocations', value: '12.4k', hint: 'last 24h' },
      { label: 'Error rate', value: '0.8%', tone: 'danger' },
      { label: 'p95 latency', value: '2.1s' },
      { label: 'Spend', value: '$41', tone: 'accent' },
    ],
    panels: [
      { id: 'latency', title: 'Latency', span: 2, content: panelBody(6) },
      { id: 'errors', title: 'Errors', content: panelBody(12) },
      { id: 'agents', title: 'Agents', content: panelBody(5) },
      { id: 'tools', title: 'Tools', content: panelBody(5) },
      { id: 'cost', title: 'Cost', content: panelBody(5) },
    ],
  },
};

/** `kpis` takes a KPIGrid of StatCards when a strip is not enough. */
export const WithKPIGrid: Story = {
  args: {
    title: 'Fleet',
    columns: 2,
    kpis: <KPIGrid dense><StatCard label="Nodes" value="48" /><StatCard label="Healthy" value="46" /><StatCard label="Draining" value="2" /><StatCard label="Jobs" value="310" /></KPIGrid>,
    panels: [
      { id: 'a', title: 'Capacity', content: panelBody(4) },
      { id: 'b', title: 'Queue', content: panelBody(4) },
    ],
  },
};
