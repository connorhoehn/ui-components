import { render, screen, fireEvent } from '@testing-library/react';
import { CallSettingsDialog } from '../CallSettingsDialog';

// jsdom's HTMLMediaElement.play is unimplemented; StreamVideo calls it on
// bind, so stub it for the preview tests.
beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    writable: true,
    value: () => Promise.resolve(),
  });
});

const onClose = vi.fn();
beforeEach(() => onClose.mockClear());

/** Minimal MediaStream stub — StreamVideo guards every real-stream call. */
const stubStream = { getTracks: () => [] } as unknown as MediaStream;

const slots = {
  effectsContent: <div data-testid="fake-effects">effects body</div>,
  peopleContent: <div data-testid="fake-people">people body</div>,
};

describe('CallSettingsDialog', () => {
  it('renders nothing when closed', () => {
    render(
      <CallSettingsDialog open={false} onClose={onClose} previewStream={null} {...slots} />,
    );
    expect(screen.queryByTestId('call-settings-dialog')).toBeNull();
  });

  it('shows the effects tab first by default and switches to people on click', () => {
    render(
      <CallSettingsDialog open onClose={onClose} previewStream={null} {...slots} />,
    );
    expect(screen.getByTestId('fake-effects')).toBeInTheDocument();
    expect(screen.queryByTestId('fake-people')).toBeNull();
    expect(screen.getByTestId('call-settings-tab-effects')).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(screen.getByTestId('call-settings-tab-people'));
    expect(screen.getByTestId('fake-people')).toBeInTheDocument();
    expect(screen.queryByTestId('fake-effects')).toBeNull();
    expect(screen.getByTestId('call-settings-tab-people')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('call-settings-tab-effects')).toHaveAttribute('aria-selected', 'false');
  });

  it('honors initialTab="people"', () => {
    render(
      <CallSettingsDialog open onClose={onClose} previewStream={null} initialTab="people" {...slots} />,
    );
    expect(screen.getByTestId('fake-people')).toBeInTheDocument();
    expect(screen.queryByTestId('fake-effects')).toBeNull();
  });

  it('hides a tab whose slot is missing (and falls back off a missing initialTab)', () => {
    render(
      <CallSettingsDialog
        open
        onClose={onClose}
        previewStream={null}
        initialTab="people"
        effectsContent={slots.effectsContent}
      />,
    );
    expect(screen.queryByTestId('call-settings-tab-people')).toBeNull();
    expect(screen.getByTestId('call-settings-tab-effects')).toBeInTheDocument();
    // initialTab pointed at the missing slot — content clamps to effects.
    expect(screen.getByTestId('fake-effects')).toBeInTheDocument();
  });

  it('closes on backdrop click but not on card click', () => {
    render(
      <CallSettingsDialog open onClose={onClose} previewStream={null} {...slots} />,
    );
    fireEvent.click(screen.getByTestId('call-settings-dialog'));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('call-settings-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape and on the ✕ button', () => {
    render(
      <CallSettingsDialog open onClose={onClose} previewStream={null} {...slots} />,
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('call-settings-close'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('renders a muted mirrored <video> with the "You" chip when a stream is passed', () => {
    render(
      <CallSettingsDialog open onClose={onClose} previewStream={stubStream} {...slots} />,
    );
    const pane = screen.getByTestId('call-settings-preview');
    const video = pane.querySelector('video');
    expect(video).not.toBeNull();
    expect(video!.srcObject).toBe(stubStream);
    expect(video!.muted).toBe(true);
    expect(video!.className).toContain('scale-x-[-1]');
    expect(screen.getByTestId('call-settings-preview-label')).toHaveTextContent('You');
    expect(screen.queryByTestId('call-settings-preview-empty')).toBeNull();
  });

  it('renders the "Camera off" empty state when the stream is null', () => {
    render(
      <CallSettingsDialog open onClose={onClose} previewStream={null} {...slots} />,
    );
    expect(screen.getByTestId('call-settings-preview')).toBeInTheDocument();
    expect(screen.getByTestId('call-settings-preview-empty')).toHaveTextContent('Camera off');
    expect(screen.getByTestId('call-settings-preview').querySelector('video')).toBeNull();
  });
});
