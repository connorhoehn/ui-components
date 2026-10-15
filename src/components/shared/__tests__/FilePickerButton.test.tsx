import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FilePickerButton } from '../FilePickerButton';

describe('FilePickerButton size', () => {
  it('is 36px tall by default and 32px with size="sm"', () => {
    const { rerender } = render(<FilePickerButton onFiles={() => {}}>Upload</FilePickerButton>);
    const button = screen.getByRole('button', { name: 'Upload' });
    expect(button.className).toMatch(/\bh-9\b/);
    expect(button).not.toHaveAttribute('data-size');
    rerender(<FilePickerButton size="sm" onFiles={() => {}}>Upload</FilePickerButton>);
    expect(button.className).toMatch(/\bh-8\b/);
    expect(button).toHaveAttribute('data-size', 'sm');
  });
});
