import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ColumnDock, DockedColumn } from './DockedColumn';
import { Input } from '../forms/Input';

// A content column whose page has several sections; the "Recent runs" section
// owns the composer, which docks at the column's bottom and spans it, with
// the section's trailing link and the page's last block above it.

function RecentRuns() {
  const [query, setQuery] = useState('');
  const runs = ['inference-canary-nightly', 'obs-nightly-maintenance', 'auth-dep-watch'].filter(r => r.includes(query));
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold">Recent runs</h3>
      <ul className="text-sm">{runs.map(r => <li key={r} className="py-1">{r}</li>)}</ul>
      <ColumnDock>
        <div className="border-t border-border bg-surface px-4 py-2">
          <Input aria-label="Recent runs command" placeholder="Search runs…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </ColumnDock>
    </section>
  );
}

const meta: Meta<typeof DockedColumn> = { title: 'Layout/DockedColumn', component: DockedColumn };
export default meta;

export const SectionComposerDocked: StoryObj<typeof DockedColumn> = {
  render: () => (
    <div className="flex h-[480px] border border-border">
      <DockedColumn bodyClassName="flex flex-col gap-6 p-6">
        <section className="text-sm">Needs your attention — nothing right now.</section>
        <RecentRuns />
        <a className="text-sm text-primary" href="#findings">5 open findings →</a>
      </DockedColumn>
    </div>
  ),
};
