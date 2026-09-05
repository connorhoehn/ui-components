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
