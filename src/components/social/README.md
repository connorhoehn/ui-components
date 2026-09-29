# Social — `@connorhoehnslalom/ui-components/social`

Chat, presence, reactions, posts, and follow-graph composites for
social surfaces. Root-reachable since v2.12.0 (hub#1058) under
disambiguated aliases — see the notes below.

Subpath import:

```tsx
import {
  ChatPanel,
  ChatRoom,
  RoomList,
  PostFeed,
  ReactionsBar,
  PresencePanel,
  ActivityPanel,
  SocialPanel,
} from '@connorhoehnslalom/ui-components/social';
// also reachable from the root barrel.
```

## Exports

| Export | Purpose |
|---|---|
| `ChatPanel` | Top-level chat surface: header, message list, composer, optional roster. Charter §1 no-touch — public props are a contract. |
| `ChatRoom` + `RoomList` | Multi-room chat shell. |
| `MessageRow` + `MessageGroup` | Row-level primitives extracted from ChatPanel (#985) for alternate layouts. |
| `ReactionsBar` + `ReactionPickerPopover` | Per-message reaction chip bar + cmdk-driven picker (#988). |
| `PresencePanel` | Live presence list (driven by `usePresence` in consumer apps or by `<WrappedPresencePanel>` in `/integrations`). |
| `ActivityPanel` | Activity-feed surface. |
| `PostFeed` + `GroupPanel` | Post and group composites. |
| `CommentThread` | Comment thread (also exported at root as `CommentThreadPanel` to avoid colliding with the `CommentThread` type export). |
| `SocialPanel` + `SocialTabContent` | Tabbed social shell. |

## Stability

**Stable.** Public ChatPanel props are on the charter §1 no-touch list.
Root-reachable since 2.12.0; `CommentThread` is aliased to
`CommentThreadPanel` at root to avoid colliding with the pre-existing
`CommentThread` type export.

## Wrapped variants

For consumer apps that use `@connorhoehn/realtime-modules` hooks
(`useChat`, `usePresence`, `useReactions`, …), the
[`integrations/realtime-modules`](../../integrations/realtime-modules)
layer ships pre-wired wrappers — `<WrappedChatPanel>`,
`<WrappedPresencePanel>`, `<WrappedReactionsOverlay>` — that take the
channel name and handle the hook plumbing internally.

## Context composer

`ContextComposer` (2.407.0, `…/social/rich-composer`; lazy on the root) is the
one composer for a conversation, a document, a work item, a diagram, an
initiative or a search: one idle row (mode pill, chips, placeholder, Send)
that expands to the `Agent ⌄` editor card, with each feature gated by its
`context` — see `composerContextPreset` in `composerContext.ts` for the table.

## Agent composer dock (deprecated)

Deprecated since 2.407.0 — a thin preset over `ContextComposer`.
`AgentComposerDock` (2.403.0, `…/social/rich-composer`; lazy on the root) is
the pinned composer a page docks under its content — the rich composer with
the mode menu, chips, `Workflow ⌄` and `/ commands` preset. See
`AgentComposerDock.md`.

## Tests + stories

- `ChatPanel`, `ReactionsBar`, `MessageRow`, `MessageGroup` have
  behavioural tests in `__tests__/`.
- `ReactionsBar.stories.tsx` covers the chip-bar variants.
- Older composites (ChatRoom, RoomList, PostFeed, PresencePanel) are
  light on tests; tracked under #1051.

## See also

- [`../../integrations/realtime-modules`](../../integrations/realtime-modules) —
  hook-wired variants.
- Demo route `/workflows/hook-chat` for the `useChat` integration.
