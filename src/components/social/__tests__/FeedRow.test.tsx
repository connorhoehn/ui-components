// FeedRow — the shared row behind the channel panels and the app's Activity
// feed. The tests that matter here are the ones about SHAPE: a row that can be
// made three lines tall, or that hides an indicator inside its own link, is
// broken in a way no caller can fix from outside.

import type { ComponentProps } from 'react';
import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FeedRow } from '../FeedRow';

afterEach(cleanup);

const row = (over: Partial<ComponentProps<typeof FeedRow>> = {}) =>
  render(
    <ul>
      <FeedRow
        data-testid="row"
        leading={<span data-testid="leading" aria-hidden />}
        title="the upload path is live on my branch"
        meta="Hank Anderson · 180 KB"
        {...over}
      />
    </ul>,
  );

/** The two text lines, in order. */
const linesOf = (el: HTMLElement) => Array.from(el.querySelectorAll('[data-line]'));

describe('FeedRow', () => {
  it('is two lines and cannot be made into three, whatever it is handed', () => {
    const long = 'x'.repeat(400);
    row({ title: long, meta: long, timestamp: '14:03', actions: <button type="button">Approve</button> });

    const el = screen.getByTestId('row');
    const lines = linesOf(el);
    expect(lines).toHaveLength(2);
    for (const line of lines) {
      // jsdom computes no layout, so the declaration IS the observable
      // contract: drop `truncate` (white-space:nowrap + ellipsis) and a
      // 400-character title wraps to a third, fourth, fifth line.
      expect(line.className).toContain('truncate');
      expect(line.className).toContain('min-w-0');
      // Truncation hides text; it must not lose it.
      expect(line).toHaveAttribute('title', line.textContent);
    }

    // Everything the row says lives in those two lines, the stamp and the
    // controls. Stray text anywhere else is a line nobody clamped.
    const spoken = [
      ...lines.map((l) => l.textContent ?? ''),
      '14:03',
      ...Array.from(el.querySelectorAll('button')).map((b) => b.textContent ?? ''),
    ];
    const leftOver = spoken.reduce((text, part) => (part ? text.replace(part, '') : text), el.textContent ?? '');
    expect(leftOver).toBe('');
  });

  it('puts the stamp on the title line, not in the meta run', () => {
    row({ timestamp: '14:03', timestampIso: '2026-09-05T14:03:00.000Z', timestampTitle: 'Saturday, 5 September 2026 at 14:03' });
    const stamp = screen.getByTestId('row').querySelector('time')!;
    expect(stamp).toHaveTextContent('14:03');
    // Machine-readable, and the full instant one hover away — the visible
    // stamp is an abbreviation and must not be the only copy.
    expect(stamp).toHaveAttribute('datetime', '2026-09-05T14:03:00.000Z');
    expect(stamp).toHaveAttribute('title', 'Saturday, 5 September 2026 at 14:03');
    // Line one, beside the title; line two says nothing about the time.
    expect(linesOf(screen.getByTestId('row'))[0].parentElement).toContainElement(stamp);
    expect(screen.getByText('Hank Anderson · 180 KB')).not.toContainElement(stamp);
  });

  it('renders a stamp with no ISO behind it as plain text rather than a lying <time>', () => {
    row({ timestamp: 'Yesterday' });
    const el = screen.getByTestId('row');
    expect(el.querySelector('time')).toBeNull();
    expect(el).toHaveTextContent('Yesterday');
  });

  it('draws no stamp at all when there is none to draw', () => {
    row();
    expect(screen.getByTestId('row').querySelector('time')).toBeNull();
  });

  it('jumps, and names where it goes', () => {
    const onJump = vi.fn();
    row({ onJump, jumpLabel: 'Go to the pinned message from Hank Anderson' });
    const jump = screen.getByTestId('row-jump');
    expect(jump).toHaveAccessibleName('Go to the pinned message from Hank Anderson');
    fireEvent.click(jump);
    expect(onJump).toHaveBeenCalledTimes(1);
  });

  // A pinned message you cannot get back to is a screenshot — but a row whose
  // original is genuinely gone must be a record, not a dead button.
  it('is a record rather than a dead button when the original is out of reach', () => {
    row();
    expect(screen.queryByTestId('row-jump')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByTestId('row')).toHaveTextContent('the upload path is live');
  });

  // The whole reason `leading` is a slot on the row and not part of the body:
  // a link's accessible name REPLACES its contents, so an indicator nested in
  // the jump is an indicator nobody hears.
  it('keeps the leading visual outside the jump, where its label survives', () => {
    row({ onJump: vi.fn(), jumpLabel: 'Open it', leading: <span role="img" aria-label="Failed" /> });
    const jump = screen.getByTestId('row-jump');
    expect(within(jump).queryByRole('img')).toBeNull();
    expect(within(screen.getByTestId('row')).getByRole('img')).toHaveAccessibleName('Failed');
  });

  it('marks an unread row both for the eye and for a selector', () => {
    const { rerender } = row({ unread: true });
    expect(screen.getByTestId('row')).toHaveAttribute('data-unread', 'true');
    expect(screen.getByLabelText('Unread')).toBeInTheDocument();

    // State as an attribute, not as part of the testid: the row a person has
    // just read must stay findable by the same selector.
    rerender(
      <ul>
        <FeedRow data-testid="row" leading={null} title="t" meta="m" unread={false} />
      </ul>,
    );
    expect(screen.getByTestId('row')).not.toHaveAttribute('data-unread');
    expect(screen.queryByLabelText('Unread')).toBeNull();
  });

  it('puts trailing controls beside the text, never under it', () => {
    row({ actions: <button type="button" data-testid="unpin">Unpin</button>, onJump: vi.fn() });
    const el = screen.getByTestId('row');
    // Still two lines with a control present — the control took width from the
    // title, which is the trade the two-line contract makes.
    expect(linesOf(el)).toHaveLength(2);
    // And it is a sibling of the jump, not inside it: clicking Unpin must not
    // also navigate.
    expect(within(screen.getByTestId('row-jump')).queryByTestId('unpin')).toBeNull();
    expect(screen.getByTestId('unpin')).toBeInTheDocument();
  });

  it('colours line two when it carries a failure rather than context', () => {
    const { rerender } = row({ meta: 'TypeError: cannot read properties of undefined', metaTone: 'danger' });
    expect(linesOf(screen.getByTestId('row'))[1].className).toContain('danger');
    rerender(
      <ul>
        <FeedRow data-testid="row" leading={null} title="t" meta="Hank Anderson · 180 KB" />
      </ul>,
    );
    expect(linesOf(screen.getByTestId('row'))[1].className).not.toContain('danger');
  });

  // Hosts hang their own state off the row — `data-kind`, `data-outcome`,
  // `data-waiting`. Swallowing them would force the host to wrap the row in a
  // div it does not want.
  it('passes the host\u2019s own attributes through to the row element', () => {
    render(
      <ul>
        <FeedRow data-testid="row" data-outcome="failed" aria-current="true" leading={null} title="t" meta="m" />
      </ul>,
    );
    expect(screen.getByTestId('row')).toHaveAttribute('data-outcome', 'failed');
    expect(screen.getByTestId('row')).toHaveAttribute('aria-current', 'true');
  });
});
