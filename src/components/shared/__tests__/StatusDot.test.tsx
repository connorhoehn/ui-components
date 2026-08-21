import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusDot } from '../StatusDot';

describe('StatusDot', () => {
  it('renders just the dot when no label is given, named by aria-label', () => {
    render(<StatusDot aria-label="online" data-testid="dot" />);
    const wrapper = screen.getByTestId('dot');
    expect(wrapper.querySelector('[aria-label="online"]')).not.toBeNull();
    expect(wrapper.textContent).toBe('');
  });

  it('renders the label text and hides the dot from AT when labelled', () => {
    render(<StatusDot label="Connected" data-testid="dot" />);
    const wrapper = screen.getByTestId('dot');
    expect(wrapper).toHaveTextContent('Connected');
    expect(wrapper.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it('defaults to the tertiary text token and accepts a color override', () => {
    const { rerender } = render(<StatusDot data-testid="dot" />);
    const dot = () => screen.getByTestId('dot').firstElementChild as HTMLElement;
    expect(dot().style.background).toBe('var(--color-text-tertiary)');
    rerender(<StatusDot data-testid="dot" color="var(--color-success)" />);
    expect(dot().style.background).toBe('var(--color-success)');
  });

  it('applies pulse animation only when asked', () => {
    const { rerender } = render(<StatusDot data-testid="dot" />);
    const dot = () => screen.getByTestId('dot').firstElementChild as HTMLElement;
    expect(dot().className).not.toContain('animate-pulse');
    rerender(<StatusDot data-testid="dot" pulse />);
    expect(dot().className).toContain('animate-pulse');
  });

  it('sizes via the size prop', () => {
    render(<StatusDot size="md" data-testid="dot" />);
    expect((screen.getByTestId('dot').firstElementChild as HTMLElement).className).toContain('w-2.5');
  });
});
