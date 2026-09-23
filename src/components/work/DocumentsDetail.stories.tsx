// The Documents four-pane DETAIL view (docs/design/documents-detail/PLAN.md in
// the host), composed only from library pieces, so each WS-A primitive can be
// checked against the mockup in place: ExplorerLayout `header` = ScopeHeader,
// a `lg` rail holding WorkListView, EditorShell with `crumbsTrailing`,
// `subtitle` and `metaBar` = WorkItemMetaBar, the Brief sections, the docked
// RichChatComposer (menu mode, /workflow chip), and RunDraftPanel beside it.
//
// Sample data follows the mockup EXCEPT where the plan forbids it: no "$95
// project allocation", no SMEs, no repo link, no "Sprint access"; the estimate
// says "Based on 2 runs" rather than a range beside "No prior runs"; the run
// budget is tokens with a derived dollar line.
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExplorerLayout } from '../layout/ExplorerLayout';
import { EditorShell } from '../doc-editor/EditorShell';
import { RichChatComposer } from '../social/RichChatComposer';
import type { ComposerCommand } from '../social/composerCommands';
import Chip from '../shared/Chip';
import { IconButton } from '../ui/IconButton';
import { BranchIcon } from '../ui/Icons';
import { Checkbox } from '../forms/Checkbox';
import { ScopeHeader } from './ScopeHeader';
import { WorkListView, type WorkListGroup, type WorkListItem } from './WorkListView';
import { WorkItemMetaBar, type WorkMetaOption, type WorkPerson } from './WorkItemMetaBar';
import { OutcomeSection } from './OutcomeSection';
import { ChecklistSection, type ChecklistItem } from './ChecklistSection';
import { LinkedItemsSection, type LinkedItem } from './LinkedItemsSection';
import { CommentList, type CommentListItem } from './CommentList';
import { RunDraftPanel } from './RunDraftPanel';

const meta: Meta = {
  title: 'Work/Documents detail view',
  parameters: { layout: 'fullscreen' },
};
export default meta;

const NOW = Date.parse('2026-09-23T12:00:00Z');
const DAY = 86_400_000;
const LAYLA: WorkPerson = { id: 'lh', name: 'Layla Hassan' };
const ELI: WorkPerson = { id: 'eg', name: 'Eli Garcia' };
const NORA: WorkPerson = { id: 'nd', name: 'Nora DaSilva' };

const GROUPS: WorkListGroup[] = [
  { id: 'next', title: 'Next up', emptyLabel: 'Nothing up next' },
  { id: 'progress', title: 'In progress', emptyLabel: 'Nothing in progress' },
  { id: 'review', title: 'In review', emptyLabel: 'Nothing waiting for review' },
  { id: 'done', title: 'Done', defaultOpen: false, emptyLabel: 'Nothing done yet' },
];

const ITEMS: WorkListItem[] = [
  { id: 'wi-obs-e1-s4', groupId: 'next', title: 'Decommission legacy StatsD bridge', points: 5, owner: LAYLA },
  { id: 'wi-obs-e2-s1', groupId: 'next', title: 'Set SLO alert thresholds', points: 5, owner: ELI },
  { id: 'wi-obs-e3-s2', groupId: 'next', title: 'Configure retention policies', points: 3, owner: LAYLA },
  { id: 'wi-obs-b1', groupId: 'next', title: 'Fix dropped span exports', owner: ELI, chips: [{ label: 'Bug', tone: 'danger' }] },
  { id: 'wi-obs-e1-s2', groupId: 'progress', title: 'Span-metrics connector', owner: LAYLA, signal: { state: 'running', label: 'Agent running', onClick: () => {} } },
  { id: 'wi-obs-e2-s3', groupId: 'progress', title: 'Tune tail sampling', owner: ELI, signal: { state: 'running', label: 'Agent running', onClick: () => {} } },
  { id: 'wi-obs-e3-s1', groupId: 'review', title: 'Cost-aware retention', owner: NORA, signal: { state: 'review', label: 'Awaiting review' } },
  { id: 'wi-obs-e1-s1', groupId: 'done', title: 'Collector fleet rollout', points: 8, owner: ELI, done: true },
  { id: 'wi-obs-e1-s3', groupId: 'done', title: 'Instrument checkout service', points: 5, owner: LAYLA, done: true },
  { id: 'wi-obs-e2-s2', groupId: 'done', title: 'Dashboard parity audit', points: 3, owner: NORA, done: true },
  { id: 'wi-obs-e4-s1', groupId: 'done', title: 'ADR: tail-sampling policy', points: 2, owner: NORA, done: true },
];

