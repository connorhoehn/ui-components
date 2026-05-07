export interface MockNode {
  id: string;
  type: string;
  label: string;
  subtitle?: string;
  x: number;
  y: number;
}

export interface MockEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
}

export const mockNodes: MockNode[] = [
  { id: 'trigger-1', type: 'trigger', label: 'On doc.comment', subtitle: 'Any document', x: 80, y: 180 },
  { id: 'llm-1', type: 'llm', label: 'claude-sonnet-4-6', subtitle: '{{context.commentBody}}', x: 280, y: 180 },
  { id: 'condition-1', type: 'condition', label: 'Safe?', subtitle: 'context.steps_7193e7a2...', x: 480, y: 180 },
  { id: 'action-1', type: 'action', label: 'post-comment', subtitle: 'Comment on (current doc)', x: 650, y: 100 },
  { id: 'action-2', type: 'action', label: 'notify', subtitle: 'Notify moderation', x: 520, y: 320 },
  { id: 'approval-1', type: 'approval', label: '1 approver, 1/1 required', subtitle: '@moderator', x: 680, y: 320 },
  { id: 'condition-2', type: 'condition', label: 'Approved?', subtitle: 'received...#f81342c...', x: 850, y: 320 },
  { id: 'action-3', type: 'action', label: 'post-comment', subtitle: 'Comment on (current doc)', x: 1020, y: 240 },
  { id: 'action-4', type: 'action', label: 'update-document', subtitle: 'Update (current)', x: 1020, y: 380 },
];

export const mockEdges: MockEdge[] = [
  { id: 'e1', source: 'trigger-1', target: 'llm-1' },
  { id: 'e2', source: 'llm-1', target: 'condition-1' },
  { id: 'e3', source: 'condition-1', target: 'action-1', label: 'true' },
  { id: 'e4', source: 'condition-1', target: 'action-2', label: 'false' },
  { id: 'e5', source: 'action-2', target: 'approval-1' },
  { id: 'e6', source: 'approval-1', target: 'condition-2' },
  { id: 'e7', source: 'condition-2', target: 'action-3', label: 'true' },
  { id: 'e8', source: 'condition-2', target: 'action-4', label: 'false' },
];

export const nodePalette = [
  { category: 'SOURCES', items: [{ type: 'trigger', label: 'Trigger', shortcut: '1' }] },
  { category: 'LANGUAGE', items: [{ type: 'llm', label: 'LLM', shortcut: '2' }] },
  { category: 'DATA', items: [
    { type: 'transform', label: 'Transform', shortcut: '3' },
    { type: 'condition', label: 'Condition', shortcut: '4' },
  ]},
  { category: 'FLOW', items: [
    { type: 'fork', label: 'Fork', shortcut: '5' },
    { type: 'join', label: 'Join', shortcut: '6' },
  ]},
  { category: 'OUTPUTS', items: [{ type: 'action', label: 'Action', shortcut: '7' }] },
  { category: 'HUMAN', items: [{ type: 'approval', label: 'Approval', shortcut: '8' }] },
];

export const nodeTypeIcons: Record<string, string> = {
  trigger: '⚡',
  llm: '🤖',
  transform: '⟳',
  condition: '◇',
  fork: '⑃',
  join: '⑂',
  action: '●',
  approval: '✓',
};

export const nodeTypeColors: Record<string, string> = {
  trigger: '#8b5cf6',
  llm: '#ec4899',
  transform: '#0891b2',
  condition: '#6366f1',
  fork: '#f59e0b',
  join: '#f59e0b',
  action: '#ef4444',
  approval: '#10b981',
};
