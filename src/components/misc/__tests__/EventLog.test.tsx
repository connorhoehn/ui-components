import { render, screen } from '@testing-library/react';
import { EventLog, type LogEntry } from '../EventLog';

function mk(over: Partial<LogEntry> & Pick<LogEntry, 'id' | 'direction'>): LogEntry {
  return {
    id: over.id,
    direction: over.direction,
    message: over.message ?? { type: 'chat', text: 'hello' },
    timestamp: over.timestamp ?? new Date(0).toISOString(),
  };
}

describe('EventLog', () => {
  it('renders an empty-state hint when no entries', () => {
    render(<EventLog entries={[]} />);
    expect(screen.getByText('No events yet.')).toBeInTheDocument();
  });

  it('shows the entry count in the header', () => {
    render(
      <EventLog
        entries={[
          mk({ id: '1', direction: 'sent' }),
          mk({ id: '2', direction: 'received' }),
        ]}
      />,
    );
    expect(screen.getByText('(2)')).toBeInTheDocument();
  });

  it('badges each entry as SENT or RECV', () => {
    render(
      <EventLog
        entries={[
          mk({ id: '1', direction: 'sent' }),
          mk({ id: '2', direction: 'received' }),
        ]}
      />,
    );
    expect(screen.getByText('[SENT]')).toBeInTheDocument();
    expect(screen.getByText('[RECV]')).toBeInTheDocument();
  });

  it('renders the JSON payload for each entry', () => {
    render(
      <EventLog
        entries={[mk({ id: '1', direction: 'sent', message: { type: 'chat', text: 'hi' } })]}
      />,
    );
    expect(screen.getByText(/"type": "chat"/)).toBeInTheDocument();
    expect(screen.getByText(/"text": "hi"/)).toBeInTheDocument();
  });
});
