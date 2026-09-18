import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ConversationSurface } from '../ConversationSurface';

afterEach(cleanup);

const file = {
  messageId: 'm1',
  author: 'Hank',
  attachment: { id: 'a1', name: 'shape.png', size: 1024, contentType: 'image/png', url: 'https://gw/a1' },
};
const doc = { documentId: 'd1', title: 'RFC' };
const pin = { messageId: 'm2', author: 'Hank', preview: 'the upload path' };
const mention = { messageId: 'm3', channel: 'c1', author: 'Hank', excerpt: '@bob look', unread: true };
const recording = { recordingId: 'r1', startedAt: '2026-09-05T08:00:00.000Z', durationMs: 60_000, composedUrl: 'x', playable: true };

const tabNames = () => screen.queryAllByRole('tab').map((t) => t.textContent);

describe('which views exist is data', () => {
  it('offers every view by default', () => {
    render(<ConversationSurface name="Hank" />);
    expect(tabNames()).toEqual(['Chat', 'Files', 'Documents', 'Pinned', 'Members', 'Mentions', 'Calls']);
  });

  // The chat-only embed. Not a greyed tab, not an upsell — absent.
  it('renders no tabs at all for a chat-only deployment', () => {
    render(<ConversationSurface name="Hank" features={['chat']}><p>transcript</p></ConversationSurface>);
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
    expect(screen.getByText('transcript')).toBeInTheDocument();
  });

  it('renders exactly the set it is handed, in that order', () => {
    render(<ConversationSurface name="Hank" features={['chat', 'documents']} />);
    expect(tabNames()).toEqual(['Chat', 'Documents']);
  });

  // A tab whose panel is switched off would render a blank pane.
  it('never opens a panel for a feature that is off', () => {
    render(<ConversationSurface name="Hank" features={['chat']} view="files" files={[file]} />);
    expect(screen.queryByTestId('channel-files-panel')).toBeNull();
  });

  it('falls back to the first available view when the open one is turned off', () => {
    const { rerender } = render(
      <ConversationSurface name="Hank" features={['chat', 'files']} view="files" files={[file]} />,
    );
    expect(screen.getByTestId('channel-files-panel')).toBeInTheDocument();
    rerender(<ConversationSurface name="Hank" features={['chat']} view="files" files={[file]} />);
    expect(screen.getByTestId('conversation-surface-chat')).not.toHaveAttribute('hidden');
  });
});

describe('counts on the tabs', () => {
  it('says how much is behind a tab', () => {
    render(<ConversationSurface name="Hank" files={[file]} documents={[doc]} pins={[pin]} recordings={[recording]} />);
    expect(screen.getByRole('tab', { name: /Files/ }).textContent).toContain('1');
  });

  // "Files 0" is noise; the tab already says there is a files view.
  it('shows no badge rather than a zero', () => {
    render(<ConversationSurface name="Hank" />);
    expect(screen.getByRole('tab', { name: /Files/ }).textContent).toBe('Files');
  });

  // Mentions you have already read are not waiting for you.
  it('counts only unread mentions', () => {
    render(<ConversationSurface name="Hank" mentions={[mention, { ...mention, messageId: 'm4', unread: false }]} />);
    expect(screen.getByRole('tab', { name: /Mentions/ }).textContent).toContain('1');
  });
});

describe('the transcript', () => {
  // Remounting a transcript re-joins its channel: history refetches and the
  // scroll position is lost every time somebody glances at the file list.
  it('stays mounted behind another view', () => {
    render(
      <ConversationSurface name="Hank" view="files" files={[file]}><p>transcript</p></ConversationSurface>,
    );
    expect(screen.getByText('transcript')).toBeInTheDocument();
    expect(screen.getByTestId('conversation-surface-chat')).toHaveAttribute('hidden');
  });
});

describe('calls', () => {
  it('offers audio and video when the deployment has calling', () => {
    const onStartCall = vi.fn();
    render(<ConversationSurface name="Hank" onStartCall={onStartCall} />);
    fireEvent.click(screen.getByTestId('conversation-surface-audio-call'));
    expect(onStartCall).toHaveBeenCalledWith(true);
    fireEvent.click(screen.getByTestId('conversation-surface-video-call'));
    expect(onStartCall).toHaveBeenCalledWith(false);
  });

  // This is how a chat-only deployment looks: no control at all.
  it('renders no call controls without a handler', () => {
    render(<ConversationSurface name="Hank" />);
    expect(screen.queryByTestId('conversation-surface-audio-call')).toBeNull();
  });

  it('says Join once a call is already running, and which kind', () => {
    render(<ConversationSurface name="Hank" onStartCall={vi.fn()} callInProgress />);
    // Two controls that do different things need two labels. Both used to
    // read "Join the call".
    expect(screen.getByLabelText('Join the call with audio')).toBeInTheDocument();
    expect(screen.getByLabelText('Join the call with video')).toBeInTheDocument();
  });

  it('offers ONE control when the mode is not the clicker\'s to choose', () => {
    const onStartCall = vi.fn();
    render(<ConversationSurface name="#room" onStartCall={onStartCall} callModeFixed />);
    expect(screen.queryByTestId('conversation-surface-audio-call')).toBeNull();
    expect(screen.queryByTestId('conversation-surface-video-call')).toBeNull();
    fireEvent.click(screen.getByTestId('conversation-surface-call'));
    expect(onStartCall).toHaveBeenCalledTimes(1);
  });
});

