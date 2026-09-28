import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import VideoDockSlot from '../VideoDockSlot';

afterEach(cleanup);

describe('VideoDockSlot states', () => {
  // The expensive mistake: an empty box on every document, advertising a
  // feature that is not running. Absence is the requirement, not a detail.
  it('renders nothing when there is no call and nothing to accept', () => {
    const { container } = render(<VideoDockSlot docked={false} canAccept={false} />);
    expect(container.firstChild).toBeNull();
    expect(screen.queryByTestId('video-dock-slot')).toBeNull();
  });

  it('offers a drop affordance once a call is dockable', () => {
    render(<VideoDockSlot docked={false} canAccept />);
    const zone = screen.getByTestId('video-dock-slot-dropzone');
    expect(zone).toBeInTheDocument();
    // Reachable as a landmark with a name, not an anonymous dashed rectangle.
    expect(screen.getByRole('region', { name: 'Video dock' })).toBe(zone);
    expect(screen.getByTestId('video-dock-slot')).toHaveAttribute('data-docked', 'false');
  });

  it('hosts the caller-supplied widget when docked', () => {
    render(
      <VideoDockSlot docked canAccept={false}>
        <div data-testid="portaled-widget" />
      </VideoDockSlot>,
    );
    expect(screen.getByTestId('portaled-widget')).toBeInTheDocument();
    // Docked and empty are mutually exclusive — no dashed prompt over video.
    expect(screen.queryByTestId('video-dock-slot-dropzone')).toBeNull();
    expect(screen.getByTestId('video-dock-slot')).toHaveAttribute('data-docked', 'true');
  });
});

describe('VideoDockSlot drag feedback', () => {
  it('sets and clears data-drag-over as a drag passes over', () => {
    render(<VideoDockSlot docked={false} canAccept />);
    const root = screen.getByTestId('video-dock-slot');
    expect(root).toHaveAttribute('data-drag-over', 'false');
    fireEvent.dragOver(root);
    expect(root).toHaveAttribute('data-drag-over', 'true');
    fireEvent.dragLeave(root);
    expect(root).toHaveAttribute('data-drag-over', 'false');
  });

  it('calls onDrop and drops the active state', () => {
    const onDrop = vi.fn();
    render(<VideoDockSlot docked={false} canAccept onDrop={onDrop} />);
    const root = screen.getByTestId('video-dock-slot');
    fireEvent.dragOver(root);
    fireEvent.drop(root);
    expect(onDrop).toHaveBeenCalledTimes(1);
    expect(root).toHaveAttribute('data-drag-over', 'false');
  });

  // Lighting up a slot that cannot take the video promises a drop that will
  // not happen.
  it('does not light up or accept a drop when it cannot accept', () => {
    const onDrop = vi.fn();
    render(<VideoDockSlot docked canAccept={false} onDrop={onDrop} />);
    const root = screen.getByTestId('video-dock-slot');
    fireEvent.dragOver(root);
    expect(root).toHaveAttribute('data-drag-over', 'false');
    fireEvent.drop(root);
    expect(onDrop).not.toHaveBeenCalled();
  });

  it('forwards drag events to the caller', () => {
    const onDragOver = vi.fn();
    render(<VideoDockSlot docked={false} canAccept onDragOver={onDragOver} />);
    fireEvent.dragOver(screen.getByTestId('video-dock-slot'));
    expect(onDragOver).toHaveBeenCalledTimes(1);
  });
});

describe('VideoDockSlot undock control', () => {
  it('is accessibly named and calls back', () => {
    const onRequestUndock = vi.fn();
    render(
      <VideoDockSlot docked canAccept={false} onRequestUndock={onRequestUndock}>
        <div />
      </VideoDockSlot>,
    );
    const button = screen.getByRole('button', { name: 'Pop video back out' });
    fireEvent.click(button);
    expect(onRequestUndock).toHaveBeenCalledTimes(1);
  });

  it('takes a custom accessible name', () => {
    render(
      <VideoDockSlot docked canAccept={false} undockLabel="Return call to floating window" onRequestUndock={() => {}}>
        <div />
      </VideoDockSlot>,
    );
    expect(screen.getByRole('button', { name: 'Return call to floating window' })).toBeInTheDocument();
  });

  // A caller with nowhere to undock TO should not render a dead control.
  it('is absent when no handler is given', () => {
    render(
      <VideoDockSlot docked canAccept={false}>
        <div />
      </VideoDockSlot>,
    );
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('has no undock control while empty', () => {
    render(<VideoDockSlot docked={false} canAccept onRequestUndock={() => {}} />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});

describe('VideoDockSlot compact (2.401.0)', () => {
  it('draws a one-line strip instead of the 16:9 box, still a drop target', () => {
    const onDrop = vi.fn();
    render(<VideoDockSlot compact docked={false} canAccept dockId="chat" label="Call" hint="Drop the call here" onDrop={onDrop} />);
    const slot = screen.getByTestId('video-dock-slot');
    expect(slot.getAttribute('data-compact')).toBe('true');
    expect(slot.getAttribute('data-call-dock-target')).toBe('chat');
    const zone = screen.getByTestId('video-dock-slot-dropzone');
    expect(zone.className).toContain('h-10');
    expect(zone.className).not.toContain('aspect-video');
    fireEvent.drop(slot);
    expect(onDrop).toHaveBeenCalled();
  });
});
