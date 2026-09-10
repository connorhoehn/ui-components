import { describe, expect, it } from 'vitest';
import {
  chatCommandsToComposer,
  parseChatCommand,
  sidePanelFromSearch,
  sidePanelToSearch,
  type ChatCommand,
  type ChatCommandScopeContext,
} from '../chatCommands';

const noop = async () => ({ kind: 'none' as const });
const ctx = (over: Partial<ChatCommandScopeContext> = {}): ChatCommandScopeContext => ({
  channel: 'chat:room:general',
  user: { id: 'u1', displayName: 'Grace' },
  idToken: null,
  sidePanel: { current: null, open: () => {}, close: () => {} },
  ...over,
});

const doc: ChatCommand = { trigger: '/doc', label: 'Edit the open document', hint: 'needs a document', scope: 'document-open', run: noop };
const search: ChatCommand = { trigger: '/search', label: 'Find people', run: noop };
const call: ChatCommand = { trigger: '/call', label: 'Start a call', scope: 'room', run: noop };
const wave: ChatCommand = { trigger: '/wave', label: 'Wave', scope: 'dm', run: noop };
const admin: ChatCommand = { trigger: '/admin', label: 'Admin', scope: (c) => c.user.id === 'root', disabledHint: 'Admins only', run: noop };

describe('chatCommandsToComposer', () => {
  it('keeps every command, disabling the out-of-scope ones with the reason as the hint', () => {
    const out = chatCommandsToComposer([doc, search, call, wave, admin], ctx());
    expect(out.map((c) => c.trigger)).toEqual(['/doc', '/search', '/call', '/wave', '/admin']);
    expect(out[0]).toMatchObject({ disabled: true, hint: 'Open a document beside the chat first' });
    expect(out[1].disabled).toBeUndefined();
    expect(out[2].disabled).toBeUndefined();
    expect(out[3]).toMatchObject({ disabled: true, hint: 'Only in direct messages' });
    expect(out[4]).toMatchObject({ disabled: true, hint: 'Admins only' });
    // The composer never sees the executable half.
    expect('run' in out[0]).toBe(false);
    expect('scope' in out[0]).toBe(false);
  });

  it('follows the open panel, the channel kind the host names, and the DM prefix when it does not', () => {
    const withDoc = ctx({ sidePanel: { current: { kind: 'document', id: 'd1' }, open: () => {}, close: () => {} } });
    expect(chatCommandsToComposer([doc], withDoc)[0]).toMatchObject({ trigger: '/doc', hint: 'needs a document' });
    const graphOpen = ctx({ sidePanel: { current: { kind: 'graph', id: 'g' }, open: () => {}, close: () => {} } });
    expect(chatCommandsToComposer([doc], graphOpen)[0].disabled).toBe(true);
    expect(chatCommandsToComposer([call, wave], ctx({ channel: 'chat:dm:a:b' })).map((c) => !!c.disabled)).toEqual([true, false]);
    expect(chatCommandsToComposer([call, wave], ctx({ channel: 'chat:dmg:abc123' })).map((c) => !!c.disabled)).toEqual([true, false]);
    // An explicit word from the host beats the prefix heuristic.
    expect(chatCommandsToComposer([call, wave], ctx({ channel: 'chat:dm:a:b', channelKind: 'room' })).map((c) => !!c.disabled)).toEqual([false, true]);
    expect(chatCommandsToComposer([admin], ctx({ user: { id: 'root', displayName: 'r' } }))[0].disabled).toBeUndefined();
  });
});

describe('parseChatCommand', () => {
  it('finds the command and hands back the trimmed argument', () => {
    expect(parseChatCommand('/search  find me all kubernetes experts ', [doc, search])).toEqual({ command: search, argumentText: 'find me all kubernetes experts' });
    expect(parseChatCommand('/SEARCH x', [search])?.command).toBe(search);
    expect(parseChatCommand('/doc', [doc, search])).toEqual({ command: doc, argumentText: '' });
    expect(parseChatCommand('/document rename', [doc])).toBeNull();
    expect(parseChatCommand('hello /search', [search])).toBeNull();
    expect(parseChatCommand('/search x', [])).toBeNull();
  });
});

describe('side panel <-> URL', () => {
  it('keeps documents on ?doc= and puts every other kind on ?panel=kind:id', () => {
    expect(sidePanelToSearch({ kind: 'document', id: 'd-1' }).toString()).toBe('doc=d-1');
    expect(sidePanelToSearch({ kind: 'graph', id: 'k8s:experts' }).toString()).toBe('panel=graph%3Ak8s%3Aexperts');
    expect(sidePanelFromSearch('?doc=d-1')).toEqual({ kind: 'document', id: 'd-1' });
    expect(sidePanelFromSearch('panel=graph%3Ak8s%3Aexperts')).toEqual({ kind: 'graph', id: 'k8s:experts' });
  });

  it('round-trips params, leaves unrelated params alone, and closes cleanly', () => {
    const ref = { kind: 'graph', id: 'g1', params: { q: 'kubernetes experts', tab: 'people' } };
    const params = sidePanelToSearch(ref, 'tab=chat&doc=old');
    expect(params.get('tab')).toBe('chat');
    expect(params.has('doc')).toBe(false);
    expect(sidePanelFromSearch(params)).toEqual(ref);
    const closed = sidePanelToSearch(null, params);
    expect(closed.toString()).toBe('tab=chat');
    expect(sidePanelFromSearch(closed)).toBeNull();
  });

  it('ignores a malformed panel param and refuses a kind that cannot be encoded', () => {
    expect(sidePanelFromSearch('panel=graph')).toBeNull();
    expect(sidePanelFromSearch('panel=:x')).toBeNull();
    expect(sidePanelFromSearch('panel=graph:')).toBeNull();
    expect(sidePanelFromSearch(undefined)).toBeNull();
    expect(() => sidePanelToSearch({ kind: 'a:b', id: 'x' })).toThrow(/cannot contain/);
  });
});
