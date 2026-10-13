import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DeckReader, type DeckReaderProps } from '../presentation/DeckReader';
import { useComposerFocusRequest } from '../../social/ConversationInputs';
import type { ComposerFocusRequest } from '../../social/conversationInputRegistry';
import type { DeckSpec } from '../presentation/deckSpec';
import type { PresentationPreview } from '../presentation/PresentationEditor';

afterEach(cleanup);

const source = [{ documentId: 'doc-1', title: 'Report' }];
const spec: DeckSpec = {
  title: 'Read-only presentation',
  slides: [
    { id: 'summary', layout: 'title', title: 'Summary', bullets: ['One', 'Two'], notes: 'Lead with this.', sources: source },
    { id: 'details', layout: 'bullets', title: 'Details', sources: source },
  ],
};
const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"></svg>';
const rendered: PresentationPreview = {
  slides: [
    { id: 'summary', svg },
    { id: 'details', svg },
    { id: 'sources', svg, title: 'Sources', generated: true },
  ],
};

function mount(props: Partial<DeckReaderProps> = {}) {
  const onRequestPreview = vi.fn();
  const utils = render(
    <DeckReader
      spec={spec}
      preview={rendered}
      onRequestPreview={onRequestPreview}
      renderFrame={({ toolbar, surface, footer }) => <div>{toolbar}{surface}{footer}</div>}
      data-testid="reader"
      {...props}
    />,
  );
  return { ...utils, onRequestPreview };
}

