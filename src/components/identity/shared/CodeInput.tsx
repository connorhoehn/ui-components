// src/components/identity/shared/CodeInput.tsx
//
// A multi-digit code input (TOTP / verification codes) with auto-advance,
// paste support, and backspace navigation.

import { useState, useRef, useCallback, useEffect } from 'react';

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

  const handleChange = useCallback((index: number, value: string) => {
    // Only accept digits
    const digit = value.replace(/\D/g, '').slice(-1);

    setValues(prev => {
      const next = [...prev];
      next[index] = digit;

      const code = next.join('');
      if (code.length === length && next.every(v => v !== '')) {
        // Defer onComplete so state updates first
        setTimeout(() => onComplete(code), 0);
      }

      return next;
    });

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }
  }, [length, onComplete, focusInput]);

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--ui-spacingSm)' }}>
      <div
        style={{ display: 'flex', gap: 'var(--ui-spacingSm)' }}
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
            style={{
              width: 44,
              height: 52,
              textAlign: 'center',
              fontSize: 'var(--ui-fontSizeLg)',
              fontWeight: 600,
              fontFamily: 'inherit',
              border: `2px solid ${error ? 'var(--ui-danger)' : 'var(--ui-border)'}`,
              borderRadius: 'var(--ui-radiusMd)',
              background: disabled ? 'var(--ui-surfaceAlt)' : 'var(--ui-surface)',
              color: 'var(--ui-textPrimary)',
              outline: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              cursor: disabled ? 'not-allowed' : 'text',
            }}
          />
        ))}
      </div>
      {error && (
        <p
          role="alert"
          style={{
            margin: 0,
            fontSize: 'var(--ui-fontSizeSm)',
            color: 'var(--ui-danger)',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default CodeInput;
