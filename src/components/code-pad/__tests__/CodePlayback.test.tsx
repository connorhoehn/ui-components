import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { EditorView } from '@codemirror/view';
import { CodePlayback, codePlaybackMarkerLetter, type CodePlaybackFrame, type CodePlaybackMarker } from '../index';

// jsdom has no layout: CodeMirror's measure pass asks a Range for its rects.
beforeAll(() => {
  const empty = () => Object.assign([], { item: () => null }) as unknown as DOMRectList;
  if (!Range.prototype.getClientRects) Range.prototype.getClientRects = empty;
  if (!Range.prototype.getBoundingClientRect) {
    Range.prototype.getBoundingClientRect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  }
});
afterEach(() => cleanup());

const frames: CodePlaybackFrame[] = [
  { atMs: 0, text: 'def f():\n    pass\n' },
  { atMs: 5_000, text: 'def f():\n    return 1\n' },
  { atMs: 9_000, text: 'def f():\n    return 1\n\nprint(f())\n', language: 'javascript' },
];
const markers: CodePlaybackMarker[] = [
  { atMs: 2_000, kind: 'question', label: 'Two sum' },
  { atMs: 6_000, kind: 'paste', label: 'Pasted 40 characters', detail: 'Two lines' },
  { atMs: 9_500, kind: 'run', label: 'Run 1' },
  { atMs: 9_800, kind: 'hint', label: 'Hint given' },
];

const editorDom = () => document.querySelector('.cm-editor') as HTMLElement;
const editorText = () => EditorView.findFromDOM(editorDom())!.state.doc.toString();

