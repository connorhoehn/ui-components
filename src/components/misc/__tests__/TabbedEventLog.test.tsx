import { beforeAll, describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { TabbedEventLog } from '../TabbedEventLog';
import type { LogEntry } from '../EventLog';

beforeAll(() => {
  // jsdom does not implement scrollIntoView; the component calls it in a
  // useEffect on every entries/activeTab change.
  Element.prototype.scrollIntoView = () => {};
});

function mk(over: Partial<LogEntry> & Pick<LogEntry, 'id' | 'direction'>): LogEntry {
  return {
    id: over.id,
    direction: over.direction,
    message: over.message ?? { type: 'chat:send', text: 'hi' },
    timestamp: over.timestamp ?? new Date(0).toISOString(),
  };
}

describe('TabbedEventLog', () => {
  it('renders all 5 tab buttons (Chat / Presence / Cursors / Reactions / System)', () => {
    render(<TabbedEventLog entries={[]} />);
    expect(screen.getByRole('button', { name: /^Chat \(/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Presence \(/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Cursors \(/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Reactions \(/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^System \(/ })).toBeInTheDocument();
  });

  it('initial active tab is Chat with active styling', () => {
    render(<TabbedEventLog entries={[]} />);
    const chatBtn = screen.getByRole('button', { name: /^Chat \(/ });
    const presenceBtn = screen.getByRole('button', { name: /^Presence \(/ });
    expect(chatBtn.className).toMatch(/bg-info/);
    expect(chatBtn.className).toMatch(/font-semibold/);
    expect(presenceBtn.className).toMatch(/bg-surface-emphasis/);
    expect(presenceBtn.className).not.toMatch(/font-semibold/);
  });

  it('header shows total entries.length regardless of active tab filter', () => {
    const entries: LogEntry[] = [
      mk({ id: '1', direction: 'sent', message: { type: 'presence' } }),
      mk({ id: '2', direction: 'received', message: { type: 'presence' } }),
      mk({ id: '3', direction: 'sent', message: { type: 'chat:send' } }),
    ];
    render(<TabbedEventLog entries={entries} />);
    expect(screen.getByText('(3)')).toBeInTheDocument();
  });

  it('each tab button label shows its own filtered count', () => {
    const entries: LogEntry[] = [
      mk({ id: '1', direction: 'sent', message: { type: 'chat:send' } }),
      mk({ id: '2', direction: 'sent', message: { type: 'chat:received' } }),
      mk({ id: '3', direction: 'received', message: { type: 'presence' } }),
      mk({ id: '4', direction: 'received', message: { type: 'cursor' } }),
      mk({ id: '5', direction: 'sent', message: { type: 'reactions:add' } }),
      mk({ id: '6', direction: 'received', message: { type: 'error' } }),
    ];
    render(<TabbedEventLog entries={entries} />);
    expect(screen.getByRole('button', { name: 'Chat (2)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Presence (1)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cursors (1)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reactions (1)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'System (1)' })).toBeInTheDocument();
  });

  it('Chat tab includes any chat:* prefix', () => {
    const entries: LogEntry[] = [
      mk({ id: 'a', direction: 'sent', message: { type: 'chat:send', text: 'alpha' } }),
      mk({ id: 'b', direction: 'received', message: { type: 'chat:received', text: 'bravo' } }),
      mk({ id: 'c', direction: 'sent', message: { type: 'presence', text: 'noise' } }),
    ];
    render(<TabbedEventLog entries={entries} />);
    expect(screen.getByText(/"text": "alpha"/)).toBeInTheDocument();
    expect(screen.getByText(/"text": "bravo"/)).toBeInTheDocument();
    expect(screen.queryByText(/"text": "noise"/)).not.toBeInTheDocument();
  });

  it('Presence tab includes only exact presence type', () => {
    const entries: LogEntry[] = [
      mk({ id: 'a', direction: 'sent', message: { type: 'presence', text: 'on' } }),
      mk({ id: 'b', direction: 'sent', message: { type: 'presence:join', text: 'noise' } }),
    ];
    render(<TabbedEventLog entries={entries} />);
    fireEvent.click(screen.getByRole('button', { name: /^Presence \(/ }));
    expect(screen.getByText(/"text": "on"/)).toBeInTheDocument();
    expect(screen.queryByText(/"text": "noise"/)).not.toBeInTheDocument();
  });

  it('Cursors tab includes only exact cursor type', () => {
    const entries: LogEntry[] = [
      mk({ id: 'a', direction: 'sent', message: { type: 'cursor', x: 10, y: 20 } }),
      mk({ id: 'b', direction: 'sent', message: { type: 'cursor:move', x: 99 } }),
    ];
    render(<TabbedEventLog entries={entries} />);
    fireEvent.click(screen.getByRole('button', { name: /^Cursors \(/ }));
    expect(screen.getByText(/"x": 10/)).toBeInTheDocument();
    expect(screen.queryByText(/"x": 99/)).not.toBeInTheDocument();
  });

  it('Reactions tab includes any reactions:* prefix', () => {
    const entries: LogEntry[] = [
      mk({ id: 'a', direction: 'sent', message: { type: 'reactions:add', emoji: 'A' } }),
      mk({ id: 'b', direction: 'sent', message: { type: 'reactions:remove', emoji: 'B' } }),
      mk({ id: 'c', direction: 'sent', message: { type: 'chat:send', emoji: 'C' } }),
    ];
    render(<TabbedEventLog entries={entries} />);
    fireEvent.click(screen.getByRole('button', { name: /^Reactions \(/ }));
    expect(screen.getByText(/"emoji": "A"/)).toBeInTheDocument();
    expect(screen.getByText(/"emoji": "B"/)).toBeInTheDocument();
    expect(screen.queryByText(/"emoji": "C"/)).not.toBeInTheDocument();
  });

  it('System tab includes error, session, unrecognized, and typeless', () => {
    const entries: LogEntry[] = [
      mk({ id: 'a', direction: 'received', message: { type: 'error', code: 'E1' } }),
      mk({ id: 'b', direction: 'received', message: { type: 'session', sid: 'S2' } }),
      mk({ id: 'c', direction: 'received', message: { type: 'something-novel', payload: 'X3' } }),
      mk({ id: 'd', direction: 'received', message: { payload: 'NO_TYPE' } }),
      mk({ id: 'e', direction: 'sent', message: { type: 'chat:send', payload: 'CHAT_NOISE' } }),
    ];
    render(<TabbedEventLog entries={entries} />);
    fireEvent.click(screen.getByRole('button', { name: /^System \(/ }));
    expect(screen.getByText(/"code": "E1"/)).toBeInTheDocument();
    expect(screen.getByText(/"sid": "S2"/)).toBeInTheDocument();
    expect(screen.getByText(/"payload": "X3"/)).toBeInTheDocument();
    expect(screen.getByText(/"payload": "NO_TYPE"/)).toBeInTheDocument();
    expect(screen.queryByText(/"payload": "CHAT_NOISE"/)).not.toBeInTheDocument();
  });

  it('clicking a tab makes it active (styling switches)', () => {
    render(<TabbedEventLog entries={[]} />);
    const presenceBtn = screen.getByRole('button', { name: /^Presence \(/ });
    expect(presenceBtn.className).toMatch(/bg-surface-emphasis/);
    fireEvent.click(presenceBtn);
    expect(presenceBtn.className).toMatch(/bg-info/);
    expect(presenceBtn.className).toMatch(/font-semibold/);
    const chatBtn = screen.getByRole('button', { name: /^Chat \(/ });
    expect(chatBtn.className).toMatch(/bg-surface-emphasis/);
  });

  it('empty active tab renders "No events yet." even when other tabs have entries', () => {
    const entries: LogEntry[] = [
      mk({ id: 'a', direction: 'sent', message: { type: 'chat:send', text: 'hi' } }),
    ];
    render(<TabbedEventLog entries={entries} />);
    fireEvent.click(screen.getByRole('button', { name: /^Presence \(/ }));
    expect(screen.getByText('No events yet.')).toBeInTheDocument();
  });

  it('each rendered entry shows SENT or RECV direction badge', () => {
    const entries: LogEntry[] = [
      mk({ id: 'a', direction: 'sent', message: { type: 'chat:send', text: 'alpha' } }),
      mk({ id: 'b', direction: 'received', message: { type: 'chat:received', text: 'bravo' } }),
    ];
    render(<TabbedEventLog entries={entries} />);
    expect(screen.getByText('[SENT]')).toBeInTheDocument();
    expect(screen.getByText('[RECV]')).toBeInTheDocument();
  });

  it('renders the JSON payload for each entry in the active tab', () => {
    const entries: LogEntry[] = [
      mk({ id: 'a', direction: 'sent', message: { type: 'chat:send', text: 'hi' } }),
    ];
    const { container } = render(<TabbedEventLog entries={entries} />);
    const pre = container.querySelector('pre');
    expect(pre).not.toBeNull();
    expect(within(pre as HTMLElement).getByText(/"type": "chat:send"/)).toBeInTheDocument();
    expect(within(pre as HTMLElement).getByText(/"text": "hi"/)).toBeInTheDocument();
  });
});
