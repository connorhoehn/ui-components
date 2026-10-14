import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import FormField from './FormField';
import { PersonPicker, type PersonPickerPerson } from './PersonPicker';

const PEOPLE: PersonPickerPerson[] = [
  { id: 'u-priya', name: 'Priya Venkataraman', tag: 'You', detail: 'Access · Work' },
  { id: 'u-omar', name: 'Omar Haddad', detail: 'Access' },
  { id: 'u-rhea', name: 'Rhea Castellanos', detail: 'Access' },
  { id: 'u-nora', name: 'Nora Lindqvist', detail: 'Work · Social' },
  { id: 'u-gone', name: 'Former Person', detail: 'No deciding role in Access', disabled: true },
];

const meta = {
  title: 'Shared/PersonPicker',
  component: PersonPicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof PersonPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

function InForm({ initial = '', loading = false }: { initial?: string; loading?: boolean }) {
  const [value, setValue] = useState(initial);
  return (
    <div className="max-w-md">
      <FormField label="Person" hint="Access is granted to the person named here." required>
        {(w) => <PersonPicker {...w} people={PEOPLE} value={value} onChange={setValue} loading={loading} />}
      </FormField>
    </div>
  );
}

export const Default: Story = { args: { people: PEOPLE, value: '', onChange: () => {} }, render: () => <InForm /> };
export const Chosen: Story = { args: { people: PEOPLE, value: 'u-omar', onChange: () => {} }, render: () => <InForm initial="u-omar" /> };
export const Loading: Story = { args: { people: [], value: '', onChange: () => {} }, render: () => <InForm loading /> };
