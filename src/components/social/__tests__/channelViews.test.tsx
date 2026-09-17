import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PinnedMessagesPanel, ChannelFilesPanel, ChannelMentionsPanel, ChannelRecordingsPanel, ChannelDocumentsPanel, formatDuration } from '../ChannelViews';
import { ChannelHeader } from '../../shared/ChannelHeader';

afterEach(cleanup);

const pin = (over = {}) => ({
  messageId: 'm1',
  author: 'Hank Anderson',
  preview: 'the upload path is live on my branch',
  pinnedAt: '2026-09-05T08:00:00.000Z',
  pinnedBy: 'Bob Martinez',
  ...over,
});

const file = (over = {}) => ({
  messageId: 'm2',
  author: 'Hank Anderson',
  sentAt: '2026-09-05T08:00:00.000Z',
  attachment: {
    id: 'a1',
    name: 'attachment-shape.png',
    size: 180 * 1024,
    contentType: 'image/png',
    url: 'https://gw/files/a1',
  },
  ...over,
});

const mention = (over = {}) => ({
  messageId: 'm3',
  channel: 'chat:dm:dev-bob:dev-hank',
  channelLabel: 'Hank Anderson',
  author: 'Hank Anderson',
  excerpt: '@bob can you take a look',
  at: '2026-09-05T08:00:00.000Z',
  ...over,
});

describe('ChannelHeader tabs', () => {
  // The point of the slot: the channel's other views live on the channel's own
  // bar, not on a second row of navigation under it.
  it('renders the tabs inline with the name and the actions', () => {
    const { container } = render(
      <ChannelHeader name="Hank Anderson" tabs={<button type="button">Files</button>} actions={<button type="button">Call</button>} />,
    );
    expect(screen.getByText('Hank Anderson')).toBeInTheDocument();
    expect(screen.getByText('Files')).toBeInTheDocument();
    expect(screen.getByText('Call')).toBeInTheDocument();
    // One bar, not two: the header's own element is the only bordered row.
    expect(container.querySelectorAll('.border-b').length).toBe(1);
  });

  it('is unchanged when no tabs are given', () => {
    render(<ChannelHeader name="general" />);
    expect(screen.getByText('general')).toBeInTheDocument();
  });
});

describe('PinnedMessagesPanel', () => {
  it('says who wrote it AND who pinned it — different people, both load-bearing', () => {
    render(<PinnedMessagesPanel pins={[pin()]} />);
    const row = screen.getByTestId('pinned-message');
    expect(within(row).getByText(/upload path is live/)).toBeInTheDocument();
    expect(within(row).getByText(/Hank Anderson/)).toBeInTheDocument();
    expect(within(row).getByText(/pinned by Bob Martinez/)).toBeInTheDocument();
  });

  // The time used to sit third in the meta run, behind "pinned by …", where it
  // was the first thing a narrow panel truncated away. It is a column now.
  it('stamps when it was pinned on the title line, not in the meta run', () => {
    render(<PinnedMessagesPanel pins={[pin()]} />);
    const row = screen.getByTestId('pinned-message');
    expect(row.querySelector('time')).toHaveAttribute('datetime', '2026-09-05T08:00:00.000Z');
    // Still says who wrote it and who pinned it — and nothing else.
    expect(row.querySelector('[data-line="secondary"]')).toHaveTextContent(
      /^Hank Anderson · pinned by Bob Martinez$/,
    );
  });

  it('jumps back to the original', () => {
    const onJump = vi.fn();
    render(<PinnedMessagesPanel pins={[pin()]} onJump={onJump} />);
    fireEvent.click(screen.getByTestId('pinned-message-jump'));
    expect(onJump).toHaveBeenCalledWith('m1');
  });

  // A pinned message you cannot get back to is a screenshot.
  it('is not clickable when the original is out of reach', () => {
    render(<PinnedMessagesPanel pins={[pin()]} />);
    expect(screen.queryByTestId('pinned-message-jump')).toBeNull();
  });

  it('unpins', () => {
    const onUnpin = vi.fn();
    render(<PinnedMessagesPanel pins={[pin()]} onUnpin={onUnpin} />);
    fireEvent.click(screen.getByTestId('pinned-message-unpin'));
    expect(onUnpin).toHaveBeenCalledWith('m1');
  });

  // A greyed control is a promise the product will not keep.
  it('omits unpin for a viewer who may not unpin', () => {
    render(<PinnedMessagesPanel pins={[pin()]} />);
    expect(screen.queryByTestId('pinned-message-unpin')).toBeNull();
  });

  it('explains what pinning is for when there is nothing pinned', () => {
    render(<PinnedMessagesPanel pins={[]} />);
    expect(screen.getByText('Nothing pinned yet')).toBeInTheDocument();
  });
});

