# Chat commands — `/search` with a `graph` side panel

A `ChatCommand` is a composer slash command plus `run` (what sending it does) and `scope`
(where it is offered). Providers nest and MERGE, so a plugin adds `/search` beside the app's
`/doc`. The library owns the card, the side-panel frame AND the graph body; the host owns the
pipeline route and the `load` that turns a panel ref into data. All of it is tiptap-free
(`ui-components/social` + `ui-components/graph`).

```tsx
import {
  ChatCommandProvider, ChatSidePanelProvider, ChatSidePanel,
  useChatCommands, useRunChatCommand, chatCommandsToComposer,
  sidePanelToSearch, sidePanelFromSearch, type ChatCommand,
} from '@connorhoehn/ui-components/social';
import { createGraphPanelRenderer } from '@connorhoehn/ui-components/graph';

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

// 2. The panel body for kind `graph` — one line. `load` answers with EITHER
//    { title?, people: [{ id, name, title?, avatarUrl?, tags?, score? }], query }  → PeopleGraph
//    (query in the middle, people around it, edges labelled by the matching tag, a list with
//    Message / Open), OR { title?, nodes, edges, layout? } → a plain NodeGraph. Loading shows a
//    skeleton, a throw shows an InlineAlert with "Try again", `title` replaces the frame header.
const renderers = {
  graph: createGraphPanelRenderer({
    load: async (panel) => (await fetch(`/api/people-graph/${panel.id}`)).json(),
    onOpenPerson: (id, { api }) => { api.close(); navigate(`/people/${id}`); },
    onMessagePerson: (id) => openDm(id),
  }),
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
- `#` documents: `RichChatComposer onSearchDocuments={(q) => searchDocuments(q)}` (from `social/rich-composer`;
  `DocumentCandidate = { id, label, hint?, icon? }`) opens a document menu at any word-start `#`; the pick is a
  `docref` atom and `onSend` carries `documents: [{ id, label }]` — put it on the message as `metadata.documents`.
  `ChatPanel` renders those as 📄 chips under the text and opens them through its `onOpenDocument`.
- Suggestions: `ChatPanel onReviewRun={(runId, decision, { key, documentId }) => reviewSuggestions(...)}` — a
  finished edit whose status carries `suggestion` offers Accept / Reject on the card until `review` names who decided.
- A run beside the chat: `renderers={{ run: createRunPanelRenderer({ load, onOpenFull, onOpenChat }) }}` — the
  condensed read-only run (`RunSummaryPanel`: status, steps, what changed, document/result, error) for
  `?panel=run:<pipelineId>:<runId>` (`runPanelId` / `parseRunPanelId`). `load` answers `RunPanelData`; the body
  re-loads every 2s while the run is running/awaiting. The footer is "Open full run" and, when the data names a
  `channel`, "Open chat". `ChatPanel onOpenRun` should open this panel, not leave the conversation.
- URL: `sidePanelToSearch(panel, location.search)` / `sidePanelFromSearch(location.search)` —
  documents stay `?doc=<id>`, everything else is `?panel=<kind>:<id>` (+ `panel.<key>` params).
- Outside a chat: `<NodeGraph nodes edges layout="radial|grid|force" selectedId onSelect />` and
  `<PeopleGraph people query onOpenPerson onMessagePerson />` are plain components from
  `ui-components/graph`; layouts are deterministic, pan by drag, zoom by wheel, Enter selects.
