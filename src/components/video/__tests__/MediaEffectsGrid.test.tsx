import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MediaEffectsTray from '../MediaEffectsTray';
import MediaEffectsPreviewPanel from '../MediaEffectsPreviewPanel';

const filters = ['none', 'bw', 'warm', 'cool', 'sepia', 'vivid', 'fade'].map((id) => ({ id, label: id, cssFilter: id === 'bw' ? 'grayscale(1)' : 'none' }));
const props = {
  filters,
  activeFilterId: 'warm',
  onSelectFilter: vi.fn(),
  backgrounds: [{ id: 'dusk', label: 'Dusk', url: 'data:image/svg+xml;utf8,<svg xmlns="x"/>' }],
  backgroundMode: 'blur' as const,
  activeBackgroundUrl: null,
  onSelectBackground: vi.fn(),
  faceSprites: [
    { id: 'sunglasses', label: 'Sunglasses' },
    { id: 'dog', label: 'Dog ears' },
    { id: 'crown', label: 'Crown' },
    { id: 'hat', label: 'Hat' },
  ],
  activeFaceSpriteId: null,
  onSelectFaceSprite: vi.fn(),
};

describe('MediaEffectsTray grid layout', () => {
  it('folds filters behind More..., rings the active ones, resets, and exposes the §7 ids', () => {
    const onSelectFilter = vi.fn();
    const onSelectBackground = vi.fn();
    render(<MediaEffectsTray {...props} onSelectFilter={onSelectFilter} onSelectBackground={onSelectBackground} layout="grid" onSelectCustomBackground={() => {}} />);
    expect(screen.queryByTestId('effects-filter-fade')).toBeNull();
    expect(screen.getByTestId('effects-filter-warm').getAttribute('data-active')).toBe('true');
    expect(screen.getByTestId('effects-background-blur').getAttribute('data-active')).toBe('true');
    fireEvent.click(screen.getByTestId('effects-filter-more'));
    expect(screen.getByTestId('effects-filter-fade')).toBeTruthy();
    fireEvent.click(screen.getByTestId('effects-filter-reset'));
    expect(onSelectFilter).toHaveBeenLastCalledWith('none');
    fireEvent.click(screen.getByTestId('effects-background-dusk'));
    expect(onSelectBackground).toHaveBeenLastCalledWith('image', props.backgrounds[0]!.url);
    expect(screen.getByTestId('effects-background-custom')).toBeTruthy();
    expect(screen.getByTestId('effects-face-select')).toBeTruthy();
    expect(screen.getByTestId('effects-face-more')).toBeTruthy();
  });

  it('says when backgrounds cannot run', () => {
    render(<MediaEffectsTray {...props} layout="grid" backgroundsUnsupported />);
    expect(screen.getByText('Backgrounds need a newer browser')).toBeTruthy();
  });
});

describe('MediaEffectsPreviewPanel surface variant', () => {
  it('shows the chip and hint, the grid tray, and no footer when the host owns it', () => {
    render(
      <MediaEffectsPreviewPanel
        {...props}
        variant="surface"
        showFooter={false}
        previewActive
        previewStream={null}
        isDirty
        onApply={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByText('Preview · Only you')).toBeTruthy();
    expect(screen.getByText('Changes appear in the call after Apply.')).toBeTruthy();
    expect(screen.getByText('Turn the camera on to preview effects')).toBeTruthy();
    expect(screen.getByTestId('media-effects-preview-tray').getAttribute('data-layout')).toBe('grid');
    expect(screen.queryByTestId('media-effects-preview-apply')).toBeNull();
  });
});
