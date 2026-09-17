import { render, screen, fireEvent, cleanup, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CreateChannelDialog } from '../CreateChannelDialog';

afterEach(cleanup);

describe('CreateChannelDialog', () => {
  it('names the team it is creating in, under the title', () => {
    render(<CreateChannelDialog open teamName="Design" onCreate={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('Create a channel')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('disables Create until a name is typed, then creates it', async () => {
    const onCreate = vi.fn().mockResolvedValue(undefined);
    const onClose = vi.fn();
    render(<CreateChannelDialog open teamName="Design" onCreate={onCreate} onClose={onClose} />);

    const create = screen.getByTestId('create-channel-dialog-create') as HTMLButtonElement;
    expect(create.disabled).toBe(true);

    fireEvent.change(screen.getByTestId('create-channel-dialog-name'), { target: { value: '  Roadmap  ' } });
    expect(create.disabled).toBe(false);

    fireEvent.click(create);
    await waitFor(() => expect(onCreate).toHaveBeenCalledWith({ name: 'Roadmap', description: undefined, privacy: 'standard' }));
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it('will not create with only whitespace', () => {
    render(<CreateChannelDialog open teamName="Design" onCreate={vi.fn()} onClose={vi.fn()} />);
    fireEvent.change(screen.getByTestId('create-channel-dialog-name'), { target: { value: '   ' } });
    expect((screen.getByTestId('create-channel-dialog-create') as HTMLButtonElement).disabled).toBe(true);
  });

  it('passes a trimmed description and the chosen privacy', async () => {
    const onCreate = vi.fn().mockResolvedValue(undefined);
    render(<CreateChannelDialog open teamName="Design" onCreate={onCreate} onClose={vi.fn()} />);
    fireEvent.change(screen.getByTestId('create-channel-dialog-name'), { target: { value: 'Roadmap' } });
    fireEvent.change(screen.getByTestId('create-channel-dialog-description'), { target: { value: '  Q3 planning  ' } });
    fireEvent.click(screen.getByTestId('create-channel-dialog-privacy-private'));
    fireEvent.click(screen.getByTestId('create-channel-dialog-create'));
    await waitFor(() =>
      expect(onCreate).toHaveBeenCalledWith({ name: 'Roadmap', description: 'Q3 planning', privacy: 'private' }),
    );
  });

  it('is disabled while busy', () => {
    render(<CreateChannelDialog open teamName="Design" busy onCreate={vi.fn()} onClose={vi.fn()} />);
    fireEvent.change(screen.getByTestId('create-channel-dialog-name'), { target: { value: 'Roadmap' } });
    expect((screen.getByTestId('create-channel-dialog-create') as HTMLButtonElement).disabled).toBe(true);
  });

  it('shows the rejection reason inline without moving the footer', async () => {
    const onCreate = vi.fn().mockRejectedValue(new Error('A channel named Roadmap already exists'));
    const onClose = vi.fn();
    render(<CreateChannelDialog open teamName="Design" onCreate={onCreate} onClose={onClose} />);
    fireEvent.change(screen.getByTestId('create-channel-dialog-name'), { target: { value: 'Roadmap' } });
    fireEvent.click(screen.getByTestId('create-channel-dialog-create'));
    await waitFor(() =>
      expect(screen.getByTestId('create-channel-dialog-error').textContent).toBe('A channel named Roadmap already exists'),
    );
    expect(onClose).not.toHaveBeenCalled();
    // The footer buttons are siblings of the error, not pushed by it — still present and stable.
    expect(screen.getByTestId('create-channel-dialog-create')).toBeInTheDocument();
    expect(screen.getByTestId('create-channel-dialog-cancel')).toBeInTheDocument();
  });

  it('privacy is one named radiogroup with exactly one value chosen', () => {
    render(<CreateChannelDialog open teamName="Design" onCreate={vi.fn()} onClose={vi.fn()} />);
    // One question with two answers, not two toggles that happen to sit
    // together: a radiogroup, and `aria-checked` is a value rather than a
    // button somebody has pushed in.
    const group = screen.getByRole('radiogroup', { name: 'Channel privacy' });
    const segments = within(group).getAllByRole('radio');
    expect(segments).toHaveLength(2);
    expect(segments.filter((b) => b.getAttribute('aria-checked') === 'true')).toHaveLength(1);
    expect(screen.getByTestId('create-channel-dialog-privacy-standard').getAttribute('aria-checked')).toBe('true');
    // One tab stop, and it sits on the chosen answer.
    expect(segments.filter((b) => (b as HTMLElement).tabIndex === 0)).toHaveLength(1);
    fireEvent.click(screen.getByTestId('create-channel-dialog-privacy-private'));
    expect(screen.getByTestId('create-channel-dialog-privacy-private').getAttribute('aria-checked')).toBe('true');
    expect(screen.getByTestId('create-channel-dialog-privacy-standard').getAttribute('aria-checked')).toBe('false');
  });

  it('resets its fields each time it opens', () => {
    const { rerender } = render(<CreateChannelDialog open teamName="Design" onCreate={vi.fn()} onClose={vi.fn()} />);
    fireEvent.change(screen.getByTestId('create-channel-dialog-name'), { target: { value: 'Roadmap' } });
    rerender(<CreateChannelDialog open={false} teamName="Design" onCreate={vi.fn()} onClose={vi.fn()} />);
    rerender(<CreateChannelDialog open teamName="Design" onCreate={vi.fn()} onClose={vi.fn()} />);
    expect((screen.getByTestId('create-channel-dialog-name') as HTMLInputElement).value).toBe('');
  });
});
