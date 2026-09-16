// CreateChannelDialog — Teams' "Create a channel" modal: a name, an
// optional description, and standard-vs-private. `onCreate` may reject
// (a duplicate name, a server refusal) and the reason shows in place,
// without moving the footer buttons underneath it.

import { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import FormField from '../shared/FormField';
import { ChoiceList, ChoiceRow } from '../shared/ChoiceList';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';
import { Button } from '../ui/Button';

export type ChannelPrivacy = 'standard' | 'private';

export interface CreateChannelDialogInput {
  name: string;
  description?: string;
  privacy: ChannelPrivacy;
}

export interface CreateChannelDialogProps {
  open: boolean;
  teamName: string;
  busy?: boolean;
  /** Reject with a reason (e.g. a duplicate name) and it shows inline. */
  onCreate: (input: CreateChannelDialogInput) => Promise<void> | void;
  onClose: () => void;
  'data-testid'?: string;
}

const NAME_MAX = 80;

export function CreateChannelDialog({
  open,
  teamName,
  busy = false,
  onCreate,
  onClose,
  'data-testid': testId = 'create-channel-dialog',
}: CreateChannelDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState<ChannelPrivacy>('standard');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Re-seed on every open: a dialog that remembers the last channel you typed
  // would offer to create it again in the next team you open this in.
  useEffect(() => {
    if (!open) return;
    setName('');
    setDescription('');
    setPrivacy('standard');
    setSaving(false);
    setError(null);
  }, [open]);

  const trimmedName = name.trim();
  const inert = busy || saving;
  const canCreate = trimmedName.length > 0 && trimmedName.length <= NAME_MAX && !inert;

  const create = async () => {
    if (!canCreate) return;
    setSaving(true);
    setError(null);
    try {
      await onCreate({
        name: trimmedName,
        description: description.trim() || undefined,
        privacy,
      });
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Create a channel in ${teamName}`}
      maxWidth={480}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={inert} data-testid={`${testId}-cancel`}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => void create()}
            disabled={!canCreate}
            data-testid={`${testId}-create`}
          >
            {saving ? 'Creating…' : 'Create'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3 text-sm" data-testid={testId}>
        <FormField label="Channel name" required data-testid={`${testId}-name-field`}>
          {(wiring) => (
            <Input
              {...wiring}
              data-autofocus
              value={name}
              maxLength={NAME_MAX}
              disabled={inert}
              onChange={(e) => setName(e.target.value)}
              data-testid={`${testId}-name`}
            />
          )}
        </FormField>

        <FormField label="Description" hint="Let people know what this channel is for.">
          {(wiring) => (
            <Textarea
              {...wiring}
              value={description}
              rows={2}
              disabled={inert}
              onChange={(e) => setDescription(e.target.value)}
              data-testid={`${testId}-description`}
            />
          )}
        </FormField>

        <div className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Privacy</div>
        <ChoiceList data-testid={`${testId}-privacy`}>
          <ChoiceRow
            title="Standard — everyone on the team has access"
            selected={privacy === 'standard'}
            onSelect={() => setPrivacy('standard')}
            disabled={inert}
            data-testid={`${testId}-privacy-standard`}
          />
          <ChoiceRow
            title="Private — only specific teammates"
            selected={privacy === 'private'}
            onSelect={() => setPrivacy('private')}
            disabled={inert}
            data-testid={`${testId}-privacy-private`}
          />
        </ChoiceList>

        {/* Reserved height: the error appears without moving the footer. */}
        <div className="min-h-[1.125rem]">
          {error && (
            <p className="m-0 text-xs text-danger-fg" role="alert" data-testid={`${testId}-error`}>
              {error}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default CreateChannelDialog;
