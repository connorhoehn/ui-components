import { useState } from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RailSectionHeader } from '../RailSectionHeader';
import { ConversationList, type ConversationItem } from '../ConversationList';

afterEach(cleanup);

const ITEMS: ConversationItem[] = [
  { channel: 'general', kind: 'channel', name: 'general', peers: [] },
  { channel: 'chat:dm:a:b', kind: 'dm', peers: [{ userId: 'b', displayName: 'Bob' }] },
];

describe('RailSectionHeader', () => {
  it('names its action for a reader rather than leaving a bare +', () => {
    render(<RailSectionHeader label="Channels" actions={[{ label: 'Create a channel', onClick: vi.fn(), 'data-testid': 'create' }]} />);
    expect(screen.getByTestId('create').getAttribute('aria-label')).toBe('Create a channel');
    expect(screen.getByTestId('create').getAttribute('title')).toBe('Create a channel');
  });

  it('hands the button itself back, so a popover can anchor to it', () => {
    const onClick = vi.fn();
    render(<RailSectionHeader label="Teams" actions={[{ label: 'Create a team', onClick, 'data-testid': 'create' }]} />);
    const button = screen.getByTestId('create');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledWith(button);
  });

  it('is presentational by default, because the list it heads carries the same name', () => {
    render(<RailSectionHeader label="Channels" />);
    expect(screen.getByText('Channels').getAttribute('aria-hidden')).toBe('true');
  });

  it('stays a plain heading for a caller that passes no collapse props', () => {
    render(<RailSectionHeader label="Channels" />);
    expect(screen.queryByRole('button', { name: 'Channels' })).toBeNull();
    expect(screen.queryByTestId('rail-section-header-toggle')).toBeNull();
  });
});

