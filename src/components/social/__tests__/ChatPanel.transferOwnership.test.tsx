// Ownership of an in-flight transfer is an ID question, not a name question.
//
// The panel used to answer it with `transfer.actor === currentActor` — two
// display names. These tests pin the two ways that lied: two different people
// sharing a display name, and one person renaming mid-transfer.

import { render, screen } from '@testing-library/react';
import { ChatPanel } from '../ChatPanel';
import { isOwnTransfer, type ChatTransfer } from '../ChatAttachment';

function transfer(overrides: Partial<ChatTransfer> = {}): ChatTransfer {
  return {
    transferId: 't1',
    actor: 'Alex',
    uploader: 'user-alex-one',
    name: 'holiday.png',
    size: 1000,
    transferred: 400,
    phase: 'transferring',
    ...overrides,
  };
}

describe('isOwnTransfer', () => {
  it('answers from the uploader id, not the display name', () => {
    const t = transfer({ actor: 'Alex', uploader: 'user-alex-one' });
    expect(isOwnTransfer(t, 'user-alex-one')).toBe(true);
    // Same display name, different human.
    expect(isOwnTransfer(t, 'user-alex-two', 'Alex')).toBe(false);
  });

  it('ignores a display-name match when an uploader id is present', () => {
    const t = transfer({ actor: 'Alex', uploader: 'user-alex-one' });
    // A viewer who is only identified by name gets no cancel button rather
    // than one handed out on a guess.
    expect(isOwnTransfer(t, undefined, 'Alex')).toBe(false);
  });

  it('falls back to the display name only when the transfer carries no id', () => {
    const t = transfer({ actor: 'Alex', uploader: undefined });
    expect(isOwnTransfer(t, 'user-alex-one', 'Alex')).toBe(true);
    expect(isOwnTransfer(t, 'user-alex-one', 'Blake')).toBe(false);
    expect(isOwnTransfer(t, undefined, undefined)).toBe(false);
  });
});

describe('ChatPanel in-flight transfers', () => {
  it('offers cancel to the uploader', () => {
    render(
      <ChatPanel
        messages={[]}
        onSend={() => {}}
        transfers={[transfer()]}
        currentUserId="user-alex-one"
        onCancelTransfer={() => {}}
        onSendFiles={() => {}}
      />,
    );
    expect(screen.getByTestId('transfer-bubble-cancel')).toBeInTheDocument();
  });

  it('does NOT offer cancel to a different person with the SAME display name', () => {
    // The regression: two participants both called "Alex". Under the old
    // name comparison the second Alex got a cancel button on the first
    // Alex's upload.
    render(
      <ChatPanel
        messages={[]}
        onSend={() => {}}
        transfers={[transfer({ actor: 'Alex', uploader: 'user-alex-one' })]}
        currentUserId="user-alex-two"
        currentActor="Alex"
        onCancelTransfer={() => {}}
        onSendFiles={() => {}}
      />,
    );
    expect(screen.queryByTestId('transfer-bubble-cancel')).not.toBeInTheDocument();
    // The name is still what the recipient READS.
    expect(screen.getByText('Alex is sending…')).toBeInTheDocument();
  });

  it('keeps ownership across a rename mid-transfer', () => {
    const { rerender } = render(
      <ChatPanel
        messages={[]}
        onSend={() => {}}
        transfers={[transfer({ actor: 'Alex', uploader: 'user-alex-one' })]}
        currentUserId="user-alex-one"
        currentActor="Alex"
        onCancelTransfer={() => {}}
        onSendFiles={() => {}}
      />,
    );
    expect(screen.getByTestId('transfer-bubble-cancel')).toBeInTheDocument();

    // Sender renames themselves while the bytes are still moving. Their id
    // did not change, so the transfer is still theirs.
    rerender(
      <ChatPanel
        messages={[]}
        onSend={() => {}}
        transfers={[
          transfer({ actor: 'Alexandra', uploader: 'user-alex-one', transferred: 700 }),
        ]}
        currentUserId="user-alex-one"
        currentActor="Alex"
        onCancelTransfer={() => {}}
        onSendFiles={() => {}}
      />,
    );
    expect(screen.getByTestId('transfer-bubble-cancel')).toBeInTheDocument();
  });

  it('shows only ONE cancel button when two same-named people are both uploading', () => {
    render(
      <ChatPanel
        messages={[]}
        onSend={() => {}}
        transfers={[
          transfer({ transferId: 't1', actor: 'Alex', uploader: 'user-alex-one' }),
          transfer({ transferId: 't2', actor: 'Alex', uploader: 'user-alex-two' }),
        ]}
        currentUserId="user-alex-two"
        currentActor="Alex"
        onCancelTransfer={() => {}}
        onSendFiles={() => {}}
      />,
    );
    expect(screen.getAllByTestId('transfer-bubble')).toHaveLength(2);
    expect(screen.getAllByTestId('transfer-bubble-cancel')).toHaveLength(1);
  });
});
