import Modal from './Modal';
import { cn } from '../../lib/cn';

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
  destructive: 'bg-[#ef4444] hover:bg-danger',
  caution: 'bg-warning hover:bg-warning',
  info: 'bg-[#3b82f6] hover:bg-info',
};

export default function ConfirmDialog({
  open, onConfirm, onCancel, title, body,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  confirmDisabled = false, tone = 'info', children,
}: ConfirmDialogProps) {
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
            className={cn(
              'px-4 py-[7px] text-[13px] font-[inherit]',
              'border border-border bg-white text-text-secondary',
              'rounded-md cursor-pointer hover:bg-surface-panel',
            )}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            data-testid="confirm-dialog-confirm"
            onClick={onConfirm}
            disabled={confirmDisabled}
            className={cn(
              'px-4 py-[7px] text-[13px] font-semibold font-[inherit]',
              'border-none text-white rounded-md transition-colors duration-150',
              CONFIRM_BG[tone],
              confirmDisabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer opacity-100',
            )}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      {body && <p className="m-0 mb-3 text-[13px] text-text-secondary">{body}</p>}
      {children}
    </Modal>
  );
}
