import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
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
    fireEvent.click(screen.getByTestId('create-team-dialog-visibility-private-button'));
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

  it('the visibility choices are real radios, one selected', () => {
    render(<CreateTeamDialog open onCreate={vi.fn()} onClose={vi.fn()} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    const checked = radios.filter((r) => r.getAttribute('aria-checked') === 'true');
    expect(checked).toHaveLength(1);
    expect(screen.getByTestId('create-team-dialog-visibility-org-button').getAttribute('aria-checked')).toBe('true');
    fireEvent.click(screen.getByTestId('create-team-dialog-visibility-private-button'));
    expect(screen.getByTestId('create-team-dialog-visibility-private-button').getAttribute('aria-checked')).toBe('true');
    expect(screen.getByTestId('create-team-dialog-visibility-org-button').getAttribute('aria-checked')).toBe('false');
  });

  it('resets its fields each time it opens', () => {
    const { rerender } = render(<CreateTeamDialog open onCreate={vi.fn()} onClose={vi.fn()} />);
    fireEvent.change(screen.getByTestId('create-team-dialog-name'), { target: { value: 'Product' } });
    rerender(<CreateTeamDialog open={false} onCreate={vi.fn()} onClose={vi.fn()} />);
    rerender(<CreateTeamDialog open onCreate={vi.fn()} onClose={vi.fn()} />);
    expect((screen.getByTestId('create-team-dialog-name') as HTMLInputElement).value).toBe('');
  });
});
