import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { ExplorerLayout } from './ExplorerLayout';
import { GroupedList } from '../shared/GroupedList';
import { SearchInput } from '../shared/SearchInput';
import { DetailSection } from '../shared/DetailSection';
import { StatusPill } from '../shared/StatusPill';
import Banner from '../shared/Banner';
import { RailSectionHeader } from '../social/RailSectionHeader';
import { ScopeHeader } from '../work/ScopeHeader';
import { SourceList } from '../work/SourceCard';
import { ProcedureSteps } from '../work/ProcedureSteps';
import { EditorShell } from '../doc-editor/EditorShell';
import { Select } from '../forms/Select';
import { Button } from '../ui/Button';
import { ArrowRightIcon, ChevronIcon, LinkIcon, MoreIcon } from '../ui/Icons';
import { Disclosure } from '../ui/Disclosure';
import { NavRail, type NavRailItem } from '../shared/NavRail';
import { SubNavLayout, activeNavItemClassName, inactiveNavItemClassName, type SubNavItem } from '../shared/SubNavLayout';
import { Tabs } from '../shared/Tabs';
import { SegmentedControl } from '../shared/SegmentedControl';
import { DropdownMenu } from '../shared/DropdownMenu';
import { StatStrip } from '../shared/StatStrip';
import { KeyValue } from '../shared/KeyValue';
import { MetaLine } from '../shared/MetaLine';
import EmptyState from '../shared/EmptyState';
import { ActionRowList, ActionRowPerson } from '../work/ActionRowList';
import { RailNavList } from '../shared/RailNavList';
import { PageSection } from '../ui/PageSection';
import Chip from '../shared/Chip';
import { WorkListView, type WorkListItem } from '../work/WorkListView';
import { WorkItemMetaBar } from '../work/WorkItemMetaBar';
import { OutcomeSection } from '../work/OutcomeSection';
import { RichChatComposer, type RichChatDraft } from '../social/RichChatComposer';
import type { ComposerCommand } from '../social/composerCommands';
import { ContextColumn, type ContextColumnState } from './ContextColumn';

