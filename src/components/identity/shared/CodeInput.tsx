// src/components/identity/shared/CodeInput.tsx
//
// A multi-digit code input (TOTP / verification codes) with auto-advance,
// paste support, and backspace navigation.

import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '../../../lib/cn';

export interface CodeInputProps {
  length?: number;
  onComplete: (code: string) => void;
  error?: string | null;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function CodeInput({
  length = 6,
  onComplete,
  error = null,
  disabled = false,
  autoFocus = false,
}: CodeInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < length && inputsRef.current[index]) {
      inputsRef.current[index]!.focus();
      inputsRef.current[index]!.select();
    }
  }, [length]);

  // Fire `onComplete` once per fully-entered code, from an effect so the
  // side effect happens after commit rather than inside a state updater.
  // The ref guard is what makes it exactly-once: effects are also
  // double-invoked in StrictMode, and `onComplete` may be an inline arrow
  // that changes identity every render. Reset when the code goes incomplete
  // so re-entering a corrected code still submits.
  const submittedRef = useRef<string | null>(null);
  useEffect(() => {
    const code = values.join('');
    const complete = code.length === length && values.every(v => v !== '');
    if (!complete) {
      submittedRef.current = null;
      return;
    }
    if (submittedRef.current === code) return;
    submittedRef.current = code;
    onComplete(code);
  }, [values, length, onComplete]);

  const handleChange = useCallback((index: number, value: string) => {
    // Only accept digits
    const digit = value.replace(/\D/g, '').slice(-1);

    // NOTE: `onComplete` is fired from an effect below, NOT from inside this
    // updater. It used to be `setTimeout(() => onComplete(code), 0)` in here —
    // a side effect inside a state updater, which React deliberately
    // double-invokes in StrictMode to surface impurity. That submitted a
    // completed code TWICE; because a TOTP is single-use, the second attempt
    // failed and the user saw a spurious "invalid code" on a correct entry.
    // The stray timer was also untracked, so it could fire after unmount.
    setValues(prev => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }
  }, [length, focusInput]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (values[index] === '' && index > 0) {
        e.preventDefault();
        setValues(prev => {
          const next = [...prev];
          next[index - 1] = '';
          return next;
        });
        focusInput(index - 1);
      } else {
        setValues(prev => {
          const next = [...prev];
          next[index] = '';
          return next;
        });
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  }, [values, length, focusInput]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;

    const next = Array(length).fill('');
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setValues(next);

    if (pasted.length === length) {
      setTimeout(() => onComplete(pasted), 0);
    } else {
      focusInput(Math.min(pasted.length, length - 1));
    }
  }, [length, onComplete, focusInput]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex gap-2"
        role="group"
        aria-label="Verification code input"
      >
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={el => { inputsRef.current[i] = el; }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength={1}
            value={values[i]}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of ${length}`}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={e => e.target.select()}
            className={cn(
              'w-11 h-[52px] text-center text-lg font-semibold font-[inherit]',
              'rounded-md outline-none transition-[border-color,box-shadow] duration-150',
              'border-2',
              error ? 'border-danger' : 'border-border',
              disabled ? 'bg-surface-panel cursor-not-allowed' : 'bg-white cursor-text',
              'text-text-primary',
              'focus:border-info focus:ring-2 focus:ring-info/20'
            )}
          />
        ))}
      </div>
      {error && (
        <p
          role="alert"
          className="m-0 text-sm text-danger-fg"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default CodeInput;
