// InlineMessageEditor — a message's text, editable where it sits.
//
// Teams edits in place: the bubble becomes a field with Save and Cancel,
// Enter saves, Shift+Enter breaks a line, Escape backs out. The host owns
// the send; a refusal shows under the field and the text stays put.

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Textarea } from '../forms/Textarea';
import { Button } from '../ui/Button';

export interface InlineMessageEditorProps {
  initialText: string;
  /** Resolves once the server has the new text; rejects with a reason to show. */
  onSave: (text: string) => Promise<void> | void;
  onCancel: () => void;
  'data-testid'?: string;
}

export function InlineMessageEditor({ initialText, onSave, onCancel, 'data-testid': testId = 'message-editor' }: InlineMessageEditorProps) {
  const [text, setText] = useState(initialText);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);

  const trimmed = text.trim();
  const canSave = trimmed.length > 0 && trimmed !== initialText.trim() && !busy;

  const save = async () => {
    if (!canSave) return;
    setBusy(true);
    setError(null);
    try {
      await onSave(trimmed);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') { e.preventDefault(); onCancel(); return; }
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void save(); }
  };

  return (
    <div className="flex flex-col gap-1.5" data-testid={testId}>
      <Textarea
        ref={ref}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={busy}
        minRows={1}
        maxRows={8}
        autoResize
        aria-label="Edit message"
        data-testid={`${testId}-input`}
      />
      <div className="flex items-center justify-end gap-1.5">
        <span className="mr-auto text-[11px] text-text-tertiary">Enter to save · Esc to cancel</span>
        <Button variant="ghost" size="sm" onClick={onCancel} disabled={busy} data-testid={`${testId}-cancel`}>Cancel</Button>
        <Button variant="primary" size="sm" onClick={() => void save()} disabled={!canSave} data-testid={`${testId}-save`}>
          {busy ? 'Saving…' : 'Save'}
        </Button>
      </div>
      {error && <p className="m-0 text-xs text-danger-fg" role="alert" data-testid={`${testId}-error`}>{error}</p>}
    </div>
  );
}

export default InlineMessageEditor;
