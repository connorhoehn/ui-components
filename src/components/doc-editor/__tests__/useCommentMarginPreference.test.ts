import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCommentMarginPreference, COMMENT_MARGIN_STORAGE_KEY } from '../useCommentMarginPreference';

describe('useCommentMarginPreference', () => {
  beforeEach(() => window.localStorage.clear());
  it('starts closed when the reader never chose', () => {
    expect(renderHook(() => useCommentMarginPreference()).result.current.visible).toBe(false);
  });
  it('honours an explicit stored choice either way', () => {
    window.localStorage.setItem(COMMENT_MARGIN_STORAGE_KEY, '1');
    expect(renderHook(() => useCommentMarginPreference()).result.current.visible).toBe(true);
    window.localStorage.setItem(COMMENT_MARGIN_STORAGE_KEY, '0');
    expect(renderHook(() => useCommentMarginPreference({ defaultVisible: true })).result.current.visible).toBe(false);
  });
  it('toggle and show remember the choice', () => {
    const { result } = renderHook(() => useCommentMarginPreference());
    act(() => result.current.show());
    expect(result.current.visible).toBe(true);
    expect(window.localStorage.getItem(COMMENT_MARGIN_STORAGE_KEY)).toBe('1');
    act(() => result.current.toggle());
    expect(result.current.visible).toBe(false);
    expect(window.localStorage.getItem(COMMENT_MARGIN_STORAGE_KEY)).toBe('0');
  });
});
