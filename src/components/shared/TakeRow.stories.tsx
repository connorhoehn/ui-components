import type { Meta, StoryObj } from '@storybook/react-vite';
import { TakeRow } from './TakeRow';

const meta = {
  title: 'Shared/TakeRow',
  component: TakeRow,
  tags: ['autodocs'],
  args: {
    play: <button type="button" className="rounded-md border border-border px-2 py-1 text-[12px]">Play</button>,
    title: 'Take 2a',
    tags: <span className="rounded bg-surface-inset px-1.5 text-[11px] font-normal">Proposed</span>,
    meta: '4.48 s · -19.2 LUFS · 1.8 words a second · every word heard',
    detail: '“Morning, desk. Morning, laptop. Morning… what are you?”',
    actions: <button type="button" className="rounded-md border border-border px-2 py-1 text-[12px]">Keep take 2a</button>,
    selected: true,
  },
  decorators: [(Story) => <div className="flex w-[640px] flex-col gap-2"><Story /></div>],
} satisfies Meta<typeof TakeRow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Proposed: Story = {};
export const Other: Story = { args: { selected: false, title: 'Take 2b', tags: undefined } };
export const Narrow: Story = { decorators: [(Story) => <div className="w-[300px]"><Story /></div>] };