const meta: Meta<typeof ExplorerLayout> = {
  title: 'Layout/ExplorerLayout',
  component: ExplorerLayout,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof ExplorerLayout>;

/**
 * 2.389.0 — the Distillation guide record, composed only from library parts:
 * `paneHeader` + `ScopeHeader variant="crumbs"`, `RailSectionHeader count`,
 * `GroupedList groupHeading="label" currentStyle="bar"`, `EditorShell
 * titleSize="lg" tabsTrailing`, `Banner layout="callout"` and `SourceList
 * layout="row"`.
 */
function GuideRecordFrame({ sourcesOpen = false }: { sourcesOpen?: boolean }) {
    const [q, setQ] = useState('');
    const [tab, setTab] = useState('content');
    const [col, setCol] = useState<ContextColumnState>('open');
    return (
      <div className="h-[880px] w-[1320px] bg-surface">
        <ExplorerLayout
          {...(sourcesOpen
            ? {
                asidePlacement: 'beside' as const,
                aside: (
                  <ContextColumn
                    state={col}
                    onStateChange={setCol}
                    activeId="sources"
                    onActivate={() => setCol('open')}
                    label="Sources"
                    panels={[{
                      id: 'sources',
                      label: 'Sources',
                      icon: <LinkIcon size={16} />,
                      badge: 4,
                      content: (
                        <div className="p-3">
                          <SourceList layout="row" aria-label="Sources" onOpen={() => {}} items={[
                            { id: 'cl-010', title: 'Retire the SAML shim tenant by tenant', meta: 'Source pattern · auth-service' },
                            { id: 'run-1', title: 'Run 1 — stopped at step 3', meta: 'Run · 20h' },
                          ]} />
                        </div>
                      ),
                    }]}
                  />
                ),
              }
            : {})}
          railTitle="Knowledge"
          railHeading="prominent"
          railWidth="ml"
          panePadding="none"
          railHeader={
            <div className="flex flex-col gap-2 pb-2">
              <RailSectionHeader label="Guides & findings" count={11} presentational={false} />
              <div className="px-2">
                <SearchInput value={q} onChange={setQ} placeholder="Search guides & findings" />
              </div>
            </div>
          }
          rail={
            <GroupedList
              groupHeading="label"
              currentStyle="bar"
              currentId="saml"
              onOpenRow={() => {}}
              groups={[{ id: 'recent', title: 'Recently updated', count: 4 }, { id: 'week', title: 'Earlier this week', count: 2 }]}
              rows={[
                { id: 'idle', groupId: 'recent', title: 'Propose an idle-capacity teardown', subline: 'Procedure · Published · 16h' },
                { id: 'sso', groupId: 'recent', title: 'Bring SSO up on a new origin', subline: 'Procedure · Published · 18h' },
                { id: 'ci', groupId: 'recent', title: 'Rerun-and-diff triage for a flaky CI test', subline: 'Runbook · Published · 19h' },
                { id: 'saml', groupId: 'recent', title: 'Cut one tenant over from SAML to Cognito', subline: 'Procedure · Draft · 20h' },
                { id: 'fargate', groupId: 'week', title: 'Collector-fleet Fargate tasks are AWS-managed', subline: 'Insight · Published · 1d' },
                { id: 'aurora', groupId: 'week', title: 'Recover a cold Aurora Data API with retries', subline: 'Runbook · Published · 2d' },
              ]}
            />
          }
          paneHeader={
            <ScopeHeader
              variant="crumbs"
              breadcrumbs={[{ label: 'Build', href: '#' }, { label: 'Distillation', href: '#' }, { label: 'Knowledge' }]}
              controls={<Select size="md" aria-label="Repository" defaultValue="all" options={[{ value: 'all', label: 'All repositories' }]} />}
              link={{ label: 'Open Library ↗', href: '#library' }}
            />
          }
        >
          <EditorShell
            title="Cut one tenant over from SAML to Cognito"
            titleSize="lg"
            statusPill={<StatusPill state="neutral" label="Draft" size="sm" />}
            subtitle="Updated 20h ago"
            tabs={[{ id: 'content', label: 'Content' }, { id: 'history', label: 'History' }, { id: 'runs', label: 'Runs', count: 2 }]}
            activeTab={tab}
            onTabChange={setTab}
            tabsTrailing={<Button size="sm" variant="secondary">Sources 4</Button>}
            surface="plain"
          >
            <div className="flex flex-col px-5 py-4">
              <DetailSection first title="When this helps">
                <p className="m-0 text-sm text-text-primary">Planning to move a customer&apos;s sign-in to Cognito? Use this guide to plan a gradual switch, keep people signed in, and preserve a way to roll back.</p>
              </DetailSection>
              <DetailSection title="Use it in your work">
                <div className="flex gap-3">
                  <Button variant="primary">Draft a plan for my project</Button>
                  <Button variant="secondary">Explain this guide</Button>
                </div>
              </DetailSection>
              <Banner
                variant="warning"
                layout="callout"
                icon
                title="Check the redirect before you use this"
                action={<Button variant="link" size="sm" className="inline-flex items-center gap-1">View run <ArrowRightIcon size={14} /></Button>}
                className="my-3"
              >
                The last attempt stopped at step 3 because sign-in still pointed to the old service.
              </Banner>
              <DetailSection first title="The approach" hint="4 steps">
                <ProcedureSteps
                  steps={[
                    { id: 's1', title: 'Keep the existing sign-in available as a fallback.' },
                    { id: 's2', title: 'Check that active sessions stay signed in.' },
                    { id: 's3', title: 'Switch one customer and verify sign-in.' },
                    { id: 's4', title: 'Restore the previous sign-in if the checks fail.' },
                  ]}
                />
              </DetailSection>
              <DetailSection title="Based on">
                <SourceList layout="row" aria-label="Based on" onOpen={() => {}} items={[{ id: 'cl-010', title: 'Retire the SAML shim tenant by tenant', meta: 'Source pattern · auth-service' }]} />
              </DetailSection>
            </div>
          </EditorShell>
        </ExplorerLayout>
      </div>
    );
}

export const GuideRecord: Story = {
  render: () => <GuideRecordFrame />,
};

/**
 * 2.389.4 — the same record with the Sources aside open. `paneHeader` spans
 * the pane only, so the aside's tab row keeps the top of its own column and
 * the crumb band's hung controls (All repositories · Open Library) stay over
 * the record head, clear of the aside.
 */
export const GuideRecordSourcesOpen: Story = {
  render: () => <GuideRecordFrame sourcesOpen />,
};

// ---------------------------------------------------------------------------
// 2.390.0 — the Initiatives redesign's three variants, each composed only from
// library parts. Viewed at 1642×958 against docs/design/initiative-*-mockup.png
// in the agentcore repo, less the portal's own 60px top bar (the frame is 898px
// tall): the org rail (NavRail md), the explorer column (WorkspaceRail through
// ExplorerLayout: railBack, railCountStyle, GroupedList groupCountStyle,
// WorkListView toolbarLayout/sortStyle/metaStyle), the pane (ScopeHeader
// titleSize/description/peopleStyle/linkStyle/statsPlacement, StatStrip
// inline + progress, DetailSection size="lg", Banner accent/meta/size,
// ActionRowList, EditorShell work-item, WorkItemMetaBar layout="divided",
// KeyValue divided, Disclosure hint/size, EmptyState align/lg/details) and the
// docked composer in `paneFooter` (RichChatComposer toolbar="basic",
// referencesPlacement="start", ComposerReference marker="dot").
// ---------------------------------------------------------------------------

const ORG_NAV: NavRailItem[] = [
  { to: '/iq/projects', label: 'Initiatives', group: 'Plan' },
  { to: '/iq/designs', label: 'Designs', group: 'Design' },
  { to: '/iq/promotions', label: 'Promotions', group: 'Design' },
  { to: '/iq/library', label: 'Library', group: 'Design' },
  { to: '/iq/automate', label: 'Automate', group: 'Build' },
  { to: '/iq/distillation', label: 'Distillation', group: 'Build' },
  { to: '/iq/local-compute', label: 'Local compute', group: 'Build' },
  { to: '/iq/session-config', label: 'Session config', group: 'Release' },
  { to: '/iq/ask', label: 'Ask', group: 'Org' },
  { to: '/iq/explore', label: 'Explore', group: 'Org' },
  { to: '/iq/system', label: 'Admin', group: 'System' },
];

const INITIATIVE_ROWS = [
  { id: 'obs', groupId: 'progress', title: 'Observability Platform', meta: 'Nora DaSilva · 2 agents' },
  { id: 'llm', groupId: 'progress', title: 'LLM Application Platform', meta: 'Nina Rivera · 2 agents' },
  { id: 'inf', groupId: 'progress', title: 'Inference Platform', meta: 'Hiro Mancini · 1 agent' },
  { id: 'auth', groupId: 'progress', title: 'Auth Migration', meta: 'Vera Green · 1 agent' },
  { id: 'rt', groupId: 'progress', title: 'Real-time Analytics Pipeline', meta: 'Daniel Chang · 1 agent' },
  { id: 'cost', groupId: 'progress', title: 'Cost Optimization', meta: 'Layla Hassan · 1 agent' },
  { id: 'ml', groupId: 'progress', title: 'ML Feature Store', meta: 'Vera Petrov · Idle' },
  { id: 'mobile', groupId: 'progress', title: 'Mobile App Redesign', meta: 'Mia Singh · Idle' },
  { id: 'ds', groupId: 'progress', title: 'Design System v3', meta: 'Ben Okafor · Idle' },
  { id: 'plan-a', groupId: 'planning', title: 'Search relevance', meta: 'Eli Garcia · Idle' },
  { id: 'plan-b', groupId: 'planning', title: 'Data retention policy', meta: 'Layla Hassan · Idle' },
];

const INITIATIVE_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'work', label: 'Work', count: 11 },
  { id: 'decisions', label: 'Decisions', count: 2 },
  { id: 'agents', label: 'Agents' },
  { id: 'contributors', label: 'Contributors', count: 3 },
];

