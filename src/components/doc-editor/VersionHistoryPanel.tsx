// frontend/src/components/doc-editor/VersionHistoryPanel.tsx
//
// Slide-out sidebar for browsing and comparing document versions (view-only).

import type { VersionEntry, SnapshotSection } from '../../hooks/useVersionHistory';
import { Panel, PanelHeader, PanelBody, Button } from '../ui/Panel';
import DiffViewer from './DiffViewer';
import { cn } from '../../lib/cn';
import { onActivationKey } from '../../lib/activationKey';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface VersionHistoryPanelProps {
  versions: VersionEntry[];
  loading: boolean;
  previewTimestamp: number | null;
  onFetch: () => void;
  onPreview: (timestamp: number) => void;
  onClearPreview: () => void;
  onClose: () => void;
  /** Save a named version. */
  onSaveVersion?: (name: string) => void;
  /** Trigger comparison for a version timestamp. */
  onCompare?: (timestamp: number) => void;
  /** Dismiss the diff view. */
  onClearCompare: () => void;
  /** Sections from the compared historical version (null when no compare active). */
  compareSections: SnapshotSection[] | null;
  /** Currently compared timestamp. */
  compareTimestamp: number | null;
  /** Current document sections for diff. */
  currentSections: SnapshotSection[];
  /** Restore to a historical version. */
  onRestore?: (timestamp: number) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatRelativeTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;

  const months = Math.floor(days / 30);
  return `${months} month${months !== 1 ? 's' : ''} ago`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function VersionHistoryPanel({
  versions,
  loading,
  previewTimestamp,
  onFetch: _onFetch,
  onPreview,
  onClearPreview,
  onClose,
  onSaveVersion,
  onCompare,
  onClearCompare,
  compareSections,
  compareTimestamp,
  currentSections,
  onRestore,
}: VersionHistoryPanelProps) {
  const handleClose = () => {
    onClearPreview();
    onClearCompare();
    onClose();
  };

  const handleSaveVersion = () => {
    const name = window.prompt('Enter a name for this version:');
    if (name && name.trim()) {
      onSaveVersion?.(name.trim());
    }
  };

  const handleCompare = (e: React.MouseEvent, timestamp: number) => {
    e.stopPropagation(); // Don't trigger the row's preview click
    if (compareTimestamp === timestamp) {
      onClearCompare();
    } else {
      onCompare?.(timestamp);
    }
  };

  const versionTypeLabel = (v: VersionEntry): string => {
    if (v.type === 'pre-restore') return 'Before restore';
    if (v.type === 'auto') return 'Auto-save';
    return '';
  };

  return (
    <Panel width={320}>
      {/* Header */}
      <PanelHeader
        title="Version History"
        onClose={handleClose}
        actions={onSaveVersion ? (
          <Button size="sm" onClick={handleSaveVersion}>
            Save Version
          </Button>
        ) : undefined}
      />

      {/* Version list */}
      <PanelBody padding="0.5rem 0">
        {loading && <div className={cn('py-8 px-4 text-center text-text-tertiary text-[13px]')}>Loading...</div>}

        {!loading && versions.length === 0 && (
          <div className={cn('py-8 px-4 text-center text-text-tertiary text-[13px]')}>No saved versions yet</div>
        )}

        {!loading &&
          versions.map((v) => (
            <div
              key={v.timestamp}
              role="button"
              tabIndex={0}
              className={cn(
                'flex items-center justify-between py-2.5 px-4 cursor-pointer text-[13px] text-text-primary',
                previewTimestamp === v.timestamp ? 'bg-info-bg border-l-[3px] border-l-info' : 'bg-transparent border-l-[3px] border-l-transparent',
              )}
              onClick={() => onPreview(v.timestamp)}
              // Space must preventDefault or the version list scrolls instead.
              onKeyDown={onActivationKey(() => onPreview(v.timestamp))}
            >
              <div className={cn('flex-1 min-w-0')}>
                {v.name && <span className={cn('text-xs font-semibold text-text-primary block mb-px')}>{v.name}</span>}
                <span className={cn('flex items-center gap-1')}>
                  {formatRelativeTime(v.age)}
                  {v.type && v.type !== 'manual' && (
                    <span
                      className={cn(
                        'text-[10px] font-medium px-[5px] py-px rounded-[3px] ml-1.5',
                        v.type === 'pre-restore'
                          ? 'bg-warning-bg text-warning-fg'
                          : v.type === 'auto'
                          ? 'bg-surface-hover text-text-tertiary'
                          : 'bg-info-bg text-info-fg',
                      )}
                    >
                      {versionTypeLabel(v)}
                    </span>
                  )}
                </span>
                {v.author && <span className={cn('text-[10px] text-text-tertiary block')}>by {v.author}</span>}
                <span className={cn('text-[11px] text-text-tertiary')}>
                  {new Date(v.timestamp).toLocaleString()}
                </span>
              </div>
              {onCompare && <button
                type="button"
                className={cn(
                  'px-2 py-[3px] text-[11px] font-medium border rounded-[4px] cursor-pointer font-[inherit] whitespace-nowrap',
                  compareTimestamp === v.timestamp
                    ? 'bg-info-bg border-info text-info-fg'
                    : 'bg-surface border-border text-text-secondary',
                )}
                onClick={(e) => handleCompare(e, v.timestamp)}
              >
                {compareTimestamp === v.timestamp ? 'Hide Diff' : 'Compare'}
              </button>}
            </div>
          ))}
      </PanelBody>

      {/* Diff viewer */}
      {compareSections != null && (
        <DiffViewer
          oldSections={compareSections}
          newSections={currentSections}
          onClose={onClearCompare}
        />
      )}

      {/* Restore button — shown when a version is selected for compare */}
      {onRestore && compareTimestamp != null && (
        <div className={cn('py-3 px-4 border-t border-border shrink-0')}>
          <Button
            variant="primary"
            onClick={() => {
              if (window.confirm(
                'Restore this version?\n\n' +
                'A checkpoint of the current state will be saved first. ' +
                'All connected users will see the restored content. ' +
                'Comments and reviews added after this version may be lost.'
              )) {
                onRestore(compareTimestamp);
                onClearCompare();
              }
            }}
            className="w-full px-4 py-2.5 text-sm font-semibold rounded-lg"
          >
            Restore this version
          </Button>
          <div className={cn('text-[11px] text-text-tertiary text-center mt-1.5')}>
            A pre-restore checkpoint will be saved automatically
          </div>
        </div>
      )}

    </Panel>
  );
}
