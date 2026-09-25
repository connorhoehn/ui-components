import type { Meta, StoryObj } from '@storybook/react-vite';
import DropdownMenu from './DropdownMenu';

const meta = {
  title: 'Shared/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    align: { control: 'radio', options: ['start', 'end'] },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const appMenuSections = [
  {
    label: 'Content',
    items: [
      { icon: '📋', label: 'Document Types', active: true, onSelect: () => {} },
      { icon: '🧩', label: 'Data Types', onSelect: () => {} },
    ],
  },
  {
    label: 'Automation',
    items: [
      { icon: '🔀', label: 'Pipelines', onSelect: () => {} },
      { icon: '📡', label: 'Observability', onSelect: () => {} },
    ],
  },
  {
    label: 'Developer',
    items: [
      { icon: '🔧', label: 'Dev Tools', onSelect: () => {} },
      { icon: '💬', label: 'Chat Demo', onSelect: () => {} },
    ],
  },
];

export const Default: Story = {
  args: {
    trigger: '☰',
    triggerLabel: 'Open app menu',
    sections: appMenuSections,
  },
};

export const EndAligned: Story = {
  name: 'End-aligned (viewport right edge)',
  args: {
    trigger: '☰',
    triggerLabel: 'Open app menu',
    align: 'end',
    sections: appMenuSections,
  },
  render: (args) => (
    <div className="flex justify-end">
      <DropdownMenu {...args} />
    </div>
  ),
};

export const SingleSectionNoLabel: Story = {
  args: {
    trigger: 'Actions ▾',
    triggerLabel: 'Open actions menu',
    sections: [
      {
        items: [
          { label: 'Rename', onSelect: () => {} },
          { label: 'Duplicate', onSelect: () => {} },
          { label: 'Delete', danger: true, onSelect: () => {} },
        ],
      },
    ],
  },
};

/**
 * A workflow that doesn't apply right now stays listed — muted, with the
 * reason as its second line and tooltip — so the menu still teaches what
 * exists. It is focusable (screen readers reach it and hear why) but click,
 * Enter and Space do nothing, and a disabled flyout row does not open.
 */
export const DisabledItems: Story = {
  name: 'Disabled items with a reason',
  args: {
    trigger: 'Workflow ▾',
    triggerLabel: 'Workflow',
    sections: [
      {
        label: 'Run a workflow',
        items: [
          { label: 'Plan the next sprint', onSelect: () => {} },
          { label: 'Unblock this item', disabled: true, disabledReason: 'Nothing on this initiative is blocked', onSelect: () => {} },
          { label: 'Notify SMEs', checked: false, disabled: true, disabledReason: 'No SMEs attached yet' },
          {
            label: 'Hand off to',
            disabled: true,
            disabledReason: 'Needs an active sprint',
            submenu: [{ items: [{ label: 'An agent', onSelect: () => {} }] }],
          },
        ],
      },
    ],
  },
};
