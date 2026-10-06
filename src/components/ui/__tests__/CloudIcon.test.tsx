import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CloudIcon } from '../Icons';
import { MonitorIcon } from '../../shared';

describe('CloudIcon / MonitorIcon', () => {
  it('renders a decorative svg at the requested size', () => {
    const { container } = render(<CloudIcon size={20} />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('20');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });
  it('MonitorIcon is reachable from /shared', () => {
    const { container } = render(<MonitorIcon size={16} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
