import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { StatusPill } from '../StatusPill';
import { FileKindMark, FILE_KIND_LABELS, type FileKind } from '../FileKindMark';

afterEach(cleanup);

describe('StatusPill meta and variants (2.380.0)', () => {
  it('renders meta after the label as "· <meta>" in the tertiary ink', () => {
    render(<StatusPill state="warning" label="1 of 5 failed" meta="29m ago" data-testid="pill" />);
    const pill = screen.getByTestId('pill');
    expect(pill).toHaveTextContent('1 of 5 failed· 29m ago');
    const meta = screen.getByTestId('pill-meta');
    expect(meta.className).toContain('text-text-tertiary');
    expect(meta.className).toContain('font-normal');
    // The separator is decoration; AT reads "1 of 5 failed 29m ago".
    expect(meta.querySelector('[aria-hidden="true"]')).toHaveTextContent('·');
  });

  it('renders no meta node without meta', () => {
    render(<StatusPill state="success" label="Published" data-testid="pill" />);
    expect(screen.queryByTestId('pill-meta')).not.toBeInTheDocument();
  });

  it.each([
    ['success', 'text-success-fg', 'bg-success'],
    ['warning', 'text-warning-fg', 'bg-warning'],
    ['danger', 'text-danger-fg', 'bg-danger'],
    ['error', 'text-danger-fg', 'bg-danger'],
    ['neutral', 'text-text-primary', 'bg-surface-emphasis'],
  ] as const)('paints %s with its tone', (state, text, dot) => {
    render(<StatusPill state={state} label="x" data-testid="pill" />);
    const pill = screen.getByTestId('pill');
    expect(pill).toHaveAttribute('data-state', state);
    expect(pill.className).toContain(text);
    expect(pill.querySelector(`.${dot}`)).not.toBeNull();
  });

  it('variant="text" drops the box but keeps the dot, the colour and the meta', () => {
    render(<StatusPill variant="text" state="danger" label="Failed" meta="10h ago" data-testid="pill" />);
    const pill = screen.getByTestId('pill');
    expect(pill).toHaveAttribute('data-variant', 'text');
    expect(pill.className).not.toContain('border');
    expect(pill.className).not.toContain('bg-danger-bg');
    expect(pill.className).toContain('text-danger-fg');
    expect(pill.querySelector('.bg-danger')).not.toBeNull();
    expect(screen.getByTestId('pill-meta')).toHaveTextContent('10h ago');
  });

  it('accepts tone as the name of state, so a {tone,label,meta} spec spreads in', () => {
    const spec = { tone: 'warning' as const, label: '1 of 5 failed', meta: '29m ago' };
    render(<StatusPill variant="text" {...spec} data-testid="pill" />);
    expect(screen.getByTestId('pill')).toHaveAttribute('data-state', 'warning');
    expect(screen.getByTestId('pill')).toHaveTextContent('1 of 5 failed· 29m ago');
  });

  it('defaults to the bordered pill', () => {
    render(<StatusPill state="success" label="Published" data-testid="pill" />);
    expect(screen.getByTestId('pill')).toHaveAttribute('data-variant', 'pill');
    expect(screen.getByTestId('pill').className).toContain('rounded-full');
  });
});

describe('FileKindMark pipeline kinds (2.380.0)', () => {
  const NEW: FileKind[] = ['agent', 'experiment', 'call', 'conversation', 'media', 'workflow'];

  it.each(NEW)('renders the %s kind with a glyph and a label', (kind) => {
    render(<FileKindMark kind={kind} label={FILE_KIND_LABELS[kind]} />);
    const mark = screen.getByRole('img', { name: FILE_KIND_LABELS[kind] });
    expect(mark).toHaveAttribute('data-kind', kind);
    expect(mark.querySelector('svg')).not.toBeNull();
  });

  it('keeps the six original kinds', () => {
    (['page', 'presentation', 'recording', 'transcript', 'diagram', 'folder'] as FileKind[]).forEach((kind) => {
      expect(FILE_KIND_LABELS[kind]).toBeTruthy();
    });
  });

  it('variant="plain" drops the tinted box', () => {
    render(<FileKindMark kind="agent" variant="plain" data-testid="mark" />);
    const mark = screen.getByTestId('mark');
    expect(mark).toHaveAttribute('data-variant', 'plain');
    expect(mark.className).toContain('bg-transparent');
    expect(mark.className).not.toContain('bg-accent-bg');
  });

  it('defaults to tinted', () => {
    render(<FileKindMark kind="agent" data-testid="mark" />);
    expect(screen.getByTestId('mark')).toHaveAttribute('data-variant', 'tinted');
    expect(screen.getByTestId('mark').className).toContain('bg-accent-bg');
  });
});
