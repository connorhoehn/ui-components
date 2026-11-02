import { render, screen } from '@testing-library/react';
import { Text, T } from '../Text';

describe('Text', () => {
  it('renders as a span by default with the given className', () => {
    render(<Text className="text-xs text-text-tertiary">Hello</Text>);
    const el = screen.getByText('Hello');
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveClass('text-xs', 'text-text-tertiary');
  });

  it('renders as the element passed to `as`', () => {
    render(<Text as="p" className="text-sm">Paragraph</Text>);
    expect(screen.getByText('Paragraph').tagName).toBe('P');
  });

  it('renders as an li when as="li"', () => {
    render(<Text as="li">Item</Text>);
    expect(screen.getByText('Item').tagName).toBe('LI');
  });

  it('forwards aria-hidden and onClick', () => {
    const onClick = vi.fn();
    render(
      <Text aria-hidden="true" onClick={onClick} data-testid="clickable">
        click me
      </Text>,
    );
    const el = screen.getByTestId('clickable');
    expect(el).toHaveAttribute('aria-hidden', 'true');
    el.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards title, role and aria-label', () => {
    render(
      <Text title="full text" role="note" aria-label="a note">
        short
      </Text>,
    );
    const el = screen.getByRole('note');
    expect(el).toHaveAttribute('title', 'full text');
    expect(el).toHaveAttribute('aria-label', 'a note');
  });

  it('keeps wrapped prose and inline marks in a single flow', () => {
    render(<Text wrap data-testid="prose">Expect <code>ready</code>, then continue.</Text>);
    const prose = screen.getByTestId('prose');
    expect(prose.children).toHaveLength(1);
    expect(prose.firstElementChild?.textContent).toBe('Expect ready, then continue.');
    expect(prose.firstElementChild?.tagName).toBe('SPAN');
  });

  it('exports T as an alias for Text', () => {
    expect(T).toBe(Text);
  });
});
