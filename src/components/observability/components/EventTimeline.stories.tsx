import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import EventTimeline, { type EventItem } from './EventTimeline';

const events: EventItem[] = [
  {
    id: 'e1',
    timestamp: '10:48:21',
    type: 'pipeline.run.failed',
    summary: 'pipeline.run.failed · run-8801',
    severity: 'error',
    payload: { runId: 'run-8801', error: { code: 'HTTP_502', message: 'bad gateway' } },
  },
  {
    id: 'e2',
    timestamp: '10:48:02',
    type: 'pipeline.step.completed',
    summary: 'pipeline.step.completed · run-8812',
    severity: 'success',
    payload: { runId: 'run-8812', stepId: 'llm:classify', durationMs: 1420 },
  },
  {
    id: 'e3',
    timestamp: '10:47:55',
    type: 'pipeline.approval.awaiting',
    summary: 'pipeline.approval.awaiting · run-8813',
    severity: 'warning',
    payload: { runId: 'run-8813', approvers: ['legal@example.com'] },
  },
  {
    id: 'e4',
    timestamp: '10:47:31',
    type: 'pipeline.run.started',
    summary: 'pipeline.run.started · run-8813',
    severity: 'info',
    payload: { runId: 'run-8813', triggeredBy: 'schedule' },
  },
];

const meta = {
  title: 'Observability/EventTimeline',
  component: EventTimeline,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { events },
  decorators: [
    (Story) => (
      <div className="h-[320px] w-[520px] border border-border rounded-md overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EventTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Populated: Story = {};

/** `live` pins the view to the newest event as the stream appends. */
export const Live: Story = { args: { live: true } };

/** Nothing dispatched yet — the usual first-paint state. */
export const Empty: Story = { args: { events: [] } };

/** Selection is host-owned; the timeline only reports it. */
export const Selectable: Story = {
  render: (args) => {
    const [selectedId, setSelectedId] = useState<string | null>('e2');
    return (
      <EventTimeline {...args} selectedId={selectedId} onSelect={setSelectedId} />
    );
  },
};
