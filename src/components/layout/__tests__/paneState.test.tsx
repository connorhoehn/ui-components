import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { parsePaneRecord, readPaneState, usePaneState, visiblePaneTabs, writePaneState, type PaneTabSpec } from '../paneState';

afterEach(cleanup);
beforeEach(() => window.localStorage.clear());

const TABS: PaneTabSpec[] = [
  { id: 'discussion', label: 'Discussion' },
  { id: 'details', label: 'Details', remember: true },
  { id: 'docs', label: 'Docs', remember: true },
  { id: 'log', label: 'Log', recordKinds: ['run'] },
  { id: 'person', label: 'Person', recordKinds: ['person'] },
];
const p = (q: string) => new URLSearchParams(q);

describe('the pane URL contract', () => {
  it('parses records and refuses malformed ones', () => {
    expect(parsePaneRecord('run:job-7')).toEqual({ kind: 'run', id: 'job-7' });
    expect(parsePaneRecord('person:p-001')).toEqual({ kind: 'person', id: 'p-001' });
    expect(parsePaneRecord(':x')).toBeNull();
    expect(parsePaneRecord('run:')).toBeNull();
    expect(parsePaneRecord('Run:x')).toBeNull();
    expect(parsePaneRecord('run:has space')).toBeNull();
  });
  it('reads the tab and record against the registry', () => {
    expect(readPaneState(p(''), TABS, 'discussion')).toEqual({ tab: 'discussion', record: null });
    expect(readPaneState(p('pane=details'), TABS, 'discussion')).toEqual({ tab: 'details', record: null });
    expect(readPaneState(p('pane=log&paneRecord=run:j1'), TABS, 'discussion')).toEqual({ tab: 'log', record: { kind: 'run', id: 'j1' } });
    // A record tab needs its record, of its kind.
    expect(readPaneState(p('pane=log'), TABS, 'discussion')).toEqual({ tab: 'discussion', record: null });
    expect(readPaneState(p('pane=log&paneRecord=person:p1'), TABS, 'discussion')).toEqual({ tab: 'discussion', record: null });
    expect(readPaneState(p('pane=nope'), TABS, 'discussion').tab).toBe('discussion');
  });
  it('writes the resting tab as no params, and keeps every other param', () => {
    expect(writePaneState(p('tab=work&pane=details'), { tab: 'discussion', record: null }, 'discussion').toString()).toBe('tab=work');
    expect(writePaneState(p('tab=work'), { tab: 'log', record: { kind: 'run', id: 'j1' } }, 'discussion').toString()).toBe('tab=work&pane=log&paneRecord=run%3Aj1');
    expect(writePaneState(p('pane=log&paneRecord=run:j1'), { tab: 'docs', record: null }, 'discussion').toString()).toBe('pane=docs');
  });
  it('lists a record tab only while its record is named', () => {
    expect(visiblePaneTabs(TABS, { tab: 'discussion', record: null }).map((t) => t.id)).toEqual(['discussion', 'details', 'docs']);
    expect(visiblePaneTabs(TABS, { tab: 'log', record: { kind: 'run', id: 'j' } }).map((t) => t.id)).toEqual(['discussion', 'details', 'docs', 'log']);
  });
});

function harness(initial: string, extra: Partial<Parameters<typeof usePaneState>[0]> = {}) {
  let params = p(initial);
  const setParams = vi.fn((next: URLSearchParams) => { params = next; });
  const hook = renderHook((props: { q: URLSearchParams }) => usePaneState({ tabs: TABS, defaultTab: 'discussion', params: props.q, setParams, ...extra }), { initialProps: { q: params } });
  const sync = () => hook.rerender({ q: params });
  return { hook, setParams, get params() { return params; }, sync };
}

describe('usePaneState', () => {
  it('opens tabs, names records, and goes back to rest', () => {
    const onOpen = vi.fn();
    const h = harness('tab=agents', { onOpen });
    act(() => h.hook.result.current.open('log', { kind: 'run', id: 'j1' }));
    h.sync();
    expect(h.params.get('pane')).toBe('log');
    expect(h.params.get('paneRecord')).toBe('run:j1');
    expect(h.params.get('tab')).toBe('agents');
    expect(h.hook.result.current.tabs.map((t) => t.id)).toContain('log');
    expect(onOpen).toHaveBeenCalled();
    // A plain tab drops the record (no keepRecord).
    act(() => h.hook.result.current.select('details'));
    h.sync();
    expect(h.params.get('pane')).toBe('details');
    expect(h.params.get('paneRecord')).toBeNull();
    act(() => h.hook.result.current.open('discussion'));
    h.sync();
    expect(h.params.toString()).toBe('tab=agents');
  });
  it('keeps the record beside a plain tab with keepRecord', () => {
    const h = harness('', { keepRecord: true });
    act(() => h.hook.result.current.open('person', { kind: 'person', id: 'p1' }));
    h.sync();
    act(() => h.hook.result.current.select('details'));
    h.sync();
    expect(h.params.get('pane')).toBe('details');
    expect(h.params.get('paneRecord')).toBe('person:p1');
    act(() => h.hook.result.current.open('details', null));
    h.sync();
    expect(h.params.get('paneRecord')).toBeNull();
  });
  it('remembers resting tabs per device and restores one once per subject, in place', () => {
    const h = harness('', { rememberKey: 't.tab' });
    act(() => h.hook.result.current.open('docs'));
    expect(window.localStorage.getItem('t.tab')).toBe('docs');
    act(() => h.hook.result.current.open('log', { kind: 'run', id: 'j' }));
    expect(window.localStorage.getItem('t.tab'), 'record tabs are not remembered').toBe('docs');
    const setParams = vi.fn();
    renderHook(() => usePaneState({ tabs: TABS, defaultTab: 'discussion', params: p(''), setParams, rememberKey: 't.tab', restore: { when: true, subject: 'p-1' } }));
    expect(setParams).toHaveBeenCalledTimes(1);
    expect(setParams.mock.calls[0]![0].get('pane')).toBe('docs');
    expect(setParams.mock.calls[0]![1]).toEqual({ replace: true });
  });
});
