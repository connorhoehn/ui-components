import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SectionLayout } from './SectionLayout';
import { PageFrame } from './PageFrame';
import { GroupedList } from './GroupedList';
import { KeyValue } from './KeyValue';
import { useRailFold } from './railFold';
import { Select } from '../forms/Select';
import { PageSection } from '../ui/PageSection';
import { ColumnDock } from '../layout/DockedColumn';

const meta: Meta<typeof SectionLayout> = {
  title: 'Templates/SectionLayout',
  component: SectionLayout,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="h-[600px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SectionLayout>;

const SECTION = [
  { label: 'Summary', path: '#summary', group: 'Overview' },
  { label: 'Invocations', path: '#invocations', group: 'Overview' },
  { label: 'Traces', path: '#traces', group: 'Debug' },
  { label: 'Alerts', path: '#alerts', group: 'Debug' },
];
const TRAIL = [{ label: 'Observability', href: '#' }, { label: 'Invocations' }];
const ROWS = Array.from({ length: 16 }, (_, i) => ({ id: `inv-${i}`, groupId: i % 3 ? 'ok' : 'failed', title: `Invocation ${7000 + i}`, subline: 'support-agent' }));
const composer = <ColumnDock><div className="border-t border-border px-[var(--ui-page-gutter,1.5rem)] py-3 text-sm text-text-secondary">Command composer (docked at the column bottom)</div></ColumnDock>;

/** Section rail + content column: the trail row (with a scope selector on its right), the title band, a body whose composer docks at the bottom. */
export const SectionPage: Story = {
  render: () => {
    const rail = useRailFold({ storageKey: 'story.section-layout' });
    const [scope, setScope] = useState('prod');
    return (
      <SectionLayout title="Observability" items={SECTION} fill="parent" railFold={{ folded: rail.folded, onToggle: rail.toggle }}
        header={{
          breadcrumbs: TRAIL, title: 'Invocations',
          trailControls: <Select aria-label="Environment" size="sm" value={scope} onChange={(e) => setScope(e.target.value)}
            options={[{ value: 'prod', label: 'Production' }, { value: 'stage', label: 'Staging' }]} />,
        }}>
        <PageSection title="Recent">{ROWS.length} invocations in {scope}.</PageSection>
        {composer}
      </SectionLayout>
    );
  },
};

/** Section rail + the page's list as a second rail (foldable) + the record column. */
export const WithListRail: Story = {
  render: () => {
    const listFold = useRailFold({ storageKey: 'story.section-layout.list' });
    const [id, setId] = useState<string | null>('inv-1');
    const current = ROWS.find((r) => r.id === id);
    return (
      <SectionLayout title="Observability" items={SECTION} fill="parent"
        list={{ label: 'invocations', title: 'Invocations', count: ROWS.length,
          body: <GroupedList groups={[{ id: 'failed', title: 'Failed' }, { id: 'ok', title: 'Succeeded' }]} rows={ROWS} currentId={id} onOpenRow={(r) => setId(r.id)} /> }}
        listFold={{ folded: listFold.folded, onToggle: listFold.toggle }}
        header={{ breadcrumbs: [...TRAIL.slice(0, 1), { label: 'Invocations', href: '#' }, { label: current?.title ?? 'Record' }], title: 'Invocations' }}>
        {current && <KeyValue items={[{ label: 'Record', value: current.title }, { label: 'Agent', value: current.subline }]} />}
        {composer}
      </SectionLayout>
    );
  },
};

/** No `header`: the child page template draws its own trail, title and body. */
export const TemplateChild: Story = {
  render: () => (
    <SectionLayout title="Access" items={[{ label: 'Roles', path: '#roles' }, { label: 'Policies', path: '#policies' }]} fill="parent">
      <PageFrame title="New role" breadcrumbs={[{ label: 'Access', href: '#' }, { label: 'New role' }]}>
        <PageSection title="Permissions">Pick what the role may do.</PageSection>
      </PageFrame>
    </SectionLayout>
  ),
};
