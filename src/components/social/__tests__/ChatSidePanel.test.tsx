import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useEffect } from 'react';
import {
  ChatSidePanel,
  ChatSidePanelFrame,
  ChatSidePanelProvider,
  chatSidePanelKindLabel,
  type ChatSidePanelApi,
  type ChatSidePanelRenderers,
} from '../ChatSidePanelRegistry';
import type { ChatSidePanelRef } from '../chatCommands';

afterEach(cleanup);

describe('ChatSidePanelFrame', () => {
  it('draws the one header every panel gets: title, optional full-page, close', () => {
    const onClose = vi.fn();
    const onOpenFullPage = vi.fn();
    render(
      <ChatSidePanelFrame title="Roadmap" subtitle="Edited by Grace" onClose={onClose} onOpenFullPage={onOpenFullPage} actions={<button type="button">Share</button>}>
        <p>body</p>
      </ChatSidePanelFrame>,
    );
    expect(screen.getByRole('region', { name: 'Roadmap' })).toBeInTheDocument();
    expect(screen.getByTestId('chat-side-panel-title')).toHaveTextContent('Roadmap');
    expect(screen.getByTestId('chat-side-panel-subtitle')).toHaveTextContent('Edited by Grace');
    expect(screen.getByText('Share')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('chat-side-panel-open-full'));
    expect(onOpenFullPage).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'Close panel' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('has no full-page button when the panel has nowhere to go', () => {
    render(<ChatSidePanelFrame title="x" onClose={() => {}}>b</ChatSidePanelFrame>);
    expect(screen.queryByTestId('chat-side-panel-open-full')).toBeNull();
  });
});

describe('ChatSidePanel', () => {
  const graph = (ref: ChatSidePanelRef) => <div data-testid="graph-view">graph for {ref.id} ({ref.params?.q})</div>;

  it('falls back to an empty state that names the kind when nothing is registered', () => {
    render(<ChatSidePanel panel={{ kind: 'agent-trace', id: 't1' }} onClose={() => {}} />);
    expect(screen.getByTestId('chat-side-panel-empty')).toHaveTextContent('No view registered for agent-trace');
    // The header still opens with a readable name, so the missing view is visible, not a blank split.
    expect(screen.getByTestId('chat-side-panel-title')).toHaveTextContent('Agent trace');
  });

  it('renders the registered body inside the frame and wires close / full page to the api', () => {
    const onClose = vi.fn();
    const onOpenFullPage = vi.fn();
    const renderers: ChatSidePanelRenderers = {
      graph: (ref, api: ChatSidePanelApi) => (
        <div>
          {graph(ref)}
          <button type="button" onClick={api.close}>done</button>
          <button type="button" onClick={api.openFullPage}>full</button>
        </div>
      ),
    };
    const ref = { kind: 'graph', id: 'k8s', title: 'Kubernetes experts', params: { q: 'kubernetes' } };
    render(
      <ChatSidePanelProvider renderers={renderers}>
        <ChatSidePanel panel={ref} onClose={onClose} onOpenFullPage={onOpenFullPage} />
      </ChatSidePanelProvider>,
    );
    expect(screen.getByTestId('chat-side-panel-title')).toHaveTextContent('Kubernetes experts');
    expect(screen.getByTestId('graph-view')).toHaveTextContent('graph for k8s (kubernetes)');
    fireEvent.click(screen.getByText('done'));
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText('full'));
    expect(onOpenFullPage).toHaveBeenCalledWith(ref);
    expect(screen.queryByTestId('chat-side-panel-empty')).toBeNull();
  });

  it('lets the body replace the title once it knows the real one', () => {
    function LiveDoc({ api }: { api: ChatSidePanelApi }) {
      useEffect(() => { api.setTitle('Q3 audit'); }, [api]);
      return <p>editor</p>;
    }
    render(
      <ChatSidePanelProvider renderers={{ document: (_ref, api) => <LiveDoc api={api} /> }}>
        <ChatSidePanel panel={{ kind: 'document', id: 'd1', title: 'Document' }} onClose={() => {}} />
      </ChatSidePanelProvider>,
    );
    expect(screen.getByTestId('chat-side-panel-title')).toHaveTextContent('Q3 audit');
  });

  it('merges nested renderer layers, the inner one overriding by kind', () => {
    render(
      <ChatSidePanelProvider renderers={{ document: () => <p>app document</p>, graph: () => <p>app graph</p> }}>
        <ChatSidePanelProvider renderers={{ graph: () => <p>plugin graph</p> }}>
          <ChatSidePanel panel={{ kind: 'graph', id: 'g' }} onClose={() => {}} />
          <ChatSidePanel panel={{ kind: 'document', id: 'd' }} onClose={() => {}} data-testid="doc-panel" />
        </ChatSidePanelProvider>
      </ChatSidePanelProvider>,
    );
    expect(screen.getByText('plugin graph')).toBeInTheDocument();
    expect(screen.queryByText('app graph')).toBeNull();
    expect(screen.getByText('app document')).toBeInTheDocument();
  });

  it('labels kinds for the header', () => {
    expect(chatSidePanelKindLabel('graph')).toBe('Graph');
    expect(chatSidePanelKindLabel('agent_trace-view')).toBe('Agent trace view');
    expect(chatSidePanelKindLabel('')).toBe('Panel');
  });
});