const STATUS: WorkMetaOption[] = [
  { value: 'open', label: 'Open', tone: 'info' },
  { value: 'in-progress', label: 'In progress', tone: 'accent' },
  { value: 'in-review', label: 'In review', tone: 'warning' },
  { value: 'done', label: 'Done', tone: 'success' },
];
const PRIORITY: WorkMetaOption[] = [
  { value: 'high', label: 'High', tone: 'danger' },
  { value: 'medium', label: 'Medium', tone: 'warning' },
  { value: 'low', label: 'Low', tone: 'neutral' },
];

const CRITERIA: ChecklistItem[] = [
  { id: 'c1', text: 'Route metrics through the collector', done: false },
  { id: 'c2', text: 'Verify dashboard and alert parity', done: false },
  { id: 'c3', text: 'Keep a rollback path during migration', done: false },
];
const LINKS: LinkedItem[] = [
  { id: 'd1', title: 'Collector fleet rollout', kind: 'page', status: { label: 'Completed', tone: 'success' }, onOpen: () => {} },
  { id: 'd2', title: 'ADR: tail-sampling policy', kind: 'page', status: { label: 'Approved', tone: 'success' }, onOpen: () => {} },
];
const NOTES: CommentListItem[] = [
  { id: 'n1', author: NORA, role: 'PM', createdAt: NOW - 2 * DAY, text: 'Start with low-risk services after the collector rollout.' },
  { id: 'n2', author: ELI, role: 'Architect', createdAt: NOW - DAY, text: 'Keep the bridge available until dashboard parity is verified.' },
];

const WORKFLOW: ComposerCommand[] = [
  {
    trigger: '/workflow',
    label: 'Choose a workflow',
    icon: <BranchIcon size={13} />,
    argument: { placeholder: 'which pipeline', search: () => [{ id: 'migration-plan', label: 'migration-plan', icon: '⟡' }] },
  },
];

const AGENTS = [{ value: 'implementation', label: 'Implementation agent' }, { value: 'review', label: 'Review agent' }];
const MODELS = [{ value: 'haiku', label: 'Haiku' }, { value: 'sonnet', label: 'Sonnet' }, { value: 'opus', label: 'Opus' }];

