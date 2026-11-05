import { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';
import { Card } from '../Card';
import { IconButton } from '../IconButton';
import { PageSection } from '../PageSection';
import { Table, TableHead, TableBody, TableRow, TableTh, TableTd } from '../Table';

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('defaults to type=button', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('passes disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick handler', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies fullWidth when set', () => {
    render(<Button fullWidth>Wide</Button>);
    expect(screen.getByRole('button').className).toContain('w-full');
  });

  it('defaults to the primary variant classes unchanged', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button').className).toContain('bg-primary');
  });

  it('applies the success variant using the success tokens', () => {
    render(<Button variant="success">Approve</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('text-success-fg');
    expect(btn.className).toContain('border-success-border');
    expect(btn.className).toContain('hover:bg-success-bg');
  });

  it('applies the success variant in the code tone family', () => {
    render(<Button variant="success" tone="code">Approve</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('text-code-green');
    expect(btn.className).toContain('border-code-green/40');
  });

  it('applies the info variant as a solid info fill', () => {
    render(<Button variant="info">Learn more</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-info');
    expect(btn.className).toContain('text-white');
    expect(btn.className).toContain('hover:bg-info/90');
  });

  it('applies the info variant in the code tone family', () => {
    render(<Button variant="info" tone="code">Learn more</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-code-blue');
    expect(btn.className).toContain('text-code-bg');
  });

  it('renders the link variant with no border, no background and no fixed padding', () => {
    render(<Button variant="link">Cancel</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-transparent');
    expect(btn.className).toContain('border-none');
    expect(btn.className).toContain('p-0');
    expect(btn.className).toContain('hover:underline');
    // sizeClasses' fixed padding/text-size never applies to `link`.
    expect(btn.className).not.toMatch(/\bpx-4\b/);
    expect(btn.className).not.toMatch(/\btext-sm\b/);
  });

  it('does not change the base classes of non-link variants', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button').className).toContain('whitespace-nowrap');
  });
});

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies md padding class', () => {
    const { container } = render(<Card padding="md">Content</Card>);
    expect(container.firstChild).toHaveClass('p-6');
  });

  it('accepts extra className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('gives the caller its underlying node', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBe(container.firstChild);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('does not leak a `ref` attribute onto the DOM', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<Card ref={ref}>Content</Card>);
    expect((container.firstChild as HTMLElement).hasAttribute('ref')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// IconButton
// ---------------------------------------------------------------------------

describe('IconButton', () => {
  it('renders with aria-label', () => {
    render(<IconButton aria-label="Close dialog">×</IconButton>);
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });

  it('passes disabled state', () => {
    render(<IconButton aria-label="Disabled" disabled>×</IconButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders icon prop when provided', () => {
    render(<IconButton aria-label="Edit" icon={<span data-testid="icon">✏</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('calls onClick handler', () => {
    const onClick = vi.fn();
    render(<IconButton aria-label="Go" onClick={onClick}>→</IconButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// PageSection
// ---------------------------------------------------------------------------

describe('PageSection', () => {
  it('renders title', () => {
    render(<PageSection title="Settings">content</PageSection>);
    expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<PageSection title="T" description="Desc">content</PageSection>);
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it('does not render description when absent', () => {
    render(<PageSection title="T">content</PageSection>);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    render(
      <PageSection title="T" actions={<button>New</button>}>content</PageSection>,
    );
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<PageSection title="T"><span>body</span></PageSection>);
    expect(screen.getByText('body')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Table primitives
// ---------------------------------------------------------------------------

describe('Table primitives', () => {
  it('renders a full table structure', () => {
    render(
      <Table>
        <TableHead>
          <TableRow><TableTh>Name</TableTh><TableTh>Age</TableTh></TableRow>
        </TableHead>
        <TableBody>
          <TableRow clickable><TableTd>Alice</TableTd><TableTd>30</TableTd></TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('TableBody stripes its rows by default with the DataTable token (since 2.504.0)', () => {
    render(
      <Table>
        <TableHead><TableRow><TableTh>Name</TableTh></TableRow></TableHead>
        <TableBody>
          <TableRow clickable><TableTd>A</TableTd></TableRow>
          <TableRow className="bg-warning-callout"><TableTd>B</TableTd></TableRow>
        </TableBody>
      </Table>,
    );
    const [head, a, b] = screen.getAllByRole('row');
    // Header rows sit outside a TableBody and never band.
    expect(head!.className).not.toContain('bg-surface-inset');
    expect(a!.className).toContain('even:bg-surface-inset');
    // The stripe sorts before hover, so the clickable row still hovers.
    expect(a!.className).toContain('hover:bg-surface-panel');
    // A row with its own background keeps it.
    expect(b!.className).toContain('bg-warning-callout');
    expect(b!.className).not.toContain('bg-surface-inset');
  });

  it('TableBody striped={false} opts out', () => {
    render(
      <Table><TableBody striped={false}><TableRow><TableTd>A</TableTd></TableRow></TableBody></Table>,
    );
    expect(screen.getByRole('row').className).not.toContain('bg-surface-inset');
  });

  it('TableRow with clickable applies cursor-pointer', () => {
    render(
      <table><tbody>
        <TableRow clickable><td>Row</td></TableRow>
      </tbody></table>,
    );
    expect(screen.getByRole('row').className).toContain('cursor-pointer');
  });

  it('TableTh accepts extra className', () => {
    render(
      <table><thead><tr><TableTh className="text-right">Head</TableTh></tr></thead></table>,
    );
    expect(screen.getByRole('columnheader').className).toContain('text-right');
  });

  it('TableTd accepts extra className', () => {
    render(
      <table><tbody><tr><TableTd className="font-bold">Cell</TableTd></tr></tbody></table>,
    );
    expect(screen.getByRole('cell').className).toContain('font-bold');
  });
});

describe('Button ref', () => {
  it('gives the caller its underlying button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Go</Button>);
    expect(ref.current).toBe(screen.getByRole('button', { name: 'Go' }));
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // A menu trigger must be re-focusable after its panel closes; that is the
  // whole reason this prop exists.
  it('can be focused through the ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Menu</Button>);
    ref.current?.focus();
    expect(document.activeElement).toBe(ref.current);
  });

  it('does not leak a `ref` attribute onto the DOM', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>x</Button>);
    expect(screen.getByRole('button').hasAttribute('ref')).toBe(false);
  });
});
