import { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FileInput } from '../FileInput';

function file(name: string) {
  return new File(['x'], name, { type: 'text/plain' });
}

describe('FileInput', () => {
  it('hands the picked files to onFiles as an array', () => {
    const onFiles = vi.fn();
    render(<FileInput data-testid="picker" multiple onFiles={onFiles} />);
    const picked = [file('a.txt'), file('b.txt')];
    fireEvent.change(screen.getByTestId('picker'), { target: { files: picked } });
    expect(onFiles).toHaveBeenCalledWith(picked);
  });

  it('clears its value after a pick, so choosing the SAME file twice fires again', () => {
    const onFiles = vi.fn();
    render(<FileInput data-testid="picker" onFiles={onFiles} />);
    const el = screen.getByTestId('picker') as HTMLInputElement;
    fireEvent.change(el, { target: { files: [file('same.txt')] } });
    // The reset is what makes a second identical pick a change event at all.
    expect(el.value).toBe('');
    fireEvent.change(el, { target: { files: [file('same.txt')] } });
    expect(onFiles).toHaveBeenCalledTimes(2);
  });

  it('stays out of the tab order and the accessibility tree', () => {
    render(<FileInput data-testid="picker" onFiles={vi.fn()} />);
    const el = screen.getByTestId('picker');
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el).toHaveAttribute('tabindex', '-1');
    expect(el.className).toContain('hidden');
  });

  it('forwards a ref so the visible trigger can click it', () => {
    const ref = createRef<HTMLInputElement>();
    render(<FileInput ref={ref} onFiles={vi.fn()} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('file');
  });

  it('passes accept through', () => {
    render(<FileInput data-testid="picker" accept="image/*" onFiles={vi.fn()} />);
    expect(screen.getByTestId('picker')).toHaveAttribute('accept', 'image/*');
  });
});
