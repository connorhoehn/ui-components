# Chat commands — `/search` with a `graph` side panel

A `ChatCommand` is a composer slash command plus `run` (what sending it does) and `scope`
(where it is offered). Providers nest and MERGE, so a plugin adds `/search` beside the app's
`/doc`. The library owns the card and the side-panel frame; the host owns the pipeline route
and the panel body. All of it is tiptap-free (`ui-components/social`).

```tsx
import {
  ChatCommandProvider, ChatSidePanelProvider, ChatSidePanel,
  useChatCommands, useRunChatCommand, chatCommandsToComposer,
  sidePanelToSearch, sidePanelFromSearch,
  type ChatCommand, type ChatSidePanelRenderers,
} from '@connorhoehn/ui-components/social';

// 1. The command. `run` calls the plugin's own pipeline route; the app posts the agent-run message.
const search: ChatCommand = {
  trigger: '/search', label: 'Find people', hint: 'a question, e.g. "kubernetes experts"',
  scope: 'always', // or 'room' | 'dm' | 'document-open' | (ctx) => boolean
  async run(ctx) {
    const res = await fetch('/api/people-graph/search', {
      method: 'POST', headers: { authorization: `Bearer ${ctx.idToken}`, 'content-type': 'application/json' },
      body: JSON.stringify({ query: ctx.argumentText, channel: ctx.channel }),
    });
    if (!res.ok) throw new Error(`search failed (${res.status})`);   // the host toasts
    const { runId, pipelineId, graphId } = await res.json();
    return {
      kind: 'run', runId, pipelineId,
      // Merged into the message metadata with {kind:'agent-run', command, instruction, runId, pipelineId}.
      // `result` is what the finished card's "Open" opens.
      card: { agentName: 'People graph', result: { kind: 'panel', panel: { kind: 'graph', id: graphId, title: `Experts: ${ctx.argumentText}` } } },
    };
  },
};

// 2. The panel body for kind `graph`. The frame (title, Open full page, close) is the library's.
const renderers: ChatSidePanelRenderers = {
  graph: (panel, api) => <PeopleGraph graphId={panel.id} onTitle={api.setTitle} onPick={() => api.close()} />,
};

// 3. Nest under the app's providers; both layers merge, later wins by trigger / kind.
export function PeopleGraphPlugin({ children }) {
  return (
    <ChatCommandProvider commands={[search]}>
      <ChatSidePanelProvider renderers={renderers}>{children}</ChatSidePanelProvider>
    </ChatCommandProvider>
  );
}
```
The conversation page (already in the app) does the rest:

- Composer: `commands={chatCommandsToComposer(useChatCommands(), scopeCtx)}` — out-of-scope
  commands stay listed, disabled, with the reason as their hint.
- On send: `await useRunChatCommand()(text, ctx)` — `null` is plain text, `{kind:'run'}` posts
  the agent-run message, `{kind:'panel'}` calls `sidePanel.open(panel)`; a throw becomes a toast.
- Side pane: `ChatPanel onOpenResult={(r) => r.kind === 'panel' && openPanel(r.panel)}` and
  `<ChatSidePanel panel={panel} onClose={close} onOpenFullPage={(p) => navigate(`/graph/${p.id}`)} />`
  in the same `SplitPane` slot the `?doc=` document uses.
- Suggestions: `ChatPanel onReviewRun={(runId, decision, { key, documentId }) => reviewSuggestions(...)}` — a
  finished edit whose status carries `suggestion` offers Accept / Reject on the card until `review` names who decided.
- URL: `sidePanelToSearch(panel, location.search)` / `sidePanelFromSearch(location.search)` —
  documents stay `?doc=<id>`, everything else is `?panel=<kind>:<id>` (+ `panel.<key>` params).
