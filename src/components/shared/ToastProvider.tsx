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
import { JobToast } from './JobToast';
import type { JobToastState } from './JobToast';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface ToastOptions {
  type?: ToastType;
  durationMs?: number;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * A background job tracked by one toast. `toastJob` with an `id` it has not
 * seen creates the toast; later calls with the same `id` update it in place.
 */
export interface JobToastOptions {
  /** Job id: the key. Same id, same toast. */
  id: string;
  title: string;
  state: JobToastState;
  detail?: string;
  /** 0-100, drawn as a bar while queued or running. */
  progress?: number;
  href?: string;
  /** Link text. Default "View". */
  hrefLabel?: string;
  /** How long a done or failed toast stays after it settles. Default 8000. */
  dismissAfterMs?: number;
  /** Fires once when the job first reaches done or failed — mirror it into a notification center. */
  onSettled?: (job: JobToastSettled) => void;
}

export type JobToastSettled = Pick<JobToastOptions, 'id' | 'title' | 'detail' | 'href' | 'hrefLabel'> & {
  state: 'done' | 'failed';
};

export const JOB_TOAST_DISMISS_MS = 8000;

export interface ToastContextValue {
  toast: (message: string, opts?: ToastOptions) => void;
  toastJob: (opts: JobToastOptions) => void;
  dismissJobToast: (id: string) => void;
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
  job?: JobToastOptions;
}

/** Per-job bookkeeping kept outside render state. */
interface JobMeta {
  settled: boolean;
  hovering: boolean;
  /** ms left on the dismiss timer when it was paused (or never started). */
  remaining: number | null;
  deadline: number | null;
}

const jobEntryId = (jobId: string) => `job:${jobId}`;

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

  const jobs = useRef<Map<string, JobMeta>>(new Map());

  const startJobTimer = useCallback((entryId: string, ms: number) => {
    clearTimer(entryId);
    const meta = jobs.current.get(entryId);
    if (meta) { meta.remaining = ms; meta.deadline = Date.now() + ms; }
    timers.current.set(entryId, setTimeout(() => {
      jobs.current.delete(entryId);
      dismiss(entryId);
    }, ms));
  }, [clearTimer, dismiss]);

  const toastJob = useCallback((opts: JobToastOptions) => {
    const entryId = jobEntryId(opts.id);
    let meta = jobs.current.get(entryId);
    if (!meta) {
      meta = { settled: false, hovering: false, remaining: null, deadline: null };
      jobs.current.set(entryId, meta);
    }
    setToasts(prev => {
      const entry: ToastEntry = { id: entryId, message: opts.title, type: 'info', job: opts };
      return prev.some(t => t.id === entryId)
        ? prev.map(t => t.id === entryId ? entry : t)
        : [...prev, entry];
    });
    const terminal = opts.state === 'done' || opts.state === 'failed';
    if (!terminal) {
      // Back to active (a retry): cancel any pending dismissal.
      meta.settled = false;
      meta.remaining = null;
      meta.deadline = null;
      clearTimer(entryId);
      return;
    }
    if (meta.settled) return;
    meta.settled = true;
    const ms = opts.dismissAfterMs ?? JOB_TOAST_DISMISS_MS;
    if (meta.hovering) { meta.remaining = ms; meta.deadline = null; }
    else startJobTimer(entryId, ms);
    opts.onSettled?.({
      id: opts.id, title: opts.title, state: opts.state as 'done' | 'failed',
      detail: opts.detail, href: opts.href, hrefLabel: opts.hrefLabel,
    });
  }, [clearTimer, startJobTimer]);

  const dismissJobToast = useCallback((id: string) => {
    const entryId = jobEntryId(id);
    jobs.current.delete(entryId);
    dismiss(entryId);
  }, [dismiss]);

  const onJobHover = useCallback((entryId: string, hovering: boolean) => {
    const meta = jobs.current.get(entryId);
    if (!meta) return;
    meta.hovering = hovering;
    if (!meta.settled || meta.remaining === null) return;
    if (hovering) {
      if (meta.deadline !== null) meta.remaining = Math.max(0, meta.deadline - Date.now());
      meta.deadline = null;
      clearTimer(entryId);
    } else {
      startJobTimer(entryId, meta.remaining);
    }
  }, [clearTimer, startJobTimer]);

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

  // The close button: a manual close always works, and forgets the job so a
  // later toastJob with the same id starts a fresh toast.
  const dismissJobById = useCallback((entryId: string) => {
    jobs.current.delete(entryId);
    dismiss(entryId);
  }, [dismiss]);

  const ctxValue = useMemo<ToastContextValue>(
    () => ({ toast, toastJob, dismissJobToast }),
    [toast, toastJob, dismissJobToast],
  );

  return (
    <ToastContext.Provider value={ctxValue}>
      {children}
      {/* right: 1rem, plus an open ContextColumn's width (2.395.0) so a toast
          never covers a docked drawer's footer. */}
      <div
        data-testid="toast-stack"
        className="fixed top-16 right-[calc(1rem+var(--uic-context-column-inset,0px))] z-[2000] flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            {t.job ? (
              <JobToast
                id={t.id}
                title={t.job.title}
                state={t.job.state}
                detail={t.job.detail}
                progress={t.job.progress}
                href={t.job.href}
                hrefLabel={t.job.hrefLabel}
                exiting={t.exiting}
                onDismiss={dismissJobById}
                onHoverChange={h => onJobHover(t.id, h)}
              />
            ) : (
            <Toast
              id={t.id}
              message={t.message}
              type={t.type}
              exiting={t.exiting}
              actionLabel={t.actionLabel}
              onAction={t.onAction}
              onDismiss={dismiss}
            />
            )}
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
