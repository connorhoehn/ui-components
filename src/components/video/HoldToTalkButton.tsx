// ui-components/src/components/video/HoldToTalkButton.tsx
//
// A round, pulsing record button for push-to-talk. Hold it (pointer, or Space
// anywhere outside a text field when `spaceToTalk`) to talk and release to send.
// A quick tap latches talking on; the next tap ends it. Esc cancels. Uncontrolled:
// the button owns the talking state and reports through callbacks.
//
// `busy` means someone else holds the floor: the button is disabled and says who.

import { useCallback, useEffect, useRef, useState } from 'react';
import { MicIcon } from './MediaIcons';
import { T } from '../shared/Text';
import { cn } from '../../lib/cn';

export type HoldToTalkTone = 'start' | 'end' | 'cancel';

export interface HoldToTalkButtonProps {
  onStart?: () => void;
  /** Talking ended normally (release, second tap, or the max duration). */
  onEnd?: (durationMs: number) => void;
  /** Esc: talking ended and the result should be dropped. */
  onCancel?: () => void;
  /** Hook for a host to play a sound. */
  onTone?: (kind: HoldToTalkTone) => void;
  /** Hold Space (outside text fields) to talk. @default false */
  spaceToTalk?: boolean;
  /** A press shorter than this latches talking on instead of ending on release. @default 250 */
  tapThresholdMs?: number;
  /** Talking ends by itself after this long. @default 30000 */
  maxDurationMs?: number;
  /** Someone else is holding: disabled, the label is shown beside the button. */
  busy?: { label: string };
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Accessible name while idle. @default 'Hold to talk' */
  label?: string;
  /** Accessible name while talking. @default 'Talking, release to send' */
  talkingLabel?: string;
  className?: string;
  'data-testid'?: string;
}

const SIZE: Record<NonNullable<HoldToTalkButtonProps['size']>, { box: string; icon: number }> = {
  sm: { box: 'h-8 w-8', icon: 16 },
  md: { box: 'h-11 w-11', icon: 20 },
  lg: { box: 'h-14 w-14', icon: 26 },
};

function isEditable(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || typeof el.tagName !== 'string') return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable === true
    || el.getAttribute?.('contenteditable') === 'true';
}

export function HoldToTalkButton({
  onStart, onEnd, onCancel, onTone,
  spaceToTalk = false, tapThresholdMs = 250, maxDurationMs = 30000,
  busy, disabled = false, size = 'md',
  label = 'Hold to talk', talkingLabel = 'Talking, release to send',
  className, 'data-testid': testId = 'hold-to-talk',
}: HoldToTalkButtonProps) {
  const [talking, setTalking] = useState(false);
  const talkingRef = useRef(false);
  const startedAt = useRef(0);
  const latched = useRef(false);
  const holding = useRef(false);
  const maxTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cb = useRef({ onStart, onEnd, onCancel, onTone });
  cb.current = { onStart, onEnd, onCancel, onTone };
  const inert = disabled || !!busy;

  const clearTimer = () => { if (maxTimer.current) { clearTimeout(maxTimer.current); maxTimer.current = null; } };

  const finish = useCallback((cancelled: boolean) => {
    if (!talkingRef.current) return;
    talkingRef.current = false;
    latched.current = false;
    holding.current = false;
    clearTimer();
    setTalking(false);
    if (cancelled) { cb.current.onTone?.('cancel'); cb.current.onCancel?.(); }
    else { cb.current.onTone?.('end'); cb.current.onEnd?.(Date.now() - startedAt.current); }
  }, []);

  const begin = useCallback(() => {
    talkingRef.current = true;
    holding.current = true;
    latched.current = false;
    startedAt.current = Date.now();
    setTalking(true);
    cb.current.onTone?.('start');
    cb.current.onStart?.();
    clearTimer();
    maxTimer.current = setTimeout(() => finish(false), maxDurationMs);
  }, [finish, maxDurationMs]);

  const press = useCallback(() => {
    if (talkingRef.current) {
      // A press while latched ends it.
      if (latched.current) finish(false);
      return;
    }
    begin();
  }, [begin, finish]);

  const release = useCallback(() => {
    if (!holding.current || !talkingRef.current) return;
    holding.current = false;
    if (Date.now() - startedAt.current < tapThresholdMs) { latched.current = true; return; }
    finish(false);
  }, [finish, tapThresholdMs]);

  // Becoming inert mid-talk ends it as a cancel; unmount clears the timer.
  useEffect(() => { if (inert && talkingRef.current) finish(true); }, [inert, finish]);
  useEffect(() => () => clearTimer(), []);

  useEffect(() => {
    if (!talking && !(spaceToTalk && !inert)) return;
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && talkingRef.current) { e.preventDefault(); finish(true); return; }
      if (e.key === ' ' && spaceToTalk && !inert && !e.repeat && !isEditable(e.target)) {
        e.preventDefault();
        press();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === ' ' && spaceToTalk && holding.current && !isEditable(e.target)) { e.preventDefault(); release(); }
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [talking, spaceToTalk, inert, press, release, finish]);

  const name = busy ? busy.label : talking ? talkingLabel : label;
  const s = SIZE[size];

  return (
    <T className={cn('inline-flex items-center gap-2', className)} data-testid={`${testId}-root`}>
      <button
        data-ui-part=""
        type="button"
        aria-label={name}
        title={name}
        aria-pressed={talking}
        disabled={inert}
        data-state={talking ? 'talking' : busy ? 'busy' : 'idle'}
        data-testid={testId}
        onPointerDown={(e) => { if (e.button === 0 && !inert) { e.preventDefault(); press(); } }}
        onPointerUp={release}
        onPointerLeave={release}
        // Space on the focused button is handled by the window listener when
        // spaceToTalk; otherwise Enter/Space act as a toggle for keyboard users.
        onKeyDown={(e) => {
          if (inert || (spaceToTalk && e.key === ' ')) return;
          if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); if (talkingRef.current) finish(false); else begin(); latched.current = true; }
        }}
        className={cn(
          'relative grid shrink-0 place-items-center rounded-full border-0 p-0 outline-none transition-colors',
          'focus-visible:ring-2 focus-visible:ring-info/40',
          s.box,
          talking
            ? 'bg-danger text-white motion-safe:animate-pulse'
            : 'bg-surface-hover text-text-primary hover:bg-danger/20',
          inert && 'cursor-not-allowed opacity-50',
        )}
      >
        <MicIcon size={s.icon} aria-hidden="true" />
      </button>
      {busy && <T size="sm" tone="secondary" data-testid={`${testId}-busy`}>{busy.label}</T>}
    </T>
  );
}

export default HoldToTalkButton;
