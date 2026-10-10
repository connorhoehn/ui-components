// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE
//
// Fork change: `generateId` is required and returns a SuggestionIdentity. There
// is no fallback — without a current user we would silently attribute edits to
// nobody, which is worse than a loud failure.
//
// The y-sync / y-undo guards below are the reason 0.1.8 specifically is the
// version to vendor: a remote Yjs update arrives as an ordinary transaction and
// would otherwise be re-tracked as a local suggestion, duplicating every peer's
// edit as your own.

import type { Node, Schema } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import {
  AddMarkStep,
  AddNodeMarkStep,
  AttrStep,
  RemoveMarkStep,
  RemoveNodeMarkStep,
  ReplaceAroundStep,
  ReplaceStep,
  type Step,
} from '@tiptap/pm/transform';
import type { EditorView } from '@tiptap/pm/view';

import { trackAddMarkStep } from './addMarkStep';
import { trackAddNodeMarkStep } from './addNodeMarkStep';
import { trackAttrStep } from './attrStep';
import type { SuggestionIdentity } from './identity';
import { isSuggestChangesEnabled, suggestChangesKey } from './plugin';
import { suggestRemoveMarkStep } from './removeMarkStep';
import { suggestRemoveNodeMarkStep } from './removeNodeMarkStep';
import { suggestReplaceAroundStep } from './replaceAroundStep';
import { suggestReplaceStep } from './replaceStep';
import { getSuggestionMarks } from './utils';

export type SuggestionIdentityFactory = (schema: Schema, doc?: Node) => SuggestionIdentity;

type StepHandler = (
  trackedTransaction: Transaction,
  state: EditorState,
  doc: Node,
  // Each handler narrows this to its own step type.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  step: any,
  prevSteps: readonly Step[],
  suggestionId: SuggestionIdentity,
) => boolean;

function getStepHandler(step: Step): StepHandler {
  if (step instanceof ReplaceStep) return suggestReplaceStep;
  if (step instanceof ReplaceAroundStep) return suggestReplaceAroundStep;
  if (step instanceof AddMarkStep) return trackAddMarkStep;
  if (step instanceof RemoveMarkStep) return suggestRemoveMarkStep;
  if (step instanceof AddNodeMarkStep) return trackAddNodeMarkStep;
  if (step instanceof RemoveNodeMarkStep) return suggestRemoveNodeMarkStep;
  if (step instanceof AttrStep) return trackAttrStep;
  // Default handler — rebase the step onto the tracked transaction and apply it
  return (trackedTransaction, _state, _doc, unknownStep: Step, prevSteps) => {
    const reset = prevSteps
      .slice()
      .reverse()
      .reduce<Step | null>((acc, s) => acc?.map(s.getMap().invert()) ?? null, unknownStep);
    const rebased = trackedTransaction.steps.reduce<Step | null>(
      (acc, s) => acc?.map(s.getMap()) ?? null,
      reset,
    );
    if (rebased) {
      trackedTransaction.step(rebased);
    }
    return false;
  };
}

/**
 * Given a standard transaction from ProseMirror, produce a new transaction that
 * SUGGESTS the changes from the original rather than applying them.
 *
 * For each type of step there is custom behavior that prevents deletions from
 * being removed from the document — adding deletion marks instead — and ensures
 * all insertions carry insertion marks.
 */
export function transformToSuggestionTransaction(
  originalTransaction: Transaction,
  state: EditorState,
  generateId: SuggestionIdentityFactory,
): Transaction {
  // Throws early with a useful message if the marks aren't registered
  getSuggestionMarks(state.schema);

  let suggestionId = generateId(state.schema, originalTransaction.docs[0]);

  // Build a new transaction from scratch; the original is dropped.
  const trackedTransaction = state.tr;

  for (let i = 0; i < originalTransaction.steps.length; i++) {
    const step = originalTransaction.steps[i]!;
    const doc = originalTransaction.docs[i]!;
    const stepTracker = getStepHandler(step);
    const used = stepTracker(
      trackedTransaction,
      state,
      doc,
      step,
      originalTransaction.steps.slice(0, i),
      suggestionId,
    );
    if (used && i < originalTransaction.steps.length - 1) {
      // Re-derive the identity so a transaction spanning a bucket boundary
      // lands its later steps in the new bucket.
      suggestionId = generateId(state.schema, trackedTransaction.doc);
    }
  }

  if (originalTransaction.selectionSet && !trackedTransaction.selectionSet) {
    // Map the original selection backwards through the original transaction and
    // then forwards through the new one.
    const originalBaseDoc = originalTransaction.docs[0];
    const base = originalBaseDoc
      ? originalTransaction.selection.map(originalBaseDoc, originalTransaction.mapping.invert())
      : originalTransaction.selection;
    trackedTransaction.setSelection(base.map(trackedTransaction.doc, trackedTransaction.mapping));
  }
  if (originalTransaction.scrolledIntoView) {
    trackedTransaction.scrollIntoView();
  }
  if (originalTransaction.storedMarksSet) {
    trackedTransaction.setStoredMarks(originalTransaction.storedMarks);
  }

  // Preserve original transaction meta exactly as-is
  (trackedTransaction as unknown as { meta: unknown }).meta = (
    originalTransaction as unknown as { meta: unknown }
  ).meta;

  return trackedTransaction;
}

/** True when this transaction must be applied verbatim, never re-tracked. */
export function shouldSkipSuggestChanges(tr: Transaction): boolean {
  const ySyncMeta = (tr.getMeta('y-sync$') ?? {}) as {
    isUndoRedoOperation?: boolean;
    isChangeOrigin?: boolean;
  };
  return (
    !!tr.getMeta('history$') ||
    !!tr.getMeta('collab$') ||
    !!ySyncMeta.isUndoRedoOperation ||
    // A remote Yjs update. Re-tracking it would duplicate a peer's edit as ours.
    !!ySyncMeta.isChangeOrigin ||
    'skip' in ((tr.getMeta(suggestChangesKey) ?? {}) as Record<string, unknown>)
  );
}

/**
 * A `dispatchTransaction` decorator. Wrap an existing `dispatchTransaction`
 * function with `withSuggestChanges`, or pass no dispatch to use the default
 * implementation.
 *
 * The result intercepts and rewrites incoming transactions while suggestion
 * mode is enabled, so that they suggest changes instead of applying them.
 */
export function withSuggestChanges(
  dispatchTransaction: EditorView['dispatch'] | undefined,
  generateId: SuggestionIdentityFactory,
): EditorView['dispatch'] {
  const dispatch =
    dispatchTransaction ??
    function (this: EditorView, tr: Transaction) {
      this.updateState(this.state.apply(tr));
    };

  return function dispatchWithSuggestChanges(this: EditorView, tr: Transaction) {
    const transaction =
      isSuggestChangesEnabled(this.state) && !shouldSkipSuggestChanges(tr)
        ? transformToSuggestionTransaction(tr, this.state, generateId)
        : tr;
    dispatch.call(this, transaction);
  };
}
