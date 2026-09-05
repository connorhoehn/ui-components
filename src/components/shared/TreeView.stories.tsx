import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TreeView, type TreeNode } from './TreeView';
import Chip from './Chip';

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
