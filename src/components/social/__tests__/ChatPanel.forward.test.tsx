// Forwarding a message into another conversation.
//
// The gate is deliberately TIGHTER than Reply's, and these tests pin the
// difference. Reply is withheld from system notices only; Forward is also
// withheld from cards and from attachments, because a forward RELOCATES the
// message and both of those are handles on something scoped to the
// conversation they were posted in — a document card's Open, a call card's
// Join, an attachment's bearer-authenticated download URL. Each would render
// in its new home and then do nothing, which is worse than not offering it.

import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ChatPanel,
  forwardAttributionLine,
  forwardOriginLabel,
  forwardedFromMetadata,
  withoutForwardAttribution,
} from '../ChatPanel';
// ChatMessage lives on the hook, not the panel — the panel consumes it.
import type { ChatMessage } from '../../../hooks/useChat';

afterEach(cleanup);

const NOOP = () => {};

function msg(overrides: Partial<ChatMessage> = {}): ChatMessage {
  return {
    id: 'm1',
    clientId: 'c1',
    content: 'the upload path is live',
    displayName: 'Hank Anderson',
    timestamp: new Date('2026-09-07T12:00:00Z').toISOString(),
    ...overrides,
  } as ChatMessage;
}

function renderPanel(messages: ChatMessage[], props: Record<string, unknown> = {}) {
  return render(
    <ChatPanel
      messages={messages}
      onSend={NOOP}
      onReply={NOOP}
      onTogglePin={NOOP}
      onToggleReaction={NOOP}
      currentUserId="u-me"
      {...props}
    />,
  );
}

describe('the Forward control', () => {
  // Every existing caller passes no handler and must see no change.
  it('renders nothing without a handler', () => {
    renderPanel([msg()]);
    expect(screen.queryByTestId('message-actions-forward')).toBeNull();
  });

  it('appears on a plain message once a handler is given', () => {
    renderPanel([msg()], { onForwardMessage: vi.fn() });
    expect(screen.getByTestId('message-actions-forward')).toBeInTheDocument();
  });

  it('hands back the message that was clicked', () => {
    const onForwardMessage = vi.fn();
    renderPanel([msg({ id: 'm-42' })], { onForwardMessage });
    fireEvent.click(screen.getByTestId('message-actions-forward'));
    expect(onForwardMessage).toHaveBeenCalledTimes(1);
    expect(onForwardMessage.mock.calls[0][0]).toMatchObject({ id: 'm-42' });
  });

  // The picker the host opens is a popover hung off this button, so the
  // element has to survive the trip out of the panel. Nothing else knows
  // which of a transcript's Forward buttons this click came from.
  it('hands back the button it was clicked on, alongside the message', () => {
    const onForwardMessage = vi.fn();
    renderPanel([msg({ id: 'm-42' })], { onForwardMessage });
    const button = screen.getByTestId('message-actions-forward');
    fireEvent.click(button);
    expect(onForwardMessage.mock.calls[0][1]).toBe(button);
  });

  // Threading folds a REPLY onto its root, because a reply to a reply belongs
  // in the same thread. A forward is about the exact words that were clicked,
  // so the same fold here would quietly send a different message.
  it('forwards the clicked reply, not the thread root', () => {
    const onForwardMessage = vi.fn();
    const root = msg({ id: 'root-1', content: 'what broke?' });
    const reply = msg({
      id: 'reply-1',
      content: 'the upload path did',
      metadata: { replyTo: { messageId: 'root-1', author: 'Hank Anderson', text: 'what broke?' } },
    });
    renderPanel([root, reply], { onForwardMessage, threaded: true });
    const buttons = screen.getAllByTestId('message-actions-forward');
    // Root first, then its one reply.
    fireEvent.click(buttons[1]);
    expect(onForwardMessage.mock.calls[0][0]).toMatchObject({ id: 'reply-1' });
  });
});

