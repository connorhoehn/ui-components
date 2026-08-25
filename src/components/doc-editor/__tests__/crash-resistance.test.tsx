// Crash resistance for the doc-editor review surfaces.
//
// Companion to `src/components/shared/__tests__/crash-resistance.test.tsx`.
// Same premise: this is a LIBRARY, so every prop crosses a trust boundary. In
// this module the boundary is unusually porous — reviews and task items arrive
// through a Yjs shared map that `useCollaborativeDoc` reads with a bare
// `yMapToObject<SectionReview>(value)` cast, so a peer running any other build
// of the app can put a value outside the union into this render path, and the
// host's document API can do the same.
//
// Each test feeds a status the union forbids and asserts the GOOD data still
// renders. The bug being pinned is never "it looked wrong" — it is that the
// throw unmounted a whole page region and took the well-formed records with it.

import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as Y from 'yjs';
import type { Section, SectionReview, TaskItem } from '../../../types/document';

vi.mock('../TiptapEditor', () => ({
  default: () => <div data-testid="tiptap-mock" />,
}));

const ReviewMode = (await import('../ReviewMode')).default;
const ReviewableItem = (await import('../ReviewableItem')).default;

afterEach(cleanup);

function section(id: string, title: string): Section {
  return { id, type: 'notes', title, collapsed: false, items: [] };
}

function review(userId: string, status: string): SectionReview {
  return {
    userId,
    displayName: 'Ada Lovelace',
    status: status as SectionReview['status'],
    timestamp: '2026-01-01T00:00:00.000Z',
  };
}

// ---------------------------------------------------------------------------
// ReviewMode — a review status outside the union
//
// `statusConfig[myReview.status].color` is a PROPERTY READ, and it happens
// inside `sections.map`. One review written by a peer that knows a fourth
// status ('rejected', 'pending') threw a TypeError mid-map, so React unmounted
// the whole review view: every other section, the progress bar and the comment
// threads went with it. The user saw an empty page, not a mislabelled badge.
// ---------------------------------------------------------------------------
describe('ReviewMode — unrecognised review status', () => {
  const baseProps = {
    participants: [],
    userId: 'u1',
    getSectionFragment: () => null,
    ydoc: new Y.Doc(),
    provider: null,
    reviewSection: () => {},
  };

  it('still renders every section when one review has an unknown status', () => {
    render(
      <ReviewMode
        {...baseProps}
        sections={[section('s1', 'Scope'), section('s2', 'Risks'), section('s3', 'Budget')]}
        sectionReviews={{ s2: [review('u1', 'rejected')] }}
      />,
    );

    // The sibling sections are the blast radius. They must survive.
    expect(screen.getByText('Scope')).toBeInTheDocument();
    expect(screen.getByText('Risks')).toBeInTheDocument();
    expect(screen.getByText('Budget')).toBeInTheDocument();
    // …and so must the page chrome above them.
    expect(screen.getByTestId('review-progress')).toBeInTheDocument();
  });

  it('renders the unknown status AS itself rather than hiding or relabelling it', () => {
    render(
      <ReviewMode
        {...baseProps}
        sections={[section('s1', 'Scope')]}
        sectionReviews={{ s1: [review('u1', 'rejected')] }}
      />,
    );

    const badge = screen.getByTestId('section-s1-status');
    // The raw value is still what the component reports — degrading the
    // styling must not mean lying about the data.
    expect(badge.getAttribute('data-status')).toBe('rejected');
    expect(badge).toHaveTextContent('rejected');
  });

  it('survives another reviewer whose displayName is null', () => {
    const other = { ...review('u2', 'approved'), displayName: null as unknown as string };
    render(
      <ReviewMode
        {...baseProps}
        sections={[section('s1', 'Scope')]}
        sectionReviews={{ s1: [other] }}
      />,
    );

    expect(screen.getByText('Scope')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// ReviewableItem — a task status/priority outside the union
//
// `statusColors[item.status]` feeds `sc.bg`, so an item written by another
// build blanked the surrounding item list. `src/renderers/sectionItems.ts`
// already documents this exact boundary for `section.items`.
// ---------------------------------------------------------------------------
describe('ReviewableItem — unrecognised status/priority', () => {
  function item(over: Partial<TaskItem>): TaskItem {
    return {
      id: 'i1',
      text: 'Ship the thing',
      status: 'pending',
      priority: 'medium',
      ...over,
    } as TaskItem;
  }

  it('renders an item whose status is outside the union', () => {
    render(
      <ReviewableItem
        item={item({ status: 'deferred' as TaskItem['status'] })}
        onAck={() => {}}
        onReject={() => {}}
      />,
    );
    expect(screen.getByText('Ship the thing')).toBeInTheDocument();
    expect(screen.getByText('deferred')).toBeInTheDocument();
  });

  // `priority` only ever fed a style VALUE, so it degraded rather than threw.
  // Pinned anyway so the row keeps showing the real priority text instead of
  // quietly rendering an unstyled blank.
  it('renders an item whose priority is outside the union', () => {
    render(
      <ReviewableItem
        item={item({ priority: 'urgent' as TaskItem['priority'] })}
        onAck={() => {}}
        onReject={() => {}}
      />,
    );
    expect(screen.getByText('Ship the thing')).toBeInTheDocument();
    expect(screen.getByText('urgent')).toBeInTheDocument();
  });

  it('keeps sibling rows alive when one row has an unknown status', () => {
    render(
      <div>
        <ReviewableItem item={item({ id: 'a', text: 'First' })} onAck={() => {}} onReject={() => {}} />
        <ReviewableItem
          item={item({ id: 'b', text: 'Second', status: 'deferred' as TaskItem['status'] })}
          onAck={() => {}}
          onReject={() => {}}
        />
        <ReviewableItem item={item({ id: 'c', text: 'Third' })} onAck={() => {}} onReject={() => {}} />
      </div>,
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });
});
