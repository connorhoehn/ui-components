import Modal from '../shared/Modal';
import VersionDiffModal from './versions/VersionDiffModal';
import SimulatorPanel from './dev/SimulatorPanel';
import { colors } from '../../constants/styles';
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
            <button
              onClick={onPublishClose}
              style={{
                padding: '6px 12px',
                fontSize: 13,
                background: 'none',
                border: 'none',
                color: colors.textSecondary,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Cancel
            </button>
            <button
              onClick={onPublishConfirm}
              disabled={hasErrors}
              style={{
                padding: '7px 16px',
                fontSize: 13,
                fontWeight: 600,
                background: hasErrors ? colors.textDisabled : colors.primary,
                color: '#fff',
                border: 'none',
                borderRadius: 7,
                cursor: hasErrors ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Publish
            </button>
          </>
        }
      >
        <p style={{ margin: 0 }}>
          Publishing will make <strong>"{definitionName}"</strong> available
          for runs and set the published version to
          <strong> v{definitionVersion + 1}</strong>.
          {hasErrors ? (
            <>
              <br />
              <br />
              <span style={{ color: '#dc2626' }}>
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
            <button
              onClick={onDeleteClose}
              style={{
                padding: '6px 12px',
                fontSize: 13,
                background: 'none',
                border: 'none',
                color: colors.textSecondary,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Cancel
            </button>
            <button
              onClick={onDeleteConfirm}
              style={{
                padding: '7px 16px',
                fontSize: 13,
                fontWeight: 600,
                background: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: 7,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Delete
            </button>
          </>
        }
      >
        <p style={{ margin: 0 }}>
          <strong>"{definitionName}"</strong> will be permanently removed. Run
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
            <button
              onClick={onClearRunsClose}
              style={{
                padding: '6px 12px',
                fontSize: 13,
                background: 'none',
                border: 'none',
                color: colors.textSecondary,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Cancel
            </button>
            <button
              onClick={onClearRunsConfirm}
              style={{
                padding: '7px 16px',
                fontSize: 13,
                fontWeight: 600,
                background: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: 7,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Clear history
            </button>
          </>
        }
      >
        <p style={{ margin: 0 }}>
          All stored run history for <strong>"{definitionName}"</strong> will
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
