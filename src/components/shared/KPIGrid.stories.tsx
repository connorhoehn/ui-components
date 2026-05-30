import type { Meta, StoryObj } from '@storybook/react-vite';
import KPIGrid from './KPIGrid';
import StatCard from './StatCard';

const cards = (
  <>
    <StatCard label="Active syncs" value={3} accent />
    <StatCard label="Items processed" value="12,408" />
    <StatCard label="Conflicts" value={2} />
    <StatCard label="DLQ items" value={1} danger />
  </>
);

const meta = {
  title: 'Shared/KPIGrid',
  component: KPIGrid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    columns: { control: 'radio', options: [1, 2, 3, 4] },
    dense: { control: 'boolean' },
  },
  args: {
    children: cards,
  },
} satisfies Meta<typeof KPIGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FourColumns: Story = { args: { columns: 4 } };
export const ThreeColumns: Story = { args: { columns: 3 } };
export const TwoColumns: Story = { args: { columns: 2 } };
export const OneColumn: Story = { args: { columns: 1 } };
export const Dense: Story = { args: { columns: 4, dense: true } };
