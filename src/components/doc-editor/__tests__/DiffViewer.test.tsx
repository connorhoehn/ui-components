import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { SnapshotSection } from '../../../hooks/useVersionHistory';
import DiffViewer from '../DiffViewer';

afterEach(cleanup);

function item(
  overrides: Partial<SnapshotSection['items'][number]> = {},
): SnapshotSection['items'][number] {
  return {
    id: 'i1',
    text: 'do thing',
    status: 'open',
    assignee: 'Alice',
    priority: 'normal',
    ...overrides,
  };
}

function section(overrides: Partial<SnapshotSection> = {}): SnapshotSection {
  return {
    id: 's1',
    type: 'section',
    title: 'Intro',
    textContent: '',
    items: [],
    ...overrides,
  };
}

describe('DiffViewer — no changes', () => {
  it('shows the empty banner when both snapshots are identical', () => {
    const s = [section({ items: [item()] })];
    render(<DiffViewer oldSections={s} newSections={s} onClose={() => {}} />);
    expect(screen.getByText(/No differences found/)).toBeInTheDocument();
    expect(screen.queryByText('added')).toBeNull();
    expect(screen.queryByText('removed')).toBeNull();
    expect(screen.queryByText('modified')).toBeNull();
  });

  it('still renders the Dismiss button when there are no changes', () => {
    render(<DiffViewer oldSections={[]} newSections={[]} onClose={() => {}} />);
    expect(screen.getByRole('button', { name: /Dismiss/ })).toBeInTheDocument();
  });
});

describe('DiffViewer — section status', () => {
  it('renders an ADDED badge for a brand-new section', () => {
    const cur = [section({ id: 'a', title: 'New Section' })];
    render(<DiffViewer oldSections={[]} newSections={cur} onClose={() => {}} />);
    expect(screen.getByText('added')).toBeInTheDocument();
    expect(screen.getByText('New Section')).toBeInTheDocument();
  });

  it('renders a REMOVED badge for a deleted section', () => {
    const old = [section({ id: 'a', title: 'Old Section' })];
    render(<DiffViewer oldSections={old} newSections={[]} onClose={() => {}} />);
    expect(screen.getByText('removed')).toBeInTheDocument();
    expect(screen.getByText('Old Section')).toBeInTheDocument();
  });

  it('renders a MODIFIED badge when items change', () => {
    const old = [section({ id: 'a', items: [item({ id: 'i1', text: 'before' })] })];
    const cur = [section({ id: 'a', items: [item({ id: 'i1', text: 'after' })] })];
    render(<DiffViewer oldSections={old} newSections={cur} onClose={() => {}} />);
    expect(screen.getByText('modified')).toBeInTheDocument();
  });

  it('omits unchanged sections and only renders changed ones', () => {
    const same = section({ id: 'a', title: 'Stable' });
    const added = section({ id: 'b', title: 'Fresh' });
    render(
      <DiffViewer
        oldSections={[same]}
        newSections={[same, added]}
        onClose={() => {}}
      />,
    );
    expect(screen.queryByText('Stable')).toBeNull();
    expect(screen.getByText('Fresh')).toBeInTheDocument();
  });
});

describe('DiffViewer — title change annotation', () => {
  it('shows the (was: "old") annotation when only the title changed', () => {
    const old = [section({ id: 'a', title: 'Original' })];
    const cur = [section({ id: 'a', title: 'Renamed' })];
    render(<DiffViewer oldSections={old} newSections={cur} onClose={() => {}} />);
    expect(screen.getByText('(was: "Original")')).toBeInTheDocument();
    expect(screen.getByText('Renamed')).toBeInTheDocument();
  });

  it('shows the "Only the section title changed" fallback line', () => {
    const old = [section({ id: 'a', title: 'Original' })];
    const cur = [section({ id: 'a', title: 'Renamed' })];
    render(<DiffViewer oldSections={old} newSections={cur} onClose={() => {}} />);
    expect(screen.getByText(/Only the section title changed/)).toBeInTheDocument();
  });
});

describe('DiffViewer — item-level diff', () => {
  it('prefixes added items with "+ " and shows assignee in brackets', () => {
    const cur = [
      section({ id: 'a', items: [item({ id: 'i1', text: 'fresh', assignee: 'Bob' })] }),
    ];
    render(
      <DiffViewer oldSections={[section({ id: 'a' })]} newSections={cur} onClose={() => {}} />,
    );
    expect(screen.getByText('+ fresh [Bob]')).toBeInTheDocument();
  });

  it('omits the bracketed assignee when the item has no assignee', () => {
    const cur = [
      section({ id: 'a', items: [item({ id: 'i1', text: 'lonely', assignee: '' })] }),
    ];
    render(
      <DiffViewer oldSections={[section({ id: 'a' })]} newSections={cur} onClose={() => {}} />,
    );
    expect(screen.getByText('+ lonely')).toBeInTheDocument();
  });

  it('prefixes removed items with "- "', () => {
    const old = [
      section({ id: 'a', items: [item({ id: 'i1', text: 'gone', assignee: '' })] }),
    ];
    render(
      <DiffViewer oldSections={old} newSections={[section({ id: 'a' })]} onClose={() => {}} />,
    );
    expect(screen.getByText('- gone')).toBeInTheDocument();
  });

  it('prefixes modified items with "~ " and lists per-axis change notes', () => {
    const old = [
      section({
        id: 'a',
        items: [item({ id: 'i1', text: 't', status: 'open', assignee: 'Alice', priority: 'low' })],
      }),
    ];
    const cur = [
      section({
        id: 'a',
        items: [item({ id: 'i1', text: 't2', status: 'done', assignee: 'Bob', priority: 'high' })],
      }),
    ];
    render(<DiffViewer oldSections={old} newSections={cur} onClose={() => {}} />);
    expect(screen.getByText('~ t2 [Bob]')).toBeInTheDocument();
    expect(
      screen.getByText(
        /text, status: open -> done, assignee: "Alice" -> "Bob", priority: low -> high/,
      ),
    ).toBeInTheDocument();
  });
});

describe('DiffViewer — text content diff', () => {
  it('renders old and new text blocks when textContent changes', () => {
    const old = [section({ id: 'a', textContent: 'first version of text' })];
    const cur = [section({ id: 'a', textContent: 'second version of text' })];
    render(<DiffViewer oldSections={old} newSections={cur} onClose={() => {}} />);
    expect(screen.getByText('first version of text')).toBeInTheDocument();
    expect(screen.getByText('second version of text')).toBeInTheDocument();
  });

  it('truncates text content longer than 200 chars with an ellipsis', () => {
    const long = 'x'.repeat(250);
    const old = [section({ id: 'a', textContent: long })];
    const cur = [section({ id: 'a', textContent: 'short' })];
    render(<DiffViewer oldSections={old} newSections={cur} onClose={() => {}} />);
    expect(screen.getByText('x'.repeat(200) + '...')).toBeInTheDocument();
    expect(screen.getByText('short')).toBeInTheDocument();
  });
});

describe('DiffViewer — Dismiss', () => {
  it('fires onClose when the Dismiss button is clicked', () => {
    const onClose = vi.fn();
    render(<DiffViewer oldSections={[]} newSections={[]} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /Dismiss/ }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