describe('ChannelFilesPanel', () => {
  it('shows a thumbnail for an image once a source resolves', () => {
    const { container } = render(
      <ChannelFilesPanel files={[file()]} thumbnailSrc={() => 'blob:resolved'} />,
    );
    expect(container.querySelector('img')?.getAttribute('src')).toBe('blob:resolved');
  });

  // The download route is authenticated, so the raw url in an <img> 401s.
  // With nothing resolved, the row must not point at it and render broken.
  it('does not fall back to the authenticated url for a thumbnail', () => {
    const { container } = render(<ChannelFilesPanel files={[file()]} />);
    expect(container.querySelector('img')).toBeNull();
  });

  it('uses the inline preview while the real bytes are still coming', () => {
    const { container } = render(
      <ChannelFilesPanel files={[file({ attachment: { ...file().attachment, preview: 'data:image/png;base64,AAA' } })]} />,
    );
    expect(container.querySelector('img')?.getAttribute('src')).toBe('data:image/png;base64,AAA');
  });

  it('gives a non-image a file row rather than a broken image', () => {
    const { container } = render(
      <ChannelFilesPanel
        files={[file({ attachment: { ...file().attachment, name: 'notes.pdf', contentType: 'application/pdf' } })]}
        thumbnailSrc={() => 'blob:resolved'}
      />,
    );
    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByText('notes.pdf')).toBeInTheDocument();
  });

  it('names the sender and the size, which is what makes the list scannable', () => {
    render(<ChannelFilesPanel files={[file()]} />);
    expect(screen.getByText(/Hank Anderson/)).toBeInTheDocument();
    expect(screen.getByText(/180/)).toBeInTheDocument();
  });

  it('stamps when the file arrived, leaving the meta run to who and how big', () => {
    render(<ChannelFilesPanel files={[file()]} />);
    const row = screen.getByTestId('channel-file');
    expect(row.querySelector('time')).toHaveAttribute('datetime', '2026-09-05T08:00:00.000Z');
    expect(row.querySelector('[data-line="secondary"]')).toHaveTextContent(/^Hank Anderson · 180/);
  });

  it('jumps to the message the file arrived on', () => {
    const onJump = vi.fn();
    render(<ChannelFilesPanel files={[file()]} onJump={onJump} />);
    fireEvent.click(screen.getByTestId('channel-file-jump'));
    expect(onJump).toHaveBeenCalledWith('m2');
  });

  it('says what to do when the channel has no files', () => {
    render(<ChannelFilesPanel files={[]} />);
    expect(screen.getByText('No files here yet')).toBeInTheDocument();
  });
});

