// Page templates — one recipe per page shape.
//
// Every page an app ships is one of six shapes: a collection, a list beside a
// record, one record, an overview, settings, or "anything else" (a form). Each
// shape is one library template that owns the header, the gutter, the fill
// rule and the one scrolling region, so a page supplies content and state and
// nothing else. Each recipe below is the whole page: copy the code block.

import { useState } from 'react';
import {
  Button,
  CodeBlock,
  CollectionPage,
  DashboardPage,
  DetailPage,
  FormField,
  GroupedList,
  Input,
  KeyValue,
  MasterDetailPage,
  MetaLine,
  PageFrame,
  SectionLayout,
  SettingsPage,
  StatusPill,
  Tabs,
  Textarea,
} from '../../../../src/components/shared';
import { ColumnDock } from '../../../../src/components/layout';
import { Select } from '../../../../src/components/forms';
import { PageSection } from '../../../../src/components/ui/PageSection';
import { DemoIntro } from './chrome';

type Verdict = 'regressed' | 'improved' | 'unchanged';
interface Row { id: string; name: string; model: string; verdict: Verdict }
const ROWS: Row[] = Array.from({ length: 30 }, (_, i) => ({
  id: `run-${4200 + i}`,
  name: `Eval run ${4200 + i}`,
  model: ['supervisor', 'search', 'scoring', 'advisor'][i % 4]!,
  verdict: i % 5 === 0 ? 'regressed' : i % 3 === 0 ? 'improved' : 'unchanged',
}));

const VERDICT_STATE = { regressed: 'error', improved: 'success', unchanged: 'neutral' } as const;
const COLUMNS = [
  { key: 'name', header: 'Run', sortable: true },
  { key: 'model', header: 'Model' },
  { key: 'verdict', header: 'Verdict', render: (r: Row) => <StatusPill state={VERDICT_STATE[r.verdict]} label={r.verdict} /> },
];

function CollectionRecipe() {
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<Row | null>(null);
  const rows = ROWS.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <CollectionPage
      gutter="page"
      title="Eval runs"
      breadcrumbs={[{ label: 'Evals', href: '#' }, { label: 'Runs' }]}
      headerActions={<Button size="sm">New run</Button>}
      toolbar={{ label: 'Run filters', search: { value: q, onChange: setQ, placeholder: 'Search runs' }, summary: `${rows.length} runs` }}
      table={{ data: rows, columns: COLUMNS, keyField: (r) => r.id, onRowClick: setSelected }}
      empty={{ title: 'No runs match', description: 'Clear the search to see every run.' }}
      detail={selected
        ? { title: selected.name, subtitle: selected.model, onClose: () => setSelected(null), content: <KeyValue items={[{ label: 'Model', value: selected.model }, { label: 'Verdict', value: selected.verdict }]} /> }
        : null}
    />
  );
}

const COLLECTION_CODE = `const [q, setQ] = useState('');
const [selected, setSelected] = useState<Run | null>(null);
<CollectionPage
  gutter="page" title="Eval runs" breadcrumbs={trail}
  headerActions={<Button size="sm">New run</Button>}
  toolbar={{ label: 'Run filters', search: { value: q, onChange: setQ }, summary: \`\${rows.length} runs\` }}
  table={{ data: rows, columns, keyField: (r) => r.id, onRowClick: setSelected }}
  loading={isLoading} error={error?.message} onRetry={refetch}
  empty={{ title: 'No runs match' }}
  detail={selected ? { title: selected.name, onClose: () => setSelected(null), content: <RunSummary run={selected} /> } : null}
/>`;

