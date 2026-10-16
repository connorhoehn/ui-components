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

describe('EmptyState density="compact"', () => {
  it('leaves the default block untouched', () => {
    render(<EmptyState title="No items found" />);
    expect(screen.getByTestId('empty-state').className).toContain('min-h-[220px]');
  });

  it('reserves no block height', () => {
    render(<EmptyState title="No items." density="compact" />);
    const el = screen.getByTestId('empty-state');
    expect(el.className).not.toContain('min-h-[220px]');
    expect(el.className).not.toContain('flex-col');
  });

  it('lays the title and description out on one line', () => {
    render(<EmptyState title="No items." description="Add one to begin." density="compact" />);
    const el = screen.getByTestId('empty-state');
    expect(el.className).toContain('flex-row');
    expect(el).toHaveTextContent('No items.Add one to begin.');
  });

  it('renders the single line at caption size in the quiet colour', () => {
    render(<EmptyState title="No items." density="compact" />);
    expect(screen.getByTestId('empty-state').className).toContain('text-[13px]');
    expect(screen.getByText('No items.').className).toContain('text-text-tertiary');
  });

  it('takes the caller class, which is how the italic line is reproduced', () => {
    render(<EmptyState title="No items." density="compact" className="italic" />);
    expect(screen.getByTestId('empty-state').className).toContain('italic');
  });

  it('still overrides size=sm, which is a smaller block rather than a line', () => {
    render(<EmptyState title="No items." density="compact" size="sm" />);
    expect(screen.getByTestId('empty-state').className).not.toContain('flex-col');
  });
});

describe('EmptyState size="sm" is the app body step (2.436.1)', () => {
  it('draws a 14/600 title, a 14px description, a Button-sm CTA and a 14px details heading', () => {
    const onAction = vi.fn();
    render(<EmptyState size="sm" align="start" title="Ask an admin" description="One line of explanation."
      actionLabel="Open Calls" onAction={onAction} actionTestId="cta" details={{ title: 'How this works', body: 'More.' }} />);
    expect(screen.getByText('Ask an admin').className).toContain('text-[14px]');
    const description = screen.getByText('One line of explanation.').className;
    expect(description).toContain('text-sm');
    expect(description).not.toContain('text-[13px]');
    const cta = screen.getByTestId('cta').className;
    expect(cta).toContain('h-6.5');
    expect(cta).toContain('text-xs');
    expect(cta).not.toContain('py-[9px]');
    fireEvent.click(screen.getByTestId('cta'));
    expect(onAction).toHaveBeenCalledOnce();
    expect(screen.getByText('How this works').className).toContain('text-sm');
  });

  it('leaves md unchanged: 13px centred description and the padded CTA', () => {
    render(<EmptyState title="Empty" description="Body." actionLabel="Go" onAction={() => {}} actionTestId="cta" />);
    expect(screen.getByText('Body.').className).toContain('text-[13px]');
    expect(screen.getByTestId('cta').className).toContain('py-[9px]');
  });

  it('renders a link-variant action at the 14px control size', () => {
    render(<EmptyState title="Nothing yet" actions={[{ label: 'Show everyone', onClick: () => {}, variant: 'link' }]} />);
    const cls = screen.getByTestId('empty-state-actions-button').className;
    expect(cls).toContain('text-sm');
    expect(cls).not.toContain('text-base');
  });
});