describe('ChannelMentionsPanel', () => {
  it('names the channel, because a mention is read out of context', () => {
    render(<ChannelMentionsPanel mentions={[mention()]} />);
    expect(screen.getByText(/Hank Anderson · Hank Anderson/)).toBeInTheDocument();
  });

  it('falls back to the channel id when there is no label for it', () => {
    render(<ChannelMentionsPanel mentions={[mention({ channelLabel: undefined })]} />);
    expect(screen.getByText(/chat:dm:dev-bob:dev-hank/)).toBeInTheDocument();
  });

  // A mention can be in a channel you are not currently in, so the jump has
  // to carry both halves.
  it('jumps with the channel as well as the message', () => {
    const onJump = vi.fn();
    render(<ChannelMentionsPanel mentions={[mention()]} onJump={onJump} />);
    fireEvent.click(screen.getByTestId('mention-jump'));
    expect(onJump).toHaveBeenCalledWith('chat:dm:dev-bob:dev-hank', 'm3');
  });

  it('marks the ones that still need you, where the mark can be heard', () => {
    render(<ChannelMentionsPanel mentions={[mention({ unread: true })]} onJump={vi.fn()} />);
    expect(screen.getByTestId('mention')).toHaveAttribute('data-unread', 'true');
    const dot = screen.getByLabelText('Unread');
    expect(dot).toBeInTheDocument();
    // Outside the jump: a button's accessible name replaces its contents, so
    // the dot used to be labelled "Unread" for nobody.
    expect(screen.getByTestId('mention-jump')).not.toContainElement(dot);
  });

  it('stamps when you were named, rather than burying it after the channel', () => {
    render(<ChannelMentionsPanel mentions={[mention()]} />);
    const row = screen.getByTestId('mention');
    expect(row.querySelector('time')).toHaveAttribute('datetime', '2026-09-05T08:00:00.000Z');
    expect(row.querySelector('[data-line="secondary"]')).toHaveTextContent(
      /^Hank Anderson · Hank Anderson$/,
    );
  });

  it('is empty rather than blank when nobody has named you', () => {
    render(<ChannelMentionsPanel mentions={[]} />);
    expect(screen.getByText('No mentions')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------

const recording = (over = {}) => ({
  recordingId: 'rec-1',
  startedAt: '2026-09-05T08:00:00.000Z',
  durationMs: 12 * 60 * 1000 + 4000,
  participants: [
    { userId: 'dev-bob', displayName: 'Bob Martinez' },
    { userId: 'dev-hank', displayName: 'Hank Anderson' },
  ],
  ...over,
});

describe('formatDuration', () => {
  it('reads as a duration, not a millisecond count', () => {
    expect(formatDuration(724_000)).toBe('12:04');
  });

  it('grows an hours field only when there are hours', () => {
    expect(formatDuration(3_731_000)).toBe('1:02:11');
  });

  it('says nothing rather than 0:00 when the length is unknown', () => {
    expect(formatDuration(undefined)).toBe('');
  });
});

describe('ChannelRecordingsPanel', () => {
  it('names who was on the call', () => {
    render(<ChannelRecordingsPanel recordings={[recording()]} />);
    expect(screen.getByText('Bob Martinez, Hank Anderson')).toBeInTheDocument();
  });

  // "dev-e2e-bob-uo0cpk" is not a person.
  it('falls back to a count rather than to raw user ids', () => {
    render(
      <ChannelRecordingsPanel
        recordings={[recording({ participants: [{ userId: 'dev-e2e-bob-uo0cpk' }], participantCount: 2 })]}
      />,
    );
    expect(screen.getByText('2 people')).toBeInTheDocument();
    expect(screen.queryByText(/uo0cpk/)).toBeNull();
  });

  it('summarises a crowd instead of listing everyone', () => {
    render(
      <ChannelRecordingsPanel
        recordings={[recording({ participants: [1, 2, 3, 4].map((n) => ({ userId: `u${n}`, displayName: `P${n}` })) })]}
      />,
    );
    expect(screen.getByText('P1, P2 and 2 others')).toBeInTheDocument();
  });

  it('opens a playable recording', () => {
    const onOpen = vi.fn();
    render(<ChannelRecordingsPanel recordings={[recording()]} onOpen={onOpen} />);
    fireEvent.click(screen.getByTestId('channel-recording-jump'));
    expect(onOpen).toHaveBeenCalledWith('rec-1');
  });

  // A player showing nothing is worse than a row that says why.
  it('will not open one that is still being assembled', () => {
    render(<ChannelRecordingsPanel recordings={[recording({ playable: false })]} onOpen={vi.fn()} />);
    expect(screen.queryByTestId('channel-recording-jump')).toBeNull();
    expect(screen.getByText('Still being assembled')).toBeInTheDocument();
  });

  it('says calls land here when there are none', () => {
    render(<ChannelRecordingsPanel recordings={[]} />);
    expect(screen.getByText('No recorded calls')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------

const doc = (over = {}) => ({
  documentId: 'doc-1',
  title: 'Upload path RFC',
  icon: '📘',
  createdBy: 'Hank Anderson',
  updatedAt: '2026-09-05T08:00:00.000Z',
  ...over,
});

describe('ChannelDocumentsPanel', () => {
  it('opens a document', () => {
    const onOpen = vi.fn();
    render(<ChannelDocumentsPanel documents={[doc()]} onOpen={onOpen} />);
    fireEvent.click(screen.getByTestId('channel-document-jump'));
    expect(onOpen).toHaveBeenCalledWith('doc-1');
  });

  // Hiding create behind the empty state makes it vanish exactly when a
  // second document becomes likely.
  it('offers create whether or not the list is empty', () => {
    const { rerender } = render(<ChannelDocumentsPanel documents={[]} onCreate={vi.fn()} />);
    expect(screen.getByTestId('channel-documents-create')).toBeInTheDocument();
    rerender(<ChannelDocumentsPanel documents={[doc()]} onCreate={vi.fn()} />);
    expect(screen.getByTestId('channel-documents-create')).toBeInTheDocument();
  });

  it('omits create for a viewer who may not create here', () => {
    render(<ChannelDocumentsPanel documents={[doc()]} />);
    expect(screen.queryByTestId('channel-documents-create')).toBeNull();
  });

  // Somebody being in it right now is the reason to open it now.
  it('says when people are editing', () => {
    render(<ChannelDocumentsPanel documents={[doc({ activeEditors: 2 })]} />);
    expect(screen.getByText(/2 editing/)).toBeInTheDocument();
  });

  // Last edited is what people scan this list by, so it gets the column.
  it('stamps the last edit and keeps "who and who is in it" on line two', () => {
    render(<ChannelDocumentsPanel documents={[doc({ activeEditors: 2 })]} />);
    const row = screen.getByTestId('channel-document');
    expect(row.querySelector('time')).toHaveAttribute('datetime', '2026-09-05T08:00:00.000Z');
    expect(row.querySelector('[data-line="secondary"]')).toHaveTextContent(
      /^Hank Anderson · 2 editing$/,
    );
  });

  it('does not claim 0 editing when nobody is', () => {
    render(<ChannelDocumentsPanel documents={[doc({ activeEditors: 0 })]} />);
    expect(screen.queryByText(/editing/)).toBeNull();
  });

  it('shows Untitled rather than an empty row', () => {
    render(<ChannelDocumentsPanel documents={[doc({ title: '' })]} />);
    expect(screen.getByText('Untitled')).toBeInTheDocument();
  });

  it('says documents stay with the conversation when there are none', () => {
    render(<ChannelDocumentsPanel documents={[]} />);
    expect(screen.getByText('No documents yet')).toBeInTheDocument();
  });
});

describe('PinnedMessagesPanel — the stamp is the message\'s, not the pin\'s', () => {
  // Built from local components so the assertion means the same thing in every
  // timezone, and pinned an hour and a half after it was said — the shape that
  // exposed the bug.
  const sentAt = new Date(2026, 8, 16, 19, 27).toISOString();
  const pinnedAt = new Date(2026, 8, 16, 20, 53).toISOString();
  const pin = {
    messageId: 'm-1',
    author: 'Eve Thompson',
    preview: 'the decision we keep forgetting',
    sentAt,
    pinnedAt,
    pinnedBy: 'you',
  };

  it('shows when the message was sent, so it can be matched against the transcript', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 16, 21, 0, 0));
    try {
      render(<PinnedMessagesPanel pins={[pin]} />);
      const stamp = screen.getByTestId('pinned-message').querySelector('time')!;
      expect(stamp).toHaveAttribute('datetime', sentAt);
      expect(stamp.textContent).toContain('19:27');
      expect(stamp.textContent).not.toContain('20:53');
    } finally {
      vi.useRealTimers();
    }
  });

  it('keeps the pinning act reachable on the hover rather than throwing it away', () => {
    render(<PinnedMessagesPanel pins={[pin]} />);
    const title = screen.getByTestId('pinned-message').querySelector('time')!.getAttribute('title')!;
    expect(title).toMatch(/^Sent /);
    expect(title).toContain('pinned');
  });

  it('falls back to the pin time for a row written before the store kept one', () => {
    // Every pin that existed before `sentAt` is in this state. Losing the stamp
    // entirely would be worse than showing the only time there is.
    const { sentAt: _drop, ...legacy } = pin;
    render(<PinnedMessagesPanel pins={[legacy]} />);
    const stamp = screen.getByTestId('pinned-message').querySelector('time')!;
    expect(stamp).toHaveAttribute('datetime', pinnedAt);
    // One time known, so the hover states it plainly rather than claiming both.
    expect(stamp.getAttribute('title')).not.toMatch(/^Sent /);
  });
});