function MasterDetailRecipe() {
  const [id, setId] = useState<string | null>(null);
  const current = ROWS.find((r) => r.id === id) ?? null;
  return (
    <MasterDetailPage
      title={current?.name ?? 'Eval runs'}
      breadcrumbs={[{ label: 'Evals', href: '#' }, { label: current?.name ?? 'Runs' }]}
      {...(current ? { actions: <Button size="sm">Re-run</Button> } : {})}
      list={{
        label: 'runs', title: 'Runs', count: ROWS.length,
        body: <GroupedList groups={[{ id: 'regressed', title: 'Regressed' }, { id: 'improved', title: 'Improved' }, { id: 'unchanged', title: 'Unchanged' }]}
          rows={ROWS.map((r) => ({ id: r.id, groupId: r.verdict, title: r.name, subline: r.model }))} currentId={id} onOpenRow={(row) => setId(row.id)} />,
      }}
    >
      {current && <KeyValue items={[{ label: 'Model', value: current.model }, { label: 'Verdict', value: current.verdict }]} />}
    </MasterDetailPage>
  );
}

const MASTER_DETAIL_CODE = `<MasterDetailPage
  title={current?.name ?? 'Eval runs'} breadcrumbs={trail}
  list={{ label: 'runs', title: 'Runs', count: runs.length,
    body: <GroupedList groups={groups} rows={rows} currentId={id} onOpenRow={(r) => setId(r.id)} /> }}
  emptyDetail={<EmptyState title="Pick a run" />}
>
  {current && <RunRecord run={current} />}
</MasterDetailPage>`;

const TRACE = Array.from({ length: 60 }, (_, i) => `12:00:${String(i).padStart(2, '0')}  span ${i}  ok`).join('\n');

function DetailRecipe() {
  return (
    <DetailPage
      title="Invocation 7f3a"
      badge={<StatusPill state="success" label="Succeeded" />}
      meta={<MetaLine items={['support-agent', '2.4s', 'Nov 4, 12:00']} />}
      breadcrumbs={[{ label: 'Observability', href: '#' }, { label: 'Invocations', href: '#' }, { label: '7f3a' }]}
      actions={<><Button size="sm" variant="secondary">Share</Button><Button size="sm">Re-run</Button></>}
      tabs={[
        { id: 'summary', label: 'Summary', content: <KeyValue items={[{ label: 'Agent', value: 'support-agent' }, { label: 'Latency', value: '2.4s' }, { label: 'Tokens', value: '1,204' }]} /> },
        { id: 'trace', label: 'Trace', badge: 60, content: <CodeBlock code={TRACE} language="text" /> },
        { id: 'cost', label: 'Cost', content: <KeyValue items={[{ label: 'Input', value: '$0.002' }, { label: 'Output', value: '$0.004' }]} /> },
      ]}
    />
  );
}

const DETAIL_CODE = `<DetailPage
  title={run.name} badge={<StatusPill state="success" label="Succeeded" />}
  meta={<MetaLine items={[run.agent, run.latency, run.startedAt]} />}
  breadcrumbs={trail} actions={<Button size="sm">Re-run</Button>}
  tabs={[
    { id: 'summary', label: 'Summary', content: <RunSummary run={run} /> },
    { id: 'trace', label: 'Trace', badge: run.spans.length, content: <TraceView spans={run.spans} /> },
  ]}
  aside={<ContextColumn state={col} onStateChange={setCol} panels={panels} onActivate={setPanel} />}
/>`;

const metricList = (n: number) => <KeyValue items={Array.from({ length: n }, (_, i) => ({ label: `Metric ${i + 1}`, value: `${(i * 7) % 100}%` }))} />;

function DashboardRecipe() {
  return (
    <DashboardPage
      title="Observability"
      breadcrumbs={[{ label: 'Observability', href: '#' }, { label: 'Overview' }]}
      stats={[
        { label: 'Invocations', value: '12.4k', hint: 'last 24h' },
        { label: 'Error rate', value: '0.8%', tone: 'danger' },
        { label: 'p95 latency', value: '2.1s' },
        { label: 'Spend', value: '$41', tone: 'accent' },
      ]}
      panels={[
        { id: 'latency', title: 'Latency', span: 2, content: metricList(6) },
        { id: 'errors', title: 'Errors', content: metricList(12) },
        { id: 'agents', title: 'Agents', content: metricList(5) },
        { id: 'tools', title: 'Tools', content: metricList(5) },
        { id: 'cost', title: 'Cost', content: metricList(5) },
      ]}
    />
  );
}

