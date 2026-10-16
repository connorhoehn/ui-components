import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { InlineEditableText } from '../InlineEditableText';

afterEach(cleanup);

describe('InlineEditableText', () => {
  it('reads as text, edits on click, commits a changed value on Enter', () => {
    const onCommit = vi.fn();
    render(<InlineEditableText value="Sprint review" label="Deck title" onCommit={onCommit} data-testid="t" />);
    expect(screen.queryByRole('textbox')).toBeNull();
    fireEvent.click(screen.getByTestId('t'));
    fireEvent.change(screen.getByTestId('t-input'), { target: { value: '  Q3 review ' } });
    fireEvent.keyDown(screen.getByTestId('t-input'), { key: 'Enter' });
    expect(onCommit).toHaveBeenCalledWith('Q3 review');
  });

  it('puts the old value back on Escape, and refuses an empty required value', () => {
    const onCommit = vi.fn();
    render(<InlineEditableText value="Sprint review" label="Deck title" required onCommit={onCommit} data-testid="t" />);
    fireEvent.click(screen.getByTestId('t'));
    fireEvent.change(screen.getByTestId('t-input'), { target: { value: 'nope' } });
    fireEvent.keyDown(screen.getByTestId('t-input'), { key: 'Escape' });
    fireEvent.click(screen.getByTestId('t'));
    fireEvent.change(screen.getByTestId('t-input'), { target: { value: '   ' } });
    fireEvent.blur(screen.getByTestId('t-input'));
    expect(onCommit).not.toHaveBeenCalled();
    expect(screen.getByTestId('t')).toHaveTextContent('Sprint review');
  });

  it('shows the placeholder for an empty value', () => {
    render(<InlineEditableText value="" label="Subtitle" placeholder="Add a subtitle" onCommit={vi.fn()} data-testid="t" />);
    expect(screen.getByTestId('t')).toHaveTextContent('Add a subtitle');
  });

  it('Enter and Escape hand focus back to the edit button; a blur leaves it where it went', () => {
    const onCommit = vi.fn();
    render(<><InlineEditableText value="Room 1" label="Room name" onCommit={onCommit} data-testid="t" /><button type="button">elsewhere</button></>);
    fireEvent.click(screen.getByTestId('t'));
    fireEvent.change(screen.getByTestId('t-input'), { target: { value: 'Design' } });
    fireEvent.keyDown(screen.getByTestId('t-input'), { key: 'Enter' });
    expect(onCommit).toHaveBeenCalledWith('Design');
    expect(document.activeElement).toBe(screen.getByTestId('t'));

    fireEvent.click(screen.getByTestId('t'));
    fireEvent.keyDown(screen.getByTestId('t-input'), { key: 'Escape' });
    expect(document.activeElement).toBe(screen.getByTestId('t'));

    fireEvent.click(screen.getByTestId('t'));
    const elsewhere = screen.getByRole('button', { name: 'elsewhere' });
    elsewhere.focus();
    fireEvent.blur(screen.getByTestId('t-input'));
    expect(document.activeElement).toBe(elsewhere);
  });
});

