// frontend/src/editor/suggestions/SuggestChanges.ts
//
// Suggestion mode ("track changes") as a Tiptap extension.
//
// With the mode ON, every ordinary edit — typing, deleting, formatting, pasting
// — is rewritten before it is dispatched so that it SUGGESTS the change instead
// of making it. With the mode OFF the editor behaves exactly as it does today;
// the rewrite is bypassed entirely.

import { Extension, type Editor } from '@tiptap/core';

import { SuggestionMarks } from './marks';
import {
  applySuggestion,
  applySuggestions,
  createSuggestionIdentity,
  isSuggestChangesEnabled,
  revertSuggestion,
  revertSuggestions,
  selectSuggestion,
  shouldSkipSuggestChanges,
  suggestChanges,
  suggestChangesKey,
  transformToSuggestionTransaction,
  type SuggestionIdentity,
} from './vendor';

export interface SuggestionUser {
  /** Stable user id — the attribution key. */
  id: string;
  /** Display name. */
  name: string;
}

export interface SuggestChangesOptions {
  /** Author every suggestion made through this editor is attributed to. */
  user: SuggestionUser;
  /** Whether suggestion mode starts on. */
  enabled: boolean;
  /** Clock seam, so tests can drive the ten-minute bucketing deterministically. */
  now: () => number;
  /**
   * Called with this editor instance on create; the returned function runs on
   * destroy. This is how a DOCUMENT-level suggestion toggle reaches every
   * section: a document renders N independent section editors, suggestion
   * mode lives in each one's ProseMirror plugin state, and the host adapter
   * (realtime-modules' TiptapEditor) exposes no editor handle. Registering
   * from inside the extension keeps that coordination here instead of
   * requiring a new prop on the adapter.
   */
  register?: (editor: Editor) => (() => void) | void;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    suggestChanges: {
      /** Turn suggestion mode on or off. */
      setSuggestionMode: (enabled: boolean) => ReturnType;
      /** Flip suggestion mode. */
      toggleSuggestionMode: () => ReturnType;
      /** Accept one suggestion: keep its insertions, remove its deletions. */
      acceptSuggestion: (id: SuggestionIdentity) => ReturnType;
      /** Reject one suggestion: drop its insertions, restore its deletions. */
      rejectSuggestion: (id: SuggestionIdentity) => ReturnType;
      /** Accept every suggestion in the document. */
      acceptAllSuggestions: () => ReturnType;
      /** Reject every suggestion in the document. */
      rejectAllSuggestions: () => ReturnType;
      /** Move the selection onto a suggestion. */
      selectSuggestion: (id: SuggestionIdentity) => ReturnType;
    };
  }
}

interface SuggestChangesStorage {
  unregister?: (() => void) | undefined;
  /**
   * Temporarily attribute suggestions to someone other than `options.user`.
   *
   * Set for the duration of ONE synchronous apply by `authorSuggestionsAs`, and
   * always cleared afterwards. It exists because an AI proposal must not be
   * attributed to the human whose editor happens to be applying it — and,
   * separately, because two AI proposals must not merge into one.
   */
  authorOverride?: SuggestionUser | undefined;
}

