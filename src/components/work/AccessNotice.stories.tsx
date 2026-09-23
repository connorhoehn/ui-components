import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccessNotice } from './AccessNotice';

const meta = {
  title: 'Work/AccessNotice',
  component: AccessNotice,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="w-[390px]"><Story /></div>],
  args: {
    tone: 'warning',
    title: 'Edit access required',
    body: 'You can view this item but not dispatch work on it.',
    action: { label: 'Request access', onClick: () => {} },
  },
} satisfies Meta<typeof AccessNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mockup: Story = {};
export const NoAction: Story = { args: { action: null } };
export const Info: Story = {
  args: { tone: 'info', title: 'Read-only preview', body: 'Dispatch is available to editors.', action: null },
};
export const Danger: Story = {
  args: { tone: 'danger', title: 'Access revoked', body: 'Your grant on this document was removed.', action: null },
};
export const Dark: Story = {
  render: (args) => (
    <div data-theme="dark" className="bg-surface p-4">
      <AccessNotice {...args} />
    </div>
  ),
};
