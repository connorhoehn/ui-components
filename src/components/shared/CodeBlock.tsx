import { useState, useCallback, type CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export type CodeBlockLanguage = 'tsx' | 'ts' | 'jsx' | 'js' | 'json' | 'bash' | 'sh' | 'text';
export type CodeBlockTheme = 'dark' | 'light';

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
  comment: '#6b7280', string: '#4ade80', keyword: '#93c5fd', number: '#fbbf24',
  property: '#7dd3fc', builtin: '#c4b5fd', variable: '#fbbf24',
};

const LIGHT: Palette = {
  comment: '#64748b', string: '#15803d', keyword: '#1d4ed8', number: '#a16207',
  property: '#0369a1', builtin: '#7c3aed', variable: '#a16207',
};

function highlight(code: string, language: CodeBlockLanguage, theme: CodeBlockTheme): string {
  const palette = theme === 'dark' ? DARK : LIGHT;
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
  const lines = code.split('\n');

  return (
    <div
      data-testid={testId}
      data-language={language}
      data-theme={theme}
      className={cn(
        'relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden',
        isDark
          ? 'bg-slate-800 text-slate-100 border-slate-700'
          : 'bg-slate-50 text-slate-900 border-slate-200',
        className,
      )}
      style={style}
      aria-label={ariaLabel ?? `Code (${language})`}
    >
      {copyButton && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className={cn(
            'absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity',
            isDark
              ? 'bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100',
          )}
          data-copied={copied ? 'true' : 'false'}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      )}
      <pre className="m-0 px-4 py-3 overflow-x-auto">
        {showLineNumbers ? (
          <div className="flex">
            <div
              className={cn(
                'select-none pr-3 text-right',
                isDark ? 'text-slate-500' : 'text-slate-400',
              )}
              aria-hidden="true"
            >
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <code
              className="flex-1 block"
              dangerouslySetInnerHTML={{ __html: highlight(code, language, theme) }}
            />
          </div>
        ) : (
          <code
            className="block"
            dangerouslySetInnerHTML={{ __html: highlight(code, language, theme) }}
          />
        )}
      </pre>
    </div>
  );
}

export default CodeBlock;
