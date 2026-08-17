// frontend/src/components/shared/Toast.tsx
//
// Single toast visual — Tailwind-styled card with left accent border, soft
// shadow, and slide-in / fade-out animations via keyframes defined in
// src/styles.css. Consumers should not render this directly; use
// <ToastProvider> and `useToast()` instead.

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../lib/cn';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  /** Exit state drives fade-out animation before removal from the DOM. */
  exiting?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss: (id: string) => void;
}

const ACCENT_TEXT_CLASS: Record<ToastType, string> = {
  info:    'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error:   'text-danger',
};

const ACCENT_BORDER: Record<ToastType, string> = {
  info:    'border-l-[#2563eb]',
  success: 'border-l-[#16a34a]',
  warning: 'border-l-[#d97706]',
  error:   'border-l-[#dc2626]',
};

function Toast({ id, message, type, exiting, actionLabel, onAction, onDismiss }: ToastProps) {
  const reduceMotion = usePrefersReducedMotion();

  const animationClass = reduceMotion
    ? 'animate-none'
    : exiting
      ? 'animate-[toast-fade-out_160ms_ease-in_forwards]'
      : 'animate-[toast-slide-in_200ms_ease-out]';

  return (
    <div
      role="alert"
      aria-live={type === 'error' || type === 'warning' ? 'assertive' : 'polite'}
      className={cn(
        'bg-white border border-border border-l-[3px] rounded-lg',
        'px-4 py-3 flex items-center justify-between gap-3',
        'font-[system-ui,-apple-system,sans-serif] shadow-md',
        'min-w-[260px] max-w-[360px]',
        ACCENT_BORDER[type],
        animationClass,
        reduceMotion && exiting && 'opacity-0',
      )}
    >
      <span className="text-sm text-gray-700 font-normal flex-1 leading-[1.35]">
        {message}
      </span>
      <div className="flex items-center gap-1 shrink-0">
        {actionLabel && onAction && (
          <button
            onClick={() => { onAction(); onDismiss(id); }}
            className={cn('bg-transparent border-none text-[13px] font-semibold cursor-pointer px-1.5 py-0.5 font-[inherit]', ACCENT_TEXT_CLASS[type])}
          >
            {actionLabel}
          </button>
        )}
        <button
          onClick={() => onDismiss(id)}
          aria-label="Dismiss notification"
          className="text-base text-text-tertiary bg-transparent border-none cursor-pointer px-1 py-0 leading-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Toast;
