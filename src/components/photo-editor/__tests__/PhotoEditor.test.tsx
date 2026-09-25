import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PhotoCompareCanvas, PhotoEditorShell, PhotoEditorStatusBar, PhotoEditorTopBar, PhotoFilmstrip } from '..';

afterEach(cleanup);

describe('PhotoCompareCanvas', () => {
  it('shows both badges, the split handle and the toolbar; Before / After turns the compare off', () => {
    render(<PhotoCompareCanvas src="blob:photo" ops={[{ kind: 'exposure', stops: 0.2 }]} alt="Street" />);
    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
    const handle = screen.getByRole('slider', { name: 'Before and after split' });
    expect(handle).toHaveAttribute('aria-valuenow', '50');
    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(handle).toHaveAttribute('aria-valuenow', '52');
    fireEvent.click(screen.getByTestId('photo-compare-canvas-before-after'));
    expect(screen.queryByText('Original')).toBeNull();
    expect(screen.queryByRole('slider')).toBeNull();
    expect(screen.getByTestId('photo-compare-canvas')).toHaveAttribute('data-compare', 'off');
  });

  it('toggles between fit and 100%', () => {
    render(<PhotoCompareCanvas src="blob:photo" ops={[]} alt="Street" />);
    fireEvent.click(screen.getByTestId('photo-compare-canvas-zoom-100'));
    expect(screen.getByTestId('photo-compare-canvas')).toHaveAttribute('data-zoom', '1');
  });
});

describe('PhotoEditorTopBar', () => {
  it('names the photo and the set, and wires back / prev / undo', () => {
    const onBack = vi.fn(); const onPrev = vi.fn(); const onUndo = vi.fn();
    render(<PhotoEditorTopBar title="L1040606.DNG" subtitle="3 of 12 suggested picks" backLabel="New York walk" onBack={onBack} onPrev={onPrev} pick={null} onPickChange={() => {}} onUndo={onUndo} canUndo />);
    expect(screen.getByText('L1040606.DNG')).toBeInTheDocument();
    expect(screen.getByText('3 of 12 suggested picks')).toBeInTheDocument();
    fireEvent.click(screen.getByText('New York walk'));
    fireEvent.click(screen.getByLabelText('Previous photo'));
    fireEvent.click(screen.getByLabelText('Undo'));
    expect(onBack).toHaveBeenCalled(); expect(onPrev).toHaveBeenCalled(); expect(onUndo).toHaveBeenCalled();
    expect(screen.getByLabelText('Next photo')).toBeDisabled();
    expect(screen.getByLabelText('Redo')).toBeDisabled();
  });
});

describe('PhotoFilmstrip', () => {
  it('outlines the current photo, badges edits and picks, and moves with the arrow keys', () => {
    const onSelect = vi.fn();
    render(<PhotoFilmstrip currentId="b" onSelect={onSelect} items={[
      { id: 'a', thumbnailSrc: null, label: 'A' },
      { id: 'b', thumbnailSrc: null, label: 'B', editCount: 3 },
      { id: 'c', thumbnailSrc: null, label: 'C', pick: 'pick' },
    ]} />);
    expect(screen.getByRole('option', { name: 'B, 3 edits' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: 'C, picked' })).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowRight' });
    expect(onSelect).toHaveBeenCalledWith('c');
  });
});

describe('PhotoEditorShell + status bar', () => {
  it('lays out the slots and says whether the preview is applied', () => {
    render(<PhotoEditorShell topBar={<div>top</div>} canvas={<div>canvas</div>} rightPanel={<div>panel</div>} composer={<div>composer</div>} statusBar={<PhotoEditorStatusBar previewing />} />);
    expect(screen.getByText('Previewing changes · Original preserved')).toBeInTheDocument();
    expect(screen.getByText('Not applied')).toBeInTheDocument();
    expect(screen.getByTestId('photo-editor-shell-panel')).toHaveTextContent('panel');
  });
});
