import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PresentationView, { type PresentationRevision } from '../PresentationView';

function revision(partial: Partial<PresentationRevision> = {}): PresentationRevision {
  return {
    id: 'rev-2',
    label: 'v2',
    slides: [
      { id: 's1', index: 1, title: 'Release readiness', preview: <img alt="Slide 1" src="blob:1" /> },
      { id: 's2', index: 2, title: 'Delivery progress', preview: <img alt="Slide 2" src="blob:2" /> },
      { id: 's3', index: 3, title: 'Sources' },
    ],
    ...partial,
  };
}

function view(props: Partial<React.ComponentProps<typeof PresentationView>> = {}) {
  return render(
    <PresentationView
      title="Sprint review"
      revisions={[revision()]}
      revisionId="rev-2"
      slideIndex={1}
      onRevisionChange={() => undefined}
      onSlideChange={() => undefined}
      {...props}
    />,
  );
}

describe('PresentationView', () => {
  it('shows the slide it was asked for, numbered as the deck numbers itself', () => {
    view({ slideIndex: 2 });
    expect(screen.getByTestId('presentation-view-position')).toHaveTextContent('Slide 2 of 3');
    expect(screen.getByAltText('Slide 2')).toBeInTheDocument();
  });

  it('says a preview is missing rather than drawing a grey rectangle in its place', () => {
    view({ slideIndex: 3 });
    expect(screen.getByTestId('presentation-view-no-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('presentation-view-open-preview')).not.toBeInTheDocument();
  });

  it('clamps a page a shorter revision does not have rather than showing nothing', () => {
    view({ slideIndex: 99 });
    expect(screen.getByTestId('presentation-view-position')).toHaveTextContent('Slide 3 of 3');
  });

  it('stops at both ends', () => {
    const onSlideChange = vi.fn();
    const { rerender } = view({ slideIndex: 1, onSlideChange });
    expect(screen.getByLabelText('Previous slide')).toBeDisabled();
    fireEvent.click(screen.getByLabelText('Next slide'));
    expect(onSlideChange).toHaveBeenCalledWith(2);

    rerender(
      <PresentationView
        title="Sprint review"
        revisions={[revision()]}
        revisionId="rev-2"
        slideIndex={3}
        onRevisionChange={() => undefined}
        onSlideChange={onSlideChange}
      />,
    );
    expect(screen.getByLabelText('Next slide')).toBeDisabled();
  });

  it('navigates from the outline, which is the only control that scales past a few slides', () => {
    const onSlideChange = vi.fn();
    view({ onSlideChange });
    fireEvent.click(screen.getByText('Delivery progress'));
    expect(onSlideChange).toHaveBeenCalledWith(2);
  });

  it('offers the revision switch only when there is more than one attempt', () => {
    view();
    expect(screen.queryByTestId('presentation-view-revisions')).not.toBeInTheDocument();

    const onRevisionChange = vi.fn();
    view({
      revisions: [revision({ id: 'rev-1', label: 'v1' }), revision()],
      onRevisionChange,
    });
    fireEvent.click(screen.getByText('v1'));
    expect(onRevisionChange).toHaveBeenCalledWith('rev-1');
  });

  it('draws no download button when the host offered no route', () => {
    view();
    expect(screen.queryByTestId('presentation-view-download')).not.toBeInTheDocument();
    const onDownload = vi.fn();
    view({ onDownload });
    fireEvent.click(screen.getByTestId('presentation-view-download'));
    expect(onDownload).toHaveBeenCalled();
  });

  it('says why there is nothing to read when a generation is still in flight', () => {
    view({ revisions: [], revisionId: '', pending: { label: 'v1', status: 'generating' } });
    expect(screen.getByTestId('presentation-view-empty')).toHaveTextContent('still being generated');
  });

  it('reports a failed generation in its own words', () => {
    view({
      revisions: [],
      revisionId: '',
      pending: { label: 'v3', status: 'failed', message: 'The planner returned no slides.' },
    });
    expect(screen.getByTestId('presentation-view-empty')).toHaveTextContent('The planner returned no slides.');
  });

  it('shows an unreadable presentation as an error with a way out', () => {
    const onRetry = vi.fn();
    view({ state: 'error', errorMessage: 'the revisions answered 503', onRetry });
    fireEvent.click(screen.getByText('Try again'));
    expect(onRetry).toHaveBeenCalled();
  });
});

// The brief promised ←/→ paging and the surface never listened, so a reader
// pressing ArrowRight on "Slide 1 of 8" saw nothing happen at all.
describe('PresentationView keyboard paging', () => {
  it('is focusable and named, so a keyboard can reach the deck at all', () => {
    view();
    const deck = screen.getByTestId('presentation-view');
    expect(deck).toHaveAttribute('tabindex', '0');
    expect(deck).toHaveAttribute('aria-label', expect.stringContaining('Sprint review'));
  });

  it('pages forward on ArrowRight', () => {
    const onSlideChange = vi.fn();
    view({ slideIndex: 1, onSlideChange });
    fireEvent.keyDown(screen.getByTestId('presentation-view'), { key: 'ArrowRight' });
    expect(onSlideChange).toHaveBeenCalledWith(2);
  });

  it('pages back on ArrowLeft', () => {
    const onSlideChange = vi.fn();
    view({ slideIndex: 2, onSlideChange });
    fireEvent.keyDown(screen.getByTestId('presentation-view'), { key: 'ArrowLeft' });
    expect(onSlideChange).toHaveBeenCalledWith(1);
  });

  it('jumps to the ends on Home and End', () => {
    const onSlideChange = vi.fn();
    view({ slideIndex: 2, onSlideChange });
    const deck = screen.getByTestId('presentation-view');
    fireEvent.keyDown(deck, { key: 'End' });
    expect(onSlideChange).toHaveBeenLastCalledWith(3);
    fireEvent.keyDown(deck, { key: 'Home' });
    expect(onSlideChange).toHaveBeenLastCalledWith(1);
  });

  it('stays put at both ends rather than asking for a slide that is not there', () => {
    const onSlideChange = vi.fn();
    const { rerender } = view({ slideIndex: 1, onSlideChange });
    fireEvent.keyDown(screen.getByTestId('presentation-view'), { key: 'ArrowLeft' });
    expect(onSlideChange).not.toHaveBeenCalled();
    rerender(
      <PresentationView
        title="Sprint review"
        revisions={[revision()]}
        revisionId="rev-2"
        slideIndex={3}
        onRevisionChange={() => undefined}
        onSlideChange={onSlideChange}
      />,
    );
    fireEvent.keyDown(screen.getByTestId('presentation-view'), { key: 'ArrowRight' });
    expect(onSlideChange).not.toHaveBeenCalled();
  });

  it('leaves modified presses to the browser — ⌘← is Back, not page back', () => {
    const onSlideChange = vi.fn();
    view({ slideIndex: 2, onSlideChange });
    const deck = screen.getByTestId('presentation-view');
    fireEvent.keyDown(deck, { key: 'ArrowLeft', metaKey: true });
    fireEvent.keyDown(deck, { key: 'ArrowRight', altKey: true });
    expect(onSlideChange).not.toHaveBeenCalled();
  });

  it('ignores keys that belong to a text field inside the surface', () => {
    const onSlideChange = vi.fn();
    view({
      slideIndex: 1,
      onSlideChange,
      notice: <input aria-label="Notes" defaultValue="hello" />,
    });
    fireEvent.keyDown(screen.getByLabelText('Notes'), { key: 'ArrowRight' });
    expect(onSlideChange).not.toHaveBeenCalled();
  });

  it('leaves unrelated keys alone', () => {
    const onSlideChange = vi.fn();
    view({ slideIndex: 1, onSlideChange });
    fireEvent.keyDown(screen.getByTestId('presentation-view'), { key: 'a' });
    expect(onSlideChange).not.toHaveBeenCalled();
  });
});

// In a wide, short pane the frame used to stretch to the full width while the
// slide inside stayed its natural size — 1,100px of grey around a ~600px deck
// on the host's pipeline run card.
describe('PresentationView slide frame', () => {
  it('caps the frame to 16:9 of the available height', () => {
    view();
    const stage = screen.getByTestId('presentation-view-stage');
    expect(stage.className).toContain('aspect-[16/9]');
    // Height binds, width follows — the opposite of stretching to the pane.
    expect(stage.className).toContain('h-full');
    expect(stage.className).toContain('w-auto');
  });

  it('never outgrows a narrow pane, so that case is unchanged', () => {
    view();
    expect(screen.getByTestId('presentation-view-stage').className).toContain('max-w-full');
  });

  it('centres the frame once it stops growing', () => {
    view();
    const row = screen.getByTestId('presentation-view-stage').parentElement!;
    expect(row.className).toContain('justify-center');
  });

  it('takes an explicit maxSlideWidth', () => {
    view({ maxSlideWidth: 720 });
    expect(screen.getByTestId('presentation-view-stage')).toHaveStyle({ maxWidth: '720px' });
  });

  it('sets no max-width of its own without the prop', () => {
    view();
    expect(screen.getByTestId('presentation-view-stage').style.maxWidth).toBe('');
  });

  it('still shows the slide and its position', () => {
    view({ slideIndex: 2, maxSlideWidth: 720 });
    expect(screen.getByAltText('Slide 2')).toBeInTheDocument();
    expect(screen.getByTestId('presentation-view-position')).toHaveTextContent('Slide 2 of 3');
  });
});

describe('PresentationView revision picker', () => {
  it('more than five revisions are one Select, newest first', () => {
    const onRevisionChange = vi.fn();
    const revisions = Array.from({ length: 7 }, (_, i) => revision({ id: `rev-${i + 1}`, label: `v${i + 1}` }));
    view({ revisions, revisionId: 'rev-7', onRevisionChange });
    const select = screen.getByTestId('presentation-view-revision-select') as HTMLSelectElement;
    expect(select.options[0]!.textContent).toBe('v7 · latest');
    fireEvent.change(select, { target: { value: 'rev-2' } });
    expect(onRevisionChange).toHaveBeenCalledWith('rev-2');
    expect(screen.queryByTestId('presentation-view-revisions')).toBeNull();
  });
});
