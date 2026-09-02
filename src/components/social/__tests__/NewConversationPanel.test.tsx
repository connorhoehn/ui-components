import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NewConversationPanel, toChannelName } from '../NewConversationPanel';

// One field. Type a name and you get people; type something matching nobody and
// you can make a channel of it. This replaces two always-visible forms that
// demanded you decide what KIND of thing you wanted before typing anything.

afterEach(cleanup);

const PEOPLE = [
  { userId: 'u1', displayName: 'Nora DaSilva' },
  { userId: 'u2', displayName: 'Sam Ruiz' },
];

function setup(props = {}) {
  const onStartDm = vi.fn();
  const onCreateChannel = vi.fn();
  render(
    <NewConversationPanel
      people={PEOPLE}
      onStartDm={onStartDm}
      onCreateChannel={onCreateChannel}
      {...props}
    />,
  );
  return { onStartDm, onCreateChannel, query: () => screen.getByTestId('new-conversation-query') };
}

describe('NewConversationPanel', () => {
  it('lists everyone before you type anything', () => {
    setup();
    expect(screen.getAllByTestId('new-conversation-person')).toHaveLength(2);
  });

  it('filters people as you type', () => {
    const { query } = setup();
    fireEvent.change(query(), { target: { value: 'nor' } });
    expect(screen.getAllByTestId('new-conversation-person')).toHaveLength(1);
    expect(screen.getByText('Nora DaSilva')).toBeInTheDocument();
  });

  it('starts a DM from a person row', () => {
    const { onStartDm } = setup();
    fireEvent.click(screen.getAllByTestId('new-conversation-person')[1]);
    expect(onStartDm).toHaveBeenCalledWith('u2');
  });

  // The rare case stays one keystroke away instead of behind a mode switch.
  it('offers a channel once the query names one', () => {
    const { query, onCreateChannel } = setup();
    fireEvent.change(query(), { target: { value: 'Release Planning' } });
    fireEvent.click(screen.getByTestId('new-conversation-create-channel'));
    expect(onCreateChannel).toHaveBeenCalledWith('release-planning');
  });

  // "Create a channel called nothing" is not an offer.
  it('offers no channel while the field is empty', () => {
    setup();
    expect(screen.queryByTestId('new-conversation-create-channel')).toBeNull();
  });

  it('takes the only matching person on Enter', () => {
    const { query, onStartDm } = setup();
    fireEvent.change(query(), { target: { value: 'sam' } });
    fireEvent.keyDown(query(), { key: 'Enter' });
    expect(onStartDm).toHaveBeenCalledWith('u2');
  });

  it('creates the channel on Enter when nobody matches', () => {
    const { query, onCreateChannel } = setup();
    fireEvent.change(query(), { target: { value: 'incident-room' } });
    fireEvent.keyDown(query(), { key: 'Enter' });
    expect(onCreateChannel).toHaveBeenCalledWith('incident-room');
  });

  // An empty directory and a failed fetch look identical otherwise, and
  // "nobody to talk to" is a far stronger claim than "we could not ask".
  it('says the fetch failed rather than claiming there is nobody', () => {
    render(
      <NewConversationPanel people={[]} onStartDm={vi.fn()} peopleError="503" />,
    );
    expect(screen.getByTestId('new-conversation-error')).toBeInTheDocument();
    expect(screen.queryByTestId('new-conversation-empty')).toBeNull();
  });

  it('hides channel creation entirely when the host cannot create one', () => {
    render(<NewConversationPanel people={PEOPLE} onStartDm={vi.fn()} />);
    fireEvent.change(screen.getByTestId('new-conversation-query'), {
      target: { value: 'anything' },
    });
    expect(screen.queryByTestId('new-conversation-create-channel')).toBeNull();
  });
});

describe('toChannelName', () => {
  it('reads like every other chat product', () => {
    expect(toChannelName('  Release Planning ')).toBe('release-planning');
    expect(toChannelName('Q3 / roadmap!!')).toBe('q3-roadmap');
    expect(toChannelName('---')).toBe('');
  });
});
