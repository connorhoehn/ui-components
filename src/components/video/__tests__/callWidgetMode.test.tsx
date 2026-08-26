// Canonical display-mode vocabulary — 'mini' | 'window' | 'fullscreen' —
// and its equivalence with the legacy spellings it replaces:
//
//   <CallWidget minimized>              ≡  <CallWidget displayMode="mini">
//   <CallWidget> / minimized={false}    ≡  <CallWidget displayMode="window">
//   <ExpandableCallWidget defaultMode="docked">
//                                       ≡  … defaultMode="window"
//
// The equivalence tests compare RENDERED OUTPUT, not internal flags: a
// mapping that typechecks but paints different chrome is exactly the
// regression this pair of props exists to prevent.

import { act, fireEvent, render, screen } from '@testing-library/react';
import { CallWidget } from '../CallWidget';
import { ExpandableCallWidget } from '../ExpandableCallWidget';
import {
  modeFromMinimized,
  toCanonicalMode,
  toLegacyMode,
  __resetCallWidgetModeWarnings,
} from '../callWidgetMode';

/** Strip the volatile drag transform so two renders can be compared. */
function widgetMarkup(): string {
  const root = screen.getByTestId('call-widget') as HTMLElement;
  return root.innerHTML;
}

function renderCall(props: Partial<React.ComponentProps<typeof CallWidget>>) {
  return render(
    <CallWidget
      state="active"
      mode="video"
      participants={[{ id: 'a', displayName: 'Ana' }]}
      duration={42}
      {...props}
    />,
  );
}

describe('callWidgetMode helpers', () => {
  it('normalizes the legacy dialect to canonical', () => {
    expect(toCanonicalMode('docked')).toBe('window');
    expect(toCanonicalMode('window')).toBe('window');
    expect(toCanonicalMode('mini')).toBe('mini');
    expect(toCanonicalMode('fullscreen')).toBe('fullscreen');
  });

  it('converts canonical back to the legacy dialect', () => {
    expect(toLegacyMode('window')).toBe('docked');
    expect(toLegacyMode('mini')).toBe('mini');
    expect(toLegacyMode('fullscreen')).toBe('fullscreen');
  });

  it('round-trips through both directions', () => {
    for (const m of ['mini', 'window', 'fullscreen'] as const) {
      expect(toCanonicalMode(toLegacyMode(m))).toBe(m);
    }
  });

  it('maps the legacy boolean', () => {
    expect(modeFromMinimized(true)).toBe('mini');
    expect(modeFromMinimized(false)).toBe('window');
  });
});

describe('CallWidget — legacy `minimized` ≡ canonical `displayMode`', () => {
  beforeEach(() => {
    __resetCallWidgetModeWarnings();
  });

  it('minimized={true} renders exactly what displayMode="mini" renders', () => {
    const legacy = renderCall({ minimized: true });
    const legacyHtml = widgetMarkup();
    legacy.unmount();

    renderCall({ displayMode: 'mini' });
    expect(widgetMarkup()).toBe(legacyHtml);
  });

  it('minimized={false} renders exactly what displayMode="window" renders', () => {
    const legacy = renderCall({ minimized: false });
    const legacyHtml = widgetMarkup();
    legacy.unmount();

    renderCall({ displayMode: 'window' });
    expect(widgetMarkup()).toBe(legacyHtml);
  });

  it('omitting both is identical to minimized={false}', () => {
    const legacy = renderCall({ minimized: false });
    const legacyHtml = widgetMarkup();
    legacy.unmount();

    renderCall({});
    expect(widgetMarkup()).toBe(legacyHtml);
  });

  it('the two spellings paint DIFFERENT chrome for different modes', () => {
    // Guards the equivalence tests above from passing vacuously: if the
    // mode prop were ignored entirely, mini and window would also match.
    const mini = renderCall({ displayMode: 'mini' });
    const miniHtml = widgetMarkup();
    mini.unmount();

    renderCall({ displayMode: 'window' });
    expect(widgetMarkup()).not.toBe(miniHtml);
  });

  it('stamps the resolved mode on the root in both dialects', () => {
    const legacy = renderCall({ minimized: true });
    expect(screen.getByTestId('call-widget')).toHaveAttribute('data-call-widget-mode', 'mini');
    expect(screen.getByTestId('call-widget')).toHaveAttribute('data-call-widget-mode-legacy', 'mini');
    legacy.unmount();

    renderCall({ displayMode: 'window' });
    expect(screen.getByTestId('call-widget')).toHaveAttribute('data-call-widget-mode', 'window');
    // Back-compat hook for selectors written against the old vocabulary.
    expect(screen.getByTestId('call-widget')).toHaveAttribute('data-call-widget-mode-legacy', 'docked');
  });

  it('displayMode="fullscreen" renders the full chrome and reports itself', () => {
    renderCall({ displayMode: 'fullscreen' });
    const root = screen.getByTestId('call-widget');
    expect(root).toHaveAttribute('data-call-widget-mode', 'fullscreen');
    // Not the collapsed pill: the header (with its call-mode label) is present.
    expect(screen.getByText('Video Call')).toBeInTheDocument();
  });

  it('displayMode wins when both are supplied, and warns once', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const first = renderCall({ minimized: true, displayMode: 'window' });
      expect(screen.getByTestId('call-widget')).toHaveAttribute('data-call-widget-mode', 'window');
      expect(warn).toHaveBeenCalledTimes(1);
      expect(String(warn.mock.calls[0]![0])).toContain('minimized');
      first.unmount();

      // Second conflicting render is silent — one warning per component.
      renderCall({ minimized: false, displayMode: 'mini' });
      expect(screen.getByTestId('call-widget')).toHaveAttribute('data-call-widget-mode', 'mini');
      expect(warn).toHaveBeenCalledTimes(1);
    } finally {
      warn.mockRestore();
    }
  });

  it('does not warn when only one dialect is used', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const a = renderCall({ minimized: true });
      a.unmount();
      const b = renderCall({ displayMode: 'window' });
      b.unmount();
      renderCall({});
      expect(warn).not.toHaveBeenCalled();
    } finally {
      warn.mockRestore();
    }
  });
});

