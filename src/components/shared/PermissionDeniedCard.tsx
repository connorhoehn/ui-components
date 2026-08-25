import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';

// PermissionDeniedCard — fallback shown when a media-device permission
// state is unfavorable. Surfaces user-readable copy + a retry action;
// the consumer maps the underlying browser API states (NotAllowedError,
// NotFoundError, NotReadableError, etc.) onto the four `state` values.

export type PermissionState =
  | 'denied'        // user clicked Block in the browser prompt
  | 'blocked'       // device exists but is held by another app
  | 'no-device'     // hardware enumeration came back empty
  | 'unavailable';  // browser/runtime doesn't support the API

export type PermissionKind = 'camera' | 'microphone' | 'screen';

export interface PermissionDeniedCardProps {
  /** Which underlying capability was denied. Drives the default copy + icon. */
  kind: PermissionKind;
  state: PermissionState;
  /** Optional verbatim error message (browser-specific text). When omitted
   *  the card renders default copy keyed on `state`. */
  message?: string | null;
  /** Optional retry action. Hidden when omitted. */
  onRetry?: () => void;
  /** Optional override label for the retry button (default: "Try again"). */
  retryLabel?: string;
  /** Optional override icon (replaces the default per-kind glyph). */
  icon?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

const KIND_NOUN: Record<PermissionKind, string> = {
  camera: 'Camera',
  microphone: 'Microphone',
  screen: 'Screen sharing',
};

// The browser's own PermissionState union includes 'prompt', which this
// component's narrower union does not — so a perfectly ordinary permission
// query could index these maps to `undefined` and then CALL it, throwing
// during render. Falling back to the 'unavailable' copy keeps the card (and
// its retry affordance) on screen instead of taking the surface down.
const STATE_TITLE: Record<PermissionState, (k: PermissionKind) => string> = {
  denied:      (k) => `${KIND_NOUN[k]} access blocked`,
  blocked:     (k) => `${KIND_NOUN[k]} is in use`,
  'no-device': (k) => k === 'screen' ? 'Screen sharing not supported' : `No ${k} detected`,
  unavailable: (k) => `${KIND_NOUN[k]} unavailable`,
};

const STATE_BODY: Record<PermissionState, (k: PermissionKind) => string> = {
  denied:      (k) => `${KIND_NOUN[k]} access was blocked. Click the icon in your browser's address bar to allow it.`,
  blocked:     (k) => `${KIND_NOUN[k]} is being used by another application. Close other tabs or apps using it and try again.`,
  'no-device': (k) => `No ${k === 'screen' ? 'screen sharing capability' : k} was found on this device.`,
  unavailable: () => `This browser doesn't support the requested device access.`,
};

function DefaultIcon({ kind }: { kind: PermissionKind }) {
  if (kind === 'camera') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <line x1="2" y1="2" x2="22" y2="22" />
        <path d="m22 8-6 4 6 4V8Z" />
        <path d="M10.5 6.5h3.5a2 2 0 0 1 2 2v2.5" />
        <path d="M2 6.5v9a2 2 0 0 0 2 2h7" />
      </svg>
    );
  }
  if (kind === 'microphone') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <line x1="2" y1="2" x2="22" y2="22" />
        <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
        <path d="M15 9.34V5a3 3 0 0 0-5.94-.6" />
        <path d="M17 16.95A7 7 0 0 1 5 12v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    );
  }
  // screen
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="3" y1="9" x2="21" y2="9" />
    </svg>
  );
}

export default function PermissionDeniedCard({
  kind,
  state,
  message,
  onRetry,
  retryLabel = 'Try again',
  icon,
  className,
  'data-testid': testId,
}: PermissionDeniedCardProps) {
  return (
    <div
      data-testid={testId}
      data-permission-kind={kind}
      data-permission-state={state}
      className={cn(
        'flex flex-col items-center text-center gap-3 p-6 max-w-sm',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 rounded-full bg-warning-bg text-warning-fg grid place-items-center">
        {icon ?? <DefaultIcon kind={kind} />}
      </div>
      <div className="text-base font-semibold text-text-primary">
        {(STATE_TITLE[state] ?? STATE_TITLE.unavailable)(kind)}
      </div>
      <p className="text-xs text-text-secondary">
        {message ?? (STATE_BODY[state] ?? STATE_BODY.unavailable)(kind)}
      </p>
      {onRetry && (
        <Button variant="ghost" size="sm" onClick={onRetry}>{retryLabel}</Button>
      )}
    </div>
  );
}
