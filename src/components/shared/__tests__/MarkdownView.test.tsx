import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MarkdownView } from '../MarkdownView';

afterEach(cleanup);

const TABLE_AND_CODE = `
| Dimension | Status |
| --- | --- |
| CI | Verified |
| CD | Claimed |

\`\`\`ts
export const answer = 42;
\`\`\`
`;

describe('MarkdownView', () => {
  it('renders a GFM table with header and data cells', () => {
    render(<MarkdownView markdown={TABLE_AND_CODE} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Dimension')).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  it('renders a fenced code block through CodeBlock', () => {
    const { container } = render(<MarkdownView markdown={TABLE_AND_CODE} />);
    // CodeBlock syntax-highlights the source into several <span> tokens, so
    // the phrase is split across siblings — assert on the block's combined
    // text rather than a single text node.
    const codeBlock = container.querySelector('[data-language="ts"]');
    expect(codeBlock).not.toBeNull();
    expect(codeBlock?.textContent).toContain('export const answer = 42;');
  });

  it('renders plain paragraphs', () => {
    render(<MarkdownView markdown="Just a paragraph." />);
    expect(screen.getByText('Just a paragraph.')).toBeInTheDocument();
  });

  it('opens links safely with rel=noreferrer and target=_blank', () => {
    render(<MarkdownView markdown="[docs](https://example.com/docs)" />);
    const link = screen.getByRole('link', { name: 'docs' });
    expect(link).toHaveAttribute('href', 'https://example.com/docs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders GFM strikethrough and task lists', () => {
    render(<MarkdownView markdown={'- [x] Done\n- [ ] Pending\n\n~~gone~~'} />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('gone').tagName).toBe('DEL');
  });

  it('keeps the long-standing classes at the default md scale', () => {
    render(<MarkdownView markdown={'# Title\n\nBody'} />);
    expect(screen.getByTestId('markdown-view')).toHaveAttribute('data-scale', 'md');
    expect(screen.getByRole('heading', { level: 1 }).className).toContain('text-xl');
    expect(screen.getByText('Body').className).toContain('text-sm');
  });

  it('steps headings and body down at sm and up at lg', () => {
    const md = '# One\n\n## Two\n\n#### Four\n\nBody';
    const { unmount } = render(<MarkdownView markdown={md} scale="sm" />);
    expect(screen.getByRole('heading', { level: 1 }).className).toContain('text-[17px]');
    expect(screen.getByRole('heading', { level: 2 }).className).toContain('text-[15px]');
    expect(screen.getByRole('heading', { level: 4 }).className).toContain('text-[13px]');
    expect(screen.getByText('Body').className).toContain('text-[13px]');
    unmount();
    render(<MarkdownView markdown={md} scale="lg" />);
    expect(screen.getByRole('heading', { level: 1 }).className).toContain('text-2xl');
    expect(screen.getByRole('heading', { level: 2 }).className).toContain('text-xl');
    expect(screen.getByText('Body').className).toContain('text-[15px]');
  });
});
