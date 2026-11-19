import { render, screen, fireEvent, act } from '@testing-library/react';
import { HoldToTalkButton } from '../HoldToTalkButton';

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); });

const btn = () => screen.getByTestId('hold-to-talk');

describe('HoldToTalkButton', () => {
  it('talks while held and ends with the duration on release', () => {
    const onStart = vi.fn(); const onEnd = vi.fn();
    render(<HoldToTalkButton onStart={onStart} onEnd={onEnd} />);
    fireEvent.pointerDown(btn());
    expect(onStart).toHaveBeenCalledTimes(1);
    expect(btn().getAttribute('aria-pressed')).toBe('true');
    expect(btn().getAttribute('aria-label')).toBe('Talking, release to send');
    act(() => { vi.advanceTimersByTime(600); });
    fireEvent.pointerUp(btn());
    expect(onEnd).toHaveBeenCalledWith(600);
    expect(btn().getAttribute('aria-pressed')).toBe('false');
  });

  it('latches on a quick tap and ends on the next tap', () => {
    const onEnd = vi.fn();
    render(<HoldToTalkButton onEnd={onEnd} />);
    fireEvent.pointerDown(btn());
    act(() => { vi.advanceTimersByTime(100); });
    fireEvent.pointerUp(btn());
    expect(onEnd).not.toHaveBeenCalled();
    expect(btn().getAttribute('aria-pressed')).toBe('true');
    act(() => { vi.advanceTimersByTime(2000); });
    fireEvent.pointerDown(btn());
    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it('Esc cancels without onEnd', () => {
    const onEnd = vi.fn(); const onCancel = vi.fn(); const onTone = vi.fn();
    render(<HoldToTalkButton onEnd={onEnd} onCancel={onCancel} onTone={onTone} />);
    fireEvent.pointerDown(btn());
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onEnd).not.toHaveBeenCalled();
    expect(onTone.mock.calls.map((c) => c[0])).toEqual(['start', 'cancel']);
  });

  it('ends by itself at the max duration', () => {
    const onEnd = vi.fn();
    render(<HoldToTalkButton onEnd={onEnd} maxDurationMs={1000} />);
    fireEvent.pointerDown(btn());
    act(() => { vi.advanceTimersByTime(1000); });
    expect(onEnd).toHaveBeenCalledWith(1000);
  });

  it('holds Space to talk when spaceToTalk, but ignores Space in an input', () => {
    const onStart = vi.fn(); const onEnd = vi.fn();
    render(<div><input data-testid="field" /><HoldToTalkButton spaceToTalk onStart={onStart} onEnd={onEnd} /></div>);
    fireEvent.keyDown(screen.getByTestId('field'), { key: ' ' });
    expect(onStart).not.toHaveBeenCalled();
    fireEvent.keyDown(document.body, { key: ' ' });
    expect(onStart).toHaveBeenCalledTimes(1);
    act(() => { vi.advanceTimersByTime(500); });
    fireEvent.keyUp(document.body, { key: ' ' });
    expect(onEnd).toHaveBeenCalledWith(500);
  });

  it('ignores Space when spaceToTalk is off', () => {
    const onStart = vi.fn();
    render(<HoldToTalkButton onStart={onStart} />);
    fireEvent.keyDown(document.body, { key: ' ' });
    expect(onStart).not.toHaveBeenCalled();
  });

  it('busy disables the button and shows who is talking', () => {
    const onStart = vi.fn();
    render(<HoldToTalkButton busy={{ label: 'Mateo is talking' }} onStart={onStart} />);
    expect((btn() as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getAllByText('Mateo is talking').length).toBeGreaterThan(0);
    fireEvent.pointerDown(btn());
    expect(onStart).not.toHaveBeenCalled();
  });
});
