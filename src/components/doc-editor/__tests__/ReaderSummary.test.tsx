import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { DocumentMeta, Section, TaskItem } from '../../../types/document';

vi.mock('../TiptapEditor', () => ({
  default: ({ editable }: { editable?: boolean }) => (
    <div data-testid="tiptap-mock" data-editable={editable ? 'true' : 'false'} />
  ),
}));

import {
  generateSummaryBullets,
  HeaderBanner,
  ExecutiveSummaryCard,
} from '../ReaderSummary';

function task(id: string, status: TaskItem['status']): TaskItem {
  return {
    id,
    text: `Task ${id}`,
    status,
    assignee: '',
    ackedBy: '',
    ackedAt: '',
    priority: 'medium',
    notes: '',
  };
}

function section(id: string, type: Section['type'], items: TaskItem[] = []): Section {
  return { id, type, title: id, collapsed: false, items };
}

function meta(overrides: Partial<DocumentMeta> = {}): DocumentMeta {
  return {
    id: 'doc-1',
    title: 'My Doc',
    sourceType: 'notes',
    sourceId: 'src-1',
    createdBy: 'alice@example.com',
    createdAt: '2026-03-04T00:00:00.000Z',
    aiModel: 'claude-opus-4-7',
    status: 'draft',
    ...overrides,
  };
}

afterEach(cleanup);

describe('generateSummaryBullets', () => {
  it('returns the empty-state line when there are no items', () => {
    expect(generateSummaryBullets([], [])).toEqual(['No action items recorded yet.']);
  });

  it('reports completion percentage, treating acked + done as completed', () => {
    const items = [
      task('a', 'acked'),
      task('b', 'done'),
      task('c', 'pending'),
      task('d', 'pending'),
    ];
    const bullets = generateSummaryBullets(items, []);
    expect(bullets[0]).toBe('4 action items identified, 2 completed (50%).');
    expect(bullets).toContain('2 items still pending review.');
  });

  it('singularizes "1 item" wording for items, pending, and rejected', () => {
    const items = [task('a', 'pending'), task('b', 'rejected')];
    const bullets = generateSummaryBullets(items, []);
    expect(bullets[0]).toBe('2 action items identified, 0 completed (0%).');
    expect(bullets).toContain('1 item still pending review.');
    expect(bullets).toContain('1 item rejected and needs revision.');
  });

  it('pluralizes rejected count above 1', () => {
    const items = [task('r1', 'rejected'), task('r2', 'rejected')];
    expect(generateSummaryBullets(items, [])).toContain('2 items rejected and need revision.');
  });

  it('adds a decisions line with "N finalized" when any decisions are acked', () => {
    const decisions = section('d1', 'decisions', [
      task('x', 'acked'),
      task('y', 'pending'),
    ]);
    const bullets = generateSummaryBullets(decisions.items, [decisions]);
    expect(bullets).toContain('2 key decisions recorded, 1 finalized.');
  });

  it('omits the "finalized" suffix when no decision items are acked/done', () => {
    const decisions = section('d1', 'decisions', [task('x', 'pending')]);
    const bullets = generateSummaryBullets(decisions.items, [decisions]);
    expect(bullets).toContain('1 key decision recorded.');
  });
});

describe('HeaderBanner', () => {
  it('falls back to "Untitled Document" when title is empty', () => {
    render(<HeaderBanner meta={meta({ title: '' })} participantCount={0} />);
    expect(screen.getByText('Untitled Document')).toBeInTheDocument();
  });

  it('applies the review badge palette', () => {
    render(<HeaderBanner meta={meta({ status: 'review' })} participantCount={0} />);
    const style = screen.getByText('review').getAttribute('style') ?? '';
    expect(style).toContain('rgb(219, 234, 254)');
    expect(style).toContain('rgb(30, 64, 175)');
  });

  it('applies the final badge palette', () => {
    render(<HeaderBanner meta={meta({ status: 'final' })} participantCount={0} />);
    const style = screen.getByText('final').getAttribute('style') ?? '';
    expect(style).toContain('rgb(209, 250, 229)');
    expect(style).toContain('rgb(6, 95, 70)');
  });

  it('falls back to draft palette for an unknown status', () => {
    render(<HeaderBanner meta={meta({ status: 'archived' as DocumentMeta['status'] })} participantCount={0} />);
    const style = screen.getByText('archived').getAttribute('style') ?? '';
    expect(style).toContain('rgb(254, 243, 199)');
    expect(style).toContain('rgb(146, 64, 14)');
  });

  it('prefers createdByName over the raw createdBy address', () => {
    render(
      <HeaderBanner
        meta={meta({ createdBy: 'alice@example.com', createdByName: 'Alice' })}
        participantCount={0}
      />,
    );
    expect(screen.getByText(/Created by Alice/)).toBeInTheDocument();
    expect(screen.queryByText(/alice@example.com/)).toBeNull();
  });

  it('renders the singular "1 participant" form', () => {
    render(<HeaderBanner meta={meta()} participantCount={1} />);
    expect(screen.getByText(/1 participant\b/)).toBeInTheDocument();
  });

  it('renders the plural form for 2+ participants', () => {
    render(<HeaderBanner meta={meta()} participantCount={3} />);
    expect(screen.getByText(/3 participants/)).toBeInTheDocument();
  });

  it('omits the participants suffix when count is zero', () => {
    const { container } = render(<HeaderBanner meta={meta()} participantCount={0} />);
    expect(container.textContent).not.toMatch(/participant/);
  });
});

describe('ExecutiveSummaryCard', () => {
  it('renders bullets as <li> entries', () => {
    render(<ExecutiveSummaryCard bullets={['First', 'Second']} />);
    const items = screen.getAllByRole('listitem');
    expect(items.map((li) => li.textContent)).toEqual(['First', 'Second']);
  });

  it('shows the contentText pane when provided and no fragment exists', () => {
    render(<ExecutiveSummaryCard bullets={['x']} contentText="  Trim me  " />);
    expect(screen.getByText('Trim me')).toBeInTheDocument();
    expect(screen.queryByTestId('tiptap-mock')).toBeNull();
  });

  it('omits both panes when contentText is whitespace and no fragment exists', () => {
    const { container } = render(
      <ExecutiveSummaryCard bullets={['only bullets']} contentText="   " />,
    );
    expect(screen.queryByTestId('tiptap-mock')).toBeNull();
    // No content panel — only the bullets list and header
    expect(container.querySelectorAll('div[class*="border-l-\\[#8b5cf6\\]"]').length).toBe(0);
  });

  it('renders the Tiptap pane (read-only) when fragment + ydoc are present', () => {
    const fragment = {} as Parameters<typeof ExecutiveSummaryCard>[0]['fragment'];
    const ydoc = {} as Parameters<typeof ExecutiveSummaryCard>[0]['ydoc'];
    render(
      <ExecutiveSummaryCard
        bullets={[]}
        fragment={fragment}
        ydoc={ydoc}
      />,
    );
    const tiptap = screen.getByTestId('tiptap-mock');
    expect(tiptap).toBeInTheDocument();
    expect(tiptap.getAttribute('data-editable')).toBe('false');
  });

  it('does not render the Tiptap pane when ydoc is missing even if fragment is provided', () => {
    const fragment = {} as Parameters<typeof ExecutiveSummaryCard>[0]['fragment'];
    render(<ExecutiveSummaryCard bullets={[]} fragment={fragment} />);
    expect(screen.queryByTestId('tiptap-mock')).toBeNull();
  });
});
