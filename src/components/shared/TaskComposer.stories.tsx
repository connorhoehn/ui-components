import type { Meta, StoryObj } from '@storybook/react-vite';
import { TaskComposer, type ComposerSuggestion } from './TaskComposer';

/**
 * A prompt box with somewhere to start.
 *
 * The two fields are not the interesting part. A bare composer is correct,
 * general, and the least approachable thing on a page: it asks you to already
 * know what to type while the surface around it is full of context the app has
 * and the box does not. The strip above closes that gap without taking the
 * general case away — every card is ignorable and the fields stay free-typed.
 *
 * Choosing a card FILLS the fields; it does not submit. A card that dispatched
 * an agent on one click would make the strip a minefield.
 */
const meta = {
  title: 'Shared/TaskComposer',
  component: TaskComposer,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TaskComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

const money = (usd: number) => <span className="tabular-nums">${usd.toFixed(2)}</span>;

/** Ranked the way a surface should rank them: stalled, then undelivered, then unstarted. */
const SUGGESTIONS: ComposerSuggestion[] = [
  {
    id: 's1',
    label: 'blocked',
    tone: 'danger',
    reason: 'Blocked on Observability Platform',
    title: 'Roll out collector fleet with gateway + agent topology',
    prompt: '"Roll out collector fleet" is blocked. Work out what it is waiting on — read the item, its parent, and any linked change requests, then report the smallest thing that would unblock it. Do not start the implementation.',
    meta: <>8 pts · {money(10.47)}</>,
    context: 'Observability Platform',
  },
  {
    id: 's2',
    label: 'in review',
    tone: 'warning',
    reason: 'Waiting in review on Auth Migration',
    title: 'Multi-window burn-rate alerts (fast + slow burn)',
    prompt: '"Multi-window burn-rate alerts" has been in review. Find the open change request, read the diff and the comments, and summarise what is left before it can merge.',
    meta: <>5 pts · {money(6.32)}</>,
    context: 'Auth Migration',
  },
  {
    id: 's3',
    label: 'next up',
    tone: 'info',
    reason: 'Next up in this sprint on LLM Application Platform',
    title: 'SLO definitions in the service catalog with owners',
    prompt: 'Start "SLO definitions in the service catalog". Read the item and the surrounding code, then propose an approach before writing anything.',
    meta: <>5 pts · {money(5.22)}</>,
    context: 'LLM Application Platform',
  },
];

/** What the Work page shows an SME with initiatives in flight. */
export const WithSuggestions: Story = {
  args: {
    title: 'Queue a job',
    description: 'An idle computer picks it up within ~10 seconds.',
    titlePlaceholder: "Title — e.g. 'Document the Cedar policy migration'",
    promptPlaceholder: 'What should the worker do? It runs as Claude Code in a microVM with a persistent workspace and git.',
    suggestions: SUGGESTIONS,
    hint: 'Runs on the first idle computer · ⌘⏎',
    submitLabel: 'Queue job',
    onSubmit: () => {},
  },
};

/**
 * No suggestions, no shelf. An empty state for an optional nicety is itself
 * noise, so the strip disappears rather than apologising for itself.
 */
export const Bare: Story = {
  args: {
    title: 'Queue a job',
    hint: 'Runs on the first idle computer · ⌘⏎',
    submitLabel: 'Queue job',
    onSubmit: () => {},
  },
};

/** While the host is still working out what to suggest. */
export const Loading: Story = {
  args: { ...Bare.args, suggestionsLoading: true },
};