const DASHBOARD_CODE = `<DashboardPage
  title="Observability" breadcrumbs={trail}
  stats={[{ label: 'Invocations', value: '12.4k' }, { label: 'Error rate', value: '0.8%', tone: 'danger' }]}
  panels={[
    { id: 'latency', title: 'Latency', span: 2, content: <LatencyChart /> },
    { id: 'errors', title: 'Errors', content: <ErrorList /> },
  ]}
/>`;

function SettingsRecipe() {
  const [name, setName] = useState('Acme');
  return (
    <SettingsPage
      title="Workspace" subtitle="Acme · admin"
      breadcrumbs={[{ label: 'Admin', href: '#' }, { label: 'Workspace' }]}
      dirty={name !== 'Acme'} onSave={() => {}} onCancel={() => setName('Acme')}
      sections={[
        { id: 'general', label: 'General', content: <FormField label="Workspace name">{({ id }) => <Input id={id} value={name} onChange={(e) => setName(e.target.value)} />}</FormField> },
        { id: 'members', label: 'Members', description: '12 people', content: <KeyValue items={[{ label: 'Admins', value: '2' }, { label: 'Members', value: '10' }]} /> },
      ]}
    />
  );
}

const SETTINGS_CODE = `<SettingsPage
  title="Workspace" breadcrumbs={trail}
  dirty={dirty} onSave={save} onCancel={reset}
  sections={[
    { id: 'general', label: 'General', content: <GeneralForm /> },
    { id: 'members', label: 'Members', content: <MembersForm /> },
  ]}
/>`;

function FrameRecipe() {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  return (
    <PageFrame
      title="New connector"
      breadcrumbs={[{ label: 'Connectors', href: '#' }, { label: 'New connector' }]}
      actions={<><Button size="sm" variant="secondary">Cancel</Button><Button size="sm">Create</Button></>}
    >
      <FormField label="Name">{({ id }) => <Input id={id} value={name} onChange={(e) => setName(e.target.value)} />}</FormField>
      <FormField label="Notes">{({ id }) => <Textarea id={id} value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />}</FormField>
    </PageFrame>
  );
}

const FRAME_CODE = `<PageFrame title="New connector" breadcrumbs={trail}
  actions={<Button size="sm">Create</Button>}>
  <FormField label="Name">{({ id }) => <Input id={id} value={name} onChange={(e) => setName(e.target.value)} />}</FormField>
</PageFrame>`;

const SECTION_ITEMS = [
  { label: 'Summary', path: '#summary', group: 'Overview' },
  { label: 'Runs', path: '#runs', group: 'Overview' },
  { label: 'Traces', path: '#traces', group: 'Debug' },
];

function SectionRecipe() {
  const [id, setId] = useState<string | null>(ROWS[0]!.id);
  const [railFolded, setRailFolded] = useState(false);
  const [listFolded, setListFolded] = useState(false);
  const [env, setEnv] = useState('prod');
  const current = ROWS.find((r) => r.id === id) ?? null;
  return (
    <SectionLayout
      title="Evals" items={SECTION_ITEMS} fill="parent"
      railFold={{ folded: railFolded, onToggle: () => setRailFolded((f) => !f) }}
      list={{
        label: 'runs', title: 'Runs', count: ROWS.length,
        body: <GroupedList groups={[{ id: 'regressed', title: 'Regressed' }, { id: 'improved', title: 'Improved' }, { id: 'unchanged', title: 'Unchanged' }]}
          rows={ROWS.map((r) => ({ id: r.id, groupId: r.verdict, title: r.name, subline: r.model }))} currentId={id} onOpenRow={(row) => setId(row.id)} />,
      }}
      listFold={{ folded: listFolded, onToggle: () => setListFolded((f) => !f) }}
      header={{
        breadcrumbs: [{ label: 'Evals', href: '#' }, { label: 'Runs', href: '#' }, { label: current?.name ?? 'Runs' }],
        title: 'Runs',
        trailControls: <Select aria-label="Environment" size="sm" value={env} onChange={(e) => setEnv(e.target.value)}
          options={[{ value: 'prod', label: 'Production' }, { value: 'stage', label: 'Staging' }]} />,
      }}
    >
      {current && <KeyValue items={[{ label: 'Model', value: current.model }, { label: 'Verdict', value: current.verdict }, { label: 'Environment', value: env }]} />}
      <ColumnDock>
        <PageSection title="Command" className="border-t border-border px-[var(--ui-page-gutter,1.5rem)] py-3">Docked at the column's bottom.</PageSection>
      </ColumnDock>
    </SectionLayout>
  );
}

