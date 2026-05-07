import { Link } from 'react-router';
import { navigationTree } from '../navigation';

export default function ComponentsOverviewPage() {
  const componentsSection = navigationTree.find(s => s.id === 'components');
  if (!componentsSection) return null;

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>
        Components
      </h1>
      <p style={{ fontSize: 15, color: '#475569', marginBottom: 32, lineHeight: 1.6, maxWidth: 640 }}>
        Interactive UI components for building real-time collaborative applications.
        Each component is fully typed, themeable, and designed for composition.
      </p>

      {componentsSection.groups.map(group => (
        <div key={group.id} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
            {group.label}
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
