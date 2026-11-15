import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AmbientSurface } from '../AmbientSurface';

const css = readFileSync(join(__dirname, '../../../styles/ambientSurface.css'), 'utf8');

describe('AmbientSurface', () => {
  it('draws its content over a muted surface with a drifting field by default', () => {
    render(<AmbientSurface data-testid="s" className="flex-1"><p>Hello</p></AmbientSurface>);
    const surface = screen.getByTestId('s');
    expect(surface).toHaveAttribute('data-ambient-surface');
    expect(surface).toHaveAttribute('data-tone', 'muted');
    expect(surface).toHaveAttribute('data-effect', 'drift');
    expect(surface.className).toContain('uic-ambient-surface');
    expect(surface.className).toContain('flex-1');
    expect(surface).toHaveTextContent('Hello');
  });

  it('the field is decoration: hidden from assistive technology, first in the box, under the content', () => {
    render(<AmbientSurface data-testid="s"><button type="button">Act</button></AmbientSurface>);
    const field = screen.getByTestId('ambient-surface-field');
    expect(field).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('s').firstElementChild).toBe(field);
    expect(field.textContent).toBe('');
    expect(screen.getByRole('button', { name: 'Act' })).toBeInTheDocument();
  });

  it('effect="none" draws no field; tone="plain" paints no surface of its own; paused is marked', () => {
    const { rerender } = render(<AmbientSurface data-testid="s" effect="none" />);
    expect(screen.queryByTestId('ambient-surface-field')).toBeNull();
    rerender(<AmbientSurface data-testid="s" tone="plain" effect="dots" paused />);
    expect(screen.getByTestId('s')).toHaveAttribute('data-tone', 'plain');
    expect(screen.getByTestId('s')).toHaveAttribute('data-paused', 'true');
    expect(screen.getByTestId('ambient-surface-field')).toBeInTheDocument();
  });

  it('the stylesheet keeps the field out of the way: no pointer events, under the content, clipped, and still under reduced motion', () => {
    const field = /\.uic-ambient-field\s*\{([^}]*)\}/.exec(css)?.[1] ?? '';
    expect(field).toMatch(/pointer-events:\s*none/);
    expect(field).toMatch(/z-index:\s*-1/);
    expect(field).toMatch(/overflow:\s*hidden/);
    expect(css).toMatch(/\.uic-ambient-surface\s*\{[^}]*isolation:\s*isolate/);
    // Only the drift effect animates, and only with a transform (the compositor's work, not a repaint).
    expect(css).toMatch(/\[data-effect="drift"\] \.uic-ambient-dots\s*\{[^}]*animation:\s*uic-ambient-drift/);
    expect(/@keyframes uic-ambient-drift\s*\{([\s\S]*?)\n\}/.exec(css)?.[1]).toMatch(/^[^a-z]*(from|to) \{ transform: translate3d\([^)]*\); \}/m);
    const reduced = /@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/.exec(css)?.[1] ?? '';
    expect(reduced).toMatch(/\.uic-ambient-surface\[data-effect\] \.uic-ambient-dots\s*\{[^}]*animation:\s*none/);
    expect(css).toMatch(/\[data-paused\] \.uic-ambient-dots\s*\{[^}]*animation-play-state:\s*paused/);
  });
});
