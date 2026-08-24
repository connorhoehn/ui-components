// REGRESSION — the same section reported two different comment counts.
//
// Reader mode was handed `arr.length`, which counts ROOT threads only, while
// edit mode's `SectionComments` header uses the recursive `countAllComments`.
// A section with 3 top-level comments each carrying 2 replies (9 comments) read
// "Comments (9)" in edit mode and "3 comments" in reader mode, and the sidebar's
// Document Info → Comments row summed the root-only figure.

import { vi } from 'vitest';
import { render } from '@testing-library/react';
import * as Y from 'yjs';
import type { CommentThread, DocumentMeta, Section } from '../../../types/document';

// Capture what EditorModeSwitch hands down rather than rendering the whole
// reader tree.
const readerProps: Array<Record<string, unknown>> = [];
vi.mock('../ReaderMode', () => ({
  default: (props: Record<string, unknown>) => {
    readerProps.push(props);
    return <div data-testid="reader-mode" />;
  },
}));

import EditorModeSwitch from '../EditorModeSwitch';

const thread = (id: string, replies: CommentThread[] = []): CommentThread =>
  ({
    id,
    author: 'Ana',
    text: `comment ${id}`,
    timestamp: '2026-08-16T10:00:00.000Z',
    resolved: false,
    replies,
  }) as unknown as CommentThread;

const sections: Section[] = [
  {
    id: 's1',
    type: 'text',
    title: 'Overview',
    collapsed: false,
    items: [],
  } as unknown as Section,
];

// 3 roots × 2 replies each = 9 comments in total.
const comments: Record<string, CommentThread[]> = {
  s1: [
    thread('r1', [thread('r1a'), thread('r1b')]),
    thread('r2', [thread('r2a'), thread('r2b')]),
    thread('r3', [thread('r3a'), thread('r3b')]),
  ],
};

const noop = () => {};

function renderReader() {
  readerProps.length = 0;
  const ydoc = new Y.Doc();
  render(
    <EditorModeSwitch
      mode="reader"
      isEmpty={false}
      isFinalized={false}
      sections={sections}
      documentId="doc-1"
      displayName="Ana"
      color="#123456"
      userId="u1"
      ydoc={ydoc}
      provider={null}
      getSectionFragment={() => null}
      updateSection={noop}
      participants={[]}
      focusedSectionId={null}
      onSectionFocus={noop}
      comments={comments}
      onAddComment={noop}
      onResolveThread={noop}
      onUnresolveThread={noop}
      onOpenComments={noop}
      onAddItem={noop}
      onUpdateItem={noop}
      onRemoveItem={noop}
      restItems={{}}
      commentSidebarOpen={false}
      commentSectionId={null}
      commentSidebarTop={0}
      sectionListRef={{ current: null }}
      onCloseComments={noop}
      showVideoCall={false}
      showInlineVideo={false}
      sidebarFixed={false}
      videoSpacerRef={{ current: null }}
      videoLeft={0}
      FIXED_TOP={0}
      showTOC={false}
      sectionReviews={{}}
      reviewSection={noop}
      headerMeta={{} as DocumentMeta}
      onLoadDemo={noop}
      activityPublish={noop}
    />,
  );
  return readerProps[readerProps.length - 1];
}

describe('EditorModeSwitch comment counts', () => {
  it('counts replies, matching the edit-mode header', () => {
    const props = renderReader();
    // Root-only would be 3 — the number reader mode used to print.
    expect(props.commentCounts).toEqual({ s1: 9 });
  });
});
