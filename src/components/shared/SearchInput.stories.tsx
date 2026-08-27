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

/** `tone="code"` reaches the `<input>` itself. `className` only ever landed
 *  on the wrapper, so before this prop a SearchInput dropped into a dark
 *  panel stayed a white box no matter what the caller passed. */
export const CodeTone: Story = {
  args: { value: '', onChange: () => {}, tone: 'code', 'aria-label': 'Filter computers' },
  render: () => {
    const [value, setValue] = useState('kube');
    return (
      <div className="bg-code-bg p-4 rounded w-72">
        <SearchInput
          tone="code"
          value={value}
          onChange={setValue}
          placeholder="filter computers…"
          aria-label="Filter computers"
          className="w-full"
        />
      </div>
    );
  },
};
