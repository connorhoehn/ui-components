import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DropdownMenu } from '../DropdownMenu';

describe('DropdownMenu flyouts and checks', () => {
  it('opens a submenu from its row and runs the chosen item', () => {
    const onPdf = vi.fn();
    render(
      <DropdownMenu
        trigger="⋯"
        triggerLabel="More"
        sections={[{
          items: [
            { label: 'Outline', checked: true, onSelect: () => {} },
            { label: 'Download as…', 'data-testid': 'download', submenu: [{ items: [{ label: 'PDF', onSelect: onPdf, 'data-testid': 'pdf' }] }] },
          ],
        }]}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'More' }));
    expect(screen.getByRole('menuitemcheckbox', { name: 'Outline' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.queryByTestId('pdf')).toBeNull();
    fireEvent.click(screen.getByTestId('download'));
    fireEvent.click(screen.getByTestId('pdf'));
    expect(onPdf).toHaveBeenCalledTimes(1);
  });
});
