import { render, screen, fireEvent, act } from '@testing-library/react';
import { useRef } from 'react';
import { FullscreenToggle } from '../FullscreenToggle';

function Host() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div ref={ref} data-testid="stage">stage</div>
      <FullscreenToggle target={ref} data-testid="fs" />
    </div>
  );
}

describe('FullscreenToggle', () => {
  it('renders nothing where the Fullscreen API is absent', () => {
    render(<Host />);
    expect(screen.queryByTestId('fs')).toBeNull();
  });

  it('flips its label, glyph and pressed state with the element', async () => {
    let current: Element | null = null;
    Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => current });
    Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, get: () => true });
    Element.prototype.requestFullscreen = vi.fn(function (this: Element) { current = this; document.dispatchEvent(new Event('fullscreenchange')); return Promise.resolve(); });
    document.exitFullscreen = vi.fn(() => { current = null; document.dispatchEvent(new Event('fullscreenchange')); return Promise.resolve(); });
    try {
      render(<Host />);
      const button = screen.getByTestId('fs');
      expect(button.getAttribute('aria-label')).toBe('Full screen');
      expect(button.getAttribute('aria-pressed')).toBe('false');
      await act(async () => { fireEvent.click(button); });
      expect(button.getAttribute('aria-label')).toBe('Exit full screen');
      expect(button.getAttribute('aria-pressed')).toBe('true');
      expect(button.getAttribute('data-fullscreen')).toBe('true');
      expect(current).toBe(screen.getByTestId('stage'));
      await act(async () => { fireEvent.click(button); });
      expect(button.getAttribute('aria-label')).toBe('Full screen');
    } finally {
      delete (Element.prototype as { requestFullscreen?: unknown }).requestFullscreen;
      delete (document as { exitFullscreen?: unknown }).exitFullscreen;
      delete (document as { fullscreenElement?: unknown }).fullscreenElement;
      delete (document as { fullscreenEnabled?: unknown }).fullscreenEnabled;
    }
  });
});
