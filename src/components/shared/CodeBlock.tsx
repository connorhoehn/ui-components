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

// One pass over the raw source: every rule is an alternative of one regex, so
// a token is coloured once and no rule ever matches markup a previous rule
// inserted (sequential replaces used to highlight the `class` in
// `<span class="tok-comment">` itself). Text between tokens is escaped here.
type TokenClass = 'comment' | 'string' | 'keyword' | 'number' | 'property' | 'builtin' | 'variable';
type Rule = [source: string, token: TokenClass];

function tokenize(code: string, rules: Rule[]): string {
  const pattern = new RegExp(rules.map(([source]) => `(${source})`).join('|'), 'g');
  let out = '';
  let last = 0;
  for (const match of code.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (!match[0]) continue;
    const rule = match.slice(1).findIndex((group) => group !== undefined);
    out += escapeHtml(code.slice(last, index));
    out += `<span class="tok-${rules[rule][1]}">${escapeHtml(match[0])}</span>`;
    last = index + match[0].length;
  }
  return out + escapeHtml(code.slice(last));
}

const words = (list: string[]) => `\\b(?:${list.join('|')})\\b`;

function highlightTs(code: string): string {
  return tokenize(code, [
    ['\\/\\/[^\\n]*', 'comment'],
    ['\\/\\*[\\s\\S]*?\\*\\/', 'comment'],
    ['"(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\'|`(?:[^`\\\\]|\\\\.)*`', 'string'],
    [words(KEYWORDS_JS), 'keyword'],
    ['\\b\\d+(?:\\.\\d+)?\\b', 'number'],
  ]);
}

function highlightJson(code: string): string {
  return tokenize(code, [
    ['"(?:[^"\\\\]|\\\\.)*"(?=\\s*:)', 'property'],
    ['"(?:[^"\\\\]|\\\\.)*"', 'string'],
    [words(['true', 'false', 'null']), 'keyword'],
    ['-?\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b', 'number'],
  ]);
}

function highlightBash(code: string): string {
  return tokenize(code, [
    ['(?<![\\w$])#[^\\n]*', 'comment'],
    ['"(?:[^"\\\\]|\\\\.)*"|\'[^\']*\'', 'string'],
    ['\\$\\w+|\\$\\{[^}]+\\}', 'variable'],
    [words(KEYWORDS_BASH), 'keyword'],
    [words(BASH_BUILTINS), 'builtin'],
  ]);
}

/**
 * Emits `<span class="tok-…">` only; the colours live in styles.css under
 * `[data-code-palette]`, so the markup carries no `style=` attribute and a
 * strict `style-src` CSP does not block it. The source is escaped as it is tokenized.
 */
function highlight(code: string, language: CodeBlockLanguage): string {
  switch (language) {
    case 'json':
      return highlightJson(code);
    case 'bash':
    case 'sh':
      return highlightBash(code);
    case 'text':
      return escapeHtml(code);
    case 'tsx':
    case 'ts':
    case 'jsx':
    case 'js':
    default:
      return highlightTs(code);
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
  const html = useMemo(() => highlight(code, language), [code, language]);

  return (
    <div
      data-testid={testId}
      data-language={language}
      data-theme={theme}
      data-code-palette={theme}
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