describe('ExpandableCallWidget — legacy "docked" ≡ canonical "window"', () => {
  function renderExpandable(defaultMode: 'docked' | 'window') {
    return render(
      <ExpandableCallWidget title="Test Call" defaultMode={defaultMode}>
        <div data-testid="body-content" />
      </ExpandableCallWidget>,
    );
  }

  function root(): HTMLElement {
    return screen.getByTestId('body-content').closest('[data-call-widget-mode]') as HTMLElement;
  }

  it('defaultMode="docked" and defaultMode="window" produce the same chrome', () => {
    const legacy = renderExpandable('docked');
    const legacyHtml = root().innerHTML;
    const legacyStyle = root().getAttribute('style');
    legacy.unmount();

    renderExpandable('window');
    expect(root().innerHTML).toBe(legacyHtml);
    expect(root().getAttribute('style')).toBe(legacyStyle);
  });

  it('emits the canonical vocabulary regardless of which dialect went in', () => {
    const legacy = renderExpandable('docked');
    expect(root()).toHaveAttribute('data-call-widget-mode', 'window');
    expect(root()).toHaveAttribute('data-call-widget-mode-legacy', 'docked');
    legacy.unmount();

    renderExpandable('window');
    expect(root()).toHaveAttribute('data-call-widget-mode', 'window');
  });

  it('onModeChange reports canonical names', () => {
    const onModeChange = vi.fn();
    render(
      <ExpandableCallWidget title="Test Call" defaultMode="docked" onModeChange={onModeChange}>
        <div data-testid="body-content" />
      </ExpandableCallWidget>,
    );
    expect(onModeChange).toHaveBeenLastCalledWith('window');

    act(() => {
      fireEvent.click(screen.getByTestId('call-widget-mode-mini'));
    });
    expect(onModeChange).toHaveBeenLastCalledWith('mini');
  });

  it('apiRef.setMode accepts either dialect', () => {
    const ref = { current: null } as React.RefObject<
      { mode: string; setMode: (m: 'docked' | 'window' | 'mini') => void } | null
    >;
    render(
      <ExpandableCallWidget title="Test Call" apiRef={ref as never}>
        <div data-testid="body-content" />
      </ExpandableCallWidget>,
    );
    expect(root()).toHaveAttribute('data-call-widget-mode', 'mini');

    act(() => { ref.current!.setMode('docked'); });
    expect(root()).toHaveAttribute('data-call-widget-mode', 'window');
    expect(ref.current!.mode).toBe('window');

    act(() => { ref.current!.setMode('mini'); });
    act(() => { ref.current!.setMode('window'); });
    expect(root()).toHaveAttribute('data-call-widget-mode', 'window');
  });
});

describe('persisted mode vocabulary', () => {
  const KEY = 'mode-vocab-test';
  beforeEach(() => localStorage.clear());

  it('writes the LEGACY spelling so an older build can still read it back', () => {
    vi.useFakeTimers();
    try {
      render(
        <ExpandableCallWidget title="Test Call" persistKey={KEY}>
          <div data-testid="body-content" />
        </ExpandableCallWidget>,
      );
      act(() => { fireEvent.click(screen.getByTestId('call-widget-mode-window')); });
      act(() => { vi.runAllTimers(); });

      expect(JSON.parse(localStorage.getItem(KEY)!).mode).toBe('docked');
    } finally {
      vi.useRealTimers();
    }
  });

  it('hydrates either spelling into the canonical mode', () => {
    for (const stored of ['docked', 'window']) {
      localStorage.setItem(
        KEY,
        JSON.stringify({ v: 1, mode: stored, x: 10, y: 10, width: 700, height: 450 }),
      );
      const view = render(
        <ExpandableCallWidget title="Test Call" persistKey={KEY}>
          <div data-testid="body-content" />
        </ExpandableCallWidget>,
      );
      expect(screen.getByTestId('body-content').closest('[data-call-widget-mode]'))
        .toHaveAttribute('data-call-widget-mode', 'window');
      view.unmount();
    }
  });
});