describe('CodePlayback', () => {
  it('shows the last frame at or before the time, read only', () => {
    const { rerender } = render(<CodePlayback frames={frames} durationMs={12_000} timeMs={4_999} />);
    expect(editorText()).toBe(frames[0].text);
    expect(screen.getByTestId('code-pad')).toHaveAttribute('data-readonly', 'true');
    rerender(<CodePlayback frames={frames} durationMs={12_000} timeMs={5_000} />);
    expect(editorText()).toBe(frames[1].text);
    rerender(<CodePlayback frames={frames} durationMs={12_000} timeMs={11_000} />);
    expect(editorText()).toBe(frames[2].text);
    expect(screen.getByTestId('code-pad')).toHaveAttribute('data-language', 'javascript');
  });

  it('shows nothing written before the first frame, whatever order the frames come in', () => {
    const late = [frames[2], { atMs: 1_000, text: 'x = 1\n' }];
    const { rerender } = render(<CodePlayback frames={late} durationMs={12_000} timeMs={500} />);
    expect(editorText()).toBe('');
    rerender(<CodePlayback frames={late} durationMs={12_000} timeMs={1_500} />);
    expect(editorText()).toBe('x = 1\n');
  });

  it('changes the frame in place: the editor is not rebuilt and only the changed text is replaced', () => {
    const { rerender } = render(<CodePlayback frames={frames} durationMs={12_000} timeMs={0} />);
    const dom = editorDom();
    const view = EditorView.findFromDOM(dom)!;
    const changes: Array<[number, number, string]> = [];
    const original = view.dispatch.bind(view);
    view.dispatch = ((...args: Parameters<EditorView['dispatch']>) => {
      const spec = args[0] as { changes?: { from: number; to: number; insert: string } };
      if (spec?.changes) changes.push([spec.changes.from, spec.changes.to, spec.changes.insert]);
      return (original as (...a: unknown[]) => void)(...args);
    }) as EditorView['dispatch'];
    rerender(<CodePlayback frames={frames} durationMs={12_000} timeMs={5_000} />);
    expect(editorDom()).toBe(dom);
    expect(editorText()).toBe(frames[1].text);
    // "pass" became "return 1": the common start and end are left alone.
    expect(changes).toEqual([[13, 17, 'return 1']]);
    rerender(<CodePlayback frames={frames} durationMs={12_000} timeMs={5_500} />);
    expect(changes).toHaveLength(1);
  });

  it('draws each marker as a focusable stop with a letter and a spoken label', () => {
    render(<CodePlayback frames={frames} markers={markers} durationMs={10_000} timeMs={0} />);
    const stops = screen.getAllByTestId('code-playback-marker');
    expect(stops.map((s) => s.textContent)).toEqual(['Q', 'P', 'R', 'H']);
    expect(stops[1]).toHaveAttribute('aria-label', 'Paste: Pasted 40 characters. Two lines, at 0:06');
    expect(stops[3]).toHaveAttribute('aria-label', 'Hint: Hint given, at 0:09');
    expect(stops[0].style.left).toBe('20%');
    expect(stops.map((s) => s.tabIndex)).toEqual([0, -1, -1, -1]);
    expect(codePlaybackMarkerLetter('run')).toBe('R');
  });

  it('choosing a marker or moving the slider calls onTimeChange', () => {
    const onTimeChange = vi.fn();
    render(<CodePlayback frames={frames} markers={markers} durationMs={10_000} timeMs={0} onTimeChange={onTimeChange} />);
    fireEvent.click(screen.getAllByTestId('code-playback-marker')[1]);
    expect(onTimeChange).toHaveBeenLastCalledWith(6_000);
    fireEvent.change(screen.getByTestId('code-playback-slider'), { target: { value: '7300' } });
    expect(onTimeChange).toHaveBeenLastCalledWith(7_300);
    // Controlled: the page has not moved timeMs, so the view stays at 0.
    expect(editorText()).toBe(frames[0].text);
  });

  it('moves between markers with the arrow keys, one tab stop at a time', () => {
    render(<CodePlayback frames={frames} markers={markers} durationMs={10_000} />);
    const stops = () => screen.getAllByTestId('code-playback-marker');
    act(() => stops()[0].focus());
    fireEvent.keyDown(stops()[0], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(stops()[1]);
    expect(stops().map((s) => s.tabIndex)).toEqual([-1, 0, -1, -1]);
    fireEvent.keyDown(stops()[1], { key: 'End' });
    expect(document.activeElement).toBe(stops()[3]);
  });

  it('uncontrolled, it keeps its own time', () => {
    render(<CodePlayback frames={frames} markers={markers} durationMs={10_000} />);
    expect(editorText()).toBe(frames[0].text);
    fireEvent.click(screen.getAllByTestId('code-playback-marker')[2]);
    expect(editorText()).toBe(frames[2].text);
    expect(screen.getByTestId('code-playback-time').textContent).toBe('0:09 / 0:10');
    expect(screen.getByTestId('code-playback-current').textContent).toBe('Run: Run 1 at 0:09');
  });

  it('a page can tie it to a clock: timeMs in, onTimeChange out', () => {
    const seek = vi.fn();
    function Page() {
      const [t, setT] = useState(0);
      return (
        <CodePlayback
          frames={frames}
          markers={markers}
          durationMs={10_000}
          timeMs={t}
          formatTime={(ms) => `${ms / 1000}s`}
          onTimeChange={(ms) => {
            seek(ms / 1000);
            setT(ms);
          }}
        />
      );
    }
    render(<Page />);
    fireEvent.click(screen.getAllByTestId('code-playback-marker')[1]);
    expect(seek).toHaveBeenCalledWith(6);
    expect(editorText()).toBe(frames[1].text);
    expect(screen.getByTestId('code-playback-slider')).toHaveAttribute('aria-valuetext', '6s of 10s');
  });

  it('shows the empty message when there are no frames, and builds the pad when they arrive', () => {
    const { rerender } = render(<CodePlayback frames={[]} durationMs={10_000} emptyMessage="Nothing was typed." />);
    expect(screen.getByTestId('code-playback-empty').textContent).toBe('Nothing was typed.');
    expect(screen.queryByTestId('code-pad')).toBeNull();
    rerender(<CodePlayback frames={frames} durationMs={10_000} timeMs={6_000} />);
    expect(editorText()).toBe(frames[1].text);
  });
});
