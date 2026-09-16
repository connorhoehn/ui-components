import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useRef } from 'react';
import { PopoverForm, PopoverField } from '../PopoverForm';

afterEach(cleanup);

function Anchored(props: { onSubmit: () => void; onClose?: () => void; error?: string | null }) {
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <button ref={ref} type="button">Add channel</button>
      <PopoverForm
        open
        anchor={ref}
        title="Create a channel"
        subtitle="Design"
        submitLabel="Create"
        error={props.error ?? null}
        onSubmit={props.onSubmit}
        onClose={props.onClose ?? (() => {})}
      >
        <PopoverField label="Name">
          <input data-testid="name" />
        </PopoverField>
      </PopoverForm>
    </>
  );
}

describe('PopoverForm', () => {
  it('renders beside its anchor rather than as a centred overlay', () => {
    render(<Anchored onSubmit={vi.fn()} />);
    expect(screen.getByTestId('popover-form-popover')).toBeInTheDocument();
    expect(screen.queryByTestId('popover-form-backdrop')).toBeNull();
  });

  it('falls back to a centred overlay when nothing was given to anchor to', () => {
    render(
      <PopoverForm open title="Create a team" submitLabel="Create" onSubmit={vi.fn()} onClose={vi.fn()}>
        <input />
      </PopoverForm>,
    );
    expect(screen.getByTestId('popover-form-backdrop')).toBeInTheDocument();
  });

  it('submits on Enter in a field, not just on the button', async () => {
    const onSubmit = vi.fn();
    render(<Anchored onSubmit={onSubmit} />);
    fireEvent.submit(screen.getByTestId('popover-form'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('keeps the footer in place when a refusal arrives', () => {
    const { rerender } = render(<Anchored onSubmit={vi.fn()} />);
    expect(screen.queryByTestId('popover-form-error')).toBeNull();
    rerender(<Anchored onSubmit={vi.fn()} error="A channel named Roadmap already exists" />);
    expect(screen.getByTestId('popover-form-error').textContent).toBe('A channel named Roadmap already exists');
    expect(screen.getByTestId('popover-form-submit')).toBeInTheDocument();
    expect(screen.getByTestId('popover-form-cancel')).toBeInTheDocument();
  });

  it('will not submit while busy, and says so on the button', () => {
    const onSubmit = vi.fn();
    render(
      <PopoverForm open busy title="t" submitLabel="Create" onSubmit={onSubmit} onClose={vi.fn()}>
        <input />
      </PopoverForm>,
    );
    const submit = screen.getByTestId('popover-form-submit') as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
    expect(submit.textContent).toBe('Working…');
    fireEvent.submit(screen.getByTestId('popover-form'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('renders nothing when closed', () => {
    render(
      <PopoverForm open={false} title="t" submitLabel="Create" onSubmit={vi.fn()} onClose={vi.fn()}>
        <input />
      </PopoverForm>,
    );
    expect(screen.queryByTestId('popover-form')).toBeNull();
  });
});
