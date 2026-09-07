// The section router, on a page-shaped document.
//
// Two failures lived here and neither raised anything:
//
//   1. "Empty" was `sections.length === 0`, which is ALWAYS true on a canvas —
//      its content is one body fragment. So a page full of text rendered the
//      "No document content yet / Load Demo Document" prompt over it, and
//      pressing that button would have written legacy sections onto a page.
//   2. On a CONVERTED document the section array survives, frozen, so the
//      editor / review / reader panes rendered the pre-conversion sections as
//      though they were the current document.
//
// Both are the same mistake: inferring the shape from the substrate instead of
// reading `meta.schemaVersion`.

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';
import * as Y from 'yjs';
import EditorModeSwitch, { type EditorModeSwitchProps } from '../EditorModeSwitch';
import type { DocumentMeta, Section, ViewMode } from '../../../types/document';

// SectionList mounts Tiptap editors; this file is about which BRANCH runs, so
// the leaf is stubbed to keep the assertion about routing rather than editors.
vi.mock('../SectionList', () => ({
  default: ({ sections }: { sections: Section[] }) => (
    <div data-testid="section-list">{sections.map((s) => s.title).join('|')}</div>
  ),
}));
vi.mock('../AttachmentsPanel', () => ({ default: () => null }));
vi.mock('../ReviewMode', () => ({ default: () => <div data-testid="review-mode" /> }));
vi.mock('../ReaderMode', () => ({ default: () => <div data-testid="reader-mode" /> }));

const FROZEN_SECTIONS: Section[] = [
  { id: 'sec-old', type: 'notes', title: 'Before the conversion', collapsed: false, items: [] } as unknown as Section,
];

function props(overrides: Partial<EditorModeSwitchProps> = {}): EditorModeSwitchProps {
  return {
    mode: 'editor' as ViewMode,
    isEmpty: false,
    isFinalized: false,
    sections: FROZEN_SECTIONS,
    documentId: 'doc-1',
    displayName: 'Tester',
    color: '#3b82f6',
    userId: 'u1',
    ydoc: new Y.Doc(),
    provider: null,
    getSectionFragment: () => null,
    updateSection: vi.fn(),
    participants: [],
    focusedSectionId: null,
    onSectionFocus: vi.fn(),
    comments: {},
    onAddComment: vi.fn(),
    onResolveThread: vi.fn(),
    onUnresolveThread: vi.fn(),
    onOpenComments: vi.fn(),
    onAddItem: vi.fn(),
    onUpdateItem: vi.fn(),
    onRemoveItem: vi.fn(),
    restItems: {},
    commentSidebarOpen: false,
    commentSectionId: null,
    commentSidebarTop: 0,
    sectionListRef: createRef<HTMLDivElement>(),
    onCloseComments: vi.fn(),
    showVideoCall: false,
    showInlineVideo: false,
    sidebarFixed: false,
    videoSpacerRef: createRef<HTMLDivElement>(),
    videoLeft: 0,
    FIXED_TOP: 0,
    showTOC: false,
    sectionReviews: {},
    reviewSection: vi.fn(),
    headerMeta: { title: 'Doc' } as DocumentMeta,
    onLoadDemo: vi.fn(),
    activityPublish: vi.fn(),
    ...overrides,
  };
}

describe('EditorModeSwitch on a legacy document', () => {
  it('renders the sections', () => {
    render(<EditorModeSwitch {...props()} />);
    expect(screen.getByTestId('section-list').textContent).toContain('Before the conversion');
  });

  it('offers the demo loader when there is genuinely nothing', () => {
    render(<EditorModeSwitch {...props({ isEmpty: true, sections: [] })} />);
    expect(screen.getByText('Load Demo Document')).toBeTruthy();
  });
});

describe('EditorModeSwitch on a page-shaped document', () => {
  it('does not render frozen pre-conversion sections as the document', () => {
    render(<EditorModeSwitch {...props({ isCanvas: true })} />);
    expect(screen.queryByTestId('section-list')).toBeNull();
    expect(screen.queryByText(/Before the conversion/)).toBeNull();
  });

  it('says why, instead of rendering a blank pane', () => {
    render(<EditorModeSwitch {...props({ isCanvas: true })} />);
    expect(screen.getByTestId('canvas-not-section-routable')).toBeTruthy();
  });

  // The demo loader is the destructive half: it does not just look wrong, it
  // writes legacy sections onto a page if pressed.
  it('never offers the demo loader, whatever isEmpty says', () => {
    render(<EditorModeSwitch {...props({ isCanvas: true, isEmpty: true, sections: [] })} />);
    expect(screen.queryByText('Load Demo Document')).toBeNull();
  });

  it('routes to neither review nor reader mode', () => {
    const { rerender } = render(<EditorModeSwitch {...props({ isCanvas: true, mode: 'ack' })} />);
    expect(screen.queryByTestId('review-mode')).toBeNull();

    rerender(<EditorModeSwitch {...props({ isCanvas: true, mode: 'reader' })} />);
    expect(screen.queryByTestId('reader-mode')).toBeNull();
  });

  // Proof the assertions above discriminate: the same props with the gate
  // wrong — which is what `sections.length === 0` computes on a converted
  // document — put the stale sections back on screen.
  it('reproduces the bug when the gate is wrong', () => {
    render(<EditorModeSwitch {...props({ isCanvas: false })} />);
    expect(screen.getByTestId('section-list').textContent).toContain('Before the conversion');
  });
});
