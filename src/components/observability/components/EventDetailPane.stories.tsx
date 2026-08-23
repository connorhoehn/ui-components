import type { Meta, StoryObj } from '@storybook/react-vite';
import EventDetailPane from './EventDetailPane';
import type { EventItem } from './EventTimeline';

const failure: EventItem = {
  id: 'e1',
  timestamp: '10:48:21',
  type: 'pipeline.run.failed',
  summary: 'pipeline.run.failed · run-8801',
  severity: 'error',
  payload: {
    runId: 'run-8801',
    pipelineId: 'pl-invoice',
    stepId: 'http:post',
    attempt: 3,
    error: { code: 'HTTP_502', message: 'bad gateway from upstream' },
    at: '2026-08-16T10:48:21.114Z',
  },
};

const meta = {
  title: 'Observability/EventDetailPane',
  component: EventDetailPane,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { event: failure },
  decorators: [
    (Story) => (
      <div className="w-[420px] border border-border rounded-md overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EventDetailPane>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Payload is pretty-printed JSON — this is the debugging surface. */
export const FailureEvent: Story = {};

export const SuccessEvent: Story = {
  args: {
    event: {
      id: 'e2',
      timestamp: '10:48:02',
      type: 'pipeline.step.completed',
      summary: 'pipeline.step.completed · run-8812',
      severity: 'success',
      payload: { runId: 'run-8812', stepId: 'llm:classify', durationMs: 1420 },
    },
  },
};

/** Nothing selected in the timeline. */
export const NoSelection: Story = { args: { event: null } };

/** An event that arrived without a payload still renders its header. */
export const NoPayload: Story = {
  args: {
    event: {
      id: 'e5',
      timestamp: '10:45:00',
      type: 'cluster.heartbeat',
      summary: 'cluster.heartbeat',
      severity: 'info',
    },
  },
};
