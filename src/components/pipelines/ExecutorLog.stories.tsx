// ExecutorLog owns its data. Its entire prop surface is `pipelineId`,
// `runId` and an optional `onStepClick`: the rows come from
// `usePipelineRunAuditLog`, which fetches `/api/pipelines/:id/runs/:runId/audit`
// directly and subscribes to `EventStreamContext`. There is no rows prop, no
// injectable fetcher and no service seam, so no combination of props can put
// audit rows on screen — the only honest story is the one below, which shows
// what the component really does in Storybook: no backend, so no rows.
//
// The provider IS required (useEventStreamContext throws without one), but it
// is a pure in-memory dispatcher with no socket, which is exactly what it is
// documented to be used for in Storybook. That is a real dependency being
// satisfied honestly, not a faked network layer.

import type { Meta, StoryObj } from '@storybook/react-vite';
import ExecutorLog from './ExecutorLog';
import { EventStreamProvider } from './context/EventStreamContext';

const meta = {
  title: 'Pipelines/Steps/ExecutorLog',
  component: ExecutorLog,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <EventStreamProvider>
        <div className="flex flex-col h-[520px] w-[880px] max-w-full">
          <Story />
        </div>
      </EventStreamProvider>
    ),
  ],
} satisfies Meta<typeof ExecutorLog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The filter bar, live indicator, empty state and footer with no audit API
 * behind them. The `/api/.../audit` request fails in Storybook, so the hook
 * reports an error: the "Live" dot greys out and the timeline shows the
 * pre-2026-05-07 empty-state copy. Every control is still interactive —
 * chips, actor filter and time presets all toggle against an empty set.
 */
export const NoBackend: Story = {
  args: {
    pipelineId: 'pl-architecture-review',
    runId: 'run-7f3c1a9e',
    onStepClick: (stepId: string) => console.log('step clicked:', stepId),
  },
};
