import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
afterEach(cleanup);
describe('native themed actions', () => {
  it('preserves action-only form behavior and pressed state for ordinary and icon actions', () => {
    const submit = vi.fn(), action = vi.fn();
    render(<form onSubmit={submit}><Button variant="secondary" aria-pressed onClick={action}>Message</Button><IconButton aria-label="Details" variant="outline" aria-pressed onClick={action} icon="i" /></form>);
    for (const name of ['Message', 'Details']) {
      const button = screen.getByRole('button', { name }); fireEvent.click(button);
      expect(button).toHaveAttribute('type', 'button'); expect(button).toHaveAttribute('aria-pressed', 'true');
    }
    expect(action).toHaveBeenCalledTimes(2); expect(submit).not.toHaveBeenCalled();
  });
  it('keeps disabled ordinary, destructive and icon actions inactive', () => {
    const action = vi.fn();
    render(<><Button variant="secondary" disabled onClick={action}>Unavailable</Button><Button variant="danger-solid" disabled onClick={action}>Leave</Button><IconButton aria-label="Unavailable details" disabled onClick={action} icon="i" /></>);
    for (const button of screen.getAllByRole('button')) { fireEvent.click(button); expect(button).toBeDisabled(); }
    expect(action).not.toHaveBeenCalled();
  });
  it('retains semantic primary, destructive, code-tone and explicit caller styling', () => {
    render(<><Button variant="primary">Start</Button><Button variant="danger-solid">Leave</Button><IconButton aria-label="Save" variant="primary" icon="s" /><Button tone="code" variant="secondary">Terminal</Button><Button variant="ghost" className="bg-success-bg">Custom</Button></>);
    expect(screen.getByRole('button', { name: 'Start' })).toHaveAttribute('data-variant', 'primary');
    expect(screen.getByRole('button', { name: 'Leave' })).toHaveClass('bg-danger');
    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass('bg-primary', 'text-on-primary');
    expect(screen.getByRole('button', { name: 'Terminal' })).toHaveClass('bg-code-surface');
    expect(screen.getByRole('button', { name: 'Custom' })).toHaveClass('bg-success-bg');
  });
});