describe('messages that cannot be forwarded', () => {
  // "Bob started a call" is a record of an event, not a thing to relocate —
  // the same reason Reply and Pin are withheld from it.
  it('is not offered on a system notice', () => {
    renderPanel(
      [msg({ id: 'call-1', content: 'Hank started a call', metadata: { system: true, kind: 'call', callId: 'c-1', live: false, participants: [] } })],
      { onForwardMessage: vi.fn() },
    );
    expect(screen.queryByTestId('message-actions-forward')).toBeNull();
  });

  // Wider than Reply's gate on purpose: a document card a PERSON posted is a
  // message they chose to send, so replying to it means what it normally
  // means — but its Open button resolves against a document the destination
  // may not be able to read.
  it('is not offered on a document card a person posted', () => {
    renderPanel(
      [msg({ id: 'share-1', content: '📄 Q3 plan', metadata: { kind: 'document', documentId: 'd-1', title: 'Q3 plan' } })],
      { onForwardMessage: vi.fn() },
    );
    expect(screen.queryByTestId('message-actions-reply')).toBeInTheDocument();
    expect(screen.queryByTestId('message-actions-forward')).toBeNull();
  });

  // The descriptor's URL is scoped to the transfer in THIS channel; re-posting
  // it hands the destination a file row that comes back 403.
  it('is not offered on a message carrying an attachment', () => {
    renderPanel(
      [msg({
        id: 'file-1',
        content: 'here it is',
        attachments: [{ id: 'f1', name: 'spec.pdf', size: 12, contentType: 'application/pdf', url: '/dl/f1' }],
      })],
      { onForwardMessage: vi.fn() },
    );
    expect(screen.queryByTestId('message-actions-forward')).toBeNull();
  });

  it('is not offered on a deleted message', () => {
    renderPanel(
      [msg({ id: 'gone-1', deletedAt: new Date().toISOString() })],
      { onForwardMessage: vi.fn() },
    );
    expect(screen.queryByTestId('message-actions-forward')).toBeNull();
  });

  // An attachment-only message has empty text; there is nothing to carry.
  it('is not offered on a message with no words', () => {
    renderPanel([msg({ id: 'blank-1', content: '   ' })], { onForwardMessage: vi.fn() });
    expect(screen.queryByTestId('message-actions-forward')).toBeNull();
  });
});

describe('a message that IS a forward', () => {
  const forward = msg({
    id: 'fwd-1',
    displayName: 'Carol Nguyen',
    content: 'Forwarded from #design — Hank Anderson:\nthe upload path is live',
    metadata: {
      forwardedFrom: {
        messageId: 'm-orig',
        channel: 'room:design',
        channelLabel: '#design',
        author: 'Hank Anderson',
        authorUserId: 'u-hank',
        timestamp: '2026-09-05T07:48:00Z',
      },
    },
  });

  it('is marked as one, so it does not read as Carol typing that sentence', () => {
    renderPanel([forward]);
    expect(screen.getByTestId('forwarded-marker')).toBeInTheDocument();
  });

  // The whole degradation story: the attribution is in the STORED text, so a
  // client that has never heard of `forwardedFrom` still shows whose words
  // these are. Asserted on the message, not on the render — the render is
  // exactly what the next test is about.
  it('keeps the attribution in the stored content for clients that cannot read metadata', () => {
    expect(forward.content.startsWith('Forwarded from #design — Hank Anderson:')).toBe(true);
  });

  // The taste rule: the marker and the body were both saying it.
  it('says where it came from ONCE — in the marker, not again in the body', () => {
    renderPanel([forward]);
    expect(screen.getByTestId('forwarded-marker'))
      .toHaveTextContent('Forwarded from #design — Hank Anderson');
    const body = screen.getByTestId('message-body');
    expect(body).toHaveTextContent('the upload path is live');
    expect(body).not.toHaveTextContent('Forwarded from');
  });

  // `replyTo` would have nested the forward under the original whenever the
  // two shared a channel, and offered a jump to a message that is elsewhere.
  it('carries no replyTo, so threading never nests it under the original', () => {
    expect((forward.metadata as Record<string, unknown>).replyTo).toBeUndefined();
    renderPanel([forward], { threaded: true, onJumpToMessage: NOOP });
    expect(screen.queryByTestId('quote-block')).toBeNull();
  });

  it('can itself be forwarded on — it is still just words', () => {
    renderPanel([forward], { onForwardMessage: vi.fn() });
    expect(screen.getByTestId('message-actions-forward')).toBeInTheDocument();
  });
});

