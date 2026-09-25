import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ExplorerLayout } from '../ExplorerLayout';

afterEach(cleanup);

describe('ExplorerLayout', () => {
  it('renders rail, pane and aside as landmarks that scroll independently', () => {
    render(
      <ExplorerLayout rail={<p>tree</p>} aside={<p>activity</p>}>
        <p>document</p>
      </ExplorerLayout>,
    );
    const rail = screen.getByTestId('explorer-layout-rail');
    expect(rail.tagName).toBe('NAV');
    // The rail scrolls its list in an inner container; its header row, when present, stays put.
    expect(rail.querySelector('.overflow-y-auto')).not.toBeNull();
    expect(rail.className).toContain('w-[300px]');
    expect(screen.getByTestId('explorer-layout-pane').className).toContain('overflow-y-auto');
    expect(screen.getByTestId('explorer-layout-aside').tagName).toBe('ASIDE');
    // The frame fills its parent and never grows past it.
    expect(screen.getByTestId('explorer-layout').className).toContain('min-h-0');
  });

  it('omits the aside entirely when there is none, and can drop the pane padding', () => {
    render(
      <ExplorerLayout rail={<p>tree</p>} railWidth="sm" panePadding="none">
        <p>editor</p>
      </ExplorerLayout>,
    );
    expect(screen.queryByTestId('explorer-layout-aside')).toBeNull();
    expect(screen.getByTestId('explorer-layout-rail').className).toContain('w-[240px]');
    expect(screen.getByTestId('explorer-layout-pane').className).not.toContain('px-8');
  });
});

describe('ExplorerLayout asidePlacement', () => {
  it('keeps the aside beside the pane at every width when asked', () => {
    render(<ExplorerLayout rail={<p>rail</p>} aside={<p>aside</p>} asidePlacement="beside"><p>pane</p></ExplorerLayout>);
    const aside = screen.getByTestId('explorer-layout-aside');
    expect(aside.dataset.placement).toBe('beside');
    expect(aside.className).not.toContain('border-t');
    const row = aside.parentElement!;
    expect(row.className).toContain('flex-row');
    expect(row.className).not.toContain('flex-col');
  });
  it('still stacks below 2xl by default', () => {
    render(<ExplorerLayout rail={<p>rail</p>} aside={<p>aside</p>}><p>pane</p></ExplorerLayout>);
    expect(screen.getByTestId('explorer-layout-aside').parentElement!.className).toContain('2xl:flex-row');
  });
});

describe('ExplorerLayout paneHeader (2.389.0)', () => {
  it('draws a non-scrolling band right of the rail, above the pane only, outside the scrolling pane', () => {
    render(
      <ExplorerLayout rail={<p>rail</p>} aside={<p>aside</p>} paneHeader={<nav aria-label="crumbs">Build › Knowledge</nav>}>
        <p>pane</p>
      </ExplorerLayout>,
    );
    const band = screen.getByTestId('explorer-layout-pane-header');
    const pane = screen.getByTestId('explorer-layout-pane');
    const rail = screen.getByTestId('explorer-layout-rail');
    expect(pane).not.toContainElement(band);
    expect(band.className).toContain('shrink-0');
    expect(band.className).not.toContain('overflow');
    expect(pane.className).toContain('overflow-y-auto');
    // Right of the rail, over the pane alone (2.389.4): the band's column holds
    // the pane but NOT the aside, which is the column's sibling — so nothing
    // the band draws (a crumbs ScopeHeader's hung controls) can land on the
    // aside's top row.
    const column = screen.getByTestId('explorer-layout-pane-column');
    const aside = screen.getByTestId('explorer-layout-aside');
    expect(column).toContainElement(pane);
    expect(column).not.toContainElement(aside);
    expect(column.parentElement).toBe(aside.parentElement);
    expect(column.parentElement!.parentElement).toBe(rail.parentElement);
    expect(band.compareDocumentPosition(pane) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('keeps the aside a full-height column beside the band when placed beside', () => {
    render(
      <ExplorerLayout rail={<p>rail</p>} asidePlacement="beside" aside={<p>aside</p>} paneHeader={<p>crumbs</p>}>
        <p>pane</p>
      </ExplorerLayout>,
    );
    const aside = screen.getByTestId('explorer-layout-aside');
    const column = screen.getByTestId('explorer-layout-pane-column');
    expect(column.parentElement!.className).toContain('flex-row');
    expect(column.nextElementSibling).toBe(aside);
    expect(aside).not.toContainElement(screen.getByTestId('explorer-layout-pane-header'));
  });

  it('is absent by default', () => {
    render(<ExplorerLayout rail={<p>rail</p>}><p>pane</p></ExplorerLayout>);
    expect(screen.queryByTestId('explorer-layout-pane-header')).toBeNull();
    expect(screen.queryByTestId('explorer-layout-pane-column')).toBeNull();
  });
});
