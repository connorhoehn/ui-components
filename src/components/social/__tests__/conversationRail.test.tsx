import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ConversationRail } from '../ConversationRail';
import type { ConversationItem } from '../ConversationList';

afterEach(cleanup);

const channel = (name: string): ConversationItem => ({
  channel: name, kind: 'channel', name, peers: [],
});
const dm = (userId: string, displayName: string): ConversationItem => ({
  channel: `chat:dm:${userId}`, kind: 'dm', peers: [{ userId, displayName }],
});

const CONVERSATIONS = [channel('general'), dm('dev-dave', 'Dave Williams')];
const SHELF = [{ id: 'mentions', label: 'Mentions', icon: '@', count: 3, urgent: true }];

function setup(props: Partial<React.ComponentProps<typeof ConversationRail>> = {}) {
  const onSelect = vi.fn();
  render(
    <ConversationRail
      shelf={SHELF}
      conversations={CONVERSATIONS}
      onSelect={onSelect}
      {...props}
    />,
  );
  return { onSelect };
}

describe('ConversationRail selection', () => {
  it('reports a shelf pick and a conversation pick through the same callback', () => {
    const { onSelect } = setup();

    fireEvent.click(screen.getByTestId('conversation-rail-shelf-mentions'));
    expect(onSelect).toHaveBeenCalledWith({ kind: 'shelf', id: 'mentions' });

    fireEvent.click(screen.getAllByTestId('conversation-row')[0]);
    expect(onSelect).toHaveBeenLastCalledWith({ kind: 'conversation', channel: 'general' });
  });

  // The whole reason this component exists: two highlighted rows and one pane
  // is the failure every hand-wired rail eventually ships.
  it('highlights nothing in the list while the shelf is selected', () => {
    setup({ selected: { kind: 'shelf', id: 'mentions' } });

    expect(screen.getByTestId('conversation-rail-shelf-mentions'))
      .toHaveAttribute('data-active', 'true');
    const list = screen.getByTestId('conversation-rail-list');
    expect(within(list).queryByRole('button', { current: true })).toBeNull();
  });

  it('highlights nothing on the shelf while a conversation is open', () => {
    setup({ selected: { kind: 'conversation', channel: 'general' } });

    expect(screen.getByTestId('conversation-rail-shelf-mentions'))
      .toHaveAttribute('data-active', 'false');
  });

  it('highlights neither when nothing is open', () => {
    setup({ selected: null });
    expect(screen.getByTestId('conversation-rail-shelf-mentions'))
      .toHaveAttribute('data-active', 'false');
    const list = screen.getByTestId('conversation-rail-list');
    expect(within(list).queryByRole('button', { current: true })).toBeNull();
  });
});

describe('ConversationRail composition', () => {
  // An empty strip above the list is chrome that explains nothing.
  it('renders no shelf when there are no fixed destinations', () => {
    setup({ shelf: [] });
    expect(screen.queryByTestId('conversation-rail-shelf')).toBeNull();
  });

  it('groups channels and people by default, unlike the bare list', () => {
    setup();
    expect(screen.getByText('Channels')).toBeInTheDocument();
    expect(screen.getByText('Direct messages')).toBeInTheDocument();
  });

  it('can be flattened for a host that wants one run of rows', () => {
    setup({ grouped: false });
    expect(screen.queryByText('Channels')).toBeNull();
  });

  it('places host chrome above the shelf and below the list', () => {
    setup({ header: <div>Acme workspace</div>, footer: <div>Signed in as Grace</div> });
    const rail = screen.getByTestId('conversation-rail');
    const order = Array.from(rail.children).map((el) => el.getAttribute('data-testid') ?? el.textContent);
    expect(order).toEqual([
      'Acme workspace',
      'conversation-rail-shelf',
      'conversation-rail-list',
      'Signed in as Grace',
    ]);
  });

  it('offers a new chat only when the host can start one', () => {
    setup();
    expect(screen.queryByTestId('conversation-new-chat')).toBeNull();

    cleanup();
    const onNewChat = vi.fn();
    setup({ onNewChat });
    fireEvent.click(screen.getByTestId('conversation-new-chat'));
    expect(onNewChat).toHaveBeenCalled();
  });
});

