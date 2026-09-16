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
