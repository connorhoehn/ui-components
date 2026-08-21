import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChatComposer } from '../ChatComposer';

describe('ChatComposer', () => {
  it('forwards typed text and submits on Enter', () => {
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    render(<ChatComposer value="hello" onChange={onChange} onSubmit={onSubmit} placeholder="Type…" />);
    const input = screen.getByPlaceholderText('Type…');
    fireEvent.change(input, { target: { value: 'hello!' } });
    expect(onChange).toHaveBeenCalledWith('hello!');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('does not submit empty or whitespace-only values', () => {
    const onSubmit = vi.fn();
    render(<ChatComposer value="   " onChange={() => {}} onSubmit={onSubmit} placeholder="p" />);
    fireEvent.keyDown(screen.getByPlaceholderText('p'), { key: 'Enter' });
    fireEvent.click(screen.getByRole('button'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('multiline: Shift+Enter inserts a newline instead of submitting', () => {
    const onSubmit = vi.fn();
    render(
      <ChatComposer value="line" onChange={() => {}} onSubmit={onSubmit} multiline placeholder="p" />,
    );
    const field = screen.getByPlaceholderText('p');
    expect(field.tagName).toBe('TEXTAREA');
    fireEvent.keyDown(field, { key: 'Enter', shiftKey: true });
    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.keyDown(field, { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('disabled blocks both the field and the send button', () => {
    const onSubmit = vi.fn();
    render(<ChatComposer value="msg" onChange={() => {}} onSubmit={onSubmit} disabled placeholder="p" />);
    expect(screen.getByPlaceholderText('p')).toBeDisabled();
    fireEvent.click(screen.getByRole('button'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('renders a custom submit label', () => {
    render(<ChatComposer value="" onChange={() => {}} onSubmit={() => {}} submitLabel="Send" />);
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });
});
