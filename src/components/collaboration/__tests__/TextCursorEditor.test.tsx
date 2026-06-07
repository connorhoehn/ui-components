import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { TextCursorEditor } from '../TextCursorEditor';
import { identityToInitials } from '../../../utils/identity';
import type { RemoteCursor, TextSelectionData } from '../../../hooks/useCursors';

type OnPositionChange = (
  position: number,
  selectionData: TextSelectionData | null,
  hasSelection: boolean,
) => void;

let onPositionChange: ReturnType<typeof vi.fn<OnPositionChange>>;

beforeEach(() => {
  onPositionChange = vi.fn<OnPositionChange>();
});

afterEach(() => {
  vi.restoreAllMocks();
});

function defaultProps() {
  return {
    cursors: new Map<string, RemoteCursor>(),
    localCursor: null as RemoteCursor | null,
    onPositionChange: onPositionChange as OnPositionChange,
  };
}

function editable(container: HTMLElement): HTMLElement {
  return container.querySelector('[contenteditable]') as HTMLElement;
}

function mkRemote(over: {
  clientId: string;
  mode?: string;
  displayName?: string;
  position?: number | null;
  hasSelection?: boolean;
  selection?: TextSelectionData | null;
}): RemoteCursor {
  return {
    clientId: over.clientId,
    position: over.position == null ? {} : { position: over.position },
    metadata: {
      mode: over.mode ?? 'text',
      displayName: over.displayName ?? 'User',
      hasSelection: over.hasSelection ?? false,
      selection: over.selection ?? null,
    },
  };
}