describe('forwardedFromMetadata', () => {
  it('reads the shape the host writes', () => {
    expect(
      forwardedFromMetadata({ forwardedFrom: { messageId: 'm1', channel: 'room:design', author: 'Hank Anderson' } }),
    ).toEqual({ messageId: 'm1', channel: 'room:design', author: 'Hank Anderson' });
  });

  // Half a write renders as "Forwarded from undefined" if it is trusted, so a
  // partial one counts as no write at all.
  it('refuses a partial write rather than rendering a hole', () => {
    expect(forwardedFromMetadata({ forwardedFrom: { messageId: 'm1' } })).toBeNull();
    expect(forwardedFromMetadata({ forwardedFrom: { author: 'Hank' } })).toBeNull();
    expect(forwardedFromMetadata({ forwardedFrom: 'yes' as unknown as Record<string, unknown> })).toBeNull();
    expect(forwardedFromMetadata(undefined)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Saying the origin exactly once
// ---------------------------------------------------------------------------

const ORIGIN = {
  messageId: 'm-orig',
  channel: 'room:general',
  channelLabel: '#general',
  author: 'Carol Johnson',
};

describe('withoutForwardAttribution', () => {
  const line = forwardAttributionLine(ORIGIN);

  it('reproduces the line a host writes, so the panel can recognise its own', () => {
    expect(line).toBe('Forwarded from #general — Carol Johnson:');
    expect(forwardOriginLabel(ORIGIN)).toBe('Forwarded from #general — Carol Johnson');
  });

  it('takes the prefix off a body it generated', () => {
    const out = withoutForwardAttribution(`${line}\nunmuted probe`, ORIGIN);
    expect(out).toEqual({ body: 'unmuted probe', stripped: true });
  });

  // A person can legitimately type a sentence like this. Equality against the
  // string THIS metadata would produce, never a pattern that matches its shape.
  it('leaves a body that merely looks similar completely alone', () => {
    for (const body of [
      'Forwarded from #general - Carol Johnson:\nnot an em dash',
      'Forwarded from #General — Carol Johnson:\nwrong case',
      'Forwarded from #general — Carol Johnson\nno colon',
      'I am forwarding this: Forwarded from #general — Carol Johnson:\nnot at the start',
      'Forwarded from #platform — Carol Johnson:\nanother origin entirely',
    ]) {
      expect(withoutForwardAttribution(body, ORIGIN)).toEqual({ body, stripped: false });
    }
  });

  // A forward of a forward: the OUTER metadata names #watercooler, so the
  // inner line belongs to the body and is not this panel's to remove.
  it('only ever strips the line belonging to this message metadata', () => {
    const inner = `Forwarded from #general — Carol Johnson:\nunmuted probe`;
    const outerLine = forwardAttributionLine({ ...ORIGIN, channelLabel: '#watercooler', author: 'Ada Lovelace' });
    const out = withoutForwardAttribution(`${outerLine}\n${inner}`, { ...ORIGIN, channelLabel: '#watercooler', author: 'Ada Lovelace' });
    expect(out.stripped).toBe(true);
    expect(out.body).toBe(inner);
  });

  // The pathological origin — a room and a name that together fill the wire's
  // message budget — makes the attribution the whole body.
  it('never renders a message down to nothing', () => {
    expect(withoutForwardAttribution(line, ORIGIN).stripped).toBe(false);
    expect(withoutForwardAttribution(`${line}\n   `, ORIGIN).stripped).toBe(false);
  });

  // The rendered body is what the rule is about, so a rich body is asked the
  // same question — the shape the edit path produces is the line, a <br>, the
  // words.
  it('takes the line off a rich body too, and off its plain-text fallback', () => {
    const out = withoutForwardAttribution(
      `${line}\nunmuted probe`,
      ORIGIN,
      `<p>${line}<br>unmuted probe</p>`,
    );
    expect(out.stripped).toBe(true);
    expect(out.html).toBe('<p>unmuted probe</p>');
    expect(out.body).toBe('unmuted probe');
  });

  // Conservative on purpose: "starts with this sentence" is asked of the first
  // text node, so an attribution spelled across elements declines rather than
  // being half-eaten.
  it('declines a rich body that spells the line across elements', () => {
    const html = `<p>Forwarded from <strong>#general</strong> — Carol Johnson:<br>probe</p>`;
    expect(withoutForwardAttribution(`${line}\nprobe`, ORIGIN, html).stripped).toBe(false);
  });

  it('declines when the line runs into the words with no break', () => {
    const html = `<p>${line}and then words</p>`;
    expect(withoutForwardAttribution(`${line}\nx`, ORIGIN, html).stripped).toBe(false);
  });

  it('never empties a rich body either', () => {
    expect(withoutForwardAttribution(line, ORIGIN, `<p>${line}</p>`).stripped).toBe(false);
  });

  it('leaves a rich body that is not a forward completely alone', () => {
    const html = '<p>hello</p>';
    expect(withoutForwardAttribution('hello', null, html)).toEqual({ body: 'hello', html, stripped: false });
  });

  it('does nothing at all to a message that is not a forward', () => {
    expect(withoutForwardAttribution('hello', null)).toEqual({ body: 'hello', stripped: false });
  });
});

describe('an edited forward', () => {
  const line = forwardAttributionLine(ORIGIN);
  const edited = (over: Partial<ChatMessage>) => msg({
    id: 'fwd-edited',
    displayName: 'Ada Lovelace',
    editedAt: new Date('2026-09-07T12:05:00Z').toISOString(),
    metadata: { forwardedFrom: ORIGIN },
    ...over,
  } as Partial<ChatMessage>);

  // The edit path sends html to match the new text, and the panel renders the
  // html over the plain text. The words have to survive that.
  it('still renders its words when the edit sent a rich body', () => {
    renderPanel([edited({
      content: `${line}\nrewritten by Ada`,
      metadata: { forwardedFrom: ORIGIN, html: '<p>rewritten by Ada</p>' },
    })]);
    expect(screen.getByTestId('message-body')).toHaveTextContent('rewritten by Ada');
  });

  // The edit rewrote the attribution away, so the rendered body no longer
  // carries it — and the marker must not add a second copy of a sentence
  // nothing removed from anywhere.
  it('falls back to a bare badge when the rendered body kept nothing to take over', () => {
    renderPanel([edited({
      content: `${line}\nrewritten by Ada`,
      metadata: { forwardedFrom: ORIGIN, html: '<p>rewritten by Ada</p>' },
    })]);
    expect(screen.getByTestId('forwarded-marker')).toHaveTextContent('Forwarded');
    expect(screen.getByTestId('forwarded-marker')).not.toHaveTextContent('#general');
  });

  // The common edit: the prefix kept, the words changed — and the edit path
  // re-encodes the whole thing as html. This is the case the old rich-body
  // decline could never serve.
  it('says the origin once when the edit kept the prefix, rich body and all', () => {
    renderPanel([edited({
      content: `${line}\ncorrected: eve should NOT be notified`,
      metadata: { forwardedFrom: ORIGIN, html: `<p>${line}<br>corrected: eve should NOT be notified</p>` },
    })]);
    expect(screen.getByTestId('forwarded-marker'))
      .toHaveTextContent('Forwarded from #general — Carol Johnson');
    const body = screen.getByTestId('message-body');
    expect(body).toHaveTextContent('corrected: eve should NOT be notified');
    expect(body).not.toHaveTextContent('Forwarded from');
  });

  // An edit that rewrote the prefix away leaves an ordinary message that
  // happens to know where it came from. It renders whole.
  it('renders in full when the edit removed the prefix', () => {
    renderPanel([edited({ content: 'actually, ignore this' })]);
    expect(screen.getByTestId('message-body')).toHaveTextContent('actually, ignore this');
    expect(screen.getByTestId('forwarded-marker')).toHaveTextContent('Forwarded');
  });

  // Plain-text edit that kept the prefix. Still ours to strip.
  it('still says the origin once when a plain edit kept the prefix', () => {
    renderPanel([edited({ content: `${line}\ncorrected: eve should NOT be notified` })]);
    expect(screen.getByTestId('forwarded-marker'))
      .toHaveTextContent('Forwarded from #general — Carol Johnson');
    const body = screen.getByTestId('message-body');
    expect(body).toHaveTextContent('corrected: eve should NOT be notified');
    expect(body).not.toHaveTextContent('Forwarded from');
  });
});

// ---------------------------------------------------------------------------
// The real thing
// ---------------------------------------------------------------------------

// Not an invented fixture: this is the row the running gateway actually stored
// when a message was forwarded from #general to #watercooler in the browser,
// copied verbatim out of DynamoDB (`chat-messages`, 2026-09-16). It is here
// because the bug this file grew for was never in the logic — the logic was
// right and the build was stale — and the thing worth pinning is that the
// panel says the origin once for the EXACT bytes the wire produces, em dash,
// colon, newline and all.
const REAL_FORWARD: ChatMessage = {
  id: 'mu4lubuo-real',
  clientId: 'c-eve',
  userId: 'dev-eve',
  displayName: 'Eve Thompson',
  timestamp: '2026-09-16T12:04:00.000Z',
  content: 'Forwarded from #general — Carol Johnson:\nunmuted probe: eve SHOULD be notified',
  metadata: {
    displayName: 'Eve Thompson',
    forwardedFrom: {
      messageId: 'mu41sf6eajyzy0untwr',
      channel: 'general',
      channelLabel: '#general',
      author: 'Carol Johnson',
      authorUserId: 'dev-carol',
      timestamp: '2026-09-16T11:59:10.550Z',
    },
    forwardId: 'fwd-mu4lubuo-hjof14',
  },
} as ChatMessage;

describe('a message the gateway actually stored', () => {
  it('carries no html, so the rendered body IS the plain text', () => {
    expect((REAL_FORWARD.metadata as Record<string, unknown>).html).toBeUndefined();
  });

  it('says the origin once', () => {
    renderPanel([REAL_FORWARD]);
    expect(screen.getByTestId('forwarded-marker'))
      .toHaveTextContent('Forwarded from #general — Carol Johnson');
    const body = screen.getByTestId('message-body');
    expect(body).toHaveTextContent('unmuted probe: eve SHOULD be notified');
    expect(body).not.toHaveTextContent('Forwarded from');
  });
});
