import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DiagramPresenceBar } from '../DiagramPresenceBar';

const me = { clientId: 'c-me', userId: 'dev-me', displayName: 'Me', color: '#000', isSelf: true } as never;
const ada = { clientId: 'c-ada', userId: 'dev-ada', displayName: 'Ada', color: '#111', pointer: { x: 0, y: 0, tool: 'pointer' } } as never;

describe('DiagramPresenceBar', () => {
  it('is a roster without actions: no menu, just the faces and the count', () => {
    render(<DiagramPresenceBar participants={[me, ada]} />);
    expect(screen.getByTestId('diagram-presence').getAttribute('data-participant-count')).toBe('2');
    expect(screen.queryByRole('button', { name: /people on this diagram/i })).toBeNull();
  });

  it('with actions, clicking the pill lists the other people with what you can do', () => {
    const onMessage = vi.fn(); const onCall = vi.fn(); const onFollow = vi.fn();
    render(<DiagramPresenceBar participants={[me, ada]} actions={{ onMessage, onCall, onFollow }} />);
    fireEvent.click(screen.getByRole('button', { name: /people on this diagram \(2\)/i }));
    // Ada, drawing — never "Me (you)".
    expect(screen.getByText('Ada · drawing')).toBeInTheDocument();
    expect(screen.queryByText(/Me · /)).toBeNull();
    fireEvent.click(screen.getByRole('menuitem', { name: 'Message' }));
    expect(onMessage).toHaveBeenCalledWith(expect.objectContaining({ userId: 'dev-ada', displayName: 'Ada' }));
  });

  it('offers only the actions the host backs, and says "Stop following" for the one being followed', () => {
    const onFollow = vi.fn();
    render(<DiagramPresenceBar participants={[me, ada]} actions={{ onFollow }} followingUserId="dev-ada" />);
    fireEvent.click(screen.getByRole('button', { name: /people on this diagram/i }));
    expect(screen.queryByRole('menuitem', { name: 'Message' })).toBeNull();
    fireEvent.click(screen.getByRole('menuitem', { name: 'Stop following' }));
    expect(onFollow).toHaveBeenCalledWith(expect.objectContaining({ userId: 'dev-ada' }));
  });

  it('counts people across tabs and never offers actions for a sibling of self', () => {
    const onMessage = vi.fn();
    const sibling = { clientId: 'c-sibling', userId: 'dev-me', displayName: 'Me', color: '#000' } as never;
    const adaSibling = { clientId: 'c-ada-2', userId: 'dev-ada', displayName: 'Ada', color: '#111' } as never;
    render(<DiagramPresenceBar participants={[sibling, ada, me, adaSibling]} actions={{ onMessage }} />);
    expect(screen.getByTestId('diagram-presence')).toHaveAttribute('data-participant-count', '2');
    fireEvent.click(screen.getByRole('button', { name: 'People on this diagram (2)' }));
    expect(screen.queryByText(/Me · /)).toBeNull();
    expect(screen.getAllByRole('menuitem', { name: 'Message' })).toHaveLength(1);
    fireEvent.click(screen.getByRole('menuitem', { name: 'Message' }));
    expect(onMessage).toHaveBeenCalledWith(expect.objectContaining({ userId: 'dev-ada', clientId: 'c-ada' }));
  });

  it('alone on the diagram, stays a roster even with actions', () => {
    render(<DiagramPresenceBar participants={[me]} actions={{ onMessage: vi.fn() }} />);
    expect(screen.queryByRole('button', { name: /people on this diagram/i })).toBeNull();
  });
});
