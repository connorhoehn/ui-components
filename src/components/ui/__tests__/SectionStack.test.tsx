import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionStack } from '../SectionStack';
import { PageSection } from '../PageSection';
import { DensityProvider } from '../../shared/Density';

describe('SectionStack', () => {
  it('draws a rule between each pair of children, never before the first or after the last', () => {
    const { container } = render(
      <SectionStack data-testid="stack">
        <p>One</p>
        <p>Two</p>
        <p>Three</p>
      </SectionStack>,
    );
    const stack = screen.getByTestId('stack');
    const kids = [...stack.children];
    expect(kids.map((k) => k.tagName)).toEqual(['P', 'HR', 'P', 'HR', 'P']);
    expect(container.querySelectorAll('hr[data-ui-section-rule]')).toHaveLength(2);
    expect(kids[1]).toHaveClass('border-t', 'border-border', 'w-full');
    expect(stack).toHaveAttribute('data-ui-section-stack', 'comfortable');
    expect(stack).toHaveClass('flex', 'flex-col', 'gap-6');
  });

  it('skips null, false and undefined children (no orphan or doubled rule)', () => {
    const hidden = false;
    render(
      <SectionStack data-testid="stack">
        {null}
        <PageSection size="md" title="Overview"><p>a</p></PageSection>
        {hidden && <PageSection size="md" title="Hidden" />}
        {undefined}
        <PageSection size="md" title="Runs"><p>b</p></PageSection>
        {false}
      </SectionStack>,
    );
    const kids = [...screen.getByTestId('stack').children];
    expect(kids.map((k) => k.tagName)).toEqual(['SECTION', 'HR', 'SECTION']);
    expect(screen.queryByText('Hidden')).toBeNull();
  });

  it('one child draws no rule; no children renders an empty stack', () => {
    const { container, rerender } = render(<SectionStack><p>Only</p></SectionStack>);
    expect(container.querySelector('hr')).toBeNull();
    rerender(<SectionStack>{null}</SectionStack>);
    expect(container.querySelector('[data-ui-section-stack]')!.children).toHaveLength(0);
  });

  it('density="compact" tightens the rhythm to 16px', () => {
    render(<SectionStack density="compact" data-testid="stack"><p>a</p><p>b</p></SectionStack>);
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('gap-4');
    expect(stack).not.toHaveClass('gap-6');
    expect(stack).toHaveAttribute('data-ui-section-stack', 'compact');
  });

  it('follows the DensityProvider when density is unset; an explicit density wins', () => {
    render(
      <DensityProvider density="compact">
        <SectionStack data-testid="inherited"><p>a</p><p>b</p></SectionStack>
        <SectionStack density="comfortable" data-testid="explicit"><p>a</p><p>b</p></SectionStack>
      </DensityProvider>,
    );
    expect(screen.getByTestId('inherited')).toHaveClass('gap-4');
    expect(screen.getByTestId('explicit')).toHaveClass('gap-6');
  });

  it('divided={false} keeps the section distance without rules', () => {
    const { container, rerender } = render(<SectionStack divided={false} data-testid="stack"><p>a</p><p>b</p></SectionStack>);
    expect(container.querySelector('hr')).toBeNull();
    expect(screen.getByTestId('stack')).toHaveClass('gap-12');
    expect(screen.getByTestId('stack')).toHaveAttribute('data-divided', 'false');
    rerender(<SectionStack divided={false} density="compact" data-testid="stack"><p>a</p><p>b</p></SectionStack>);
    expect(screen.getByTestId('stack')).toHaveClass('gap-8');
  });

  it('renders as a section with aria passthrough and merges className', () => {
    render(
      <SectionStack as="section" aria-label="Overview" id="ov" className="px-4">
        <p>a</p>
      </SectionStack>,
    );
    const region = screen.getByRole('region', { name: 'Overview' });
    expect(region.tagName).toBe('SECTION');
    expect(region).toHaveAttribute('id', 'ov');
    expect(region).toHaveClass('px-4', 'flex-col');
  });
});
