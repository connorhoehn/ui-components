import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Disclosure } from './Disclosure';

const meta = {
  title: 'UI/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    tone: {
      control: 'select',
      options: [undefined, 'neutral', 'success', 'warning', 'danger', 'info', 'caution', 'accent'],
    },
    density: {
      control: 'select',
      options: ['default', 'compact'],
    },
    variant: {
      control: 'select',
      options: ['default', 'plain'],
    },
  },
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    summary: 'What happens if I delete this?',
    children: 'The run and every attached artifact are removed permanently. This cannot be undone.',
  },
};

/** `density="compact"` tightens padding, drops to `text-xs`, and shrinks
 *  the chevron — for a disclosure nested inside an already-dense panel. */
export const Compact: Story = {
  args: {
    summary: 'Raw payload',
    density: 'compact',
    children: '{"status":"ok","latencyMs":42}',
  },
};

/** `variant="plain"` drops the outer border and the summary tint — just the
 *  summary row and body, for a borderless toggle inside a list where the
 *  row already has its own separator. Composable with `density="compact"`. */
export const Plain: Story = {
  args: { summary: null, children: null },
  render: () => (
    <div className="flex flex-col divide-y divide-border w-96 border border-border rounded-md">
      <Disclosure variant="plain" summary="Item one" density="compact">
        Row content, no card chrome of its own.
      </Disclosure>
      <Disclosure variant="plain" summary="Item two" density="compact">
        Second row.
      </Disclosure>
    </div>
  ),
};

export const OpenByDefault: Story = {
  args: {
    summary: 'Advanced settings',
    defaultOpen: true,
    children: 'Uncontrolled — starts open, then owns its own state.',
  },
};

export const Tones: Story = {
  args: { summary: null, children: null },
  render: () => (
    <div className="flex flex-col gap-2 w-96">
      <Disclosure summary="Neutral" tone="neutral">Default admonition tone.</Disclosure>
      <Disclosure summary="Info: rollout in progress" tone="info">50% of traffic is on the new pipeline.</Disclosure>
      <Disclosure summary="Warning: quota near limit" tone="warning">You're at 92% of the monthly budget.</Disclosure>
      <Disclosure summary="Danger: this will delete data" tone="danger">Every attached artifact is removed permanently.</Disclosure>
      <Disclosure summary="Success: migration complete" tone="success">All 1,204 rows migrated with zero errors.</Disclosure>
    </div>
  ),
};

/** `summary` takes any node, not just text — useful for a status pill or count
 *  next to the label. */
export const RichSummary: Story = {
  args: {
    summary: (
      <span className="flex w-full items-center justify-between">
        <span>Failed steps (3)</span>
        <span className="rounded-full bg-danger-bg px-2 py-0.5 text-[11px] font-medium text-danger-fg">3</span>
      </span>
    ),
    children: 'step-4, step-7 and step-9 failed with a timeout.',
  },
};

/** Controlled from the host — a "collapse all" button elsewhere in the page
 *  can flip every instance's `open` prop directly. */
export const Controlled: Story = {
  args: { summary: null, children: null },
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <div className="flex flex-col gap-2 w-96">
          <button
            type="button"
            className="self-start rounded-md border border-border bg-surface px-3 py-1.5 text-xs"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Collapse' : 'Expand'} from outside
          </button>
          <Disclosure summary="Controlled panel" open={open} onToggle={setOpen}>
            Its `open` prop is the source of truth — the button above and the
            summary row both drive the same state.
          </Disclosure>
        </div>
      );
    }
    return <Demo />;
  },
};
