import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from './SearchInput';

const meta = {
  title: 'Shared/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: { value: '', onChange: () => {}, 'aria-label': 'Search' },
  render: () => {
    const [value, setValue] = useState('pipel');
    return <SearchInput value={value} onChange={setValue} aria-label="Search" />;
  },
};

export const Empty: Story = {
  args: { value: '', onChange: () => {}, placeholder: 'Search runs…', 'aria-label': 'Search runs' },
};