describe('ConversationRail collapse', () => {
  // Off by default: a caller that never heard of this feature gets the exact
  // rail it always got.
  it('renders no collapse button when collapsible is not set', () => {
    setup();
    expect(screen.queryByTestId('conversation-rail-collapse')).toBeNull();
  });

  it('toggles through onToggleCollapse rather than owning the state itself', () => {
    const onToggleCollapse = vi.fn();
    setup({ collapsible: true, collapsed: false, onToggleCollapse });

    const button = screen.getByTestId('conversation-rail-collapse');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAccessibleName('Collapse the sidebar');

    fireEvent.click(button);
    expect(onToggleCollapse).toHaveBeenCalledWith(true);

    // The rail does not remember — the button's own label and aria-expanded
    // only change once the host feeds `collapsed` back in.
    expect(screen.getByTestId('conversation-rail')).toHaveClass('w-80');
  });

  it('names the button for the expand direction once collapsed', () => {
    const onToggleCollapse = vi.fn();
    setup({ collapsible: true, collapsed: true, onToggleCollapse });

    const button = screen.getByTestId('conversation-rail-collapse');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAccessibleName('Expand the sidebar');

    fireEvent.click(button);
    expect(onToggleCollapse).toHaveBeenCalledWith(false);
  });

  it('shrinks to a narrow icon strip and hides the header, list and footer', () => {
    setup({
      collapsible: true,
      collapsed: true,
      header: <div>Acme workspace</div>,
      footer: <div>Signed in as Grace</div>,
    });

    expect(screen.getByTestId('conversation-rail')).toHaveClass('w-14');
    expect(screen.queryByText('Acme workspace')).toBeNull();
    expect(screen.queryByText('Signed in as Grace')).toBeNull();
    expect(screen.queryByTestId('conversation-rail-list')).toBeNull();
    expect(screen.queryByTestId('conversation-rail-shelf')).toBeNull();
  });

  it('still lets you pick a shelf destination from the collapsed strip, named for assistive tech', () => {
    const onSelect = vi.fn();
    setup({ collapsible: true, collapsed: true, onSelect });

    const mentionsIcon = screen.getByTestId('conversation-rail-collapsed-shelf-mentions');
    expect(mentionsIcon).toHaveAccessibleName('Mentions');

    fireEvent.click(mentionsIcon);
    expect(onSelect).toHaveBeenCalledWith({ kind: 'shelf', id: 'mentions' });
  });

  it('keeps the active shelf destination visibly selected while collapsed', () => {
    setup({ collapsible: true, collapsed: true, selected: { kind: 'shelf', id: 'mentions' } });
    expect(screen.getByTestId('conversation-rail-collapsed-shelf-mentions'))
      .toHaveAttribute('data-active', 'true');
  });

  it('is a no-op combination when collapsed is set without collapsible', () => {
    setup({ collapsed: true });
    expect(screen.getByTestId('conversation-rail')).toHaveClass('w-80');
    expect(screen.queryByTestId('conversation-rail-collapse')).toBeNull();
    expect(screen.getByTestId('conversation-rail-shelf')).toBeInTheDocument();
  });
});

describe('ConversationRail section collapse', () => {
  it('forwards the section collapse pair to the list, the way it does sectionActions', () => {
    const onToggleSection = vi.fn();
    setup({ collapsedSections: { Channels: true }, onToggleSection });

    // The folded section keeps its heading and loses its rows.
    expect(screen.getByRole('button', { name: 'Channels' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getAllByTestId('conversation-row').map((r) => r.getAttribute('data-channel')))
      .toEqual(['chat:dm:dev-dave']);

    fireEvent.click(screen.getByRole('button', { name: 'Direct messages' }));
    expect(onToggleSection).toHaveBeenCalledWith('Direct messages', true);
  });

  it('is unrelated to collapsing the whole rail to an icon strip', () => {
    // Two different `collapsed` ideas share the rail; only the opt-in one
    // shrinks the aside.
    setup({ collapsedSections: { Channels: true }, onToggleSection: vi.fn() });
    expect(screen.getByTestId('conversation-rail').className).toContain('w-80');
  });

  it('changes nothing for a caller that passes neither', () => {
    setup();
    expect(screen.queryByRole('button', { name: 'Channels' })).toBeNull();
    expect(screen.getAllByTestId('conversation-row')).toHaveLength(2);
  });
});
