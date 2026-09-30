import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ProposedEditStrip, proposedEditPlacement, proposedEditPreview, type ProposedEdit } from '../ProposedEditStrip';
import { EditorShell } from '../EditorShell';

afterEach(cleanup);

const READY: ProposedEdit = {
  id: 'p1',
  kind: 'replace',
  anchor: { from: 4, to: 18 },
  content: { text: 'The assessment covers five practices.' },
  summary: 'Tightens the scope sentence',
  status: 'ready',
};

function items() {
  return screen.getAllByTestId('proposed-edit-strip-item');
}

describe('proposedEditPreview / proposedEditPlacement', () => {
  it('previews text as given and html as its text', () => {
    expect(proposedEditPreview({ text: 'a <b>' })).toBe('a <b>');
    expect(proposedEditPreview({ html: '<p>One &amp; two</p><p>Three</p>' })).toBe('One & two\nThree');
    expect(proposedEditPreview({})).toBe('');
  });

  it('names where the edit lands', () => {
    expect(proposedEditPlacement({ kind: 'replace', anchor: { from: 1, to: 2 } })).toBe('Replace selection');
    expect(proposedEditPlacement({ kind: 'insert', anchor: 'cursor' })).toBe('Insert at cursor');
    expect(proposedEditPlacement({ kind: 'insert', anchor: { from: 3, to: 3 } })).toBe('Insert');
  });
});

