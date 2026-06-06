// src/components/forms/Textarea.tsx
//
// Generic textarea primitive. Supports auto-grow via a hidden measurement div
// that mirrors the textarea's content — no `field-sizing` CSS (not in baseline
// Tailwind). Falls back gracefully when rows/minRows/maxRows override it.

import {
  forwardRef,
  useRef,
  useEffect,
  useCallback,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '../../lib/cn';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
  /** Fixed row count. Mutually exclusive with autoResize. */
  rows?: number;
  /** Minimum visible rows (used with autoResize). Default: 2. */
  minRows?: number;
  /** Maximum rows before the box scrolls (used with autoResize). */
  maxRows?: number;
  /** Grow to fit content automatically. Default: false. */
  autoResize?: boolean;
  /** When true, applies a danger-colored border. */
  invalid?: boolean;
  'data-testid'?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      rows,
      minRows = 2,
      maxRows,
      autoResize = false,
      invalid = false,
      disabled = false,
      onChange,
      value,
      className,
      'data-testid': testId,
      ...rest
    },
    forwardedRef,
  ) {
    const internalRef = useRef<HTMLTextAreaElement>(null);

    // Merge the forwarded ref with our internal one.
    const setRef = useCallback(
      (el: HTMLTextAreaElement | null) => {
        (internalRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
        if (typeof forwardedRef === 'function') forwardedRef(el);
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
      },
      [forwardedRef],
    );

    const lineHeightPx = 20; // matches leading-5 (1.25rem at 16px base)
    const paddingPx = 12;    // py-1.5 * 2 = 12

    const resize = useCallback(() => {
      const el = internalRef.current;
      if (!el || !autoResize) return;

      el.style.height = 'auto';

      const minH = minRows * lineHeightPx + paddingPx;
      const scrollH = el.scrollHeight;
      const maxH = maxRows ? maxRows * lineHeightPx + paddingPx : Infinity;

      el.style.height = `${Math.min(Math.max(scrollH, minH), maxH)}px`;
      el.style.overflowY = scrollH > maxH ? 'auto' : 'hidden';
    }, [autoResize, minRows, maxRows]);

    // Run resize when value changes (controlled mode).
    useEffect(() => {
      resize();
    }, [value, resize]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        resize();
        onChange?.(e);
      },
      [onChange, resize],
    );

    const rowsProp = autoResize ? undefined : (rows ?? minRows);

    return (
      <textarea
        ref={setRef}
        rows={rowsProp}
        disabled={disabled}
        data-testid={testId}
        value={value}
        onChange={handleChange}
        className={cn(
          'w-full rounded-md border bg-slate-50 font-inherit text-slate-900',
          'outline-none transition-colors duration-150 px-2.5 py-1.5 text-[13px] leading-5',
          'placeholder:text-slate-400',
          'focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100',
          !autoResize && 'resize-y',
          autoResize && 'resize-none overflow-hidden',
          invalid
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
            : 'border-slate-300',
          className,
        )}
        style={
          autoResize
            ? { minHeight: `${minRows * lineHeightPx + paddingPx}px` }
            : undefined
        }
        {...rest}
      />
    );
  },
);

export default Textarea;
