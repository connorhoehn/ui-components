import { render, screen } from '@testing-library/react';
import { WorkArea } from '../WorkArea';
import { Breadcrumbs } from '../Breadcrumbs';
import { Toolbar } from '../Toolbar';
import { FloatingComposerDock } from '../../doc-editor/FloatingComposerDock';

describe('WorkArea', () => {
  it('keeps a composer footer full bleed and outside the body scroller/status inset', () => {
    const { container } = render(<WorkArea status={<span>counts</span>} footer={<div data-composer-surface>prompt</div>}>body</WorkArea>);
    const footer = container.querySelector('[data-workarea-footer]')!;
    expect(footer).toContainElement(container.querySelector('[data-composer-surface]') as HTMLElement);
    expect(footer.className).not.toMatch(/px-|py-|border/);
    expect(container.querySelector('.overflow-auto')).not.toContainElement(footer as HTMLElement);
  });
  it('floats the footer over the body and pads the body by its measured --dock-height', () => {
    const { container } = render(
      <WorkArea footerPlacement="float" footer={<FloatingComposerDock label="Work" composer={<textarea aria-label="prompt" />} />}>body</WorkArea>,
    );
    const region = container.querySelector('[data-workarea-float-region]') as HTMLElement;
    const footer = container.querySelector('[data-workarea-footer]') as HTMLElement;
    expect(region.className).toMatch(/relative/);
    expect(footer.className).toMatch(/absolute/);
    expect(footer.className).toMatch(/pointer-events-none/);
    expect(region).toContainElement(footer);
    expect(container.querySelector('.overflow-auto')).not.toContainElement(footer);
    // The body ends with a spacer the height of the footer, so the last row scrolls clear.
    const spacer = container.querySelector('.overflow-auto > [data-workarea-dock-spacer]') as HTMLElement;
    expect(spacer.className).toContain('h-[var(--dock-height,0px)]');
    expect(region.style.getPropertyValue('--dock-height')).toMatch(/px$/);
    // The dock keeps its overlay look but sits in the floating layer's flow.
    const dock = screen.getByRole('region', { name: 'Work' });
    expect(dock.dataset.placement).toBe('overlay');
    expect(dock.className).toMatch(/relative/);
    expect(dock.className).not.toMatch(/absolute/);
    expect(dock.className).toMatch(/bg-gradient-to-t/);
  });

  it('keeps the footer a pinned row by default', () => {
    const { container } = render(<WorkArea footer={<div>prompt</div>}>body</WorkArea>);
    expect(container.querySelector('[data-workarea-float-region]')).toBeNull();
    expect(container.querySelector('[data-workarea-dock-spacer]')).toBeNull();
    expect((container.querySelector('[data-workarea-footer]') as HTMLElement).className).not.toMatch(/absolute/);
  });

  it('renders body content', () => {
    render(<WorkArea data-testid="area"><p>body</p></WorkArea>);
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('omits the trail and toolbar rows when no slot is given', () => {
    render(<WorkArea data-testid="area"><p>body</p></WorkArea>);
    expect(screen.queryByRole('navigation', { name: 'Breadcrumb' })).not.toBeInTheDocument();
    expect(screen.queryByRole('toolbar')).not.toBeInTheDocument();
  });

  it('stacks trail, toolbar, body and status', () => {
    render(
      <WorkArea
        breadcrumbs={<Breadcrumbs items={[{ label: 'Operate', href: '/o' }, { label: 'Runs' }]} />}
        toolbar={<Toolbar aria-label="Run actions"><button type="button">Replay</button></Toolbar>}
        status={<span>1,204 spans</span>}
      >
        <p>body</p>
      </WorkArea>,
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('toolbar', { name: 'Run actions' })).toBeInTheDocument();
    expect(screen.getByText('1,204 spans')).toBeInTheDocument();
  });

  it('the body is the only scroll region', () => {
    const { container } = render(
      <WorkArea
        data-testid="area"
        breadcrumbs={<span>trail</span>}
        toolbar={<span>tools</span>}
      >
        <p>body</p>
      </WorkArea>,
    );
    const scrollers = container.querySelectorAll('.overflow-auto');
    expect(scrollers).toHaveLength(1);
    // min-h-0 is what makes it scroll instead of pushing the column taller.
    expect(scrollers[0].className).toContain('min-h-0');
  });

  it('padded by default, and drops the padding when asked', () => {
    const { rerender, container } = render(<WorkArea><p>body</p></WorkArea>);
    expect(container.querySelector('.overflow-auto')?.className).toContain('p-[var(--ui-page-gutter,1.5rem)]');
    rerender(<WorkArea padded={false}><p>body</p></WorkArea>);
    expect(container.querySelector('.overflow-auto')?.className).not.toContain('p-[var(--ui-page-gutter,1.5rem)]');
  });

  it('bodyClassName lands on the scroller, not the column', () => {
    const { container } = render(
      <WorkArea data-testid="area" bodyClassName="grid"><p>body</p></WorkArea>,
    );
    expect(container.querySelector('.overflow-auto')?.className).toContain('grid');
    expect(screen.getByTestId('area').className).not.toContain('grid');
  });

  it('paints in the code family when tone="code"', () => {
    render(<WorkArea tone="code" data-testid="area"><p>body</p></WorkArea>);
    expect(screen.getByTestId('area').className).toContain('bg-code-bg');
  });
});