export const SuggestChanges = Extension.create<SuggestChangesOptions>({
  name: 'suggestChanges',

  addOptions() {
    return {
      user: { id: 'anonymous', name: 'Anonymous' },
      enabled: false,
      now: () => Date.now(),
    };
  },

  addStorage(): SuggestChangesStorage {
    return { unregister: undefined, authorOverride: undefined };
  },

  /**
   * The three suggestion marks come WITH this extension. They are not optional
   * and they are not the caller's job.
   *
   * They used to be: every call site had to remember to spread `SuggestionMarks`
   * alongside `SuggestChanges.configure(...)`. `SuggestionModeContext` forgot,
   * and the result was not a degraded editor but a dead one — the plugin's
   * `decorations` prop calls `getSuggestionMarks(state.schema)` on EVERY render,
   * so a missing mark threw before the first keystroke and the whole Documents
   * page rendered an error card instead of an editor. The failure had nothing to
   * do with suggesting anything, which is exactly why nobody connected the two.
   *
   * Tiptap flattens `addExtensions()` into the resolved list before it builds
   * the schema, so registering this extension now registers the marks by
   * construction. Do NOT also spread `SuggestionMarks` at a call site — Tiptap
   * does not de-duplicate by name, it only warns.
   */
  addExtensions() {
    return [...SuggestionMarks];
  },

  addProseMirrorPlugins() {
    return [suggestChanges(this.options.enabled)];
  },

  onCreate() {
    const unregister = this.options.register?.(this.editor);
    if (typeof unregister === 'function') {
      this.storage.unregister = unregister;
    }
  },

  onDestroy() {
    const unregister = (this.storage as SuggestChangesStorage).unregister;
    if (unregister) {
      unregister();
      (this.storage as SuggestChangesStorage).unregister = undefined;
    }
  },

  /**
   * Tiptap's extension-level dispatch hook. This is the whole mechanism: the
   * transaction the editor was about to apply is swapped for one that records
   * the same edit as a suggestion.
   *
   * `shouldSkipSuggestChanges` is what keeps this safe under Yjs — a remote
   * peer's update arrives here as an ordinary transaction, and re-tracking it
   * would duplicate their edit as our own suggestion.
   */
  dispatchTransaction({ transaction, next }) {
    const state = this.editor.state;
    if (!isSuggestChangesEnabled(state) || shouldSkipSuggestChanges(transaction)) {
      next(transaction);
      return;
    }
    const { user, now } = this.options;
    const override = (this.storage as SuggestChangesStorage).authorOverride;
    const author = override ?? user;
    next(
      transformToSuggestionTransaction(transaction, state, () =>
        createSuggestionIdentity(author.id, author.name, now()),
      ),
    );
  },

  addCommands() {
    return {
      setSuggestionMode:
        (enabled: boolean) =>
        ({ state, dispatch }) => {
          if (!suggestChangesKey.getState(state)) return false;
          // `skip: true` so this control transaction is never itself tracked.
          dispatch?.(state.tr.setMeta(suggestChangesKey, { skip: true, enabled }));
          return true;
        },

      toggleSuggestionMode:
        () =>
        ({ state, dispatch }) => {
          const pluginState = suggestChangesKey.getState(state);
          if (!pluginState) return false;
          dispatch?.(
            state.tr.setMeta(suggestChangesKey, { skip: true, enabled: !pluginState.enabled }),
          );
          return true;
        },

      acceptSuggestion:
        (id: SuggestionIdentity) =>
        ({ state, dispatch }) =>
          applySuggestion(id)(state, dispatch),

      rejectSuggestion:
        (id: SuggestionIdentity) =>
        ({ state, dispatch }) =>
          revertSuggestion(id)(state, dispatch),

      acceptAllSuggestions:
        () =>
        ({ state, dispatch }) =>
          applySuggestions(state, dispatch),

      rejectAllSuggestions:
        () =>
        ({ state, dispatch }) =>
          revertSuggestions(state, dispatch),

      selectSuggestion:
        (id: SuggestionIdentity) =>
        ({ state, dispatch }) =>
          selectSuggestion(id)(state, dispatch),
    };
  },

  addKeyboardShortcuts() {
    return {
      // Word uses Ctrl+Shift+E for the same thing.
      'Mod-Shift-e': () => this.editor.commands.toggleSuggestionMode(),
    };
  },
});

/**
 * Run `edit` with its suggestions attributed to `author` instead of the editor's
 * own user, turning suggestion mode on for the duration if it was off.
 *
 * Two separate problems make this necessary, and both are silent if unhandled.
 *
 * ATTRIBUTION. An AI proposal is applied by whichever browser is looking at the
 * document. Without an override the marks would carry that person's identity,
 * and the document would show a human proposing an edit they never wrote. Every
 * collaborator sees unreviewed marks the moment they exist — Gemini keeps its
 * own private until approved and we do not — so the only thing standing between
 * "a proposal" and "an agreed edit" is the name on it. It has to be right.
 *
 * SEPARATION. A suggestion's identity is `user@date` with the date floored to a
 * ten-minute bucket, deliberately, so a burst of typing reads as one suggestion.
 * That is right for a person and wrong for us: two AI proposals drafted eight
 * minutes apart would land in the same bucket, share an identity, merge into one
 * un-separable suggestion, and a human accepting one would accept both. Passing
 * `ai:<proposalId>` as the id makes every proposal its own author and the
 * bucketing irrelevant.
 *
 * `edit` must be synchronous. The override is a single mutable slot on the
 * editor, and an async callback would leave it set while unrelated keystrokes
 * were dispatched.
 */
export function authorSuggestionsAs(
  editor: Editor,
  author: SuggestionUser,
  edit: () => void,
): void {
  // Tiptap's `Storage` interface is declaration-merged per extension and this
  // extension does not contribute to it, so the index needs a cast.
  const storage = (editor.storage as unknown as Record<string, SuggestChangesStorage | undefined>)[
    'suggestChanges'
  ];
  if (!storage) {
    throw new Error('authorSuggestionsAs: the SuggestChanges extension is not on this editor');
  }
  const previousAuthor = storage.authorOverride;
  const wasEnabled = isSuggestChangesEnabled(editor.state);

  storage.authorOverride = author;
  if (!wasEnabled) editor.commands.setSuggestionMode(true);
  try {
    edit();
  } finally {
    // Restore in the opposite order, and unconditionally: leaving the override
    // set would silently mis-attribute the next thing the user types.
    if (!wasEnabled) editor.commands.setSuggestionMode(false);
    storage.authorOverride = previousAuthor;
  }
}

/** The author id every proposal's marks carry. One per proposal, never shared. */
export function proposalAuthor(proposalId: string, label = 'AI proposal'): SuggestionUser {
  return { id: `ai:${proposalId}`, name: label };
}
