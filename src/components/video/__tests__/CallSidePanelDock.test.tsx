// Docked side-panel behaviour: tab exclusivity, per-mode placement, and
// the property that made this a rewrite rather than a new floating
// window — the panel travels with the widget.

import { render, screen, fireEvent, within } from '@testing-library/react';
import { CallSidePanel, CallSidePanelToggles, callSidePanelPlacement } from '../CallSidePanel';
import type { CallSidePanelTab } from '../CallSidePanel';
import { CallWidget } from '../CallWidget';
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

  it('WIDENS rather than splitting — the 320px stage keeps its width', () => {
    const { rerender } = render(
      <CallWidget {...widgetBase} sidePanelTabs={tabs()} activeSidePanelTab={null} />,
    );
    const card = () => screen.getByTestId('call-widget').firstElementChild as HTMLElement;
    expect(card().className).toContain('w-[320px]');
    expect(card()).toHaveAttribute('data-call-side-panel-open', 'false');

    rerender(<CallWidget {...widgetBase} sidePanelTabs={tabs()} activeSidePanelTab="chat" />);
    expect(card().className).toContain('w-auto');
    expect(card()).toHaveAttribute('data-call-side-panel-open', 'true');
    // Stage column still 320px wide beside the panel.
    expect(card().querySelector('.w-\\[320px\\]')).not.toBeNull();
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
    ).toContain('w-[320px]');
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
