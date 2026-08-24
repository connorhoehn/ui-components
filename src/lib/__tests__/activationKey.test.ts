import { describe, it, expect, vi } from 'vitest';
import { isActivationKey, onActivationKey } from '../activationKey';

// The helper this file covers exists because the same two defects kept being
// hand-rolled across the codebase: (1) only Enter was handled, so Space fell
// through to the browser and scrolled the page instead of activating the
// control; (2) Space was handled but not preventDefault()ed, so the control
// fired *and* the page scrolled underneath it.

type FakeEvent = { key: string; preventDefault: () => void };

function ev(key: string): FakeEvent & { defaultPrevented: boolean } {
  const e = {
    key,
    defaultPrevented: false,
    preventDefault() {
      e.defaultPrevented = true;
    },
  };
  return e;
}

describe('isActivationKey', () => {
  it('accepts Enter, Space and the legacy Spacebar key value', () => {
    expect(isActivationKey('Enter')).toBe(true);
    expect(isActivationKey(' ')).toBe(true);
    expect(isActivationKey('Spacebar')).toBe(true);
  });

  it('ignores every other key', () => {
    for (const k of ['a', 'Tab', 'Escape', 'ArrowDown', 'Shift']) {
      expect(isActivationKey(k)).toBe(false);
    }
  });
});

describe('onActivationKey', () => {
  it('fires on Enter', () => {
    const action = vi.fn();
    const e = ev('Enter');
    onActivationKey(action)(e as never);
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('fires on Space — the half that was routinely forgotten', () => {
    const action = vi.fn();
    const e = ev(' ');
    onActivationKey(action)(e as never);
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('preventDefaults Space so the page does not scroll under the control', () => {
    const action = vi.fn();
    const e = ev(' ');
    onActivationKey(action)(e as never);
    expect(e.defaultPrevented).toBe(true);
  });

  it('preventDefaults Enter too', () => {
    const e = ev('Enter');
    onActivationKey(vi.fn())(e as never);
    expect(e.defaultPrevented).toBe(true);
  });

  it('leaves unrelated keys entirely alone', () => {
    const action = vi.fn();
    const e = ev('ArrowDown');
    onActivationKey(action)(e as never);
    expect(action).not.toHaveBeenCalled();
    expect(e.defaultPrevented).toBe(false);
  });
});
