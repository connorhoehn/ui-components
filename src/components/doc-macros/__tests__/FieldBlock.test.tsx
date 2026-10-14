// What the field line must show, and the three things it must not do.
//
//   * It must not render "not set" as a zero, a No, or an empty date.
//   * It must not hide a value it cannot parse — a `<input type="date">`
//     handed "next tuesday" draws EMPTY, which looks to the author like the
//     page ate their answer.
//   * It must not become a card. `!editable` collapses to text, because a row
//     of form controls in print or review is noise.

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldBlock } from '../FieldBlock';
import { readTypedField } from '../fieldText';
import { chooseOption } from '../../../test-utils/selectListbox';

const field = (body: string) => readTypedField(body)!;

const DATE = field(['label: Target date', 'type: date', "value: '2026-11-01'"].join('\n'));
const EMPTY_NUMBER = field('label: Velocity\ntype: number');
const EMPTY_BOOL = field('label: Approved\ntype: boolean');
const BAD_DATE = field('label: Target date\ntype: date\nvalue: next tuesday');

describe('reading', () => {
    it('is one line — a name and its value, no card', () => {
        const { container } = render(<FieldBlock field={DATE} />);
        expect(screen.getByTestId('field-block-label').textContent).toBe('Target date');
        expect(screen.getByTestId('field-block-value').textContent).toMatch(/Nov 1, 2026/);
        expect(screen.getByTestId('field-block').getAttribute('data-field-type')).toBe('date');
        expect(screen.getByTestId('field-block').getAttribute('data-field-state')).toBe('set');
        // No form controls at all when the page is not editable — this is a
        // different rendering, not a disabled one.
        expect(container.querySelector('input')).toBeNull();
        expect(container.querySelector('select')).toBeNull();
    });

    it('says "Not set" rather than a confident, wrong zero', () => {
        render(<FieldBlock field={EMPTY_NUMBER} />);
        expect(screen.getByTestId('field-block-empty').textContent).toBe('Not set');
        expect(screen.queryByTestId('field-block-value')).toBeNull();
        expect(screen.getByTestId('field-block').getAttribute('data-field-state')).toBe('empty');
    });

    it('never renders an unanswered boolean as "No"', () => {
        render(<FieldBlock field={EMPTY_BOOL} />);
        expect(screen.queryByText('No')).toBeNull();
        expect(screen.getByTestId('field-block-empty')).toBeTruthy();
    });

    it('shows an unparseable value AS WRITTEN, with a chip saying what is wrong', () => {
        render(<FieldBlock field={BAD_DATE} />);
        expect(screen.getByTestId('field-block-value').textContent).toBe('next tuesday');
        expect(screen.getByTestId('field-block-invalid').textContent).toBe('not a date');
        expect(screen.getByTestId('field-block').getAttribute('data-field-state')).toBe('invalid');
    });
});

