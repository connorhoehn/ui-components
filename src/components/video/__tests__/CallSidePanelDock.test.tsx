// Docked side-panel behaviour: tab exclusivity, per-mode placement, and
// the property that made this a rewrite rather than a new floating
// window — the panel travels with the widget.

import { render, screen, fireEvent, within } from '@testing-library/react';
import { CallSidePanel, CallSidePanelToggles, callSidePanelPlacement } from '../CallSidePanel';
import type { CallSidePanelTab } from '../CallSidePanel';
import { ChatPanel } from '../../social/ChatPanel';
import {
  CallWidget,
  CALL_CARD_WIDTH,
  CALL_DOCK_ROW_HEIGHT,
  CALL_STAGE_DOCKED_WIDTH,
} from '../CallWidget';
import { ExpandableCallWidget } from '../ExpandableCallWidget';

function tabs(): CallSidePanelTab[] {
  return [
    { id: 'chat', label: 'Chat', content: <div data-testid="chat-body">chat</div> },
    { id: 'people', label: 'People', content: <div data-testid="people-body">people</div> },
    { id: 'captions', label: 'Captions', content: <div data-testid="captions-body">captions</div> },
  ];
}

describe('CallSidePanel — tabbed dock', () => {
  it('shows exactly ONE destination at a time', () => {
    const { rerender } = render(
      <CallSidePanel tabs={tabs()} activeTab="chat" onTabChange={() => {}} />,
    );
    expect(screen.getByTestId('chat-body')).toBeInTheDocument();
    expect(screen.queryByTestId('people-body')).toBeNull();
    expect(screen.queryByTestId('captions-body')).toBeNull();

    rerender(<CallSidePanel tabs={tabs()} activeTab="people" onTabChange={() => {}} />);
    expect(screen.queryByTestId('chat-body')).toBeNull();
    expect(screen.getByTestId('people-body')).toBeInTheDocument();
    expect(screen.queryByTestId('captions-body')).toBeNull();
  });

  it('renders nothing when no destination is active', () => {
    render(<CallSidePanel tabs={tabs()} activeTab={null} onTabChange={() => {}} />);
    expect(screen.queryByTestId('call-side-panel')).toBeNull();
  });

  it('keeps the canonical testids the consuming app pins', () => {
    render(<CallSidePanel tabs={tabs()} activeTab="chat" onTabChange={() => {}} />);
    expect(screen.getByTestId('call-chat-panel')).toBeInTheDocument();
  });

  it('switching tabs reports the new id; ✕ reports null', () => {
    const onTabChange = vi.fn();
    render(<CallSidePanel tabs={tabs()} activeTab="chat" onTabChange={onTabChange} />);
    fireEvent.click(screen.getByTestId('call-side-panel-tab-captions'));
    expect(onTabChange).toHaveBeenCalledWith('captions');

    onTabChange.mockClear();
    fireEvent.click(screen.getByTestId('call-side-panel-close'));
    expect(onTabChange).toHaveBeenCalledWith(null);
  });
});

describe('CallSidePanelToggles — mutual exclusivity from the control bar', () => {
  it('exposes the pinned testids and pressed state', () => {
    render(<CallSidePanelToggles tabs={tabs()} activeTab="chat" onTabChange={() => {}} />);
    expect(screen.getByTestId('call-chat-open')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('call-people-open')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('captions-toggle')).toHaveAttribute('aria-pressed', 'false');
  });

  it('clicking a different destination REPLACES the open one (never two)', () => {
    const onTabChange = vi.fn();
    render(<CallSidePanelToggles tabs={tabs()} activeTab="chat" onTabChange={onTabChange} />);
    fireEvent.click(screen.getByTestId('captions-toggle'));
    expect(onTabChange).toHaveBeenCalledTimes(1);
    expect(onTabChange).toHaveBeenCalledWith('captions');
  });

  it('clicking the OPEN destination closes the dock', () => {
    const onTabChange = vi.fn();
    render(<CallSidePanelToggles tabs={tabs()} activeTab="chat" onTabChange={onTabChange} />);
    fireEvent.click(screen.getByTestId('call-chat-open'));
    expect(onTabChange).toHaveBeenCalledWith(null);
  });

  it('renders a badge count', () => {
    const withBadge = tabs();
    withBadge[0].badgeCount = 4;
    render(<CallSidePanelToggles tabs={withBadge} activeTab={null} onTabChange={() => {}} />);
    expect(screen.getByTestId('call-chat-open-badge')).toHaveTextContent('4');
  });
});

