import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TreeView, type TreeNode } from './TreeView';
import Chip from './Chip';
import { FileKindMark } from './FileKindMark';

const NODES: TreeNode[] = [
  { id: 'enterprise', title: 'Enterprise Context', parentId: null, isDir: true },
  { id: 'governance', title: 'Governance', parentId: 'enterprise', isDir: true },
  { id: 'adr-001', title: 'ADR-001: Service mesh', parentId: 'governance' },
  { id: 'adr-002', title: 'ADR-002: Secrets rotation', parentId: 'governance' },
  { id: 'rules', title: 'Rules', parentId: 'enterprise', isDir: true },
  { id: 'rule-ci', title: 'CI gate policy', parentId: 'rules' },
  { id: 'synced', title: 'Confluence: Platform', parentId: null, isDir: true },
  { id: 'page-1', title: 'Runbooks', parentId: 'synced' },
];

const meta = {
  title: 'Shared/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = { nodes: NODES, selectedId: null, onSelect: () => {} };

export const Interactive: Story = {
  args: baseArgs,
  render: () => {
    const [selected, setSelected] = useState<string | null>('adr-001');
    return (
      <div className="w-72 rounded-lg border border-border bg-surface p-1">
        <TreeView
          nodes={NODES}
          selectedId={selected}
          onSelect={setSelected}
          defaultExpanded={['enterprise', 'governance']}
          renderTrailing={(n) => (n.id === 'rules' ? <Chip size="xs">1</Chip> : null)}
        />
      </div>
    );
  },
};

export const WithReorder: Story = {
  args: baseArgs,
  render: () => {
    const [nodes, setNodes] = useState(NODES);
    const [selected, setSelected] = useState<string | null>('adr-001');
    return (
      <div className="w-72 rounded-lg border border-border bg-surface p-1">
        <TreeView
          nodes={nodes}
          selectedId={selected}
          onSelect={setSelected}
          defaultExpanded={['enterprise', 'governance', 'rules']}
          onReorder={(id, targetParentId) => {
            setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, parentId: targetParentId } : n)));
          }}
        />
      </div>
    );
  },
};

const FILES: TreeNode[] = [
  { id: 'sprint', title: 'Sprint planning', parentId: null, isDir: true, icon: <FileKindMark kind="folder" size="sm" /> },
  { id: 'recording', title: 'Planning sync recording', parentId: 'sprint', hoverMeta: 'v1', icon: <FileKindMark kind="recording" size="sm" /> },
  { id: 'transcript', title: 'Planning sync transcript', parentId: 'sprint', hoverMeta: 'v1', icon: <FileKindMark kind="transcript" size="sm" /> },
  { id: 'release', title: 'Release plan', parentId: 'sprint', hoverMeta: 'v2', icon: <FileKindMark kind="page" size="sm" /> },
  { id: 'deck', title: 'Sprint review', parentId: 'sprint', hoverMeta: 'v4', icon: <FileKindMark kind="presentation" size="sm" /> },
  { id: 'arch', title: 'Auth architecture', parentId: 'sprint', hoverMeta: 'v1', icon: <FileKindMark kind="diagram" size="sm" /> },
];

/**
 * The Documents explorer: file-kind marks, the version revealed on hover or
 * focus, and a ⋯ menu per file (Version, Rename, Move, View details). Focus a
 * row and press Shift+F10 — or right-click it — to open the same menu.
 */
export const HoverMetaAndRowMenu: Story = {
  args: baseArgs,
  render: () => {
    const [selected, setSelected] = useState<string | null>('deck');
    const [last, setLast] = useState('');
    return (
      <div className="flex w-80 flex-col gap-2">
        <div className="rounded-lg border border-border bg-surface p-1">
          <TreeView
            nodes={FILES}
            selectedId={selected}
            onSelect={setSelected}
            defaultExpanded={['sprint']}
            rowMenu={(node) =>
              node.isDir
                ? null
                : [{
                    items: [
                      { label: node.hoverMeta ?? 'v1', description: 'Open version history', onSelect: () => setLast(`Version · ${node.title}`) },
                      { label: 'Rename', onSelect: () => setLast(`Rename · ${node.title}`) },
                      { label: 'Move', onSelect: () => setLast(`Move · ${node.title}`) },
                      { label: 'View details', onSelect: () => setLast(`Details · ${node.title}`) },
                    ],
                  }]
            }
          />
        </div>
        <p className="m-0 text-xs text-text-tertiary" role="status">{last || 'Pick an action from a row menu.'}</p>
      </div>
    );
  },
};
