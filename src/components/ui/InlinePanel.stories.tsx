import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlinePanel } from './InlinePanel';
import { PanelHeader, PanelBody } from './Panel';

const meta = {
  title: 'UI/InlinePanel',
  component: InlinePanel,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['light', 'dark'] },
  },
} satisfies Meta<typeof InlinePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The host reserves the slot's width (here, a fixed-width flex sibling);
 *  `InlinePanel` just fills whatever box it's given. */
export const InSidebarSlot: Story = {
  args: { children: null },
  render: (args) => (
    <div className="flex h-[360px] w-[560px] border border-border">
      <div className="flex-1 bg-surface-panel p-4 text-sm text-text-secondary">Main content</div>
      <div className="w-72 shrink-0">
        <InlinePanel {...args}>
          <PanelHeader title="Details" onClose={() => {}} />
          <PanelBody>Fills the 288px slot the host reserved — no fixed width of its own.</PanelBody>
        </InlinePanel>
      </div>
    </div>
  ),
};

export const Dark: Story = {
  args: { children: null },
  render: (args) => (
    <div className="flex h-[360px] w-[560px] border border-border">
      <div className="flex-1 bg-call-chrome p-4 text-sm text-white/70">Call stage</div>
      <div className="w-72 shrink-0">
        <InlinePanel {...args} variant="dark">
          <PanelHeader title="Transcript" onClose={() => {}} variant="dark" />
          <PanelBody>Theme-invariant dark chrome, same as `Panel variant="dark"`.</PanelBody>
        </InlinePanel>
      </div>
    </div>
  ),
};
