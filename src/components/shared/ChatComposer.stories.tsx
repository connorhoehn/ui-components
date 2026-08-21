import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatComposer } from './ChatComposer';

const meta = {
  title: 'Shared/ChatComposer',
  component: ChatComposer,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ChatComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleLine: Story = {
  args: { value: '', onChange: () => {}, onSubmit: () => {} },
  render: () => {
    const [value, setValue] = useState('');
    return (
      <ChatComposer
        value={value}
        onChange={setValue}
        onSubmit={() => setValue('')}
        placeholder="Message the agent…"
      />
    );
  },
};

export const Multiline: Story = {
  args: {
    value: 'Line one\nline two',
    onChange: () => {},
    onSubmit: () => {},
    multiline: true,
    submitLabel: 'Send',
  },
};

export const Disabled: Story = {
  args: { value: '', onChange: () => {}, onSubmit: () => {}, disabled: true, placeholder: 'Not connected' },
};
