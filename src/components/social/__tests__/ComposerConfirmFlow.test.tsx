import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ComposerConfirmFlow, type ComposerConfirmResult } from '../ComposerConfirmFlow';

afterEach(cleanup);

const PATH = { steps: ['Choose', 'Draft request', 'Confirm', 'Done'], current: 1 };
const DRAFT = 'Sienna, please grant Nora a sprint envelope for ORG-OBS-11.';

function setup(props: Partial<React.ComponentProps<typeof ComposerConfirmFlow>> = {}) {
  const onConfirm = vi.fn<(message: string) => Promise<ComposerConfirmResult>>(async () => ({ receipt: 'Request sent to Sienna Garcia' }));
  const utils = render(
    <ComposerConfirmFlow
      title="Request more budget"
      recipient="To Sienna Garcia · ORG-OBS-11"
      defaultMessage={DRAFT}
      path={PATH}
      onConfirm={onConfirm}
      {...props}
    />,
  );
  return { ...utils, onConfirm };
}

const flow = () => screen.getByTestId('composer-confirm-flow');
const editor = () => screen.getByTestId('composer-confirm-flow-editor') as HTMLTextAreaElement;
const review = () => screen.getByTestId('composer-confirm-flow-review');
const stage = () => flow().getAttribute('data-composer-confirm-flow');
const currentStep = () => screen.getByTestId('composer-confirm-flow-path').querySelector('[aria-current="step"]')?.getAttribute('data-decision-step');