const MORE_MENU = [{ items: [{ label: 'Sort by name', onSelect: () => {} }, { label: 'Show completed', onSelect: () => {} }] }];

const PROMPT_WORKFLOWS: ComposerCommand[] = [
  { trigger: '/prioritize', label: 'Prioritize next work' },
  { trigger: '/criteria', label: 'Define acceptance criteria' },
  { trigger: '/unblock', label: 'Unblock this item' },
];

function InitiativeComposer({ chip, text, placeholder }: { chip: string; text?: string; placeholder?: string }) {
  const [draft, setDraft] = useState<RichChatDraft>({ html: text ? `<p>${text}</p>` : '', files: [] });
  return (
    <div className="px-5 pb-4 pt-2">
      <RichChatComposer
        onSend={() => true}
        mode="agent"
        onModeChange={() => {}}
        modeControl="menu"
        layout="wide"
        toolbar="basic"
        backdropTone="none"
        allowAttachments
        referencesPlacement="start"
        references={[{ id: 'scope', label: chip, marker: 'dot' }]}
        onRemoveReference={() => {}}
        commands={PROMPT_WORKFLOWS}
        toolbarExtras={
          <DropdownMenu
            trigger={<>Workflow <ChevronIcon dir="down" size={14} /></>}
            triggerLabel="Workflow"
            triggerVariant="link"
            triggerClassName="text-[15px] text-text-primary"
            sections={[{ items: PROMPT_WORKFLOWS.map((c) => ({ label: c.label, onSelect: () => {} })) }]}
          />
        }
        {...(placeholder ? { modePlaceholders: { agent: placeholder } } : {})}
        draft={draft}
        onDraftChange={(d) => setDraft(d)}
      />
    </div>
  );
}

function OrgFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[898px] w-[1642px] bg-surface">
      <NavRail title="Org" size="md" items={ORG_NAV} activeHref="/iq/projects" />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function InitiativesRailHeader({ scope }: { scope: 'everyone' | 'mine' }) {
  const [lens, setLens] = useState('initiatives');
  const [q, setQ] = useState('');
  return (
    <div className="flex flex-col gap-3">
      <Tabs
        variant="underline"
        size="md"
        value={lens}
        onValueChange={setLens}
        items={[{ id: 'initiatives', label: 'Initiatives' }, { id: 'sprints', label: 'Sprints' }]}
        aria-label="Initiatives lens"
      />
      <SegmentedControl
        fullWidth
        value={scope}
        onChange={() => {}}
        options={[{ value: 'everyone', label: 'Everyone' }, { value: 'mine', label: 'Mine' }]}
        aria-label="Whose initiatives"
      />
      <SearchInput size="md" value={q} onChange={setQ} placeholder="Find an initiative…" className="w-full" />
    </div>
  );
}

function InitiativeOverviewFrame() {
  const [tab, setTab] = useState('overview');
  return (
    <OrgFrame>
      <ExplorerLayout
        railTitle="Initiatives"
        railCount={11}
        railCountStyle="plain"
        railHeading="prominent"
        railWidth="lg"
        railActions={<DropdownMenu trigger={<MoreIcon size={18} />} triggerLabel="Initiative list options" triggerClassName="h-8 w-8 border-transparent px-0 py-0 text-text-secondary" align="end" sections={MORE_MENU} />}
        onToggleRail={() => {}}
        railLabel="initiatives"
        railHeader={<InitiativesRailHeader scope="everyone" />}
        railFooter={<span className="text-[13px] text-text-secondary">11 initiatives</span>}
        rail={
          <GroupedList
            size="md"
            currentStyle="bar"
            groupCountStyle="plain"
            currentId="obs"
            onOpenRow={() => {}}
            groups={[{ id: 'progress', title: 'In progress', count: 9 }, { id: 'planning', title: 'Planning', count: 2, defaultOpen: false }]}
            rows={INITIATIVE_ROWS}
          />
        }
        panePadding="none"
        paneHeader={
          <ScopeHeader
            title="Observability Platform"
            titleSize="lg"
            status={{ label: 'In progress', tone: 'info' }}
            description="Collect telemetry, reduce alert noise, and control retention costs."
            peopleStyle="names"
            people={[
              { label: 'Owner', people: [{ id: 'nd', name: 'Nora DaSilva' }] },
              { label: 'SMEs', people: [{ id: 'lh', name: 'Layla Hassan' }, { id: 'eg', name: 'Eli Garcia' }] },
            ]}
            link={{ label: 'Repository', href: '#repo' }}
            linkStyle="button"
            menu={MORE_MENU}
            tabs={INITIATIVE_TABS}
            activeTab={tab}
            onTabChange={setTab}
            className="border-b border-border"
          />
        }
        paneFooter={<InitiativeComposer chip="Observability Platform" text="Help me prioritize the next changes and explain the tradeoffs." />}
      >
        <div className="flex flex-col gap-4 px-6 pb-6 pt-2">
          <StatStrip
            variant="inline"
            aria-label="Initiative progress"
            items={[
              { label: '/ 52 points delivered', value: 18, progress: { value: 18, max: 52 } },
              { label: 'agents running', value: 2 },
              { label: 'spent of $95 allocated', value: '$1.73' },
            ]}
          />
          <DetailSection variant="heading" size="lg" title="What needs attention">
            <Banner
              variant="warning"
              layout="callout"
              accent="bar"
              size="lg"
              title="Stop duplicate alerts during a dependency outage"
              meta={<MetaLine size="sm" className="text-sm" items={[<span key="b" className="text-warning-fg">Blocked</span>, 'Eli Garcia', '2 points']} />}
              action={<Button variant="link" className="inline-flex items-center gap-1 text-[15px]">Open work <ArrowRightIcon size={15} /></Button>}
            >
              One failing dependency can trigger forty pages. Eli needs the dependency map before this bug can be planned.
            </Banner>
          </DetailSection>
          <DetailSection variant="heading" size="lg" title="Plan next">
            <ActionRowList
              aria-label="Plan next"
              onOpen={() => {}}
              items={[
                { id: 's1', title: 'Decommission the legacy StatsD bridge', description: 'Move remaining service metrics to OpenTelemetry.', meta: 'Layla Hassan · 5 points' },
                { id: 's2', title: 'Error-budget dashboard per team', description: 'Make each team’s remaining error budget visible.', meta: 'Nora DaSilva · 3 points' },
                { id: 's3', title: 'Metric cardinality budgets', description: 'Define limits before new metrics increase storage costs.', meta: 'Eli Garcia · 5 points' },
              ]}
              footer={<Button variant="link" className="inline-flex items-center gap-1 text-[15px]">See all 11 work items <ArrowRightIcon size={15} /></Button>}
            />
          </DetailSection>
          <DetailSection
            variant="heading"
            size="lg"
            title="How to move this forward"
            description="Open a work item to refine its brief, discuss tradeoffs, or review an agent run."
          >
            {null}
          </DetailSection>
        </div>
      </ExplorerLayout>
    </OrgFrame>
  );
}

