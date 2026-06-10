// src/components/image/__tests__/GenerativeImagePreview.test.tsx

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { GenerativeImagePreview } from '../GenerativeImagePreview';

// Mutable reduced-motion flag so individual tests can flip the branch.
let mockReducedMotion = false;
vi.mock('../../../hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => mockReducedMotion,
}));

describe('GenerativeImagePreview', () => {
  beforeEach(() => {
    mockReducedMotion = false;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders shimmer + sweep + micro-label while synthesizing', () => {
    render(<GenerativeImagePreview status="synthesizing" />);
    const root = screen.getByTestId('generative-image-preview');
    expect(root).toHaveAttribute('data-status', 'synthesizing');

    const shimmer = screen.getByTestId('generative-image-preview-shimmer');
    expect(shimmer.className).toContain('animate-[skeleton-shimmer');
    expect(screen.getByTestId('generative-image-preview-sweep')).toBeInTheDocument();
    expect(screen.getByText('✦ synthesizing')).toBeInTheDocument();
    // Indeterminate: no img, no progress bar
    expect(screen.queryByTestId('generative-image-preview-img')).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('omits the elapsed chip when startedAt is not provided', () => {
    render(<GenerativeImagePreview status="synthesizing" />);
    expect(screen.queryByTestId('generative-image-preview-elapsed')).not.toBeInTheDocument();
  });

  it('shows an elapsed-time chip that ticks every second', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-10T12:00:12.000Z'));
    const startedAt = new Date('2026-06-10T12:00:00.000Z').getTime();

    render(<GenerativeImagePreview status="synthesizing" startedAt={startedAt} />);
    expect(screen.getByTestId('generative-image-preview-elapsed').textContent).toBe('12s');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('generative-image-preview-elapsed').textContent).toBe('13s');
  });

  it('formats elapsed time past a minute as "Mm Ss"', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-10T12:01:15.000Z'));
    const startedAt = new Date('2026-06-10T12:00:00.000Z').getTime();

    render(<GenerativeImagePreview status="synthesizing" startedAt={startedAt} />);
    expect(screen.getByTestId('generative-image-preview-elapsed').textContent).toBe('1m 15s');
  });

  it('plays the blur-up reveal when transitioning synthesizing → done', () => {
    vi.useFakeTimers();
    const { rerender } = render(<GenerativeImagePreview status="synthesizing" />);

    rerender(<GenerativeImagePreview status="done" src="/img/out.png" alt="result" />);
    const root = screen.getByTestId('generative-image-preview');
    expect(root).toHaveAttribute('data-status', 'done');

    const img = screen.getByTestId('generative-image-preview-img') as HTMLImageElement;
    expect(img.src).toContain('/img/out.png');
    // First done frame paints blurred…
    expect(img.className).toContain('blur-[16px]');
    expect(img.className).toContain('transition-[filter]');

    // …then the blur drops and the CSS transition reveals the image.
    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(img.className).not.toContain('blur-[16px]');
    expect(img.className).toContain('blur-0');
  });

  it('skips the reveal animation when mounted already done', () => {
    render(<GenerativeImagePreview status="done" src="/img/out.png" />);
    const img = screen.getByTestId('generative-image-preview-img');
    expect(img.className).not.toContain('blur-[16px]');
    expect(img.className).toContain('blur-0');
  });

  it('reduced motion: static neutral block, no shimmer/sweep animation', () => {
    mockReducedMotion = true;
    render(<GenerativeImagePreview status="synthesizing" />);
    const shimmer = screen.getByTestId('generative-image-preview-shimmer');
    expect(shimmer.className).not.toContain('animate-');
    expect(screen.queryByTestId('generative-image-preview-sweep')).not.toBeInTheDocument();
    // Label still present — content, not motion
    expect(screen.getByText('✦ synthesizing')).toBeInTheDocument();
  });

  it('reduced motion: instant cut on reveal (no blur, no transition)', () => {
    mockReducedMotion = true;
    const { rerender } = render(<GenerativeImagePreview status="synthesizing" />);
    rerender(<GenerativeImagePreview status="done" src="/img/out.png" />);

    const img = screen.getByTestId('generative-image-preview-img');
    expect(img.className).not.toContain('blur-[16px]');
    expect(img.className).not.toContain('transition-[filter]');
  });

  it('renders a neutral block when done without a src', () => {
    render(<GenerativeImagePreview status="done" />);
    expect(screen.getByTestId('generative-image-preview')).toHaveAttribute('data-status', 'done');
    expect(screen.queryByTestId('generative-image-preview-img')).not.toBeInTheDocument();
  });
});
