import { useState, useCallback, useMemo, type CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export type CodeBlockLanguage = 'tsx' | 'ts' | 'jsx' | 'js' | 'json' | 'bash' | 'sh' | 'text';
/**
 * `light` / `dark` follow the app theme (`dark` is the INVERSE surface, so it
 * flips to a light box in dark mode). `console` is the theme-invariant code
 * family (`--color-code-*`): use it for a block sitting inside a log console,
 * terminal or other permanently-dark panel, where an inverse box would read
 * as a light slab on the dark panel in dark mode.
 */
export type CodeBlockTheme = 'dark' | 'light' | 'console';

export interface CodeBlockProps {
  code: string;
  language?: CodeBlockLanguage;
  theme?: CodeBlockTheme;
  copyButton?: boolean;
  showLineNumbers?: boolean;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
  ariaLabel?: string;
}

const KEYWORDS_JS = [
  'import', 'export', 'from', 'as', 'const', 'let', 'var', 'function',
  'return', 'default', 'if', 'else', 'switch', 'case', 'break',
  'new', 'typeof', 'instanceof', 'in', 'of', 'interface', 'type',
  'extends', 'implements', 'class', 'async', 'await', 'true', 'false',
  'null', 'undefined', 'this', 'super', 'try', 'catch', 'finally',
  'throw', 'for', 'while', 'do', 'continue', 'public', 'private',
  'protected', 'readonly', 'static', 'enum',
];

const KEYWORDS_BASH = [
  'if', 'then', 'else', 'fi', 'for', 'do', 'done', 'while', 'case',
  'esac', 'function', 'return', 'export', 'local', 'in',
];

const BASH_BUILTINS = [
  'cd', 'ls', 'echo', 'cat', 'grep', 'sed', 'awk', 'find', 'cp', 'mv',
  'rm', 'mkdir', 'rmdir', 'touch', 'chmod', 'chown', 'pwd', 'which',
  'npm', 'yarn', 'pnpm', 'npx', 'git', 'node', 'curl', 'wget',
];

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightTs(escaped: string, palette: Palette): string {
  let out = escaped.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${palette.comment}">$1</span>$2`);
  out = out.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${palette.comment}">$1</span>`);
  out = out.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    `<span style="color:${palette.string}">$1</span>`,
  );
  const kw = new RegExp(`\\b(${KEYWORDS_JS.join('|')})\\b`, 'g');
  out = out.replace(kw, `<span style="color:${palette.keyword}">$1</span>`);
  out = out.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${palette.number}">$1</span>`);
  return out;
}

function highlightJson(escaped: string, palette: Palette): string {
  let out = escaped.replace(
    /("(?:[^"\\]|\\.)*")(\s*:)/g,
    `<span style="color:${palette.property}">$1</span>$2`,
  );
  out = out.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${palette.string}">$1</span>`);
  out = out.replace(/\b(true|false|null)\b/g, `<span style="color:${palette.keyword}">$1</span>`);
  out = out.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${palette.number}">$1</span>`);
  return out;
}

