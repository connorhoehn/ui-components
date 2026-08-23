import type { Meta, StoryObj } from '@storybook/react-vite';
import { SummaryPanel } from './SummaryPanel';

// SummaryPanel shares TranscriptPanel's status vocabulary but is
// markdown-renderer-agnostic: without a `renderMarkdown` slot it falls back to
// a readable <pre>, which is what the Ready story below shows.

const MARKDOWN = `## Decisions

- Ship the schema change behind \`migration_v2\` and drop the flag Friday.
- Keep the p99 dashboard open until the backfill drains.

## Action items

1. **Bob** — confirm the overnight backfill completed.
2. **Cai** — file a follow-up if p99 moves more than 10ms.
3. **Alice** — send the summary to #product-design.
`;

const meta = {
  title: 'Video/SummaryPanel',
  component: SummaryPanel,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-[520px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SummaryPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No summary was requested for this recording. */
export const Idle: Story = {
  args: { status: 'idle' },
};

/** Summarisation runs after transcription finishes. */
export const Processing: Story = {
  args: { status: 'processing' },
};

/** Failure state with the upstream message. */
export const Failed: Story = {
  args: { status: 'failed', errorMessage: 'LLM summariser returned a 429 after 3 retries.' },
};

/** Ready with no renderer supplied — raw markdown in a wrapped `<pre>`. */
export const ReadyRawMarkdown: Story = {
  args: { status: 'ready', markdown: MARKDOWN },
};

/** Ready with a caller-supplied renderer. This is the intended usage: reuse
 *  whatever markdown renderer the host app already ships. */
export const ReadyWithRenderer: Story = {
  args: {
    status: 'ready',
    markdown: MARKDOWN,
    renderMarkdown: (md) => (
      <div className="flex flex-col gap-2">
        {md.split('\n').filter(Boolean).map((line, i) =>
          line.startsWith('## ') ? (
            <h3 key={i} className="text-sm font-semibold text-text-primary mt-2">
              {line.slice(3)}
            </h3>
          ) : (
            <p key={i} className="text-sm text-text-secondary">
              {line.replace(/^[-*]\s|^\d+\.\s/, '• ')}
            </p>
          ),
        )}
      </div>
    ),
  },
};

/** The job finished but produced nothing — e.g. a 4-second recording. */
export const ReadyButEmpty: Story = {
  args: { status: 'ready', markdown: '   ' },
};