describe('RailSectionHeader as a disclosure', () => {
  it('makes the whole label the control, named and with its state on it', () => {
    const onToggleCollapse = vi.fn();
    render(
      <RailSectionHeader label="Channels" collapsed={false} onToggleCollapse={onToggleCollapse} controls="region-1" />,
    );
    // The label is the hit target, not a 12px chevron beside it — and a
    // control cannot be aria-hidden, so `presentational` no longer applies.
    const toggle = screen.getByRole('button', { name: 'Channels' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAttribute('aria-controls', 'region-1');
    fireEvent.click(toggle);
    expect(onToggleCollapse).toHaveBeenCalledWith(true);
  });

  it('reports the state to switch TO, in both directions', () => {
    const onToggleCollapse = vi.fn();
    render(<RailSectionHeader label="Channels" collapsed onToggleCollapse={onToggleCollapse} />);
    const toggle = screen.getByTestId('rail-section-header-toggle');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(onToggleCollapse).toHaveBeenCalledWith(false);
  });

  it('says what is waiting inside a folded section, and only while folded', () => {
    const { rerender } = render(
      <RailSectionHeader label="Channels" collapsed onToggleCollapse={vi.fn()} collapsedCount={7} />,
    );
    const badge = screen.getByTestId('rail-section-header-collapsed-count');
    expect(badge).toHaveTextContent('7');
    // Spelled out and inside the button, so the count is part of what the
    // control announces rather than a bare "7" only a sighted user gets.
    expect(badge).toHaveAttribute('aria-label', '7 unread');
    expect(screen.getByRole('button', { name: 'Channels 7 unread' })).toContainElement(badge);

    rerender(<RailSectionHeader label="Channels" collapsed={false} onToggleCollapse={vi.fn()} collapsedCount={7} />);
    expect(screen.queryByTestId('rail-section-header-collapsed-count')).toBeNull();
  });

  it('leaves the + alone: pressing it never folds an open section', () => {
    const onToggleCollapse = vi.fn();
    const onClick = vi.fn();
    render(
      <RailSectionHeader
        label="Channels"
        collapsed={false}
        onToggleCollapse={onToggleCollapse}
        actions={[{ label: 'Create a channel', onClick, 'data-testid': 'create' }]}
      />,
    );
    fireEvent.click(screen.getByTestId('create'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onToggleCollapse).not.toHaveBeenCalled();
  });

  it('reopens a folded section before creating into it, so the new row lands somewhere visible', () => {
    const onToggleCollapse = vi.fn();
    const onClick = vi.fn();
    render(
      <RailSectionHeader
        label="Channels"
        collapsed
        onToggleCollapse={onToggleCollapse}
        actions={[{ label: 'Create a channel', onClick, 'data-testid': 'create' }]}
      />,
    );
    fireEvent.click(screen.getByTestId('create'));
    expect(onToggleCollapse).toHaveBeenCalledWith(false);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('ConversationList section actions', () => {
  it('puts the + on the heading of the section it creates into', () => {
    const onChannel = vi.fn();
    render(
      <ConversationList
        items={ITEMS}
        grouped
        activeChannel={null}
        onSelect={vi.fn()}
        sectionActions={{ Channels: [{ label: 'Create a channel', onClick: onChannel, 'data-testid': 'new-channel' }] }}
      />,
    );
    fireEvent.click(screen.getByTestId('new-channel'));
    expect(onChannel).toHaveBeenCalledTimes(1);
    // Only the section that was given one.
    expect(screen.queryByTestId('new-dm')).toBeNull();
  });
});

describe('ConversationList collapsible sections', () => {
  const rowChannels = () =>
    screen.getAllByTestId('conversation-row').map((r) => r.getAttribute('data-channel'));
  const headings = () =>
    screen.getAllByTestId('conversation-section').map((h) => h.textContent);

  /** The host owns the state, the way a real rail does so it can persist it. */
  function Harness(props: Partial<React.ComponentProps<typeof ConversationList>> = {}) {
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
    return (
      <ConversationList
        items={ITEMS}
        grouped
        onSelect={vi.fn()}
        collapsedSections={collapsed}
        onToggleSection={(label, next) => setCollapsed((prev) => ({ ...prev, [label]: next }))}
        {...props}
      />
    );
  }

  it('hides a section’s rows and keeps its heading, leaving the other sections alone', () => {
    render(<Harness />);
    expect(rowChannels()).toEqual(['general', 'chat:dm:a:b']);

    fireEvent.click(screen.getByRole('button', { name: 'Channels' }));
    expect(rowChannels()).toEqual(['chat:dm:a:b']);
    // The way back is still on screen.
    expect(headings()).toEqual(['Channels', 'Direct messages']);
    expect(screen.getByRole('button', { name: 'Channels' })).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(screen.getByRole('button', { name: 'Channels' }));
    expect(rowChannels()).toEqual(['general', 'chat:dm:a:b']);
  });

  it('reports the section’s own name and the state to switch to', () => {
    const onToggleSection = vi.fn();
    render(
      <ConversationList
        items={ITEMS}
        grouped
        onSelect={vi.fn()}
        collapsedSections={{ Channels: true }}
        onToggleSection={onToggleSection}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Direct messages' }));
    expect(onToggleSection).toHaveBeenCalledWith('Direct messages', true);
    onToggleSection.mockClear();
    // Already folded, so this one asks to come back.
    fireEvent.click(screen.getByRole('button', { name: 'Channels' }));
    expect(onToggleSection).toHaveBeenCalledWith('Channels', false);
  });

  it('keeps the + off the toggle: creating is not folding', () => {
    const onToggleSection = vi.fn();
    const onCreate = vi.fn();
    render(
      <ConversationList
        items={ITEMS}
        grouped
        onSelect={vi.fn()}
        collapsedSections={{}}
        onToggleSection={onToggleSection}
        sectionActions={{ Channels: [{ label: 'Create a channel', onClick: onCreate, 'data-testid': 'new-channel' }] }}
      />,
    );
    fireEvent.click(screen.getByTestId('new-channel'));
    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(onToggleSection).not.toHaveBeenCalled();
  });

  it('takes hidden rows out of the roving tab order entirely', () => {
    // A collapsed section whose rows are still Arrow-reachable is a keyboard
    // trap: focus lands on something nobody can see.
    const { rerender } = render(
      <ConversationList items={ITEMS} grouped onSelect={vi.fn()} collapsedSections={{}} onToggleSection={vi.fn()} />,
    );
    const tabbable = () =>
      screen.getAllByTestId('conversation-row').filter((r) => r.getAttribute('tabindex') === '0');
    expect(tabbable().map((r) => r.getAttribute('data-channel'))).toEqual(['general']);

    rerender(
      <ConversationList
        items={ITEMS}
        grouped
        onSelect={vi.fn()}
        collapsedSections={{ Channels: true }}
        onToggleSection={vi.fn()}
      />,
    );
    // The cursor moved to the first row that is actually on screen, and
    // exactly one row is still in the tab order.
    expect(screen.queryByTestId('conversation-row')?.getAttribute('data-channel')).toBe('chat:dm:a:b');
    expect(tabbable()).toHaveLength(1);

    // And Arrow keys cannot walk back into the folded section.
    const row = screen.getByTestId('conversation-row');
    row.focus();
    fireEvent.keyDown(row, { key: 'Home' });
    expect(document.activeElement).toBe(row);
  });

  it('shows what is hidden, summed from the rows it folded away', () => {
    render(
      <ConversationList
        items={[
          { channel: 'general', kind: 'channel', name: 'general', peers: [], unreadCount: 4 },
          { channel: 'random', kind: 'channel', name: 'random', peers: [], unreadCount: 2 },
          ...ITEMS.slice(1),
        ]}
        grouped
        onSelect={vi.fn()}
        collapsedSections={{ Channels: true }}
        onToggleSection={vi.fn()}
      />,
    );
    expect(screen.getByTestId('conversation-section-collapsed-count')).toHaveTextContent('6');
  });

  it('does not let folding a section undo its "Show N more"', () => {
    const many: ConversationItem[] = Array.from({ length: 5 }, (_, i) => ({
      channel: `chat:dm:me:p${i}`,
      peers: [{ userId: `p${i}`, displayName: `Person ${i}` }],
      lastMessageAt: new Date(2026, 0, 1 + i).toISOString(),
    }));
    render(<Harness items={many} maxVisible={2} />);
    expect(screen.getAllByTestId('conversation-row')).toHaveLength(2);

    fireEvent.click(screen.getByTestId('conversation-show-more'));
    expect(screen.getAllByTestId('conversation-row')).toHaveLength(5);

    const toggle = screen.getByRole('button', { name: 'Direct messages' });
    fireEvent.click(toggle);
    expect(screen.queryByTestId('conversation-row')).toBeNull();
    // The cap's button goes with the rows rather than dangling under a folded
    // heading.
    expect(screen.queryByTestId('conversation-show-more')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Direct messages' }));
    // Back exactly as it was left — the two pieces of state are separate.
    expect(screen.getAllByTestId('conversation-row')).toHaveLength(5);
    expect(screen.getByTestId('conversation-show-more')).toHaveTextContent('Show less');
  });

  it('names each list once, through the heading that now controls it', () => {
    render(<Harness />);
    // Previously the <ul> carried its own aria-label and the heading was
    // aria-hidden; the heading has to be announced now that it is a button,
    // so the list points at it instead of repeating the word.
    expect(screen.getByRole('list', { name: 'Channels' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Direct messages' })).toBeInTheDocument();
  });

  it('changes nothing for a caller that passes no collapse props', () => {
    render(<ConversationList items={ITEMS} grouped onSelect={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Channels' })).toBeNull();
    expect(screen.getByText('Channels')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('list', { name: 'Channels' })).toBeInTheDocument();
    expect(rowChannels()).toEqual(['general', 'chat:dm:a:b']);
  });
});