describe('editing', () => {
    it('offers the typed control for the declared type', async () => {
        render(<FieldBlock field={DATE} editable />);
        // A text field that expects YYYY-MM-DD — the browser's own date widget
        // is a different control in every browser and never took the document's type.
        expect(screen.getByTestId('field-block-date-input').getAttribute('type')).toBe('text');
        expect(screen.getByTestId('field-block-date-input').getAttribute('placeholder')).toBe('YYYY-MM-DD');
        expect(screen.getByTestId('field-block-formatted').textContent).toMatch(/Nov 1, 2026/);
    });

    it('shows an unanswered boolean as MIXED, not unchecked', async () => {
        render(<FieldBlock field={EMPTY_BOOL} editable />);
        const box = screen.getByTestId('field-block-checkbox') as HTMLInputElement;
        expect(box.getAttribute('aria-checked')).toBe('mixed');
        expect(box.checked).toBe(false);
        expect(screen.getByText('Not set')).toBeTruthy();
    });

    it('commits a text value on blur, as one call carrying one string', async () => {
        const onValueChange = vi.fn();
        render(
            <FieldBlock
                field={field('label: Owner\ntype: text')}
                editable
                onValueChange={onValueChange}
            />,
        );
        const input = screen.getByTestId('field-block-input');
        await userEvent.type(input, 'Ada');
        // Nothing yet: a transaction per keystroke would replace the whole
        // scalar four times and make one word a four-way merge.
        expect(onValueChange).not.toHaveBeenCalled();
        await userEvent.tab();
        expect(onValueChange).toHaveBeenCalledExactlyOnceWith('Ada');
    });

    it('emptying the control means UNANSWERED, not an empty answer', async () => {
        const onValueChange = vi.fn();
        render(
            <FieldBlock
                field={field('label: Owner\ntype: text\nvalue: Ada')}
                editable
                onValueChange={onValueChange}
            />,
        );
        await userEvent.clear(screen.getByTestId('field-block-input'));
        await userEvent.tab();
        expect(onValueChange).toHaveBeenCalledExactlyOnceWith(undefined);
    });

    it('abandons the draft on Escape', async () => {
        const onValueChange = vi.fn();
        render(
            <FieldBlock
                field={field('label: Owner\ntype: text\nvalue: Ada')}
                editable
                onValueChange={onValueChange}
            />,
        );
        const input = screen.getByTestId('field-block-input') as HTMLInputElement;
        await userEvent.type(input, 'x{Escape}');
        expect(onValueChange).not.toHaveBeenCalled();
        expect(input.value).toBe('Ada');
    });

    it('offers a plain text box for a value the typed control cannot show', async () => {
        // The load-bearing one. `<input type="date" value="next tuesday">`
        // renders empty, so without this the author's words vanish from the
        // screen while still sitting in the document.
        render(<FieldBlock field={BAD_DATE} editable />);
        const raw = screen.getByTestId('field-block-raw-input') as HTMLInputElement;
        expect(raw.value).toBe('next tuesday');
        expect(raw.getAttribute('aria-invalid')).toBe('true');
        expect(screen.queryByTestId('field-block-date-input')).toBeNull();
        expect(screen.getByTestId('field-block-invalid').textContent).toBe('not a date');
    });

    it('keeps the type picker on every row, including a flagged one', async () => {
        // Changing the type is the SECOND repair for a flagged value — "this
        // was never a date, it is text" — and a field whose type cannot be
        // changed is one you have to delete and recreate.
        const onTypeChange = vi.fn();
        render(<FieldBlock field={BAD_DATE} editable onTypeChange={onTypeChange} />);
        chooseOption(screen.getByTestId('field-block-type'), 'text');
        expect(onTypeChange).toHaveBeenCalledExactlyOnceWith('text');
    });

    it('offers Clear only when there is something to clear', async () => {
        const onValueChange = vi.fn();
        const { rerender } = render(<FieldBlock field={EMPTY_NUMBER} editable />);
        expect(screen.queryByTestId('field-block-clear')).toBeNull();
        rerender(<FieldBlock field={DATE} editable onValueChange={onValueChange} />);
        await userEvent.click(screen.getByTestId('field-block-clear'));
        expect(onValueChange).toHaveBeenCalledExactlyOnceWith(undefined);
    });

    it('renames on blur, and refuses to unname the field', async () => {
        const onLabelChange = vi.fn();
        render(<FieldBlock field={DATE} editable onLabelChange={onLabelChange} />);
        const label = screen.getByTestId('field-block-label-input');
        await userEvent.clear(label);
        await userEvent.tab();
        expect(onLabelChange).not.toHaveBeenCalled();
        expect((label as HTMLInputElement).value).toBe('Target date');

        await userEvent.clear(label);
        await userEvent.type(label, 'Ship date');
        await userEvent.tab();
        expect(onLabelChange).toHaveBeenCalledExactlyOnceWith('Ship date');
    });
});
