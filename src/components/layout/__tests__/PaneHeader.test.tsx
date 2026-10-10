import { useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PaneHeader } from '../SidePane';

const tabs = [{ id: 'discussion', label: 'Discussion' }, { id: 'agent', label: 'Agent' }, { id: 'details', label: 'Details' }];
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
function Fixture({ action = () => {} }: { action?: () => void }) {
  const [value, setValue] = useState('discussion');
  return <PaneHeader tabs={tabs} value={value} onValueChange={setValue} trailing={<button onClick={action}>Docs and files</button>} />;
}
describe('PaneHeader navigation', () => {
  it('keeps keyboard tab selection and trailing actions independent', () => {
    const action = vi.fn(); render(<Fixture action={action} />);
    const first = screen.getByRole('tab', { name: 'Discussion' }); first.focus();
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Agent' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Agent' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Docs and files' }));
    expect(action).toHaveBeenCalledOnce();
    expect(screen.getByRole('tab', { name: 'Agent' })).toHaveAttribute('aria-selected', 'true');
  });
  it('retains every view at narrow widths and focuses a newly revealed keyboard selection', () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 300, height: 36, x: 0, y: 0, left: 0, right: 300, top: 0, bottom: 36, toJSON: () => ({}) });
    render(<Fixture />);
    expect(screen.getByRole('tablist')).toHaveAttribute('data-folded', 'true');
    const first = screen.getByRole('tab', { name: 'Discussion' }); first.focus();
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Agent' })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('tab', { name: 'Agent' }), { key: 'End' });
    expect(screen.getByRole('tab', { name: 'Details' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Details' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('button', { name: /More views: Agent/ })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Docs and files' })).toBeVisible();
  });
});
