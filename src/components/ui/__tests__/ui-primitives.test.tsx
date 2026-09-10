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
