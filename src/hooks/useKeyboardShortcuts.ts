// frontend/src/hooks/useKeyboardShortcuts.ts
//
// Declarative keyboard shortcut registration with automatic cleanup.

import { useEffect } from 'react';

export interface KeyboardShortcut {
  /** Key to match (case-insensitive, e.g., 's', 'Enter', 'Escape') */
  key: string;
  /** Require Cmd/Ctrl modifier */
  meta?: boolean;
  /** Require Shift modifier */
  shift?: boolean;
  /** Require Alt/Option modifier */
  alt?: boolean;
  /** Callback to invoke when shortcut matches */
  handler: (e: KeyboardEvent) => void;
  /** Prevent default browser action (default: true) */
  preventDefault?: boolean;
}

/**
 * Check if the event target is an editable element (input, textarea, contentEditable).
 * Shortcuts are skipped when typing in these elements.
 */
function isEditableTarget(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tagName = target.tagName.toLowerCase();
  if (tagName === 'input' || tagName === 'textarea') return true;
  if (target.isContentEditable) return true;
  return false;
}

/**
 * Register keyboard shortcuts with automatic cleanup.
 * Shortcuts are skipped when typing in input/textarea/contentEditable elements.
 *
 * @example
 * useKeyboardShortcuts([
 *   { key: 's', meta: true, handler: save },
 *   { key: 'Enter', meta: true, handler: run },
 *   { key: 'Escape', handler: clearSelection, preventDefault: false },
 * ]);
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]): void {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;

      for (const shortcut of shortcuts) {
        const metaMatch = shortcut.meta ? (e.metaKey || e.ctrlKey) : true;
        const shiftMatch = shortcut.shift ? e.shiftKey : true;
        const altMatch = shortcut.alt ? e.altKey : true;
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();

        if (metaMatch && shiftMatch && altMatch && keyMatch) {
          if (shortcut.preventDefault !== false) {
            e.preventDefault();
          }
          shortcut.handler(e);
          return;
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shortcuts]);
}
