// 2.432.0: the shelf as one bar, the find field behind a search button, and
// sections the reader can arrange around Direct messages and Channels.
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import { ConversationRail, arrangeRailSections } from '../ConversationRail';
import type { ConversationItem } from '../ConversationList';

afterEach(cleanup);

const channel = (name: string): ConversationItem => ({ channel: name, kind: 'channel', name, peers: [] });
const dm = (userId: string, displayName: string): ConversationItem => ({ channel: `chat:dm:${userId}`, kind: 'dm', peers: [{ userId, displayName }] });
const SHELF = [
  { id: 'activity', label: 'Activity', icon: 'A', count: 2 },
  { id: 'mentions', label: 'Mentions', icon: '@', count: 3, urgent: true },
  { id: 'calls', label: 'Calls', icon: 'C' },
];

describe('shelfLayout="bar"', () => {
  it('draws the destinations as one row of named icon buttons with counts', () => {
    const onSelect = vi.fn();
    render(<ConversationRail shelf={SHELF} shelfLayout="bar" conversations={[]} onSelect={onSelect} />);
    const bar = screen.getByTestId('conversation-rail-shelf');
    expect(bar.getAttribute('data-layout')).toBe('bar');
    expect(screen.getByRole('button', { name: 'Mentions, 3 waiting' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Calls' })).toBeTruthy();
    expect(screen.getByTestId('conversation-rail-shelf-activity-count').textContent).toBe('2');
    fireEvent.click(screen.getByTestId('conversation-rail-shelf-calls'));
    expect(onSelect).toHaveBeenCalledWith({ kind: 'shelf', id: 'calls' });
  });
});

function Searchable() {
  const [value, setValue] = useState('');
  return <ConversationRail title="Chat" conversations={[channel('general')]} onSelect={() => {}} search={{ value, onChange: setValue }} />;
}

describe('search', () => {
  it('hides the field until the toggle opens it, focuses it, and Escape clears and closes it', () => {
    render(<Searchable />);
    expect(screen.queryByTestId('conversation-rail-search')).toBeNull();
    fireEvent.click(screen.getByTestId('conversation-rail-search-toggle'));
    const field = screen.getByTestId('conversation-rail-search') as HTMLInputElement;
    expect(document.activeElement).toBe(field);
    fireEvent.change(field, { target: { value: 'gen' } });
    fireEvent.keyDown(field, { key: 'Escape' });
    expect(screen.queryByTestId('conversation-rail-search')).toBeNull();
    expect(document.activeElement).toBe(screen.getByTestId('conversation-rail-search-toggle'));
  });
});

function Arranged({ onLayout }: { onLayout: (o: string[] | null) => void }) {
  const [layout, setLayout] = useState<string[] | null>(null);
  return <ConversationRail title="Chat" conversations={[channel('general'), dm('d', 'Dave')]} onSelect={() => {}} sectionOrder="dms-first"
    sections={[{ id: 'teams', label: 'Teams', node: <p>teams body</p> }]} sectionLayout={layout}
    onSectionLayoutChange={(o) => { setLayout(o); onLayout(o); }} />;
}

describe('sections', () => {
  it('renders host sections and the built-in groups in the reader’s order, and moves them', () => {
    const onLayout = vi.fn();
    render(<Arranged onLayout={onLayout} />);
    const text = () => document.body.textContent ?? '';
    expect(text().indexOf('teams body')).toBeLessThan(text().indexOf('Direct messages'));
    expect(text().indexOf('Direct messages')).toBeLessThan(text().indexOf('Channels'));
    fireEvent.click(screen.getByTestId('conversation-rail-options'));
    fireEvent.click(screen.getByTestId('conversation-rail-arrange'));
    fireEvent.click(screen.getByTestId('conversation-rail-arrange-channels-up'));
    expect(onLayout).toHaveBeenLastCalledWith(['teams', 'channels', 'dms']);
  });

  it('reconciles a stored order with the sections present now', () => {
    expect(arrangeRailSections(['a', 'b', 'c'], ['c', 'a'])).toEqual(['c', 'a', 'b']);
    expect(arrangeRailSections(['a', 'b', 'c'], ['x', 'b', 'b'])).toEqual(['a', 'b', 'c']);
    expect(arrangeRailSections(['a', 'b'], null)).toEqual(['a', 'b']);
  });
});

describe('showSections (2.442.5)', () => {
  const sections = [
    { id: 'presence', label: 'Active now', node: <p>presence body</p> },
    { id: 'teams', label: 'Teams', node: <p>teams body</p> },
  ];
  const rows = [channel('general'), dm('d', 'Dave')];

  it('draws only the shown sections — one conversation group, no other captions or rows', () => {
    render(<ConversationRail title="Chat" conversations={rows} onSelect={() => {}} sectionOrder="dms-first" sections={sections}
      showSections={['presence', 'channels']} onSectionLayoutChange={() => {}} />);
    const text = document.body.textContent ?? '';
    expect(text).toContain('presence body');
    expect(text).toContain('general');
    expect(text).not.toContain('teams body');
    expect(text).not.toContain('Direct messages');
    expect(text).not.toContain('Dave');
    expect(screen.queryByTestId('conversation-rail-list-dms')).toBeNull();
    // A partial view has no whole order to arrange.
    expect(screen.queryByTestId('conversation-rail-options')).toBeNull();
  });

  it('shows the empty label only for a shown conversation group with no rows', () => {
    const { rerender } = render(<ConversationRail conversations={[channel('general')]} onSelect={() => {}} sections={sections}
      showSections={['presence', 'dms']} emptyLabel="Nothing here" />);
    expect(document.body.textContent).toContain('Nothing here');
    expect(document.body.textContent).not.toContain('general');
    rerender(<ConversationRail conversations={rows} onSelect={() => {}} sections={sections} showSections={['presence', 'teams']} emptyLabel="Nothing here" />);
    expect(document.body.textContent).not.toContain('Nothing here');
    expect(document.body.textContent).toContain('teams body');
    expect(document.body.textContent).not.toContain('general');
  });

  it('keeps the reader’s stored order among what is shown', () => {
    render(<ConversationRail conversations={rows} onSelect={() => {}} sectionOrder="dms-first" sections={sections}
      sectionLayout={['dms', 'teams', 'presence', 'channels']} showSections={['presence', 'dms']} />);
    const text = document.body.textContent ?? '';
    expect(text.indexOf('Dave')).toBeLessThan(text.indexOf('presence body'));
  });
});
