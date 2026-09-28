# AgentComposerDock

Import: `import { AgentComposerDock, composerDraftOf } from '@connorhoehnslalom/ui-components/social/rich-composer'`
(static — the subpath that already declares the tiptap peers). The root barrel
exports the same component behind `React.lazy`, so importing the root never
needs `@tiptap/extension-mention`/`@tiptap/pm`; it renders once its chunk loads.

The agent composer a page docks under its content — the Initiative Work page's
composer as one composite: a pinned `FloatingComposerDock` holding a
`RichChatComposer` preset with the `Agent ⌄` mode menu (`⌥n` shortcuts, `/run `
and `>` triggers), the draft's chips, the B I code link (list quote) attach
strip, a `Workflow ⌄` menu, `/ commands` and Send. Use it wherever a page asks
an agent about its subject (initiatives, a work item, Search). Use
`RichChatComposer` directly for a chat column.

The host supplies words and callbacks: `placeholder`/`modePlaceholders`,
`references` + `onRemoveReference`, `commands`, `workflows` (rows with
`disabled` + `disabledReason`), `onSend(message, { mode })`. `presentation`
`document` gives the full editor strip and comfortable density; `compact` (the
default) the light card. Chat and Terminal are disabled by default with
reasons; override with `disabledModes` / `modeUnavailableReasons`.

- **Workflow pick** seeds the draft with `/<id> ` and remounts the editor
  (so the command chip shows); pass `onWorkflow` to do something else.
- **Send** receives what was TYPED: the switchable Agent mode's `/agent `
  prefix is removed and `command` is re-matched against `commands`. Return (or
  resolve) `false` to keep the draft.
- **Argument picks** survive typing (2.403.1): pick "Advisor" from `/agent`'s
  argument menu, type the question, and `onSend` gets `command`
  `{ trigger: '/agent', argument: { id: 'advisor', label: 'Advisor', … } }`
  with `text` `/agent Advisor <question>` — the command line is hidden behind
  the chip, not removed, and the typed words land on that same line. Read the
  pick from `command.argument` rather than re-parsing the label out of `text`.
  Enter with nothing typed after the pick still sends the bare command; return
  `false` to keep it.
- **Accessible name**: `inputLabel` (default "Message") is the editor's
  `aria-label`; the editor is a `role="textbox"` with `aria-multiline="true"`,
  so tests and screen readers find it as `getByRole('textbox', { name })`.
  `label` names the surrounding region, not the textbox.
- **Draft**: uncontrolled with `defaultDraft` (text or a draft), reset whenever
  `draftKey` changes; or controlled with `draft` + `onDraftChange`.
  `composerDraftOf(text)` builds a draft from plain text.
- **Context**: `onSearchDocuments` + `documentMenu` give the `#` "Add context"
  card, `onSearchPeople` the `@` menu. `composerRef` is the live
  `RichChatComposerHandle` (its `editor` for docref bookkeeping).
- Also: `allowAttachments` (default true), `allowEmoji`, `disabled`, `working`,
  `status`, `hints`, `suggestions`/`onSuggestion`, `submitLabel`,
  `maxInputHeight`, `label` (the region's name, default "Agent composer"),
  `className` (on the dock), `data-testid` (dock, default
  `agent-composer-dock`; the Workflow trigger is `<id>-workflow`),
  `composerTestId` (the composer's parts derive from it).

Storybook: Social/AgentComposerDock (DocumentWithWorkflows, Compact,
ChatDisabledWithReason, SearchLike).
