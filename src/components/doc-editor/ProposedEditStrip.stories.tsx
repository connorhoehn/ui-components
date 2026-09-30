import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ProposedEditStrip, type ProposedEdit } from './ProposedEditStrip';

const meta = {
  title: 'DocEditor/ProposedEditStrip',
  component: ProposedEditStrip,
  tags: ['autodocs'],
} satisfies Meta<typeof ProposedEditStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

const ONE: ProposedEdit = {
  id: 'scope',
  kind: 'replace',
  anchor: { from: 12, to: 64 },
  content: { text: 'The assessment covers five practices, scored against the published rubric.' },
  summary: 'Tightens the scope sentence',
  status: 'ready',
};

function Live({ initial }: { initial: ProposedEdit[] }) {
  const [edits, setEdits] = useState(initial);
  const set = (id: string, status: ProposedEdit['status']) => setEdits((all) => all.map((e) => (e.id === id ? { ...e, status } : e)));
  return (
    <div className="max-w-2xl">
      <ProposedEditStrip
        proposals={edits}
        onApply={(id) => set(id, 'applied')}
        onDiscard={(id) => set(id, 'discarded')}
        onRevise={(id) => set(id, 'streaming')}
        onApplyAll={() => setEdits((all) => all.map((e) => (e.status === 'ready' ? { ...e, status: 'applied' } : e)))}
        onDiscardAll={() => setEdits((all) => all.map((e) => ({ ...e, status: 'discarded' })))}
      />
    </div>
  );
}

/** One ready proposal replacing the selection. */
export const Ready: Story = {
  args: { proposals: [ONE], onApply: () => {}, onDiscard: () => {} },
  render: () => <Live initial={[ONE]} />,
};

/** The reply is still arriving: the thinking affordance, Apply off, Cancel on. */
export const Streaming: Story = {
  args: { proposals: [{ ...ONE, status: 'streaming', content: { text: 'The assessment covers' } }], onApply: () => {}, onDiscard: () => {} },
};

/** Two proposals: counted heading, Apply all / Discard all. */
export const Several: Story = {
  args: { proposals: [ONE], onApply: () => {}, onDiscard: () => {} },
  render: () => <Live initial={[ONE, { id: 'next', kind: 'insert', anchor: 'cursor', content: { html: '<p>Next steps: confirm owners by Friday.</p>' }, status: 'ready' }]} />,
};
