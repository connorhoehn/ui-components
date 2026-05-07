import { useMemo } from 'react';

import Modal from '../../shared/Modal';
import { cn } from '../../../lib/cn';
import type {
  PipelineDefinition,
  PipelineNode,
} from '../../../types/pipeline';
import { diffDefinitions } from './diffDefinitions';
import type { NodeDiffRow } from './diffDefinitions';

export interface VersionDiffModalProps {
  open: boolean;
  onClose: () => void;
  currentDef: PipelineDefinition;
  publishedDef: PipelineDefinition | null;
  onJumpToNode?: (nodeId: string) => void;
}

export type { NodeDiffRow } from './diffDefinitions';

const TYPE_ICON: Record<string, string> = {
  trigger: '▶',
  llm: '🧠',
  transform: '⚙',
  condition: '❓',
  action: '⚡',
  fork: '🔀',
  join: '🔗',
  approval: '✋',
};

function shortLabel(node: PipelineNode): string {
  if (node.data.type === 'condition' && node.data.label) return node.data.label;
  if (node.data.type === 'llm') return node.data.model;
  if (node.data.type === 'action') return node.data.actionType;
  if (node.data.type === 'trigger') return node.data.triggerType;
  return node.type.charAt(0).toUpperCase() + node.type.slice(1);
}

function renderRow(
  row: NodeDiffRow,
  kind: 'added' | 'removed' | 'modified',
  onJump: ((nodeId: string) => void) | undefined,
): React.ReactNode {
  const node = row.node;
  const icon = TYPE_ICON[node.type] ?? '■';
  const canJump = kind !== 'removed' && !!onJump;
  return (
    <button
      key={`${kind}-${row.node.id}`}
      type="button"
      disabled={!canJump}
      onClick={canJump ? () => onJump!(row.node.id) : undefined}
      className={cn(
        'flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-[inherit] bg-[#f8fafc] border border-border text-left w-full text-text-primary',
        canJump ? 'cursor-pointer' : 'cursor-default',
        kind === 'removed' && 'opacity-85',
      )}
      data-testid={`diff-row-${kind}`}
    >
      <span className="text-sm">{icon}</span>
      <span className="font-semibold">{node.type}</span>
      <span className="text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {shortLabel(node)}
      </span>
      {kind === 'modified' && row.positionChanged ? (
        <span className="inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]">
          moved
        </span>
      ) : null}
    </button>
  );
}

function VersionDiffModal({
  open,
  onClose,
  currentDef,
  publishedDef,
  onJumpToNode,
}: VersionDiffModalProps): React.ReactElement | null {
  const diff = useMemo(
    () => diffDefinitions(currentDef, publishedDef),
    [currentDef, publishedDef],
  );

  const handleJump = (nodeId: string) => {
    if (onJumpToNode) onJumpToNode(nodeId);
    onClose();
  };

  const hasSnapshot = publishedDef !== null;
  const currentVersion = currentDef.version;
  const publishedVersion = currentDef.publishedVersion;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Changes since publish"
      maxWidth={820}
      footer={
        <button
          onClick={onClose}
          className="px-4 py-[7px] text-[13px] font-semibold bg-primary text-white border-none rounded-[7px] cursor-pointer font-[inherit]"
        >
          Close
        </button>
      }
    >
      <div className="text-[13px] text-text-primary mb-3 flex items-center gap-2 flex-wrap">
        <strong>v{currentVersion}</strong>
        <span className="text-text-tertiary">vs</span>
        {typeof publishedVersion === 'number' ? (
          <strong>published v{publishedVersion}</strong>
        ) : (
          <strong className="text-text-secondary">never published</strong>
        )}
      </div>

      {currentDef.publishedVersion === undefined ? (
        <p className="m-0 text-[13px] text-text-secondary">
          This pipeline has never been published.
        </p>
      ) : !hasSnapshot ? (
        <p className="m-0 text-[13px] text-text-secondary">
          v{currentDef.version} · Published v{currentDef.publishedVersion} · No
          snapshot stored — diff will be available after the next publish
          (Phase&nbsp;2 once archived snapshots back-fill).
        </p>
      ) : (
        <>
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div className="text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5">
                Added ({diff.addedNodes.length})
              </div>
              {diff.addedNodes.length === 0 ? (
                <div className="text-xs text-text-tertiary">None</div>
              ) : (
                diff.addedNodes.map((row) => renderRow(row, 'added', handleJump))
              )}
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div className="text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5">
                Removed ({diff.removedNodes.length})
              </div>
              {diff.removedNodes.length === 0 ? (
                <div className="text-xs text-text-tertiary">None</div>
              ) : (
                diff.removedNodes.map((row) => renderRow(row, 'removed', undefined))
              )}
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div className="text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5">
                Modified ({diff.modifiedNodes.length})
              </div>
              {diff.modifiedNodes.length === 0 ? (
                <div className="text-xs text-text-tertiary">None</div>
              ) : (
                diff.modifiedNodes.map((row) => renderRow(row, 'modified', handleJump))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <div className="text-xs text-text-secondary mt-1">
              <strong>{diff.addedEdges}</strong> edge
              {diff.addedEdges === 1 ? '' : 's'} added ·{' '}
              <strong>{diff.removedEdges}</strong> edge
              {diff.removedEdges === 1 ? '' : 's'} removed
            </div>
            {diff.nameChanged ? (
              <div className="text-xs text-text-secondary mt-1">
                Name: <em>"{diff.previousName ?? ''}"</em> →{' '}
                <strong>"{currentDef.name}"</strong>
              </div>
            ) : null}
            {diff.iconChanged ? (
              <div className="text-xs text-text-secondary mt-1">
                Icon: {diff.previousIcon ?? '—'} → {currentDef.icon ?? '—'}
              </div>
            ) : null}
            {diff.tagsChanged ? (
              <div className="text-xs text-text-secondary mt-1">
                Tags changed: added [{diff.tagsAdded.join(', ') || '—'}], removed [
                {diff.tagsRemoved.join(', ') || '—'}]
              </div>
            ) : null}
          </div>
        </>
      )}
    </Modal>
  );
}

export default VersionDiffModal;