function highlightBash(escaped: string, palette: Palette): string {
  let out = escaped.replace(/(#.*?)(\n|$)/g, `<span style="color:${palette.comment}">$1</span>$2`);
  out = out.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${palette.string}">$1</span>`);
  const kw = new RegExp(`\\b(${KEYWORDS_BASH.join('|')})\\b`, 'g');
  out = out.replace(kw, `<span style="color:${palette.keyword}">$1</span>`);
  const builtins = new RegExp(`\\b(${BASH_BUILTINS.join('|')})\\b`, 'g');
  out = out.replace(builtins, `<span style="color:${palette.builtin}">$1</span>`);
  out = out.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${palette.variable}">$1</span>`);
  return out;
}

interface Palette {
  comment: string; string: string; keyword: string; number: string;
  property: string; builtin: string; variable: string;
}

const DARK: Palette = {
  comment: 'var(--color-neutral)', string: '#4ade80', keyword: 'var(--color-state-pending)', number: '#fbbf24',
  property: '#7dd3fc', builtin: '#c4b5fd', variable: '#fbbf24',
};

const CONSOLE: Palette = {
  comment: 'var(--color-code-comment)', string: 'var(--color-code-green)', keyword: 'var(--color-code-mauve)',
  number: 'var(--color-code-peach)', property: 'var(--color-code-blue)', builtin: 'var(--color-code-mauve)',
  variable: 'var(--color-code-yellow)',
};

const LIGHT: Palette = {
  comment: 'var(--color-neutral)', string: '#15803d', keyword: 'var(--color-info-fg)', number: '#a16207',
  property: '#0369a1', builtin: 'var(--color-cat-ai)', variable: '#a16207',
};

function highlight(code: string, language: CodeBlockLanguage, theme: CodeBlockTheme): string {
  const palette = theme === 'light' ? LIGHT : theme === 'console' ? CONSOLE : DARK;
  const escaped = escapeHtml(code);
  switch (language) {
    case 'json':
      return highlightJson(escaped, palette);
    case 'bash':
    case 'sh':
      return highlightBash(escaped, palette);
    case 'text':
      return escaped;
    case 'tsx':
    case 'ts':
    case 'jsx':
    case 'js':
    default:
      return highlightTs(escaped, palette);
  }
}

export function CodeBlock({
  code,
  language = 'tsx',
  theme = 'dark',
  copyButton = true,
  showLineNumbers = false,
  className,
  style,
  'data-testid': testId,
  ariaLabel,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {
      /* clipboard unavailable */
    });
  }, [code]);

  const isDark = theme === 'dark';
  const isConsole = theme === 'console';
  const lines = useMemo(() => code.split('\n'), [code]);

  // `highlight` builds three fresh RegExps with 20-30 alternations each and
  // runs half a dozen full-string passes. It was called in the render body,
  // so it re-ran for the `copied` toggle above — which touches nothing the
  // highlighter reads — and on any parent re-render, over payloads that can
  // be tens of KB (pipeline step output, LLM responses, JSON blobs).
  const html = useMemo(() => highlight(code, language, theme), [code, language, theme]);

  return (
    <div
      data-testid={testId}
      data-language={language}
      data-theme={theme}
      className={cn(
        // The monospace face is the code's (on the <pre>), not the block's: the
        // copy button beside it is a control and keeps the page face (2.441.3).
        // Reserve its own column so horizontally scrolling code never sits
        // underneath the action, including a long first line.
        'relative flex rounded-lg border overflow-hidden',
        isConsole
          ? 'bg-code-bg text-code-text border-code-border'
          : isDark
            ? 'bg-surface-inverse text-text-inverse border-border-emphasis'
            : 'bg-surface-panel text-text-primary border-border',
        className,
      )}
      style={style}
      aria-label={ariaLabel ?? `Code (${language})`}
    >
      {copyButton && (
        <button
          data-ui-part=""
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className={cn(
            // A control on code is still a control: the page face at the 12px step,
            // not the block's monospace 11px (2.441.3).
            'order-2 m-3 shrink-0 self-start font-[inherit] text-xs font-medium px-2 py-1 rounded border transition-opacity',
            isConsole
              ? 'bg-code-panel text-code-text border-code-border hover:bg-code-raised'
              : isDark
                ? 'bg-surface-inverse text-text-inverse border-border-emphasis hover:bg-neutral'
                : 'bg-surface text-text-primary border-border-emphasis hover:bg-surface-hover',
          )}
          data-copied={copied ? 'true' : 'false'}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      )}
      <pre className="m-0 min-w-0 flex-1 px-4 py-3 overflow-x-auto font-mono text-xs leading-relaxed">
        {showLineNumbers ? (
          <div className="flex">
            <div
              className={cn(
                'select-none pr-3 text-right',
                isConsole ? 'text-code-comment' : isDark ? 'text-neutral' : 'text-text-tertiary',
              )}
              aria-hidden="true"
            >
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <code
              className="flex-1 block"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        ) : (
          <code
            className="block"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </pre>
    </div>
  );
}

export default CodeBlock;
