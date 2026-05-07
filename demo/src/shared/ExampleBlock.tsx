import { useState, type CSSProperties, type ReactNode } from 'react';

interface ExampleBlockProps {
  id: string;
  title: string;
  description?: string;
  code: string;
  children: ReactNode;
  background?: string;
}

const KEYWORDS = [
  'import', 'export', 'from', 'const', 'let', 'var', 'function',
  'return', 'default', 'if', 'else', 'switch', 'case', 'break',
  'new', 'typeof', 'interface', 'type', 'extends', 'implements',
  'class', 'async', 'await', 'true', 'false', 'null', 'undefined',
];

function highlightCode(code: string): string {
  // Escape HTML first
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Highlight single-line comments
  escaped = escaped.replace(
    /(\/\/.*?)(\n|$)/g,
    '<span style="color:#6b7280">$1</span>$2'
  );

  // Highlight strings (single and double quotes, template literals)
  escaped = escaped.replace(
    /(&quot;|&#39;|`)(.*?)(\1)/g,
    '<span style="color:#4ade80">$1$2$3</span>'
  );
  escaped = escaped.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    '<span style="color:#4ade80">$1</span>'
  );

  // Highlight keywords (word boundary)
  const kwPattern = new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g');
  escaped = escaped.replace(
    kwPattern,
    '<span style="color:#93c5fd">$1</span>'
  );

  return escaped;
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    margin: '0 0 6px 0',
    color: '#0f172a',
  },
  description: {
    fontSize: 14,
    color: '#475569',
    margin: '0 0 12px 0',
    lineHeight: 1.5,
  },
  preview: {
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    padding: 24,
  },
  toggleRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  toggleBtn: {
    background: 'none',
    border: '1px solid #e2e8f0',
    borderRadius: 4,
    padding: '4px 10px',
    fontSize: 12,
    color: '#475569',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  codePanel: {
    background: '#1e293b',
    color: '#e2e8f0',
    fontFamily: 'monospace',
    fontSize: 13,
    padding: 16,
    borderRadius: '0 0 8px 8px',
    overflowX: 'auto',
    margin: 0,
    lineHeight: 1.6,
  },
};

export function ExampleBlock({
  id,
  title,
  description,
  code,
  children,
  background = '#f8fafc',
}: ExampleBlockProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div style={styles.wrapper}>
      <h3 id={id} style={styles.title}>
        {title}
      </h3>
      {description && <p style={styles.description}>{description}</p>}
      <div style={{ ...styles.preview, background }}>
        {children}
      </div>
      <div style={styles.toggleRow}>
        <button
          type="button"
          style={styles.toggleBtn}
          onClick={() => setShowCode((v) => !v)}
        >
          {showCode ? 'Hide code' : 'Show code'}
        </button>
      </div>
      {showCode && (
        <pre
          style={styles.codePanel}
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />
      )}
    </div>
  );
}
