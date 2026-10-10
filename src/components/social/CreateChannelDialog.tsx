// CreateChannelDialog — Teams' "Create a channel", as a popover at the button
// that asked for it rather than a slab in the middle of the screen.
//
// Creating a channel is a small act: a name, maybe a sentence, and who can
// see it. Teams and Slack keep it narrow, keep the team visible behind it,
// and anchor it to the ⋯ you just clicked. `onCreate` may reject (a duplicate
// name, a server refusal) and the reason shows in place, without moving the
// footer buttons out from under the cursor.

import { useEffect, useState, type RefObject } from 'react';
import { PopoverForm, PopoverField } from '../shared/PopoverForm';
import SegmentedControl from '../shared/SegmentedControl';
import type { InlinePopoverPlacement } from '../shared/InlinePopover';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';
import { LockIcon } from '../ui/Icons';
import { DensityProvider } from '../shared/Density';

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
  /** The control that opened it. The popover hangs off this; without it, it centres. */
  anchor?: RefObject<HTMLElement | null> | null;
  placement?: InlinePopoverPlacement;
  /** Reject with a reason (e.g. a duplicate name) and it shows inline. */
  onCreate: (input: CreateChannelDialogInput) => Promise<void> | void;
  onClose: () => void;
  'data-testid'?: string;
}

const NAME_MAX = 80;

const PRIVACY_OPTIONS = [
  { label: 'Standard', value: 'standard' },
  { label: 'Private', value: 'private', icon: <LockIcon size={12} /> },
];

export function CreateChannelDialog({
  open,
  teamName,
  busy = false,
  anchor,
  placement = 'right',
  onCreate,
  onClose,
  'data-testid': testId = 'create-channel-dialog',
}: CreateChannelDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState<ChannelPrivacy>('standard');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Re-seed on every open: a form that remembers the last channel you typed
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
    <PopoverForm
      open={open}
      anchor={anchor}
      placement={placement}
      icon={<span className="text-[13px] font-semibold leading-none">#</span>}
      title="Create a channel"
      subtitle={teamName}
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
          placeholder="e.g. design-reviews"
          onChange={(e) => setName(e.target.value)}
          data-testid={`${testId}-name`}
        />
      </PopoverField>

      <PopoverField label="Description" data-testid={`${testId}-description-field`}>
        <Textarea
          value={description}
          rows={2}
          disabled={inert}
          placeholder="What is this channel for?"
          onChange={(e) => setDescription(e.target.value)}
          data-testid={`${testId}-description`}
        />
      </PopoverField>

      <PopoverField
        label="Privacy"
        hint={privacy === 'private' ? 'Only people you add can see it.' : 'Everyone on the team can see it.'}
        data-testid={`${testId}-privacy-field`}
      >
        <DensityProvider density="compact"><SegmentedControl
          fullWidth
          disabled={inert}
          aria-label="Channel privacy"
          options={PRIVACY_OPTIONS}
          value={privacy}
          onChange={(v) => setPrivacy(v as ChannelPrivacy)}
          data-testid={`${testId}-privacy`}
        /></DensityProvider>
      </PopoverField>
    </PopoverForm>
  );
}

export default CreateChannelDialog;
