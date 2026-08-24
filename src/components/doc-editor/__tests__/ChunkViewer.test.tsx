import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as Y from 'yjs';
import type { XmlFragment } from 'yjs';
import type { ComponentProps } from 'react';
import ChunkViewer from '../ChunkViewer';
import type { Section, TaskItem, CommentThread, Participant } from '../../../types/document';

interface TiptapCaptured { fragment: XmlFragment | null; editable: boolean; sectionId: string; }
// The suite runs under React StrictMode, so every child renders twice. These
// recorders therefore key by the child's stable identity and overwrite on each
// render — they hold the LATEST props per child, not an append-only render
// log, so lookups can't land on a duplicate of the previous child.
const tiptap = new Map<string, TiptapCaptured>();

function tiptapFor(sectionId: string): TiptapCaptured {
  const p = tiptap.get(sectionId);
  if (!p) throw new Error(`TiptapEditor never rendered for section ${sectionId}`);
  return p;
}

vi.mock('../TiptapEditor', () => ({
  default: (props: TiptapCaptured) => {
    tiptap.set(props.sectionId, props);
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
const reviewable = new Map<string, ReviewableCaptured>();

function reviewableFor(itemId: string): ReviewableCaptured {
  const p = reviewable.get(itemId);
  if (!p) throw new Error(`ReviewableItem never rendered for item ${itemId}`);
  return p;
}

vi.mock('../ReviewableItem', () => ({
  default: (props: ReviewableCaptured) => {
    reviewable.set(props.item.id, props);
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
// ChunkViewer renders at most one SectionComments, so its "stable identity" is
// the singleton itself: keep the latest props in one slot. `current === null`
// means it was never rendered, which is what the render-count assertions mean.
const sectionComments: { current: SectionCommentsCaptured | null } = { current: null };
vi.mock('../SectionComments', () => ({
  default: (props: SectionCommentsCaptured) => {
    sectionComments.current = props;
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
  tiptap.clear();
  reviewable.clear();
  sectionComments.current = null;
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
    expect(tiptapFor('s-test').fragment).toBe(frag);
    expect(tiptapFor('s-test').sectionId).toBe('s-test');
    expect(tiptapFor('s-test').editable).toBe(false);
    tiptap.clear();
    rerender(<ChunkViewer {...props} fragment={null} />);
    expect(screen.queryByTestId('tiptap')).toBeNull();
    expect(tiptap.size).toBe(0);
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
    expect([...reviewable.keys()]).toEqual(['a', 'b', 'c']);
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
    reviewableFor('b').onAck('looks good');
    expect(onAckItem).toHaveBeenCalledWith('b', 'looks good');
    reviewableFor('a').onAck();
    expect(onAckItem).toHaveBeenCalledWith('a', undefined);
  });

  it('per-item onReject proxy routes to onRejectItem(item.id, reason)', () => {
    const onRejectItem = vi.fn();
    renderViewer({
      section: mkSection({ items: [mkItem('a'), mkItem('b')] }), onRejectItem,
    });
    reviewableFor('b').onReject('incomplete');
    expect(onRejectItem).toHaveBeenCalledWith('b', 'incomplete');
  });

  it('SectionComments renders only when onAddComment is provided', () => {
    const { rerender, props } = renderViewer({});
    expect(screen.queryByTestId('section-comments')).toBeNull();
    expect(sectionComments.current).toBeNull();
    rerender(<ChunkViewer {...props} onAddComment={vi.fn()} />);
    expect(screen.getByTestId('section-comments')).toBeInTheDocument();
    expect(sectionComments.current).not.toBeNull();
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
    const cap = sectionComments.current!;
    expect(cap.comments).toBe(comments);
    expect(cap.onAddComment).toBe(onAddComment);
    expect(cap.onResolveThread).toBe(onResolveThread);
    expect(cap.onUnresolveThread).toBe(onUnresolveThread);
    expect(cap.participants).toBe(participants);
  });

  it('SectionComments comments defaults to [] when the comments prop is omitted', () => {
    renderViewer({ onAddComment: vi.fn() });
    expect(sectionComments.current!.comments).toEqual([]);
  });
});
