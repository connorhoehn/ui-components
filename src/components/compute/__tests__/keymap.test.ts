import { describe, expect, it } from 'vitest';
import { DEFAULT_KEYMAP, groupBindings, labelFor, matchBinding } from '../lib/keymap';

const press = (init: Partial<KeyboardEventInit> & { key: string }) =>
  new KeyboardEvent('keydown', init);

describe('matchBinding', () => {
  it('resolves the plain Mac chords', () => {
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'ArrowRight', metaKey: true, shiftKey: true }))).toBe('focus-right');
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'Enter', metaKey: true }))).toBe('split-right');
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'Backspace', metaKey: true }))).toBe('close-pane');
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'k', metaKey: true }))).toBe('jump');
  });

  it('matches modifiers exactly, so ⌘← is not ⌘⇧←', () => {
    // ⌘← is the browser's back-navigation. A loose match would silently move
    // pane focus every time someone tried to go back.
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'ArrowLeft', metaKey: true }))).toBeNull();
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'ArrowLeft' }))).toBeNull();
    // ⌘⏎ and ⌘⇧⏎ are different panes, not the same one twice.
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'Enter', metaKey: true, shiftKey: true }))).toBe('split-down');
  });

  it('accepts ctrl as the command key, so the map works off a Mac', () => {
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'k', ctrlKey: true }))).toBe('jump');
  });

  it('is case-insensitive, because shifted letters arrive uppercase', () => {
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'B', metaKey: true, shiftKey: true }))).toBe('toggle-broadcast');
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'F', metaKey: true, shiftKey: true }))).toBe('zoom-pane');
  });

  it('lets escape through with no modifier', () => {
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'Escape' }))).toBe('exit');
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'Escape', metaKey: true }))).toBeNull();
  });

  it('returns null for anything unbound', () => {
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'q', metaKey: true }))).toBeNull();
    expect(matchBinding(DEFAULT_KEYMAP, press({ key: 'a' }))).toBeNull();
  });

  it('honours a host keymap instead of the defaults', () => {
    const custom = [{ ...DEFAULT_KEYMAP[0]!, key: 'h', meta: true, shift: false, label: '⌘H' }];
    expect(matchBinding(custom, press({ key: 'h', metaKey: true }))).toBe('focus-left');
    expect(matchBinding(custom, press({ key: 'ArrowLeft', metaKey: true, shiftKey: true }))).toBeNull();
  });

  it('binds nothing the browser refuses to forward', () => {
    // ⌘T, ⌘N, ⌘W and ⌘1-9 never reach the page; binding one would look broken.
    const reserved = ['t', 'n', 'w', 'l', 'd', '1', '2', '9'];
    for (const key of reserved) {
      const plainCommand = DEFAULT_KEYMAP.find(
        (b) => b.key.toLowerCase() === key && (b.meta || b.ctrl) && !b.shift && !b.alt,
      );
      expect(plainCommand, `⌘${key.toUpperCase()} is reserved by the browser`).toBeUndefined();
    }
  });
});

describe('groupBindings', () => {
  it('covers every binding exactly once', () => {
    const grouped = groupBindings(DEFAULT_KEYMAP).flatMap((g) => g.bindings);
    expect(grouped).toHaveLength(DEFAULT_KEYMAP.length);
  });

  it('gives every command a label and a description for the help sheet', () => {
    for (const binding of DEFAULT_KEYMAP) {
      expect(binding.label.length).toBeGreaterThan(0);
      expect(binding.description.length).toBeGreaterThan(0);
    }
  });
});

describe('labelFor', () => {
  it('finds the chord to show on a button', () => {
    expect(labelFor(DEFAULT_KEYMAP, 'jump')).toBe('⌘K');
    expect(labelFor(DEFAULT_KEYMAP, 'exit')).toBe('esc');
  });

  it('is null for a command the host unbound', () => {
    expect(labelFor([], 'jump')).toBeNull();
  });
});