const WORK_ITEMS: WorkListItem[] = [
  { id: 'b4', groupId: 'next', title: 'Stop duplicate alerts during an outage', kindLabel: 'Bug', owner: { id: 'eg', name: 'Eli Garcia' }, points: 2, tag: { label: 'Blocked', tone: 'danger' } },
  { id: 's1', groupId: 'next', title: 'Decommission legacy StatsD bridge', owner: { id: 'lh', name: 'Layla Hassan' }, points: 5 },
  { id: 's2', groupId: 'next', title: 'Error-budget dashboard per team', owner: { id: 'nd', name: 'Nora DaSilva' }, points: 3 },
  { id: 's3', groupId: 'next', title: 'Metric cardinality budgets', owner: { id: 'eg', name: 'Eli Garcia' }, points: 5 },
  { id: 's4', groupId: 'next', title: 'Tiered log sampling', owner: { id: 'lh', name: 'Layla Hassan' }, points: 3 },
  { id: 'p1', groupId: 'progress', title: 'OpenTelemetry collector fleet', owner: { id: 'nd', name: 'Nora DaSilva' }, points: 8 },
  { id: 'p2', groupId: 'progress', title: 'Alert routing by service owner', owner: { id: 'eg', name: 'Eli Garcia' }, points: 5 },
  { id: 'r1', groupId: 'review', title: 'Multi-window burn-rate alerts', owner: { id: 'lh', name: 'Layla Hassan' }, signal: { state: 'review', label: 'Awaiting review' } },
  { id: 'd1', groupId: 'done', title: 'Trace sampling defaults', owner: { id: 'nd', name: 'Nora DaSilva' }, points: 3, done: true },
  { id: 'd2', groupId: 'done', title: 'SLO catalogue', owner: { id: 'lh', name: 'Layla Hassan' }, points: 5, done: true },
  { id: 'd3', groupId: 'done', title: 'Dashboards as code', owner: { id: 'eg', name: 'Eli Garcia' }, points: 3, done: true },
];

