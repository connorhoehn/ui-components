import { useState, type CSSProperties, type ReactNode } from 'react';
import { CodeBlock } from '@connorhoehnslalom/ui-components/shared';

interface ExampleBlockProps {
  id: string;
  title: string;
  description?: string;
  code: string;
  children: ReactNode;
  background?: string;
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
        <div style={{ marginTop: 8 }}>
          <CodeBlock code={code} language="tsx" theme="dark" />
        </div>
      )}
    </div>
  );
}
