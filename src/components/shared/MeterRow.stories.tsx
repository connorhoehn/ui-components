import type { Meta, StoryObj } from '@storybook/react-vite';
import { MeterRow } from './MeterRow';
import { ScoreBarGauge } from './ScoreBarGauge';

const meta = {
  title: 'Shared/MeterRow',
  component: MeterRow,
  tags: ['autodocs'],
  args: {
    onClick: () => {},
    title: 'Add Nora Chang to selection',
    label: 'Nora Chang',
    note: 'mentors',
    meter: <ScoreBarGauge value={0.8} tone="info" size="sm" showLabel={false} ariaLabel="Connection strength 0.80" />,
  },
  decorators: [(Story) => <div className="w-[280px]"><Story /></div>],
} satisfies Meta<typeof MeterRow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WideMeter: Story = { args: { meterWidth: 'md' } };
/** A column of rows lines their meters up. */
export const Column: Story = {
  render: (args) => (
    <>
      {[['Nora Chang', 'mentors', 1], ['Hiro Tanaka', 'collaborates', 0.55], ['Aisha Bello', 'shared expertise', 0.2]].map(([n, t, v]) => (
        <MeterRow key={n as string} {...args} label={n} note={t}
          meter={<ScoreBarGauge value={v as number} tone="info" size="sm" showLabel={false} ariaLabel={`Strength ${v}`} />} />
      ))}
    </>
  ),
};
