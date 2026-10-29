import { describe, expect, it } from 'vitest';
import {
  activeIndex,
  answerForOption,
  deckKeyAction,
  defaultOption,
  followUpParent,
  livePromptIds,
  parseTypedAnswer,
  pendingPrompts,
  promptOptions,
  receiptFor,
  takesTypedAnswer,
  type ComposerPrompt,
} from '../composerPromptModel';

const noop = () => undefined;
const choice: ComposerPrompt = {
  id: 'dispatch', title: 'Fix token refresh', question: 'Dispatch with these settings?', kind: 'choice',
  options: [
    { id: 'dispatch', label: 'Dispatch', emphasis: 'primary' },
    { id: 'model', label: 'Change model' },
    { id: 'cap', label: 'Change cap', disabledReason: 'No forecast yet' },
  ],
  defaultOptionId: 'dispatch', onAnswer: noop,
};
const confirm: ComposerPrompt = { id: 'gate', title: 'Over your cap', question: 'Dispatch anyway?', kind: 'confirm', onAnswer: noop };
const cap: ComposerPrompt = { id: 'cap', title: 'Run cap', question: 'Cap?', kind: 'number', min: 0, options: [{ id: 'none', label: 'No cap' }], defaultOptionId: 'none', onAnswer: noop };
const text: ComposerPrompt = { id: 'instruction', title: 'Instruction', question: 'What should change?', kind: 'text', onAnswer: noop };
const base = { collapsed: false, inputEmpty: true, inDeck: false, busy: false };

describe('composerPromptModel — options and answers', () => {
  it('confirm defaults to Confirm / Cancel; Enter picks Confirm', () => {
    expect(promptOptions(confirm).map((o) => o.id)).toEqual(['confirm', 'cancel']);
    expect(defaultOption(confirm)?.id).toBe('confirm');
    expect(answerForOption(confirm, promptOptions(confirm)[1]!)).toEqual({ kind: 'confirm', optionId: 'cancel', confirmed: false });
  });
  it('a disabled default is no default', () => {
    expect(defaultOption({ ...choice, defaultOptionId: 'cap' })).toBeNull();
  });
  it('typed answers: text needs words, number parses $ and commas and checks bounds', () => {
    expect(takesTypedAnswer(text)).toBe(true);
    expect(takesTypedAnswer({ ...text, readOnlyReason: 'no' })).toBe(false);
    expect(parseTypedAnswer(text, '  ')).toEqual({ error: 'Type an answer, or pick an option.' });
    expect(parseTypedAnswer(cap, '$1,250.5')).toEqual({ answer: { kind: 'number', value: 1250.5 } });
    expect(parseTypedAnswer(cap, '-1')).toEqual({ error: 'Use 0 or more.' });
    expect(parseTypedAnswer(cap, 'five')).toEqual({ error: 'Type a number, or pick an option.' });
    expect(answerForOption(cap, promptOptions(cap)[0]!)).toEqual({ kind: 'option', optionId: 'none' });
  });
  it('receipts name the prompt and the answer', () => {
    expect(receiptFor(choice, { kind: 'choice', optionId: 'model' })).toBe('Fix token refresh: Change model');
    expect(receiptFor(cap, { kind: 'number', value: 5 })).toBe('Run cap: 5');
  });
  it('the active prompt is the chosen one while waiting, else the first', () => {
    const pending = pendingPrompts([choice, confirm, cap], new Set(['gate']));
    expect(pending.map((p) => p.id)).toEqual(['dispatch', 'cap']);
    expect(activeIndex(pending, 'cap')).toBe(1);
    expect(activeIndex(pending, 'gate')).toBe(0);
    expect(activeIndex([], null)).toBe(-1);
  });
});

