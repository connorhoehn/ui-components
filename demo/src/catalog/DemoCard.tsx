import { Link } from 'react-router';
import type { CatalogEntry } from './catalog-data';

const categoryColors: Record<string, string> = {
  Pages: '#6366f1',
  Agents: '#0ea5e9',
  Components: '#475569',
};

export function DemoCard({ entry }: { entry: CatalogEntry }) {
  const color = categoryColors[entry.category] ?? '#64748b';
  const linkPath = entry.path
    ? entry.path
    : entry.type === 'demo'
    ? `/demo/${entry.id}`
    : `/components/${entry.id}`;

  return (
    <Link to={linkPath} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s, transform 0.2s',
        cursor: 'pointer',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          (e.currentTarget as HTMLElement).style.transform = 'none';
        }}
      >
        {/* Thumbnail placeholder */}
        <div style={{
          height: 180,
          background: entry.type === 'component'
            ? `linear-gradient(135deg, #47556915, #47556905)`
            : `linear-gradient(135deg, ${color}15, ${color}05)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #e2e8f0',
        }}>
          <span style={{ fontSize: 48, opacity: 0.3 }}>
            {entry.thumbnail
              ? <img src={entry.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : entry.type === 'component' ? '\u{1F9F1}' : '\u{1F5BC}'}
          </span>
        </div>
        {/* Content */}
        <div style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color,
              background: `${color}12`,
              padding: '2px 8px',
              borderRadius: 4,
            }}>
              {entry.category}
            </span>
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: '#1a1a2e' }}>
            {entry.title}
          </h3>
          <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
            {entry.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
