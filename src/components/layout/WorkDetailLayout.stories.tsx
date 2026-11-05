import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ExplorerLayout } from './ExplorerLayout';
import { SidePane, SidePaneProvider, SidePaneSplit, useSidePaneHost } from './SidePane';
import { WorkListView } from '../work/WorkListView';
import { Button } from '../ui/Button';
import { Select } from '../forms/Select';
import { Tabs } from '../shared/Tabs';
import { KeyValue } from '../shared/KeyValue';
import { DataTable } from '../shared/DataTable';
import { RailLayout, RailSection } from '../shared/RailLayout';
import { ReviewThread } from '../shared/ReviewThread';
import { SignoffPanel } from '../shared/SignoffPanel';

// A composition story, not a component's: ExplorerLayout (resizable work
// rail) + SidePane (document presentation). There is no WorkDetailLayout
// component; the title is kept because tests/storybook/work-layout.spec.ts
// addresses these stories by id. A DetailPage template is the eventual home.
const meta: Meta<typeof ExplorerLayout> = { title: 'Layout/WorkDetailLayout', component: ExplorerLayout, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;
const items = [
  { id: 'alerts', groupId: 'next', title: 'Stop duplicate alerts during a dependency outage', kindLabel: 'Bug', owner: { id: 'eli', name: 'Eli Garcia' }, points: 2, signal: { state: 'blocked' as const, label: 'Blocked' }, tag: { label: 'ORG-OBS-11' } },
  { id: 'statsd', groupId: 'next', title: 'Decommission the legacy StatsD metrics bridge', kindLabel: 'Story', owner: { id: 'layla', name: 'Layla Hassan' }, points: 5, tag: { label: 'ORG-OBS-5' } },
  { id: 'review', groupId: 'review', title: 'Multi-window burn-rate alerts for platform services', signal: { state: 'review' as const, label: 'Awaiting review' }, tag: { label: 'ORG-OBS-9' } },
];
function WorkFrame() {
  const host = useSidePaneHost();
  const [folded, setFolded] = useState(false);
  const [current, setCurrent] = useState('alerts');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('priority');
  return <>
    <ExplorerLayout railTitle="Work" railCount={items.length} railHeading="caption" railLabel="work items"
      railResize={{ minPx: 260, maxPx: 560, storageKey: 'storybook.work-rail.width' }}
      railCollapsed={folded} onToggleRail={() => setFolded(!folded)}
      railHeader={<div className="flex flex-col gap-2"><Select aria-label="Initiative" value="obs" options={[{ value: 'obs', label: 'Observability Platform' }]} onChange={() => {}} />
        <Tabs aria-label="Work views" variant="underline" size="sm" value="work" items={[{ id: 'work', label: 'Work' }, { id: 'decisions', label: 'Decisions' }]} onValueChange={() => {}} /></div>}
      rail={<WorkListView layout="rail" chrome="embedded" metaStyle="text" sortStyle="menu"
        groups={[{ id: 'next', title: 'Next up' }, { id: 'review', title: 'In review' }]} items={items} currentId={current}
        query={query} onQueryChange={setQuery} sort={sort} onSortChange={setSort} sortOptions={[{ value: 'priority', label: 'Priority' }, { value: 'title', label: 'Title' }]}
        onOpenItem={item => setCurrent(item.id)} />}
      panePadding="none">
      <div className="min-w-0 p-6">
        <h1 className="text-xl font-semibold">{items.find(item => item.id === current)?.title}</h1>
        <p className="my-4 text-sm text-text-secondary">Group related dependency alerts so the team can respond to one incident.</p>
        <Button variant={host.shown ? 'secondary' : 'ghost'} aria-expanded={host.shown} onClick={() => host.shown ? host.collapse() : host.reveal()}>Brief preview</Button>
      </div>
    </ExplorerLayout>
    <SidePane title="Brief preview" subtitle="ORG-OBS-11 · Dependency outage alerts" presentation="document"
      paneId="storybook-brief" widthPx={{ min: 960, max: 1280 }} closeLabel="Close brief preview">
      <div className="min-h-0 flex-1 overflow-y-auto p-6" data-testid="story-brief">
        <h2 className="text-sm font-semibold">Context for this work</h2>
        <KeyValue divided responsive labelWidth="w-52" items={[{ label: 'Acceptance criteria', value: 'Not defined yet', action: <Button variant="link">Draft with agent</Button> }]} />
        <p className="mt-3 text-sm">Confirm the dependency map, group duplicate alerts and preserve the affected services on the incident.</p>
        <DataTable rowHeight="content" data={[{ section: 'Dependencies', text: 'Confirm the dependency map and group related alerts so the response includes every affected service. '.repeat(4) }]} columns={[{ key: 'section', header: 'Section' }, { key: 'text', header: 'Content', className: 'whitespace-normal' }]} keyField={row => row.section} />
        {Array.from({ length: 18 }, (_, index) => <p key={index} className="mt-4 text-sm text-text-secondary">Acceptance criterion {index + 1}: verify the behaviour against the dependency outage example, including recovery.</p>)}
      </div>
    </SidePane>
  </>;
}
export const ResizableWorkAndBrief: Story = { render: () => <div className="h-screen bg-workspace"><SidePaneProvider defaultOpen={false} storageKey="storybook.work-layout">
  <SidePaneSplit><WorkFrame /></SidePaneSplit>
</SidePaneProvider></div> };

export const PlainDesignReview: Story = { render: () => <div className="p-6 bg-surface">
  <h1 className="mb-4 text-xl font-semibold">Session token rotation on tenant switch</h1>
  <RailLayout variant="plain" rail={<><RailSection title="Initiative">Auth Migration</RailSection><RailSection title="People">Vera Green · Owner</RailSection></>}>
    <ReviewThread variant="inline" posts={[
      { id: 'problem', authorKind: 'human', authorName: 'Vera Green', kind: 'problem', body: 'Shrink the stale-cookie replay window after a tenant or role switch.', timeLabel: '4d ago' },
      { id: 'question', authorKind: 'agent', authorName: 'Design agent', kind: 'question', body: 'Should the target replay window be 60 seconds or 120 seconds?', timeLabel: 'Today' },
    ]} />
    <SignoffPanel variant="inline" signoffs={[]} />
  </RailLayout>
</div> };
