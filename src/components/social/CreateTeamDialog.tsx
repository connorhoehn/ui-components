// CreateTeamDialog — Teams' "Create a team" modal: a name, an optional
// description, and org-wide-vs-private. Same shape as CreateChannelDialog
// one level up the hierarchy — `onCreate` may reject (a name already taken)
// and the reason shows in place without moving the footer.

import { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import FormField from '../shared/FormField';
import { ChoiceList, ChoiceRow } from '../shared/ChoiceList';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';
import { Button } from '../ui/Button';

export type TeamVisibility = 'org' | 'private';

export interface CreateTeamDialogInput {
  name: string;
  description?: string;
  visibility: TeamVisibility;
}

export interface CreateTeamDialogProps {
  open: boolean;
  busy?: boolean;
  /** Reject with a reason (e.g. a name already taken) and it shows inline. */
  onCreate: (input: CreateTeamDialogInput) => Promise<void> | void;
  onClose: () => void;
  'data-testid'?: string;
}

const NAME_MAX = 80;

export function CreateTeamDialog({
  open,
  busy = false,
  onCreate,
  onClose,
  'data-testid': testId = 'create-team-dialog',
}: CreateTeamDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<TeamVisibility>('org');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setName('');
    setDescription('');
    setVisibility('org');
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
        visibility,
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
      title="Create a team"
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
        <FormField label="Team name" required data-testid={`${testId}-name-field`}>
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

        <FormField label="Description" hint="Let people know what this team is for.">
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

        <div className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Visibility</div>
        <ChoiceList data-testid={`${testId}-visibility`}>
          <ChoiceRow
            title="Anyone in the org can join"
            selected={visibility === 'org'}
            onSelect={() => setVisibility('org')}
            disabled={inert}
            data-testid={`${testId}-visibility-org`}
          />
          <ChoiceRow
            title="Private — people need an invitation"
            selected={visibility === 'private'}
            onSelect={() => setVisibility('private')}
            disabled={inert}
            data-testid={`${testId}-visibility-private`}
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

export default CreateTeamDialog;
