import { render, screen, fireEvent, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CommandPalette,
  CommandPaletteProvider,
  matchTokens,
  useCommandPalette,
  type Command,
  type PaletteRecordGroup,
  type SearchPaletteRecords,
} from '../CommandPalette';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (typeof globalThis.ResizeObserver === 'undefined') {
  (globalThis as unknown as { ResizeObserver: typeof ResizeObserverMock }).ResizeObserver =
    ResizeObserverMock;
}
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoView() {};
}

const run = vi.fn();
const commands: Command[] = [
  { id: 'open-reqs', label: 'My open requests', run },
  { id: 'teams', label: 'Teams', run },
];

const GROUPS: PaletteRecordGroup[] = [
  {
    group: 'People',
    items: [
      { id: 'p-001', title: 'Rhea Patel', subtitle: 'Engineering', kind: 'Person', href: '/people/p-001' },
    ],
  },
  {
    group: 'Requests',
    items: [{ id: 'req-0001', title: 'Prod access', kind: 'Request', href: '/access/req-0001' }],
  },
];

function Opener() {
  const { open } = useCommandPalette();
  return <button onClick={open}>open</button>;
}

function mount(
  search?: SearchPaletteRecords,
  extra: Partial<React.ComponentProps<typeof CommandPalette>> = {},
) {
  render(
    <CommandPaletteProvider commands={commands} recentsKey={null}>
      <Opener />
      <CommandPalette searchRecords={search} {...extra} />
    </CommandPaletteProvider>,
  );
  fireEvent.click(screen.getByText('open'));
}

const type = (v: string) =>
  fireEvent.change(screen.getByTestId('command-palette-input'), { target: { value: v } });
const flush = () => act(async () => { await vi.advanceTimersByTimeAsync(0); });

beforeEach(() => {
  vi.useFakeTimers();
  run.mockClear();
});
afterEach(() => vi.useRealTimers());

describe('matchTokens', () => {
  it('matches all tokens in any order', () => {
    expect(matchTokens('open-reqs My open requests', 'requests my open')).toBeGreaterThan(0);
    expect(matchTokens('open-reqs My open requests', 'my closed')).toBe(0);
  });
});

describe('palette record results', () => {
  it('debounces: one call for a burst of typing', async () => {
    const search = vi.fn<SearchPaletteRecords>().mockResolvedValue(GROUPS);
    mount(search);
    type('rh');
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    type('rhe');
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    expect(search).not.toHaveBeenCalled();
    await act(async () => { await vi.advanceTimersByTimeAsync(150); });
    expect(search).toHaveBeenCalledTimes(1);
    expect(search.mock.calls[0][0]).toBe('rhe');
  });

  it('does not search below the minimum length', async () => {
    const search = vi.fn<SearchPaletteRecords>().mockResolvedValue(GROUPS);
    mount(search);
    type('r');
    await act(async () => { await vi.advanceTimersByTimeAsync(500); });
    expect(search).not.toHaveBeenCalled();
  });

  it('aborts the stale request and ignores its late result', async () => {
    const signals: AbortSignal[] = [];
    let resolveFirst: (g: PaletteRecordGroup[]) => void = () => {};
    const search = vi.fn<SearchPaletteRecords>((q, { signal }) => {
      signals.push(signal);
      if (q === 'rhe') return new Promise((r) => { resolveFirst = r; });
      return Promise.resolve([{ group: 'Teams', items: [{ id: 't1', title: 'Rhea team', kind: 'Team', href: '/t/1' }] }]);
    });
    mount(search);
    type('rhe');
    await act(async () => { await vi.advanceTimersByTimeAsync(250); });
    type('rhea');
    await act(async () => { await vi.advanceTimersByTimeAsync(250); });
    expect(signals[0].aborted).toBe(true);
    await act(async () => { resolveFirst(GROUPS); });
    expect(screen.queryByTestId('command-palette-record-p-001')).toBeNull();
    expect(screen.getByTestId('command-palette-record-t1')).toBeTruthy();
  });

  it('shows a loading row without hiding commands, then groups records', async () => {
    let resolve: (g: PaletteRecordGroup[]) => void = () => {};
    const search: SearchPaletteRecords = () => new Promise((r) => { resolve = r; });
    mount(search);
    type('te');
    await act(async () => { await vi.advanceTimersByTimeAsync(250); });
    expect(screen.getByTestId('command-palette-records-loading')).toBeTruthy();
    expect(screen.getByTestId('command-palette-item-teams')).toBeTruthy();
    await act(async () => { resolve(GROUPS); });
    expect(screen.queryByTestId('command-palette-records-loading')).toBeNull();
    expect(screen.getByTestId('command-palette-records-People')).toBeTruthy();
    expect(screen.getByTestId('command-palette-records-Requests')).toBeTruthy();
    expect(screen.getAllByRole('option').length).toBeGreaterThanOrEqual(3);
    expect(screen.getByTestId('command-palette-status').textContent).toMatch(/results?$/);
  });

  it('opens a record with Enter through onOpenRecord', async () => {
    const onOpen = vi.fn();
    const search = vi.fn<SearchPaletteRecords>().mockResolvedValue(GROUPS);
    mount(search, { onOpenRecord: onOpen });
    type('rhea');
    await act(async () => { await vi.advanceTimersByTimeAsync(250); });
    await flush();
    const input = screen.getByTestId('command-palette-input');
    const rec = screen.getByTestId('command-palette-record-p-001');
    // Move the cmdk selection onto the record (command rows come first).
    for (let i = 0; i < 6 && rec.getAttribute('aria-selected') !== 'true'; i++) {
      fireEvent.keyDown(input, { key: 'ArrowDown' });
    }
    expect(input.getAttribute('aria-activedescendant')).toBe(rec.id);
    fireEvent.keyDown(input, { key: 'Enter' });
    await flush();
    expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ id: 'p-001', href: '/people/p-001' }));
  });

  it('matches commands by tokens in any order', async () => {
    mount();
    type('requests open');
    expect(screen.getByTestId('command-palette-item-open-reqs')).toBeTruthy();
    expect(screen.queryByTestId('command-palette-item-teams')).toBeNull();
  });

  it('says so plainly when nothing matches', async () => {
    const search = vi.fn<SearchPaletteRecords>().mockResolvedValue([]);
    mount(search);
    type('zzzz');
    await act(async () => { await vi.advanceTimersByTimeAsync(250); });
    await flush();
    expect(screen.getByTestId('command-palette-empty').textContent).toBe('No matches for “zzzz”');
    expect(screen.getByTestId('command-palette-status').textContent).toBe('No matches for zzzz');
  });

  it('shows an error row, keeps commands, and retries', async () => {
    const search = vi
      .fn<SearchPaletteRecords>()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce(GROUPS);
    mount(search);
    type('te');
    await act(async () => { await vi.advanceTimersByTimeAsync(250); });
    await flush();
    expect(screen.getByTestId('command-palette-records-error')).toBeTruthy();
    expect(screen.getByTestId('command-palette-item-teams')).toBeTruthy();
    fireEvent.click(screen.getByText('Retry'));
    await act(async () => { await vi.advanceTimersByTimeAsync(250); });
    await flush();
    expect(screen.queryByTestId('command-palette-records-error')).toBeNull();
    expect(screen.getByTestId('command-palette-record-req-0001')).toBeTruthy();
  });

  it('uses the placeholder prop', () => {
    mount(undefined, { placeholder: 'Search pages and people' });
    expect(screen.getByPlaceholderText('Search pages and people')).toBeTruthy();
  });
});
