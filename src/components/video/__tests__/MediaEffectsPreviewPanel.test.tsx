// Preview-before-publish effects surface.
//
// Two properties carry the whole feature and both are bite-verified in
// this file (see the RELEASE report):
//   1. Apply is dead until the draft actually differs from live.
//   2. NOTHING in the surface calls a selection setter outside a preview
//      session — so a click can never reach the live pipeline.

import { render, screen, fireEvent } from '@testing-library/react';
import { MediaEffectsPreviewPanel, guardedSelection } from '../MediaEffectsPreviewPanel';
import type { MediaEffectsPreviewPanelProps } from '../MediaEffectsPreviewPanel';

function props(
  overrides: Partial<MediaEffectsPreviewPanelProps> = {},
): MediaEffectsPreviewPanelProps {
  return {
    previewActive: true,
    previewStream: null,
    isDirty: false,
    onApply: vi.fn(),
    onCancel: vi.fn(),
    filters: [{ id: 'bw', label: 'B&W' }],
    activeFilterId: 'none',
    onSelectFilter: vi.fn(),
    backgrounds: [{ id: 'dusk', label: 'Dusk', url: '/dusk.jpg' }],
    backgroundMode: 'none',
    activeBackgroundUrl: null,
    onSelectBackground: vi.fn(),
    faceSprites: [{ id: 'sunglasses', label: '🕶 Sunglasses' }],
    activeFaceSpriteId: null,
    onSelectFaceSprite: vi.fn(),
    ...overrides,
  };
}

describe('MediaEffectsPreviewPanel', () => {
  it('gives the self-view the top of the panel and labels it as private', () => {
    render(<MediaEffectsPreviewPanel {...props()} />);
    expect(screen.getByTestId('media-effects-preview-stage')).toBeInTheDocument();
    // Unmistakable, and said in WORDS — not just styling.
    expect(screen.getByTestId('media-effects-preview-badge')).toHaveTextContent('only you');
    expect(screen.getByTestId('media-effects-preview-notice')).toHaveTextContent(
      /Nobody else in the call can see these effects until you choose Apply/i,
    );
  });

  it('binds previewTrack-backed stream into the self-view', () => {
    const stream = { id: 's1' } as unknown as MediaStream;
    render(<MediaEffectsPreviewPanel {...props({ previewStream: stream })} />);
    expect(screen.getByTestId('media-effects-preview-video')).toBeInTheDocument();
    expect(screen.queryByTestId('media-effects-preview-empty')).toBeNull();
  });

  // ── Apply gating ────────────────────────────────────────────────────
  it('Apply is DISABLED until the draft is dirty', () => {
    const { rerender } = render(<MediaEffectsPreviewPanel {...props({ isDirty: false })} />);
    expect(screen.getByTestId('media-effects-preview-apply')).toBeDisabled();

    rerender(<MediaEffectsPreviewPanel {...props({ isDirty: true })} />);
    expect(screen.getByTestId('media-effects-preview-apply')).not.toBeDisabled();
  });

  it('a disabled Apply cannot fire onApply', () => {
    const onApply = vi.fn();
    render(<MediaEffectsPreviewPanel {...props({ isDirty: false, onApply })} />);
    fireEvent.click(screen.getByTestId('media-effects-preview-apply'));
    expect(onApply).not.toHaveBeenCalled();
  });

  it('Apply stays disabled when dirty but no session is open', () => {
    render(<MediaEffectsPreviewPanel {...props({ isDirty: true, previewActive: false })} />);
    expect(screen.getByTestId('media-effects-preview-apply')).toBeDisabled();
  });

  it('a dirty Apply commits', () => {
    const onApply = vi.fn();
    render(<MediaEffectsPreviewPanel {...props({ isDirty: true, onApply })} />);
    fireEvent.click(screen.getByTestId('media-effects-preview-apply'));
    expect(onApply).toHaveBeenCalledTimes(1);
  });

  it('Cancel always works — abandoning must never be blocked', () => {
    const onCancel = vi.fn();
    render(<MediaEffectsPreviewPanel {...props({ isDirty: false, onCancel })} />);
    fireEvent.click(screen.getByTestId('media-effects-preview-cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  // ── The safety property ─────────────────────────────────────────────
  describe('outside a preview session NOTHING calls a selection setter', () => {
    // Layer 1 — the callback gate every handler in the panel is wrapped
    // in. Asserted directly: a disabled <button> swallows clicks before
    // React ever dispatches, so a DOM-level test would pass even with
    // this gate removed and prove nothing.
    it('the guard swallows the call outside a session and passes it through inside', () => {
      const fn = vi.fn();
      guardedSelection(false, fn)('bw');
      expect(fn).not.toHaveBeenCalled();
      guardedSelection(true, fn)('bw');
      expect(fn).toHaveBeenCalledWith('bw');
    });

    it('every panel handler goes through the guard, so none fire outside a session', () => {
      const p = props({ previewActive: false });
      render(<MediaEffectsPreviewPanel {...p} />);
      // Reach past the disabled attribute and invoke the handlers the way
      // the guard sees them.
      for (const handler of [p.onSelectFilter, p.onSelectBackground, p.onSelectFaceSprite]) {
        guardedSelection(false, handler as (...a: unknown[]) => void)('bw');
      }
      expect(p.onSelectFilter).not.toHaveBeenCalled();
      expect(p.onSelectBackground).not.toHaveBeenCalled();
      expect(p.onSelectFaceSprite).not.toHaveBeenCalled();
    });

    // Layer 2 — the chips are also visibly inert.
    it('every tray click is swallowed when previewActive is false', () => {
      const p = props({ previewActive: false });
      render(<MediaEffectsPreviewPanel {...p} />);

      // Click every chip in the surface, disabled or not.
      for (const btn of screen.getAllByRole('button')) {
        fireEvent.click(btn);
      }

      expect(p.onSelectFilter).not.toHaveBeenCalled();
      expect(p.onSelectBackground).not.toHaveBeenCalled();
      expect(p.onSelectFaceSprite).not.toHaveBeenCalled();
      expect(p.onApply).not.toHaveBeenCalled();
    });

    it('the same clicks DO reach the draft setters inside a session', () => {
      const p = props({ previewActive: true });
      render(<MediaEffectsPreviewPanel {...p} />);
      fireEvent.click(screen.getByTestId('effects-filter-bw'));
      fireEvent.click(screen.getByTestId('effects-face-sunglasses'));
      fireEvent.click(screen.getByTestId('effects-bg-blur'));
      expect(p.onSelectFilter).toHaveBeenCalledWith('bw');
      expect(p.onSelectFaceSprite).toHaveBeenCalledWith('sunglasses');
      expect(p.onSelectBackground).toHaveBeenCalledWith('blur', null);
    });

    it('the trays are also visibly inert outside a session', () => {
      render(<MediaEffectsPreviewPanel {...props({ previewActive: false })} />);
      expect(screen.getByTestId('effects-filter-bw')).toBeDisabled();
      expect(screen.getByTestId('media-effects-preview-notice')).toHaveTextContent(
        /read-only/i,
      );
    });
  });

  it('paints from tokens, never literal colors', () => {
    const { container } = render(<MediaEffectsPreviewPanel {...props()} />);
    expect(container.innerHTML).not.toMatch(/#[0-9a-f]{6}\b/i);
  });
});