describe('getting back to the message', () => {
  it('switches to the transcript and jumps', () => {
    const onJumpToMessage = vi.fn();
    render(<ConversationSurface name="Hank" view="pins" pins={[pin]} onJumpToMessage={onJumpToMessage} onViewChange={vi.fn()} />);
    fireEvent.click(screen.getByTestId('pinned-message-jump'));
    expect(onJumpToMessage).toHaveBeenCalledWith('m2');
  });

  it('carries the channel as well as the message for a mention', () => {
    const onOpenMention = vi.fn();
    render(<ConversationSurface name="Hank" view="mentions" mentions={[mention]} onOpenMention={onOpenMention} onViewChange={vi.fn()} />);
    fireEvent.click(screen.getByTestId('mention-jump'));
    expect(onOpenMention).toHaveBeenCalledWith('c1', 'm3');
  });

  // Without a jump handler the rows are records, not dead buttons.
  it('leaves rows unclickable when there is nowhere to jump', () => {
    render(<ConversationSurface name="Hank" view="pins" pins={[pin]} />);
    expect(screen.queryByTestId('pinned-message-jump')).toBeNull();
  });
});

describe('view state', () => {
  it('keeps its own when uncontrolled', () => {
    render(<ConversationSurface name="Hank" documents={[doc]} />);
    fireEvent.click(screen.getByRole('tab', { name: /Documents/ }));
    expect(screen.getByTestId('channel-documents-panel')).toBeInTheDocument();
  });

  // A controlled surface that moved on its own would fight its owner.
  it('does not move itself when controlled', () => {
    const onViewChange = vi.fn();
    render(<ConversationSurface name="Hank" view="chat" onViewChange={onViewChange} documents={[doc]} />);
    fireEvent.click(screen.getByRole('tab', { name: /Documents/ }));
    expect(onViewChange).toHaveBeenCalledWith('documents');
    expect(screen.queryByTestId('channel-documents-panel')).toBeNull();
  });
});

// Watching vs joining is a capacity decision, not a preference. Joining is
// realtime and costs one peer connection per head; watching is near-realtime
// HLS that a CDN carries to any audience. A conversation many more people
// watch than speak in — an all-hands, a demo — needs the second one.
describe('ConversationSurface — watch', () => {
  it('offers Watch when the conversation can be watched', () => {
    const onWatch = vi.fn();
    render(<ConversationSurface name="#all-hands" onWatch={onWatch} />);
    fireEvent.click(screen.getByTestId('conversation-surface-watch'));
    expect(onWatch).toHaveBeenCalled();
  });

  // Absent, not disabled — the rule this surface already applies everywhere.
  it('offers nothing when the conversation cannot be watched', () => {
    render(<ConversationSurface name="#general" />);
    expect(screen.queryByTestId('conversation-surface-watch')).toBeNull();
  });

  it('offers Watch alongside calling, since they are different choices', () => {
    render(<ConversationSurface name="#all-hands" onStartCall={vi.fn()} onWatch={vi.fn()} />);
    expect(screen.getByTestId('conversation-surface-watch')).toBeInTheDocument();
    expect(screen.getByTestId('conversation-surface-audio-call')).toBeInTheDocument();
  });
});

