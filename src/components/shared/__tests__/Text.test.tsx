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

  it('exports T as an alias for Text', () => {
    expect(T).toBe(Text);
  });
});
