import { createRef } from 'react';
import { render, screen, fireEvent, cleanup, act, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AddToChatDialog } from '../AddToChatDialog';
import { MembershipNotice, describeMembership } from '../MembershipNotice';
import { MembersPanel } from '../MembersPanel';
import { MentionSuggestions, type MentionSuggestionsHandle } from '../MentionSuggestions';
import { ChatPanel, membershipRefFromMetadata } from '../ChatPanel';
import { ConversationSurface } from '../ConversationSurface';
import { WrappedConversationSurface, capabilityNamesFor } from '../../../integrations/realtime-modules/WrappedConversationSurface';

afterEach(cleanup);

const PEOPLE = [
  { id: 'carol', name: 'Carol Johnson', subtitle: 'Design' },
  { id: 'bob', name: 'Bob Martinez' },
  { id: 'dave', name: 'Dave Williams' },
];

describe('AddToChatDialog', () => {
  it('needs a person before it will add, and asks once about history', async () => {
    const onAdd = vi.fn().mockResolvedValue(undefined);
    const onClose = vi.fn();
    render(<AddToChatDialog open conversationName="#design" people={PEOPLE} onAdd={onAdd} onClose={onClose} />);
    const add = screen.getByTestId('add-to-chat-dialog-add') as HTMLButtonElement;
    expect(add.disabled).toBe(true);
    fireEvent.click(screen.getByTestId('add-to-chat-dialog-person-carol'));
    fireEvent.click(screen.getByTestId('add-to-chat-dialog-person-bob'));
    expect(screen.getByTestId('add-to-chat-dialog-picked').textContent).toContain('Carol Johnson');
    expect(add.disabled).toBe(false);
    fireEvent.click(add);
    await waitFor(() => expect(onAdd).toHaveBeenCalledWith(['carol', 'bob'], { mode: 'none' }));
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it('filters by the search, unpicks from the chip, and takes a day count', async () => {
    const onAdd = vi.fn().mockResolvedValue(undefined);
    render(<AddToChatDialog open conversationName="#design" people={PEOPLE} onAdd={onAdd} onClose={vi.fn()} />);
    fireEvent.change(screen.getByTestId('add-to-chat-dialog-search'), { target: { value: 'car' } });
    expect(screen.queryByTestId('add-to-chat-dialog-person-bob')).toBeNull();
    fireEvent.click(screen.getByTestId('add-to-chat-dialog-person-carol'));
    fireEvent.click(screen.getByTestId('add-to-chat-dialog-unpick-carol'));
    expect(screen.queryByTestId('add-to-chat-dialog-picked')).toBeNull();
    fireEvent.click(screen.getByTestId('add-to-chat-dialog-person-carol'));
    fireEvent.click(screen.getByTestId('add-to-chat-dialog-history-days-button'));
    const days = screen.getByTestId('add-to-chat-dialog-days') as HTMLInputElement;
    expect(days.value).toBe('7');
    fireEvent.change(days, { target: { value: '30' } });
    fireEvent.click(screen.getByTestId('add-to-chat-dialog-add'));
    await waitFor(() => expect(onAdd).toHaveBeenCalledWith(['carol'], { mode: 'days', days: 30 }));
  });

  it('shows the refusal and stays open', async () => {
    const onAdd = vi.fn().mockRejectedValue(new Error('only owners may add people'));
    const onClose = vi.fn();
    render(<AddToChatDialog open conversationName="#design" people={PEOPLE} onAdd={onAdd} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('add-to-chat-dialog-person-dave'));
    fireEvent.click(screen.getByTestId('add-to-chat-dialog-history-all-button'));
    fireEvent.click(screen.getByTestId('add-to-chat-dialog-add'));
    await waitFor(() => expect(screen.getByTestId('add-to-chat-dialog-error').textContent).toBe('only owners may add people'));
    expect(onClose).not.toHaveBeenCalled();
    expect(onAdd).toHaveBeenCalledWith(['dave'], { mode: 'all' });
  });
});

describe('MembershipNotice', () => {
  it('says who added whom and what they can read', () => {
    expect(describeMembership({ event: 'added', actorId: 'eve', actorName: 'Eve Thompson', userIds: ['carol'], names: ['Carol Johnson'], history: { mode: 'days', days: 7 } }))
      .toBe('Eve Thompson added Carol Johnson · history from the last 7 days');
    expect(describeMembership({ event: 'added', actorId: 'eve', actorName: 'Eve', userIds: ['a', 'b'], names: ['A', 'B'], history: { mode: 'all' } }))
      .toBe('Eve added A and B · all history');
    expect(describeMembership({ event: 'added', actorId: 'eve', actorName: 'Eve', userIds: ['a'], names: ['A'], history: { mode: 'none' } }))
      .toBe('Eve added A · no history');
    expect(describeMembership({ event: 'removed', actorId: 'eve', actorName: 'Eve', userIds: ['a'], names: ['A'] })).toBe('Eve removed A');
    expect(describeMembership({ event: 'added', actorId: 'eve', userIds: [] }, 'Eve added someone')).toBe('Eve added someone');
  });

  it('renders as a system line, and ChatPanel uses it for kind membership', () => {
    render(<MembershipNotice membership={{ event: 'removed', actorId: 'eve', actorName: 'Eve', userIds: ['a'], names: ['Al'] }} />);
    expect(screen.getByRole('status').textContent).toContain('Eve removed Al');
    cleanup();
    const msg = { id: 'm1', clientId: 'c', displayName: 'Eve', content: 'Eve added Carol', timestamp: new Date().toISOString(), metadata: { kind: 'membership', event: 'added', actorId: 'eve', actorName: 'Eve', userIds: ['carol'], names: ['Carol'], history: { mode: 'all' } } };
    render(<ChatPanel messages={[msg as never]} onSend={vi.fn()} />);
    expect(screen.getByTestId('membership-notice').textContent).toContain('Eve added Carol · all history');
    expect(screen.queryByTestId('chat-message')).toBeNull();
  });

  it('parses the wire shape and rejects the rest', () => {
    expect(membershipRefFromMetadata({ kind: 'call' })).toBeNull();
    expect(membershipRefFromMetadata({ kind: 'membership', event: 'joined' })).toBeNull();
    expect(membershipRefFromMetadata({ kind: 'membership', event: 'added', actorId: 'e', userIds: ['a', 3], history: { mode: 'days', days: 3 } }))
      .toEqual({ event: 'added', actorId: 'e', userIds: ['a'], history: { mode: 'days', days: 3 } });
  });
});

describe('MentionSuggestions with non-members', () => {
  const ITEMS = [
    { id: 'eve', label: 'Eve', member: true },
    { id: 'bob', label: 'Bob', member: false },
    { id: 'carol', label: 'Carol', member: true },
  ];
  it('lists members first, non-members under a heading, and offers to add instead of mentioning', () => {
    const command = vi.fn();
    const onPickNonMember = vi.fn();
    render(<MentionSuggestions items={ITEMS} command={command} onPickNonMember={onPickNonMember} />);
    const options = screen.getAllByRole('option');
    expect(options.map((o) => o.getAttribute('data-user-id'))).toEqual(['eve', 'carol', 'bob']);
    expect(screen.getByTestId('mention-non-members-heading').textContent).toBe('Not in this chat');
    expect(screen.getByTestId('mention-add-hint').textContent).toBe('Add to chat');
    fireEvent.mouseDown(screen.getByTestId('mention-option-non-member'));
    expect(command).not.toHaveBeenCalled();
    expect(onPickNonMember).toHaveBeenCalledWith('bob');
  });
  it('reaches the non-member by keyboard too', () => {
    const command = vi.fn();
    const onPickNonMember = vi.fn();
    const ref = createRef<MentionSuggestionsHandle>();
    render(<MentionSuggestions ref={ref} items={ITEMS} command={command} onPickNonMember={onPickNonMember} />);
    act(() => { ref.current!.onKeyDown({ event: new KeyboardEvent('keydown', { key: 'ArrowUp' }) }); });
    act(() => { ref.current!.onKeyDown({ event: new KeyboardEvent('keydown', { key: 'Enter' }) }); });
    expect(onPickNonMember).toHaveBeenCalledWith('bob');
    expect(command).not.toHaveBeenCalled();
  });
});

describe('MembersPanel', () => {
  const MEMBERS = [
    { id: 'eve', name: 'Eve Thompson', role: 'owner' as const },
    { id: 'carol', name: 'Carol Johnson', role: 'member' as const, addedAt: '2026-09-15T00:00:00Z' },
  ];
  it('lets an owner add and remove, marks the owner, and lets anyone leave', () => {
    const onAdd = vi.fn(); const onRemove = vi.fn();
    render(<MembersPanel members={MEMBERS} canManage currentUserId="eve" onAdd={onAdd} onRemove={onRemove} />);
    expect(screen.getByTestId('members-panel-count').textContent).toBe('2 members');
    expect(screen.getByTestId('members-panel-owner-eve')).toBeTruthy();
    fireEvent.click(screen.getByTestId('members-panel-add'));
    expect(onAdd).toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('members-panel-remove-carol'));
    expect(onRemove).toHaveBeenCalledWith('carol');
    cleanup();
    render(<MembersPanel members={MEMBERS} currentUserId="carol" onRemove={onRemove} />);
    expect(screen.queryByTestId('members-panel-remove-eve')).toBeNull();
    expect(screen.getByTestId('members-panel-remove-carol').getAttribute('aria-label')).toBe('Leave');
  });
  it('explains an open channel', () => {
    render(<MembersPanel members={[]} open onAdd={vi.fn()} />);
    expect(screen.getByTestId('members-panel-empty').textContent).toMatch(/Everyone can read this channel/);
  });
});

describe('ConversationSurface members view', () => {
  it('has a Members tab that shows the host panel, ungated by capabilities', () => {
    render(
      <ConversationSurface name="#design" features={['chat', 'members']} members={<div data-testid="host-members">people</div>} memberCount={3}>
        <div>thread</div>
      </ConversationSurface>,
    );
    fireEvent.click(screen.getByRole('tab', { name: /Members/ }));
    expect(within(screen.getByTestId('conversation-surface-members')).getByTestId('host-members')).toBeTruthy();
    cleanup();
    render(
      <WrappedConversationSurface name="#design" declare={['chat', 'members', 'files']} capabilities={{ 'conversation.files': false }} members={<div>people</div>}>
        <div>thread</div>
      </WrappedConversationSurface>,
    );
    expect(screen.getByRole('tab', { name: /Members/ })).toBeTruthy();
    expect(screen.queryByRole('tab', { name: /Files/ })).toBeNull();
    expect(capabilityNamesFor(['chat', 'members', 'files'])).toEqual(['conversation.files']);
  });
});

describe('membershipRefFromMetadata names map', () => {
  it('reads names keyed by user id, in userIds order', async () => {
    const { membershipRefFromMetadata } = await import('../ChatPanel');
    const ref = membershipRefFromMetadata({ kind: 'membership', event: 'added', actorId: 'eve', userIds: ['bob', 'carol'], names: { carol: 'Carol Johnson', bob: 'Bob Martinez' } });
    expect(ref?.names).toEqual(['Bob Martinez', 'Carol Johnson']);
  });
});

describe('AddToChatDialog without the history choice', () => {
  it('hides the history section and adds with all history', async () => {
    const { render, screen, fireEvent, waitFor } = await import('@testing-library/react');
    const { AddToChatDialog } = await import('../AddToChatDialog');
    const { vi } = await import('vitest');
    const onAdd = vi.fn().mockResolvedValue(undefined);
    render(<AddToChatDialog open conversationName="#design" people={[{ id: 'bob', name: 'Bob' }]} preselectedIds={['bob']} historyChoice={false} onAdd={onAdd} onClose={() => {}} />);
    expect(screen.queryByText('Chat history')).toBeNull();
    fireEvent.click(screen.getByTestId('add-to-chat-dialog-add'));
    await waitFor(() => expect(onAdd).toHaveBeenCalledWith(['bob'], { mode: 'all' }));
  });
});
