import { render, screen } from '@testing-library/react';
import { MessageGroup } from '../MessageGroup';

describe('MessageGroup', () => {
  const baseMessages = [
    { id: 'm1', content: 'first', timestamp: '2026-05-30T15:30:00Z' },
    { id: 'm2', content: 'second', timestamp: '2026-05-30T15:30:30Z' },
    { id: 'm3', content: 'third', timestamp: '2026-05-30T15:31:00Z' },
  ];

  it('renders nothing when messages is empty', () => {
    const { container } = render(<MessageGroup author="Alice" messages={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders one MessageRow per message, exposing author + row-count data attrs', () => {
    render(<MessageGroup author="Alice" messages={baseMessages} />);
    const group = screen.getByTestId('message-group');
    expect(group).toHaveAttribute('data-author', 'Alice');
    expect(group).toHaveAttribute('data-row-count', '3');
    expect(screen.getAllByTestId('message-row')).toHaveLength(3);
  });

  it('only the first row shows author + avatar; subsequent rows hide both', () => {
    render(<MessageGroup author="Alice" messages={baseMessages} />);
    const rows = screen.getAllByTestId('message-row');
    // Author label only on first row.
    expect(rows[0]!.querySelector('[data-testid="message-row-author"]')).not.toBeNull();
    expect(rows[1]!.querySelector('[data-testid="message-row-author"]')).toBeNull();
    expect(rows[2]!.querySelector('[data-testid="message-row-author"]')).toBeNull();
    // Avatar slot present in first row only.
    const firstAvatarSlot = rows[0]!.querySelector('div:first-child');
    const secondAvatarSlot = rows[1]!.querySelector('div:first-child');
    expect(firstAvatarSlot?.children.length).toBeGreaterThan(0);
    expect(secondAvatarSlot?.children.length).toBe(0);
  });

  it('content + timestamp render on every row regardless of group position', () => {
    render(<MessageGroup author="Alice" messages={baseMessages} />);
    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
    expect(screen.getByText('third')).toBeInTheDocument();
    expect(screen.getAllByTestId('message-row-time')).toHaveLength(3);
  });

  it('propagates mine through to every row', () => {
    const { rerender } = render(<MessageGroup author="Alice" messages={baseMessages} mine />);
    const rowsMine = screen.getAllByTestId('message-row');
    for (const r of rowsMine) expect(r).toHaveAttribute('data-mine', 'true');
    rerender(<MessageGroup author="Alice" messages={baseMessages} />);
    const rowsNotMine = screen.getAllByTestId('message-row');
    for (const r of rowsNotMine) expect(r).toHaveAttribute('data-mine', 'false');
  });

  it('renders a per-row footer slot when provided on the item', () => {
    const messages = [
      { ...baseMessages[0]!, footer: <div data-testid="f1">react-bar</div> },
      baseMessages[1]!,
    ];
    render(<MessageGroup author="Alice" messages={messages} />);
    expect(screen.getByTestId('f1')).toBeInTheDocument();
    // Only one footer (second message has none).
    expect(screen.getAllByTestId('message-row-footer')).toHaveLength(1);
  });
});
