import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FilterBand } from './FilterBand';
import { Button } from '../ui/Button';

const EPISODES = [{ value: 'ep11', label: 'Ep 11' }, { value: 'ep17', label: 'Ep 17' }];
const RATES = [{ value: 'animatic', label: 'Animatic' }, { value: 'preview', label: 'Preview on 3\'s' }, { value: 'final', label: 'Final on 1\'s' }];
const WHERE = [{ value: 'mac', label: 'This Mac' }, { value: 'vast', label: 'Vast.ai' }];
const STATUS = [{ value: 'waiting', label: 'Waiting for review' }, { value: 'cancelled', label: 'Cancelled' }];

function RendersBand({ withAction = false }: { withAction?: boolean }) {
  const empty = { q: '', episode: '', rate: '', where: '', status: '' };
  const [draft, setDraft] = useState(empty);
  const [applied, setApplied] = useState(empty);
  const set = (key: keyof typeof empty) => (value: string) => setDraft((d) => ({ ...d, [key]: value }));
  const active = Object.values(applied).filter(Boolean).length;
  return (
    <FilterBand
      fields={[
        { id: 'q', label: 'Render', value: draft.q, onChange: set('q'), placeholder: 'Render…' },
        { id: 'episode', label: 'Episode', value: draft.episode, onChange: set('episode'), options: EPISODES },
        { id: 'rate', label: 'Rate', value: draft.rate, onChange: set('rate'), options: RATES },
        { id: 'where', label: 'Where', value: draft.where, onChange: set('where'), options: WHERE },
        { id: 'status', label: 'Status', value: draft.status, onChange: set('status'), options: STATUS },
      ]}
      onFilter={() => setApplied(draft)}
      onReset={() => { setDraft(empty); setApplied(empty); }}
      actions={withAction ? <Button size="sm" variant="ghost">Cancel selected</Button> : undefined}
      summary={active ? `${active} filters · 7 runs` : '19 runs · 4 waiting for you'}
    />
  );
}

const meta = {
  title: 'Shared/FilterBand',
  component: FilterBand,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FilterBand>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The band over a list page's table: labelled fields, Filter, Reset and a count at the right. */
export const Renders: Story = { render: () => <RendersBand /> } as unknown as Story;

/** An extra (bulk) action after Reset. */
export const WithAction: Story = { render: () => <RendersBand withAction /> } as unknown as Story;

/** Wraps onto a second line at a narrow width. */
export const Narrow: Story = { render: () => <div className="max-w-sm"><RendersBand /></div> } as unknown as Story;
