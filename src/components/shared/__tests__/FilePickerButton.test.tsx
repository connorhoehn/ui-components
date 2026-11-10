import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FilePickerButton } from '../FilePickerButton';

describe('FilePickerButton size', () => {
  it('is 36px tall by default and 28px (the Button sm height) with size="sm" (32px before 2.516.1)', () => {
    const { rerender } = render(<FilePickerButton onFiles={() => {}}>Upload</FilePickerButton>);
    const button = screen.getByRole('button', { name: 'Upload' });
    expect(button.className).toMatch(/\bh-9\b/);
    expect(button).not.toHaveAttribute('data-size');
    rerender(<FilePickerButton size="sm" onFiles={() => {}}>Upload</FilePickerButton>);
    expect(button.className).toContain('h-[var(--ui-control-sm,1.75rem)]');
    expect(button.className).not.toMatch(/\bh-8\b/);
    expect(button).toHaveAttribute('data-size', 'sm');
  });
});

describe('FilePickerButton variant', () => {
  it('carries data-variant like Button, so a primary picker audits as primary', () => {
    const { rerender } = render(<FilePickerButton onFiles={() => {}}>Add images</FilePickerButton>);
    const button = screen.getByRole('button', { name: 'Add images' });
    expect(button).toHaveAttribute('data-variant', 'secondary');
    rerender(<FilePickerButton variant="primary" onFiles={() => {}}>Add images</FilePickerButton>);
    expect(button).toHaveAttribute('data-variant', 'primary');
  });
});
