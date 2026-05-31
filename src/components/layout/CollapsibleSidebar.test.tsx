// src/components/layout/CollapsibleSidebar.test.tsx
//
// Composition tests for CollapsibleSidebar (454 LOC, zero coverage before
// hub#1041). Sidebar is fully presentational — props in, JSX out — so we
// drive it directly without context providers.

import { render, screen, fireEvent } from '@testing-library/react';
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

describe('CollapsibleSidebar — section toggle', () => {
  it('section header has role=button and is keyboard-accessible', () => {
    render(<CollapsibleSidebar {...baseProps()} />);
    const headers = screen.getAllByRole('button');
    // At least one of the buttons should be a section header (Channels / Activity / Documents).
    // The Disconnect button is also role=button (implicit on <button>), so filter by visible text.
    const channelsHeader = headers.find(h => h.textContent?.includes('Channels'));
    expect(channelsHeader).toBeDefined();
    expect(channelsHeader).toHaveAttribute('tabindex', '0');
  });
});