function InitiativeWorkItemFrame() {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('priority');
  const [tab, setTab] = useState('work');
  const [itemTab, setItemTab] = useState('brief');
  return (
    <OrgFrame>
      <ExplorerLayout
        railBack={{ label: 'Initiatives', href: '#initiatives' }}
        railTitle="Work"
        railCount={11}
        railCountStyle="plain"
        railHeading="prominent"
        railWidth="lg"
        railActions={<Select size="md" aria-label="Initiative" defaultValue="obs" options={[{ value: 'obs', label: 'Observability Platform' }, { value: 'llm', label: 'LLM Application Platform' }]} />}
        rail={
          <WorkListView
            chrome="embedded"
            query={q}
            onQueryChange={setQ}
            searchPlaceholder="Find work…"
            sort={sort}
            onSortChange={setSort}
            sortOptions={[
              { value: 'priority', label: 'By priority' },
              { value: 'points', label: 'By points' },
              { value: 'updated', label: 'Recently updated' },
              { value: 'title', label: 'By title' },
            ]}
            filterFacets={[{ id: 'kind', label: 'Kind', options: [{ value: 'bug', label: 'Bug' }, { value: 'story', label: 'Story' }], selected: [], onChange: () => {} }]}
            toolbarLayout="inline"
            sortStyle="menu"
            metaStyle="text"
            pointsLabel="points"
            signalDisplay="meta"
            currentStyle="bar"
            groupCountStyle="plain"
            groups={[
              { id: 'next', title: 'Next up' },
              { id: 'progress', title: 'In progress', defaultOpen: false },
              { id: 'review', title: 'In review' },
              { id: 'done', title: 'Done', defaultOpen: false },
            ]}
            items={WORK_ITEMS}
            currentId="b4"
            onOpenItem={() => {}}
          />
        }
        panePadding="none"
        paneHeader={
          <ScopeHeader
            title="Observability Platform"
            titleSize="lg"
            status={{ label: 'In progress', tone: 'info' }}
            progress={{ done: 18, total: 52 }}
            spentUsd={1.73}
            statsPlacement="below"
            link={{ label: 'Repository', href: '#repo' }}
            linkStyle="button"
            menu={MORE_MENU}
            tabs={INITIATIVE_TABS}
            activeTab={tab}
            onTabChange={setTab}
            className="border-b border-border"
          />
        }
        paneFooter={<InitiativeComposer chip="This work item" text="Help me define acceptance criteria and identify what Eli needs before this work can start." />}
      >
        <EditorShell
          variant="work-item"
          title="Stop duplicate alerts during a dependency outage"
          titleSize="lg"
          breadcrumbs={[{ label: 'SLOs and error budgets', href: '#epic' }]}
          itemType="Bug"
          itemKey="wi-obs-e2-b4"
          metaBar={
            <WorkItemMetaBar
              layout="divided"
              priorityStyle="tag"
              status={{ value: 'open', options: [{ value: 'open', label: 'Open', tone: 'neutral' }] }}
              flags={[{ label: 'Blocked', tone: 'danger' }]}
              owner={{ value: { id: 'eg', name: 'Eli Garcia' } }}
              points={{ value: 2 }}
              priority={{ value: 'high', options: [{ value: 'high', label: 'High', tone: 'danger' }] }}
            />
          }
          tabs={[{ id: 'brief', label: 'Brief' }, { id: 'discussion', label: 'Discussion' }, { id: 'activity', label: 'Activity' }]}
          activeTab={itemTab}
          onTabChange={setItemTab}
          surface="plain"
        >
          <div className="flex flex-col gap-4 px-5 py-4">
            <OutcomeSection
              first
              size="lg"
              title="Why this matters"
              value="When one shared dependency fails, it can trigger forty separate pages. Fixing this should help the on-call engineer identify the root problem without sorting through duplicate alerts."
            />
            <Banner
              variant="warning"
              layout="callout"
              accent="bar"
              size="lg"
              title="Next step"
              meta={<span className="text-sm">The team needs this before choosing how to group duplicate alerts.</span>}
              action={<Button variant="link" className="inline-flex items-center gap-1 text-[15px]">Open discussion <ArrowRightIcon size={15} /></Button>}
            >
              Confirm the dependency map with Eli Garcia.
            </Banner>
            <DetailSection
              variant="heading"
              size="lg"
              title="Complete the brief"
              description="Add enough detail for an engineer or agent to know what success looks like."
            >
              <KeyValue
                divided
                labelWidth="w-[300px]"
                aria-label="Brief completeness"
                items={[
                  { label: 'Acceptance criteria', value: 'Not defined yet', muted: true, action: <Button variant="link" className="text-sm">Draft with agent</Button> },
                  { label: 'Dependencies and decisions', value: 'No links added', muted: true, action: <Button variant="link" className="text-sm">Add context</Button> },
                  { label: 'Planning notes', value: 'No notes added', muted: true, action: <Button variant="link" className="text-sm">Add a note</Button> },
                ]}
              />
            </DetailSection>
            <Disclosure variant="plain" size="lg" summary="Run setup" hint="SME or release manager required to dispatch">
              <p className="m-0 text-sm text-text-secondary">Choose a model, a repository and a cost cap before dispatching.</p>
            </Disclosure>
          </div>
        </EditorShell>
      </ExplorerLayout>
    </OrgFrame>
  );
}

function InitiativesMineEmptyFrame() {
  return (
    <OrgFrame>
      <ExplorerLayout
        railTitle="Initiatives"
        railCount={11}
        railCountStyle="plain"
        railHeading="prominent"
        railWidth="lg"
        railActions={<DropdownMenu trigger={<MoreIcon size={18} />} triggerLabel="Initiative list options" triggerClassName="h-8 w-8 border-transparent px-0 py-0 text-text-secondary" align="end" sections={MORE_MENU} />}
        onToggleRail={() => {}}
        railLabel="initiatives"
        railHeader={<InitiativesRailHeader scope="mine" />}
        railFooter={<span className="text-[13px] text-text-secondary">Personal view</span>}
        rail={
          <div className="px-5 py-3">
            <EmptyState
              align="start"
              title="Nothing linked yet"
              description="Try Everyone to browse the workspace."
              actions={[{ label: 'Show everyone →', variant: 'link', onClick: () => {} }]}
            />
          </div>
        }
        panePadding="none"
        paneHeader={
          <ScopeHeader titleSize="lg" title="My initiatives" description="Initiatives where you are an owner or contributor." className="border-b border-border" />
        }
        paneFooter={<InitiativeComposer chip="Initiatives" placeholder="Ask about the team’s initiatives or how to get involved…" />}
      >
        <div className="px-6 pt-14">
          <EmptyState
            align="start"
            size="lg"
            actionsDirection="row"
            title="No initiatives are linked to you yet."
            description={<>You can still browse your team’s work in Everyone.<br />If you expected to see your initiatives here, check your profile connection.</>}
            actions={[
              { label: 'Browse all initiatives', variant: 'primary', onClick: () => {} },
              { label: 'Check profile', variant: 'secondary', onClick: () => {} },
            ]}
            details={{
              title: 'How this view works',
              body: <>An initiative appears here when you are listed as an owner or contributor.<br />Your account also needs to be connected to your team profile.<br />A workspace admin can help connect it if needed.</>,
              action: { label: 'Refresh this view', variant: 'link', onClick: () => {} },
            }}
          />
        </div>
      </ExplorerLayout>
    </OrgFrame>
  );
}

