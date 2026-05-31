import { Link } from 'react-router';
import { navigationTree } from '../navigation';

export default function HooksOverviewPage() {
  const referenceSection = navigationTree.find(s => s.id === 'reference');
  const hookGroups = referenceSection?.groups.filter(g =>
    g.items.length > 0 && g.items.every(item => item.path.startsWith('/hooks/')),
  ) ?? [];
  if (hookGroups.length === 0) return null;

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>
        Hooks
      </h1>
      <p style={{ fontSize: 15, color: '#475569', marginBottom: 32, lineHeight: 1.6, maxWidth: 640 }}>
        Custom React hooks for WebSocket connections, real-time collaboration, document management,
        and UI interactions.
      </p>

      {hookGroups.map(group => (
        <div key={group.id} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
            {group.label.replace(/^Hooks\s+[—-]\s+/, '')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {group.items.map(item => (
              <Link
                key={item.id}
                to={item.path}
                style={{
                  display: 'block',
                  padding: '14px 18px',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  textDecoration: 'none',
                  color: '#0f172a',
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  transition: 'border-color 0.15s, background 0.15s',
                  background: '#fff',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
