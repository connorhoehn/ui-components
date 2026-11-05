import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SettingsPage } from './SettingsPage';
import FormField from './FormField';
import { Input } from '../forms/Input';

const meta: Meta<typeof SettingsPage> = {
  title: 'Templates/SettingsPage',
  component: SettingsPage,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="h-[560px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SettingsPage>;

/** SettingsLayout under the page trail; editing a field shows the sticky save bar. */
export const Workspace: Story = {
  render: () => {
    const [name, setName] = useState('Acme');
    const dirty = name !== 'Acme';
    return (
      <SettingsPage title="Workspace" subtitle="Acme · admin" breadcrumbs={[{ label: 'Admin', href: '#' }, { label: 'Workspace' }]}
        dirty={dirty} onSave={() => {}} onCancel={() => setName('Acme')}
        sections={[
          { id: 'general', label: 'General', content: <FormField label="Workspace name">{({ id }) => <Input id={id} value={name} onChange={(e) => setName(e.target.value)} />}</FormField> },
          { id: 'members', label: 'Members', description: '12 people', content: <p className="m-0 text-sm text-text-secondary">Member management.</p> },
        ]} />
    );
  },
};
