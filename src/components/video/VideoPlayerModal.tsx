// VideoPlayerModal — modal video player for raw MP4 / WebM segments.
//
// Sister component to RecordingPlayer (which is HLS-only). Use this when
// you have one or more direct media URLs (e.g. recording segments served
// over /api/.../segments/recording_NNNNN.mp4 with Content-Type: video/mp4
// + Range support) and you want a focused playback overlay.
//
// Multi-segment support: pass `sources: VideoPlayerSource[]` and the
// component renders a segment switcher in the footer. The first source
// auto-plays; clicking another source swaps the <video> src and resets
// playback. Use the single-source variant `sources: [{url}]` for one-shot
// captures (most hangout recordings today).
//
// Composition slots: `header` / `footer` for caller-supplied content
// alongside the title block + segment switcher. `onClose` is required —
// the backdrop click + Escape key both call it.

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { focusInitialElement, restoreFocus, trapTabKey } from '../../lib/focusTrap';
import { useOverlayLayer } from '../../lib/overlayStack';
import { safeDownloadHref } from '../../lib/safeHref';

export interface VideoPlayerSource {
  /** Direct media URL (mp4 / webm / etc) served with Range support. */
  url: string;
  /** Optional human label for the segment switcher (e.g. "Segment 1"). */
  label?: string;
  /** Optional size in bytes — shown next to the label when present. */
  sizeBytes?: number;
}

export interface VideoPlayerModalProps {
  /** Required — backdrop click + Escape both fire this. */
  onClose: () => void;

  /** One or more media URLs. The first plays first; multiple ⇒ segment switcher. */
  sources: VideoPlayerSource[];

  /** Optional small title shown in the modal header (e.g. channel name). */
  title?: string;
  /** Optional subtitle shown under the title (e.g. start time + duration). */
  subtitle?: string;

  /** Auto-play the first source on mount. Default true. */
  autoPlay?: boolean;
  /** Start muted (useful when autoPlay is on — many browsers require it). Default false. */
  muted?: boolean;
  /** Hide the per-source Download link in the footer. Default false. */
  hideDownload?: boolean;

  /** Render extra content in the header (right side, before the close button). */
  header?: ReactNode;
  /** Render extra content in the footer (right side). */
  footer?: ReactNode;

  className?: string;
}

function formatBytes(b: number): string {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  if (b < 1024 * 1024 * 1024) return `${(b / (1024 * 1024)).toFixed(1)} MB`;
  return `${(b / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function VideoPlayerModal({
  onClose,
  sources,
  title,
  subtitle,
  autoPlay = true,
  muted = false,
  hideDownload = false,
  header,
  footer,
  className,
}: VideoPlayerModalProps) {
  const safeSources = useMemo(() => sources.filter(s => !!s.url), [sources]);
  const [activeIdx, setActiveIdx] = useState(0);
  const active = safeSources[activeIdx];
  const cardRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Escape closes; Tab/Shift+Tab cycle inside the card. This component
  // declares `aria-modal="true"`, so letting Tab reach the page behind it
  // would contradict what it tells assistive tech.
  // Mount is "open" for this component, so the layer is always registered.
  const isTopLayer = useOverlayLayer(true);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isTopLayer()) return;
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      trapTabKey(e, cardRef.current);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, isTopLayer]);

  // The modal mounts/unmounts with its open state (no `open` prop), so mount
  // is "open": capture focus on the way in, hand it back on the way out.
  useEffect(() => {
    previouslyFocusedRef.current =
      (typeof document !== 'undefined' ? document.activeElement : null) as HTMLElement | null;
    focusInitialElement(cardRef.current);
    return () => {
      restoreFocus(previouslyFocusedRef.current);
      previouslyFocusedRef.current = null;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Video player'}
      onClick={onClose}
      className={cn(
        'fixed inset-0 z-50 grid place-items-center p-4',
        'bg-black/80 backdrop-blur-sm',
      )}
    >
      <div
        ref={cardRef}
        onClick={e => e.stopPropagation()}
        className={cn(
          'w-full max-w-4xl flex flex-col rounded-xl overflow-hidden shadow-2xl',
          'bg-[var(--color-surface)] text-[var(--color-text-primary)]',
          className,
        )}
      >
        {(title || subtitle || header) && (
          <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-border)]">
            <div className="min-w-0 flex-1">
              {title && (
                <h2 className="text-sm font-semibold truncate">{title}</h2>
              )}
              {subtitle && (
                <p className="text-xs text-[var(--color-text-secondary)] truncate">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {header}
              <button
                data-ui-part=""
                type="button"
                onClick={onClose}
                aria-label="Close"
                className={cn(
                  'h-8 w-8 grid place-items-center rounded text-xl leading-none',
                  'hover:bg-white/10',
                )}
              >
                ×
              </button>
            </div>
          </header>
        )}

        {active ? (
          <video
            key={active.url}
            src={active.url}
            controls
            autoPlay={autoPlay}
            muted={muted}
            className="w-full max-h-[70vh] bg-black"
          />
        ) : (
          <div className="p-10 text-center text-[var(--color-text-secondary)] text-sm">
            No playable sources.
          </div>
        )}

        {safeSources.length > 1 && (
          <nav
            className={cn(
              'flex flex-wrap gap-1 px-4 py-2 border-t border-[var(--color-border)]',
              'text-xs',
            )}
            aria-label="Segments"
          >
            {safeSources.map((s, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  data-ui-part=""
                  // Index participates in the key so a caller passing
                  // duplicate URLs (e.g. multiple per-peer recording legs
                  // pointing at the same file) doesn't trip React's
                  // "two children with the same key" warning.
                  key={`${i}:${s.url}`}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={cn(
                    'px-2.5 py-1 rounded transition-colors',
                    isActive
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-surface-alt,rgba(255,255,255,0.05))] hover:bg-white/10',
                  )}
                  aria-current={isActive ? 'true' : undefined}
                  title={s.sizeBytes != null ? formatBytes(s.sizeBytes) : undefined}
                >
                  {s.label || `Segment ${i + 1}`}
                </button>
              );
            })}
          </nav>
        )}

        {(footer || (!hideDownload && active)) && (
          <footer className="flex items-center gap-3 px-4 py-2 border-t border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)]">
            <div className="min-w-0 flex-1 flex items-center gap-2">{footer}</div>
            {!hideDownload && active && (
              <a
                href={safeDownloadHref(active.url) ?? undefined}
                download
                className="underline hover:text-[var(--color-primary)] shrink-0"
              >
                Download
              </a>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}

export default VideoPlayerModal;
