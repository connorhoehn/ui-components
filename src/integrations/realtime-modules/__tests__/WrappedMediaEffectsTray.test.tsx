// src/integrations/realtime-modules/__tests__/WrappedMediaEffectsTray.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WrappedMediaEffectsTray } from '../WrappedMediaEffectsTray';
import type { RMMediaEffectsControllerSource } from '../WrappedMediaEffectsTray';

function makeController(
  overrides: Partial<RMMediaEffectsControllerSource> = {},
): RMMediaEffectsControllerSource {
  return {
    filterId: 'none',
    backgroundMode: 'none',
    backgroundImageUrl: null,
    faceSpriteId: null,
    filters: [
      { id: 'none', label: 'None' },
      { id: 'bw', label: 'B&W' },
    ],
    backgrounds: [{ id: 'dusk', label: 'Dusk', url: 'data:image/svg+xml,dusk' }],
    faceSprites: [{ id: 'sunglasses', label: '🕶️ Sunglasses' }],
    setFilter: vi.fn(),
    setBackgroundMode: vi.fn(),
    setBackgroundImageUrl: vi.fn(),
    setFaceSpriteId: vi.fn(),
    ...overrides,
  };
}

describe('WrappedMediaEffectsTray', () => {
  it('maps controller registries onto the tray and forwards selections', () => {
    const ctl = makeController();
    render(<WrappedMediaEffectsTray controller={ctl} />);

    fireEvent.click(screen.getByTestId('effects-filter-bw'));
    expect(ctl.setFilter).toHaveBeenCalledWith('bw');

    fireEvent.click(screen.getByTestId('effects-face-sunglasses'));
    expect(ctl.setFaceSpriteId).toHaveBeenCalledWith('sunglasses');
  });

  it('sets the background URL BEFORE the mode on image selection', () => {
    const order: string[] = [];
    const ctl = makeController({
      setBackgroundImageUrl: vi.fn(() => order.push('url')),
      setBackgroundMode: vi.fn(() => order.push('mode')),
    });
    render(<WrappedMediaEffectsTray controller={ctl} />);

    fireEvent.click(screen.getByTestId('effects-bg-dusk'));
    expect(ctl.setBackgroundImageUrl).toHaveBeenCalledWith('data:image/svg+xml,dusk');
    expect(ctl.setBackgroundMode).toHaveBeenCalledWith('image');
    expect(order).toEqual(['url', 'mode']);
  });

  it('clears the URL when blur or none is selected', () => {
    const ctl = makeController({ backgroundMode: 'image', backgroundImageUrl: 'data:image/svg+xml,dusk' });
    render(<WrappedMediaEffectsTray controller={ctl} />);

    fireEvent.click(screen.getByTestId('effects-bg-blur'));
    expect(ctl.setBackgroundImageUrl).toHaveBeenCalledWith(null);
    expect(ctl.setBackgroundMode).toHaveBeenCalledWith('blur');
  });

  it('reflects active state via aria-pressed', () => {
    const ctl = makeController({ filterId: 'bw' });
    render(<WrappedMediaEffectsTray controller={ctl} />);
    expect(screen.getByTestId('effects-filter-bw')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('effects-filter-none')).toHaveAttribute('aria-pressed', 'false');
  });
});
