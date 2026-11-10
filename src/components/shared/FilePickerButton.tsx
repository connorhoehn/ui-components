// FilePickerButton — a button that opens the system file picker and hands the
// chosen files over. The hidden <input type="file"> lives here so no page has
// to hang one off a ref of its own. For a drop zone use FileUploadDrop.
// Since 2.389.6.

import { useRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { CONTROL_HEIGHT } from './controlMetrics';

export interface FilePickerButtonProps {
  onFiles: (files: File[]) => void;
  /** The input's `accept`, e.g. ".md,.txt". */
  accept?: string;
  multiple?: boolean;
  /** `secondary` is a 36px bordered button, `primary` the brand one. */
  variant?: 'secondary' | 'primary';
  /**
   * `md` (default) is 36px tall, `Button md`'s height; `sm` (since 2.456.1) is
   * `Button sm`'s 28px (`--ui-control-sm`; 32px before 2.516.1), so a header
   * title beside it centres on the same line as beside a small Button.
   */
  size?: 'sm' | 'md';
  icon?: ReactNode;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

export function FilePickerButton({
  onFiles,
  accept,
  multiple = false,
  variant = 'secondary',
  size = 'md',
  icon,
  disabled,
  children,
  className,
  'aria-label': ariaLabel,
  'data-testid': testId = 'file-picker-button',
}: FilePickerButtonProps) {
  const input = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <button
        data-ui-part=""
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        data-testid={testId}
        data-size={size === 'sm' ? 'sm' : undefined}
        // As `Button` does (2.508.0): a primary picker audits as primary.
        data-variant={variant}
        onClick={() => input.current?.click()}
        className={cn(
          'inline-flex cursor-pointer items-center gap-2 rounded-lg text-sm font-medium transition-colors duration-100',
          size === 'sm' ? `${CONTROL_HEIGHT.sm} px-3` : 'h-9 px-3.5',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50',
          variant === 'primary'
            ? 'border-none bg-primary text-on-primary hover:bg-primary-hover'
            : 'border border-border bg-surface text-text-primary hover:bg-surface-hover',
          className,
        )}
      >
        {icon}
        {children}
      </button>
      <input
        data-ui-part=""
        ref={input}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        data-testid={`${testId}-input`}
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          event.target.value = '';
          if (files.length) onFiles(files);
        }}
      />
    </>
  );
}

export default FilePickerButton;
