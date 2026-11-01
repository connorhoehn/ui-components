import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewThread } from './ReviewThread';
import { SignoffPanel } from './SignoffPanel';
import { Stack } from '../ui/Stack';

const meta = { title: 'Shared/ReviewThread', component: ReviewThread, parameters: { layout: 'padded' } } satisfies Meta<typeof ReviewThread>;
export default meta;
type Story = StoryObj<typeof meta>;
// Self-contained image fixture keeps the story independent of external image hosts.
const portrait = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="#dbeafe"/><circle cx="32" cy="24" r="13" fill="#475569"/><path d="M8 64a24 24 0 0 1 48 0" fill="#475569"/></svg>')}`;
export const PeopleAndSignoff: Story = {
  args: { variant: 'inline', posts: [
    { id: 'question', authorKind: 'agent', authorName: 'Design assistant', kind: 'question', body: 'Which session expiry window should the migration use?', resolved: true },
    { id: 'answer', authorKind: 'human', authorName: 'Vera Green', avatarUrl: portrait, kind: 'answer', body: 'Use a 60-second window, as required by our controls.' },
  ] },
  render: args => <Stack className="max-w-2xl"><ReviewThread {...args} /><SignoffPanel variant="inline" signoffs={[{ name: 'Vera Green', avatarUrl: portrait, role: 'Owner', decision: 'approve' }]} /></Stack>,
};
