import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MasterDetail } from '../MasterDetail';

interface Item {
  id: string;
  title: string;
}

const ITEMS: Item[] = [
  { id: 'a', title: 'Alpha' },
  { id: 'b', title: 'Bravo' },
  { id: 'c', title: 'Charlie' },
];

function Harness({ selectedKey, storageKey }: { selectedKey: string | null; storageKey?: string }) {
  return (
    <MasterDetail
      items={ITEMS}
      keyOf={(i) => i.id}
      selectedKey={selectedKey}
      onSelect={() => {}}
      storageKey={storageKey}
      renderRow={(i, _idx, sel) => <span data-testid={`row-${i.id}`}>{sel ? `> ${i.title}` : i.title}</span>}
      renderDetail={(i) => <div data-testid="detail">{i.title} detail</div>}
      emptyDetail={<div data-testid="empty">Nothing selected</div>}
    />
  );
}

beforeEach(() => {
  try {
    window.localStorage.clear();
  } catch {
    // ignore
  }
});
afterEach(cleanup);

describe('MasterDetail', () => {
  it('renders every row and the detail for the selected item', () => {
    render(<Harness selectedKey="b" />);
    expect(screen.getByTestId('row-a')).toBeInTheDocument();
    expect(screen.getByTestId('row-b')).toHaveTextContent('> Bravo');
    expect(screen.getByTestId('detail')).toHaveTextContent('Bravo detail');
  });

  it('renders emptyDetail when selectedKey resolves to nothing', () => {
    render(<Harness selectedKey={null} />);
    expect(screen.getByTestId('empty')).toBeInTheDocument();
    expect(screen.queryByTestId('detail')).not.toBeInTheDocument();
  });

  it('calls onSelect with the row key on click', () => {
    let selected: string | null = null;
    render(
      <MasterDetail
        items={ITEMS}
        keyOf={(i) => i.id}
        selectedKey={null}
        onSelect={(key) => {
          selected = key;
        }}
        renderRow={(i) => <span>{i.title}</span>}
        renderDetail={() => null}
      />,
    );
    fireEvent.click(screen.getByTestId('master-detail-row-c'));
    expect(selected).toBe('c');
  });

  it('marks the selected row aria-current', () => {
    render(<Harness selectedKey="a" />);
    expect(screen.getByTestId('master-detail-row-a')).toHaveAttribute('aria-current', 'true');
    expect(screen.getByTestId('master-detail-row-b')).toHaveAttribute('aria-current', 'false');
  });

  it('persists the compact toggle under storageKey and restores it on remount', () => {
    const storageKey = 'test-master-detail-mode';
    const { unmount } = render(<Harness selectedKey="a" storageKey={storageKey} />);

    // Expanded by default: the full row content ("Alpha") renders.
    expect(screen.getByTestId('row-a')).toHaveTextContent('Alpha');

    fireEvent.click(screen.getByTestId('master-detail-toggle'));
    // Compact mode falls back to the index badge, not renderRow's content.
    expect(screen.queryByTestId('row-a')).not.toBeInTheDocument();
    expect(window.localStorage.getItem(storageKey)).toBe('compact');

    unmount();
    render(<Harness selectedKey="a" storageKey={storageKey} />);
    // Mode restored from storage: still compact, so the expanded row is absent.
    expect(screen.queryByTestId('row-a')).not.toBeInTheDocument();
  });

  it('moves selection with ArrowDown/ArrowUp inside the rail', () => {
    const seen: string[] = [];
    render(
      <MasterDetail
        items={ITEMS}
        keyOf={(i) => i.id}
        selectedKey="a"
        onSelect={(key) => seen.push(key)}
        renderRow={(i) => <span>{i.title}</span>}
        renderDetail={() => null}
      />,
    );
    fireEvent.keyDown(screen.getByTestId('master-detail-rail'), { key: 'ArrowDown' });
    expect(seen).toEqual(['b']);
  });
});
