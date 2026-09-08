// What the decision card must show, and the one distinction it must not blur.

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DecisionBlock } from '../DecisionBlock';
import { readDecision } from '../decisionText';

const base = readDecision([
    'decidedBy: Hank Anderson',
    'decision: Use one room primitive',
    'rationale: Two permission models drifted',
    'status: accepted',
    'alternatives:',
    '  - Keep rooms and DMs separate',
].join('\n'))!;

describe('DecisionBlock', () => {
    it('answers "is this in force?" without making the reader infer it', () => {
        render(<DecisionBlock decision={base} />);
        expect(screen.getByTestId('decision-block-status').textContent).toBe('Accepted');
        expect(screen.getByText('In force')).toBeTruthy();
        expect(screen.getByTestId('decision-block').getAttribute('data-status')).toBe('accepted');
    });

    it('shows the rationale and the alternatives that make it checkable', () => {
        render(<DecisionBlock decision={base} />);
        expect(screen.getByText('Two permission models drifted')).toBeTruthy();
        expect(screen.getByText('Keep rooms and DMs separate')).toBeTruthy();
        expect(screen.getByText('Hank Anderson')).toBeTruthy();
    });

    it('does NOT strike through a superseded decision', () => {
        // The load-bearing distinction. A superseded decision WAS in force, and
        // everything built while it held still makes sense against it, so its
        // text stays full contrast — only the status is marked historical.
        // Rejected is the one that recedes.
        const { container } = render(
            <DecisionBlock decision={{ ...base, status: 'superseded' }} />,
        );
        expect(container.querySelector('.line-through')).toBeNull();
        expect(screen.getByTestId('decision-block-status').textContent).toBe('Superseded');
        expect(screen.getByText('Was in force, replaced')).toBeTruthy();
    });

    it('does strike through a rejected one', () => {
        const { container } = render(
            <DecisionBlock decision={{ ...base, status: 'rejected' }} />,
        );
        expect(container.querySelector('.line-through')).not.toBeNull();
        expect(screen.getByText('Never adopted')).toBeTruthy();
    });

    it('names the successor when it has one', () => {
        render(<DecisionBlock decision={{ ...base, status: 'superseded', supersededBy: 'adr-021' }} />);
        expect(screen.getByTestId('decision-block-superseded-by').textContent)
            .toContain('adr-021');
    });

    it('asks for the successor only when superseded, editable, and unknown', () => {
        const { rerender } = render(
            <DecisionBlock decision={base} editable onSupersededBy={vi.fn()} />,
        );
        expect(screen.queryByTestId('decision-block-superseded-input')).toBeNull();

        rerender(
            <DecisionBlock
                decision={{ ...base, status: 'superseded' }}
                editable
                onSupersededBy={vi.fn()}
            />,
        );
        expect(screen.getByTestId('decision-block-superseded-input')).toBeTruthy();

        rerender(
            <DecisionBlock
                decision={{ ...base, status: 'superseded', supersededBy: 'adr-021' }}
                editable
                onSupersededBy={vi.fn()}
            />,
        );
        expect(screen.queryByTestId('decision-block-superseded-input')).toBeNull();
    });

    it('offers every status but the current one, which is pressed and inert', async () => {
        const onStatusChange = vi.fn();
        render(<DecisionBlock decision={base} editable onStatusChange={onStatusChange} />);

        const current = screen.getByTestId('decision-block-set-accepted');
        expect(current.getAttribute('aria-pressed')).toBe('true');
        expect((current as HTMLButtonElement).disabled).toBe(true);

        await userEvent.click(screen.getByTestId('decision-block-set-superseded'));
        expect(onStatusChange).toHaveBeenCalledWith('superseded');
    });

    it('offers no controls at all when the page is not editable', () => {
        // Read mode and print. A control that cannot act is worse than none.
        render(<DecisionBlock decision={base} onStatusChange={vi.fn()} onRemove={vi.fn()} />);
        expect(screen.queryByTestId('decision-block-set-proposed')).toBeNull();
        expect(screen.queryByLabelText('Remove this decision')).toBeNull();
        // The record itself still reads.
        expect(screen.getByTestId('decision-block-claim').textContent).toBe('Use one room primitive');
    });

    it('renders a bare decision with nothing else on it', () => {
        const bare = readDecision('decision: Ship it')!;
        render(<DecisionBlock decision={bare} />);
        expect(screen.getByTestId('decision-block-status').textContent).toBe('Proposed');
        expect(screen.getByText('Not decided yet')).toBeTruthy();
    });
});
