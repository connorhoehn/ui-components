import { describe, it, expect, vi } from 'vitest';
import { visibleSuggestionRect } from '../composerSuggestionPosition';
describe('suggestion anchor for hidden command prefixes', () => {
  it('uses the visible editor for a zero-size hidden decoration', () => {
    const editor = new DOMRect(100, 300, 400, 50), boundary = { getBoundingClientRect: vi.fn(() => editor) };
    expect(visibleSuggestionRect(new DOMRect(0, 0, 0, 0), boundary)).toBe(editor);
    expect(boundary.getBoundingClientRect).toHaveBeenCalledOnce();
  });
  it('retains an exact real caret even when its width is zero', () => {
    const caret = new DOMRect(125, 315, 0, 18), boundary = { getBoundingClientRect: vi.fn() };
    expect(visibleSuggestionRect(caret, boundary)).toBe(caret);
    expect(boundary.getBoundingClientRect).not.toHaveBeenCalled();
  });
  it('does not invent a rectangle when the editor or caret is unavailable', () => {
    const hidden = new DOMRect(0, 0, 0, 0);
    expect(visibleSuggestionRect(hidden)).toBe(hidden);
    expect(visibleSuggestionRect(null)).toBeNull();
  });
});
