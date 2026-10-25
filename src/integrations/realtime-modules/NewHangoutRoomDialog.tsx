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

import { useEffect, useId, useMemo, useState } from 'react';
import Modal from '../../components/shared/Modal';
import { Button } from '../../components/ui/Button';
import Switch from '../../components/shared/Switch';
import FormField from '../../components/shared/FormField';
import { Input } from '../../components/forms/Input';
import { Textarea } from '../../components/forms/Textarea';
import InlineAlert from '../../components/shared/InlineAlert';
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
  /** Name the parent resource in a host that calls these hangouts. */
  title?: string;
  submitLabel?: string;
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
  title = 'New room',
  submitLabel = 'Create room',
}: NewHangoutRoomDialogProps) {
  const formId = useId();
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
    <Modal open={open} onClose={submitting ? () => {} : onClose} title={title}
      maxWidth={440} backdropTestId="new-hangout-room-dialog" dialogKind="form"
      footer={<div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={onClose} disabled={submitting}>Cancel</Button>
        <Button type="submit" form={formId} variant="primary" size="sm" disabled={!canSubmit} data-testid="new-hangout-room-submit">
          {submitting ? 'Creating…' : submitLabel}
        </Button>
      </div>}>
      <form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField label="Name" required error={name.length > 0 ? nameError ?? undefined : undefined}
          hint={slugPreview ? `Room address: #${slugPreview}` : 'Choose a clear name people will recognize.'}
          hintTestId={name.length > 0 && nameError ? 'new-hangout-room-name-error' : 'new-hangout-room-slug-preview'}>
          {wiring => <Input {...wiring} data-autofocus data-testid="new-hangout-room-name" value={name}
            onChange={e => setName(e.target.value)} placeholder="Team standup" maxLength={NAME_MAX + 10} disabled={submitting} size="sm" />}
        </FormField>
        <FormField label="Description" hint="Optional. Explain what people will use this space for.">
          {wiring => <Textarea {...wiring} data-testid="new-hangout-room-description" value={description}
            onChange={e => setDescription(e.target.value)} placeholder="Purpose of this space" rows={2} disabled={submitting} />}
        </FormField>
        <FormField label="Start with audio only" layout="inline" hint="People join with their cameras off.">
          {wiring => <Switch aria-labelledby={wiring.labelId} checked={audioOnly} onChange={setAudioOnly}
            disabled={submitting} size="sm" data-testid="new-hangout-room-audio-only" />}
        </FormField>
        <FormField label="Record calls" layout="inline" hint="Record new calls in this hangout. People see a recording notice when they join.">
          {wiring => <Switch aria-labelledby={wiring.labelId} checked={recordingEnabled} onChange={setRecordingEnabled}
            disabled={submitting} size="sm" data-testid="new-hangout-room-recording" />}
        </FormField>
        {submitError && <InlineAlert tone="error" data-testid="new-hangout-room-error">{submitError}</InlineAlert>}
      </form>
    </Modal>
  );
}

export default NewHangoutRoomDialog;
