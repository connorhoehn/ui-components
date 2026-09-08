// doc-types/CookbooksModal.tsx
//
// The cookbook gallery in a dialog. Pick one and the modal persists it with
// createType(), then invokes onCreated(typeId) so the caller can open the
// wizard for customization.
//
// The gallery itself now lives in `cookbooks/CookbookPicker` — the same cards
// are the FIRST thing on the Document Types page, so they could not stay
// trapped inside a modal that only opens from a button next to the wizard.
// What is left here is the part that is genuinely about being a dialog: the
// shell, the save outcome, and the hand-off to the wizard.

import { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import { CookbookPicker } from './cookbooks/CookbookPicker';
import type { DocumentTypeCookbook } from './cookbooks';
import type { DocumentType } from '../../types/documentType';
import type { SaveOutcome } from '../../hooks/useDocumentTypes';

interface CookbooksModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (typeId: string) => void;
  /**
   * Persists the picked cookbook. Async and fallible: `rejected` means the
   * server refused the payload and NOTHING was saved, so the modal must not
   * report success. `offline` did save locally, so it counts as created.
   */
  createType: (
    data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Promise<SaveOutcome>;
}

export default function CookbooksModal({
  open, onClose, onCreated, createType,
}: CookbooksModalProps) {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setSaveError(null);
  }, [open]);

  const handlePick = async (cookbook: DocumentTypeCookbook) => {
    if (saving) return; // a second click while in flight would create a duplicate
    setSaving(true);
    setSaveError(null);
    try {
      const outcome = await createType(cookbook.build());
      if (outcome.status === 'rejected') {
        // Nothing was saved. Staying open with the reason beats closing and
        // announcing a type that does not exist.
        setSaveError(outcome.error);
        return;
      }
      // 'offline' persisted to the local cache, so the type really does exist
      // for this user and the caller should proceed to the wizard.
      onClose();
      onCreated(outcome.type.id);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Document type cookbooks"
      maxWidth={800}
      backdropTestId="cookbooks-modal"
      rawChildren
    >
      <div className="text-[13px] text-text-secondary mb-3">
        Install a prebuilt document type. You can customize the fields after installing.
      </div>

      {saveError && (
        <div
          data-testid="cookbooks-save-error"
          role="alert"
          className="mb-3 rounded border border-danger-border bg-danger-bg px-3 py-2 text-[13px] text-danger-fg"
        >
          Couldn’t create that type: {saveError}
        </div>
      )}

      <CookbookPicker
        onPick={handlePick}
        busy={saving}
        autoFocusSearch
      />
    </Modal>
  );
}
