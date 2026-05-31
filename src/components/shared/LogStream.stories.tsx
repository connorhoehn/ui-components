import type { Meta, StoryObj } from '@storybook/react-vite';
import LogStream, { type LogLine } from './LogStream';

const lines: LogLine[] = [
  { id: '1', timestamp: '10:00:01', level: 'info', source: 'api', message: 'Server started on :8080' },
  { id: '2', timestamp: '10:00:02', level: 'debug', source: 'auth', message: 'Loaded 12 OIDC providers' },
  { id: '3', timestamp: '10:00:03', level: 'info', source: 'pipeline-1', message: 'Stage planned: 4 nodes' },
  { id: '4', timestamp: '10:00:04', level: 'warn', source: 'pipeline-1', message: 'Stage took 6.2s (budget 3.0s)' },
  { id: '5', timestamp: '10:00:05', level: 'error', source: 'db', message: 'Connection refused: pg://primary' },
  { id: '6', timestamp: '10:00:06', level: 'info', source: 'db', message: 'Failover to replica-2 succeeded' },
  { id: '7', timestamp: '10:00:07', level: 'info', source: 'api', message: 'Request POST /v1/runs 201 18ms' },
];

const meta = {
  title: 'Shared/LogStream',
  component: LogStream,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    lines,
    follow: true,
    title: 'Pipeline output',
  },
} satisfies Meta<typeof LogStream>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = { args: { lines: [], title: 'Pipeline output' } };

export const NoLevelsOrSources: Story = {
  args: { showLevel: false, showSource: false },
};

export const WithClear: Story = {
  args: { onClear: () => undefined },
};

export const Compact: Story = {
  args: { maxHeight: '180px' },
};
