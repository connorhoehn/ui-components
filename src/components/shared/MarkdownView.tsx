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

export type MarkdownViewScale = 'sm' | 'md' | 'lg';

export interface MarkdownViewProps {
  markdown: string;
  /**
   * Type scale (since 2.388.0). `md` (default) is the long-standing rendering:
   * 14px body, h1 20px. `sm` steps headings down to 17/15/14/13px over a 13px
   * body, for prose inside a card (an assistant answer) whose `#` must not
   * compete with the page title. `lg` is a document read on its own page:
   * 15px body, h1 24px, h2 20px.
   */
  scale?: MarkdownViewScale;
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

interface ScaleClasses {
  body: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  inlineCode: string;
}

// `md` reproduces the pre-2.388 classes exactly; h4 had no override then and
// keeps none at `md`.
const SCALES: Record<MarkdownViewScale, ScaleClasses> = {
  sm: {
    body: 'text-sm',
    h1: 'mb-2 mt-4 text-sm font-semibold',
    h2: 'mb-1.5 mt-4 text-sm font-semibold',
    h3: 'mb-1.5 mt-3 text-sm font-semibold',
    h4: 'mb-1 mt-3 text-sm font-semibold',
    inlineCode: 'text-[12px]',
  },
  md: {
    body: 'text-sm',
    h1: 'mb-3 mt-6 text-sm font-semibold',
    h2: 'mb-2 mt-5 text-sm font-semibold',
    h3: 'mb-2 mt-4 text-sm font-semibold',
    h4: '',
    inlineCode: 'text-[12px]',
  },
  lg: {
    body: 'text-[15px]',
    h1: 'mb-3 mt-7 text-2xl font-semibold',
    h2: 'mb-2 mt-6 text-xl font-semibold',
    h3: 'mb-2 mt-5 text-[17px] font-semibold',
    h4: 'mb-1.5 mt-4 text-[15px] font-semibold',
    inlineCode: 'text-[14px]',
  },
};

function buildComponents(scale: MarkdownViewScale): Components {
  const t = SCALES[scale];
  const components: Components = {
  table({ children }) {
    return (
      <div className="overflow-x-auto">
        <table className={cn('w-full border-collapse', t.body)}>{children}</table>
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
    return <h1 className={cn(t.h1, 'text-text-primary first:mt-0')}>{children}</h1>;
  },
  h2({ children }) {
    return <h2 className={cn(t.h2, 'text-text-primary first:mt-0')}>{children}</h2>;
  },
  h3({ children }) {
    return <h3 className={cn(t.h3, 'text-text-primary first:mt-0')}>{children}</h3>;
  },
  p({ children }) {
    return <p className={cn('mb-3 leading-relaxed text-text-secondary last:mb-0', t.body)}>{children}</p>;
  },
  ul({ children }) {
    return <ul className={cn('mb-3 list-disc space-y-1 pl-5 text-text-secondary', t.body)}>{children}</ul>;
  },
  ol({ children }) {
    return <ol className={cn('mb-3 list-decimal space-y-1 pl-5 text-text-secondary', t.body)}>{children}</ol>;
  },
  blockquote({ children }) {
    return <blockquote className={cn('mb-3 border-l-2 border-border pl-3 italic text-text-tertiary', t.body)}>{children}</blockquote>;
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
        <code className={cn('rounded bg-surface-inset px-1 py-0.5 text-text-primary', t.inlineCode)}>{children}</code>
      );
    }
    // Handled by the parent <pre> override for fenced blocks; inline code
    // with a language class (rare) falls back to plain styling.
    return <code className={className}>{children}</code>;
  },
  };
  if (t.h4) {
    components.h4 = ({ children }) => <h4 className={cn(t.h4, 'text-text-primary first:mt-0')}>{children}</h4>;
  }
  return components;
}

const COMPONENTS: Record<MarkdownViewScale, Components> = {
  sm: buildComponents('sm'),
  md: buildComponents('md'),
  lg: buildComponents('lg'),
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

export function MarkdownView({ markdown, scale = 'md', className, 'data-testid': testId = 'markdown-view' }: MarkdownViewProps) {
  return (
    <div className={cn('min-w-0', className)} data-scale={scale} data-testid={testId}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTS[scale] ?? COMPONENTS.md}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownView;