describe('DeckReader', () => {
  it('asks for a preview once and draws the toolbar, the rail and the first slide', () => {
    const { onRequestPreview, container } = mount();
    // Once per renderable spec (the test setup's StrictMode runs effects twice).
    expect(onRequestPreview).toHaveBeenCalledWith(spec);
    expect(screen.getByRole('toolbar', { name: 'Presentation viewing tools' })).toBeInTheDocument();
    expect(screen.getByTestId('reader')).toHaveClass('deck-reader-surface');
    expect(screen.getByRole('navigation', { name: 'Slide thumbnails' })).toBeInTheDocument();
    // The generated Sources slide counts.
    expect(screen.getByTestId('reader-position')).toHaveTextContent('Slide 1 of 3');
    expect(within(screen.getByTestId('reader-stage')).getByRole('img', { name: 'Summary' })).toBeInTheDocument();
    expect(screen.getByTestId('reader-notes')).toHaveValue('Lead with this.');
    expect(container.querySelector('.deck-reader-slide-frame')).not.toBeNull();
    // Read-only: no editing controls at all.
    expect(screen.queryByRole('button', { name: /Add slide|New slide|Delete slide|Duplicate/ })).toBeNull();
  });

  it('steps with the buttons and with the keyboard on the viewport, reporting navigation', () => {
    const onNavigateSlide = vi.fn();
    const onSelectedSlideChange = vi.fn();
    mount({ onNavigateSlide, onSelectedSlideChange });
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByTestId('reader-position')).toHaveTextContent('Slide 2 of 3');
    expect(onNavigateSlide).toHaveBeenLastCalledWith('details');
    const viewport = screen.getByTestId('reader-viewport');
    expect(viewport).toHaveAttribute('aria-label', 'Slide canvas. Use arrow keys to change slides.');
    fireEvent.keyDown(viewport, { key: 'End' });
    expect(screen.getByTestId('reader-position')).toHaveTextContent('Slide 3 of 3');
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled();
    expect(screen.getByText('This generated Sources slide has no speaker notes.')).toBeInTheDocument();
    fireEvent.keyDown(viewport, { key: 'Home' });
    expect(screen.getByTestId('reader-position')).toHaveTextContent('Slide 1 of 3');
    expect(onSelectedSlideChange).toHaveBeenLastCalledWith('summary');
  });

  it('switches to the outline and selects from it', () => {
    mount();
    fireEvent.click(screen.getByRole('button', { name: 'Outline' }));
    const outline = screen.getByRole('navigation', { name: 'Presentation outline' });
    fireEvent.click(within(outline).getByRole('button', { name: /Details/ }));
    expect(screen.getByTestId('reader-position')).toHaveTextContent('Slide 2 of 3');
    expect(within(outline).getByRole('button', { name: /Details/ })).toHaveAttribute('aria-current', 'true');
    expect(within(outline).getByText('Generated from citations')).toBeInTheDocument();
  });

  it('zooms through the native "Slide zoom" select and toggles notes', () => {
    const { container } = mount();
    fireEvent.change(screen.getByRole('combobox', { name: 'Slide zoom' }), { target: { value: '100' } });
    expect((container.querySelector('.deck-reader-slide-frame') as HTMLElement).style.width).toBe('960px');
    fireEvent.click(screen.getByRole('button', { name: 'Notes' }));
    expect(screen.queryByTestId('reader-notes')).toBeNull();
  });

  it('follows a select request without reporting it as navigation', () => {
    const onNavigateSlide = vi.fn();
    const { rerender } = mount({ onNavigateSlide });
    rerender(
      <DeckReader spec={spec} preview={rendered} onRequestPreview={() => {}} onNavigateSlide={onNavigateSlide}
        selectSlideRequest={{ slideId: 'details', key: 1 }} renderFrame={({ toolbar, surface }) => <div>{toolbar}{surface}</div>} data-testid="reader" />,
    );
    expect(screen.getByTestId('reader-position')).toHaveTextContent('Slide 2 of 3');
    expect(onNavigateSlide).not.toHaveBeenCalled();
  });

  it('shows loading and error stages, and Retry asks again', () => {
    const { rerender, onRequestPreview } = mount({ preview: 'loading' });
    expect(screen.getByTestId('reader-preview-loading')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Present' })).toBeDisabled();
    rerender(
      <DeckReader spec={spec} preview={{ error: 'Renderer down.' }} onRequestPreview={onRequestPreview}
        renderFrame={({ toolbar, surface }) => <div>{toolbar}{surface}</div>} data-testid="reader" />,
    );
    expect(screen.getByText('Renderer down.')).toBeInTheDocument();
    const before = onRequestPreview.mock.calls.length;
    fireEvent.click(screen.getByRole('button', { name: 'Retry preview' }));
    expect(onRequestPreview).toHaveBeenCalledTimes(before + 1);
  });

  it('disables Chat & agent without a conversation, and hands off to it when there is one', () => {
    const { unmount } = mount();
    expect(screen.getByRole('button', { name: 'Chat & agent' })).toBeDisabled();
    unmount();
    const onFocusConversation = vi.fn();
    mount({ onFocusConversation });
    fireEvent.click(screen.getByRole('button', { name: 'Chat & agent' }));
    expect(onFocusConversation).toHaveBeenCalledTimes(1);
  });

  it('presents in a dialog that follows the reader and hands off from inside', () => {
    const onFocusConversation = vi.fn();
    const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => { cb(0); return 0; });
    mount({ onFocusConversation });
    fireEvent.click(screen.getByRole('button', { name: 'Present' }));
    const dialog = screen.getByRole('dialog', { name: 'Present Read-only presentation' });
    expect(within(dialog).getByRole('button', { name: 'Exit presentation' })).toBeInTheDocument();
    act(() => { fireEvent.click(within(dialog).getByRole('button', { name: 'Chat & agent' })); });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(onFocusConversation).toHaveBeenCalledTimes(1);
    raf.mockRestore();
  });

  it('compact review collapses the view controls into one View menu with notes closed', () => {
    mount({ compactReview: true });
    expect(screen.queryByRole('button', { name: 'Outline' })).toBeNull();
    expect(screen.queryByRole('combobox', { name: 'Slide zoom' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Presentation view options' })).toBeInTheDocument();
    expect(screen.queryByTestId('reader-notes')).toBeNull();
  });

  // The DOM contract the aws-agentcore portal's e2e (deck-reader.spec.ts)
  // drives, taken from the portal's own reader (e52d888d) that this replaced.
  it('keeps the portal reader\'s DOM contract: ids, names, filmstrip selects and footer context', () => {
    render(
      <DeckReader spec={spec} preview={rendered} onRequestPreview={() => {}} data-testid="fixture-reader"
        renderFrame={({ toolbar, surface, footer }) => <div>{toolbar}{surface}{footer}</div>}
        footer={(context) => <div data-testid="fixture-footer" data-slide={context.selectedSlide?.id ?? context.selectedGeneratedSlide?.id} />} />,
    );
    expect(screen.getByTestId('fixture-reader-position')).toHaveTextContent('Slide 1 of 3');
    expect(screen.getByTestId('fixture-reader-viewport')).toHaveAttribute('tabindex', '0');
    expect(screen.getByTestId('fixture-reader-stage').querySelector('img')).not.toBeNull();
    for (const id of ['summary', 'details', 'sources']) expect(screen.getByTestId(`fixture-reader-filmstrip-select-${id}`)).toBeInTheDocument();
    expect(screen.getByTestId('fixture-reader-notes')).toBeInTheDocument();
    expect(screen.getByTestId('fixture-footer')).toHaveAttribute('data-slide', 'summary');
    fireEvent.click(screen.getByTestId('fixture-reader-filmstrip-select-sources'));
    expect(screen.getByTestId('fixture-reader-position')).toHaveTextContent('Slide 3 of 3');
    expect(screen.getByTestId('fixture-footer')).toHaveAttribute('data-slide', 'sources');
    expect(screen.getByRole('combobox', { name: 'Slide zoom' }).tagName).toBe('SELECT');
    for (const name of ['Slides', 'Outline', 'Previous slide', 'Next slide', 'Notes', 'Chat & agent', 'Present']) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument();
    }
  });

  it('hides the old version\'s images until the current preview is ready', () => {
    const frame: DeckReaderProps['renderFrame'] = ({ toolbar, surface }) => <div>{toolbar}{surface}</div>;
    const { rerender } = render(<DeckReader spec={spec} preview={rendered} onRequestPreview={() => {}} renderFrame={frame} data-testid="r" />);
    expect(screen.getByTestId('r-stage').querySelector('img')).not.toBeNull();
    rerender(<DeckReader spec={spec} preview={rendered} previewCurrent={false} onRequestPreview={() => {}} renderFrame={frame} data-testid="r" />);
    expect(screen.getByTestId('r-preview-loading')).toBeInTheDocument();
    expect(screen.getByTestId('r-stage').querySelector('img')).toBeNull();
    expect(screen.getByRole('button', { name: 'Present' })).toBeDisabled();
    rerender(<DeckReader spec={spec} preview={{ error: 'Current render failed' }} previewCurrent={false} onRequestPreview={() => {}} renderFrame={frame} data-testid="r" />);
    expect(screen.getByText('Current render failed')).toBeInTheDocument();
    expect(screen.getByTestId('r-stage').querySelector('img')).toBeNull();
  });

  it('without onFocusConversation, hands off through the composer focus registry like the portal reader did', () => {
    const requests: ComposerFocusRequest[] = [];
    function Composer() {
      useComposerFocusRequest((request) => { requests.push(request); return true; });
      return null;
    }
    const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => { cb(0); return 0; });
    const { rerender } = mount();
    // No composer mounted: nothing to hand off to.
    expect(screen.getByRole('button', { name: 'Chat & agent' })).toBeDisabled();
    const reader = (
      <DeckReader spec={spec} preview={rendered} onRequestPreview={() => {}} data-testid="reader"
        renderFrame={({ toolbar, surface }) => <div>{toolbar}{surface}<Composer /></div>} />
    );
    rerender(reader);
    fireEvent.click(screen.getByRole('button', { name: 'Chat & agent' }));
    expect(requests).toEqual([{ mode: 'agent' }]);
    fireEvent.click(screen.getByRole('button', { name: 'Present' }));
    act(() => { fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Chat & agent' })); });
    expect(requests).toHaveLength(2);
    raf.mockRestore();
  });
});
