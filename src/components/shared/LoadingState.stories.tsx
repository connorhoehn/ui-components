import type { Meta, StoryObj } from '@storybook/react-vite';
import LoadingState from './LoadingState';

const meta = {
  title: 'Shared/LoadingState',
  component: LoadingState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    spinnerSize: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const CustomLabel: Story = {
  args: { label: 'Fetching pipeline runs…' },
};

export const WithDescription: Story = {
  args: {
    label: 'Building catalog',
    description: 'This may take a few seconds for large workspaces.',
  },
};

export const SmallSpinner: Story = {
  args: { label: 'Saving…', spinnerSize: 'sm' },
};
