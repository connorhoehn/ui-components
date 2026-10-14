// The surface-family escape hatch on the shared primitives.
//
// Two things are being pinned, and the first matters more than the second:
//
//   1. The DEFAULT is unchanged. These are the library's highest-traffic
//      primitives; a re-tone that shifts the default appearance by one class
//      is a silent visual regression across every page that uses them.
//   2. The `code` family actually reaches the element that carries the
//      colour. Three of these (SearchInput's field, ConnectionPill's label,
//      EmptyState's whole body) sit on children a caller-supplied `className`
//      never touches — which is exactly why the prop had to exist rather than
//      the call sites passing classes.

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Chip from '../Chip';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import InlineAlert from '../InlineAlert';
import SearchInput from '../SearchInput';
import EmptyState from '../EmptyState';
import { ConnectionPill } from '../ConnectionPill';

describe('Chip palette', () => {
  it('keeps the app tokens by default', () => {
    render(<Chip tone="success" data-testid="chip">OK</Chip>);
    expect(screen.getByTestId('chip')).toHaveClass('bg-success-bg', 'text-success-fg');
  });

  it('paints soft chips in the code family', () => {
    render(<Chip tone="success" palette="code" data-testid="chip">OK</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('bg-code-surface', 'text-code-green');
    expect(chip).not.toHaveClass('bg-success-bg');
  });

  it('paints solid chips in the code family with dark text', () => {
    // White on a Catppuccin pastel fails contrast — the solid variant has to
    // invert the other way here.
    render(<Chip tone="danger" solid palette="code" data-testid="chip">Err</Chip>);
    expect(screen.getByTestId('chip')).toHaveClass('bg-code-red', 'text-code-bg');
  });

  it('re-tones the indicator dot too, not just the label', () => {
    render(<Chip tone="warning" dot="static" palette="code" data-testid="chip">Stale</Chip>);
    expect(screen.getByTestId('chip').querySelector('[aria-hidden]')).toHaveClass('bg-code-peach');
  });
});

describe('Button tone', () => {
  it('keeps the app tokens by default', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary', 'text-on-primary');
  });

  it('paints every variant in the code family', () => {
    const { rerender } = render(<Button tone="code">run</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-code-blue', 'text-code-bg');

    rerender(<Button tone="code" variant="secondary">detach</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-code-surface', 'text-code-text');

    rerender(<Button tone="code" variant="ghost">+ pane</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-code-text', 'border-code-border');

    rerender(<Button tone="code" variant="danger">kill</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-code-red');

    rerender(<Button tone="code" variant="danger-solid">destroy</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-code-red', 'text-code-bg');
  });

  it('leaves size and disabled behaviour alone', () => {
    render(<Button tone="code" size="sm" disabled>run</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('h-[var(--ui-control-sm,1.75rem)]', 'px-2.5', 'opacity-50');
    expect(btn).toBeDisabled();
  });
});

describe('IconButton tone', () => {
  it('keeps the app tokens by default', () => {
    render(<IconButton aria-label="Close">✕</IconButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent', 'text-text-secondary');
  });

  it('paints in the code family', () => {
    render(<IconButton aria-label="Close" tone="code">✕</IconButton>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('text-code-subtle');
    expect(btn).not.toHaveClass('text-text-primary');
  });
});

describe('InlineAlert palette', () => {
  it('keeps the app tokens by default', () => {
    render(<InlineAlert tone="error">boom</InlineAlert>);
    expect(screen.getByRole('alert').className).toContain('--color-danger-bg');
  });

  it('paints in the code family', () => {
    render(<InlineAlert tone="error" palette="code">boom</InlineAlert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-code-surface', 'border-code-red', 'text-code-red');
    expect(alert.className).not.toContain('--color-danger-bg');
  });

  it('keeps the aria wiring tied to severity, independent of the palette', () => {
    render(<InlineAlert tone="info" palette="code">fyi</InlineAlert>);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });
});

describe('SearchInput tone', () => {
  it('keeps the app tokens on the field by default', () => {
    render(<SearchInput value="" onChange={() => {}} aria-label="Search" />);
    expect(screen.getByLabelText('Search').className).toContain('--color-border-field');
  });

  // The bug this prop fixes: `className` lands on the wrapper, so no caller
  // could ever colour the field.
  it('reaches the input itself, not just the wrapper', () => {
    render(<SearchInput value="" onChange={() => {}} tone="code" aria-label="Search" />);
    const field = screen.getByLabelText('Search');
    expect(field).toHaveClass('bg-code-surface', 'text-code-text', 'border-code-border');
    expect(field.className).not.toContain('--color-border-field');
  });

  it('re-tones the clear button and the magnifier too', () => {
    const { container } = render(
      <SearchInput value="x" onChange={() => {}} tone="code" aria-label="Search" />,
    );
    expect(screen.getByRole('button', { name: 'Clear search' })).toHaveClass('text-code-muted');
    expect(container.querySelector('svg')).toHaveClass('text-code-muted');
  });

  it('still accepts a wrapper class, and now an input class as well', () => {
    render(
      <SearchInput
        value=""
        onChange={() => {}}
        className="w-72"
        inputClassName="font-mono"
        aria-label="Search"
      />,
    );
    expect(screen.getByLabelText('Search')).toHaveClass('font-mono');
  });
});

describe('EmptyState tone and className', () => {
  it('keeps the app tokens by default', () => {
    render(<EmptyState title="Nothing" />);
    expect(screen.getByTestId('empty-state')).toHaveClass('text-text-tertiary', 'min-h-[220px]');
    expect(screen.getByText('Nothing')).toHaveClass('text-neutral');
  });

  it('paints the title, body and CTA in the code family', () => {
    render(
      <EmptyState
        tone="code"
        title="No computers"
        description="Provision one and it opens in a pane."
        actionLabel="+ new"
        onAction={() => {}}
      />,
    );
    expect(screen.getByTestId('empty-state')).toHaveClass('text-code-muted');
    expect(screen.getByText('No computers')).toHaveClass('text-code-text');
    expect(screen.getByTestId('empty-state-action')).toHaveClass('bg-code-blue', 'text-code-bg');
  });

  it('reaches the guided actions and their code snippets', () => {
    render(
      <EmptyState
        tone="code"
        title="No runs"
        actions={[{ label: 'Start one', onClick: () => {}, code: 'lab run' }]}
      />,
    );
    expect(screen.getByTestId('empty-state-actions-button')).toHaveClass('bg-code-blue');
    expect(screen.getByTestId('empty-state-action-code')).toHaveClass('bg-code-bg');
  });

  // It had no `className` at all, which is the reason dark and cramped
  // surfaces hand-rolled their own placeholder instead of using it.
  it('accepts a className on the container', () => {
    render(<EmptyState title="Nothing" className="rounded bg-code-bg" />);
    expect(screen.getByTestId('empty-state')).toHaveClass('rounded', 'bg-code-bg');
  });
});

describe('ConnectionPill tone', () => {
  it('keeps the app tokens by default', () => {
    render(<ConnectionPill state="connected" />);
    expect(screen.getByText('Connected')).toHaveClass('text-success-fg');
  });

  // A wrapper className cannot reach these: the colour is on the dot and the
  // label, chosen by a per-state map.
  it('paints the label and the dot in the code family', () => {
    render(<ConnectionPill state="connected" tone="code" />);
    expect(screen.getByText('Connected')).toHaveClass('text-code-green');
    expect(screen.getByText('⬤')).toHaveClass('text-code-green');
  });

  it('covers every state in the code family', () => {
    const expected = {
      idle: 'text-code-muted',
      connecting: 'text-code-peach',
      connected: 'text-code-green',
      reconnecting: 'text-code-peach',
      disconnected: 'text-code-red',
    } as const;
    for (const [state, cls] of Object.entries(expected)) {
      const { unmount } = render(
        <ConnectionPill state={state as keyof typeof expected} tone="code" />,
      );
      expect(screen.getByText('⬤')).toHaveClass(cls);
      unmount();
    }
  });

  it('still renders an unrecognised state rather than throwing', () => {
    render(<ConnectionPill state={'closing' as never} tone="code" />);
    expect(screen.getByText('closing')).toBeInTheDocument();
  });
});
