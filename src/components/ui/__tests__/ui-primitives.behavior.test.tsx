// The existing ui-primitives suite covers "does it render". This one covers
// the decisions these atoms make on the caller's behalf, which is where a
// consumer actually gets bitten: a Button that defaults to type="button" is
// the only thing stopping every button inside a <form> from submitting it;
// `cn()` has to let a caller's className WIN over the built-in one or theming
// is impossible; and TableTh only paints a sort arrow when it is both
// sortable and has a direction, so a column that forgets one of the two
// silently shows an unsorted-looking header on sorted data.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../Button';
import { Card } from '../Card';
import { IconButton } from '../IconButton';
import { PageSection } from '../PageSection';
import { Table, TableHead, TableBody, TableRow, TableTh, TableTd } from '../Table';

describe('Button form semantics', () => {
  it('never submits an enclosing form unless asked to', () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(<form onSubmit={onSubmit}><Button>Do a thing</Button></form>);
    fireEvent.click(screen.getByRole('button'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('honours an explicit type=submit', () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(<form onSubmit={onSubmit}><Button type="submit">Save</Button></form>);
    fireEvent.click(screen.getByRole('button'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('a disabled button cannot fire its handler', () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Nope</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('Button styling contract', () => {
  it('carries exactly one cursor affordance, matching the disabled state', () => {
    const { rerender } = render(<Button>Go</Button>);
    expect(screen.getByRole('button')).toHaveClass('cursor-pointer');
    expect(screen.getByRole('button').className).not.toContain('cursor-not-allowed');

    rerender(<Button disabled>Go</Button>);
    expect(screen.getByRole('button')).toHaveClass('cursor-not-allowed', 'opacity-50');
    expect(screen.getByRole('button').className).not.toContain('cursor-pointer');
  });

  it.each([
    ['primary', 'bg-primary'],
    ['secondary', 'bg-surface-inset'],
    ['ghost', 'bg-transparent'],
    ['danger', 'text-danger-fg'],
    ['danger-solid', 'bg-danger'],
  ] as const)('the %s variant resolves to a token class, never a raw colour', (variant, cls) => {
    render(<Button variant={variant}>x</Button>);
    expect(screen.getByRole('button')).toHaveClass(cls);
    expect(screen.getByRole('button').className).not.toMatch(/#[0-9a-f]{3,6}/i);
  });

  it('lets a caller override the variant background rather than merely appending', () => {
    render(<Button variant="primary" className="bg-surface">x</Button>);
    const el = screen.getByRole('button');
    expect(el).toHaveClass('bg-surface');
    // `cn()` drops the conflicting base class outright — the hover variant is
    // a different utility and legitimately survives.
    expect(el.classList.contains('bg-primary')).toBe(false);
    expect(el).toHaveClass('hover:bg-primary-hover');
  });

  it('forwards arbitrary button attributes to the DOM node', () => {
    render(<Button aria-pressed="true" data-testid="tgl">x</Button>);
    expect(screen.getByTestId('tgl')).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('Card padding', () => {
  it('defaults to no padding so it can wrap its own layout', () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild).not.toHaveClass('p-4', 'p-6', 'p-8');
  });

  it.each([['sm', 'p-4'], ['md', 'p-6'], ['lg', 'p-8']] as const)(
    '%s padding maps to %s',
    (padding, cls) => {
      const { container } = render(<Card padding={padding}>x</Card>);
      expect(container.firstChild).toHaveClass(cls);
    },
  );

  it('renders as an empty shell when given no children', () => {
    const { container } = render(<Card data-testid="empty" />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});

describe('IconButton content resolution', () => {
  it('prefers the icon prop over children when both are supplied', () => {
    render(<IconButton aria-label="Edit" icon={<span>ICON</span>}><span>CHILD</span></IconButton>);
    expect(screen.getByRole('button')).toHaveTextContent('ICON');
    expect(screen.getByRole('button')).not.toHaveTextContent('CHILD');
  });

  it('falls back to children when icon is null, not just when it is absent', () => {
    render(<IconButton aria-label="Edit" icon={null}><span>CHILD</span></IconButton>);
    expect(screen.getByRole('button')).toHaveTextContent('CHILD');
  });

  it('is always type=button, so it is safe inside a form', () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(<form onSubmit={onSubmit}><IconButton aria-label="Close">×</IconButton></form>);
    fireEvent.click(screen.getByRole('button'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('a disabled icon button neither fires nor claims to be clickable', () => {
    const onClick = vi.fn();
    render(<IconButton aria-label="Close" disabled onClick={onClick}>×</IconButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button').className).not.toContain('cursor-pointer');
  });

  it.each([['sm', 'w-6'], ['md', 'w-8'], ['lg', 'w-10']] as const)(
    'size %s pins a square footprint',
    (size, cls) => {
      render(<IconButton aria-label="x" size={size}>×</IconButton>);
      expect(screen.getByRole('button')).toHaveClass(cls);
    },
  );
});

describe('PageSection header', () => {
  it('renders the title as the page-level h1, not a generic div', () => {
    render(<PageSection title="Settings">body</PageSection>);
    expect(screen.getByRole('heading', { level: 1, name: 'Settings' })).toBeInTheDocument();
  });

  it('omits the actions container entirely when no actions are given', () => {
    const { container } = render(<PageSection title="T">body</PageSection>);
    const header = container.querySelector('section > div')!;
    expect(header.children).toHaveLength(1);
  });
});

describe('TableTh sort affordance', () => {
  const renderTh = (props: Partial<React.ComponentProps<typeof TableTh>>) =>
    render(<table><thead><tr><TableTh {...props}>Name</TableTh></tr></thead></table>);

  it('shows an up arrow only for an ascending sortable column', () => {
    renderTh({ sortable: true, sortDirection: 'asc' });
    expect(screen.getByRole('columnheader')).toHaveTextContent('↑');
  });

  it('shows a down arrow for descending', () => {
    renderTh({ sortable: true, sortDirection: 'desc' });
    expect(screen.getByRole('columnheader')).toHaveTextContent('↓');
  });

  it('shows nothing for a sortable column that is not currently the sort key', () => {
    renderTh({ sortable: true, sortDirection: null });
    expect(screen.getByRole('columnheader').textContent).toBe('Name');
  });

  it('shows nothing for a direction on a non-sortable column', () => {
    renderTh({ sortDirection: 'asc' });
    expect(screen.getByRole('columnheader').textContent).toBe('Name');
    expect(screen.getByRole('columnheader').className).not.toContain('cursor-pointer');
  });

  it('a sortable header advertises itself as clickable and can be activated', () => {
    const onClick = vi.fn();
    render(<table><thead><tr><TableTh sortable onClick={onClick}>Name</TableTh></tr></thead></table>);
    expect(screen.getByRole('columnheader').className).toContain('cursor-pointer');
    fireEvent.click(screen.getByRole('columnheader'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('TableRow interactivity', () => {
  it('only a clickable row advertises a pointer', () => {
    render(
      <Table>
        <TableHead><TableRow><TableTh>H</TableTh></TableRow></TableHead>
        <TableBody>
          <TableRow clickable><TableTd>a</TableTd></TableRow>
          <TableRow><TableTd>b</TableTd></TableRow>
        </TableBody>
      </Table>,
    );
    const [, clickable, plain] = screen.getAllByRole('row');
    expect(clickable.className).toContain('cursor-pointer');
    expect(plain.className).not.toContain('cursor-pointer');
  });

  it('forwards onClick to the row element itself', () => {
    const onClick = vi.fn();
    render(<table><tbody><TableRow clickable onClick={onClick}><TableTd>a</TableTd></TableRow></tbody></table>);
    fireEvent.click(screen.getByRole('row'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
