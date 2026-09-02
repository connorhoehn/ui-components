// Every StepThread story renders COLLAPSED first — that is the component's
// default state. The interesting surface (execution timeline, node config,
// runtime input, resolved prompt, response / agent waterfall, token usage,
// error block, footer actions) only appears in the expanded panel, so click
// the step row in each story to see what the story is actually about.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepThread } from './StepThread';
import { PipelineEditorServicesProvider } from '../services/PipelineEditorServicesContext';
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

// ── Produced artifacts ──────────────────────────────────────────────────────
//
// A step that emitted `pipeline:step:image:produced` events carries thumbnails
// of what it made, and each one is a link through to the full artifact.
//
// Resolving an imageId to a URL is the HOST's job — the library has no idea
// where your assets live — so this section only renders inside a
// <PipelineEditorServicesProvider>. That is exactly why no other story here
// shows it, and why a run-detail page that forgets the provider silently has
// no thumbnails. The fixture below resolves to inline SVG so the story works
// with no server behind it.
function swatch(label: string, bg: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="192">` +
    `<rect width="256" height="192" fill="${bg}"/>` +
    `<text x="128" y="100" font-family="monospace" font-size="20" fill="#fff" ` +
    `text-anchor="middle">${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const ARTIFACT_URLS: Record<string, string> = {
  'img-source-01': swatch('source', '#475569'),
  'img-crop-02': swatch('crop', '#0f766e'),
  'img-upscale-03': swatch('upscale', '#7c3aed'),
};

export const ProducedArtifacts: Story = {
  name: 'Produced artifacts (clickable)',
  decorators: [
    (Story) => (
      <PipelineEditorServicesProvider
        services={{ getImageUrl: (id: string) => ARTIFACT_URLS[id] ?? swatch('missing', '#b91c1c') }}
      >
        <Story />
      </PipelineEditorServicesProvider>
    ),
  ],
  args: {
    stepId: 'image-crop-7',
    index: 3,
    nodeType: 'image:crop',
    nodeConfig: { type: 'image:crop', strategy: 'attention', aspectRatio: '1:1' },
    step: makeStep({
      nodeId: 'image-crop-7',
      durationMs: 1840,
      images: [
        { imageId: 'img-source-01', width: 2048, height: 1536, mimeType: 'image/jpeg' },
        {
          imageId: 'img-crop-02',
          width: 1024,
          height: 1024,
          mimeType: 'image/jpeg',
          bbox: { x: 512, y: 256, width: 1024, height: 1024 },
        },
        { imageId: 'img-upscale-03', width: 4096, height: 4096, mimeType: 'image/png' },
      ],
      output: { imageId: 'img-upscale-03', bytes: 8_412_204 },
    }),
  },
};

export const ProducedArtifactsWithHostRoute: Story = {
  name: 'Produced artifacts (host handles the click)',
  decorators: ProducedArtifacts.decorators,
  args: {
    ...ProducedArtifacts.args,
    // With onArtifactClick the thumbnail becomes a button and the host routes
    // wherever it keeps artifacts — its lineage graph, an asset page. Without
    // it (the story above) the thumbnail is a plain link to the resolved URL,
    // so an artifact is always reachable even from a host that wired nothing.
    onArtifactClick: (imageId: string) => {
      // eslint-disable-next-line no-console
      console.log('[story] navigate to artifact', imageId);
    },
  },
};

// ── Retries ─────────────────────────────────────────────────────────────────
//
// A step that eventually succeeded looks identical to one that worked first
// time — same green chip, same duration — unless the retry history is shown.
// The collapsed row carries an ×N badge; the panel carries the per-attempt
// record, including WHY each failure happened and how long the backoff was.
export const RetriedThenSucceeded: Story = {
  name: 'Retried, then succeeded',
  args: {
    stepId: 'llm-summarize-2',
    index: 1,
    nodeType: 'llm',
    nodeConfig: { type: 'llm', provider: 'bedrock', model: 'claude-sonnet-4-6' },
    step: makeStep({
      nodeId: 'llm-summarize-2',
      durationMs: 9120,
      output: { response: 'A three-sentence summary of the document.' },
      attempts: [
        {
          attemptNumber: 1,
          startedAt: '2026-08-25T14:03:00.000Z',
          completedAt: '2026-08-25T14:03:02.400Z',
          durationMs: 2400,
          error: 'upstream connect error: connection timed out',
          errorCategory: 'TimeoutError',
          retryAfterMs: 2000,
          idempotencyKey: 'run-88:llm-summarize-2:1',
        },
        {
          attemptNumber: 2,
          startedAt: '2026-08-25T14:03:04.400Z',
          completedAt: '2026-08-25T14:03:05.100Z',
          durationMs: 700,
          error: 'bedrock returned 429 ThrottlingException',
          errorCategory: 'LLMError',
          retryAfterMs: 4000,
          idempotencyKey: 'run-88:llm-summarize-2:2',
        },
        {
          attemptNumber: 3,
          startedAt: '2026-08-25T14:03:09.100Z',
          completedAt: '2026-08-25T14:03:09.120Z',
          durationMs: 2020,
          idempotencyKey: 'run-88:llm-summarize-2:3',
        },
      ],
    }),
  },
};

export const RetriesExhausted: Story = {
  name: 'Retries exhausted',
  args: {
    ...RetriedThenSucceeded.args,
    step: makeStep({
      nodeId: 'llm-summarize-2',
      status: 'failed',
      durationMs: 7300,
      error: 'bedrock returned 429 ThrottlingException',
      attempts: [
        {
          attemptNumber: 1,
          startedAt: '2026-08-25T14:03:00.000Z',
          durationMs: 2400,
          error: 'bedrock returned 429 ThrottlingException',
          errorCategory: 'LLMError',
          retryAfterMs: 2000,
          idempotencyKey: 'run-91:llm-summarize-2:1',
        },
        {
          attemptNumber: 2,
          startedAt: '2026-08-25T14:03:04.400Z',
          durationMs: 2400,
          error: 'bedrock returned 429 ThrottlingException',
          errorCategory: 'LLMError',
          retryAfterMs: 4000,
          idempotencyKey: 'run-91:llm-summarize-2:2',
        },
        {
          attemptNumber: 3,
          startedAt: '2026-08-25T14:03:10.800Z',
          durationMs: 2500,
          error: 'bedrock returned 429 ThrottlingException',
          errorCategory: 'LLMError',
          idempotencyKey: 'run-91:llm-summarize-2:3',
        },
      ],
    }),
  },
};
