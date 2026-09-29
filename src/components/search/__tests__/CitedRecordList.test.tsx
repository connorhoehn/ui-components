import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CitedRecordList, type CitedRecordItem } from '../CitedRecordList';

afterEach(cleanup);

const initiative: CitedRecordItem = { n: 1, id: 'p-auth-migration', type: 'initiative', title: 'Auth Migration', href: '/initiatives/p-auth-migration' };
const logout: CitedRecordItem = { n: 2, id: 'w-2', type: 'work', title: 'Logout leaves the legacy shim cookie alive', subtitle: 'Vera Green', status: 'open', href: '/work/w-2' };
const cutover: CitedRecordItem = { n: 3, id: 'w-1', type: 'work', title: 'Tenant-by-tenant cutover', subtitle: 'Nora Chang', status: 'blocked', href: '/work/w-1' };
const vera: CitedRecordItem = { n: 4, id: 'p-001', type: 'person', title: 'Vera Green', subtitle: 'Owner', description: 'Owns Auth Migration and the open logout-cookie bug.', href: '/people/p-001', citations: [1, 2] };
const records = [initiative, logout, cutover, vera];

describe('CitedRecordList', () => {
  it('draws people and work sections with default titles', () => {
    render(<CitedRecordList records={records} onOpen={vi.fn()} />);
    const people = screen.getByRole('region', { name: 'People in context' });
    expect(within(people).getByText('· Owner')).toBeInTheDocument();
    expect(within(people).getByText('Owns Auth Migration and the open logout-cookie bug.')).toBeInTheDocument();
    const work = screen.getByRole('region', { name: 'Work to coordinate' });
    expect(within(work).getAllByTestId('record-status').map((s) => s.getAttribute('data-tone'))).toEqual(['success', 'danger']);
    expect(screen.queryByRole('region', { name: 'Initiatives' })).toBeNull();
  });

  it('citations link to the numbered source and open it', () => {
    const onOpen = vi.fn();
    render(<CitedRecordList records={records} onOpen={onOpen} />);
    const people = screen.getByRole('region', { name: 'People in context' });
    const cite = within(people).getByRole('link', { name: 'Source 2: Logout leaves the legacy shim cookie alive' });
    expect(cite).toHaveAttribute('href', '/work/w-2');
    expect(cite).toHaveTextContent('[2]');
    fireEvent.click(cite);
    expect(onOpen).toHaveBeenCalledWith(logout);
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('lists every record as a numbered source chip in order', () => {
    const onOpen = vi.fn();
    render(<CitedRecordList records={records} onOpen={onOpen} sourcesLabel="Sources" footnote="Based on project roles and linked work." />);
    const sources = within(screen.getByRole('region', { name: 'Sources' })).getAllByRole('button', { name: /^Source / });
    expect(sources.map((b) => b.getAttribute('aria-label'))).toEqual([
      'Source 1: Auth Migration', 'Source 2: Logout leaves the legacy shim cookie alive', 'Source 3: Tenant-by-tenant cutover', 'Source 4: Vera Green',
    ]);
    fireEvent.click(sources[0]);
    expect(onOpen).toHaveBeenCalledWith(initiative);
    expect(screen.getByText('Based on project roles and linked work.')).toBeInTheDocument();
  });

  it('opens a row and offers View these connections', () => {
    const onOpen = vi.fn(), onViewConnections = vi.fn();
    render(<CitedRecordList records={records} onOpen={onOpen} onViewConnections={onViewConnections} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Tenant-by-tenant cutover' }));
    expect(onOpen).toHaveBeenCalledWith(cutover);
    const view = screen.getByRole('button', { name: /View these connections/ });
    // One line: the arrow stays beside the words (svg is block under preflight).
    expect(view).toHaveClass('whitespace-nowrap', 'shrink-0', 'inline-flex', 'items-center');
    fireEvent.click(view);
    expect(onViewConnections).toHaveBeenCalledOnce();
  });

  it('omits sections with no records and renders nothing without records', () => {
    const { container, rerender } = render(<CitedRecordList records={[initiative, vera]} onOpen={vi.fn()} />);
    expect(screen.queryByRole('region', { name: 'Work to coordinate' })).toBeNull();
    rerender(<CitedRecordList records={[]} onOpen={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });
});
