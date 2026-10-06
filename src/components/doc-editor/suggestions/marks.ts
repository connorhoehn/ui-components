// frontend/src/editor/suggestions/marks.ts
//
// The three suggestion marks, as Tiptap extensions.
//
// Every non-obvious choice here is load-bearing. Read the comments before
// changing any of them.

import { Mark, mergeAttributes } from '@tiptap/core';

import {
  SUGGESTION_DELETE_MARK,
  SUGGESTION_INSERT_MARK,
  SUGGESTION_MODIFY_MARK,
  suggestionDateValidate,
  suggestionUserValidate,
} from './vendor';

/**
 * Who made the suggestion and when, as HTML data attributes + schema attrs.
 *
 * `date` is bucketed to ten minutes by `createSuggestionIdentity`, so a burst
 * of edits from one author shares one identity, is `Mark.eq`-equal, and joins
 * into a single suggestion instead of fragmenting into one per keystroke.
 *
 * All three are `isRequired`, so they have no schema default. A suggestion mark
 * that somehow reaches the document without an author would otherwise be
 * silently attributed to the empty string, and the review panel would show an
 * anonymous change nobody can account for. Failing loudly is the point.
 */
const identityAttributes = {
  user: {
    isRequired: true,
    validate: suggestionUserValidate,
    parseHTML: (element: HTMLElement) => element.getAttribute('data-suggestion-user'),
    renderHTML: (attributes: Record<string, unknown>) => ({
      'data-suggestion-user': attributes['user'],
    }),
  },
  username: {
    isRequired: true,
    validate: suggestionUserValidate,
    parseHTML: (element: HTMLElement) => element.getAttribute('data-suggestion-username'),
    renderHTML: (attributes: Record<string, unknown>) => ({
      'data-suggestion-username': attributes['username'],
    }),
  },
  date: {
    isRequired: true,
    validate: suggestionDateValidate,
    parseHTML: (element: HTMLElement) => {
      const raw = element.getAttribute('data-suggestion-date');
      return raw === null ? null : Number(raw);
    },
    renderHTML: (attributes: Record<string, unknown>) => ({
      'data-suggestion-date': String(attributes['date']),
    }),
  },
};

/** True only when every identity attribute is present on the element. */
function hasIdentity(element: HTMLElement): boolean {
  return (
    element.hasAttribute('data-suggestion-user') &&
    element.hasAttribute('data-suggestion-username') &&
    element.hasAttribute('data-suggestion-date')
  );
}

/**
 * `excludes: ''` — DO NOT "CLEAN THIS UP".
 *
 * A ProseMirror mark excludes itself by default, so `addToSet` REPLACES an
 * existing mark of the same type that has different attrs. Two reviewers
 * suggesting a deletion over the same words would then be last-write-wins: the
 * second author's mark silently evicts the first author's, with no error and no
 * visible symptom until someone notices their comment vanished. Under Yjs the
 * failure is worse, because whose write lands last is a race.
 *
 * The empty string means "excludes nothing", so both authors' marks coexist on
 * the same text node and each can be accepted or rejected independently.
 * `frontend/src/editor/suggestions/__tests__/suggestions.test.ts` has a
 * regression test that goes red the moment this is changed.
 */
const EXCLUDES_NOTHING = '';

/**
 * `inclusive: false` — typing at the very edge of a suggestion must not silently
 * extend it. A cursor placed just after suggested text produces ordinary text
 * until the tracking machinery decides otherwise.
 */
const INCLUSIVE = false;

/** Text the author has suggested adding. */
export const SuggestionInsert = Mark.create({
  name: SUGGESTION_INSERT_MARK,
  inclusive: INCLUSIVE,
  excludes: EXCLUDES_NOTHING,

  addAttributes() {
    return { ...identityAttributes };
  },

  parseHTML() {
    return [
      {
        tag: 'ins[data-suggestion-user]',
        // Above the default 50, so a formatting extension that also claims <ins>
        // (Underline does, in some configurations) can't win the element and
        // strip the attribution.
        priority: 60,
        getAttrs: (element) => (hasIdentity(element as HTMLElement) ? null : false),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['ins', mergeAttributes(HTMLAttributes, { class: 'suggestion suggestion--insert' }), 0];
  },
});

/** Text the author has suggested removing. Still present until accepted. */
export const SuggestionDelete = Mark.create({
  name: SUGGESTION_DELETE_MARK,
  inclusive: INCLUSIVE,
  excludes: EXCLUDES_NOTHING,

  addAttributes() {
    return { ...identityAttributes };
  },

  parseHTML() {
    return [
      {
        tag: 'del[data-suggestion-user]',
        // Beats StarterKit's Strike rule, which also claims <del>. Without this,
        // pasting or re-parsing a suggestion turns it into strikethrough text
        // and the attribution is gone.
        priority: 60,
        getAttrs: (element) => (hasIdentity(element as HTMLElement) ? null : false),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['del', mergeAttributes(HTMLAttributes, { class: 'suggestion suggestion--delete' }), 0];
  },
});

/**
 * A suggested change to a node's attributes, marks or type (bold, heading
 * level, list type...). Carries the identity attrs plus enough of the old value
 * to roll the change back on reject.
 */
export const SuggestionModify = Mark.create({
  name: SUGGESTION_MODIFY_MARK,
  inclusive: INCLUSIVE,
  excludes: EXCLUDES_NOTHING,

  addAttributes() {
    return {
      ...identityAttributes,
      // 'attr' | 'mark' | 'nodeType'
      type: {
        isRequired: true,
        validate: 'string',
        parseHTML: (element: HTMLElement) => element.getAttribute('data-suggestion-modify-type'),
        renderHTML: (attributes: Record<string, unknown>) => ({
          'data-suggestion-modify-type': attributes['type'],
        }),
      },
      attrName: {
        default: null,
        validate: 'string|null',
        parseHTML: (element: HTMLElement) => element.getAttribute('data-suggestion-attr-name'),
        renderHTML: (attributes: Record<string, unknown>) =>
          attributes['attrName'] == null
            ? {}
            : { 'data-suggestion-attr-name': attributes['attrName'] },
      },
      previousValue: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const raw = element.getAttribute('data-suggestion-prev');
          return raw === null ? null : (JSON.parse(raw) as unknown);
        },
        renderHTML: (attributes: Record<string, unknown>) =>
          attributes['previousValue'] === undefined
            ? {}
            : { 'data-suggestion-prev': JSON.stringify(attributes['previousValue'] ?? null) },
      },
      newValue: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const raw = element.getAttribute('data-suggestion-next');
          return raw === null ? null : (JSON.parse(raw) as unknown);
        },
        renderHTML: (attributes: Record<string, unknown>) =>
          attributes['newValue'] === undefined
            ? {}
            : { 'data-suggestion-next': JSON.stringify(attributes['newValue'] ?? null) },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-suggestion-modify-type]',
        // Above the default 50 — plain <span> rules are common and would
        // otherwise consume the element first.
        priority: 60,
        getAttrs: (element) => (hasIdentity(element as HTMLElement) ? null : false),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { class: 'suggestion suggestion--modify' }), 0];
  },
});

/** All three suggestion marks, ready to spread into an extension list. */
export const SuggestionMarks = [SuggestionInsert, SuggestionDelete, SuggestionModify];
