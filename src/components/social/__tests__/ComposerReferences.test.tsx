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

describe('a reference with a menu (2.389.0)', () => {
  const guide = (onSelect: () => void, onNone = () => {}) => ({
    id: 'guide',
    label: 'This guide',
    menu: [{ items: [
      { label: 'This guide', active: true, onSelect: () => {} },
      { label: 'This guide + sources', onSelect },
      { label: 'No context', onSelect: onNone },
    ] }],
  });

  it('is a menu trigger (label + chevron) with no remove button, even with onRemove', async () => {
    const onRemove = vi.fn();
    const onSelect = vi.fn();
    render(<ComposerReferences references={[guide(onSelect)]} onRemove={onRemove} />);
    expect(screen.queryByTestId('composer-references-remove')).toBeNull();
    const trigger = screen.getByRole('button', { name: 'This guide' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveTextContent('This guide');
    expect(trigger.querySelectorAll('svg').length).toBeGreaterThanOrEqual(2); // glyph + chevron
    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole('menuitem', { name: 'This guide + sources' }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onRemove).not.toHaveBeenCalled();
  });

  it('menuLabel names the trigger', () => {
    render(<ComposerReferences references={[{ ...guide(() => {}), menuLabel: 'Context for this question' }]} />);
    expect(screen.getByRole('button', { name: 'Context for this question' })).toBeInTheDocument();
  });

  it('a chip without a menu is unchanged', () => {
    render(<ComposerReferences references={[reference]} onRemove={() => {}} />);
    expect(screen.getByTestId('composer-references-remove')).toBeInTheDocument();
    expect(screen.queryByTestId('composer-references-menu-trigger')).toBeNull();
  });
});
