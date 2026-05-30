import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AlertList, { AlertItem, type AlertListEntry } from '../AlertList';

const sample: AlertListEntry[] = [
  {
    id: 'a1',
    severity: 'critical',
    title: 'API latency spike',
    description: 'p95 over 800ms for 5min',
    timestamp: '10:48:21',
  },
  {
    id: 'a2',
    severity: 'warning',
    title: 'Queue depth high',
    description: '12 pending events',
    timestamp: '10:46:02',
  },
  {
    id: 'a3',
    severity: 'info',
    title: 'Deploy started',
    description: 'frontend@2.11.1',
    timestamp: '10:42:10',
    resolved: true,
  },
];

describe('AlertItem', () => {
  it('renders title, description, timestamp', () => {
    render(<AlertItem severity="critical" title="API down" description="Five-min outage" timestamp="10:00" />);
    expect(screen.getByText('API down')).toBeInTheDocument();
    expect(screen.getByText('Five-min outage')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('marks resolved with data attribute and Resolved chip', () => {
    render(<AlertItem severity="warning" title="Disk space low" resolved />);
    const row = screen.getByTestId('alert-warning');
    expect(row.getAttribute('data-resolved')).toBe('true');
    expect(screen.getByText('Resolved')).toBeInTheDocument();
  });

  it('uses severity in default testid', () => {
    render(<AlertItem severity="info" title="Deploy started" />);
    expect(screen.getByTestId('alert-info')).toBeInTheDocument();
  });
});

describe('AlertList', () => {
  it('renders all items as rows', () => {
    render(<AlertList items={sample} />);
    expect(screen.getByText('API latency spike')).toBeInTheDocument();
    expect(screen.getByText('Queue depth high')).toBeInTheDocument();
    expect(screen.getByText('Deploy started')).toBeInTheDocument();
  });

  it('shows active-count chip excluding resolved items', () => {
    render(<AlertList items={sample} />);
    const count = screen.getByTestId('alert-list-active-count');
    expect(count.textContent).toBe('2 active');
  });

  it('omits the active-count chip when all items resolved', () => {
    const resolved = sample.map((i) => ({ ...i, resolved: true }));
    render(<AlertList items={resolved} />);
    expect(screen.queryByTestId('alert-list-active-count')).not.toBeInTheDocument();
  });

  it('renders default empty state when items=[]', () => {
    render(<AlertList items={[]} />);
    expect(screen.getByText('No alerts.')).toBeInTheDocument();
  });

  it('renders custom empty slot', () => {
    render(<AlertList items={[]} empty={<div>Nothing to see</div>} />);
    expect(screen.getByText('Nothing to see')).toBeInTheDocument();
  });

  it('renders loading state and hides items', () => {
    render(<AlertList items={sample} loading />);
    expect(screen.getByText('Loading alerts…')).toBeInTheDocument();
    expect(screen.queryByText('API latency spike')).not.toBeInTheDocument();
  });

  it('uses a custom header title', () => {
    render(<AlertList items={[]} title="Active incidents" />);
    expect(screen.getByText('Active incidents')).toBeInTheDocument();
  });

  it('honors a custom headerSlot', () => {
    render(<AlertList items={sample} headerSlot={<span data-testid="custom-meta">x</span>} />);
    expect(screen.getByTestId('custom-meta')).toBeInTheDocument();
    expect(screen.queryByTestId('alert-list-active-count')).not.toBeInTheDocument();
  });
});
