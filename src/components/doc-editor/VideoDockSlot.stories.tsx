import type { Meta, StoryObj } from '@storybook/react-vite';
import VideoDockSlot from './VideoDockSlot';

// The three states are the whole component, so each gets its own story: the
// interesting bug is a slot that renders a box when it should render nothing.
const meta = {
  title: 'Doc-Editor/VideoDockSlot',
  component: VideoDockSlot,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof VideoDockSlot>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Stand-in for the widget the caller portals in — never rendered by the slot itself. */
function FakeVideo() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-surface-inverse text-xs text-text-inverse">
      live call video
    </div>
  );
}

export const NoCall: Story = {
  name: 'Empty — no call (renders nothing)',
  args: { docked: false, canAccept: false },
  render: (args) => (
    <div className="w-[280px] rounded-lg border border-dashed border-border p-3 text-xs text-text-tertiary">
      Gutter column — the slot below is deliberately absent:
      <VideoDockSlot {...args} />
    </div>
  ),
};

export const AwaitingDrop: Story = {
  name: 'Empty — call is dockable',
  args: { docked: false, canAccept: true },
  render: (args) => (
    <div className="w-[280px]">
      <VideoDockSlot {...args} />
    </div>
  ),
};

export const Docked: Story = {
  args: { docked: true, canAccept: false, label: 'Design review', onRequestUndock: () => {} },
  render: (args) => (
    <div className="w-[280px]">
      <VideoDockSlot {...args}>
        <FakeVideo />
      </VideoDockSlot>
    </div>
  ),
};

export const DockedWithoutUndock: Story = {
  name: 'Docked — undock control omitted',
  args: { docked: true, canAccept: false, label: 'Design review' },
  render: (args) => (
    <div className="w-[280px]">
      <VideoDockSlot {...args}>
        <FakeVideo />
      </VideoDockSlot>
    </div>
  ),
};
