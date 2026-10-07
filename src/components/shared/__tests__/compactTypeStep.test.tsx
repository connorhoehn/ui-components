// 2.429.0: `size="sm"` puts the overview composites on the app's body step
// (T size="sm" 14px / size="xs" 12px) instead of the mockup's 15–16px.
import { render, screen } from '@testing-library/react';
import { StatStrip } from '../StatStrip';
import { DetailSection } from '../DetailSection';
import { PageSection } from '../../ui/PageSection';
import { ActionRowList } from '../../work/ActionRowList';

describe('compact type step (size="sm")', () => {
  it('PageSection sm: 14px semibold h2 and a 12px count', () => {
    render(<PageSection size="sm" title="Needs attention" count={1} countTone="primary" data-testid="s">x</PageSection>);
    const h = screen.getByRole('heading', { level: 2 });
    expect(h.className).toContain('text-sm');
    expect(h.className).not.toContain('text-[16px]');
    expect(screen.getByTestId('s-count').className).toContain('text-xs');
    expect(screen.getByTestId('s').getAttribute('data-size')).toBe('sm');
  });

  it('PageSection md keeps 16px', () => {
    render(<PageSection size="md" title="Up next">x</PageSection>);
    expect(screen.getByRole('heading', { level: 2 }).className).toContain('text-[16px]');
  });

  it('DetailSection heading sm: 14px title, 12px description', () => {
    render(<DetailSection variant="heading" size="sm" title="Discussion" description="Lead" data-testid="d">x</DetailSection>);
    expect(screen.getByRole('heading', { level: 3 }).className).toContain('text-sm');
    expect(screen.getByTestId('d-description').className).toContain('text-xs');
  });

  it('ActionRowList sm: 14px medium title, 12px description, 14px cells', () => {
    render(<ActionRowList size="sm" action="Open" columns={[{ id: 'p', width: 'xs' }]} items={[{ id: 'a', title: 'Row', description: 'Why', cells: { p: '2 pts' } }]} />);
    const title = screen.getByText('Row');
    expect(title.className).toContain('text-sm');
    expect(title.className).toContain('font-medium');
    expect(screen.getByTestId('action-row-description').className).toContain('text-xs');
    expect(screen.getByTestId('action-row-cell-p').className).toContain('text-sm');
    expect(screen.getByTestId('action-row-action').className).toContain('text-sm');
  });

  it('StatStrip line sm: 14px values and labels', () => {
    render(<StatStrip variant="line" size="sm" items={[{ label: 'agents running', value: 2 }, { label: 'spent', value: '$1' }]} />);
    expect(screen.getByText('2').className).toContain('text-sm');
    expect(screen.getByText('agents running').className).toContain('text-sm');
    expect(screen.getByTestId('stat-strip-separator').className).toContain('text-sm');
  });
});
