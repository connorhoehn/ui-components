import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentList, type CommentListItem } from './CommentList';

const NOW = Date.parse('2026-09-23T12:00:00Z');
const DAY = 86_400_000;
const COMMENTS: CommentListItem[] = [
  { id: 'n1', author: { id: 'nd', name: 'Nora DaSilva' }, role: 'PM', createdAt: NOW - 2 * DAY, text: 'Start with low-risk services after the collector rollout.' },
  { id: 'n2', author: { id: 'eg', name: 'Eli Garcia' }, role: 'Architect', createdAt: NOW - DAY, text: 'Keep the bridge available until dashboard parity is verified.' },
];

const meta = {
  title: 'Work/CommentList',
  component: CommentList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(S) => <div className="max-w-[640px]"><S /></div>],
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { first: true, comments: COMMENTS, now: NOW, total: 3, onViewAll: () => {} } };

/** No role on the profile: the role is left out, not filled in. */
export const NoRole: Story = {
  args: { first: true, now: NOW, comments: [{ ...COMMENTS[0], role: null }] },
};
export const Empty: Story = { args: { first: true, comments: [], onViewAll: () => {} } };
export const Dark: Story = {
  args: { first: true, comments: COMMENTS, now: NOW, total: 3, onViewAll: () => {} },
  decorators: [(S) => <div data-theme="dark" className="bg-surface p-4"><S /></div>],
};
