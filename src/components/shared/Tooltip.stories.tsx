import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { IconButton } from '../ui/IconButton';

const meta = {
  title: 'Shared/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = { content: 'Tooltip', children: <button type="button">Trigger</button> };

export const OnIconButton: Story = {
  args: baseArgs,
  render: () => (
    <div className="p-16">
      <Tooltip content="Collapse dimension list">
        <IconButton aria-label="Collapse" icon={<span>◀</span>} />
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  args: baseArgs,
  render: () => (
    <div className="flex items-center gap-10 p-16">
      {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
        <Tooltip key={placement} content={`Tooltip ${placement}`} placement={placement}>
          <button type="button" className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm">
            {placement}
          </button>
        </Tooltip>
      ))}
    </div>
  ),
};
