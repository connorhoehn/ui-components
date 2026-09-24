import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SourceCard, SourceList, formatSourceAge, type SourceListItem } from '../SourceCard';

afterEach(cleanup);

const NOW = Date.parse('2026-09-24T18:00:00Z');
const NINE_H = '2026-09-24T09:00:00Z';

const ITEMS: SourceListItem[] = [
  { id: 'n1', title: 'Tests collide in parallel', timestamp: NINE_H, excerpt: 'Both tests bind to the same local port.' },
  { id: 'n2', title: 'Rerunning separates the causes', timestamp: NINE_H, href: '/k/n2' },
  { id: 'n3', title: 'Skipping a test hid a bug', timestamp: 'not a date', current: true },
];

describe('formatSourceAge', () => {
  it('reads the compact age as a phrase and prints nothing for bad input', () => {
    expect(formatSourceAge(NINE_H, NOW)).toBe('9h ago');
    expect(formatSourceAge(NOW - 10_000, NOW)).toBe('just now');
    expect(formatSourceAge('garbage', NOW)).toBeUndefined();
    expect(formatSourceAge(null, NOW)).toBeUndefined();
    expect(formatSourceAge('2026-03-01T12:00:00Z', NOW)).toBe('Mar 1');
  });
});

describe('SourceCard', () => {
  it('renders title, age and excerpt; onOpen makes the title a button', () => {
    const onOpen = vi.fn();
    render(<SourceCard {...ITEMS[0]!} onOpen={onOpen} now={NOW} />);
    expect(screen.getByTestId('source-card-n1-age').textContent).toBe('9h ago');
    expect(screen.getByText('Both tests bind to the same local port.').className).toContain('line-clamp-2');
    fireEvent.click(screen.getByRole('button', { name: 'Tests collide in parallel' }));
    expect(onOpen).toHaveBeenCalledWith('n1');
  });

  it('href makes a link; neither makes plain text', () => {
    const { rerender } = render(<SourceCard {...ITEMS[1]!} now={NOW} />);
    expect(screen.getByRole('link', { name: 'Rerunning separates the causes' }).getAttribute('href')).toBe('/k/n2');
    rerender(<SourceCard id="x" title="Plain" now={NOW} />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.queryByTestId('source-card-x-age')).toBeNull();
  });

  it('marks the current source', () => {
    render(<SourceCard {...ITEMS[2]!} now={NOW} />);
    const card = screen.getByTestId('source-card-n3');
    expect(card.getAttribute('aria-current')).toBe('true');
    expect(card.className).toContain('border-primary');
    expect(screen.queryByTestId('source-card-n3-age')).toBeNull();
  });
});

describe('SourceList', () => {
  it('lists cards and lends its onOpen to cards without a handler or href', () => {
    const onOpen = vi.fn();
    render(<SourceList items={ITEMS} onOpen={onOpen} now={NOW} />);
    expect(screen.getByRole('list', { name: 'Sources' }).children).toHaveLength(3);
    fireEvent.click(screen.getByRole('button', { name: 'Tests collide in parallel' }));
    expect(onOpen).toHaveBeenCalledWith('n1');
    // the href card stays a link
    expect(screen.getByRole('link', { name: 'Rerunning separates the causes' })).toBeTruthy();
  });

  it('shows the empty label', () => {
    render(<SourceList items={[]} emptyLabel="This guide has no recorded sources" />);
    expect(screen.getByTestId('source-list-empty').textContent).toBe('This guide has no recorded sources');
  });
});
