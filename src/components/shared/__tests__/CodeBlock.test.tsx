import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CodeBlock } from '../CodeBlock';

describe('CodeBlock', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn(() => Promise.resolve()) },
    });
  });

  it('renders code content', () => {
    render(<CodeBlock code={'const x = 42;'} language="tsx" data-testid="cb" />);
    const el = screen.getByTestId('cb');
    expect(el).toBeInTheDocument();
    expect(el.textContent).toContain('const');
    expect(el.textContent).toContain('42');
  });

  it('defaults to dark theme and tsx language', () => {
    render(<CodeBlock code="x" data-testid="cb" />);
    const el = screen.getByTestId('cb');
    expect(el.getAttribute('data-theme')).toBe('dark');
    expect(el.getAttribute('data-language')).toBe('tsx');
  });

  it('supports light theme', () => {
    render(<CodeBlock code="x" theme="light" data-testid="cb" />);
    expect(screen.getByTestId('cb').getAttribute('data-theme')).toBe('light');
  });

  it('renders Copy button by default', () => {
    render(<CodeBlock code="hello" />);
    expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument();
  });

  it('omits Copy button when copyButton=false', () => {
    render(<CodeBlock code="hello" copyButton={false} />);
    expect(screen.queryByRole('button', { name: /copy/i })).toBeNull();
  });

  it('writes code to clipboard on Copy click and flips label', async () => {
    render(<CodeBlock code="my-code" />);
    const btn = screen.getByRole('button', { name: /copy code/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('my-code');
    });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument();
    });
  });

  it('shows line numbers when showLineNumbers=true', () => {
    render(<CodeBlock code={'a\nb\nc'} showLineNumbers data-testid="cb" />);
    const el = screen.getByTestId('cb');
    expect(el.textContent).toContain('1');
    expect(el.textContent).toContain('2');
    expect(el.textContent).toContain('3');
  });

  it('escapes HTML in code content', () => {
    render(<CodeBlock code={'<script>alert(1)</script>'} data-testid="cb" />);
    const el = screen.getByTestId('cb');
    expect(el.querySelector('script')).toBeNull();
    expect(el.textContent).toContain('<script>');
  });

  it('highlights JSON property keys', () => {
    const { container } = render(
      <CodeBlock code={'{"name":"x"}'} language="json" data-testid="cb" />,
    );
    expect(container.querySelector('code')!.innerHTML).toContain('<span');
  });

  it('highlights bash with builtins and variables', () => {
    const { container } = render(
      <CodeBlock code={'npm install $PKG # comment'} language="bash" data-testid="cb" />,
    );
    const html = container.querySelector('code')!.innerHTML;
    expect(html).toContain('npm');
    expect(html).toContain('$PKG');
  });

  it('language=text renders without highlighting markup', () => {
    const { container } = render(
      <CodeBlock code={'plain text'} language="text" copyButton={false} />,
    );
    expect(container.querySelector('code')!.innerHTML).not.toContain('<span');
  });

  it('colours each token once and never highlights its own markup', () => {
    const cases: [string, 'json' | 'ts' | 'bash'][] = [
      ['{\n  "schema": "x/1",\n  "count": 12,\n  "ok": true,\n  "tag": "a#b"\n}', 'json'],
      ['const a = "b"; // 42 "c"\nlet n = 3;', 'ts'],
      ['echo "$HOME" # 2 "x"\ngit status', 'bash'],
    ];
    for (const [code, language] of cases) {
      const { container, unmount } = render(
        <CodeBlock code={code} language={language} copyButton={false} />,
      );
      const node = container.querySelector('code')!;
      expect(node.textContent).toBe(code);
      expect(node.querySelectorAll('span span')).toHaveLength(0);
      unmount();
    }
  });

  it('colours a JSON key as a property and its value as a string', () => {
    const { container } = render(
      <CodeBlock code={'{"id": "g1", "n": -2.5e3}'} language="json" copyButton={false} />,
    );
    const spans = [...container.querySelectorAll('code span')].map((s) => s.textContent);
    expect(spans).toEqual(['"id"', '"g1"', '"n"', '-2.5e3']);
  });
});
