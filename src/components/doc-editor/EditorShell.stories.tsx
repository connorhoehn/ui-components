import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { EditorShell, DEFAULT_EDITOR_SHELL_TABS } from './EditorShell';
import { FloatingComposerDock } from './FloatingComposerDock';
import { RichChatComposer, type ComposerMode } from '../social/RichChatComposer';
import { TaskStrip } from '../shared/TaskStrip';
import { StatusPill } from '../shared/StatusPill';
import { TreeView, type TreeNode } from '../shared/TreeView';
import { FileKindMark } from '../shared/FileKindMark';
import { Workbench } from '../layout/Workbench';
import { AgentTaskCard } from '../layout/AgentTaskCard';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import EmptyState from '../shared/EmptyState';

const meta = {
  title: 'DocEditor/EditorShell',
  component: EditorShell,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof EditorShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const PEOPLE = [
  { id: 'ak', name: 'Alex Kim' },
  { id: 'mt', name: 'Maria Torres' },
  { id: 'jd', name: 'Jordan Diaz' },
];

const FILES: TreeNode[] = [
  { id: 'sprint', title: 'Sprint planning', parentId: null, isDir: true, icon: <FileKindMark kind="folder" size="sm" /> },
  { id: 'release', title: 'Release plan', parentId: 'sprint', hoverMeta: 'v2', icon: <FileKindMark kind="page" size="sm" /> },
  { id: 'deck', title: 'Sprint review', parentId: 'sprint', hoverMeta: 'v4', icon: <FileKindMark kind="presentation" size="sm" /> },
];

/** The dock both variants float: task strip + compact composer. */
function Dock({ agentLabel }: { agentLabel: string }) {
  const [mode, setMode] = useState<ComposerMode>('chat');
  return (
    <FloatingComposerDock
      strip={<TaskStrip label={agentLabel} status="running" phase="Editing slide 4" onStop={() => {}} onDismiss={() => {}} />}
      composer={
        <RichChatComposer
          onSend={() => {}}
          mode={mode}
          onModeChange={setMode}
          modeControl="compact"
          modeShortcuts
          modeTriggers
          disabledModes={['terminal']}
          modeUnavailableReasons={{ terminal: 'Start an agent task first' }}
          submitLabel={{ agent: 'Start' }}
        />
      }
    />
  );
}

/** A tall stand-in for the page so the dock has something to float over. */
function PageSurface() {
  return (
    <div className="mx-auto my-6 flex min-h-[900px] max-w-[816px] flex-col gap-3 rounded-sm bg-surface p-16 shadow-sm">
      <h2 className="m-0 text-2xl font-semibold text-text-primary">Release plan</h2>
      <p className="m-0 text-sm text-text-secondary">Executive summary, risks and mitigations, owners and next steps.</p>
    </div>
  );
}

function SlideSurface() {
  return (
    <div className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-3 px-4">
      <div className="aspect-video w-full rounded-md border border-border bg-surface p-10 shadow-sm">
        <p className="m-0 text-3xl font-bold text-text-primary">Release readiness</p>
      </div>
      <div className="rounded-md border border-border bg-surface p-3 text-xs text-text-tertiary">Speaker notes</div>
    </div>
  );
}

/** Page variant: document toolbar slot, white page on the grey workspace, dock. */
export const PageVariant: Story = {
  args: { title: 'Release plan', children: null },
  render: () => {
    const [tab, setTab] = useState('editor');
    const [starred, setStarred] = useState(false);
    return (
      <div className="h-[760px]">
        <EditorShell
          breadcrumbs={[{ label: 'Sprint planning', href: '#' }, { label: 'Release plan' }]}
          title="Release plan"
          onTitleChange={() => {}}
          kind="page"
          starred={starred}
          onStarredChange={setStarred}
          statusPill={<StatusPill state="neutral" label="Draft" size="sm" />}
          participants={PEOPLE}
          meta="Owned by Connor Hoehn"
          saveState={{ status: 'saved' }}
          headActions={<><Button size="sm" variant="secondary">Share</Button><IconButton size="sm" aria-label="More actions">⋯</IconButton></>}
          tabs={DEFAULT_EDITOR_SHELL_TABS.map((t) => (t.id === 'comments' ? { ...t, count: 3 } : t))}
          activeTab={tab}
          onTabChange={setTab}
          toolbar={tab === 'editor' ? <span className="text-xs text-text-tertiary">DocumentToolbar goes here</span> : undefined}
          footer={tab === 'editor' ? <Dock agentLabel="Revising risks section" /> : undefined}
          surface={tab === 'editor' ? 'workspace' : 'plain'}
        >
          {tab === 'editor' ? <PageSurface /> : <EmptyState title={`${tab} tab`} body="The host renders this tab's content." />}
        </EditorShell>
      </div>
    );
  },
};

/** Presentation variant inside the full explorer | editor | workbench frame. */
export const PresentationVariantFramed: Story = {
  args: { title: 'Sprint review', children: null },
  render: () => {
    const [tab, setTab] = useState('editor');
    const [selected, setSelected] = useState<string | null>('deck');
    return (
      <div className="h-[760px]">
        <EditorShell
          breadcrumbs={[{ label: 'Sprint planning', href: '#' }, { label: 'Sprint review' }]}
          title="Sprint review"
          kind="presentation"
          starred
          onStarredChange={() => {}}
          statusPill={<StatusPill state="info" label="v4" size="sm" />}
          participants={PEOPLE}
          saveState={{ status: 'saved', detail: 'Saved just now' }}
          headActions={<><Button size="sm" variant="secondary">Present</Button><Button size="sm">Share</Button></>}
          tabs={DEFAULT_EDITOR_SHELL_TABS}
          activeTab={tab}
          onTabChange={setTab}
          toolbar={<span className="text-xs text-text-tertiary">SlidesToolbar goes here (WS3)</span>}
          footer={<Dock agentLabel="Creating release-readiness deck" />}
          explorer={
            <TreeView
              nodes={FILES}
              selectedId={selected}
              onSelect={setSelected}
              defaultExpanded={['sprint']}
              rowMenu={(n) => (n.isDir ? null : [{ items: [{ label: n.hoverMeta ?? 'v1' }, { label: 'Rename' }, { label: 'Move' }, { label: 'View details' }] }])}
              className="p-1"
            />
          }
          workbench={
            <Workbench
              title="Sprint review"
              subtitle="Presentation · Slide 4 of 5"
              kind="presentation"
              task={<AgentTaskCard title="Build risk outlook slide" status="running" phase="Editing slide 4" startedLabel="Started 2m ago" />}
              tabs={[
                { id: 'comments', label: 'Comments', content: <EmptyState title="No comments on decks yet" /> },
                { id: 'activity', label: 'Activity', content: <p className="m-0 text-xs text-text-secondary">Connor updated risks · 2h ago</p> },
                { id: 'details', label: 'Details', content: <p className="m-0 text-xs text-text-secondary">4 revisions</p> },
              ]}
              footer={<Button size="sm" className="flex-1">Open run</Button>}
            />
          }
        >
          <SlideSurface />
        </EditorShell>
      </div>
    );
  },
};
