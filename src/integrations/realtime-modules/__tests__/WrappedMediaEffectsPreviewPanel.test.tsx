// Preview-session lifecycle: the adapter owns begin/apply/cancel so that
// abandoning the surface can never publish an effect to peers.

import { render, screen, fireEvent } from '@testing-library/react';
import { WrappedMediaEffectsPreviewPanel } from '../WrappedMediaEffectsPreviewPanel';
import type {
  RMMediaEffectsPreviewControllerSource,
  RMMediaEffectsSettings,
} from '../WrappedMediaEffectsPreviewPanel';

const LIVE: RMMediaEffectsSettings = {
  filterId: 'none',
  backgroundMode: 'none',
  backgroundImageUrl: null,
  faceSpriteId: null,
};

function controller(
  overrides: Partial<RMMediaEffectsPreviewControllerSource> = {},
): RMMediaEffectsPreviewControllerSource {
  return {
    ...LIVE,
    filters: [{ id: 'bw', label: 'B&W' }],
    backgrounds: [{ id: 'dusk', label: 'Dusk', url: '/dusk.jpg' }],
    faceSprites: [{ id: 'sunglasses', label: '🕶 Sunglasses' }],
    setFilter: vi.fn(),
    setBackgroundMode: vi.fn(),
    setBackgroundImageUrl: vi.fn(),
    setFaceSpriteId: vi.fn(),
    draft: { ...LIVE },
    isDirty: false,
    previewTrack: null,
    beginPreview: vi.fn(),
    applyPreview: vi.fn(),
    cancelPreview: vi.fn(),
    ...overrides,
  };
}

// The suite runs under `configure({ reactStrictMode: true })`, so every
// effect mounts → cleans up → mounts again. A session lifecycle of
// begin / cancel / begin is correct under those rules (the net state is
// one open session), so these tests assert on the DELTA a user action
// produces rather than absolute call counts.
const calls = (fn: unknown) => (fn as ReturnType<typeof vi.fn>).mock.calls.length;

describe('WrappedMediaEffectsPreviewPanel', () => {
  it('renders nothing while closed and never opens a session', () => {
    const ctl = controller();
    render(<WrappedMediaEffectsPreviewPanel open={false} controller={ctl} onClose={() => {}} />);
    expect(screen.queryByTestId('media-effects-preview-panel')).toBeNull();
    expect(ctl.beginPreview).not.toHaveBeenCalled();
  });

  it('opening the surface begins a preview session', () => {
    const ctl = controller();
    render(<WrappedMediaEffectsPreviewPanel open controller={ctl} onClose={() => {}} />);
    expect(ctl.beginPreview).toHaveBeenCalled();
    expect(ctl.applyPreview).not.toHaveBeenCalled();
  });

  it('DISMISSING calls cancelPreview — abandoning never publishes', () => {
    const ctl = controller();
    const onClose = vi.fn();
    render(<WrappedMediaEffectsPreviewPanel open controller={ctl} onClose={onClose} />);
    const before = calls(ctl.cancelPreview);
    fireEvent.click(screen.getByTestId('media-effects-preview-cancel'));
    expect(calls(ctl.cancelPreview)).toBe(before + 1);
    expect(ctl.applyPreview).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('UNMOUNTING mid-session calls cancelPreview', () => {
    const ctl = controller();
    const { unmount } = render(
      <WrappedMediaEffectsPreviewPanel open controller={ctl} onClose={() => {}} />,
    );
    const before = calls(ctl.cancelPreview);
    unmount();
    expect(calls(ctl.cancelPreview)).toBe(before + 1);
    expect(ctl.applyPreview).not.toHaveBeenCalled();
  });

  it('closing via the `open` prop calls cancelPreview', () => {
    const ctl = controller();
    const { rerender } = render(
      <WrappedMediaEffectsPreviewPanel open controller={ctl} onClose={() => {}} />,
    );
    const before = calls(ctl.cancelPreview);
    rerender(
      <WrappedMediaEffectsPreviewPanel open={false} controller={ctl} onClose={() => {}} />,
    );
    expect(calls(ctl.cancelPreview)).toBe(before + 1);
  });

  it('Apply commits ONCE and is not undone by the teardown cancel', () => {
    const ctl = controller({ isDirty: true });
    const onClose = vi.fn();
    const onApplied = vi.fn();
    const { unmount } = render(
      <WrappedMediaEffectsPreviewPanel
        open
        controller={ctl}
        onClose={onClose}
        onApplied={onApplied}
      />,
    );
    const cancelsBeforeApply = calls(ctl.cancelPreview);
    fireEvent.click(screen.getByTestId('media-effects-preview-apply'));
    expect(ctl.applyPreview).toHaveBeenCalledTimes(1);
    expect(onApplied).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
    // The host unmounts the surface in response to onClose. That teardown
    // must NOT cancel the session it just committed — a cancel here would
    // silently revert the effect the user just published.
    unmount();
    expect(calls(ctl.cancelPreview)).toBe(cancelsBeforeApply);
  });

  it('chips reflect the DRAFT, not live', () => {
    const ctl = controller({
      filterId: 'none',
      draft: { ...LIVE, filterId: 'bw', faceSpriteId: 'sunglasses' },
      isDirty: true,
    });
    render(<WrappedMediaEffectsPreviewPanel open controller={ctl} onClose={() => {}} />);
    expect(screen.getByTestId('effects-filter-bw')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('effects-face-sunglasses')).toHaveAttribute('aria-pressed', 'true');
  });

  it('selections route to the controller setters (which write the draft)', () => {
    const ctl = controller();
    render(<WrappedMediaEffectsPreviewPanel open controller={ctl} onClose={() => {}} />);
    fireEvent.click(screen.getByTestId('effects-face-sunglasses'));
    expect(ctl.setFaceSpriteId).toHaveBeenCalledWith('sunglasses');

    fireEvent.click(screen.getByTestId('effects-bg-dusk'));
    expect(ctl.setBackgroundImageUrl).toHaveBeenCalledWith('/dusk.jpg');
    expect(ctl.setBackgroundMode).toHaveBeenCalledWith('image');
  });

  it('a controller whose beginPreview leaves draft null renders INERT — no setter can fire', () => {
    // The engine failed to start a session. The surface must not fall
    // back to the live pipeline: that is precisely the bug being fixed.
    const ctl = controller({ draft: null });
    render(<WrappedMediaEffectsPreviewPanel open controller={ctl} onClose={() => {}} />);
    for (const btn of screen.getAllByRole('button')) fireEvent.click(btn);
    expect(ctl.setFilter).not.toHaveBeenCalled();
    expect(ctl.setBackgroundMode).not.toHaveBeenCalled();
    expect(ctl.setFaceSpriteId).not.toHaveBeenCalled();
    expect(ctl.applyPreview).not.toHaveBeenCalled();
  });
});