const SECTION_CODE = `const rail = useRailFold({ storageKey: 'evals.section-rail' });
const listRail = useRailFold({ storageKey: 'evals.list-rail' });
<SectionLayout
  title="Evals" items={sectionItems} renderNavItem={navLink}
  railFold={{ folded: rail.folded, onToggle: rail.toggle }}
  list={{ label: 'runs', title: 'Runs', count: runs.length, body: <GroupedList … /> }}
  listFold={{ folded: listRail.folded, onToggle: listRail.toggle }}
  header={{ breadcrumbs: trail, title: 'Runs', trailControls: <Select … /> }}
  footer={<CollectionCommandHost inPlace … />}
>
  {current && <RunRecord run={current} />}
</SectionLayout>`;

const RECIPES = [
  { id: 'collection', label: 'CollectionPage', when: 'The page is a list of records.', Recipe: CollectionRecipe, code: COLLECTION_CODE },
  { id: 'master-detail', label: 'MasterDetailPage', when: 'A list you pick from, the picked record beside it.', Recipe: MasterDetailRecipe, code: MASTER_DETAIL_CODE },
  { id: 'detail', label: 'DetailPage', when: 'One record, its sections as tabs.', Recipe: DetailRecipe, code: DETAIL_CODE },
  { id: 'dashboard', label: 'DashboardPage', when: 'An overview that fits one screen.', Recipe: DashboardRecipe, code: DASHBOARD_CODE },
  { id: 'settings', label: 'SettingsPage', when: 'Settings in sections with a save bar.', Recipe: SettingsRecipe, code: SETTINGS_CODE },
  { id: 'page-frame', label: 'PageFrame', when: 'A form, or anything the others do not fit.', Recipe: FrameRecipe, code: FRAME_CODE },
  { id: 'section-layout', label: 'SectionLayout', when: 'Pages inside a sectioned area: section rail, optional list rail, a column whose composer docks at the bottom.', Recipe: SectionRecipe, code: SECTION_CODE },
] as const;

export default function PageTemplatesDemo() {
  const [active, setActive] = useState<string>('collection');
  const recipe = RECIPES.find((r) => r.id === active) ?? RECIPES[0];
  const { Recipe } = recipe;
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-4">
      <DemoIntro title="Page templates">
        Six page shapes, six templates from `/shared`, plus SectionLayout, the frame around the pages of a sectioned area. Each fills its parent, draws the header at the page
        gutter and scrolls exactly one region, so the page itself never scrolls. Pick a shape; the frame
        below is the whole page and the code under it is the recipe.
      </DemoIntro>
      <Tabs items={RECIPES.map((r) => ({ id: r.id, label: r.label }))} value={active} onValueChange={setActive} aria-label="Page templates" />
      <p className="m-0 text-sm text-text-secondary" data-testid="page-template-when">Use {recipe.label} when: {recipe.when}</p>
      <div className="flex h-[640px] flex-col overflow-hidden rounded-lg border border-border bg-surface" data-testid="page-template-frame">
        <Recipe key={recipe.id} />
      </div>
      <CodeBlock code={recipe.code} language="tsx" copyButton />
    </div>
  );
}
