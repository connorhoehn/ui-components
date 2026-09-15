import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatPanel } from '../ChatPanel';

describe('ChatPanel with no messages', () => {
  it("shows the host's intro in place of the bare line when given one", () => {
    render(<ChatPanel messages={[]} onSend={() => {}} emptyState={<div data-testid="intro">This is the start</div>} />);
    expect(screen.getByTestId('intro')).toBeInTheDocument();
    expect(screen.queryByText('No messages yet')).toBeNull();
  });
  it('keeps the plain line without one', () => {
    render(<ChatPanel messages={[]} onSend={() => {}} />);
    expect(screen.getByText('No messages yet')).toBeInTheDocument();
  });
});
