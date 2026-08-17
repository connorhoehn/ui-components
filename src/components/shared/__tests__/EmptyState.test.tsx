import { render, screen, fireEvent, act } from '@testing-library/react';
import EmptyState, { type EmptyStateAction } from '../EmptyState';

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No items found" />);
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<EmptyState icon="📭" title="Empty inbox" />);
    expect(screen.getByText('📭')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <EmptyState title="No results" body="Try adjusting your search filters." />
    );
    expect(screen.getByText('Try adjusting your search filters.')).toBeInTheDocument();
  });

  it('renders action button when actionLabel and onAction are provided', () => {
    const onAction = vi.fn();
    render(
      <EmptyState
        title="No items"
        actionLabel="Create New"
        onAction={onAction}
      />
    );
    const button = screen.getByTestId('empty-state-action');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Create New');
  });

  it('calls onAction when action button is clicked', () => {
    const onAction = vi.fn();
    render(
      <EmptyState
        title="No items"
        actionLabel="Create New"
        onAction={onAction}
      />
    );
    fireEvent.click(screen.getByTestId('empty-state-action'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('does not render action button when only actionLabel is provided without onAction', () => {
    render(<EmptyState title="No items" actionLabel="Create New" />);
    expect(screen.queryByTestId('empty-state-action')).not.toBeInTheDocument();
  });

  it('uses custom testId', () => {
    render(<EmptyState title="Empty" testId="custom-empty" />);
    expect(screen.getByTestId('custom-empty')).toBeInTheDocument();
  });

  // ── Guided multi-action API (blocker #54 / handoff #470) ────────────

  it('renders a single guided action via actions[] as a primary button', () => {
    const onClick = vi.fn();
    const actions: EmptyStateAction[] = [{ label: 'Run a test invocation', onClick }];
    render(<EmptyState title="No invocations yet" actions={actions} />);
    const list = screen.getByTestId('empty-state-actions');
    expect(list).toBeInTheDocument();
    const buttons = screen.getAllByTestId('empty-state-actions-button');
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveTextContent('Run a test invocation');
    fireEvent.click(buttons[0]);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders multiple guided actions with first defaulting to primary, rest secondary', () => {
    const actions: EmptyStateAction[] = [
      { label: 'Run a test invocation', onClick: () => {} },
      { label: 'Read the docs', href: 'https://example.com/docs' },
    ];
    render(<EmptyState title="No invocations" actions={actions} />);
    const button = screen.getByTestId('empty-state-actions-button');
    const link = screen.getByTestId('empty-state-actions-link');
    expect(button).toHaveTextContent('Run a test invocation');
    expect(link).toHaveTextContent('Read the docs');
    expect(link).toHaveAttribute('href', 'https://example.com/docs');
  });

  it('renders external links with target=_blank rel=noopener and a sr-only hint', () => {
    const actions: EmptyStateAction[] = [
      { label: 'Docs', href: 'https://example.com/docs', external: true },
    ];
    render(<EmptyState title="No docs" actions={actions} />);
    const link = screen.getByTestId('empty-state-actions-link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveTextContent('(opens in new tab)');
  });

  it('renders a copyable code block underneath the action when `code` is set', () => {
    const actions: EmptyStateAction[] = [
      { label: 'Run', onClick: () => {}, code: 'agentcore invoke --agent x' },
    ];
    render(<EmptyState title="No runs" actions={actions} />);
    const code = screen.getByTestId('empty-state-action-code');
    expect(code).toHaveTextContent('agentcore invoke --agent x');
    const copy = screen.getByTestId('empty-state-action-code-copy');
    expect(copy).toHaveAccessibleName('Copy code to clipboard');
  });

  it('copies the snippet to the clipboard when Copy is clicked', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    const actions: EmptyStateAction[] = [
      { label: 'Run', onClick: () => {}, code: 'agentcore invoke --agent x' },
    ];
    render(<EmptyState title="No runs" actions={actions} />);
    const copy = screen.getByTestId('empty-state-action-code-copy');
    await act(async () => {
      fireEvent.click(copy);
    });
    expect(writeText).toHaveBeenCalledWith('agentcore invoke --agent x');
    expect(copy).toHaveAccessibleName('Copied to clipboard');
    expect(copy).toHaveTextContent('Copied');
  });

  it('actions[] takes precedence over a single `action` ReactNode', () => {
    render(
      <EmptyState
        title="No items"
        action={<button data-testid="legacy-action">Legacy</button>}
        actions={[{ label: 'New world', onClick: () => {} }]}
      />,
    );
    expect(screen.getByTestId('empty-state-actions')).toBeInTheDocument();
    expect(screen.queryByTestId('legacy-action')).not.toBeInTheDocument();
  });

  it('falls back to the legacy actionLabel/onAction when actions is empty', () => {
    const onAction = vi.fn();
    render(
      <EmptyState
        title="No items"
        actions={[]}
        actionLabel="Legacy CTA"
        onAction={onAction}
      />,
    );
    expect(screen.queryByTestId('empty-state-actions')).not.toBeInTheDocument();
    const legacy = screen.getByTestId('empty-state-action');
    fireEvent.click(legacy);
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('respects an explicit secondary variant on the first action', () => {
    const actions: EmptyStateAction[] = [
      { label: 'Skip for now', onClick: () => {}, variant: 'secondary' },
    ];
    render(<EmptyState title="No items" actions={actions} />);
    const button = screen.getByTestId('empty-state-actions-button');
    expect(button.className).toMatch(/border-border-emphasis/);
    expect(button.className).not.toMatch(/bg-primary/);
  });
});
