// Every StepThread story renders COLLAPSED first — that is the component's
// default state. The interesting surface (execution timeline, node config,
// runtime input, resolved prompt, response / agent waterfall, token usage,
// error block, footer actions) only appears in the expanded panel, so click
// the step row in each story to see what the story is actually about.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepThread } from './StepThread';
import type { AgentStepOutput, StepExecution } from '../../../types/pipeline';

const meta = {
  title: 'Pipelines/Steps/StepThread',
  component: StepThread,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StepThread>;

export default meta;
type Story = StoryObj<typeof meta>;

// Fixed instants, never Date.now() — the collapsed row prints a duration and
// the expanded timeline prints wall-clock times, so a moving clock would make
// every snapshot of these stories differ.
const T_START = '2026-08-25T14:03:00.000Z';
const T_END = '2026-08-25T14:03:00.412Z';

/** Small factory so each fixture below only states what makes it different. */
function makeStep(overrides: Partial<StepExecution> & { nodeId: string }): StepExecution {
  return {
    status: 'completed',
    startedAt: T_START,
    completedAt: T_END,
    durationMs: 412,
    ...overrides,
  };
}

export const Completed: Story = {
  args: {
    stepId: 'trigger-node-1',
    index: 0,
    nodeType: 'trigger',
    nodeConfig: { type: 'trigger', triggerType: 'document.created', label: 'On document created' },
    step: makeStep({
      nodeId: 'trigger-node-1',
      durationMs: 38,
      completedAt: '2026-08-25T14:03:00.038Z',
      output: { documentId: 'doc-8821', title: 'Q3 architecture review' },
    }),
  },
};

// The real reported case: a bedrock-configured `llm` step that died inside the
// claude CLI because no prompt reached stdin. Config, runtime input and the
// verbatim error all have to read well together — this is the state the
// library must not render as a shrug.
export const Failed: Story = {
  args: {
    stepId: 'llm-summarize-2',
    index: 1,
    nodeType: 'llm',
    nodeConfig: {
      provider: 'bedrock',
      model: 'claude-sonnet-4-6',
      systemPrompt: 'Summarize this document',
      userPromptTemplate: '{{context.documentBody}}',
      temperature: 0.3,
      maxTokens: 1024,
      streaming: true,
    },
    step: makeStep({
      nodeId: 'llm-summarize-2',
      status: 'failed',
      startedAt: '2026-08-25T14:03:00.500Z',
      completedAt: '2026-08-25T14:03:02.140Z',
      durationMs: 1640,
      input: {
        context: {
          documentId: 'doc-8821',
          documentBody: '',
          requestedBy: 'connor@example.com',
        },
        attempt: 1,
      },
      error:
        'claude exited 1: Error: Input must be provided either through stdin or as a prompt argument when using --print',
    }),
  },
};

export const Running: Story = {
  args: {
    stepId: 'transform-normalize-3',
    index: 2,
    nodeType: 'transform',
    nodeConfig: { type: 'transform', language: 'jsonata', expression: '$.items[status="open"]' },
    step: {
      nodeId: 'transform-normalize-3',
      status: 'running',
      startedAt: '2026-08-25T14:03:03.000Z',
      input: { items: 128, source: 'doc-8821' },
    },
  },
};

export const LlmWithResponse: Story = {
  args: {
    stepId: 'llm-summarize-4',
    index: 3,
    nodeType: 'llm',
    nodeConfig: {
      provider: 'bedrock',
      model: 'claude-sonnet-4-6',
      systemPrompt: 'Summarize this document in three bullets',
      temperature: 0.2,
      maxTokens: 512,
      streaming: true,
    },
    step: makeStep({
      nodeId: 'llm-summarize-4',
      startedAt: '2026-08-25T14:03:04.000Z',
      completedAt: '2026-08-25T14:03:06.310Z',
      durationMs: 2310,
      llm: {
        prompt:
          'Summarize this document in three bullets.\n\n---\nQ3 architecture review\n\nThe gateway now terminates every realtime session at the cell boundary. Cross-cell fan-out moves to the message bus in Q4.',
        response:
          '• The gateway terminates realtime sessions at the cell boundary.\n• Cross-cell fan-out is deferred to the message bus in Q4.\n• No change is required in the client SDK for either step.',
        tokensIn: 412,
        tokensOut: 96,
        streamOpened: true,
        firstTokenLatencyMs: 268,
      },
    }),
  },
};

const AGENT_TRACE_OUTPUT: AgentStepOutput = {
  text: 'I reviewed the three open incidents. Two are duplicates of INC-4471; the third is a genuine regression in the presence fan-out introduced on 2026-08-19.',
  turns: 4,
  model: 'claude-sonnet-4-6',
  tokensIn: 5820,
  tokensOut: 731,
  stopReason: 'complete',
  toolless: false,
  toolCalls: [
    {
      name: 'search_incidents',
      input: { query: 'presence fan-out', status: 'open' },
      output: { hits: 3 },
      ok: true,
      startedAt: '2026-08-25T14:04:00.200Z',
      endedAt: '2026-08-25T14:04:00.940Z',
    },
    {
      name: 'read_incident',
      input: { id: 'INC-4471' },
      output: { title: 'Presence roster stops updating after reconnect' },
      ok: true,
      startedAt: '2026-08-25T14:04:01.000Z',
      endedAt: '2026-08-25T14:04:01.180Z',
    },
    {
      name: 'query_metrics',
      input: { metric: 'presence.fanout.p95', window: '7d' },
      ok: false,
      startedAt: '2026-08-25T14:04:01.250Z',
      endedAt: '2026-08-25T14:04:04.600Z',
      error: 'metrics backend timed out after 3000ms',
    },
    {
      name: 'read_commit',
      input: { sha: 'bf47c3da' },
      output: { subject: 'presence: batch roster diffs per cell' },
      ok: true,
      startedAt: '2026-08-25T14:04:04.700Z',
      endedAt: '2026-08-25T14:04:05.520Z',
    },
  ],
};

export const AgentTrace: Story = {
  args: {
    stepId: 'agent-triage-5',
    index: 4,
    nodeType: 'agent',
    nodeConfig: {
      type: 'agent',
      model: 'sonnet',
      systemPrompt: 'Triage the open incidents and identify duplicates.',
      allowedTools: ['search_incidents', 'read_incident', 'query_metrics', 'read_commit'],
      maxTurns: 8,
    },
    step: makeStep({
      nodeId: 'agent-triage-5',
      startedAt: '2026-08-25T14:04:00.000Z',
      completedAt: '2026-08-25T14:04:06.100Z',
      durationMs: 6100,
      output: AGENT_TRACE_OUTPUT,
    }),
  },
};

// The loud case: no tools were allowed, so the "agent" was an expensive plain
// completion — AND it hit its turn ceiling, so its text is partial.
const AGENT_TOOLLESS_OUTPUT: AgentStepOutput = {
  text: 'Starting the audit. I will enumerate the affected channels and then check each one against the roster snapshot…',
  turns: 8,
  model: 'claude-sonnet-4-6',
  tokensIn: 9140,
  tokensOut: 2210,
  stopReason: 'max_turns',
  toolless: true,
  toolCalls: [],
};

export const AgentToolless: Story = {
  args: {
    stepId: 'agent-audit-6',
    index: 5,
    nodeType: 'agent',
    nodeConfig: {
      type: 'agent',
      model: 'sonnet',
      systemPrompt: 'Audit every channel roster for drift.',
      allowedTools: [],
      maxTurns: 8,
    },
    step: makeStep({
      nodeId: 'agent-audit-6',
      startedAt: '2026-08-25T14:05:00.000Z',
      completedAt: '2026-08-25T14:05:41.700Z',
      durationMs: 41700,
      output: AGENT_TOOLLESS_OUTPUT,
    }),
  },
};

export const WithActions: Story = {
  args: {
    stepId: 'llm-summarize-2',
    index: 1,
    nodeType: 'llm',
    nodeConfig: {
      provider: 'bedrock',
      model: 'claude-sonnet-4-6',
      systemPrompt: 'Summarize this document',
      temperature: 0.3,
      maxTokens: 1024,
    },
    step: makeStep({
      nodeId: 'llm-summarize-2',
      status: 'failed',
      durationMs: 1640,
      input: { context: { documentId: 'doc-8821' } },
      error: 'claude exited 1: Error: Input must be provided either through stdin or as a prompt argument when using --print',
    }),
    onRetryFromStep: (stepId: string) => console.log('retry from', stepId),
    onResumeFromStep: (stepId: string) => console.log('resume from', stepId),
  },
};