describe('ProposedEditStrip', () => {
  it('renders nothing when every proposal is discarded (or there are none)', () => {
    const { container, rerender } = render(<ProposedEditStrip proposals={[]} onApply={vi.fn()} onDiscard={vi.fn()} />);
    expect(container.firstChild).toBeNull();
    rerender(<ProposedEditStrip proposals={[{ ...READY, status: 'discarded' }]} onApply={vi.fn()} onDiscard={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('a ready proposal shows its placement, summary and preview, and Apply / Discard call back with its id', () => {
    const onApply = vi.fn();
    const onDiscard = vi.fn();
    render(<ProposedEditStrip proposals={[READY]} onApply={onApply} onDiscard={onDiscard} />);
    expect(screen.getByTestId('proposed-edit-strip-title').textContent).toBe('Proposed edit');
    expect(screen.getByTestId('proposed-edit-strip-placement').textContent).toBe('Replace selection');
    expect(screen.getByTestId('proposed-edit-strip-summary').textContent).toBe('Tightens the scope sentence');
    expect(screen.getByTestId('proposed-edit-strip-preview').textContent).toBe('The assessment covers five practices.');
    expect(items()[0]!.getAttribute('data-proposal-id')).toBe('p1');
    fireEvent.click(screen.getByTestId('proposed-edit-strip-apply'));
    fireEvent.click(screen.getByTestId('proposed-edit-strip-discard'));
    expect(onApply).toHaveBeenCalledWith('p1');
    expect(onDiscard).toHaveBeenCalledWith('p1');
  });

  it('streaming: the thinking affordance, Apply off, Discard reads Cancel and still calls back', () => {
    const onDiscard = vi.fn();
    render(<ProposedEditStrip proposals={[{ ...READY, status: 'streaming', content: { text: 'The assess' } }]} onApply={vi.fn()} onDiscard={onDiscard} />);
    expect(screen.getByTestId('proposed-edit-strip-streaming')).toBeTruthy();
    expect(screen.getByTestId('thinking-dots')).toBeTruthy();
    expect((screen.getByTestId('proposed-edit-strip-apply') as HTMLButtonElement).disabled).toBe(true);
    const cancel = screen.getByTestId('proposed-edit-strip-discard');
    expect(cancel.textContent).toBe('Cancel');
    fireEvent.click(cancel);
    expect(onDiscard).toHaveBeenCalledWith('p1');
  });

  it('applying: both actions off and Apply says so; applied: a success chip and no actions', () => {
    const { rerender } = render(<ProposedEditStrip proposals={[{ ...READY, status: 'applying' }]} onApply={vi.fn()} onDiscard={vi.fn()} />);
    const apply = screen.getByTestId('proposed-edit-strip-apply') as HTMLButtonElement;
    expect(apply.disabled).toBe(true);
    expect(apply.textContent).toBe('Applying…');
    expect((screen.getByTestId('proposed-edit-strip-discard') as HTMLButtonElement).disabled).toBe(true);
    rerender(<ProposedEditStrip proposals={[{ ...READY, status: 'applied' }]} onApply={vi.fn()} onDiscard={vi.fn()} />);
    expect(screen.getByTestId('proposed-edit-strip-applied').textContent).toBe('Applied');
    expect(screen.queryByTestId('proposed-edit-strip-apply')).toBeNull();
  });

  it('a proposal with no content cannot be applied', () => {
    render(<ProposedEditStrip proposals={[{ ...READY, content: { text: '' } }]} onApply={vi.fn()} onDiscard={vi.fn()} />);
    expect((screen.getByTestId('proposed-edit-strip-apply') as HTMLButtonElement).disabled).toBe(true);
  });

  it('Revise… opens a one-line field that sends the instruction with the id, and only when wired', () => {
    const onRevise = vi.fn();
    const { rerender } = render(<ProposedEditStrip proposals={[READY]} onApply={vi.fn()} onDiscard={vi.fn()} />);
    expect(screen.queryByTestId('proposed-edit-strip-revise')).toBeNull();
    rerender(<ProposedEditStrip proposals={[READY]} onApply={vi.fn()} onDiscard={vi.fn()} onRevise={onRevise} />);
    fireEvent.click(screen.getByTestId('proposed-edit-strip-revise'));
    const send = screen.getByTestId('proposed-edit-strip-revise-send') as HTMLButtonElement;
    expect(send.disabled).toBe(true);
    fireEvent.change(screen.getByTestId('proposed-edit-strip-revise-input'), { target: { value: '  shorter  ' } });
    fireEvent.click(send);
    expect(onRevise).toHaveBeenCalledWith('p1', 'shorter');
    expect(screen.queryByTestId('proposed-edit-strip-revise-form')).toBeNull();
  });

  it('with more than one: a counted heading, Apply all over ready ones and Discard all over pending ones', () => {
    const onApplyAll = vi.fn();
    const onDiscardAll = vi.fn();
    const second: ProposedEdit = { id: 'p2', kind: 'insert', anchor: 'cursor', content: { html: '<p>Next steps</p>' }, status: 'ready' };
    const { rerender } = render(
      <ProposedEditStrip proposals={[READY, second, { ...READY, id: 'p3', status: 'discarded' }]} onApply={vi.fn()} onDiscard={vi.fn()} onApplyAll={onApplyAll} onDiscardAll={onDiscardAll} />,
    );
    expect(items()).toHaveLength(2);
    expect(screen.getByTestId('proposed-edit-strip-title').textContent).toBe('2 proposed edits');
    fireEvent.click(screen.getByTestId('proposed-edit-strip-apply-all'));
    fireEvent.click(screen.getByTestId('proposed-edit-strip-discard-all'));
    expect(onApplyAll).toHaveBeenCalledTimes(1);
    expect(onDiscardAll).toHaveBeenCalledTimes(1);
    // One ready + one streaming: nothing to apply "all" of, but two to discard.
    rerender(
      <ProposedEditStrip proposals={[READY, { ...second, status: 'streaming' }]} onApply={vi.fn()} onDiscard={vi.fn()} onApplyAll={onApplyAll} onDiscardAll={onDiscardAll} />,
    );
    expect(screen.queryByTestId('proposed-edit-strip-apply-all')).toBeNull();
    expect(screen.getByTestId('proposed-edit-strip-discard-all')).toBeTruthy();
  });

  it('passes data-testid through to the region and its parts', () => {
    render(<ProposedEditStrip proposals={[READY]} onApply={vi.fn()} onDiscard={vi.fn()} data-testid="agent-edit" />);
    const region = screen.getByTestId('agent-edit');
    expect(region.getAttribute('aria-label')).toBe('Proposed edit');
    expect(within(region).getByTestId('agent-edit-apply')).toBeTruthy();
  });
});

describe('EditorShell proposal slot', () => {
  it('draws the proposal between the scroller and the dock, outside both', () => {
    render(
      <EditorShell title="Release plan" proposal={<ProposedEditStrip proposals={[READY]} onApply={vi.fn()} onDiscard={vi.fn()} />} footer={<div data-testid="dock-content">dock</div>}>
        <p>page</p>
      </EditorShell>,
    );
    const slot = screen.getByTestId('editor-shell-proposal');
    const scroller = screen.getByTestId('editor-shell-scroller');
    const dock = screen.getByTestId('editor-shell-dock');
    expect(slot.contains(screen.getByTestId('proposed-edit-strip'))).toBe(true);
    expect(scroller.contains(slot)).toBe(false);
    expect(dock.contains(slot)).toBe(false);
    expect(scroller.nextElementSibling).toBe(slot);
    expect(slot.nextElementSibling).toBe(dock);
  });

  it('draws no slot without a proposal', () => {
    render(<EditorShell title="Release plan"><p>page</p></EditorShell>);
    expect(screen.queryByTestId('editor-shell-proposal')).toBeNull();
  });
});
