import { render, screen } from '@testing-library/react';
import { Prose } from '../Prose';

describe('Prose', () => {
  it('renders its children', () => {
    render(
      <Prose>
        <h4>Heading</h4>
        <p>Body text.</p>
      </Prose>,
    );
    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText('Body text.')).toBeInTheDocument();
  });

  it('defaults to size="md" and no tone', () => {
    render(
      <Prose data-testid="prose">
        <h1>Title</h1>
      </Prose>,
    );
    const el = screen.getByTestId('prose');
    expect(el.className).toContain('text-sm');
    expect(el.className).toContain('[&_h1]:text-xl');
    expect(el.className).toContain('[&_h1]:text-text-primary');
    expect(el.className).toContain('[&_a]:text-primary');
  });

  it('tightens heading sizes under size="sm"', () => {
    render(
      <Prose size="sm" data-testid="prose">
        <h1>Title</h1>
      </Prose>,
    );
    const el = screen.getByTestId('prose');
    expect(el.className).toContain('text-[13px]');
    expect(el.className).toContain('[&_h1]:text-sm');
  });

  it('tints headings and links with the given tone', () => {
    render(
      <Prose tone="danger" data-testid="prose">
        <h2>Deprecated</h2>
      </Prose>,
    );
    const el = screen.getByTestId('prose');
    expect(el.className).toContain('[&_h2]:text-danger-fg');
    expect(el.className).toContain('[&_a]:text-danger-fg');
    expect(el.className).not.toContain('[&_h2]:text-text-primary');
  });

  it('folds the deprecated "purple" tone alias to accent', () => {
    render(
      <Prose tone="purple" data-testid="prose">
        <h2>Title</h2>
      </Prose>,
    );
    expect(screen.getByTestId('prose').className).toContain('[&_h2]:text-accent-fg');
  });

  it('keeps body text on the neutral token regardless of tone', () => {
    render(
      <Prose tone="success" data-testid="prose">
        <p>Body</p>
      </Prose>,
    );
    expect(screen.getByTestId('prose').className).toContain('text-text-primary');
  });

  it('styles pre/code so a nested code block does not double up with the inline-code chip', () => {
    render(
      <Prose data-testid="prose">
        <pre><code>const x = 1;</code></pre>
      </Prose>,
    );
    const el = screen.getByTestId('prose');
    expect(el.className).toContain('[&_pre]:bg-surface-inset');
    expect(el.className).toContain('[&_pre_code]:bg-transparent');
  });

  it('merges a custom className', () => {
    render(
      <Prose className="custom-prose" data-testid="prose">
        <p>x</p>
      </Prose>,
    );
    expect(screen.getByTestId('prose').className).toContain('custom-prose');
  });

  it('omits data-testid when not provided', () => {
    const { container } = render(
      <Prose>
        <p>x</p>
      </Prose>,
    );
    expect((container.firstChild as HTMLElement).hasAttribute('data-testid')).toBe(false);
  });
});
