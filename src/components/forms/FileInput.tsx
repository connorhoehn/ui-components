// src/components/forms/FileInput.tsx
//
// The invisible file picker that sits behind a styled trigger (a paperclip
// button, a drop zone). A file input has no stylable surface — the browser owns
// its chrome entirely — so the affordance is always some other element and the
// input itself is plumbing. That plumbing was being copy-pasted:
// ChatPanel, RichChatComposer and FileUploadDrop each hand-rolled the same
// element, and each had to remember two things that are easy to forget:
//
//   1. `aria-hidden` + `tabIndex={-1}`. Without them a keyboard user tabs into
//      an invisible control and a screen reader announces a second, unlabelled
//      "choose file" next to the button that is the real affordance.
//   2. Clearing `value` after a pick. Without it, choosing the SAME file twice
//      fires `change` once and then silently does nothing — the classic
//      "re-uploading the file I just removed doesn't work" bug.
//
// So this primitive is not chrome-for-chrome's sake: it is where those two
// rules live once. Callers keep a ref and call `.click()` on their own trigger.

import { forwardRef, type ChangeEvent, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'defaultValue'> {
  /**
   * Called with the picked files. Always an array (never a FileList), and never
   * called with the raw event — the input resets itself immediately afterwards,
   * so an event held past this callback would already be stale.
   */
  onFiles: (files: File[]) => void;
  'data-testid'?: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
  { onFiles, className, 'data-testid': testId, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type="file"
      aria-hidden="true"
      tabIndex={-1}
      data-testid={testId}
      className={cn('hidden', className)}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const picked = Array.from(e.target.files ?? []);
        onFiles(picked);
        // Reset so picking the SAME file twice still fires change.
        e.target.value = '';
      }}
      {...rest}
    />
  );
});

export default FileInput;
