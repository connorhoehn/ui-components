// A TOTP is single-use, so submitting a completed code twice makes the
// SECOND attempt fail and shows the user "invalid code" on a correct entry.
//
// The old implementation called `setTimeout(() => onComplete(code), 0)` from
// inside a `setValues` updater. React double-invokes updaters in StrictMode
// to surface impurity, so the deferred submit was scheduled twice. These
// tests run the component inside <StrictMode> deliberately — that is the
// configuration that reproduced it.

import { StrictMode } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CodeInput } from '../CodeInput';

function type(code: string, length = code.length) {
  code.split('').forEach((d, i) => {
    fireEvent.change(screen.getByLabelText(`Digit ${i + 1} of ${length}`), {
      target: { value: d },
    });
  });
}

function paste(text: string, length: number) {
  fireEvent.paste(screen.getByLabelText(`Digit 1 of ${length}`), {
    clipboardData: { getData: () => text },
  });
}

describe('CodeInput completion', () => {
  it('fires onComplete exactly once under StrictMode', () => {
    const onComplete = vi.fn();
    render(
      <StrictMode>
        <CodeInput length={6} onComplete={onComplete} />
      </StrictMode>,
    );
    type('123456');
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith('123456');
  });

  it('does not re-fire on unrelated re-renders', () => {
    const onComplete = vi.fn();
    const { rerender } = render(<CodeInput length={4} onComplete={onComplete} />);
    type('1234');
    expect(onComplete).toHaveBeenCalledTimes(1);
    // A new inline-arrow identity each render must not resubmit.
    rerender(<CodeInput length={4} onComplete={onComplete} />);
    rerender(<CodeInput length={4} onComplete={onComplete} />);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('submits again after the code is corrected', () => {
    const onComplete = vi.fn();
    render(<CodeInput length={4} onComplete={onComplete} />);
    type('1111');
    expect(onComplete).toHaveBeenCalledTimes(1);

    // Clear one digit (code becomes incomplete), then refill with a new one.
    fireEvent.change(screen.getByLabelText('Digit 4 of 4'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Digit 4 of 4'), { target: { value: '2' } });
    expect(onComplete).toHaveBeenCalledTimes(2);
    expect(onComplete).toHaveBeenLastCalledWith('1112');
  });
});

// The three cases below all reproduce the SAME class of bug as the ones above
// — a completed code submitted more than once — on the paths the original
// tests never walked. Each one was live until this commit.
describe('CodeInput completion — paste and retype', () => {
  it('fires onComplete exactly once for a full paste', async () => {
    // A full paste used to ALSO schedule `setTimeout(() => onComplete(code), 0)`
    // on top of the completion effect, so the pasted code was submitted twice.
    // Pasting a TOTP out of a password manager is the normal flow, and the
    // second attempt fails on a single-use code: "invalid code" on a correct
    // paste. Fake timers here so the stray timer would be observed if it came
    // back.
    vi.useFakeTimers();
    try {
      const onComplete = vi.fn();
      render(
        <StrictMode>
          <CodeInput length={6} onComplete={onComplete} />
        </StrictMode>,
      );
      paste('123456', 6);
      await act(async () => { vi.runAllTimers(); });
      expect(onComplete).toHaveBeenCalledTimes(1);
      expect(onComplete).toHaveBeenCalledWith('123456');
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not fire onComplete after unmount', async () => {
    // The paste timer was untracked, so it survived unmount. `onComplete`
    // typically navigates away, which unmounts this input — the callback then
    // ran against a dead component.
    vi.useFakeTimers();
    try {
      const onComplete = vi.fn();
      const { unmount } = render(<CodeInput length={6} onComplete={onComplete} />);
      paste('123456', 6);
      unmount();
      onComplete.mockClear();
      await act(async () => { vi.runAllTimers(); });
      expect(onComplete).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  it('submits once — not once per keystroke — when a fresh code is typed over a filled one', () => {
    // The flow: first attempt fails, the authenticator rolls over, the user
    // types the new code straight over the old digits (each box auto-selects
    // on focus). The code never passed through an "incomplete" state, so the
    // submit effect fired on EVERY keystroke with a half-updated code:
    // '211111', '221111', '222111', '222211', '222221', '222222'. Five bogus
    // verification attempts for one honest retry — enough to trip an identity
    // server's MFA rate limit or lock the account.
    const onComplete = vi.fn();
    render(<CodeInput length={6} onComplete={onComplete} />);

    type('111111');
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith('111111');

    onComplete.mockClear();
    type('222222');
    expect(onComplete.mock.calls.map(c => c[0])).toEqual(['222222']);
  });

  it('a full paste over an already-filled code still submits exactly once', async () => {
    // Fake timers are load-bearing: without draining them this case passes
    // against the old code, because the stray `setTimeout` never got a chance
    // to run inside a synchronous test.
    vi.useFakeTimers();
    try {
      const onComplete = vi.fn();
      render(<CodeInput length={6} onComplete={onComplete} />);
      type('111111');
      onComplete.mockClear();
      paste('222222', 6);
      await act(async () => { vi.runAllTimers(); });
      expect(onComplete.mock.calls.map(c => c[0])).toEqual(['222222']);
    } finally {
      vi.useRealTimers();
    }
  });
});
