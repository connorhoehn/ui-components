import type { Meta, StoryObj } from '@storybook/react-vite';
import { WorkflowStepper, type WorkflowStep } from './WorkflowStepper';
import { Button } from '../ui/Button';

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

/**
 * Vertical (2.512.0): the stages as a timeline down the page — each a row
 * with its marker, its one fact and, on the active step, its action.
 */
export const VerticalWithFactsAndAnAction: Story = {
  name: 'Vertical with facts and an action',
  args: {
    orientation: 'vertical',
    'aria-label': 'Production stages',
    steps: [
      { step: 1, label: 'Show', done: true, active: false, description: 'The Little Shop' },
      { step: 2, label: 'Lead', done: true, active: false, description: 'Mina (proposed)' },
      { step: 3, label: 'Artwork', done: false, active: true, description: 'No approved concept yet',
        action: <Button variant="primary" size="sm">Draw Mina</Button> },
      { step: 4, label: 'Locations', done: false, active: false, description: '0 of 2 drawn' },
      { step: 5, label: 'Episodes', done: false, active: false },
    ],
  },
};
