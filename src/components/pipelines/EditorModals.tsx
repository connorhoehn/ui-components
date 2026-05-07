import Modal from '../shared/Modal';
import VersionDiffModal from './versions/VersionDiffModal';
import SimulatorPanel from './dev/SimulatorPanel';
import { cn } from '../../lib/cn';
import type { PipelineDefinition } from '../../types/pipeline';

export interface EditorModalsProps {
  publishConfirmOpen: boolean;
  onPublishClose: () => void;
  onPublishConfirm: () => void;
  hasErrors: boolean;
  validationErrorCount: number;
  definitionName: string;
  definitionVersion: number;

  deleteConfirmOpen: boolean;
  onDeleteClose: () => void;
  onDeleteConfirm: () => void;

  clearRunsConfirmOpen: boolean;
  onClearRunsClose: () => void;
  onClearRunsConfirm: () => void;

  versionDiffOpen: boolean;
  onVersionDiffClose: () => void;
  currentDef: PipelineDefinition;
  publishedDef: PipelineDefinition | null;
  onJumpToNode: (nodeId: string) => void;

  simPanelOpen: boolean;
  onSimPanelClose: () => void;
}

const cancelBtnClass = 'px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]';
const dangerBtnClass = 'px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]';

export default function EditorModals(props: EditorModalsProps) {
  const {
    publishConfirmOpen,
    onPublishClose,
    onPublishConfirm,
    hasErrors,
    validationErrorCount,
    definitionName,
    definitionVersion,
    deleteConfirmOpen,
    onDeleteClose,
    onDeleteConfirm,
    clearRunsConfirmOpen,
    onClearRunsClose,
    onClearRunsConfirm,
    versionDiffOpen,
    onVersionDiffClose,
    currentDef,
    publishedDef,
    onJumpToNode,
    simPanelOpen,
    onSimPanelClose,
  } = props;

  return (
    <>
      <Modal
        open={publishConfirmOpen}
        onClose={onPublishClose}
        title="Publish pipeline?"
        maxWidth={420}
        footer={
          <>
            <button onClick={onPublishClose} className={cancelBtnClass}>
              Cancel
            </button>
            <button
              onClick={onPublishConfirm}
              disabled={hasErrors}
              className={cn(
                'px-4 py-[7px] text-[13px] font-semibold text-white border-none rounded-[7px] font-[inherit]',
                hasErrors ? 'bg-[#cbd5e1] cursor-not-allowed' : 'bg-primary cursor-pointer',
              )}
            >
              Publish
            </button>
          </>
        }
      >
        <p className="m-0">
          Publishing will make <strong>&quot;{definitionName}&quot;</strong> available
          for runs and set the published version to
          <strong> v{definitionVersion + 1}</strong>.
          {hasErrors ? (
            <>
              <br />
              <br />
              <span className="text-[#dc2626]">
                Pipeline has {validationErrorCount} validation error
                {validationErrorCount === 1 ? '' : 's'}. Fix them before
                publishing.
              </span>
            </>
          ) : null}
        </p>
      </Modal>

      <Modal
        open={deleteConfirmOpen}
        onClose={onDeleteClose}
        title="Delete pipeline?"
        maxWidth={400}
        footer={
          <>
            <button onClick={onDeleteClose} className={cancelBtnClass}>
              Cancel
            </button>
            <button onClick={onDeleteConfirm} className={dangerBtnClass}>
              Delete
            </button>
          </>
        }
      >
        <p className="m-0">
          <strong>&quot;{definitionName}&quot;</strong> will be permanently removed. Run
          history for this pipeline will also be lost.
        </p>
      </Modal>

      <Modal
        open={clearRunsConfirmOpen}
        onClose={onClearRunsClose}
        title="Clear run history?"
        maxWidth={400}
        footer={
          <>
            <button onClick={onClearRunsClose} className={cancelBtnClass}>
              Cancel
            </button>
            <button onClick={onClearRunsConfirm} className={dangerBtnClass}>
              Clear history
            </button>
          </>
        }
      >
        <p className="m-0">
          All stored run history for <strong>&quot;{definitionName}&quot;</strong> will
          be permanently removed. This cannot be undone.
        </p>
      </Modal>

      <VersionDiffModal
        open={versionDiffOpen}
        onClose={onVersionDiffClose}
        currentDef={currentDef}
        publishedDef={publishedDef}
        onJumpToNode={onJumpToNode}
      />

      <SimulatorPanel
        open={simPanelOpen}
        onClose={onSimPanelClose}
      />
    </>
  );
}
