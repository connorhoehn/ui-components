// frontend/src/components/SharedTextEditor.tsx
//
// WYSIWYG rich text editor bound to useCRDT content and applyLocalEdit.

import { useRef, useEffect } from 'react';
import { cn } from '../../lib/cn';
import { Select } from '../forms/Select';

export interface SharedTextEditorProps {
  content: string;
  applyLocalEdit: (newText: string) => void;
  disabled?: boolean;
  hasConflict?: boolean;
  onDismissConflict?: () => void;
}

const TOOLBAR: { cmd: string; label: string; title: string }[] = [
  { cmd: 'bold',                label: 'B',   title: 'Bold' },
  { cmd: 'italic',              label: 'I',   title: 'Italic' },
  { cmd: 'underline',           label: 'U',   title: 'Underline' },
  { cmd: 'strikeThrough',       label: 'S',   title: 'Strikethrough' },
  { cmd: 'insertOrderedList',   label: '1.',  title: 'Ordered list' },
  { cmd: 'insertUnorderedList', label: '•',   title: 'Bullet list' },
  { cmd: 'justifyLeft',         label: '≡L',  title: 'Align left' },
  { cmd: 'justifyCenter',       label: '≡C',  title: 'Align center' },
  { cmd: 'justifyRight',        label: '≡R',  title: 'Align right' },
];

export function SharedTextEditor({ content, applyLocalEdit, disabled = false, hasConflict = false, onDismissConflict }: SharedTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const internalChange = useRef(false);

  // Sync remote CRDT changes into the editor without clobbering cursor position
  useEffect(() => {
    if (!editorRef.current || internalChange.current) return;
    if (editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const exec = (cmd: string) => {
    document.execCommand(cmd, false);
    editorRef.current?.focus();
    flush();
  };

  const flush = () => {
    if (!editorRef.current) return;
    internalChange.current = true;
    applyLocalEdit(editorRef.current.innerHTML);
    setTimeout(() => { internalChange.current = false; }, 0);
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex gap-1 flex-wrap mb-2 items-center">
        {TOOLBAR.map(({ cmd, label, title }) => (
          <button
            data-ui-part=""
            key={cmd}
            onMouseDown={(e) => { e.preventDefault(); exec(cmd); }}
            disabled={disabled}
            title={title}
            className="px-2 py-0.5 text-xs font-semibold border border-border-emphasis rounded bg-surface-panel text-text-primary cursor-pointer leading-normal"
          >
            {label}
          </button>
        ))}
        <div className="w-px self-stretch bg-surface-emphasis mx-1" />
        <Select
          size="sm"
          onChange={(e) => { document.execCommand('formatBlock', false, e.target.value); flush(); }}
          disabled={disabled}
          className="w-auto"
          aria-label="Block format"
          options={[
            { value: 'p', label: 'Paragraph' },
            { value: 'h1', label: 'H1' },
            { value: 'h2', label: 'H2' },
            { value: 'h3', label: 'H3' },
            { value: 'pre', label: 'Code' },
          ]}
        />
      </div>

      {/* CRDT-03: Merge conflict indicator */}
      {hasConflict && (
        <div className="flex items-center justify-between px-3 py-2 mb-2 bg-warning-bg border border-warning-border rounded text-[0.8rem] text-warning-fg">
          <span>Edits merged — your changes are preserved</span>
          {/* `hasConflict` is owned by the caller, so dismissing is only
              possible when the caller wired `onDismissConflict`. Rendered
              unguarded, the × was a live control that left the banner
              sitting there — the one thing a dismiss button must not do. */}
          {onDismissConflict && (
            <button
              data-ui-part=""
              onClick={onDismissConflict}
              aria-label="Dismiss conflict indicator"
              className="bg-transparent border-none cursor-pointer text-base text-warning-fg pl-3 leading-none"
            >
              x
            </button>
          )}
        </div>
      )}

      {/* Editor surface */}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        suppressContentEditableWarning
        onInput={flush}
        className={cn(
          'min-h-[180px] border border-border-emphasis rounded px-3 py-2 text-[0.9rem] font-[inherit] leading-relaxed outline-none overflow-y-auto text-text-primary',
          disabled ? 'bg-surface-panel' : 'bg-surface'
        )}
      />
      {disabled && (
        <p className="text-text-tertiary mt-1 mb-0 text-[0.8rem]">
          Disconnected — reconnect to edit
        </p>
      )}
    </div>
  );
}
