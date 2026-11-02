import type { Meta, StoryObj } from '@storybook/react-vite';
import { WorkflowStepper, type WorkflowStep } from './WorkflowStepper';

const STEPS: WorkflowStep[] = [
  { step: 1, label: 'Intake', done: true, active: false },
  { step: 2, label: 'Classify', done: true, active: false },
  { step: 3, label: 'Score', done: false, active: true },
  { step: 4, label: 'Review', done: false, active: false },
  { step: 5, label: 'Publish', done: false, active: false },
  { step: 6, label: 'Follow-up', done: false, active: false },
];

const meta = {
  title: 'Shared/WorkflowStepper',
  component: WorkflowStepper,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof WorkflowStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { steps: STEPS },
};

export const Small: Story = {
  args: { steps: STEPS, size: 'sm' },
};

export const AllDone: Story = {
  args: { steps: STEPS.map((s) => ({ ...s, done: true, active: false })) },
};

/** Run milestones carry recorded timestamps; a failed run never gets a success check. */
export const RunTiming: Story = {
  args: { size: 'compact', 'aria-label': 'Run timing', steps: [
    { step: 1, label: 'Queued', done: true, active: false, description: 'Nov 2, 2026, 08:00:00' },
    { step: 2, label: 'Claimed', done: true, active: false, description: 'Nov 2, 2026, 08:00:03' },
    { step: 3, label: 'Started', done: true, active: false, description: 'Nov 2, 2026, 08:00:04' },
    { step: 4, label: 'Finished', done: true, active: false, description: 'Nov 2, 2026, 08:02:14' },
  ] },
};
export const FailedRun: Story = {
  args: { ...RunTiming.args, steps: RunTiming.args!.steps!.map(step => step.step === 4
    ? { ...step, label: 'Failed', done: false, active: true, outcome: 'failed' as const } : step) },
};
