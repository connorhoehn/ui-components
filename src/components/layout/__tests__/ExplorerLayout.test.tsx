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
    expect(rail.className).toContain('overflow-y-auto');
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
