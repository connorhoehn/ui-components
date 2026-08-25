// CallSidePanel — a presentational right-side panel shell for in-call
// surfaces (chat first, roster/settings later). Dark call chrome, a
// header with the title + ✕, and a scrollable body slot.
//
// Placement contract: the consumer renders it as a SIBLING of the video
// layout inside a `flex` container — the panel takes a fixed width on
// the right and the video layout keeps `flex-1`:
//
//   <div className="flex h-full min-h-0">
//     <div className="min-w-0 flex-1">{videoLayout}</div>
//     <CallSidePanel open={chatOpen} onClose={...} title="Chat">
//       {chatBody}
//     </CallSidePanel>
//   </div>
//
// Purely presentational: `children` is a slot (typically a chat panel
// wired to the call's channel); no realtime hooks are imported here.
// When `open` is false the panel renders nothing, so the video layout
// reflows to full width.

import type { ReactNode } from 'react';

import { cn } from '../../lib/cn';

export interface CallSidePanelProps {
  open: boolean;
  /** The header ✕ fires this. The consumer owns the open/closed state. */
  onClose: () => void;
  /** Header text, e.g. "Chat". */
  title: string;
  /** Panel body — rendered inside a `min-h-0 flex-1 overflow-y-auto` slot. */
  children: ReactNode;
  /** Width utility for the panel column. Defaults to `w-80`. */
  widthClassName?: string;
  className?: string;
  'data-testid'?: string;
}

export function CallSidePanel({
  open,
  onClose,
  title,
  children,
  widthClassName = 'w-80',
  className,
  'data-testid': testId = 'call-side-panel',
}: CallSidePanelProps) {
  if (!open) return null;

  return (
    <aside
      data-testid={testId}
      aria-label={title}
      className={cn(
        'flex h-full min-h-0 shrink-0 flex-col overflow-hidden',
        'border-l border-white/10 bg-surface-inverse text-text-inverse',
        widthClassName,
        className,
      )}
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <h2 className="m-0 truncate text-sm font-semibold text-text-inverse">{title}</h2>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          data-testid="call-side-panel-close"
          className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white"
        >
          ×
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </aside>
  );
}

export default CallSidePanel;
