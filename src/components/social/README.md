# Social — `@connorhoehnslalom/ui-components/social`

Chat, presence, reactions, posts, and follow-graph composites for
social surfaces. Also reachable from the root barrel, under
disambiguated aliases where names collide — see the notes below.

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
| `ChatPanel` | Top-level chat surface: header, message list, composer, optional roster. Its public props are a contract. |
| `ChatRoom` + `RoomList` | Multi-room chat shell. |
| `MessageRow` + `MessageGroup` | Row-level primitives extracted from ChatPanel for alternate layouts. |
| `ReactionsBar` + `ReactionPickerPopover` | Per-message reaction chip bar + cmdk-driven picker. |
| `PresencePanel` | Live presence list (driven by `usePresence` in consumer apps or by `<WrappedPresencePanel>` in `/integrations`). |
| `ActivityPanel` | Activity-feed surface. |
| `PostFeed` + `GroupPanel` | Post and group composites. |
| `CommentThread` | Comment thread (also exported at root as `CommentThreadPanel` to avoid colliding with the `CommentThread` type export). |
| `SocialPanel` + `SocialTabContent` | Tabbed social shell. |

## Stability

**Stable.** Public `ChatPanel` props are a contract; changing them needs a
major version bump. `CommentThread` is aliased to `CommentThreadPanel` at
root to avoid colliding with the `CommentThread` type export.

## Wrapped variants

For consumer apps that use `@connorhoehn/realtime-modules` hooks
(`useChat`, `usePresence`, `useReactions`, …), the
[`integrations/realtime-modules`](../../integrations/realtime-modules)
layer ships pre-wired wrappers — `<WrappedChatPanel>`,
`<WrappedPresencePanel>`, `<WrappedReactionsOverlay>` — that take the
channel name and handle the hook plumbing internally.

## Context composer

`ContextComposer` (`…/social/rich-composer`; lazy on the root) is the
one composer for a conversation, a document, a work item, a diagram, an
initiative or a search: one idle row (mode pill, chips, placeholder, Send)
that expands to the `Agent ⌄` editor card, with each feature gated by its
`context` — see `composerContextPreset` in `composerContext.ts` for the table.
A host's own controls go in four slots that stay off the idle row:
`submitLead` (beside Send), `modeRowEnd` (a scope switch), `referencesAction`
(after the chips) and `referenceDrop` (the card as a drop target, idle too).

`presentation="prompt"` (2.510.0) is the quiet prompt box for a host whose
composer takes one instruction (Studio's work composer): the record and any
references in one header row with `modeRowEnd`, the suggestion chips, the
text box and one button that reads `submitLabel` — no mode label or menu, no
`/ commands` hint, no glyph on Send. A command with no `argument` picked from
the `/` menu is sent at once (a `ConversationComposer` runs its `run` with
empty `argumentText`), and references never add a row.

## Composer prompts and the confirm flow

`ComposerPromptDeck` (`/social/rich-composer`) asks a page's questions in the
docked composer, one card at a time, answered from the keyboard
(`composerPromptModel.ts` holds the contract). An answer may
resolve `{ next: ComposerPrompt }` to route to a follow-up in the same card
(no receipt; Back returns to the question), a prompt may carry a `path`
(`DecisionPath` on `/shared`: "Choose → Draft request → Confirm → Done"), and
`kind: 'compose'` draws `ComposerConfirmFlow` inside the card — a prefilled,
editable message, its review and its done state, with no modal and no toolbar.
`ComposerConfirmFlow` is also exported on its own.

`ComposerPrompt.back` (2.510.0, `{ label?, onBack, disabledReason? }`) draws a
ghost Back in the card header, on a one-prompt deck too; a `{ next }`
follow-up without one gets a Back to the question it followed. Alt+Backspace
takes it while the input is empty.

For text/number questions where the deck owns the input, `inputDraft` lets the
host retain unsent text across remounts or conflicts. The host chooses its
persistence scope and clears it after acceptance. It does not control an
external editor bridge or the separate compose message flow.

## Agent composer dock (deprecated)

Deprecated: a thin preset over `ContextComposer`.
`AgentComposerDock` (`…/social/rich-composer`; lazy on the root) is
the pinned composer a page docks under its content — the rich composer with
the mode menu, chips, `Workflow ⌄` and `/ commands` preset. See
`AgentComposerDock.md`.

## Tests + stories

- `ChatPanel`, `ReactionsBar`, `MessageRow`, `MessageGroup` have
  behavioural tests in `__tests__/`.
- `ReactionsBar.stories.tsx` covers the chip-bar variants.

## See also

- [`../../integrations/realtime-modules`](../../integrations/realtime-modules) —
  hook-wired variants.
- Demo route `/workflows/hook-chat` for the `useChat` integration.
