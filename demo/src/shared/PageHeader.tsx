import type { CSSProperties } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  importPath?: string;
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    margin: '0 0 8px 0',
    color: '#0f172a',
  },
  description: {
    fontSize: 15,
    color: '#475569',
    maxWidth: 640,
    margin: '0 0 16px 0',
    lineHeight: 1.6,
  },
  importBadge: {
    display: 'inline-block',
    background: '#1e293b',
    color: '#e2e8f0',
    fontFamily: 'monospace',
    fontSize: 13,
    padding: '6px 12px',
    borderRadius: 6,
  },
};

export function PageHeader({ title, description, importPath }: PageHeaderProps) {
  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.description}>{description}</p>
      {importPath && <code style={styles.importBadge}>{importPath}</code>}
    </div>
  );
}
