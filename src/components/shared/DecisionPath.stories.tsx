import type { Meta, StoryObj } from '@storybook/react-vite';
import { DecisionPath } from './DecisionPath';

const meta: Meta<typeof DecisionPath> = {
  title: 'Shared/DecisionPath',
  component: DecisionPath,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="max-w-[640px] rounded-lg border border-border bg-surface p-3"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof DecisionPath>;

const STEPS = ['Choose', 'Draft request', 'Confirm', 'Done'];

/** The response box is at the choice: nothing complete yet. */
export const Choosing: Story = { args: { steps: STEPS, current: 0 } };

/** Two stages behind, one in hand. */
export const Confirming: Story = { args: { steps: STEPS, current: 2 } };

/** Every step complete: `current` past the end. */
export const Complete: Story = { args: { steps: STEPS, current: 4 } };

/** The alternate branch a choice can take. */
export const SavedBranch: Story = { args: { steps: ['Choose', 'Saved'], current: 1, 'aria-label': 'Save path' } };
