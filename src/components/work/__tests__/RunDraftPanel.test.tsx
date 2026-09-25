import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { RunDraftPanel, RUN_DRAFT_STATUS_LABELS, type RunDraftStatus } from '../RunDraftPanel';
import { EstimateRow, formatEstimate, formatDuration, confidenceOf, confidenceNote, type RunEstimate } from '../EstimateRow';
import { AccessNotice } from '../AccessNotice';

describe('formatEstimate', () => {
  it('formats usd ranges with two decimals and a sub-cent floor', () => {
    expect(formatEstimate({ kind: 'range', low: 0.03, high: 0.3, unit: 'usd' })).toBe('$0.03 – $0.30');
    expect(formatEstimate({ kind: 'range', low: 0.004, high: 0.2, unit: 'usd' })).toBe('<$0.01 – $0.20');
    expect(formatEstimate({ kind: 'range', low: 1.5, high: 1.5, unit: 'usd' })).toBe('$1.50');
    expect(formatEstimate({ kind: 'range', low: 0, high: 0, unit: 'usd' })).toBe('$0.00');
  });

  it('formats durations in seconds, minutes or hours picked from the upper bound', () => {
    expect(formatEstimate({ kind: 'range', low: 60_000, high: 360_000, unit: 'ms' })).toBe('1 – 6 min');
    expect(formatEstimate({ kind: 'range', low: 5_000, high: 40_000, unit: 'ms' })).toBe('5 – 40 s');
    expect(formatEstimate({ kind: 'range', low: 30_000, high: 360_000, unit: 'ms' })).toBe('0.5 – 6 min');
    expect(formatEstimate({ kind: 'range', low: 3_600_000, high: 7_200_000, unit: 'ms' })).toBe('1 – 2 h');
    expect(formatEstimate({ kind: 'range', low: 120_000, high: 120_000, unit: 'ms' })).toBe('2 min');
    expect(formatDuration(90 * 60_000)).toBe('90 min');
  });

  it('shows the reason for none, a loading word, and never NaN', () => {
    expect(formatEstimate({ kind: 'none', reason: 'No prior runs' })).toBe('No prior runs');
    expect(formatEstimate({ kind: 'loading' })).toBe('Estimating…');
    expect(formatEstimate({ kind: 'range', low: Number.NaN, high: 1, unit: 'usd' })).toBe('Unavailable');
    expect(formatEstimate({ kind: 'range', low: 0.3, high: 0.03, unit: 'usd' })).toBe('$0.03 – $0.30');
  });

  it('does not accept money as a string', () => {
    // @ts-expect-error — money only arrives as a number
    const bad: RunEstimate = { kind: 'range', low: '$0.03', high: 0.3, unit: 'usd' };
    // @ts-expect-error — there is no free-text estimate kind
    const text: RunEstimate = { kind: 'text', value: '$0.03' };
    expect(bad).toBeDefined();
    expect(text).toBeDefined();
  });
});

describe('confidence', () => {
  it.each([
    [0, 'none', 'No prior runs'],
    [2, 'low', 'Low confidence · Based on 2 runs'],
    [4, 'medium', 'Medium confidence · Based on 4 runs'],
    [8, 'high', 'High confidence · Based on 8 runs'],
  ])('n=%i → %s', (n, level, note) => {
    expect(confidenceOf(n)).toBe(level);
    expect(confidenceNote(n)).toBe(note);
  });

  it('says "run" for one', () => {
    expect(confidenceNote(1)).toBe('Low confidence · Based on 1 run');
  });
});

describe('EstimateRow', () => {
  it('renders the label and the formatted value', () => {
    render(<EstimateRow label="Estimated cost" estimate={{ kind: 'range', low: 0.03, high: 0.3, unit: 'usd' }} data-testid="row" />);
    expect(screen.getByTestId('row').textContent).toBe('Estimated cost$0.03 – $0.30');
  });
});

