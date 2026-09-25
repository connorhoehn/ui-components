import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useRef } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { FollowBanner } from '../FollowBanner';
import FollowModeBar from '../../doc-editor/FollowModeBar';
import type { Participant } from '../../../types/document';

const alice = [{ clientId: 'c', userId: 'alice', displayName: 'Alice' }] as unknown as Participant[];

function Scoped({ onStop, bar = false }: { onStop: () => void; bar?: boolean }) {
  const editor = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <button data-testid="dock">Dock</button>
      <div ref={editor} data-testid="editor" tabIndex={0}>page</div>
      {bar ? (
        <FollowModeBar followingUserId="alice" participants={alice} onStopFollow={onStop} appearance="bar" autoStopScope={editor} />
      ) : (
        <FollowBanner name="Alice" onStop={onStop} appearance="bar" autoStopScope={editor} />
      )}
    </>
  );
}

describe('follow auto-stop scope (A-5)', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  for (const bar of [false, true]) {
    const name = bar ? 'FollowModeBar' : 'FollowBanner';
    it(`${name}: a click outside the scope keeps following; scrolling or typing inside stops it`, () => {
      const onStop = vi.fn();
      const { getByTestId } = render(<Scoped onStop={onStop} bar={bar} />);
      act(() => { vi.advanceTimersByTime(600); });
      fireEvent.mouseDown(getByTestId('dock'));
      fireEvent.keyDown(window, { key: 'a' });
      fireEvent.mouseDown(getByTestId('editor'));
      expect(onStop).not.toHaveBeenCalled();
      fireEvent.wheel(getByTestId('editor'));
      expect(onStop).toHaveBeenCalledTimes(1);
    });
  }

  it('typing inside the scope stops it', () => {
    const onStop = vi.fn();
    const { getByTestId } = render(<Scoped onStop={onStop} />);
    act(() => { vi.advanceTimersByTime(600); });
    fireEvent.keyDown(getByTestId('editor'), { key: 'x' });
    expect(onStop).toHaveBeenCalledTimes(1);
  });

  it('autoStop={false} never stops; unscoped keeps the window behaviour', () => {
    const off = vi.fn();
    const { unmount } = render(<FollowModeBar followingUserId="alice" participants={alice} onStopFollow={off} autoStop={false} />);
    act(() => { vi.advanceTimersByTime(600); });
    fireEvent.mouseDown(window);
    fireEvent.wheel(window);
    expect(off).not.toHaveBeenCalled();
    unmount();
    const on = vi.fn();
    render(<FollowBanner name="Alice" onStop={on} />);
    act(() => { vi.advanceTimersByTime(600); });
    fireEvent.mouseDown(window);
    expect(on).toHaveBeenCalledTimes(1);
  });
});
