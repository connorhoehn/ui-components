// frontend/src/components/CollapsedIconStrip.tsx
//
// Narrow icon-only sidebar shown when the main CollapsibleSidebar is
// collapsed. Replaces the previous "fully hidden + overlay hamburger"
// pattern with a persistent full-height column that surfaces:
//   - Expand button (☰) at the top
//   - Connection status dot
//   - Section icons (documents, pipelines, observability) — clickable to
//     navigate, with the assumption that landing on the section will give
//     the user the full UI without needing the sidebar expanded
//
// Width is 56px to match SIDEBAR_COLLAPSED_WIDTH in AppLayout.

import { cn } from '../../lib/cn';

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
  icon: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        'w-10 h-10 rounded-lg border-none bg-transparent cursor-pointer',
        'flex items-center justify-center text-lg text-text-secondary',
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
      <IconButton icon={'☰'} title="Expand sidebar" onClick={onExpand} />
      <div
        className={cn(
          'w-2 h-2 rounded-full mx-auto my-1.5',
          connectionState === 'connected' && 'bg-[#22c55e]',
          (connectionState === 'connecting' || connectionState === 'reconnecting') && 'bg-[#f59e0b]',
          (connectionState === 'idle' || connectionState === 'disconnected') && 'bg-[#ef4444]'
        )}
        title={`Connection: ${connectionState}`}
        aria-label={`Connection: ${connectionState}`}
      />
      <div className="h-2" />
      <IconButton icon={'\u{1F4C4}'} title="Documents" onClick={onDocuments} />
      <IconButton icon={'\u{1F500}'} title="Pipelines" onClick={onPipelines} />
      <IconButton icon={'\u{1F4E1}'} title="Observability" onClick={onObservability} />
    </div>
  );
}

export default CollapsedIconStrip;
