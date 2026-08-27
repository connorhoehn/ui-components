// ChatDropZone — turns an arbitrary region into a file drop target without
// taking a dashed box's worth of space away from it.
//
// WHY THIS EXISTS ALONGSIDE FileUploadDrop
// ----------------------------------------
// `FileUploadDrop` is a form field: a permanent dashed rectangle that says
// "put a file here". That is the right shape for an upload step in a form and
// the wrong shape for a conversation, where the drop target is the entire
// thread and must be invisible until the user is actually dragging something.
// Same gesture, opposite spatial contract — so it is a second primitive rather
// than a `variant` prop that changes what the component fundamentally is.
//
// THE dragenter/dragleave COUNTER
// -------------------------------
// The naive implementation (`onDragLeave` -> hide) flickers violently:
// dragging across the region fires `dragleave` every time the pointer crosses
// into a CHILD element. We count enters minus leaves and only hide at zero,
// which is the standard fix and the reason this is worth sharing rather than
// re-deriving at each call site.
//
// DRAGS THAT ARE NOT FILES ARE IGNORED
// ------------------------------------
// Selecting message text and dragging it would otherwise light up a "drop your
// file here" overlay. We check `dataTransfer.types` for `Files` first.

import {
  useCallback,
  useRef,
  useState,
  type DragEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';

export interface ChatDropZoneProps {
  children: ReactNode;
  /** Receives the dropped files after validation. */
  onFiles: (files: File[]) => void;
  /** Comma-separated MIME patterns, e.g. "image/*,.pdf". Omit to accept all. */
  accept?: string;
  /** Per-file byte cap. Rejected files are reported via `onError`. */
  maxSize?: number;
  /** Called with a human-readable reason when a drop is rejected. */
  onError?: (message: string) => void;
  /** Suppresses the drop affordance entirely (e.g. while disconnected). */
  disabled?: boolean;
  /** Overlay copy. Defaults to a generic prompt. */
  label?: string;
  className?: string;
}

function matchesAccept(file: File, accept: string): boolean {
  const patterns = accept.split(',').map((p) => p.trim().toLowerCase()).filter(Boolean);
  if (patterns.length === 0) return true;
  return patterns.some((pat) => {
    if (pat.startsWith('.')) return file.name.toLowerCase().endsWith(pat);
    if (pat.endsWith('/*')) return file.type.startsWith(pat.slice(0, -1));
    return file.type === pat;
  });
}

function dragCarriesFiles(e: DragEvent<HTMLElement>): boolean {
  const types = e.dataTransfer?.types;
  if (!types) return false;
  return Array.prototype.indexOf.call(types, 'Files') !== -1;
}

export function ChatDropZone({
  children,
  onFiles,
  accept,
  maxSize,
  onError,
  disabled = false,
  label,
  className,
}: ChatDropZoneProps) {
  const [dragging, setDragging] = useState(false);
  // Nested elements each fire enter/leave; only zero means "actually left".
  const depth = useRef(0);

  const reset = useCallback(() => {
    depth.current = 0;
    setDragging(false);
  }, []);

  const handleDragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (disabled || !dragCarriesFiles(e)) return;
      e.preventDefault();
      depth.current += 1;
      setDragging(true);
    },
    [disabled],
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (disabled || !dragCarriesFiles(e)) return;
      // Without preventDefault the browser navigates to the dropped file.
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    if (!dragCarriesFiles(e)) return;
    depth.current = Math.max(0, depth.current - 1);
    if (depth.current === 0) setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();
      reset();
      const files = Array.from(e.dataTransfer?.files ?? []);
      if (files.length === 0) return;

      const rejected = files.filter(
        (f) => (accept && !matchesAccept(f, accept)) || (!!maxSize && f.size > maxSize),
      );
      if (rejected.length > 0) {
        onError?.(
          rejected.length === files.length
            ? `Can't attach ${rejected.map((f) => f.name).join(', ')} — unsupported type or too large.`
            : `Skipped ${rejected.length} file(s) — unsupported type or too large.`,
        );
      }
      const accepted = files.filter((f) => !rejected.includes(f));
      if (accepted.length > 0) onFiles(accepted);
    },
    [accept, disabled, maxSize, onError, onFiles, reset],
  );

  return (
    <div
      data-testid="chat-drop-zone"
      data-dragging={dragging ? 'true' : 'false'}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn('relative', className)}
    >
      {children}
      {dragging && (
        <div
          data-testid="chat-drop-zone-overlay"
          // pointer-events-none is load-bearing: an overlay that swallows
          // pointer events would eat the `drop` event it exists to advertise.
          className={cn(
            'pointer-events-none absolute inset-0 z-20 flex items-center justify-center',
            'rounded-lg border-2 border-dashed border-[var(--color-primary)]',
            'bg-[var(--color-surface)]/85 backdrop-blur-[1px]',
          )}
        >
          <span className="text-sm font-semibold text-[var(--color-primary)]">
            {label ?? 'Drop to share with everyone here'}
          </span>
        </div>
      )}
    </div>
  );
}

export default ChatDropZone;
