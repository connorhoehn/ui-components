import type { Meta, StoryObj } from '@storybook/react-vite';
import ActiveRunsTable, { type ActiveRunRow } from './ActiveRunsTable';

const runs: ActiveRunRow[] = [
  {
    pipelineId: 'pl-invoice',
    pipelineName: 'Invoice extraction',
    runId: 'run-8812',
    currentStep: 'llm:classify',
    ownerNode: 'node-0',
    elapsed: '00:01:42',
    status: 'running',
  },
  {
    pipelineId: 'pl-onboarding',
    pipelineName: 'Customer onboarding',
    runId: 'run-8813',
    currentStep: 'approval:legal',
    ownerNode: 'node-1',
    elapsed: '00:12:07',
    status: 'awaiting_approval',
  },
  {
    pipelineId: 'pl-nightly',
    pipelineName: 'Nightly reindex',
    runId: 'run-8809',
    currentStep: 'image:upscale',
    ownerNode: 'node-2',
    elapsed: '01:04:55',
    status: 'running',
  },
  {
    pipelineId: 'pl-invoice',
    pipelineName: 'Invoice extraction',
    runId: 'run-8801',
    currentStep: 'http:post',
    ownerNode: 'node-0',
    elapsed: '00:00:09',
    status: 'retrying',
  },
];

const meta = {
  title: 'Observability/ActiveRunsTable',
  component: ActiveRunsTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { runs },
} satisfies Meta<typeof ActiveRunsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Read-only: rows are inert until the host wires `onRowClick`. */
export const ReadOnly: Story = {};

/** Rows become activatable by click, Enter, or Space. */
export const Navigable: Story = {
  args: { onRowClick: () => {} },
};

/**
 * With `onCancelRun` a per-row cancel control appears; it stops propagation so
 * cancelling never also navigates.
 */
export const Cancellable: Story = {
  args: { onRowClick: () => {}, onCancelRun: () => {} },
};

/** Idle cluster. */
export const Empty: Story = { args: { runs: [] } };

/** One long-running job — the common "why is this stuck" view. */
export const SingleStuckRun: Story = {
  args: {
    runs: [{ ...runs[1], elapsed: '04:31:18' }],
    onRowClick: () => {},
    onCancelRun: () => {},
  },
};
