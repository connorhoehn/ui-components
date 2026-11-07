import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchInput } from '../SearchInput';

function Harness({ initial = '', onExpandedChange }: { initial?: string; onExpandedChange?: (open: boolean) => void }) {
  const [value, setValue] = useState(initial);
  return <><SearchInput collapsible value={value} onChange={setValue} aria-label="Search artworks" onExpandedChange={onExpandedChange} /><button type="button">elsewhere</button></>;
}

describe('SearchInput collapsible (2.504.0)', () => {
  it('rests as a named search icon button with no field', () => {
    render(<Harness />);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    const toggle = screen.getByRole('button', { name: 'Search artworks' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-keyshortcuts', '/');
  });

  it('expands into a focused field on click and reports it', () => {
    const changed = vi.fn();
    render(<Harness onExpandedChange={changed} />);
    fireEvent.click(screen.getByRole('button', { name: 'Search artworks' }));
    expect(screen.getByRole('textbox', { name: 'Search artworks' })).toHaveFocus();
    expect(changed).toHaveBeenCalledWith(true);
  });

  it('expands on / pressed outside a text field, but not while typing in one', () => {
    render(<><Harness /><input aria-label="Other field" /></>);
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Other field' }), { key: '/' });
    expect(screen.queryByRole('textbox', { name: 'Search artworks' })).not.toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: '/' });
    expect(screen.getByRole('textbox', { name: 'Search artworks' })).toHaveFocus();
  });

  it('collapses on Escape while empty and returns focus to the icon', () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: 'Search artworks' }));
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search artworks' })).toHaveFocus();
  });

  it('collapses on blur while empty', () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: 'Search artworks' }));
    fireEvent.blur(screen.getByRole('textbox'), { relatedTarget: screen.getByRole('button', { name: 'elsewhere' }) });
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('stays expanded while it holds a value — on blur, on Escape, and when mounted with one', () => {
    render(<Harness initial="moon" />);
    const field = screen.getByRole('textbox', { name: 'Search artworks' });
    fireEvent.blur(field, { relatedTarget: screen.getByRole('button', { name: 'elsewhere' }) });
    fireEvent.keyDown(field, { key: 'Escape' });
    expect(screen.getByRole('textbox')).toHaveValue('moon');
  });

  it('keeps the field when focus moves to its own clear button, then clears back into the field', () => {
    render(<Harness initial="moon" />);
    const clear = screen.getByRole('button', { name: 'Clear search' });
    fireEvent.blur(screen.getByRole('textbox'), { relatedTarget: clear });
    fireEvent.click(clear);
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('honours shortcut={false}', () => {
    render(<SearchInput collapsible shortcut={false} value="" onChange={() => {}} aria-label="Search" />);
    fireEvent.keyDown(document.body, { key: '/' });
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).not.toHaveAttribute('aria-keyshortcuts');
  });

  it('keeps the folded icon square: the field width class applies only when open', () => {
    render(<SearchInput collapsible value="" onChange={() => {}} aria-label="Search" className="w-56" />);
    expect(screen.getByRole('button', { name: 'Search' })).not.toHaveClass('w-56');
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByRole('textbox').parentElement).toHaveClass('w-56');
  });

  it('is an always-open field without `collapsible`', () => {
    render(<SearchInput value="" onChange={() => {}} aria-label="Search" />);
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
  });
});
