// src/integrations/realtime-modules/__tests__/CapabilityBoundary.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CapabilityBoundary } from '../CapabilityBoundary';
import type { RMCapabilityHookResult } from '../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeCapability(overrides: Partial<RMCapabilityHookResult>): RMCapabilityHookResult {
  return {
    capability: null,
    enabled: false,
    isLoading: false,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('CapabilityBoundary', () => {
  it('renders loading node while isLoading is true', () => {
    const cap = makeCapability({ isLoading: true });
    render(
      <CapabilityBoundary capability={cap} loading={<span>Loading…</span>}>
        <span>Content</span>
      </CapabilityBoundary>,
    );
    expect(screen.getByText('Loading…')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders nothing while loading when no loading prop provided', () => {
    const cap = makeCapability({ isLoading: true });
    const { container } = render(
      <CapabilityBoundary capability={cap}>
        <span>Content</span>
      </CapabilityBoundary>,
    );
    expect(container.textContent).toBe('');
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders fallback when enabled is false and not loading', () => {
    const cap = makeCapability({ enabled: false });
    render(
      <CapabilityBoundary capability={cap} fallback={<span>Not available</span>}>
        <span>Content</span>
      </CapabilityBoundary>,
    );
    expect(screen.getByText('Not available')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders nothing when disabled and no fallback provided', () => {
    const cap = makeCapability({ enabled: false });
    const { container } = render(
      <CapabilityBoundary capability={cap}>
        <span>Content</span>
      </CapabilityBoundary>,
    );
    expect(container.textContent).toBe('');
  });

  it('renders children when enabled is true and not loading', () => {
    const cap = makeCapability({
      enabled: true,
      capability: { name: 'reactions', enabled: true },
    });
    render(
      <CapabilityBoundary
        capability={cap}
        loading={<span>Loading…</span>}
        fallback={<span>Not available</span>}
      >
        <span>Feature content</span>
      </CapabilityBoundary>,
    );
    expect(screen.getByText('Feature content')).toBeInTheDocument();
    expect(screen.queryByText('Loading…')).not.toBeInTheDocument();
    expect(screen.queryByText('Not available')).not.toBeInTheDocument();
  });

  it('isLoading takes precedence over enabled', () => {
    // Edge case: isLoading=true even when enabled=true — should show loading
    const cap = makeCapability({ isLoading: true, enabled: true });
    render(
      <CapabilityBoundary capability={cap} loading={<span>Loading…</span>}>
        <span>Content</span>
      </CapabilityBoundary>,
    );
    expect(screen.getByText('Loading…')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});
