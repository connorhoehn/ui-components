import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormWizard, type FormWizardSection } from './FormWizard';
import FormField from './FormField';
import { Combobox } from './Combobox';
import { KeyValue } from './KeyValue';
import { InlineAlert } from './InlineAlert';
import { RadioGroup } from '../forms/RadioGroup';
import { Select } from '../forms/Select';
import { Textarea } from '../forms/Textarea';

const meta = {
  title: 'Shared/FormWizard',
  component: FormWizard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FormWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const ITEMS = [
  { value: 'sme', label: 'SME in Work', meta: 'Work', description: 'Dispatch agent runs on initiatives you hold a grant for.' },
  { value: 'lead', label: 'Lead assessor', meta: 'Assessment', description: 'Sign off scorecards for your teams.' },
  { value: 'operator', label: 'Pipeline operator', meta: 'Pipelines', description: 'Run and cancel pipeline runs.' },
];
const DURATIONS = [
  { value: '24h', label: '24 hours' }, { value: '7d', label: '7 days' }, { value: '30d', label: '30 days' }, { value: 'standing', label: 'Standing' },
];

function useRequestSections(withWho: boolean) {
  const [who, setWho] = useState('self');
  const [item, setItem] = useState('');
  const [why, setWhy] = useState('');
  const [duration, setDuration] = useState('7d');
  const chosen = ITEMS.find((i) => i.value === item);
  const sections: FormWizardSection[] = [
    {
      key: 'who', title: 'Who is it for?', label: 'Who', hidden: !withWho,
      content: <FormField label="Person">{(w) => <Select {...w} value={who} onChange={(e) => setWho(e.target.value)} options={[{ value: 'self', label: 'Myself' }, { value: 'ada', label: 'Ada Lovelace' }]} />}</FormField>,
    },
    {
      key: 'what', title: 'What do you need?', label: 'What', description: 'One catalog item per request.', error: item ? null : 'Choose an item from the catalog.',
      content: <FormField label="Catalog item" required>{(w) => <Combobox {...w} size="md" options={ITEMS} value={item} onChange={setItem} placeholder="Search the catalog" />}</FormField>,
    },
    {
      key: 'why', title: 'Why?', label: 'Why', description: 'Approvers read this first.', error: why.trim().length >= 20 ? null : 'Say why in at least 20 characters.',
      content: <FormField label="Justification" hint={`${why.trim().length} of at least 20 characters`} required>{(w) => <Textarea {...w} rows={4} value={why} onChange={(e) => setWhy(e.target.value)} />}</FormField>,
    },
    {
      key: 'how-long', title: 'For how long?', label: 'How long', description: 'Access ends on its own when the time is up.',
      content: <RadioGroup name="duration" aria-label="Duration" orientation="horizontal" value={duration} onChange={setDuration} options={DURATIONS} />,
    },
  ];
  const summary = (
    <>
      <KeyValue items={[
        { label: 'You get', value: chosen?.label ?? '—' },
        { label: 'Workspace', value: chosen?.meta ?? '—' },
        { label: 'Approved by', value: 'Your manager, then the workspace steward' },
        { label: 'Until', value: duration === 'standing' ? 'Until revoked' : `${DURATIONS.find((d) => d.value === duration)?.label} after approval` },
      ]} />
      <InlineAlert tone="success">No separation-of-duties conflict.</InlineAlert>
    </>
  );
  return { sections, summary };
}

export const SinglePage: Story = {
  args: { sections: [], onSubmit: () => {} },
  render: () => {
    const { sections, summary } = useRequestSections(false);
    return <FormWizard sections={sections} summary={summary} submitLabel="Submit request" onSubmit={() => alert('Submitted')} aria-label="New request" />;
  },
};

export const SinglePageWithChoice: Story = {
  args: { sections: [], onSubmit: () => {} },
  render: () => {
    const { sections, summary } = useRequestSections(true);
    return <FormWizard sections={sections} summary={summary} aside="Access is granted to the person named; nobody approves a request they made or benefit from." submitLabel="Submit request" onSubmit={() => alert('Submitted')} />;
  },
};

export const Stepped: Story = {
  args: { sections: [], onSubmit: () => {} },
  render: () => {
    const { sections } = useRequestSections(true);
    return <FormWizard mode="stepped" sections={sections} submitLabel="Submit request" onSubmit={() => alert('Submitted')} />;
  },
};

export const Submitting: Story = {
  args: { sections: [], onSubmit: () => {} },
  render: () => {
    const { sections, summary } = useRequestSections(false);
    return <FormWizard sections={sections} summary={summary} submitting submitError="req-0007 already asks for SME in Work and is still open." onSubmit={() => {}} />;
  },
};