describe('ComposerConfirmFlow — draft', () => {
  it('shows the prefilled message with the title and recipient, focus in the editor, and number keys type', () => {
    setup();
    expect(stage()).toBe('draft');
    expect(screen.getByText('Request more budget')).toBeInTheDocument();
    expect(screen.getByTestId('composer-confirm-flow-recipient').textContent).toBe('To Sienna Garcia · ORG-OBS-11');
    expect(editor().value).toBe(DRAFT);
    expect(document.activeElement).toBe(editor());
    expect(currentStep()).toBe('Draft request');
    // A digit is typed, not treated as a shortcut: nothing prevents it.
    expect(fireEvent.keyDown(editor(), { key: '1' })).toBe(true);
    fireEvent.change(editor(), { target: { value: `${DRAFT} Amount: 12` } });
    expect(editor().value).toBe(`${DRAFT} Amount: 12`);
    expect(screen.queryByRole('toolbar')).toBeNull();
  });

  it('Enter continues to a review of the message as edited; Shift+Enter stays in the editor', () => {
    setup();
    fireEvent.change(editor(), { target: { value: 'Edited words' } });
    expect(fireEvent.keyDown(editor(), { key: 'Enter', shiftKey: true })).toBe(true);
    expect(stage()).toBe('draft');
    expect(fireEvent.keyDown(editor(), { key: 'Enter' })).toBe(false);
    expect(stage()).toBe('review');
    expect(screen.getByTestId('composer-confirm-flow-message').textContent).toBe('Edited words');
    expect(currentStep()).toBe('Confirm');
    expect(document.activeElement).toBe(review());
    expect(screen.queryByRole('toolbar')).toBeNull();
  });

  it('an empty message cannot advance: Continue is disabled and Enter does nothing', () => {
    setup({ defaultMessage: '   ' });
    expect(screen.getByTestId('composer-confirm-flow-continue')).toBeDisabled();
    fireEvent.keyDown(editor(), { key: 'Enter' });
    fireEvent.submit(screen.getByTestId('composer-confirm-flow-draft'));
    expect(stage()).toBe('draft');
  });

  it('a held Enter (repeat) does not advance, and does not insert a newline', () => {
    setup();
    expect(fireEvent.keyDown(editor(), { key: 'Enter', repeat: true })).toBe(false);
    expect(stage()).toBe('draft');
  });

  it('Enter during an IME composition is the editor’s: it neither advances nor is swallowed', () => {
    setup();
    expect(fireEvent.keyDown(editor(), { key: 'Enter', isComposing: true })).toBe(true);
    expect(stage()).toBe('draft');
  });

  it('Back calls onCancel; without onCancel the draft offers no Back', () => {
    const onCancel = vi.fn();
    const { unmount } = setup({ onCancel });
    fireEvent.click(screen.getByTestId('composer-confirm-flow-cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
    unmount();
    setup();
    expect(screen.queryByTestId('composer-confirm-flow-cancel')).toBeNull();
  });

  it('a controlled message reports edits and renders what the host holds', () => {
    function Host() {
      const [message, setMessage] = useState('from host');
      return <ComposerConfirmFlow message={message} onMessageChange={setMessage} onConfirm={() => undefined} />;
    }
    render(<Host />);
    expect(editor().value).toBe('from host');
    fireEvent.change(editor(), { target: { value: 'changed' } });
    expect(editor().value).toBe('changed');
  });
});

describe('ComposerConfirmFlow — review and done', () => {
  function toReview(message = DRAFT) {
    fireEvent.change(editor(), { target: { value: message } });
    fireEvent.keyDown(editor(), { key: 'Enter' });
    expect(stage()).toBe('review');
  }

  it('Escape returns to the draft with the edited message retained; so does Back', () => {
    setup();
    toReview('kept across the round trip');
    fireEvent.keyDown(review(), { key: 'Escape' });
    expect(stage()).toBe('draft');
    expect(editor().value).toBe('kept across the round trip');
    expect(document.activeElement).toBe(editor());
    fireEvent.keyDown(editor(), { key: 'Enter' });
    fireEvent.click(screen.getByTestId('composer-confirm-flow-back'));
    expect(stage()).toBe('draft');
    expect(editor().value).toBe('kept across the round trip');
  });

  it('a held Enter never confirms, nor does Enter during an IME composition, nor Enter on a focused button', () => {
    const { onConfirm } = setup();
    toReview();
    fireEvent.keyDown(review(), { key: 'Enter', repeat: true });
    fireEvent.keyDown(review(), { key: 'Enter', isComposing: true });
    fireEvent.keyDown(screen.getByTestId('composer-confirm-flow-back'), { key: 'Enter' });
    expect(onConfirm).not.toHaveBeenCalled();
    expect(stage()).toBe('review');
  });

  it('Enter confirms with the edited message; Done shows only after onConfirm resolves ok, with its receipt', async () => {
    let resolve!: (r: ComposerConfirmResult) => void;
    const onConfirm = vi.fn(() => new Promise<ComposerConfirmResult>((r) => { resolve = r; }));
    setup({ onConfirm });
    toReview('final words');
    await act(async () => { fireEvent.keyDown(review(), { key: 'Enter' }); });
    expect(onConfirm).toHaveBeenCalledWith('final words');
    expect(stage()).toBe('review');
    expect(screen.getByTestId('composer-confirm-flow-busy')).toBeInTheDocument();
    expect(review().getAttribute('aria-busy')).toBe('true');
    expect(screen.getByTestId('composer-confirm-flow-confirm')).toBeDisabled();
    // A second Enter while pending is ignored.
    await act(async () => { fireEvent.keyDown(review(), { key: 'Enter' }); });
    expect(onConfirm).toHaveBeenCalledTimes(1);
    await act(async () => { resolve({ receipt: 'Request sent to Sienna Garcia' }); });
    await waitFor(() => expect(stage()).toBe('done'));
    expect(screen.getByTestId('composer-confirm-flow-done-message').textContent).toBe('Request sent to Sienna Garcia');
    expect(screen.getByRole('status', { name: 'Done' })).toBeInTheDocument();
    expect(currentStep()).toBe('Done');
    expect(screen.getByTestId('composer-confirm-flow-path').querySelectorAll('[data-complete]')).toHaveLength(3);
    expect(document.activeElement).toBe(screen.getByTestId('composer-confirm-flow-done'));
  });

  it('an error result shows inline and stays on review; a retry can then succeed', async () => {
    const onConfirm = vi.fn<(m: string) => Promise<ComposerConfirmResult>>()
      .mockResolvedValueOnce({ error: 'Sienna cannot be reached right now.' })
      .mockResolvedValueOnce(undefined);
    setup({ onConfirm, doneMessage: 'Request confirmed.' });
    toReview();
    await act(async () => { fireEvent.click(screen.getByTestId('composer-confirm-flow-confirm')); });
    expect(stage()).toBe('review');
    expect(screen.getByRole('alert').textContent).toBe('Sienna cannot be reached right now.');
    expect(screen.getByTestId('composer-confirm-flow-message').textContent).toBe(DRAFT);
    expect(screen.queryByTestId('composer-confirm-flow-busy')).toBeNull();
    await act(async () => { fireEvent.keyDown(review(), { key: 'Enter' }); });
    await waitFor(() => expect(stage()).toBe('done'));
    expect(screen.getByTestId('composer-confirm-flow-done-message').textContent).toBe('Request confirmed.');
  });

  it('a thrown onConfirm is an inline error too', async () => {
    setup({ onConfirm: async () => { throw new Error('Network down'); } });
    toReview();
    await act(async () => { fireEvent.keyDown(review(), { key: 'Enter' }); });
    expect(stage()).toBe('review');
    expect(screen.getByRole('alert').textContent).toBe('Network down');
  });

  it('the done stage has one back action, a review heading and note are the host’s words, and no stage has a toolbar', async () => {
    const onDone = vi.fn();
    setup({ onDone, reviewTitle: 'Confirm budget request', note: 'Nothing is sent until you confirm.', doneTitle: 'Request confirmed', doneActionLabel: 'Back to preparation' });
    toReview();
    expect(screen.getByText('Confirm budget request')).toBeInTheDocument();
    expect(screen.getByTestId('composer-confirm-flow-note').textContent).toBe('Nothing is sent until you confirm.');
    expect(screen.queryByRole('toolbar')).toBeNull();
    await act(async () => { fireEvent.keyDown(review(), { key: 'Enter' }); });
    await waitFor(() => expect(stage()).toBe('done'));
    expect(screen.getByText('Request confirmed')).toBeInTheDocument();
    expect(screen.queryByRole('toolbar')).toBeNull();
    fireEvent.click(screen.getByTestId('composer-confirm-flow-done-action'));
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('reports each stage change', async () => {
    const onStageChange = vi.fn();
    setup({ onStageChange });
    toReview();
    fireEvent.keyDown(review(), { key: 'Escape' });
    fireEvent.keyDown(editor(), { key: 'Enter' });
    await act(async () => { fireEvent.keyDown(review(), { key: 'Enter' }); });
    await waitFor(() => expect(stage()).toBe('done'));
    expect(onStageChange.mock.calls.map((c) => c[0])).toEqual(['review', 'draft', 'review', 'done']);
  });
});
