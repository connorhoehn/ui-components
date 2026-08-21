import type { Meta, StoryObj } from '@storybook/react-vite';
import { CollapsibleSection } from './CollapsibleSection';
import Chip from './Chip';

const meta = {
  title: 'Shared/CollapsibleSection',
  component: CollapsibleSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CollapsibleSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Advanced settings',
    children: <div className="p-4 text-sm text-text-secondary">Body content.</div>,
  },
};

export const OpenWithBadge: Story = {
  args: {
    title: 'Recent errors',
    defaultOpen: true,
    badge: <Chip tone="danger" size="xs">3</Chip>,
    children: <div className="p-4 text-sm text-text-secondary">Error list…</div>,
  },
};
