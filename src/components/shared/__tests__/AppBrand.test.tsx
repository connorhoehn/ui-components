import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppBrand } from '../AppBrand';
import { ThemeModeToggle } from '../ThemeModeToggle';

describe('AppBrand', () => {
  it('md: a home link with the mark, the 16px name and a 12px secondary label', () => {
    render(<AppBrand mark={<svg />} name="Storymaker" secondary="Studio" href="#/" />);
    const link = screen.getByRole('link', { name: 'Storymaker home' });
    expect(link).toHaveAttribute('href', '#/');
    expect(link).toHaveAttribute('data-app-brand', 'md');
    expect(screen.getByTestId('app-brand-name').className).toMatch(/\btext-base\b/);
    expect(screen.getByTestId('app-brand-secondary').className).toMatch(/\btext-xs\b/);
    expect(link.querySelector('[data-ui-part="app-brand-mark"]')?.className).toMatch(/\bh-7\b/);
  });

  it('sm without href: not interactive, 14px name, 24px mark', () => {
    render(<AppBrand mark={<svg />} name="Storymaker" size="sm" />);
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.getByTestId('app-brand')).toHaveAttribute('data-app-brand', 'sm');
    expect(screen.getByTestId('app-brand-name').className).toMatch(/\btext-sm\b/);
    expect(screen.getByTestId('app-brand').querySelector('[data-ui-part="app-brand-mark"]')?.className).toMatch(/\bh-6\b/);
  });
});

describe('ThemeModeToggle', () => {
  it('light: an sm icon button, not pressed, names what it does, flips to dark', () => {
    const onModeChange = vi.fn();
    render(<ThemeModeToggle mode="light" onModeChange={onModeChange} />);
    const btn = screen.getByRole('button', { name: 'Switch to dark mode' });
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(btn).toHaveAttribute('data-size', 'sm');
    expect(btn).toHaveAttribute('data-theme-mode', 'light');
    fireEvent.click(btn);
    expect(onModeChange).toHaveBeenCalledWith('dark');
  });

  it('dark: pressed, flips to light', () => {
    const onModeChange = vi.fn();
    render(<ThemeModeToggle mode="dark" onModeChange={onModeChange} />);
    const btn = screen.getByRole('button', { name: 'Switch to light mode' });
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(btn);
    expect(onModeChange).toHaveBeenCalledWith('light');
  });
});
