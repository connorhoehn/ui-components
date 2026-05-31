import type { Meta, StoryObj } from '@storybook/react-vite';
import StackDiagram, { type StackLayerSpec } from './StackDiagram';

const stack: StackLayerSpec[] = [
  { id: 'browser', label: 'Browser', description: 'React + Vite + Tailwind', icon: '🌐', tone: 'info' },
  { id: 'gateway', label: 'Gateway', description: 'WebSocket fan-in / auth', icon: '🛡', tone: 'success' },
  { id: 'queue',   label: 'Queue',   description: 'SQS, durable, FIFO',     icon: '📬', tone: 'warning' },
  { id: 'worker',  label: 'Worker',  description: 'Lambda, autoscaling',    icon: '⚙️', tone: 'neutral' },
];

const meta = {
  title: 'Shared/StackDiagram',
  component: StackDiagram,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { layers: stack, orientation: 'vertical', connector: 'arrow' },
} satisfies Meta<typeof StackDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};
export const Horizontal: Story = { args: { orientation: 'horizontal' } };
export const LineConnector: Story = { args: { connector: 'line' } };
export const NoConnectors: Story = { args: { connector: 'none' } };
