import type { Meta, StoryObj } from '@storybook/react-vite';
import { RunProgressPanel } from './RunProgressPanel';

const meta = {
  title: 'Shared/RunProgressPanel',
  component: RunProgressPanel,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RunProgressPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

/** Concepts §5: Meshy generating a mesh, 68%, Refresh and an in-place Cancel. */
export const Running: Story = {
  args: {
    title: 'Generating 3D mesh',
    description: 'Meshy is generating a stylized mesh from the approved concept. You can continue working while this runs.',
    progress: 68,
    elapsedMs: 222_000,
    remainingMs: 105_000,
    onRefresh: noop,
    onCancel: () => new Promise((resolve) => setTimeout(resolve, 1200)),
  },
};

/** Elapsed counted live from `startedAt`; no percentage from the provider, so no bar. */
export const LiveElapsedNoPercentage: Story = {
  args: {
    title: 'Drawing Mina',
    description: 'Codex is drawing a 4 × 4 sheet of concepts.',
    startedAt: Date.now() - 42_000,
    onCancel: noop,
  },
};

export const Queued: Story = {
  args: { title: 'Texturing Toby', state: 'queued', description: 'Waiting for a free Meshy slot.', progress: 0, onCancel: noop },
};

export const Done: Story = {
  args: { title: 'Generating 3D mesh', state: 'done', progress: 100, elapsedMs: 330_000, onRefresh: noop },
};

/** Inside a card that already has a surface. */
export const Unframed: Story = {
  args: { ...Running.args, framed: false } as Story['args'],
};
