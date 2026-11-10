// MarkdownView — read-only markdown rendered on the library's own tokens.
// GitHub-flavoured (tables, strikethrough, task lists) via remark-gfm. Fenced
// code routes through CodeBlock so a markdown doc's code samples get the same
// highlighting and copy button as everywhere else in the library; wide tables
// scroll inside their own container rather than the page.

import { useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../lib/cn';
import CodeBlock, { type CodeBlockLanguage } from './CodeBlock';
import { safeHref } from '../../lib/safeHref';

export type MarkdownViewScale = 'sm' | 'md' | 'lg';

export interface MarkdownViewProps {
  markdown: string;
  /**
   * Type scale (since 2.388.0). `md` (default) is the long-standing rendering:
   * 14px body, h1 20px. `sm` steps headings down to 17/15/14/13px over a 13px
   * body, for prose inside a card (an assistant answer) whose `#` must not
   * compete with the page title. `lg` is a document read on its own page:
   * 16px body, h1 20px, h2 16px, h3 16px, h4 14px, inline code 14px (since
   * 2.515.12, on the 11/12/14/16/20 type scale; it was 15px body, h1 24px,
   * h2 20px, h3 17px, h4 15px).
   */
  scale?: MarkdownViewScale;
  /**
   * Shift every heading's level down by this many (since 2.515.12), so a
   * document embedded under a page's own h1 keeps one outline: with `1`, `#`
   * renders an `<h2>`, `##` an `<h3>`, capped at `<h6>`. The look follows the
   * source level (a `#` still draws at the scale's h1 size); only the element
   * changes. Each shifted heading carries `data-md-level` (its source level).
   * Default `0`.
   */
  headingOffset?: number;
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

// `md` reproduces the pre-2.388 classes, except the h2 top margin, 20px →
// 16px in 2.516.1 (G88-O4, onto the 4px scale); h4 had no override then and
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
    h2: 'mb-2 mt-4 text-sm font-semibold',
    h3: 'mb-2 mt-4 text-sm font-semibold',
    h4: '',
    inlineCode: 'text-[12px]',
  },
  // On the 11/12/14/16/20 type scale and 4px spacing (2.515.12).
  lg: {
    body: 'text-base',
    h1: 'mb-3 mt-8 text-xl font-semibold',
    h2: 'mb-2 mt-6 text-base font-semibold',
    h3: 'mb-2 mt-4 text-base font-semibold',
    h4: 'mb-2 mt-4 text-sm font-semibold',
    inlineCode: 'text-[14px]',
  },
};

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

function headingTag(level: number, offset: number): HeadingTag {
  return `h${Math.min(6, Math.max(1, level + offset))}` as HeadingTag;
}

function buildComponents(scale: MarkdownViewScale, offset = 0): Components {
  const t = SCALES[scale];
  const components: Components = {
  table({ children }) {
    return (
      <div className="overflow-x-auto">
        <table data-ui-part="" className={cn('w-full border-collapse', t.body)}>{children}</table>
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
      <a href={safeHref(href) ?? undefined} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2 hover:text-primary-hover">
        {children}
      </a>
    );
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
        <code data-ui-inline-code="" className={cn('rounded bg-surface-inset px-1 py-0.5 text-text-primary', t.inlineCode)}>{children}</code>
      );
    }
    // Handled by the parent <pre> override for fenced blocks; inline code
    // with a language class (rare) falls back to plain styling.
    return <code className={className}>{children}</code>;
  },
  };
  const looks: Record<1 | 2 | 3 | 4, string> = { 1: t.h1, 2: t.h2, 3: t.h3, 4: t.h4 };
  ([1, 2, 3, 4, 5, 6] as const).forEach((level) => {
    const look = level <= 4 ? looks[level as 1 | 2 | 3 | 4] : '';
    // Unstyled levels (h4 at md, h5, h6) keep react-markdown's plain element
    // unless an offset has to move them.
    if (!look && offset === 0) return;
    const Tag = headingTag(level, offset);
    components[`h${level}` as HeadingTag] = ({ children }) => (
      <Tag className={look ? cn(look, 'text-text-primary first:mt-0') : undefined} {...(offset ? { 'data-md-level': level } : {})}>{children}</Tag>
    );
  });
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

export function MarkdownView({ markdown, scale = 'md', headingOffset = 0, className, 'data-testid': testId = 'markdown-view' }: MarkdownViewProps) {
  const offset = Number.isFinite(headingOffset) ? Math.max(0, Math.min(5, Math.trunc(headingOffset))) : 0;
  const known = SCALES[scale] ? scale : 'md';
  const components = useMemo(() => (offset ? buildComponents(known, offset) : COMPONENTS[known]), [known, offset]);
  return (
    <div className={cn('min-w-0', className)} data-scale={scale} data-heading-offset={offset || undefined} data-testid={testId}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownView;
