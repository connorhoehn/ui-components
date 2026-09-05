// MarkdownView — read-only markdown rendered on the library's own tokens.
// GitHub-flavoured (tables, strikethrough, task lists) via remark-gfm. Fenced
// code routes through CodeBlock so a markdown doc's code samples get the same
// highlighting and copy button as everywhere else in the library; wide tables
// scroll inside their own container rather than the page.

import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../lib/cn';
import CodeBlock, { type CodeBlockLanguage } from './CodeBlock';

export interface MarkdownViewProps {
  markdown: string;
  className?: string;
  'data-testid'?: string;
}

const CODE_BLOCK_LANGUAGES: readonly CodeBlockLanguage[] = ['tsx', 'ts', 'jsx', 'js', 'json', 'bash', 'sh', 'text'];

function languageFromClassName(className: string | undefined): CodeBlockLanguage {
  const match = /language-(\w+)/.exec(className ?? '');
  const lang = match?.[1]?.toLowerCase();
  return (CODE_BLOCK_LANGUAGES as readonly string[]).includes(lang ?? '') ? (lang as CodeBlockLanguage) : 'text';
}

function textContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textContent).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return textContent((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return '';
}

const components: Components = {
  table({ children }) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    );
  },
  th({ children }) {
    return <th className="border-b border-border px-3 py-1.5 text-left font-semibold text-text-primary">{children}</th>;
  },
  td({ children }) {
    return <td className="border-b border-border px-3 py-1.5 text-text-secondary">{children}</td>;
  },
  a({ href, children }) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2 hover:text-primary-hover">
        {children}
      </a>
    );
  },
  h1({ children }) {
    return <h1 className="mb-3 mt-6 text-xl font-bold text-text-primary first:mt-0">{children}</h1>;
  },
  h2({ children }) {
    return <h2 className="mb-2 mt-5 text-lg font-bold text-text-primary first:mt-0">{children}</h2>;
  },
  h3({ children }) {
    return <h3 className="mb-2 mt-4 text-base font-semibold text-text-primary first:mt-0">{children}</h3>;
  },
  p({ children }) {
    return <p className="mb-3 text-sm leading-relaxed text-text-secondary last:mb-0">{children}</p>;
  },
  ul({ children }) {
    return <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-text-secondary">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="mb-3 list-decimal space-y-1 pl-5 text-sm text-text-secondary">{children}</ol>;
  },
  blockquote({ children }) {
    return <blockquote className="mb-3 border-l-2 border-border pl-3 text-sm italic text-text-tertiary">{children}</blockquote>;
  },
  hr() {
    return <hr className="my-4 border-border" />;
  },
  pre({ children, className }: ComponentPropsWithoutRef<'pre'> & { children?: ReactNode }) {
    // react-markdown nests a single <code> inside <pre> for fenced blocks —
    // pull the language + text out and hand off to CodeBlock rather than
    // rendering the raw <pre><code> react-markdown would otherwise produce.
    return <CodeBlockFromPre className={className}>{children}</CodeBlockFromPre>;
  },
  code({ className, children }) {
    if (!className) {
      return (
        <code className="rounded bg-surface-inset px-1 py-0.5 text-[13px] text-text-primary">{children}</code>
      );
    }
    // Handled by the parent <pre> override for fenced blocks; inline code
    // with a language class (rare) falls back to plain styling.
    return <code className={className}>{children}</code>;
  },
};

function CodeBlockFromPre({ children, className }: { children?: ReactNode; className?: string }) {
  void className;
  const codeEl = Array.isArray(children) ? children[0] : children;
  const codeClassName =
    codeEl && typeof codeEl === 'object' && 'props' in codeEl
      ? (codeEl as { props?: { className?: string } }).props?.className
      : undefined;
  const language = languageFromClassName(codeClassName);
  const code = textContent(children).replace(/\n$/, '');
  return <CodeBlock code={code} language={language} className="mb-3" copyButton />;
}

export function MarkdownView({ markdown, className, 'data-testid': testId = 'markdown-view' }: MarkdownViewProps) {
  return (
    <div className={cn('min-w-0', className)} data-testid={testId}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownView;
