import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as Y from 'yjs';
import type { XmlFragment } from 'yjs';
import type { ComponentProps } from 'react';
import AckMode from '../AckMode';
import type { Section, Participant, CommentThread } from '../../../types/document';

interface CapturedChunkViewerProps {
  section: Section;
  onAckItem: (itemId: string, notes?: string) => void;
  onRejectItem: (itemId: string, reason: string) => void;
  fragment: XmlFragment | null;
  ydoc: Y.Doc;
  provider: unknown;
  comments?: CommentThread[];
  onAddComment?: (text: string, parentCommentId?: string | null) => void;
  onResolveThread?: (commentId: string) => void;
  onUnresolveThread?: (commentId: string) => void;
  participants: Participant[];
}

const chunks: CapturedChunkViewerProps[] = [];

vi.mock('../ChunkViewer', () => ({
  default: (props: CapturedChunkViewerProps) => {
    chunks.push(props);
    return <div data-testid="chunk-viewer" data-section-id={props.section.id} />;
  },
}));

interface CapturedProgressProps { current: number; total: number; }
const progress: CapturedProgressProps[] = [];

vi.mock('../ReviewProgress', () => ({
  default: (props: CapturedProgressProps) => {
    progress.push(props);
    return <div data-testid="review-progress" data-current={String(props.current)} data-total={String(props.total)} />;
  },
}));

const mkSection = (id: string): Section => ({
  id, type: 'notes', title: `section ${id}`, collapsed: false, items: [],
});

const mkParticipant = (clientId: string, currentSectionId: string | null): Participant => ({
  clientId, userId: `u-${clientId}`, displayName: `User ${clientId}`,
  color: '#fff', mode: 'editor', currentSectionId,
});

function renderAck(overrides: Partial<ComponentProps<typeof AckMode>> = {}) {
  const props: ComponentProps<typeof AckMode> = {
    sections: [], onAckItem: vi.fn(), onRejectItem: vi.fn(),
    participants: [], getSectionFragment: () => null,
    ydoc: new Y.Doc(), provider: null,
    ...overrides,
  };
  return { ...render(<AckMode {...props} />), props };
}

beforeEach(() => { chunks.length = 0; progress.length = 0; });

