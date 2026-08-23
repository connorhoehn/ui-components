// Four small chrome pieces whose whole job is conditional: ApiDegradedBanner
// must render NOTHING unless the health rollup actually says "degraded" (a
// banner that shows on 'ok' trains operators to ignore it); CollapsedIconStrip
// is the only connection indicator visible while the sidebar is collapsed, so
// its dot has to be a total function of the five connection states;
// DocsTopNav chooses between a real search slot, a placeholder, and nothing at
// all; and ConnectionStatus is a deprecated alias that must keep delegating.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ApiDegradedBanner } from '../ApiDegradedBanner';
import { CollapsedIconStrip } from '../CollapsedIconStrip';
import { DocsTopNav } from '../DocsTopNav';
import { ConnectionStatus } from '../ConnectionStatus';
import type { ApiHealthSnapshot } from '../../../hooks/useApiHealth';

function health(over: Partial<ApiHealthSnapshot> = {}): ApiHealthSnapshot {
  return { status: 'ok', checks: {}, failing: [], ...over };
}

describe('ApiDegradedBanner', () => {
  it.each(['ok', 'unknown'] as const)('renders nothing for status %s', (status) => {
    const { container } = render(<ApiDegradedBanner health={health({ status })} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing even when dependencies are listed as failing but the rollup is not degraded', () => {
    const { container } = render(<ApiDegradedBanner health={health({ status: 'ok', failing: ['dynamo'] })} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('names the failing dependencies when the rollup knows them', () => {
    render(<ApiDegradedBanner health={health({ status: 'degraded', failing: ['dynamo', 's3'] })} />);
    expect(screen.getByTestId('api-degraded-banner')).toHaveTextContent('Affected: dynamo, s3.');
  });

  it('degrades to a generic sentence rather than "Affected: " with nothing after it', () => {
    render(<ApiDegradedBanner health={health({ status: 'degraded', failing: [] })} />);
    const banner = screen.getByTestId('api-degraded-banner');
    expect(banner).toHaveTextContent('Some dependencies are unreachable.');
    expect(banner).not.toHaveTextContent('Affected:');
  });

  it('announces politely instead of interrupting a screen reader', () => {
    render(<ApiDegradedBanner health={health({ status: 'degraded', failing: ['dynamo'] })} />);
    const banner = screen.getByRole('status');
    expect(banner).toHaveAttribute('aria-live', 'polite');
  });
});

describe('CollapsedIconStrip', () => {
  const handlers = () => ({
    onExpand: vi.fn(),
    onDocuments: vi.fn(),
    onPipelines: vi.fn(),
    onObservability: vi.fn(),
  });

  it.each([
    ['connected', 'bg-success'],
    ['connecting', 'bg-warning'],
    ['reconnecting', 'bg-warning'],
    ['disconnected', 'bg-danger'],
    ['idle', 'bg-danger'],
  ] as const)('%s paints the dot %s', (state, cls) => {
    render(<CollapsedIconStrip connectionState={state} {...handlers()} />);
    expect(screen.getByLabelText(`Connection: ${state}`)).toHaveClass(cls);
  });

  it('exposes every icon by an accessible name, not just a glyph', () => {
    render(<CollapsedIconStrip connectionState="connected" {...handlers()} />);
    ['Expand sidebar', 'Documents', 'Pipelines', 'Observability'].forEach((name) => {
      expect(screen.getByRole('button', { name })).toBeInTheDocument();
    });
  });

  it('routes each icon to its own callback and nothing else', () => {
    const h = handlers();
    render(<CollapsedIconStrip connectionState="connected" {...h} />);
    fireEvent.click(screen.getByRole('button', { name: 'Pipelines' }));
    expect(h.onPipelines).toHaveBeenCalledTimes(1);
    expect(h.onDocuments).not.toHaveBeenCalled();
    expect(h.onObservability).not.toHaveBeenCalled();
    expect(h.onExpand).not.toHaveBeenCalled();
  });

  it('its buttons are type=button so a surrounding form is never submitted', () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(<form onSubmit={onSubmit}><CollapsedIconStrip connectionState="idle" {...handlers()} /></form>);
    fireEvent.click(screen.getByRole('button', { name: 'Documents' }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe('DocsTopNav', () => {
  const ITEMS = [{ label: 'Docs', to: '/docs' }, { label: 'API', to: '/api' }];

  it('shows the ⌘K placeholder by default', () => {
    render(<DocsTopNav items={ITEMS} />);
    expect(screen.getByTestId('docs-topnav-search-placeholder')).toBeInTheDocument();
  });

  it('a real search slot replaces the placeholder rather than sitting beside it', () => {
    render(<DocsTopNav items={ITEMS} search={<button>Search…</button>} />);
    expect(screen.queryByTestId('docs-topnav-search-placeholder')).toBeNull();
    expect(screen.getByRole('button', { name: 'Search…' })).toBeInTheDocument();
  });

  it('opting out leaves the search region empty', () => {
    render(<DocsTopNav items={ITEMS} showSearchPlaceholder={false} />);
    expect(screen.queryByTestId('docs-topnav-search-placeholder')).toBeNull();
  });

  it('links the brand by default and de-links it when brandTo is null', () => {
    const { rerender } = render(<DocsTopNav items={ITEMS} brand="Acme" />);
    expect(screen.getByTestId('docs-topnav-brand')).toHaveAttribute('href', '/');

    rerender(<DocsTopNav items={ITEMS} brand="Acme" brandTo={null} />);
    expect(screen.queryByTestId('docs-topnav-brand')).toBeNull();
    expect(screen.getByText('Acme')).toBeInTheDocument();
  });

  it('omits the brand entirely when none is supplied', () => {
    render(<DocsTopNav items={ITEMS} />);
    expect(screen.queryByTestId('docs-topnav-brand')).toBeNull();
  });

  it('labels the nav for assistive tech and renders the right slot alongside search', () => {
    render(<DocsTopNav items={ITEMS} rightSlot={<a href="/gh">GitHub</a>} />);
    expect(screen.getByRole('navigation', { name: 'Documentation navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    expect(screen.getByTestId('docs-topnav-search-placeholder')).toBeInTheDocument();
  });

  it('hands link rendering to the host when renderLink is supplied', () => {
    render(
      <DocsTopNav
        items={ITEMS}
        renderLink={(item) => <span data-testid={`custom-${item.to}`}>{item.label}</span>}
      />,
    );
    expect(screen.getByTestId('custom-/docs')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Docs' })).toBeNull();
  });
});

describe('ConnectionStatus (deprecated alias)', () => {
  it('still renders the ConnectionPill it delegates to', () => {
    render(<ConnectionStatus state="connected" />);
    expect(screen.getByText(/connected/i)).toBeInTheDocument();
  });

  it('reflects a different state through the delegate', () => {
    render(<ConnectionStatus state="disconnected" />);
    expect(screen.getByText(/disconnected/i)).toBeInTheDocument();
  });
});