describe('composerPromptModel — keys', () => {
  it('digits pick a choice only while the input is empty (or focus is in the deck)', () => {
    expect(deckKeyAction({ key: '2' }, { ...base, prompt: choice })).toEqual({ type: 'pick', optionId: 'model' });
    expect(deckKeyAction({ key: '2' }, { ...base, prompt: choice, inputEmpty: false })).toBeNull();
    expect(deckKeyAction({ key: '2' }, { ...base, prompt: choice, inputEmpty: false, inDeck: true })).toEqual({ type: 'pick', optionId: 'model' });
    expect(deckKeyAction({ key: '3' }, { ...base, prompt: choice })).toBeNull();
    expect(deckKeyAction({ key: '9' }, { ...base, prompt: choice })).toBeNull();
  });
  it('Enter on an empty input takes the default; with text it is the composer’s', () => {
    expect(deckKeyAction({ key: 'Enter' }, { ...base, prompt: choice })).toEqual({ type: 'default', optionId: 'dispatch' });
    expect(deckKeyAction({ key: 'Enter' }, { ...base, prompt: choice, inputEmpty: false })).toBeNull();
    expect(deckKeyAction({ key: 'Enter' }, { ...base, prompt: cap })).toEqual({ type: 'default', optionId: 'none' });
    expect(deckKeyAction({ key: 'Enter' }, { ...base, prompt: text })).toBeNull();
  });
  it('text / number prompts leave bare digits to typing; Alt+digit picks', () => {
    expect(deckKeyAction({ key: '1' }, { ...base, prompt: cap })).toBeNull();
    expect(deckKeyAction({ key: '¡', altKey: true, code: 'Digit1' }, { ...base, prompt: cap })).toEqual({ type: 'pick', optionId: 'none' });
  });
  it('paging: mod+arrows always, J/K only on an empty input', () => {
    expect(deckKeyAction({ key: 'ArrowDown', metaKey: true }, { ...base, prompt: choice, inputEmpty: false })).toEqual({ type: 'page', delta: 1 });
    expect(deckKeyAction({ key: 'ArrowUp', ctrlKey: true }, { ...base, prompt: choice })).toEqual({ type: 'page', delta: -1 });
    expect(deckKeyAction({ key: 'j' }, { ...base, prompt: choice })).toEqual({ type: 'page', delta: 1 });
    expect(deckKeyAction({ key: 'j' }, { ...base, prompt: text })).toBeNull();
    expect(deckKeyAction({ key: 'k' }, { ...base, prompt: choice, inputEmpty: false })).toBeNull();
  });
  it('Esc collapses (never over typed text); collapsed, only mod+↓ reopens', () => {
    expect(deckKeyAction({ key: 'Escape' }, { ...base, prompt: choice })).toEqual({ type: 'collapse' });
    expect(deckKeyAction({ key: 'Escape' }, { ...base, prompt: choice, inputEmpty: false })).toBeNull();
    expect(deckKeyAction({ key: '1' }, { ...base, prompt: choice, collapsed: true })).toBeNull();
    expect(deckKeyAction({ key: 'ArrowDown', ctrlKey: true }, { ...base, prompt: choice, collapsed: true })).toEqual({ type: 'expand' });
  });
  it('busy or read-only: no answers by key, paging still works', () => {
    expect(deckKeyAction({ key: '1' }, { ...base, prompt: choice, busy: true })).toBeNull();
    expect(deckKeyAction({ key: '1' }, { ...base, prompt: { ...choice, readOnlyReason: 'Readers cannot dispatch' } })).toBeNull();
    expect(deckKeyAction({ key: 'j' }, { ...base, prompt: choice, busy: true })).toEqual({ type: 'page', delta: 1 });
  });
  it('a custom shortcut replaces the position', () => {
    const p = { ...choice, options: [{ id: 'yes', label: 'Yes', shortcut: 'Y' }, { id: 'no', label: 'No', shortcut: 'n' }] };
    expect(deckKeyAction({ key: 'y' }, { ...base, prompt: p })).toEqual({ type: 'pick', optionId: 'yes' });
    expect(deckKeyAction({ key: '1' }, { ...base, prompt: p })).toBeNull();
  });
});

describe('composerPromptModel — compose prompts and follow-ups (2.482.0)', () => {
  const compose: ComposerPrompt = { id: 'request', title: 'Request more budget', question: 'Edit the message.', kind: 'compose', compose: { initialMessage: 'Sienna, please…' }, onAnswer: noop };

  it('a compose prompt owns Enter, digits and Esc; the deck only pages it', () => {
    expect(deckKeyAction({ key: 'Enter' }, { ...base, prompt: compose })).toBeNull();
    expect(deckKeyAction({ key: '1' }, { ...base, prompt: compose })).toBeNull();
    expect(deckKeyAction({ key: '1' }, { ...base, prompt: compose, inDeck: true })).toBeNull();
    expect(deckKeyAction({ key: 'Escape' }, { ...base, prompt: compose, inDeck: true })).toBeNull();
    expect(deckKeyAction({ key: 'j' }, { ...base, prompt: compose, inDeck: true })).toBeNull();
    expect(deckKeyAction({ key: 'ArrowDown', metaKey: true }, { ...base, prompt: compose })).toEqual({ type: 'page', delta: 1 });
    expect(deckKeyAction({ key: 'ArrowDown', ctrlKey: true }, { ...base, prompt: compose, collapsed: true })).toEqual({ type: 'expand' });
    expect(takesTypedAnswer(compose)).toBe(false);
    expect(promptOptions(compose)).toEqual([]);
    expect(defaultOption(compose)).toBeNull();
    expect(receiptFor(compose, { kind: 'compose', message: 'Sienna, please…' })).toBe('Request more budget: Sienna, please…');
  });

  it('an answered prompt stands in for its follow-up, down the chain; Back finds the question it followed', () => {
    const saved: ComposerPrompt = { ...choice, id: 'saved', title: 'Saved' };
    const followUps = { dispatch: compose, request: saved };
    expect(pendingPrompts([choice, confirm], new Set(), followUps).map((p) => p.id)).toEqual(['dispatch', 'gate']);
    expect(pendingPrompts([choice, confirm], new Set(['dispatch']), followUps).map((p) => p.id)).toEqual(['request', 'gate']);
    expect(pendingPrompts([choice, confirm], new Set(['dispatch', 'request']), followUps).map((p) => p.id)).toEqual(['saved', 'gate']);
    expect(pendingPrompts([choice, confirm], new Set(['dispatch', 'request', 'saved']), followUps).map((p) => p.id)).toEqual(['gate']);
    // An answered prompt with no follow-up drops off, as before.
    expect(pendingPrompts([choice, confirm], new Set(['gate']), followUps).map((p) => p.id)).toEqual(['dispatch']);
    expect([...livePromptIds([choice, confirm], followUps)].sort()).toEqual(['dispatch', 'gate', 'request', 'saved']);
    expect([...livePromptIds([confirm], followUps)]).toEqual(['gate']);
    expect(followUpParent('request', followUps)).toBe('dispatch');
    expect(followUpParent('saved', followUps)).toBe('request');
    expect(followUpParent('dispatch', followUps)).toBeNull();
  });
});
