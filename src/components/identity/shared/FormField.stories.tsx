import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';

// Identity's FormField is a *value*-coercing wrapper: `onChange` receives the
// coerced value (string | boolean | number), not the DOM event. Note the name
// collision with shared/FormField, which is render-prop based instead.

const meta = {
  title: 'Identity/Shared/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    label: 'Email',
    name: 'email',
    type: 'email',
    value: 'dana@northwind.example',
    onChange: (value: string | boolean | number) => console.log('change', value),
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A required text-family field with a placeholder. */
export const Default: Story = {
  args: { required: true, placeholder: 'you@example.com' },
};

/**
 * `error` swaps the hint for the message and marks the control invalid —
 * the aria wiring comes from shared/FormField underneath.
 */
export const WithError: Story = {
  args: {
    value: 'not-an-email',
    error: 'Enter a valid email address.',
    required: true,
  },
};

/** `helpText` renders only while there is no error. */
export const WithHelpText: Story = {
  args: { helpText: 'Used for password recovery and MFA notices.' },
};

export const Disabled: Story = {
  args: { disabled: true, helpText: 'Email cannot be changed after creation.' },
};

/**
 * Every supported `type` in one form. The checkbox branch keeps its own
 * markup because a checkbox label wraps its control.
 */
export const EveryType: Story = {
  render: () => {
    const [text, setText] = useState('Northwind');
    const [password, setPassword] = useState('');
    const [count, setCount] = useState(12);
    const [role, setRole] = useState('admin');
    const [notes, setNotes] = useState('Migrated from the legacy pool.');
    const [enabled, setEnabled] = useState(true);

    return (
      <div className="max-w-md">
        <FormField
          label="Pool name"
          name="poolName"
          value={text}
          onChange={(v) => setText(String(v))}
          required
        />
        <FormField
          label="Temporary password"
          name="password"
          type="password"
          value={password}
          onChange={(v) => setPassword(String(v))}
          placeholder="Leave blank to auto-generate"
        />
        <FormField
          label="Minimum password length"
          name="minLength"
          type="number"
          value={count}
          onChange={(v) => setCount(Number(v))}
          helpText="Coerced to a number before it reaches onChange."
        />
        <FormField
          label="Default role"
          name="role"
          type="select"
          value={role}
          onChange={(v) => setRole(String(v))}
          placeholder="No default"
          options={[
            { value: 'admin', label: 'Administrator' },
            { value: 'editor', label: 'Editor' },
            { value: 'viewer', label: 'Viewer' },
          ]}
          helpText="The empty option stays selectable, so users can unset it."
        />
        <FormField
          label="Notes"
          name="notes"
          type="textarea"
          value={notes}
          onChange={(v) => setNotes(String(v))}
        />
        <FormField
          label="Require MFA for every sign-in"
          name="mfa"
          type="checkbox"
          value={enabled}
          onChange={(v) => setEnabled(Boolean(v))}
        />
      </div>
    );
  },
};
