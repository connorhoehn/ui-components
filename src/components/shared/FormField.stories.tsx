import type { Meta, StoryObj } from '@storybook/react-vite';
import FormField from './FormField';
import Switch from './Switch';
import { useState } from 'react';

const meta = {
  title: 'Shared/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

const inputClass =
  'block w-full rounded border border-slate-300 px-3 py-1.5 text-sm';

export const Basic: Story = {
  args: {
    label: 'Display name',
    children: (wiring) => <input {...wiring} className={inputClass} placeholder="Alice" />,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Username',
    hint: 'Lowercase, no spaces. Used in your profile URL.',
    children: (wiring) => <input {...wiring} className={inputClass} placeholder="alice" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Not a valid email address.',
    children: (wiring) => (
      <input {...wiring} className={inputClass} defaultValue="not-an-email" />
    ),
  },
};

export const Required: Story = {
  args: {
    label: 'Workspace name',
    required: true,
    hint: 'Will appear in invitation emails.',
    children: (wiring) => <input {...wiring} className={inputClass} />,
  },
};

export const Inline: Story = {
  args: {
    label: 'Notifications',
    layout: 'inline',
    children: (wiring) => {
      const [on, setOn] = useState(true);
      return <Switch checked={on} onChange={setOn} aria-labelledby={wiring.labelId} />;
    },
  },
};
