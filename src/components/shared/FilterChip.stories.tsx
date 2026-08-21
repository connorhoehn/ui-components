import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterChip } from './FilterChip';
import { toneVar } from './tones';

const meta = {
  title: 'Shared/FilterChip',
  component: FilterChip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Toggleable: Story = {
  args: { active: false, onClick: () => {}, children: 'Failed' },
  render: () => {
    const [active, setActive] = useState(false);
    return (
      <FilterChip active={active} onClick={() => setActive((a) => !a)}>
        Failed
      </FilterChip>
    );
  },
};

export const ColoredWithDot: Story = {
  args: {
    active: true,
    onClick: () => {},
    color: toneVar('accent'),
    dot: true,
    children: 'Design',
  },
};

export const Disabled: Story = {
  args: { active: false, onClick: () => {}, disabled: true, children: 'Archived' },
};
