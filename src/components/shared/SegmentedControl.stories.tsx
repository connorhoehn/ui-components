import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Shared/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const OPTIONS = [
  { label: 'List', value: 'list' },
  { label: 'Grid', value: 'grid' },
  { label: 'Table', value: 'table' },
];

export const Interactive: Story = {
  args: { options: OPTIONS, value: 'list', onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState('list');
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
};

export const Small: Story = {
  args: { options: OPTIONS.slice(0, 2), value: 'grid', size: 'sm', onChange: () => {} },
};