// ---------------------------------------------------------------------------
// 2.392.0 — Initiatives v2 (agentcore docs/design/initiative-overview-v2-mockup.png),
// composed only from library parts: `railWidth="ms"` (264px), `railHeading=
// "caption"` + chip count, `RailNavList`, `GroupedList groupHeading="label"
// groupCountAlign="end" rowStyle="plain"` with title-only rows, `ScopeHeader
// tabSize="md" peopleStyle="inline" descriptionSize="sm"` and a two-line
// pre-line `description`, `StatStrip
// variant="line"`, `PageSection size="md" count`, and `ActionRowList tone/
// accent/leading/columns/action` with `ActionRowPerson` cells.
//
// 2.396.0 polish: the header sits in `paneHeader` (as the portal composes it)
// with `tabsRule="inset"` — the rule starts under the title, inside the
// gutter — and a 3px selected bar drawn inside the header's box; `PageSection
// countTone="primary"`; the "Blocked" tag is `Chip size="lg" outline="soft"`;
// "View all 11" carries a 20px arrow 8px after the label.
// ---------------------------------------------------------------------------

const V2_ROWS = INITIATIVE_ROWS.map(({ id, groupId, title }) => ({ id, groupId, title }));

const V2_WHO_PTS = [
  { id: 'who', width: 'lg' as const, label: 'Assignee' },
  { id: 'pts', width: 'sm' as const, label: 'Points' },
];

// 2.397.0 — the portal's shell rail is a SubNavLayout, not a NavRail. This
// frame draws the mockup's left-hand "Org" rail with it, so the story shows
// the two rails the user compares side by side: both now draw railType's one
// scale (15px/500 items on 40px rows, 11px caps group labels with a plain
// count at the right, the 3px bar + pale tint on the current row).
const SHELL_NAV: SubNavItem[] = [
  { path: '/iq/projects', label: 'Initiatives', group: 'Plan' },
  { path: '/iq/designs', label: 'Designs', group: 'Design' },
  { path: '/iq/promotions', label: 'Promotions', group: 'Design' },
  { path: '/iq/library', label: 'Library', group: 'Design' },
  { path: '/iq/work', label: 'Automate', group: 'Build' },
  { path: '/iq/distillation', label: 'Distillation', group: 'Build' },
  { path: '/iq/local', label: 'Local compute', group: 'Build' },
  { path: '/iq/session', label: 'Session config', group: 'Release' },
  { path: '/iq/ask', label: 'Ask', group: 'Org' },
  { path: '/iq/explore', label: 'Explore', group: 'Org' },
  { path: '/settings', label: 'Settings', group: 'System' },
];

function ShellRailFrame({ children }: { children: ReactNode }) {
  return (
    <div className="h-[898px] w-[1642px] bg-surface">
      <SubNavLayout
        title="Org"
        items={SHELL_NAV}
        railWidth={200}
        storageKey="story-shell-rail"
        railLabel="Org navigation"
        contentAs="div"
        renderNavItem={(item, children) => (
          <a
            href={item.path}
            onClick={(e) => e.preventDefault()}
            className={item.path === '/iq/projects' ? activeNavItemClassName : inactiveNavItemClassName}
          >
            {children}
          </a>
        )}
      >
        {children}
      </SubNavLayout>
    </div>
  );
}

