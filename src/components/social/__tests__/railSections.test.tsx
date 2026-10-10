import { act, cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ConversationRail } from '../ConversationRail';
import { buildRailSection, matchesRailQuery, useRailSectionMemory } from '../railSections';

afterEach(cleanup);
beforeEach(() => window.localStorage.clear());

const GROUPS = [{ id: 'auth', name: 'Auth Migration' }, { id: 'rag', name: 'RAG Search' }];
const build = (extra: Partial<Parameters<typeof buildRailSection<typeof GROUPS[number]>>[0]> = {}) => buildRailSection({
  id: 'groups', label: 'My initiatives', items: GROUPS, key: (g) => `group:${g.id}`, name: (g) => g.name,
  row: (g) => ({ lastMessagePreview: `#${g.id}`, ...(g.id === 'auth' ? { unreadCount: 2 } : {}) }),
  onSelect: () => {}, state: { noun: 'initiatives' }, 'data-testid': 'plane-groups', ...extra,
});

describe('buildRailSection', () => {
  it('counts the records held, filters rows by the find text, keys and fills the rows', () => {
    const section = build({ query: 'rag' });
    expect(section.count).toBe(2);
    expect(section.rows!.map((r) => r.channel)).toEqual(['group:rag']);
    expect(section.rows![0]).toMatchObject({ name: 'RAG Search', kind: 'channel', peers: [], lastMessagePreview: '#rag' });
    expect(section.emptyLabel).toBe('No match');
  });
  it('says loading, failure, and nothing-yet honestly', () => {
    expect(build({ items: [], state: { loading: true, noun: 'initiatives' } }).emptyLabel).toBe('Loading…');
    expect(build({ items: [], state: { error: 'HTTP 500', noun: 'initiatives' } }).emptyLabel).toBe('Couldn’t load your initiatives — HTTP 500.');
    expect(build({ items: [] }).emptyLabel).toBe('You are not on any initiatives yet.');
    expect(build({ items: [], state: { emptyLabel: 'You are not on an org team yet.' } }).emptyLabel).toBe('You are not on an org team yet.');
    const noted = build({ state: { note: 'Link your account' } });
    expect(noted.note).toBe('Link your account');
    expect(noted.count).toBe(0);
  });
  it('matches case-insensitively', () => {
    expect(matchesRailQuery('Auth Migration', ' auth ')).toBe(true);
    expect(matchesRailQuery('Auth Migration', 'rag')).toBe(false);
    expect(matchesRailQuery('x', '')).toBe(true);
  });
});

describe('ConversationRail data sections', () => {
  it('draws the heading with its count and fold, the rows, and hands back the row key', () => {
    const onSelect = vi.fn();
    const onToggleSection = vi.fn();
    const { rerender } = render(<ConversationRail conversations={[]} onSelect={() => {}} sections={[build({ onSelect, active: 'group:auth' })]}
      collapsedSections={{}} onToggleSection={onToggleSection} />);
    const section = screen.getByTestId('plane-groups-section');
    expect(section.textContent).toContain('My initiatives');
    expect(screen.getByTestId('rail-section-header-count').textContent).toBe('2');
    fireEvent.click(screen.getByText('RAG Search'));
    expect(onSelect).toHaveBeenCalledWith('group:rag');
    fireEvent.click(screen.getByTestId('rail-section-header-toggle'));
    expect(onToggleSection).toHaveBeenCalledWith('My initiatives', true);
    rerender(<ConversationRail conversations={[]} onSelect={() => {}} sections={[build()]} collapsedSections={{ 'My initiatives': true }} onToggleSection={onToggleSection} />);
    expect(screen.queryByText('RAG Search')).toBeNull();
    expect(screen.getByTestId('plane-groups-section')).toBeTruthy();
  });
  it('draws a note instead of rows', () => {
    render(<ConversationRail conversations={[]} onSelect={() => {}} sections={[build({ state: { note: 'Link your account to a person' } })]} />);
    expect(screen.getByTestId('plane-groups-note').textContent).toBe('Link your account to a person');
    expect(screen.queryByText('RAG Search')).toBeNull();
  });
  it('a node section with `heading` gets the rail heading and fold over its own content', () => {
    render(<ConversationRail conversations={[]} onSelect={() => {}} collapsedSections={{ 'Active now': true }} onToggleSection={() => {}}
      sections={[{ id: 'active', label: 'Active now', heading: true, count: 3, node: <p>tiles</p>, 'data-testid': 'active' }]} />);
    expect(screen.getByTestId('active-section').textContent).toContain('Active now');
    expect(screen.queryByText('tiles')).toBeNull();
  });
});

describe('useRailSectionMemory', () => {
  it('folds the defaults unless the page is about them, and remembers the reader’s folds and order', () => {
    const memo = renderHook((p: { opened: string[] }) => useRailSectionMemory('social.chatRail', { defaultFolded: { Teams: true, Rooms: true }, opened: p.opened }), { initialProps: { opened: ['Teams'] } });
    expect(memo.result.current.isFolded('Teams')).toBe(false);
    expect(memo.result.current.isFolded('Rooms')).toBe(true);
    expect(memo.result.current.isFolded('Channels')).toBe(false);
    act(() => memo.result.current.setFolded('Channels', true));
    expect(JSON.parse(window.localStorage.getItem('social.chatRail.folded')!)).toEqual({ Channels: true });
    act(() => memo.result.current.setFolded('Rooms', false));
    expect(memo.result.current.isFolded('Rooms')).toBe(false);
    act(() => memo.result.current.setSectionLayout(['channels', 'dms']));
    expect(JSON.parse(window.localStorage.getItem('social.chatRail.layout')!)).toEqual(['channels', 'dms']);
    act(() => memo.result.current.setSectionLayout(null));
    expect(window.localStorage.getItem('social.chatRail.layout')).toBeNull();
  });
  it('reads what an earlier session stored under the same keys', () => {
    window.localStorage.setItem('social.chatRail.folded', JSON.stringify({ 'Active now': true }));
    window.localStorage.setItem('social.chatRail.layout', JSON.stringify(['rooms', 'dms']));
    const { result } = renderHook(() => useRailSectionMemory('social.chatRail'));
    expect(result.current.isFolded('Active now')).toBe(true);
    expect(result.current.sectionLayout).toEqual(['rooms', 'dms']);
  });
});
