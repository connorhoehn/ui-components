import type { Meta, StoryObj } from '@storybook/react-vite';
import { DetailSection } from './DetailSection';

const meta = {
  title: 'Shared/DetailSection',
  component: DetailSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DetailSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Steps', first: true, children: 'The recorded steps for this run.' },
};

export const PageSection: Story = {
  args: { ...Default.args, as: 'h2', variant: 'heading', description: 'A section directly under a page title.' },
};