function Screen() {
  const [tab, setTab] = useState('work');
  const [detailTab, setDetailTab] = useState('brief');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('priority');
  const [items, setItems] = useState(ITEMS);
  const [current, setCurrent] = useState('wi-obs-e1-s4');
  const [meta, setMeta] = useState({ status: 'open' as string | null, points: 5 as number | null, owner: LAYLA as WorkPerson | null, priority: 'high' as string | null });
  const [outcome, setOutcome] = useState('Move service metrics to OpenTelemetry without losing dashboard or alert coverage.');
  const [criteria, setCriteria] = useState(CRITERIA);
  const [agent, setAgent] = useState('implementation');
  const [model, setModel] = useState('haiku');
  const [tokens, setTokens] = useState<number | null>(300_000);
  const [approve, setApprove] = useState(true);
  const [draft, setDraft] = useState({
    html: '<p>/workflow migration-plan <strong>Goal:</strong> Remove the legacy StatsD bridge. Migrate one service at a time; keep a tested rollback path.</p>',
    files: [] as File[],
    command: { trigger: '/workflow', argument: { id: 'migration-plan', label: 'migration-plan', icon: '⟡' } },
  });

  return (
    <div className="h-[936px] w-[1592px] bg-surface">
      <ExplorerLayout
        header={
          <ScopeHeader
            breadcrumbs={[{ label: 'Plan', onClick: () => {} }, { label: 'Initiatives', onClick: () => {} }, { label: 'Observability' }]}
            title="Observability Platform"
            status={{ label: 'In progress', tone: 'info' }}
            progress={{ done: 18, total: 52 }}
            spentUsd={1.46}
            people={[{ label: 'Owner', people: [NORA, LAYLA] }]}
            menu={[{ items: [{ label: 'Rename' }, { label: 'Share…' }, { label: 'Move to…' }] }]}
            tabs={[{ id: 'work', label: 'Work' }, { id: 'decisions', label: 'Decisions', count: 2 }, { id: 'agents', label: 'Agents', count: 2 }]}
            activeTab={tab}
            onTabChange={setTab}
          />
        }
        railWidth="lg"
        rail={
          <WorkListView
            groups={GROUPS}
            items={items}
            currentId={current}
            query={query}
            onQueryChange={setQuery}
            sort={sort}
            sortOptions={[{ value: 'priority', label: 'Priority ↓' }, { value: 'status', label: 'Status' }, { value: 'updated', label: 'Updated' }, { value: 'title', label: 'Title' }]}
            onSortChange={setSort}
            filters={<p className="m-0 text-[13px] text-text-secondary">Type, owner, priority</p>}
            onCreate={() => {}}
            onCollapse={() => {}}
            onOpenItem={(item) => setCurrent(item.id)}
            onToggleDone={(item, done) => setItems((xs) => xs.map((x) => (x.id === item.id ? { ...x, done, groupId: done ? 'done' : 'next' } : x)))}
            onReorder={() => {}}
          />
        }
        asidePlacement="beside"
        panePadding="none"
        aside={
          <div className="flex h-full w-[390px] flex-col overflow-y-auto border-l border-border bg-surface">
            <RunDraftPanel
              status="no-draft"
              target={{ mark: <BranchIcon size={22} />, title: 'Migration plan', subtitle: 'For this work item' }}
              fields={[
                { id: 'agent', label: 'Agent', value: agent, options: AGENTS, onChange: setAgent },
                { id: 'model', label: 'Model', value: model, options: MODELS, onChange: setModel },
              ]}
              cost={{ kind: 'range', low: 0.03, high: 0.3, unit: 'usd' }}
              duration={{ kind: 'range', low: 60_000, high: 360_000, unit: 'ms' }}
              confidence={{ sampleSize: 2 }}
              budget={{ tokens, onChange: setTokens, usdPerMillionTokens: 1, priceLabel: MODELS.find((m) => m.value === model)?.label }}
              advanced={
                <label className="flex items-center gap-2 text-[13px] text-text-secondary">
                  <Checkbox checked={approve} onChange={setApprove} />
                  Ask me to approve before edits land
                </label>
              }
              access={{ tone: 'warning', title: 'Edit access required', body: 'You can view this item but not dispatch work on it.', action: { label: 'Request access', onClick: () => {} } }}
              onSave={() => {}}
              onDispatch={() => {}}
              dispatchDisabledReason="Save the draft first"
            />
          </div>
        }
      >
        <EditorShell
          title="Decommission legacy StatsD bridge"
          breadcrumbs={[{ label: 'OpenTelemetry everywhere', onClick: () => {} }]}
          crumbsTrailing={
            <>
              <Chip size="xs" tone="info">Story</Chip>
              <span className="font-mono text-text-secondary">wi-obs-e1-s4</span>
            </>
          }
          subtitle="Service-by-service migration"
          headActions={<IconButton variant="ghost" aria-label="More actions" icon={<span aria-hidden="true">⋯</span>} />}
          metaBar={
            <WorkItemMetaBar
              status={{ value: meta.status, options: STATUS, onChange: (status) => setMeta({ ...meta, status }) }}
              points={{ value: meta.points, onChange: (points) => setMeta({ ...meta, points }) }}
              owner={{ value: meta.owner, onSearchPeople: (q) => [LAYLA, ELI, NORA].filter((p) => p.name.toLowerCase().includes(q.toLowerCase())), onChange: (owner) => setMeta({ ...meta, owner }) }}
              priority={{ value: meta.priority, options: PRIORITY, onChange: (priority) => setMeta({ ...meta, priority }) }}
            />
          }
          tabs={[{ id: 'brief', label: 'Brief' }, { id: 'comments', label: 'Discussion', count: 3 }, { id: 'history', label: 'Activity' }]}
          activeTab={detailTab}
          onTabChange={setDetailTab}
          surface="plain"
          footer={
            <div className="px-4 pb-3">
              <RichChatComposer
                onSend={() => {}}
                mode="agent"
                onModeChange={() => {}}
                modeControl="menu"
                modeShortcuts
                layout="wide"
                toolbar="compact"
                commands={WORKFLOW}
                references={[{ id: 'this', label: 'This work item' }]}
                onRemoveReference={() => {}}
                submitLabel={{ agent: 'Prepare run' }}
                draft={draft}
                onDraftChange={(d) => setDraft(d as typeof draft)}
              />
            </div>
          }
        >
          <div className="flex flex-col gap-1 px-4 py-2">
            <OutcomeSection first value={outcome} onChange={setOutcome} />
            <ChecklistSection
              title="Acceptance criteria"
              items={criteria}
              onToggle={(id, done) => setCriteria((xs) => xs.map((x) => (x.id === id ? { ...x, done } : x)))}
            />
            <LinkedItemsSection title="Dependencies & decisions" items={LINKS} />
            <CommentList title="Planning notes" comments={NOTES} now={NOW} total={3} onViewAll={() => setDetailTab('comments')} />
          </div>
        </EditorShell>
      </ExplorerLayout>
    </div>
  );
}

export const Light: StoryObj = { render: () => <Screen /> };
export const Dark: StoryObj = { render: () => <div data-theme="dark" className="bg-surface"><Screen /></div> };
