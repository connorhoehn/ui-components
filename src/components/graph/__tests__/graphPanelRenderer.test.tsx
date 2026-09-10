import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChatSidePanel, ChatSidePanelProvider } from '../../social/ChatSidePanelRegistry';
import type { ChatSidePanelRef } from '../../social/chatCommands';
import { createGraphPanelRenderer, isPeopleGraphData, type GraphPanelData } from '../graphPanelRenderer';

afterEach(cleanup);

const PANEL: ChatSidePanelRef = { kind: 'graph', id: 'g1', title: 'Experts', params: { q: 'kubernetes' } };

function mount(load: (p: ChatSidePanelRef) => Promise<GraphPanelData>, extra: Partial<Parameters<typeof createGraphPanelRenderer>[0]> = {}) {
  const onClose = vi.fn();
  const view = render(
    <ChatSidePanelProvider renderers={{ graph: createGraphPanelRenderer({ load, ...extra }) }}>
      <ChatSidePanel panel={PANEL} onClose={onClose} />
    </ChatSidePanelProvider>,
  );
  return { ...view, onClose };
}

/** A promise the test resolves by hand, so the loading state is observable. */
function deferred<T>() {
  let resolve!: (v: T) => void;
  let reject!: (e: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

describe('createGraphPanelRenderer', () => {
  it('shows a skeleton while loading, then a PeopleGraph, and retitles the frame from the data', async () => {
    const d = deferred<GraphPanelData>();
    const load = vi.fn(() => d.promise);
    mount(load);
    expect(load).toHaveBeenCalledWith(PANEL);
    expect(screen.getByTestId('graph-panel-loading')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading graph')).toBeInTheDocument();
    expect(screen.getByTestId('chat-side-panel-title')).toHaveTextContent('Experts');
    const callsAfterMount = load.mock.calls.length;

    await act(async () => {
      d.resolve({ title: 'Experts: kubernetes (2)', query: 'kubernetes', people: [
        { id: 'grace', name: 'Grace Hopper', tags: ['kubernetes'] },
        { id: 'bob', name: 'Bob Martinez', tags: ['helm'] },
      ] });
    });
    expect(screen.queryByTestId('graph-panel-loading')).toBeNull();
    expect(screen.getByTestId('graph-panel-people')).toBeInTheDocument();
    expect(screen.getByTestId('graph-panel-people-graph-edge-label-__query__-grace')).toHaveTextContent('kubernetes');
    expect(screen.getByTestId('chat-side-panel-title')).toHaveTextContent('Experts: kubernetes (2)');
    // The title update re-rendered the frame; that must not refetch. (StrictMode
    // double-mounts the effect, so the count is measured from after mount.)
    expect(load.mock.calls.length).toBe(callsAfterMount);
  });

  it('renders a plain NodeGraph for nodes/edges data and reports node picks', async () => {
    const onSelectNode = vi.fn();
    mount(async () => ({
      nodes: [{ id: 'a', label: 'gateway' }, { id: 'b', label: 'api' }],
      edges: [{ from: 'a', to: 'b', label: 'http' }],
      layout: 'grid',
    }), { onSelectNode });
    await waitFor(() => expect(screen.getByTestId('graph-panel-nodes')).toBeInTheDocument());
    expect(screen.queryByTestId('graph-panel-people')).toBeNull();
    expect(screen.getByTestId('graph-panel-graph-edge-label-a-b')).toHaveTextContent('http');
    fireEvent.click(screen.getByRole('button', { name: 'api' }));
    expect(onSelectNode).toHaveBeenCalledWith(expect.objectContaining({ id: 'b' }), expect.objectContaining({ panel: PANEL }));
    expect(screen.getByRole('button', { name: 'api' })).toHaveAttribute('aria-pressed', 'true');
    // No title in the data: the frame keeps the ref's.
    expect(screen.getByTestId('chat-side-panel-title')).toHaveTextContent('Experts');
  });

  it('shows the error inline and retries on demand', async () => {
    // A flag rather than `mockRejectedValueOnce`: StrictMode calls `load` twice
    // on mount and only the surviving call's answer is shown.
    let offline = true;
    const load = vi.fn(async (): Promise<GraphPanelData> => {
      if (offline) throw new Error('search index offline');
      return { people: [], query: 'kubernetes' };
    });
    mount(load);
    await waitFor(() => expect(screen.getByTestId('graph-panel-error')).toBeInTheDocument());
    expect(screen.getByRole('alert')).toHaveTextContent('search index offline');
    const callsBeforeRetry = load.mock.calls.length;
    offline = false;
    fireEvent.click(screen.getByTestId('graph-panel-retry'));
    await waitFor(() => expect(screen.getByTestId('graph-panel-people-empty')).toBeInTheDocument());
    expect(load.mock.calls.length).toBe(callsBeforeRetry + 1);
  });

  it('routes people actions through the host callbacks with the panel api', async () => {
    const onOpenPerson = vi.fn((_id: string, { api }: { api: { close: () => void } }) => api.close());
    const onMessagePerson = vi.fn();
    const { onClose } = mount(async () => ({ people: [{ id: 'grace', name: 'Grace Hopper' }] }), { onOpenPerson, onMessagePerson });
    await waitFor(() => expect(screen.getByTestId('graph-panel-people')).toBeInTheDocument());
    fireEvent.click(screen.getByTestId('graph-panel-people-message-grace'));
    expect(onMessagePerson).toHaveBeenCalledWith('grace', expect.objectContaining({ panel: PANEL }));
    fireEvent.click(screen.getByTestId('graph-panel-people-open-grace'));
    expect(onOpenPerson).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('falls back to the panel params for the query when the data has none', async () => {
    mount(async () => ({ people: [{ id: 'grace', name: 'Grace Hopper', tags: ['kubernetes'] }] }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'kubernetes, 1 person' })).toBeInTheDocument());
  });

  it('isPeopleGraphData tells the two shapes apart', () => {
    expect(isPeopleGraphData({ people: [], query: '' })).toBe(true);
    expect(isPeopleGraphData({ nodes: [], edges: [] })).toBe(false);
  });
});
