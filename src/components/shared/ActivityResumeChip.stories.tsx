import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActivityResumeChip } from './ActivityResumeChip';
const meta = { title: 'Shared/ActivityResumeChip', component: ActivityResumeChip, tags: ['autodocs'], parameters: { layout: 'centered' } } satisfies Meta<typeof ActivityResumeChip>;
export default meta;
type Story = StoryObj<typeof meta>;
/** The page's last workflow; a click re-populates its prompt deck. */
export const Completed: Story = { args: { label: 'Create artwork', status: 'Completed', tone: 'success', at: Date.now() - 120_000, onResume: () => {} } };
export const WaitingForReview: Story = { args: { label: 'Create artwork', status: 'Waiting for review', tone: 'warning', at: Date.now() - 30_000, onResume: () => {} } };