describe('RunDraftPanel', () => {
  it.each(Object.entries(RUN_DRAFT_STATUS_LABELS))('labels status %s as %s', (status, label) => {
    render(<RunDraftPanel status={status as RunDraftStatus} />);
    expect(screen.getByTestId('run-draft-status').textContent).toBe(label);
  });

  it('shows estimates and the confidence note', () => {
    render(
      <RunDraftPanel
        status="saved"
        cost={{ kind: 'range', low: 0.03, high: 0.3, unit: 'usd' }}
        duration={{ kind: 'range', low: 60_000, high: 360_000, unit: 'ms' }}
        confidence={{ sampleSize: 2 }}
      />,
    );
    expect(screen.getByTestId('run-draft-cost').textContent).toContain('$0.03 – $0.30');
    expect(screen.getByTestId('run-draft-duration').textContent).toContain('1 – 6 min');
    expect(screen.getByTestId('run-draft-confidence').textContent).toBe('Low confidence · Based on 2 runs');
  });

  it('never shows a range backed by zero runs', () => {
    render(
      <RunDraftPanel
        status="saved"
        cost={{ kind: 'range', low: 0.03, high: 0.3, unit: 'usd' }}
        confidence={{ sampleSize: 0 }}
      />,
    );
    expect(screen.getByTestId('run-draft-cost').textContent).toBe('Estimated costNo prior runs');
    expect(screen.queryByText(/\$/)).toBeNull();
  });

  it('shows a stated prior bracket with zero runs, marked low confidence', () => {
    render(
      <RunDraftPanel
        status="saved"
        cost={{ kind: 'range', low: 0.03, high: 0.3, unit: 'usd' }}
        confidence={{ sampleSize: 0, basis: 'prior' }}
      />,
    );
    expect(screen.getByTestId('run-draft-cost').textContent).toBe('Estimated cost$0.03 – $0.30');
    expect(screen.getByTestId('run-draft-confidence').textContent).toBe('Low confidence · No prior runs');
  });

  it('a prior basis with real runs reads like measured history', () => {
    render(<RunDraftPanel status="saved" cost={{ kind: 'range', low: 0.03, high: 0.3, unit: 'usd' }} confidence={{ sampleSize: 4, basis: 'prior' }} />);
    expect(screen.getByTestId('run-draft-confidence').textContent).toBe('Medium confidence · Based on 4 runs');
  });

  it('a usd budget edits dollars, clears to null, and shows the host hint', () => {
    const onChange = vi.fn();
    render(<RunDraftPanel status="saved" budget={{ unit: 'usd', usd: 0.3, onChange, hint: 'Not started if forecast above this' }} />);
    const input = screen.getByLabelText('Run budget');
    expect((input as HTMLInputElement).value).toBe('0.3');
    fireEvent.change(input, { target: { value: '1.25' } });
    expect(onChange).toHaveBeenLastCalledWith(1.25);
    fireEvent.change(input, { target: { value: '' } });
    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(screen.getByTestId('run-draft-budget-note').textContent).toBe('Not started if forecast above this');
  });

  it('renders no estimate rows when none are passed', () => {
    render(<RunDraftPanel status="no-draft" />);
    expect(screen.queryByTestId('run-draft-cost')).toBeNull();
    expect(screen.queryByTestId('run-draft-confidence')).toBeNull();
  });

  it('shows the derived dollars line only when a price is known', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <RunDraftPanel status="saved" budget={{ tokens: 300_000, onChange, usdPerMillionTokens: 1, priceLabel: 'Haiku' }} />,
    );
    expect(screen.getByTestId('run-draft-budget-note').textContent).toBe('≈ $0.30 at Haiku prices');
    rerender(<RunDraftPanel status="saved" budget={{ tokens: 300_000, onChange, usdPerMillionTokens: null, priceLabel: 'Haiku' }} />);
    expect(screen.queryByTestId('run-draft-budget-note')).toBeNull();
    rerender(<RunDraftPanel status="saved" budget={{ tokens: 300_000, onChange }} />);
    expect(screen.queryByTestId('run-draft-budget-note')).toBeNull();
  });

  it('reports budget edits as tokens, and clearing as null', () => {
    const onChange = vi.fn();
    render(<RunDraftPanel status="saved" budget={{ tokens: 1000, onChange }} />);
    const input = screen.getByLabelText('Run budget');
    fireEvent.change(input, { target: { value: '5000' } });
    expect(onChange).toHaveBeenLastCalledWith(5000);
    fireEvent.change(input, { target: { value: '' } });
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('fires select changes and disables a field with its reason', () => {
    const onAgent = vi.fn();
    render(
      <RunDraftPanel
        status="unsaved"
        fields={[
          { id: 'agent', label: 'Agent', value: 'impl', options: [{ value: 'impl', label: 'Implementation agent' }, { value: 'rev', label: 'Reviewer' }], onChange: onAgent },
          { id: 'model', label: 'Model', value: 'haiku', options: [{ value: 'haiku', label: 'Haiku' }], onChange: vi.fn(), disabledReason: 'This pipeline sets its own model' },
        ]}
      />,
    );
    fireEvent.change(screen.getByLabelText('Agent'), { target: { value: 'rev' } });
    expect(onAgent).toHaveBeenCalledWith('rev');
    const model = screen.getByLabelText('Model');
    expect(model).toBeDisabled();
    expect(model).toHaveAccessibleDescription('This pipeline sets its own model');
  });

  it('a disabled Dispatch shows its reason and does not fire', () => {
    const onDispatch = vi.fn();
    render(<RunDraftPanel status="unsaved" onSave={vi.fn()} onDispatch={onDispatch} dispatchDisabledReason="Save the draft first" />);
    const btn = screen.getByRole('button', { name: 'Dispatch agent' });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAccessibleDescription('Save the draft first');
    expect(screen.getByTestId('run-draft-dispatch-reason').textContent).toBe('Save the draft first');
    fireEvent.click(btn);
    expect(onDispatch).not.toHaveBeenCalled();
  });

  it('an enabled Dispatch fires; dispatching shows busy', () => {
    const onDispatch = vi.fn();
    const { rerender } = render(<RunDraftPanel status="saved" onDispatch={onDispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Dispatch agent' }));
    expect(onDispatch).toHaveBeenCalledTimes(1);
    rerender(<RunDraftPanel status="dispatching" onDispatch={onDispatch} />);
    const busy = screen.getByTestId('run-draft-dispatch');
    expect(busy).toBeDisabled();
    expect(busy).toHaveAttribute('aria-busy', 'true');
    expect(busy.textContent).toBe('Dispatching…');
  });

  it('collapsed hides the body and the chevron toggles it', () => {
    const onCollapsedChange = vi.fn();
    render(<RunDraftPanel status="saved" onSave={vi.fn()} onCollapsedChange={onCollapsedChange} />);
    const toggle = screen.getByRole('button', { name: 'Collapse run draft' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(toggle);
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    expect(screen.queryByTestId('run-draft-body')).toBeNull();
    expect(screen.getByRole('button', { name: 'Expand run draft' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('respects a controlled collapsed prop', () => {
    render(<RunDraftPanel status="saved" collapsed onSave={vi.fn()} />);
    expect(screen.queryByTestId('run-draft-body')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Save draft' })).toBeNull();
    expect(screen.getByText('Run draft')).toBeInTheDocument();
  });

  it('the live slot replaces the form', () => {
    render(
      <RunDraftPanel
        status="running"
        target={{ title: 'Migration plan' }}
        onSave={vi.fn()}
        onDispatch={vi.fn()}
        live={<div>live run card</div>}
      />,
    );
    expect(within(screen.getByTestId('run-draft-live')).getByText('live run card')).toBeInTheDocument();
    expect(screen.queryByTestId('run-draft-target')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Dispatch agent' })).toBeNull();
  });

  it('shows the error text verbatim', () => {
    const msg = '403 Forbidden: you need edit access to dispatch on doc-42';
    render(<RunDraftPanel status="failed" error={msg} />);
    expect(screen.getByTestId('run-draft-error').textContent).toContain(msg);
  });

  it('prompts when no workflow is chosen, and shows the default footnote', () => {
    render(<RunDraftPanel status="no-draft" target={null} />);
    expect(screen.getByTestId('run-draft-no-target').textContent).toBe('No workflow chosen');
    expect(screen.getByTestId('run-draft-footnote').textContent).toBe('Nothing runs until you authorize it.');
  });
});

describe('AccessNotice', () => {
  it('is a note with a title, body and an action that fires', () => {
    const onClick = vi.fn();
    render(
      <AccessNotice
        title="Edit access required"
        body="You can view this item but not dispatch work on it."
        action={{ label: 'Request access', onClick }}
      />,
    );
    const note = screen.getByRole('note', { name: 'Edit access required' });
    expect(note.textContent).toContain('You can view this item but not dispatch work on it.');
    fireEvent.click(screen.getByRole('button', { name: 'Request access' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a link for an href action and nothing without an action', () => {
    const { rerender } = render(<AccessNotice title="Edit access required" action={{ label: 'Request access', href: '/share' }} />);
    expect(screen.getByRole('link', { name: 'Request access' })).toHaveAttribute('href', '/share');
    rerender(<AccessNotice title="Edit access required" />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
  });
});

describe('RunDraftPanel sources', () => {
  const sources = [
    { id: 'a', title: 'Release plan', mark: <span data-testid="mark-a" />, onOpen: vi.fn() },
    { id: 'b', title: 'Notes' },
    { id: 'c', title: 'Restricted item', restricted: true, onOpen: vi.fn() },
  ];

  it('renders a labelled chip per source under the target', () => {
    render(<RunDraftPanel status="saved" target={{ title: 'Deck' }} sources={sources} />);
    const section = screen.getByTestId('run-draft-sources');
    expect(within(section).getByText('Sources · 3')).toBeTruthy();
    expect(within(section).getAllByTestId('run-draft-source')).toHaveLength(3);
    expect(within(section).getAllByTestId('run-draft-source')[0].getAttribute('title')).toBe('Release plan');
  });

  it('a restricted chip is not a button and carries data-restricted', () => {
    render(<RunDraftPanel status="saved" sources={sources} />);
    const chips = screen.getAllByTestId('run-draft-source');
    expect(chips[2].hasAttribute('data-restricted')).toBe(true);
    expect(chips[2].tagName).not.toBe('BUTTON');
    expect(chips[1].tagName).not.toBe('BUTTON');
    expect(screen.queryByRole('button', { name: 'Restricted item' })).toBeNull();
  });

  it('an openable source is a named button that fires onOpen', () => {
    render(<RunDraftPanel status="saved" sources={sources} />);
    fireEvent.click(screen.getByRole('button', { name: 'Release plan' }));
    expect(sources[0].onOpen).toHaveBeenCalledTimes(1);
    expect(sources[2].onOpen).not.toHaveBeenCalled();
  });

  it('stays visible when the live card replaces the form, with a custom label', () => {
    render(<RunDraftPanel status="running" sources={sources} sourcesLabel="Reads" live={<div>live card</div>} />);
    expect(screen.getByTestId('run-draft-live')).toBeTruthy();
    expect(screen.getByText('Reads · 3')).toBeTruthy();
    expect(screen.getAllByTestId('run-draft-source')).toHaveLength(3);
  });

  it('renders nothing for empty, null or omitted sources', () => {
    const { rerender } = render(<RunDraftPanel status="saved" sources={[]} />);
    expect(screen.queryByTestId('run-draft-sources')).toBeNull();
    rerender(<RunDraftPanel status="saved" sources={null} />);
    expect(screen.queryByTestId('run-draft-sources')).toBeNull();
    rerender(<RunDraftPanel status="saved" />);
    expect(screen.queryByTestId('run-draft-sources')).toBeNull();
  });
});
