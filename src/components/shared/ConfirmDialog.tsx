import Modal from './Modal';
import { colors } from '../../constants/styles';

export interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmDisabled?: boolean;
  /** Visual tone for the confirm button. Defaults to 'info' (primary blue). */
  tone?: 'destructive' | 'caution' | 'info';
  /** Preview slot — extra content rendered between body and footer. */
  children?: React.ReactNode;
}

const CONFIRM_BG: Record<NonNullable<ConfirmDialogProps['tone']>, string> = {
  destructive: '#dc2626',
  caution: '#d97706',
  info: colors.primary,
};

export default function ConfirmDialog({
  open, onConfirm, onCancel, title, body,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  confirmDisabled = false, tone = 'info', children,
}: ConfirmDialogProps) {
  const confirmBg = CONFIRM_BG[tone];

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      maxWidth={420}
      footer={
        <>
          <button
            type="button"
            data-testid="confirm-dialog-cancel"
            onClick={onCancel}
            style={{
              padding: '7px 16px', fontSize: 13,
              border: `1px solid ${colors.border}`,
              background: colors.surface, color: colors.textSecondary,
              borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            data-testid="confirm-dialog-confirm"
            onClick={onConfirm}
            disabled={confirmDisabled}
            style={{
              padding: '7px 16px', fontSize: 13, fontWeight: 600,
              border: 'none', background: confirmBg, color: '#fff',
              borderRadius: 6, fontFamily: 'inherit',
              cursor: confirmDisabled ? 'not-allowed' : 'pointer',
              opacity: confirmDisabled ? 0.7 : 1,
            }}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      {body && <p style={{ margin: '0 0 12px', fontSize: 13, color: colors.textSecondary }}>{body}</p>}
      {children}
    </Modal>
  );
}
