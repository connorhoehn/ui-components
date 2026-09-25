import { render, screen } from '@testing-library/react';
import { ConversationShelf } from '../ConversationShelf';

describe('ConversationShelf plain (2.389.2)', () => {
  const items = [{ id: 'all', label: 'All documents' }, { id: 'recent', label: 'Recent' }];

  it('draws no icon slot, and tints the selected row like the folder tree', () => {
    render(<ConversationShelf compact plain size="md" items={items} activeId="all" onSelect={() => {}} data-testid="views" />);
    const active = screen.getByTestId('views-all');
    expect(active.querySelector('[aria-hidden]')).toBeNull();
    expect(active.className).toContain('bg-primary-bg');
    expect(active.className).toContain('border-primary');
    expect(screen.getByTestId('views-recent').className).not.toContain('bg-primary-bg');
  });
});
