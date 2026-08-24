// src/lib/__tests__/rovingFocus.test.tsx
//
// A role like `tab` or `radio` PROMISES arrow-key navigation and a single Tab
// stop. Several hand-rolled bars in this library set the role and stopped
// there — this is the shared implementation they now share.

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { handleRovingKeyDown } from '../rovingFocus';

function TabBar({ active = 'one' }: { active?: string }) {
  const ids = ['one', 'two', 'three'];
  return (
    <div role="tablist" aria-label="Sections" onKeyDown={handleRovingKeyDown}>
      {ids.map((id) => (
        <button key={id} type="button" role="tab" aria-selected={id === active} tabIndex={id === active ? 0 : -1}>
          {id}
        </button>
      ))}
    </div>
  );
}

function tab(name: string) {
  return screen.getByRole('tab', { name });
}

describe('handleRovingKeyDown', () => {
  it('moves focus right and wraps at the end', () => {
    render(<TabBar />);
    const list = screen.getByRole('tablist');

    tab('one').focus();
    fireEvent.keyDown(list, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tab('two'));

    fireEvent.keyDown(list, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tab('three'));

    fireEvent.keyDown(list, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tab('one'));
  });

  it('moves focus left and wraps at the start', () => {
    render(<TabBar />);
    const list = screen.getByRole('tablist');

    tab('one').focus();
    fireEvent.keyDown(list, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(tab('three'));
  });

  it('honours Home and End', () => {
    render(<TabBar />);
    const list = screen.getByRole('tablist');

    tab('two').focus();
    fireEvent.keyDown(list, { key: 'End' });
    expect(document.activeElement).toBe(tab('three'));

    fireEvent.keyDown(list, { key: 'Home' });
    expect(document.activeElement).toBe(tab('one'));
  });

  it('leaves unrelated keys alone', () => {
    render(<TabBar />);
    const list = screen.getByRole('tablist');
    tab('one').focus();
    fireEvent.keyDown(list, { key: 'a' });
    expect(document.activeElement).toBe(tab('one'));
  });

  it('ignores vertical arrows for a horizontal widget', () => {
    render(<TabBar />);
    const list = screen.getByRole('tablist');
    tab('one').focus();
    fireEvent.keyDown(list, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(tab('one'));
  });

  it('skips disabled items', () => {
    render(
      <div role="tablist" onKeyDown={handleRovingKeyDown}>
        <button type="button" role="tab">a</button>
        <button type="button" role="tab" disabled>b</button>
        <button type="button" role="tab">c</button>
      </div>,
    );
    tab('a').focus();
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tab('c'));
  });

  it('accepts a custom item selector and orientation', () => {
    render(
      <div
        role="radiogroup"
        onKeyDown={(e) =>
          handleRovingKeyDown(e, { itemSelector: '[role="radio"]', orientation: 'both' })
        }
      >
        <button type="button" role="radio" aria-checked>x</button>
        <button type="button" role="radio" aria-checked={false}>y</button>
      </div>,
    );
    screen.getByRole('radio', { name: 'x' }).focus();
    fireEvent.keyDown(screen.getByRole('radiogroup'), { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'y' }));
  });
});
