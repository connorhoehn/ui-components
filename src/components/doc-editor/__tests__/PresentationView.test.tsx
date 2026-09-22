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
