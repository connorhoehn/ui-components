// 2.515.7: a compact header in a narrow column keeps its title. Before, the
// title cell and the actions shared one unwrapping row and the actions
// (shrink-0) squeezed the h1 to zero width at a 302px column. jsdom has no
// layout, so these pin the flex contract that makes the actions wrap; the
// geometry itself is proven by the ui-dom-audit `header.title-room` rule.
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageHeader } from '../PageHeader';
import { CollectionPage } from '../CollectionPage';
import { PageFrame } from '../PageFrame';
import { DetailPage } from '../DetailPage';

const actions = <><button>Primary</button><button>More</button><button>Start blank draft</button><button>New episode</button></>;

function expectWrappingRow(heading: HTMLElement) {
  const cell = heading.closest('[data-page-header-title-cell]') as HTMLElement;
  const row = heading.closest('[data-page-header-row]') as HTMLElement;
  expect(cell).not.toBeNull();
  expect(row).not.toBeNull();
  // The row wraps and has no fixed height; the title cell lays out at an 8rem basis.
  expect(row.className).toContain('flex-wrap');
  expect(row.className).not.toMatch(/(^|\s)h-7(\s|$)/);
  expect(row.className).toContain('min-h-7');
  expect(cell.className).toContain('basis-32');
  expect(cell.className).toContain('flex-1');
  const acts = row.querySelector('[data-page-header-actions]') as HTMLElement;
  expect(acts).not.toBeNull();
  // Actions on their own row stay inside the column.
  expect(acts.className).toContain('max-w-full');
  expect(acts.className).toContain('flex-wrap');
  expect(heading).toHaveAttribute('data-page-header-title');
}

describe('narrow compact headers (2.515.7)', () => {
  it('PageHeader compact: actions wrap under the title instead of squeezing it', () => {
    render(<PageHeader title="Episodes" density="compact" actions={actions} />);
    expectWrappingRow(screen.getByRole('heading', { level: 1, name: 'Episodes' }));
  });

  it('CollectionPage: the template header is the wrapping compact row, with no consumer prop', () => {
    render(<CollectionPage title="Episodes" headerActions={actions} table={{ data: [], columns: [], keyField: () => 'x' }} />);
    expectWrappingRow(screen.getByRole('heading', { level: 1, name: 'Episodes' }));
  });

  it('CollectionPage: the toolbar in the header row wraps with the actions', () => {
    render(<CollectionPage title="Cast & assets" headerActions={actions}
      toolbar={{ label: 'Asset filters', search: { value: '', onChange: () => {} } }} />);
    const heading = screen.getByRole('heading', { level: 1, name: 'Cast & assets' });
    expectWrappingRow(heading);
    expect(heading.closest('[data-page-header-row]')!.querySelector('[data-page-header-actions] [data-collection-placement="header"]')).not.toBeNull();
  });

  it('PageFrame (both header forms) shares the wrapping row', () => {
    const { unmount } = render(<PageFrame title="Settings" actions={actions}>body</PageFrame>);
    expectWrappingRow(screen.getByRole('heading', { level: 1, name: 'Settings' }));
    unmount();
    render(<PageFrame title="Settings" actions={actions} breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Settings' }]} trailLink={{ label: 'Docs', href: '/docs' }}>body</PageFrame>);
    expectWrappingRow(screen.getByRole('heading', { level: 1, name: 'Settings' }));
  });

  it('DetailPage: the header row wraps and the actions cap at the column', () => {
    const { container } = render(<DetailPage title="Episode 3" actions={actions}>body</DetailPage>);
    const row = container.querySelector('[data-detail-page-row]') as HTMLElement;
    expect(row.className).toContain('flex-wrap');
    expect(row.firstElementChild!.className).toContain('basis-32');
    expect(container.querySelector('[data-detail-page-actions]')!.className).toContain('max-w-full');
  });

  it('DetailPage tabsLabel names the tab list (default stays "Sections")', () => {
    const tabs = [{ id: 'a', label: 'Summary', content: 'A' }, { id: 'b', label: 'Shots', content: 'B' }];
    const { unmount } = render(<DetailPage title="Episode 3" tabs={tabs} />);
    expect(screen.getByRole('tablist', { name: 'Sections' })).toBeInTheDocument();
    unmount();
    render(<DetailPage title="Episode 3" tabs={tabs} tabsLabel="Episode sections" />);
    expect(screen.getByRole('tablist', { name: 'Episode sections' })).toBeInTheDocument();
  });
});
