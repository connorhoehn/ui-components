import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as Y from 'yjs';
import type { XmlFragment } from 'yjs';
import type { ComponentProps } from 'react';
import SectionList from '../SectionList';
import type { Section, TaskItem, Participant, CommentThread } from '../../../types/document';

interface CapturedSectionBlockProps {
  section: Section; fragment: XmlFragment | null;
  participants?: Participant[]; isFocused: boolean;
  comments: CommentThread[]; commentCount: number;
  onUpdateSection: (patch: Partial<Section>) => void;
  onAddItem: (item: Omit<TaskItem, 'id'>) => void;
  onUpdateItem: (itemId: string, patch: Partial<TaskItem>) => void;
  onRemoveItem: (itemId: string) => void;
  onFocus: () => void;
  onAddComment: (text: string, parentCommentId?: string | null) => void;
  onResolveThread: (commentId: string) => void;
  onUnresolveThread: (commentId: string) => void;
  onUpdateCursorInfo?: (name: string, color: string) => void;
  onOpenComments?: (sectionId: string) => void;
}

// The suite runs under React StrictMode, so every child renders twice. An
// append-only render log would therefore hold each section twice and
// index-based lookups would land on the wrong section. Key by the section's
// stable identity and let each render overwrite, so the map holds the LATEST
// props per section — and, since a Map keeps insertion order, still in
// document order.
const captures = new Map<string, CapturedSectionBlockProps>();

function propsFor(sectionId: string): CapturedSectionBlockProps {
  const p = captures.get(sectionId);
  if (!p) throw new Error(`SectionBlock never rendered for section ${sectionId}`);
  return p;
}

vi.mock('../SectionBlock', () => ({
  default: (props: CapturedSectionBlockProps) => {
    captures.set(props.section.id, props);
    return <div
      data-testid="section-block"
      data-section-id={props.section.id}
      data-is-focused={String(props.isFocused)}
      data-comment-count={String(props.commentCount)} />;
  },
}));

const mkSection = (id: string): Section => ({
  id, type: 'notes', title: `section ${id}`, collapsed: false, items: [],
});

function renderList(overrides: Partial<ComponentProps<typeof SectionList>> = {}) {
  const props: ComponentProps<typeof SectionList> = {
    sections: [], getSectionFragment: () => null, ydoc: new Y.Doc(), provider: null,
    user: { name: 'me', color: '#000' }, editable: true,
    onUpdateSection: vi.fn(), onAddItem: vi.fn(), onUpdateItem: vi.fn(), onRemoveItem: vi.fn(),
    ...overrides,
  };
  return { ...render(<SectionList {...props} />), props };
}

beforeEach(() => { captures.clear(); });