describe('per-mode dock behaviour', () => {
  it('resolves placement from the canonical widget mode', () => {
    expect(callSidePanelPlacement('window')).toBe('docked');
    expect(callSidePanelPlacement('fullscreen')).toBe('docked');
    expect(callSidePanelPlacement('mini')).toBe('overlay');
  });

  it('window/fullscreen dock as a right-edge COLUMN with a width', () => {
    const { rerender } = render(
      <CallSidePanel mode="window" tabs={tabs()} activeTab="chat" onTabChange={() => {}} />,
    );
    let panel = screen.getByTestId('call-side-panel');
    expect(panel).toHaveAttribute('data-call-side-panel-placement', 'docked');
    expect(panel.className).toContain('w-80');
    expect(panel.className).toContain('border-l');
    expect(panel.className).not.toContain('absolute');

    rerender(
      <CallSidePanel mode="fullscreen" tabs={tabs()} activeTab="chat" onTabChange={() => {}} />,
    );
    panel = screen.getByTestId('call-side-panel');
    expect(panel).toHaveAttribute('data-call-side-panel-placement', 'docked');
  });

  it('mini degrades to a full-bleed OVERLAY sheet instead of a column', () => {
    render(<CallSidePanel mode="mini" tabs={tabs()} activeTab="chat" onTabChange={() => {}} />);
    const panel = screen.getByTestId('call-side-panel');
    expect(panel).toHaveAttribute('data-call-side-panel-placement', 'overlay');
    expect(panel.className).toContain('absolute');
    expect(panel.className).toContain('inset-0');
    // Crucially it does NOT take the fixed column width that would crush
    // a 320px stage to nothing.
    expect(panel.className).not.toContain('w-80');
  });
});

// ---------------------------------------------------------------------------
// Widget wiring
// ---------------------------------------------------------------------------

const widgetBase = {
  state: 'active' as const,
  mode: 'video' as const,
  participants: [],
};

describe('CallWidget dock wiring', () => {
  it('renders the toggles into the control row without the host positioning them', () => {
    render(
      <CallWidget
        {...widgetBase}
        sidePanelTabs={tabs()}
        activeSidePanelTab={null}
        onSidePanelTabChange={() => {}}
      />,
    );
    expect(screen.getByTestId('call-chat-open')).toBeInTheDocument();
    expect(screen.queryByTestId('call-side-panel')).toBeNull();
  });

  it('the panel lives INSIDE the widget root, so it travels when dragged', () => {
    render(
      <CallWidget
        {...widgetBase}
        sidePanelTabs={tabs()}
        activeSidePanelTab="chat"
        onSidePanelTabChange={() => {}}
      />,
    );
    const root = screen.getByTestId('call-widget');
    // Not a sibling floating window: it is a descendant of the element
    // that carries the drag transform.
    const panel = within(root).getByTestId('call-side-panel');
    expect(panel).toBeInTheDocument();
    expect(root).toContainElement(panel);

    // Drag the widget and confirm the transform moved on the SHARED root.
    const header = root.querySelector('.cursor-grab') as HTMLElement;
    fireEvent.mouseDown(header, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 120, clientY: 60 });
    fireEvent.mouseUp(document);
    // jsdom reports zero-size rects, so the release also fires the
    // corner auto-snap — the exact offset is not the point. The point is
    // that ONE transform on the shared root moved both.
    expect(root.style.transform).not.toBe('translate(0px, 0px)');
    expect(root.style.transform).toMatch(/^translate\(-?\d+px, -?\d+px\)$/);
    expect(root).toContainElement(within(root).getByTestId('call-side-panel'));
  });

  it('WIDENS rather than splitting — and the stage column GROWS with it', () => {
    const { rerender } = render(
      <CallWidget {...widgetBase} sidePanelTabs={tabs()} activeSidePanelTab={null} />,
    );
    const card = () => screen.getByTestId('call-widget').firstElementChild as HTMLElement;
    expect(card().className).toContain(CALL_CARD_WIDTH);
    expect(card()).toHaveAttribute('data-call-side-panel-open', 'false');

    rerender(<CallWidget {...widgetBase} sidePanelTabs={tabs()} activeSidePanelTab="chat" />);
    expect(card().className).toContain('w-auto');
    expect(card()).toHaveAttribute('data-call-side-panel-open', 'true');
    // The stage is not squeezed by the panel beside it: it takes the wider
    // docked width, not the closed-card width.
    const stage = screen.getByTestId('call-widget-stage-column');
    expect(stage.className).toContain(CALL_STAGE_DOCKED_WIDTH);
    expect(stage.className).not.toContain(CALL_CARD_WIDTH);
  });

  it('mini has no stage to dock beside — no panel, no toggles', () => {
    render(
      <CallWidget
        {...widgetBase}
        displayMode="mini"
        sidePanelTabs={tabs()}
        activeSidePanelTab="chat"
      />,
    );
    expect(screen.queryByTestId('call-side-panel')).toBeNull();
    expect(screen.queryByTestId('call-chat-open')).toBeNull();
  });

  it('is inert while ringing — no dock before there is a call', () => {
    render(
      <CallWidget
        {...widgetBase}
        state="ringing"
        sidePanelTabs={tabs()}
        activeSidePanelTab="chat"
      />,
    );
    expect(screen.queryByTestId('call-side-panel')).toBeNull();
  });

  it('leaves the widget untouched when no tabs are supplied', () => {
    render(<CallWidget {...widgetBase} />);
    expect(screen.queryByTestId('call-side-panel-toggles')).toBeNull();
    expect(
      (screen.getByTestId('call-widget').firstElementChild as HTMLElement).className,
    ).toContain(CALL_CARD_WIDTH);
  });
});

