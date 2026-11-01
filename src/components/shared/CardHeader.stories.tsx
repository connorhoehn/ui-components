import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardHeader } from './CardHeader';
import Chip from './Chip';
import { Button } from '../ui/Button';

const meta = {
  title: 'Shared/CardHeader',
  component: CardHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Recent Runs' },
};

export const PageSection: Story = {
  args: { title: 'Recent Runs', as: 'h2', subtitle: 'Directly under a page title; the visual scale is unchanged.' },
};

export const WithEverything: Story = {
  args: {
    title: 'Recent Runs',
    subtitle: 'Last 24 hours',
    meta: <Chip tone="info" size="xs">12</Chip>,
    action: <Button variant="ghost" size="sm">Refresh</Button>,
  },
};
