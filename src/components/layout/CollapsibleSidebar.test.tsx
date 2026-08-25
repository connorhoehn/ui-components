// src/components/layout/CollapsibleSidebar.test.tsx
//
// Composition tests for CollapsibleSidebar (454 LOC, zero coverage before
// hub#1041). Sidebar is fully presentational — props in, JSX out — so we
// drive it directly without context providers.

import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  CollapsibleSidebar,
  type PresenceUser,
  type PipelineSidebarEntry,
} from './CollapsibleSidebar';
import type { ActivityEvent } from '../../hooks/useActivityBus';
import type { DocumentInfo } from '../../hooks/useDocuments';

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

function makeUser(overrides: Partial<PresenceUser> & { clientId: string }): PresenceUser {
  return {
    clientId: overrides.clientId,
    metadata: overrides.metadata ?? {},
  };
}

function makeEvent(overrides: Partial<ActivityEvent> & { id: string; eventType: string }): ActivityEvent {
  return {
    id: overrides.id,
    eventType: overrides.eventType,
    detail: overrides.detail ?? {},
    timestamp: overrides.timestamp ?? new Date().toISOString(),
    userId: overrides.userId,
    displayName: overrides.displayName,
    color: overrides.color,
    source: overrides.source ?? 'remote',
  };
}

function makeDoc(overrides: Partial<DocumentInfo> & { id: string; title: string }): DocumentInfo {
  return {
    id: overrides.id,
    title: overrides.title,
    type: overrides.type ?? 'text',
    status: overrides.status ?? 'draft',
    createdBy: overrides.createdBy ?? 'alice',
    createdAt: overrides.createdAt ?? new Date().toISOString(),
    updatedAt: overrides.updatedAt ?? new Date().toISOString(),
    icon: overrides.icon ?? '📄',
    description: overrides.description,
    activeCallSessionId: overrides.activeCallSessionId,
  };
}

function makePipeline(overrides: Partial<PipelineSidebarEntry> & { id: string; name: string }): PipelineSidebarEntry {
  return {
    id: overrides.id,
    name: overrides.name,
    status: overrides.status ?? 'draft',
    updatedAt: overrides.updatedAt ?? new Date().toISOString(),
    icon: overrides.icon,
  };
}

