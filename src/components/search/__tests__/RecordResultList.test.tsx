import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RecordResultList, type RecordResultListProps } from '../RecordResultList';
import type { RecordResultItem } from '../recordMarks';

afterEach(cleanup);

const vera: RecordResultItem = { id: 'p-001', type: 'person', title: 'Vera Green', subtitle: 'Owner · Auth Migration', matchReason: 'Matched through initiative membership', href: '/people/p-001' };
const cutover: RecordResultItem = { id: 'w-1', type: 'work', title: 'Tenant-by-tenant cutover', subtitle: 'Auth Migration · Nora Chang', status: 'blocked', href: '/work/w-1' };
const logout: RecordResultItem = { id: 'w-2', type: 'work', title: 'Logout leaves the legacy shim cookie alive', status: 'open', href: '/work/w-2' };
const done: RecordResultItem = { id: 'w-3', type: 'work', title: 'Retire SAML metadata', status: 'done', href: '/work/w-3' };
const contracts: RecordResultItem = { id: 'w-4', type: 'work', title: 'Publish typed component contracts', description: 'Typed component contracts for every export.', status: 'in_progress', href: '/work/w-4' };

function setup(overrides: Partial<RecordResultListProps> = {}) {
  const props: RecordResultListProps = {
    groups: [
      { id: 'person', label: 'People', count: 1, records: [vera] },
      { id: 'work', label: 'Work', count: 4, records: [cutover, logout, done], onSeeAll: vi.fn() },
      { id: 'decision', label: 'Decisions', count: 2, records: [], collapsed: true },
    ],
    selectedKeys: [],
    onToggleSelect: vi.fn(),
    onOpen: vi.fn(),
    ...overrides,
  };
  render(<RecordResultList {...props} />);
  return props;
}

describe('RecordResultList', () => {
  it('draws group headings with counts and a See all when the host holds more', () => {
    const props = setup();
    const work = screen.getByRole('region', { name: 'Work' });
    expect(within(work).getByText('4')).toBeInTheDocument();
    fireEvent.click(within(work).getByRole('button', { name: 'See all 4' }));
    expect(props.groups[1].onSeeAll).toHaveBeenCalledOnce();
    expect(within(screen.getByRole('region', { name: 'People' })).queryByText(/See all/)).toBeNull();
  });

  it('toggles selection without opening, and tints selected rows', () => {
    const props = setup({ selectedKeys: ['work:w-1'] });
    fireEvent.click(screen.getByLabelText('Select Vera Green'));
    expect(props.onToggleSelect).toHaveBeenCalledWith(vera);
    expect(props.onOpen).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Select Tenant-by-tenant cutover')).toBeChecked();
    expect(document.querySelector('[data-record-key="work:w-1"]')).toHaveClass('bg-primary/5');
  });

  it('opens from the chevron, the title and the row, keeping modified clicks native', () => {
    const props = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open Vera Green' }));
    fireEvent.click(screen.getByRole('link', { name: 'Tenant-by-tenant cutover' }));
    fireEvent.click(screen.getByText('Owner · Auth Migration · Matched through initiative membership'));
    expect(props.onOpen).toHaveBeenCalledTimes(3);
    expect(props.onOpen).toHaveBeenNthCalledWith(2, cutover);
    fireEvent.click(screen.getByRole('link', { name: 'Tenant-by-tenant cutover' }), { metaKey: true });
    expect(props.onOpen).toHaveBeenCalledTimes(3);
  });

  it('uses a labelled open link when openLabel is supplied', () => {
    const props = setup({ openLabel: (r) => (r.type === 'work' ? 'Open work item' : 'Open person') });
    expect(screen.queryByRole('button', { name: 'Open Vera Green' })).toBeNull();
    const links = screen.getAllByRole('link', { name: 'Open work item' });
    expect(links[0]).toHaveAttribute('href', '/work/w-1');
    fireEvent.click(links[0]);
    expect(props.onOpen).toHaveBeenCalledWith(cutover);
  });

  it('marks highlight terms in titles and descriptions', () => {
    setup({ groups: [{ id: 'work', label: 'Work', count: 1, records: [contracts] }], highlightTerms: ['component contracts'] });
    const marks = [...document.querySelectorAll('mark')].map((m) => m.textContent);
    expect(marks).toEqual(['component contracts', 'component contracts']);
  });

  it('tones status: blocked danger, open/in progress success, done neutral', () => {
    setup();
    const tones = screen.getAllByTestId('record-status').map((s) => [s.textContent, s.getAttribute('data-tone')]);
    expect(tones).toEqual([['Blocked', 'danger'], ['Open', 'success'], ['Done', 'neutral']]);
  });

  it('collapsed groups show only the heading', () => {
    setup();
    const decisions = screen.getByRole('region', { name: 'Decisions' });
    expect(within(decisions).queryByRole('listitem')).toBeNull();
    expect(within(decisions).getByText('Decisions')).toBeInTheDocument();
  });

  it('expands a group through onToggleGroup', () => {
    const onToggleGroup = vi.fn();
    const props = setup({ onToggleGroup });
    const button = within(screen.getByRole('region', { name: 'Decisions' })).getByRole('button', { expanded: false });
    fireEvent.click(button);
    expect(onToggleGroup).toHaveBeenCalledWith(props.groups[2]);
  });

  it('shows loading, error with retry, and empty states without rows', () => {
    const onRetry = vi.fn();
    const { rerender } = render(<RecordResultList groups={[]} selectedKeys={[]} onToggleSelect={vi.fn()} onOpen={vi.fn()} loading />);
    expect(screen.getByRole('status')).toHaveTextContent('Searching');
    rerender(<RecordResultList groups={[{ id: 'person', label: 'People', count: 1, records: [vera] }]} selectedKeys={[]} onToggleSelect={vi.fn()} onOpen={vi.fn()} error="Search is unavailable" onRetry={onRetry} hint="Select results" />);
    expect(screen.queryByText('Vera Green')).toBeNull();
    expect(screen.queryByText('Select results')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledOnce();
    rerender(<RecordResultList groups={[]} selectedKeys={[]} onToggleSelect={vi.fn()} onOpen={vi.fn()} emptyState={{ title: 'Nothing matched' }} />);
    expect(screen.getByText('Nothing matched')).toBeInTheDocument();
  });

  it('renders footer and hint', () => {
    setup({ footer: '2 results in Design System API', hint: 'Select results to ask about them or view their connections.' });
    expect(screen.getByText('2 results in Design System API')).toBeInTheDocument();
    expect(screen.getByText('Select results to ask about them or view their connections.')).toBeInTheDocument();
  });
});
