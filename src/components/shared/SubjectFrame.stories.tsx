import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SubjectFrame } from './SubjectFrame';
import { RunProgressPanel } from './RunProgressPanel';
import { StatusPill } from './StatusPill';
import TagEditor from './TagEditor';
import Chip from './Chip';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { CloseIcon } from '../ui/Icons';
import { Inline } from '../ui/Stack';

const meta = {
  title: 'Shared/SubjectFrame',
  component: SubjectFrame,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(S) => <div className="max-w-[380px] rounded-lg border border-border bg-surface"><S /></div>],
} satisfies Meta<typeof SubjectFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

const close = <IconButton aria-label="Close" size="sm" icon={<CloseIcon />} />;

function Tabbed(props: Partial<React.ComponentProps<typeof SubjectFrame>> & { tabNames: string[] }) {
  const { tabNames, ...rest } = props;
  const [tab, setTab] = useState(tabNames[0].toLowerCase());
  return (
    <SubjectFrame
      title="Toby — Concept 03"
      {...rest}
      tabs={{ items: tabNames.map((t) => ({ id: t.toLowerCase(), label: t })), value: tab, onValueChange: setTab }}
    >
      {tab === tabNames[0].toLowerCase() ? undefined : `${tab} for this record`}
    </SubjectFrame>
  );
}

/** Concepts §3: a candidate concept's inspector. */
export const CandidateConcept: Story = {
  args: { title: 'Toby — Concept 03' },
  render: () => (
    <Tabbed
      tabNames={['Details', 'Assets', 'Versions', 'Activity']}
      subtitle="Character concept"
      headerActions={close}
      hero={{ kind: 'image', src: 'https://picsum.photos/seed/toby-03/600/900', alt: 'Toby, concept 03', label: 'Concept 03' }}
      facts={[
        { label: 'Status', value: <StatusPill size="sm" state="warning" label="In review" /> },
        { label: 'Role', value: 'Main character' },
        { label: 'Design ID', value: 'toby-c03', mono: true },
        { label: 'Created', value: '11/8/2026, 9:02 AM' },
        { label: 'Updated', value: '11/8/2026, 9:05 AM' },
      ]}
      disclosures={[
        { id: 'notes', title: 'Design notes', defaultOpen: true, children: 'A curious ten-year-old in a yellow raincoat, round glasses, always carrying a screwdriver.' },
        { id: 'style', title: 'Style & constraints', children: <Inline gap="xs"><Chip size="sm">Low-poly</Chip><Chip size="sm">Loose details</Chip><Chip size="sm">TV safe</Chip></Inline> },
        { id: 'plan', title: 'Asset plan', children: '16 tiles (4 × 4) · PNG · 2048 × 2048' },
        { id: 'tags', title: 'Tags', count: 3, action: <Button size="sm" variant="ghost">+ Add</Button>, children: <TagEditor aria-label="Tags" value={['kid', 'lead', 'raincoat']} onChange={() => {}} /> },
      ]}
    />
  ),
};

/** Nothing drawn yet: the same frame with words in it, never an EmptyState. */
export const Placeholder: Story = {
  args: {
    title: 'Mina',
    subtitle: 'Character · Lead',
    headerActions: close,
    hero: { kind: 'placeholder', text: 'No picture yet', label: 'Concept' },
    heroActions: <Button size="sm" variant="primary">Draw Mina</Button>,
    facts: [{ label: 'Status', value: 'Proposed' }, { label: 'Role', value: 'Lead' }],
  },
};

/** Concepts §5 in a narrow inspector: the running state in the hero, Cancel in place. */
export const Running: Story = {
  args: {
    title: 'Toby',
    subtitle: 'Character · Approved',
    headerActions: close,
    hero: {
      kind: 'running',
      content: (
        <RunProgressPanel
          title="Generating 3D mesh"
          description="Meshy is generating a stylized mesh from the approved concept."
          progress={68}
          elapsedMs={222_000}
          remainingMs={105_000}
          onCancel={() => {}}
        />
      ),
    },
    facts: [
      { label: 'Type', value: 'Character' },
      { label: 'Status', value: 'Mesh generation' },
      { label: 'Episodes', value: '1, 2, 4' },
      { label: 'Style', value: '2.5D stylized' },
      { label: 'Target polycount', value: '≤ 15,000 tris' },
      { label: 'Rig', value: 'Planned' },
      { label: 'Created', value: '11/8/2026' },
      { label: 'Updated', value: '11/8/2026' },
    ],
    disclosures: [
      { id: 'desc', title: 'Description', children: 'The lead.' },
      { id: 'request', title: 'Request details', children: 'Criteria, answers and constraints.' },
    ],
  },
};
