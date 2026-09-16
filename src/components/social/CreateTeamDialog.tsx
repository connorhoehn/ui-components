// CreateTeamDialog — "Create a team" as a popover at the + that asked for it.
// Same shape as CreateChannelDialog one level up the hierarchy: a name, a
// sentence, and who can join. `onCreate` may reject (a name already taken)
// and the reason shows in place without moving the footer.

import { useEffect, useState, type RefObject } from 'react';
import { PopoverForm, PopoverField } from '../shared/PopoverForm';
import SegmentedControl from '../shared/SegmentedControl';
import type { InlinePopoverPlacement } from '../shared/InlinePopover';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';
import { LockIcon } from '../ui/Icons';

export type TeamVisibility = 'org' | 'private';

export interface CreateTeamDialogInput {
  name: string;
  description?: string;
  visibility: TeamVisibility;
}

export interface CreateTeamDialogProps {
  open: boolean;
  busy?: boolean;
  /** The control that opened it. The popover hangs off this; without it, it centres. */
  anchor?: RefObject<HTMLElement | null> | null;
  placement?: InlinePopoverPlacement;
  /** Reject with a reason (e.g. a name already taken) and it shows inline. */
  onCreate: (input: CreateTeamDialogInput) => Promise<void> | void;
  onClose: () => void;
  'data-testid'?: string;
}

const NAME_MAX = 80;

const VISIBILITY_OPTIONS = [
  { label: 'Org-wide', value: 'org' },
  { label: 'Private', value: 'private', icon: <LockIcon size={12} /> },
];

export function CreateTeamDialog({
  open,
  busy = false,
  anchor,
  placement = 'bottom-end',
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
    <PopoverForm
      open={open}
      anchor={anchor}
      placement={placement}
      title="Create a team"
      subtitle="A team gets a General channel to start"
      submitLabel="Create"
      submitTestId={`${testId}-create`}
      submitDisabled={!canCreate}
      busy={inert}
      error={error}
      onSubmit={() => void create()}
      onClose={onClose}
      data-testid={testId}
    >
      <PopoverField label="Name" data-testid={`${testId}-name-field`}>
        <Input
          size="sm"
          value={name}
          maxLength={NAME_MAX}
          disabled={inert}
          placeholder="e.g. Design"
          onChange={(e) => setName(e.target.value)}
          data-testid={`${testId}-name`}
        />
      </PopoverField>

      <PopoverField label="Description" data-testid={`${testId}-description-field`}>
        <Textarea
          value={description}
          rows={2}
          disabled={inert}
          placeholder="What does this team work on?"
          onChange={(e) => setDescription(e.target.value)}
          data-testid={`${testId}-description`}
        />
      </PopoverField>

      <PopoverField
        label="Who can join"
        hint={visibility === 'private' ? 'People need an invitation.' : 'Anyone in the org can join.'}
        data-testid={`${testId}-visibility-field`}
      >
        <SegmentedControl
          size="sm"
          fullWidth
          disabled={inert}
          aria-label="Team visibility"
          options={VISIBILITY_OPTIONS}
          value={visibility}
          onChange={(v) => setVisibility(v as TeamVisibility)}
          data-testid={`${testId}-visibility`}
        />
      </PopoverField>
    </PopoverForm>
  );
}

export default CreateTeamDialog;
