// CollapsedIconStrip — the narrow icon-only sidebar shown while the main
// sidebar is collapsed:
//   - the expand button (a menu glyph), in the header row when the strip runs
//     the full window height (`headerHeight`, AppShell `sidebarFullHeight`)
//   - the connection dot
//   - one icon per section (documents, pipelines, observability), each
//     rendered only when the host wires its handler
//
// `active` marks the section the window is in: a tinted square and a 3px
// brand bar on the strip's left edge (2.386.0). Before that every icon looked
// the same, so the strip said nothing about where you were.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ActivityIcon, BranchIcon, DocumentIcon, MenuIcon } from '../ui/Icons';

type ConnectionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'disconnected';

export type CollapsedIconStripSection = 'documents' | 'pipelines' | 'observability';

export interface CollapsedIconStripProps {
  connectionState: ConnectionState;
  /**
   * Opens the full sidebar. Omit when the surface has no expanded sidebar to
   * show: the strip keeps its header row but drops the expand button, so it
   * never offers a column that would open empty.
   */
  onExpand?: () => void;
  onDocuments?: () => void;
  onPipelines?: () => void;
  onObservability?: () => void;
  /** The section the window is in. */
  active?: CollapsedIconStripSection | null;
  /**
   * The app header's height, when the strip starts at the top of the window
   * beside it (AppShell `sidebarFullHeight`): the expand button is centred in
   * that row, and the sections start below it. Omit when the strip hangs
   * below the header.
   */
  headerHeight?: number;
  className?: string;
  'data-testid'?: string;
}

function StripButton({
  icon,
  title,
  onClick,
  active = false,
  testId,
}: {
  icon: ReactNode;
  title: string;
  onClick: () => void;
  active?: boolean;
  testId?: string;
}) {
  return (
    <span className="relative flex w-full justify-center">
      {active && (
        <span aria-hidden="true" data-testid={testId ? `${testId}-bar` : undefined} className="absolute inset-y-1 left-0 w-[3px] rounded-r bg-primary" />
      )}
      <button
        data-ui-part=""
        type="button"
        className={cn(
          'flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-none p-0 font-[inherit]',
          'transition-colors duration-150 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          active ? 'bg-primary-bg text-primary-fg' : 'bg-transparent text-text-secondary hover:bg-surface-hover',
        )}
        title={title}
        aria-label={title}
        aria-current={active ? 'page' : undefined}
        onClick={onClick}
        data-testid={testId}
        data-active={active ? 'true' : 'false'}
      >
        {icon}
      </button>
    </span>
  );
}

export function CollapsedIconStrip({
  connectionState,
  onExpand,
  onDocuments,
  onPipelines,
  onObservability,
  active = null,
  headerHeight,
  className,
  'data-testid': testId = 'collapsed-icon-strip',
}: CollapsedIconStripProps) {
  const inHeader = typeof headerHeight === 'number';
  return (
    <div data-testid={testId} className={cn('flex h-full w-full flex-col items-center', inHeader ? 'gap-3.5' : 'gap-1', className)}>
      <span
        className="flex w-full shrink-0 items-center justify-center"
        {...(inHeader ? { style: { height: headerHeight } } : {})}
      >
        {onExpand ? (
          <StripButton icon={<MenuIcon size={18} />} title="Expand sidebar" onClick={onExpand} testId={`${testId}-expand`} />
        ) : null}
      </span>
      <span
        className={cn(
          'mx-auto h-2 w-2 shrink-0 rounded-full',
          inHeader ? 'mb-5 mt-1.5' : 'my-1.5',
          connectionState === 'connected' && 'bg-success',
          (connectionState === 'connecting' || connectionState === 'reconnecting') && 'bg-warning',
          (connectionState === 'idle' || connectionState === 'disconnected') && 'bg-danger',
        )}
        role="img"
        title={`Connection: ${connectionState}`}
        aria-label={`Connection: ${connectionState}`}
        data-testid={`${testId}-connection`}
      />
      {!inHeader && <span className="h-2" aria-hidden="true" />}
      {onDocuments && <StripButton icon={<DocumentIcon size={18} />} title="Documents" onClick={onDocuments} active={active === 'documents'} testId={`${testId}-documents`} />}
      {onPipelines && <StripButton icon={<BranchIcon size={18} />} title="Pipelines" onClick={onPipelines} active={active === 'pipelines'} testId={`${testId}-pipelines`} />}
      {onObservability && <StripButton icon={<ActivityIcon size={18} />} title="Observability" onClick={onObservability} active={active === 'observability'} testId={`${testId}-observability`} />}
    </div>
  );
}

export default CollapsedIconStrip;
