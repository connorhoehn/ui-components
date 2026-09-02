// StepTree lays a run's steps out as a thread. Every row is a collapsed
// StepThread — click one to see the step detail these stories feed it.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepTree } from './StepTree';
import { PipelineEditorServicesProvider } from '../services/PipelineEditorServicesContext';
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

// ── An image run, as an operator actually meets it ──────────────────────────
//
// The whole point of a run view: every artifact the run produced is reachable
// from the step that made it, and a step that had to retry says so instead of
// looking like a clean first-try success.
//
// Thumbnails need the host to resolve an imageId to a URL, so the tree is
// wrapped in <PipelineEditorServicesProvider>. A host that forgets it gets a
// panel with no artifacts and no error — which is why this story exists.
function swatch(label: string, bg: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="192">` +
    `<rect width="256" height="192" fill="${bg}"/>` +
    `<text x="128" y="100" font-family="monospace" font-size="18" fill="#fff" ` +
    `text-anchor="middle">${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const SWATCHES: Record<string, string> = {
  'img-src-1': swatch('source', '#475569'),
  'img-crop-2': swatch('crop', '#0f766e'),
  'img-up-3': swatch('upscale', '#7c3aed'),
  'img-wm-4': swatch('watermark', '#b45309'),
};

export const ArtifactsAndRetries: Story = {
  name: 'Artifacts + retries',
  decorators: [
    (Story) => (
      <PipelineEditorServicesProvider
        services={{ getImageUrl: (id: string) => SWATCHES[id] ?? swatch('missing', '#b91c1c') }}
      >
        <Story />
      </PipelineEditorServicesProvider>
    ),
  ],
  args: {
    onArtifactClick: (imageId: string) => {
      // eslint-disable-next-line no-console
      console.log('[story] open artifact', imageId);
    },
    steps: {
      'image-source-1': {
        ...completed('image-source-1', '2026-08-25T14:03:00.000Z', 120),
        images: [{ imageId: 'img-src-1', width: 2048, height: 1536, mimeType: 'image/jpeg' }],
      },
      'image-crop-2': {
        ...completed('image-crop-2', '2026-08-25T14:03:00.200Z', 340),
        images: [
          {
            imageId: 'img-crop-2',
            width: 1024,
            height: 1024,
            mimeType: 'image/jpeg',
            bbox: { x: 512, y: 256, width: 1024, height: 1024 },
          },
        ],
      },
      // Throttled twice by the upscaler before it went through.
      'image-upscale-3': {
        ...completed('image-upscale-3', '2026-08-25T14:03:00.600Z', 9120),
        images: [{ imageId: 'img-up-3', width: 4096, height: 4096, mimeType: 'image/png' }],
        attempts: [
          {
            attemptNumber: 1,
            startedAt: '2026-08-25T14:03:00.600Z',
            durationMs: 2400,
            error: 'upscaler returned 429: capacity exhausted',
            errorCategory: 'NetworkError',
            retryAfterMs: 2000,
            idempotencyKey: 'run-88:image-upscale-3:1',
          },
          {
            attemptNumber: 2,
            startedAt: '2026-08-25T14:03:05.000Z',
            durationMs: 2600,
            error: 'upscaler returned 429: capacity exhausted',
            errorCategory: 'NetworkError',
            retryAfterMs: 4000,
            idempotencyKey: 'run-88:image-upscale-3:2',
          },
          {
            attemptNumber: 3,
            startedAt: '2026-08-25T14:03:09.600Z',
            durationMs: 4120,
            idempotencyKey: 'run-88:image-upscale-3:3',
          },
        ],
      },
      'image-watermark-4': {
        ...completed('image-watermark-4', '2026-08-25T14:03:09.800Z', 210),
        images: [{ imageId: 'img-wm-4', width: 4096, height: 4096, mimeType: 'image/png' }],
      },
    },
    nodeDataMap: {
      'image-source-1': node('image:source' as NodeType, { label: 'Upload' }),
      'image-crop-2': node('image:crop' as NodeType, { strategy: 'attention', aspectRatio: '1:1' }),
      'image-upscale-3': node('image:upscale' as NodeType, { scale: 4, model: 'real-esrgan' }),
      'image-watermark-4': node('image:watermark' as NodeType, { text: '© example', position: 'br' }),
    },
  },
};
