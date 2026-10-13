import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CollectionToolbar } from './CollectionToolbar';
import { Button } from '../ui/Button';

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
