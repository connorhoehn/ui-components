import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChatPanel, documentRefsFromMetadata } from '../ChatPanel';
import { MessageBody } from '../MessageBody';
import type { ChatMessage } from '../../../hooks/useChat';

// A `#Roadmap` in a message is a reference the reader can open — a chip under
// the words, not a card replacing them.

afterEach(cleanup);

function msg(metadata: Record<string, unknown>, content = 'see #Roadmap and #Budget'): ChatMessage {
  return { id: 'm1', clientId: 'c1', content, timestamp: '2026-09-10T12:00:00.000Z', displayName: 'Ada', metadata } as ChatMessage;
}

describe('documentRefsFromMetadata', () => {
  it('reads {id,label} pairs, drops malformed entries, collapses duplicates, and keeps an icon', () => {
    expect(documentRefsFromMetadata({ documents: [{ id: 'd1', label: 'Roadmap', icon: '🗺️' }, { id: 'd1', label: 'Roadmap' }, { id: 'd2' }, { label: 'no id' }, null, 'x'] }))
      .toEqual([{ id: 'd1', label: 'Roadmap', icon: '🗺️' }, { id: 'd2', label: 'd2' }]);
    expect(documentRefsFromMetadata({ documents: 'nope' })).toEqual([]);
    expect(documentRefsFromMetadata(undefined)).toEqual([]);
  });
});

describe('ChatPanel document references', () => {
  it('renders a chip per referenced document under the text, and opens the document', () => {
    const onOpenDocument = vi.fn();
    render(<ChatPanel messages={[msg({ documents: [{ id: 'd1', label: 'Roadmap' }, { id: 'd2', label: 'Budget' }] })]} onSend={vi.fn()} onOpenDocument={onOpenDocument} />);
    const row = screen.getByTestId('chat-message');
    // The words stay words.
    expect(row).toHaveTextContent('see #Roadmap and #Budget');
    const chips = within(row).getAllByTestId('chat-message-docref');
    // The title is the chip's only text: with no icon of its own a document
    // falls back to a DRAWN glyph, so asserting on a character here would be
    // asserting on the platform's emoji font.
    expect(chips.map((c) => c.textContent)).toEqual(['Roadmap', 'Budget']);
    expect(chips.every((c) => c.querySelector('svg'))).toBe(true);
    fireEvent.click(chips[1]);
    expect(onOpenDocument).toHaveBeenCalledWith('d2');
    // It is a reference, not an arrival: no document card.
    expect(screen.queryByTestId('document-activity-card')).toBeNull();
  });

  it('renders nothing extra for a message without references', () => {
    render(<ChatPanel messages={[msg({}, 'plain words')]} onSend={vi.fn()} onOpenDocument={vi.fn()} />);
    expect(screen.queryByTestId('chat-message-docrefs')).toBeNull();
  });

  it('keeps the docref class on the rich body so the chip in the text paints like a mention', () => {
    render(<MessageBody html='<p>see <span class="docref" data-type="docref" data-id="d1" data-label="Roadmap">#Roadmap</span></p>' text="see #Roadmap" />);
    const span = screen.getByText('#Roadmap');
    expect(span.className).toBe('docref');
    expect(span.getAttribute('data-document-id')).toBe('d1');
  });
});
