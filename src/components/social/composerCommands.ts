// composerCommands.ts — the slash-command vocabulary and the two pure matchers.
//
// Deliberately tiptap-free: the `social` barrel re-exports these so a host can
// describe its commands and test a draft against them without pulling the
// editor (and its optional @tiptap peers) into a bundle that never renders one.
// RichChatComposer imports and re-exports them so the rich-composer subpath
// keeps its public surface.

export interface ComposerArgumentItem {
  /** Stable identity — this is what travels to the host, not the label. */
  id: string;
  label: string;
  /** Shown on the right of the row: where it lives, who owns it. */
  hint?: string;
  /** A glyph for the row, e.g. `📄`. */
  icon?: string;
}

export interface ComposerCommandArgument {
  /** Shown in the status bar while the argument is empty — "type a document name". */
  placeholder?: string;
  /**
   * Resolves the argument menu from the text after the trigger. A promise is
   * supported (and debounced ~120ms) so a host can hit an index rather than
   * filter a preloaded array; the previous list stays up while a new one is
   * in flight.
   */
  search: (query: string) => ComposerArgumentItem[] | Promise<ComposerArgumentItem[]>;
  /**
   * What picking a row does. `'execute'` clears the draft and calls
   * `onCommand` — the pick WAS the message. `'insert'` (the default) writes the
   * label into the draft so the person can keep typing, and the pick travels
   * on send as `ComposedMessage.command.argument`.
   */
  onPick?: (item: ComposerArgumentItem) => 'execute' | 'insert';
}

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
  /** What the command acts on, offered as a second menu once the trigger is typed. */
  argument?: ComposerCommandArgument;
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

/**
 * The text after a matched command's trigger and its one separator:
 * `/doc Roadmap` → `Roadmap`, `/doc` → ``. Leading whitespace beyond the
 * separator is kept, so callers replacing the argument know its exact extent.
 */
export function composerCommandArgumentText(draft: string, command: ComposerCommand): string {
  return draft.trimStart().slice(command.trigger.length).replace(/^[ \n]/, '');
}
