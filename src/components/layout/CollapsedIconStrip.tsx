// frontend/src/components/CollapsedIconStrip.tsx
//
// Narrow icon-only sidebar shown when the main CollapsibleSidebar is
// collapsed. Replaces the previous "fully hidden + overlay hamburger"
// pattern with a persistent full-height column that surfaces:
//   - Expand button (a menu glyph) at the top
//   - Connection status dot
//   - Section icons (documents, pipelines, observability) — clickable to
//     navigate, with the assumption that landing on the section will give
//     the user the full UI without needing the sidebar expanded
//
// Width is 56px to match SIDEBAR_COLLAPSED_WIDTH in AppLayout.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ActivityIcon, BranchIcon, DocumentIcon, MenuIcon } from '../ui/Icons';

type ConnectionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'disconnected';

export interface CollapsedIconStripProps {
  connectionState: ConnectionState;
  onExpand: () => void;
  onDocuments: () => void;
  onPipelines: () => void;
  onObservability: () => void;
}

function IconButton({
  icon,
  title,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        'w-10 h-10 rounded-lg border-none bg-transparent cursor-pointer',
        'flex items-center justify-center text-text-secondary',
        'font-[inherit] p-0 transition-colors duration-150 ease-in-out',
        'hover:bg-surface-hover'
      )}
      title={title}
      aria-label={title}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

export function CollapsedIconStrip({
  connectionState,
  onExpand,
  onDocuments,
  onPipelines,
  onObservability,
}: CollapsedIconStripProps) {
  return (
    <div
      data-testid="collapsed-icon-strip"
      className="flex flex-col items-center gap-1 h-full"
    >
      <IconButton icon={<MenuIcon size={18} />} title="Expand sidebar" onClick={onExpand} />
      <div
        className={cn(
          'w-2 h-2 rounded-full mx-auto my-1.5',
          connectionState === 'connected' && 'bg-success',
          (connectionState === 'connecting' || connectionState === 'reconnecting') && 'bg-warning',
          (connectionState === 'idle' || connectionState === 'disconnected') && 'bg-danger'
        )}
        title={`Connection: ${connectionState}`}
        aria-label={`Connection: ${connectionState}`}
      />
      <div className="h-2" />
      <IconButton icon={<DocumentIcon size={18} />} title="Documents" onClick={onDocuments} />
      <IconButton icon={<BranchIcon size={18} />} title="Pipelines" onClick={onPipelines} />
      <IconButton icon={<ActivityIcon size={18} />} title="Observability" onClick={onObservability} />
    </div>
  );
}

export default CollapsedIconStrip;
