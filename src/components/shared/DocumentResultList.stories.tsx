import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DocumentResultList, type DocumentResultItem } from './DocumentResultList';
import { CallPresenceIndicator } from '../hangout/CallPresenceIndicator';

// The Documents page's result rows. 2.394.0 adds a trailing slot per row
// (`rowTrailing` / `item.trailing`): here the document with a live call shows
// `CallPresenceIndicator`, and the row height does not change.

const NOW = Date.parse('2026-09-25T12:00:00Z');
const ITEMS: DocumentResultItem[] = [
  { id: 'auth', title: 'Auth architecture', kind: 'page', summary: 'How the gateway verifies tokens, where sessions end, and what the migration changes.', folder: 'Auth migration', updatedAt: NOW - 86_400_000 },
  { id: 'brief', title: 'Migration brief', kind: 'page', summary: 'What moves, in what order, and who signs off.', folder: 'Auth migration', updatedAt: NOW - 3 * 3_600_000, attached: true },
  { id: 'q3', title: 'Q3 planning deck', kind: 'presentation', summary: 'Goals, risks and the release train.', folder: 'Sprint planning', updatedAt: NOW - 5 * 86_400_000 },
];

const IN_CALL = [
  { userId: 'dev-connor', name: 'Connor Hoehn' },
  { userId: 'dev-alice', name: 'Alice Chen' },
  { userId: 'dev-frank', name: 'Frank Davis' },
];

function Scene() {
  const [current, setCurrent] = useState<string | null>('auth');
  const [items, setItems] = useState(ITEMS);
  return (
    <div className="w-[820px] bg-surface">
      <DocumentResultList
        items={items}
        currentId={current}
        onCurrentChange={setCurrent}
        onOpen={(i) => setCurrent(i.id)}
        onToggleAttach={(i) => setItems((all) => all.map((x) => (x.id === i.id ? { ...x, attached: !x.attached } : x)))}
        rowTrailing={(i) => (i.id === 'auth' ? <CallPresenceIndicator participants={IN_CALL} count={3} label={i.title} onClick={() => {}} /> : null)}
        rowMenu={() => [{ items: [{ label: 'Rename' }, { label: 'Move to trash', danger: true }] }]}
        now={NOW}
      />
    </div>
  );
}

const meta = {
  title: 'Shared/DocumentResultList',
  component: DocumentResultList,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DocumentResultList>;
export default meta;
type Story = StoryObj<typeof meta>;
const args = { items: ITEMS, onOpen: () => {} };

/** "Auth architecture" has a live call: the presence indicator sits at the row's right. */
export const RowInACall: Story = { args, render: () => <Scene /> };
export const RowInACallDark: Story = {
  args,
  render: () => (
    <div data-theme="dark" className="inline-block bg-surface p-4">
      <Scene />
    </div>
  ),
};