// ---------------------------------------------------------------------------
// Height matching — the 2.108 complaint.
//
// The video column used to stop at its intrinsic height (stage + duration +
// controls) while the panel column ran on to its own content height, leaving
// a dead dark band under the controls. jsdom computes no layout, so these
// assert the structure that makes the heights equal: ONE height on the row,
// both columns taking all of it, and each column's slack absorbed inside
// itself.
// ---------------------------------------------------------------------------

describe('docked columns are height-matched', () => {
  function renderDocked(mode: 'video' | 'audio' = 'video') {
    render(
      <CallWidget
        {...widgetBase}
        mode={mode}
        sidePanelTabs={tabs()}
        activeSidePanelTab="chat"
        onSidePanelTabChange={() => {}}
      />,
    );
    const row = screen.getByTestId('call-widget-dock-row');
    return {
      row,
      stage: screen.getByTestId('call-widget-stage-column'),
      panel: screen.getByTestId('call-side-panel'),
    };
  }

  it('one height lives on the row and both columns take all of it', () => {
    const { row, stage, panel } = renderDocked();

    expect(row.className).toContain(CALL_DOCK_ROW_HEIGHT);
    expect(row.className).toContain('items-stretch');

    // Same flex row → same box height, and neither column opts out of it.
    expect(stage.parentElement).toBe(row);
    expect(panel.parentElement).toBe(row);
    expect(stage.className).toContain('h-full');
    expect(panel.className).toContain('h-full');

    // Nothing may cap a column below the row: a max-height on the panel is
    // exactly what used to desynchronise the two.
    for (const col of [stage, panel]) {
      expect(col.className).not.toMatch(/\bmax-h-/);
      expect(col.className).not.toMatch(/\bh-\[(?!full)/);
    }
  });

  it('the stage column fills its height — the slack goes to the video, not under the controls', () => {
    const { stage } = renderDocked();

    // The content root stretches...
    const content = stage.firstElementChild as HTMLElement;
    expect(content.className).toContain('h-full');
    // ...and the flexible region is the video stage, so the duration line
    // and the control row end up on the column's bottom edge.
    const grower = stage.querySelector('.flex-1');
    expect(grower).not.toBeNull();
    expect((grower as HTMLElement).className).toContain('bg-black');
  });

  it('audio mode fills too — the avatar strip takes the slack', () => {
    const { stage } = renderDocked('audio');
    const grower = stage.querySelector('.flex-1') as HTMLElement;
    expect(grower).not.toBeNull();
    expect(grower.className).toContain('items-center');
  });

  it('the panel body is the flexible region on its side', () => {
    const { panel } = renderDocked();
    const body = screen.getByTestId('call-chat-panel');
    expect(panel).toContainElement(body);
    expect(body.className).toContain('flex-1');
    expect(body.className).toContain('min-h-0');
  });

  it('with the dock CLOSED nothing is force-stretched (the card sizes to content)', () => {
    render(<CallWidget {...widgetBase} sidePanelTabs={tabs()} activeSidePanelTab={null} />);
    expect(screen.queryByTestId('call-widget-dock-row')).toBeNull();
    expect(screen.queryByTestId('call-widget-stage-column')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// One header per region.
// ---------------------------------------------------------------------------

describe('the docked composition has exactly ONE header', () => {
  const messages = [
    { clientId: 'alice', content: 'hi', timestamp: '2026-08-25T10:00:00.000Z', displayName: 'Alice' },
  ];

  function chatDock() {
    return [
      {
        id: 'chat',
        label: 'Chat',
        content: <ChatPanel tone="dark" messages={messages} onSend={() => {}} />,
      },
      { id: 'people', label: 'People', content: <div>people</div> },
    ];
  }

  it('the dock tab bar names the region; the chat body does not repeat it', () => {
    render(
      <CallWidget
        {...widgetBase}
        sidePanelTabs={chatDock()}
        activeSidePanelTab="chat"
        onSidePanelTabChange={() => {}}
      />,
    );

    // The tab is the header.
    expect(screen.getByTestId('call-side-panel-tab-chat')).toHaveTextContent('Chat');
    // And it is the ONLY thing in the widget that says "Chat".
    const chatLabels = screen
      .getAllByText(/^\s*Chat\b/)
      .filter((el) => el.children.length === 0);
    expect(chatLabels).toHaveLength(1);
    expect(screen.queryByText(/^Chat \(\d+\)$/)).toBeNull();
  });

  it('standalone — outside any dock — the chat panel keeps its own header', () => {
    render(<ChatPanel messages={messages} onSend={() => {}} />);
    expect(screen.getByText('Chat (1)')).toBeInTheDocument();
  });

  it('the opt-out is a prop, so a host can put the header back inside the dock', () => {
    render(
      <CallSidePanel
        tabs={[
          {
            id: 'chat',
            label: 'Chat',
            content: <ChatPanel showHeader tone="dark" messages={messages} onSend={() => {}} />,
          },
        ]}
        activeTab="chat"
        onTabChange={() => {}}
      />,
    );
    expect(screen.getByText('Chat (1)')).toBeInTheDocument();
  });
});

describe('ExpandableCallWidget dock wiring', () => {
  it('SPLITS in window mode — the stage keeps flex-1 beside the column', () => {
    render(
      <ExpandableCallWidget
        defaultMode="window"
        sidePanelTabs={tabs()}
        activeSidePanelTab="chat"
        onSidePanelTabChange={() => {}}
      >
        <div data-testid="stage">stage</div>
      </ExpandableCallWidget>,
    );
    const panel = screen.getByTestId('call-side-panel');
    expect(panel).toHaveAttribute('data-call-side-panel-placement', 'docked');
    const stageColumn = screen.getByTestId('stage').parentElement as HTMLElement;
    expect(stageColumn.className).toContain('flex-1');
    // Same flex row → siblings, not a detached window.
    expect(stageColumn.parentElement).toBe(panel.parentElement);
  });

  it('OVERLAYS in mini mode — 320px cannot be split', () => {
    render(
      <ExpandableCallWidget
        defaultMode="mini"
        sidePanelTabs={tabs()}
        activeSidePanelTab="chat"
        onSidePanelTabChange={() => {}}
      >
        <div data-testid="stage">stage</div>
      </ExpandableCallWidget>,
    );
    const panel = screen.getByTestId('call-side-panel');
    expect(panel).toHaveAttribute('data-call-side-panel-placement', 'overlay');
    // Stage is still mounted underneath (video elements never unmount).
    expect(screen.getByTestId('stage')).toBeInTheDocument();
  });

  it('the panel travels with the widget — it is inside the positioned root', () => {
    render(
      <ExpandableCallWidget
        defaultMode="window"
        sidePanelTabs={tabs()}
        activeSidePanelTab="chat"
      >
        <div data-testid="stage">stage</div>
      </ExpandableCallWidget>,
    );
    const root = document.querySelector('[data-call-widget-mode]') as HTMLElement;
    expect(root).toHaveAttribute('data-call-side-panel-open', 'true');
    expect(root).toContainElement(screen.getByTestId('call-side-panel'));
    expect(root.style.position).toBe('fixed');
  });

  it('appends the toggles to the controls strip', () => {
    render(
      <ExpandableCallWidget
        sidePanelTabs={tabs()}
        activeSidePanelTab={null}
        controls={<div data-testid="host-controls">controls</div>}
      >
        <div>stage</div>
      </ExpandableCallWidget>,
    );
    expect(screen.getByTestId('host-controls')).toBeInTheDocument();
    expect(screen.getByTestId('call-side-panel-toggles')).toBeInTheDocument();
  });

  it('renders unchanged markup when no tabs are supplied', () => {
    render(
      <ExpandableCallWidget>
        <div data-testid="stage">stage</div>
      </ExpandableCallWidget>,
    );
    const root = document.querySelector('[data-call-widget-mode]') as HTMLElement;
    expect(root).toHaveAttribute('data-call-side-panel-open', 'false');
    // Stage is a DIRECT child of the body region — no dock wrapper.
    expect((screen.getByTestId('stage').parentElement as HTMLElement).className)
      .toContain('bg-black');
  });
});