describe('AckMode', () => {
  it('renders empty-state copy when sections is empty (no ChunkViewer, no ReviewProgress)', () => {
    renderAck();
    expect(screen.getByText('No sections to review.')).toBeInTheDocument();
    expect(screen.queryAllByTestId('chunk-viewer')).toHaveLength(0);
    expect(progress).toHaveLength(0);
  });

  it('paginates 9 sections into 3 pages of 4 (first page shows ids 0..3)', () => {
    const sections = Array.from({ length: 9 }, (_, i) => mkSection(`s${i}`));
    renderAck({ sections });
    expect(screen.getAllByTestId('chunk-viewer').map(b => b.dataset.sectionId))
      .toEqual(['s0', 's1', 's2', 's3']);
    expect(screen.getByText(/Page 1 of 3 \(9 sections\)/)).toBeInTheDocument();
  });

  it('Previous is disabled on page 1; Next click advances and shows the next window', () => {
    const sections = Array.from({ length: 9 }, (_, i) => mkSection(`s${i}`));
    renderAck({ sections });
    const prevBtn = screen.getByRole('button', { name: 'Previous' });
    const nextBtn = screen.getByRole('button', { name: 'Next' });
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();
    fireEvent.click(nextBtn);
    expect(screen.getAllByTestId('chunk-viewer').map(b => b.dataset.sectionId))
      .toEqual(['s4', 's5', 's6', 's7']);
    expect(screen.getByText(/Page 2 of 3/)).toBeInTheDocument();
  });

  it('Next is disabled on the last page; Previous retreats to the prior window', () => {
    const sections = Array.from({ length: 9 }, (_, i) => mkSection(`s${i}`));
    renderAck({ sections });
    const nextBtn = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    expect(screen.getAllByTestId('chunk-viewer').map(b => b.dataset.sectionId)).toEqual(['s8']);
    expect(screen.getByText(/Page 3 of 3/)).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getAllByTestId('chunk-viewer').map(b => b.dataset.sectionId))
      .toEqual(['s4', 's5', 's6', 's7']);
  });

  it('jumpToIndex snaps the page to floor(jumpToIndex / 4) and fires onJumpComplete once', () => {
    const sections = Array.from({ length: 9 }, (_, i) => mkSection(`s${i}`));
    const onJumpComplete = vi.fn();
    const { rerender, props } = renderAck({ sections, jumpToIndex: null, onJumpComplete });
    expect(onJumpComplete).not.toHaveBeenCalled();
    rerender(<AckMode {...props} sections={sections} jumpToIndex={5} onJumpComplete={onJumpComplete} />);
    expect(screen.getAllByTestId('chunk-viewer').map(b => b.dataset.sectionId))
      .toEqual(['s4', 's5', 's6', 's7']);
    expect(onJumpComplete).toHaveBeenCalledTimes(1);
  });

  it('ignores jumpToIndex when null, negative, or >= sections.length', () => {
    const sections = Array.from({ length: 9 }, (_, i) => mkSection(`s${i}`));
    const onJumpComplete = vi.fn();
    const { rerender, props } = renderAck({ sections, jumpToIndex: null, onJumpComplete });
    rerender(<AckMode {...props} sections={sections} jumpToIndex={-1} onJumpComplete={onJumpComplete} />);
    rerender(<AckMode {...props} sections={sections} jumpToIndex={99} onJumpComplete={onJumpComplete} />);
    expect(onJumpComplete).not.toHaveBeenCalled();
    expect(screen.getByText(/Page 1 of 3/)).toBeInTheDocument();
  });

  it('onSectionFocus fires with the first visible section id on mount and on page change', () => {
    const sections = Array.from({ length: 9 }, (_, i) => mkSection(`s${i}`));
    const onSectionFocus = vi.fn();
    renderAck({ sections, onSectionFocus });
    expect(onSectionFocus).toHaveBeenCalledWith('s0');
    onSectionFocus.mockClear();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(onSectionFocus).toHaveBeenCalledWith('s4');
  });

  it('per-section participant filter: only matching currentSectionId reaches each ChunkViewer', () => {
    const sections = [mkSection('s0'), mkSection('s1'), mkSection('s2'), mkSection('s3')];
    const participants = [
      mkParticipant('c1', 's0'),
      mkParticipant('c2', 's0'),
      mkParticipant('c3', 's2'),
      mkParticipant('c4', null),
    ];
    renderAck({ sections, participants });
    const byId = (id: string) => chunks.find(c => c.section.id === id)!;
    expect(byId('s0').participants.map(p => p.clientId)).toEqual(['c1', 'c2']);
    expect(byId('s1').participants).toEqual([]);
    expect(byId('s2').participants.map(p => p.clientId)).toEqual(['c3']);
    expect(byId('s3').participants).toEqual([]);
  });

  it('routes per-section ack/reject to parent with the correct section id', () => {
    const sections = [mkSection('s0'), mkSection('s1'), mkSection('s2')];
    const onAckItem = vi.fn(), onRejectItem = vi.fn();
    renderAck({ sections, onAckItem, onRejectItem });
    const s2 = chunks.find(c => c.section.id === 's2')!;
    s2.onAckItem('i-1', 'looks good');
    s2.onRejectItem('i-2', 'too vague');
    expect(onAckItem).toHaveBeenCalledWith('s2', 'i-1', 'looks good');
    expect(onRejectItem).toHaveBeenCalledWith('s2', 'i-2', 'too vague');
  });

  it('routes per-section comment thread callbacks to parent with the correct section id', () => {
    const sections = [mkSection('s0'), mkSection('s1')];
    const onAddComment = vi.fn(), onResolveThread = vi.fn(), onUnresolveThread = vi.fn();
    renderAck({ sections, onAddComment, onResolveThread, onUnresolveThread });
    const s1 = chunks.find(c => c.section.id === 's1')!;
    s1.onAddComment!('hello', 'parent-1');
    s1.onResolveThread!('cmt-1');
    s1.onUnresolveThread!('cmt-1');
    expect(onAddComment).toHaveBeenCalledWith('s1', 'hello', 'parent-1');
    expect(onResolveThread).toHaveBeenCalledWith('s1', 'cmt-1');
    expect(onUnresolveThread).toHaveBeenCalledWith('s1', 'cmt-1');
  });

  it('passes comments by section.id; sections without comments get undefined', () => {
    const sections = [mkSection('s0'), mkSection('s1')];
    const comments = { s0: [{ id: 'c-1' } as CommentThread] };
    renderAck({ sections, comments });
    const byId = (id: string) => chunks.find(c => c.section.id === id)!;
    expect(byId('s0').comments?.map(c => c.id)).toEqual(['c-1']);
    expect(byId('s1').comments).toBeUndefined();
  });

  it('omitted comment-thread handlers leave ChunkViewer comment callbacks undefined', () => {
    renderAck({ sections: [mkSection('s0')] });
    const block = chunks[0];
    expect(block.onAddComment).toBeUndefined();
    expect(block.onResolveThread).toBeUndefined();
    expect(block.onUnresolveThread).toBeUndefined();
  });

  it('ReviewProgress receives current = first-page count, total = sections.length; updates on page change', () => {
    const sections = Array.from({ length: 9 }, (_, i) => mkSection(`s${i}`));
    renderAck({ sections });
    expect(progress.at(-1)).toEqual({ current: 4, total: 9 });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(progress.at(-1)).toEqual({ current: 8, total: 9 });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(progress.at(-1)).toEqual({ current: 9, total: 9 });
  });

  it('getSectionFragment is called per section.id and forwards the returned fragment', () => {
    const sections = [mkSection('s0'), mkSection('s1')];
    const fragA = {} as XmlFragment;
    const getSectionFragment = vi.fn((id: string) => (id === 's0' ? fragA : null));
    renderAck({ sections, getSectionFragment });
    expect(getSectionFragment).toHaveBeenCalledWith('s0');
    expect(getSectionFragment).toHaveBeenCalledWith('s1');
    expect(chunks.find(c => c.section.id === 's0')!.fragment).toBe(fragA);
    expect(chunks.find(c => c.section.id === 's1')!.fragment).toBeNull();
  });
});
