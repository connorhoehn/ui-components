import type { CSSProperties } from 'react';

interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  componentName: string;
  props: PropDef[];
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginBottom: 32,
    width: '100%',
    overflowX: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 12,
    color: '#0f172a',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 14,
  },
  th: {
    textAlign: 'left',
    padding: '10px 14px',
    background: '#f1f5f9',
    fontWeight: 600,
    borderBottom: '1px solid #e2e8f0',
    color: '#334155',
  },
  tdName: {
    fontFamily: 'monospace',
    fontWeight: 700,
    padding: '10px 14px',
    borderBottom: '1px solid #e2e8f0',
  },
  tdType: {
    fontFamily: 'monospace',
    color: '#7c3aed',
    padding: '10px 14px',
    borderBottom: '1px solid #e2e8f0',
  },
  tdDefault: {
    fontFamily: 'monospace',
    padding: '10px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#64748b',
  },
  tdDesc: {
    padding: '10px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#334155',
  },
};

export function PropsTable({ componentName, props }: PropsTableProps) {
  return (
    <div style={styles.wrapper}>
      <h3 style={styles.heading}>{componentName} Props</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Default</th>
            <th style={styles.th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => {
            const rowBg = i % 2 === 0 ? '#fff' : '#f8fafc';
            return (
              <tr key={prop.name} style={{ background: rowBg }}>
                <td style={styles.tdName}>
                  {prop.name}
                  {prop.required && (
                    <span style={{ color: '#dc2626', marginLeft: 4 }}>*</span>
                  )}
                </td>
                <td style={styles.tdType}>{prop.type}</td>
                <td style={styles.tdDefault}>{prop.default ?? '-'}</td>
                <td style={styles.tdDesc}>{prop.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
