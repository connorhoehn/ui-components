import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ChatColumnBackdrop } from '../ChatColumnBackdrop';
import { installAnimationFrames, installWebGLStub, setReducedMotion } from '../../shared/__tests__/webglStub';

let webgl: ReturnType<typeof installWebGLStub> | null = null;
let frames: ReturnType<typeof installAnimationFrames>;

beforeEach(() => {
  setReducedMotion(false);
  frames = installAnimationFrames();
  webgl = installWebGLStub();
});

afterEach(() => {
  cleanup();
  webgl?.restore();
  webgl = null;
  frames.restore();
  setReducedMotion(false);
  vi.useRealTimers();
});

const column = () => screen.getByTestId('chat-column-backdrop');

describe('ChatColumnBackdrop', () => {
  it('is an ordinary light column in chat mode', () => {
    render(
      <ChatColumnBackdrop mode="chat">
        <p>transcript</p>
      </ChatColumnBackdrop>,
    );

    expect(column()).toHaveAttribute('data-console', 'false');
    expect(column()).not.toHaveAttribute('data-theme');
    expect(column().className).not.toContain('uic-chat-console');
    // No backdrop at all, so no GL context is created for a column nobody
    // switched into agent mode.
    expect(screen.queryByTestId('chat-column-backdrop-particles-backdrop')).not.toBeInTheDocument();
    expect(screen.getByText('transcript')).toBeInTheDocument();
  });

  it('turns the whole column into a console when the mode switches, and back again', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { rerender } = render(
      <ChatColumnBackdrop mode="chat">
        <p>transcript</p>
      </ChatColumnBackdrop>,
    );

    rerender(
      <ChatColumnBackdrop mode="agent">
        <p>transcript</p>
      </ChatColumnBackdrop>,
    );
    expect(column()).toHaveAttribute('data-console', 'true');
    // The two hooks the dark half hangs off: the documented per-subtree theme
    // switch, and the console class that makes the panels transparent so the
    // star field is visible through them.
    expect(column()).toHaveAttribute('data-theme', 'dark');
    expect(column().className).toContain('uic-chat-console');
    const backdrop = screen.getByTestId('chat-column-backdrop-particles-backdrop');
    expect(backdrop.className).toContain('opacity-100');
    // The transcript is still the same DOM — this is a crossfade, not a
    // different column.
    expect(screen.getByText('transcript')).toBeInTheDocument();

    rerender(
      <ChatColumnBackdrop mode="chat">
        <p>transcript</p>
      </ChatColumnBackdrop>,
    );
    // Mid-crossfade: the field is fading out and the dark palette is still on,
    // so the column does not flash white under a sky that has not left yet.
    expect(column()).toHaveAttribute('data-console', 'false');
    expect(column()).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByTestId('chat-column-backdrop-particles-backdrop').className).toContain('opacity-0');

    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(column()).not.toHaveAttribute('data-theme');
    expect(screen.queryByTestId('chat-column-backdrop-particles-backdrop')).not.toBeInTheDocument();
  });

  it('treats terminal mode as the console too', () => {
    render(<ChatColumnBackdrop mode="terminal">{null}</ChatColumnBackdrop>);
    expect(column()).toHaveAttribute('data-console', 'true');
    expect(column()).toHaveAttribute('data-theme', 'dark');
  });

  it('runs a denser, faster field while the loop is working', () => {
    const { rerender } = render(<ChatColumnBackdrop mode="agent">{null}</ChatColumnBackdrop>);
    act(() => frames.run(1));
    const idle = webgl!.latest()!.draws.at(-1)?.count;

    rerender(<ChatColumnBackdrop mode="agent" working>{null}</ChatColumnBackdrop>);
    act(() => frames.run(1));
    const working = webgl!.latest()!.draws.at(-1)?.count;

    expect(column()).toHaveAttribute('data-working', 'true');
    expect(working).toBeGreaterThan(idle!);
  });

  it('honours reduced motion: the console still arrives, it just holds still', () => {
    setReducedMotion(true);
    render(<ChatColumnBackdrop mode="agent">{null}</ChatColumnBackdrop>);

    expect(column()).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByTestId('chat-column-backdrop-particles-backdrop')).toHaveAttribute('data-motion', 'static');
    expect(frames.pending).toHaveLength(0);
  });
});
