import { render, screen, fireEvent, act } from '@testing-library/react';
import { PiPButton } from '../PiPButton';

// jsdom does not implement the Picture-in-Picture API. We patch document
// + HTMLVideoElement directly for each test and restore in afterEach.
type DocumentWithPiP = Document & {
  pictureInPictureEnabled?: boolean;
  pictureInPictureElement?: Element | null;
  exitPictureInPicture?: () => Promise<void>;
};

function setPiPSupport(enabled: boolean) {
  Object.defineProperty(document, 'pictureInPictureEnabled', {
    configurable: true,
    get: () => enabled,
  });
}

function setActivePiPElement(el: Element | null) {
  Object.defineProperty(document, 'pictureInPictureElement', {
    configurable: true,
    get: () => el,
  });
}

function makeVideo(requestImpl?: () => Promise<unknown>): HTMLVideoElement {
  const v = document.createElement('video');
  Object.defineProperty(v, 'requestPictureInPicture', {
    configurable: true,
    writable: true,
    value: requestImpl ?? (() => Promise.resolve()),
  });
  return v;
}

describe('PiPButton', () => {
  let originalEnabled: PropertyDescriptor | undefined;
  let originalElement: PropertyDescriptor | undefined;
  let exitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    originalEnabled = Object.getOwnPropertyDescriptor(Document.prototype, 'pictureInPictureEnabled');
    originalElement = Object.getOwnPropertyDescriptor(Document.prototype, 'pictureInPictureElement');
    exitSpy = vi.fn(() => Promise.resolve());
    Object.defineProperty(document, 'exitPictureInPicture', {
      configurable: true,
      writable: true,
      value: exitSpy,
    });
    setPiPSupport(true);
    setActivePiPElement(null);
  });

  afterEach(() => {
    // Drop our per-instance descriptors so the next test starts clean.
    delete (document as Partial<DocumentWithPiP>).pictureInPictureEnabled;
    delete (document as Partial<DocumentWithPiP>).pictureInPictureElement;
    delete (document as Partial<DocumentWithPiP>).exitPictureInPicture;
    if (originalEnabled) Object.defineProperty(Document.prototype, 'pictureInPictureEnabled', originalEnabled);
    if (originalElement) Object.defineProperty(Document.prototype, 'pictureInPictureElement', originalElement);
  });

  it('renders disabled when document.pictureInPictureEnabled is false', () => {
    setPiPSupport(false);
    render(<PiPButton getVideoElement={() => null} />);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('title', 'Picture-in-Picture not supported');
  });

  it('renders enabled with aria-pressed=false initially when supported', () => {
    render(<PiPButton getVideoElement={() => null} />);
    const btn = screen.getByRole('button');
    expect(btn).not.toBeDisabled();
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(btn).toHaveAttribute('aria-label', 'Open Picture-in-Picture');
  });

  it('clicking calls getVideoElement and then requestPictureInPicture on it', async () => {
    const requestPiP = vi.fn(() => Promise.resolve());
    const video = makeVideo(requestPiP);
    const getVideoElement = vi.fn(() => video);
    render(<PiPButton getVideoElement={getVideoElement} />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(getVideoElement).toHaveBeenCalledTimes(1);
    expect(requestPiP).toHaveBeenCalledTimes(1);
    expect(exitSpy).not.toHaveBeenCalled();
    expect(video.disablePictureInPicture).toBe(false);
  });

  it('clicking when pictureInPictureElement is set calls exitPictureInPicture instead', async () => {
    const requestPiP = vi.fn(() => Promise.resolve());
    const video = makeVideo(requestPiP);
    setActivePiPElement(video);
    render(<PiPButton getVideoElement={() => video} />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(exitSpy).toHaveBeenCalledTimes(1);
    expect(requestPiP).not.toHaveBeenCalled();
  });

  it('is a no-op when getVideoElement returns null', async () => {
    const getVideoElement = vi.fn(() => null);
    render(<PiPButton getVideoElement={getVideoElement} />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(getVideoElement).toHaveBeenCalledTimes(1);
    expect(exitSpy).not.toHaveBeenCalled();
    // aria-pressed stays false since we never entered PiP
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('swallows errors from requestPictureInPicture (user-gesture failure / race)', async () => {
    const requestPiP = vi.fn(() => Promise.reject(new Error('not allowed')));
    const video = makeVideo(requestPiP);
    render(<PiPButton getVideoElement={() => video} />);
    // Should not throw past the boundary.
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(requestPiP).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('syncs aria-pressed=true on document enterpictureinpicture event', () => {
    render(<PiPButton getVideoElement={() => null} />);
    act(() => {
      document.dispatchEvent(new Event('enterpictureinpicture'));
    });
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    expect(btn).toHaveAttribute('aria-label', 'Exit Picture-in-Picture');
    expect(btn).toHaveAttribute('title', 'Exit Picture-in-Picture');
  });

  it('syncs aria-pressed=false on document leavepictureinpicture event', () => {
    render(<PiPButton getVideoElement={() => null} />);
    act(() => {
      document.dispatchEvent(new Event('enterpictureinpicture'));
    });
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    act(() => {
      document.dispatchEvent(new Event('leavepictureinpicture'));
    });
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('removes enter/leave listeners on unmount', () => {
    const { unmount } = render(<PiPButton getVideoElement={() => null} />);
    unmount();
    // After unmount, dispatching the event must not reach React (no
    // throw + no orphan state update). The smoke test below is enough:
    // if listeners leaked, React would warn about state updates on an
    // unmounted component, surfaced via console.error.
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    act(() => {
      document.dispatchEvent(new Event('enterpictureinpicture'));
      document.dispatchEvent(new Event('leavepictureinpicture'));
    });
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
