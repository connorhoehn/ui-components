// FileUploadDrop — drag-and-drop file upload zone.
//
// Validates file type and size before handing off to onFiles.
// Uses Banner for inline error display.

import { useCallback, useRef, useState, type DragEvent, type ChangeEvent, type InputHTMLAttributes } from 'react';
import Banner from './Banner';
import { cn } from '../../lib/cn';

export interface FileUploadDropProps {
  /** Comma-separated MIME types or extensions, e.g. "image/*,.pdf" */
  accept?: string;
  /** Max individual file size in bytes */
  maxSize?: number;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
  /** Custom drop-zone label */
  label?: string;
  className?: string;
  'data-testid'?: string;
  /**
   * `data-testid` on the hidden `<input type="file">`.
   *
   * The zone's own testid lands on the wrapper, and the input is
   * `aria-hidden` with `tabIndex={-1}`, so a test had no way to reach the
   * element it must fire a `change` at — there is no cross-browser way to
   * drive a real file picker. That is a real adoption blocker, not a
   * nicety: a host whose spec selects the input by testid could not move
   * off its hand-rolled drop zone at all.
   */
  inputTestId?: string;
  /**
   * Extra attributes for the hidden input — `name`, `capture`, `form`, a
   * `webkitdirectory`. `type`, `accept`, `multiple`, `disabled`, `ref` and
   * `onChange` are owned here and cannot be overridden: they are the
   * component's contract, not decoration.
   */
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'accept' | 'multiple' | 'disabled' | 'onChange' | 'ref' | 'className'
  >;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function matchesAccept(file: File, accept: string): boolean {
  const patterns = accept.split(',').map(p => p.trim().toLowerCase());
  return patterns.some(pat => {
    if (pat.startsWith('.')) {
      return file.name.toLowerCase().endsWith(pat);
    }
    if (pat.endsWith('/*')) {
      return file.type.startsWith(pat.slice(0, -1));
    }
    return file.type === pat;
  });
}

export function FileUploadDrop({
  accept,
  maxSize,
  multiple = false,
  onFiles,
  onError,
  disabled = false,
  label,
  className,
  'data-testid': testId,
  inputTestId,
  inputProps,
}: FileUploadDropProps) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = useCallback((files: FileList | File[]): File[] | null => {
    const arr = Array.from(files);
    if (!multiple && arr.length > 1) {
      const msg = 'Only one file is allowed.';
      setError(msg);
      onError?.(msg);
      return null;
    }
    for (const file of arr) {
      if (accept && !matchesAccept(file, accept)) {
        const msg = `"${file.name}" has an unsupported file type.`;
        setError(msg);
        onError?.(msg);
        return null;
      }
      if (maxSize && file.size > maxSize) {
        const msg = `"${file.name}" exceeds the ${formatBytes(maxSize)} size limit.`;
        setError(msg);
        onError?.(msg);
        return null;
      }
    }
    setError(null);
    return arr;
  }, [accept, maxSize, multiple, onError]);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const files = validate(e.dataTransfer.files);
    if (files) onFiles(files);
  }, [disabled, validate, onFiles]);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setDragOver(true);
  }, [disabled]);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = validate(e.target.files);
    if (files) onFiles(files);
    // Reset so same file can be re-uploaded
    e.target.value = '';
  }, [validate, onFiles]);

  const sizeHint = maxSize ? `Up to ${formatBytes(maxSize)}` : undefined;
  const typeHint = accept ?? undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)} data-testid={testId}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label ?? 'File upload drop zone'}
        aria-disabled={disabled}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed',
          'px-6 py-10 text-center transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
          dragOver
            ? 'border-[var(--color-primary)] bg-[rgba(59,130,246,0.06)]'
            : 'border-[var(--color-border)] bg-[var(--color-surface-hover)]',
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:border-[var(--color-primary)] hover:bg-[rgba(59,130,246,0.04)]',
        )}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          className="text-[var(--color-text-tertiary)]"
        >
          <path
            d="M10 20a6 6 0 1 1 7-5.917V22m0-7.917 3 3m-3-3-3 3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="1.5" opacity=".2" />
        </svg>

        <div>
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">
            {label ?? (dragOver ? 'Drop to upload' : 'Drag & drop or click to upload')}
          </p>
          {(typeHint || sizeHint) && (
            <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
              {[typeHint, sizeHint].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
      </div>

      {error && (
        <Banner variant="error" onDismiss={() => setError(null)}>
          {error}
        </Banner>
      )}

      <input
        aria-hidden="true"
        tabIndex={-1}
        {...inputProps}
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        data-testid={inputTestId}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

export default FileUploadDrop;