describe('TextCursorEditor', () => {
  describe('initial render', () => {
    it('renders placeholder text and a contenteditable surface', () => {
      const { container } = render(<TextCursorEditor {...defaultProps()} />);
      expect(
        screen.getByText(/This is a shared document\. Click here/),
      ).toBeInTheDocument();
      const ed = editable(container);
      expect(ed).toBeTruthy();
      expect(ed.getAttribute('contenteditable')).toBe('true');
    });
  });

  describe('handleInteraction', () => {
    it('fires onPositionChange on click (default jsdom selection → 0/null/false)', () => {
      const { container } = render(<TextCursorEditor {...defaultProps()} />);
      fireEvent.click(editable(container));
      expect(onPositionChange).toHaveBeenCalledTimes(1);
      expect(onPositionChange).toHaveBeenCalledWith(0, null, false);
    });

    it('fires onPositionChange on keyUp', () => {
      const { container } = render(<TextCursorEditor {...defaultProps()} />);
      fireEvent.keyUp(editable(container), { key: 'ArrowRight' });
      expect(onPositionChange).toHaveBeenCalledTimes(1);
    });

    it('broadcasts caret offset from a stubbed collapsed selection', () => {
      const { container } = render(<TextCursorEditor {...defaultProps()} />);
      const ed = editable(container);
      const textNode = ed.firstChild as Text;
      vi.spyOn(window, 'getSelection').mockReturnValue({
        rangeCount: 1,
        isCollapsed: true,
        anchorNode: textNode,
        anchorOffset: 7,
        getRangeAt: () => ({}) as unknown as Range,
      } as unknown as Selection);
      fireEvent.click(ed);
      expect(onPositionChange).toHaveBeenCalledTimes(1);
      // getSelectionData returns null for collapsed selections.
      expect(onPositionChange).toHaveBeenCalledWith(7, null, false);
    });

    it('broadcasts selection range when selection is non-collapsed', () => {
      const { container } = render(<TextCursorEditor {...defaultProps()} />);
      const ed = editable(container);
      const textNode = ed.firstChild as Text;
      const fakeRange = {
        startContainer: textNode,
        startOffset: 5,
        toString: () => 'hello',
      } as unknown as Range;
      vi.spyOn(window, 'getSelection').mockReturnValue({
        rangeCount: 1,
        isCollapsed: false,
        anchorNode: textNode,
        anchorOffset: 5,
        getRangeAt: () => fakeRange,
      } as unknown as Selection);
      fireEvent.click(ed);
      expect(onPositionChange).toHaveBeenCalledTimes(1);
      const [pos, sel, hasSel] = onPositionChange.mock.calls[0];
      expect(pos).toBe(5);
      expect(hasSel).toBe(true);
      expect(sel).toEqual({ start: 5, end: 10, text: 'hello' });
    });
  });

  describe('remote cursor filtering', () => {
    it('renders initials badge for text-mode cursors with a numeric position', () => {
      const cursors = new Map<string, RemoteCursor>();
      cursors.set('a', mkRemote({ clientId: 'a', displayName: 'Alice Doe', position: 5 }));
      render(<TextCursorEditor {...defaultProps()} cursors={cursors} />);
      expect(screen.getByText(identityToInitials('Alice Doe'))).toBeInTheDocument();
    });

    it('filters out cursors whose mode is not text', () => {
      const cursors = new Map<string, RemoteCursor>();
      cursors.set('a', mkRemote({ clientId: 'a', displayName: 'Alice', position: 5 }));
      cursors.set('b', mkRemote({ clientId: 'b', displayName: 'Bob', mode: 'canvas', position: 9 }));
      render(<TextCursorEditor {...defaultProps()} cursors={cursors} />);
      expect(screen.getByText(identityToInitials('Alice'))).toBeInTheDocument();
      expect(screen.queryByText(identityToInitials('Bob'))).not.toBeInTheDocument();
    });

    it('skips cursors without a position.position', () => {
      const cursors = new Map<string, RemoteCursor>();
      cursors.set('a', mkRemote({ clientId: 'a', displayName: 'Alice', position: null }));
      render(<TextCursorEditor {...defaultProps()} cursors={cursors} />);
      expect(screen.queryByText(identityToInitials('Alice'))).not.toBeInTheDocument();
    });
  });

  describe('remote selection highlights', () => {
    it('renders a highlight box when hasSelection && selection are present', () => {
      const cursors = new Map<string, RemoteCursor>();
      cursors.set('a', mkRemote({
        clientId: 'a',
        displayName: 'Alice',
        position: 0,
        hasSelection: true,
        selection: { start: 2, end: 8, text: 'is is ' },
      }));
      const { container } = render(<TextCursorEditor {...defaultProps()} cursors={cursors} />);
      expect(container.querySelector('div[class*="z-[5]"]')).toBeTruthy();
    });

    it('does not render a highlight when hasSelection is false', () => {
      const cursors = new Map<string, RemoteCursor>();
      cursors.set('a', mkRemote({ clientId: 'a', displayName: 'Alice', position: 0 }));
      const { container } = render(<TextCursorEditor {...defaultProps()} cursors={cursors} />);
      expect(container.querySelector('div[class*="z-[5]"]')).toBeNull();
    });
  });

  describe('local cursor', () => {
    it('renders the "You" badge when mode === "text" and position is numeric', () => {
      const localCursor = mkRemote({ clientId: 'me', position: 3 });
      render(<TextCursorEditor {...defaultProps()} localCursor={localCursor} />);
      expect(screen.getByText('You')).toBeInTheDocument();
    });

    it('does not render "You" when mode is not text', () => {
      const localCursor = mkRemote({ clientId: 'me', mode: 'canvas', position: 3 });
      render(<TextCursorEditor {...defaultProps()} localCursor={localCursor} />);
      expect(screen.queryByText('You')).not.toBeInTheDocument();
    });

    it('does not render "You" when position.position is missing', () => {
      const localCursor = mkRemote({ clientId: 'me', position: null });
      render(<TextCursorEditor {...defaultProps()} localCursor={localCursor} />);
      expect(screen.queryByText('You')).not.toBeInTheDocument();
    });

    it('does not render "You" when localCursor is null', () => {
      render(<TextCursorEditor {...defaultProps()} />);
      expect(screen.queryByText('You')).not.toBeInTheDocument();
    });
  });
});
