import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as Y from 'yjs';
import type { XmlFragment } from 'yjs';
import type { ComponentProps } from 'react';
import ChunkViewer from '../ChunkViewer';
import type { Section, TaskItem, CommentThread, Participant } from '../../../types/document';

interface TiptapCaptured { fragment: XmlFragment | null; editable: boolean; sectionId: string; }
const tiptap: TiptapCaptured[] = [];
vi.mock('../TiptapEditor', () => ({
  default: (props: TiptapCaptured) => {
    tiptap.push(props);
    return <div
      data-testid="tiptap"
      data-section-id={props.sectionId}
      data-editable={String(props.editable)} />;
  },
}));

interface ReviewableCaptured {
  item: TaskItem;
  onAck: (notes?: string) => void;
  onReject: (reason: string) => void;
}
const reviewable: ReviewableCaptured[] = [];
vi.mock('../ReviewableItem', () => ({
  default: (props: ReviewableCaptured) => {
    reviewable.push(props);
    return <div data-testid="reviewable-item" data-item-id={props.item.id} />;
  },
}));

interface SectionCommentsCaptured {
  comments: CommentThread[];
  onAddComment: (text: string, parentCommentId?: string | null) => void;
  participants?: Participant[];
  onResolveThread?: (commentId: string) => void;
  onUnresolveThread?: (commentId: string) => void;
}
const sectionComments: SectionCommentsCaptured[] = [];
vi.mock('../SectionComments', () => ({
  default: (props: SectionCommentsCaptured) => {
    sectionComments.push(props);
    return <div data-testid="section-comments" />;
  },
}));

const mkItem = (id: string, overrides: Partial<TaskItem> = {}): TaskItem => ({
  id, text: `task ${id}`, status: 'pending', assignee: '',
  ackedBy: '', ackedAt: '', priority: 'medium', notes: '', ...overrides,
});

const mkSection = (overrides: Partial<Section> = {}): Section => ({
  id: 's1', type: 'notes', title: 'Section title', collapsed: false, items: [], ...overrides,
});

function renderViewer(overrides: Partial<ComponentProps<typeof ChunkViewer>> = {}) {
  const props: ComponentProps<typeof ChunkViewer> = {
    section: mkSection(), onAckItem: vi.fn(), onRejectItem: vi.fn(),
    fragment: null, ydoc: new Y.Doc(), provider: null,
    ...overrides,
  };
  return { ...render(<ChunkViewer {...props} />), props };
}

beforeEach(() => {
  tiptap.length = 0;
  reviewable.length = 0;
  sectionComments.length = 0;
});

