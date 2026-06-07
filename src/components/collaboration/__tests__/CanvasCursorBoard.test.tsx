import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { CanvasCursorBoard } from '../CanvasCursorBoard';
import type { CanvasTool, RemoteCursor } from '../../../hooks/useCursors';

interface RemoteOver {
  clientId: string;
  x?: number;
  y?: number;
  mode?: string;
  displayName?: string;
  tool?: CanvasTool;
}

function mkCursor(over: RemoteOver): RemoteCursor {
  return {
    clientId: over.clientId,
    position: { x: over.x ?? 0, y: over.y ?? 0 },
    metadata: {
      mode: over.mode ?? 'canvas',
      displayName: over.displayName ?? 'User',
      tool: over.tool ?? 'brush',
    },
  };
}

type OnMove = (x: number, y: number, tool: CanvasTool, color: string, size: number) => void;

let onMouseMove: ReturnType<typeof vi.fn<OnMove>>;

beforeEach(() => {
  onMouseMove = vi.fn<OnMove>();
});

function defaultProps() {
  return {
    cursors: new Map<string, RemoteCursor>(),
    localCursor: null as RemoteCursor | null,
    onMouseMove: onMouseMove as OnMove,
  };
}

function board(container: HTMLElement): HTMLElement {
  return container.querySelector('.cursor-crosshair') as HTMLElement;
}

describe('CanvasCursorBoard', () => {
  describe('tool controls', () => {
    it('renders all four tool buttons with Brush active by default', () => {
      render(<CanvasCursorBoard {...defaultProps()} />);
      const brush = screen.getByRole('button', { name: 'Brush' });
      expect(screen.getByRole('button', { name: 'Brush' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Pen' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Eraser' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Select' })).toBeInTheDocument();
      expect(brush.className).toMatch(/bg-\[#007bff\]/);
      expect(screen.getByRole('button', { name: 'Pen' }).className).not.toMatch(/bg-\[#007bff\]/);
    });

    it('clicking a tool switches active style', () => {
      render(<CanvasCursorBoard {...defaultProps()} />);
      const pen = screen.getByRole('button', { name: 'Pen' });
      fireEvent.click(pen);
      expect(pen.className).toMatch(/bg-\[#007bff\]/);
      expect(screen.getByRole('button', { name: 'Brush' }).className).not.toMatch(/bg-\[#007bff\]/);
    });
  });

  describe('broadcast on mouseMove', () => {
    it('fires onMouseMove with current tool/color/size', () => {
      const { container } = render(<CanvasCursorBoard {...defaultProps()} />);
      fireEvent.mouseMove(board(container), { clientX: 120, clientY: 40 });
      expect(onMouseMove).toHaveBeenCalledTimes(1);
      expect(onMouseMove).toHaveBeenCalledWith(120, 40, 'brush', '#007bff', 5);
    });

    it('uses the most recently selected tool', () => {
      const { container } = render(<CanvasCursorBoard {...defaultProps()} />);
      fireEvent.click(screen.getByRole('button', { name: 'Eraser' }));
      fireEvent.mouseMove(board(container), { clientX: 10, clientY: 20 });
      expect(onMouseMove).toHaveBeenLastCalledWith(10, 20, 'eraser', '#007bff', 5);
    });

    it('uses the most recently picked color', () => {
      const { container } = render(<CanvasCursorBoard {...defaultProps()} />);
      const colorInput = container.querySelector('input[type="color"]') as HTMLInputElement;
      fireEvent.change(colorInput, { target: { value: '#abcdef' } });
      fireEvent.mouseMove(board(container), { clientX: 7, clientY: 8 });
      expect(onMouseMove).toHaveBeenLastCalledWith(7, 8, 'brush', '#abcdef', 5);
    });

    it('uses the most recently picked size', () => {
      const { container } = render(<CanvasCursorBoard {...defaultProps()} />);
      const sizeInput = container.querySelector('input[type="range"]') as HTMLInputElement;
      fireEvent.change(sizeInput, { target: { value: '25' } });
      fireEvent.mouseMove(board(container), { clientX: 1, clientY: 2 });
      expect(onMouseMove).toHaveBeenLastCalledWith(1, 2, 'brush', '#007bff', 25);
    });
  });

  describe('size readout', () => {
    it('reflects current size in the "Size: N" label', () => {
      const { container } = render(<CanvasCursorBoard {...defaultProps()} />);
      expect(screen.getByText('Size: 5')).toBeInTheDocument();
      fireEvent.change(container.querySelector('input[type="range"]') as HTMLInputElement, {
        target: { value: '17' },
      });
      expect(screen.getByText('Size: 17')).toBeInTheDocument();
    });
  });

  describe('local cursor', () => {
    it('renders the "You" tool label when mode === "canvas"', () => {
      const localCursor: RemoteCursor = {
        clientId: 'local',
        position: { x: 50, y: 60 },
        metadata: { mode: 'canvas', tool: 'pen' },
      };
      render(<CanvasCursorBoard {...defaultProps()} localCursor={localCursor} />);
      expect(screen.getByText('You (pen)')).toBeInTheDocument();
    });

    it('falls back to brush when local tool metadata is missing', () => {
      const localCursor: RemoteCursor = {
        clientId: 'local',
        position: { x: 0, y: 0 },
        metadata: { mode: 'canvas' },
      };
      render(<CanvasCursorBoard {...defaultProps()} localCursor={localCursor} />);
      expect(screen.getByText('You (brush)')).toBeInTheDocument();
    });

    it('does NOT render local cursor when mode is not canvas', () => {
      const localCursor: RemoteCursor = {
        clientId: 'local',
        position: { x: 50, y: 60 },
        metadata: { mode: 'freeform' },
      };
      render(<CanvasCursorBoard {...defaultProps()} localCursor={localCursor} />);
      expect(screen.queryByText(/You \(/)).not.toBeInTheDocument();
    });
  });

  describe('remote cursors', () => {
    it('filters to canvas-mode cursors, ignoring other modes', () => {
      const cursors = new Map<string, RemoteCursor>();
      cursors.set('alice', mkCursor({ clientId: 'alice', displayName: 'Alice', tool: 'brush' }));
      cursors.set('bob', mkCursor({ clientId: 'bob', displayName: 'Bob', tool: 'pen' }));
      cursors.set('claire', mkCursor({ clientId: 'claire', mode: 'freeform', displayName: 'Claire' }));
      render(<CanvasCursorBoard {...defaultProps()} cursors={cursors} />);
      // identityToInitials('Alice') === 'AL'; 'Bob' → 'BO'.
      expect(screen.getByText('AL (brush)')).toBeInTheDocument();
      expect(screen.getByText('BO (pen)')).toBeInTheDocument();
      // Claire is freeform — should not appear.
      expect(screen.queryByText('CL (brush)')).not.toBeInTheDocument();
    });

    it('defaults remote cursor tool to brush when metadata missing', () => {
      const cursors = new Map<string, RemoteCursor>();
      cursors.set('dana', {
        clientId: 'dana',
        position: { x: 1, y: 2 },
        metadata: { mode: 'canvas', displayName: 'Dana' },
      });
      render(<CanvasCursorBoard {...defaultProps()} cursors={cursors} />);
      expect(screen.getByText('DA (brush)')).toBeInTheDocument();
    });
  });

  describe('placeholder', () => {
    it('renders the "Move your mouse here (canvas mode)" hint', () => {
      render(<CanvasCursorBoard {...defaultProps()} />);
      expect(screen.getByText(/Move your mouse here \(canvas mode\)/)).toBeInTheDocument();
    });
  });
});