function baseProps() {
  return {
    connectionState: 'connected' as const,
    onDisconnect: vi.fn(),
    onReconnect: vi.fn(),
    presenceUsers: [] as PresenceUser[],
    currentClientId: 'self-client',
    currentChannel: 'general',
    activityEvents: [] as ActivityEvent[],
    userId: 'self-user',
    documents: [] as DocumentInfo[],
    onOpenDocument: vi.fn(),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('CollapsibleSidebar — connection controls', () => {
  it('renders Connected label and Disconnect button when connected', () => {
    const props = baseProps();
    render(<CollapsibleSidebar {...props} />);
    expect(screen.getByText('Connected')).toBeInTheDocument();
    expect(screen.getByText('Disconnect')).toBeInTheDocument();
    expect(screen.queryByText('Reconnect')).not.toBeInTheDocument();
  });

  it('renders Disconnected label and Reconnect button when disconnected', () => {
    const props = { ...baseProps(), connectionState: 'disconnected' as const };
    render(<CollapsibleSidebar {...props} />);
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
    expect(screen.getByText('Reconnect')).toBeInTheDocument();
    expect(screen.queryByText('Disconnect')).not.toBeInTheDocument();
  });

  it("renders Connecting... while connecting or reconnecting", () => {
    const props = { ...baseProps(), connectionState: 'connecting' as const };
    const { rerender } = render(<CollapsibleSidebar {...props} />);
    expect(screen.getByText('Connecting...')).toBeInTheDocument();

    rerender(<CollapsibleSidebar {...props} connectionState="reconnecting" />);
    expect(screen.getByText('Connecting...')).toBeInTheDocument();
  });

  it('invokes onDisconnect when Disconnect button clicked', () => {
    const props = baseProps();
    render(<CollapsibleSidebar {...props} />);
    fireEvent.click(screen.getByText('Disconnect'));
    expect(props.onDisconnect).toHaveBeenCalledTimes(1);
  });

  it('invokes onReconnect when Reconnect button clicked', () => {
    const props = { ...baseProps(), connectionState: 'disconnected' as const };
    render(<CollapsibleSidebar {...props} />);
    fireEvent.click(screen.getByText('Reconnect'));
    expect(props.onReconnect).toHaveBeenCalledTimes(1);
  });

  it('renders Collapse button only when onCollapse provided, with aria-label', () => {
    const props = baseProps();
    const { rerender } = render(<CollapsibleSidebar {...props} />);
    expect(screen.queryByLabelText('Collapse sidebar')).not.toBeInTheDocument();

    const onCollapse = vi.fn();
    rerender(<CollapsibleSidebar {...props} onCollapse={onCollapse} />);
    const btn = screen.getByLabelText('Collapse sidebar');
    fireEvent.click(btn);
    expect(onCollapse).toHaveBeenCalledTimes(1);
  });
});

describe('CollapsibleSidebar — channels / presence section', () => {
  it('renders current channel name', () => {
    const props = { ...baseProps(), currentChannel: 'engineering' };
    render(<CollapsibleSidebar {...props} />);
    expect(screen.getByText(/# engineering/)).toBeInTheDocument();
  });

  it('renders empty state when no presence users', () => {
    render(<CollapsibleSidebar {...baseProps()} />);
    expect(screen.getByText('No users online')).toBeInTheDocument();
  });

  it('renders presence users with "(you)" suffix for self', () => {
    const props = {
      ...baseProps(),
      currentClientId: 'me',
      presenceUsers: [
        makeUser({ clientId: 'me', metadata: { displayName: 'Alice' } }),
        makeUser({ clientId: 'them', metadata: { displayName: 'Bob' } }),
      ],
    };
    render(<CollapsibleSidebar {...props} />);
    expect(screen.getByText('Alice (you)')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('emits presence-avatar testids with display name as data attr', () => {
    const props = {
      ...baseProps(),
      presenceUsers: [
        makeUser({ clientId: 'them-1', metadata: { displayName: 'Bob' } }),
      ],
    };
    render(<CollapsibleSidebar {...props} />);
    const avatar = screen.getByTestId('presence-avatar');
    expect(avatar).toHaveAttribute('data-presence-user', 'Bob');
    expect(avatar).toHaveAttribute('data-presence-user-id', 'them-1');
  });

  it('falls back to clientId prefix when displayName missing', () => {
    const props = {
      ...baseProps(),
      presenceUsers: [
        makeUser({ clientId: 'abcdef12345', metadata: {} }),
      ],
    };
    render(<CollapsibleSidebar {...props} />);
    expect(screen.getByText('abcdef12')).toBeInTheDocument();
  });
});

describe('CollapsibleSidebar — activity section', () => {
  it('renders empty state when no events', () => {
    render(<CollapsibleSidebar {...baseProps()} />);
    expect(screen.getByText('No recent activity')).toBeInTheDocument();
  });

  it('formats chat events with author + text', () => {
    const props = {
      ...baseProps(),
      activityEvents: [
        makeEvent({
          id: 'e1',
          eventType: 'chat.message',
          displayName: 'Alice',
          detail: { text: 'hello' },
        }),
      ],
    };
    render(<CollapsibleSidebar {...props} />);
    expect(screen.getByText('Alice: hello')).toBeInTheDocument();
  });

  it('formats join events', () => {
    const props = {
      ...baseProps(),
      activityEvents: [
        makeEvent({ id: 'e1', eventType: 'presence.join', displayName: 'Bob' }),
      ],
    };
    render(<CollapsibleSidebar {...props} />);
    expect(screen.getByText('Bob joined')).toBeInTheDocument();
  });

  it('caps activity list to 5 events', () => {
    const props = {
      ...baseProps(),
      activityEvents: Array.from({ length: 10 }, (_, i) =>
        makeEvent({
          id: `e${i}`,
          eventType: 'chat.message',
          displayName: `User${i}`,
          detail: { text: `m${i}` },
        }),
      ),
    };
    render(<CollapsibleSidebar {...props} />);
    expect(screen.getByText('User0: m0')).toBeInTheDocument();
    expect(screen.getByText('User4: m4')).toBeInTheDocument();
    expect(screen.queryByText('User5: m5')).not.toBeInTheDocument();
  });
});

describe('CollapsibleSidebar — documents section', () => {
  it('renders empty state when no documents', () => {
    render(<CollapsibleSidebar {...baseProps()} />);
    expect(screen.getByText('No documents')).toBeInTheDocument();
  });

  it('lists documents and invokes onOpenDocument on click', () => {
    const props = {
      ...baseProps(),
      documents: [
        makeDoc({ id: 'd1', title: 'Sprint plan' }),
        makeDoc({ id: 'd2', title: 'Roadmap' }),
      ],
    };
    render(<CollapsibleSidebar {...props} />);
    fireEvent.click(screen.getByText('Sprint plan'));
    expect(props.onOpenDocument).toHaveBeenCalledWith('d1');
  });

  it('caps documents list to 5', () => {
    const props = {
      ...baseProps(),
      documents: Array.from({ length: 8 }, (_, i) =>
        makeDoc({ id: `d${i}`, title: `Doc ${i}` }),
      ),
    };
    render(<CollapsibleSidebar {...props} />);
    expect(screen.getByText('Doc 0')).toBeInTheDocument();
    expect(screen.getByText('Doc 4')).toBeInTheDocument();
    expect(screen.queryByText('Doc 5')).not.toBeInTheDocument();
  });
});

describe('CollapsibleSidebar — pipelines section', () => {
  it('hides pipelines section when prop is undefined', () => {
    render(<CollapsibleSidebar {...baseProps()} />);
    expect(screen.queryByText('Pipelines')).not.toBeInTheDocument();
  });

  it('shows pipelines section with empty state when array empty', () => {
    const props = { ...baseProps(), pipelines: [] };
    render(<CollapsibleSidebar {...props} />);
    expect(screen.getByText('Pipelines')).toBeInTheDocument();
    expect(screen.getByText('No pipelines yet')).toBeInTheDocument();
  });

  it('renders pipeline rows with status badge and invokes onOpenPipeline', () => {
    const onOpenPipeline = vi.fn();
    const props = {
      ...baseProps(),
      pipelines: [
        makePipeline({ id: 'p1', name: 'Daily ETL', status: 'published' }),
        makePipeline({ id: 'p2', name: 'Test runner', status: 'draft' }),
      ],
      onOpenPipeline,
    };
    render(<CollapsibleSidebar {...props} />);
    expect(screen.getByText('Daily ETL')).toBeInTheDocument();
    expect(screen.getByText('published')).toBeInTheDocument();
    expect(screen.getByText('draft')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Daily ETL'));
    expect(onOpenPipeline).toHaveBeenCalledWith('p1');
  });

  it('renders See-all link when pipeline list > 12 and onSeeAllPipelines provided', () => {
    const onSeeAllPipelines = vi.fn();
    const props = {
      ...baseProps(),
      pipelines: Array.from({ length: 15 }, (_, i) =>
        makePipeline({ id: `p${i}`, name: `P${i}` }),
      ),
      onSeeAllPipelines,
    };
    render(<CollapsibleSidebar {...props} />);
    const link = screen.getByText(/See all pipelines/);
    fireEvent.click(link);
    expect(onSeeAllPipelines).toHaveBeenCalledTimes(1);
  });

  it('renders "+ New" affordance in empty state when onSeeAllPipelines provided', () => {
    const onSeeAllPipelines = vi.fn();
    const props = { ...baseProps(), pipelines: [], onSeeAllPipelines };
    render(<CollapsibleSidebar {...props} />);
    const newAffordance = screen.getByText('+ New');
    fireEvent.click(newAffordance);
    expect(onSeeAllPipelines).toHaveBeenCalledTimes(1);
  });
});

describe('CollapsibleSidebar — video slot', () => {
  it('hides Video section when videoSlot is absent', () => {
    render(<CollapsibleSidebar {...baseProps()} />);
    expect(screen.queryByText('Video')).not.toBeInTheDocument();
  });

  it('renders video slot when provided', () => {
    const props = {
      ...baseProps(),
      videoSlot: <div data-testid="docked-video">Docked video</div>,
    };
    render(<CollapsibleSidebar {...props} />);
    expect(screen.getByText('Video')).toBeInTheDocument();
    expect(screen.getByTestId('docked-video')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Section toggle — ARIA, tab order, focus, keyboard
//
// Everything below covers the sidebar's own collapse mechanics, which had no
// coverage before. Several are regression tests for bugs fixed in the same
// commit; each says which.
// ---------------------------------------------------------------------------

/** The CHANNELS / ACTIVITY / DOCUMENTS / PIPELINES / VIDEO header for `title`. */
function sectionHeader(title: string): HTMLElement {
  return screen.getByRole('button', { name: new RegExp(`^${title}`, 'i') });
}

function panelFor(title: string): HTMLElement {
  const header = sectionHeader(title);
  const id = header.getAttribute('aria-controls');
  expect(id).toBeTruthy();
  const panel = document.getElementById(id as string);
  expect(panel).not.toBeNull();
  return panel as HTMLElement;
}

describe('CollapsibleSidebar — section toggle', () => {
  it('renders section headers as real buttons, not role=button divs', () => {
    // INVERTED from the original assertion (`tabindex="0"` on a div). A div
    // with role=button has to re-implement Enter/Space and focusability by
    // hand; the header now IS a <button>, which is why it no longer carries
    // an explicit tabindex. Asserting the tag is asserting the keyboard
    // contract — jsdom does not synthesise click from keydown on a button,
    // so there is nothing more honest to assert here.
    render(<CollapsibleSidebar {...baseProps()} />);
    const header = sectionHeader('Channels');
    expect(header.tagName).toBe('BUTTON');
    expect(header).toHaveAttribute('type', 'button');
    expect(header).not.toHaveAttribute('tabindex');
  });

  it('exposes aria-expanded + aria-controls wired to the panel it toggles', () => {
    // REGRESSION: the header had neither, so a screen-reader user was told
    // "Channels, button" with no hint that it expands anything, and no way to
    // jump to what it controls.
    const props = {
      ...baseProps(),
      documents: [makeDoc({ id: 'd1', title: 'Sprint plan' })],
    };
    render(<CollapsibleSidebar {...props} />);

    const header = sectionHeader('Documents');
    expect(header).toHaveAttribute('aria-expanded', 'true');

    const panel = panelFor('Documents');
    expect(panel).toContainElement(screen.getByText('Sprint plan'));

    fireEvent.click(header);
    expect(header).toHaveAttribute('aria-expanded', 'false');
  });

  it('labels each section as a region named by its header', () => {
    render(<CollapsibleSidebar {...baseProps()} />);
    for (const name of ['Channels', 'Activity', 'Documents']) {
      expect(screen.getByRole('region', { name })).toBeInTheDocument();
    }
  });

  it('hides a collapsed section from the accessibility tree', () => {
    // REGRESSION: collapsing set `max-height: 0`, which hides content from
    // sighted users only. Screen-reader users still heard every row of a
    // "collapsed" section, and the rows stayed in the tab order.
    const props = {
      ...baseProps(),
      documents: [makeDoc({ id: 'd1', title: 'Sprint plan' })],
    };
    render(<CollapsibleSidebar {...props} />);

    expect(screen.getByRole('button', { name: /Sprint plan/ })).toBeInTheDocument();

    fireEvent.click(sectionHeader('Documents'));

    // Still mounted (the height transition needs it) but no longer reachable.
    expect(screen.getByText('Sprint plan')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Sprint plan/ })).not.toBeInTheDocument();
  });

  it('marks a collapsed panel inert so Tab skips its rows', () => {
    // REGRESSION, same bug as above from the keyboard side: `inert` is what
    // takes the collapsed rows out of the tab order.
    const props = {
      ...baseProps(),
      documents: [makeDoc({ id: 'd1', title: 'Sprint plan' })],
    };
    render(<CollapsibleSidebar {...props} />);

    const panel = panelFor('Documents');
    expect(panel).not.toHaveAttribute('inert');
    expect(panel).not.toHaveAttribute('aria-hidden');

    fireEvent.click(sectionHeader('Documents'));

    expect(panel).toHaveAttribute('inert');
    expect(panel).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not strand focus inside a section it collapses', () => {
    // REGRESSION: with focus on a document row, collapsing the section left
    // focus on an element that is now hidden and aria-hidden — the browser
    // blurs it to <body>, so the keyboard user silently restarts their Tab
    // walk from the top of the page. Focus must land on the header instead.
    const props = {
      ...baseProps(),
      documents: [makeDoc({ id: 'd1', title: 'Sprint plan' })],
    };
    render(<CollapsibleSidebar {...props} />);

    const row = screen.getByRole('button', { name: /Sprint plan/ });
    row.focus();
    expect(document.activeElement).toBe(row);

    const header = sectionHeader('Documents');
    fireEvent.click(header);

    expect(document.activeElement).toBe(header);
    expect(panelFor('Documents').contains(document.activeElement)).toBe(false);
  });

  it('leaves focus alone when collapsing a section that does not hold it', () => {
    const props = { ...baseProps(), onCollapse: vi.fn() };
    render(<CollapsibleSidebar {...props} />);

    const collapseSidebar = screen.getByLabelText('Collapse sidebar');
    collapseSidebar.focus();
    fireEvent.click(sectionHeader('Documents'));

    expect(document.activeElement).toBe(collapseSidebar);
  });

  it('toggles sections independently and keeps state across re-renders', () => {
    const props = baseProps();
    const { rerender } = render(<CollapsibleSidebar {...props} />);

    fireEvent.click(sectionHeader('Activity'));
    expect(sectionHeader('Activity')).toHaveAttribute('aria-expanded', 'false');
    expect(sectionHeader('Channels')).toHaveAttribute('aria-expanded', 'true');
    expect(sectionHeader('Documents')).toHaveAttribute('aria-expanded', 'true');

    // Sections are uncontrolled: a prop change must not reset what the user
    // collapsed (this is the only collapse state there is — the component
    // persists nothing and takes no `expanded` prop).
    rerender(<CollapsibleSidebar {...props} currentChannel="engineering" />);
    expect(sectionHeader('Activity')).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(sectionHeader('Activity'));
    expect(sectionHeader('Activity')).toHaveAttribute('aria-expanded', 'true');
  });

  it('keeps the chevron and section emoji out of the accessible name', () => {
    // `onOpenPipeline` is now required for the row to BE a button — see the
    // inverted case below.
    const props = {
      ...baseProps(),
      pipelines: [makePipeline({ id: 'p1', name: 'ETL' })],
      onOpenPipeline: vi.fn(),
    };
    render(<CollapsibleSidebar {...props} />);
    // "▸" and the section emoji are decoration and must not be announced; the
    // name is the label plus its count chip. (No space between them: the chip
    // is an adjacent inline span with no whitespace text node, so the name
    // computation concatenates — cosmetic, and not what this test is about.)
    expect(screen.getByRole('button', { name: 'Pipelines1' })).toBeInTheDocument();
    // Same for the decorative glyph on a pipeline row — the row announces its
    // name and status, not "shuffle emoji".
    expect(screen.getByRole('button', { name: 'ETLdraft' })).toBeInTheDocument();
  });

  // INVERTED from the case above, which used to render pipelines with NO
  // `onOpenPipeline` and still assert the row was a button. `onOpenPipeline`
  // is optional and nothing else opens a pipeline from the sidebar, so an
  // unwired row was a tab stop announced as a button that swallowed both
  // click and Enter. The "+ New" / "See all pipelines" affordances in the
  // same section were already gated on their handler.
  it('does not present a pipeline row as a button without onOpenPipeline', () => {
    const props = { ...baseProps(), pipelines: [makePipeline({ id: 'p1', name: 'ETL' })] };
    render(<CollapsibleSidebar {...props} />);
    // The pipeline is still listed…
    expect(screen.getAllByText('ETL').length).toBeGreaterThan(0);
    // …but it is not a control.
    expect(screen.queryByRole('button', { name: 'ETLdraft' })).toBeNull();
  });
});

describe('CollapsibleSidebar — row keyboard activation', () => {
  // REGRESSION: every role="button" row handled Enter only. The ARIA button
  // contract is Enter *and* Space, and an unhandled Space on a focused row
  // scrolls the sidebar instead of activating it.

  it('opens a document on Enter and on Space', () => {
    const props = {
      ...baseProps(),
      documents: [makeDoc({ id: 'd1', title: 'Sprint plan' })],
    };
    render(<CollapsibleSidebar {...props} />);
    const row = screen.getByRole('button', { name: /Sprint plan/ });

    fireEvent.keyDown(row, { key: 'Enter' });
    expect(props.onOpenDocument).toHaveBeenCalledWith('d1');

    fireEvent.keyDown(row, { key: ' ' });
    expect(props.onOpenDocument).toHaveBeenCalledTimes(2);
  });

  it('swallows the Space keypress so the sidebar does not scroll', () => {
    const props = {
      ...baseProps(),
      documents: [makeDoc({ id: 'd1', title: 'Sprint plan' })],
    };
    render(<CollapsibleSidebar {...props} />);
    const row = screen.getByRole('button', { name: /Sprint plan/ });

    const evt = createEvent.keyDown(row, { key: ' ' });
    fireEvent(row, evt);
    expect(evt.defaultPrevented).toBe(true);
  });

  it('opens a pipeline on Enter and on Space', () => {
    const onOpenPipeline = vi.fn();
    const props = {
      ...baseProps(),
      pipelines: [makePipeline({ id: 'p1', name: 'Daily ETL' })],
      onOpenPipeline,
    };
    render(<CollapsibleSidebar {...props} />);
    const row = screen.getByRole('button', { name: /Daily ETL/ });

    fireEvent.keyDown(row, { key: 'Enter' });
    fireEvent.keyDown(row, { key: ' ' });
    expect(onOpenPipeline).toHaveBeenCalledTimes(2);
    expect(onOpenPipeline).toHaveBeenLastCalledWith('p1');
  });

  it('activates the "+ New" and "See all pipelines" affordances on Space', () => {
    const onSeeAllPipelines = vi.fn();
    const { unmount } = render(
      <CollapsibleSidebar {...baseProps()} pipelines={[]} onSeeAllPipelines={onSeeAllPipelines} />,
    );
    fireEvent.keyDown(screen.getByText('+ New'), { key: ' ' });
    expect(onSeeAllPipelines).toHaveBeenCalledTimes(1);
    unmount();

    render(
      <CollapsibleSidebar
        {...baseProps()}
        pipelines={Array.from({ length: 15 }, (_, i) => makePipeline({ id: `p${i}`, name: `P${i}` }))}
        onSeeAllPipelines={onSeeAllPipelines}
      />,
    );
    fireEvent.keyDown(screen.getByText(/See all pipelines/), { key: ' ' });
    expect(onSeeAllPipelines).toHaveBeenCalledTimes(2);
  });

  it('ignores unrelated keys', () => {
    const props = {
      ...baseProps(),
      documents: [makeDoc({ id: 'd1', title: 'Sprint plan' })],
    };
    render(<CollapsibleSidebar {...props} />);
    fireEvent.keyDown(screen.getByRole('button', { name: /Sprint plan/ }), { key: 'a' });
    expect(props.onOpenDocument).not.toHaveBeenCalled();
  });
});

// NOTE — the `visiblePipelines` useMemo dependency fix (`pipelines ?? []` was
// rebuilt every render, so the memo never hit its cache) deliberately has no
// test here. It is invisible from the DOM: reconciliation reuses the same row
// elements either way, so any assertion would pass against the bug too, and a
// test that cannot fail is worse than no test.
