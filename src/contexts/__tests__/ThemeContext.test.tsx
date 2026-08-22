// ColorSchemeProvider — the light/dark toggle with localStorage persistence
// and the data-theme attribute the stylesheet keys on.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ColorSchemeProvider, useColorScheme } from '../ThemeContext';

function Probe() {
  const { theme, toggleTheme } = useColorScheme();
  return <button onClick={toggleTheme}>theme:{theme}</button>;
}

describe('ColorSchemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to light and stamps data-theme on the root element', () => {
    render(<ColorSchemeProvider><Probe /></ColorSchemeProvider>);
    expect(screen.getByText('theme:light')).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggle flips the theme, the attribute, and persists it', () => {
    render(<ColorSchemeProvider><Probe /></ColorSchemeProvider>);
    fireEvent.click(screen.getByText('theme:light'));
    expect(screen.getByText('theme:dark')).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(window.localStorage.getItem('wsg-theme')).toBe('dark');
  });

  it('restores a stored theme on mount', () => {
    window.localStorage.setItem('wsg-theme', 'dark');
    render(<ColorSchemeProvider><Probe /></ColorSchemeProvider>);
    expect(screen.getByText('theme:dark')).toBeInTheDocument();
  });

  it('ignores garbage in storage', () => {
    window.localStorage.setItem('wsg-theme', 'neon');
    render(<ColorSchemeProvider><Probe /></ColorSchemeProvider>);
    expect(screen.getByText('theme:light')).toBeInTheDocument();
  });
});
