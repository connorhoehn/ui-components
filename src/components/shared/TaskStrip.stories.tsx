import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TaskStrip } from './TaskStrip';
import type { AgentTaskStatus } from './TaskStrip';

const meta = {
  title: 'Shared/TaskStrip',
  component: TaskStrip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
} satisfies Meta<typeof TaskStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** What a deck revise can honestly show today: the phase, no percentage. */
export const PhaseOnly: Story = {
  args: { label: 'Creating release-readiness deck', status: 'running', phase: 'Editing slide 4', onStop: () => {}, onDismiss: () => {} },
};

/** Only when the run reports real progress does a bar appear. */
export const WithRealPercent: Story = {
  args: { label: 'Creating release-readiness deck', status: 'running', percent: 45, onPause: () => {}, onDismiss: () => {} },
};

export const Failed: Story = {
  args: { label: 'Build risk outlook slide', status: 'failed', phase: 'Timed out after 45 s', onOpen: () => {}, onDismiss: () => {} },
};

/** Pause and Resume swap in place; neither renders without a handler. */
export const PauseAndResume: Story = {
  args: { label: 'Build risk outlook slide', status: 'running' },
  render: () => {
    const [status, setStatus] = useState<AgentTaskStatus>('running');
    return (
      <TaskStrip
        label="Build risk outlook slide"
        status={status}
        phase={status === 'paused' ? 'Paused' : 'Drafting the changes'}
        onPause={() => setStatus('paused')}
        onResume={() => setStatus('running')}
        onStop={() => setStatus('stopped')}
        onOpen={() => {}}
      />
    );
  },
};
