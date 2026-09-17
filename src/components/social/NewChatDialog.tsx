// NewChatDialog — "New chat", as a popover at the + that asked for it.
//
// It was a centred modal over a dimmed page while "Create a channel" beside it
// was already anchored and compact, so two adjacent acts in the same rail —
// start a conversation, make a channel — felt like they belonged to different
// applications. Starting a chat is the smaller of the two: pick some people,
// go. It has no business dimming the room.
//
// The people list is `InviteCandidateList`, the same one the call invite uses,
// through its render-prop seam: the rows go in the popover body and its own
// confirm goes in the shell's footer. That seam is why the count stays on the
// button ("Start chat with 2") — the selection lives in the list, and lifting
// it out just to label a button in the shell would be state in the wrong
// place.

import type { RefObject } from 'react';
import { PopoverForm } from '../shared/PopoverForm';
import type { InlinePopoverPlacement } from '../shared/InlinePopover';
import { InviteCandidateList, type InviteCandidate } from '../hangout/InviteCandidateList';

export interface NewChatDialogProps {
  open: boolean;
  /** Everyone who can be messaged. Already-selectable; presence drives grouping. */
  candidates: InviteCandidate[];
  /** The control that opened it. Without one the shell centres — the fallback, not the intent. */
  anchor?: RefObject<HTMLElement | null> | null;
  placement?: InlinePopoverPlacement;
  busy?: boolean;
  /** A refusal from the server, shown in place without moving the footer. */
  error?: string | null;
  onStart: (userIds: string[]) => void | Promise<void>;
  onClose: () => void;
  'data-testid'?: string;
}

export function NewChatDialog({
  open,
  candidates,
  anchor,
  placement = 'bottom-start',
  busy = false,
  error = null,
  onStart,
  onClose,
  'data-testid': testId = 'new-chat',
}: NewChatDialogProps) {
  if (!open) return null;

  return (
    <InviteCandidateList
      candidates={candidates}
      onInvite={(userIds) => { void onStart(userIds); }}
      loading={busy}
      // Choices from a previous open never leak into the next one.
      resetKey={open}
      searchable
      grouped
      confirmLabel="Start chat"
      // "Start chat 2 people" is not English. The list's default counted form
      // is written for "Invite"/"Call", which take a bare object; this verb
      // wants a preposition.
      confirmCountLabel={(n) => `Start chat with ${n}`}
      confirmLoadingLabel="Starting…"
      data-testid={`${testId}-people`}
    >
      {({ list, confirm }) => (
        <PopoverForm
          open={open}
          anchor={anchor}
          placement={placement}
          title="New chat"
          subtitle="Pick one person, or several for a group"
          busy={busy}
          error={error}
          // The list owns the decision and the button that states it; the shell
          // owns the chrome. Submitting the form is not a path here — the only
          // confirm is the list's, and Enter in the search box filters.
          submitSlot={confirm}
          onSubmit={() => {}}
          onClose={onClose}
          width="md"
          data-testid={testId}
        >
          {/* Capped and scrolled: a directory is as long as it is, and a
              popover that grows past the viewport has no anchor left to point
              at. The search above it is the real answer to a long list. */}
          <div className="-mx-1 max-h-[min(22rem,50vh)] overflow-y-auto px-1">
            {list}
          </div>
        </PopoverForm>
      )}
    </InviteCandidateList>
  );
}

export default NewChatDialog;
