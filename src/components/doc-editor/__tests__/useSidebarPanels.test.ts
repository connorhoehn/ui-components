import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useSidebarPanels } from '../useSidebarPanels';

describe('useSidebarPanels', () => {
  describe('initial state', () => {
    it('defaults to no panel open and all show flags false', () => {
      const { result } = renderHook(() => useSidebarPanels());

      expect(result.current.activePanel).toBeNull();
      expect(result.current.showHistory).toBe(false);
      expect(result.current.showMyItems).toBe(false);
      expect(result.current.showVideoHistory).toBe(false);
    });

    it('honors initialPanel when set to history', () => {
      const { result } = renderHook(() =>
        useSidebarPanels({ initialPanel: 'history' }),
      );

      expect(result.current.activePanel).toBe('history');
      expect(result.current.showHistory).toBe(true);
      expect(result.current.showMyItems).toBe(false);
      expect(result.current.showVideoHistory).toBe(false);
    });

    it('honors initialPanel when set to myItems', () => {
      const { result } = renderHook(() =>
        useSidebarPanels({ initialPanel: 'myItems' }),
      );

      expect(result.current.activePanel).toBe('myItems');
      expect(result.current.showMyItems).toBe(true);
      expect(result.current.showHistory).toBe(false);
      expect(result.current.showVideoHistory).toBe(false);
    });

    it('honors initialPanel when set to videoHistory', () => {
      const { result } = renderHook(() =>
        useSidebarPanels({ initialPanel: 'videoHistory' }),
      );

      expect(result.current.activePanel).toBe('videoHistory');
      expect(result.current.showVideoHistory).toBe(true);
      expect(result.current.showHistory).toBe(false);
      expect(result.current.showMyItems).toBe(false);
    });

    it('treats explicit null initialPanel the same as default (no panel)', () => {
      const { result } = renderHook(() =>
        useSidebarPanels({ initialPanel: null }),
      );

      expect(result.current.activePanel).toBeNull();
    });
  });

  describe('openPanel', () => {
    it('opens the requested panel and lights its show flag', () => {
      const { result } = renderHook(() => useSidebarPanels());

      act(() => result.current.openPanel('history'));

      expect(result.current.activePanel).toBe('history');
      expect(result.current.showHistory).toBe(true);
      expect(result.current.showMyItems).toBe(false);
      expect(result.current.showVideoHistory).toBe(false);
    });

    it('switches between panels (mutual exclusion via openPanel)', () => {
      const { result } = renderHook(() => useSidebarPanels());

      act(() => result.current.openPanel('history'));
      act(() => result.current.openPanel('videoHistory'));

      expect(result.current.activePanel).toBe('videoHistory');
      expect(result.current.showVideoHistory).toBe(true);
      expect(result.current.showHistory).toBe(false);
    });
  });

  describe('closePanel', () => {
    it('clears the active panel and all show flags', () => {
      const { result } = renderHook(() =>
        useSidebarPanels({ initialPanel: 'myItems' }),
      );

      act(() => result.current.closePanel());

      expect(result.current.activePanel).toBeNull();
      expect(result.current.showHistory).toBe(false);
      expect(result.current.showMyItems).toBe(false);
      expect(result.current.showVideoHistory).toBe(false);
    });

    it('is a no-op when no panel is open', () => {
      const { result } = renderHook(() => useSidebarPanels());

      act(() => result.current.closePanel());

      expect(result.current.activePanel).toBeNull();
    });
  });

  describe('toggleHistory', () => {
    it('opens history when no panel is open', () => {
      const { result } = renderHook(() => useSidebarPanels());

      act(() => result.current.toggleHistory());

      expect(result.current.activePanel).toBe('history');
      expect(result.current.showHistory).toBe(true);
    });

    it('closes history when history is the active panel', () => {
      const { result } = renderHook(() =>
        useSidebarPanels({ initialPanel: 'history' }),
      );

      act(() => result.current.toggleHistory());

      expect(result.current.activePanel).toBeNull();
      expect(result.current.showHistory).toBe(false);
    });

    it('switches to history when a different panel is open (mutual exclusion)', () => {
      const { result } = renderHook(() =>
        useSidebarPanels({ initialPanel: 'myItems' }),
      );

      act(() => result.current.toggleHistory());

      expect(result.current.activePanel).toBe('history');
      expect(result.current.showHistory).toBe(true);
      expect(result.current.showMyItems).toBe(false);
    });
  });

  describe('toggleMyItems', () => {
    it('opens myItems when no panel is open', () => {
      const { result } = renderHook(() => useSidebarPanels());

      act(() => result.current.toggleMyItems());

      expect(result.current.activePanel).toBe('myItems');
      expect(result.current.showMyItems).toBe(true);
    });

    it('closes myItems when myItems is the active panel', () => {
      const { result } = renderHook(() =>
        useSidebarPanels({ initialPanel: 'myItems' }),
      );

      act(() => result.current.toggleMyItems());

      expect(result.current.activePanel).toBeNull();
      expect(result.current.showMyItems).toBe(false);
    });

    it('switches to myItems when a different panel is open (mutual exclusion)', () => {
      const { result } = renderHook(() =>
        useSidebarPanels({ initialPanel: 'videoHistory' }),
      );

      act(() => result.current.toggleMyItems());

      expect(result.current.activePanel).toBe('myItems');
      expect(result.current.showMyItems).toBe(true);
      expect(result.current.showVideoHistory).toBe(false);
    });
  });

  describe('toggleVideoHistory', () => {
    it('opens videoHistory when no panel is open', () => {
      const { result } = renderHook(() => useSidebarPanels());

      act(() => result.current.toggleVideoHistory());

      expect(result.current.activePanel).toBe('videoHistory');
      expect(result.current.showVideoHistory).toBe(true);
    });

    it('closes videoHistory when videoHistory is the active panel', () => {
      const { result } = renderHook(() =>
        useSidebarPanels({ initialPanel: 'videoHistory' }),
      );

      act(() => result.current.toggleVideoHistory());

      expect(result.current.activePanel).toBeNull();
      expect(result.current.showVideoHistory).toBe(false);
    });

    it('switches to videoHistory when a different panel is open (mutual exclusion)', () => {
      const { result } = renderHook(() =>
        useSidebarPanels({ initialPanel: 'history' }),
      );

      act(() => result.current.toggleVideoHistory());

      expect(result.current.activePanel).toBe('videoHistory');
      expect(result.current.showVideoHistory).toBe(true);
      expect(result.current.showHistory).toBe(false);
    });
  });

  describe('callback identity', () => {
    it('keeps openPanel and closePanel stable across rerenders', () => {
      const { result, rerender } = renderHook(() => useSidebarPanels());

      const openA = result.current.openPanel;
      const closeA = result.current.closePanel;

      rerender();

      expect(result.current.openPanel).toBe(openA);
      expect(result.current.closePanel).toBe(closeA);
    });
  });
});
