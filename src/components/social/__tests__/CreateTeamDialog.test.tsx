import { render, screen, fireEvent, cleanup, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CreateTeamDialog } from '../CreateTeamDialog';

afterEach(cleanup);

describe('CreateTeamDialog', () => {
  it('titles itself "Create a team"', () => {
    render(<CreateTeamDialog open onCreate={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('Create a team')).toBeInTheDocument();
  });

  it('disables Create until a name is typed, then creates it', async () => {
    const onCreate = vi.fn().mockResolvedValue(undefined);
    const onClose = vi.fn();
    render(<CreateTeamDialog open onCreate={onCreate} onClose={onClose} />);

    const create = screen.getByTestId('create-team-dialog-create') as HTMLButtonElement;
    expect(create.disabled).toBe(true);

    fireEvent.change(screen.getByTestId('create-team-dialog-name'), { target: { value: '  Product  ' } });
    expect(create.disabled).toBe(false);

    fireEvent.click(create);
    await waitFor(() =>
      expect(onCreate).toHaveBeenCalledWith({ name: 'Product', description: undefined, visibility: 'org' }),
    );
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it('will not create with only whitespace', () => {
    render(<CreateTeamDialog open onCreate={vi.fn()} onClose={vi.fn()} />);
    fireEvent.change(screen.getByTestId('create-team-dialog-name'), { target: { value: '   ' } });
    expect((screen.getByTestId('create-team-dialog-create') as HTMLButtonElement).disabled).toBe(true);
  });

  it('passes a trimmed description and the chosen visibility', async () => {
    const onCreate = vi.fn().mockResolvedValue(undefined);
    render(<CreateTeamDialog open onCreate={onCreate} onClose={vi.fn()} />);
    fireEvent.change(screen.getByTestId('create-team-dialog-name'), { target: { value: 'Product' } });
    fireEvent.change(screen.getByTestId('create-team-dialog-description'), { target: { value: '  Cross-functional  ' } });
    fireEvent.click(screen.getByTestId('create-team-dialog-visibility-private'));
    fireEvent.click(screen.getByTestId('create-team-dialog-create'));
    await waitFor(() =>
      expect(onCreate).toHaveBeenCalledWith({ name: 'Product', description: 'Cross-functional', visibility: 'private' }),
    );
  });

  it('is disabled while busy', () => {
    render(<CreateTeamDialog open busy onCreate={vi.fn()} onClose={vi.fn()} />);
    fireEvent.change(screen.getByTestId('create-team-dialog-name'), { target: { value: 'Product' } });
    expect((screen.getByTestId('create-team-dialog-create') as HTMLButtonElement).disabled).toBe(true);
  });

  it('shows the rejection reason inline without moving the footer', async () => {
    const onCreate = vi.fn().mockRejectedValue(new Error('A team named Product already exists'));
    const onClose = vi.fn();
    render(<CreateTeamDialog open onCreate={onCreate} onClose={onClose} />);
    fireEvent.change(screen.getByTestId('create-team-dialog-name'), { target: { value: 'Product' } });
    fireEvent.click(screen.getByTestId('create-team-dialog-create'));
    await waitFor(() =>
      expect(screen.getByTestId('create-team-dialog-error').textContent).toBe('A team named Product already exists'),
    );
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByTestId('create-team-dialog-create')).toBeInTheDocument();
    expect(screen.getByTestId('create-team-dialog-cancel')).toBeInTheDocument();
  });

  it('visibility is one named group with exactly one segment pressed', () => {
    render(<CreateTeamDialog open onCreate={vi.fn()} onClose={vi.fn()} />);
    const group = screen.getByRole('group', { name: 'Team visibility' });
    const segments = within(group).getAllByRole('button');
    expect(segments).toHaveLength(2);
    expect(segments.filter((b) => b.getAttribute('aria-pressed') === 'true')).toHaveLength(1);
    expect(screen.getByTestId('create-team-dialog-visibility-org').getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(screen.getByTestId('create-team-dialog-visibility-private'));
    expect(screen.getByTestId('create-team-dialog-visibility-private').getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByTestId('create-team-dialog-visibility-org').getAttribute('aria-pressed')).toBe('false');
  });

  it('resets its fields each time it opens', () => {
    const { rerender } = render(<CreateTeamDialog open onCreate={vi.fn()} onClose={vi.fn()} />);
    fireEvent.change(screen.getByTestId('create-team-dialog-name'), { target: { value: 'Product' } });
    rerender(<CreateTeamDialog open={false} onCreate={vi.fn()} onClose={vi.fn()} />);
    rerender(<CreateTeamDialog open onCreate={vi.fn()} onClose={vi.fn()} />);
    expect((screen.getByTestId('create-team-dialog-name') as HTMLInputElement).value).toBe('');
  });
});
