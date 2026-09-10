// src/components/social/composerCommands.ts
//
// The slash-command vocabulary, kept deliberately apart from the composer that
// renders it.
//
// WHY THIS FILE EXISTS. `RichChatComposer.tsx` statically imports
// `@tiptap/react`, `@tiptap/pm/state`, `@tiptap/extension-mention` and friends
// — all OPTIONAL peers. `social/index.ts` carries a long comment explaining
// that the composer must therefore never be re-exported from that barrel,
// because doing so puts tiptap in the import graph of every consumer of
// `ui-components/social`, including hosts that only wanted `ConversationList`
// or `ChatPanel`.
//
// The type and the matcher below were defined inside the composer, and the
// barrel re-exported *them* — which pulls the whole module just the same. A
// type export is erased at build time and costs nothing, but
// `matchComposerCommand` is a runtime binding, so the barrel dragged tiptap in
// through a seven-line pure string function. The aws-agentcore portal hit this
// as `"Plugin" is not exported by "__vite-optional-peer-dep:@tiptap/pm/state"`
// on a plain `vite build`, having imported nothing but `ChatPanel`.
//
// Neither symbol needs tiptap, React, or the DOM. They live here so the barrel
// can export them from a module that costs a consumer nothing, and the rule the
// barrel already documents stays true instead of being true only of the
// component's name.

/** One entry in a composer's slash-command menu. */
export interface ComposerCommand {
  /** The leading token, e.g. `/doc`. Matched case-insensitively at the start of the draft. */
  trigger: string;
  /** What it does — "Edit the open document with Haiku". */
  label: string;
  /** A second clause: what it needs, or what will happen. */
  hint?: string;
  /** True when the command cannot run right now (no document open); the bar says why via `hint`. */
  disabled?: boolean;
  /** The long form, shown as a tooltip on the bar: what will happen, step by step. */
  description?: string;
}

/** The command a draft is addressing, or null. `/doc`, `/doc …`, never `/document`. */
export function matchComposerCommand(draft: string, commands: readonly ComposerCommand[] | undefined): ComposerCommand | null {
  if (!commands || commands.length === 0) return null;
  const text = draft.trimStart().toLowerCase();
  return commands.find((c) => {
    const t = c.trigger.toLowerCase();
    return text === t || text.startsWith(`${t} `) || text.startsWith(`${t}\n`);
  }) ?? null;
}
