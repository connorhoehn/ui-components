import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryInspector } from '../MemoryInspector';
import type { MemoryEntry } from '../MemoryInspector';

function makeEntry(overrides: Partial<MemoryEntry> = {}): MemoryEntry {
  return {
    id: 'm-1',
    scope: 'session',
    key: 'user.id',
    value: 'alice',
    createdAt: '2026-05-17T03:04:05Z',
    ...overrides,
  };
}

describe('MemoryInspector', () => {
  it('empty list renders "No memory entries" placeholder with 0/0 header counts', () => {
    render(<MemoryInspector entries={[]} />);
    expect(screen.getByText('No memory entries')).toBeInTheDocument();
    expect(screen.getByText('0 session · 0 long-term')).toBeInTheDocument();
  });

  it('renders one row per entry with key and value', () => {
    render(
      <MemoryInspector
        entries={[
          makeEntry({ id: 'a', key: 'name', value: 'alice' }),
          makeEntry({ id: 'b', key: 'role', value: 'admin' }),
        ]}
      />,
    );
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('alice')).toBeInTheDocument();
    expect(screen.getByText('role')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('header counts session and long-term scopes separately', () => {
    render(
      <MemoryInspector
        entries={[
          makeEntry({ id: 's1', scope: 'session' }),
          makeEntry({ id: 's2', scope: 'session' }),
          makeEntry({ id: 'l1', scope: 'long-term' }),
        ]}
      />,
    );
    expect(screen.getByText('2 session · 1 long-term')).toBeInTheDocument();
  });

  it('session-scope chip uses info-tone color classes', () => {
    render(<MemoryInspector entries={[makeEntry({ scope: 'session' })]} />);
    // "session" appears in both the filter button and the scope chip — pick the chip via its bg class.
    const chips = screen.getAllByText('session');
    const chip = chips.find((el) => el.className.includes('bg-info-bg'));
    expect(chip).toBeDefined();
    expect(chip).toHaveClass('text-info-fg');
  });

  it('long-term-scope chip uses accent-tone color classes', () => {
    render(<MemoryInspector entries={[makeEntry({ scope: 'long-term' })]} />);
    // there are two 'long-term' texts on the page: filter button + chip. Find the chip via class.
    const chips = screen.getAllByText('long-term');
    const chip = chips.find((el) => el.className.includes('bg-accent-bg'));
    expect(chip).toBeDefined();
    expect(chip).toHaveClass('text-accent-fg');
  });

  it('renders namespace prefix with trailing slash when present', () => {
    render(
      <MemoryInspector entries={[makeEntry({ namespace: 'tenant-acme' })]} />,
    );
    expect(screen.getByText('tenant-acme/')).toBeInTheDocument();
  });

  it('omits namespace prefix when absent', () => {
    render(<MemoryInspector entries={[makeEntry({ namespace: undefined })]} />);
    expect(screen.queryByText(/\/$/)).not.toBeInTheDocument();
  });

  it('filter toggle: clicking "session" hides long-term entries', () => {
    render(
      <MemoryInspector
        entries={[
          makeEntry({ id: 's', scope: 'session', key: 'session-key' }),
          makeEntry({ id: 'l', scope: 'long-term', key: 'long-key' }),
        ]}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'session' }));
    expect(screen.getByText('session-key')).toBeInTheDocument();
    expect(screen.queryByText('long-key')).not.toBeInTheDocument();
  });

  it('filter toggle: clicking "long-term" hides session entries', () => {
    render(
      <MemoryInspector
        entries={[
          makeEntry({ id: 's', scope: 'session', key: 'session-key' }),
          makeEntry({ id: 'l', scope: 'long-term', key: 'long-key' }),
        ]}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'long-term' }));
    expect(screen.queryByText('session-key')).not.toBeInTheDocument();
    expect(screen.getByText('long-key')).toBeInTheDocument();
  });

  it('search filter is case-insensitive against the key', () => {
    render(
      <MemoryInspector
        entries={[
          makeEntry({ id: 'a', key: 'UserName', value: 'alice' }),
          makeEntry({ id: 'b', key: 'role', value: 'admin' }),
        ]}
      />,
    );
    const input = screen.getByPlaceholderText('Search keys/values...');
    fireEvent.change(input, { target: { value: 'username' } });
    expect(screen.getByText('UserName')).toBeInTheDocument();
    expect(screen.queryByText('role')).not.toBeInTheDocument();
  });

  it('search filter also matches against the value', () => {
    render(
      <MemoryInspector
        entries={[
          makeEntry({ id: 'a', key: 'k1', value: 'needle' }),
          makeEntry({ id: 'b', key: 'k2', value: 'haystack' }),
        ]}
      />,
    );
    const input = screen.getByPlaceholderText('Search keys/values...');
    fireEvent.change(input, { target: { value: 'needle' } });
    expect(screen.getByText('k1')).toBeInTheDocument();
    expect(screen.queryByText('k2')).not.toBeInTheDocument();
  });

  it('renders "No matches" when filter/search produce empty result over non-empty entries', () => {
    render(
      <MemoryInspector entries={[makeEntry({ key: 'something', value: 'x' })]} />,
    );
    const input = screen.getByPlaceholderText('Search keys/values...');
    fireEvent.change(input, { target: { value: 'zzz-nothing-matches' } });
    expect(screen.getByText('No matches')).toBeInTheDocument();
    expect(screen.queryByText('No memory entries')).not.toBeInTheDocument();
  });

  it('pretty-prints valid-JSON values with 2-space indentation', () => {
    render(
      <MemoryInspector
        entries={[makeEntry({ value: '{"x":1,"y":2}' })]}
      />,
    );
    const valueBlock = screen.getByText(/"x":\s*1/);
    expect(valueBlock.textContent).toContain('\n');
    expect(valueBlock.textContent).toContain('  ');
  });

  it('falls back to raw string when value is not valid JSON', () => {
    render(<MemoryInspector entries={[makeEntry({ value: 'not-json' })]} />);
    expect(screen.getByText('not-json')).toBeInTheDocument();
  });

  it('renders delete control only when onDelete is provided', () => {
    const { rerender } = render(<MemoryInspector entries={[makeEntry()]} />);
    expect(screen.queryByText('delete')).not.toBeInTheDocument();

    rerender(<MemoryInspector entries={[makeEntry()]} onDelete={() => {}} />);
    expect(screen.getByText('delete')).toBeInTheDocument();
  });

  it('delete control fires onDelete with the entry id', () => {
    const onDelete = vi.fn();
    render(
      <MemoryInspector
        entries={[makeEntry({ id: 'target' })]}
        onDelete={onDelete}
      />,
    );
    fireEvent.click(screen.getByText('delete'));
    expect(onDelete).toHaveBeenCalledWith('target');
  });

  it('renders TTL line when ttl is set, omits when missing', () => {
    const { rerender } = render(
      <MemoryInspector entries={[makeEntry({ ttl: 300 })]} />,
    );
    expect(screen.getByText('· TTL 300s')).toBeInTheDocument();

    rerender(<MemoryInspector entries={[makeEntry({ ttl: undefined })]} />);
    expect(screen.queryByText(/TTL/)).not.toBeInTheDocument();
  });

  it('applies extra className to the wrapper', () => {
    const { container } = render(
      <MemoryInspector entries={[]} className="extra-wrap" />,
    );
    expect(container.firstChild).toHaveClass('extra-wrap');
  });
});

// REGRESSION: the per-entry delete control is `opacity-0` and was revealed
// only by `group-hover:opacity-100`. A keyboard user tabbing through the
// memory list landed on a fully invisible "delete" button — no way to see
// which control had focus, or what was about to be destroyed. The reveal has
// to fire on keyboard focus too.
describe('MemoryInspector — the delete control must be visible when focused', () => {
  it('reveals delete on focus, not only on hover', () => {
    render(<MemoryInspector entries={[makeEntry()]} onDelete={() => {}} />);

    const del = screen.getByRole('button', { name: 'delete' });
    expect(del.className).toContain('opacity-0');
    expect(del.className).toContain('group-hover:opacity-100');
    // The half that was missing:
    expect(del.className).toContain('focus-visible:opacity-100');
  });
});
