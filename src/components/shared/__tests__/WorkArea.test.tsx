import { render, screen } from '@testing-library/react';
import { WorkArea } from '../WorkArea';
import { Breadcrumbs } from '../Breadcrumbs';
import { Toolbar } from '../Toolbar';

describe('WorkArea', () => {
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
