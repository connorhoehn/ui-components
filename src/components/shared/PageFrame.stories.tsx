import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { PageFrame } from './PageFrame';
import { Button } from '../ui/Button';
import FormField from './FormField';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';

const meta: Meta<typeof PageFrame> = {
  title: 'Templates/PageFrame',
  component: PageFrame,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="h-[560px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof PageFrame>;

/** A form page: trail, title and actions, the form at the page gutter; only the body scrolls. */
export const FormPage: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    return (
      <PageFrame title="New connector" breadcrumbs={[{ label: 'Connectors', href: '#' }, { label: 'New connector' }]}
        actions={<><Button size="sm" variant="secondary">Cancel</Button><Button size="sm">Create</Button></>}>
        <FormField label="Name">{({ id }) => <Input id={id} value={name} onChange={(e) => setName(e.target.value)} />}</FormField>
        <FormField label="Notes">{({ id }) => <Textarea id={id} value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />}</FormField>
      </PageFrame>
    );
  },
};

/** `body="fill"`: the body is a fixed-height column; the footer docks under it. */
export const FillWithFooter: Story = {
  render: () => (
    <PageFrame title="Canvas" body="fill" footer={<div className="border-t border-border px-[var(--ui-page-gutter,1.5rem)] py-2 text-xs text-text-secondary">Saved 2m ago</div>}>
      <div className="min-h-0 flex-1 rounded-lg border border-border bg-surface-subtle" />
    </PageFrame>
  ),
};
