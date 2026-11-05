import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CollectionToolbar } from './CollectionToolbar';
import { Button } from '../ui/Button';
import { CollectionPage } from './CollectionPage';
import EmptyState from './EmptyState';

const meta: Meta<typeof CollectionToolbar> = {
  title: 'Shared/CollectionToolbar',
  component: CollectionToolbar,
};
export default meta;
type Story = StoryObj<typeof CollectionToolbar>;

export const Resting: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return <CollectionToolbar label="Submission filters" search={{ value: query, onChange: setQuery, placeholder: 'Search submissions', 'aria-label': 'Search submissions' }} summary="12 of 12 submissions" onRefresh={() => {}} />;
  },
};

/** A selection replaces the resting controls on the same row: the table under it never moves (since 2.442.0). */
export const Selection: Story = {
  render: () => {
    const [count, setCount] = useState(2);
    const [query, setQuery] = useState('');
    return <>
      <CollectionToolbar label="Submission filters" search={{ value: query, onChange: setQuery, placeholder: 'Search submissions', 'aria-label': 'Search submissions' }} summary="12 of 12 submissions"
        selection={{ count, onClear: () => setCount(0), actions: <Button size="sm" variant="danger">Clear selected</Button> }} />
      <Button size="sm" variant="secondary" onClick={() => setCount((n) => n + 1)}>Select another row</Button>
    </>;
  },
};

export const CardCollection: Story = { args: { label: 'Hangouts', layout: 'cards', search: { value: '', onChange: () => {}, placeholder: 'Find a hangout' }, summary: '2 hangouts' } };

/** Search, filters and refresh sit at the trailing end beside the record actions (2.503.0). */
export const QueryAndActions: Story = {
  args: { label: 'Contacts', search: { value: '', onChange: () => {}, placeholder: 'Find a person' }, summary: '16 people', onRefresh: () => {}, actions: [{ id: 'add', label: 'Add contact', icon: '+', onClick: () => {} }] },
};

/** Zero results: no count — the empty state says it (2.503.0). */
export const EmptyCollection: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return <CollectionToolbar label="Artworks" search={{ value: query, onChange: setQuery, placeholder: 'Search artworks' }} summary="0 of 0 artworks" resultCount={0} />;
  },
};

/** `collapsible: false` keeps the open field for a page whose primary task is searching. */
export const OpenSearch: Story = {
  args: { label: 'Directory', search: { value: '', onChange: () => {}, placeholder: 'Search people', collapsible: false }, summary: '16 people' },
};

/** `CollectionPage` hosts a search/filter toolbar in its header actions row, so the page has no search band (2.503.0). */
export const InPageHeader: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    const [kind, setKind] = useState('');
    return <CollectionPage title="Artwork" headerActions={<Button size="sm">Generate artwork</Button>}
      toolbar={{ label: 'Artwork filters', layout: 'cards', search: { value: query, onChange: setQuery, placeholder: 'Search artworks' }, resultCount: 0, summary: '0 artworks',
        filters: [{ id: 'kind', label: 'Kind', value: kind, onChange: setKind, options: [{ value: '', label: 'All kinds' }, { value: 'portrait', label: 'Portrait' }] }] }}>
      <EmptyState title="No artwork yet" description="Generate artwork to start the catalog." />
    </CollectionPage>;
  },
};
