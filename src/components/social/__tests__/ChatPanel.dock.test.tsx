import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatPanel } from '../ChatPanel';

describe('ChatPanel dock slot (2.400.0)', () => {
  it('renders the dock between the typing row and the composer slot', () => {
    render(
      <ChatPanel
        messages={[]}
        onSend={() => {}}
        typingUsers={['Carol']}
        dock={<div data-testid="the-shelf">shelf</div>}
        composer={<div data-testid="the-composer">composer</div>}
      />,
    );
    const slot = screen.getByTestId('chat-panel-dock-slot');
    const composer = screen.getByTestId('chat-panel-composer-slot');
    expect(slot.contains(screen.getByTestId('the-shelf'))).toBe(true);
    expect(slot.className).toContain('shrink-0');
    expect(slot.compareDocumentPosition(composer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const typing = screen.getByText(/Carol/);
    expect(typing.compareDocumentPosition(slot) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(slot.parentElement).toBe(composer.parentElement);
  });

  it('sits above the built-in input row too, and is absent without a dock', () => {
    const { rerender } = render(<ChatPanel messages={[]} onSend={() => {}} dock={<span>shelf</span>} />);
    expect(screen.getByTestId('chat-panel-dock-slot')).toBeTruthy();
    rerender(<ChatPanel messages={[]} onSend={() => {}} />);
    expect(screen.queryByTestId('chat-panel-dock-slot')).toBeNull();
  });
});
