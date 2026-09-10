import { act, cleanup, render, renderHook, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { ChatCommandProvider, useChatCommands, useRegisterChatCommands, useRunChatCommand, type ChatCommandRunContext } from '../ChatCommandProvider';
import type { ChatCommand } from '../chatCommands';

afterEach(cleanup);

const none = async () => ({ kind: 'none' as const });
const doc: ChatCommand = { trigger: '/doc', label: 'Edit the open document', scope: 'document-open', run: none };
const search: ChatCommand = { trigger: '/search', label: 'Find people', run: none };
const search2: ChatCommand = { trigger: '/Search', label: 'Find people (graph)', run: none };
const graph: ChatCommand = { trigger: '/graph', label: 'Graph', run: none };

function Triggers() {
  const commands = useChatCommands();
  return <div data-testid="triggers">{commands.map((c) => `${c.trigger}=${c.label}`).join('|')}</div>;
}

describe('ChatCommandProvider', () => {
  it('merges nested layers, the inner one overriding by trigger without losing its place', () => {
    render(
      <ChatCommandProvider commands={[doc, search]}>
        <ChatCommandProvider commands={[search2, graph]}>
          <Triggers />
        </ChatCommandProvider>
      </ChatCommandProvider>,
    );
    expect(screen.getByTestId('triggers')).toHaveTextContent('/doc=Edit the open document|/Search=Find people (graph)|/graph=Graph');
  });

  it('is empty outside a provider and a plain list inside one', () => {
    const { result } = renderHook(() => useChatCommands());
    expect(result.current).toEqual([]);
    render(<ChatCommandProvider commands={[doc]}><Triggers /></ChatCommandProvider>);
    expect(screen.getByTestId('triggers')).toHaveTextContent('/doc=Edit the open document');
  });

  it('registers plugin commands while mounted and forgets them on unmount', () => {
    const plugin = [graph];
    function Plugin() { useRegisterChatCommands(plugin); return null; }
    function Host({ on }: { on: boolean }) {
      return (
        <ChatCommandProvider commands={[doc]}>
          {on && <Plugin />}
          <Triggers />
        </ChatCommandProvider>
      );
    }
    const { rerender } = render(<Host on />);
    expect(screen.getByTestId('triggers')).toHaveTextContent('/doc=Edit the open document|/graph=Graph');
    rerender(<Host on={false} />);
    expect(screen.getByTestId('triggers')).toHaveTextContent('/doc=Edit the open document');
    expect(screen.getByTestId('triggers').textContent).not.toContain('/graph');
  });

  it('refuses to register outside a provider, loudly', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useRegisterChatCommands([graph]))).toThrow(/ChatCommandProvider/);
    spy.mockRestore();
  });
});

describe('useRunChatCommand', () => {
  const ctx = (over: Partial<ChatCommandRunContext> = {}): ChatCommandRunContext => ({
    channel: 'chat:room:general',
    user: { id: 'u1', displayName: 'Grace' },
    idToken: 'tok',
    sidePanel: { current: null, open: vi.fn(), close: vi.fn() },
    ...over,
  });
  const wrap = (commands: ChatCommand[]) => ({ children }: { children: ReactNode }) => (
    <ChatCommandProvider commands={commands}>{children}</ChatCommandProvider>
  );

  it('parses the draft, hands the command the full context, and returns its outcome', async () => {
    const run = vi.fn<ChatCommand['run']>(async () => ({ kind: 'run' as const, runId: 'r1', pipelineId: 'p1', card: { query: 'kubernetes experts' } }));
    const { result } = renderHook(() => useRunChatCommand(), { wrapper: wrap([{ ...search, run }]) });
    let outcome: unknown;
    await act(async () => { outcome = await result.current('/search find me all kubernetes experts', ctx()); });
    expect(outcome).toMatchObject({ kind: 'run', runId: 'r1', pipelineId: 'p1' });
    expect(run).toHaveBeenCalledTimes(1);
    expect(run.mock.calls[0][0]).toMatchObject({
      channel: 'chat:room:general',
      idToken: 'tok',
      text: '/search find me all kubernetes experts',
      argumentText: 'find me all kubernetes experts',
    });
  });

  it('resolves null for plain text and throws, rather than running, when out of scope', async () => {
    const run = vi.fn(none);
    const { result } = renderHook(() => useRunChatCommand(), { wrapper: wrap([{ ...doc, run }]) });
    await expect(result.current('just chatting', ctx())).resolves.toBeNull();
    await expect(result.current('/doc rename it', ctx())).rejects.toThrow('/doc: Open a document beside the chat first');
    expect(run).not.toHaveBeenCalled();
    const open = ctx({ sidePanel: { current: { kind: 'document', id: 'd1' }, open: vi.fn(), close: vi.fn() } });
    await expect(result.current('/doc rename it', open)).resolves.toEqual({ kind: 'none' });
  });

  it('lets a failing command reject through to the host', async () => {
    const failing: ChatCommand = { ...search, run: async () => { throw new Error('pipeline route 502'); } };
    const { result } = renderHook(() => useRunChatCommand(), { wrapper: wrap([failing]) });
    await expect(result.current('/search x', ctx())).rejects.toThrow('pipeline route 502');
  });
});
