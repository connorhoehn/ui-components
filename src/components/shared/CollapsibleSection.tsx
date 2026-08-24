// CollapsibleSection — bordered accordion section with a header button
// and optional badge slot. When `storageKey` is provided, the open/closed
// state is persisted to localStorage so it survives page reloads.
//
// Replaces several hand-rolled accordion implementations across the portal.

import React, { useEffect, useId, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

export interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  /** Optional element rendered on the right side of the header (e.g. a count chip). */
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** If provided, the open state is persisted to localStorage under this key. */
  storageKey?: string;
}

function readStoredOpen(storageKey: string | undefined, fallback: boolean): boolean {
  if (!storageKey) return fallback;
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (raw === null) return fallback;
    return raw === 'true';
  } catch {
    // localStorage access can throw in restrictive contexts (private mode,
    // disabled storage). Fall back to the default in that case.
    return fallback;
  }
}

function CollapsibleSection({
  title,
  defaultOpen = false,
  badge,
  children,
  className,
  storageKey,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState<boolean>(() =>
    readStoredOpen(storageKey, defaultOpen),
  );

  const bodyId = useId();
  const headerRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (open) {
      // Closing unmounts the body. Anything focused inside it would be
      // stranded — the browser drops focus to <body> and the keyboard user
      // silently restarts their Tab walk at the top of the page. Hand focus
      // up to the header that now stands for the collapsed section.
      const active = typeof document === 'undefined' ? null : document.activeElement;
      if (active && bodyRef.current?.contains(active)) {
        headerRef.current?.focus();
      }
    }
    setOpen((prev) => !prev);
  };

  // Persist open-state changes to localStorage when a storageKey is provided.
  useEffect(() => {
    if (!storageKey) return;
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(storageKey, String(open));
    } catch {
      // Swallow storage errors — they're non-fatal for the UI.
    }
  }, [open, storageKey]);

  return (
    <div
      className={cn(
        'border border-[var(--color-border)] rounded-lg overflow-hidden',
        className,
      )}
    >
      <button
        type="button"
        ref={headerRef}
        className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors text-left"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={bodyId}
      >
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          {title}
        </span>
        <div className="flex items-center gap-2">
          {badge}
          <svg
            className={cn(
              'w-4 h-4 text-[var(--color-text-tertiary)] transition-transform',
              open && 'rotate-180',
            )}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      {open && (
        <div id={bodyId} ref={bodyRef} className="border-t border-[var(--color-border)] bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

export { CollapsibleSection };
export default CollapsibleSection;