describe('ChunkViewer', () => {
  it('renders the section title and the type-text badge', () => {
    renderViewer({ section: mkSection({ title: 'Decisions made', type: 'decisions' }) });
    expect(screen.getByText('Decisions made')).toBeInTheDocument();
    expect(screen.getByText('decisions')).toBeInTheDocument();
  });

  it('type badge uses type-specific background/color for summary, tasks, and custom', () => {
    const { rerender, props } = renderViewer({ section: mkSection({ type: 'summary' }) });
    expect(screen.getByText('summary')).toHaveStyle({ background: 'var(--color-info-bg)', color: 'var(--color-info-fg)' });
    rerender(<ChunkViewer {...props} section={mkSection({ type: 'tasks' })} />);
    expect(screen.getByText('tasks')).toHaveStyle({ background: 'var(--color-warning-bg)', color: 'var(--color-warning-fg)' });
    rerender(<ChunkViewer {...props} section={mkSection({ type: 'custom' })} />);
    expect(screen.getByText('custom')).toHaveStyle({ background: 'var(--color-primary-bg)', color: 'var(--color-primary-fg)' });
  });

  it('renders TiptapEditor only when fragment is non-null; passes editable=false + section.id', () => {
    const frag = {} as XmlFragment;
    const { rerender, props } = renderViewer({ fragment: frag, section: mkSection({ id: 's-test' }) });
    expect(screen.getByTestId('tiptap')).toBeInTheDocument();
    expect(tiptap[0].fragment).toBe(frag);
    expect(tiptap[0].sectionId).toBe('s-test');
    expect(tiptap[0].editable).toBe(false);
    tiptap.length = 0;
    rerender(<ChunkViewer {...props} fragment={null} />);
    expect(screen.queryByTestId('tiptap')).toBeNull();
    expect(tiptap).toHaveLength(0);
  });

  it('empty-state message renders ONLY when fragment is null AND items is empty', () => {
    const { rerender, props } = renderViewer({
      fragment: null, section: mkSection({ type: 'tasks', items: [] }),
    });
    expect(screen.getByText(/This tasks section has no content/)).toBeInTheDocument();
    rerender(<ChunkViewer {...props} fragment={{} as XmlFragment} />);
    expect(screen.queryByText(/has no content/)).toBeNull();
    rerender(<ChunkViewer {...props} fragment={null} section={mkSection({ items: [mkItem('a')] })} />);
    expect(screen.queryByText(/has no content/)).toBeNull();
  });

  it('renders one ReviewableItem per section.items in order', () => {
    renderViewer({ section: mkSection({ items: [mkItem('a'), mkItem('b'), mkItem('c')] }) });
    const rows = screen.getAllByTestId('reviewable-item');
    expect(rows.map(r => r.dataset.itemId)).toEqual(['a', 'b', 'c']);
    expect(reviewable.map(c => c.item.id)).toEqual(['a', 'b', 'c']);
  });

  it('reviewed counter: only non-pending statuses count as reviewed', () => {
    renderViewer({
      section: mkSection({
        items: [
          mkItem('a', { status: 'pending' }),
          mkItem('b', { status: 'acked' }),
          mkItem('c', { status: 'rejected' }),
        ],
      }),
    });
    expect(screen.getByText(/2 of 3 items reviewed/)).toBeInTheDocument();
  });

  it('reviewed counter: 0 of N when all items are pending', () => {
    renderViewer({ section: mkSection({ items: [mkItem('a'), mkItem('b'), mkItem('c')] }) });
    expect(screen.getByText(/0 of 3 items reviewed/)).toBeInTheDocument();
  });

  it('reviewed counter: N of N when all items are done', () => {
    renderViewer({
      section: mkSection({
        items: [mkItem('a', { status: 'done' }), mkItem('b', { status: 'done' })],
      }),
    });
    expect(screen.getByText(/2 of 2 items reviewed/)).toBeInTheDocument();
  });

  it('per-item onAck proxy routes to onAckItem(item.id, notes); notes undefined when omitted', () => {
    const onAckItem = vi.fn();
    renderViewer({
      section: mkSection({ items: [mkItem('a'), mkItem('b')] }), onAckItem,
    });
    reviewable[1].onAck('looks good');
    expect(onAckItem).toHaveBeenCalledWith('b', 'looks good');
    reviewable[0].onAck();
    expect(onAckItem).toHaveBeenCalledWith('a', undefined);
  });

  it('per-item onReject proxy routes to onRejectItem(item.id, reason)', () => {
    const onRejectItem = vi.fn();
    renderViewer({
      section: mkSection({ items: [mkItem('a'), mkItem('b')] }), onRejectItem,
    });
    reviewable[1].onReject('incomplete');
    expect(onRejectItem).toHaveBeenCalledWith('b', 'incomplete');
  });

  it('SectionComments renders only when onAddComment is provided', () => {
    const { rerender, props } = renderViewer({});
    expect(screen.queryByTestId('section-comments')).toBeNull();
    expect(sectionComments).toHaveLength(0);
    rerender(<ChunkViewer {...props} onAddComment={vi.fn()} />);
    expect(screen.getByTestId('section-comments')).toBeInTheDocument();
    expect(sectionComments).toHaveLength(1);
  });

  it('SectionComments receives the routed comments / participants / resolve handlers', () => {
    const onAddComment = vi.fn();
    const onResolveThread = vi.fn();
    const onUnresolveThread = vi.fn();
    const comments = [{ id: 'cmt-1' } as CommentThread];
    const participants: Participant[] = [{
      clientId: 'c', userId: 'u', displayName: 'A',
      color: '#fff', mode: 'editor', currentSectionId: 's1',
    }];
    renderViewer({ onAddComment, onResolveThread, onUnresolveThread, comments, participants });
    const cap = sectionComments[0];
    expect(cap.comments).toBe(comments);
    expect(cap.onAddComment).toBe(onAddComment);
    expect(cap.onResolveThread).toBe(onResolveThread);
    expect(cap.onUnresolveThread).toBe(onUnresolveThread);
    expect(cap.participants).toBe(participants);
  });

  it('SectionComments comments defaults to [] when the comments prop is omitted', () => {
    renderViewer({ onAddComment: vi.fn() });
    expect(sectionComments[0].comments).toEqual([]);
  });
});
