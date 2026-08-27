import type { Meta, StoryObj } from '@storybook/react-vite';
import { DotMeter } from './DotMeter';

const meta = {
  title: 'Shared/DotMeter',
  component: DotMeter,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DotMeter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'current', value: 0.55 },
};

/** The reset time is what makes a quota actionable — 89% is only alarming
 *  until you know it clears in nine minutes. */
export const Quota: Story = {
  args: { value: 0.55 },
  render: () => (
    <div className="flex flex-col gap-1 bg-code-panel p-3 rounded">
      <DotMeter label="current" value={0.55} note="⟳ 2hr 4min" />
      <DotMeter label="weekly" value={0.23} note="⟳ Sun 10:00pm" />
    </div>
  ),
};

/** Past `warnAbove` the fill changes tone; below it, a half-spent budget is
 *  deliberately neutral. */
export const Warning: Story = {
  args: { label: 'expires', value: 0.94, note: '⟳ stops in 4m' },
};

export const Counted: Story = {
  args: { label: 'shells', value: 3 / 8, segments: 8, showPercent: false, note: '3 of 8 open' },
};

export const SurfaceTone: Story = {
  args: { label: 'budget', value: 0.4, tone: 'surface', note: 'resets monthly' },
};

export const Edges: Story = {
  args: { value: 0 },
  render: () => (
    <div className="flex flex-col gap-1 bg-code-panel p-3 rounded">
      <DotMeter label="empty" value={0} />
      <DotMeter label="almost" value={0.99} />
      <DotMeter label="full" value={1} />
    </div>
  ),
};
