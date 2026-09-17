// One tab stop for a group of controls.
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RovingToolbar } from '../RovingToolbar';

afterEach(cleanup);

const Bar = ({ n = 4, disabledAt = -1 }: { n?: number; disabledAt?: number }) => (
  <RovingToolbar label="Formatting">
    {Array.from({ length: n }, (_, i) => (
      <button key={i} type="button" aria-label={`b${i}`} disabled={i === disabledAt}>{i}</button>
    ))}
  </RovingToolbar>
);

const btns = () => screen.getAllByRole('button').filter((b) => !(b as HTMLButtonElement).disabled);

describe('RovingToolbar', () => {
  it('is a labelled toolbar', () => {
    render(<Bar />);
    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-label', 'Formatting');
  });

  it('leaves exactly one control in the tab order', () => {
    render(<Bar n={6} />);
    expect(btns().filter((b) => b.tabIndex === 0)).toHaveLength(1);
    expect(btns()[0]!.tabIndex).toBe(0);
  });

  it('moves with the arrow keys and carries the tab stop along', () => {
    render(<Bar />);
    btns()[0]!.focus();
    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowRight' });
    expect(btns()[1]).toHaveFocus();
    expect(btns()[1]!.tabIndex).toBe(0);
    expect(btns()[0]!.tabIndex).toBe(-1);
  });

  it('wraps at both ends', () => {
    render(<Bar />);
    btns()[0]!.focus();
    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowLeft' });
    expect(btns()[3]).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowRight' });
    expect(btns()[0]).toHaveFocus();
  });

  it('advances once per press when the key is held', () => {
    // Three keydowns in ONE tick. The index is read from the focused element,
    // not from state, so a held key cannot outrun a re-render.
    render(<Bar n={5} />);
    btns()[0]!.focus();
    const bar = screen.getByRole('toolbar');
    fireEvent.keyDown(bar, { key: 'ArrowRight' });
    fireEvent.keyDown(bar, { key: 'ArrowRight' });
    fireEvent.keyDown(bar, { key: 'ArrowRight' });
    expect(btns()[3]).toHaveFocus();
  });

  it('skips a disabled control entirely', () => {
    render(<Bar n={4} disabledAt={1} />);
    btns()[0]!.focus();
    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowRight' });
    expect(screen.getByLabelText('b2')).toHaveFocus();
  });

  it('keeps a tab stop when controls disappear', () => {
    const { rerender } = render(<Bar n={5} />);
    fireEvent.focus(btns()[4]!);
    rerender(<Bar n={2} />);
    expect(btns().filter((b) => b.tabIndex === 0)).toHaveLength(1);
  });

  it('ignores the cross-axis keys so the page still scrolls', () => {
    render(<Bar />);
    btns()[0]!.focus();
    expect(fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowDown' })).toBe(true);
    expect(btns()[0]).toHaveFocus();
  });

  it('swaps the axis when vertical', () => {
    render(
      <RovingToolbar label="Side" orientation="vertical">
        <button type="button" aria-label="v0">0</button>
        <button type="button" aria-label="v1">1</button>
      </RovingToolbar>,
    );
    const bar = screen.getByRole('toolbar');
    expect(bar).toHaveAttribute('aria-orientation', 'vertical');
    screen.getByLabelText('v0').focus();
    fireEvent.keyDown(bar, { key: 'ArrowDown' });
    expect(screen.getByLabelText('v1')).toHaveFocus();
    // Horizontal keys are inert here.
    expect(fireEvent.keyDown(bar, { key: 'ArrowRight' })).toBe(true);
  });

  it('leaves controls outside the group as their own tab stops', () => {
    // The composer's Send button: a primary action, not a formatting control.
    render(
      <div>
        <RovingToolbar label="Formatting">
          <button type="button" aria-label="bold">B</button>
          <button type="button" aria-label="italic">I</button>
        </RovingToolbar>
        <button type="button" aria-label="Send">Send</button>
      </div>,
    );
    expect(screen.getByLabelText('Send').tabIndex).toBe(0);
    expect(screen.getByLabelText('italic').tabIndex).toBe(-1);
  });
});