// The control used to be a bare 👁 with its entire meaning in a `title`.
// A tooltip never appears on a touch device and plenty of screen readers do
// not announce it, so for those users the third button in the header row was
// an unexplained eye between a telephone and a camera.
describe('ConversationSurface — the watch control says what it is', () => {
  it('carries the word on the button, not only in a tooltip', () => {
    render(<ConversationSurface name="#all-hands" onWatch={vi.fn()} />);
    expect(screen.getByTestId('conversation-surface-watch')).toHaveTextContent('Watch');
  });

  // The emoji is decoration. A screen reader that read it would announce
  // "eye", which is not what the button does.
  it('is named by the word and not the glyph', () => {
    render(<ConversationSurface name="#all-hands" onWatch={vi.fn()} />);
    const btn = screen.getByRole('button', { name: /^Watch$/ });
    expect(btn).toBe(screen.getByTestId('conversation-surface-watch'));
  });

  it('lets the product call it something else', () => {
    render(<ConversationSurface name="#all-hands" onWatch={vi.fn()} watchLabel="Join as audience" />);
    expect(screen.getByTestId('conversation-surface-watch')).toHaveTextContent('Join as audience');
    expect(screen.getByRole('button', { name: 'Join as audience' })).toBeInTheDocument();
  });

  it('still reads sensibly when the host passes no label at all', () => {
    render(<ConversationSurface name="#all-hands" onWatch={vi.fn()} />);
    const btn = screen.getByTestId('conversation-surface-watch');
    expect(btn).toHaveAttribute('title');
    expect(btn.getAttribute('title')).toMatch(/without joining/i);
  });

  it('lets the host replace the explanation', () => {
    render(
      <ConversationSurface name="#all-hands" onWatch={vi.fn()} watchHint="Ships to the CDN." />,
    );
    expect(screen.getByTestId('conversation-surface-watch')).toHaveAttribute(
      'title',
      'Ships to the CDN.',
    );
  });

  // Same contract as StreamStage and GoLiveButton: null is "nobody measured",
  // a numeric 0 is a measured empty house. A channel that has never been
  // measured must not claim an audience of zero.
  it('says nothing about the audience when nobody measured it', () => {
    render(<ConversationSurface name="#all-hands" onWatch={vi.fn()} />);
    expect(screen.queryByTestId('conversation-surface-watch-count')).toBeNull();
  });

  it('says nothing about the audience for an explicit null', () => {
    render(<ConversationSurface name="#all-hands" onWatch={vi.fn()} watchViewerCount={null} />);
    expect(screen.queryByTestId('conversation-surface-watch-count')).toBeNull();
  });

  it('shows a measured zero', () => {
    render(<ConversationSurface name="#all-hands" onWatch={vi.fn()} watchViewerCount={0} />);
    expect(screen.getByTestId('conversation-surface-watch-count')).toHaveTextContent('0');
  });

  it('puts a known audience in the accessible name too', () => {
    render(<ConversationSurface name="#all-hands" onWatch={vi.fn()} watchViewerCount={42} />);
    expect(screen.getByRole('button', { name: 'Watch — 42 watching' })).toBeInTheDocument();
  });
});

// The other two controls in the same row. Verified rather than churned:
// they already have distinct, state-aware accessible names.
describe('ConversationSurface — the rest of the header row', () => {
  it('names the two call controls differently from each other', () => {
    render(<ConversationSurface name="#all-hands" onStartCall={vi.fn()} onWatch={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Start an audio call' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start a video call' })).toBeInTheDocument();
  });

  it('says join rather than start once a call is running', () => {
    render(<ConversationSurface name="#all-hands" onStartCall={vi.fn()} callInProgress />);
    expect(screen.getByRole('button', { name: 'Join the call with audio' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Join the call with video' })).toBeInTheDocument();
  });

  it('offers one control, honestly named, where the room fixes the mode', () => {
    render(<ConversationSurface name="#all-hands" onStartCall={vi.fn()} callModeFixed />);
    expect(screen.getByRole('button', { name: 'Start a call' })).toBeInTheDocument();
    expect(screen.queryByTestId('conversation-surface-audio-call')).toBeNull();
  });

  // Three adjacent controls, three different accessible names, none of them
  // the emoji they render.
  it('leaves no control in the row named by its glyph', () => {
    render(<ConversationSurface name="#all-hands" onStartCall={vi.fn()} onWatch={vi.fn()} />);
    for (const b of screen.getAllByRole('button')) {
      const name = b.getAttribute('aria-label') ?? b.textContent ?? '';
      expect(name).toMatch(/[a-z]/i);
    }
  });
});

describe('starting a whiteboard from the Documents view', () => {
  // The two are different enough to be different buttons: a document opens
  // beside the conversation, a whiteboard takes the whole window. The surface
  // is the only path a page has to either, so a handler it drops is a feature
  // that simply cannot be reached.
  it('passes the whiteboard handler through to the documents panel', () => {
    const onCreateWhiteboard = vi.fn();
    render(<ConversationSurface name="Hank" documents={[doc]} onCreateDocument={vi.fn()} onCreateWhiteboard={onCreateWhiteboard} />);
    fireEvent.click(screen.getByRole('tab', { name: /Documents/ }));
    fireEvent.click(screen.getByTestId('channel-documents-create-whiteboard'));
    expect(onCreateWhiteboard).toHaveBeenCalledTimes(1);
  });

  it('offers documents alone when no whiteboard handler is given', () => {
    render(<ConversationSurface name="Hank" documents={[doc]} onCreateDocument={vi.fn()} />);
    fireEvent.click(screen.getByRole('tab', { name: /Documents/ }));
    expect(screen.getByTestId('channel-documents-create')).toBeInTheDocument();
    expect(screen.queryByTestId('channel-documents-create-whiteboard')).toBeNull();
  });
});
