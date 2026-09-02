// StepTree lays a run's steps out as a thread. Every row is a collapsed
// StepThread — click one to see the step detail these stories feed it.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepTree } from './StepTree';
import type { NodeType, PipelineEdge, StepExecution } from '../../../types/pipeline';

const meta = {
  title: 'Pipelines/Steps/StepTree',
  component: StepTree,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StepTree>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Fixed instants — a moving clock would reshuffle these stories. */
function completed(nodeId: string, startedAt: string, durationMs: number, output?: unknown): StepExecution {
  return {
    nodeId,
    status: 'completed',
    startedAt,
    completedAt: new Date(Date.parse(startedAt) + durationMs).toISOString(),
    durationMs,
    ...(output !== undefined ? { output } : {}),
  };
}

function node(type: NodeType, data: Record<string, unknown> = {}): { type: NodeType; data: Record<string, unknown> } {
  return { type, data: { type, ...data } };
}

export const Linear: Story = {
  args: {
    steps: {
      'trigger-1': completed('trigger-1', '2026-08-25T14:03:00.000Z', 38, { documentId: 'doc-8821' }),
      'llm-2': completed('llm-2', '2026-08-25T14:03:00.100Z', 2310, { response: 'Three bullets…', tokensIn: 412, tokensOut: 96 }),
      'transform-3': completed('transform-3', '2026-08-25T14:03:02.500Z', 64, { items: 12 }),
      'action-4': completed('action-4', '2026-08-25T14:03:02.600Z', 190, { posted: true }),
    },
    nodeDataMap: {
      'trigger-1': node('trigger', { triggerType: 'document.created', label: 'On document created' }),
      'llm-2': node('llm', { provider: 'bedrock', model: 'claude-sonnet-4-6', maxTokens: 512 }),
      'transform-3': node('transform', { language: 'jsonata', expression: '$.bullets' }),
      'action-4': node('action', { actionType: 'http', url: 'https://hooks.example.com/summary' }),
    },
  },
};

// With `edges`, StepTree nests each fork branch under its branch label. The
// walker follows the `out` chain out of the first branch, so the shared tail
// after the join (join + notify) renders inside branch 1 rather than being
// hoisted back to the trunk — that is the component's current chain-walk
// behavior, shown here rather than papered over.
const FORK_EDGES: PipelineEdge[] = [
  { id: 'e1', source: 'trigger-1', sourceHandle: 'out', target: 'fork-2', targetHandle: 'in' },
  { id: 'e2', source: 'fork-2', sourceHandle: 'branch-1', target: 'llm-a', targetHandle: 'in' },
  { id: 'e3', source: 'fork-2', sourceHandle: 'branch-2', target: 'llm-b', targetHandle: 'in' },
  { id: 'e4', source: 'llm-a', sourceHandle: 'out', target: 'join-3', targetHandle: 'in-1' },
  { id: 'e5', source: 'llm-b', sourceHandle: 'out', target: 'join-3', targetHandle: 'in-2' },
  { id: 'e6', source: 'join-3', sourceHandle: 'out', target: 'notify-4', targetHandle: 'in' },
];

export const ForkJoin: Story = {
  args: {
    steps: {
      'trigger-1': completed('trigger-1', '2026-08-25T14:03:00.000Z', 38),
      'fork-2': completed('fork-2', '2026-08-25T14:03:00.060Z', 4),
      'llm-a': completed('llm-a', '2026-08-25T14:03:00.100Z', 1820, { response: 'Summary', tokensIn: 380, tokensOut: 74 }),
      'llm-b': completed('llm-b', '2026-08-25T14:03:00.100Z', 2440, { response: 'Sentiment: neutral', tokensIn: 380, tokensOut: 21 }),
      'join-3': completed('join-3', '2026-08-25T14:03:02.600Z', 6),
      'notify-4': completed('notify-4', '2026-08-25T14:03:02.700Z', 210, { posted: true }),
    },
    nodeDataMap: {
      'trigger-1': node('trigger', { triggerType: 'document.created' }),
      'fork-2': node('fork', { branches: 2, label: 'Summarize + classify' }),
      'llm-a': node('llm', { provider: 'bedrock', model: 'claude-sonnet-4-6', systemPrompt: 'Summarize' }),
      'llm-b': node('llm', { provider: 'bedrock', model: 'claude-haiku-4-5', systemPrompt: 'Classify sentiment' }),
      'join-3': node('join', { mode: 'all' }),
      'notify-4': node('action', { actionType: 'http', url: 'https://hooks.example.com/summary' }),
    },
    edges: FORK_EDGES,
  },
};

// REGRESSION GUARD, in visual form. `stepStartMs` in StepTree.tsx exists
// because unfinished steps used to sort to the Unix epoch (start was
// reconstructed as `completedAt - durationMs`, falling back to 0) and so
// rendered ABOVE every completed step. Here `llm-2` is still running while
// the LATER `transform-3` and `action-4` have already completed, and the
// object's insertion order is deliberately wrong: the running step MUST
// still render second, in its correct chronological position.
export const LiveRun: Story = {
  args: {
    steps: {
      'trigger-1': completed('trigger-1', '2026-08-25T14:03:00.000Z', 38, { documentId: 'doc-8821' }),
      'transform-3': completed('transform-3', '2026-08-25T14:03:04.000Z', 64, { items: 12 }),
      'action-4': completed('action-4', '2026-08-25T14:03:05.000Z', 190, { posted: true }),
      'llm-2': {
        nodeId: 'llm-2',
        status: 'running',
        startedAt: '2026-08-25T14:03:01.000Z',
        input: { context: { documentId: 'doc-8821' } },
      },
    },
    nodeDataMap: {
      'trigger-1': node('trigger', { triggerType: 'document.created' }),
      'llm-2': node('llm', { provider: 'bedrock', model: 'claude-sonnet-4-6', streaming: true }),
      'transform-3': node('transform', { language: 'jsonata', expression: '$.bullets' }),
      'action-4': node('action', { actionType: 'http', url: 'https://hooks.example.com/summary' }),
    },
  },
};
