// frontend/src/components/shared/ToastProvider.tsx
//
// App-wide toast queue. Mount once high in the tree (App.tsx / AppLayout.tsx)
// and call `useToast().toast(message, opts?)` from anywhere below. Toasts
// render fixed top-right, stacked with 8px gap, auto-dismiss after a
// type-dependent duration, and can be dismissed manually with the x button.
// Keyframes for animations are defined in src/styles.css.

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Toast from './Toast';
import type { ToastType } from './Toast';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface ToastOptions {
  type?: ToastType;
  durationMs?: number;
  actionLabel?: string;
  onAction?: () => void;
}

export interface ToastContextValue {
  toast: (message: string, opts?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// Default auto-dismiss per type (ms).
const DEFAULT_DURATION: Record<ToastType, number> = {
  info:    3000,
  success: 3000,
  warning: 5000,
  error:   6000,
};

// Animation durations that must match Toast.tsx keyframes in styles.css.
const FADE_OUT_MS = 160;

// ---------------------------------------------------------------------------
// Internal state
// ---------------------------------------------------------------------------

interface ToastEntry {
  id: string;
  message: string;
  type: ToastType;
  actionLabel?: string;
  onAction?: () => void;
  exiting?: boolean;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  // Timers for auto-dismiss + fade-out removal, keyed by toast id.
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const clearTimer = useCallback((id: string) => {
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
  }, []);

  // Remove entry from the queue after the fade-out has played.
  const remove = useCallback((id: string) => {
    clearTimer(id);
    setToasts(prev => prev.filter(t => t.id !== id));
  }, [clearTimer]);

  // Mark a toast as exiting (fade-out class), then remove it after the
  // animation finishes. Called from the x button and from the auto-dismiss
  // timer.
  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    clearTimer(id);
    const t = setTimeout(() => remove(id), FADE_OUT_MS);
    timers.current.set(id, t);
  }, [remove, clearTimer]);

  const toast = useCallback((message: string, opts: ToastOptions = {}) => {
    const type: ToastType = opts.type ?? 'info';
    const durationMs = opts.durationMs ?? DEFAULT_DURATION[type];
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const entry: ToastEntry = {
      id, message, type,
      actionLabel: opts.actionLabel,
      onAction: opts.onAction,
    };
    setToasts(prev => [...prev, entry]);
    // Schedule auto-dismiss
    const t = setTimeout(() => dismiss(id), durationMs);
    timers.current.set(id, t);
  }, [dismiss]);

  const ctxValue = useMemo<ToastContextValue>(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={ctxValue}>
      {children}
      <div className="fixed top-16 right-4 z-[2000] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <Toast
              id={t.id}
              message={t.message}
              type={t.type}
              exiting={t.exiting}
              actionLabel={t.actionLabel}
              onAction={t.onAction}
              onDismiss={dismiss}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Consumer hook
// ---------------------------------------------------------------------------

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return ctx;
}

/**
 * Non-throwing variant, for components that WANT to toast but must still
 * mount where no provider exists — a widget reused inside a panel or
 * rendered bare in a component test. Callers use `toast?.(…)`; the
 * notification is simply skipped rather than crashing the subtree.
 */
export function useToastOptional(): ToastContextValue | null {
  return useContext(ToastContext);
}
