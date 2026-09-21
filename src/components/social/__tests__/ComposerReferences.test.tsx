import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ComposerReferences } from '../ComposerReferences';

const reference = { id: 'wg:deck', label: 'Sprint review · v2 · Slide 4' };

describe('what a draft points at, above the editor', () => {
  it('is no row at all when there is nothing to point at', () => {
    const { container } = render(<ComposerReferences references={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('names each reference in full rather than counting them', () => {
    render(<ComposerReferences references={[reference, { id: 'wg:notes', label: 'Planning sync · 08:42' }]} />);
    const items = screen.getAllByTestId('composer-references-item');
    expect(items.map((item) => item.textContent)).toEqual([
      'Sprint review · v2 · Slide 4',
      'Planning sync · 08:42',
    ]);
  });

  it('removes by id, and offers no remove control without a handler', async () => {
    const onRemove = vi.fn();
    const view = render(<ComposerReferences references={[reference]} />);
    expect(screen.queryByTestId('composer-references-remove')).toBeNull();

    view.rerender(<ComposerReferences references={[reference]} onRemove={onRemove} />);
    await userEvent.click(screen.getByRole('button', { name: 'Remove Sprint review · v2 · Slide 4' }));
    expect(onRemove).toHaveBeenCalledWith('wg:deck');
  });

  it('renders a reference’s own glyph when it has one', () => {
    render(<ComposerReferences references={[{ ...reference, icon: '📄' }]} />);
    expect(screen.getByTestId('composer-references-item').textContent).toContain('📄');
  });
});
