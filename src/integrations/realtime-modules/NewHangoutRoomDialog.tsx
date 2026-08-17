// src/integrations/realtime-modules/NewHangoutRoomDialog.tsx
//
// NewHangoutRoomDialog — controlled "Create room" form rendered as a
// Modal. Drives the realtime-modules `createRoom(input)` call.
//
// Validation:
//   - name: 3..48 chars (trimmed), required
//   - description: optional, free text (no length cap enforced here)
//
// The caller passes `onCreate(input)` returning a Promise<RMRoom>. On
// success → `onCreated(room)` fires, then `onClose()`. The caller
// decides whether to auto-join the new room.
//
// Why a Modal (not InlinePopover)? Inline popovers are appropriate for
// tiny menus; a form with multiple fields + toggles deserves a focused
// dialog. We still expose InlinePopover separately for other consumers.

import { useEffect, useMemo, useState } from 'react';
import Modal from '../../components/shared/Modal';
import { Button } from '../../components/ui/Button';
import Switch from '../../components/shared/Switch';
import type {
  RMCreateRoomInput,
  RMRoom,
  RMRoomVisibility,
} from './types';

export interface NewHangoutRoomDialogProps {
  open: boolean;
  onClose: () => void;
  /** Imperative create — typically `rooms.createRoom` from useHangoutRooms. */
  onCreate: (input: RMCreateRoomInput) => Promise<RMRoom>;
  /** Fires after a successful create; caller may auto-join the room. */
  onCreated?: (room: RMRoom) => void;
  /** Default visibility. Server defaults to 'org' if omitted. */
  defaultVisibility?: RMRoomVisibility;
}

const NAME_MIN = 3;
const NAME_MAX = 48;

/** Strip non-alphanumeric, lowercase, hyphenate. Mirrors typical
 *  server-side slug generation closely enough for a preview UI. */
export function slugifyRoomName(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

function validateName(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length === 0) return 'Name is required.';
  if (trimmed.length < NAME_MIN)
    return `Name must be at least ${NAME_MIN} characters.`;
  if (trimmed.length > NAME_MAX)
    return `Name must be at most ${NAME_MAX} characters.`;
  return null;
}

export function NewHangoutRoomDialog({
  open,
  onClose,
  onCreate,
  onCreated,
  defaultVisibility,
}: NewHangoutRoomDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [audioOnly, setAudioOnly] = useState(false);
  const [recordingEnabled, setRecordingEnabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Reset form whenever the dialog re-opens — never leak the previous
  // submission's state into a fresh attempt.
  useEffect(() => {
    if (!open) return;
    setName('');
    setDescription('');
    setAudioOnly(false);
    setRecordingEnabled(false);
    setSubmitting(false);
    setSubmitError(null);
  }, [open]);

  const nameError = useMemo(() => validateName(name), [name]);
  const slugPreview = useMemo(() => slugifyRoomName(name), [name]);
  const canSubmit = !nameError && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const room = await onCreate({
        name: name.trim(),
        description: description.trim() || undefined,
        visibility: defaultVisibility,
        settings: {
          audioOnly,
          recordingEnabled,
        },
      });
      onCreated?.(room);
      onClose();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to create room.');
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={submitting ? () => {} : onClose}
      title="New room"
      maxWidth={440}
      rawChildren
      backdropTestId="new-hangout-room-dialog"
      footer={null}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-[12px] font-semibold text-text-primary">Name</span>
          <input
            data-autofocus
            data-testid="new-hangout-room-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Team standup"
            maxLength={NAME_MAX + 10}
            disabled={submitting}
            className="w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info"
          />
          <div className="flex items-center justify-between text-[11px] text-text-tertiary">
            <span data-testid="new-hangout-room-slug-preview">
              {slugPreview ? `#${slugPreview}` : 'Slug preview appears here'}
            </span>
            <span>{`${name.trim().length}/${NAME_MAX}`}</span>
          </div>
          {nameError && name.length > 0 && (
            <span
              data-testid="new-hangout-room-name-error"
              className="text-[11px] text-danger-fg"
            >
              {nameError}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[12px] font-semibold text-text-primary">
            Description <span className="font-normal text-text-tertiary">(optional)</span>
          </span>
          <textarea
            data-testid="new-hangout-room-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this room for?"
            rows={2}
            disabled={submitting}
            className="w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info resize-none"
          />
        </label>

        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between gap-3">
            <span className="flex flex-col">
              <span className="text-[13px] font-semibold text-text-primary">Audio only</span>
              <span className="text-[11px] text-text-tertiary">Skip video tracks — voice-only room.</span>
            </span>
            <Switch
              checked={audioOnly}
              onChange={setAudioOnly}
              disabled={submitting}
              aria-label="Audio only"
              data-testid="new-hangout-room-audio-only"
            />
          </label>
          <label className="flex items-center justify-between gap-3">
            <span className="flex flex-col">
              <span className="text-[13px] font-semibold text-text-primary">Recording enabled</span>
              <span className="text-[11px] text-text-tertiary">Allow server-side recording of sessions.</span>
            </span>
            <Switch
              checked={recordingEnabled}
              onChange={setRecordingEnabled}
              disabled={submitting}
              aria-label="Recording enabled"
              data-testid="new-hangout-room-recording"
            />
          </label>
        </div>

        {submitError && (
          <div
            data-testid="new-hangout-room-error"
            role="alert"
            className="text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md px-3 py-2"
          >
            {submitError}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!canSubmit}
            data-testid="new-hangout-room-submit"
          >
            {submitting ? 'Creating…' : 'Create room'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default NewHangoutRoomDialog;
