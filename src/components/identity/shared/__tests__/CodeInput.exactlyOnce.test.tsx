// A TOTP is single-use, so submitting a completed code twice makes the
// SECOND attempt fail and shows the user "invalid code" on a correct entry.
//
// The old implementation called `setTimeout(() => onComplete(code), 0)` from
// inside a `setValues` updater. React double-invokes updaters in StrictMode
// to surface impurity, so the deferred submit was scheduled twice. These
// tests run the component inside <StrictMode> deliberately — that is the
// configuration that reproduced it.

import { StrictMode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CodeInput } from '../CodeInput';

function type(code: string) {
  code.split('').forEach((d, i) => {
    fireEvent.change(screen.getByLabelText(`Digit ${i + 1} of ${code.length}`), {
      target: { value: d },
    });
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
