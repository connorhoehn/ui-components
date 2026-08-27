import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlinePlaceholder } from './InlinePlaceholder';
import { Button } from '../ui/Button';

const meta = {
  title: 'Shared/InlinePlaceholder',
  component: InlinePlaceholder,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm'] },
    align: { control: 'radio', options: ['start', 'center'] },
    tone: { control: 'radio', options: ['surface', 'code'] },
  },
} satisfies Meta<typeof InlinePlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'No runs yet.' },
};

/** The list case: a filter that matched nothing. Left-aligned so it reads as
 *  a row of the list it replaced, not as a banner. */
export const FilteredList: Story = {
  args: { children: 'nothing matches “kube”' },
  render: () => (
    <div className="w-72 rounded border border-border divide-y divide-border">
      <div className="px-3 py-2 text-sm">Results</div>
      <InlinePlaceholder className="px-3 py-4">nothing matches “kube”</InlinePlaceholder>
    </div>
  ),
};

/** The pane case: the placeholder owns the region, so it centres. `sm` is the
 *  larger of the two scales. */
export const CenteredPane: Story = {
  args: { children: 'this computer is gone', size: 'sm', align: 'center' },
  render: () => (
    <div className="flex h-32 items-center justify-center rounded border border-border">
      <InlinePlaceholder size="sm" align="center">this computer is gone</InlinePlaceholder>
    </div>
  ),
};

/** With an action. One control beside the line — if you want a heading and a
 *  list of next steps, the region is big enough for `EmptyState`. */
export const WithAction: Story = {
  args: { children: 'No computers yet.' },
  render: () => (
    <InlinePlaceholder
      action={<Button size="sm" variant="ghost">+ new computer</Button>}
    >
      No computers yet.
    </InlinePlaceholder>
  ),
};

/** `tone="code"` on a terminal surface — the reason this primitive exists.
 *  Four files in compute/ hand-rolled exactly this line. */
export const CodeTone: Story = {
  args: { children: 'nothing here', tone: 'code' },
  render: () => (
    <div className="flex flex-col gap-4 rounded bg-code-bg p-4 font-mono">
      <InlinePlaceholder tone="code">nothing here</InlinePlaceholder>
      <InlinePlaceholder tone="code">nothing matches “kube”</InlinePlaceholder>
      <InlinePlaceholder
        tone="code"
        size="sm"
        align="center"
        action={<Button tone="code" variant="ghost" size="sm">+ new computer</Button>}
      >
        no computers to lab
      </InlinePlaceholder>
    </div>
  ),
};
