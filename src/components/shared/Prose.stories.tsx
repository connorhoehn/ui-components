import type { Meta, StoryObj } from '@storybook/react-vite';
import { Prose } from './Prose';

const meta = {
  title: 'Shared/Prose',
  component: Prose,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    tone: {
      control: 'select',
      options: [undefined, 'neutral', 'success', 'warning', 'danger', 'info', 'caution', 'accent'],
    },
  },
} satisfies Meta<typeof Prose>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h1>Pipeline nodes</h1>
        <p>
          A pipeline is a directed graph of nodes. Each node type has its own
          config surface and its own <code>context</code> contract.
        </p>
        <h2>Trigger types</h2>
        <ul>
          <li><code>manual</code> — started by clicking Run in the editor.</li>
          <li><code>schedule</code> — cron expression (e.g. <code>0 9 * * 1-5</code>).</li>
          <li><code>webhook</code> — inbound HTTP POST at the configured path.</li>
        </ul>
        <blockquote>Every pipeline has exactly one trigger.</blockquote>
        <pre><code>{'{ "trigger": "manual", "payload": {} }'}</code></pre>
        <p>
          See <a href="#">the pipelines guide</a> for the full node reference.
        </p>
      </>
    ),
  },
};

/** `size="sm"` — the same markup, tightened for a dense side panel like the
 *  pipelines editor's "Docs" tab (the original hand-rolled
 *  `.pipeline-docs-pane` stylesheet this component replaces). */
export const Compact: Story = {
  args: {
    size: 'sm',
    children: (
      <>
        <h4>What it does</h4>
        <p>Calls an LLM with a prompt template filled from pipeline context.</p>
        <h4>Fields</h4>
        <ul>
          <li><code>provider</code> — <code>anthropic</code> or <code>bedrock</code>.</li>
          <li><code>model</code> — e.g. <code>claude-sonnet-4-6</code>.</li>
        </ul>
      </>
    ),
  },
};

/** `tone` tints headings and links (not body text) — a deprecation notice
 *  or a "what's new" callout inline with regular docs content. */
export const Tones: Story = {
  args: { children: null },
  render: () => (
    <div className="flex flex-col gap-6 w-[28rem]">
      <Prose tone="danger" size="sm">
        <h4>Deprecated in 2.351.0</h4>
        <p>Use <a href="#">the new Prose component</a> instead of a scoped stylesheet.</p>
      </Prose>
      <Prose tone="info" size="sm">
        <h4>New in 2.351.0</h4>
        <p>Bare semantic markup now styles itself from a wrapper, no stylesheet needed.</p>
      </Prose>
    </div>
  ),
};