describe('SectionList', () => {
  it('renders no SectionBlock when sections is empty', () => {
    renderList();
    expect(screen.queryAllByTestId('section-block')).toHaveLength(0);
    expect(captures.size).toBe(0);
  });

  it('renders one SectionBlock per section in document order', () => {
    renderList({ sections: [mkSection('a'), mkSection('b'), mkSection('c')] });
    const blocks = screen.getAllByTestId('section-block');
    expect(blocks.map(b => b.dataset.sectionId)).toEqual(['a', 'b', 'c']);
    expect([...captures.keys()]).toEqual(['a', 'b', 'c']);
  });

  it('calls getSectionFragment per section.id and forwards the returned fragment', () => {
    const fragA = {} as XmlFragment;
    const fragB = {} as XmlFragment;
    const getSectionFragment = vi.fn((id: string) =>
      id === 'a' ? fragA : id === 'b' ? fragB : null,
    );
    renderList({ sections: [mkSection('a'), mkSection('b')], getSectionFragment });
    expect(getSectionFragment).toHaveBeenCalledWith('a');
    expect(getSectionFragment).toHaveBeenCalledWith('b');
    expect(propsFor('a').fragment).toBe(fragA);
    expect(propsFor('b').fragment).toBe(fragB);
  });

  it('filters participants per section by currentSectionId', () => {
    const mk = (currentSectionId: string | null, clientId: string): Participant => ({
      clientId, userId: `u-${clientId}`, displayName: 'User',
      color: '#fff', mode: 'editor', currentSectionId,
    });
    const participants = [mk('a', 'c1'), mk('a', 'c2'), mk('b', 'c3'), mk(null, 'c4')];
    renderList({ sections: [mkSection('a'), mkSection('b'), mkSection('c')], participants });
    const byId = propsFor;
    expect(byId('a').participants?.map(p => p.clientId)).toEqual(['c1', 'c2']);
    expect(byId('b').participants?.map(p => p.clientId)).toEqual(['c3']);
    expect(byId('c').participants).toEqual([]);
  });

  it('routes comments per section.id and exposes a matching commentCount', () => {
    const comments = {
      a: [{ id: 'cmt-1' } as CommentThread, { id: 'cmt-2' } as CommentThread],
      b: [{ id: 'cmt-3' } as CommentThread],
    };
    renderList({ sections: [mkSection('a'), mkSection('b'), mkSection('c')], comments });
    const byId = propsFor;
    expect(byId('a').comments.map(c => c.id)).toEqual(['cmt-1', 'cmt-2']);
    expect(byId('a').commentCount).toBe(2);
    expect(byId('b').comments.map(c => c.id)).toEqual(['cmt-3']);
    expect(byId('b').commentCount).toBe(1);
    expect(byId('c').comments).toEqual([]);
    expect(byId('c').commentCount).toBe(0);
  });

  it('isFocused: true only on the matching section; false on every section when null', () => {
    const { rerender, props } = renderList({
      sections: [mkSection('a'), mkSection('b'), mkSection('c')],
      focusedSectionId: 'b',
    });
    expect(screen.getAllByTestId('section-block').map(b => b.dataset.isFocused))
      .toEqual(['false', 'true', 'false']);
    captures.clear();
    rerender(<SectionList {...props} focusedSectionId={null} />);
    for (const b of screen.getAllByTestId('section-block')) expect(b.dataset.isFocused).toBe('false');
  });

  it('per-section onUpdateSection proxy routes to parent with the right section id', () => {
    const onUpdateSection = vi.fn();
    renderList({ sections: [mkSection('a'), mkSection('b')], onUpdateSection });
    propsFor('b').onUpdateSection({ title: 'renamed' });
    expect(onUpdateSection).toHaveBeenCalledTimes(1);
    expect(onUpdateSection).toHaveBeenCalledWith('b', { title: 'renamed' });
  });

  it('per-section item-mutation proxies route with the right section id', () => {
    const onAddItem = vi.fn(), onUpdateItem = vi.fn(), onRemoveItem = vi.fn();
    renderList({
      sections: [mkSection('a'), mkSection('b')], onAddItem, onUpdateItem, onRemoveItem,
    });
    const newItem = {
      text: 'x', status: 'pending', assignee: '', ackedBy: '',
      ackedAt: '', priority: 'medium', notes: '',
    } as Omit<TaskItem, 'id'>;
    propsFor('b').onAddItem(newItem);
    propsFor('b').onUpdateItem('item-1', { status: 'done' });
    propsFor('b').onRemoveItem('item-1');
    expect(onAddItem).toHaveBeenCalledWith('b', newItem);
    expect(onUpdateItem).toHaveBeenCalledWith('b', 'item-1', { status: 'done' });
    expect(onRemoveItem).toHaveBeenCalledWith('b', 'item-1');
  });

  it('onSectionFocus is called with section.id; omitted handler does not throw', () => {
    const onSectionFocus = vi.fn();
    const { rerender, props } = renderList({
      sections: [mkSection('a'), mkSection('b')], onSectionFocus,
    });
    propsFor('b').onFocus();
    expect(onSectionFocus).toHaveBeenCalledWith('b');
    captures.clear();
    const { onSectionFocus: _drop, ...rest } = props;
    rerender(<SectionList {...rest} />);
    expect(() => propsFor('b').onFocus()).not.toThrow();
  });

  it('comment-thread proxies route with section.id; omitted handlers do not throw', () => {
    const onAddComment = vi.fn(), onResolveThread = vi.fn(), onUnresolveThread = vi.fn();
    const { rerender, props } = renderList({
      sections: [mkSection('a'), mkSection('b')], onAddComment, onResolveThread, onUnresolveThread,
    });
    propsFor('b').onAddComment('hello', 'parent-1');
    propsFor('b').onResolveThread('cmt-1');
    propsFor('b').onUnresolveThread('cmt-1');
    expect(onAddComment).toHaveBeenCalledWith('b', 'hello', 'parent-1');
    expect(onResolveThread).toHaveBeenCalledWith('b', 'cmt-1');
    expect(onUnresolveThread).toHaveBeenCalledWith('b', 'cmt-1');
    captures.clear();
    const { onAddComment: _a, onResolveThread: _r, onUnresolveThread: _u, ...rest } = props;
    rerender(<SectionList {...rest} />);
    expect(() => propsFor('b').onAddComment('hi')).not.toThrow();
    expect(() => propsFor('b').onResolveThread('cmt-1')).not.toThrow();
    expect(() => propsFor('b').onUnresolveThread('cmt-1')).not.toThrow();
  });

  it('onUpdateCursorInfo and onOpenComments pass through as the same reference to every block', () => {
    const onUpdateCursorInfo = vi.fn(), onOpenComments = vi.fn();
    renderList({
      sections: [mkSection('a'), mkSection('b')], onUpdateCursorInfo, onOpenComments,
    });
    expect(propsFor('a').onUpdateCursorInfo).toBe(onUpdateCursorInfo);
    expect(propsFor('b').onUpdateCursorInfo).toBe(onUpdateCursorInfo);
    expect(propsFor('a').onOpenComments).toBe(onOpenComments);
    expect(propsFor('b').onOpenComments).toBe(onOpenComments);
  });
});
