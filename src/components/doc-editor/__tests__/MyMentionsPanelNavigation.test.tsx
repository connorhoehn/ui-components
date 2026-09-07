// My Items has to reach the item on BOTH shapes.
//
// The rows appear either way; clicking one is where it broke. The panel handed
// the page a section id, and a canvas has none — its comments are anchored to a
// text range and filed under an EMPTY section id — so the lookup was
// `getElementById('section-')`, which is null, and nothing happened. This
// asserts the landmark actually travels, and that what the panel emits resolves
// to a real element through the same resolver the page uses.

import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import MyMentionsPanel from '../MyMentionsPanel';
import { scrollToDocumentTarget } from '../canvas/scrollToDocumentTarget';
import type { MyItem } from '../../../hooks/useMyMentionsAndTasks';

const sectionMention: MyItem = {
  kind: 'mention',
  sectionId: 'sec-goals',
  sectionTitle: 'Goals',
  commentId: 'c-legacy',
  authorName: 'Ada',
  authorColor: '#3b82f6',
  commentText: '@you can you look at this',
  timestamp: new Date().toISOString(),
};

// What a canvas comment actually looks like: anchored to a text range, so the
// section id is empty and the comment id is the whole address.
const canvasMention: MyItem = {
  ...sectionMention,
  sectionId: '',
  sectionTitle: '',
  commentId: 'c-anchored',
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('MyMentionsPanel navigation', () => {
  it('passes the section id on a legacy document', () => {
    const onNavigate = vi.fn();
    render(
      <MyMentionsPanel items={[sectionMention]} onNavigateToSection={onNavigate} onClose={vi.fn()} />,
    );
    fireEvent.click(screen.getByText('@you can you look at this'));
    expect(onNavigate).toHaveBeenCalledWith('sec-goals', 'c-legacy');
  });

  it('passes the comment id on a page-shaped document', () => {
    const onNavigate = vi.fn();
    render(
      <MyMentionsPanel items={[canvasMention]} onNavigateToSection={onNavigate} onClose={vi.fn()} />,
    );
    fireEvent.click(screen.getByText('@you can you look at this'));
    // Without the second argument this call carries no usable landmark at all.
    expect(onNavigate).toHaveBeenCalledWith('', 'c-anchored');
  });

  it('omits the section caption when there is no section, rather than a blank line', () => {
    const { rerender } = render(
      <MyMentionsPanel items={[sectionMention]} onNavigateToSection={vi.fn()} onClose={vi.fn()} />,
    );
    expect(screen.getByText('Goals')).toBeTruthy();

    rerender(
      <MyMentionsPanel items={[canvasMention]} onNavigateToSection={vi.fn()} onClose={vi.fn()} />,
    );
    expect(screen.queryByText('Goals')).toBeNull();
  });

  // End to end through the same resolver the page uses: what the panel emits
  // has to be something the document can actually be navigated by.
  it('what the panel emits resolves to a real element on both shapes', () => {
    const calls: Array<[string, string | undefined]> = [];
    const onNavigate = (sectionId: string, commentId?: string) => {
      calls.push([sectionId, commentId]);
    };

    document.body.insertAdjacentHTML(
      'beforeend',
      '<div id="section-sec-goals"></div><span data-comment-id="c-anchored"></span>',
    );

    const { rerender } = render(
      <MyMentionsPanel items={[sectionMention]} onNavigateToSection={onNavigate} onClose={vi.fn()} />,
    );
    fireEvent.click(screen.getByText('@you can you look at this'));

    rerender(
      <MyMentionsPanel items={[canvasMention]} onNavigateToSection={onNavigate} onClose={vi.fn()} />,
    );
    fireEvent.click(screen.getByText('@you can you look at this'));

    expect(calls).toHaveLength(2);
    for (const [sectionId, commentId] of calls) {
      expect(scrollToDocumentTarget({ sectionId, commentId })).toBe(true);
    }
  });

  // The bug, reproduced: drop the comment id — which is all the old signature
  // could carry — and the canvas row resolves to nothing.
  it('the old single-argument call is inert on a canvas', () => {
    document.body.insertAdjacentHTML(
      'beforeend',
      '<span data-comment-id="c-anchored"></span>',
    );
    expect(scrollToDocumentTarget({ sectionId: canvasMention.sectionId })).toBe(false);
    expect(
      scrollToDocumentTarget({
        sectionId: canvasMention.sectionId,
        commentId: (canvasMention as { commentId: string }).commentId,
      }),
    ).toBe(true);
  });
});
