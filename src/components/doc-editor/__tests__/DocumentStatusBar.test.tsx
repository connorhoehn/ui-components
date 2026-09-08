// Zoom and length are STATUS, not formatting — they describe the document and
// the view of it rather than acting on a selection, which is why they live
// along the bottom edge and not in a toolbar of text controls.

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DocumentStatusBar, ZOOM_FIT } from '../DocumentStatusBar';

afterEach(cleanup);

describe('DocumentStatusBar', () => {
  it('says nothing about length when it is unknown', () => {
    render(<DocumentStatusBar />);
    expect(screen.queryByTestId('document-status-bar-word-count')).toBeNull();
  });

  // An unknown count is not zero, and "0 words" on a full page is a lie.
  it('reports a genuine empty document', () => {
    render(<DocumentStatusBar wordCount={0} />);
    expect(screen.getByTestId('document-status-bar-word-count')).toHaveTextContent('0 words');
  });

  it('counts in the reader’s own notation', () => {
    render(<DocumentStatusBar wordCount={12345} />);
    expect(screen.getByTestId('document-status-bar-word-count')).toHaveTextContent('12,345 words');
  });

  it('does not say "1 words"', () => {
    render(<DocumentStatusBar wordCount={1} />);
    expect(screen.getByTestId('document-status-bar-word-count')).toHaveTextContent('1 word');
  });

  it('offers no zoom control to a host that cannot act on it', () => {
    render(<DocumentStatusBar zoom={1.5} />);
    expect(screen.queryByTestId('document-status-bar-zoom')).toBeNull();
  });

  it('reports the chosen scale as a number', () => {
    const onZoomChange = vi.fn();
    render(<DocumentStatusBar zoom={1} onZoomChange={onZoomChange} />);
    fireEvent.change(screen.getByTestId('document-status-bar-zoom'), { target: { value: '1.5' } });
    expect(onZoomChange).toHaveBeenCalledWith(1.5);
  });

  it('shows the scale the page is actually at', () => {
    render(<DocumentStatusBar zoom={1.25} onZoomChange={vi.fn()} />);
    expect(screen.getByTestId('document-status-bar-zoom')).toHaveValue('1.25');
  });

  // Snapping an off-preset scale would misreport what the reader is seeing.
  it('keeps an off-preset scale rather than snapping it', () => {
    render(<DocumentStatusBar zoom={1.1} onZoomChange={vi.fn()} />);
    expect(screen.getByTestId('document-status-bar-zoom')).toHaveValue('1.1');
  });

  // Fit width — the setting a laptop actually uses, and the one Google Docs
  // has. Offered only when the host can compute it, because this bar has no
  // idea how much room the sheet has.
  describe('fit width', () => {
    it('offers nothing to fit to when the host cannot do it', () => {
      render(<DocumentStatusBar zoom={1} onZoomChange={vi.fn()} />);
      expect(screen.queryByRole('option', { name: 'Fit width' })).toBeNull();
    });

    it('asks the host to fit rather than reporting a scale', () => {
      const onFitWidth = vi.fn();
      const onZoomChange = vi.fn();
      render(<DocumentStatusBar zoom={1} onZoomChange={onZoomChange} onFitWidth={onFitWidth} />);
      fireEvent.change(screen.getByTestId('document-status-bar-zoom'), {
        target: { value: ZOOM_FIT },
      });
      expect(onFitWidth).toHaveBeenCalledTimes(1);
      // The percentage is the host's business — a NaN here is what you get
      // from parsing the sentinel as a number.
      expect(onZoomChange).not.toHaveBeenCalled();
    });

    it('reads as the rule, not as the percentage the rule produced', () => {
      render(
        <DocumentStatusBar zoom={1.47} fitActive onZoomChange={vi.fn()} onFitWidth={vi.fn()} />,
      );
      expect(screen.getByTestId('document-status-bar-zoom')).toHaveValue(ZOOM_FIT);
    });

    // The fitted scale changes as the window is dragged; listing it put a
    // preset in the menu that appeared, moved and vanished with the mouse.
    it('does not add the fitted scale to the presets', () => {
      render(
        <DocumentStatusBar zoom={1.47} fitActive onZoomChange={vi.fn()} onFitWidth={vi.fn()} />,
      );
      expect(screen.queryByRole('option', { name: '147%' })).toBeNull();
      expect(screen.getByRole('option', { name: '150%' })).toBeInTheDocument();
    });

    it('still leaves a fixed scale selectable while fitting', () => {
      const onZoomChange = vi.fn();
      render(
        <DocumentStatusBar zoom={1.47} fitActive onZoomChange={onZoomChange} onFitWidth={vi.fn()} />,
      );
      fireEvent.change(screen.getByTestId('document-status-bar-zoom'), { target: { value: '1' } });
      expect(onZoomChange).toHaveBeenCalledWith(1);
    });
  });
});
