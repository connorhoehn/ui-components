// The Documents FOLDERS view (docs/design/documents-folders in the host), composed
// only from library pieces, to check them against the mockup: ExplorerLayout
// with a prominent "Documents 49" rail heading, ConversationShelf quick views
// (Recent, Shared with me), RailSectionHeader, TreeView rows carrying a count
// chip (`badge`) on folders and a compact age (`meta`, formatCompactAge) on
// files, and EditorShell with the folder `path` inline and the save state under
// the title.
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExplorerLayout } from '../layout/ExplorerLayout';
import { EditorShell, DEFAULT_EDITOR_SHELL_TABS } from '../doc-editor/EditorShell';
import { TreeView, type TreeNode } from '../shared/TreeView';
import { SearchInput } from '../shared/SearchInput';
import Chip from '../shared/Chip';
import { StatusPill } from '../shared/StatusPill';
import { FileKindMark, type FileKind } from '../shared/FileKindMark';
import { ConversationShelf } from '../social/ConversationShelf';
import { RailSectionHeader } from '../social/RailSectionHeader';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { CodeIcon, FolderIcon, HistoryIcon, InfoIcon, PeopleIcon, PlusIcon } from '../ui/Icons';
import { DetailSection } from '../shared/DetailSection';
import { formatCompactAge } from './compactAge';

const meta: Meta = {
  title: 'Work/Documents folders view',
  parameters: { layout: 'fullscreen' },
};
export default meta;

const NOW = Date.parse('2026-09-23T15:00:00Z');
const H = 3_600_000;

function folder(id: string, title: string, parentId: string | null, count: number): TreeNode {
  return {
    id, title, parentId, isDir: true,
    icon: <FileKindMark kind="folder" variant="plain" />,
    badge: <Chip size="xs" tone="neutral" aria-label={`${count} documents`}>{count}</Chip>,
  };
}
function file(id: string, title: string, parentId: string, kind: FileKind, hoursAgo: number): TreeNode {
  return { id, title, parentId, icon: <FileKindMark kind={kind} variant="plain" />, meta: formatCompactAge(NOW - hoursAgo * H, NOW) };
}

const NODES: TreeNode[] = [
  folder('sprint', 'Sprint planning', null, 12),
  folder('meetings', 'Meetings', 'sprint', 8),
  file('transcript', 'Planning sync transcript', 'meetings', 'transcript', 6),
  file('notes', 'Sprint notes', 'meetings', 'page', 26),
  folder('release', 'Release assets', 'sprint', 4),
  file('review', 'Sprint review', 'release', 'presentation', 3),
  file('plan', 'Release plan', 'release', 'page', 3),
  file('checklist', 'Launch checklist', 'release', 'page', 30),
  folder('auth', 'Auth migration', null, 14),
  file('arch', 'Auth architecture', 'auth', 'diagram', 8),
  file('brief', 'Migration brief', 'auth', 'page', 28),
  folder('audit', 'Audit Renderers', null, 6),
  file('a1', 'audit-po-1790176511', 'audit', 'presentation', 1),
  file('a2', 'audit-e2e-1790150600', 'audit', 'presentation', 2),
  file('a3', 'audit-ws1-diagram', 'audit', 'diagram', 27),
  folder('research', 'Research', null, 5),
];

function Screen() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('plan');
  const [view, setView] = useState<string | null>(null);
  const [tab, setTab] = useState('editor');
  return (
    <div className="h-[900px] w-[1580px] bg-surface">
      <ExplorerLayout
        railTitle="Documents"
        railCount={49}
        railHeading="prominent"
        railWidth="md"
        onToggleRail={() => {}}
        railActions={<IconButton size="sm" variant="ghost" aria-label="New document" icon={<PlusIcon />} />}
        railHeader={<SearchInput value={query} onChange={setQuery} placeholder="Search all files…" aria-label="Search all files" className="w-full" />}
        railFooter={
          <>
            <RailSectionHeader label="Manage" />
            <ConversationShelf compact onSelect={() => {}} items={[
              { id: 'templates', label: 'Templates', icon: <FolderIcon /> },
              { id: 'types', label: 'Data types', icon: <CodeIcon /> },
            ]} />
          </>
        }
        rail={
          <div className="flex flex-col gap-2 px-2 pb-3">
            <ConversationShelf compact activeId={view} onSelect={setView} items={[
              { id: 'recent', label: 'Recent', icon: <HistoryIcon /> },
              { id: 'shared', label: 'Shared with me', icon: <PeopleIcon /> },
            ]} />
            <RailSectionHeader label="Folders" />
            <TreeView nodes={NODES} selectedId={selected} onSelect={setSelected} defaultExpanded={['sprint', 'meetings', 'release', 'auth', 'audit']} />
          </div>
        }
        asidePlacement="beside"
        panePadding="none"
      >
        <EditorShell
          kind="page"
          title="Release plan"
          statusPill={<StatusPill label="Draft" state="neutral" />}
          path={[{ label: 'Sprint planning', onClick: () => setSelected('sprint') }, { label: 'Release assets', onClick: () => setSelected('release') }]}
          saveState={{ status: 'saved', detail: 'Saved 3 hours ago' }}
          headActions={
            <>
              <Button variant="secondary" size="md">Share</Button>
              <IconButton variant="ghost" aria-label="Details" icon={<InfoIcon />} />
            </>
          }
          tabs={DEFAULT_EDITOR_SHELL_TABS.map((t) => (t.id === 'comments' ? { ...t, count: 3 } : t))}
          activeTab={tab}
          onTabChange={setTab}
        >
          <div className="mx-auto my-6 max-w-[850px] bg-surface p-12 text-text-primary shadow-sm">
            <DetailSection title="Outcome" first>
              Launch the updated gateway with reliable metrics, clear ownership, and a tested rollback path.
            </DetailSection>
          </div>
        </EditorShell>
      </ExplorerLayout>
    </div>
  );
}

export const Light: StoryObj = { render: () => <Screen /> };
export const Dark: StoryObj = { render: () => <div data-theme="dark" className="bg-surface"><Screen /></div> };