function InitiativeOverviewV2Frame({ shell = 'nav-rail' }: { shell?: 'nav-rail' | 'sub-nav' }) {
  const [tab, setTab] = useState('overview');
  const [q, setQ] = useState('');
  const Frame = shell === 'sub-nav' ? ShellRailFrame : OrgFrame;
  return (
    <Frame>
      <ExplorerLayout
        railTitle="Initiatives"
        railCount={11}
        railHeading="caption"
        railWidth="ms"
        railActions={<DropdownMenu trigger={<MoreIcon size={18} />} triggerLabel="Initiative list options" triggerClassName="h-8 w-8 border-transparent px-0 py-0 text-text-secondary" align="end" sections={MORE_MENU} />}
        onToggleRail={() => {}}
        railLabel="initiatives"
        railHeader={
          <div className="flex flex-col gap-3">
            <SearchInput size="md" value={q} onChange={setQ} placeholder="Find an initiative…" className="w-full" />
            <RailNavList
              aria-label="Initiative views"
              items={[
                { id: 'all', label: 'All initiatives', href: '?scope=all' },
                { id: 'mine', label: 'My initiatives', href: '?scope=mine' },
                { id: 'sprints', label: 'Sprints', href: '?lens=sprints' },
              ]}
            />
          </div>
        }
        railFooter={<span className="text-[15px] text-text-secondary">11 initiatives</span>}
        rail={
          <GroupedList
            size="md"
            groupHeading="label"
            groupCountAlign="end"
            rowStyle="plain"
            currentStyle="bar"
            currentId="obs"
            onOpenRow={() => {}}
            groups={[{ id: 'progress', title: 'In progress', count: 9 }, { id: 'planning', title: 'Planning', count: 2, defaultOpen: false }]}
            rows={V2_ROWS}
          />
        }
        panePadding="none"
          paneHeader={
          <ScopeHeader
            title="Observability Platform"
            status={{ label: 'In progress', tone: 'info' }}
            description={'Centralize telemetry, reduce alert noise, and control retention costs.\nFocus: actionable alerts, team error budgets, and OpenTelemetry.'}
            descriptionSize="sm"
            peopleStyle="inline"
            people={[
              { label: 'Owner', people: [{ id: 'nd', name: 'Nora DaSilva' }] },
              { label: 'SMEs', people: [{ id: 'lh', name: 'Layla Hassan' }, { id: 'eg', name: 'Eli Garcia' }] },
            ]}
            link={{ label: 'Repository', href: '#repo' }}
            linkStyle="button"
            menu={MORE_MENU}
            tabs={INITIATIVE_TABS}
            tabSize="md"
            tabsRule="inset"
            activeTab={tab}
            onTabChange={setTab}
          />
        }
        paneFooter={<InitiativeComposer chip="Observability Platform" text="Help me prioritize the next changes and explain the tradeoffs." />}
      >
        <div className="flex flex-col px-6 pb-6">
          <StatStrip
            variant="line"
            aria-label="Initiative progress"
            className="mt-5"
            items={[
              { label: '/ 52 points delivered', value: 18, progress: { value: 18, max: 52 } },
              { label: 'agents running', value: 2 },
              { label: 'of $95 spent', value: '$1.73' },
            ]}
          />
          <PageSection title="Needs attention" size="md" count={1} countTone="primary" className="mt-6">
            <ActionRowList
              aria-label="Needs attention"
              tone="warning"
              accent="bar"
              action="Open"
              columns={[{ id: 'who', width: 'md' as const, label: 'Assignee' }, { id: 'pts', width: 'xs' as const, label: 'Points' }]}
              onOpen={() => {}}
              items={[
                {
                  id: 'b4',
                  title: 'Stop duplicate alerts during a dependency outage',
                  description: 'Waiting on the dependency map.',
                  leading: <Chip tone="danger" size="lg" outline="soft">Blocked</Chip>,
                  cells: { who: <ActionRowPerson name="Eli Garcia" />, pts: '2 pts' },
                },
              ]}
            />
          </PageSection>
          <PageSection
            title="Up next"
            size="md"
            className="mt-8"
            actions={<Button variant="link" className="inline-flex items-center gap-2 text-[15px]">View all 11 <ArrowRightIcon size={20} /></Button>}
          >
            <ActionRowList
              aria-label="Up next"
              columns={V2_WHO_PTS}
              onOpen={() => {}}
              items={[
                { id: 's1', title: 'Decommission the legacy StatsD bridge', cells: { who: <ActionRowPerson name="Layla Hassan" />, pts: '5 pts' } },
                { id: 's2', title: 'Error-budget dashboard per team', cells: { who: <ActionRowPerson name="Nora DaSilva" />, pts: '3 pts' } },
                { id: 's3', title: 'Metric cardinality budgets', cells: { who: <ActionRowPerson name="Eli Garcia" />, pts: '5 pts' } },
              ]}
            />
          </PageSection>
        </div>
      </ExplorerLayout>
    </Frame>
  );
}

export const InitiativeOverview: Story = {
  name: 'Initiative overview',
  render: () => <InitiativeOverviewFrame />,
};

export const InitiativeWorkItem: Story = {
  name: 'Initiative work item',
  render: () => <InitiativeWorkItemFrame />,
};

export const InitiativesMineEmpty: Story = {
  name: 'Initiatives mine empty',
  render: () => <InitiativesMineEmptyFrame />,
};

export const InitiativeOverviewV2: Story = {
  name: 'Initiative overview v2',
  render: () => <InitiativeOverviewV2Frame />,
};

export const InitiativeOverviewV2ShellRail: Story = {
  name: 'Initiative overview v2 — shell rail beside the explorer rail',
  parameters: { layout: 'fullscreen' },
  render: () => <InitiativeOverviewV2Frame shell="sub-nav" />,
};
