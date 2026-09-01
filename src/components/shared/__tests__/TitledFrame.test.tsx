import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TitledFrame } from '../TitledFrame';

describe('TitledFrame', () => {
  it('renders the title and the body', () => {
    render(<TitledFrame title="claude"><p>pane body</p></TitledFrame>);
    expect(screen.getByText('claude')).toBeTruthy();
    expect(screen.getByText('pane body')).toBeTruthy();
  });

  it('marks the active frame with the focused border', () => {
    const { container, rerender } = render(
      <TitledFrame title="a" data-testid="frame">x</TitledFrame>,
    );
    expect(container.querySelector('[data-testid="frame"]')!.className).toContain('border-code-border');
    rerender(<TitledFrame title="a" active data-testid="frame">x</TitledFrame>);
    expect(container.querySelector('[data-testid="frame"]')!.className).toContain('border-code-blue');
  });

  it('claims focus on mousedown, not click', () => {
    // A pane must become active the moment you press in it — waiting for the
    // full click means a drag that starts in an inactive pane targets the
    // wrong one.
    const onActivate = vi.fn();
    render(<TitledFrame title="a" onActivate={onActivate} data-testid="frame">x</TitledFrame>);
    fireEvent.mouseDown(screen.getByTestId('frame'));
    expect(onActivate).toHaveBeenCalledTimes(1);
  });

  it('keeps the title decorative but leaves an action clickable', () => {
    const onSelect = vi.fn();
    render(
      <TitledFrame
        title="a"
        titleAction={<button type="button" onClick={onSelect}>×</button>}
      >
        x
      </TitledFrame>,
    );
    fireEvent.click(screen.getByText('×'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('uses app-surface tokens in the surface tone', () => {
    const { container } = render(
      <TitledFrame title="a" tone="surface" active data-testid="frame">x</TitledFrame>,
    );
    const frame = container.querySelector('[data-testid="frame"]')!;
    expect(frame.className).toContain('bg-surface');
    expect(frame.className).toContain('border-primary');
  });
});

describe('title band geometry', () => {
  it('pins the band to the border line so a tall action cannot escape it', () => {
    // The band is lifted 8px (`-top-2`), so it has to be 16px tall for the
    // border to run through its middle. Letting content set the height is what
    // produced a dark tab hanging off the pane's top-right corner: a
    // titleAction with its own padding grew the row past the offset.
    const { container } = render(
      <TitledFrame
        title="computer-1"
        titleAction={<button type="button" className="px-3 py-2 text-lg">shell ×</button>}
      >
        <div>body</div>
      </TitledFrame>,
    );
    const band = container.querySelector('.absolute')!;
    expect(band.className).toContain('h-4');
    expect(band.className).toContain('-top-2');
  });
});
