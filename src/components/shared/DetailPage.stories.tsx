import type { Meta, StoryObj } from '@storybook/react-vite';
import { DetailPage } from './DetailPage';
import { Button } from '../ui/Button';
import { StatusPill } from './StatusPill';
import { MetaLine } from './MetaLine';
import { KeyValue } from './KeyValue';
import { CodeBlock } from './CodeBlock';

const meta: Meta<typeof DetailPage> = {
  title: 'Templates/DetailPage',
  component: DetailPage,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="h-[600px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof DetailPage>;

const LOG = Array.from({ length: 80 }, (_, i) => `12:00:${String(i).padStart(2, '0')} span ${i} ok`).join('\n');

/** One record: the header names it, tabs hold its sections, each tab body scrolls on its own. */
export const Invocation: Story = {
  args: {
    title: 'Invocation 7f3a',
    badge: <StatusPill state="success" label="Succeeded" />,
    meta: <MetaLine items={['support-agent', '2.4s', 'Nov 4, 12:00']} />,
    breadcrumbs: [{ label: 'Observability', href: '#' }, { label: 'Invocations', href: '#' }, { label: '7f3a' }],
    actions: <><Button size="sm" variant="secondary">Share</Button><Button size="sm">Re-run</Button></>,
    tabs: [
      { id: 'summary', label: 'Summary', content: <KeyValue items={[{ label: 'Agent', value: 'support-agent' }, { label: 'Latency', value: '2.4s' }, { label: 'Tokens', value: '1,204' }]} /> },
      { id: 'trace', label: 'Trace', badge: 80, content: <CodeBlock code={LOG} language="text" /> },
      { id: 'cost', label: 'Cost', content: <KeyValue items={[{ label: 'Input', value: '$0.002' }, { label: 'Output', value: '$0.004' }]} /> },
    ],
  },
};
