import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConsultCard } from './ConsultCard';

const meta = {
  title: 'Shared/ConsultCard',
  component: ConsultCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
} satisfies Meta<typeof ConsultCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    question: 'The RED dashboard can use span metrics or StatsD counters as its source. Span metrics are richer but lag ~3 minutes. Which should be the default?',
    context: 'Building the Sprint 98 span-metrics dashboards; both sources exist in the cluster.',
    origin: ['observability-platform', 'box-1'],
    askedAt: 'asked 4m ago',
    status: 'pending',
    onAnswer: () => {},
  },
};

export const Answered: Story = {
  args: {
    question: 'Delete the legacy migration or keep it behind a flag?',
    origin: ['payments'],
    status: 'answered',
    answer: 'Keep it behind a flag until the next release train — two services still read that table in staging.',
    answeredBy: 'Nora DaSilva',
    askedAt: 'asked 2h ago',
  },
};

export const Expired: Story = {
  args: {
    question: 'Should the retry budget be per-endpoint or global?',
    origin: ['gateway'],
    status: 'expired',
    askedAt: 'asked yesterday',
  },
};
